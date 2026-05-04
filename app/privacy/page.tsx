import type { Metadata } from 'next'
import { generateSeoMetadata } from '@/lib/seo'

export const metadata: Metadata = generateSeoMetadata({
  title: 'プライバシーポリシー',
  description: '当サイトのプライバシーポリシーについて説明しています',
  path: '/privacy',
})

export default function PrivacyPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12">
      <h1 className="text-2xl font-semibold">プライバシーポリシー</h1>
      <p className="mt-4 text-foreground/60">準備中です</p>
    </div>
  )
}
