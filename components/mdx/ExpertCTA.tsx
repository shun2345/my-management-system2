import { Home, FileText, Flower2, Wallet } from 'lucide-react';

type ExpertCategory = 'kaigo' | 'souzoku' | 'shukatsu' | 'okane';

type ExpertCTAProps = {
  category: ExpertCategory;
};

const config: Record<ExpertCategory, {
  title: string;
  message: string;
  icon: React.ReactNode;
}> = {
  kaigo: {
    title: '介護の専門家に相談する',
    message: '介護に関する具体的なご相談は、お住まいの地域包括支援センターや介護の専門家にご相談ください。',
    icon: <Home className="size-8 shrink-0" aria-hidden="true" />,
  },
  souzoku: {
    title: '相続の専門家に相談する',
    message: '相続に関する具体的なご相談は、税理士・弁護士・司法書士等の専門家にご相談ください。',
    icon: <FileText className="size-8 shrink-0" aria-hidden="true" />,
  },
  shukatsu: {
    title: '終活の専門家に相談する',
    message: '終活に関する具体的なご相談は、終活カウンセラーや専門家にご相談ください。',
    icon: <Flower2 className="size-8 shrink-0" aria-hidden="true" />,
  },
  okane: {
    title: 'お金の専門家に相談する',
    message: '家計やお金に関する具体的なご相談は、ファイナンシャルプランナー等の専門家にご相談ください。',
    icon: <Wallet className="size-8 shrink-0" aria-hidden="true" />,
  },
};

export function ExpertCTA({ category }: ExpertCTAProps) {
  const { title, message, icon } = config[category];

  return (
    <div className="my-8 w-full rounded-xl bg-brand-navy text-brand-cream dark:bg-primary/20 dark:text-foreground p-8">
      <div className="flex flex-col items-center gap-4 text-center sm:flex-row sm:text-left">
        <div className="text-brand-cream/80 dark:text-primary">
          {icon}
        </div>
        <div className="flex-1">
          <p className="font-heading text-lg font-bold">{title}</p>
          <p className="mt-2 text-sm text-brand-cream/80 dark:text-muted-foreground">
            {message}
          </p>
        </div>
      </div>
    </div>
  );
}
