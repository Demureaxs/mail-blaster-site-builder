import { notFound } from "next/navigation";
import { getLead } from "@/lib/kv";
import { getTemplate } from "@/templates/registry";
import { BaseShell } from "@/components/shell/BaseShell";
import { logServerEvent } from "@/lib/analytics";
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
  return constructMetadata({ title: lead.businessName });
}

export default async function Page({ params }: PageProps) {
    const { industry, slug } = await params;
  const lead = await getLead(industry, slug);

  if (!lead) {
    notFound();
  }

  // Log view
  await logServerEvent({
    event: "demo_view",
    industry,
    slug,
    path: `/${industry}/${slug}`,
  });

  const Template = getTemplate(industry);
  const { DemoHome } = Template.Components;

  return (
    <BaseShell 
        lead={lead} 
        industry={industry} 
        slug={slug}
        ctaLink={process.env.STRIPE_PAYMENT_LINK}
    >
      <DemoHome 
        lead={lead} 
        industry={industry} 
        slug={slug}
        stripePaymentLink={process.env.STRIPE_PAYMENT_LINK} 
      />
    </BaseShell>
  );
}
