# アーキテクチャ図

> 最終更新: 2026-05-05

---

## 1. システム全体構成

```mermaid
graph TB
    subgraph External["外部サービス"]
        Vercel["Vercel<br/>(ホスティング)"]
        GA4["Google Analytics 4"]
        GSC["Google Search Console"]
        ASP["ASP<br/>(A8.net 等)"]
        MailAPI["メール送信API<br/>(Resend / SendGrid)"]
    end

    subgraph App["Next.js 15 App (App Router)"]
        Pages["ページ群"]
        API["API Routes"]
        Static["静的生成 (SSG)"]
    end

    subgraph Content["コンテンツ管理"]
        MDX["MDX 記事<br/>content/posts/"]
        Velite["Velite<br/>(ビルド時変換)"]
        Schema["スキーマバリデーション<br/>(frontmatter)"]
    end

    subgraph Infra["開発基盤"]
        GitHub["GitHub"]
        CI["GitHub Actions"]
        Scripts["運用スクリプト"]
    end

    MDX --> Velite
    Velite --> Schema
    Schema --> Static
    Static --> Pages
    Pages --> Vercel
    API --> Vercel
    Vercel --> GA4
    Vercel --> GSC
    API --> MailAPI
    Pages --> ASP
    GitHub --> CI
    CI --> Vercel
    Scripts --> MDX
```

---

## 2. ディレクトリ構造とレイヤー

```mermaid
graph LR
    subgraph Presentation["プレゼンテーション層"]
        direction TB
        AppDir["app/"]
        Components["components/"]
    end

    subgraph Domain["ドメイン層"]
        direction TB
        Lib["lib/"]
        ContentTypes["content-types/"]
    end

    subgraph Data["データ層"]
        direction TB
        Content["content/posts/ (MDX)"]
        VeliteGen[".velite/ (生成型)"]
    end

    subgraph Tooling["ツール層"]
        direction TB
        Scripts2["scripts/"]
        Config["設定ファイル群"]
    end

    Content --> VeliteGen
    VeliteGen --> Lib
    Lib --> Components
    Components --> AppDir
    ContentTypes --> Lib
    Scripts2 --> Content
```

---

## 3. ページルーティング構成

```mermaid
graph TD
    Root["/ (layout.tsx)"]

    Root --> SiteGroup["(site) グループ"]
    Root --> About["/about"]
    Root --> Privacy["/privacy"]
    Root --> Disclosure["/disclosure"]
    Root --> Contact["/contact"]
    Root --> Links["/links"]
    Root --> APIGroup["/api"]
    Root --> Sitemap["sitemap.xml"]
    Root --> Robots["robots.txt"]

    SiteGroup --> Home["/ トップページ"]
    SiteGroup --> PostDetail["/posts/[slug]<br/>記事詳細"]
    SiteGroup --> Category["/category/[slug]<br/>カテゴリ一覧"]
    SiteGroup --> Tags["/tags/[slug]<br/>タグ一覧"]

    APIGroup --> ContactAPI["/api/contact"]
    APIGroup --> OGAPI["/api/og"]

    style Home fill:#d4edda
    style PostDetail fill:#d4edda
    style Category fill:#fff3cd
    style Tags fill:#fff3cd
    style About fill:#fff3cd
    style Privacy fill:#fff3cd
    style Disclosure fill:#fff3cd
    style Contact fill:#fff3cd
    style Links fill:#fff3cd
    style ContactAPI fill:#fff3cd
    style OGAPI fill:#fff3cd
```

凡例: 🟢 実装済み / 🟡 スタブ・未完成

---

## 4. コンテンツパイプライン（ビルド時）

```mermaid
flowchart LR
    subgraph Author["執筆"]
        Write["MDX 記事作成"]
        NewPost["npm run new:post<br/>(ひな型生成)"]
    end

    subgraph Validate["バリデーション"]
        VeliteSchema["Velite スキーマ検証"]
        SourceCheck["出典URL死活確認<br/>npm run check:cite"]
        Lint["ESLint / type-check"]
    end

    subgraph Build["ビルド"]
        VeliteBuild["Velite ビルド<br/>(MDX → JSON)"]
        NextBuild["Next.js ビルド<br/>(SSG)"]
    end

    subgraph Output["出力"]
        HTML["静的 HTML"]
        JSONLD["JSON-LD 構造化データ"]
        OGImage["OGP 動的画像"]
        SitemapOut["sitemap.xml"]
    end

    NewPost --> Write
    Write --> VeliteSchema
    Write --> SourceCheck
    Write --> Lint
    VeliteSchema --> VeliteBuild
    Lint --> NextBuild
    VeliteBuild --> NextBuild
    NextBuild --> HTML
    NextBuild --> JSONLD
    NextBuild --> OGImage
    NextBuild --> SitemapOut
```

---

## 5. コンポーネント依存関係

```mermaid
graph TD
    subgraph Pages["ページ"]
        PostPage["posts/[slug]/page.tsx"]
        TopPage["(site)/page.tsx"]
        CategoryPage["category/[slug]/page.tsx"]
    end

    subgraph LayoutComp["レイアウトコンポーネント"]
        Header["Header.tsx"]
        Footer["Footer.tsx"]
        MobileNav["MobileNav.tsx"]
        Breadcrumb["Breadcrumb.tsx"]
    end

    subgraph MDXComp["MDX コンポーネント"]
        Citation["Citation.tsx"]
        Disclaimer["Disclaimer.tsx"]
        Callout["Callout.tsx"]
        PRBadge["PRBadge.tsx"]
        AffiliateCard["AffiliateCard.tsx"]
        ExpertCTA["ExpertCTA.tsx"]
    end

    subgraph ArticleComp["記事コンポーネント"]
        PostCard["PostCard.tsx"]
        PostList["PostList.tsx"]
    end

    subgraph LibLayer["lib/"]
        Affiliate["affiliate.ts"]
        SEO["seo.ts"]
        JsonLD["jsonld.ts"]
        Navigation["navigation.ts"]
    end

    subgraph UI["shadcn/ui"]
        Card["Card"]
        Button["Button"]
        Badge["Badge"]
        Drawer["Drawer"]
    end

    PostPage --> Citation
    PostPage --> Disclaimer
    PostPage --> Callout
    PostPage --> PRBadge
    PostPage --> AffiliateCard
    PostPage --> ExpertCTA
    PostPage --> SEO
    PostPage --> JsonLD

    TopPage --> PostCard
    TopPage --> PostList
    CategoryPage --> PostCard

    AffiliateCard --> Affiliate
    Header --> Navigation
    Footer --> Navigation
    MobileNav --> Drawer
    PostCard --> Card
    PostCard --> Badge
    AffiliateCard --> Card
    AffiliateCard --> Button
```

---

## 6. データフロー（ランタイム）

```mermaid
flowchart TD
    subgraph User["ユーザー"]
        Browser["ブラウザ"]
    end

    subgraph Vercel2["Vercel Edge Network"]
        CDN["CDN キャッシュ"]
        ServerlessFunc["Serverless Functions"]
    end

    subgraph NextApp["Next.js App"]
        SSG["静的生成ページ<br/>(記事・カテゴリ・タグ)"]
        DynAPI["動的API"]
    end

    subgraph DynAPI
        OGRoute["/api/og<br/>OGP画像生成"]
        ContactRoute["/api/contact<br/>お問い合わせ"]
    end

    subgraph Analytics["計測"]
        VercelAnalytics["Vercel Analytics"]
        GA4Event["GA4 イベント"]
        AffClick["アフィリエイト<br/>クリック計測"]
    end

    Browser -->|リクエスト| CDN
    CDN -->|キャッシュHIT| Browser
    CDN -->|キャッシュMISS| SSG
    CDN -->|API呼び出し| ServerlessFunc
    ServerlessFunc --> OGRoute
    ServerlessFunc --> ContactRoute
    SSG --> Browser
    Browser --> VercelAnalytics
    Browser --> GA4Event
    Browser -->|リンククリック| AffClick
    AffClick --> GA4Event
    AffClick -->|遷移| ASP2["ASP 広告主LP"]
    ContactRoute -->|メール送信| Mail2["メールAPI"]
```

---

## 7. 集客・収益フロー

```mermaid
flowchart LR
    subgraph Traffic["集客チャネル"]
        SEOSearch["Google 検索<br/>(SEO)"]
        TikTok["TikTok"]
        YouTube["YouTube Shorts"]
        Instagram["Instagram Reels"]
        LINE["LINE 公式"]
    end

    subgraph Site["サイト"]
        Blog["ブログ記事"]
        LinkHub["/links ハブ"]
        VideoSupplement["動画補足記事"]
    end

    subgraph Revenue["収益化"]
        AffLink["アフィリエイトリンク<br/>(AffiliateCard)"]
        ExpertConsult["専門家相談<br/>(ExpertCTA)"]
        LINEReg["LINE 登録誘導"]
    end

    subgraph Outcome["成果"]
        ASPReward["ASP 報酬発生"]
        LINEFriend["LINE 友だち増"]
    end

    SEOSearch --> Blog
    TikTok --> LinkHub
    YouTube --> LinkHub
    Instagram --> LinkHub
    LinkHub --> Blog
    LinkHub --> LINEReg
    TikTok --> VideoSupplement
    YouTube --> VideoSupplement
    VideoSupplement --> Blog
    LINE -->|ステップ配信| Blog

    Blog --> AffLink
    Blog --> ExpertConsult
    Blog --> LINEReg
    AffLink --> ASPReward
    ExpertConsult --> ASPReward
    LINEReg --> LINEFriend
    LINEFriend -->|継続接点| Blog
```

---

## 8. SEO / YMYL 信頼性アーキテクチャ

```mermaid
graph TD
    subgraph YMYL["YMYL 信頼性要件"]
        AuthorInfo["著者情報<br/>(About ページ)"]
        Sources["出典明示<br/>(Citation)"]
        Updated["最終更新日<br/>(Git commit)"]
        Expert["専門家相談誘導<br/>(ExpertCTA)"]
        DisclaimerBlock["免責表記<br/>(Disclaimer)"]
    end

    subgraph StructuredData["構造化データ出力"]
        ArticleSD["Article JSON-LD"]
        BreadcrumbSD["BreadcrumbList"]
        OrgSD["Organization"]
        FAQSD["FAQPage (任意)"]
    end

    subgraph Meta["メタ情報"]
        OGP["OGP タグ"]
        TwitterCard["Twitter Card"]
        Canonical["canonical URL"]
        RobotsTag["robots meta"]
    end

    subgraph Compliance["法的順守"]
        PRMark["PR 表記<br/>(景表法)"]
        NoAdvice["個別助言禁止<br/>(業法)"]
        SourceReq["出典必須<br/>(著作権法)"]
    end

    AuthorInfo --> ArticleSD
    Sources --> ArticleSD
    Updated --> ArticleSD
    ArticleSD --> OGP
    ArticleSD --> TwitterCard
    Canonical --> OGP
    PRMark --> PRBadge2["PRBadge 自動挿入"]
    SourceReq --> Citation2["Citation 必須化"]
    NoAdvice --> Expert
    Expert --> DisclaimerBlock
```

---

## 9. デプロイメントフロー

```mermaid
flowchart LR
    subgraph Dev["開発"]
        Local["ローカル開発<br/>npm run dev"]
        Commit["git commit"]
    end

    subgraph CI2["CI/CD"]
        Push["git push"]
        GHA["GitHub Actions"]
        Checks["lint + type-check<br/>+ check:cite"]
    end

    subgraph Deploy["デプロイ"]
        Preview["Vercel Preview<br/>(PR ごと)"]
        Production["Vercel Production<br/>(main マージ)"]
    end

    subgraph Monitor["監視"]
        LH["Lighthouse CI"]
        GSC2["Search Console"]
        VA["Vercel Analytics"]
    end

    Local --> Commit
    Commit --> Push
    Push --> GHA
    GHA --> Checks
    Checks -->|PR| Preview
    Checks -->|main| Production
    Production --> LH
    Production --> GSC2
    Production --> VA
```

---

## 10. 技術スタック一覧

| レイヤー | 技術 | 用途 |
|---------|------|------|
| フレームワーク | Next.js 15 (App Router) | SSG + API Routes |
| 言語 | TypeScript (strict) | 型安全性 |
| スタイル | Tailwind CSS v4 | ユーティリティCSS |
| UI | shadcn/ui | 再利用可能コンポーネント |
| コンテンツ | MDX + Velite | 型安全な記事管理 |
| フォント | Noto Sans JP + Geist | 日本語 + 英数字 |
| ホスティング | Vercel | エッジ配信 + Serverless |
| 解析 | Vercel Analytics + GA4 | トラフィック計測 |
| 検索 | Google Search Console | インデックス管理 |
| メール | Resend / SendGrid | お問い合わせ送信 |
| CI/CD | GitHub Actions | 自動テスト + デプロイ |
| OGP | @vercel/og (next/og) | 動的OG画像 |
