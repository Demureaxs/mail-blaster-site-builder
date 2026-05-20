const fs = require('fs');
const path = require('path');
const XLSX = require('xlsx');

// Load env vars so we can use the PAGESPEED_API_KEY automatically
require('dotenv').config({ path: path.join(process.cwd(), '.env.local') });
require('dotenv').config({ path: path.join(process.cwd(), '.env') });

// Ensure we are running from project root
const defaultFilePath = path.join(process.cwd(), 'public', 'Locksmiths UK.xlsx');
const filePath = process.env.FILE_PATH ? path.resolve(process.cwd(), process.env.FILE_PATH) : defaultFilePath;

if (!fs.existsSync(filePath)) {
  console.error(`❌ XLSX file not found at ${filePath}`);
  process.exit(1);
}

// Configuration
const BASE_NEW_SITE_URL = process.env.BASE_URL || 'https://preview.teklytic.com/locksmiths/';
const BATCH_SAVE_INTERVAL = 10; // Save every N rows
const API_DELAY_MS = 2500; // Delay between API calls to avoid rate limit (ms)

// Indices (0-based)
const COL_WEBSITE = 2; // Column C
const COL_SLUG = 9;    // Column J
const COL_PAGESPEED = 10; // Column K
const COL_FULL_URL = 11; // Column L

// Simple delay function
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// Optional API Key for higher rate limits
const API_KEY = process.env.PAGESPEED_API_KEY || '';

async function getPageSpeedScore(url, retries = 3) {
  try {
    // Add https:// if missing
    let finalUrl = url;
    if (!finalUrl.startsWith('http')) {
      finalUrl = `https://${finalUrl}`;
    }

    // Google PageSpeed Insights API (v5)
    // We are querying the mobile strategy
    let apiUrl = `https://www.googleapis.com/pagespeedonline/v5/runPagespeed?url=${encodeURIComponent(finalUrl)}&strategy=mobile&category=performance&category=accessibility&category=best-practices&category=seo`;
    
    if (API_KEY) {
      apiUrl += `&key=${API_KEY}`;
    }
    
    const response = await fetch(apiUrl);
    if (!response.ok) {
      if (response.status === 429) {
        console.warn(`    ⚠️ Rate limited! (${retries} retries left)`);
        if (retries > 0) {
          await delay(15000); // 15s delay on rate limit
          return getPageSpeedScore(url, retries - 1);
        }
        return null;
      }
      if (response.status >= 500) {
        return null;
      }
      // If client error or other, might mean invalid URL or unreachable
      return 'Invalid URL/Unreachable';
    }

    const data = await response.json();
    
    // The full raw response is 600KB+ which exceeds Excel's 32k char limit per cell.
    // Return a formatted readable string of the 4 main metrics
    const categories = data.lighthouseResult?.categories;
    
    if (categories) {
      const getScore = (cat) => categories[cat]?.score !== undefined ? Math.round(categories[cat].score * 100) : 'N/A';
      const perf = getScore('performance');
      const acc = getScore('accessibility');
      const bp = getScore('best-practices');
      const seo = getScore('seo');
      
      return `Perf: ${perf} | Acc: ${acc} | BP: ${bp} | SEO: ${seo}`;
    } else {
      return 'No Score';
    }
  } catch (err) {
    return 'Error Fetching';
  }
}

async function run() {
  console.log(`📂 Loading XLSX file from ${filePath}...`);
  const fileBuffer = fs.readFileSync(filePath);
  const wb = XLSX.read(fileBuffer, { type: 'buffer' });
  const sheetName = wb.SheetNames[0];
  const ws = wb.Sheets[sheetName];
  
  // Read as array-of-arrays
  const rows = XLSX.utils.sheet_to_json(ws, { header: 1 });
  console.log(`📊 Found ${rows.length} rows.`);

  let modifiedCount = 0;

  // CLI args: node page-speed.js [limit] [startRow]
  // startRow is 1-indexed (sheet row number). Default = 1 (process everything).
  const limit = process.argv[2] ? parseInt(process.argv[2], 10) : rows.length;
  const startRow = process.argv[3] ? parseInt(process.argv[3], 10) : 1;
  const startIndex = Math.max(0, startRow - 1); // convert to 0-based index

  console.log(`▶️  Starting from row ${startRow} (index ${startIndex})`);

  for (let i = startIndex; i < Math.min(rows.length, limit); i++) {
    const row = rows[i];
    
    // Skip empty rows
    if (!row || row.length === 0 || !row[0]) continue;

    // 1) Write the full URL to Column L (index 11) using the slug from Column J (index 9)
    const slug = row[COL_SLUG];
    if (slug && typeof slug === 'string') {
      const fullUrl = `${BASE_NEW_SITE_URL}${slug.trim()}`;
      if (row[COL_FULL_URL] !== fullUrl) {
        row[COL_FULL_URL] = fullUrl;
      }
    }

    // 2) PageSpeed Insights for the existing website in Column C (index 2)
    const website = row[COL_WEBSITE];
    const existingScore = row[COL_PAGESPEED];

    // Only fetch if a website exists and we haven't successfully fetched a report yet
    if (website && typeof website === 'string' && website.trim() !== '') {
      // If we already have a score and it matches our new format (or the old JSON/number format), skip
      // We also want to refetch the JSON ones if they exist to convert them to readable format,
      // so we don't skip JSON. We skip if it starts with 'Perf:'
      if (typeof existingScore === 'string' && existingScore.startsWith('Perf:')) {
        continue;
      }
      // Keep skipping old numeric format as well to avoid refetching EVERYTHING
      if (typeof existingScore === 'number' || (typeof existingScore === 'string' && existingScore.match(/^\d+$/))) {
        continue;
      }
      
      // Also skip if it explicitly says Invalid URL
      if (existingScore === 'Invalid URL/Unreachable') {
         continue;
      }

      console.log(`[${i + 1}/${rows.length}] Fetching PageSpeed for: ${website}`);
      const score = await getPageSpeedScore(website.trim());
      
      if (score !== null) {
        console.log(`    -> Got report for: ${website}`);
        row[COL_PAGESPEED] = score;
        modifiedCount++;
      } else {
        console.log(`    -> Skipped saving due to rate limit/API error.`);
        if (existingScore === 'Rate Limited' || existingScore === 'API Error') {
           row[COL_PAGESPEED] = ''; // Clear out old error texts
           modifiedCount++;
        }
      }

      // Save periodically
      if (modifiedCount % BATCH_SAVE_INTERVAL === 0) {
        console.log(`💾 Saving progress...`);
        saveFile(wb, rows, sheetName, filePath);
      }

      // Delay to respect rate limits
      // If no API key is provided, we use a much longer delay to avoid 429
      const currentDelay = API_KEY ? API_DELAY_MS : 10000;
      await delay(currentDelay);
    }
  }

  // Final save
  if (modifiedCount > 0 || true) { // Always save at least once to ensure full URLs are saved
    console.log(`💾 Final save...`);
    saveFile(wb, rows, sheetName, filePath);
    console.log(`✅ Finished! Processed and saved.`);
  } else {
    console.log(`✅ Finished! No new scores needed fetching.`);
  }
}

function saveFile(wb, rows, sheetName, filePath) {
  const newWs = XLSX.utils.aoa_to_sheet(rows);
  wb.Sheets[sheetName] = newWs;
  
  // Write to a temp buffer, then write to file to avoid corruption if interrupted
  const newFileBuffer = XLSX.write(wb, { type: 'buffer', bookType: 'xlsx' });
  fs.writeFileSync(filePath, newFileBuffer);
}

run().catch(err => {
  console.error('Fatal error:', err);
  process.exit(1);
});
