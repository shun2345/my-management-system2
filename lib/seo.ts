import type { Metadata } from 'next';

type SeoInput = {
  title: string;
  description: string;
  path: string;
  ogImage?: string;
};

const BASE_URL = 'https://example.com';

export function generateSeoMetadata({
  title,
  description,
  path,
  ogImage,
}: SeoInput): Metadata {
  const url = `${BASE_URL}${path}`;
  const image = ogImage ?? `${BASE_URL}/api/og?title=${encodeURIComponent(title)}`;

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      type: 'article',
      images: [{ url: image, width: 1200, height: 630 }],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [image],
    },
  };
}
