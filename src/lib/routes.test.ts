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
  "/venda-ou-alugue-seu-imovel/",
  "/guias-do-bairro/",
  "/mercado-e-dados/",
  "/encontre-seu-perfil/",
  "/condominios-e-produtos/",
  "/ferramentas/glossario/",
  "/fontes-e-metodo/",
];

const CONDOMINIUM_PATHS = [
  "/condominios-e-produtos/reserva-manaca/",
  "/condominios-e-produtos/bosque-jequitiba/",
  "/condominios-e-produtos/bosque-araucaria/",
  "/condominios-e-produtos/recanto-jacaranda/",
  "/condominios-e-produtos/reserva-figueiras/",
  "/condominios-e-produtos/sequoia/",
  "/condominios-e-produtos/bosque-cerejeiras/",
  "/condominios-e-produtos/reserva-flamboyant/",
  "/condominios-e-produtos/recanto-oliveiras/",
];

describe("route registry", () => {
  it("contains EXACTLY 20 entries (11 P0 + 9 condominium)", () => {
    expect(ROUTES).toHaveLength(20);
  });

  it("contains all 11 P0 paths", () => {
    const paths = ROUTES.map((r) => r.path);
    for (const p of P0_PATHS) {
      expect(paths).toContain(p);
    }
  });

  it("contains all 9 condominium paths under /condominios-e-produtos/", () => {
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
      "Venda ou Alugue seu Imóvel",
      "Guias do Bairro",
      "Mercado & Dados",
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
