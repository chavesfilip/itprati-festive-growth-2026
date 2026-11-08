/**
 * Central event helper for Google Analytics 4.
 * Never send names, emails, phone numbers, or other personal data as parameters.
 */
export type AnalyticsParams = Record<string, string | number | boolean>;

export function trackEvent(eventName: string, params: AnalyticsParams = {}) {
  if (typeof window === "undefined" || typeof window.gtag !== "function") return;
  window.gtag("event", eventName, params);
}

export function trackWhatsAppClick(service?: string) {
  trackEvent("click_whatsapp", { ...(service ? { service } : {}) });
}

export function trackLeadGenerated(source: string, service?: string) {
  trackEvent("generate_lead", { source, ...(service ? { service } : {}) });
}
