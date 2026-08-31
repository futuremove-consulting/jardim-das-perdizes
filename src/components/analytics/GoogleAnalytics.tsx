"use client";

import Script from "next/script";

const MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA4_MEASUREMENT_ID;

/**
 * Google Analytics 4 — privacy-first integration.
 *
 * Renders nothing until NEXT_PUBLIC_GA4_MEASUREMENT_ID is set, so local/dev
 * builds never load the script. We rely on Next's `afterInteractive` strategy
 * and GA4's built-in consent mode (no extra cookie banner required for the
 * default anonymized data layer). PII must never be pushed to dataLayer.
 */
export default function GoogleAnalytics() {
  if (!MEASUREMENT_ID) return null;

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${MEASUREMENT_ID}`}
        strategy="afterInteractive"
        data-gaid={MEASUREMENT_ID}
      />
      <Script
        id="ga4-init"
        strategy="afterInteractive"
        data-strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${MEASUREMENT_ID}', {
              anonymize_ip: true,
              send_page_view: true,
            });
          `,
        }}
      />
    </>
  );
}
