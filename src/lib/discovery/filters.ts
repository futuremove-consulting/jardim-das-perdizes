import type { Condominium, DeliveryStatus } from "@/data/condominiums";
import { CONDOMINIUMS } from "@/data/condominiums";

/**
 * Discovery filter engine (spec: extracted/Especificação da camada de
 * descoberta, filtros e cards.md). Pure functions over the fidelity-tested
 * CONDOMINIUMS catalog — the explorer matches PROFILES/PRODUCTS, never
 * specific units (editorial model, not a listings portal).
 */

export type StageFilter = "ready" | "under-construction" | "coming-soon";

export interface AreaRange {
  id: string;
  label: string;
  min: number;
  /** Number.POSITIVE_INFINITY for the open-ended top range. */
  max: number;
}

/** Area buckets from the spec (§3.1 "Por área"). */
export const AREA_RANGES: AreaRange[] = [
  { id: "ate-80", label: "Até 80 m²", min: 0, max: 80 },
  { id: "80-120", label: "De 80 a 120 m²", min: 80, max: 120 },
  { id: "120-160", label: "De 120 a 160 m²", min: 120, max: 160 },
  { id: "160-200", label: "De 160 a 200 m²", min: 160, max: 200 },
  { id: "200-mais", label: "Mais de 200 m²", min: 200, max: Number.POSITIVE_INFINITY },
];

export interface DiscoveryFilters {
  stage?: StageFilter;
  areaRangeId?: string;
  /** Minimum suites (1–4). Suites are read from official floor plans. */
  minSuites?: number;
  /** Minimum dormitórios (1–4). A suite counts as a dormitório. */
  minDorms?: number;
}

export interface ExcludedCondominium {
  slug: string;
  name: string;
  /** Data-limitation disclosure — limitations are surfaced, never silent. */
  reason: string;
}

export interface DiscoveryResult {
  matches: Condominium[];
  excluded: ExcludedCondominium[];
}

const STAGE_MATCH: Record<StageFilter, DeliveryStatus[]> = {
  ready: ["delivered", "ready-to-move"],
  "under-construction": ["under-construction"],
  "coming-soon": ["coming-soon"],
};

export function stageMatches(
  condominium: Condominium,
  stage: StageFilter
): boolean {
  return STAGE_MATCH[stage].includes(condominium.deliveryStatus);
}

/** Product matches a range when its area interval intersects the bucket. */
export function areaIntersects(
  condominium: Condominium,
  range: AreaRange
): boolean {
  return condominium.areaMin <= range.max && condominium.areaMax >= range.min;
}

export interface TypologyCounts {
  suites: number;
  dorms: number;
}

/**
 * Parses official floor-plan labels ("3 suítes — 157 m²",
 * "4 dormitórios (2 suítes) — 189 m²", "Duplex 4 suítes — 436 m²").
 * A suite is a dormitório, so dorms = max(parsed dorms, parsed suites).
 */
export function parseTypologies(typologies: string[]): TypologyCounts[] {
  return typologies.map((t) => {
    const suites = Number(t.match(/(\d+)\s*su[íi]tes?/i)?.[1] ?? 0);
    const dorms = Number(t.match(/(\d+)\s*dormit/i)?.[1] ?? 0);
    return { suites, dorms: Math.max(dorms, suites) };
  });
}

/**
 * Filters the catalog. Stage/area mismatches are normal filter behavior
 * (silently dropped); DATA-limitation cases (no published floor plans, or
 * plans that do not specify the requested attribute) are returned in
 * `excluded` with a reason so the UI can disclose them.
 */
export function filterCondominiums(
  filters: DiscoveryFilters,
  catalog: Condominium[] = CONDOMINIUMS
): DiscoveryResult {
  const range = filters.areaRangeId
    ? AREA_RANGES.find((r) => r.id === filters.areaRangeId)
    : undefined;

  const matches: Condominium[] = [];
  const excluded: ExcludedCondominium[] = [];

  for (const c of catalog) {
    if (filters.stage && !stageMatches(c, filters.stage)) continue;
    if (range && !areaIntersects(c, range)) continue;

    if (filters.minSuites || filters.minDorms) {
      if (!c.typologies) {
        excluded.push({
          slug: c.slug,
          name: c.name,
          reason: "plantas não divulgadas publicamente — consulte via atendimento",
        });
        continue;
      }
      const counts = parseTypologies(c.typologies);
      if (filters.minSuites && !counts.some((t) => t.suites >= filters.minSuites!)) {
        excluded.push({
          slug: c.slug,
          name: c.name,
          reason: "plantas oficiais não especificam essa quantidade de suítes — confirme no atendimento",
        });
        continue;
      }
      if (filters.minDorms && !counts.some((t) => t.dorms >= filters.minDorms!)) {
        excluded.push({
          slug: c.slug,
          name: c.name,
          reason: "plantas oficiais não oferecem essa quantidade de dormitórios",
        });
        continue;
      }
    }

    matches.push(c);
  }

  return { matches, excluded };
}

/** Distance between a target area and the product's area interval (0 if inside). */
function areaDistance(c: Condominium, target: number): number {
  if (target >= c.areaMin && target <= c.areaMax) return 0;
  return Math.min(Math.abs(c.areaMin - target), Math.abs(c.areaMax - target));
}

/** Closest products by area — used for the empty-state "nearest profiles". */
export function nearestByArea(
  target: number,
  limit = 3,
  catalog: Condominium[] = CONDOMINIUMS
): Condominium[] {
  return [...catalog]
    .sort((a, b) => areaDistance(a, target) - areaDistance(b, target))
    .slice(0, limit);
}