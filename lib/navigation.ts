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

export function getCategoryHref(category: string): string {
  const slug = CATEGORY_SLUG_MAP[category]
  return slug ? `/category/${slug}` : '/category'
}

export const FOOTER_LINKS = [
  { label: '運営者情報', href: '/about' },
  { label: 'プライバシーポリシー', href: '/privacy' },
  { label: '広告表記', href: '/disclosure' },
  { label: 'お問い合わせ', href: '/contact' },
] as const
