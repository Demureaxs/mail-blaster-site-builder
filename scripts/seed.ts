import { upsertLead } from "../src/lib/kv";
import dotenv from "dotenv";

// Load env vars from .env.local (or .env)
dotenv.config({ path: ".env.local" });
dotenv.config({ path: ".env" });

async function seed() {
  console.log("🌱 Seeding data...");
  console.log("REDIS URL:", process.env.KV_URL || "Redfault");

  // 1. Plumbing Lead
  const plumbingLead = {
    businessName: "Bob's Plumbing Tampa",
    industry: "plumbing",
    slug: "bobs-plumbing-tampa-fl",
    city: "Tampa, FL",
    email: "bob@example.com",
    phone: "555-0199",
    services: ["leak-detection", "drain-cleaning"]
  };
  
  await upsertLead(plumbingLead.industry, plumbingLead.slug, plumbingLead);
  console.log(`✅ Created: /${plumbingLead.industry}/${plumbingLead.slug}`);

  // 2. HVAC Lead
  const hvacLead = {
    businessName: "Acme Heating Austin",
    industry: "hvac",
    slug: "acme-heating-austin-tx", 
    city: "Austin, TX",
    email: "info@acmeheating.com",
    phone: "512-555-0123"
  };

  await upsertLead(hvacLead.industry, hvacLead.slug, hvacLead);
  console.log(`✅ Created: /${hvacLead.industry}/${hvacLead.slug}`);

  console.log("\nDone! run 'npm run dev' and visit the URLs above.");
  process.exit(0);
}

seed().catch(err => {
  console.error(err);
  process.exit(1);
});
