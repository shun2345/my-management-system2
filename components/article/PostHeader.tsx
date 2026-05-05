import Link from 'next/link'
import { Badge } from '@/components/ui/badge'
import { PRBadge } from '@/components/mdx/PRBadge'
import { getCategoryHref } from '@/lib/navigation'

type PostHeaderProps = {
  title: string
  publishedAt: string
  updatedAt: string
  category: string
  tags: string[]
  hasAffiliate: boolean
}

function formatDate(isoDate: string): string {
  const d = new Date(isoDate)
  return `${d.getFullYear()}年${d.getMonth() + 1}月${d.getDate()}日`
}

export function PostHeader({
  title,
  publishedAt,
  updatedAt,
  category,
  tags,
  hasAffiliate,
}: PostHeaderProps) {
  return (
    <header className="mb-8">
      <h1 className="font-heading text-[28px] font-bold leading-[1.4] tracking-wide md:text-[32px]">
        {title}
      </h1>

      {hasAffiliate && <PRBadge />}

      <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-muted-foreground">
        <time dateTime={publishedAt}>公開: {formatDate(publishedAt)}</time>
        {updatedAt !== publishedAt && (
          <time dateTime={updatedAt}>更新: {formatDate(updatedAt)}</time>
        )}
      </div>

      <div className="mt-3 flex flex-wrap items-center gap-2">
        <Link href={getCategoryHref(category)}>
          <Badge variant="secondary">{category}</Badge>
        </Link>
        {tags.map((tag) => (
          <Link key={tag} href={`/tags/${tag}`}>
            <Badge variant="outline">{tag}</Badge>
          </Link>
        ))}
      </div>
    </header>
  )
}
