---
phase: 01-funda-o-esqueleto
plan: 01
subsystem: walking-skeleton
tags: [scaffold, nextjs, app-mode, tdd, identity-home, agents]
dependency-graph:
  requires: []
  provides: [01-02]
  affects: []
tech-stack:
  added:
    - Next.js 16.3.3 (App Router, Turbopack)
    - React 19.2.8 / react-dom 19.2.8
    - TypeScript 7.0.2
    - Tailwind CSS 4.3.3 (@tailwindcss/postcss)
    - Vitest 4.1.11 + @testing-library/react + jsdom
  patterns:
    - APP_MODE demo-first runtime config (src/lib/config.ts)
    - TDD RED → GREEN per task
key-files:
  created:
    - package.json
    - next.config.ts
    - tsconfig.json
    - vitest.config.ts
    - src/test/setup.ts
    - src/lib/config.ts
    - src/lib/config.test.ts
    - src/app/page.test.tsx
    - .env.local
    - .env.local.example
    - AGENTS.md
  modified:
    - src/app/layout.tsx (lang=pt-BR + pt-BR metadata)
    - src/app/page.tsx (identity home)
    - .gitignore (allow committed *.env.example)
decisions:
  - "Locked stack to audited versions: next 16.3.3, react 19.2.8, typescript 7.0.2, tailwind 4.3.3, vitest 4.1.11"
  - "APP_MODE strict: only 'demo'|'prod'; unset/invalid falls back to 'demo' (demo-first)"
  - "siteUrl() default: http://localhost:3000 (demo) / https://www.jardimdasperdizes.com.br (prod)"
  - "tsconfig kept clean (no vitest/globals types); test files import { describe, it, expect } from 'vitest' explicitly so next build type-check passes"
metrics:
  duration_minutes: 13
  completed_date: "2026-08-28"
status: complete
---

# Phase 1 Plan 1: Walking Skeleton — Summary

Scaffolded the Next.js App Router walking skeleton (pnpm + TS + Tailwind v4 + Vitest TDD) with a demo-first `APP_MODE` runtime config, a pt-BR identity home, and an AGENTS.md encoding the project's hard constraints. TDD RED was proven before the GREEN implementation.

## What was built

- **Toolchain**: `create-next-app@16.3.3` (app-tw template) with Next.js 16.3.3, React 19.2.8, TypeScript 7.0.2, Tailwind 4.3.3, Vitest 4.1.11 + @testing-library/react + jsdom, ESLint. `pnpm-workspace.yaml`, `packageManager pnpm@11.1.3`.
- **Vitest wiring**: `vitest.config.ts` (jsdom for `src/**/*.test.{ts,tsx}`, `src/test/setup.ts` loads `@testing-library/jest-dom`), `test: vitest run` script.
- **APP_MODE config** (`src/lib/config.ts`): `appMode()` / `isDemo()` / `isProd()` / `siteUrl()` reading `process.env` with safe demo-first defaults (strict `'demo'|'prod'`, default `demo`).
- **Identity home** (`src/app/page.tsx`): pt-BR copy — brand "Jardim das Perdizes Broker", hyperlocal positioning, entry sections "Condomínios e Produtos" and "Para Morar". No invented towers/prices (data fidelity). Root layout sets `lang="pt-BR"` + pt-BR metadata.
- **Demo-first env**: `.env.local` (gitignored) with `APP_MODE=demo`, `NEXT_PUBLIC_SITE_URL=http://localhost:3000`; `.env.local.example` committed.
- **AGENTS.md**: pnpm only / nvm, secrets policy (never commit; only NEXT_PUBLIC_SITE_URL + APP_MODE public), English identifiers + pt-BR copy, TDD enforced, data fidelity, GSD commit conventions.

## Verification (all GREEN)

- `pnpm test` → Test Files 2 passed (2), Tests 8 passed (8). Covers appMode defaults/values, isDemo/isProd, siteUrl + smoke test asserting the brand heading.
- `pnpm build` (demo) → compiled clean, TypeScript finished, `/` prerendered static.
- `pnpm dev` → `curl /` returns HTTP 200, brand text renders.
- `APP_MODE=prod pnpm build` → also clean (mocks isolated; switching mode does not break the build).

Actual Next version used in this plan = **16.3.3** (as audited in Task 1).

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 3 - Blocking] Next build type-check failed on Vitest globals**
- **Found during:** Task 3 (GREEN)
- **Issue:** `pnpm build` failed with `TS2593 Cannot find name 'describe'/'it'` and `TS2304 Cannot find name 'expect'` in `src/app/page.test.tsx` — Vitest ambient globals were not visible to Next's build type-check.
- **Fix:** Added explicit `import { describe, it, expect } from "vitest"` to `src/app/page.test.tsx` (matching `src/lib/config.test.ts`). Tried `tsconfig types: ["vitest/globals"]` and a triple-slash reference in setup.ts — neither propagated; explicit imports are the correct fix.
- **Files modified:** `src/app/page.test.tsx`
- **Commit:** 0fd484a

**2. [Rule 2 - Missing artifact] `.env.local.example` was gitignored**
- **Found during:** Task 3 (GREEN)
- **Issue:** The scaffold `.gitignore` pattern `.env*` also ignored `.env.local.example`, but the plan requires the example env template to be committed (it is documentation, not a secret).
- **Fix:** Unignored committed example/template files in `.gitignore` (added `!.env*.example` / `!*.example.env`). Real `.env.local` remains gitignored.
- **Files modified:** `.gitignore`
- **Commit:** 0fd484a

### Deferred Items

- **typescript-eslint peer-dep conflict (Task 2):** `typescript 7.0.2` is unsupported by the installed `typescript-eslint@8.68.0` (wants `>=4.8.4 <6.1.0`). `pnpm lint` would error. Kept audited TS 7.0.2; plan verification only required `pnpm test` + `pnpm build`, both green. Deferred — a future plan should either pin TS to a supported range or upgrade typescript-eslint.
- **Intent-path routing cards (comprador/locatário/investidor/proprietário):** Home hub with 4 intent cards is assigned to plan 01-04; Task 3 delivered the two required entry sections only.

## Threat Flags

| Flag | File | Description |
|------|------|-------------|
| threat_flag: env_config | src/lib/config.ts | Reads APP_MODE and NEXT_PUBLIC_SITE_URL at runtime (planned T-01-01 boundary). Only these two public vars are exposed to client bundles; no secrets introduced. |

## TDD Gate Compliance

- `test(01-01)` commit exists: `e7b6ee2` (RED — both suites failed: module-not-found for config, assertion for brand heading).
- `feat(01-01)` commit exists after it: `0fd484a` (GREEN — 8/8 tests pass, build clean).
- No refactor commit (not needed for this slice).

## Self-Check: PASSED

- Source files (`src/lib/config.ts`, `src/app/page.tsx`, `src/app/layout.tsx`, `src/app/page.test.tsx`, `src/lib/config.test.ts`, `vitest.config.ts`, `src/test/setup.ts`) — all present.
- Commits `e7b6ee2` and `0fd484a` exist in `git log`.
- `.env.local`, `.env.local.example`, `AGENTS.md` present; `.env.local` gitignored, example committed.
