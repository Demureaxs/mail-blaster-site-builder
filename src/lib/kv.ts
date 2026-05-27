/**
 * Data layer — now delegates reads to the XLSX file.
 * Write operations (events, orders, upsert) are stubbed as console.log.
 */
import { LeadConfig, EventPayload, OrderPayload } from "./types";
import { getLead as fetchLeadData } from "./xlsx-data";

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
  console.log(`[Event Logged]: ${payload.event} at ${payload.path || ""}`);

  // Push Notification via Telegram
  const botToken = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;

  if (botToken && chatId) {
    if (payload.event === "demo_view" || payload.event === "call_clicked" || payload.event === "email_clicked") {
      let leadInfo = "Unknown Lead";
      
      // Parse industry and slug from path (e.g. /locksmith/my-slug)
      if (payload.path) {
        const parts = payload.path.split('/').filter(Boolean);
        if (parts.length >= 2) {
          const industry = parts[0];
          const slug = parts[1];
          const lead = await fetchLeadData(industry, slug);
          if (lead) {
            const cleanPhone = lead.phone ? lead.phone.replace(/[^0-9+]/g, '') : 'N/A';
            const newSiteUrl = `https://preview.teklytic.com/${industry}/${slug}`;
            
            leadInfo = `<b>${lead.businessName}</b>\n📍 ${lead.city || "Unknown City"}\n\n🔗 <a href="${lead.website}">Original Site</a>\n\n🚀 <a href="${newSiteUrl}">Preview Site</a>\n\n📞 ${cleanPhone}`;
          }
        }
      }

      const message = `🚨 <b>New Lead Activity!</b>\n\n<b>Event:</b> ${payload.event}\n<b>Target:</b>\n${leadInfo}\n\n<b>Time:</b> ${new Date().toLocaleString()}`;
      
      try {
        const res = await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            chat_id: chatId,
            text: message,
            parse_mode: "HTML",
            disable_web_page_preview: true
          }),
        });
        if (!res.ok) {
           const errJson = await res.json();
           console.error("Telegram API Error:", errJson);
        }
      } catch (err) {
        console.error("Failed to send Telegram notification:", err);
      }
    }
  }
}

export async function createOrder(payload: OrderPayload): Promise<void> {
  console.log(
    `[stub] createOrder: ${payload.industry}/${payload.slug}`,
    payload.contactEmail
  );
}
