import { describe, it, expect, vi, afterEach } from "vitest";
import sitemap from "./sitemap";
import { ROUTES } from "@/lib/routes";
import { COMMERCIAL_PROPERTIES } from "@/data/commercial";
import { siteUrl } from "@/lib/config";

const ORIGINAL_SITE_URL = process.env.NEXT_PUBLIC_SITE_URL;

afterEach(() => {
  process.env.NEXT_PUBLIC_SITE_URL = ORIGINAL_SITE_URL;
  vi.resetModules();
});

describe("sitemap", () => {
  it("returns exactly 35 entries — 31 routes + 4 commercial fichas", () => {
    expect(sitemap()).toHaveLength(35);
    expect(sitemap()).toHaveLength(
      ROUTES.length +
        COMMERCIAL_PROPERTIES.reduce((n, p) => n + p.modalities.length, 0)
    );
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

  it("includes every commercial ficha URL derived from COMMERCIAL_PROPERTIES", () => {
    process.env.NEXT_PUBLIC_SITE_URL = "https://example.com";
    const urls = sitemap().map((e) => e.url);
    const expected = COMMERCIAL_PROPERTIES.flatMap((p) =>
      p.modalities.map(
        (m) => `https://example.com/para-trabalhar/${m}/${p.slug}/`
      )
    );
    expect(expected).toHaveLength(4);
    for (const url of expected) {
      expect(urls).toContain(url);
    }
  });

  it("prioritizes home at 1.0, hubs at 0.8 and fichas at 0.7", () => {
    process.env.NEXT_PUBLIC_SITE_URL = "https://example.com";
    const entries = sitemap();
    const home = entries.find((e) => e.url === "https://example.com/");
    expect(home?.priority).toBe(1.0);

    const commercial = entries.filter((e) =>
      e.url.startsWith("https://example.com/para-trabalhar/")
    );
    expect(commercial.length).toBeGreaterThan(0);
    for (const entry of commercial) {
      const segments = entry.url
        .replace("https://example.com", "")
        .split("/")
        .filter(Boolean);
      // fichas have 3 segments (modality/slug); vitrines only 2 (modality)
      if (segments.length === 3) expect(entry.priority).toBe(0.7);
      else expect(entry.priority).toBe(0.8);
    }

    const condoFicha = entries.find(
      (e) => e.url === "https://example.com/condominios/sequoia/"
    );
    const condoHub = entries.find(
      (e) => e.url === "https://example.com/condominios/"
    );
    expect(condoFicha?.priority).toBe(0.7);
    expect(condoHub?.priority).toBe(0.8);
  });

  it("commercial fichas use their verifiedAt as lastModified", () => {
    process.env.NEXT_PUBLIC_SITE_URL = "https://example.com";
    const entries = sitemap();
    const office = entries.find(
      (e) =>
        e.url ===
        "https://example.com/para-trabalhar/comprar/time-office-salas/"
    );
    expect((office?.lastModified as Date).toISOString()).toBe(
      "2026-08-31T00:00:00.000Z"
    );
  });

  it("condominium fichas use their verifiedAt as lastModified", () => {
    process.env.NEXT_PUBLIC_SITE_URL = "https://example.com";
    const entries = sitemap();
    const manaca = entries.find(
      (e) => e.url === "https://example.com/condominios/reserva-manaca/"
    );
    expect((manaca?.lastModified as Date).toISOString()).toBe(
      "2026-08-31T00:00:00.000Z"
    );
  });

  it("static pages keep the phase lastModified", () => {
    process.env.NEXT_PUBLIC_SITE_URL = "https://example.com";
    const entries = sitemap();
    const morar = entries.find((e) => e.url === "https://example.com/para-morar/");
    expect((morar?.lastModified as Date).toISOString()).toBe(
      "2026-08-28T00:00:00.000Z"
    );
  });

  it("has no duplicate URLs", () => {
    const urls = sitemap().map((e) => e.url);
    expect(new Set(urls).size).toBe(urls.length);
  });
});
