import { AlertTriangle, Info, Lightbulb, StickyNote } from 'lucide-react';

type CalloutType = 'info' | 'warning' | 'tip' | 'note';

type CalloutProps = {
  type?: CalloutType;
  children: React.ReactNode;
};

const styles: Record<CalloutType, string> = {
  info: 'border-primary/50 bg-primary/5 text-primary',
  warning: 'border-destructive/50 bg-destructive/5 text-destructive',
  tip: 'border-accent-foreground/50 bg-accent text-accent-foreground',
  note: 'border-muted-foreground/30 bg-muted text-muted-foreground',
};

const labels: Record<CalloutType, string> = {
  info: '補足情報',
  warning: '注意事項',
  tip: 'ヒント',
  note: '備考',
};

const icons: Record<CalloutType, React.ReactNode> = {
  info: <Info className="size-5 shrink-0" aria-hidden="true" />,
  warning: <AlertTriangle className="size-5 shrink-0" aria-hidden="true" />,
  tip: <Lightbulb className="size-5 shrink-0" aria-hidden="true" />,
  note: <StickyNote className="size-5 shrink-0" aria-hidden="true" />,
};

export function Callout({ type = 'info', children }: CalloutProps) {
  return (
    <div
      role="note"
      aria-label={labels[type]}
      className={`my-4 flex gap-3 rounded-lg border-l-4 p-4 ${styles[type]}`}
    >
      {icons[type]}
      <div className="min-w-0">{children}</div>
    </div>
  );
}
