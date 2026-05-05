import type { Metadata } from 'next'
import Link from 'next/link'
import { posts } from '@/.velite'
import { PostList } from '@/components/article'
import { CATEGORIES } from '@/lib/navigation'
import { SITE_NAME, SITE_DESCRIPTION, SITE_TAGLINE } from '@/lib/constants'

export const metadata: Metadata = {
  title: { absolute: SITE_NAME },
  description: SITE_DESCRIPTION,
}

const CATEGORY_LABELS = ['介護', '相続', '終活', 'お金'] as const

function getLatestPosts(count: number) {
  return [...posts]
    .sort(
      (a, b) =>
        new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
    )
    .slice(0, count)
}

function getPostsByCategory(category: string, count: number) {
  return [...posts]
    .filter((p) => p.category === category)
    .sort(
      (a, b) =>
        new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
    )
    .slice(0, count)
}

export default function Home() {
  const latestPosts = getLatestPosts(6)

  return (
    <div className="mx-auto max-w-[1120px] px-4 py-12">
      {/* Hero */}
      <section className="py-8 text-center sm:py-12">
        <h1 className="font-heading">{SITE_NAME}</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          {SITE_TAGLINE}
        </p>
        <p className="mx-auto mt-4 max-w-xl text-muted-foreground">
          介護・相続・終活・お金を、公的制度で整理するメディアです。
          厚労省や国税庁などの一次情報をもとに、制度の仕組みをわかりやすくお届けします。
        </p>
      </section>

      {/* 新着記事 */}
      <section className="mt-12 sm:mt-16">
        <h2>新着記事</h2>
        <div className="mt-4">
          <PostList
            posts={latestPosts}
            layout="list"
            emptyMessage="記事を準備中です"
          />
        </div>
      </section>

      {/* カテゴリ別セクション */}
      {CATEGORY_LABELS.map((category) => {
        const categoryPosts = getPostsByCategory(category, 4)
        const categoryLink = CATEGORIES.find((c) => c.label === category)?.href

        return (
          <section key={category} className="mt-12 sm:mt-16">
            <div className="flex items-center justify-between">
              <h2 className="font-heading">{category}の記事</h2>
              {categoryLink && (
                <Link
                  href={categoryLink}
                  className="text-sm text-brand-navy dark:text-primary hover:underline"
                >
                  一覧を見る
                </Link>
              )}
            </div>
            <div className="mt-4">
              <PostList
                posts={categoryPosts}
                layout="grid"
                compact
                emptyMessage={`${category}の記事を準備中です`}
              />
            </div>
          </section>
        )
      })}

      {/* LINE登録CTA */}
      <section className="mt-12 rounded-xl bg-brand-navy dark:bg-primary/20 px-6 py-8 text-center text-brand-cream dark:text-foreground sm:mt-16">
        <p className="font-heading text-lg font-bold">
          親の介護お金準備チェックリスト30項目を無料配布中
        </p>
        <p className="mt-2 text-sm text-brand-cream/80 dark:text-muted-foreground">
          LINE登録で、介護・相続に備えるチェックリストをお届けします
        </p>
      </section>
    </div>
  )
}
