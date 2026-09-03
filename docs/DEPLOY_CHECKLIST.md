# Deploy Checklist — Onda 6 (v1.1.0)

> Última atualização: 2026-09-01 · Tag `v1.1.0` · Branch `main` (origin sincronizado)
>
> **Regra de responsabilidade:** passos marcados **VOCÊ** exigem login/conta
> (Vercel, Google, Supabase, registrador) — não posso executá-los. Passos
> **AGENTE** são executados por mim via CLI e validados automaticamente.

## Estado atual

| Item | Status |
|---|---|
| Código completo (33 rotas, GA4 condicional, camada Supabase) | ✅ pronto |
| Release `v1.1.0` (package.json + CHANGELOG datado) | ✅ commit `dde8410`, tag pushada |
| Runbook no README (§ Deploy & Analytics) | ✅ commit `df1eac9` |
| Deploy em produção | ⏳ aguarda B1 |
| GA4 coletando | ⏳ aguarda C1 |
| Sitemap no Search Console | ⏳ aguarda D1 |
| Leads persistidos (Supabase) | ⏳ aguarda E1 |

---

## B — Deploy Vercel

### B1 · VOCÊ — Login no Vercel (único bloqueio atual)

```bash
cd /home/rochagus/projetos-linux/jardim-das-perdizes
export PATH="$HOME/.nvm/versions/node/v24.16.0/bin:$PATH"
vercel login        # escolher "Continue with GitHub" e autorizar no navegador
vercel whoami       # deve imprimir seu username — sinal para o AGENTE
```

### B2 · AGENTE — Link + env vars + deploy

1. `vercel link`
2. Env vars de **Production** (valores exatos):

| Variável | Valor |
|---|---|
| `APP_MODE` | `prod` |
| `NEXT_PUBLIC_WHATSAPP_NUMBER` | `5511999783379` |
| `NEXT_PUBLIC_SITE_URL` | `https://<nome-do-projeto>.vercel.app` (confirmada após o link) |
| `NEXT_PUBLIC_GA4_MEASUREMENT_ID` | *(vazio por enquanto — entra na fase C)* |
| `SUPABASE_URL` / `SUPABASE_SERVICE_ROLE_KEY` | *(entram na fase E)* |

3. `vercel --prod`

### B3 · AGENTE — Validação pós-deploy

- HTTP 200 nas rotas-chave (`/`, `/para-morar/`, `/para-trabalhar/`, fichas de condomínio)
- `trailingSlash` ativo (sem 308 intermediários)
- `robots.txt` apontando `https://<dominio>/sitemap.xml`
- `sitemap.xml` com 35 URLs e canonicals no domínio servido

---

## C — GA4

### C1 · VOCÊ — Criar a propriedade

1. [analytics.google.com](https://analytics.google.com) → **Admin → Criar propriedade**
2. Tipo: **Web** → URL do site (a do vercel.app) → concluir
3. **Admin → Fluxos de dados** → copiar o **Measurement ID** (`G-XXXXXXXXXX`)
4. Enviar o ID para o AGENTE

### C2 · AGENTE — Configurar e redeployar

`vercel env add NEXT_PUBLIC_GA4_MEASUREMENT_ID production` + `vercel --prod`

### C3 · VOCÊ — Validar coleta

Abrir o site numa aba anônima → GA4 **Relatórios → Tempo real** deve mostrar
1 usuário. (O HTML servido referencia `googletagmanager.com/gtag/js`.)

> Sem o `G-…` configurado, o site sobe **sem** script de analytics —
> comportamento correto por design (privacy-first).

---

## D — Search Console

### D1 · VOCÊ — Criar a propriedade

[search.google.com/search-console](https://search.google.com/search-console) →
**Adicionar propriedade → Prefixo de URL** → colar a URL de produção
(ex.: `https://jardim-das-perdizes.vercel.app/`).

> Tipo **Domínio** exige domínio próprio; usar "Prefixo de URL" por enquanto.
> Migramos na fase F.

### D2 · AGENTE — Preparar verificação

Você escolhe o método no passo D1 (recomendado: **arquivo HTML**) → o AGENTE
cria o arquivo em `public/`, commita, redeploya e devolve a URL para você
clicar em **Verificar**.

### D3 · VOCÊ — Verificar e enviar sitemap

1. Clicar **Verificar** na tela do método escolhido
2. **Sitemaps → Enviar** → `https://<dominio>/sitemap.xml` (35 URLs)
3. Acompanhar **Cobertura de indexação** nas semanas seguintes

---

## E — Supabase (persistência de leads reais)

> Com `APP_MODE=prod` e **sem** Supabase, o site funciona e o formulário
> falha **honestamente** (mensagem amigável + porta WhatsApp). Recomendado
> configurar antes de veicular tráfego.

### E1 · VOCÊ — Criar projeto e tabela

1. [supabase.com](https://supabase.com) → **New project** (região São Paulo)
2. **SQL Editor** → executar (modelagem VISTA-compatible, ver
   `docs/vista-integration.md` §3):

```sql
create table if not exists public.leads (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  intent text not null,
  timeline text not null,
  name text not null,
  whatsapp text not null,
  email text,
  best_time text not null,
  segment text,
  operation text,
  interest text,
  source_page text not null,
  entity text,
  source_filters jsonb,
  source_campaign text,
  contact_consent boolean not null default true,
  promo_consent boolean not null default false
);

alter table public.leads enable row level security;
-- Sem policies públicas: só a service_role key escreve (server-side only,
-- a chave nunca vai ao browser — ver src/lib/leads/submitLead.ts).
```

3. **Settings → API** → enviar ao AGENTE: **Project URL** e
   **service_role key** (⚠️ secreta — nunca expor no browser/repo)

### E2 · AGENTE — Configurar

`vercel env add SUPABASE_URL production` +
`vercel env add SUPABASE_SERVICE_ROLE_KEY production` + `vercel --prod`

### E3 · AGENTE — Teste E2E

Submeter 1 lead real pelo formulário → confirmar a linha na tabela
(`Table Editor → leads`) → excluir o lead de teste.

---

## F — Domínio próprio (futuro)

| Passo | Resp. | Ação |
|---|---|---|
| F1 | VOCÊ | Registrar o domínio (ex.: `jardimdasperdizes.com.br` — padrão já no `src/lib/config.ts`) |
| F2 | AGENTE | Adicionar domínio na Vercel, apontar DNS (A `76.76.21.21` / CNAME `cname.vercel-dns.com`), atualizar `NEXT_PUBLIC_SITE_URL`, redeploy — canonical/sitemap/robots atualizam sozinhos |
| F3 | VOCÊ | Search Console: propriedade tipo **Domínio** + reenviar sitemap |

---

## Resumo — o que precisa de você

| Fase | Passo | Ação | Estimativa |
|---|---|---|---|
| B | B1 | `vercel login` + `vercel whoami` | 2 min |
| C | C1 | Criar propriedade GA4 → enviar `G-…` | 5 min |
| C | C3 | Conferir Tempo real | 1 min |
| D | D1 | Criar propriedade Search Console | 3 min |
| D | D3 | Clicar Verificar + enviar sitemap | 2 min |
| E | E1 | Criar projeto Supabase + SQL → enviar URL + service_role key | 10 min |
| F | F1/F3 | Registrar domínio + migrar Search Console | quando houver |

**Assim que o B1 estiver feito (`vercel whoami` respondendo), o AGENTE executa
B2–B3 sem nova interação.** C2/D2/E2/E3 também são automáticos após os seus
respectivos passos.