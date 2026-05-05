export function PRBadge() {
  return (
    <div className="flex items-center gap-2 mt-3">
      <span className="inline-block bg-brand-vermilion text-white text-xs font-bold rounded-sm px-2.5 py-1">
        PR
      </span>
      <span className="text-xs text-muted-foreground">
        本記事にはアフィリエイト広告が含まれます
      </span>
    </div>
  );
}
