# Backlog — Jardim das Perdizes Broker

**Última atualização:** 2026-09-03

Itens priorizados por impacto × esforço. Severidade baseada na auditoria
UI/UX (docs/AUDIT_UIUX_2026-09-03.md).

---

## 🟡 P2 — Médio (próximo sprint)

### Backlog-01 · Geist_Mono preload (P2-02)
- **Arquivo:** src/app/layout.tsx
- **Esforço:** ~15 min
- **Descrição:** Remover Geist_Mono do preload de fontes. A fonte mono é
  usada apenas em blocos de código/dados técnicos — não é above-the-fold.
  O Next.js font com display: "swap" já faz preload automático, mas o
  carregamento compete com Inter/Lato pelo bandwidth.
- **Critério de aceite:** Geist_Mono removido do layout.tsx; build passa;
  páginas com <code> continuam renderizando corretamente.

### Backlog-02 · 24 SVGs inline → sprite (P2-01)
- **Arquivo:** src/app/page.tsx + componentes
- **Esforço:** ~2h
- **Descrição:** Mover ícones inline para sprite SVG (<symbol> + <use>).
  Reduz HTML inicial em ~50 KB e permite cache individual dos SVGs.
- **Critério de aceite:** Sprite SVG criado; ícones referenciados via
  <use href="#icon-name">; build passa; visual idêntico.

---

## 🔵 P3 — Baixo (melhorias incrementais)

### Backlog-03 · OG image dedicada 1200×630
- **Arquivo:** scripts/generate-og-image.py
- **Esforço:** ~30 min
- **Descrição:** Arte dedicada 1200×630 com marca (atualmente usa banner
  1500×775 do bairro). Proporção ideal para OpenGraph/Twitter cards.
- **Critério de aceite:** public/og-image.jpg regenerado com 1200×630;
  preview no Facebook/Twitter debugger correto.

### Backlog-04 · getRouteLabel — padronizar ou remover
- **Arquivo:** src/lib/routes.ts
- **Esforço:** ~10 min
- **Descrição:** Função exportada sem consumidores. Breadcrumbs das fichas
  têm labels hardcoded. Opções: (a) padronizar breadcrumbs com ela, ou
  (b) remover.
- **Critério de aceite:** Decisão documentada; implementada.

---

## 📋 Backlog estratégico (não-bloqueante)

### Backlog-05 · Reenviar sitemap no Search Console
- **Quando:** Após deploy em produção
- **Descrição:** Enviar https://<dominio>/sitemap.xml (35 URLs) e
  acompanhar cobertura de indexação.

### Backlog-06 · Ficha comercial — CTA "agendar visita"
- **Arquivo:** src/app/para-trabalhar/[modality]/[slug]/page.tsx
- **Esforço:** ~20 min
- **Descrição:** Adicionar CTA de agendamento de visita nas fichas comerciais
  (atualmente só tem breadcrumb JSON-LD).

### Backlog-07 · Vitrine comercial — filtro por área/preço
- **Arquivo:** src/app/para-trabalhar/comprar/page.tsx, alugar/page.tsx
- **Esforço:** ~1h
- **Descrição:** Adicionar filtros de área (m²) e faixa de preço nas
  vitrines comerciais.

### Backlog-08 · Formulário — estimativa de tempo de resposta
- **Arquivo:** src/components/conversion/LeadForm.tsx
- **Esforço:** ~10 min
- **Descrição:** Adicionar texto "Respondemos em até X horas" no formulário
  de venda/aluguel.

### Backlog-09 · Breadcrumb visual (P3-02)
- **Arquivo:** componente compartilhado
- **Esforço:** ~30 min
- **Descrição:** Adicionar breadcrumb visual acima do h1 para orientação
  do usuário (atualmente só existe via JSON-LD).

---

## ✔️ Concluído (2026-09-03)

| Item | Versão |
|---|---|
| Auditoria UI/UX completa (12 achados) | 1.1.3 |
| P0-01: Canonical dupla barra | 1.1.3 |
| P0-02: Página 404 personalizada | 1.1.3 |
| P0-03: 5 páginas com JSON-LD breadcrumb | 1.1.3 |
| P1-02: Home com BreadcrumbList | 1.1.3 |
| P1-03: FAQPage nos hubs comerciais | 1.1.3 |
| P2-03: Alvos ≥ 44px | 1.1.3 |
| P3-01: prefers-reduced-motion | 1.1.3 |
| Sitemap 35 URLs (fichas comerciais) | 1.1.1 |
| OG image dedicada com marca | 1.1.2 |
| Breadcrumbs derivados do registry | 1.1.2 |
