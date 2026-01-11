import { BlogPost, LeadConfig, ServicePage } from "@/lib/types";
import { ComponentType } from "react";

export interface TemplateProps {
  lead: LeadConfig;
  industry: string;
  slug: string;
  stripePaymentLink?: string;
  // Context-specific data
  service?: ServicePage;
  services?: ServicePage[];
  post?: BlogPost;
  posts?: BlogPost[];
}

export interface TemplateComponents {
  DemoHome: ComponentType<TemplateProps>;
  ServicesIndex: ComponentType<TemplateProps>;
  ServiceDetail: ComponentType<TemplateProps>;
  BlogIndex: ComponentType<TemplateProps>;
  BlogPost: ComponentType<TemplateProps>;
  // Optional extras
  Contact?: ComponentType<TemplateProps>;
}

export interface TemplateModule {
  industry: string;
  displayName: string;
  defaultServices: ServicePage[];
  defaultPosts: BlogPost[];
  Components: TemplateComponents;
}
