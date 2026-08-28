# Referência de Página de Diretório / Ficha Técnica de Condomínio — apto.vc

> Fonte de referência (estrutura e layout, NÃO fonte de dados): https://apto.vc/br/sp/sao-paulo/jardim-das-perdizes/bosque-cerejeiras-jardim-das-perdizes
> Capturado em 2026-08-28. Uso: referência de arquitetura/composição da página de condomínio do projeto (SITE-05, planos 01-03 e 02-04). Nunca copiar números/preços deste snapshot como dado autoritativo — dados vêm dos docs do projeto / VISTA / Captei (ver docs/vista-integration.md e docs/captei-integration.md).

## 1. Papel da referência

A página exemplar é a ficha técnica de um condomínio (Bosque Cerejeiras, Tecnisa, Jardim das Perdizes) num portal de lançamentos. O que ela ensina é **a composição de seções** de uma página de condomínio que converte, nesta ordem: hero com specs rápidos → projeto (números-chave) → galeria → status do empreendimento → lazer → apartamentos do produto → texto SEO informacional com links internos favoráveis → hubs de conteúdo e CTAs.

Essa ordem vira o blueprint da página `/condominios/[slug]` do projeto. A conversão no nosso site é dual (formulário + WhatsApp), enquanto o apto.vc usa "Faça a Visita 3D" como CTA — o equivalente aqui é a chamada de agendar visita/solicitação.

## 2. Estrutura e layout (ordem das seções)

1. **Header global** (nav com hubs: construtoras, corretores, imobiliárias, compradores) — estabilidade de navegação e hubs de autoridade; no nosso caso o Header do site (01-02).
2. **Breadcrumb** — `Apto / Apartamentos em São Paulo / Jardim das Perdizes / Bosque Cerejeiras`, com links internos aos pais (bairro → região → cidade). Encoraja schema BreadcrumbList.
3. **Hero da ficha técnica**:
   - **H1**: nome do condomínio ("Bosque Cerejeiras - Jardim das Perdizes") — único H1.
   - **Tagline**: "Aptos de altíssimo padrão em localização nobre!".
   - **Prova social**: "+200 pessoas viram este imóvel nos últimos 90 dias".
   - **Badges**: "Visite decorado", "Em construção" (status visual).
   - **Localização**: bairro, cidade, UF.
   - **Row de specs rápidos** (chips): `4 suítes · 222 e 293 m² · 5 banheiros · 2 e 3 vagas`.
4. **Projeto** (números-chave do empreendimento): terreno (4698 m²), torres (1 Torre), pavimentos (Térreo + 27 Andares), unidades (100 residências).
5. **Galeria de fotos do condomínio** (slider).
6. **Status do empreendimento** (timeline de ciclo de entrega): `Breve Lançamento → Lançamento (Abr 2024) → Em Construção → Pronto (Aproximadamente Out 2027)`, com o estágio atual destacado.
7. **Áreas de Convívio e Lazer**: lista de itens (quadra de beach tennis, bicicletário, espaço família, bar, fitness, lobby, piscina coberta, piscina descoberta, deck molhado, playground, quadra de squash, churrasqueira, salão de festas, brinquedoteca).
8. **Apartamentos do condomínio**: painel do produto com chips (`222 e 293 m² · 4 quartos · 5 banheiros · 2 e 3 vagas`) + galeria de plantas + botão **"Faça a Visita 3D"** (nosso equivalente: CTA de agendar visita / conversão dual).
9. **Texto SEO descritivo** (bloco informacional, 1 parágrafo denso e linkado):
   - Localização: rua, bairro, região, cidade (links internos ao pai).
   - Previsão de entrega (10/2027) e status atual ("Em construção").
   - Construtora (link ao perfil da construtora — "Tecnisa").
   - Lançamento (04/2024), composição (1 torre, 100 residências).
   - Plantas (222–293 m²), quartos (4), banheiros (5), vagas (2–3).
   - Diferenciais (varanda gourmet com churrasqueira, perto de metrô/trem, perto de parque).
   - Faixa de preço ("a partir de R$ 3.834.250,00 para a planta de 222 m²").
10. **Hubs de conteúdo linkados** ("Como comprar um imóvel", "Imóveis econômicos") — listas de links informacionais com âncoras de texto; suporta SEO de autoridade.
11. **Footer**: breadcrumb repetido, hubs da plataforma, calculadoras, sociais, política/termos.

## 3. Mapeamento para o projeto

| Seção apto.vc | Componente no projeto | Plano |
|---|---|---|
| Breadcrumb + links ao bairro/cidade | Breadcrumb com schema; factory de metadata (canonical) | 01-03 |
| Hero + chips de specs rápidos | Header de ficha técnica de condomínio (SITE-05) | 02-04 |
| Projeto (terreno/torres/pavimentos/unidades) | Campos estruturados em `condominiums` (schema Supabase) | 02-01 |
| Timeline de status (lançamento→entrega) | Campo `status` + timeline (SITE-05: status de entrega) | 02-04 |
| Lazer | Campo `amenities` (lista) | 02-01 |
| Apartamentos do condomínio + chips | Cards de imóveis do produto (units) vinculados ao condomínio | 02-03/02-04 |
| Texto SEO + hubs linkados | Conteúdo descritivo por condomínio + interlinks | 04-02 |
| CTA "Faça a Visita 3D" | CTA dual (formulário + WhatsApp) com contexto do condomínio | 03-02/03-03 |

## 4. Advertências (fidelity & LGPD)

- **Nunca transcrever dados exibidos como fatos do site** — usar apenas como layout. Dados de condomínios vêm dos docs do projeto (dados reais coletados em `extracted/`), do VISTA (inventário canônico) e do Captei (dados de mercado, com attribution de fonte).
- Datas/preços (ex.: entrega 10/2027, preço a partir de) devem vir da base verificada do projeto, nunca de snapshot de portal.
- O apto.vc não expõe telefone nem formulário nesta view — o equivalente de conversão no nosso site é o CTA dual (LGPD: solicitar consentimento separado; sem PII em URLs).
- GitHub-style: keep the doc light; the page is a reference of sections, not a data contract.