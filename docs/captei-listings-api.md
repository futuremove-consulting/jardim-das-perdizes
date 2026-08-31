# Captei Listings API — Integration Guide (for AI/LLM)

This document describes everything needed to build an integration with the
**Captei Listings API** (real-estate listings / "anúncios" big-data).

> Machine-readable OpenAPI spec: `https://app.captei.com.br/api/listings/openapi`
> Postman collection: `https://app.captei.com.br/api/listings/postman`
> Visual docs (Swagger UI): `https://app.captei.com.br/api/listings/doc`

## Base URL
```
https://app.captei.com.br
```

## Authentication
**BOTH keys are required**, sent in two HTTP headers:
```
Token: <client_key>     # account-level client key
User-Key: <user_key>    # personal per-user key
```
- **Client key** — account-level, one per client. Get/regenerate it in **Meus Dados → API** (acesse aqui: https://app.captei.com.br/painel/meus-dados).
- **Per-user key** — personal, rotatable. Generate/rotate it in **API / Integrações**, no menu de conta (acesse aqui: https://app.captei.com.br/painel/api-integracoes).

Validation: API access must be enabled for your client (contact the Captei team); the user must be **active** (not removed) and **belong to that client**.

## Limits & abuse protection
- Min **1 second** between requests.
- Max **60 requests/minute**.
- **Daily quota: 50,000 records/day per client** (sum of returned records).
- Page size: **max 100** (default 50).
- Date window: **max 366 days**.
- Deep pagination bounded by **`page * page_size <= 10000`**. To go beyond, narrow
  filters (date range, city, neighborhood).

## Errors
Errors are returned with **HTTP 200** and `success: false`:
```json
{ "success": false, "message": "Rate limit reached: up to 60 requests per minute." }
```

## Endpoint: Search listings
```
GET /api/listings/search
```

### Query parameters
| Param | Type | Notes |
|-------|------|-------|
| `status` | string | `active` (default), `inactive`, `all` |
| `date_from`, `date_to` | date `YYYY-MM-DD` | inactive → deactivation date; else creation date. Max 366 days |
| `state` | string | UF, e.g. `SC` |
| `city` | string | e.g. `Florianopolis` |
| `neighborhood` | string | requires `state` + `city` |
| `locations` | string | multi: `SC;Florianopolis;Jurere|SP;Sao Paulo` (pipe-separated, `uf;city[;neighborhood]`) |
| `business_type` | string (CSV) | `sale`, `rent` |
| `property_type` | string (CSV) | e.g. `apartamento,casa` |
| `category` | string (CSV) | `residential`, `commercial` |
| `advertiser_type` | string (CSV) | |
| `portal` | string (CSV) | source portal names (e.g. `zap imoveis`) |
| `price_min`, `price_max` | number | |
| `condo_min`, `condo_max` | number | condominium fee |
| `area_min`, `area_max` | number | usable area (m²) |
| `bedrooms_min`, `bedrooms_max` | integer | |
| `suites_min`, `suites_max` | integer | |
| `bathrooms_min`, `bathrooms_max` | integer | |
| `parking_min`, `parking_max` | integer | |
| `only_with_photos` | boolean | `true`/`false` |
| `only_complete_address` | boolean | must have a numeric street number |
| `text` | string | free-text (title, description, advertiser, address) |
| `ids`, `exclude_ids` | string (CSV) | listing ids |
| `sort` | string | `recent` (default), `price_asc`, `price_desc`, `area_desc` |
| `page` | integer | 1-based (default 1). `page * page_size <= 10000` |
| `page_size` | integer | 1..100 (default 50) |

### Response
```json
{
  "success": true,
  "total": 660078,
  "page": 1,
  "page_size": 20,
  "count": 20,
  "has_more": true,
  "data": [
    {
      "id": "793d0ea743328c5ad09c8147ea22dc2e513f0039",
      "status": "Ativo",
      "portal": "Zap Imoveis",
      "advertiser_name": "Rodrigo Medeiros Corretor",
      "advertiser_type": "Profissional",
      "business_type": ["Venda"],
      "category": ["Residencial"],
      "property_type": "Casa de condomínio",
      "address": {
        "street": "Rua Manoel Pedro Vieira", "number": "960", "complement": null,
        "unit": null, "neighborhood": "Morro das Pedras", "city": "Florianópolis",
        "state": "SC", "zip_code": "88066100",
        "full": "Rua Manoel Pedro Vieira, 960 - Morro das Pedras - Florianópolis - SC",
        "geo": { "lon": -48.502101, "lat": -27.709691 }
      },
      "bedrooms": 5, "suites": 5, "bathrooms": 9, "parking_spots": 4,
      "usable_area": 626, "total_area": 626,
      "price": 25100000, "price_label": "R$ 25.100.000,00", "price_period": "mês",
      "condo_fee": 1589, "iptu": null,
      "features": { "caracteristicas": ["Piscina", "Garagem"] },
      "photos": [ { "principal": true } ],
      "title": null, "description": null,
      "link": "https://www.zapimoveis.com.br/imovel/...",
      "created_at": "2026-06-19T20:10:06.318Z",
      "deactivated_at": null
    }
  ]
}
```

> Privacy: the advertiser's **phone number is not exposed** by this API.

## Pagination
Increment `page` and repeat the same query. Stop when `has_more` is `false`.
Respect the 1s/60-per-minute limits and the daily 50k record quota. For result
sets deeper than 10,000, narrow the filters.

## Examples

### cURL
```bash
curl -s "https://app.captei.com.br/api/listings/search?status=active&state=SC&city=Florianopolis&business_type=sale&bedrooms_min=2&price_min=300000&price_max=1500000&page=1&page_size=20" \
  -H "Token: <client_key>" \
  -H "User-Key: <user_key>"
```

### Python
```python
import requests

def search_listings(token, **params):
    r = requests.get(
        "https://app.captei.com.br/api/listings/search",
        headers={"Token": token["client"], "User-Key": token["user"]},
        params=params,
        timeout=60,
    )
    return r.json()

page, all_rows = 1, []
while True:
    res = search_listings(
        {"client": "<client_key>", "user": "<user_key>"},
        status="active", state="SC", city="Florianopolis",
        business_type="sale", page=page, page_size=100,
    )
    if not res.get("success"):
        raise RuntimeError(res.get("message"))
    all_rows += res["data"]
    if not res["has_more"] or page * 100 >= 10000:
        break
    page += 1
    # throttle: keep >1s between calls
```

### Node.js
```js
const search = (keys, params) =>
  fetch("https://app.captei.com.br/api/listings/search?" + new URLSearchParams(params),
    { headers: { "Token": keys.client, "User-Key": keys.user } }).then(r => r.json());

const res = await search({ client: "<client_key>", user: "<user_key>" }, {
  status: "active", state: "SC", city: "Florianopolis",
  business_type: "sale", page: 1, page_size: 50,
});
```
