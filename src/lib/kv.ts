import { kv } from "@vercel/kv";
import { LeadConfig, ServicePage, BlogPost, EventPayload, OrderPayload } from "./types";

// Helper to handle kv.rest calls safely (if env vars missing, might throw)
// We assume env vars are set.

export async function getLead(industry: string, slug: string): Promise<LeadConfig | null> {
  try {
    const key = `lead:${industry}:${slug}`;
    return await kv.get<LeadConfig>(key);
  } catch (err) {
    console.error("KV getLead error:", err);
    return null;
  }
}

export async function upsertLead(industry: string, slug: string, data: LeadConfig): Promise<void> {
  const key = `lead:${industry}:${slug}`;
  await kv.set(key, data);
}

// SERVICES
export async function getServices(industry: string, slug: string): Promise<ServicePage[] | null> {
  // Try to get specific overrides for this lead
  const key = `services:${industry}:${slug}`;
  return await kv.get<ServicePage[]>(key);
}

export async function getService(industry: string, slug: string, serviceSlug: string): Promise<ServicePage | null> {
  const key = `service:${industry}:${slug}:${serviceSlug}`;
  return await kv.get<ServicePage>(key);
}

// BLOG
export async function getBlogIndex(industry: string, slug: string): Promise<BlogPost[] | null> {
  const key = `blog:${industry}:${slug}`;
  return await kv.get<BlogPost[]>(key);
}

export async function getPost(industry: string, slug: string, postSlug: string): Promise<BlogPost | null> {
  const key = `post:${industry}:${slug}:${postSlug}`;
  return await kv.get<BlogPost>(key);
}

// EVENTS
export async function logEvent(payload: EventPayload): Promise<void> {
  const randomId = Math.random().toString(36).substring(2, 12);
  const ts = payload.ts || new Date().toISOString();
  // Key format: event:{ISO}:{random}
  const key = `event:${ts}:${randomId}`;
  
  // Set with expiry (e.g., 30 days) to keep usage cleaner if needed, or indefinite.
  // We'll keep it simple.
  await kv.set(key, payload);
}

// ORDERS
export async function createOrder(payload: OrderPayload): Promise<void> {
  const ts = new Date().toISOString();
  // Key format: order:{ISO}:{industry}:{slug}
  const key = `order:${ts}:${payload.industry}:${payload.slug}`;
  await kv.set(key, payload);
}
