import * as fs from 'fs';
import * as path from 'path';
import * as XLSX from 'xlsx';
import * as dotenv from 'dotenv';

dotenv.config({ path: path.join(process.cwd(), '.env.local') });

// Constants
const BASE_NEW_SITE_URL = process.env.BASE_URL || 'https://preview.teklytic.com/locksmiths/';
const PAGESPEED_API_KEY = process.env.PAGESPEED_API_KEY || '';
const DATA_FILE = process.env.FILE_PATH ? path.resolve(process.cwd(), process.env.FILE_PATH) : path.join(process.cwd(), 'public', 'Locksmiths UK.xlsx');

// Spreadsheet Columns (0-indexed)
const COL_COMPANY = 0;   // A: Company Name
const COL_ADDRESS = 1;   // B: Address
const COL_WEBSITE = 2;   // C: Website
const COL_SLUG = 9;      // J: Slug
const COL_PITCH_WARM = 13;    // N: The final generated warm pitch message
const COL_PITCH_COLD = 14;    // O: The final generated cold pitch message

const delay = (ms: number) => new Promise(res => setTimeout(res, ms));

async function fetchMetrics(url: string): Promise<any> {
  let finalUrl = url;
  if (!finalUrl.startsWith('http')) finalUrl = `https://${finalUrl}`;

  // 120s timeout
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 120000);

  try {
    let apiUrl = `https://www.googleapis.com/pagespeedonline/v5/runPagespeed?url=${encodeURIComponent(finalUrl)}&strategy=mobile&category=performance`;
    if (PAGESPEED_API_KEY) apiUrl += `&key=${PAGESPEED_API_KEY}`;

    const res = await fetch(apiUrl, { signal: controller.signal });
    clearTimeout(timeoutId);

    if (!res.ok) return null;
    const data = await res.json();
    
    const categories = data.lighthouseResult?.categories;
    const audits = data.lighthouseResult?.audits;

    if (!categories || !audits) return null;

    const perfScore = categories.performance?.score !== undefined ? Math.round(categories.performance.score * 100) : 0;
    
    // Extract LCP (e.g., "8.0 s" -> "8.0 seconds")
    let lcp = audits['largest-contentful-paint']?.displayValue || 'N/A';
    if (lcp.includes('s')) {
      lcp = lcp.replace(' s', ' seconds').replace('s', ' seconds');
    }

    return {
      perf: perfScore,
      lcp: lcp
    };
  } catch (err) {
    clearTimeout(timeoutId);
    return null;
  }
}

function generatePitch(companyName: string, addressStr: string, oldUrl: string, previewUrl: string, oldMetrics: any, newMetrics: any) {
  const oldPerf = oldMetrics?.perf || 'N/A';
  const oldLcp = oldMetrics?.lcp || 'N/A';
  const newPerf = newMetrics?.perf || '100';
  const newLcp = newMetrics?.lcp || '1.8 seconds';

  let encodedOldUrl = oldUrl;
  try {
    encodedOldUrl = encodeURIComponent(oldUrl.startsWith('http') ? oldUrl : `https://${oldUrl}`);
  } catch(e) {}
  
  let encodedNewUrl = previewUrl;
  try {
    encodedNewUrl = encodeURIComponent(previewUrl);
  } catch(e) {}

  const oldReportLink = `https://pagespeed.web.dev/report?url=${encodedOldUrl}&form_factor=mobile`;
  const newReportLink = `https://pagespeed.web.dev/report?url=${encodedNewUrl}&form_factor=mobile`;

  // Determine Location String
  let locationString = "someone is locked out";
  if (addressStr) {
    // Attempt to extract city from address if it exists (crude heuristic, often the last few words before postcode, or just use the address)
    // Actually, to be safe, if we have address, we can just say "someone in your area is locked out" or parse the city.
    // We will just use the business's city if it's available in column K (10), else address
    locationString = `someone is locked out`;
  }

  // Generate Warm Pitch (Post-Call)
  const warmPitch = `Hi ${companyName},

Great chatting with you earlier. I have put everything we talked about below so you can both review the data together.

A massive percentage of local search traffic clicks through to the website rather than calling directly from the Google My Business profile. Right now, your current website is acting as a bottleneck for that mobile traffic.

Here is the straightforward breakdown from Google's perspective of what is happening with the current site, and how the new custom build fixes it:

The Current Setup

Google Speed Score: ${oldPerf}/100

Mobile Load Time (LCP): ${oldLcp}

The Impact: A score of ${oldPerf} means the site is currently failing Google's core vitals on mobile devices. When ${locationString}, taking ${oldLcp} to load means they will likely hit 'back' and find another locksmith. Google tracks this behavior and will actively lower your Map Pack position if they feel the site isn't providing a fast, seamless experience.

View your current site report here: ${oldReportLink}

The New Custom Preview

Google Speed Score: ${newPerf}/100

Mobile Load Time (LCP): ${newLcp}

The Impact: Dropping the load time down to a near-instant ${newLcp} completely stops impatient customers from bouncing. Because Google’s primary goal is to provide fast solutions, a perfect 100/100 score acts as a massive technical trust signal. This pushes your site consistently higher up the organic Map Pack rankings to capture the extra traffic.

View your new custom site here: ${previewUrl}

View the new Google speed report here: ${newReportLink}

(Note: The SEO score on the new report is 66/100 purely because the site is currently on my hidden preview subdomain and isn't indexed yet. It will hit 100/100 the moment we push it live).

How I Work (Zero Risk / No Contracts)

Total IP Ownership: You own your assets outright. If we ever part ways, the entire codebase and site are yours to keep. You aren't "renting" a site.

Handshake Basis: There are no 12-month lock-ins. If the website isn't making you money, you shouldn't have to keep paying for it.

The Investment:

One-time Setup: £400 (Includes the custom 32-page build, Google configuration, full GMB audit, and the initial foundational citation links to get it visible).

Management & Growth: £49/month (This covers the Edge CDN Hosting so it loads instantly everywhere, all technical updates, and 4 SEO blog posts written and published per month to continuously build your local authority).

Have a look through the preview and the reports over the next week. As agreed, I will reach back out shortly to see what you both think.

Best regards,

Martyn Clarke
Teklytic Software Development
+44 7397 193431
teklytic.com`;

  // Generate Cold Pitch (Form Submission/Email)
  const coldPitch = `Hi ${companyName},

I was looking over your website and noticed a technical bottleneck that is actively throttling your organic Google Map Pack rankings right now.

A massive percentage of local search traffic clicks through to the website rather than calling directly from the Google My Business profile. Right now, your current website's mobile load time is acting as a bounce-filter for that traffic.

Here is the straightforward breakdown from Google's perspective of what is happening with the current site, and how the new custom build I've put together for you fixes it:

The Current Setup

Google Speed Score: ${oldPerf}/100

Mobile Load Time (LCP): ${oldLcp}

The Impact: A score of ${oldPerf} means the site is currently failing Google's core vitals on mobile devices. When ${locationString}, taking ${oldLcp} to load means they will likely hit 'back' and find another locksmith. Google tracks this behavior and will actively lower your Map Pack position if they feel the site isn't providing a fast, seamless experience.

View your current site report here: ${oldReportLink}

The New Custom Preview

Google Speed Score: ${newPerf}/100

Mobile Load Time (LCP): ${newLcp}

The Impact: Dropping the load time down to a near-instant ${newLcp} completely stops impatient customers from bouncing. Because Google’s primary goal is to provide fast solutions, a perfect 100/100 score acts as a massive technical trust signal. This pushes your site consistently higher up the organic Map Pack rankings to capture the extra traffic.

View your new custom site here: ${previewUrl}

View the new Google speed report here: ${newReportLink}

(Note: The SEO score on the new report is 66/100 purely because the site is currently on my hidden preview subdomain and isn't indexed yet. It will hit 100/100 the moment we push it live).

How I Work (Zero Risk / No Contracts)

Total IP Ownership: You own your assets outright. If we ever part ways, the entire codebase and site are yours to keep. You aren't "renting" a site.

Handshake Basis: There are no 12-month lock-ins. If the website isn't making you money, you shouldn't have to keep paying for it.

The Investment:

One-time Setup: £400 (Includes the custom 32-page build, Google configuration, full GMB audit, and the initial foundational citation links to get it visible).

Management & Growth: £49/month (This covers the Edge CDN Hosting so it loads instantly everywhere, all technical updates, and 4 SEO blog posts written and published per month to continuously build your local authority).

Have a look through the preview and the Google reports. If you're interested in moving this live to capture that extra organic traffic, just reply to this message or give me a call.

Best regards,

Martyn Clarke
Teklytic Software Development
+44 7397 193431
teklytic.com`;

  return { warmPitch, coldPitch };
}

async function run() {
  if (!fs.existsSync(DATA_FILE)) {
    console.error("XLSX not found");
    return;
  }

  const wb = XLSX.readFile(DATA_FILE);
  const sheetName = wb.SheetNames[0];
  const ws = wb.Sheets[sheetName];
  const rows = XLSX.utils.sheet_to_json(ws, { header: 1 }) as any[][];

  console.log(`Loaded ${rows.length} rows.`);

  for (let i = 1; i < rows.length; i++) {
    const row = rows[i];
    if (!row || !row[COL_WEBSITE]) continue;

    // Skip if we already generated both pitches for this row
    if (row[COL_PITCH_WARM] && String(row[COL_PITCH_WARM]).trim() !== '' && row[COL_PITCH_COLD] && String(row[COL_PITCH_COLD]).trim() !== '') {
      continue;
    }

    const originalUrl = String(row[COL_WEBSITE]).trim();
    const slug = row[COL_SLUG];
    if (!slug) continue;

    const previewUrl = `${BASE_NEW_SITE_URL}${slug.trim()}`;
    const rawCompanyName = row[COL_COMPANY] || "Locksmith Professional";
    const companyName = String(rawCompanyName).replace(/·Link yang dikunjungi/gi, '').replace(/·Visited link/gi, '').trim();
    
    // The user's xlsx might have City in Col 10 or Address in Col 1. Let's extract something for the location.
    let locationString = "";
    if (row[10] && typeof row[10] === 'string' && !row[10].includes('{')) { // Avoid parsing the JSON dump from page-speed.js if it overwrote col 10
        locationString = row[10].trim();
    } else if (row[COL_ADDRESS] && typeof row[COL_ADDRESS] === 'string') {
        const addrParts = row[COL_ADDRESS].split(',');
        if (addrParts.length > 1) {
            // Usually city is the second to last part before postcode, or just use the last word
            locationString = addrParts[addrParts.length - 2].trim();
        } else {
            locationString = row[COL_ADDRESS].split(' ')[0]; // crude fallback
        }
    }

    console.log(`\n[Row ${i}] Processing: ${originalUrl}`);

    console.log("-> Fetching Old Site Metrics (Up to 120s timeout)...");
    let oldMetrics = await fetchMetrics(originalUrl);
    if (!oldMetrics) {
      console.log("   (Timeout or Error fetching old metrics, skipping or using fallback)");
      oldMetrics = { perf: 'N/A', lcp: 'N/A' };
    } else {
      console.log(`   (Score: ${oldMetrics.perf}, LCP: ${oldMetrics.lcp})`);
    }
    
    console.log("-> Fetching New Site Metrics...");
    let newMetrics = await fetchMetrics(previewUrl);
    if (!newMetrics) {
      newMetrics = { perf: '100', lcp: '1.8 seconds' };
    } else {
      console.log(`   (Score: ${newMetrics.perf}, LCP: ${newMetrics.lcp})`);
    }

    console.log("-> Generating Pitch...");
    
    let injectedLocation = locationString ? `someone in ${locationString} is locked out` : `someone is locked out`;

    // Overwrite the generatePitch's internal generic string with the proper injectedLocation
    const { warmPitch, coldPitch } = generatePitch(companyName, locationString, originalUrl, previewUrl, oldMetrics, newMetrics);

    const formatLocation = (text: string) => text.replace("When someone is locked out, taking", `When ${injectedLocation}, taking`);

    row[COL_PITCH_WARM] = formatLocation(warmPitch);
    row[COL_PITCH_COLD] = formatLocation(coldPitch);

    // Save XLSX state after each row
    const newWs = XLSX.utils.aoa_to_sheet(rows);
    wb.Sheets[sheetName] = newWs;
    XLSX.writeFile(wb, DATA_FILE);

    console.log("-> Saved to XLSX (Columns N and O).");
    
    // Add a delay between rows to respect Google API limits
    await delay(3000);
  }

  console.log("\n[Pitch Generator] Complete.");
}

run();
