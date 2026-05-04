import type { Metadata } from 'next'
import { generateSeoMetadata } from '@/lib/seo'

type Props = {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params

  return generateSeoMetadata({
    title: `「${slug}」の記事一覧`,
    description: `「${slug}」タグが付いた記事の一覧です`,
    path: `/tags/${slug}`,
  })
}

export default async function TagPage({ params }: Props) {
  const { slug } = await params

  return (
    <div className="mx-auto max-w-3xl px-4 py-12">
      <h1 className="text-2xl font-semibold">タグ: {slug}</h1>
      <p className="mt-4 text-foreground/60">タグ一覧ページ（準備中）</p>
    </div>
  )
}
