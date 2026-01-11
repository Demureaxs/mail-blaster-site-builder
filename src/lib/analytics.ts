import { EventPayload } from "./types";

const GA4_ID = process.env.NEXT_PUBLIC_GA4_ID;

// Client-side tracking helper
export const trackEvent = (name: string, params?: Record<string, any>) => {
  if (typeof window !== 'undefined' && (window as any).gtag && GA4_ID) {
    (window as any).gtag('event', name, params);
  }
};

// Queue server-side event
export async function logServerEvent(payload: EventPayload) {
  try {
    if(!payload.ts) payload.ts = new Date().toISOString();
    
    // We fire-and-forget this to the API route to ensure it writes to KV
    // In a real app, you might use a proper queue or direct DB call if server-to-server.
    // For this architecture: we can call our own API or if we are already server-side,
    // we could write to KV directly if we import the kv helper.
    // To keep it clean, let's assume this is mostly used from client components via fetch,
    // OR if used server-side, better to import `logEvent` from `src/lib/kv` directly.
    
    await fetch('/api/events', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
  } catch (err) {
    console.error("Failed to log event", err);
  }
}
