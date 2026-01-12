"use client";

import { useState } from "react";
import { Button } from "../ui/Button";
import { logServerEvent } from "@/lib/analytics";
import { getStripeUrl } from "@/lib/stripe"; // We will create this

interface LaunchButtonProps {
  stripeLink: string;
  industry?: string;
  slug?: string;
  className?: string;
}

export function LaunchButton({ stripeLink, industry, slug, className }: LaunchButtonProps) {
  const [loading, setLoading] = useState(false);

  const handleClick = async (e: React.MouseEvent) => {
    e.preventDefault();
    if (!industry || !slug) {
        // Fallback for simple link if no context
        window.open(stripeLink, '_blank');
        return;
    }

    setLoading(true);

    try {
        // 1. Log Event
        // We use logServerEvent (which handles client-side fetch)
        // We treat this as a fire-and-forget or await it briefly
        await logServerEvent({
            event: "launch_click",
            industry,
            slug,
            path: window.location.pathname,
            ts: new Date().toISOString()
        });

        // 2. Build URL
        const finalUrl = getStripeUrl(stripeLink, { 
            industry, 
            slug,
            // Pass current search params (UTM)
            searchParams: new URLSearchParams(window.location.search)
        });

        // 3. Redirect
        window.location.href = finalUrl;
    } catch (err) {
        console.error("Launch flow error", err);
        // Fallback redirect
        window.location.href = stripeLink;
    }
  };

  return (
    <Button 
        size="sm" 
        className={className} 
        onClick={handleClick}
        disabled={loading}
    >
      {loading ? "Launching..." : "Launch This Site"}
    </Button>
  );
}
