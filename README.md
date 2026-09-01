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

## Guias do Bairro

O centro editorial de autoridade local — 8 guias no formato-exemplar AEO/GEO,
cada um com fonte datada por entidade:

| Guia | Rota | Cobre |
|---|---|---|
| Escolas | `/guias-do-bairro/escolas/` | Colégios e universidades do entorno |
| Bares e Restaurantes | `/guias-do-bairro/bares-e-restaurantes/` | Gastronomia dentro e perto do bairro |
| Saúde | `/guias-do-bairro/saude/` | Hospitais de referência e clínicas |
| Transporte e Mobilidade | `/guias-do-bairro/transporte-e-mobilidade/` | Linha 6-Laranja, trem e acessos |
| Comércio e Serviços | `/guias-do-bairro/comercio-e-servicos/` | Padaria, mercado, farmácia, WeWork |
| Lazer e Cultura | `/guias-do-bairro/lazer-e-cultura/` | Parque, JP Experience, SESC Pompeia |
| Segurança | `/guias-do-bairro/seguranca/` | Monitoramento, Muralha Paulista |
| Pet-Friendly | `/guias-do-bairro/pet-friendly/` | Parque, pet shops, eventos |

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

## Deploy & Analytics

> 📋 **Checklist operacional com responsáveis por passo:** [`docs/DEPLOY_CHECKLIST.md`](./docs/DEPLOY_CHECKLIST.md)

Deploy na Vercel (Next.js auto-detectado; `trailingSlash: true` já definido
em `next.config.ts` — URLs servidas batem com os canonicals).

### Variáveis de ambiente de produção

| Variável | Valor | Efeito |
|---|---|---|
| `APP_MODE` | `prod` | Camada de dados real; sem Supabase, leads falham honestamente (não silenciosamente) |
| `NEXT_PUBLIC_SITE_URL` | `https://<dominio>/` | Canonical, sitemap, robots.txt, JSON-LD |
| `NEXT_PUBLIC_WHATSAPP_NUMBER` | `5511999783379` | Porta "Falar agora com especialista" |
| `NEXT_PUBLIC_GA4_MEASUREMENT_ID` | `G-XXXXXXXXXX` | GA4; vazio = script não carrega (privacy-first, sem cookies em dev) |
| `SUPABASE_URL` / `SUPABASE_SERVICE_ROLE_KEY` | — | Persistência de leads (tabela `leads`) |

### Deploy via CLI

```bash
vercel login        # uma vez, interativo
vercel link         # vincula o repositório ao projeto Vercel
vercel env add APP_MODE production   # repita para cada variável da tabela
vercel --prod       # build + deploy de produção
```

Alternativa sem CLI: importar `futuremove-consulting/jardim-das-perdizes`
no dashboard da Vercel (Add New Project) e configurar as variáveis em
Settings → Environment Variables.

### GA4

1. analytics.google.com → criar propriedade → Web → copiar o Measurement ID (`G-…`).
2. `vercel env add NEXT_PUBLIC_GA4_MEASUREMENT_ID production` + redeploy.
3. Validação: HTML servido referencia `googletagmanager.com/gtag/js`; conferir
   visita no relatório **Tempo real**.

### Search Console

1. Criar propriedade do tipo **Prefixo de URL** com a URL de produção
   (migrar para tipo **Domínio** quando houver domínio próprio).
2. Verificação: arquivo HTML em `public/` ou meta tag no `<head>`.
3. Enviar o sitemap `https://<dominio>/sitemap.xml` (33 URLs) e acompanhar
   a cobertura de indexação.

### Migração futura de domínio

Apontar o DNS → adicionar o domínio na Vercel (Settings → Domains) →
atualizar `NEXT_PUBLIC_SITE_URL` → redeploy (canonical, sitemap e robots
atualizam sozinhos) → reenviar o sitemap no Search Console.

## Licença

Proprietário — todos os direitos reservados. Dados de terceiros mantêm a
atribuição de fonte indicada em cada página.