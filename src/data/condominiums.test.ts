import { describe, it, expect } from "vitest";
import {
  CONDOMINIUMS,
  getCondominiumBySlug,
  STATUS_LABELS,
} from "@/data/condominiums";

const EXPECTED_SLUGS = [
  // delivered (phase-1 research docs)
  "reserva-manaca",
  "bosque-jequitiba",
  "bosque-araucaria",
  "recanto-jacaranda",
  // ready-to-move (official Tecnisa capture 2026-08-31)
  "reserva-figueiras",
  // under-construction / coming-soon (official Tecnisa captures 2026-08-31)
  "sequoia",
  "bosque-cerejeiras",
  "reserva-flamboyant",
  "recanto-oliveiras",
];

describe("CONDOMINIUMS", () => {
  it("has exactly 9 entries with unique slugs", () => {
    expect(CONDOMINIUMS).toHaveLength(EXPECTED_SLUGS.length);
    const slugs = CONDOMINIUMS.map((c) => c.slug);
    expect(slugs).toEqual(EXPECTED_SLUGS);
    expect(new Set(slugs).size).toBe(slugs.length);
  });

  it("every record carries source + verifiedAt (credibility rule)", () => {
    for (const c of CONDOMINIUMS) {
      expect(c.source.trim().length).toBeGreaterThan(0);
      expect(c.verifiedAt).toMatch(/^\d{4}-\d{2}-\d{2}$/);
    }
  });

  it("every record has coherent areas and no invented data", () => {
    for (const c of CONDOMINIUMS) {
      expect(c.areaMin).toBeLessThanOrEqual(c.areaMax);
      // units OR an explicit disclosure note — never a made-up number
      expect(c.units !== undefined || c.unitsNote !== undefined).toBe(true);
    }
  });

  it("status labels map to the official Tecnisa badges", () => {
    expect(STATUS_LABELS.delivered).toBe("Entregue");
    expect(STATUS_LABELS["ready-to-move"]).toBe("Pronto para morar");
    expect(STATUS_LABELS["under-construction"]).toBe("Em obras");
    expect(STATUS_LABELS["coming-soon"]).toBe("Breve lançamento");
  });

  it("Reserva Manacá matches the confirmed towers, units, areas and delivery (fidelity)", () => {
    const manaca = getCondominiumBySlug("reserva-manaca");
    expect(manaca).toBeDefined();
    expect(manaca!.towers).toEqual([
      { tower: "A", blocks: ["Andorinha", "Sabiá"] },
      { tower: "B", blocks: ["Arara", "Cacatua"] },
      { tower: "C", blocks: ["Falcão", "Jacutinga"] },
    ]);
    expect(manaca!.units).toBe(320);
    expect(manaca!.areaMin).toBe(241);
    expect(manaca!.areaMax).toBe(283);
    expect(manaca!.deliveryStatus).toBe("delivered");
    expect(manaca!.deliveryDate).toBe("2016-04");
  });

  it("Bosque Jequitibá matches the confirmed towers, units, areas and delivery (fidelity)", () => {
    const jequitiba = getCondominiumBySlug("bosque-jequitiba");
    expect(jequitiba).toBeDefined();
    expect(jequitiba!.towers).toEqual([
      { tower: "A", blocks: ["Canário"] },
      { tower: "B", blocks: ["Bem-te-vi"] },
      { tower: "C", blocks: ["Beija-flor"] },
    ]);
    expect(jequitiba!.units).toBe(320);
    expect(jequitiba!.areaMin).toBe(159);
    expect(jequitiba!.areaMax).toBe(331);
    expect(jequitiba!.deliveryDate).toBe("2015-10");
    expect(jequitiba!.parking).toBe("3–4 vagas");
  });

  it("Bosque Araucária matches the confirmed towers, units, areas and delivery (fidelity)", () => {
    const araucaria = getCondominiumBySlug("bosque-araucaria");
    expect(araucaria).toBeDefined();
    expect(araucaria!.towers).toEqual([
      { tower: "A", blocks: ["Tiê"] },
      { tower: "B", blocks: ["Tucano"] },
    ]);
    expect(araucaria!.units).toBe(212);
    expect(araucaria!.areaMin).toBe(157);
    expect(araucaria!.areaMax).toBe(170);
    expect(araucaria!.deliveryDate).toBe("2016-02");
  });

  it("Recanto Jacarandá discloses unconfirmed towers instead of inventing names (fidelity)", () => {
    const jacaranda = getCondominiumBySlug("recanto-jacaranda");
    expect(jacaranda).toBeDefined();
    expect(jacaranda!.towers).toBeUndefined();
    expect(jacaranda!.towersNote).toBe("Torres não identificadas publicamente");
    expect(jacaranda!.units).toBe(396);
    expect(jacaranda!.areaMin).toBe(79);
    expect(jacaranda!.areaMax).toBe(161);
    expect(jacaranda!.parking).toBe("2 vagas");
    expect(jacaranda!.deliveryDate).toBe("2016-07");
    expect(jacaranda!.monthlyFee).toBe("R$ 1.450 (condomínio médio informado)");
  });

  it("Reserva Figueiras reconciles to the official 'Pronto para morar' status with a documented discrepancy note", () => {
    const figueiras = getCondominiumBySlug("reserva-figueiras");
    expect(figueiras).toBeDefined();
    expect(figueiras!.towers).toEqual([
      { tower: "A", blocks: ["Subcondomínio Torre A"] },
    ]);
    expect(figueiras!.units).toBe(104);
    expect(figueiras!.deliveryStatus).toBe("ready-to-move");
    expect(figueiras!.launch).toBe("2023-02");
    // disclosure of the earlier 'entrega out/2026' record — no silent overwrite
    expect(figueiras!.statusNote).toMatch(/outubro de 2026/);
    expect(figueiras!.source).toMatch(/tecnisa\.com\.br/);
  });

  it("Sequoia is a coming-soon product without invented unit counts (fidelity)", () => {
    const sequoia = getCondominiumBySlug("sequoia");
    expect(sequoia).toBeDefined();
    expect(sequoia!.deliveryStatus).toBe("coming-soon");
    expect(sequoia!.units).toBeUndefined();
    expect(sequoia!.unitsNote).toMatch(/não divulgado/i);
    expect(sequoia!.areaMin).toBe(121);
    expect(sequoia!.areaMax).toBe(175);
    expect(sequoia!.typologies).toContain("4 dormitórios — 148 m²");
    expect(sequoia!.address).toContain("Pablo Picasso, 150");
    expect(sequoia!.highlights!.join(" ")).toContain("Windsor");
  });

  it("Bosque Cerejeiras exposes the official typologies incl. duplexes (fidelity)", () => {
    const cerejeiras = getCondominiumBySlug("bosque-cerejeiras");
    expect(cerejeiras).toBeDefined();
    expect(cerejeiras!.deliveryStatus).toBe("under-construction");
    expect(cerejeiras!.areaMin).toBe(222);
    expect(cerejeiras!.areaMax).toBe(569);
    expect(cerejeiras!.typologies).toContain("3 suítes — 221,64 m²");
    expect(cerejeiras!.typologies).toContain("Duplex — 569 m²");
    expect(cerejeiras!.parking).toBe("2–3 vagas");
  });

  it("Reserva Flamboyant records tower height, lot and official typologies (fidelity)", () => {
    const flamboyant = getCondominiumBySlug("reserva-flamboyant");
    expect(flamboyant).toBeDefined();
    expect(flamboyant!.deliveryStatus).toBe("under-construction");
    expect(flamboyant!.areaMin).toBe(157);
    expect(flamboyant!.areaMax).toBe(377);
    expect(flamboyant!.typologies).toContain("Duplex 3 suítes — 336 m²");
    expect(flamboyant!.highlights!.join(" ")).toContain("38 andares");
    expect(flamboyant!.address).toContain("Pablo Picasso, 50");
  });

  it("Recanto Oliveiras keeps headline areas and plant-level typologies (fidelity)", () => {
    const oliveiras = getCondominiumBySlug("recanto-oliveiras");
    expect(oliveiras).toBeDefined();
    expect(oliveiras!.deliveryStatus).toBe("under-construction");
    expect(oliveiras!.areaMin).toBe(83);
    expect(oliveiras!.areaMax).toBe(111);
    expect(oliveiras!.typologies).toContain("2 suítes — 109 m²");
    expect(oliveiras!.address).toContain("Marc Chagall, 467");
  });
});

describe("getCondominiumBySlug", () => {
  it("returns the record for a known slug", () => {
    const manaca = getCondominiumBySlug("reserva-manaca");
    expect(manaca?.name).toBe("Reserva Manacá");
  });

  it("returns undefined for an unknown slug", () => {
    expect(getCondominiumBySlug("condominio-inexistente")).toBeUndefined();
  });
});