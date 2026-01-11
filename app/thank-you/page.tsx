"use client";

import { useEffect, useState, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { BaseShell } from "@/components/shell/BaseShell";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { logServerEvent } from "@/lib/analytics";

function ThankYouContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const industry = searchParams.get("industry");
  const slug = searchParams.get("slug");
  
  const [formData, setFormData] = useState({
    contactEmail: "",
    contactPhone: "",
    notes: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    // Log view
    logServerEvent({
      event: "thank_you_view",
      industry: industry || undefined,
      slug: slug || undefined,
      path: "/thank-you"
    });
  }, [industry, slug]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    
    try {
      const res = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          industry: industry || "unknown",
          slug: slug || "unknown",
          ...formData,
        }),
      });
      
      if (res.ok) {
        setSuccess(true);
        logServerEvent({
           event: "onboarding_submit",
           industry: industry || undefined,
           slug: slug || undefined
        });
      }
    } catch (err) {
      console.error(err);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <BaseShell>
      <Container className="py-20 max-w-xl">
        <div className="bg-card border p-8 rounded-xl shadow-sm">
           <h1 className="text-3xl font-bold mb-4 text-center">Setup Your Account</h1>
           <p className="text-center text-muted-foreground mb-8">
             Finalize your {industry ? `${industry} ` : ""}website setup.
           </p>

           {success ? (
             <div className="text-center py-10">
                <h2 className="text-2xl font-bold text-green-600 mb-4">Success!</h2>
                <p>We have received your details. Our team will contact you shortly.</p>
                <Button className="mt-8" onClick={() => router.push("https://teklytic.com")}>
                  Return to Teklytic
                </Button>
             </div>
           ) : (
             <form onSubmit={handleSubmit} className="space-y-4">
                 <div>
                   <label className="block text-sm font-medium mb-1">Email Address</label>
                   <input 
                      required
                      type="email" 
                      className="w-full h-10 px-3 rounded-md border bg-background"
                      value={formData.contactEmail}
                      onChange={e => setFormData({...formData, contactEmail: e.target.value})}
                   />
                 </div>
                 <div>
                   <label className="block text-sm font-medium mb-1">Phone Number (Optional)</label>
                   <input 
                      type="tel" 
                      className="w-full h-10 px-3 rounded-md border bg-background"
                      value={formData.contactPhone}
                      onChange={e => setFormData({...formData, contactPhone: e.target.value})}
                   />
                 </div>
                 <div>
                   <label className="block text-sm font-medium mb-1">Any specific requests?</label>
                   <textarea 
                      className="w-full min-h-[100px] p-3 rounded-md border bg-background"
                      value={formData.notes}
                      onChange={e => setFormData({...formData, notes: e.target.value})}
                   />
                 </div>
                 <Button type="submit" className="w-full" disabled={submitting}>
                   {submitting ? "Submitting..." : "Complete Setup"}
                 </Button>
             </form>
           )}
        </div>
      </Container>
    </BaseShell>
  );
}

export default function ThankYouPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ThankYouContent />
    </Suspense>
  );
}
