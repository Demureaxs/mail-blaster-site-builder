import { BlogPost, ServicePage } from '@/lib/types';

export const defaultServices: ServicePage[] = [
  {
    serviceSlug: 'emergency-lockout',
    title: 'Emergency 24/7 Lockout',
    summary: 'Rapid-response non-destructive entry for homes, businesses, and vehicles.',
  },
  {
    serviceSlug: 'lock-replacement',
    title: 'Lock Replacement & Upgrades',
    summary: 'High-security anti-snap locks and deadbolts installed to British Standards.',
  },
  {
    serviceSlug: 'upvc-doors',
    title: 'UPVC Door & Window Locks',
    summary: 'Specialist repair and replacement of multipoint UPVC locking mechanisms.',
  },
  {
    serviceSlug: 'commercial-access',
    title: 'Commercial Access Control',
    summary: 'Master key systems, digital locks, and high-security business installations.',
  },
  {
    serviceSlug: 'key-cutting',
    title: 'Mobile Key Cutting',
    summary: 'Precision key duplication on-site for mortice, cylinder, and high-security keys.',
  },
  {
    serviceSlug: 'auto-locksmith',
    title: 'Auto Locksmith Services',
    summary: 'Vehicle entry, transponder key programming, and broken key extraction.',
  },
  {
    serviceSlug: 'burglary-repairs',
    title: 'Burglary Repairs & Boarding',
    summary: 'Immediate post-break-in securing, boarding up, and lock replacement.',
  },
];

export const defaultPosts: BlogPost[] = [
  {
    postSlug: 'welcome',
    title: 'Welcome to our new website',
    excerpt: 'We are excited to launch our new online presence.',
    publishedAt: '2024-01-01',
  },
  {
    postSlug: 'tips-and-tricks',
    title: '3 Tips for Success',
    excerpt: 'Learn how to get the most out of our services.',
    publishedAt: '2024-01-15',
  },
  {
    postSlug: 'client-story',
    title: 'Client Success Story',
    excerpt: 'How we helped a local business grow by 200%.',
    publishedAt: '2024-02-01',
  },
];
