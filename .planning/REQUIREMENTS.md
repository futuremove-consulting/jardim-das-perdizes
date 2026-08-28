# Requirements: Jardim das Perdizes Broker

**Defined:** 2026-08-28
**Core Value:** Gerar leads imobiliários qualificados do Jardim das Perdizes via conteúdo de autoridade e conversão dual (formulário + WhatsApp), tudo rastreado no CRM (Supabase) e integrado ao VISTA (Loft CRM).

## v1 Requirements

Requirements para a primeira release. Cada um mapeia para as fases do roadmap.

### Site (SITE)

- [ ] **SITE-01**: Site Next.js (App Router) responsivo com as 11 páginas P0 + 5 páginas de condomínio do sitemap estratégico
- [ ] **SITE-02**: Home apresenta o hub e a conversão dual em dobra visível, com roteamento imediato por intenção (comprador / locatário / investidor / proprietário)
- [ ] **SITE-03**: Camada de descoberta: busca + filtros essenciais (finalidade, condomínio, dormitórios, área, preço) e cards de imóvel padronizados
- [ ] **SITE-04**: Fichas técnicas de imóvel com campos estruturados completos (torre, andar, área, vagas, condomínio, IPTU, custo total estimado, status, fotos)
- [ ] **SITE-05**: Páginas de condomínio (8+ condomínios reais do Jardim das Perdizes) com produto, torres confirmadas e status de entrega
- [ ] **SITE-06**: Comparador simples de imóveis (lazy, sem portal gigante)
- [ ] **SITE-07**: Alerta de imóveis (cadastro de interesse para novos imóveis chegarem)

### Conversão (CONV)

- [ ] **CONV-01**: Conversão dual — formulário qualificador ("Enviar solicitação") + CTA WhatsApp ("Falar agora com especialista") em todas as páginas com contexto
- [ ] **CONV-02**: Mini formulário de qualificação em 4 passos (intenção → sub-intenção → contato → próximo passo) rastreando origem, URL, entidade, filtros e campanha
- [ ] **CONV-03**: Mensagens pré-preenchidas para WhatsApp com contexto do imóvel/página
- [ ] **CONV-04**: Regras de disponibilidade de atendimento (horários) e roteamento correto da intenção

### CRM & Dados (CRM)

- [ ] **CRM-01**: Captura de leads com origem, URL, entidade, filtros, campanha e timestamp (LGPD: mínimo necessário)
- [ ] **CRM-02**: Rastreamento lead → visita → proposta a partir do CRM (dashboard simples dos KPIs)
- [ ] **CRM-03**: Base de inventário local (Supabase) com data de verificação por imóvel e histórico de alteração de preço
- [ ] **CRM-04**: LGPD — política de privacidade revisada, consentimento separado de atendimento, sem PII em URLs

### SEO / AEO / GEO (SEO)

- [ ] **SEO-01**: Estrutura SEO/AEO/GEO — schema.org (RealEstateListing, FAQ, Breadcrumb, LocalBusiness), sitemap.xml, metadados por página, canonical, URLs limpas
- [ ] **SEO-02**: FAQ real (baseada em perguntas do CRM) com schema FAQ + "Falar com especialista"
- [ ] **SEO-03**: Autoria e transparência — política de fontes, data de atualização visível, selo LGPD
- [ ] **SEO-04**: Analytics/GA4, Search Console, Bing Webmaster e métricas de conversão instalados (após avaliação de privacidade)

### Conteúdo (CONT)

- [ ] **CONT-01**: Blog com calendário editorial de 90 dias (12 ativos editoriais): artigos pilar + artigos de apoio mapeados por intenção e palavra-chave
- [ ] **CONT-02**: Pilar principal do bairro (hub de inteligência do Jardim das Perdizes) — guia, localização, custos, comparador de condomínios
- [ ] **CONT-03**: Cadência de produção viável (2–4 conteúdos/mês) com briefings estruturados

### Integração VISTA (VISTA)

- [ ] **VISTA-01**: Lead gravado **no Supabase (canônico)** com toda a fonte/intenção; a **futura API do produto** faz `POST /lead/site` no VISTA e grava o `Codigo` (`vistaClientCode`) — sem o site falar com o VISTA diretamente
- [ ] **VISTA-02**: Inventário **no Supabase como fonte da verdade**; futura API do produto sincroniza do VISTA (`/imoveis/listarcampos` → `listar` → `detalhes`), filtrado por bairro Jardim das Perdizes/Perdizes, com `verifiedAt` por imóvel (ex.: Vercel Cron diário)
- [ ] **VISTA-03**: **Modelagem de dados compatível** — schema Supabase espelha a estrutura VISTA com campos de compatibilidade (`vistaCode`, `vistaClientCode`, `vistaStatus`, `vistaDealId`...) para sync futuro sem migração de schema (tabela em `docs/vista-integration.md`)
- [ ] **VISTA-04**: Cliente atendido: `APP_MODE=demo` usa mocks (`mocks/vista/*.json`); produção usa API real com `VISTA_API_KEY` guardada em secret (server-side apenas)
- [ ] **VISTA-05**: Dedupe de leads por telefone/Foneprincipal reutilizando `Codigo` existente (sem duplicar clientes no VISTA)

### Integração Captei (CAPTEI)

Integração com a **Captei Listings API** (https://app.captei.com.br/api/listings/doc) — busca big-data de anúncios de portais (Elasticsearch), apenas leitura, sem telefone. Papel: **inteligência de mercado** complementar ao VISTA (canônico).

- [ ] **CAPTEI-01**: Análise da API documentada em `docs/captei-integration.md` (auth `Token` + `User-Key`, limites 1s/60rpm/50k dia, endpoint `GET /api/listings/search`, schemas `SearchResponse`/`Listing`/`Address`)
- [ ] **CAPTEI-02**: Plano de integração no roadmap (Phase 6) mapeando casos de uso v1: página `mercado-e-dados` (P0), comparador/benchmark, conteúdo de autoridade com fonte
- [ ] **CAPTEI-03**: Cliente server-side (`src/lib/captei-api-client.ts`) com throttle ≥1 s; `APP_MODE=demo` usa mock (`mocks/captei/*.json` espelhando `SearchResponse`); `CAPTEI_TOKEN`/`CAPTEI_USER_KEY` em secrets server-side

## Out of Scope

| Feature | Reason |
|---------|--------|
| App mobile nativo | Docs: 0–6 meses consolidar site, GBP, YouTube, Instagram, CRM; não priorizar app |
| Portal gigante com inventário de terceiros não verificado | Nunca inventar torres/unidades/preços; primeira versão = site leve com inventário real |
| Pagamentos online / reserva com cartão | Conversão é lead → visita → proposta, não e-commerce |
| Integrações externas do VISTA (CredPago, seguro, VivaReal, Órulo, RD Station, GoodData) | Fora do escopo v1; VISTA faz o push para portais — não replicar |
| Alimentar inventário canônico via Captei | Captei é agregado de terceiros (sem telefone/fidelidade de torres); inventário canônico vem só do VISTA — Captei é dado de mercado |
| Chaveiros / retiradas de chaves | Domínio operacional do VISTA, sem necessidade no site |

## Traceability

| Requirement | Phase | Status |
|-------------|-------|--------|
| SITE-01 | Phase 1 | Pending |
| SITE-02 | Phase 1 | Pending |
| SEO-01 | Phase 1 | Pending |
| SITE-03 | Phase 2 | Pending |
| SITE-04 | Phase 2 | Pending |
| SITE-05 | Phase 2 | Pending |
| SITE-06 | Phase 2 | Pending |
| CRM-03 | Phase 2 | Pending |
| VISTA-02 | Phase 2 | Pending |
| VISTA-03 | Phase 2 | Pending |
| VISTA-04 | Phase 2 (+5) | Pending |
| CONV-01 | Phase 3 | Pending |
| CONV-02 | Phase 3 | Pending |
| CONV-03 | Phase 3 | Pending |
| CONV-04 | Phase 3 | Pending |
| CRM-01 | Phase 3 | Pending |
| CRM-04 | Phase 3 | Pending |
| VISTA-01 | Phase 3 | Pending |
| VISTA-05 | Phase 3 | Pending |
| CAPTEI-01 | Phase 6 | Pending |
| CAPTEI-02 | Phase 6 | Pending |
| CAPTEI-03 | Phase 6 | Pending |
| CONT-01 | Phase 4 | Pending |
| CONT-02 | Phase 4 | Pending |
| CONT-03 | Phase 4 | Pending |
| SEO-02 | Phase 4 | Pending |
| SEO-03 | Phase 4 | Pending |
| SEO-04 | Phase 4 | Pending |
| SITE-07 | Phase 5 | Pending |
| CRM-02 | Phase 5 | Pending |

**Coverage:**
- v1 requirements: 30 total
- Mapped to phases: 30
- Unmapped: 0 ✓

---
*Requirements defined: 2026-08-28*
*Last updated: 2026-08-28 after initial definition*