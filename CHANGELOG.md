# Changelog

Todas as mudanças notáveis do projeto.

Formato baseado em [Keep a Changelog](https://keepachangelog.com/pt-BR/1.0.0/)
e versionamento semântico.

## [1.1.3] - 2026-09-03

### Adicionado
- **Página 404 personalizada** (src/app/not-found.tsx): branding, links para
  hubs e CTA WhatsApp.
- **JSON-LD BreadcrumbList** em 5 páginas (100% cobertura, 35/35).
- **FAQPage JSON-LD** nos hubs comerciais (4 perguntas cada).
- **BreadcrumbList na home** (além do RealEstateAgent).
- **Respeito a prefers-reduced-motion** (globals.css, WCAG 2.3.3).

### Corrigido
- **P0-01**: Canonical com dupla barra (metadata.ts).
- **P1-02**: Home sem BreadcrumbList (page.tsx).
- **P2-03**: Alvos < 44px em nav secundária (Header.tsx).

## [1.1.2] - 2026-09-03

### Adicionado
- **OG image dedicada com marca** (1200×630, `public/og-image.jpg`):
  foto das esculturas de Tomie Ohtake no parque central com os fundos do
  bairro, scrim em `--brand-strong`, barra em `--accent` e fonte Ubuntu —
  gerada por `scripts/generate-og-image.py` (Pillow; sem dependência npm).
  Substitui o apontamento temporário para a banner do bairro.
- Helper `crumb()` em `src/lib/seo/schemas.ts`: deriva o label do registry
  de rotas (`getRouteLabel`) com nome explícito opcional para folhas fora
  dele; path não registrado sem nome falha o build. 4 testes novos.

### Corrigido
- **Labels de breadcrumb derivados do registry**: os 11 pontos que
  hardcodavam nomes no JSON-LD `BreadcrumbList` agora herdam os labels de
  `ROUTES` — navegação e breadcrumb não dessincronizam mais (ex.:
  "Mercado & Dados" → "Mercado" havia deixado breadcrumbs desatualizados;
  breadcrumb de /venda-ou-alugue/ padronizado em "Venda ou Alugue").
  Folhas dinâmicas mantêm nome do dado (fichas comerciais, `guia.title`).

## [1.1.1] - 2026-09-03

### Adicionado
- **Fichas comerciais no sitemap** (35 URLs no total): as 4 páginas SSG
  `/para-trabalhar/{comprar,alugar}/{time-office-salas,time-corporate-lajes}/`
  agora derivam de `COMMERCIAL_PROPERTIES` - a mesma fonte de
  `generateStaticParams()`, impedindo desalinhamento entre sitemap e páginas
  geradas (sem hardcode, T-04-02). Priority 0.7 (tier ficha) e `lastModified`
  por `verifiedAt` (2026-08-31).
- `lastModified` do sitemap por produto verificado também para as 9 fichas
  de condomínio (antes: data global da fase, 2026-08-28).

### Corrigido
- **OG image 404**: `buildPageMetadata` apontava `/og-image.jpg`, inexistente
  em `public/` - todas as páginas emitiam OpenGraph/Twitter card com imagem
  quebrada. Agora usa asset real do bairro
  (`/assets/bairro/jardim-das-perdizes-bairro-planejado-sao-paulo-banner.jpg`,
  1500x775, proporção ideal ~1.91); arte dedicada 1200x630 fica no backlog.
- Contagem desatualizada do sitemap na documentação: README e
  DEPLOY_CHECKLIST diziam "33 URLs" (o real era 31; agora 35).
- Comentário de rotas de condomínio em `routes.ts` ("10 páginas" -> 9).

## [1.1.0] - 2026-09-01

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
- Checklist operacional de deploy `docs/DEPLOY_CHECKLIST.md` — responsáveis
  por passo (VOCÊ vs AGENTE), SQL da tabela `leads` (modelagem VISTA), env
  vars de produção e validações pós-deploy (fases B–F).

### Corrigido
- **Auditoria completa de UI/UX (SKILL frontend-design + Impeccable)**:
  - P0 — rotas de condomínio trifurcadas (`/condomínios/` vs
    `/condomínios-e-produtos/` vs físico): canonicalizado em
    `/condomínios-e-produtos/`, hub criado, 10+ hrefs mortos corrigidos,
    breadcrumb/sitemap/llms.txt alinhados; crawler `routes.integrity.test.ts`
    impede regressão (rotas declaradas e hrefs internos vs páginas físicas).
  - P1 — `text-white` sobre marca clara em dark mode substituído por
    `text-brand-contrast` (7 CTAs); `.container-page` adotado em todas as
    páginas; ficha reusa `Badge` (tons com dark variants); token `--error`
    adicionado (bloco de erro renderizava cor indefinida); `LeadForm` com
    `aria-invalid`/`aria-describedby`, erros inline e foco por etapa.
  - P2 — `aria-current="page"` na navegação ativa; skip-link; nav mobile em
    chips roláveis; porta 2 no Header/Footer agora é o WhatsApp real; página
    `/privacidade/` (LGPD); `mailto:` no contato; `prefers-reduced-motion` e
    `:focus-visible` global.
  - P3 — hero com tese e eyebrow local + traço assinatura do bairro-parque;
    copy de roadmap removida do conteúdo.

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