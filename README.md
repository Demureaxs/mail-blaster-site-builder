# Mail Blaster / Site Builder Architecture

This repository is a fully integrated **Mass Outreach & Automated Site Generation Pipeline**. It serves thousands of personalized, high-performance website previews to leads, monitors their engagement in real-time via Telegram, and provides an arsenal of automated outreach scripts to contact them.

---

## 🏗 Core Architecture

The system is built on Next.js 14 (App Router) and uses a raw `.xlsx` spreadsheet as its database. Instead of manually creating websites, the system dynamically renders a complete, tailored website template on the fly for every single row in the spreadsheet.

### How it Works (The Web App)
- **`app/[industry]/[slug]/page.tsx`**: The core dynamic route. When a user visits `/locksmiths/my-company-slug`, Next.js parses the slug, searches the Excel sheet (`src/lib/xlsx-data.ts`) for the corresponding row, and injects their specific data (Name, Phone, Address, Reviews) into the React template.
- **`src/templates/`**: Houses the modular design templates (e.g. Locksmiths, Plumbing).
- **`src/components/shell/`**: The persistent layout wrappers, including the navigation bar and the "Claim This Website" Stripe payment banner.

---

## 📡 Real-Time Lead Tracking (Telegram)

To monitor engagement, the site features a silent, client-side tracking system that notifies your phone the exact second a lead opens their custom preview link.

### How it works:
1. **`ViewTracker.tsx`**: Embedded in the `BaseShell`, this invisible client component fires a background `POST` request to `/api/events` the moment the page renders. This allows the page itself to remain statically cached (preserving 100/100 PageSpeed scores) while still tracking the visit.
2. **`src/lib/kv.ts`**: The server-side event handler receives the ping, queries the Excel sheet for the lead's rich data, and formats an HTML payload.
3. **Telegram API**: It pushes the payload (Business Name, City, Original Link, Preview Link, and clickable Phone Number) directly to your Telegram app.

**Required Environment Variables (`.env.local` or Vercel):**
- `TELEGRAM_BOT_TOKEN`
- `TELEGRAM_CHAT_ID`

---

## 🤖 Automated Outreach Scripts

Located in the `/scripts/` directory, these backend Node.js scripts handle the heavy lifting of data enrichment and direct lead contact.

### 1. The Pitch Generator (`generate-pitches.ts`)
**Purpose:** The ultimate manual-outreach asset. It generates a massive, highly-personalized pitch message for every lead and saves it to **Column N** in the spreadsheet. 
**Execution:** `npx tsx scripts/generate-pitches.ts`
- **What it does:** Iterates through the spreadsheet, hits the Google PageSpeed API to grab both the Performance Score (0-100) and the **LCP Load Time in seconds** for their *original* site and the *new custom preview* site. It then compiles this data into a persuasive, formatted text message ready to be copy-pasted into WhatsApp, Emails, or Contact Forms.
- **Smart Resuming:** Skips rows that already have a generated pitch in Column N. To regenerate a row, simply delete the text in that cell.

### 2. The Form Blaster (`form-blaster.ts`)
**Purpose:** An autonomous browser agent that physically navigates to target websites and submits contact forms.
**Execution:** `npx tsx scripts/form-blaster.ts` (Use `--headful` to watch the browser UI).
- **What it does:** Uses Playwright and Puppeteer Stealth to bypass bot detection. It lands on the lead's site, heuristically scans the DOM for contact forms (or hunts for `/contact` pages if none exist on the homepage), fills out the form using human-mimicking keystroke delays, and forces a submission.
- **Ledger System:** Tracks successes in `processed-domains.json` so it never spams the same business twice within 60 days.

### 3. PageSpeed Bulk Fetcher (`page-speed.js`)
**Purpose:** The legacy script used for enriching the spreadsheet with raw JSON metric data.
**Execution:** `node scripts/page-speed.js`
- **What it does:** Connects to the Google Lighthouse API to pull speed metrics and dumps the raw output into the spreadsheet. *(Note: Largely superseded by `generate-pitches.ts` which extracts and formats the data cleanly).*

---

## 🚀 Deployment & Environment

When deploying to Vercel, ensure the following environment variables are set in the project settings:

```env
# Google Cloud API Key for PageSpeed/Lighthouse fetching
PAGESPEED_API_KEY=your_google_api_key

# Telegram Bot Credentials
TELEGRAM_BOT_TOKEN=your_bot_token
TELEGRAM_CHAT_ID=your_chat_id

# The base URL for the hosted preview sites
BASE_URL=https://preview.teklytic.com/locksmiths/

# The Stripe checkout link embedded in the top banner
STRIPE_PAYMENT_LINK=https://buy.stripe.com/...
```

*Note: After adding environment variables to Vercel, you must trigger a manual **Redeploy** for them to take effect on the live server.*
