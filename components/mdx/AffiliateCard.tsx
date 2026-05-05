import { AFFILIATE_LINKS } from '@/lib/affiliate';

type AffiliateCardProps = {
  linkId: keyof typeof AFFILIATE_LINKS;
};

export function AffiliateCard({ linkId }: AffiliateCardProps) {
  const link = AFFILIATE_LINKS[linkId];

  return (
    <div className="my-6 rounded-lg border border-brand-mist dark:border-border shadow-sm overflow-hidden">
      <div className="px-2 py-0.5">
        <span className="text-xs font-bold bg-brand-vermilion text-white rounded-sm px-1.5 py-0.5">
          PR
        </span>
      </div>
      <div className="flex items-center gap-4 p-4 pt-2">
        <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-lg bg-brand-mist/50 dark:bg-muted text-brand-navy dark:text-primary font-heading text-lg font-bold">
          {link.label.charAt(0)}
        </div>
        <div className="min-w-0 flex-1">
          <p className="font-heading font-semibold text-foreground">
            {link.label}
          </p>
          <p className="mt-1 text-sm text-muted-foreground">
            {link.rewardType}
          </p>
          <a
            href={link.url}
            target="_blank"
            rel="noopener noreferrer sponsored"
            className="mt-3 inline-block rounded-md bg-brand-navy text-brand-cream dark:bg-primary dark:text-primary-foreground px-4 py-2 text-sm font-medium transition-opacity hover:opacity-90"
          >
            詳しく見る
          </a>
        </div>
      </div>
    </div>
  );
}
