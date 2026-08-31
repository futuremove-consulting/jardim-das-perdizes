import { describe, it, expect, vi, afterEach } from "vitest";
import sitemap from "./sitemap";
import { ROUTES } from "@/lib/routes";
import { siteUrl } from "@/lib/config";

const ORIGINAL_SITE_URL = process.env.NEXT_PUBLIC_SITE_URL;

afterEach(() => {
  process.env.NEXT_PUBLIC_SITE_URL = ORIGINAL_SITE_URL;
  vi.resetModules();
});

describe("sitemap", () => {
  it("returns exactly 20 entries — one per registered route", () => {
    expect(sitemap()).toHaveLength(20);
    expect(sitemap()).toHaveLength(ROUTES.length);
  });

  it("every entry is an absolute URL built from siteUrl()", () => {
    process.env.NEXT_PUBLIC_SITE_URL = "https://example.com";
    const entries = sitemap();
    for (const entry of entries) {
      expect(entry.url.startsWith("https://example.com")).toBe(true);
      expect(entry.url.startsWith("http")).toBe(true);
    }
  });

  it("urls cover every ROUTES path", () => {
    const entries = sitemap();
    const urls = entries.map((e) => e.url);
    const base = siteUrl().replace(/\/+$/, "");
    for (const route of ROUTES) {
      const path = route.path === "/" ? "/" : route.path.replace(/\/+$/, "");
      const expected = path === "/" ? `${base}/` : `${base}${path}/`;
      expect(urls).toContain(expected);
    }
  });

  it("prioritizes home at 1.0", () => {
    const entries = sitemap();
    const home = entries.find((e) => e.url.endsWith(siteUrl() + "/"));
    expect(home?.priority).toBe(1.0);
  });
});
