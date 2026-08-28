import type { MetadataRoute } from "next";
import { siteUrl } from "@/lib/config";

/** robots.txt: allow all user agents, point to the sitemap (plan 01-04). */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: `${siteUrl().replace(/\/+$/, "")}/sitemap.xml`,
  };
}
