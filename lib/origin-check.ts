import { BASE_URL } from '@/lib/constants'

const ALLOWED_ORIGINS: string[] = [new URL(BASE_URL).origin]

if (process.env.NODE_ENV === 'development') {
  ALLOWED_ORIGINS.push('http://localhost:3000')
}

export function isValidOrigin(origin: string | null): boolean {
  if (!origin) return false
  return ALLOWED_ORIGINS.includes(origin)
}
