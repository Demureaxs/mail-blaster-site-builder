import Link from "next/link";
import { TemplateProps } from "../types";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";

export function DemoHome({ lead, industry, slug }: TemplateProps) {
  return (
    <div className="flex flex-col gap-16 py-10">
      <Container>
        <section className="py-20 text-center bg-muted rounded-xl">
           <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl mb-6">
             {lead?.businessName || "Your Local Expert"}
           </h1>
           <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
             Providing top-tier {industry} services to {lead?.city || "your area"}. 
             Reliable, professional, and trusted.
           </p>
           <div className="flex justify-center gap-4">
              <Button size="lg">Get a Quote</Button>
              <Link href={`/${industry}/${slug}/services`}>
                <Button variant="outline" size="lg">Our Services</Button>
              </Link>
           </div>
        </section>
      </Container>
      
      <Container>
        <div className="grid md:grid-cols-3 gap-8">
           <div className="p-6 border rounded-lg">
              <h3 className="font-bold text-xl mb-2">Expert Service</h3>
              <p className="text-muted-foreground">Certified professionals ready to help you.</p>
           </div>
           <div className="p-6 border rounded-lg">
              <h3 className="font-bold text-xl mb-2">Fair Pricing</h3>
              <p className="text-muted-foreground">Transparent quotes with no hidden fees.</p>
           </div>
           <div className="p-6 border rounded-lg">
              <h3 className="font-bold text-xl mb-2">Satisfaction Guaranteed</h3>
              <p className="text-muted-foreground">We are not happy until you are happy.</p>
           </div>
        </div>
      </Container>
    </div>
  );
}

export function ServicesIndex({ lead, services, industry, slug }: TemplateProps) {
  return (
    <Container className="py-12">
      <h1 className="text-3xl font-bold mb-8">Our Services</h1>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {services?.map((s) => (
          <div key={s.serviceSlug} className="border p-6 rounded-lg hover:shadow-md transition-shadow">
            <h2 className="text-xl font-semibold mb-3">{s.title}</h2>
            <p className="text-muted-foreground mb-4">{s.summary}</p>
            <Link href={`/${industry}/${slug}/services/${s.serviceSlug}`}>
               <Button variant="ghost" className="pl-0 hover:pl-2 transition-all">
                 Learn More &rarr;
               </Button>
            </Link>
          </div>
        ))}
      </div>
    </Container>
  );
}

export function ServiceDetail({ service, industry, slug }: TemplateProps) {
  if (!service) return <div>Service not found</div>;
  
  return (
    <Container className="py-12">
      <Link href={`/${industry}/${slug}/services`} className="text-muted-foreground text-sm hover:underline mb-4 block">
        &larr; Back to Services
      </Link>
      <h1 className="text-4xl font-bold mb-6">{service.title}</h1>
      <div className="prose max-w-none text-muted-foreground text-lg border-t pt-8">
        <p>{service.summary}</p>
        <p className="mt-4">
           (This is a placeholder for detailed content about {service.title}. 
           Imagine rich descriptions, photos, and FAQs here.)
        </p>
      </div>
      <div className="mt-12 bg-muted p-8 rounded-lg text-center">
         <h2 className="text-2xl font-bold mb-4">Need help with {service.title}?</h2>
         <Button size="lg">Contact Us Today</Button>
      </div>
    </Container>
  );
}

export function BlogIndex({ posts, industry, slug }: TemplateProps) {
  return (
    <Container className="py-12">
       <h1 className="text-3xl font-bold mb-8">Latest News & Advice</h1>
       <div className="grid md:grid-cols-2 gap-8">
          {posts?.map((p) => (
             <div key={p.postSlug} className="flex flex-col gap-2">
                <span className="text-sm text-muted-foreground">{p.publishedAt}</span>
                <Link href={`/${industry}/${slug}/blog/${p.postSlug}`} className="group">
                  <h2 className="text-2xl font-bold group-hover:text-primary transition-colors">{p.title}</h2>
                </Link>
                <p className="text-muted-foreground">{p.excerpt}</p>
             </div>
          ))}
       </div>
    </Container>
  );
}

export function BlogPost({ post, industry, slug }: TemplateProps) {
   if (!post) return <div>Post not found</div>;

   return (
    <Container className="py-12 max-w-3xl">
      <Link href={`/${industry}/${slug}/blog`} className="text-muted-foreground text-sm hover:underline mb-4 block">
        &larr; Back to Blog
      </Link>
      <h1 className="text-4xl font-bold mb-4">{post.title}</h1>
      <div className="text-sm text-muted-foreground mb-8">
         Published on {post.publishedAt}
      </div>
      <article className="prose max-w-none text-lg">
         <p className="font-medium text-xl leading-relaxed mb-6">{post.excerpt}</p>
         <hr className="my-8"/>
         <p>
           Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
           Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
         </p>
         <p className="mt-4">
           Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. 
           Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
         </p>
      </article>
    </Container>
   );
}
