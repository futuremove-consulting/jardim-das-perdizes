import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /**
   * Canonical URLs, sitemap entries and internal links are all authored with
   * a trailing slash (see src/lib/seo/metadata.ts and src/app/sitemap.ts).
   * trailingSlash: true makes the served URLs match — no 308 redirect hops
   * and no canonical mismatch for crawlers.
   */
  trailingSlash: true,
};

export default nextConfig;
