import * as XLSX from 'xlsx';
import * as path from 'path';
import * as fs from 'fs';
import { LeadConfig, ServicePage, BlogPost } from './types';

/**
 * XLSX column mapping (headerless sheet):
 *  0 = Business Name (may contain "·Link yang dikunjungi" suffix)
 *  1 = Address
 *  2 = Website
 *  3 = Phone
 *  4 = Email (often empty)
 *  5 = Rating
 *  6 = Latitude
 *  7 = Longitude
 *  8 = Source file
 *  9 = Slug (generated — may not exist yet)
 */

// ── Slug helper ──────────────────────────────────────────────────────
function toSlug(name: string): string {
  return name
    .toLowerCase()
    .replace(/·link yang dikunjungi/gi, '') // strip artefact
    .replace(/['']/g, '') // strip curly quotes
    .replace(/&/g, 'and')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

// ── In-memory cache ──────────────────────────────────────────────────
let cachedLeads: Map<string, LeadConfig> | null = null;

function getXlsxPath(): string {
  // Works both in dev (process.cwd()) and prod
  return path.join(process.cwd(), 'public', 'Locksmiths UK.xlsx');
}

function loadLeads(): Map<string, LeadConfig> {
  // Only use in-memory cache in production. During development,
  // re-reading the XLSX file allows live content updates.
  if (process.env.NODE_ENV !== 'development' && cachedLeads) return cachedLeads;

  const filePath = getXlsxPath();
  if (!fs.existsSync(filePath)) {
    console.error(`XLSX file not found at ${filePath}`);
    cachedLeads = new Map();
    return cachedLeads;
  }

  const fileBuffer = fs.readFileSync(filePath);
  const wb = XLSX.read(fileBuffer, { type: 'buffer' });
  const ws = wb.Sheets[wb.SheetNames[0]];
  // Read as array-of-arrays (no header row)
  const rows: any[][] = XLSX.utils.sheet_to_json(ws, { header: 1 });

  const map = new Map<string, LeadConfig>();
  const slugCounts = new Map<string, number>();

  for (const row of rows) {
    if (!row[0]) continue; // skip empty rows

    const rawName: string = String(row[0]);
    // Clean the business name
    const businessName = rawName.replace(/·Link yang dikunjungi/gi, '').trim();

    let baseSlug = toSlug(rawName);
    if (!baseSlug) continue;

    // Handle duplicate slugs by appending a counter
    const count = slugCounts.get(baseSlug) || 0;
    slugCounts.set(baseSlug, count + 1);
    const slug = count === 0 ? baseSlug : `${baseSlug}-${count + 1}`;

    // Check if row already has a slug in column 9
    const existingSlug = row[9] ? String(row[9]).trim() : '';
    const finalSlug = existingSlug || slug;

    const lead: LeadConfig = {
      businessName,
      industry: 'locksmiths',
      slug: finalSlug,
      address: row[1] ? String(row[1]).trim() : undefined,
      phone: row[3] ? String(row[3]).trim() : undefined,
      email: row[4] ? String(row[4]).trim() : undefined,
      website: row[2] ? String(row[2]).trim() : undefined,
    };

    map.set(finalSlug, lead);
  }

  console.log(`📊 Loaded ${map.size} leads from XLSX`);
  cachedLeads = map;
  return map;
}

// Force reload (useful after slug script runs)
export function invalidateCache(): void {
  cachedLeads = null;
}

// ── Public API (same signatures as kv.ts) ────────────────────────────

export async function getLead(industry: string, slug: string): Promise<LeadConfig | null> {
  const leads = loadLeads();
  return leads.get(slug) || null;
}

export async function getServices(industry: string, slug: string): Promise<ServicePage[] | null> {
  // No per-lead services in the XLSX — fall through to template defaults
  return null;
}

export async function getService(industry: string, slug: string, serviceSlug: string): Promise<ServicePage | null> {
  return null;
}

export async function getBlogIndex(industry: string, slug: string): Promise<BlogPost[] | null> {
  return null;
}

export async function getPost(industry: string, slug: string, postSlug: string): Promise<BlogPost | null> {
  return null;
}

// ── Listing helper (useful for debugging / future index page) ────────
export function getAllLeads(): LeadConfig[] {
  const leads = loadLeads();
  return Array.from(leads.values());
}
