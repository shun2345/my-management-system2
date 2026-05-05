import type { MetadataRoute } from 'next'
import { posts } from '@/.velite'
import { BASE_URL } from '@/lib/constants'
import { CATEGORIES } from '@/lib/navigation'

export default function sitemap(): MetadataRoute.Sitemap {
  const home: MetadataRoute.Sitemap[number] = {
    url: BASE_URL,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: 1,
  }

  const staticPages: MetadataRoute.Sitemap = [
    '/about',
    '/privacy',
    '/disclosure',
    '/contact',
    '/links',
  ].map((path) => ({
    url: `${BASE_URL}${path}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.5,
  }))

  const postPages: MetadataRoute.Sitemap = posts.map((post) => ({
    url: `${BASE_URL}/posts/${post.slug}`,
    lastModified: new Date(post.updatedAt),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }))

  const categoryPages: MetadataRoute.Sitemap = CATEGORIES.map((cat) => ({
    url: `${BASE_URL}${cat.href}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }))

  const allTags = new Set<string>()
  for (const post of posts) {
    for (const tag of post.tags) {
      allTags.add(tag)
    }
  }
  const tagPages: MetadataRoute.Sitemap = Array.from(allTags).map((tag) => ({
    url: `${BASE_URL}/tags/${encodeURIComponent(tag)}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.4,
  }))

  return [home, ...staticPages, ...categoryPages, ...postPages, ...tagPages]
}
