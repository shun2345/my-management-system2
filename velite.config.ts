import { defineCollection, defineConfig, s } from "velite";

const posts = defineCollection({
  name: "Post",
  pattern: "posts/**/*.mdx",
  schema: s.object({
    title: s.string().max(35),
    slug: s.slug("posts"),
    description: s.string().max(120),
    publishedAt: s.isodate(),
    updatedAt: s.isodate(),
    category: s.enum(["介護", "相続", "終活", "お金"]),
    tags: s.array(s.string()),
    sources: s
      .array(
        s.object({
          title: s.string(),
          url: s.string().url(),
          accessedAt: s.string(),
        }),
      )
      .min(1),
    hasAffiliate: s.boolean().default(false),
    disclaimer: s.boolean().default(true),
    author: s.string(),
    body: s.mdx(),
  }),
});

export default defineConfig({
  root: "content",
  output: {
    data: ".velite",
    assets: "public/static",
    base: "/static/",
    name: "[name]-[hash:6].[ext]",
    clean: true,
  },
  collections: { posts },
  prepare: ({ posts }) => {
    const invalid = posts.filter((post) => post.sources.length === 0);
    if (invalid.length > 0) {
      const slugs = invalid.map((p) => p.slug).join(", ");
      throw new Error(
        `[velite] 出典が空の記事があります: ${slugs}。すべての記事に1件以上のsourcesが必要です。`,
      );
    }
  },
});
