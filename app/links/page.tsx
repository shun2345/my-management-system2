import type { Metadata } from 'next'
import { generateSeoMetadata } from '@/lib/seo'

export const metadata: Metadata = generateSeoMetadata({
  title: 'リンク集',
  description: 'SNS・LINE公式アカウント・主要コンテンツへのリンク一覧です',
  path: '/links',
})

export default function LinksPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12">
      <h1 className="font-heading text-2xl font-semibold">リンク集</h1>
      <p className="mt-4 text-foreground/60">準備中です</p>
    </div>
  )
}
