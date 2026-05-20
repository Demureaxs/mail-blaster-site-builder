import { notFound } from 'next/navigation';
import { getLead, getPost } from '@/lib/kv';
import { getTemplate } from '@/templates/registry';
import { BaseShell } from '@/components/shell/BaseShell';
import { getPostBySlug } from '@/lib/markdown';
import { constructMetadata } from '@/lib/metadata';

interface PageProps {
  params: Promise<{
    industry: string;
    slug: string;
    postSlug: string;
  }>;
}

export async function generateMetadata({ params }: PageProps) {
  const { industry, slug, postSlug } = await params;
  const lead = await getLead(industry, slug);
  if (!lead) return constructMetadata({ title: 'Not Found' });
  return constructMetadata({ title: `Post - ${lead.businessName}` });
}

export default async function BlogPostPage({ params }: PageProps) {
  const { industry, slug, postSlug } = await params;
  const lead = await getLead(industry, slug);

  if (!lead) {
    notFound();
  }

  const Template = getTemplate(industry);

  // Try KV first, then default from template, then markdown fallback
  let post = await getPost(industry, slug, postSlug);
  if (!post && Template.defaultPosts) {
    post = Template.defaultPosts.find((p) => p.postSlug === postSlug) || null;
  }
  if (!post) {
    post = getPostBySlug(postSlug);
  }

  if (!post) {
    notFound();
  }

  const { BlogPost } = Template.Components;

  return (
    <BaseShell lead={lead} industry={industry} slug={slug} ctaLink={process.env.STRIPE_PAYMENT_LINK}>
      <BlogPost lead={lead} industry={industry} slug={slug} post={post} stripePaymentLink={process.env.STRIPE_PAYMENT_LINK} />
    </BaseShell>
  );
}
