# R2 — Onda 3: Camada de descoberta, filtros e cards (padrão Loft/QuintoAndar)

## Fontes de verdade
- `extracted/Especificação da camada de descoberta, filtros e cards.md` (contrato de filtros, cards e regra editorial)
- `src/data/condominiums.ts` (catálogo fidelity-tested, 9 produtos, captura 31/08/2026)

## Decisões
1. **Modelo editorial, não portal de anúncios**: o explorador cruza PERFIL × PRODUTO, nunca unidades específicas. Preço/disponibilidade ficam no atendimento (doc §2 — unidades indexáveis = conteúdo fino).
2. **Motor puro e testável** (`src/lib/discovery/filters.ts`): estágio, faixa de área (interseção de intervalos), mínimo de suítes e dormitórios (parse das plantas oficiais; suíte conta como dormitório).
3. **Limitação de dados é divulgada, nunca silenciada**: produtos sem plantas publicadas saem em `excluded` com motivo exibido na UI.
4. **Empty-state propositivo**: nenhum resultado → "perfis mais próximos" por distância de área (`nearestByArea`).
5. **CTA de duas portas** ao fim de resultados: "Enviar meu recorte" + "Falar agora com especialista" → `/#conversao`.
6. `trailingSlash: true` no Next para URLs servidas = canônicas (sem 308, sem mismatch para crawlers).

## Arquivos
- `src/lib/discovery/filters.ts` + `.test.ts` (motor puro)
- `src/components/discovery/DiscoveryExplorer.tsx` (cliente) + `.test.tsx`
- `src/components/discovery/DiscoveryCard.tsx` (card com badge de status, área, unidades, link para ficha)
- `src/app/encontre-seu-perfil/page.tsx` (intro editorial + explorador + seção "o que o explorador não responde")
- `next.config.ts` (trailingSlash)

## Verificação
- [x] TDD motor de filtros (16 casos: estágio, área, suítes, dorms, excluded, nearest)
- [x] TDD UI (catálogo completo por padrão, filtro por estágio, divulgação de exclusões, empty-state)
- [x] `pnpm lint` limpo · 84/84 testes
- [x] Build demo EXIT=0 · Build produção EXIT=0 (prerender estático)
