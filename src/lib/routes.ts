export interface Route {
  key: string;
  path: string;
  label: string;
}

export interface NavItem {
  path: string;
  label: string;
}

const CONDOS_PREFIX = "/condominios";

export const ROUTES: Route[] = [
  // --- 6 main navigation items (P0 hub pages) ---
  { key: "home", path: "/", label: "Home" },
  { key: "para-morar", path: "/para-morar/", label: "Para Morar" },
  { key: "para-investir", path: "/para-investir/", label: "Para Investir" },
  { key: "venda-ou-alugue", path: "/venda-ou-alugue/", label: "Venda ou Alugue" },
  { key: "guias-do-bairro", path: "/guias-do-bairro/", label: "Guias do Bairro" },
  { key: "guia-escolas", path: "/guias-do-bairro/escolas/", label: "Guia de Escolas" },
  { key: "guia-bares-restaurantes", path: "/guias-do-bairro/bares-e-restaurantes/", label: "Guia de Bares e Restaurantes" },
  { key: "guia-saude", path: "/guias-do-bairro/saude/", label: "Guia de Saúde" },
  { key: "guia-transporte", path: "/guias-do-bairro/transporte-e-mobilidade/", label: "Guia de Transporte e Mobilidade" },
  { key: "guia-comercio", path: "/guias-do-bairro/comercio-e-servicos/", label: "Guia de Comércio e Serviços" },
  { key: "guia-lazer", path: "/guias-do-bairro/lazer-e-cultura/", label: "Guia de Lazer e Cultura" },
  { key: "guia-seguranca", path: "/guias-do-bairro/seguranca/", label: "Guia de Segurança" },
  { key: "guia-pet-friendly", path: "/guias-do-bairro/pet-friendly/", label: "Guia Pet-Friendly" },
  { key: "mercado-e-dados", path: "/mercado-e-dados/", label: "Mercado" },
  { key: "para-trabalhar", path: "/para-trabalhar/", label: "Trabalhar" },
  { key: "para-trabalhar-comprar", path: "/para-trabalhar/comprar/", label: "Comprar" },
  { key: "para-trabalhar-alugar", path: "/para-trabalhar/alugar/", label: "Alugar" },
  { key: "guia-jardim-das-perdizes", path: "/guia-jardim-das-perdizes/", label: "Guia do Jardim das Perdizes" },
  { key: "condominios", path: `${CONDOS_PREFIX}/`, label: "Condomínios" },
  { key: "glossario", path: "/ferramentas/glossario/", label: "Glossário" },
  { key: "fontes-e-metodo", path: "/fontes-e-metodo/", label: "Fontes e Método" },
  { key: "privacidade", path: "/privacidade/", label: "Privacidade" },
  // --- 10 condominium/product pages (P0) under /condominios/ ---
  { key: "condominio-reserva-manaca", path: `${CONDOS_PREFIX}/reserva-manaca/`, label: "Reserva Manacá" },
  { key: "condominio-bosque-jequitiba", path: `${CONDOS_PREFIX}/bosque-jequitiba/`, label: "Bosque Jequitibá" },
  { key: "condominio-bosque-araucaria", path: `${CONDOS_PREFIX}/bosque-araucaria/`, label: "Bosque Araucária" },
  { key: "condominio-recanto-jacaranda", path: `${CONDOS_PREFIX}/recanto-jacaranda/`, label: "Recanto Jacarandá" },
  { key: "condominio-reserva-figueiras", path: `${CONDOS_PREFIX}/reserva-figueiras/`, label: "Reserva Figueiras" },
  { key: "condominio-sequoia", path: `${CONDOS_PREFIX}/sequoia/`, label: "Sequoia" },
  { key: "condominio-bosque-cerejeiras", path: `${CONDOS_PREFIX}/bosque-cerejeiras/`, label: "Bosque Cerejeiras" },
  { key: "condominio-reserva-flamboyant", path: `${CONDOS_PREFIX}/reserva-flamboyant/`, label: "Reserva Flamboyant" },
  { key: "condominio-recanto-oliveiras", path: `${CONDOS_PREFIX}/recanto-oliveiras/`, label: "Recanto Oliveiras" },
];

/** Main documented navigation: exactly 6 items. */
export const NAV_MAIN: NavItem[] = [
  { path: "/", label: "Home" },
  { path: "/para-morar/", label: "Para Morar" },
  { path: "/para-investir/", label: "Para Investir" },
  { path: "/venda-ou-alugue/", label: "Venda ou Alugue" },
  { path: "/guias-do-bairro/", label: "Guias do Bairro" },
  { path: "/mercado-e-dados/", label: "Mercado" },
];

/**
 * Secondary navigation: only Phase-1 pages that EXIST in ROUTES.
 * ("Sobre a Broker", "Newsletter", "Contato", "Pesquisar" have no P0 page yet,
 * so they are intentionally omitted to avoid dead links — SITE-01.)
 */
export const NAV_SECONDARY: NavItem[] = [
  { path: `${CONDOS_PREFIX}/`, label: "Condomínios" },
  { path: "/para-trabalhar/", label: "Trabalhar" },
  { path: "/guia-jardim-das-perdizes/", label: "Guia do Jardim das Perdizes" },
  { path: "/fontes-e-metodo/", label: "Fontes e Método" },
  { path: "/ferramentas/glossario/", label: "Glossário" },
];

export function getRouteLabel(path: string): string | undefined {
  const route = ROUTES.find((r) => r.path === path);
  return route?.label;
}
