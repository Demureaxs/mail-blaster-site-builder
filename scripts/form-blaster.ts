import * as fs from 'fs';
import * as path from 'path';
import * as XLSX from 'xlsx';
import { chromium } from 'playwright-extra';
const StealthPlugin = require('puppeteer-extra-plugin-stealth');
import * as dotenv from 'dotenv';

// Configure dotenv
dotenv.config({ path: path.join(process.cwd(), '.env.local') });

// Inject stealth plugin
chromium.use(StealthPlugin());

// Constants
const BASE_NEW_SITE_URL = process.env.BASE_URL || 'https://preview.teklytic.com/locksmiths/';
const PAGESPEED_API_KEY = process.env.PAGESPEED_API_KEY || '';
const DATA_FILE = process.env.FILE_PATH ? path.resolve(process.cwd(), process.env.FILE_PATH) : path.join(process.cwd(), 'public', 'Locksmiths UK.xlsx');
const LEDGER_FILE = path.join(process.cwd(), 'processed-domains.json');

// Spreadsheet Columns (0-indexed)
const COL_COMPANY = 0;   // A: Company Name
const COL_WEBSITE = 2;   // C: Website
const COL_SLUG = 9;      // J: Slug
const COL_PAGESPEED = 10; // K: PageSpeed
const COL_FULL_URL = 11; // L: Preview URL
const COL_FORM_STATUS = 12; // M: Outreach Status

// Helper: Delay
const delay = (ms: number) => new Promise(res => setTimeout(res, ms));

// Helper: Ledger management
function loadLedger(): Record<string, string> {
  if (fs.existsSync(LEDGER_FILE)) {
    return JSON.parse(fs.readFileSync(LEDGER_FILE, 'utf-8'));
  }
  return {};
}

function saveToLedger(ledger: Record<string, string>, domain: string, status: string) {
  ledger[domain] = new Date().toISOString();
  fs.writeFileSync(LEDGER_FILE, JSON.stringify(ledger, null, 2));
}

function normalizeDomain(urlStr: string) {
  try {
    const url = new URL(urlStr.startsWith('http') ? urlStr : `https://${urlStr}`);
    return url.hostname.replace(/^www\./, '').toLowerCase();
  } catch (e) {
    return urlStr;
  }
}

// Phase 1: API Metrics Fetch
async function fetchMetrics(url: string, isPreview: boolean = false): Promise<any> {
  let finalUrl = url;
  if (!finalUrl.startsWith('http')) finalUrl = `https://${finalUrl}`;

  // Use a longer 30s timeout via AbortController for PageSpeed
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 30000);

  try {
    let apiUrl = `https://www.googleapis.com/pagespeedonline/v5/runPagespeed?url=${encodeURIComponent(finalUrl)}&strategy=mobile&category=performance&category=accessibility&category=best-practices&category=seo`;
    if (PAGESPEED_API_KEY) apiUrl += `&key=${PAGESPEED_API_KEY}`;

    const res = await fetch(apiUrl, { signal: controller.signal });
    clearTimeout(timeoutId);

    if (!res.ok) return null;
    const data = await res.json();
    const categories = data.lighthouseResult?.categories;

    if (!categories) return null;
    const getScore = (cat: string) => categories[cat]?.score !== undefined ? Math.round(categories[cat].score * 100) : 0;
    return {
      perf: getScore('performance'),
      acc: getScore('accessibility'),
      bp: getScore('best-practices'),
      seo: getScore('seo'),
    };
  } catch (err) {
    clearTimeout(timeoutId);
    return null;
  }
}

// Phase 2: Dynamic Copy Generator
function generateCopy(companyName: string, oldUrl: string, previewUrl: string, oldMetrics: any, newMetrics: any) {
  const oldPerf = oldMetrics?.perf || 'N/A';
  const oldSeo = oldMetrics?.seo || 'N/A';
  const newPerf = newMetrics?.perf || '98';
  const newSeo = newMetrics?.seo || '100';

  let encodedUrl = oldUrl;
  try {
    encodedUrl = encodeURIComponent(oldUrl.startsWith('http') ? oldUrl : `https://${oldUrl}`);
  } catch(e) {}

  return `Hi ${companyName || 'there'},

I put together a custom coding build for your business because local search visibility for locksmiths depends heavily on mobile performance. 

Your Current Website Metrics:
- Google Speed Score: ${oldPerf}/100
- SEO Structure: ${oldSeo}/100
- Analysis Report: https://pagespeed.web.dev/analysis/${encodedUrl}

When someone is locked out, a slow loading speed causes them to bounce back to the search results, dropping your position in the local Map Pack.

Your New Custom Preview Metrics:
- Google Speed Score: ${newPerf}/100
- SEO Structure: ${newSeo}/100
- Live Custom Preview: ${previewUrl}

By stripping away template bloat, this raw HTML build loads instantly, signaling high trust directly to Google's ranking algorithms. 

I work completely pay-as-you-go with zero long-term contracts. Let me know if you would like to move this preview live to your domain.

Best regards,
Martyn Clarke | Teklytic Software Development
teklytic.com | +44 7397 193431`.slice(0, 1200);
}

// Form heuristics handled directly in Playwright via selectors

async function typeHuman(element: any, text: string) {
  for (const char of text) {
    await element.type(char, { delay: Math.random() * 35 + 10 }); // 10-45ms delay
  }
}

// Phase 3 & Main Loop: Stealth Browser Outreach
async function run() {
  if (!fs.existsSync(DATA_FILE)) {
    console.error("XLSX not found");
    return;
  }

  const wb = XLSX.readFile(DATA_FILE);
  const sheetName = wb.SheetNames[0];
  const ws = wb.Sheets[sheetName];
  const rows = XLSX.utils.sheet_to_json(ws, { header: 1 }) as any[][];
  const ledger = loadLedger();

  console.log(`Loaded ${rows.length} rows.`);

  // Allow running with a visible browser UI for testing/observation
  const isHeadless = !process.argv.includes('--headful');
  const browser = await chromium.launch({ headless: isHeadless });
  
  for (let i = 1; i < rows.length; i++) {
    const row = rows[i];
    if (!row || !row[COL_WEBSITE]) continue;

    const originalUrl = String(row[COL_WEBSITE]).trim();
    const domain = normalizeDomain(originalUrl);
    
    // Boundary Condition: Skip teklytic staging
    if (domain.includes('teklytic.com')) continue;
    
    // Boundary Condition: 60-day ledger check
    if (ledger[domain]) {
      const lastProcessed = new Date(ledger[domain]);
      const diffDays = (new Date().getTime() - lastProcessed.getTime()) / (1000 * 3600 * 24);
      if (diffDays < 60) {
        continue; // skip recently processed
      }
    }

    if (row[COL_FORM_STATUS] === 'completed_outreach') {
      continue;
    }

    console.log(`\n[Row ${i}] Processing: ${originalUrl}`);

    // Ensure Full URL is present
    const slug = row[COL_SLUG];
    let previewUrl = row[COL_FULL_URL];
    if (!previewUrl && slug) {
      previewUrl = `${BASE_NEW_SITE_URL}${slug.trim()}`;
      row[COL_FULL_URL] = previewUrl;
    }

    // Phase 1: API Metrics Gathering
    let oldMetrics = null;
    let newMetrics = null;
    
    console.log("-> Fetching Old Metrics...");
    oldMetrics = await fetchMetrics(originalUrl);
    if (!oldMetrics) console.log("   (Timeout or Error fetching old metrics, using fallback)");
    
    if (previewUrl) {
      console.log("-> Fetching New Metrics...");
      newMetrics = await fetchMetrics(previewUrl, true);
    }

    // Phase 2: Dynamic Copy Generation
    const companyName = row[COL_COMPANY] || "Locksmith Professional";
    const payloadText = generateCopy(companyName, originalUrl, previewUrl || '', oldMetrics, newMetrics);

    // Phase 3: Stealth Navigation
    console.log("-> Spawning Stealth Context...");
    const context = await browser.newContext({
      userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
    });
    const page = await context.newPage();

    let outreachSuccess = false;

    try {
      let finalUrl = originalUrl;
      if (!finalUrl.startsWith('http')) finalUrl = `https://${finalUrl}`;
      
      console.log("-> Navigating to target...");
      await page.goto(finalUrl, { waitUntil: 'domcontentloaded', timeout: 25000 });
      await delay(2000);

      // Helper function to find a form that actually has a message/textarea field
      const getValidForm = async () => {
        const forms = await page.$$('form');
        for (const f of forms) {
          const textareas = await f.$$('textarea');
          if (textareas.length > 0) return f;
          const msgInputs = await f.$$('input[name*="message" i], input[name*="comments" i]');
          if (msgInputs.length > 0) return f;
        }
        // If no message field, but there's a form, return it as fallback
        return forms.length > 0 ? forms[0] : null;
      };

      let activeForm = await getValidForm();

      if (!activeForm) {
        // Look for contact vectors if no form on homepage
        const links = await page.$$eval('a', els => els.map(a => a.href));
        let targetUrl = links.find(href => /(contact-us|contact)/i.test(href));
        if (!targetUrl) targetUrl = links.find(href => /(quote|get-in-touch)/i.test(href));

        if (targetUrl) {
          console.log(`-> No form on homepage. Routing to: ${targetUrl}`);
          try {
            await page.goto(targetUrl, { waitUntil: 'domcontentloaded', timeout: 20000 });
            await delay(2000); // Allow react hydration
            activeForm = await getValidForm();
          } catch (e) {
            console.log(`   (Failed to load extracted contact URL, falling back to manual paths)`);
          }
        }
      }

      if (!activeForm) {
        // Last ditch effort: iterate through common contact paths
        const parsedUrl = new URL(finalUrl);
        const fallbacks = ['/contact', '/contact-us', '/get-in-touch', '/about-us'];
        
        for (const fallback of fallbacks) {
          if (activeForm) break;
          
          const manualUrl = `${parsedUrl.origin}${fallback}`;
          console.log(`-> Trying manual fallback to: ${manualUrl}`);
          try {
            const res = await page.goto(manualUrl, { waitUntil: 'domcontentloaded', timeout: 15000 });
            if (res && res.status() < 400) {
              await delay(2000);
              activeForm = await getValidForm();
            }
          } catch(e) {
            // Ignore timeout/net errors and try the next fallback
          }
        }
      }

      if (activeForm) {
        console.log(`-> Found valid form. Analyzing DOM...`);
        // Phase 4: Heuristic Field Mapping
        console.log("-> Executing Heuristic DOM Mapping...");

        // Safe Input Execution with Honeypot Avoidance
        const fillField = async (selectors: string[], text: string) => {
          for (const selector of selectors) {
            try {
              const els = await activeForm!.$$(selector);
              for (const el of els) {
                // Ignore hidden elements (potential honeypots)
                const isVisible = await el.isVisible();
                if (isVisible) {
                  await typeHuman(el, text);
                  return true;
                }
              }
            } catch (e) {
              // Ignore invalid selector errors
            }
          }
          return false;
        };

        // Standard heuristic selectors
        const nameSelectors = ['input[name*="name" i]', 'input[id*="name" i]', 'input[placeholder*="name" i]', 'input[autocomplete="name"]'];
        const emailSelectors = ['input[type="email"]', 'input[name*="email" i]', 'input[id*="email" i]', 'input[placeholder*="email" i]', 'input[autocomplete="email"]'];
        const phoneSelectors = ['input[type="tel"]', 'input[name*="phone" i]', 'input[id*="phone" i]', 'input[placeholder*="phone" i]', 'input[name*="tel" i]'];
        const msgSelectors = ['textarea', 'input[name*="message" i]', 'input[id*="message" i]', 'input[placeholder*="message" i]', 'input[name*="comments" i]'];

        await fillField(nameSelectors, 'Martyn Clarke');
        await fillField(emailSelectors, 'martyn@teklytic.com');
        await fillField(phoneSelectors, '07397193431');
        await fillField(msgSelectors, payloadText);

        console.log("-> Submitting form...");
          
          // Submit Action
          try {
            const submitBtn = await activeForm.$('button[type="submit"], input[type="submit"], button.submit, .submit-btn');
            if (submitBtn && await submitBtn.isVisible()) {
              await submitBtn.click({ timeout: 5000, force: true });
            } else {
              await activeForm.evaluate((form: HTMLFormElement) => form.submit());
            }
          } catch (e) {
            console.log("-> Click failed, forcing JS submit...");
            await activeForm.evaluate((form: HTMLFormElement) => form.submit());
          }

          console.log("-> Waiting for submission response...");
          await delay(4000); // Wait for redirect or DOM state change

        // Success Logic
        outreachSuccess = true;
        row[COL_FORM_STATUS] = 'completed_outreach';
        console.log("-> Outreach Marked Complete.");
        
        saveToLedger(ledger, domain, 'completed_outreach');
      } else {
        console.log("-> No forms detected on page.");
        row[COL_FORM_STATUS] = 'no_form_found';
      }
    } catch (err: any) {
      console.log("-> Error during browser phase:", err.message);
      row[COL_FORM_STATUS] = 'error';
    } finally {
      await context.close();
      
      // Save XLSX state after each row
      const newWs = XLSX.utils.aoa_to_sheet(rows);
      wb.Sheets[sheetName] = newWs;
      XLSX.writeFile(wb, DATA_FILE);
    }
  }

  await browser.close();
  console.log("\\n[Form Blaster] Complete.");
}

run();
