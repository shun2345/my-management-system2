type CitationProps = {
  source: string;
  url: string;
  accessedAt: string;
};

export function Citation({ source, url, accessedAt }: CitationProps) {
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
