import { AlertTriangle, CheckCircle, Info, PenLine } from 'lucide-react';

type CalloutType = 'info' | 'warning' | 'tip' | 'note';

type CalloutProps = {
  type?: CalloutType;
  children: React.ReactNode;
};

const styles: Record<CalloutType, { container: string; icon: string }> = {
  info: {
    container: 'border-l-semantic-info bg-semantic-info/8 dark:bg-semantic-info/15',
    icon: 'text-semantic-info',
  },
  warning: {
    container: 'border-l-semantic-warning bg-semantic-warning/10 dark:bg-semantic-warning/15',
    icon: 'text-semantic-warning',
  },
  tip: {
    container: 'border-l-semantic-success bg-semantic-success/8 dark:bg-semantic-success/15',
    icon: 'text-semantic-success',
  },
  note: {
    container: 'border-l-brand-navy/40 bg-brand-mist/40 dark:border-l-primary/40 dark:bg-muted/50',
    icon: 'text-brand-navy dark:text-primary',
  },
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
  tip: <CheckCircle className="size-5 shrink-0" aria-hidden="true" />,
  note: <PenLine className="size-5 shrink-0" aria-hidden="true" />,
};

export function Callout({ type = 'info', children }: CalloutProps) {
  return (
    <div
      role="note"
      aria-label={labels[type]}
      className={`my-4 flex gap-3 rounded-r-md border-l-4 p-4 ${styles[type].container}`}
    >
      <div className={styles[type].icon}>{icons[type]}</div>
      <div className="min-w-0 text-foreground">{children}</div>
    </div>
  );
}
