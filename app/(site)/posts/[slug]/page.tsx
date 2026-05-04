import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { posts } from '@/.velite'
import { MDXContent } from '@/components/mdx-content'
import { generateSeoMetadata } from '@/lib/seo'
import { DEFAULT_AUTHOR } from '@/lib/constants'

type Props = {
  params: Promise<{ slug: string }>
}

export function generateStaticParams() {
  return posts.map((post) => ({ slug: post.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const post = posts.find((p) => p.slug === slug)

  if (!post) {
    return {}
  }

  return generateSeoMetadata({
    title: post.title,
    description: post.description,
    path: `/posts/${post.slug}`,
    ogType: 'article',
    publishedAt: post.publishedAt,
    updatedAt: post.updatedAt,
    author: post.author ?? DEFAULT_AUTHOR,
  })
}

export default async function PostPage({ params }: Props) {
  const { slug } = await params
  const post = posts.find((p) => p.slug === slug)

  if (!post) {
    notFound()
  }

  return (
    <article className="mx-auto max-w-3xl px-4 py-12">
      <header className="mb-8">
        <h1 className="text-2xl font-semibold">{post.title}</h1>
        <p className="mt-2 text-sm text-foreground/60">
          公開日: {post.publishedAt} / 更新日: {post.updatedAt}
        </p>
        <div className="mt-2 flex gap-2">
          <span className="rounded bg-foreground/10 px-2 py-0.5 text-xs">
            {post.category}
          </span>
          {post.tags.map((tag) => (
            <span
              key={tag}
              className="rounded bg-foreground/5 px-2 py-0.5 text-xs"
            >
              {tag}
            </span>
          ))}
        </div>
      </header>

      <div className="prose prose-neutral max-w-none">
        <MDXContent code={post.body} />
      </div>

      <footer className="mt-12 border-t pt-6">
        <h2 className="text-lg font-semibold">出典</h2>
        <ul className="mt-2 space-y-1 text-sm text-foreground/70">
          {post.sources.map((source) => (
            <li key={source.url}>
              <a
                href={source.url}
                target="_blank"
                rel="noopener noreferrer"
                className="underline"
              >
                {source.title}
              </a>
              （{source.accessedAt} アクセス）
            </li>
          ))}
        </ul>
      </footer>
    </article>
  )
}
