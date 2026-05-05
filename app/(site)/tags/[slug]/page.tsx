import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { posts } from '@/.velite'
import { PostList } from '@/components/article'
import { Breadcrumb } from '@/components/layout/Breadcrumb'
import { generateSeoMetadata } from '@/lib/seo'

type Props = {
  params: Promise<{ slug: string }>
}

export function generateStaticParams() {
  const allTags = new Set<string>()
  for (const post of posts) {
    for (const tag of post.tags) {
      allTags.add(tag)
    }
  }
  return Array.from(allTags).map((tag) => ({ slug: tag }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const tag = decodeURIComponent(slug)

  const hasPosts = posts.some((p) => p.tags.includes(tag))
  if (!hasPosts) return {}

  return generateSeoMetadata({
    title: `「${tag}」の記事一覧`,
    description: `「${tag}」タグが付いた記事の一覧です`,
    path: `/tags/${slug}`,
  })
}

export default async function TagPage({ params }: Props) {
  const { slug } = await params
  const tag = decodeURIComponent(slug)

  const tagPosts = [...posts]
    .filter((p) => p.tags.includes(tag))
    .sort(
      (a, b) =>
        new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
    )

  if (tagPosts.length === 0) notFound()

  return (
    <div className="mx-auto max-w-[960px] px-4 py-12">
      <Breadcrumb
        items={[
          { label: 'ホーム', href: '/' },
          { label: `「${tag}」の記事一覧` },
        ]}
      />
      <h1 className="font-heading text-2xl font-semibold">「{tag}」の記事一覧</h1>
      <div className="mt-8">
        <PostList
          posts={tagPosts}
          layout="list"
          emptyMessage={`「${tag}」の記事を準備中です`}
        />
      </div>
    </div>
  )
}
