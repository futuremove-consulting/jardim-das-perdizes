import { siteUrl } from "@/lib/config";
import { getRouteLabel } from "@/lib/routes";

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

/**
 * Breadcrumb entry builder. Derives the label from the routes registry
 * (src/lib/routes.ts) so navigation labels and breadcrumb JSON-LD — which
 * Google renders in SERPs — can never drift apart (this already happened
 * when "Mercado & Dados" was renamed to "Mercado"). Pass an explicit name
 * only for leaves outside ROUTES (dynamic commercial fichas) or when a
 * data-layer title should win (e.g. guia.title). An unregistered path
 * without a name throws at render time — SSG turns that into a build
 * failure instead of a silent label drift.
 */
export function crumb(path: string, name?: string): BreadcrumbEntry {
  const label = name ?? getRouteLabel(path);
  if (!label) {
    throw new Error(
      `crumb(): path "${path}" is not in ROUTES and no explicit name was given`
    );
  }
  return { path, name: label };
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

export interface ApartmentComplexInput {
  name: string;
  /** Site-absolute canonical path of the product page. */
  path: string;
  description: string;
  /** Official street address — emitted only when verified (never invented). */
  address?: string;
  /** Disclosed total units — omitted when the official source does not state it. */
  numberOfUnits?: number;
  /** Verified highlights, emitted as amenityFeature entries. */
  highlights?: string[];
}

/**
 * ApartmentComplex JSON-LD (GEO entity graph for product pages). Every field
 * maps 1:1 to visibly rendered content on the page; optional fields are
 * omitted instead of guessed (fidelity rule — no invented data in schema).
 */
export function apartmentComplexSchema(
  input: ApartmentComplexInput
): Record<string, unknown> {
  const base = siteUrl().replace(/\/+$/, "");
  const schema: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "ApartmentComplex",
    name: input.name,
    description: input.description,
    url: `${base}${input.path}`,
  };
  if (input.address) {
    schema.address = {
      "@type": "PostalAddress",
      streetAddress: input.address,
      addressLocality: "São Paulo",
      addressRegion: "SP",
      addressCountry: "BR",
    };
  }
  if (typeof input.numberOfUnits === "number") {
    schema.numberOfAccommodationUnits = {
      "@type": "QuantitativeValue",
      value: input.numberOfUnits,
    };
  }
  if (input.highlights?.length) {
    schema.amenityFeature = input.highlights.map((h) => ({
      "@type": "LocationFeatureSpecification",
      name: h,
      value: true,
    }));
  }
  return schema;
}
