/**
 * Project media registry — maps condo slugs to the visual assets that
 * actually ship under /public/assets (downloaded from the official reference
 * sites). Condos without media render without a hero/gallery.
 */

export interface MediaItem {
  src: string;
  alt: string;
  /** Used to group the gallery response. */
  category: string;
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

  "sequoia": {
    slug: "sequoia",
    hero: "/assets/condominios/jardim-das-perdizes/sequoia/hero/sequoia-jardim-das-perdizes-fachada-vista-parque-lancamento.webp",
    heroAlt: "Fachada do Sequoia Jardim das Perdizes com vista para o parque",
    gallery: [
      { src: "/assets/condominios/jardim-das-perdizes/sequoia/areas-comuns/sequoia-jardim-das-perdizes-piscina-borda-infinita-lazer.webp", alt: "Piscina de borda infinita com vista do parque", category: "areas-comuns" },
      { src: "/assets/condominios/jardim-das-perdizes/sequoia/areas-comuns/sequoia-jardim-das-perdizes-academia-bodytech-consultoria.webp", alt: "Academia com assessoria de projeto Bodytech", category: "areas-comuns" },
      { src: "/assets/condominios/jardim-das-perdizes/sequoia/areas-comuns/sequoia-jardim-das-perdizes-churrasqueira-gourmet-lazer.webp", alt: "Churrasqueira gourmet", category: "areas-comuns" },
      { src: "/assets/condominios/jardim-das-perdizes/sequoia/areas-comuns/sequoia-jardim-das-perdizes-espaco-beleza-spa-lazer.webp", alt: "Espaco de beleza", category: "areas-comuns" },
      { src: "/assets/condominios/jardim-das-perdizes/sequoia/areas-comuns/sequoia-jardim-das-perdizes-espaco-gourmet-artefacto.webp", alt: "Espaco gourmet com curadoria Artefacto", category: "areas-comuns" },
      { src: "/assets/condominios/jardim-das-perdizes/sequoia/areas-comuns/sequoia-jardim-das-perdizes-lounge-convivio-artefacto.webp", alt: "Lounge de convivio com curadoria Artefacto", category: "areas-comuns" },
      { src: "/assets/condominios/jardim-das-perdizes/sequoia/areas-comuns/sequoia-jardim-das-perdizes-sala-jogos-adulto-lazer.webp", alt: "Sala de jogos adulto", category: "areas-comuns" },
      { src: "/assets/condominios/jardim-das-perdizes/sequoia/areas-comuns/sequoia-jardim-das-perdizes-sala-jogos-teen-lazer.webp", alt: "Sala de jogos teen", category: "areas-comuns" },
      { src: "/assets/condominios/jardim-das-perdizes/sequoia/areas-comuns/sequoia-jardim-das-perdizes-sala-massagem-spa-chandra.webp", alt: "Sala de massagem com assessoria Chandra Spa", category: "areas-comuns" },
      { src: "/assets/condominios/jardim-das-perdizes/sequoia/areas-comuns/sequoia-jardim-das-perdizes-spa-escalda-pes-chandra.webp", alt: "Spa — escalda-pes", category: "areas-comuns" },
      { src: "/assets/condominios/jardim-das-perdizes/sequoia/areas-comuns/sequoia-jardim-das-perdizes-spa-frigobar-chandra-consultoria.webp", alt: "Spa com frigobar e caldario", category: "areas-comuns" },
      { src: "/assets/condominios/jardim-das-perdizes/sequoia/areas-comuns/sequoia-jardim-das-perdizes-varanda-vista-parque-lazer.webp", alt: "Varanda com vista do parque", category: "areas-comuns" },
      { src: "/assets/condominios/jardim-das-perdizes/sequoia/plantas/sequoia-jardim-das-perdizes-planta-121m2-3-quartos-1-suite.webp", alt: "Planta 121 m2 — 3 quartos, 1 suite", category: "planta" },
      { src: "/assets/condominios/jardim-das-perdizes/sequoia/plantas/sequoia-jardim-das-perdizes-planta-148m2-4-quartos-2-suites.webp", alt: "Planta 148 m2 — 4 quartos, 2 suites", category: "planta" },
      { src: "/assets/condominios/jardim-das-perdizes/sequoia/plantas/sequoia-jardim-das-perdizes-planta-175m2-4-quartos-2-suites.webp", alt: "Planta 175 m2 — 4 quartos, 2 suites", category: "planta" },
      { src: "/assets/condominios/jardim-das-perdizes/sequoia/plantas/sequoia-jardim-das-perdizes-planta-121m2-zn-imobiliaria.webp", alt: "Planta 121 m2 — versao imobiliaria", category: "planta" },
      { src: "/assets/condominios/jardim-das-perdizes/sequoia/plantas/sequoia-jardim-das-perdizes-planta-garden-145m2-terrea.webp", alt: "Planta garden 145 m2 — terrea", category: "planta" },
      { src: "/assets/condominios/jardim-das-perdizes/sequoia/localizacao/parque-jardim-das-perdizes-area-familia-lazer.webp", alt: "Parque Jardim das Perdizes — area da familia", category: "localizacao" },
      { src: "/assets/condominios/jardim-das-perdizes/sequoia/localizacao/parque-jardim-das-perdizes-area-verde-sustentavel.webp", alt: "Parque Jardim das Perdizes — area verde", category: "localizacao" },
      { src: "/assets/condominios/jardim-das-perdizes/sequoia/localizacao/parque-jardim-das-perdizes-vista-aerea-verde.webp", alt: "Vista area do parque", category: "localizacao" },
    ],
  },
  "reserva-figueiras": {
    slug: "reserva-figueiras",
    hero: "/assets/condominios/jardim-das-perdizes/reserva-figueiras/hero/reserva-figueiras-jardim-das-perdizes-fachada-portaria-lancamento.jpg",
    heroAlt: "Facade e portaria do Reserva Figueiras Jardim das Perdizes",
    gallery: [
      { src: "/assets/condominios/jardim-das-perdizes/reserva-figueiras/areas-comuns/reserva-figueiras-jardim-das-perdizes-beach-tennis-lazer.jpg", alt: "Beach tennis", category: "areas-comuns" },
      { src: "/assets/condominios/jardim-das-perdizes/reserva-figueiras/areas-comuns/reserva-figueiras-jardim-das-perdizes-living-ampliado-165m2.jpg", alt: "Living ampliado 165 m2", category: "areas-comuns" },
      { src: "/assets/condominios/jardim-das-perdizes/reserva-figueiras/areas-comuns/reserva-figueiras-jardim-das-perdizes-piscina-externa-lazer.jpg", alt: "Piscina esterna", category: "areas-comuns" },
      { src: "/assets/condominios/jardim-das-perdizes/reserva-figueiras/areas-comuns/reserva-figueiras-jardim-das-perdizes-piscina-interna-coberta.jpg", alt: "Piscina interna coberta", category: "areas-comuns" },
      { src: "/assets/condominios/jardim-das-perdizes/reserva-figueiras/areas-comuns/reserva-figueiras-jardim-das-perdizes-terraco-188m2-lazer.jpg", alt: "Terracoco 188 m2", category: "areas-comuns" },
      { src: "/assets/condominios/jardim-das-perdizes/reserva-figueiras/plantas/reserva-figueiras-jardim-das-perdizes-planta-165m2-4-dorms-2-suites.jpg", alt: "Planta 165 m2 — 4 dorm, 2 suites", category: "planta" },
      { src: "/assets/condominios/jardim-das-perdizes/reserva-figueiras/plantas/reserva-figueiras-jardim-das-perdizes-planta-188m2-4-dorms-3-suites.jpg", alt: "Planta 188 m2 — 4 dorm, 3 suites", category: "planta" },
    ],
  },
  "recanto-oliveiras": {
    slug: "recanto-oliveiras",
    hero: "/assets/condominios/jardim-das-perdizes/recanto-oliveiras/recanto-oliveiras-jardim-das-perdizes-perspectiva-parque-verde.webp",
    heroAlt: "Perspectiva do Recanto Oliveiras com vista do parque",
    gallery: [
      { src: "/assets/condominios/jardim-das-perdizes/recanto-oliveiras/recanto-oliveiras-jardim-das-perdizes-perspectiva-parque-verde.webp", alt: "Perspectiva do empreendimento", category: "hero" },
    ],
  },
  "reserva-flamboyant": {
    slug: "reserva-flamboyant",
    hero: "/assets/condominios/jardim-das-perdizes/reserva-flamboyant/reserva-flamboyant-jardim-das-perdizes-perspectiva-parque-benedito-abbud.webp",
    heroAlt: "Perspectiva do Reserva Flamboyant",
    gallery: [
      { src: "/assets/condominios/jardim-das-perdizes/reserva-flamboyant/reserva-flamboyant-jardim-das-perdizes-perspectiva-parque-benedito-abbud.webp", alt: "Perspectiva do empreendimento", category: "hero" },
    ],
  },
  "bosque-cerejeiras": {
    slug: "bosque-cerejeiras",
    hero: "/assets/condominios/jardim-das-perdizes/bosque-cerejeiras/bosque-cerejeiras-jardim-das-perdizes-fachada-dramatica-luxo.webp",
    heroAlt: "Facade do Bosque Cerejeiras — perspectiva de luxo",
    gallery: [
      { src: "/assets/condominios/jardim-das-perdizes/bosque-cerejeiras/bosque-cerejeiras-jardim-das-perdizes-fachada-perspectiva-artefacto.webp", alt: "Facade — perspectiva com curadoria Artefacto", category: "outros" },
    ],
  },
};

export function getCondoMedia(slug: string): CondoMedia | undefined {
  return CONDO_MEDIA[slug];
}
