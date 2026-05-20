/**
 * One-shot script: Adds a "Slug" column to the Locksmiths UK.xlsx file.
 *
 * Run with:  npx tsx scripts/add-slugs.ts
 */
import * as XLSX from "xlsx";
import * as path from "path";

const defaultPath = path.join(process.cwd(), "public", "Locksmiths UK.xlsx");
const XLSX_PATH = process.env.FILE_PATH ? path.resolve(process.cwd(), process.env.FILE_PATH) : defaultPath;

function toSlug(name: string): string {
  return name
    .toLowerCase()
    .replace(/·link yang dikunjungi/gi, "")
    .replace(/['']/g, "")
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

async function main() {
  console.log(`📂 Reading ${XLSX_PATH}…`);
  const wb = XLSX.readFile(XLSX_PATH);
  const ws = wb.Sheets[wb.SheetNames[0]];
  const rows: any[][] = XLSX.utils.sheet_to_json(ws, { header: 1 });

  console.log(`   Found ${rows.length} rows`);

  const slugCounts = new Map<string, number>();
  let added = 0;

  for (const row of rows) {
    if (!row[0]) continue;

    const rawName = String(row[0]);
    const baseSlug = toSlug(rawName);
    if (!baseSlug) continue;

    const count = slugCounts.get(baseSlug) || 0;
    slugCounts.set(baseSlug, count + 1);
    const slug = count === 0 ? baseSlug : `${baseSlug}-${count + 1}`;

    // Write slug into column index 9
    row[9] = slug;
    added++;
  }

  // Rebuild the worksheet from the modified rows
  const newWs = XLSX.utils.aoa_to_sheet(rows);
  wb.Sheets[wb.SheetNames[0]] = newWs;

  XLSX.writeFile(wb, XLSX_PATH);
  console.log(`✅ Wrote slugs for ${added} rows back to ${XLSX_PATH}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
