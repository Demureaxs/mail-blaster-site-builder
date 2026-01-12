import { EventPayload } from "./types";

const GA4_ID = process.env.NEXT_PUBLIC_GA4_ID;

// Client-side tracking helper
export const trackEvent = (name: string, params?: Record<string, any>) => {
  if (typeof window !== 'undefined' && (window as any).gtag && GA4_ID) {
    (window as any).gtag('event', name, params);
  }
};

// Queue server-side event
// Queue server-side event
export async function logServerEvent(payload: EventPayload) {
  try {
    if(!payload.ts) payload.ts = new Date().toISOString();
    
    // Check if running on server vs client
    if (typeof window === 'undefined') {
       // Server-side: Direct KV write (Dynamic import to avoid client bundle issues if any)
       const { logEvent } = await import("@/lib/kv");
       await logEvent(payload);
    } else {
       // Client-side: Fetch API
       await fetch('/api/events', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
       });
    }
  } catch (err) {
    console.error("Failed to log event", err);
  }
}
