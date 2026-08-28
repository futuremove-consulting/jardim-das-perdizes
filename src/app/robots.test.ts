import { describe, it, expect, vi, afterEach } from "vitest";
import robots from "./robots";

const ORIGINAL_SITE_URL = process.env.NEXT_PUBLIC_SITE_URL;

afterEach(() => {
  process.env.NEXT_PUBLIC_SITE_URL = ORIGINAL_SITE_URL;
  vi.resetModules();
});

/** rules may be a single object or an array (Next convention). Normalize. */
function rulesArray(result: ReturnType<typeof robots>) {
  return Array.isArray(result.rules) ? result.rules : [result.rules];
}

describe("robots", () => {
  it("allows all user agents", () => {
    process.env.NEXT_PUBLIC_SITE_URL = "https://example.com";
    const anyAgent = rulesArray(robots()).find((r) => r.userAgent === "*");
    expect(anyAgent).toBeDefined();
    expect(anyAgent?.allow).toBe("/");
  });

  it("points sitemap to siteUrl() + /sitemap.xml", () => {
    process.env.NEXT_PUBLIC_SITE_URL = "https://example.com";
    const result = robots();
    const value = Array.isArray(result.sitemap)
      ? result.sitemap
      : [result.sitemap];
    expect(value).toContain("https://example.com/sitemap.xml");
  });
});
