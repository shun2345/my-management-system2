import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { posts } from '@/.velite'
import { PostList } from '@/components/article'
import { Breadcrumb } from '@/components/layout/Breadcrumb'
import { generateSeoMetadata } from '@/lib/seo'
import {
  SLUG_TO_CATEGORY,
  CATEGORY_DESCRIPTIONS,
} from '@/lib/navigation'

type Props = {
  params: Promise<{ slug: string }>
}

export function generateStaticParams() {
  return Object.keys(SLUG_TO_CATEGORY).map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const label = SLUG_TO_CATEGORY[slug]

  if (!label) return {}

  return generateSeoMetadata({
    title: `${label}の記事一覧`,
    description:
      CATEGORY_DESCRIPTIONS[slug] ??
      `${label}に関する公的制度や一般情報の記事一覧です`,
    path: `/category/${slug}`,
  })
}

export default async function CategoryPage({ params }: Props) {
  const { slug } = await params
  const label = SLUG_TO_CATEGORY[slug]

  if (!label) notFound()

  const categoryPosts = [...posts]
    .filter((p) => p.category === label)
    .sort(
      (a, b) =>
        new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
    )

  return (
    <div className="mx-auto max-w-4xl px-4 py-12">
      <Breadcrumb
        items={[
          { label: 'ホーム', href: '/' },
          { label: `${label}の記事一覧` },
        ]}
      />
      <h1 className="text-2xl font-semibold">{label}の記事一覧</h1>
      <p className="mt-2 text-muted-foreground">
        {CATEGORY_DESCRIPTIONS[slug]}
      </p>
      <div className="mt-8">
        <PostList
          posts={categoryPosts}
          layout="list"
          emptyMessage={`${label}の記事を準備中です`}
        />
      </div>
    </div>
  )
}
