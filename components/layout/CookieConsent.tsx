'use client';

import { useCallback, useSyncExternalStore } from 'react';
import Link from 'next/link';

const STORAGE_KEY = 'cookie-consent';

type ConsentState = 'granted' | 'denied' | null;

function subscribe(callback: () => void) {
  window.addEventListener('cookie-consent-update', callback);
  return () => window.removeEventListener('cookie-consent-update', callback);
}

function getSnapshot(): ConsentState {
  const value = localStorage.getItem(STORAGE_KEY);
  if (value === 'granted' || value === 'denied') return value;
  return null;
}

function getServerSnapshot(): ConsentState {
  return 'denied';
}

export function CookieConsent() {
  const consent = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  const handleGrant = useCallback(() => {
    localStorage.setItem(STORAGE_KEY, 'granted');
    window.dispatchEvent(new Event('cookie-consent-update'));
  }, []);

  const handleDeny = useCallback(() => {
    localStorage.setItem(STORAGE_KEY, 'denied');
    window.dispatchEvent(new Event('cookie-consent-update'));
  }, []);

  if (consent !== null) return null;

  return (
    <div
      role="dialog"
      aria-label="Cookie使用の同意"
      className="fixed bottom-0 left-0 right-0 z-50 border-t border-border bg-background p-4 shadow-lg"
    >
      <div className="mx-auto flex max-w-[960px] flex-col items-center gap-4 sm:flex-row sm:justify-between">
        <p className="text-sm text-foreground">
          当サイトではアクセス解析のためにCookieを使用しています。詳しくは
          <Link
            href="/privacy"
            className="ml-1 underline text-brand-navy dark:text-primary"
          >
            プライバシーポリシー
          </Link>
          をご覧ください。
        </p>
        <div className="flex shrink-0 gap-3">
          <button
            type="button"
            onClick={handleDeny}
            className="rounded-md border border-border px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-muted"
          >
            拒否する
          </button>
          <button
            type="button"
            onClick={handleGrant}
            className="rounded-md bg-brand-navy px-4 py-2 text-sm font-medium text-brand-cream transition-opacity hover:opacity-90 dark:bg-primary dark:text-primary-foreground"
          >
            同意する
          </button>
        </div>
      </div>
    </div>
  );
}
