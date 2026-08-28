# Jardim das Perdizes Broker

## What This Is

Site/blog de captação orgânica para a Imobiliária Jardim das Perdizes Broker, corretor especializado no bairro/empreendimento Jardim das Perdizes (Perdizes, São Paulo). A plataforma transforma a pesquisa 360º já produzida em um hub de autoridade (SEO/AEO/GEO/ASO) que converte visitantes em leads qualificados via formulário estruturado + WhatsApp, com rastreamento de origem/intenção no CRM.

## Core Value

Gerar leads imobiliários qualificados do Jardim das Perdizes por meio de conteúdo de autoridade e conversão dual (formulário + WhatsApp), com toda interação rastreada no CRM.

## Business Context

- **Customer**: Compradores, locatários, investidores e proprietários de imóveis no Jardim das Perdizes / Perdizes, São Paulo
- **Revenue model**: Comissões de venda/locação de imóveis (broker)
- **Success metric**: Leads qualificados por mês → visitas → propostas (KPIs já definidos nos docs de conversão)
- **Strategy notes**: Estratégia completa nos docs em `/home/rochagus/projetos-linux/jardim-das-perdizes/extracted/` (estudo 360º de mercado, estratégia SEO/AEO/GEO/ASO, sitemap, arquitetura de conversão)

## Requirements

### Validated

(None yet — ship to validate)

### Active

- [ ] **SITE-01**: Site Next.js com 11 páginas P0 + 5 páginas de condomínio
- [ ] **CONV-01**: Conversão dual — formulário qualificador ("Enviar solicitação") + CTA WhatsApp ("Falar agora com especialista")
- [ ] **CRM-01**: Captura de leads com origem, URL, entidade, filtros e campanha
- [ ] **SEO-01**: Estrutura SEO/AEO/GEO (schema, sitemap, metadados, FAQs, autoria)
- [ ] **CONT-01**: Blog com calendário editorial e artigos (12 ativos editoriais nos primeiros 90 dias)
- [ ] **VISTA-01**: Leads do site são criados no VISTA via `POST /lead/site` (integração com dados de estrutura já prevista — ver `docs/vista-integration.md`)
- [ ] **VISTA-02**: Inventário puxado da API VISTA (`/imoveis/listarcampos|listar|detalhes`), filtrado por Jardim das Perdizes/Perdizes, com data de verificação
- [ ] **VISTA-03**: Mapeamento de dados VISTA→schema inglês do produto (ver tabela em `docs/vista-integration.md`)

### Out of Scope

- **App mobile nativo** — Docs indicam claramente: 0–6 meses não priorizar app; consolidar site, GBP, YouTube, Instagram, CRM (linha 474 da estratégia 360º)
- **Portal gigante com inventário de terceiros não verificado** — A primeira versão é um site leve com inventário real e verificado; jamais inventar torres/unidades
- **Pagamentos online / reserva com cartão** — Conversão é lead → visita → proposta, não e-commerce

## Context

- Stack decidida pelo usuário: **Next.js + Supabase + Uazapi** (whatsapp). Vercel para deploy (MCP disponível), .env.local com `APP_MODE` (demo-first, global rule).
- **VISTA (Loft CRM)**: o produto deve prever estrutura de dados e API de integração com o sistema imobiliário VISTA — documentado em `docs/vista-integration.md` (REST `?key=<chave-pública>`, endpoint de leads `POST /lead/site`, acervo via `/imoveis/*`, webhooks). Chave server-side apenas.
- Pesquisa extensa já consolidada em 26 docs (`extracted/`) cobrindo: estudo de mercado (3 anéis geográficos, 10 regras analíticas), dados de torres/produtos (396+ unidades, entregas 2015–2027, torres confirmadas), arquitetura de conversão (duas portas de conversão, mini formulário 4 passos, CTA único + roteamento por intenção), sitemap/blog map, benchmark QuintoAndar/Lopes (separar intenção comprador vs vendedor instantaneamente).
- LGPD: formulário coleta mínimo, informar finalidade/controlador, separar atendimento de comunicação promocional, política revisada profissionalmente, nunca colocar nome/telefone/CPF em parâmetros de URL.
- Dados reais: 8+ condomínios, torres confirmadas (Araucária: Tê/Tucano; Manacá: Andorinha/Sabiá/Arara/Cacatua/Falcão/Jacutinga; Jequitibá: Canário/Bem-te-vi/Beija-flor). NUNCA inventar nomes de torres.
- Workflow de desenvolvimento: TDD obrigatório (diretiva global), pnpm, nvm, identifiers 100% inglês (pt-BR só na copy renderizada ao usuário).

## Constraints

- **Tech Stack**: Next.js (App Router) — decisão do usuário
- **Data**: Supabase (Postgres) — decisão do usuário; MCP supabase já configurado (project_ref `vigscbqrtdwxavyloehs`)
- **WhatsApp**: Uazapi — decisão do usuário
- **Package Manager**: pnpm (global rule) — nunca npm install
- **LGPD**: Dados mínimos, política revisada, sem PII em URLs
- **Fidelidade de dados**: Nada de inventar preços/unidades/torres do empreendimento

## Key Decisions

| Decision | Rationale | Outcome |
|----------|-----------|---------|
| Next.js | É o stack default Vercel/ecossistema, SSR/SEO nativo | — Pending |
| Supabase | Banco gerenciado + auth + storage, free tier, MCP já conectado | — Pending |
| Uazapi | WhatsApp API para conversão e automação | — Pending |
| Vercel (deploy) | Integração nativa com Next.js/Supabase | — Pending |
| Demo-first (APP_MODE) | Global rule: mock data + ghost auth antes de autenticação real | — Pending |
| Integração VISTA | Produto prevê estrutura de dados + API de integração com o VISTA (Loft CRM) — leads e inventário | — Pending |
| Skip codebase mapping | Não há código — apenas docs de pesquisa | ✓ Good |

## Evolution

This document evolves at phase transitions and milestone boundaries.

**After each phase transition** (via `/gsd-transition`):
1. Requirements invalidated? → Move to Out of Scope with reason
2. Requirements validated? → Move to Validated with phase reference
3. New requirements emerged? → Add to Active
4. Decisions to log? → Add to Key Decisions
5. "What This Is" still accurate? → Update if drifted

**After each milestone** (via `/gsd-complete-milestone`):
1. Full review of all sections
2. Core Value check — still the right priority?
3. Audit Out of Scope — reasons still valid?
4. Update Context with current state

---
*Last updated: 2026-08-28 after initialization*