import type { Metadata } from 'next'
import { generateSeoMetadata } from '@/lib/seo'
import { Breadcrumb } from '@/components/layout/Breadcrumb'
import { ContactForm } from '@/components/contact/ContactForm'

export const metadata: Metadata = generateSeoMetadata({
  title: 'お問い合わせ',
  description:
    '当サイトへのお問い合わせはこちらのフォームからお送りください',
  path: '/contact',
})

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12">
      <Breadcrumb
        items={[
          { label: 'ホーム', href: '/' },
          { label: 'お問い合わせ' },
        ]}
      />

      <h1 className="mt-4 text-2xl font-semibold">お問い合わせ</h1>

      <p className="mt-4 leading-relaxed text-foreground/80">
        当サイトに関するご意見・ご質問・記事内容の誤りのご指摘など、お気軽にお問い合わせください。
      </p>
      <p className="mt-3 text-sm text-muted-foreground">
        ※ 個別の介護・相続・税務・法律に関するご相談には対応しておりません。具体的なご相談は各分野の専門家にお問い合わせください。
      </p>

      <div className="mt-8">
        <ContactForm />
      </div>
    </div>
  )
}
