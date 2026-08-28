---
phase: 01-funda-o-esqueleto
plan: 04
subsystem: frontend-seo-home
tags: [seo, sitemap, robots, localbusiness, home-hub, intent-routing, p0-pages]
requires: [01-01, 01-02, 01-03]
provides: [SITE-02, SEO-01]
affects: [src/app, src/lib/seo]
tech-stack:
  added: [MetadataRoute.Sitemap, MetadataRoute.Robots, JSON-LD LocalBusiness]
  patterns: [App Router sitemap.ts/robots.ts, typed schema builder + JSON.stringify, buildPageMetadata factory, isDemo-gated demo banner]
key-files:
  created:
    - src/lib/seo/schemas.ts
    - src/lib/seo/schemas.test.ts
    - src/app/sitemap.ts
    - src/app/sitemap.test.ts
    - src/app/robots.ts
    - src/app/robots.test.ts
    - src/app/guia-jardim-das-perdizes/page.tsx
    - src/app/para-morar/page.tsx
    - src/app/para-investir/page.tsx
    - src/app/venda-ou-alugue-seu-imovel/page.tsx
    - src/app/guias-do-bairro/page.tsx
    - src/app/mercado-e-dados/page.tsx
    - src/app/encontre-seu-perfil/page.tsx
    - src/app/ferramentas/glossario/page.tsx
    - src/app/fontes-e-metodo/page.tsx
  modified:
    - src/app/page.tsx
    - src/app/page.test.tsx
decisions:
  - "Sitemap/robots driven by ROUTES registry (16 entries) via siteUrl(); home priority 1.0, P0 0.8, condominium 0.7"
  - "LocalBusiness emitted as RealEstateAgent @type, typed builder + JSON.stringify — no string interpolation (T-04-01)"
  - "Home intent cards use persona labels (Comprador/Locatário/Investidor/Proprietário) per SITE-02 with fixed mapping to phase-1 routes"
  - "Demo banner gated by isDemo(); prod build renders no demo markers (T-04-03)"
metrics:
  duration: ~45m
  completed: 2026-08-28
status: complete
---

# Phase 1 Plan 4: Full Route Surface + Technical SEO + Intent-Based Home

One-liner: Sitemap.xml/robots.txt served from the 16-route registry, LocalBusiness (RealEstateAgent) JSON-LD on home, 9 remaining P0 pages with real pt-BR copy + factory metadata, and the home rewritten as a hub routing 4 visitor intents to their P0 pages — closing SITE-02 and SEO-01's phase-1 slice.

All 16 phase-1 routes now exist, each with title/description/canonical. Every route is navigable from the menus. `/sitemap.xml` lists all 16 absolute URLs; `/robots.txt` allows crawling and points to the sitemap. The home presents the Broker entity + editorial proposal above the fold, the 4 intent cards, the LocalBusiness JSON-LD, and a demo-mode banner that only appears in demo mode.

## Task Summary

| Task | Name | Commit | Files |
| ---- | ---- | ------ | ----- |
| 1 | sitemap + robots + LocalBusiness schema (RED→GREEN) | 331b8ca (RED), f088498 (GREEN) | schemas.ts, schemas.test.ts, sitemap.ts, sitemap.test.ts, robots.ts, robots.test.ts |
| 2 | 9 remaining P0 pages with real copy + metadata | 3099767 | 9 page.tsx files |
| 3 | Home as hub + LocalBusiness JSON-LD + intent routing | d893509 | page.tsx, page.test.tsx |

## Verification Results

- `pnpm test` — 10 files / 43 tests pass (RED observed per task before GREEN).
- `pnpm build` (APP_MODE=demo) — clean; all 16 routes static + [slug] SSG (5 condos) + /sitemap.xml + /robots.txt.
- `APP_MODE=prod pnpm build` — clean (demo markers/mocks isolated).
- Dev smoke: `/sitemap.xml` → 200 URLSET with `/condominios-e-produtos/` appearing 6× (index + 5 condos); `/robots.txt` → `User-Agent: * Allow: /  Sitemap: http://localhost:3000/sitemap.xml`; home contains 1 `ld+json` script and the para-morar link.
- grep `buildPageMetadata` across `src/app` page files → 12 page.tsx files (9 new + condominios index + [slug] + home).

## Phase 1 Success Criteria — ALL MET

1. **Navigation**: `pnpm dev` — home/para-morar/para-investir/condominios-e-produtos plus all 9 new P0 routes render without breakage. ✅
2. **Per-page SEO**: every P0 page (9 new + 5 condos + home hub) exports title/description/canonical via `buildPageMetadata` (English schema keys, pt-BR copy). ✅
3. **sitemap + robots + LocalBusiness**: `/sitemap.xml` (16 URLs), `/robots.txt`, LocalBusiness JSON-LD on home. ✅
4. **Demo/Prod isolation**: `APP_MODE=demo` renders sample content + demo banner; `APP_MODE=prod` build clean with no demo markers. ✅
5. **pnpm + clean build + TDD**: pnpm only; `pnpm build` clean; 43 TDD tests pass (RED→GREEN per task). ✅

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 1 - Bug] Next.js `<Link>` strips trailing slashes in rendered href**
- **Found during:** Task 3 (TDD GREEN)
- **Issue:** Intent-card hrefs render as `/para-morar` (no trailing slash) in the DOM, while the test asserted the trailing-slash form. `<Link>` normalizes away trailing slashes at render.
- **Fix:** Aligned page.test.tsx `INTENT_LINKS` hrefs to the no-trailing-slash forms that Next renders (`/para-morar`, `/encontre-seu-perfil`, `/para-investir`, `/venda-ou-alugue-seu-imovel`). Routes still resolve correctly via the registry (canonical retains the trailing slash via the metadata factory).
- **Files modified:** src/app/page.test.tsx
- **Commit:** d893509

**2. [Rule 1 - Bug] Intent card labels didn't match persona regex**
- **Found during:** Task 3 (TDD GREEN)
- **Issue:** Initially used editorial labels ("Quero morar" etc.) which failed the `/comprador/i` persona-label assertion required by SITE-02's 4 persona cards.
- **Fix:** Retitled the 4 cards to the persona labels (Comprador / Locatário / Investidor / Proprietário) per SITE-02.
- **Files modified:** src/app/page.tsx
- **Commit:** d893509

### Known Loose Count (not a deviation — plan-checker noted)

The plan's Task-2 acceptance says "grep buildPageMetadata in all 15 phase-1 page files", but the real page.tsx count is 12 including home (9 new + condominios index + [slug] + home). This is a cosmetic over-count in the plan, not missing pages. All 16 routes exist; the `[slug]` page is parametric (generates 5 SSG pages). Documented for the verifier to avoid a false negative.

## Known Stubs

- Home "Receba uma análise" is a text-only CTA line (no functional form/WhatsApp). This is intentional — the dual conversion (form + WhatsApp) is deferred to Phase 3 CONV-01 per SKELETON.md Out of Scope. No broken form is rendered.

## Threat Flags

None — the plan's threat model was respected: no new network endpoints beyond sitemap/robots (both registered Next conventions), schema emitted via `JSON.stringify` (no string interpolation, T-04-01 mitigated), URLs solely from `siteUrl()` + ROUTES (T-04-02 mitigated), demo banner gated by `isDemo()` (T-04-03 mitigated). No new auth paths or file-access patterns introduced.

## TDD Gate Compliance

RED → GREEN sequence verified per task in git log:
- Task 1: `test(01-04)` (331b8ca) then `feat(01-04)` (f088498).
- Task 2: `feat(01-04)` only — Task 2 is an execute (non-tdd) task; page content has no unit behavioral logic, verified via build + grep + route existence.
- Task 3: tests extended first (RED observed, 3 new tests failed), then `feat(01-04)` (d893509) made them green.

## Self-Check: PASSED

- SUMMARY.md exists at `.planning/phases/01-funda-o-esqueleto/01-04-SUMMARY.md`. ✅
- All plan commits present in git log: 331b8ca (RED), f088498 (GREEN), 3099767 (Task 2), d893509 (Task 3), 9213329 (docs). ✅
- Final phase gate: `pnpm test` 43/43 pass; `pnpm build` (demo) clean; `APP_MODE=prod pnpm build` clean with 0 demo markers on home (T-04-03). ✅
