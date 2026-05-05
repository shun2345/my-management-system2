# イシュー着手順ロードマップ

> 最終更新: 2026-05-05

## 進捗サマリー

- 完了: 25 件
- 未完了: 6 件（コード実装タスク 4 件 + 手動セットアップ 1 件 + デプロイ 1 件）

---

## 完了済み

| # | タイトル | Phase |
|---|---------|-------|
| #1 | Phase 1-1: Next.js 15 プロジェクト初期セットアップ | Phase 1 |
| #2 | Phase 1-2: shadcn/ui の導入と基本UIセットアップ | Phase 1 |
| #3 | Phase 1-3: ディレクトリ構成の構築 | Phase 1 |
| #4 | Phase 2-1: Velite の導入と MDX コンテンツ管理の構築 | Phase 2 |
| #5 | Phase 2-2: 共通レイアウト（ヘッダー・フッター・ナビゲーション） | Phase 2 |
| #6 | Phase 2-3: トップページの実装 | Phase 2 |
| #7 | Phase 2-4: 記事詳細ページの実装 | Phase 2 |
| #8 | Phase 2-5: カテゴリ一覧・タグ一覧ページの実装 | Phase 2 |
| #9 | Phase 2-6: 固定ページ（About / Privacy / Disclosure / Contact） | Phase 2 |
| #10 | Phase 3-1: MDX コンポーネント — Citation / Disclaimer / Callout | Phase 3 |
| #11 | Phase 3-2: MDX コンポーネント — PRBadge / AffiliateCard / ExpertCTA | Phase 3 |
| #12 | Phase 4-1: SEO メタ情報の実装（lib/seo.ts） | Phase 4 |
| #16 | Phase 5-1: アフィリエイトリンク一元管理（lib/affiliate.ts） | Phase 5 |
| #17 | Phase 5-2: お問い合わせ API（api/contact） | Phase 5 |
| #18 | Phase 5-3: リンクハブページ（/links） | Phase 5 |
| #19 | Phase 6-1: 記事ひな型生成スクリプト（new-post.ts） | Phase 6 |
| #20 | Phase 6-2: 出典URL 死活確認スクリプト（check-citations.ts） | Phase 6 |
| #21 | Phase 6-3: Vercel Analytics / GA4 の導入 | Phase 6 |
| #26 | fix: npm スクリプト未登録 + new-post.ts の改善 | バグ修正 |
| #27 | refactor: example.com ハードコードを環境変数に集約 | バグ修正 |
| #28 | fix: AffiliateCard に不正 linkId のガード節追加 | バグ修正 |
| #29 | fix: Callout テーマ不整合 + ダークモード CSS 変数 | バグ修正 |
| #30 | fix: seo.ts の og:type + shadcn devDeps 移動 | バグ修正 |
| #41 | Phase 3.5: ターゲットペルソナ向けデザイン調整・ビジュアル統一 | Phase 3 |
| #51 | chore: GA4 / Search Console / Vercel Analytics の環境変数設定と有効化 | 運用 |

---

## 未完了イシュー（残り 6 件）

### Step 1: SEO 強化（即時着手可能・並行可能）

| # | タイトル | 現状 | 残作業 |
|---|---------|------|--------|
| #13 | Phase 4-2: 構造化データ JSON-LD | 部分実装 | Article / Breadcrumb / Organization / FAQPage の関数は実装済み。FAQPage・HowTo を記事テンプレートで実際に使用する統合が未完了 |
| #14 | Phase 4-3: OGP 画像の動的生成 | 部分実装 | テキスト描画のみの最小実装。DESIGN.md のブランドカラー・ロゴ・カテゴリ色帯の反映が未実装 |
| #15 | Phase 4-4: sitemap.ts / robots.ts | 部分実装 | ホームページのみ出力。記事URL・カテゴリ・タグ・固定ページの動的生成が未実装 |

3 件すべて独立しており並行着手可能。

---

### Step 2: バグ修正

| # | タイトル | 依存先 | 残作業 |
|---|---------|--------|--------|
| #25 | fix: OG画像ルート・動的スラッグの入力バリデーション | #14 | OG ルートに title パラメータの長さ制限・サニタイズが未実装。動的スラッグページ側は notFound() で対応済み |

#14 の OG 画像を完成させた後に対応する。

---

### Step 3: 本番デプロイ

| # | タイトル | 依存先 | 残作業 |
|---|---------|--------|--------|
| #22 | Phase 6-4: Vercel デプロイ設定と本番環境準備 | 全イシュー | Vercel プロジェクト設定・環境変数・カスタムドメイン・Lighthouse スコア確認 |

全コード実装イシューの完了後に着手する。

---

## 各イシューの実装状況メモ

### #13 JSON-LD — 残りは統合のみ

`lib/jsonld.ts` に 4 つの生成関数が揃っている:
- `generateArticleJsonLd()` → 記事詳細ページで使用中
- `generateBreadcrumbJsonLd()` → 記事詳細ページで使用中
- `generateOrganizationJsonLd()` → ルートレイアウトで使用中
- `generateFAQPageJsonLd()` → 関数は存在するが、どのページでも使われていない

残作業: FAQPage スキーマを記事テンプレート（Q&A 形式のセクションがある記事）で実際に出力する統合。HowTo スキーマは必要に応じて追加。

### #14 OG 画像 — デザイン反映が必要

`app/api/og/route.tsx` は title パラメータを受けてテキストを描画するだけの最小実装。DESIGN.md セクション 9.4 で定義された仕様:
- 左上にロゴシンボル＋「実家のしらべ」横組み
- 中央に記事タイトル（Noto Serif JP 700）
- 下部にカテゴリラベル＋著者名
- 背景は Cream 一色、上端にカテゴリ色の細帯

これらが未反映。

### #15 sitemap — 記事URLの動的出力

`app/sitemap.ts` がホームページのみ出力している。velite の posts データから全記事・カテゴリ・タグのURLを動的に生成する必要がある。`app/robots.ts` は正常動作中。

### #17 お問い合わせ API — メール送信未統合

バリデーションロジックは完成済み。`route.ts` 内に `// TODO: メールサービス（Resend / SendGrid）を統合する` の記述あり。実際のメール送信はサービス契約・API キー取得後に統合する。

### #16 アフィリエイトリンク管理 — プレースホルダのみ

`lib/affiliate.ts` の構造・型定義・ガード節は完成済み。現在は `hokengarden_nenkin`（example.com URL）の 1 件のみ登録されている。ASP 案件の契約・リンク発行後に実データを追加する運用タスク。

---

## 依存関係図

```
即時着手可能（並行可能）:
  #13 JSON-LD（FAQPage 統合）
  #14 OG画像（デザイン反映）──→ #25 バリデーション
  #15 sitemap（動的URL生成）

全コードイシュー ──→ #22 Vercel デプロイ
```

---

## コンフリクト発生リスク

| ファイル | 関連イシュー | リスク | 対策 |
|---------|-------------|:------:|------|
| `app/api/og/route.tsx` | #14, #25 | **中** | #14 → #25 の順 |

---

## 推奨着手順序

1. **#15（sitemap）を最優先**。実装量が少なく SEO への影響が大きい。検索エンジンが記事を発見できるようになる
2. **#14（OG画像）を着手**。SNS シェア時の見栄えに直結。DESIGN.md 仕様に沿ったブランディング
3. **#25（OGバリデーション）は #14 完成後に対応**。YMYL サイトとしてセキュリティ上重要
4. **#13（JSON-LD 統合）は優先度低め**。FAQPage の使用箇所がまだ少なく、実記事の増加に合わせて対応可能
5. **#22（Vercel デプロイ）は全体の最後**
