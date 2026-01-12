export function getStripeUrl(baseLink: string, options: {
    industry: string;
    slug: string;
    searchParams?: URLSearchParams;
  }): string {
    try {
      const url = new URL(baseLink);
      
      // Append Industry & Slug
      url.searchParams.set("industry", options.industry);
      url.searchParams.set("slug", options.slug);
  
      // Forward UTM params
      if (options.searchParams) {
         const utmKeys = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term'];
         utmKeys.forEach(key => {
            const val = options.searchParams?.get(key);
            if(val) url.searchParams.set(key, val);
         });
      }
      
      return url.toString();
    } catch (e) {
      console.error("Invalid Stripe Link", e);
      return baseLink;
    }
  }
