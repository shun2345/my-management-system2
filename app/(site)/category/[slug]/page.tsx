import type { Metadata } from 'next'
import { generateSeoMetadata } from '@/lib/seo'

const CATEGORY_LABELS: Record<string, string> = {
  kaigo: '介護',
  souzoku: '相続',
  shukatsu: '終活',
  okane: 'お金',
}

type Props = {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const label = CATEGORY_LABELS[slug] ?? slug

  return generateSeoMetadata({
    title: `${label}の記事一覧`,
    description: `${label}に関する公的制度や一般情報の記事一覧です`,
    path: `/category/${slug}`,
  })
}

export default async function CategoryPage({ params }: Props) {
  const { slug } = await params

  return (
    <div className="mx-auto max-w-3xl px-4 py-12">
      <h1 className="text-2xl font-semibold">
        カテゴリ: {CATEGORY_LABELS[slug] ?? slug}
      </h1>
      <p className="mt-4 text-foreground/60">カテゴリ一覧ページ（準備中）</p>
    </div>
  )
}
