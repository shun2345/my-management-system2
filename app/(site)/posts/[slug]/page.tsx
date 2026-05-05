import { readFile } from 'node:fs/promises'
import path from 'node:path'
import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ChevronRight } from 'lucide-react'
import { posts } from '@/.velite'
import { MDXContent } from '@/components/mdx-content'
import {
  PostHeader,
  AuthorBox,
  TableOfContents,
  SourceList,
  RelatedPosts,
} from '@/components/article'
import { generateSeoMetadata } from '@/lib/seo'
import { generateArticleJsonLd, generateBreadcrumbJsonLd } from '@/lib/jsonld'
import { BASE_URL, DEFAULT_AUTHOR } from '@/lib/constants'
import { getCategoryHref } from '@/lib/navigation'
import { extractToc } from '@/lib/toc'
import { getRelatedPosts } from '@/lib/related-posts'

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
    category: post.category,
  })
}

export default async function PostPage({ params }: Props) {
  const { slug } = await params
  const post = posts.find((p) => p.slug === slug)

  if (!post) {
    notFound()
  }

  // MDXソースから目次を抽出
  const mdxPath = path.join(process.cwd(), 'content', 'posts', `${slug}.mdx`)
  let tocEntries: ReturnType<typeof extractToc> = []
  try {
    const rawContent = await readFile(mdxPath, 'utf-8')
    tocEntries = extractToc(rawContent)
  } catch {
    // ファイルが読めない場合はTOCなしで続行
  }

  // 関連記事を取得
  const relatedPosts = getRelatedPosts(post, posts)

  // JSON-LD構造化データ
  const articleJsonLd = generateArticleJsonLd({
    title: post.title,
    description: post.description,
    publishedAt: post.publishedAt,
    updatedAt: post.updatedAt,
    slug: post.slug,
    author: post.author ?? DEFAULT_AUTHOR,
    image: `${BASE_URL}/api/og?${new URLSearchParams({ title: post.title, category: post.category, author: post.author ?? DEFAULT_AUTHOR }).toString()}`,
  })

  const breadcrumbItems = [
    { name: 'ホーム', href: '/' },
    { name: post.category, href: getCategoryHref(post.category) },
    { name: post.title, href: `/posts/${post.slug}` },
  ]
  const breadcrumbJsonLd = generateBreadcrumbJsonLd(breadcrumbItems)

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(articleJsonLd),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbJsonLd),
        }}
      />

      <div className="mx-auto max-w-[960px] px-4 py-12">
        {/* パンくずリスト */}
        <nav aria-label="パンくずリスト" className="mb-6">
          <ol className="flex flex-wrap items-center gap-1 text-sm text-muted-foreground">
            <li>
              <Link href="/" className="hover:text-brand-navy dark:hover:text-primary">
                ホーム
              </Link>
            </li>
            <li>
              <ChevronRight className="h-3 w-3" aria-hidden="true" />
            </li>
            <li>
              <Link
                href={getCategoryHref(post.category)}
                className="hover:text-brand-navy dark:hover:text-primary"
              >
                {post.category}
              </Link>
            </li>
            <li>
              <ChevronRight className="h-3 w-3" aria-hidden="true" />
            </li>
            <li className="truncate text-foreground" aria-current="page">
              {post.title}
            </li>
          </ol>
        </nav>

        <article>
          <PostHeader
            title={post.title}
            publishedAt={post.publishedAt}
            updatedAt={post.updatedAt}
            category={post.category}
            tags={post.tags}
            hasAffiliate={post.hasAffiliate}
          />

          {/* モバイル用TOC */}
          <div className="lg:hidden">
            <TableOfContents entries={tocEntries} />
          </div>

          {/* 本文 + デスクトップTOC */}
          <div className="lg:grid lg:grid-cols-[minmax(0,720px)_200px] lg:gap-8">
            <div className="prose dark:prose-invert max-w-none">
              <MDXContent code={post.body} />
            </div>

            {/* デスクトップ用TOC sidebar */}
            <div className="hidden lg:block">
              <TableOfContents entries={tocEntries} />
            </div>
          </div>

          <SourceList sources={post.sources} />
          <AuthorBox author={post.author ?? DEFAULT_AUTHOR} />
          <RelatedPosts posts={relatedPosts} />
        </article>
      </div>
    </>
  )
}
