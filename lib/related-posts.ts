import type { Post } from '@/content-types/post'

export function getRelatedPosts(
  current: Post,
  all: Post[],
  limit = 3
): Post[] {
  const currentTags = new Set(current.tags)

  const scored = all
    .filter((p) => p.slug !== current.slug)
    .map((post) => {
      let score = 0
      if (post.category === current.category) {
        score += 3
      }
      for (const tag of post.tags) {
        if (currentTags.has(tag)) {
          score += 1
        }
      }
      return { post, score }
    })
    .filter(({ score }) => score > 0)

  scored.sort((a, b) => {
    if (b.score !== a.score) return b.score - a.score
    return (
      new Date(b.post.publishedAt).getTime() -
      new Date(a.post.publishedAt).getTime()
    )
  })

  return scored.slice(0, limit).map(({ post }) => post)
}
