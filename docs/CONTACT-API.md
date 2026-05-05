# お問い合わせシステム設計書

## 1. 概要

サイト訪問者が運営者に問い合わせを送信するための仕組み。
フロントエンドのフォーム（`ContactForm`）からAPIルート（`POST /api/contact`）を呼び出し、
Resend を経由して運営者への通知メールと送信者への自動返信メールを送る。

一般公開のエンドポイントになるため、複数のセキュリティレイヤーで保護する。

---

## 2. システム構成図

```
┌─────────────────────────────────────────────────┐
│  ブラウザ (ContactForm)                          │
│  POST /api/contact                              │
│  Content-Type: application/json                 │
│  Origin: https://example.com                    │
│  Body: { name, email, subject, body, _hp }      │
└───────────────────┬─────────────────────────────┘
                    │
                    ▼
┌─────────────────────────────────────────────────┐
│  API Route (app/api/contact/route.ts)           │
│                                                 │
│  ① Origin検証 ─── 不一致 → 403                  │
│       │                                         │
│       ▼                                         │
│  ② レートリミット ─ 超過 → 429 + Retry-After     │
│       │                                         │
│       ▼                                         │
│  ③ Zodバリデーション ─ 不正 → 400               │
│       │                                         │
│       ▼                                         │
│  ④ ハニーポット判定 ─ ボット → 200 (静かに無視)  │
│       │                                         │
│       ▼                                         │
│  ⑤ メール送信 (Resend)                          │
│     ├─ 運営者通知メール                          │
│     └─ 自動返信メール                            │
│       │                                         │
│       ▼                                         │
│  成功 → 200 { success: true }                   │
│  失敗 → 500 { errors: [...] }                   │
└─────────────────────────────────────────────────┘
```

---

## 3. ファイル構成

| ファイル | 役割 |
|---|---|
| `app/contact/page.tsx` | お問い合わせページ（Server Component） |
| `components/contact/ContactForm.tsx` | フォームUI（Client Component） |
| `app/api/contact/route.ts` | APIルートハンドラ（POST のみ） |
| `lib/validations/contact.ts` | Zodバリデーションスキーマ |
| `lib/rate-limit.ts` | インメモリレートリミッター |
| `lib/origin-check.ts` | Originヘッダー検証 |
| `lib/email.ts` | Resendメール送信 |
| `lib/constants.ts` | `BASE_URL` 定義（Origin検証で参照） |

---

## 4. API仕様

### エンドポイント

```
POST /api/contact
```

POST 以外のメソッドは Next.js が自動的に `405 Method Not Allowed` を返す。

### リクエスト

**Headers**

| ヘッダー | 必須 | 説明 |
|---|---|---|
| `Content-Type` | Yes | `application/json` |
| `Origin` | Yes | `BASE_URL` と一致するオリジン |

**Body**

```json
{
  "name": "山田 太郎",
  "email": "taro@example.com",
  "subject": "記事の内容について",
  "body": "介護保険の記事で気になった点があります...",
  "_hp": ""
}
```

| フィールド | 型 | 制約 | 説明 |
|---|---|---|---|
| `name` | string | 1〜100文字 | 送信者名 |
| `email` | string | メール形式 | 送信者メールアドレス |
| `subject` | string | 1〜200文字 | 件名 |
| `body` | string | 10〜5000文字 | 問い合わせ本文 |
| `_hp` | string | 0文字（空文字） | ハニーポット。通常ユーザーは空のまま送信 |

### レスポンス

**成功 (200)**

```json
{ "success": true }
```

**エラー**

| Status | 条件 | レスポンス例 |
|---|---|---|
| 400 | JSON パース失敗 / バリデーションエラー | `{ "errors": ["お名前は1〜100文字で入力してください"] }` |
| 403 | Origin 不一致 / Origin ヘッダーなし | `{ "errors": ["不正なリクエストです"] }` |
| 429 | レートリミット超過 | `{ "errors": ["送信回数の上限に達しました..."] }` |
| 500 | メール送信失敗 | `{ "errors": ["送信に失敗しました..."] }` |

429 レスポンスには `Retry-After` ヘッダー（秒数）が付与される。

---

## 5. セキュリティ設計

### 5.1 セキュリティレイヤー一覧

リクエストは以下の順序で検証される。コストの低い検証を先に実行し、
不正リクエストを早期に排除する。

| 順序 | レイヤー | 防御対象 | 実装箇所 |
|---|---|---|---|
| 0 | Same-Origin Policy | 他サイトからのブラウザリクエスト | ブラウザ標準機能 |
| 1 | Origin検証 | Origin偽装・ヘッダー欠落 | `lib/origin-check.ts` |
| 2 | レートリミット | 連続送信・DoS | `lib/rate-limit.ts` |
| 3 | Zodバリデーション | 不正・過大入力 | `lib/validations/contact.ts` |
| 4 | ハニーポット | 単純なボット | フォーム + APIルート |

### 5.2 Origin検証

```typescript
// lib/origin-check.ts
import { BASE_URL } from '@/lib/constants'

const ALLOWED_ORIGINS = [new URL(BASE_URL).origin]
// 開発環境では http://localhost:3000 も許可
```

- `Origin` ヘッダーが存在しない、または許可リストに含まれない場合は `403` を返す
- ブラウザの Same-Origin Policy と組み合わせて CSRF を防止する
- `curl` 等で `Origin` を偽装するリクエストは防げないが、カジュアルな不正利用を排除する

### 5.3 レートリミッター

```
制限値: 3リクエスト / 60秒 / IPアドレス
```

- `x-forwarded-for` ヘッダーの先頭IPを使用（Vercel等リバースプロキシ経由を想定）
- インメモリ `Map` で管理。Vercel サーバーレス環境ではインスタンス単位の制限となる
  （厳密なグローバル制限が必要な場合は Upstash Redis 等の外部ストアに置き換える）
- 5分間隔で期限切れエントリを自動クリーンアップし、メモリリークを防止する

**ウィンドウ方式**: 固定ウィンドウ（Fixed Window）。最初のリクエスト時刻から60秒間を
1ウィンドウとし、ウィンドウ内のカウントが `MAX_REQUESTS` に達するとリクエストを拒否する。

### 5.4 バリデーション（Zod）

`lib/validations/contact.ts` で定義した `contactSchema` でサーバーサイドバリデーションを行う。
フロントエンドの HTML バリデーション (`required`, `maxLength` 等) はUX向上のための補助であり、
セキュリティ上の境界はサーバー側の Zod バリデーションが担う。

### 5.5 ハニーポット

- フォームに `_hp` という隠しフィールドを配置する
- `aria-hidden="true"`, `tabIndex={-1}`, 画面外配置 (`absolute -left-[9999px]`) により
  通常ユーザーには見えず入力もできない
- ボットがフォームの全フィールドを機械的に埋めると `_hp` に値が入る
- 値が入っている場合、API は `200 { success: true }` を返してボットに成功を装い、
  メール送信は行わない

---

## 6. メール送信仕様

### 6.1 使用サービス

[Resend](https://resend.com) を使用。`resend` npm パッケージ経由で API を呼び出す。

Resend クライアントはビルド時エラーを避けるため、モジュールレベルではなく
関数内で遅延初期化する（`getResend()`）。

### 6.2 送信メール一覧

1通の問い合わせにつき 2通のメールを送信する。

#### 運営者通知メール

| 項目 | 値 |
|---|---|
| From | `CONTACT_FROM_EMAIL` |
| To | `CONTACT_TO_EMAIL` |
| Reply-To | 送信者のメールアドレス |
| Subject | `[お問い合わせ] {件名}` |
| Format | プレーンテキスト |

本文:
```
お問い合わせを受信しました。

お名前: {name}
メールアドレス: {email}
件名: {subject}

--- お問い合わせ内容 ---
{body}
--- ここまで ---
```

`Reply-To` に送信者のアドレスを設定するため、運営者はメーラーから直接返信できる。

#### 自動返信メール

| 項目 | 値 |
|---|---|
| From | `CONTACT_FROM_EMAIL` |
| To | 送信者のメールアドレス |
| Subject | `【実家のしらべ】お問い合わせを受け付けました` |
| Format | プレーンテキスト |

本文:
```
{name} 様

お問い合わせいただきありがとうございます。
以下の内容で受け付けました。内容を確認のうえ、ご連絡いたします。

件名: {subject}
お問い合わせ内容:
{body}

---
※このメールは自動送信です。
※本メールに直接ご返信いただくことはできません。
※本サイトは情報提供を目的としており、個別の状況に応じた助言は専門家にご相談ください。
```

### 6.3 エラーハンドリング

- 通知メールの送信失敗時: 例外を throw し、API は `500` を返す
- 自動返信メールの送信失敗時: 同様に例外を throw し、API は `500` を返す
- エラー詳細は `console.error` でサーバーログに記録する。ユーザーには汎用メッセージのみ返す

---

## 7. フロントエンド仕様

### 7.1 ContactForm コンポーネント

**パス**: `components/contact/ContactForm.tsx`

Client Component（`'use client'`）。フォームの状態管理とAPI通信を担う。

**状態遷移**:

```
idle ──(送信)──→ submitting ──(成功)──→ success
                     │                     │
                     └──(失敗)──→ error     │
                                   │       │
                                   └─(再試行)→ idle ←─(新しいお問い合わせ)─┘
```

| 状態 | UI表示 |
|---|---|
| `idle` | 入力フォーム |
| `submitting` | 送信ボタンが「送信中...」に変わり disabled |
| `success` | チェックマークアイコン + 完了メッセージ + 「新しいお問い合わせ」ボタン |
| `error` | フォーム + エラーメッセージ（API レスポンスの `errors` を表示） |

### 7.2 フォームフィールド

| フィールド | type | HTML バリデーション | 備考 |
|---|---|---|---|
| お名前 | text | `required`, `maxLength={100}` | `autoComplete="name"` |
| メールアドレス | email | `required` | `autoComplete="email"` |
| 件名 | text | `required`, `maxLength={200}` | |
| お問い合わせ内容 | textarea | `required`, `minLength={10}`, `maxLength={5000}` | 6行表示 |
| _hp (ハニーポット) | text (hidden) | なし | ユーザーには非表示 |

---

## 8. 環境変数

| 変数名 | 必須 | 説明 | 例 |
|---|---|---|---|
| `RESEND_API_KEY` | Yes | Resend の API キー | `re_xxxxxxxxxxxx` |
| `CONTACT_TO_EMAIL` | Yes | 問い合わせ受信先（運営者メール） | `admin@example.com` |
| `CONTACT_FROM_EMAIL` | No | 送信元アドレス（デフォルト: `noreply@example.com`） | `noreply@example.com` |
| `NEXT_PUBLIC_SITE_URL` | Yes | Origin検証で使用するサイトURL | `https://example.com` |

`CONTACT_FROM_EMAIL` は Resend で認証済みのドメインのアドレスを指定する必要がある。

---

## 9. デプロイ時の設定手順

1. [Resend](https://resend.com) でアカウントを作成し、送信元ドメインを認証する
2. Resend ダッシュボードで API キーを発行する
3. Vercel の環境変数に以下を設定する:
   - `RESEND_API_KEY`
   - `CONTACT_TO_EMAIL`
   - `CONTACT_FROM_EMAIL`（認証済みドメインのアドレス）
   - `NEXT_PUBLIC_SITE_URL`（本番ドメイン）
4. デプロイ後、フォームからテスト送信して通知メール・自動返信メールが届くことを確認する

---

## 10. 制限事項と今後の拡張候補

### 現在の制限事項

- **レートリミットがインスタンス単位**: Vercel サーバーレス環境ではリクエストごとに
  異なるインスタンスで処理される可能性があるため、レートリミットが厳密に機能しない場合がある
- **メール送信の冪等性なし**: 同一内容の重複送信を防ぐ仕組みはない
- **添付ファイル非対応**: 現在はテキストのみ

### 拡張候補（必要に応じて検討）

| 拡張項目 | 説明 |
|---|---|
| Upstash Redis レートリミット | グローバルなレートリミットが必要な場合に `@upstash/ratelimit` へ置き換え |
| Turnstile / reCAPTCHA | 高度なボット対策が必要になった場合の CAPTCHA 導入 |
| メール送信のリトライ | 一時的な Resend API エラーに対するリトライ機構 |
| 管理画面 | 問い合わせ履歴の一覧・ステータス管理 |
| Slack / Discord 通知 | メールに加えてチャットツールへの即時通知 |
