# Changelog

Todas as mudanças notáveis do projeto.

Formato baseado em [Keep a Changelog](https://keepachangelog.com/pt-BR/1.0.0/)
e versionamento semântico.

## [Não publicado]

### Adicionado
- **Sistema "Guias do Bairro"** (8 guias no formato-exemplar AEO/GEO com fonte
  datada em cada entidade): Escolas, Bares e Restaurantes, Saúde, Transporte e
  Mobilidade, Comércio e Serviços, Lazer e Cultura, Segurança, Pet-Friendly.
- Componente compartilhado `GuiaPage` (H1 → takeaways → tabelas com fonte →
  FAQ 1:1 JSON-LD → duas portas de conversão) + camada de dados `src/data/guias.ts`.
- Hub `/guias-do-bairro/` agora lista os oito guias com links e atualiza o
  título de "seis guias" para "oito guias".
- 8 rotas novas no `routes.ts` (30 no total) com atualização de sitemap,
  `llms.txt` e testes.
- 6 novos testes (160 no total) cobrindo `GuiaPage`, integridade dos dados e
  rotas.
- Nova pessoa **Trabalhar**: hub `/para-trabalhar/` substitui "Encontre seu
  Perfil" — salas comerciais (TIME Office) e lajes corporativas (TIME
  Corporate).
- Vitrines comerciais `/para-trabalhar/comprar/` e `/para-trabalhar/alugar/`.
- Fichas comerciais dinâmicas `/para-trabalhar/[modality]/[slug]/` (4 páginas
  SSG: time-office-salas e time-corporate-lajes × comprar/alugar).
- Fonte de dados `src/data/commercial.ts` com fonte + data de verificação.
- 2 novos tests (34 asserts) cobrindo o hub comercial, rotas e sitemap.

### Corrigido
- `globals.css`: `font-family: Arial, Helvetica, sans-serif` hardcoded →
  `var(--font-sans)` (anti-padrão `overused-font` do Impeccable — detect
  agora retorna zero ocorrências).
- Links órfãos de "Encontre seu Perfil" redirecionados para `/para-trabalhar/`
  (home, para-morar, guia-jardim-das-perdizes, `llms.txt`).
- Label de navegação "Mercado & Dados" → "Mercado" (rotas, breadcrumb, título
  da página, referências em para-investir/venda-ou-alugue e `llms.txt`).

### Removido
- Página legada `src/app/encontre-seu-perfil/` (substituída pelo hub comercial).

### Documentação
- README reescrito: personas, stack, quickstart, scripts, estrutura e
  princípios de qualidade.

## [0.1.0] — base do projeto

### Adicionado
- Projeto Next.js 15 (App Router) com TypeScript strict e testes Vitest (TDD).
- Design system com tokens semânticos e temas dark/light.
- 9 fichas de condomínios com dados verificados (fonte + data).
- Hubs de persona: Para Morar, Para Investir, Venda ou Alugue, Guias do Bairro,
  Mercado & Dados.
- Conversão dual (LeadForm + WhatsApp), schemas JSON-LD (AEO/GEO) e llms.txt.
- Integração Impeccable para detecção de anti-padrões de design.