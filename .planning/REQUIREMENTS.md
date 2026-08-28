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

- [ ] **VISTA-01**: Leads criados no VISTA via `POST /lead/site` a partir do formulário 4 passos (resposta inclui `Codigo` do cliente)
- [ ] **VISTA-02**: Pull sync do inventário via API VISTA (`/imoveis/listarcampos` → `listar` → `detalhes`), filtrado por bairro Jardim das Perdizes/Perdizes, com data de verificação por imóvel, agendado (ex.: Vercel Cron diário)
- [ ] **VISTA-03**: Mapeamento de campos VISTA→schema inglês do produto aplicado no sync e na exibição (tabela em `docs/vista-integration.md`)
- [ ] **VISTA-04**: Cliente atendido: `APP_MODE=demo` usa mocks (`mocks/vista/*.json`); produção usa API real com `VISTA_API_KEY` guardada em secret (server-side apenas)
- [ ] **VISTA-05**: Dedupe de leads por telefone/Foneprincipal reutilizando `Codigo` existente (sem duplicar clientes no VISTA)

## Out of Scope

| Feature | Reason |
|---------|--------|
| App mobile nativo | Docs: 0–6 meses consolidar site, GBP, YouTube, Instagram, CRM; não priorizar app |
| Portal gigante com inventário de terceiros não verificado | Nunca inventar torres/unidades/preços; primeira versão = site leve com inventário real |
| Pagamentos online / reserva com cartão | Conversão é lead → visita → proposta, não e-commerce |
| Integrações externas do VISTA (CredPago, seguro, VivaReal, Órulo, RD Station, GoodData) | Fora do escopo v1; VISTA faz o push para portais — não replicar |
| Chaveiros / retiradas de chaves | Domínio operacional do VISTA, sem necessidade no site |

## Traceability

| Requirement | Phase | Status |
|-------------|-------|--------|
| SITE-* | Pending | Pending |
| CONV-* | Pending | Pending |
| CRM-* | Pending | Pending |
| SEO-* | Pending | Pending |
| CONT-* | Pending | Pending |
| VISTA-* | Pending | Pending |

_(Traceability preenchido na criação do roadmap.)_

**Coverage:**
- v1 requirements: 27 total
- Mapped to phases: 0
- Unmapped: 27 ⚠️

---
*Requirements defined: 2026-08-28*
*Last updated: 2026-08-28 after initial definition*