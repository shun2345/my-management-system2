import type { Post } from '@/content-types/post'
import { PostCard } from './PostCard'

type PostListProps = {
  posts: Post[]
  layout?: 'list' | 'grid'
  compact?: boolean
  emptyMessage?: string
}

export function PostList({
  posts,
  layout = 'list',
  compact = false,
  emptyMessage = '記事がまだありません',
}: PostListProps) {
  if (posts.length === 0) {
    return (
      <p className="py-8 text-center text-muted-foreground">{emptyMessage}</p>
    )
  }

  return (
    <div
      className={
        layout === 'grid'
          ? 'grid gap-4 sm:grid-cols-2'
          : 'flex flex-col gap-4'
      }
    >
      {posts.map((post) => (
        <PostCard key={post.slug} post={post} compact={compact} />
      ))}
    </div>
  )
}
