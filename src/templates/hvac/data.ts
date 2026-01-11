import { BlogPost, ServicePage } from "@/lib/types";

export const hvacServices: ServicePage[] = [
  {
    serviceSlug: "ac-repair",
    title: "AC Repair & Maintenance",
    summary: "Fast and reliable air conditioning repair services.",
  },
  {
    serviceSlug: "furnace-installation",
    title: "Furnace Installation",
    summary: "High-efficiency heating systems for your comfort.",
  },
  {
    serviceSlug: "duct-cleaning",
    title: "Air Duct Cleaning",
    summary: "Improve your indoor air quality with thorough duct cleaning.",
  },
];

export const hvacPosts: BlogPost[] = [
  {
    postSlug: "change-air-filters",
    title: "Why You Must Change Air Filters",
    excerpt: "The simplest way to extend the life of your HVAC system.",
    publishedAt: "2023-10-01",
  },
  {
    postSlug: "smart-thermostats",
    title: "Are Smart Thermostats Worth It?",
    excerpt: "How upgrading your thermostat can save you money.",
    publishedAt: "2023-11-20",
  },
];
