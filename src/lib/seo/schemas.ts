import { siteUrl } from "@/lib/config";

/**
 * LocalBusiness JSON-LD builder (plan 01-04).
 * Schema keys in English (schema.org); copy values in pt-BR (rendered).
 * Emitted via JSON.stringify at render time — never string-interpolated
 * into the script (threat T-04-01).
 */
export function localBusinessSchema(): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": "RealEstateAgent",
    name: "Jardim das Perdizes Broker",
    description:
      "Corretor independente e hub de conteúdo especializado no bairro Jardim das Perdizes, em Perdizes (São Paulo).",
    url: `${siteUrl().replace(/\/+$/, "")}/`,
    address: {
      "@type": "PostalAddress",
      addressLocality: "São Paulo",
      addressRegion: "SP",
      addressCountry: "BR",
    },
    areaServed: "Jardim das Perdizes, Perdizes, São Paulo",
  };
}

export interface FaqItem {
  question: string;
  answer: string;
}

/**
 * FAQPage JSON-LD (AEO/GEO). Answers must mirror the VISIBLE FAQ text on the
 * page 1:1 — schema never carries content that is not rendered (no hidden
 * data). Questions in pt-BR; schema keys in English (schema.org).
 */
export function faqPageSchema(items: FaqItem[]): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: { "@type": "Answer", text: item.answer },
    })),
  };
}

export interface BreadcrumbEntry {
  name: string;
  /** Site-absolute path with trailing slash ("/" for home). */
  path: string;
}

/** BreadcrumbList JSON-LD with absolute canonical URLs derived from siteUrl. */
export function breadcrumbSchema(
  entries: BreadcrumbEntry[]
): Record<string, unknown> {
  const base = siteUrl().replace(/\/+$/, "");
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: entries.map((entry, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: entry.name,
      item: `${base}${entry.path === "/" ? "/" : entry.path}`,
    })),
  };
}
