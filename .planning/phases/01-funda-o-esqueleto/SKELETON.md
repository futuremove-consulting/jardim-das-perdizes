# Walking Skeleton — Jardim das Perdizes Broker

**Phase:** 1
**Generated:** 2026-08-28

## Capability Proven End-to-End

A visitor opens the site (pnpm dev / build+start), reads what the Broker is, navigates the 6-item main menu and the secondary menu, lands on a condominium page that renders real confirmed data from the demo data module (Reserva Manacá towers/blocks, Recanto Jacarandá "towers not publicly identified"), and on the home page picks one of the four intent paths (buyer / renter / investor / owner) that routes to the matching P0 page.

## Architectural Decisions

| Decision | Choice | Rationale |
|---|---|---|
| Framework | Next.js 15 App Router + TypeScript | Per-route metadata/canonical, sitemap/robots as files, editorial hub needs clean URLs; project rule SITE-01 |
| Styling | Tailwind CSS v4, CSS-first tokens (@theme in globals.css) | Design system base for 16 pages with zero JS runtime cost |
| Data layer | Phase 1: typed TS module `src/data/` (demo-first, no DB); Supabase canonical in Phase 2 | APP_MODE=demo renders sample content; mocks isolated so `prod` build never breaks; data fidelity tests enforce never-invented towers/units/prices |
| Test runner | Vitest + @testing-library/react + jsdom | TDD policy: tests before implementation; RED→GREEN per task |
| Package manager | pnpm (project rule) | Strict, fast, disk-efficient |
| Auth | None in Phase 1 | No user input surfaces until Phase 3 conversion |
| Deployment | Vercel (decided); Phase 1 proves dev run + prod-mode build locally; actual deploy is Phase 5 | Walking skeleton: documented local full-stack run command |
| Directory layout | Feature folders under `src/`: `src/lib/routes.ts` (single source of truth for all 16 URLs + pt-BR labels), `src/lib/seo/` (metadata factory, schemas), `src/data/condominiums.ts`, `src/components/layout/` | One URL registry consumed by nav, pages and sitemap — no duplication |
| Language rule | English identifiers/code; pt-BR ONLY in user-facing rendered copy (global_rules.md §9) | Enforced: all route keys, type names, filenames in English; labels and body copy in pt-BR |

## Stack Touched in Phase 1

- [x] Project scaffold (Next.js App Router, TS, Tailwind, ESLint, Vitest, pnpm)
- [x] Routing — all 16 real routes (11 P0 + 5 condominium) with per-page metadata
- [x] Database — no DB in Phase 1 (Supabase is Phase 2). Data read capability proven by `src/data/condominiums.ts` (typed, fidelity-tested, demo/mock per APP_MODE). Real read+write arrives with Phase 2 schema + Phase 3 lead write.
- [x] UI — interactive elements wired: main/secondary nav menus, condominium cards, home intent routing (4 cards)
- [x] Deployment — documented local full-stack run command (pnpm dev / pnpm build + pnpm start); Vercel deploy planned in Phase 5

## Out of Scope (Deferred to Later Slices)

- Supabase schema, migrations and seed (Phase 2)
- Search/filters, technical sheets, comparator (Phase 2)
- Lead forms, dual CTA + WhatsApp (Uazapi), LGPD consent (Phase 3)
- Blog engine, FAQ schema, analytics (Phase 4)
- Real VISTA/Uazapi keys, Vercel deploy, cron sync, domain (Phase 5)
- Market-data pages beyond the P0 hub shell (no invented price series in Phase 1 pages)
- "Sobre a Broker", "Contato", "Pesquisar", "Newsletter" standalone pages (not P0; shell links only in footer text)

## Subsequent Slice Plan

Each later phase adds one vertical slice on top of this skeleton without altering its architectural decisions:

- Phase 2: visitor discovers properties and condominiums via Supabase data + filters + technical sheets
- Phase 3: visitor converts through 4-step form / WhatsApp CTA, lead lands in Supabase + VISTA
- Phase 4: visitor reads authority content (blog, pilar, FAQ) and trusts sources
- Phase 5: visitor gets real production data, deploy on Vercel, alert on new listings