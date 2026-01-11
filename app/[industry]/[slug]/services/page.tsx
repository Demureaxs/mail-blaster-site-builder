import { notFound } from "next/navigation";
import { getLead, getServices } from "@/lib/kv";
import { getTemplate } from "@/templates/registry";
import { BaseShell } from "@/components/shell/BaseShell";
import { constructMetadata } from "@/lib/metadata";

interface PageProps {
  params: Promise<{
    industry: string;
    slug: string;
  }>;
}

export async function generateMetadata({ params }: PageProps) {
    const { industry, slug } = await params;
  const lead = await getLead(industry, slug);
  if (!lead) return constructMetadata({ title: "Not Found" });
  return constructMetadata({ title: `Services - ${lead.businessName}` });
}

export default async function ServicesPage({ params }: PageProps) {
    const { industry, slug } = await params;
  const lead = await getLead(industry, slug);

  if (!lead) {
    notFound();
  }

  const Template = getTemplate(industry);
  // Fetch services from KV or fallback to template defaults
  const services = await getServices(industry, slug) || Template.defaultServices;
  
  const { ServicesIndex } = Template.Components;

  return (
    <BaseShell lead={lead} industry={industry} slug={slug} ctaLink={process.env.STRIPE_PAYMENT_LINK}>
      <ServicesIndex 
        lead={lead} 
        industry={industry} 
        slug={slug}
        services={services}
        stripePaymentLink={process.env.STRIPE_PAYMENT_LINK} 
      />
    </BaseShell>
  );
}
