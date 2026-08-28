import { describe, it, expect, vi, afterEach } from "vitest";
import { robots } from "./robots";
import { siteUrl } from "@/lib/config";

const ORIGINAL_SITE_URL = process.env.NEXT_PUBLIC_SITE_URL;

afterEach(() => {
  process.env.NEXT_PUBLIC_SITE_URL = ORIGINAL_SITE_URL;
  vi.resetModules();
});

describe("robots", () => {
  it("allows all user agents", () => {
    process.env.NEXT_PUBLIC_SITE_URL = "https://example.com";
    const result = robots();
    const anyAgent = result.rules.find((r) => r.userAgent === "*");
    expect(anyAgent).toBeDefined();
    expect(anyAgent?.allow).toBe("/");
  });

  it("points sitemap to siteUrl() + /sitemap.xml", () => {
    process.env.NEXT_PUBLIC_SITE_URL = "https://example.com";
    const result = robots();
    expect(result.sitemap).toEqual(["https://example.com/sitemap.xml"]);
  });
});
