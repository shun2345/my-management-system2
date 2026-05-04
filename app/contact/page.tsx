import type { Metadata } from 'next'
import { generateSeoMetadata } from '@/lib/seo'

export const metadata: Metadata = generateSeoMetadata({
  title: 'お問い合わせ',
  description: '当サイトへのお問い合わせはこちらから',
  path: '/contact',
})

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12">
      <h1 className="text-2xl font-semibold">お問い合わせ</h1>
      <p className="mt-4 text-foreground/60">準備中です</p>
    </div>
  )
}
