import { TemplateModule } from "../types";
import { plumbingServices, plumbingPosts } from "./data";
import * as PlumbingComponents from "./components"; 

export const PlumbingTemplate: TemplateModule = {
  industry: "plumbers",
  displayName: "Plumbing Services",
  defaultServices: plumbingServices,
  defaultPosts: plumbingPosts,
  Components: {
    DemoHome: PlumbingComponents.DemoHome,
    ServicesIndex: PlumbingComponents.ServicesIndex,
    ServiceDetail: PlumbingComponents.ServiceDetail,
    BlogIndex: PlumbingComponents.BlogIndex,
    BlogPost: PlumbingComponents.BlogPost,
  }
};
