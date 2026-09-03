/**
 * Project media registry — maps condo slugs to their visual assets.
 *
 * Populated incrementally. Each entry references /public/ assets downloaded
 * from the official reference sites (iApartamentos / ZN) so the pages match
 * the reference aesthetic. Condos without an entry simply render without media.
 */
export interface MediaItem {
  src: string;
  alt: string;
  /** Used to group the gallery grid. */
  category: "areas-comuns" | "planta" | "localizacao" | "outros";
}

export interface CondoMedia {
  slug: string;
  /** Hero image for the top of the detail page. */
  hero: string;
  heroAlt: string;
  /** Gallery shown in a responsive grid. */
  gallery: MediaItem[];
}

export const CONDO_MEDIA: Record<string, CondoMedia> = {
  sequoia: {
    slug: "sequoia",
    hero: "/assets/condominios/jardim-das-perdizes/sequoia/hero/fachada-vista-parque.webp",
    heroAlt: "Fachada do Sequoia Jardim das Perdizes com vista para o parque",
    gallery: [
      { src: "/assets/condominios/jardim-das-perdizes/sequoia/hero/fachada-zn.webp", alt: "Fachada lateral do condomínio", category: "outros" },
      { src: "/assets/condominios/jardim-das-perdizes/sequoia/areas-comuns/piscina-borda-infinita.webp", alt: "Piscina de borda infinita", category: "areas-comuns" },
      { src: "/assets/condominios/jardim-das-perdizes/sequoia/areas-comuns/academia.webp", alt: "Academia equipada", category: "areas-comuns" },
      { src: "/assets/condominios/jardim-das-perdizes/sequoia/areas-comuns/spa-escalda.webp", alt: "Spa com escalda", category: "areas-comuns" },
      { src: "/assets/condominios/jardim-das-perdizes/sequoia/areas-comuns/spa-frigobar.webp", alt: "Spa com frigobar e caldário", category: "areas-comuns" },
      { src: "/assets/condominios/jardim-das-perdizes/sequoia/areas-comuns/sala-massagem.webp", alt: "Sala de massagear", category: "areas-comuns" },
      { src: "/assets/condominios/jardim-das-perdizes/sequoia/areas-comuns/gourmet.webp", alt: "Espaço gourmet", category: "areas-comuns" },
      { src: "/assets/condominios/jardim-das-perdizes/sequoia/areas-comuns/lounge.webp", alt: "Lounge com vista", category: "areas-comuns" },
      { src: "/assets/condominios/jardim-das-perdizes/sequoia/areas-comuns/churrasqueira.webp", alt: "Área de churrasqueira", category: "areas-comuns" },
      { src: "/assets/condominios/jardim-das-perdizes/sequoia/areas-comuns/sala-jogos-adulto.webp", alt: "Sala de jogos adulto", category: "areas-comuns" },
      { src: "/assets/condominios/jardim-das-perdizes/sequoia/areas-comuns/sala-jogos-teen.webp", alt: "Sala de jogos teen", category: "areas-comuns" },
      { src: "/assets/condominios/jardim-das-perdizes/sequoia/areas-comuns/espaco-beleza.webp", alt: "Espaço de beleza", category: "areas-comuns" },
      { src: "/assets/condominios/jardim-das-perdizes/sequoia/areas-comuns/varanda-vista.webp", alt: "Varanda com vista", category: "areas-comuns" },
      { src: "/assets/condominios/jardim-das-perdizes/sequoia/plantas/planta-121m2.webp", alt: "Planta 121 m² — 3 quartos", category: "planta" },
      { src: "/assets/condominios/jardim-das-perdizes/sequoia/plantas/planta-148m2.webp", alt: "Planta 148 m² — 4 quartos", category: "planta" },
      { src: "/assets/condominios/jardim-das-perdizes/sequoia/plantas/planta-175m2.webp", alt: "Planta 175 m² — 4 quartos", category: "planta" },
      { src: "/assets/condominios/jardim-das-perdizes/sequoia/plantas/planta-121m2-zn.webp", alt: "Planta 121 m² — versão ZN", category: "planta" },
      { src: "/assets/condominios/jardim-das-perdizes/sequoia/plantas/planta-garden.webp", alt: "Planta garden 145 m²", category: "planta" },
      { src: "/assets/condominios/jardim-das-perdizes/sequoia/localizacao/parque-jardim.webp", alt: "Parque Jardim das Perdizes", category: "localizacao" },
      { src: "/assets/condominios/jardim-das-perdizes/sequoia/localizacao/parque-aereo.webp", alt: "Perspectiva aérea do parque", category: "localizacao" },
      { src: "/assets/condominios/jardim-das-perdizes/sequoia/localizacao/parque-familia.webp", alt: "Família no parque", category: "localizacao" },
    ],
  },
};

export function getCondoMedia(slug: string): CondoMedia | undefined {
  return CONDO_MEDIA[slug];
}
