type Props = {
  params: Promise<{ slug: string }>;
};

export default async function TagPage({ params }: Props) {
  const { slug } = await params;

  return (
    <div className="mx-auto max-w-3xl px-4 py-12">
      <h1 className="text-2xl font-semibold">タグ: {slug}</h1>
      <p className="mt-4 text-foreground/60">タグ一覧ページ（準備中）</p>
    </div>
  );
}
