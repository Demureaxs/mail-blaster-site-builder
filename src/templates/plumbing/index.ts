import { TemplateModule } from "../types";
import { plumbingServices, plumbingPosts } from "./data";
import * as DefaultComponents from "../default/components"; 
// Reusing default components for now, but in a real app these would be specific to plumbing
// or we'd pass a theme/variant prop.

export const PlumbingTemplate: TemplateModule = {
  industry: "plumbing",
  displayName: "Plumbing Services",
  defaultServices: plumbingServices,
  defaultPosts: plumbingPosts,
  Components: {
    DemoHome: DefaultComponents.DemoHome,
    ServicesIndex: DefaultComponents.ServicesIndex,
    ServiceDetail: DefaultComponents.ServiceDetail,
    BlogIndex: DefaultComponents.BlogIndex,
    BlogPost: DefaultComponents.BlogPost,
  }
};
