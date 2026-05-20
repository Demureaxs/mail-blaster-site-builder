import { notFound } from 'next/navigation';
import { getLead, getBlogIndex } from '@/lib/kv';
import { getTemplate } from '@/templates/registry';
import { BaseShell } from '@/components/shell/BaseShell';
import { getAllPosts } from '@/lib/markdown';
import { constructMetadata } from '@/lib/metadata';

interface PageProps {
  params: Promise<{
    industry: string;
    slug: string;
  }>;
}

export async function generateMetadata({ params }: PageProps) {
  const { industry, slug } = await params;
  const lead = await getLead(industry, slug);
  if (!lead) return constructMetadata({ title: 'Not Found' });
  return constructMetadata({ title: `Blog - ${lead.businessName}` });
}

export default async function BlogPage({ params }: PageProps) {
  const { industry, slug } = await params;
  const lead = await getLead(industry, slug);

  if (!lead) {
    notFound();
  }

  const Template = getTemplate(industry);
  const posts = (await getBlogIndex(industry, slug)) || Template.defaultPosts || getAllPosts();

  const { BlogIndex } = Template.Components;

  return (
    <BaseShell lead={lead} industry={industry} slug={slug} ctaLink={process.env.STRIPE_PAYMENT_LINK}>
      <BlogIndex lead={lead} industry={industry} slug={slug} posts={posts} stripePaymentLink={process.env.STRIPE_PAYMENT_LINK} />
    </BaseShell>
  );
}
