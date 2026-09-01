# Jardim das Perdizes Broker

> Corretor independente e hub editorial especializado no bairro Jardim das
> Perdizes (Perdizes, São Paulo). Publica dados verificados com fonte e data,
> e conecta quem quer **morar, trabalhar, investir ou vender/alugar** com
> consultoria especializada local.

## Personas e navegação

O site é organizado por intenção — cada jornada tem um hub dedicado:

| Persona | Rota | Conteúdo |
|---|---|---|
| **Morar** | `/para-morar/` | Avaliação de bairro, condomínios e custo para comprar |
| **Trabalhar** | `/para-trabalhar/` | Salas comerciais (TIME Office) e lajes (TIME Corporate) — comprar ou alugar |
| **Investir** | `/para-investir/` | Renda (locação) e revenda, com dados, custos e riscos |
| **Vender ou Alugar** | `/venda-ou-alugue/` | Avaliação do próprio imóvel com método declarado |

## Stack

| Camada | Tecnologia |
|---|---|
| Framework | Next.js 15 (App Router, SSG) |
| Linguagem | TypeScript (strict) |
| Estilização | CSS nativo com tokens semânticos (dark/light) |
| Testes | Vitest + Testing Library (TDD) |
| Qualidade | ESLint + [Impeccable](https://github.com/pbakaus/impeccable) (anti-padrões de design) |
| Dados | `src/data/` — verificação com fonte + data (sem DB em demo) |
| Deploy | Vercel |

## Quickstart

```bash
# Pré-requisitos: Node 20+ (nvm), pnpm 11+
nvm use
pnpm install
cp .env.local.example .env.local   # APP_MODE=demo por padrão
pnpm dev                            # http://localhost:3000
```

> **Package manager: apenas `pnpm`.** Nunca use `npm install` ou `yarn`
> (regra não-negociável — ver `AGENTS.md`).

## Scripts

| Comando | Descrição |
|---|---|
| `pnpm dev` | Servidor de desenvolvimento |
| `pnpm test` | Suíte TDD (`vitest run`) |
| `pnpm lint` | ESLint |
| `pnpm build` | Build de produção (`next build`) |
| `pnpm exec impeccable detect src/` | Varredura de anti-padrões de design (61 regras) |

## Estrutura

```
src/
├── app/                 # Páginas (App Router) — hubs, vitrines e fichas
│   ├── para-trabalhar/  #   ├── comprar/ · alugar/ · [modality]/[slug]/
│   └── condominios/     #   └── [slug]/ (fichas dos 9 condomínios)
├── components/          # UI base, conteúdo, SEO, conversão, tema
├── data/                # condominiums.ts · commercial.ts (fonte + verifiedAt)
└── lib/                 # routes.ts (single-source), seo/, theme/, leads/
```

## Princípios

1. **Fidelidade de dados** — nunca inventar torres, preços ou unidades; toda
   afirmação factual traz fonte + data de verificação.
2. **Formato-exemplar (AEO/GEO)** — Key Takeaways → resposta direta → tabela
   comparativa → FAQ 1:1 com JSON-LD → ponte de conversão.
3. **Duas portas de conversão** — formulário de qualificação (LGPD-by-design)
   + WhatsApp com mensagem pré-preenchida.
4. **Acessibilidade WCAG** — contraste nos dois temas, foco visível, alvos
   de toque adequados.

## Qualidade (Impeccable)

O detector de anti-padrões de design roda localmente:

```bash
pnpm exec impeccable detect src/
```

Uma regra estrutural importante: **nunca hardcode valores do design system**
(ex.: `font-family: Arial`) — use os tokens (`var(--font-sans)`).

## Licença

Proprietário — todos os direitos reservados. Dados de terceiros mantêm a
atribuição de fonte indicada em cada página.