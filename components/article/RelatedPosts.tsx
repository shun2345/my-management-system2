import Link from 'next/link'
import type { Post } from '@/content-types/post'
import { Badge } from '@/components/ui/badge'

type RelatedPostsProps = {
  posts: Post[]
}

export function RelatedPosts({ posts }: RelatedPostsProps) {
  if (posts.length === 0) return null

  return (
    <section className="mt-12 border-t pt-8">
      <h2 className="text-lg font-semibold">関連記事</h2>
      <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {posts.map((post) => (
          <Link
            key={post.slug}
            href={`/posts/${post.slug}`}
            className="group rounded-lg border bg-card p-4 transition-shadow hover:shadow-md"
          >
            <p className="font-medium leading-snug group-hover:text-primary">
              {post.title}
            </p>
            <div className="mt-2 flex items-center gap-2">
              <Badge variant="secondary" className="text-xs">
                {post.category}
              </Badge>
              <span className="text-xs text-muted-foreground">
                {new Date(post.publishedAt).toLocaleDateString('ja-JP')}
              </span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  )
}
