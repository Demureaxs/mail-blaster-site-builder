import { Metadata } from 'next';

interface MetadataProps {
  title: string;
  description?: string;
  noIndex?: boolean; // Defaults to TRUE for this demo app
}

export function constructMetadata({ title, description, noIndex = true }: MetadataProps): Metadata {
  return {
    title: `${title} | Preview Demo`,
    description: description || "Launch your professional website in 48 hours.",
    robots: noIndex ? { index: false, follow: false } : undefined,
  };
}
