'use client';
import { useEffect } from 'react';

export default function PageTracker({ eventName, props = {} }: { eventName: string, props?: Record<string, unknown> }) {
  useEffect(() => {
    if (typeof window !== 'undefined' && (window as unknown as { gtag: (...args: unknown[]) => void }).gtag) {
      (window as unknown as { gtag: (...args: unknown[]) => void }).gtag('event', eventName, props);
    }
  }, [eventName, props]);
  return null;
}
