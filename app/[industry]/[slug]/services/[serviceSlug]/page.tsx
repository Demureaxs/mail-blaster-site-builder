import { notFound } from "next/navigation";
import { getLead, getService } from "@/lib/kv";
import { getTemplate } from "@/templates/registry";
import { BaseShell } from "@/components/shell/BaseShell";
import { constructMetadata } from "@/lib/metadata";

interface PageProps {
  params: Promise<{
    industry: string;
    slug: string;
    serviceSlug: string;
  }>;
}

export async function generateMetadata({ params }: PageProps) {
    const { industry, slug, serviceSlug } = await params;
  const lead = await getLead(industry, slug);
  // We can't easily sync check service here without duplicate call, 
  // but metadata is non-blocking usually.
  if (!lead) return constructMetadata({ title: "Not Found" });
  return constructMetadata({ title: `Service - ${lead.businessName}` });
}

export default async function ServiceDetailPage({ params }: PageProps) {
    const { industry, slug, serviceSlug } = await params;
  const lead = await getLead(industry, slug);

  if (!lead) {
    notFound();
  }

  const Template = getTemplate(industry);
  
  // Try KV first, then find in defaults
  let service = await getService(industry, slug, serviceSlug);
  if (!service) {
    service = Template.defaultServices.find(s => s.serviceSlug === serviceSlug) || null;
  }

  if (!service) {
    notFound();
  }

  const { ServiceDetail } = Template.Components;

  return (
    <BaseShell lead={lead} industry={industry} slug={slug} ctaLink={process.env.STRIPE_PAYMENT_LINK}>
      <ServiceDetail 
        lead={lead} 
        industry={industry} 
        slug={slug} 
        service={service}
        stripePaymentLink={process.env.STRIPE_PAYMENT_LINK}
      />
    </BaseShell>
  );
}
