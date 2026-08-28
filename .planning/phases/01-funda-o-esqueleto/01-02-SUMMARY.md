---
phase: 01-funda-o-esqueleto
plan: 02
subsystem: navigation architecture
type: execute
tags: [routes, tdd, design-tokens, layout, navigation]
dependency-graph:
  requires: [01-01]
  provides: [01-03]
  affects: [sitemap, pages]
tech-stack:
  added: [Tailwind v4 @theme design tokens in globals.css, .container-page utility]
  patterns: [single-source route registry consumed by nav, CSS-only mobile hierarchical list, TDD per task]
key-files:
  created:
    - src/lib/routes.ts
    - src/lib/routes.test.ts
    - src/components/layout/Header.tsx
    - src/components/layout/Header.test.tsx
    - src/components/layout/Footer.tsx
    - src/components/layout/PageLayout.tsx
  modified:
    - src/app/globals.css
    - src/app/layout.tsx
decisions:
  - NAV_SECONDARY maps only to Phase-1 P0 routes; Sobre/Newsletter/Contato/Pesquisar omitted to avoid dead links (SITE-01).
  - Footer privacy label rendered as text (no dead link); privacy page arrives Phase 3.
  - Header renders main nav twice (desktop hidden lg:flex + mobile lg:hidden stacked list) — CSS-only mobile per menus doc, no JS drawer.
metrics:
  duration: ~8 min
  completed: 2026-08-28
status: complete
---

# Phase 1 Plan 2: Navigation Architecture Summary

16-route single-source registry (11 P0 + 5 condominium) with TDD fidelity tests, plus the design-token base and Header/Footer/PageLayout shell every phase-1 page shares.

## Task Results

| Task | Name | Status | Commit |
|------|------|--------|--------|
| 1 | Route registry with fidelity tests (RED → GREEN) | COMPLETE | 19a8c33 |
| 2 | Design tokens + Header/Footer/PageLayout shell | COMPLETE | 377a4d2 |

## What Was Built

- **`src/lib/routes.ts`** — single source of truth: `ROUTES` (16 entries: 11 P0 hub pages + 5 condominium pages), `NAV_MAIN` (6 documented items), `NAV_SECONDARY` (5 existing P0 pages), `getRouteLabel(path)`. English keys, pt-BR labels.
- **`src/lib/routes.test.ts`** — 8 tests: exactly 16 entries; all 11 P0 paths; 5 condominium paths under `/condominios-e-produtos/`; non-empty pt-BR labels with English kebab keys; NAV_MAIN length 6; every NAV_SECONDARY path resolves in ROUTES; getRouteLabel returns pt-BR label.
- **`src/app/globals.css`** — Tailwind v4 CSS-first `@theme` design tokens (brand/ink/paper colors), `:root` vars with dark-mode, `.container-page` shared utility.
- **`src/components/layout/Header.tsx`** — brand link, 6-item main nav (desktop row + mobile stacked hierarchical list), 5-item secondary nav.
- **`src/components/layout/Footer.tsx`** — institutional name, "CRECI: [inserir número]", contact placeholder, secondary-page links (no dead links; Privacy label as text).
- **`src/components/layout/PageLayout.tsx`** — Header + `<main>` + Footer wrapper, wired into `layout.tsx` so the identity home now renders inside the shell.

## Verification

| Gate | Result |
|------|--------|
| `pnpm test` | ✅ 4 files / 17 tests passed (2 Header smoke + 8 routes + 7 existing) |
| `pnpm build` (APP_MODE=demo) | ✅ clean |
| `APP_MODE=prod pnpm build` | ✅ clean (mocks isolated) |

RED confirmed in commits: Task 1 RED = `Failed to resolve import ./routes` (module absent); Task 2 RED = Header test failed (module absent). Both driven to GREEN.

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 1 - Test] Header smoke test adjusted for duplicate nav render + Link trailing-slash normalization**
- **Found during:** Task 2 (GREEN phase)
- **Issue:** Two test failures after a correct implementation: (a) NAV_MAIN renders twice (desktop `hidden lg:flex` + mobile `lg:hidden` lists), so `getByRole("link", name)` matched multiple elements for "Home"; (b) Next's `<Link>` normalizes trailing slashes in the rendered DOM href (`/condominios-e-produtos/` renders as `/condominios-e-produtos`), so exact-href assertions failed.
- **Fix:** Test now uses `getAllByRole` and asserts every match's `href` equals the path in canonical (trailing-slash-stripped, root "/") form via a `canonical()` helper.
- **Files modified:** `src/components/layout/Header.test.tsx`
- **Commit:** 377a4d2

No other deviations — the implementation followed the plan exactly.

## Known Stubs

None at this layer. Footer intentionally carries placeholders ("CRECI: [inserir número]", "[inserir e-mail e telefone]") and Privacy rendered as text — per plan, real values and the privacy page arrive in later phases. These are documented placeholders, not incorrect stubs.

## Threat Flags

None. hrefs originate only from the typed `ROUTES` registry (tested); all copy rendered as JSX text children; no `dangerouslySetInnerHTML`; no new network/auth/schema surface.

## Self-Check: PASSED

All 6 created files verified on disk; commits 19a8c33 and 377a4d2 verified in git log.
