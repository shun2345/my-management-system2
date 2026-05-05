// ============================================================
// アフィリエイトリンク一元管理
// ============================================================

// --- 型定義 ---

export type AffiliateMedia =
  | 'blog'
  | 'youtube'
  | 'tiktok'
  | 'instagram'
  | 'x'
  | 'line'
  | 'mail_magazine'
  | 'note'
  | 'pdf';

export type AspProvider = 'a8' | 'afb' | 'accesstrade' | 'felmat';

export type AffiliateLinkCategory =
  | 'fp_soudan'
  | 'souzoku_soudan'
  | 'shukatsu'
  | 'kaigo_service'
  | 'hoken';

export type RewardType =
  | '面談完了'
  | '無料相談申込'
  | '資料請求'
  | '会員登録'
  | '成約';

export type AffiliatePosition = 'top' | 'middle' | 'bottom';

export type AffiliateLink = {
  asp: AspProvider;
  url: string;
  label: string;
  description: string;
  rewardType: RewardType;
  category: AffiliateLinkCategory;
  allowedMedia: readonly AffiliateMedia[];
};

// --- データ（プレースホルダー） ---

export const AFFILIATE_LINKS = {
  hokengarden_nenkin: {
    asp: 'a8',
    url: 'https://example.com/affiliate/hokengarden-nenkin',
    label: '保険ガーデン年金',
    description: '年金・老後資金についてFPに無料相談できるサービスです。',
    rewardType: '面談完了',
    category: 'fp_soudan',
    allowedMedia: ['blog'],
  },
  souzoku_soudan_center: {
    asp: 'a8',
    url: 'https://example.com/affiliate/souzoku-soudan-center',
    label: '相続相談センター',
    description: '相続に関する悩みを専門家に無料で相談できるサービスです。',
    rewardType: '無料相談申込',
    category: 'souzoku_soudan',
    allowedMedia: ['blog', 'youtube'],
  },
  shukatsu_note_service: {
    asp: 'afb',
    url: 'https://example.com/affiliate/shukatsu-note',
    label: '終活ノートサービス',
    description: 'エンディングノート作成をサポートするオンラインサービスです。',
    rewardType: '会員登録',
    category: 'shukatsu',
    allowedMedia: ['blog', 'youtube', 'instagram'],
  },
  kaigo_hoken_hikaku: {
    asp: 'a8',
    url: 'https://example.com/affiliate/kaigo-hoken-hikaku',
    label: '介護保険比較ナビ',
    description: '民間介護保険を比較検討できる一括見積もりサービスです。',
    rewardType: '資料請求',
    category: 'kaigo_service',
    allowedMedia: ['blog'],
  },
  fp_soudan_online: {
    asp: 'accesstrade',
    url: 'https://example.com/affiliate/fp-soudan-online',
    label: 'FPオンライン相談',
    description: '自宅からオンラインでFPに家計相談ができるサービスです。',
    rewardType: '面談完了',
    category: 'fp_soudan',
    allowedMedia: ['blog', 'youtube', 'tiktok', 'instagram'],
  },
} as const satisfies Record<string, AffiliateLink>;

export type AffiliateLinkId = keyof typeof AFFILIATE_LINKS;

// --- ヘルパー関数 ---

/**
 * IDを指定してアフィリエイトリンクを取得する
 */
export function getAffiliateLink(id: AffiliateLinkId): AffiliateLink {
  return AFFILIATE_LINKS[id];
}

/**
 * 媒体制限チェック
 */
export function validateMediaUsage(
  linkId: AffiliateLinkId,
  media: AffiliateMedia
): { allowed: boolean; status: 'ok' | 'blocked'; reason?: string } {
  const link = AFFILIATE_LINKS[linkId];
  const allowed = (link.allowedMedia as readonly string[]).includes(media);

  if (allowed) {
    return { allowed: true, status: 'ok' };
  }

  return {
    allowed: false,
    status: 'blocked',
    reason: `「${link.label}」は${media}での掲載が許可されていません。許可媒体: ${link.allowedMedia.join(', ')}`,
  };
}

/**
 * カテゴリ別にアフィリエイトリンクをフィルタして返す
 */
export function getAffiliateLinksByCategory(
  category: AffiliateLinkCategory
): { id: AffiliateLinkId; link: AffiliateLink }[] {
  return (Object.entries(AFFILIATE_LINKS) as [AffiliateLinkId, AffiliateLink][])
    .filter(([, link]) => link.category === category)
    .map(([id, link]) => ({ id, link }));
}

// --- GA4 トラッキング ---

type TrackAffiliateClickParams = {
  linkId: AffiliateLinkId;
  label: string;
  asp: string;
  category: string;
  pageUrl: string;
  referrer: string;
  articleCategory: string;
  position: AffiliatePosition;
};

/**
 * GA4 affiliate_click イベントを発火する
 */
export function trackAffiliateClick(params: TrackAffiliateClickParams): void {
  if (typeof window === 'undefined') return;

  const eventParams = {
    link_id: params.linkId,
    label: params.label,
    asp: params.asp,
    category: params.category,
    page_url: params.pageUrl,
    referrer: params.referrer,
    article_category: params.articleCategory,
    position: params.position,
  };

  if ('gtag' in window) {
    (window as unknown as { gtag: (...args: unknown[]) => void }).gtag(
      'event',
      'affiliate_click',
      eventParams
    );
  }

  window.dispatchEvent(
    new CustomEvent('affiliate_click', { detail: eventParams })
  );
}
