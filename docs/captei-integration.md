# Integração Captei Listings API — Análise, Dados e Plano

> Fonte oficial: https://app.captei.com.br/api/listings/doc (Swagger UI) e https://app.captei.com.br/api/listings/llms (guia para IA). OpenAPI 3.0 (`/api/listings/openapi`). Documentado em 2026-08-28 a partir do spec oficial.

## 1. Visão geral

A **Captei Listings API** é uma API de **busca de anúncios imobiliários (big-data)** sobre Elasticsearch: agrega anúncios de portais (ex.: Zap Imoveis) em um único index pesquisável.

| Item | Valor |
|------|-------|
| Base de produção | `https://app.captei.com.br` (único server declarado) |
| Auth | 2 headers `apiKey` em toda requisição: `Token` (chave do cliente) **e** `User-Key` (chave pessoal) |
| Formato | OpenAPI 3.0.3; schemas compartilhados em `components` |
| Padrão de resposta | `success: boolean` + `data: Listing[]` (envelope `SearchResponse`) |
| Envelope de erro | HTTP 200 + `{"success": false, "message": "..."}` |
| Linha de negócio | **Somente leitura** de inventário de mercado — não é CRM, não expõe telefone, sem escrita |

### Papel no projeto

Complementar ao VISTA (CRM canônico). O **VISTA é a fonte da verdade** de inventário próprio (torres/unidades/preços reais) e de leads. A **Captei é inteligência de mercado**: anúncios agregados de terceiros para os casos `mercado-e-dados`, comparador de preços/área, benchmark e conteúdo de autoridade. Nunca substitui o inventário canônico.

## 2. Autenticação

Ambos os headers são **obrigatórios** e nunca devem ir para o cliente (server-side apenas):

| Header | Chave | Obtenção |
|--------|-------|----------|
| `Token` | Chave do cliente (nível de conta) | Meus Dados → API: https://app.captei.com.br/painel/meus-dados |
| `User-Key` | Chave pessoal (rotacionável) | API / Integrações: https://app.captei.com.br/painel/api-integracoes |

Validações: API liberada pela equipe Captei para o cliente; usuário ativo e pertencente ao cliente.

## 3. Limites e proteção

| Limite | Valor |
|--------|-------|
| Intervalo mínimo | 1 s entre requisições |
| Taxa | 60 req/min |
| Quota diária | 50.000 registros/dia por cliente |
| `page_size` | máx. 100 (padrão 50) |
| Janela de data | máx. 366 dias |
| Paginação profunda | `page * page_size <= 10000` — além disso, afinar filtros (data, cidade, bairro) |

## 4. Endpoint de busca

```
GET /api/listings/search
```

| Param | Tipo | Notas |
|-------|------|-------|
| `status` | string | `active` (padrão) | `inactive` | `all` |
| `date_from`, `date_to` | date YYYY-MM-DD | `inactive` usa data de desativação; senão de criação. Janela máx. 366 d |
| `state` | string | UF, ex.: `SC` |
| `city` | string | ex.: `Florianopolis` |
| `neighborhood` | string | exige `state` + `city` |
| `locations` | string | multi-local: `SC;Florianopolis;Jurere\|SP;Sao Paulo` (`uf;cidade[;bairro]`) |
| `business_type` | string (CSV) | `sale` | `rent` |
| `property_type` | string (CSV) | ex.: `apartamento,casa` |
| `category` | string (CSV) | `residential` | `commercial` |
| `advertiser_type` | string (CSV) | |
| `portal` | string (CSV) | portais origem, ex.: `zap imoveis` |
| `price_min`, `price_max` | number | |
| `condo_min`, `condo_max` | number | condomínio |
| `area_min`, `area_max` | number | área útil (m²) |
| `bedrooms_min/max`, `suites_min/max`, `bathrooms_min/max`, `parking_min/max` | integer | |
| `only_with_photos` | boolean | |
| `only_complete_address` | boolean | exige número de rua numérico |
| `text` | string | texto livre (título, descrição, anunciante, endereço) |
| `ids`, `exclude_ids` | string (CSV) | ids de anúncio |
| `sort` | string | `recent` (padrão) | `price_asc` | `price_desc` | `area_desc` |
| `page` | integer | 1-based; `page * page_size <= 10000` |
| `page_size` | integer | 1..100 (padrão 50) |

### Resposta (`SearchResponse`)

```json
{
  "success": true,
  "total": 660078,
  "page": 1,
  "page_size": 20,
  "count": 20,
  "has_more": true,
  "data": [ ... ]
}
```

### `Listing` (um anúncio)

| Campo | Tipo | Notas |
|-------|------|-------|
| `id` | string | ex.: `793d0ea743328c5ad09c8147ea22dc2e513f0039` |
| `status` | string | `Ativo` | `Inativo` |
| `portal` | string? | ex.: `Zap Imoveis` |
| `advertiser_name`, `advertiser_type` | string? | ex. tipo `Profissional` |
| `business_type` | array | ex.: `["Venda"]` |
| `category` | array | ex.: `["Residencial"]` |
| `property_type` | string? | ex.: `Apartamento`, `Casa de condomínio` |
| `address` | Address | |
| `bedrooms`, `suites`, `bathrooms`, `parking_spots` | int? | |
| `usable_area`, `total_area` | number? | m² |
| `price` | number? | numérico (ex.: 850000, 25100000) |
| `price_label` | string? | ex.: `R$ 850.000,00` |
| `price_period` | string? | aluguel, ex.: `mês` |
| `condo_fee`, `iptu` | number? | |
| `features` | object? | ex.: `"caracteristicas": ["Piscina", "Garagem"]` |
| `photos` | object[]? | campos opacos (ex.: `{"principal": true}`) |
| `title`, `description` | string? | |
| `link` | string? | link do portal (ex.: zapimoveis.com.br/imovel/...) |
| `created_at`, `deactivated_at` | date-time? | |

### `Address`

`street, number, complement, unit, neighborhood, city, state, zip_code` (todos opcionais), `full` (opcional, string composta), `geo` `{lat, lon}` (opcional).

## 5. Paginação

Incrementar `page` repetindo a mesma query; parar quando `has_more = false` ou `page * 100 >= 10000`. Respeitar 1 s / 60 req/min e a quota diária de 50k.

## 6. Privacidade

O **telefone do anunciante não é exposto** pela API. Isso reforça o papel da Captei como dado de mercado (não gera lead direto) — leads sempre passam pela conversão do site (formulário/WhatsApp).

## 7. Plano de integração (planejamento)

### Identificadores (zero-mix: English identifiers, pt-BR só na copy)

- Config: `CAPTEI_TOKEN`, `CAPTEI_USER_KEY` (secrets server-side), `NEXT_PUBLIC` nunca.
- Módulo: `src/lib/captei-api-client.ts` (client server-side com throttle ≥1 s).
- Mocks demo: `mocks/captei/search-response.json` espelhando `SearchResponse` (mín. 1 página ativa do Jardim das Perdizes).
- Requisito demo-first: `APP_MODE=demo` usa mock; `prod` usa API real.

### Casos de uso (v1)

1. Página `mercado-e-dados` (P0): estatísticas de mercado com dados Captei (preço médio, área média, nº de anúncios) por recorte (buy/rent, condomínio, bairro).
2. Comparador / benchmark: `price_min/max`, `area_min/max` e faixas dos docs como filtros espelhados.
3. Conteúdo de autoridade (Phase 4): dados citados com fonte `Captei Listings API` e data de coleta.

### Fora de escopo v1

- Captei **não** pode alimentar inventário canônico (fidelidade: nunca inventar torres/unidades/preços; inventário vem do VISTA).
- Sem escrita (API é read-only) e sem exposição de telefone → sem lead direto na captação.
- Ingestão histórica completa é desnecessária; apenas recortes ativos sob demanda.

## 8. Roadmap

Ver `ROADMAP.md` — **Phase 6: Captei — Análise & Planejamento de Integração** (requisitos CAPTEI-01 a CAPTEI-03).