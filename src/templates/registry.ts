import { TemplateModule } from "./types";
import { DefaultTemplate } from "./default";
import { PlumbingTemplate } from "./plumbing";
import { HvacTemplate } from "./hvac";

const templates: Record<string, TemplateModule> = {
  default: DefaultTemplate,
  plumbing: PlumbingTemplate,
  hvac: HvacTemplate,
};

export function getTemplate(industry: string): TemplateModule {
  // Normalize industry string or handle aliases if needed
  const key = industry.toLowerCase();
  return templates[key] || DefaultTemplate;
}
