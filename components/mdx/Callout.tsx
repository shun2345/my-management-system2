type CalloutType = 'info' | 'warning' | 'tip' | 'note';

type CalloutProps = {
  type?: CalloutType;
  children: React.ReactNode;
};

const styles: Record<CalloutType, string> = {
  info: 'border-blue-300 bg-blue-50',
  warning: 'border-yellow-300 bg-yellow-50',
  tip: 'border-green-300 bg-green-50',
  note: 'border-gray-300 bg-gray-50',
};

export function Callout({ type = 'info', children }: CalloutProps) {
  return (
    <div className={`my-4 rounded-lg border-l-4 p-4 ${styles[type]}`}>
      {children}
    </div>
  );
}
