export interface CondoTower {
  tower: string;
  blocks: string[];
}

/**
 * Status badges aligned with the official Tecnisa product pages.
 * "delivered" is the wording used by the phase-1 research docs for finished
 * condos; "ready-to-move" mirrors the official "Pronto para morar" badge.
 */
export type DeliveryStatus =
  | "delivered"
  | "ready-to-move"
  | "under-construction"
  | "coming-soon";

export const STATUS_LABELS: Record<DeliveryStatus, string> = {
  delivered: "Entregue",
  "ready-to-move": "Pronto para morar",
  "under-construction": "Em obras",
  "coming-soon": "Breve lançamento",
};

export interface Condominium {
  slug: string;
  name: string;
  towers?: CondoTower[];
  /** Shown when tower names are not publicly confirmed (data-fidelity rule). */
  towersNote?: string;
  /** Confirmed unit count — omit (and set unitsNote) when not disclosed. */
  units?: number;
  unitsNote?: string;
  areaMin: number;
  areaMax: number;
  parking?: string;
  deliveryStatus: DeliveryStatus;
  deliveryDate: string;
  launch?: string;
  monthlyFee?: string;
  /** Official floor plans exactly as published (typology — area). */
  typologies?: string[];
  address?: string;
  highlights?: string[];
  /** Disclosure when the current status supersedes an earlier recorded one. */
  statusNote?: string;
  /** Human-readable source with capture date (credibility + GEO rule). */
  source: string;
  /** ISO date of the last verification against the source. */
  verifiedAt: string;
  /** Short pt-BR display copy for cards and page summaries. */
  blurb: string;
}

const DOC_SOURCE =
  "Pesquisa documental do projeto (extracted/ — Viva Jardim das Perdizes e Matriz completa de torres)";
const VERIFIED = "2026-08-31";

/**
 * Fidelity-tested records for the 9 condominiums/products of the district.
 * Legacy 4 delivered condos come from the research docs in extracted/;
 * the 5 Tecnisa-marketed products (Figueiras, Sequoia, Cerejeiras,
 * Flamboyant, Oliveiras) come from official page captures of 2026-08-31.
 * Unpublished figures are disclosed as notes — never invented.
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
    source: DOC_SOURCE,
    verifiedAt: VERIFIED,
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
    source: DOC_SOURCE,
    verifiedAt: VERIFIED,
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
    source: DOC_SOURCE,
    verifiedAt: VERIFIED,
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
    source: DOC_SOURCE,
    verifiedAt: VERIFIED,
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
    parking: "2 vagas",
    deliveryStatus: "ready-to-move",
    deliveryDate: "Pronto para morar (verificado em 31/08/2026)",
    launch: "2023-02",
    address: "Rua Marc Chagall, 320 — Jardim das Perdizes, São Paulo/SP",
    statusNote:
      'A página oficial da Tecnisa exibe "Pronto para morar" (verificado em 31/08/2026); registros documentais anteriores indicavam entrega prevista para outubro de 2026. Status consolidado conforme a fonte oficial mais recente.',
    source:
      "Tecnisa — tecnisa.com.br/imoveis/reserva-figueiras (captura 31/08/2026)",
    verifiedAt: VERIFIED,
    blurb:
      "Torre única identificada pela Tecnisa como Subcondomínio Torre A, com 104 residências de 165 a 188 m², lançada em fevereiro de 2023 e exibida como 'Pronto para morar' na página oficial.",
  },
  {
    slug: "sequoia",
    name: "Sequoia",
    unitsNote: "Não divulgado — breve lançamento com registro de incorporação em fase",
    areaMin: 121,
    areaMax: 175,
    deliveryStatus: "coming-soon",
    deliveryDate: "A definir (comercialização após o registro da incorporação — Lei 4.591/64)",
    typologies: [
      "3 dormitórios — 121 m²",
      "4 dormitórios — 148 m²",
      "4 dormitórios — 175 m²",
    ],
    address: "R. Pablo Picasso, 150 — Jardim das Perdizes, São Paulo/SP",
    highlights: [
      "Hall privativo em todas as unidades",
      "Curadoria BODYTECH, Chandra Spa e Artefacto",
      "Piscina com borda infinita e vista para o parque",
      "Incorporadora: Windsor Investimentos Imobiliários Ltda",
    ],
    source: "Tecnisa — tecnisa.com.br/imoveis/sequoia (captura 31/08/2026)",
    verifiedAt: VERIFIED,
    blurb:
      "Breve lançamento no bairro: apartamentos de 3 e 4 dormitórios de 121 a 175 m² com hall privativo e curadoria BODYTECH, Chandra Spa e Artefacto.",
  },
  {
    slug: "bosque-cerejeiras",
    name: "Bosque Cerejeiras",
    unitsNote: "Não divulgado na página oficial (torre única em obras)",
    areaMin: 222,
    areaMax: 569,
    parking: "2–3 vagas",
    deliveryStatus: "under-construction",
    deliveryDate: "Em obras — previsão não divulgada",
    typologies: [
      "3 suítes — 221,64 m²",
      "4 suítes — 222 m²",
      "4 suítes — 293 m²",
      "Duplex 4 suítes — 436 m²",
      "Duplex — 569 m²",
    ],
    address: "R. Marc Chagall, s/n — Jardim das Perdizes, São Paulo/SP, 05036-170",
    highlights: [
      "Piscina coberta e piscina descoberta com raia de 25 m",
      "Squash e beach tennis",
      "Tipologias de 3 suítes até duplex de 569 m²",
    ],
    source:
      "Tecnisa — tecnisa.com.br/imoveis/bosque-cerejeiras (captura 31/08/2026)",
    verifiedAt: VERIFIED,
    blurb:
      "Alto padrão em torre única em obras: de 3 suítes (221,64 m²) a duplex de 569 m², com piscinas coberta e descoberta, squash e beach tennis.",
  },
  {
    slug: "reserva-flamboyant",
    name: "Reserva Flamboyant",
    unitsNote: "Não divulgado na página oficial (torre única, 38 andares)",
    areaMin: 157,
    areaMax: 377,
    parking: "2 vagas",
    deliveryStatus: "under-construction",
    deliveryDate: "Em obras — previsão não divulgada",
    typologies: [
      "2 suítes — 157 m²",
      "3 suítes — 157 m² (com lavabo)",
      "3 suítes — 159 m²",
      "3 suítes — 189 m² (sala ampliada)",
      "4 dormitórios (2 suítes) — 189 m²",
      "Duplex 3 suítes — 336 m²",
      "Duplex 4 dormitórios e 2 suítes — 377 m²",
    ],
    address: "Rua Pablo Picasso, 50 — Jardim das Perdizes, São Paulo/SP, 05036-040",
    highlights: [
      "Torre mais alta do bairro — 38 andares",
      "Torre única em terreno de 5.000 m²",
      "Quadra de tênis, beach tennis, cinema e spa",
      "Piscina coberta e descoberta, academia com pilates",
    ],
    source:
      "Tecnisa — tecnisa.com.br/imoveis/reserva-flamboyant (captura 31/08/2026)",
    verifiedAt: VERIFIED,
    blurb:
      "A torre mais alta do Jardim das Perdizes: 38 andares com apartamentos de 157 a 189 m² e duplex de 336 a 377 m², quadra de tênis e o lazer mais completo do bairro.",
  },
  {
    slug: "recanto-oliveiras",
    name: "Recanto Oliveiras",
    unitsNote: "Não divulgado na página oficial (duas torres)",
    areaMin: 83,
    areaMax: 111,
    parking: "1–2 vagas",
    deliveryStatus: "under-construction",
    deliveryDate: "Em obras — previsão não divulgada",
    typologies: [
      "1 suíte — 81 m²",
      "2 dormitórios — 81 m²",
      "2 suítes — 109 m²",
      "3 dormitórios — 109 m²",
    ],
    address: "R. Marc Chagall, 467 — Jardim das Perdizes, São Paulo/SP, 05036-040",
    highlights: [
      "Privativos de 83 e 111 m² com depósito privativo",
      "Piscina coberta e descoberta com raia de 25 m",
      "Academia, espaço família, churrasqueiras e saunas seca e molhada",
    ],
    source:
      "Tecnisa — tecnisa.com.br/imoveis/recanto-oliveiras (captura 31/08/2026)",
    verifiedAt: VERIFIED,
    blurb:
      "Apartamentos de 1 a 2 suítes (privativos de 83 e 111 m²; plantas de 81 e 109 m²) com depósito privativo, lazer completo e vista para o parque.",
  },
];

export function getCondominiumBySlug(
  slug: string
): Condominium | undefined {
  return CONDOMINIUMS.find((c) => c.slug === slug);
}