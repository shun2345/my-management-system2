import type { Metadata } from 'next'
import { BASE_URL, SITE_NAME } from './constants'

type SeoInput = {
  title: string
  description: string
  path: string
  ogImage?: string
  ogType?: 'article' | 'website'
  robots?: { index?: boolean; follow?: boolean }
  publishedAt?: string
  updatedAt?: string
  author?: string
}

export function generateSeoMetadata({
  title,
  description,
  path,
  ogImage,
  ogType = 'website',
  robots,
  publishedAt,
  updatedAt,
  author,
}: SeoInput): Metadata {
  const url = `${BASE_URL}${path}`
  const image = ogImage ?? `${BASE_URL}/api/og?title=${encodeURIComponent(title)}`

  const indexable = robots?.index !== false
  const followable = robots?.follow !== false

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      siteName: SITE_NAME,
      locale: 'ja_JP',
      type: ogType,
      images: [{ url: image, width: 1200, height: 630, alt: title }],
      ...(ogType === 'article' && publishedAt
        ? {
            publishedTime: publishedAt,
            modifiedTime: updatedAt ?? publishedAt,
            authors: author ? [author] : undefined,
          }
        : {}),
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [{ url: image, alt: title }],
    },
    robots: {
      index: indexable,
      follow: followable,
      googleBot: {
        index: indexable,
        follow: followable,
      },
    },
  }
}
