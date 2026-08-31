import type { MetadataRoute } from "next";
import { ROUTES } from "@/lib/routes";
import { siteUrl } from "@/lib/config";

/** Phase delivery date for lastModified (01-04 delivered 2026-08-28). */
const LAST_MODIFIED = new Date("2026-08-28");

/** Priority tier: home is canonical root; P0 hub pages; condominium pages. */
function priorityFor(path: string): number {
  if (path === "/") return 1.0;
  if (path.startsWith("/condominios/")) return 0.7;
  return 0.8;
}

/**
 * 16-entry sitemap derived solely from ROUTES + siteUrl() (threat T-04-02:
 * no hardcoded URLs). Absolute, trailing-slash-normalized canonical form.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const base = siteUrl().replace(/\/+$/, "");
  return ROUTES.map((route) => {
    const path =
      route.path === "/" ? "/" : `/${route.path.replace(/^\/+|\/+$/g, "")}/`;
    return {
      url: `${base}${path === "/" ? "/" : path}`,
      lastModified: LAST_MODIFIED,
      changeFrequency: "monthly",
      priority: priorityFor(route.path),
    } as const;
  });
}
