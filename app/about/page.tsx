import type { Metadata } from 'next'
import { generateSeoMetadata } from '@/lib/seo'

export const metadata: Metadata = generateSeoMetadata({
  title: '運営者情報',
  description: '当サイトの運営者情報です',
  path: '/about',
})

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12">
      <h1 className="text-2xl font-semibold">運営者情報</h1>
      <p className="mt-4 text-foreground/60">準備中です</p>
    </div>
  )
}
