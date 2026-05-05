import { ListChecks } from 'lucide-react';

type KeyPointsProps = {
  title?: string;
  children: React.ReactNode;
};

export function KeyPoints({
  title = 'この記事のポイント',
  children,
}: KeyPointsProps) {
  return (
    <div className="my-6 rounded-md border border-brand-mist bg-brand-cream/40 p-5 dark:border-border dark:bg-muted/30">
      <div className="flex items-center gap-2">
        <ListChecks
          className="size-5 shrink-0 text-brand-navy dark:text-primary"
          aria-hidden="true"
        />
        <span className="font-heading text-base font-bold text-brand-navy dark:text-primary">
          {title}
        </span>
      </div>
      <div className="mt-3 text-foreground">{children}</div>
    </div>
  );
}
