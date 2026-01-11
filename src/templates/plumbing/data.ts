import { BlogPost, ServicePage } from "@/lib/types";

export const plumbingServices: ServicePage[] = [
  {
    serviceSlug: "leak-detection",
    title: "Leak Detection & Repair",
    summary: "Advanced electronic leak detection to find hidden leaks quickly.",
  },
  {
    serviceSlug: "drain-cleaning",
    title: "Professional Drain Cleaning",
    summary: "Clear stubborn clogs and restore your plumbing flow.",
  },
  {
    serviceSlug: "water-heaters",
    title: "Water Heater Installation",
    summary: "Expert installation and repair of tank and tankless water heaters.",
  },
  {
    serviceSlug: "emergency-plumbing",
    title: "24/7 Emergency Plumbing",
    summary: "Rapid response for burst pipes, backups, and critical failures.",
  },
];

export const plumbingPosts: BlogPost[] = [
  {
    postSlug: "prevent-frozen-pipes",
    title: "How to Prevent Frozen Pipes This Winter",
    excerpt: "Essential tips to protect your home from water damage during cold snaps.",
    publishedAt: "2023-11-15",
  },
  {
    postSlug: "tankless-vs-tank",
    title: "Tankless vs. Traditional Water Heaters",
    excerpt: "Comparing the pros and cons to help you decide what's best for your home.",
    publishedAt: "2023-12-05",
  },
  {
    postSlug: "signs-of-leak",
    title: "5 Signs You Have a Hidden Water Leak",
    excerpt: "Don't let a small leak turn into a major disaster.",
    publishedAt: "2024-01-10",
  },
];
