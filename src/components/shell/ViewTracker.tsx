'use client';

import { useEffect, useRef } from 'react';

export function ViewTracker({ industry, slug }: { industry?: string; slug?: string }) {
  const hasTracked = useRef(false);

  useEffect(() => {
    if (hasTracked.current || !industry || !slug) return;
    hasTracked.current = true;

    fetch('/api/events', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        event: 'demo_view',
        industry,
        slug,
        path: `/${industry}/${slug}`,
      }),
    }).catch(console.error);
  }, [industry, slug]);

  return null;
}
