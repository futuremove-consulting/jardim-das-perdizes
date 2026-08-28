import { describe, it, expect } from "vitest";
import { CONDOMINIUMS, getCondominiumBySlug } from "@/data/condominiums";

const EXPECTED_SLUGS = [
  "reserva-manaca",
  "bosque-jequitiba",
  "bosque-araucaria",
  "recanto-jacaranda",
  "reserva-figueiras",
];

describe("CONDOMINIUMS", () => {
  it("has exactly 5 entries with unique slugs", () => {
    expect(CONDOMINIUMS).toHaveLength(5);
    const slugs = CONDOMINIUMS.map((c) => c.slug);
    expect(slugs).toEqual(EXPECTED_SLUGS);
    expect(new Set(slugs).size).toBe(slugs.length);
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

  it("Reserva Figueiras matches the confirmed tower, units, launch and construction status (fidelity)", () => {
    const figueiras = getCondominiumBySlug("reserva-figueiras");
    expect(figueiras).toBeDefined();
    expect(figueiras!.towers).toEqual([
      { tower: "A", blocks: ["Subcondomínio Torre A"] },
    ]);
    expect(figueiras!.units).toBe(104);
    expect(figueiras!.deliveryStatus).toBe("under-construction");
    expect(figueiras!.deliveryDate).toBe("2026-10 (previsão)");
    expect(figueiras!.launch).toBe("2023-02");
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