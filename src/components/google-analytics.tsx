"use client";

import Script from "next/script";
import { usePathname, useSearchParams } from "next/navigation";
import { Suspense, useEffect } from "react";

const measurementId = process.env.NEXT_PUBLIC_GA_ID;

declare global {
  interface Window {
    dataLayer: unknown[];
    gtag: (...args: unknown[]) => void;
  }
}

function RouteTracker() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (!measurementId || typeof window.gtag !== "function") return;
    const query = searchParams.toString();
    window.gtag("event", "page_view", {
      page_path: query ? pathname + "?" + query : pathname,
      page_title: document.title,
    });
  }, [pathname, searchParams]);

  return null;
}

export default function GoogleAnalytics() {
  if (!measurementId) return null;
  return (
    <>
      <Script id="google-consent-default" strategy="beforeInteractive">
        {"window.dataLayer = window.dataLayer || []; window.gtag = function(){window.dataLayer.push(arguments);}; window.gtag('consent','default',{analytics_storage:'denied',ad_storage:'denied',ad_user_data:'denied',ad_personalization:'denied'});"}
      </Script>
      <Script
        src={"https://www.googletagmanager.com/gtag/js?id=" + measurementId}
        strategy="afterInteractive"
      />
      <Script id="google-analytics-config" strategy="afterInteractive">
        {"window.gtag('js', new Date()); window.gtag('config', '" + measurementId + "', {send_page_view: false});"}
      </Script>
      <Suspense fallback={null}><RouteTracker /></Suspense>
    </>
  );
}
