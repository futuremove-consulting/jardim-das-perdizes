# Roadmap: Jardim das Perdizes Broker

## Overview

O projeto nasce da pesquisa 360º já consolidada (26 docs em `extracted/`) e entrega um site/blog de autoridade que converte visitantes em leads qualificados via formulário + WhatsApp, com rastreio de origem/intenção no Supabase e integração com o VISTA (Loft CRM) para leads e inventário real. A primeira versão é um site leve (11 páginas P0 + 5 de condomínio), demo-first (`APP_MODE=demo` com mocks), que escala para dados reais (VISTA/Uazapi) e produção no Vercel. Como fonte de **inteligência de mercado**, o site também fará análise e planejamento de integração com a **Captei Listings API** (anúncios agregados de portais) para páginas de mercado, comparador e conteúdo de autoridade. No eixo de leads, será analisada/planejada a integração com a **EEMOVEL Converta+** (gestor inteligente de leads/funil) e definido um **modelo de dados canônico** no Supabase com tradutores por fonte (hub-and-spoke) — melhor prática global para múltiplos sistemas de captação.

## Phases

- [x] **Phase 1: Fundação & Esqueleto** - Scaffold Next.js + base de layout/menus + 16 rotas + SEO técnico base (demo-first) (completed 2026-08-28)
- [ ] **Phase 2: Inventário & Descoberta** - Modelo de dados Supabase, cards/filtros/fichas técnicas, páginas de condomínio, comparador e sync VISTA (demo = mocks)
- [ ] **Phase 3: Conversão & CRM** - Mini formulário 4 passos, CTA dual + WhatsApp (Uazapi), lead no Supabase + VISTA, LGPD
- [ ] **Phase 4: Conteúdo & SEO/AEO/GEO** - Blog + pilar principal, FAQ schema, autoria, calendário 90 dias, analytics
- [ ] **Phase 5: Produção & Growth** - Chaves reais (VISTA/Uazapi), cron sync, deploy Vercel, alerta de imóveis, dashboard KPIs
- [ ] **Phase 6: Captei — Análise & Planejamento** - Análise/documentação da Captei Listings API + plano de integração (pode rodar em paralelo às fases 1–5)
- [ ] **Phase 7: EEMOVEL Converta+ & Modelo Canônico — Análise & Planejamento** - Análise/documentação da API EEMOVEL Converta+ (leads/funil) + modelo de dados canônico e matriz de conversão (pode rodar em paralelo às fases 1–5)

## Phase Details

### Phase 1: Fundação & Esqueleto

**Goal**: Site Next.js de pé com a arquitetura de navegação dos docs, 11 páginas P0 + 5 de condomínio, SEO técnico base e o toggle `APP_MODE=demo` (UI funcionando com dados de exemplo).
**Mode**: mvp
**Depends on**: Nada (primeira fase)
**Requirements**: SITE-01, SITE-02, SEO-01, SITE-05 (estrutura das páginas de condomínio)
**Success Criteria** (what must be TRUE):

  1. Rodando `pnpm dev`, um visitante navega entre home, páginas de comprar/alugar/condomínios sem quebra de rota
  2. Toda página P0 tem `<title>`, meta description e canonical definidos em inglês de schema inglês (pt-BR na copy)
  3. `sitemap.xml` e `robots.txt` servidos; schema LocalBusiness na home
  4. APP_MODE=demo renderiza conteúdo de exemplo; trocar para `prod` não quebra o build (mocks isolados)
  5. Projeto gira com pnpm, build `next build` sem erros, testes TDD passando

**Plans**: 4/4 plans complete

Plans:

- [x] 01-01-PLAN.md
- [x] 01-02-PLAN.md
- [x] 01-03-PLAN.md
- [x] 01-04-PLAN.md

**Wave 1**

- [x] 01-01: Walking skeleton — scaffold Next.js (App Router+TS+Tailwind+Vitest, pnpm) + APP_MODE config + identidade da home + git/AGENTS

**Wave 2** *(blocked on Wave 1 completion)*

- [x] 01-02: Registro único de rotas (16 URLs, TDD) + design tokens + Header/Footer/PageLayout (menus dos docs)

**Wave 3** *(blocked on Wave 2 completion)*

- [x] 01-03: Dados de condomínios com testes de fidelidade (TDD) + rotas dinâmicas dos 5 condomínios + factory de metadata (canonical)

**Wave 4** *(blocked on Wave 3 completion)*

- [ ] 01-04: 9 páginas P0 restantes com conteúdo real + sitemap.xml/robots.txt/LocalBusiness (TDD) + home hub com roteamento por intenção (demo)

### Phase 2: Inventário & Descoberta

**Goal**: Camada de dados e descoberta do site: **Supabase como banco canônico completo** (condomínios, imóveis, leads) com modelagem **compatível com a estrutura do VISTA** (campos de compatibilidade), sync VISTA via futura API (mock no demo), cards/filtros essenciais, fichas técnicas e comparador — dados sempre fiéis (nunca inventar).
**Mode**: mvp
**Depends on**: Phase 1
**Requirements**: SITE-03, SITE-04, SITE-05, SITE-06, CRM-03, VISTA-02, VISTA-03, VISTA-04
**Success Criteria** (what must be TRUE):

  1. Página de busca/filtros retorna imóveis reais (dados dos docs / mock VISTA) por finalidade, condomínio, dormitórios, área e preço
  2. Ficha técnica de um imóvel exibe todos os campos estruturados (torre, andar, vagas, condomínio, IPTU, fotos, status)
  3. Página de condomínio mostra produto/torres confirmadas/status de entrega por condomínio real
  4. Comparador simples compara 2 imóveis lado a lado
  5. Schema Supabase espelha a estrutura VISTA (modelagem compatível, VISTA-03): campos de compatibilidade (`vistaCode`, `vistaStatus`, `verifiedAt`) presentes; mock do sync VISTA em demo via futura API do produto

**Plans**: 4 plans

Plans:

- [ ] 02-01: Modelagem Supabase (properties, condominiums, leads, alerts) + migrations + seed demo
- [ ] 02-02: Modelagem compatível VISTA: `vistaApiClient` (futura API) + mocks (`mocks/vista/*.json`) + mapeamento VISTA→schema EN (VISTA-03)
- [ ] 02-03: Camada de descoberta: busca/filtros/cards (docs "Especificação da camada de descoberta")
- [ ] 02-04: Fichas técnicas + páginas de condomínio + comparador simples

### Phase 3: Conversão & CRM

**Goal**: A máquina de leads: mini formulário de qualificação em 4 passos, CTA dual ("Enviar solicitação" + "Falar agora com especialista"), WhatsApp via Uazapi (mocked no demo), registro **no Supabase (canônico)** com origem/intenção e contrato da futura API para o VISTA (`POST /lead/site`), com LGPD.
**Mode**: mvp
**Depends on**: Phase 2
**Requirements**: CONV-01, CONV-02, CONV-03, CONV-04, CRM-01, CRM-04, VISTA-01, VISTA-05
**Success Criteria** (what must be TRUE):

1. Preencher o mini formulário 4 passos cria um lead **no Supabase (canônico)** com origem, URL, entidade, filtros e campanha
2. A futura API do produto expõe o contrato lead→VISTA (`POST /lead/site`); no demo o mock devolve `Codigo` e o lead fica com `vistaClientCode` (VISTA-01)
  3. CTA WhatsApp abre mensagem pré-preenchida contextual; botão de formulário e WhatsApp presentes em todas as páginas
  4. Lead duplicado por telefone não cria novo cliente (dedupe reutilizando `Codigo` — VISTA-05)
  5. Política de privacidade publicada; consentimento separado; nenhum PII em parâmetros de URL
  6. Roteamento por intenção preservado em todos os CTAs (docs "Duas portas de conversão")

**Plans**: 4 plans

Plans:

- [ ] 03-01: Server Actions/API de lead + schema Supabase (origem/intenção) + dedupe
- [ ] 03-02: Mini formulário 4 passos + roteamento por intenção + validação LGPD
- [ ] 03-03: CTA dual contextual + deep-link WhatsApp (Uazapi mock no demo)
- [ ] 03-04: Contrato lead→VISTA `POST /lead/site` (futura API; mock no demo) + página de privacidade

### Phase 4: Conteúdo & SEO/AEO/GEO

**Goal**: O motor de autoridade: blog com calendário editorial de 90 dias (12 ativos), artigo pilar do bairro, FAQ com schema, autoria e transparência de fontes, analytics/GA4 + Search Console prontos dentro dos requisitos LGPD.
**Mode**: mvp
**Depends on**: Phase 3
**Requirements**: CONT-01, CONT-02, CONT-03, SEO-02, SEO-03, SEO-04
**Success Criteria** (what must be TRUE):

  1. Blog publica artigo pilar principal do bairro + primeiros artigos do calendário (12 ativos em 90 dias mapeados no editorial)
  2. Página de FAQ exibe perguntas reais com schema FAQPage e CTA "Falar com especialista"
  3. Artigos têm autoria, política de fontes e data de atualização visível
  4. GA4/Search Console/Bing configurados com avaliação de privacidade documentada
  5. Cadência editorial definida (2–4/mês) com briefings estruturados

**Plans**: 3 plans

Plans:

- [ ] 04-01: Calendário editorial 90 dias + briefings (docs "Sitemap e Blog Map" e "hub editorial")
- [ ] 04-02: Blog engine (CMS leve sobre Supabase) + pilar principal do bairro + autoria/fontes
- [ ] 04-03: FAQ schema/AEO/GEO + Analytics + Search Console setup

### Phase 5: Produção & Growth

**Goal**: Colocar o site em operação real: chaves VISTA e Uazapi reais (sem mocks), sync cron do inventário, deploy no Vercel, alerta de imóveis, dashboard dos KPIs lead→visita→proposta.
**Mode**: mvp
**Depends on**: Phase 4
**Requirements**: SITE-07, CRM-02, VISTA-04 (produção), SITE-02 (final)
**Success Criteria** (what must be TRUE):

  1. Em produção, leads e inventário vêm da API real do VISTA (`VISTA_API_KEY` em secret server-side), sem vazamento da chave
  2. Sync diário (Vercel Cron) atualiza inventário com `verifiedAt`; dados de produção nunca inventados
  3. WhatsApp real via Uazapi recebe leads e responde com mensagem pré-preenchida
  4. Alerta de imóveis notifica interessados em novos imóveis do filtro salvo
  5. Dashboard mostra funil: leads → visitas → propostas (KPIs dos docs)
  6. Deploy Vercel com domínio final, Search Console verificado e GBP vinculado

**Plans**: 4 plans

Plans:

- [ ] 05-01: Configuração produção (envs, secrets, sandbox→prod VISTA, Uazapi real)
- [ ] 05-02: Cron sync inventário + webhooks/polling (VISTA direção C) + alerts
- [ ] 05-03: Deploy Vercel + domínio + Search Console/GBP
- [ ] 05-04: Dashboard de KPIs (leads → visitas → propostas) + automação Uazapi

### Phase 6: Captei — Análise & Planejamento

**Goal**: Analisar e documentar a **Captei Listings API** (https://app.captei.com.br/api/listings/doc) e planejar a integração como fonte de **inteligência de mercado** (anúncios agregados de portais) — página `mercado-e-dados`, comparador/benchmark e conteúdo de autoridade. **Papel**: complementar ao VISTA (canônico); nunca alimenta inventário.
**Mode**: mvp
**Depends on**: Nenhuma (análise/planejamento paralelos às fases 1–5; execução real em produção após Phase 5)
**Requirements**: CAPTEI-01, CAPTEI-02, CAPTEI-03
**Success Criteria** (what must be TRUE):

  1. `docs/captei-integration.md` documenta auth (`Token` + `User-Key`), limites (1s/60rpm/50k dia/10000 deep), endpoint `GET /api/listings/search` e schemas (`SearchResponse`/`Listing`/`Address`)
  2. Requisitos CAPTEI-01..03 e casos de uso v1 registrados (mercado-e-dados, comparador, conteúdo com fonte)
  3. Plano define client server-side com throttle ≥1 s, mock demo (`mocks/captei/*.json`), secrets `CAPTEI_TOKEN`/`CAPTEI_USER_KEY` em produção

**Plans**: 3 plans

Plans:

- [x] 06-01: Análise da API + `docs/captei-integration.md` (auth, limites, endpoint, schemas) — entregue 2026-08-28
- [ ] 06-02: Plano de implementação: `src/lib/captei-api-client.ts` (throttle ≥1s, server-side) + mocks `mocks/captei/*.json` (demo)
- [ ] 06-03: Página `mercado-e-dados` (P0) com dados Captei (mock no demo; API real em prod) + citação de fonte nos conteúdos

### Phase 7: EEMOVEL Converta+ & Modelo Canônico — Análise & Planejamento

**Goal**: Analisar e documentar a **EEMOVEL Converta+ Rest API** (https://developer.convertamais.com/ — gestor inteligente de leads/funil, v1.7.0) e planejar a integração como **destino de leads + fonte de eventos de funil** (webhooks). Definir também o **modelo de dados canônico** (Supabase como centro) com **tradutores/adapters por fonte** e **matriz de conversão** documentada — melhor prática global para múltiplos sistemas de captação (VISTA, Captei, eemovel, Uazapi). **Papel**: complementar ao VISTA no eixo de leads; nunca alimenta inventário.
**Mode**: mvp
**Depends on**: Nenhuma (análise/planejamento paralelos às fases 1–5; execução real em produção após Phase 5)
**Requirements**: EEM-01, EEM-02, EEM-03, INTG-01, INTG-02
**Success Criteria** (what must be TRUE):

  1. `docs/eemovel-integration.md` documenta auth (Basic + `api_key`), webhooks (`customer_service_created`/`status_changed`), endpoints (`/v1/channels/{channelName}/leads`, `/public/v1/customer-services*`, `/public/v1/visits`) e o funil de etapas
  2. Requisitos EEM-01..03 e INTG-01..02 registrados; melhor prática de modelo canônico (hub-and-spoke + tradutores + matriz de conversão) documentada com exemplo de crosswalk eemovel→canônico
  3. Plano define: lead no Supabase **primeiro** (canônico), depois `POST` ao Converta+; webhooks alimentam o funil KPI (CRM-02); secrets `CONVERTAMAIS_USER`/`CONVERTAMAIS_PASS`/`CONVERTAMAIS_API_KEY` server-side; mocks `mocks/eemovel/*.json` no demo

**Plans**: 3 plans

Plans:

- [x] 07-01: Análise da API + `docs/eemovel-integration.md` (auth, webhooks, endpoints, funil, matriz de conversão) — entregue 2026-08-28
- [ ] 07-02: Plano de implementação: `src/lib/integrations/eemovel/` (client + `mapToCanonical`) + mocks `mocks/eemovel/*.json` (demo) + handlers de webhook
- [ ] 07-03: Modelo canônico no schema Supabase (`sourceKey`, `funnel_events`) + adapters `{vista,captei,eemovel,uazapi}` + matriz de conversão nos docs

## Progress

**Execution Order:**
Phases executam em ordem numérica: 1 → 2 → 3 → 4 → 5. Phases 6 e 7 (análise/planejamento de integrações) podem rodar em paralelo.

| Phase | Plans Complete | Status | Completed |
|-------|----------------|--------|-----------|
| 1. Fundação & Esqueleto | 4/4 | Complete   | 2026-08-28 |
| 2. Inventário & Descoberta | 0/4 | Not started | - |
| 3. Conversão & CRM | 0/4 | Not started | - |
| 4. Conteúdo & SEO/AEO/GEO | 0/3 | Not started | - |
| 5. Produção & Growth | 0/4 | Not started | - |
| 6. Captei — Análise & Planejamento | 1/3 | In progress | - |
| 7. EEMOVEL Converta+ & Modelo Canônico — Análise & Planejamento | 1/3 | In progress | - |
