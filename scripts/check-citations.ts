/**
 * 出典URL死活確認スクリプト
 *
 * 記事の frontmatter に記載された出典URL（sources[].url）がリンク切れして
 * いないかを自動チェックする。
 *
 * Usage:
 *   npx tsx scripts/check-citations.ts [--strict] [--concurrency=N] [--timeout=N]
 *
 * Options:
 *   --strict         リダイレクト(3xx)もエラーとして扱う
 *   --concurrency=N  最大同時リクエスト数（デフォルト: 5）
 *   --timeout=N      リクエストタイムアウト ms（デフォルト: 10000）
 *
 * Exit codes:
 *   0  全URL正常（--strict なしの場合リダイレクトは正常扱い）
 *   1  リンク切れあり
 */

import { readFileSync, readdirSync, existsSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

// ─── 型定義 ────────────────────────────────────────────

interface Source {
  title: string;
  url: string;
  accessedAt: string;
}

interface PostEntry {
  slug: string;
  sources: Source[];
}

type CheckStatus = "ok" | "redirect" | "broken";

interface CheckResult {
  url: string;
  status: CheckStatus;
  statusCode: number | null;
  redirectTo: string | null;
  error: string | null;
  slugs: string[];
}

interface CliOptions {
  strict: boolean;
  concurrency: number;
  timeout: number;
}

// ─── ANSI カラー ────────────────────────────────────────

const color = {
  green: (s: string) => `\x1b[32m${s}\x1b[0m`,
  yellow: (s: string) => `\x1b[33m${s}\x1b[0m`,
  red: (s: string) => `\x1b[31m${s}\x1b[0m`,
  dim: (s: string) => `\x1b[2m${s}\x1b[0m`,
  bold: (s: string) => `\x1b[1m${s}\x1b[0m`,
};

// ─── CLI引数パース ──────────────────────────────────────

function parseArgs(argv: string[]): CliOptions {
  const args = argv.slice(2);
  const opts: CliOptions = {
    strict: false,
    concurrency: 5,
    timeout: 10_000,
  };

  for (const arg of args) {
    if (arg === "--strict") {
      opts.strict = true;
    } else if (arg.startsWith("--concurrency=")) {
      const val = parseInt(arg.split("=")[1], 10);
      if (!Number.isNaN(val) && val > 0) opts.concurrency = val;
    } else if (arg.startsWith("--timeout=")) {
      const val = parseInt(arg.split("=")[1], 10);
      if (!Number.isNaN(val) && val > 0) opts.timeout = val;
    }
  }

  return opts;
}

// ─── データ読み込み ─────────────────────────────────────

function loadFromVelite(rootDir: string): PostEntry[] | null {
  const velitePath = join(rootDir, ".velite", "posts.json");
  if (!existsSync(velitePath)) return null;

  try {
    const raw = readFileSync(velitePath, "utf-8");
    const posts: { slug: string; sources: Source[] }[] = JSON.parse(raw);
    return posts.map((p) => ({ slug: p.slug, sources: p.sources }));
  } catch {
    return null;
  }
}

function loadFromMdx(rootDir: string): PostEntry[] {
  const postsDir = join(rootDir, "content", "posts");
  if (!existsSync(postsDir)) return [];

  const files = readdirSync(postsDir).filter((f) => f.endsWith(".mdx"));
  const entries: PostEntry[] = [];

  for (const file of files) {
    const content = readFileSync(join(postsDir, file), "utf-8");
    const fmMatch = content.match(/^---\n([\s\S]*?)\n---/);
    if (!fmMatch) continue;

    const fm = fmMatch[1];

    // slug を抽出
    const slugMatch = fm.match(/^slug:\s*(.+)$/m);
    const slug = slugMatch ? slugMatch[1].trim() : file.replace(/\.mdx$/, "");

    // sources を抽出（YAML パース簡易版）
    const sources: Source[] = [];
    const sourcesMatch = fm.match(/^sources:\n((?:\s+- [\s\S]*?)(?=\n\w|\n*$))/m);
    if (sourcesMatch) {
      const urlMatches = sourcesMatch[1].matchAll(
        /url:\s*(https?:\/\/\S+)/g,
      );
      for (const m of urlMatches) {
        sources.push({ title: "", url: m[1], accessedAt: "" });
      }
    }

    if (sources.length > 0) {
      entries.push({ slug, sources });
    }
  }

  return entries;
}

function loadPosts(rootDir: string): PostEntry[] {
  const fromVelite = loadFromVelite(rootDir);
  if (fromVelite && fromVelite.length > 0) {
    console.log(color.dim("データソース: .velite/posts.json"));
    return fromVelite;
  }

  console.log(color.dim("データソース: content/posts/*.mdx (フォールバック)"));
  return loadFromMdx(rootDir);
}

// ─── URL → 記事スラッグ マッピング ──────────────────────

function buildUrlMap(posts: PostEntry[]): Map<string, string[]> {
  const map = new Map<string, string[]>();
  for (const post of posts) {
    for (const src of post.sources) {
      const existing = map.get(src.url);
      if (existing) {
        if (!existing.includes(post.slug)) existing.push(post.slug);
      } else {
        map.set(src.url, [post.slug]);
      }
    }
  }
  return map;
}

// ─── セマフォ（並行制御） ───────────────────────────────

function createSemaphore(max: number) {
  let current = 0;
  const queue: (() => void)[] = [];

  return {
    async acquire(): Promise<void> {
      if (current < max) {
        current++;
        return;
      }
      return new Promise<void>((resolve) => {
        queue.push(() => {
          current++;
          resolve();
        });
      });
    },
    release(): void {
      current--;
      const next = queue.shift();
      if (next) next();
    },
  };
}

// ─── URLチェック ────────────────────────────────────────

async function checkUrl(
  url: string,
  slugs: string[],
  timeout: number,
): Promise<CheckResult> {
  const base: Omit<CheckResult, "status" | "statusCode" | "redirectTo" | "error"> = {
    url,
    slugs,
  };

  try {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), timeout);

    // HEAD リクエストを試行
    let response: Response;
    try {
      response = await fetch(url, {
        method: "HEAD",
        redirect: "manual",
        signal: controller.signal,
        headers: {
          "User-Agent":
            "Mozilla/5.0 (compatible; CitationChecker/1.0; +check-citations)",
        },
      });
    } catch {
      // HEAD が失敗した場合 GET にフォールバック
      response = await fetch(url, {
        method: "GET",
        redirect: "manual",
        signal: controller.signal,
        headers: {
          "User-Agent":
            "Mozilla/5.0 (compatible; CitationChecker/1.0; +check-citations)",
        },
      });
    }

    clearTimeout(timer);

    const code = response.status;

    // 3xx リダイレクト
    if (code >= 300 && code < 400) {
      const location = response.headers.get("location");
      return {
        ...base,
        status: "redirect",
        statusCode: code,
        redirectTo: location,
        error: null,
      };
    }

    // 405 Method Not Allowed → GET で再試行
    if (code === 405) {
      const controller2 = new AbortController();
      const timer2 = setTimeout(() => controller2.abort(), timeout);
      const getResponse = await fetch(url, {
        method: "GET",
        redirect: "manual",
        signal: controller2.signal,
        headers: {
          "User-Agent":
            "Mozilla/5.0 (compatible; CitationChecker/1.0; +check-citations)",
        },
      });
      clearTimeout(timer2);

      const getCode = getResponse.status;
      if (getCode >= 300 && getCode < 400) {
        return {
          ...base,
          status: "redirect",
          statusCode: getCode,
          redirectTo: getResponse.headers.get("location"),
          error: null,
        };
      }
      if (getCode >= 200 && getCode < 300) {
        return { ...base, status: "ok", statusCode: getCode, redirectTo: null, error: null };
      }
      return {
        ...base,
        status: "broken",
        statusCode: getCode,
        redirectTo: null,
        error: `HTTP ${getCode}`,
      };
    }

    // 2xx 成功
    if (code >= 200 && code < 300) {
      return { ...base, status: "ok", statusCode: code, redirectTo: null, error: null };
    }

    // その他のエラー
    return {
      ...base,
      status: "broken",
      statusCode: code,
      redirectTo: null,
      error: `HTTP ${code}`,
    };
  } catch (err: unknown) {
    const message =
      err instanceof Error
        ? err.name === "AbortError"
          ? "タイムアウト"
          : err.message
        : String(err);
    return {
      ...base,
      status: "broken",
      statusCode: null,
      redirectTo: null,
      error: message,
    };
  }
}

// ─── レポート出力 ────────────────────────────────────────

function printReport(results: CheckResult[], strict: boolean): boolean {
  const ok = results.filter((r) => r.status === "ok");
  const redirects = results.filter((r) => r.status === "redirect");
  const broken = results.filter((r) => r.status === "broken");

  console.log();

  // 正常URL
  for (const r of ok) {
    console.log(`  ${color.green("✓")} ${r.url} ${color.dim(`(${r.statusCode})`)}`);
  }

  // リダイレクト
  for (const r of redirects) {
    console.log(
      `  ${color.yellow("⚠")} ${r.url} ${color.dim(`(${r.statusCode} → ${r.redirectTo ?? "不明"})`)}`,
    );
    console.log(`    └─ 使用記事: ${r.slugs.join(", ")}`);
  }

  // リンク切れ
  for (const r of broken) {
    const detail = r.statusCode ? `${r.statusCode}` : r.error ?? "不明";
    console.log(`  ${color.red("✗")} ${r.url} ${color.dim(`(${detail})`)}`);
    console.log(`    └─ 使用記事: ${r.slugs.join(", ")}`);
  }

  // サマリー
  console.log();
  console.log(
    `結果: ${color.green(`✓ ${ok.length}`)}  ${color.yellow(`⚠ ${redirects.length}`)}  ${color.red(`✗ ${broken.length}`)}`,
  );
  console.log();

  // strict の場合リダイレクトもエラー扱い
  const hasFailure = broken.length > 0 || (strict && redirects.length > 0);
  return hasFailure;
}

// ─── メイン ─────────────────────────────────────────────

async function main() {
  const opts = parseArgs(process.argv);
  const __dirname = dirname(fileURLToPath(import.meta.url));
  const rootDir = join(__dirname, "..");

  // データ読み込み
  const posts = loadPosts(rootDir);
  if (posts.length === 0) {
    console.error("記事が見つかりません。velite ビルドを実行してください。");
    process.exit(1);
  }

  // URL マッピング
  const urlMap = buildUrlMap(posts);
  const urls = [...urlMap.entries()];

  console.log(
    color.bold(`出典URL死活確認 — ${posts.length}記事 / ${urls.length} URLs`),
  );

  // 並行チェック
  const semaphore = createSemaphore(opts.concurrency);
  const results: CheckResult[] = await Promise.all(
    urls.map(async ([url, slugs]) => {
      await semaphore.acquire();
      try {
        return await checkUrl(url, slugs, opts.timeout);
      } finally {
        semaphore.release();
      }
    }),
  );

  // 結果レポート & 終了コード
  const hasFailure = printReport(results, opts.strict);
  process.exit(hasFailure ? 1 : 0);
}

main();
