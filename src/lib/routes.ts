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
  { key: "mercado-e-dados", path: "/mercado-e-dados/", label: "Mercado & Dados" },
  { key: "encontre-seu-perfil", path: "/encontre-seu-perfil/", label: "Encontre seu Perfil" },
  { key: "guia-jardim-das-perdizes", path: "/guia-jardim-das-perdizes/", label: "Guia do Jardim das Perdizes" },
  { key: "condominios", path: `${CONDOS_PREFIX}/`, label: "Condomínios" },
  { key: "glossario", path: "/ferramentas/glossario/", label: "Glossário" },
  { key: "fontes-e-metodo", path: "/fontes-e-metodo/", label: "Fontes e Método" },
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
  { path: "/mercado-e-dados/", label: "Mercado & Dados" },
];

/**
 * Secondary navigation: only Phase-1 pages that EXIST in ROUTES.
 * ("Sobre a Broker", "Newsletter", "Contato", "Pesquisar" have no P0 page yet,
 * so they are intentionally omitted to avoid dead links — SITE-01.)
 */
export const NAV_SECONDARY: NavItem[] = [
  { path: `${CONDOS_PREFIX}/`, label: "Condomínios" },
  { path: "/encontre-seu-perfil/", label: "Encontre seu Perfil" },
  { path: "/guia-jardim-das-perdizes/", label: "Guia do Jardim das Perdizes" },
  { path: "/fontes-e-metodo/", label: "Fontes e Método" },
  { path: "/ferramentas/glossario/", label: "Glossário" },
];

export function getRouteLabel(path: string): string | undefined {
  const route = ROUTES.find((r) => r.path === path);
  return route?.label;
}
