# Teklytic Preview Demo Scaffold

This is a Next.js App Router application built to preview industry-specific websites dynamically using Vercel KV for data storage.

## Setup

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Environment Variables**
   Create a `.env.local` file with the following:
   ```bash
   # Security
   ADMIN_TOKEN=secret123

   # Vercel KV (Get these from Vercel Dashboard storage tab)
   KV_URL="redis://..."
   KV_REST_API_URL="https://..."
   KV_REST_API_TOKEN="..."
   KV_REST_API_READ_ONLY_TOKEN="..."

   # Optional Integrations
   NEXT_PUBLIC_GA4_ID=G-XXXXXXXXXX
   STRIPE_PAYMENT_LINK=https://buy.stripe.com/test_...
   ```

3. **Run Locally**
   ```bash
   npm run dev
   ```
   Visit `http://localhost:3000/plumbing/demo-plumbing-co` (will 404 until you seed data).

## Seeding Data (Test Commands)

Use `curl` to populate the KV store with demo data. Replace `secret123` with your `ADMIN_TOKEN`.

### 1. Insert/Upsert a Lead
```bash
curl -X POST http://localhost:3000/api/lead/upsert \
  -H "Content-Type: application/json" \
  -H "X-ADMIN-TOKEN: secret123" \
  -d '{
    "industry": "plumbing",
    "slug": "bobs-plumbing-tampa-fl",
    "data": {
      "businessName": "Bob'\''s Plumbing Tampa",
      "city": "Tampa, FL",
      "email": "bob@example.com",
      "phone": "555-0199"
    }
  }'
```
> **View it:** [http://localhost:3000/plumbing/bobs-plumbing-tampa-fl](http://localhost:3000/plumbing/bobs-plumbing-tampa-fl)

### 2. Override Services (Optional)
This scaffold uses default template services if none are found in KV. To override:
(This requires implementing a specific service upsert API or manually writing to KV `services:plumbing:bobs-plumbing-tampa-fl`).
*Currently, the API only supports Lead Config upsert directly. You can use Vercel CLI `vercel kv set` for detailed content management or add more API routes.*

## Adding a New Industry Template

1. **Create the Folder Structure**
   Copy `src/templates/default` to `src/templates/your-industry`.

2. **Update Data**
   Edit `src/templates/your-industry/data.ts` with industry-specific default services and blog posts.

3. **Register the Template**
   Edit `src/templates/registry.ts`:
   ```typescript
   import { YourIndustryTemplate } from "./your-industry";
   
   const templates = {
     // ...
     "your-industry": YourIndustryTemplate,
   };
   ```

4. **Done!**
   Routes like `/your-industry/some-company` will now automatically use the new template.

## Deployment

Deploy to Vercel. Ensure the KV store is linked to the project.
The application will automatically build with `npm run build`.
