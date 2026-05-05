import Link from 'next/link'
import type { Post } from '@/content-types/post'
import { getCategoryHref } from '@/lib/navigation'
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

type PostCardProps = {
  post: Post
  compact?: boolean
}

function formatDate(isoDate: string): string {
  const d = new Date(isoDate)
  return `${d.getFullYear()}/${String(d.getMonth() + 1).padStart(2, '0')}/${String(d.getDate()).padStart(2, '0')}`
}

export function PostCard({ post, compact = false }: PostCardProps) {
  return (
    <Card className="transition-shadow hover:shadow-md hover:border-brand-navy/20 dark:hover:border-primary/30">
      <Link href={`/posts/${post.slug}`} className="block">
        <CardHeader>
          <CardTitle className="font-heading">{post.title}</CardTitle>
          {!compact && (
            <CardDescription>{post.description}</CardDescription>
          )}
        </CardHeader>
      </Link>
      <div className="flex flex-wrap items-center gap-2 px-4 pb-4">
        <time
          dateTime={post.publishedAt}
          className="text-xs text-muted-foreground"
        >
          {formatDate(post.publishedAt)}
        </time>
        <Link href={getCategoryHref(post.category)}>
          <Badge variant="secondary">{post.category}</Badge>
        </Link>
        {!compact &&
          post.tags.slice(0, 3).map((tag) => (
            <Link key={tag} href={`/tags/${tag}`}>
              <Badge variant="outline">{tag}</Badge>
            </Link>
          ))}
      </div>
    </Card>
  )
}
