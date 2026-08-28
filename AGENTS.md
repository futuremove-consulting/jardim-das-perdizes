# AGENTS.md — Jardim das Perdizes Broker

Guidelines for AI agents and contributors working in this repository.

## Project

Site/blog de captação orgânica para a Imobiliária Jardim das Perdizes Broker —
corretor especializado no bairro Jardim das Perdizes (Perdizes, São Paulo).
Autoridade em conteúdo + conversão dual (formulário + WhatsApp), com todos os
dados rastreados no CRM.

## Hard constraints (non-negotiable)

- **Package manager: pnpm ONLY.** Never use `npm install` or `yarn`. Use `nvm`
  for Node version management.
- **Secrets:** Never commit secrets. `.env*` files are gitignored. Only
  `NEXT_PUBLIC_SITE_URL` and `APP_MODE` are public; never prefix a secret with
  `NEXT_PUBLIC_`.
- **Language rule:** Identifiers, code, filenames and schemas in **English**.
  **pt-BR** is allowed ONLY in user-facing rendered copy (UI text).
- **TDD enforced:** Write failing tests first (RED), then implement (GREEN).
  Never write implementation before the test that proves it.
- **Data fidelity:** NEVER invent towers, prices, units or condominium data.
  Only confirmed data from the research docs (`extracted/`) is rendered.

## APP_MODE (demo-first)

- `APP_MODE=demo` (default in `.env.local`) → mock data via `src/data/`, no DB.
- `APP_MODE=prod` → real data sources. A switch to `prod` must never break the
  build; mocks are isolated behind the config layer.
- Config lives in `src/lib/config.ts` (`appMode`, `isDemo`, `isProd`, `siteUrl`).

## Commands

- `pnpm dev` — local dev server (http://localhost:3000)
- `pnpm build` — production build (`next build`)
- `pnpm start` — serve the production build
- `pnpm test` — run TDD tests (`vitest run`)
- `pnpm lint` — ESLint

## Workflow

- Plans live in `.planning/phases/01-*/<plan>-PLAN.md`; execute via GSD.
- Commit per task with conventional messages: `type(phase-plan): summary`
  (e.g. `feat(01-01): ...`, `test(01-01): ...`, `docs(01-01): ...`).
- Stage files individually; never `git add .`.
