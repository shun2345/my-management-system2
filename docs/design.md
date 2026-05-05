# DESIGN.md

実家のしらべ のデザインシステム定義書。
ブランド・ロゴ・カラー・タイポグラフィ・コンポーネント・SNS用ビジュアルまで、サイト全体のビジュアルに関わる決定事項をすべてここに集約する。

このドキュメントは [CLAUDE.md](../CLAUDE.md) の補助文書であり、Claude Code がスタイル・色・余白・フォントの判断に迷ったときは、まずここを参照する。CLAUDE.md と矛盾する指示があった場合は CLAUDE.md を優先する。

---

## 1. ブランドの基本

### 1.1 サイト名

- 正式名: **実家のしらべ**
- ローマ字: **JIKKA NO SHIRABE**
- 読み: じっかのしらべ
- ハンドル: `@jikka_shirabe`(全SNS統一、LINE公式は `@jikkashirabe`)

### 1.2 タグライン

- メイン: **親と家族の備え帖**
- サブ: 介護・相続・終活・お金を、公的制度で整理するメディア

### 1.3 ブランドの3つの約束(デザインに反映する原則)

1. **整理者ポジション**: 派手な装飾、扇情的な色使い、感情訴求を避ける。情報を整理して提示する書物のような佇まい
2. **YMYL信頼感**: 軽すぎない配色、引用と出典の視認性、白に近い背景での可読性を優先
3. **40〜50代女性への親しみ**: 紺一色の冷たさを避け、生成りの温かみと朱の差し色で柔らかさを保つ

---

## 2. ロゴシステム

### 2.1 ロゴのバリエーション

3方向のロゴラフを `docs/assets/logo/` に配置。媒体ごとに使い分ける。

| バリエーション | ファイル | 用途 |
|---|---|---|
| プライマリ(栞+家) | `logo-primary.svg` | サイトヘッダー、SNSアイコン、ファビコン、短尺動画 |
| メロディ版 | `logo-melody.svg` | OG画像、ブログ記事のヘッダーバナー |
| 縦組み和書版 | `logo-tategumi.svg` | 書籍化・PDF表紙・長尺YouTubeオープニング |

**プライマリロゴが第一選択**。SNSや動画で常に使うのはこれ。他バリエーションは、媒体特性が合うときに選択的に使う。

### 2.2 シンボルマーク(ファビコン用)

プライマリロゴから「家+栞リボン」のシンボル部分のみを切り出したものを `logo-symbol.svg` として保管する。以下のサイズで書き出す:

- favicon: 16×16 / 32×32 / 48×48 px(ICOにまとめる)
- Apple Touch Icon: 180×180 px
- Android Chrome: 192×192 / 512×512 px
- SNSアイコン: 400×400 px(中央にシンボル、周囲は生成り背景)

### 2.3 ロゴのクリアスペース

ロゴの周囲には、栞リボンの幅と同等の余白を必ず確保する。他要素と密着させない。

### 2.4 最小サイズ

- 横組みロゴ: 横幅 120px 以上
- シンボル単独: 24px 以上(これより小さい場合は使わない)

### 2.5 禁止事項

- ロゴの色変更(指定パレット外の色を当てない)
- 縦横比の変更、傾き、影付け、グラデーション追加
- 背景写真の上に直接配置(必ず単色プレートを下に敷く)
- 日本語タイトル部分のみの抽出使用(シンボルとセットで運用)

---

## 3. カラーシステム

### 3.1 ブランドカラー

| 名称 | HEX | RGB | 用途 |
|---|---|---|---|
| Brand Navy | `#1a3a5c` | 26, 58, 92 | プライマリ。見出し、ロゴ、リンク、ボタン |
| Cream | `#f5ede0` | 245, 237, 224 | ベース背景、温かみのある面 |
| Vermilion | `#c1492f` | 193, 73, 47 | アクセント。栞、PRバッジ、警告 |
| Ink | `#1a1a1a` | 26, 26, 26 | 本文テキスト |
| Mist | `#e8e2d4` | 232, 226, 212 | 罫線、薄い区切り |

### 3.2 セマンティックカラー

| 用途 | 名称 | HEX |
|---|---|---|
| 成功・チェック | Success | `#3a6b4f` |
| 注意・警告 | Warning | `#b8821b` |
| 危険・エラー | Danger | `#a83030` |
| 情報・補足 | Info | `#3a5a7a` |
| サブテキスト | Muted | `#6b6b6b` |

警告・危険系は使用頻度を抑える。記事の主張を強くしすぎないため、Callout の warning は本当に必要な場面でのみ使う。

### 3.3 Tailwind トークン定義

`tailwind.config.ts` の `theme.extend.colors` に以下を反映する。

```ts
// tailwind.config.ts
export default {
  theme: {
    extend: {
      colors: {
        brand: {
          navy: '#1a3a5c',
          cream: '#f5ede0',
          vermilion: '#c1492f',
          ink: '#1a1a1a',
          mist: '#e8e2d4',
        },
        semantic: {
          success: '#3a6b4f',
          warning: '#b8821b',
          danger: '#a83030',
          info: '#3a5a7a',
          muted: '#6b6b6b',
        },
      },
    },
  },
}
```

### 3.4 shadcn/ui との整合

shadcn/ui のテーマ変数(`globals.css` の `:root` および `.dark`)に上記を反映する。

```css
:root {
  --background: 39 56% 92%;        /* cream #f5ede0 */
  --foreground: 0 0% 10%;          /* ink #1a1a1a */
  --primary: 211 56% 23%;          /* navy #1a3a5c */
  --primary-foreground: 39 56% 92%;
  --accent: 11 61% 47%;            /* vermilion #c1492f */
  --accent-foreground: 39 56% 92%;
  --muted: 38 31% 87%;             /* mist */
  --muted-foreground: 0 0% 42%;
  --border: 38 31% 87%;
  --ring: 211 56% 23%;
  --radius: 0.375rem;
}
```

### 3.5 ダークモード

ダークモードは実装済み。`globals.css` の `.dark` セレクタでカラートークンを再定義し、ThemeProvider（next-themes）経由で切り替える。各コンポーネントには `dark:` プレフィックスでダーク時のスタイルを指定している。

ダークモード時の留意点:
- Brand Vermilion はダーク背景でも視認性を保てるため、そのまま使用する
- Brand Cream を背景に使わず、ダーク用のベース色（`--background` で定義）を使う
- ロゴ・アイコンは明暗両対応のカラーで書き出すこと

### 3.6 コントラスト要件

すべてのテキスト・UI要素は WCAG AA(本文 4.5:1、大型文字 3:1)以上を満たす。本ブランドカラーの組み合わせの実測値:

| 前景 | 背景 | コントラスト比 | 用途可否 |
|---|---|---|---|
| Ink (#1a1a1a) | Cream (#f5ede0) | 14.2:1 | ◎ 本文OK |
| Navy (#1a3a5c) | Cream | 9.6:1 | ◎ 見出しOK |
| Vermilion (#c1492f) | Cream | 5.1:1 | ○ 本文OK |
| Cream | Navy | 9.6:1 | ◎ 反転OK |

---

## 4. タイポグラフィ

### 4.1 フォントファミリー

`next/font/google` で読み込み、`layout.tsx` で全体に適用する。

| 役割 | フォント | ウェイト |
|---|---|---|
| 本文(日) | Noto Sans JP | 400 / 500 / 700 |
| 本文(英) | Inter | 400 / 500 / 700 |
| 見出し(日) | Noto Serif JP | 600 / 700 |
| 見出し(英) | Georgia(system) | 600 / 700 |
| 数値・コード | JetBrains Mono | 400 / 500 |

```ts
// app/layout.tsx 抜粋
import { Noto_Sans_JP, Noto_Serif_JP, Inter } from 'next/font/google'

const notoSans = Noto_Sans_JP({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
  variable: '--font-sans',
  display: 'swap',
})
const notoSerif = Noto_Serif_JP({
  subsets: ['latin'],
  weight: ['600', '700'],
  variable: '--font-serif',
  display: 'swap',
})
```

### 4.2 タイプスケール

| 用途 | サイズ | line-height | weight | フォント |
|---|---|---|---|---|
| 記事タイトル(h1) | 32px / 28px(SP) | 1.4 | 700 | Serif |
| 大見出し(h2) | 24px / 22px(SP) | 1.5 | 700 | Serif |
| 中見出し(h3) | 20px / 18px(SP) | 1.5 | 600 | Serif |
| 小見出し(h4) | 17px | 1.6 | 600 | Sans |
| 本文 | 16px | 1.85 | 400 | Sans |
| 補足 | 14px | 1.7 | 400 | Sans |
| キャプション | 13px | 1.6 | 400 | Sans |

本文の line-height 1.85 は、CLAUDE.md の方針(1文を50字以内、段落は3〜5文)と組み合わせて、隙間時間にスマホで読む読者の負荷を下げるための設定。詰まった印刷物より、空気のあるWeb組版を優先する。

### 4.3 文字間(letter-spacing)

| 用途 | tracking |
|---|---|
| 日本語見出し | 0.05em |
| 日本語本文 | 0.02em |
| 英字大見出し・ロゴ周り | 0.1em〜0.2em |

日本語本文は詰めすぎない。長文記事を読み続ける読者の眼精疲労を軽減する。

### 4.4 見出しの装飾

記事本文（`.prose`）内の h2 には下線を付与し、セクションの区切りを明確にする:

```css
.prose h2 {
  border-bottom: 1px solid var(--border);
  padding-bottom: 0.4em;
}
```

h3 以下には装飾を付けない。

### 4.5 太字の使い方

太字(bold)は記事内で**1セクションあたり最大2箇所まで**。多用すると「全部重要」に見えて、本当に重要な箇所が埋もれる。CLAUDE.md の「断定表現を避ける」と通じる原則として、視覚的にも強調を抑制する。

---

## 5. レイアウト・グリッド

### 5.1 ブレイクポイント

Tailwind デフォルトに準拠:

- `sm`: 640px(タブレット縦)
- `md`: 768px(タブレット横)
- `lg`: 1024px(デスクトップ)
- `xl`: 1280px(ワイドデスクトップ)

設計の優先度はモバイルファースト。読者の主要デバイスはスマートフォン。

### 5.2 コンテナ最大幅

| ページ種別 | max-width | 備考 |
|---|---|---|
| 記事ページ外枠 | 960px | 本文+サイドバー（目次等）を含む |
| 記事本文（prose） | 720px | 1行40文字前後 |
| カテゴリ一覧・タグ一覧 | 960px | |
| トップページ | 1120px | |
| ランディング・LINE誘導・リンクハブ | 800px | `/links`含む |
| 固定ページ（About/Privacy/Disclosure/Contact） | 800px | |

記事本文の 720px は、1行あたり40文字前後に収めるための値。長すぎる行は読み戻りが起き、滞在時間と理解度を下げる。現在の実装ではサイドバーに目次を配置し、本文領域を実質的に制限している。

### 5.3 セクション余白

| 要素間 | 余白 |
|---|---|
| 大セクション間 | 64px / 48px(SP) |
| h2 とその上の段落 | 48px / 32px(SP) |
| h3 とその上の段落 | 32px / 24px(SP) |
| 段落と段落の間 | 16px |
| リストアイテム間 | 8px |

---

## 6. 共通コンポーネントのスタイル

CLAUDE.md セクション4の各 MDX コンポーネントに対応する具体的スタイル。

### 6.1 Citation(出典表示)

- ブロック版: 左側に `border-l-4 border-brand-navy/40`、背景 `bg-brand-cream/50`、padding 16px、フォントサイズ 14px
- インライン版: 上付き番号 + ホバーでツールチップ。番号は `text-brand-vermilion`
- アクセス日表記: `text-semantic-muted` で控えめに

### 6.2 AffiliateCard

- カード形状: 角丸 8px、`border border-brand-mist`、`shadow-sm`
- 内部: 左にサービスロゴ(80×80)、右にタイトル+概要+CTAボタン
- CTAボタン: `bg-brand-navy text-brand-cream`、ホバーで `bg-brand-navy/90`
- 上部に「PR」のラベル(`bg-brand-vermilion text-white text-xs`、4px×6px)を必ず表示

### 6.3 PRBadge

- 形状: `rounded-sm`（微小角丸）、`bg-brand-vermilion text-white`
- パディング: `px-2.5 py-1`、フォント `text-xs`（12px）、weight 700
- 配置: 記事タイトル直下、リード文より上に独立して表示

### 6.4 Disclaimer

- 背景: `bg-brand-mist/50`
- 罫線: `border-t border-b border-brand-mist`
- フォント: 13px、`text-semantic-muted`、line-height 1.7
- アイコン: 左に小さな書類アイコン(任意)

### 6.5 Callout

| type | 背景色 | アクセント線 | アイコン |
|---|---|---|---|
| info | `bg-semantic-info/8` | `border-l-semantic-info` | i |
| warning | `bg-semantic-warning/10` | `border-l-semantic-warning` | ! |
| tip | `bg-semantic-success/8` | `border-l-semantic-success` | ✓ |
| note | `bg-brand-mist/40` | `border-l-brand-navy/40` | ✎ |

### 6.6 ExpertCTA

- セクション形状: 横幅100%のフルバナー、padding 32px
- 背景: `bg-brand-navy text-brand-cream`
- 構成: 左にカテゴリアイコン、中央に見出し+説明文、右にボタン
- カテゴリ別アイコン: kaigo=家、souzoku=書類、shukatsu=花、okane=通帳

### 6.7 ボタン(shadcn/ui Button のバリアント)

| variant | 背景 | テキスト | 用途 |
|---|---|---|---|
| primary | brand-navy | brand-cream | メインCTA |
| secondary | brand-cream | brand-navy | サブCTA |
| accent | brand-vermilion | white | LINE登録など強調CTA |
| ghost | transparent | brand-navy | テキストリンク代替 |
| link | transparent | brand-vermilion(下線) | インラインリンク |

ボタンの角丸は 6px(`rounded-md`)で統一。完全な角丸(rounded-full)は使わない。

---

## 7. 画像・写真の方針

### 7.1 使用可能な画像ソース

- 自作のイラスト・図解
- 商用利用可・クレジット不要のフリー素材(Unsplash、Pexels、写真AC、いらすとや 等)
- 公的機関の図表(出典明記、引用要件遵守)
- 自作スクリーンショット(撮影日明記)

### 7.2 アイキャッチ画像

- サイズ: 1200×630 px(OGP兼用)
- 配置: タイトルテキスト + ロゴシンボル + カテゴリ色帯
- カテゴリ色帯:
  - 介護: Brand Navy
  - 相続: Vermilion
  - 終活: Ink
  - お金: 深緑(#2c5b4a)

`app/api/og/route.tsx` で動的生成し、すべての記事で統一フォーマットを保つ。

### 7.3 顔写真・人物写真

- 体験談を語らない方針(CLAUDE.md セクション1.4)に合わせて、特定人物の顔写真は基本的に使わない
- ストック写真の人物画像は「読者の状況」を象徴するシーン(高齢の手元、書類、家族の後ろ姿)に限定
- 個人を特定できる肖像は使わない

### 7.4 イラスト

- 2025年以降、AI生成イラストは出典・生成プロンプトを記録の上で限定使用
- いらすとや等の公共フリー素材は記事本文では使わない(プロフェッショナル感が損なわれるため)
- ただし図解・フロー図など機能目的のイラストは積極的に自作する

---

## 8. アクセシビリティ

### 8.1 必須要件

- すべての画像に意味のある `alt` テキスト(装飾画像は `alt=""`)
- フォーカスリングの可視化(Tailwind `focus-visible:ring-2 ring-brand-navy`)
- キーボード操作のみで全機能に到達可能
- 動画には字幕(YouTube自動字幕ではなく手動入稿)
- フォームには `<label>` を必ず関連付け
- 色だけで情報を伝えない(必ずテキストやアイコンを併用)

### 8.2 読みやすさ配慮

ターゲットの40〜50代は、老眼の影響で小さい文字や薄い色が読みにくくなる年代。以下を意識する:

- 本文は最低16px、可能なら17pxを基本に
- グレー系のサブテキストでも `#6b6b6b` 以上の濃さを保つ
- リンクは下線+色の二重表現
- 行間は1.85以上

---

## 9. 短尺動画・SNS用ビジュアル

### 9.1 短尺動画(TikTok / Reels / YouTube Shorts)

- アスペクト比: 9:16(1080×1920)
- セーフエリア: 上下それぞれ 240px(UIに隠れる範囲)
- ロゴ表示位置: 上端 中央、シンボル+タイトル横組み(白プレート上)
- テロップ:
  - フォント: Noto Sans JP Bold
  - 色: Cream の縁取り + Navy の塗り(背景に強い)
  - サイズ: 1行あたり最大15文字、画面幅の80%以内
- PR表記: 「PR」テロップを動画冒頭3秒以内、画面右上に常時表示

### 9.2 SNS投稿画像(静止画)

- Instagram フィード: 1080×1350 px(縦4:5)
- Instagram ストーリーズ / Threads: 1080×1920 px(9:16)
- X 画像: 1200×675 px(横16:9)

すべての投稿画像で、右下にロゴシンボル(80×80)を配置する。再投稿・スクショ拡散時にも出所が分かるようにする。

### 9.3 LINE公式リッチメニュー

- サイズ: 2500×1686 px(大)または 2500×843 px(小)
- 区画: 6分割を基本(介護/相続/終活/お金/最新記事/お問い合わせ)
- 各区画のアイコンとラベルは Brand Navy に統一、背景は Cream

### 9.4 OGP画像(動的生成)

- サイズ: 1200×630 px
- 構成:
  - 左上: ロゴシンボル+「実家のしらべ」横組み
  - 中央: 記事タイトル(最大2行、Noto Serif JP 700)
  - 下部: カテゴリラベル+著者名
  - 右下: ロゴシンボル
- 背景: Cream一色、上端にカテゴリ色の細帯

---

## 10. ファイル配置

```
docs/
├── DESIGN.md                    # 本ファイル
└── assets/
    ├── logo/
    │   ├── logo-primary.svg     # 栞+家(プライマリ)
    │   ├── logo-melody.svg      # メロディ版
    │   ├── logo-tategumi.svg    # 縦組み和書版
    │   ├── logo-symbol.svg      # シンボル単独
    │   ├── logo-mono.svg        # モノクロ版
    │   └── logo-reverse.svg     # 反転版(濃色背景用)
    ├── favicon/
    │   ├── favicon.ico
    │   ├── apple-touch-icon.png
    │   ├── icon-192.png
    │   └── icon-512.png
    └── og/
        └── og-template.png      # OGテンプレート画像
```

ロゴSVGは Git で管理し、PNG・ICOは生成スクリプト(`scripts/build-assets.ts`)で SVG から書き出す運用にする。

---

## 11. デザイン判断のチェックリスト

新しいページ・コンポーネント・SNS投稿を作るとき、以下を全項目満たすか確認する。

- [ ] 配色は本ドキュメントのパレット内に収まっている
- [ ] フォントは Noto Sans JP / Noto Serif JP / Inter のいずれか
- [ ] 本文の文字サイズは16px以上
- [ ] コントラスト比はWCAG AA以上
- [ ] 太字使用は1セクション2箇所以内
- [ ] 画像にはalt属性が付いている
- [ ] PR表記が必要な場合は冒頭に明示されている
- [ ] ロゴは指定の最小サイズを下回っていない
- [ ] フォーカスリングが見える状態を維持している
- [ ] ダークモード時のコントラストも確保されている（`dark:` バリアント付与）

---

## 12. 変更履歴

- 2026-MM-DD: 初版作成。プライマリロゴを栞+家に決定。Brand Navy / Cream / Vermilion を基本パレットに採用
- 2026-05-05: ダークモードを「実装済み」に変更。コンテナ最大幅を実装に合わせて詳細化。h2 下線スタイル・PRBadge の形状を実装準拠に更新