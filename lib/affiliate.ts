export const AFFILIATE_LINKS = {
  hokengarden_nenkin: {
    asp: 'a8',
    url: 'https://example.com/affiliate/hokengarden-nenkin',
    label: '保険ガーデン年金',
    rewardType: '面談完了',
    category: 'fp_soudan',
    allowedMedia: ['blog'],
  },
} as const;

type AffiliateLinkId = keyof typeof AFFILIATE_LINKS;

export function getAffiliateLink(id: AffiliateLinkId) {
  return AFFILIATE_LINKS[id];
}
