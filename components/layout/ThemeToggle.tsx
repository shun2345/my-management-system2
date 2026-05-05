'use client'

import { useSyncExternalStore } from 'react'
import { useTheme } from 'next-themes'
import { Moon, Sun } from 'lucide-react'
import { Button } from '@/components/ui/button'

const emptySubscribe = () => () => {}

function useIsMounted() {
  return useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false
  )
}

export function ThemeToggle() {
  const { theme, setTheme } = useTheme()
  const mounted = useIsMounted()

  if (!mounted) {
    return (
      <Button variant="ghost" size="icon" aria-label="テーマ切替" disabled>
        <Sun className="size-5" />
      </Button>
    )
  }

  return (
    <Button
      variant="ghost"
      size="icon"
      aria-label={theme === 'dark' ? 'ライトモードに切替' : 'ダークモードに切替'}
      onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
    >
      {theme === 'dark' ? (
        <Sun className="size-5" />
      ) : (
        <Moon className="size-5" />
      )}
    </Button>
  )
}
