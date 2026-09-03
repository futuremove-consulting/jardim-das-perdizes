import type { MetadataRoute } from "next";
import { ROUTES } from "@/lib/routes";
import { CONDOMINIUMS } from "@/data/condominiums";
import { COMMERCIAL_PROPERTIES } from "@/data/commercial";
import { siteUrl } from "@/lib/config";

/** Phase delivery date for lastModified (01-04 delivered 2026-08-28). */
const LAST_MODIFIED = new Date("2026-08-28");

/** Trailing-slash canonical path ("/" stays "/"). */
function canonicalPath(path: string): string {
  if (path === "/") return "/";
  return `/${path.replace(/^\/+|\/+$/g, "")}/`;
}

/** Priority tier: home 1.0; hub pages 0.8; fichas (condo + commercial) 0.7. */
function priorityFor(path: string): number {
  if (path === "/") return 1.0;
  if (path.startsWith("/condominios/") && path !== "/condominios/") return 0.7;
  if (/^\/para-trabalhar\/[^/]+\/[^/]+\/$/.test(path)) return 0.7;
  return 0.8;
}

/**
 * Fonte datada: fichas de produto usam a data de verificação do dado
 * (verifiedAt) como lastModified; as demais páginas usam a data da fase.
 */
function lastModifiedFor(path: string): Date {
  const condoSlug = path.match(/^\/condominios\/([^/]+)\/$/)?.[1];
  const condo = condoSlug
    ? CONDOMINIUMS.find((c) => c.slug === condoSlug)
    : undefined;
  return condo ? new Date(condo.verifiedAt) : LAST_MODIFIED;
}

/**
 * Sitemap derived from two declared data sources + siteUrl() — no hardcoded
 * URLs (threat T-04-02):
 *   1. ROUTES (src/lib/routes.ts) — 31 registered routes;
 *   2. COMMERCIAL_PROPERTIES (src/data/commercial.ts) — the 4 SSG fichas
 *      under /para-trabalhar/[modality]/[slug]/, the SAME source used by
 *      generateStaticParams(), so the sitemap can never drift from the pages
 *      actually generated.
 * 35 URLs today. Priorities: home 1.0, hubs 0.8, fichas 0.7. Canonical
 * trailing-slash form; uniqueness guarded.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const base = siteUrl().replace(/\/+$/, "");

  const routeEntries: MetadataRoute.Sitemap = ROUTES.map((route) => {
    const path = canonicalPath(route.path);
    return {
      url: `${base}${path}`,
      lastModified: lastModifiedFor(path),
      changeFrequency: "monthly" as const,
      priority: priorityFor(path),
    };
  });

  const commercialEntries: MetadataRoute.Sitemap =
    COMMERCIAL_PROPERTIES.flatMap(
      (property): MetadataRoute.Sitemap =>
        property.modalities.map((modality) => ({
          url: `${base}/para-trabalhar/${modality}/${property.slug}/`,
          lastModified: new Date(property.verifiedAt),
          changeFrequency: "monthly" as const,
          priority: 0.7,
        })),
    );

  // Guard: sitemap URLs must be unique even if a slug ever collides.
  const seen = new Set<string>();
  return [...routeEntries, ...commercialEntries].filter((entry) => {
    if (seen.has(entry.url)) return false;
    seen.add(entry.url);
    return true;
  });
}
