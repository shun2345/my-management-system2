import { BASE_URL } from './constants'

export type SnsLink = {
  id: string
  label: string
  handle: string
  url: string
}

export type FeaturedLink = {
  id: string
  label: string
  description: string
  path: string
}

export const SNS_LINKS: SnsLink[] = [
  {
    id: 'youtube',
    label: 'YouTube',
    handle: '@jikka_shirabe',
    url: 'https://www.youtube.com/@jikka_shirabe',
  },
  {
    id: 'tiktok',
    label: 'TikTok',
    handle: '@jikka_shirabe',
    url: 'https://www.tiktok.com/@jikka_shirabe',
  },
  {
    id: 'instagram',
    label: 'Instagram',
    handle: '@jikka_shirabe',
    url: 'https://www.instagram.com/jikka_shirabe',
  },
  {
    id: 'x',
    label: 'X',
    handle: '@jikka_shirabe',
    url: 'https://x.com/jikka_shirabe',
  },
]

export const LINE_LINK = {
  handle: '@jikkashirabe',
  url: 'https://lin.ee/placeholder',
  cta: '親の介護お金準備チェックリスト30項目を無料配布中',
} as const

export const FEATURED_LINKS: FeaturedLink[] = [
  {
    id: 'top',
    label: 'サイトトップ',
    description: '実家のしらべ トップページ',
    path: '/',
  },
  {
    id: 'kaigo',
    label: '介護の記事一覧',
    description: '介護保険制度・ケアマネ選びなど',
    path: '/category/kaigo',
  },
  {
    id: 'souzoku',
    label: '相続の記事一覧',
    description: '相続税の基礎・遺産分割など',
    path: '/category/souzoku',
  },
  {
    id: 'shukatsu',
    label: '終活の記事一覧',
    description: 'エンディングノート・葬儀準備など',
    path: '/category/shukatsu',
  },
  {
    id: 'okane',
    label: 'お金の記事一覧',
    description: '年金制度・家計の見直しなど',
    path: '/category/okane',
  },
]

type UtmParams = {
  utm_source?: string
  utm_medium?: string
  utm_campaign?: string
}

export function buildUtmUrl(path: string, params?: UtmParams): string {
  const url = new URL(path, BASE_URL)
  const {
    utm_source = 'linkhub',
    utm_medium = 'social',
    utm_campaign = 'linkhub',
  } = params ?? {}

  url.searchParams.set('utm_source', utm_source)
  url.searchParams.set('utm_medium', utm_medium)
  url.searchParams.set('utm_campaign', utm_campaign)

  return `${url.pathname}${url.search}`
}
