type CitationProps = {
  source: string;
  url: string;
  accessedAt: string;
  variant?: 'block' | 'inline';
  number?: number;
};

export function Citation({
  source,
  url,
  accessedAt,
  variant = 'block',
  number,
}: CitationProps) {
  if (variant === 'inline') {
    return (
      <sup className="inline-block">
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          role="doc-noteref"
          aria-label={`出典: ${source}（${accessedAt} アクセス）`}
          className="text-brand-vermilion no-underline hover:underline focus:underline focus:outline-none focus:ring-2 focus:ring-brand-navy/50 rounded-sm px-0.5"
        >
          [{number ?? '*'}]
        </a>
      </sup>
    );
  }

  return (
    <cite className="not-italic block border-l-4 border-brand-navy/40 bg-brand-cream/50 dark:bg-brand-navy/10 p-4 text-sm rounded-r-md my-4">
      <span className="text-foreground/80">出典: </span>
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className="text-brand-navy dark:text-primary underline underline-offset-2"
      >
        {source}
      </a>
      <span className="ml-2 text-semantic-muted text-xs">
        （{accessedAt} アクセス）
      </span>
    </cite>
  );
}
