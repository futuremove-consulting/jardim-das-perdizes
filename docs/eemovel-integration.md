# Integração EEMOVEL Converta+ — Gestor inteligente de leads imobiliários

> Fonte oficial: https://developer.convertamais.com/ (docs "Rest API | EEMOVEL Converta+", v1.7.0 — 18/08/2025). Documentado em 2026-08-28. Acesso à API: solicitar em `developer@convertamais.com` (concedido pela equipe Converta+ a clientes/parceiros).

## 1. Visão geral

A **EEMOVEL Converta+** é um **gestor de leads imobiliários** (CRM/funil) — NÃO é um alimentador de inventário. Ela recebe leads, cria "atendimentos" e acompanha o funil (etapas, temperatura, visitas, negócios fechados) com webhooks de evento.

| Item | Valor |
|------|-------|
| Base de produção | `https://api.convertamais.com` (sem sandbox documentado) |
| Auth | HTTP Basic (`Authorization: Basic base64(usuario:senha)`) na maioria; `?api_key=<key>` no partner Visitas API |
| Acesso | Email `developer@convertamais.com` (API habilitada por cliente/parceiro) |
| Formato | REST + HTTPS, rotas sob `/v1`; versão atual 1.7.0 |
| Erro | Status HTTP padrão + `{"code":"400","status":"Bad Request","message":"MISSING_REQUEST_PARAMETER","description":"...","correlationId":"<uuid>"}` |
| Webhooks | Converta+ → sua app; responder 2xx (senão retry 3×). Eventos: `customer_service_created`, `customer_service_status_changed` |
| Funil típico | `NEW` (Novo) → `IN_PROGRESS` (Em atendimento) → `VISIT_SCHEDULED` (Visita agendada) → ... → fechado com `statusReasonId`/`dealClosed` |

## 2. Papel no ecossistema do projeto

| Sistema | Papel | Direção |
|---------|-------|---------|
| **Supabase (canônico)** | Fonte da verdade (properties, leads, condominiums, funnel events) | Hub |
| **VISTA (Loft CRM)** | Inventário canônico real + CRM outbound (`POST /lead/site`) | VISTA → Supabase (inventário); Supabase → VISTA (leads) |
| **Captei** | Inteligência de mercado (anúncios agregados, só leitura, sem telefone) | Captei → Supabase (benchmark) |
| **EEMOVEL Converta+** | Destino/alimentação de leads + funil (atendimentos, visitas, temperatura) | Supabase → Converta+ (leads); Converta+ → Supabase (webhooks de funil) |
| **Uazapi** | WhatsApp (mensagens pré-preenchidas) | Supabase → Uazapi → WhatsApp |

Regra central: **o Supabase é gravado primeiro** (com origem/intenção) e, então, o lead é distribuído (hub-and-spoke) para VISTA/Converta+/WhatsApp. Nenhum sistema externo grava o lead antes do canônico.

## 3. Autenticação

- **Basic**: `Authorization: Basic <base64("usuario:senha")>` — usado por todos os endpoints de canais/customer-services/enterprises. Credenciais do painel Converta+.
- **API Key**: `?api_key=<key>` — usado apenas pela Visitas API (partner): `POST /public/v1/visits`.

Server-side apenas; nunca exponha no cliente (sem `NEXT_PUBLIC_`).

## 4. Endpoints

### 4.1 Leads e canais

| Endpoint | Método | Auth | Uso |
|----------|--------|------|-----|
| `/v1/channels/{channelName}/leads` | POST | Basic | Cria lead no canal de aquisição (`channelName`). Body: `acquisitionChannel`, `businessType` (`SALE`\|`RENT`\|`RAISE_PROPERTY`), `email`, `message`, `name`, `phone`, `propertyAmount` (≥1), `propertyCode`, `propertyUrl`, `enterpriseId` (int32). Resp 201 `{"id":12345}` |
| `/public/v1/customer-services` | POST | Basic | Cria atendimento (imobiliária). Body: `name`, `email`, `phone`, `message`, `businessType`, `acquisitionChannel`, `propertyCode`, `propertyAmount`, `propertyUrl`. Resp 201 `{"id":304030}` |
| `/public/v1/customer-services` | GET | Basic | Lista atendimentos. Params: `user` (email do corretor), `team`, `business_type`, `start_date`, `end_date`, `page`, `size` (≤50, default 10), `sort` (`id\|status\|user_id\|business_type\|temperature\|created_at\|updated_at\|finished_at\|scheduled_at` com `:asc`\|`:desc`, combina com vírgula) |
| `/public/v1/customer-services/{id}/status` | PUT | Basic | Move atendimento de etapa. Body: `status`, `amountClosed`, `dealClosed`, `distributeAutomatic`, `distributeToSubsidiaryId`, `distributeToUserId`, `inProposalAmount`, `inProposalDate`, `inProposalEnterprisePropertyId`, `statusReasonId`. Resp 200/404 |

### 4.2 Domínios (auxiliares, usados para montar CTAs/formulários)

| Endpoint | Método | Auth | Uso |
|----------|--------|------|-----|
| `/public/v1/enterprises/enterprise-statuses?business_type=` | GET | Basic | Etapas de funil (ex.: `NEW` "Novo", `IN_PROGRESS` "Em atendimento", `VISIT_SCHEDULED` "Visita agendada") |
| `/public/v1/enterprises/domains/status-reasons?status=` | GET | Basic | Motivos de etapas (ex.: tipo `FINISHED`/`IN_PROPOSAL`, "Venda concluída") |
| `/public/v1/enterprises/schedule-visit-reasons?size=` | GET | Basic | Motivos de visitas (tipos `FINISH`\|`CANCEL`) |

### 4.3 Visitas (partner)

| Endpoint | Método | Auth | Uso |
|----------|--------|------|-----|
| `/public/v1/visits` | POST | ApiKey (`?api_key`) | Eventos de visita gerenciados por parceiro. Body: `visitId`, `eventType` (`CREATE`\|`FINISH`\|`CANCEL`\|`FEEDBACK`), `feedback`, `updatedAt`, `scheduledAt`. Resp 204 |

## 5. Webhooks

Converta+ POSTa para a sua app; responder `2xx` (senão 3 tentativas). O payload carrega `eventType` + `customerService` completo:

```json
{
  "eventType": "customer_service_status_changed",
  "customerService": {
    "id": 304030, "status": "Em atendimento", "businessType": "Vendas",
    "scheduledAt": "2022-04-15", "temperature": "morno",
    "createdByAcquisitionChannel": "Site", "dealClosed": false, "amountClosed": null,
    "customer": { "email": "lead@sememail.com", "name": "Lead Exemplo", "phone": "11999999999" },
    "estateAgent": { "email": "corretor@imobiliaria.com.br", "name": "Corretor" },
    "properties": [
      {
        "acquisitionChannel": "Site", "createdAt": "...", "message": "...",
        "property": { "code": "COD-9485", "url": "...", "amount": 1500000.50 },
        "interest": { "level": "Baixo", "reason": "...", "observation": "..." },
        "visit": { "date": "...", "startHour": "...", "canceled": false, "canceledAt": null,
                   "finished": false, "finishedAt": null, "reason": null, "feedback": null,
                   "visitOwner": { "email": "...", "name": "..." } },
        "customFields": [ { "name": "Campanha", "value": "Lançamento" } ]
      }
    ],
    "originUser": { "email": "...", "name": "..." }
  }
}
```

Os eventos alimentam o funil KPI lead → visita → proposta/negócio (requisito CRM-02) e atualizam o `funnel_events` no Supabase.

## 6. Modelo de dados integrado — melhor prática global

Recomendação (padrão de mercado para agregar múltiplos CRMs/feeds):

> **Modelo Canônico (hub-and-spoke) + Camada de Tradução por fonte (anti-corruption layer) + Matriz de conversão (field mapping) documentada.**

1. **Schema canônico no Supabase** (fonte da verdade): `properties`, `condominiums`, `leads`, `alerts`, `funnel_events` (novo). Toda tabela carrega `sourceKey` (origem + id externo, ex.: `vista:AP-171`, `captei:793d0ea...`, `eemovel:304030`) e timestamps de sync (`verifiedAt`/`syncedAt`).
2. **Nenhum par a par.** A tradução nunca é direta VISTA↔Converta+; cada fonte traduz **para o canônico** e o canônico **para cada destino**. Isso elimina a matriz N×N: com 3 fontes são 3 tradutores, não 6.
3. **Camada de tradutores/adapters** em `src/lib/integrations/<source>/` — cada um com `mapToCanonical()` (entrada) e `mapFromCanonical()` (saída). Demo usa mock por adapter; produção usa o cliente real com segredos server-side.
4. **Matriz de conversão** por fonte no respectivo doc (`docs/vista-integration.md`, `docs/captei-integration.md`, `docs/eemovel-integration.md`): tabela campo-externo → campo-canônico, com regras de transformação (enums, tipos, nil). Exemplo de cruzamento inicial abaixo.

### Matriz de conversão: EEMOVEL → Supabase (lead)

| Campo EEMOVEL (`customer-service`/`lead`) | Campo canônico | Regra |
|-------------------------------------------|----------------|-------|
| `id` | `leads.external_id` | `sourceKey = "eemovel:{id}"` |
| `customer.email` | `leads.email` | direto (normalize lowercase) |
| `customer.phone` | `leads.phone` | digits only `55...` |
| `customer.name` | `leads.name` | trim |
| `businessType` (`SALE`\|`RENT`\|`RAISE_PROPERTY`) | `leads.business_type` (`sale`\|`rent`\|`raise_property`) | enum map |
| `properties[].property.code` | `leads.property_code` | direto |
| `properties[].property.url` | `leads.property_url` | direto |
| `properties[].property.amount` | `leads.property_amount` | number (BRL) |
| `acquisitionChannel` | `leads.acquisition_channel` | string (ex.: "Site") |
| `status` (etapa do funil) | `funnel_events.last_status` | map via `enterprise-statuses` |
| `temperature` | `funnel_events.temperature` | string (ex.: "morno") |
| `dealClosed` / `amountClosed` | `funnel_events.deal_closed` / `deal_amount` | bool / number |
| `visit.*` | `funnel_events.visit_*` | flattened via webhook |
| `properties[].customFields[]` | `leads.custom_fields` (jsonb) | array preservado |

## 7. Plano de integração

- **Identifiers**: `CONVERTAMAIS_USER` / `CONVERTAMAIS_PASS` (Basic) e `CONVERTAMAIS_API_KEY` (visitas) — secrets server-side (`.env`, nunca no cliente).
- **Módulo**: `src/lib/integrations/eemovel/` — client `createLead()`, `createAtendimento()`, `listAtendimentos()`, `moveStatus()`, `mapToCanonical()`, handlers de webhook (`customer_service_created`, `customer_service_status_changed`).
- **Mocks (demo)**: `mocks/eemovel/*.json` espelhando `customer_service` (GET `customer-services`) e payloads de webhook.
- **Ambiente**: `APP_MODE=demo` usa mock; `prod` usa API real.
- **Roadmap**: análise/planejamento na **Phase 7**; execução de produção na **Phase 5** (encaminhar leads pós-registro canônico + ingestão de webhooks para o dashboard de KPIs).

## 8. Casos de uso (produção)

1. **Canal de aquisição no site**: após gravar o lead no Supabase, `POST /v1/channels/{channelName}/leads` (ou `/public/v1/customer-services`) cria o atendimento no Converta+ com a origem do site.
2. **Funil visível para o corretor**: `GET /public/v1/customer-services` (filtro por corretor `user`) mostra situação do atendimento.
3. **KPIs de funil (CRM-02)**: webhooks `customer_service_status_changed` atualizam `funnel_events` no Supabase (lead → visita → proposta → negócio fechado).

## 9. Fora de escopo (v1)

- **Alimentar inventário via eemovel** — Converta+ é gestor de leads; não expõe feed de imóveis (inventário canônico continua vindo do VISTA).
- **Enviar lead ao Converta+ antes do Supabase** — canônico sempre primeiro (hub-and-spoke), preservando origem/intenção e LGPD.
- **Webhooks de fora do funil de leads** (ex.: automação de marketing) — fora do contrato atual; revisar na execução da Phase 5.