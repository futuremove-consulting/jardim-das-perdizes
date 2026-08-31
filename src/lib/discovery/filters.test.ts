import { describe, it, expect } from "vitest";
import {
  AREA_RANGES,
  filterCondominiums,
  nearestByArea,
  parseTypologies,
  type DiscoveryFilters,
} from "./filters";
import { CONDOMINIUMS } from "@/data/condominiums";

function slugs(result: { matches: { slug: string }[] }): string[] {
  return result.matches.map((c) => c.slug).sort();
}

describe("parseTypologies", () => {
  it("extracts suites and dormitórios, treating a suite as a dormitório", () => {
    expect(parseTypologies(["3 suítes — 157 m²"])).toEqual([
      { suites: 3, dorms: 3 },
    ]);
    expect(parseTypologies(["4 dormitórios (2 suítes) — 189 m²"])).toEqual([
      { suites: 2, dorms: 4 },
    ]);
    expect(parseTypologies(["Duplex 4 suítes — 436 m²"])).toEqual([
      { suites: 4, dorms: 4 },
    ]);
    expect(parseTypologies(["Duplex — 569 m²"])).toEqual([
      { suites: 0, dorms: 0 },
    ]);
  });
});

describe("filterCondominiums", () => {
  it("returns the full 9-product catalog with no filters", () => {
    const { matches, excluded } = filterCondominiums({});
    expect(matches).toHaveLength(9);
    expect(excluded).toHaveLength(0);
  });

  it("maps 'ready' to delivered + ready-to-move (5 products)", () => {
    const { matches } = filterCondominiums({ stage: "ready" });
    expect(slugs({ matches })).toEqual([
      "bosque-araucaria",
      "bosque-jequitiba",
      "recanto-jacaranda",
      "reserva-figueiras",
      "reserva-manaca",
    ]);
  });

  it("maps coming-soon to Sequoia only", () => {
    const { matches } = filterCondominiums({ stage: "coming-soon" });
    expect(slugs({ matches })).toEqual(["sequoia"]);
  });

  it("filters by area-range intersection (80–120 → Jacarandá + Oliveiras)", () => {
    const { matches } = filterCondominiums({ areaRangeId: "80-120" });
    expect(slugs({ matches })).toEqual([
      "recanto-jacaranda",
      "recanto-oliveiras",
    ]);
  });

  it("filters 200+ m² to the 4 large products", () => {
    const { matches } = filterCondominiums({ areaRangeId: "200-mais" });
    expect(slugs({ matches })).toEqual([
      "bosque-cerejeiras",
      "bosque-jequitiba",
      "reserva-flamboyant",
      "reserva-manaca",
    ]);
  });

  it("matches min suites from official floor plans (2+ → Cerejeiras, Flamboyant, Oliveiras)", () => {
    const { matches, excluded } = filterCondominiums({ minSuites: 2 });
    expect(slugs({ matches })).toEqual([
      "bosque-cerejeiras",
      "recanto-oliveiras",
      "reserva-flamboyant",
    ]);
    // Sequoia publishes plans without suites; legacy condos publish none.
    expect(excluded.map((e) => e.slug)).toEqual([
      "reserva-manaca",
      "bosque-jequitiba",
      "bosque-araucaria",
      "recanto-jacaranda",
      "reserva-figueiras",
      "sequoia",
    ]);
    expect(excluded.find((e) => e.slug === "sequoia")?.reason).toContain(
      "suítes"
    );
  });

  it("matches 4+ suites only where a plan declares it (Cerejeiras)", () => {
    const { matches } = filterCondominiums({ minSuites: 4 });
    expect(slugs({ matches })).toEqual(["bosque-cerejeiras"]);
  });

  it("matches min dormitórios counting suites as dormitórios", () => {
    const { matches } = filterCondominiums({ minDorms: 3 });
    expect(slugs({ matches })).toEqual([
      "bosque-cerejeiras",
      "recanto-oliveiras",
      "reserva-flamboyant",
      "sequoia",
    ]);
  });

  it("combines stage + area (under construction, 200+ → Cerejeiras + Flamboyant)", () => {
    const { matches } = filterCondominiums({
      stage: "under-construction",
      areaRangeId: "200-mais",
    });
    expect(slugs({ matches })).toEqual([
      "bosque-cerejeiras",
      "reserva-flamboyant",
    ]);
  });

  it("returns an empty result that still exposes exclusions (até 80 m² + 2+ suítes)", () => {
    const result = filterCondominiums({ areaRangeId: "ate-80", minSuites: 2 });
    expect(result.matches).toHaveLength(0);
    expect(result.excluded.length).toBeGreaterThan(0);
  });

  it("uses the documented area buckets from the spec", () => {
    expect(AREA_RANGES.map((r) => r.label)).toEqual([
      "Até 80 m²",
      "De 80 a 120 m²",
      "De 120 a 160 m²",
      "De 160 a 200 m²",
      "Mais de 200 m²",
    ]);
  });
});

describe("nearestByArea", () => {
  it("ranks products containing the target first, then by distance", () => {
    const nearest = nearestByArea(80);
    expect(nearest[0].slug).toBe("recanto-jacaranda"); // 79–161 contains 80
    expect(nearest[1].slug).toBe("recanto-oliveiras"); // |83-80| = 3
    expect(nearest).toHaveLength(3);
  });

  it("returns all 9 catalog entries as a sorted suggestion list", () => {
    expect(nearestByArea(500, 9)).toHaveLength(CONDOMINIUMS.length);
  });
});

describe("DiscoveryFilters typing", () => {
  it("accepts the documented combination shape", () => {
    const filters: DiscoveryFilters = {
      stage: "under-construction",
      areaRangeId: "200-mais",
      minSuites: 2,
      minDorms: 3,
    };
    expect(filterCondominiums(filters).matches.length).toBeGreaterThan(0);
  });
});