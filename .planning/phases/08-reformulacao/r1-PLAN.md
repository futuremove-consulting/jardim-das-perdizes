---
phase: 08-reformulacao
plan: r1
type: execute
wave: 1
depends_on: [fase-1]
files_modified:
  - src/lib/theme/theme.ts
  - src/lib/theme/storage.ts
  - src/lib/theme/apply.ts
  - src/lib/theme/ThemeProvider.tsx
  - src/components/layout/ThemeToggle.tsx
  - src/components/layout/Header.tsx
  - src/components/layout/Footer.tsx
  - src/components/layout/PageLayout.tsx
  - src/app/layout.tsx
  - src/app/globals.css
  - src/app/page.tsx
  - src/lib/seo/metadata.ts
  - src/test/setup.ts
  + tests (theme, toggle, header, metadata)
requirements: [SITE-01, SEO-01]
autonomous: true
must_haves:
  truths:
    - "Toggle de tema alterna claro/escuro de forma persistente (localStorage) e sem flash (anti-FOUC)"
    - "Header expõe as duas portas de conversão (Enviar solicitação + Falar agora com especialista) apontando para #conversao"
    - "Metadata full (canonical + OpenGraph + Twitter + robots) em toda página"
artifacts:
  - path: "src/lib/theme/ThemeProvider.tsx"
    provides: "Provider de tema (light|dark|system) com persistência e respeito ao sistema"
  - path: "src/components/layout/ThemeToggle.tsx"
    provides: "Toggle sol/lua com aria-label acessível"
  - path: "src/app/globals.css"
    provides: "Design tokens dark/light + variante Tailwind .dark"
status: planned
status: done
---

# Onda 1 — Tema dark/light nativo + design system premium + conversão

> **Entregue (31/08/2026).** 63 testes verdes, lint limpo, ThemeProvider reescrito com
> `useSyncExternalStore` (compatível com a regra `react-hooks/set-state-in-effect` do
> ESLint React Hooks v6) e API pública preservada (`theme`, `resolvedTheme`, `setTheme`,
> `toggleTheme`).
---

# Onda 1 — Tema dark/light nativo + design system premium + conversão

Base visual de primeira classe (identidade verde do bairro) com tema claro/escuro
persistente e sem flash, tokens semânticos, Header/Footer de conversão dual e
metadata completa (canonical + OpenGraph + Twitter + robots).

## Tarefas (TDD)
1. `src/lib/theme/*` — resolução de tema (light|dark|system), persistência, apply no document.
2. `ThemeToggle` (client) — alterna tema, aria-label acessível.
3. `Header` — cluster de conversão (2 portas) + toggle; `Footer` tokenizado.
4. `layout.tsx` — ThemeProvider + script anti-FOUC + metadataBase/icons.
5. `globals.css` — tokens semânticos dark/light + `@custom-variant dark`.
6. `metadata.ts` — OpenGraph + Twitter + robots.
7. Tokenizar páginas (zinc → semântico) para dark mode consistente.

## Verificação
- `pnpm test` verde (suites tema/toggle/header/metadata + anteriores).
- `pnpm build` (demo e prod) limpos.
- `<html class="dark">` aplicado por preferência; sem flash (script inline no body).

---

# Onda 1.5 — Expansão do portfólio 5→9 produtos (executada em seguida, 31/08/2026)

Fontes primárias capturadas e verificadas em 31/08/2026 nas páginas oficiais da Tecnisa:
`/imoveis/sequoia`, `/imoveis/bosque-cerejeiras`, `/imoveis/reserva-flamboyant`,
`/imoveis/recanto-oliveiras`, `/imoveis/reserva-figueiras`.

## Alterações de dados (`src/data/condominiums.ts`)
- Novo tipo `DeliveryStatus` = `delivered | ready-to-move | under-construction | coming-soon`
  + mapa `STATUS_LABELS` (Entregue / Pronto para morar / Em construção / Breve lançamento).
- Campos novos opcionais: `unitsNote`, `typologies[]`, `highlights[]`, `address`,
  `statusNote`, `source`, `verifiedAt` (constante `VERIFIED = "2026-08-31"`).
- **Figueiras reconciliada:** oficial exibe "Pronto para morar" → `ready-to-move` +
  `statusNote` documentando a divergência com a previsão documental de 10/2026.
- **4 novos registros:** Sequoia (coming-soon, 121–175 m², curadoria BODYTECH/Chandra/Artefacto,
  incorporadora Windsor), Bosque Cerejeiras (222–569 m², duplex, 05036-170),
  Reserva Flamboyant (157–377 m², 38 andares, torre mais alta do bairro),
  Recanto Oliveiras (83–111 m², plantas 81/109 m²).

## Alterações de páginas
- `[slug]/page.tsx`: badges por status com `STATUS_LABELS`/tom por status, seções
  Tipologias e Destaques, fallback `units ?? unitsNote`, endereço na ficha,
  `statusNote` destacado e rodapé "Fonte: … · Verificado em DD/MM/AAAA".
- `page.tsx` (índice): "Os 9 condomínios e produtos", tom por status, fallback de unidades.
- `para-morar` + `encontre-seu-perfil`: `<a>` → `<Link>` (lint `no-html-link-for-pages`).

## Testes novos (5 novos no `[slug]/page.test.tsx`, total 63)
- Sequoia: breve lançamento + unidades não divulgadas + fonte datada.
- Figueiras: "Pronto para morar" + nota de reconciliação (outubro de 2026) + captura.
- Fixtures: invariantes estendidos (tipologias/order, status válido, `verifiedAt` presente).
