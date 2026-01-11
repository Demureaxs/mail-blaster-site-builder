import { TemplateModule } from "../types";
import { hvacServices, hvacPosts } from "./data";
import * as DefaultComponents from "../default/components";

export const HvacTemplate: TemplateModule = {
  industry: "hvac",
  displayName: "HVAC Services",
  defaultServices: hvacServices,
  defaultPosts: hvacPosts,
  Components: {
    DemoHome: DefaultComponents.DemoHome,
    ServicesIndex: DefaultComponents.ServicesIndex,
    ServiceDetail: DefaultComponents.ServiceDetail,
    BlogIndex: DefaultComponents.BlogIndex,
    BlogPost: DefaultComponents.BlogPost,
  }
};
