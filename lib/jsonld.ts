import { BASE_URL, SITE_NAME, SITE_DESCRIPTION } from './constants'

type ArticleJsonLdInput = {
  title: string
  description: string
  publishedAt: string
  updatedAt: string
  slug: string
  author: string
  image?: string
}

export function generateArticleJsonLd({
  title,
  description,
  publishedAt,
  updatedAt,
  slug,
  author,
  image,
}: ArticleJsonLdInput) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: title,
    description,
    datePublished: publishedAt,
    dateModified: updatedAt,
    url: `${BASE_URL}/posts/${slug}`,
    author: {
      '@type': 'Person',
      name: author,
    },
    ...(image ? { image } : {}),
  }
}

export function generateOrganizationJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: SITE_NAME,
    url: BASE_URL,
    logo: `${BASE_URL}/logo.png`,
    description: SITE_DESCRIPTION,
  }
}

type FAQItem = {
  question: string
  answer: string
}

export function generateFAQPageJsonLd(items: FAQItem[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    })),
  }
}

type BreadcrumbItem = {
  name: string
  href: string
}

export function generateBreadcrumbJsonLd(items: BreadcrumbItem[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      item: `${BASE_URL}${item.href}`,
    })),
  }
}
