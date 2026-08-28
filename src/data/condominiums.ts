export interface CondoTower {
  tower: string;
  blocks: string[];
}

export type DeliveryStatus = "delivered" | "under-construction";

export interface Condominium {
  slug: string;
  name: string;
  towers?: CondoTower[];
  /** Shown when tower names are not publicly confirmed (data-fidelity rule). */
  towersNote?: string;
  units: number;
  areaMin: number;
  areaMax: number;
  parking?: string;
  deliveryStatus: DeliveryStatus;
  deliveryDate: string;
  launch?: string;
  monthlyFee?: string;
  /** Short pt-BR display copy for cards and page summaries. */
  blurb: string;
}

/**
 * Fidelity-tested records for the 5 phase-1 condominiums.
 * Every tower name, unit count and area comes verbatim from the research
 * docs in extracted/ (Viva Jardim das Perdizes + Matriz completa de torres).
 * Recanto Jacarandá tower names are NOT publicly confirmed — the record
 * exposes towersNote instead of inventing names.
 */
export const CONDOMINIUMS: Condominium[] = [
  {
    slug: "reserva-manaca",
    name: "Reserva Manacá",
    towers: [
      { tower: "A", blocks: ["Andorinha", "Sabiá"] },
      { tower: "B", blocks: ["Arara", "Cacatua"] },
      { tower: "C", blocks: ["Falcão", "Jacutinga"] },
    ],
    units: 320,
    areaMin: 241,
    areaMax: 283,
    parking: "3–5 vagas",
    deliveryStatus: "delivered",
    deliveryDate: "2016-04",
    blurb:
      "Três torres com seis blocos de alto padrão, apartamentos de 241 a 283 m² e entrega em abril de 2016.",
  },
  {
    slug: "bosque-jequitiba",
    name: "Bosque Jequitibá",
    towers: [
      { tower: "A", blocks: ["Canário"] },
      { tower: "B", blocks: ["Bem-te-vi"] },
      { tower: "C", blocks: ["Beija-flor"] },
    ],
    units: 320,
    areaMin: 159,
    areaMax: 331,
    parking: "3–4 vagas",
    deliveryStatus: "delivered",
    deliveryDate: "2015-10",
    blurb:
      "Três torres com apartamentos de 159 a 331 m²; primeiro condomínio do primeiro ciclo entregue em outubro de 2015.",
  },
  {
    slug: "bosque-araucaria",
    name: "Bosque Araucária",
    towers: [
      { tower: "A", blocks: ["Tiê"] },
      { tower: "B", blocks: ["Tucano"] },
    ],
    units: 212,
    areaMin: 157,
    areaMax: 170,
    parking: "2 vagas",
    deliveryStatus: "delivered",
    deliveryDate: "2016-02",
    blurb:
      "Duas torres, Tiê e Tucano, com apartamentos de 157 a 170 m² entregues em fevereiro de 2016.",
  },
  {
    slug: "recanto-jacaranda",
    name: "Recanto Jacarandá",
    towersNote: "Torres não identificadas publicamente",
    units: 396,
    areaMin: 79,
    areaMax: 161,
    parking: "2 vagas",
    deliveryStatus: "delivered",
    deliveryDate: "2016-07",
    monthlyFee: "R$ 1.450 (condomínio médio informado)",
    blurb:
      "Duas torres com 396 unidades de 79 a 161 m², entregues em julho de 2016, com condomínio médio informado de R$ 1.450.",
  },
  {
    slug: "reserva-figueiras",
    name: "Reserva Figueiras",
    towers: [{ tower: "A", blocks: ["Subcondomínio Torre A"] }],
    units: 104,
    areaMin: 165,
    areaMax: 188,
    deliveryStatus: "under-construction",
    deliveryDate: "2026-10 (previsão)",
    launch: "2023-02",
    blurb:
      "Torre única identificada pela Tecnisa como Subcondomínio Torre A, com 104 residências, lançada em fevereiro de 2023 e entrega prevista para outubro de 2026.",
  },
];

export function getCondominiumBySlug(
  slug: string
): Condominium | undefined {
  return CONDOMINIUMS.find((c) => c.slug === slug);
}