import { describe, it, expect } from "vitest";
import {
  ROUTES,
  NAV_MAIN,
  NAV_SECONDARY,
  getRouteLabel,
} from "./routes";

const P0_PATHS = [
  "/",
  "/guia-jardim-das-perdizes/",
  "/para-morar/",
  "/para-investir/",
  "/venda-ou-alugue/",
  "/guias-do-bairro/",
  "/guias-do-bairro/escolas/",
  "/guias-do-bairro/bares-e-restaurantes/",
  "/guias-do-bairro/saude/",
  "/guias-do-bairro/transporte-e-mobilidade/",
  "/guias-do-bairro/comercio-e-servicos/",
  "/guias-do-bairro/lazer-e-cultura/",
  "/guias-do-bairro/seguranca/",
  "/guias-do-bairro/pet-friendly/",
  "/mercado-e-dados/",
  "/para-trabalhar/",
  "/para-trabalhar/comprar/",
  "/para-trabalhar/alugar/",
  "/condominios/",
  "/ferramentas/glossario/",
  "/fontes-e-metodo/",
];

const CONDOMINIUM_PATHS = [
  "/condominios/reserva-manaca/",
  "/condominios/bosque-jequitiba/",
  "/condominios/bosque-araucaria/",
  "/condominios/recanto-jacaranda/",
  "/condominios/reserva-figueiras/",
  "/condominios/sequoia/",
  "/condominios/bosque-cerejeiras/",
  "/condominios/reserva-flamboyant/",
  "/condominios/recanto-oliveiras/",
];

describe("route registry", () => {
  it("contains EXACTLY 31 entries (21 P0 + 9 condominium + hub + privacidade)", () => {
    expect(ROUTES).toHaveLength(31);
  });

  it("contains all 21 P0 paths", () => {
    const paths = ROUTES.map((r) => r.path);
    for (const p of P0_PATHS) {
      expect(paths).toContain(p);
    }
  });

  it("contains all 9 condominium paths under /condominios/", () => {
    const paths = ROUTES.map((r) => r.path);
    for (const p of CONDOMINIUM_PATHS) {
      expect(paths).toContain(p);
    }
  });

  it("has a non-empty pt-BR label for every entry; keys are English slugs", () => {
    for (const r of ROUTES) {
      expect(typeof r.label).toBe("string");
      expect(r.label.trim().length).toBeGreaterThan(0);
      // key must be English slug (kebab-case), no spaces or accents
      expect(r.key).toMatch(/^[a-z0-9-]+$/);
    }
  });

  it("NAV_MAIN has exactly 6 items with documented labels", () => {
    const labels = NAV_MAIN.map((n) => n.label);
    expect(labels).toEqual([
      "Home",
      "Para Morar",
      "Para Investir",
      "Venda ou Alugue",
      "Guias do Bairro",
      "Mercado",
    ]);
  });

  it("every NAV_SECONDARY path resolves inside ROUTES (no dead links)", () => {
    const paths = new Set(ROUTES.map((r) => r.path));
    expect(NAV_SECONDARY.length).toBeGreaterThan(0);
    for (const item of NAV_SECONDARY) {
      expect(paths.has(item.path)).toBe(true);
    }
  });

  it("getRouteLabel returns the pt-BR label for a known path", () => {
    expect(getRouteLabel("/para-morar/")).toBe("Para Morar");
  });
});
