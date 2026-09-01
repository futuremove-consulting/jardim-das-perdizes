import { describe, it, expect } from "vitest";
import { GUIAS } from "./guias";

describe("guias data (fidelity rules)", () => {
  it("exposes the 8 documented guias", () => {
    const slugs = Object.keys(GUIAS).sort();
    expect(slugs).toEqual([
      "bares-e-restaurantes",
      "comercio-e-servicos",
      "escolas",
      "lazer-e-cultura",
      "pet-friendly",
      "saude",
      "seguranca",
      "transporte-e-mobilidade",
    ]);
  });

  it("every guia has slug, title, intro, takeaways and source note", () => {
    for (const guia of Object.values(GUIAS)) {
      expect(guia.slug).toBeTruthy();
      expect(guia.title).toBeTruthy();
      expect(guia.intro).toBeTruthy();
      expect(guia.takeaways.length).toBeGreaterThanOrEqual(3);
      expect(guia.sourceNote).toMatch(/Verificado em 31\/08\/2026/);
    }
  });

  it("every table row carries a human-readable source", () => {
    for (const guia of Object.values(GUIAS)) {
      for (const section of guia.sections) {
        expect(section.headers).toHaveLength(3);
        for (const row of section.rows) {
          expect(row.name).toBeTruthy();
          expect(row.category).toBeTruthy();
          expect(row.source.length).toBeGreaterThan(5);
        }
      }
    }
  });
});