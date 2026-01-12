import { kv as vercelKv } from "@vercel/kv";
import Redis from "ioredis";
import { LeadConfig, ServicePage, BlogPost, EventPayload, OrderPayload } from "./types";

// Determine if we should use local Redis
const useLocalRedis = !process.env.KV_REST_API_URL || process.env.USE_LOCAL_REDIS === "true";

interface KVInterface {
  get<T>(key: string): Promise<T | null>;
  set(key: string, value: any): Promise<void | any>; 
}

let kvClient: KVInterface;

if (useLocalRedis) {
    const globalWithRedis = global as typeof globalThis & {
        _redisClient?: Redis;
    };

    if (!globalWithRedis._redisClient) {
        console.log("Initializing Local Redis Connection...");
        globalWithRedis._redisClient = new Redis(process.env.KV_URL || "redis://localhost:6379");
    } else {
        // console.log("Reusing Local Redis Connection");
    }

    const redis = globalWithRedis._redisClient;
    
    kvClient = {
        get: async <T>(key: string) => {
            const val = await redis.get(key);
            return val ? JSON.parse(val) : null;
        },
        set: async (key: string, value: any) => {
            await redis.set(key, JSON.stringify(value));
        }
    };
} else {
    // Use Vercel KV (REST)
    kvClient = {
        get: async <T>(key: string) => {
             return await vercelKv.get<T>(key);
        },
        set: async (key: string, value: any) => {
             await vercelKv.set(key, value);
        }
    }
}

export async function getLead(industry: string, slug: string): Promise<LeadConfig | null> {
  try {
    const key = `lead:${industry}:${slug}`;
    return await kvClient.get<LeadConfig>(key);
  } catch (err) {
    console.error("KV getLead error:", err);
    return null;
  }
}

export async function upsertLead(industry: string, slug: string, data: LeadConfig): Promise<void> {
  const key = `lead:${industry}:${slug}`;
  await kvClient.set(key, data);
}

// SERVICES
export async function getServices(industry: string, slug: string): Promise<ServicePage[] | null> {
  const key = `services:${industry}:${slug}`;
  return await kvClient.get<ServicePage[]>(key);
}

export async function getService(industry: string, slug: string, serviceSlug: string): Promise<ServicePage | null> {
  const key = `service:${industry}:${slug}:${serviceSlug}`;
  return await kvClient.get<ServicePage>(key);
}

// BLOG
export async function getBlogIndex(industry: string, slug: string): Promise<BlogPost[] | null> {
  const key = `blog:${industry}:${slug}`;
  return await kvClient.get<BlogPost[]>(key);
}

export async function getPost(industry: string, slug: string, postSlug: string): Promise<BlogPost | null> {
  const key = `post:${industry}:${slug}:{postSlug}`;
  return await kvClient.get<BlogPost>(key);
}

// EVENTS
export async function logEvent(payload: EventPayload): Promise<void> {
  const randomId = Math.random().toString(36).substring(2, 12);
  const ts = payload.ts || new Date().toISOString();
  const key = `event:${ts}:${randomId}`;
  await kvClient.set(key, payload);
}

// ORDERS
export async function createOrder(payload: OrderPayload): Promise<void> {
  const ts = new Date().toISOString();
  const key = `order:${ts}:${payload.industry}:${payload.slug}`;
  await kvClient.set(key, payload);
}
