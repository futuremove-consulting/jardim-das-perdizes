# Integração VISTA (Loft CRM) — Estrutura de Dados e API

> Fonte oficial: https://novovista-rest.vistahost.com.br/doc/ (Nelmio/Swagger UI, OpenAPI 3.0, 117 endpoints). Documentado em 2026-08-28 a partir do spec embutido na página. Spec extraído em `/tmp/opencode/vista-spec.json`.

## 1. Visão geral

A **VISTA** (CRM imobiliário, hoje Loft CRM — pacote vendido pela Loft sob a marca VISTA, herdada do Vistahost) expõe uma REST API paginada por **chave pública do tenant** passada como query param `?key=xxxxxx` em toda requisição.

| Item | Valor |
|------|-------|
| Base de produção | `https://novovista-rest.vistahost.com.br` (host da doc; confirmar com o tenant) |
| Sandbox | `https://sandbox-rest.vistahost.com.br` (declarado nos servers do spec) |
| Auth | Query param `key` (chave pública da imobiliária) — nunca no body; server-side apenas |
| Formato | OpenAPI 3.0; sem schemas compartilhados — cada endpoint se auto-descreve |
| Padrão de resposta | Campos camel em português (ex.: `Codigo`, `Nome`, `Bairroresidencial`) |
| Envelope de erro | `{"status":400,"message":[...]}` ou envelope `formatResponse` |
| Sucesso (mutações) | `{"status":200,"message":"Ok","Codigo":"<codigo>"}` |

### Padrão `pesquisa` (JSON)

A maioria dos endpoints de leitura aceita o query param `pesquisa` com um JSON:

```json
{
  "fields": ["Codigo", "Categoria", "Bairro", {"Foto": ["Foto", "FotoPequena", "Destaque"]}],
  "filter": {"Bairro": ["Perdizes", "Pompeia"]},
  "order": {"Bairro": "asc", "ValorVenda": "asc"},
  "paginacao": {"pagina": 1, "quantidade": 20},
  "showtotal": 1
}
```

- `fields`: projeção; grupos aninhados são objetos `{"Grupo": ["sub1","sub2"]}` (ex.: `Foto`, `Anexo`, `prontuarios`, `Agencia`, `Corretor`, `Caracteristicas`, `InfraEstrutura`).
- `filter`: igualdade por valor (strings ou arrays).
- `advFilter` (em `/imoveis/buscaAvancada`): composição lógica com chaves `Or` e `And`. Em `Or` todos os itens são combinados com OU; em `And`, com E.
- **Descoberta de campos obrigatória**: chamar o endpoint `*/listarcampos` correspondente `antes` de montar `fields`/`filter` — sem `fields` bem formado a listagem costuma retornar só o código do imóvel.

## 2. Domínios e endpoints relevantes

### 2.1 Imóveis (acervo — leitura para o site)

| Endpoint | Método | Uso |
|----------|--------|-----|
| `/imoveis/listarcampos` | GET | Metadados de campos + grupos aninhados (FOTO/Caracteristicas/InfraEstrutura…) |
| `/imoveis/listar` | GET | Lista com `pesquisa` (`fields`, `filter`, `order`, `paginacao`, `showtotal`); params extras `finalidade`, `v2`, `imoveis` |
| `/imoveis/buscaAvancada` | GET | Filtros compostos `advFilter` com `Or`/`And` |
| `/imoveis/detalhes` | GET | Cadastro completo; `imovel` (código) + `pesquisa.fields`; permite grupos aninhados |
| `/imoveis/destaques` | GET | Imóveis em destaque configurados para o site/integrações |
| `/imoveis/finalidades` | GET | Finalidades do tenant: Venda / Aluguel / Temporada |
| `/imoveis/enderecos` | GET | Busca de endereços (apoio a cadastro) |
| `/imoveis/prontuario` | GET | Prontuários do imóvel (histórico) |
| `/imoveis/link` | POST | Gera link de compartilhamento do imóvel |

**CRUD / mídia:**

| Endpoint | Método | Uso |
|----------|--------|-----|
| `/imoveis/detalhes` | POST | Insere cadastro; body `cadastro={"fields":{...}}` (JSON ou form-urlencoded) |
| `/imoveis/detalhes` | PUT | Atualização parcial; `imovel` na URL. **Somente imóveis criados pela mesma chave de API podem ser alterados** |
| `/imoveis/detalhes` | DELETE | Exclui cadastro; body via form: `imovel=AP-171&delete_imovel=true`, `corretor=71`, `cadastro={"CodigoAnexo":123}` |
| `/imoveis/fotos` | POST/PUT/DELETE | Insere/atualiza/deleta foto |
| `/imoveis/fotos/ordem` | PUT | Reordena fotos |
| `/imovel-foto-url/async/check` | GET | Validação de upload assíncrono de foto |
| `/imovel-foto-url-s3/async/callback` | PUT | Callback de upload assíncrono para S3 |
| `/imoveis/videos` | POST/PUT/DELETE | Vídeos do imóvel |

**Formato `cadastro` (campos permitidos = descritos em `imoveis/listarcampos`):**

```json
{"fields": {
  "Categoria": "Apartamento", "Endereco": "Rua X", "NumeroEnd": "600",
  "Complemento": "901", "Bairro": "Perdizes", "Cidade": "São Paulo", "UF": "SP",
  "CEP": "05000000", "Situacao": "Novo", "Ocupacao": "Ocupado",
  "Imovel": 3262, "Fotos": [{"Destaque": "Sim", "Foto": "https://..."}],
  "Anexo": {"Descricao": "doc.pdf", "Anexo": "base64-or-url"},
  "Historico": {"Assunto": "CONTINUA A VENDA", "Codigo": 3262, "Texto": "..."},
  "proprietario": 19159,
  "Corretor": 4
}}
```

### 2.2 Leads e captação (escrita — o coração do nosso formulário)

| Endpoint | Método | Uso |
|----------|--------|-----|
| **`/lead/site`** | POST | Cadastro de lead pelos widgets do site. Body `{"cadastro": "<JSON string>"}`. Resposta inclui `Codigo` do cliente e `Nome` |
| `/lead` | POST | Envio de leads por portais (mesma assinatura `{"cadastro": ...}`) |
| `/rdlead` | POST | Inserção de leads vindos do POST da RD Station |
| `/webhook/{action}` | GET/PUT/POST/DELETE | Gestão de webhooks (recebimento/push de eventos) |
| `/login` / `/auth/login` | POST | Valida login de usuário; retorna `{Codigo, Nomecompleto, token}` |

### 2.3 Clientes (base de leads/CRM)

| Endpoint | Método | Uso |
|----------|--------|-----|
| `/clientes/listarcampos` | GET | Campos de cliente (inclui arrays: `historicos`, `Agencia`) |
| `/clientes/listar` | GET | Listagem de clientes |
| `/clientes/detalhes` | GET/PUT/POST | Visualiza / atualiza / insere cliente |
| `/clientes/anexos` | POST | Anexo no cadastro |
| `/clientes/favoritarimovel` | POST | Favorita imóvel |
| `/clientes/imoveisFavoritos` | GET | Lista favoritos do cliente |
| `/clientes/listarConteudo` | GET | Valores distintos de um campo (apoio a filtros) |
| `/clientes/perfil` | GET/POST | Perfis de interesse do cliente |
| `/clientes/perfil/listarcampos` | GET | Campos de perfil |
| `/clientes/remove_relacionamento` | DELETE | Remove relacionamento (parente/fiador) |

Campos típicos de cliente: `Codigo`, `Nome`, `Bairroresidencial`, `Foneprincipal`, `VeiculoCaptacao` (origem: Site, portal…), `historicos[]`, `Agencia{}`, perfis de interesse.

### 2.4 Negócios / pipeline

| Endpoint | Método | Uso |
|----------|--------|-----|
| `/pipes/listar`, `/pipes/etapas`, `/pipes/detalhes` | GET | Estrutura do pipeline (pipes + etapas) |
| `/negocios/listar`, `/negocios/detalhes` | GET/POST/PUT/DELETE | Negócios do pipe/cliente |
| `/negocios/etapas` | PUT | Move etapa |
| `/negocios/fechar` | POST | Fechamento (Ganho/Perda) |
| `/negocios/visita` | POST/PUT | Agenda/atualiza visita do negócio |
| `/negocios/corretores`, `/negocios/imoveis`, `/negocios/anexos`, `/negocios/atividades` | CRUD | Vínculos e registros do negócio |
| `/negocios/perfil/interesse` | GET/POST/PUT/DELETE | Perfil de interesse do negócio |
| `/negocios/veiculo_captacao` | GET/POST | Veículos de captação |

### 2.5 Agenda / visitas

| Endpoint | Método | Uso |
|----------|--------|-----|
| `/agenda/listar`, `/agenda/buscar` | GET | Agendas de imóveis |
| `/agenda/detalhes` | GET/POST/PUT/DELETE | CRUD de agendamentos |
| `/agenda/cancel`, `/agenda/cancelar` | PUT | Cancela visita |
| `/agenda/imovel` | GET | Horários disponíveis para visita |
| `/agenda/dias` | GET | Dias em que o imóvel está agendado |
| `/agenda/tarefas/listar` | GET | Tarefas da agenda |
| `/agenda/carregar_intervalos` | GET | Widget do site: intervalos disponíveis |
| `/agenda/listarcampos` | GET | Metadados de campos |

### 2.6 Proprietários

- `/proprietarios/listar`, `/proprietarios/detalhes`, `/proprietarios/inserir`, `/proprietarios/atualizar`
- `/proprietarios/feedback/info` — relatório de informações do imóvel do proprietário
- `/contas_proprietario/listar`, `/detalhes` (GET/POST/PUT/DELETE), `/listarcampos`

### 2.7 Tenant / imobiliária (barato, útil para o site)

| Endpoint | Método | Uso |
|----------|--------|-----|
| `/logotipo` | GET | URL do logotipo da imobiliária |
| `/siteurl` | GET | URL do site público |
| `/emailauth` | GET | Credenciais/config de e-mail do tenant |
| `/features/listar`, `/features/detalhes` | GET | Features/veículos de captação da empresa |

### 2.8 Demais domínios (fora do escopo v1, catalogados)

Agências (`/agencias/`), Corretores (`/corretores/` + `/equipes/` + `/usuarios/`), Chaveiros (`/chaveiros/`, `/retiradas/`), Propostas (`/imoveis/proposta`, `/negocios/imoveis/proposta`, `/imoveis/negociacao`, `/propostas/inserir` → prontuário CDIMPRON), Feedback de visita (`/feedback/visita`), Compartilhamento (`/compartilhamento/email`), Histórico de atividades (`/registrar/historico`), Rede (`/rede/sincronizar_imovel`), Integrações externas (CredPago `/credito/*`, seguro `/seguro/*`, VivaReal `/vivareal`, Órulo `/orulo/remover`, GoodData `/gooddata/clientes/ativos`, office `/office/*`, genéricos `/integration/{name}/{action}`, `/faq/{name}/{action}`, `/feature/{action}`), Dispositivos mobile (`/dispositivos/mobile/`).

## 3. Design de integração do produto

### 3.1 Direções e fluxos

| Direção | Padrão | Endpoints |
|---------|--------|-----------|
| **A. Site → VISTA (leads)** | Nosso mini-formulário de qualificação (4 passos) cria o lead no VISTA. | `POST /lead/site` (corpo `{"cadastro": "<json>"}`) |
| **B. VISTA → Site (inventário)** | Pull periódico do acervo filtrado por bairro Jardim das Perdizes/Perdizes. | `GET /imoveis/listarcampos` → `/imoveis/listar` → `/imoveis/detalhes` |
| **C. VISTA → Site (eventos)** | Webhooks (se habilitados no tenant) ou polling como fallback. | `/webhook/{action}` (gestão) |

### 3.2 Regras de integração

1. **Auth server-side**: a chave `key` do VISTA vive em secrets (Supabase/Vercel env) — jamais no client. Chamadas via Server Actions / API Routes de Next.js ou Edge/FN do Supabase.
2. **Mandatory field-discovery**: sempre `*listarcampos` antes de montar `fields`/`filter`. O schema VISTA é dinâmico por tenant; nosso mapeamento deve validar campos recebidos contra o metadata.
3. **Fidelidade de dados (regra do projeto)**: nunca inventar unidade/torre/preço. Só o que o VISTA retorna (dados autorizados do tenant) vai ao site.
4. **`.env.local`**: `APP_MODE=demo` → mocks locais (`mocks/vista/*.json`); produção → VISTA real. Nova chave: `VISTA_API_KEY`. Base URL por ambiente (`sandbox` vs produção).
5. **LGPD**: lead mínimo exigido pelo VISTA; sem PII em URLs; origem/consentimento rastreados no nosso CRM (Supabase) e replicados como `VeiculoCaptacao`.
6. **Idempotência/dedupe**: cliente já existente (por telefone/`Foneprincipal`) → não duplicar; atualizar e reaproveitar `Codigo`.
7. **Sincronização de inventário**: agendamento (Vercel Cron) diário; gravar `data de verificação` por imóvel (requisito de confiança dos docs).

### 3.3 Mapeamento de dados (VISTA canonical → nosso schema)

| VISTA (PT) | Nosso campo (EN) | Tipo | Observação |
|------------|------------------|------|------------|
| `Codigo` | `code` | string | ID de referência externa (vista) |
| `Categoria` | `category` | string | ex.: Apartamento |
| (`Finalidade`) | `purpose` | sale/rent/seasonal | via `/imoveis/finalidades` |
| `Bairro` | `district` | string | usado no filter |
| `Cidade` | `city` | string | |
| `UF` | `state` | string | |
| `CEP` | `postalCode` | string | |
| `Endereco` + `NumeroEnd` | `addressLine` | string | |
| `ValorVenda` | `salePrice` | number | |
| `ValorLocacao` | `rentPrice` | number | |
| `Condominio` | `hoaFee` | number | |
| `Iptu` | `propertyTax` | number | |
| `Dormitorios` | `bedrooms` | number | |
| `Suites` | `suites` | number | |
| `Vagas` | `parkingSpots` | number | |
| `AreaTotal` | `totalArea` | number | m² |
| `AreaPrivativa` | `privateArea` | number | m² |
| `Situacao` | `condition` | string | Novo/Usado… |
| `Ocupacao` | `occupancy` | string | Ocupado/Desocupado… |
| `Caracteristicas` | `amenities[]` | string[] | grupo aninhado |
| `InfraEstrutura` | `buildingAmenities[]` | string[] | grupo aninhado |
| `Foto.Foto` | `photoUrl` | string | grupo `Foto` |
| `Foto.FotoPequena` | `photoThumbUrl` | string | |
| `prontuarios[]` | `history[]` | objects | Data/Hora/Assunto/Texto |
| `Corretor` | `agent` | object | Nome/Codigo/Tipo/Perfil |
| `Agencia` | `agency` | object | Nome/Endereco/Fone/Email |
| `Codigo` (lead) | `vistaClientCode` | string | resposta de `/lead/site` |
| `VeiculoCaptacao` | `captureSource` | string | origem do lead |

### 3.4 Sequência de integração recomendada

1. **Descoberta**: chamar `listarcampos` das entidades usadas; congelar subconjunto de campos no nosso `vistaApiClient`.
2. **Inventário (B)**: sync diário — `listar` com `filter.Bairro` (Jardim das Perdizes + Perdizes) e `fields` de card; `detalhes` para ficha completa (fotos, características); upsert no Supabase; marcar `verifiedAt`.
3. **Leads (A)**: formulário 4 passos → Server Action valida (LGPD mínima) → `POST /lead/site` → grava `vistaClientCode` no Supabase → roteamento Uazapi/CRMs conforme `Duas portas de conversão.md`.
4. **Eventos (C)**: avaliar webhook do VISTA; fallback = polling do nightly sync.