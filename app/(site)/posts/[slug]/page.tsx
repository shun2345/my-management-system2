type Props = {
  params: Promise<{ slug: string }>;
};

export default async function PostPage({ params }: Props) {
  const { slug } = await params;

  return (
    <div className="mx-auto max-w-3xl px-4 py-12">
      <h1 className="text-2xl font-semibold">記事: {slug}</h1>
      <p className="mt-4 text-foreground/60">記事詳細ページ（準備中）</p>
    </div>
  );
}
