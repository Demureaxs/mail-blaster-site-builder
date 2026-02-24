export interface LeadConfig {
  businessName: string;
  industry: string;
  slug?: string; // usually derived from URL, but can be stored
  category?: string;
  address?: string;
  city?: string;
  state?: string;
  zip?: string;
  phone?: string;
  email?: string;
  website?: string;
  createdAt?: string;
  services?: string[]; // list of service slugs
}

export interface ServicePage {
  serviceSlug: string;
  title: string;
  summary?: string;
  htmlContent?: string;
  blocks?: Array<{ type: string; data: any }>;
}

export interface BlogPost {
  postSlug: string;
  title: string;
  excerpt?: string;
  htmlContent?: string;
  publishedAt?: string;
  author?: string;
  blocks?: Array<{ type: string; data: any }>;
}

export interface EventPayload {
  event: string;
  industry?: string;
  slug?: string;
  path?: string;
  ts?: string;
  utm?: Record<string, string>;
  referrer?: string;
  userAgent?: string;
}

export interface OrderPayload {
  industry: string;
  slug: string;
  contactEmail: string;
  contactPhone?: string;
  services?: string[];
  serviceArea?: string;
  hasDomain?: 'yes' | 'no';
  domainName?: string;
  notes?: string;
  utm?: Record<string, string>;
}
