type FigureProps = {
  src: string;
  alt: string;
  caption?: string;
  source?: string;
  width?: number;
  height?: number;
};

export function Figure({
  src,
  alt,
  caption,
  source,
  width,
  height,
}: FigureProps) {
  return (
    <figure className="my-6">
      <div className="overflow-hidden rounded-lg border border-brand-mist dark:border-border">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={src}
          alt={alt}
          width={width}
          height={height}
          className="w-full"
          loading="lazy"
        />
      </div>
      {(caption || source) && (
        <figcaption className="mt-2 text-center">
          {caption && (
            <span className="text-sm text-muted-foreground">{caption}</span>
          )}
          {source && (
            <span className="block text-xs text-semantic-muted">
              {caption ? '　' : ''}
              出典: {source}
            </span>
          )}
        </figcaption>
      )}
    </figure>
  );
}
