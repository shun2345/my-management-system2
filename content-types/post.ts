export type PostCategory = '介護' | '相続' | '終活' | 'お金';

export type PostSource = {
  title: string;
  url: string;
  accessedAt: string;
};

export type Post = {
  title: string;
  slug: string;
  description: string;
  publishedAt: string;
  updatedAt: string;
  category: PostCategory;
  tags: string[];
  sources: PostSource[];
  hasAffiliate: boolean;
  disclaimer: boolean;
  author: string;
  content: string;
};
