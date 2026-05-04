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
          className="text-primary no-underline hover:underline focus:underline focus:outline-none focus:ring-2 focus:ring-primary/50 rounded-sm px-0.5"
        >
          [{number ?? '*'}]
        </a>
      </sup>
    );
  }

  return (
    <cite className="block text-sm text-foreground/60 not-italic">
      出典:{' '}
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className="underline"
      >
        {source}
      </a>
      （{accessedAt} アクセス）
    </cite>
  );
}
