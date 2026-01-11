import { BlogPost, ServicePage } from "@/lib/types";

export const defaultServices: ServicePage[] = [
  {
    serviceSlug: "consultation",
    title: "Initial Consultation",
    summary: "Professional assessment of your needs and requirements.",
  },
  {
    serviceSlug: "implementation",
    title: "Project Implementation",
    summary: "Full-service execution for your business goals.",
  },
  {
    serviceSlug: "support",
    title: "Ongoing Support",
    summary: "24/7 dedicated support team for your peace of mind.",
  },
];

export const defaultPosts: BlogPost[] = [
  {
    postSlug: "welcome",
    title: "Welcome to our new website",
    excerpt: "We are excited to launch our new online presence.",
    publishedAt: "2024-01-01",
  },
  {
    postSlug: "tips-and-tricks",
    title: "3 Tips for Success",
    excerpt: "Learn how to get the most out of our services.",
    publishedAt: "2024-01-15",
  },
  {
    postSlug: "client-story",
    title: "Client Success Story",
    excerpt: "How we helped a local business grow by 200%.",
    publishedAt: "2024-02-01",
  },
];
