import { Lightbulb } from 'lucide-react';

type ExampleProps = {
  title?: string;
  children: React.ReactNode;
};

export function Example({ title = '具体例', children }: ExampleProps) {
  return (
    <div className="my-4 rounded-r-md border-l-4 border-brand-navy/30 bg-brand-cream/30 p-4 dark:border-l-primary/30 dark:bg-muted/30">
      <div className="flex items-center gap-2">
        <Lightbulb
          className="size-4 shrink-0 text-brand-navy/70 dark:text-primary/70"
          aria-hidden="true"
        />
        <span className="text-xs font-bold text-brand-navy dark:text-primary">
          {title}
        </span>
      </div>
      <div className="mt-2 text-foreground">{children}</div>
    </div>
  );
}
