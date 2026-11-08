# Google Analytics 4

The GA4 tag is installed once in `src/app/layout.tsx` through `src/components/google-analytics.tsx`, so it is available across the App Router pages. Set `NEXT_PUBLIC_GA_ID` in local and Vercel environments.

## Events

Use `trackEvent` from `src/lib/analytics.ts` in client-side interaction handlers. Suggested events:

- `generate_lead`: successful lead form submission (send only after server confirmation)
- `click_whatsapp`: WhatsApp CTA click
- `click_call`: telephone CTA click
- `view_plan`: plan detail viewed
- `click_subscribe`: subscription CTA click
- `referral_share`: referral link shared
- `contest_visit`: valid contest landing visit (validate/deduplicate on the server; do not rely on GA for prize eligibility)

Example:

```tsx
import { trackEvent } from "@/lib/analytics";

<button onClick={() => trackEvent("click_whatsapp", { service: "internet" })}>
  Contactar pelo WhatsApp
</button>
```

Do not send personally identifiable information (PII), including names, email addresses, phone numbers, or raw referral identifiers, to GA4.

## Consent

The initial implementation sets Google Consent Mode defaults to denied for analytics and advertising storage. This is a technical default, not a legal determination that consent is unnecessary. Where applicable law or Google policy requires consent, implement a consent interface and update consent only after a valid user choice. Consent Mode does not itself replace a consent mechanism or privacy notice.
