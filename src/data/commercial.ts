/**
 * Commercial products (TIME Office + TIME Corporate) — the "Trabalhar" persona.
 * Data fidelity rule: every fact carries a human-readable source + capture date.
 * A product can be available for purchase AND/OR lease (modalities array).
 */

export type CommercialModality = "comprar" | "alugar";

export type CommercialType = "sala" | "laje";

export interface CommercialProperty {
  slug: string;
  name: string;
  modalities: CommercialModality[];
  type: CommercialType;
  tower: string;
  areaMin: number;
  areaMax: number;
  parking?: string;
  deliveryStatus: "delivered" | "ready-to-move";
  deliveryDate: string;
  address?: string;
  highlights: string[];
  source: string;
  verifiedAt: string;
  blurb: string;
}

export const COMMERCIAL_PROPERTIES: CommercialProperty[] = [
  {
    slug: "time-office-salas",
    name: "TIME Office — Salas Comerciais",
    modalities: ["comprar", "alugar"],
    type: "sala",
    tower: "TIME Life — térreo + andares",
    areaMin: 57,
    areaMax: 83,
    parking: "1 vaga por sala",
    deliveryStatus: "ready-to-move",
    deliveryDate: "Entregue — pronto para uso",
    address: "R. Marc Chagall — Jardim das Perdizes, São Paulo/SP",
    highlights: [
      "Salas de 57 a 83 m² no bairro planejado mais moderno de SP",
      "Certificação AQUA — primeiro bairro da América Latina",
      "Segurança 24h e câmeras interligadas (Muralha Paulista)",
      "Próximo à Linha 6 do Metrô (prevista)",
      "Proximidade com Perdizes, Pompeia e Água Branca",
    ],
    source: "Tecnisa / Viva Jardim das Perdizes (captura 31/08/2026)",
    verifiedAt: "2026-08-31",
    blurb:
      "Salas comerciais de 57 a 83 m² no TIME Life, primeiro bairro da América Latina com certificação AQUA. Segurança 24h, infraestrutura completa e endereço estratégico entre Perdizes e Pompeia.",
  },
  {
    slug: "time-corporate-lajes",
    name: "TIME Corporate — Lajes Corporativas",
    modalities: ["comprar", "alugar"],
    type: "laje",
    tower: "TIME Corporate — 1 torre, 23 andares",
    areaMin: 100,
    areaMax: 500,
    parking: "2–3 vagas por laje",
    deliveryStatus: "delivered",
    deliveryDate: "Entregue — edifício ocupado",
    address: "R. Marc Chagall — Jardim das Perdizes, São Paulo/SP",
    highlights: [
      "Lajes corporativas de 100 a 500 m²",
      "Torre de 23 andares com vista para o parque",
      "Hall privativo e infraestrutura de alto padrão",
      "Endereço empresarial de prestígio no bairro planejado",
      "Certificação AQUA e segurança 24h",
    ],
    source: "Tecnisa / Viva Jardim das Perdizes (captura 31/08/2026)",
    verifiedAt: "2026-08-31",
    blurb:
      "Lajes corporativas de 100 a 500 m² em torre de 23 andares com vista para o parque. Endereço empresarial de prestígio no bairro planejado mais moderno de São Paulo.",
  },
];

export function getCommercialBySlug(
  slug: string
): CommercialProperty | undefined {
  return COMMERCIAL_PROPERTIES.find((p) => p.slug === slug);
}

export function getCommercialByModality(
  modality: CommercialModality
): CommercialProperty[] {
  return COMMERCIAL_PROPERTIES.filter((p) => p.modalities.includes(modality));
}
