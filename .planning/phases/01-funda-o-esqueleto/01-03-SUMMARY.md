---
phase: 01-funda-o-esqueleto
plan: 03
subsystem: condominium-data-and-seo-metadata
type: execute
tags: [condominiums, tdd, seo, dynamic-routes]
dependency-graph:
  requires: [01-02]
  provides: [01-04]
  affects: [sitemap, pages]
tech-stack:
  added: [none — reuses src/lib/config.ts siteUrl and 01-02 route registry/CONDOS prefix]
  patterns: [fidelity-testing typed data module, metadata factory reused per page, generateStaticParams + dynamicParams=false whitelist, async server-component testing via await-then-render]
key-files:
  created:
    - src/data/condominiums.ts
    - src/data/condominiums.test.ts
    - src/lib/seo/metadata.ts
    - src/lib/seo/metadata.test.ts
    - src/app/condominios-e-produtos/page.tsx
    - src/app/condominios-e-produtos/[slug]/page.tsx
    - src/app/condominios-e-produtos/[slug]/page.test.tsx
  modified:
    - src/data/condominiums.ts (Rule 1 fix: Figueiras areaMin/areaMax)
decisions:
  - Canonical URL assembled by shared factory: siteUrl() base + route path, trailing-slash-safe (single trailing slash).
  - Unconfirmed tower data is disclosed, never invented: Recanto Jacarandá renders towersNote "Torres não identificadas publicamente"; Reserva Figueiras renders Tecnisa's "Subcondomínio Torre A".
  - dynamicParams=false limits [slug] to the 5 whitelisted slugs; unknown paths hit notFound() → 404.
  - Async [slug] page tested by awaiting the component call (params as Promise.resolve) before render — no Suspense/act ceremony needed for static text trees.
metrics:
  duration: ~12 min
  completed: 2026-08-28
status: complete
---

# Phase 1 Plan 3: Condominium Data & SEO Metadata Summary

Fidelity-tested condominium data layer (5 condominiums) + canonical-capable metadata factory + dynamic /condominios-e-produtos/[slug] pages — no invented towers, units or areas.

## Task Results

| Task | Name | Status | Commits |
|------|------|--------|---------|
| 1 | Condominium data module with fidelity tests (RED → GREEN) | COMPLETE | db942b3 (test), de0d8f4 (feat) |
| 2 | Metadata factory with canonical tests (RED → GREEN) | COMPLETE | 4a00c44 (test), 93a7e6a (feat) |
| 3 | Condominium index + dynamic [slug] page rendering real data | COMPLETE | fe922d6 (feat) |

## What Was Built

- **`src/data/condominiums.ts`** — typed `Condominium` records for the 5 phase-1 condominiums with `CONDOMINIUMS` + `getCondominiumBySlug`. Every tower name, unit count, area range and delivery date verbatim from the research docs (`extracted/` Viva Jardim das Perdizes + Matriz completa). pt-BR copy only in display fields (names, blurbs, parking, fees).
- **`src/data/condominiums.test.ts`** — 7 fidelity tests asserting exact facts; invented data is a test failure (T-03-01).
- **`src/lib/seo/metadata.ts`** — `buildPageMetadata({title, description, path})` returning Next.js `Metadata` with `title`, `description` and `alternates.canonical` assembled from `siteUrl()` (plan 01-01) — no duplicate URL logic, no process.env reads here (SEO-01).
- **`src/lib/seo/metadata.test.ts`** — 3 tests: shape + absolute canonical; exact `http://localhost:3000/condominios-e-produtos/reserva-manaca/` with single trailing slash; prod-domain fallback `https://www.jardimdasperdizes.com.br` when `NEXT_PUBLIC_SITE_URL` unset.
- **`src/app/condominios-e-produtos/page.tsx`** — index with 5 cards (name, pt-BR blurb, units/area summary, delivery status badge Entregue/Em construção, Link to each slug), metadata from the factory.
- **`src/app/condominios-e-produtos/[slug]/page.tsx`** — dynamic page: `generateStaticParams` from CONDOMINIUMS, `dynamicParams = false` (T-03-02), `notFound()` on unknown slug; sections: breadcrumb + status badge, Torres table rendering confirmed tower blocks or the towersNote disclosure, Ficha do produto (unidades, área, vagas, entrega/previsão, lançamento, condomínio). Per-page metadata via factory.
- **`src/app/condominios-e-produtos/[slug]/page.test.tsx`** — smoke test: awaits the async page with a resolved params Promise, renders, asserts Manacá blocks (Andorinha…Jacutinga) + delivered badge, Jacarandá towersNote text, and `generateMetadata` title/canonical.

## Verification

| Gate | Result |
|------|--------|
| `pnpm test` | ✅ 7 files / 31 tests passed (7 fidelity + 3 metadata + 3 smoke + prior suites) |
| `pnpm build` (APP_MODE=demo) | ✅ clean — `/condominios-e-produtos/[slug]` SSG-prerendered for all 5 slugs via generateStaticParams |
| `APP_MODE=prod pnpm build` | ✅ clean (mocks isolated) |
| `pnpm dev` + curl | ✅ `/condominios-e-produtos/` 200 · `/condominios-e-produtos/reserva-manaca/` 200 (towers Andorinha/Jacutinga + canonical link present) · unknown slug 404 |
| Dev-server trailing-slash | 308 redirect on the non-slash form → canonical slash URL (standard Next.js behavior, matches 01-02 registry paths) |

RED observed per commit: Task 1 `Failed to resolve import ./data/condominiums`; Task 2 `Failed to resolve import ./metadata`; Task 3 `Failed to resolve import ./page` — each driven to GREEN.

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 1 - Bug] Figueiras record missing required area fields (TS2739)**
- **Found during:** Task 3 GREEN (`pnpm build` type check after pages landed)
- **Issue:** `src/data/condominiums.ts` Reserva Figueiras record omitted `areaMin`/`areaMax` (the fidelity test doesn't assert areas for Figueiras, so no test caught it; the page's Ficha section requires them).
- **Fix:** added `areaMin: 165, areaMax: 188` — doc-confirmed values from the Matriz completa ("165 e 188 m²"). Data-faithful, not invented. No new dependency, no schema change.
- **Files modified:** `src/data/condominiums.ts`
- **Commit:** fe922d6

No other deviations — implementation followed the plan exactly. The 308 trailing-slash redirect observed in dev is standard Next.js canonicalization of the registry's slash-terminated paths, not a deviation.

## Known Stubs

None. All five condominium records carry the confirmed facts required by the fidelity tests; unconfirmed Recanto Jacarandá tower names are intentionally rendered as the verified disclosure text (towersNote), which the plan requires by design.

## Threat Flags

None. Fidelity asserted by tests (T-03-01); unknown slugs 404 via dynamicParams whitelist + notFound (T-03-02); all records render as JSX text, no dangerouslySetInnerHTML (T-03-03); no new packages; canonical URLs originate only from siteUrl() + typed slugs.

## Self-Check: PASSED

7 created files verified on disk; 5 commits verified in git log (db942b3, de0d8f4, 4a00c44, 93a7e6a, fe922d6); builds and curl gates green.