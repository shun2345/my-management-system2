import type { Metadata } from 'next'
import { posts } from '@/.velite'
import { generateSeoMetadata } from '@/lib/seo'
import { SITE_NAME, SITE_TAGLINE } from '@/lib/constants'
import { SNS_LINKS, LINE_LINK, FEATURED_LINKS, buildUtmUrl } from '@/lib/links'
import { SNS_ICON_MAP, LineIcon } from '@/components/icons/SnsIcons'
import { LinkButton } from '@/components/links/LinkButton'

export const metadata: Metadata = generateSeoMetadata({
  title: 'リンク集',
  description: 'SNS・LINE公式アカウント・主要コンテンツへのリンク一覧です',
  path: '/links',
})

function getLatestPosts(count: number) {
  return [...posts]
    .sort(
      (a, b) =>
        new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
    )
    .slice(0, count)
}

export default function LinksPage() {
  const latestPosts = getLatestPosts(4)

  return (
    <div className="mx-auto max-w-[800px] px-4 py-12">
      {/* ヘッダー */}
      <header className="text-center">
        <h1 className="font-heading text-2xl font-semibold">{SITE_NAME}</h1>
        <p className="mt-1 text-sm text-muted-foreground">{SITE_TAGLINE}</p>
      </header>

      {/* LINE CTA */}
      <section className="mt-8" aria-label="LINE公式アカウント">
        <a
          href={LINE_LINK.url}
          target="_blank"
          rel="noopener noreferrer"
          className="flex w-full items-center justify-center gap-2 rounded-md border-2 border-brand-vermilion bg-brand-vermilion px-4 py-3 text-sm font-medium text-white transition-opacity hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-vermilion"
        >
          <LineIcon className="size-5" />
          <span>{LINE_LINK.cta}</span>
        </a>
        <p className="mt-1 text-center text-xs text-muted-foreground">
          LINE公式: {LINE_LINK.handle}
        </p>
      </section>

      {/* SNSリンク */}
      <section className="mt-8" aria-label="SNSアカウント">
        <h2 className="text-sm font-medium text-muted-foreground">SNS</h2>
        <div className="mt-2 space-y-2">
          {SNS_LINKS.map((link) => {
            const Icon = SNS_ICON_MAP[link.id]
            return (
              <LinkButton
                key={link.id}
                href={link.url}
                icon={Icon ? <Icon className="size-5" /> : undefined}
                label={link.label}
                description={link.handle}
                external
              />
            )
          })}
        </div>
      </section>

      {/* 最新記事 */}
      {latestPosts.length > 0 && (
        <section className="mt-8" aria-label="最新記事">
          <h2 className="text-sm font-medium text-muted-foreground">
            最新記事
          </h2>
          <div className="mt-2 space-y-2">
            {latestPosts.map((post) => (
              <LinkButton
                key={post.slug}
                href={buildUtmUrl(`/posts/${post.slug}`)}
                label={post.title}
                description={post.category}
              />
            ))}
          </div>
        </section>
      )}

      {/* カテゴリリンク */}
      <section className="mt-8" aria-label="カテゴリ">
        <h2 className="text-sm font-medium text-muted-foreground">
          カテゴリ
        </h2>
        <div className="mt-2 space-y-2">
          {FEATURED_LINKS.map((link) => (
            <LinkButton
              key={link.id}
              href={buildUtmUrl(link.path)}
              label={link.label}
              description={link.description}
            />
          ))}
        </div>
      </section>

      {/* フッター */}
      <footer className="mt-12 text-center text-xs text-muted-foreground">
        <p>&copy; {new Date().getFullYear()} {SITE_NAME}</p>
      </footer>
    </div>
  )
}
