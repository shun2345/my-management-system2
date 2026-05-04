import { AFFILIATE_LINKS } from '@/lib/affiliate';

type AffiliateCardProps = {
  linkId: keyof typeof AFFILIATE_LINKS;
};

export function AffiliateCard({ linkId }: AffiliateCardProps) {
  const link = AFFILIATE_LINKS[linkId];

  return (
    <div className="my-6 rounded-lg border p-4">
      <a
        href={link.url}
        target="_blank"
        rel="noopener noreferrer sponsored"
        className="font-semibold underline"
      >
        {link.label}
      </a>
    </div>
  );
}
