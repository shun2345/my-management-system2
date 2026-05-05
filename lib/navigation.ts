export { SITE_NAME } from './constants'

export const CATEGORIES = [
  { label: '介護', href: '/category/kaigo' },
  { label: '相続', href: '/category/souzoku' },
  { label: '終活', href: '/category/shukatsu' },
  { label: 'お金', href: '/category/okane' },
] as const

export const CATEGORY_SLUG_MAP: Record<string, string> = {
  介護: 'kaigo',
  相続: 'souzoku',
  終活: 'shukatsu',
  お金: 'okane',
}

export const SLUG_TO_CATEGORY: Record<string, string> = {
  kaigo: '介護',
  souzoku: '相続',
  shukatsu: '終活',
  okane: 'お金',
}

export const CATEGORY_DESCRIPTIONS: Record<string, string> = {
  kaigo: '介護保険制度やケアマネージャーの選び方など、親の介護に関する公的制度と情報を整理しています',
  souzoku: '相続税の基礎知識や遺産分割のポイントなど、相続に関する公的制度と情報を整理しています',
  shukatsu: 'エンディングノートや葬儀の準備など、終活に関する公的制度と情報を整理しています',
  okane: '年金制度や家計の見直しなど、老後のお金に関する公的制度と情報を整理しています',
}

export function getCategoryHref(category: string): string {
  const slug = CATEGORY_SLUG_MAP[category]
  if (!slug) {
    console.warn(`[navigation] Unknown category: "${category}"`)
    return '/'
  }
  return `/category/${slug}`
}

export const FOOTER_LINKS = [
  { label: '運営者情報', href: '/about' },
  { label: 'プライバシーポリシー', href: '/privacy' },
  { label: '広告表記', href: '/disclosure' },
  { label: 'お問い合わせ', href: '/contact' },
] as const
