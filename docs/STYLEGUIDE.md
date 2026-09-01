# Style Guide — Jardim das Perdizes Broker

Guia de voz, tom, conteúdo e padrões editoriais. Toda peça de conteúdo deve seguir este documento.

---

## 1. Voz e Tom

### 1.1 Personalidade da marca

| Traço | Manifestação |
|---|---|
| **Especialista local** | Fala com profundidade sobre o bairro, não com generalidades de "mercado imobiliário" |
| **Transparente** | Mostra fontes, datas, métodos e limitações — sempre |
| **Calmo** | Não pressiona. Informa para que o leitor decida com consciência |
| **Preciso** | Números exatos, nunca arredondados para "marketing" |

### 1.2 Tom por contexto

| Contexto | Tom | Exemplo |
|---|---|---|
| **Educacional (Guias)** | Didático, paciente | "Entenda como funciona a aprovação de um financiamento..." |
| **Dados (Mercado)** | Objetivo, datado | "R$ 18.200/m² (FipeZAP, jun/2026, mediana de ofertas)" |
| **Conversão (CTAs)** | Direto, sem pressão | "Envie o que você procura — um especialista responde em até 24h" |
| **Institucional** | Sóbrio, institucional | "CRECI 43.897-J · Broker independente" |

### 1.3 O que NUNCA fazer

- ❌ "Valorização garantida" / "Investimento seguro" / "Oportunidade única"
- ❌ "O melhor bairro de São Paulo" (subjetivo, não verificável)
- ❌ Urgência artificial: "Só 2 unidades restantes" (sem fonte em tempo real)
- ❌ Cópia de texto/foto da Tecnisa sem autorização
- ❌ Afirmar relação/vínculo com a Tecnisa

---

## 2. Hierarquia de Páginas (Formato-Exemplar)

Toda página de conteúdo segue esta estrutura (padrão AEO/GEO):

```
┌─────────────────────────────────────────────┐
│  H1 — pergunta ou tema claro                │
├─────────────────────────────────────────────┤
│  Key Takeaways (3–4 bullets factuais)       │
├─────────────────────────────────────────────┤
│  Resposta direta (40–60 palavras)           │
├─────────────────────────────────────────────┤
│  Desenvolvimento (seções H2)                │
│  ├── Tabelas comparativas (rich snippets)   │
│  ├── Dados com fonte e data                 │
│  └── Contexto local                         │
├─────────────────────────────────────────────┤
│  FAQ (5–8 perguntas + JSON-LD)              │
├─────────────────────────────────────────────┤
│  Ponte técnica → CTA de duas portas         │
├─────────────────────────────────────────────┤
│  Fontes e data de verificação               │
└─────────────────────────────────────────────┘
```

### 2.1 H1

- Deve ser uma pergunta ou tema claro, nunca genérico
- Incluir a entidade principal (bairro, produto, conceito)
- Máximo 70 caracteres

**Exemplos:**
- ✅ "Quanto custa morar no Jardim das Perdizes?"
- ✅ "Jardim das Perdizes: guia completo do bairro"
- ❌ "Conheça nosso site" / "Imóveis à venda"

### 2.2 Key Takeaways

- 3–4 bullets, cada um com um fato verificável
- Devem responder à pergunta principal em ≤100 palavras totais
- Formato: sujeito + verbo + dado
- **Nunca** repetir o óbvio ou o genérico

### 2.3 Resposta direta

- 40–60 palavras que respondem à pergunta do H1
- Deve funcionar como featured snippet (extração direta por IAs)
- Sem introdução, sem contexto — vai direto ao ponto

### 2.4 FAQ

- 5–8 perguntas reais (baseadas em Search Console, People Also Ask, atendimento)
- Respostas de 30–80 palavras

---

## 3. Dados e Fontes

### 3.1 Regra de ouro

**Todo dado deve ter: valor + fonte + data + método (quando aplicável).**

### 3.2 Formato padrão

```
R$ 18.200/m² (FipeZAP, jun/2026, mediana de ofertas na região)
```

| Elemento | Obrigatório | Exemplo |
|---|---|---|
| Valor | ✅ | R$ 18.200/m² |
| Fonte | ✅ | FipeZAP |
| Data | ✅ | jun/2026 |
| Método | Quando relevante | mediana de ofertas |

### 3.3 Fontes aceitas (por prioridade)

1. **Oficiais:** FipeZAP, Secovi, Prefeitura, IBGE, Banco Central
2. **Incorporadora:** Tecnisa (com atribuição explícita)
3. **Portais:** ZAP, QuintoAndar, Loft (como "ofertas do portal")
4. **Estimativas:** Quando não houver fonte primária, marcar como "estimativa nossa" com método

### 3.4 O que NUNCA fazer com dados

- ❌ "Preço médio do bairro" sem fonte
- ❌ "Valorização de 20%" sem período e fonte
- ❌ "Aluguel médio" sem tamanho da amostra
- ❌ Misturar fontes sem atribuição
- ❌ Usar dados de 2024 em 2026 sem nota de atualização

### 3.5 Status de produtos

| Status | Label | Badge |
|---|---|---|
| `delivered` | Entregue | emerald |
| `ready-to-move` | Pronto para morar | emerald |
| `under-construction` | Em obras | amber |
| `coming-soon` | Breve lançamento | sky |

**Regra:** status deve ser reconcilado com a fonte oficial mais recente. Divergências são documentadas em `statusNote` (ex: Reserva Figueiras).

---

## 4. CTAs e Conversão

### 4.1 Duas Portas (sempre)

| Porta | Label | Cor | Contexto |
|---|---|---|---|
| Primária | "Enviar solicitação" | Brand (preenchido) | Qualificação, formulário |
| Secundária | "Falar agora com especialista" | Borda | Urgência, WhatsApp |

### 4.2 Onde aparecem

- Header (sempre visível)
- Footer (banda de conversão)
- Fim de cada página P0 (após FAQ)
- Fim de cada ficha de produto

### 4.3 O que NUNCA fazer com CTAs

- ❌ Mais de 2 CTAs visíveis simultaneamente
- ❌ "Compre agora" / "Garanta já" (pressão)
- ❌ Pop-ups de saída (não usamos)
- ❌ CTAs sem contexto (flutuantes sem relação com o conteúdo)

---

## 5. SEO/AEO/GEO

### 5.1 Por página

| Elemento | Obrigatório | Formato |
|---|---|---|
| Title tag | ✅ | `[Página] — Jardim das Perdizes Broker` (≤60 chars) |
| Meta description | ✅ | 1 frase, ≤155 chars, com entidade |
| H1 | ✅ | 1 por página, pergunta ou tema |
| Canonical | ✅ | Trailing slash, absoluta |
| OpenGraph | ✅ | Título, descrição, imagem 1200x630 |
| Twitter Card | ✅ | summary_large_image |
| JSON-LD | ✅ | Conforme o tipo de página |

### 5.2 JSON-LD por tipo de página

| Página | Schema |
|---|---|
| Home | `RealEstateAgent` + `LocalBusiness` |
| Para Morar / Investir | `BreadcrumbList` + `FAQPage` |
| Ficha de produto | `ApartmentComplex` + `RealEstateListing` |
| Guias do bairro | `Article` + `BreadcrumbList` + `FAQPage` |
| Mercado e Dados | `Dataset` + `Article` |
| Sobre / Contato | `Organization` + `LocalBusiness` |

### 5.3 AEO (Answer Engine Optimization)

- Resposta direta de 40–60 palavras no topo de cada página
- Key Takeaways com 3–4 bullets factuais
- FAQ com perguntas reais (People Also Ask)
- Tabelas comparativas (rich snippets)

### 5.4 GEO (Generative Engine Optimization)

- Entidades claras (bairro, produtos, localização)
- Dados estruturados (JSON-LD completo)
- Fontes citáveis (com data e método)
- `llms.txt` e `llm.txt` para LLMs

---

## 6. Imagens

### 6.1 Regra de copyright

- **Nunca** usar imagens da Tecnisa sem autorização explícita
- Preferir: fotos próprias do bairro, parque, fachadas
- Quando usar fonte externa: atribuição visível + link

### 6.2 Formatos

| Uso | Formato | Dimensões |
|---|---|---|
| OG Image | JPG/PNG | 1200x630 |
| Hero | WebP/AVIF | 1920x1080 |
| Thumbnails | WebP/AVIF | 600x400 |
| Ícones | SVG | Variável |

### 6.3 Acessibilidade

- Toda imagem informativa: `alt` descritivo
- Toda imagem decorativa: `alt=""` (vazio)
- Nunca usar imagem como único meio de transmitir informação crítica

---

## 7. Nomenclatura de Entidades

### 7.1 Bairro

- **Correto:** "Jardim das Perdizes" (com "das", minúsculo no "das")
- **Errado:** "Jardim Das Perdizes" / "jardim das perdizes" / "Jd. das Perdizes"

### 7.2 Produtos (condomínios)

Sempre usar o nome oficial da Tecnisa:
- Reserva Manacá, Recanto Jacarandá, Bosque Jequitibá, Reserva Figueiras
- Sequoia, Bosque Cerejeiras, Reserva Flamboyant, Recanto Oliveiras

### 7.3 Broker

- **Correto:** "Jardim das Perdizes Broker" (nome completo na primeira menção)
- **Correto:** "Broker" (subsequentes, com B maiúsculo)
- **Errado:** "Corretor" / "Imobiliária" (genérico, não é marca)

---

## 8. Acessibilidade de Conteúdo

### 8.1 Legibilidade

- Frases de ≤25 palavras
- Parágrafos de ≤4 linhas
- Vocabulário técnico: explicar na primeira ocorrência
- Abreviar com o termo completo primeiro: "Fundação Instituto de Pesquisas Econômicas (Fipe)"

### 8.2 Estrutura

- H1 → H2 → H3 (nunca pular níveis)
- Listas para ≥3 itens relacionados
- Tabelas para comparações numéricas

### 8.3 Links

- Texto âncora descritivo (nunca "clique aqui")
- Indicar se abre em nova janela (não usamos `target="_blank"` sem necessidade)
- Links externos: indicar com ícone ou texto "(fonte externa)"

---

## 9. Versionamento

| Versão | Data | Mudanças |
|---|---|---|
| 1.0.0 | 2026-08-31 | Style guide inicial (voz, tom, formato-exemplar, dados, CTAs, SEO) |

---

**Manutenção:** Toda nova peça de conteúdo deve ser revisada contra este guia antes de ser publicada. Dúvidas sobre tom ou formato: consultar este documento primeiro.
- JSON-LD `faqPageSchema()` 1:1 com o visível
- Perguntas em ordem de importância (mais buscada primeiro)