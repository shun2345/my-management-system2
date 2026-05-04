type ArticleJsonLdInput = {
  title: string;
  description: string;
  publishedAt: string;
  updatedAt: string;
  slug: string;
  author: string;
};

export function generateArticleJsonLd({
  title,
  description,
  publishedAt,
  updatedAt,
  slug,
  author,
}: ArticleJsonLdInput) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: title,
    description,
    datePublished: publishedAt,
    dateModified: updatedAt,
    url: `https://example.com/posts/${slug}`,
    author: {
      '@type': 'Person',
      name: author,
    },
  };
}
