/**
 * Data layer — now delegates reads to the XLSX file.
 * Write operations (events, orders, upsert) are stubbed as console.log.
 */
import { LeadConfig, EventPayload, OrderPayload } from "./types";

// ── Read operations (from XLSX) ──────────────────────────────────────
export {
  getLead,
  getServices,
  getService,
  getBlogIndex,
  getPost,
} from "./xlsx-data";

// ── Write operations (stubbed) ───────────────────────────────────────

export async function upsertLead(
  industry: string,
  slug: string,
  data: LeadConfig
): Promise<void> {
  console.log(`[stub] upsertLead: ${industry}/${slug}`, data.businessName);
}

export async function logEvent(payload: EventPayload): Promise<void> {
  console.log(`[stub] logEvent: ${payload.event}`, payload.path || "");
}

export async function createOrder(payload: OrderPayload): Promise<void> {
  console.log(
    `[stub] createOrder: ${payload.industry}/${payload.slug}`,
    payload.contactEmail
  );
}
