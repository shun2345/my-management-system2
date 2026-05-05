import type { Metadata } from 'next'
import Link from 'next/link'
import { generateSeoMetadata } from '@/lib/seo'
import { Breadcrumb } from '@/components/layout/Breadcrumb'
import { SITE_NAME } from '@/lib/constants'

export const metadata: Metadata = generateSeoMetadata({
  title: 'プライバシーポリシー',
  description:
    '当サイトにおける個人情報の取り扱い・アクセス解析・Cookieの利用について説明しています',
  path: '/privacy',
})

export default function PrivacyPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12">
      <Breadcrumb
        items={[
          { label: 'ホーム', href: '/' },
          { label: 'プライバシーポリシー' },
        ]}
      />

      <h1 className="mt-4 font-heading text-2xl font-semibold">プライバシーポリシー</h1>

      <p className="mt-4 text-sm text-muted-foreground">
        施行日: 2026年5月5日
      </p>

      <div className="mt-8 space-y-10">
        {/* 個人情報の取り扱い */}
        <section>
          <h2 className="font-heading text-xl font-semibold">個人情報の取り扱い</h2>
          <p className="mt-3 leading-relaxed text-foreground/80">
            {SITE_NAME}
            （以下「当サイト」）は、お問い合わせやサービスのご利用を通じて取得する個人情報について、適切な管理と保護に努めます。
          </p>
        </section>

        {/* アクセス解析ツール */}
        <section>
          <h2 className="font-heading text-xl font-semibold">アクセス解析ツール</h2>
          <p className="mt-3 leading-relaxed text-foreground/80">
            当サイトでは、サイトの利用状況を把握するため、以下のアクセス解析ツールを利用しています。
          </p>
          <ul className="mt-4 list-inside list-disc space-y-2 text-foreground/80">
            <li>
              <span className="font-medium">Google アナリティクス 4（GA4）</span>
              : Google LLC が提供するアクセス解析サービスです。Cookie
              を使用してデータを収集しますが、個人を特定する情報は含みません。詳細は
              <a
                href="https://policies.google.com/privacy"
                target="_blank"
                rel="noopener noreferrer"
                className="text-brand-navy dark:text-primary underline underline-offset-4 hover:opacity-80"
              >
                Google のプライバシーポリシー
              </a>
              をご確認ください。
            </li>
            <li>
              <span className="font-medium">Vercel Analytics</span>:
              Vercel Inc.
              が提供するパフォーマンス計測サービスです。個人を特定する情報は収集しません。
            </li>
          </ul>
        </section>

        {/* Cookie の利用 */}
        <section>
          <h2 className="font-heading text-xl font-semibold">Cookie の利用</h2>
          <p className="mt-3 leading-relaxed text-foreground/80">
            当サイトでは、アクセス解析およびサイトの利便性向上のために Cookie
            を使用しています。ブラウザの設定により Cookie
            の受け入れを拒否することも可能ですが、一部の機能が正常に動作しない場合があります。
          </p>
        </section>

        {/* 個人情報の利用目的 */}
        <section>
          <h2 className="font-heading text-xl font-semibold">個人情報の利用目的</h2>
          <p className="mt-3 leading-relaxed text-foreground/80">
            当サイトでは、以下の目的で個人情報を利用することがあります。
          </p>
          <ul className="mt-4 list-inside list-disc space-y-2 text-foreground/80">
            <li>お問い合わせへの回答</li>
            <li>サイト運営に関するご連絡</li>
            <li>サイトの改善および新機能の検討</li>
          </ul>
        </section>

        {/* 第三者提供 */}
        <section>
          <h2 className="font-heading text-xl font-semibold">第三者提供</h2>
          <p className="mt-3 leading-relaxed text-foreground/80">
            当サイトは、法令に基づく場合を除き、ご本人の同意なく個人情報を第三者に提供することはありません。
          </p>
        </section>

        {/* お問い合わせ窓口 */}
        <section>
          <h2 className="font-heading text-xl font-semibold">お問い合わせ窓口</h2>
          <p className="mt-3 leading-relaxed text-foreground/80">
            個人情報の取り扱いに関するお問い合わせは、
            <Link
              href="/contact"
              className="text-brand-navy dark:text-primary underline underline-offset-4 hover:opacity-80"
            >
              お問い合わせページ
            </Link>
            よりご連絡ください。
          </p>
        </section>

        {/* ポリシーの変更 */}
        <section>
          <h2 className="font-heading text-xl font-semibold">ポリシーの変更</h2>
          <p className="mt-3 leading-relaxed text-foreground/80">
            当サイトは、必要に応じて本プライバシーポリシーの内容を変更することがあります。変更後のポリシーは、当ページに掲載した時点から効力を生じるものとします。
          </p>
        </section>
      </div>
    </div>
  )
}
