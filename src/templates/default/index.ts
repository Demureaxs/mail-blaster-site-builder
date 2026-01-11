import { TemplateModule } from "../types";
import { defaultServices, defaultPosts } from "./data";
import * as Components from "./components";

export const DefaultTemplate: TemplateModule = {
  industry: "default",
  displayName: "General Business",
  defaultServices,
  defaultPosts,
  Components: {
    DemoHome: Components.DemoHome,
    ServicesIndex: Components.ServicesIndex,
    ServiceDetail: Components.ServiceDetail,
    BlogIndex: Components.BlogIndex,
    BlogPost: Components.BlogPost,
  }
};
