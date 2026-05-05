'use client';

import { useSyncExternalStore } from 'react';
import { GoogleAnalytics } from '@next/third-parties/google';

const STORAGE_KEY = 'cookie-consent';

function subscribe(callback: () => void) {
  window.addEventListener('cookie-consent-update', callback);
  return () => window.removeEventListener('cookie-consent-update', callback);
}

function getSnapshot() {
  return localStorage.getItem(STORAGE_KEY) === 'granted';
}

function getServerSnapshot() {
  return false;
}

export function GoogleAnalyticsProvider() {
  const gaId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;
  const consented = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  if (!gaId || !consented) return null;

  return <GoogleAnalytics gaId={gaId} />;
}
