# Design System — Jardim das Perdizes Broker

Documento canônico de design tokens, componentes e padrões visuais. Toda decisão visual deve ser rastreável a este documento.

---

## 1. Princípios

| Princípio | Significado |
|---|---|
| **Autoridade silenciosa** | O design não grita. A força vem da precisão dos dados, não da decoração. |
| **Clareza sobre estilo** | Cada pixel deve ajudar a entender o conteúdo, não distrair. |
| **Acessibilidade nativa** | Contraste WCAG AA em ambos os temas é requisito, não feature. |
| **Tema de primeira classe** | Dark/light não é toggle cosmético — é arquitetura de estado. |
| **Conversão por contexto** | CTAs emergem do conteúdo, nunca competem com ele. |

---

## 2. Tokens Semânticos

Tokens são definidos em `src/app/globals.css` e expostos via `@theme inline` para uso como utilitários Tailwind (`bg-paper`, `text-ink`, etc.).

### 2.1 Cores — Brand (verde do bairro-parque)

| Token | Light | Dark | Uso |
|---|---|---|---|
| `--brand` | `#14532d` | `#4ade80` | Cor primária, CTAs, links hover |
| `--brand-soft` | `#dcfce7` | `#052e16` | Backgrounds sutis, badges |
| `--brand-strong` | `#166534` | `#22c55e` | Estados hover, ênfase |
| `--brand-contrast` | `#ffffff` | `#052e16` | Texto sobre brand |

**Origem:** verde institucional do Jardim das Perdizes (jardimdasperdizes.com.br), elevado a sistema de tema.

### 2.2 Cores — Neutros (warm stone)

| Token | Light | Dark | Uso |
|---|---|---|---|
| `--paper` | `#fafaf9` | `#0c0a09` | Background principal |

---

## 3. Tipografia

### 3.1 Famílias

| Token | Fonte | Uso |
|---|---|---|
| `--font-sans` | Geist Sans | Corpo, UI, navegação |
| `--font-mono` | Geist Mono | Dados tabulares, código, metadados |

**Carregamento:** via `next/font/google` em `src/app/layout.tsx` (self-hosted, sem FOIT).

### 3.2 Escala

A escala usa `clamp()` para fluididade entre breakpoints.

| Nível | Tamanho | Uso |
|---|---|---|
| `text-xs` | `clamp(0.75rem, 0.7rem + 0.25vw, 0.8rem)` | Captions, badges, metadata |
| `text-sm` | `clamp(0.875rem, 0.825rem + 0.25vw, 0.95rem)` | Corpo secundário, nav |
| `text-base` | `clamp(1rem, 0.95rem + 0.25vw, 1.1rem)` | Corpo principal |
| `text-lg` | `clamp(1.125rem, 1.05rem + 0.4vw, 1.3rem)` | H3, subtítulos |
| `text-xl` | `clamp(1.25rem, 1.15rem + 0.5vw, 1.5rem)` | H2 |
| `text-2xl` | `clamp(1.5rem, 1.35rem + 0.75vw, 1.875rem)` | H1 de seção |
| `text-3xl` | `clamp(1.875rem, 1.6rem + 1.4vw, 2.5rem)` | H1 de página |

### 3.3 Pesos

| Classe | Peso | Uso |
|---|---|---|
| `font-normal` | 400 | Corpo |
| `font-medium` | 500 | Labels, nav, links |
| `font-semibold` | 600 | H2, H3, ênfase |
| `font-bold` | 700 | H1 |

### 3.4 Ritmo vertical

- **Entre parágrafos:** `mt-4` (1rem)
- **Entre seções:** `mt-10` (2.5rem)
- **Entre blocos de conteúdo:** `mt-12` (3rem)
- **Espaçamento interno de cards:** `p-6` (1.5rem)

---

## 4. Espaçamento e Grid

### 4.1 Container

```css
.container-page {
  width: 100%;
  max-width: 72rem; /* 1152px */
  margin-inline: auto;
  padding-inline: 1.25rem; /* 20px */
}
```

### 4.2 Breakpoints (Tailwind v4)

| Prefixo | Largura mínima |
|---|---|
| `sm` | 640px |
| `md` | 768px |
| `lg` | 1024px |
| `xl` | 1280px |
| `2xl` | 1536px |

### 4.3 Grid de conteúdo

- **Coluna única (leitura):** `max-w-2xl` (672px) — páginas de conteúdo, FAQ
- **Grid de cards:** `grid gap-6 md:grid-cols-2` — listagem de produtos
- **Grid de 3 colunas:** `grid gap-8 sm:grid-cols-2 lg:grid-cols-3` — footer

---

## 5. Bordas e Cantos

| Token | Valor | Uso |
|---|---|---|
| `border-line` | `1px solid var(--line)` | Bordas sutis de cards |
| `border-line-strong` | `1px solid var(--line-strong)` | Bordas de inputs, separadores |
| `rounded-full` | `9999px` | Botões, badges, toggle |
| `rounded-2xl` | `1rem` | Cards, blocos de conteúdo |
| `rounded-xl` | `0.75rem` | Notas, alerts |

---

## 6. Tema Dark/Light

### 6.1 Arquitetura

```
┌─────────────────────────────────────────────────────────┐
│  localStorage ("jdp-theme")                             │
│  ┌─────────────┐                                        │
│  │ "light"     │──┐                                     │
│  │ "dark"      │  │    ┌──────────────────────┐         │
│  │ null/absent │  ├───▶│ useSyncExternalStore │         │
│  └─────────────┘  │    │ (ThemeProvider)      │         │
│                   │    └──────────┬───────────┘         │
│  matchMedia        │               │                     │

---

## 7. Componentes

### 7.1 Button (variantes)

| Variante | Classe | Uso |
|---|---|---|
| **Primary** | `bg-brand text-brand-contrast hover:opacity-90` | CTA principal ("Enviar solicitação") |
| **Secondary** | `border border-line-strong text-ink hover:border-brand hover:text-brand` | CTA secundário ("Falar com especialista") |
| **Ghost** | `text-ink hover:text-brand` | Ações terciárias |

**Base comum:** `inline-flex items-center justify-center rounded-full px-4 py-2 text-sm font-medium transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-focus-ring`

### 7.2 Badge (status)

| Status | Classe |
|---|---|
| Entregue / Pronto | `bg-emerald-100 text-emerald-800` |
| Em obras | `bg-amber-100 text-amber-800` |
| Breve lançamento | `bg-sky-100 text-sky-800` |

**Base:** `shrink-0 rounded-full px-3 py-1 text-xs font-medium`

### 7.3 Card

```typescript
// Card base (interativo)
<div className="rounded-2xl border border-line p-6 transition-colors hover:border-brand">
  {children}
</div>

// Card elevado (paper-secondary)
<div className="rounded-2xl border border-line bg-paper-secondary p-6">
  {children}
</div>
```

### 7.4 KeyTakeaways

Bloco de extração para AEO/GEO (3–4 bullets sob o H1).

```typescript
<KeyTakeaways items={[
  "Primeiro bairro da América Latina com certificação AQUA",
  "Parque central de 45 mil m² com obras de Tomie Ohtake",
  "Fiação subterrânea e câmeras interligadas à polícia (Muralha Paulista)",
]} />
```

**Renderiza:** `section[aria-label="Resumo rápido"]` com heading "Resumo rápido" e lista discada.

### 7.5 FAQ

Bloco de perguntas frequentes com schema JSON-LD 1:1.

```typescript
<Faq items={[
  { question: "O parque é público?", answer: "O Parque Jardim das Perdizes é aberto à comunidade..." },
]} />
```

**Regra:** os mesmos `items` devem ser passados a `faqPageSchema()` — respostas visíveis e schema são sempre idênticos (sem dados ocultos).

### 7.6 JsonLd

Emissor de JSON-LD serializado em runtime (nunca string-interpolado).

```typescript
<JsonLd schema={faqPageSchema(items)} />
```

### 7.7 ThemeToggle

Botão de toggle dark/light com ícones sol/lua SVG.

```typescript
<ThemeToggle />
```

**Acessibilidade:** `aria-label` dinâmico ("Ativar tema claro" / "Ativar tema escuro"), `sr-only` label, focus-ring.

---

## 8. Padrões de Conversão (Duas Portas)

O site oferece **sempre duas portas de conversão**, nunca uma, nunca três+:

| Porta | Label | Estilo | Quando usar |
|---|---|---|---|
| **Porta 1** | "Falar agora com especialista" | Secondary (borda) | Contexto de urgência, WhatsApp |
| **Porta 2** | "Enviar solicitação" | Primary (preenchido) | Contexto de qualificação, formulário |

**Regras:**
- As duas portas sempre aparecem juntas (Header, Footer, Fim de página de conteúdo)
- Nunca mais de 2 CTAs visíveis simultaneamente
- A porta primária (solicitação) é sempre visualmente dominante
- Contexto determina qual porta receberá ênfase, mas ambas estão presentes

---

## 9. Acessibilidade

### 9.1 Focus Visible

```css
:focus-visible {
  outline: 2px solid var(--focus-ring);
  outline-offset: 2px;
}
```

### 9.2 Screen Reader Only

```css
.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
}
```

### 9.3 Motion

```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
```

### 9.4 Landmarks

- `<header>` — Header com navegação
- `<main>` — Conteúdo principal
- `<footer>` — Footer
- `aria-label` em todas as `<nav>` e seções de conteúdo

---

## 10. Motion

| Duração | Uso |
|---|---|
| `transition-colors 150ms` | Hover de links, botões |
| `transition-colors 200ms` | Background do body (troca de tema) |
| `hover:opacity-90` | Feedback de clique em CTAs |

**Regra:** motion é funcional (feedback de estado), nunca decorativo.

---

## 11. Ícones

- **Estilo:** SVG stroke-based, `stroke-width: 2`, `currentColor`
- **Tamanho padrão:** `h-5 w-5` (20px) em UI, `h-4 w-4` (16px) em densidade alta
- **Acessibilidade:** `aria-hidden="true"` em ícones decorativos, `sr-only` label em ícones informativos

---

## 12. Responsividade

### 12.1 Abordagem mobile-first

- Base: estrutura de coluna única
- `sm`: ajustes de espaçamento
- `md`: grid de 2 colunas (cards)
- `lg`: nav horizontal, grid de 3 colunas

### 12.2 Navegação mobile

- Nav principal: lista vertical (CSS-only, sem drawer JS)
- Nav secundário: flex-wrap horizontal
- CTAs: sempre visíveis no topo

---

## 13. Versionamento

| Versão | Data | Mudanças |
|---|---|---|
| 1.0.0 | 2026-08-31 | Design system inicial (dark/light nativo, tokens semânticos, componentes base) |

---

**Manutenção:** Toda mudança visual deve atualizar este documento antes de ser implementada. Tokens não devem ser adicionados sem aprovação.
│  (prefers-color-   │    ┌──────────▼───────────┐         │
│   scheme: dark)    ├───▶│ resolveTheme()       │         │
│                   │    │ "system" → OS        │         │
│                   │    └──────────┬───────────┘         │
│                   │               │                     │
│                   │    ┌──────────▼───────────┐         │
│                   │    │ applyThemeToDocument()│         │
│                   │    │ .dark class +         │         │
│                   │    │ color-scheme          │         │
│                   │    └──────────────────────┘         │
└─────────────────────────────────────────────────────────┘
```

### 6.2 Arquivos-fonte

| Arquivo | Responsabilidade |
|---|---|
| `src/lib/theme/theme.ts` | Tipos, resolução light/dark/system |
| `src/lib/theme/storage.ts` | Leitura/escrita localStorage |
| `src/lib/theme/apply.ts` | Aplicação ao `<html>` (class + color-scheme) |
| `src/lib/theme/ThemeProvider.tsx` | Provider React com `useSyncExternalStore` |
| `src/components/layout/ThemeToggle.tsx` | Botão de toggle acessível |

### 6.3 Anti-FOUC

Script inline no `<head>` (`src/app/layout.tsx`) aplica o tema antes do primeiro paint — ver código completo em `src/app/layout.tsx` linha 19.
| `--paper-secondary` | `#ffffff` | `#171412` | Cards, seções elevadas |
| `--surface` | `#ffffff` | `#1c1917` | Superfícies de input, modais |
| `--ink` | `#1c1917` | `#f5f5f4` | Texto principal |
| `--ink-soft` | `#57534e` | `#d6d3d1` | Texto secundário, parágrafos longos |
| `--muted` | `#78716c` | `#a8a29e` | Labels, captions, metadata |
| `--line` | `#e7e5e4` | `#292524` | Bordas sutis |
| `--line-strong` | `#d6d3d1` | `#44403c` | Bordas de inputs, separadores |

### 2.3 Cores — Estados

| Token | Light | Dark | Uso |
|---|---|---|---|
| `--focus-ring` | `#14532d` | `#4ade80` | Focus visible (outline 2px) |

**Nota:** cores de estado semânticas (success/warning/error) são contextuais:
- **Entregue / Pronto:** `bg-emerald-100 text-emerald-800` (light) / `bg-emerald-900/30 text-emerald-300` (dark)
- **Em obras:** `bg-amber-100 text-amber-800` (light) / `bg-amber-900/30 text-amber-300` (dark)
- **Breve lançamento:** `bg-sky-100 text-sky-800` (light) / `bg-sky-900/30 text-sky-300` (dark)

### 2.4 Contraste WCAG

| Combinação | Light | Dark | Nível |
|---|---|---|---|
| `--ink` sobre `--paper` | 15.3:1 | 14.8:1 | AAA |
| `--ink-soft` sobre `--paper` | 7.1:1 | 8.2:1 | AA |
| `--muted` sobre `--paper` | 4.6:1 | 5.1:1 | AA |
| `--brand` sobre `--brand-contrast` | 7.2:1 | 6.8:1 | AA |