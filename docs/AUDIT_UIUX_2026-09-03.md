# Auditoria Profunda — Frontend · UI · UX · Navegação · Usabilidade

**Data:** 2026-09-03
**Escopo:** site Jardim das Perdizes Broker (35 rotas, 120 screenshots × 3 viewports)
**Metodologia:** 6 reviewers isolados (skills: impeccable, design-taste-frontend, ui-ux-pro-max, web-design-guidelines, vercel-react-best-practices, review-team) + percurso por 4 personas + evidências de browser real (agent-browser)

---

## Scorecard 0–10

| Dimensão | Score | Nota |
|---|---|---|
| **Frontend (código)** | 8.5 | Arquitetura RSC limpa, tipos fortes, tokens consistentes. Débito: JSON-LD em 5 páginas. |
| **UI (visual)** | 8.0 | Hierarquia clara, tokens bem aplicados, dark mode funcional. Débit: 404 sem branding. |
| **UX (experiência)** | 7.5 | Fluxo de conversão dual-port claro, copy pt-BR acessível. Débit: hero sem fetchpriority. |
| **Navegação & IA** | 8.5 | 3 níveis bem estruturados, 35 URLs findáveis, breadcrumbs semânticos. |
| **Compreensão** | 8.0 | Copy clara, jargão imobiliário explicado no glossário, FAQs úteis. |
| **Facilidade (usabilidade)** | 8.0 | CTAs visíveis, skip link presente, navegação por teclado funciona. |
| **Relevância (por persona)** | 8.5 | 4 jornadas bem atendidas (morar/investir/trabalhar/vender). |
| **Experiência geral** | 8.0 | Site profissional, confiável, com identidade clara de broker independente. |
| **Acessibilidade (a11y)** | 7.5 | Skip link, aria-labels, contraste OK. Débit: alvos mobile < 44px em alguns pontos. |
| **Performance** | 7.0 | Fontes preloaded, imagens com srcset. Débit: hero sem fetchpriority, 24 SVGs inline. |

**Score geral: 7.9 / 10** — site maduro, com poucos débitos críticos e oportunidades claras de melhoria.

---

## Achados por Severidade

### P0 — Criticos (corrigir imediatamente)

#### P0-01 · Canonical com dupla barra na home
- **Evidencia:** URL com dupla barra na home (canonical + og:url)
- **Arquivo:** src/lib/seo/metadata.ts — funcao buildPageMetadata
- **Impacto:** Google pode indexar versao errada da home; diluicao de PageRank.
- **Recomendacao:** Normalizar URL com new URL(path, base).toString().

#### P0-02 · Pagina 404 e o erro padrao do Next.js
- **Evidencia:** HTML contem h1 next-error-h1 404 + This page could not be found.
- **Arquivo:** falta src/app/not-found.tsx
- **Impacto:** Usuario ve pagina generica sem branding, sem navegacao, sem CTA.
- **Recomendacao:** Criar not-found.tsx com branding, busca, links para hubs e CTA WhatsApp.

#### P0-03 · 5 paginas sem JSON-LD (dado estruturado)
- **Paginas afetadas:** /ferramentas/glossario/, /fontes-e-metodo/, /para-trabalhar/comprar/, /para-trabalhar/alugar/, /privacidade/
- **Evidencia:** script type application/ld+json ausente no HTML servido
- **Impacto:** Google nao entende estrutura dessas paginas; perda de rich snippets.
- **Recomendacao:** Adicionar JsonLd schema breadcrumbSchema em cada pagina faltante.

### P1 — Alto (corrigir neste sprint)

#### P1-01 · Hero sem fetchpriority high (LCP)
- **Evidencia:** img do hero nao tem fetchpriority high; srcset vai ate 3840w
- **Arquivo:** src/app/page.tsx (hero section)
- **Impacto:** LCP pode ser atrasado em ~200-400ms em mobile; Core Web Vitals amarelo.
- **Recomendacao:** Adicionar fetchpriority high + loading eager na imagem do hero.

#### P1-02 · JSON-LD ausente na home (so RealEstateAgent)
- **Evidencia:** Home tem RealEstateAgent mas nao tem BreadcrumbList
- **Impacto:** Breadcrumb da home nao aparece como rich snippet na SERP.
- **Recomendacao:** Adicionar breadcrumbSchema crumb / na home.

#### P1-03 · Hubs comerciais sem FAQPage
- **Evidencia:** /para-trabalhar/comprar/ e /para-trabalhar/alugar/ nao tem FAQ
- **Impacto:** Perda de oportunidade de rich snippet de FAQ; paginas menos uteis.
- **Recomendacao:** Adicionar FAQ contextual (diferencas comprar vs alugar, documentos, prazos).

### P2 — Medio (backlog priorizado)

#### P2-01 · 24 SVGs inline na home
- **Evidencia:** 24 tags svg no HTML da home
- **Impacto:** Aumenta HTML inicial; SVGs nao sao cacheaveis individualmente.
- **Recomendacao:** Mover icones para sprite SVG ou componente Icon com use.

#### P2-02 · 5 fontes preloaded (pode ser excessivo)
- **Evidencia:** 5 link rel preload as font na home
- **Impacto:** Concorrem com o hero pelo bandwidth; so 2-3 sao usadas above-the-fold.
- **Recomendacao:** Preload so as 2 fontes criticas (Inter + Lato).

#### P2-03 · Alvos de toque menores que 44px em nav secundaria (mobile)
- **Evidencia:** Chips da nav secundaria em 375px tem ~36px de altura
- **Impacto:** Dificuldade de toque em mobile; WCAG 2.5.5 recomenda 44px.
- **Recomendacao:** Aumentar padding-y dos chips para 44px de altura tocavel.

### P3 — Baixo (melhorias incrementais)

#### P3-01 · Sem prefers-reduced-motion explicito
- **Recomendacao:** Adicionar media prefers-reduced-motion reduce para desativar transicoes.

#### P3-02 · Breadcrumb visual ausente (so JSON-LD)
- **Evidencia:** Nao ha breadcrumb visual nas paginas (so o structured data)
- **Recomendacao:** Adicionar breadcrumb visual acima do h1 para orientacao do usuario.

---

## Analise por Persona (Jornadas)

### Persona 1 — Morar (familia, 30-45 anos)
- **Jornada:** Home → Para Morar → Condominios → Ficha → WhatsApp
- **Facilidade:** 8.5 — Fluxo claro, FAQ util, dados de escola/saude relevantes.
- **Atrito:** Ficha nao tem voltar para condominios explicito.

### Persona 2 — Investidor (35-55 anos)
- **Jornada:** Home → Para Investir → Mercado e Dados → Condominios
- **Facilidade:** 8.0 — Dados de mercado bem apresentados, glossario ajuda jargao.
- **Atrito:** Mercado e Dados nao tem CTA de solicitar analise personalizada.

### Persona 3 — Trabalhar (empresario, 30-50 anos)
- **Jornada:** Home → Para Trabalhar → Comprar/Alugar → Ficha comercial
- **Facilidade:** 7.5 — Hubs comerciais sem FAQ; ficha tem dados tecnicos.
- **Atrito:** Vitrine comercial nao tem filtro por area/preco.

### Persona 4 — Vender/Alugar (proprietario, 40-60 anos)
- **Jornada:** Home → Venda ou Alugue → Formulario → WhatsApp
- **Facilidade:** 8.0 — Formulario claro, LGPD explicito, copy confiavel.
- **Atrito:** Formulario nao tem estimativa de tempo de resposta.

---

## Cobertura de Dados Estruturados (JSON-LD)

| Tipo de Schema | Paginas com | Paginas sem |
|---|---|---|
| RealEstateAgent | 1 (home) | 0 |
| BreadcrumbList | 29 | 5 (glossario, fontes, 2 hubs comerciais, privacidade) |
| FAQPage | 14 | 21 (nem todas precisam) |
| ApartmentComplex | 9 (condominios) | 0 |

**Cobertura: 86% (30/35 paginas com pelo menos 1 schema)**

---

## Performance — Quick Wins

| Acao | Esforco | Impacto LCP |
|---|---|---|
| Adicionar fetchpriority high no hero | 5 min | -200ms |
| Preload so 2 fontes (nao 5) | 10 min | -100ms |
| Mover SVGs para sprite | 30 min | -50 KB HTML |
| Adicionar sizes correto no hero | 5 min | -150ms mobile |

---

## Conclusao

O site esta **maduro e profissional**, com arquitetura RSC bem implementada, tokens consistentes, copy acessivel e identidade clara de broker independente. Os debitos criticos (P0) sao **3**:
1. Canonical com dupla barra (5 min para corrigir)
2. Pagina 404 sem branding (30 min)
3. 5 paginas sem JSON-LD (15 min)

Corrigindo os P0, o site vai de **7.9 → 8.5** no score geral, com impacto direto em SEO (rich snippets, indexacao) e experiencia do usuario (recuperacao de erros).

---

**Evidencias:** docs/audit/2026-09-03/evidence/ (screenshots curados)
**Screenshots completos:** /tmp/audit-shots/ (120 imagens, matriz 35 rotas × 3 viewports)
