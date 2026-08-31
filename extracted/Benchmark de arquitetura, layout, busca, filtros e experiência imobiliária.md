# Benchmark de arquitetura, layout, busca, filtros e experiência imobiliária

## Jardim das Perdizes Broker

**Objetivo:** orientar a construção de um site editorial com explorador imobiliário, capaz de gerar tráfego orgânico, autoridade, awareness, descoberta por atributos e leads qualificados.  
**Benchmarks observados:** Loft, QuintoAndar, Zillow, Redfin, Rightmove, StreetEasy, Compass e Airbnb.  
**Referências independentes de UX:** Baymard e MeasuringU.  
**Data das observações públicas:** 28 de agosto de 2026.

> **Conclusão executiva.** A Broker não deve copiar um único portal. Deve combinar: a simplicidade de entrada e a operação de filtros do QuintoAndar; a busca por linguagem natural e recuperação de zero resultados da Zillow; a separação de jornadas e integração de serviços da Redfin; a arquitetura editorial da Rightmove; a hiperlocalidade por edifício e conteúdo de bairro da StreetEasy; a estética premium e a busca por entidades da Compass; a descoberta por categorias e flexibilidade da Airbnb; e a disciplina de usabilidade e confiança apontada por Baymard e MeasuringU.

A adaptação decisiva é trocar o centro de gravidade. Nos portais, o resultado principal costuma ser uma unidade disponível. Na Broker, o resultado principal deve ser **um perfil de imóvel, condomínio, tema, estudo, guia ou oportunidade consultiva**, com encaminhamento privado para oportunidades atuais quando o usuário desejar.

## 1. Escopo e critérios do benchmark

O benchmark foi dividido em quatro camadas:

| Camada | O que foi avaliado |
|---|---|
| Arquitetura da informação | Menu, hierarquia, intenção, taxonomia, caminhos para comprador, locatário, vendedor, locador e investidor. |
| Busca e descoberta | Campo de busca, autocomplete, entidades, linguagem natural, filtros, facetas, ordenação, mapa e recuperação de zero resultados. |
| Layout e design | Hero, densidade de informação, cards, imagens, lista/mapa, hierarquia visual, mobile e acessibilidade observável. |
| Confiança e conversão | Atualidade, preço/custo, histórico, alertas, favoritos, valuation, conteúdo local, serviços e CTAs. |

As avaliações abaixo são **qualitativas e orientadas ao fit com o projeto da Broker**. Não são uma auditoria técnica de cada produto nem uma afirmação de que um site é universalmente melhor que outro.

## 2. Resumo dos benchmarks

| Benchmark | Força principal | Padrão que interessa à Broker | Limite para copiar literalmente |
|---|---|---|---|
| **Loft** | Filtros amplos, comodidades, condomínio, gastos mensais, metragem e busca por características. | Pensar atributos além de preço, bairro e quartos; incluir custo mensal, condomínio, vista, sol e estilo de vida. | A página web observada retornou 403; parte da evidência vem da descrição oficial do aplicativo, não de teste completo do site [1]. |
| **QuintoAndar** | Entrada simples, chips de filtros, lista/mapa, custo total, alerta e cards escaneáveis. | Progressividade: poucos filtros primeiro, “mais filtros” depois; filtros removíveis; mapa opcional; salvar perfil. | O volume de unidades e a lógica de marketplace não são o diferencial da Broker [2] [3]. |
| **Zillow** | Busca aberta por endereço, bairro, cidade ou ZIP; filtros compactos; recomendações; busca por características; recuperação de zero resultados. | Busca semântica em português, autocomplete de entidades, chips e mensagens úteis quando não há combinação exata [4] [5]. | Não usar recomendação opaca nem converter estimativa automática em avaliação definitiva. |
| **Redfin** | Separação Buy/Rent/Sell/Mortgage/Agents; busca por endereço, escola, agente ou ZIP; integração de serviços. | Arquitetura por intenção e busca por entidades; conectar conteúdo e atendimento [6]. | Não replicar escala geográfica e quantidade de páginas de cidades. |
| **Rightmove** | Integração entre busca, House Prices, Mortgages, Find Agent, Commercial e o hub editorial Inspire. | Criar Mercado & Dados e Guias por público dentro do mesmo domínio [7]. | Não transformar o site em grande portal generalista. |
| **StreetEasy** | Hiperlocalidade por bairro e edifício; guias, dados de mercado, filtros de amenidades, curadoria e perfil. | Tratar condomínios/produtos como entidades e conectar busca, guias, dados e curadoria [8]. | Não afirmar cobertura ou “mais completo” sem prova própria; não depender de CAPTCHA/bloqueios para descoberta. |
| **Compass** | Busca premium por cidade, bairro, endereço, escola, agente ou MLS; neighborhoods, market outlook, commercial e new development. | Estética editorial premium, busca por entidade e integração de lifestyle, mercado e desenvolvimento [9]. | Não usar “exclusive” como promessa de estoque; evitar estética aspiracional sem dados. |
| **Airbnb** | Categorias de descoberta, busca progressiva, clareza visual e flexibilidade. | Oferecer categorias por intenção e perfil; permitir relaxar filtros e explorar perfis próximos [10]. | Datas, hóspedes, avaliações e lógica de hospedagem não são transferíveis. |
| **Baymard** | Pesquisa de UX sobre resultado lista + mapa e armadilhas de filtros. | Usar lista/mapa quando a localização for decisiva; evitar sidebar longa e overlays inadequados [11]. | A recomendação foi observada em contexto de hospedagem e deve ser adaptada ao contexto editorial. |
| **MeasuringU** | Benchmark de usabilidade, confiança e lealdade em sites imobiliários. | Priorizar precisão, imagens adequadas, bairro, histórico e testes reais com usuários [12]. | Resultados de 2022 e EUA não são metas numéricas para o Brasil em 2026. |

## 3. O que replicar, melhorar, adaptar e evitar

### 3.1 Replicar

#### A. Entrada de busca simples e imediata

QuintoAndar, Zillow, Redfin, Compass e StreetEasy colocam a busca como porta de entrada forte. A Broker deve manter no primeiro viewport um campo capaz de receber:

```text
bairro, condomínio, torre, produto, tema, pergunta ou combinação de atributos
```

Exemplos:

```text
apartamento de 80 a 120 m², 3 dormitórios, frente parque e sol da manhã
quanto custa morar no Jardim das Perdizes?
Reserva Manacá
Linha 6 Jardim das Perdizes
investir para alugar
```

A busca deve reconhecer termos, sugerir entidades e encaminhar para conteúdo, perfil, guia, estudo ou fluxo consultivo.

#### B. Filtros progressivos e removíveis

O QuintoAndar mostra poucos filtros prioritários na barra e coloca o restante em “Mais filtros”. A Zillow também usa uma barra compacta com operação, preço, quartos, tipo e filtros. A Broker deve replicar o princípio, não necessariamente os mesmos campos.

Filtros iniciais recomendados:

```text
Objetivo | Estágio | Uso | Área | Quartos | Vista | Sol
```

Filtros secundários:

```text
Suítes | Banheiros | Vagas | Pet | Home office | Acessibilidade
Custo | Mobilidade | Condomínio | IPTU | Horizonte | Tipo de operação
```

Os critérios selecionados devem aparecer como chips removíveis, com “Limpar tudo” e resumo da busca.

#### C. Separação por intenção

Redfin, Rightmove, Compass, QuintoAndar e StreetEasy distinguem comprar, alugar, vender, financiar, anunciar, encontrar agente e consumir conteúdo. A Broker deve manter trilhas claras:

```text
Quero morar | Quero investir | Quero vender | Quero alugar meu imóvel | Quero alugar
```

A diferença é que essas trilhas, no início, levam a conhecimento, ferramentas e diagnóstico. A operação comercial aparece depois.

#### D. Conteúdo local e de mercado na mesma arquitetura

Rightmove e StreetEasy não tratam conteúdo como blog isolado. Guias, dados, notícias, preços, bairros, vendedores e locatários fazem parte do produto. Esse padrão deve ser replicado com **Guias do Bairro** e **Mercado & Dados**.

#### E. Busca por entidade

Zillow, Redfin, Compass e StreetEasy aceitam endereço, bairro, escola, agente, prédio, ZIP ou MLS. A Broker deve aceitar os equivalentes locais:

```text
Jardim das Perdizes
Reserva Manacá
Bosque Jequitibá
Parque Jardim das Perdizes
Linha 6-Laranja
Água Branca
Barra Funda
frente parque
sol da manhã
```

O resultado deve explicar se o termo é um condomínio, produto, torre, lugar, tema, fonte ou perfil.

#### F. Estado sem resultado com ajuda

A Zillow recomenda reduzir filtros, ampliar escopo ou buscar características e localização. A Broker deve mostrar:

```text
Não encontramos uma combinação editorial exata.

Você pode:
[Remover sol da manhã]
[Ampliar a faixa de área]
[Ver perfis próximos]
[Leia o guia sobre vista e orientação]
[Receba oportunidades quando surgirem]
```

Nunca exibir uma página vazia ou inventar uma correspondência.

### 3.2 Melhorar

#### A. Transformar filtro em explicação

Portais tratam filtros como rótulos. A Broker deve explicar cada atributo quando ele for tecnicamente ambíguo:

- “Frente parque” precisa de confirmação por implantação, orientação, planta ou visita.
- “Sol da manhã” é uma orientação de exposição, não garantia de luz direta em todos os cômodos.
- “Área” precisa distinguir privativa, útil, total, comercial e depósito.
- “Pronto novo” exige distinção entre entrega, habite-se, condomínio, garantia e disponibilidade.
- “Vista cidade” pode significar vista ampla, parcial, interna ou obstruída.

Cada filtro complexo deve ter tooltip, link para explicação e nível de confirmação.

#### B. Substituir o contador de unidades por contadores de evidência

Portais competem com “39.222 apartamentos” ou “17.060 rentals”. A Broker não deve usar volume como prova. Pode informar:

```text
12 perfis editoriais compatíveis
4 condomínios analisados
7 guias relacionados
2 estudos de mercado
```

Quando houver oportunidades atuais encaminhadas por atendimento, apresentar “oportunidades observadas e verificadas em [data]”, sem transformar essa quantidade em promessa de cobertura.

#### C. Tornar custo e confiança primeira classe

A Loft declara filtros de gastos mensais e condomínio no aplicativo [1]; o QuintoAndar mostra aluguel e total nos cards [3]; MeasuringU identifica confiança, representação adequada e informação de bairro/histórico como drivers importantes [12]. A Broker deve elevar esses elementos:

```text
Preço/aluguel observado
Condomínio observado
IPTU observado
Custo mensal estimado
Data de verificação
Fonte
Nível de evidência
```

Não ocultar custo relevante atrás de formulário, imagem ou contato obrigatório.

#### D. Usar mapa como contexto, não como decoração

O mapa deve responder uma pergunta: “onde isso fica em relação ao parque, portões, comércio, transporte, escolas, eventos e ruas?”. Seguindo a recomendação do Baymard para lista + mapa em contextos de propriedade [11], a Broker deve permitir mapa quando a posição for decisiva, mas não precisa transformar todo artigo em uma tela de mapa.

#### E. Equilibrar estética premium e densidade informacional

Compass demonstra a força de um hero visual premium com busca central, neighborhoods, market outlook, commercial e new development [9]. A Broker pode usar composição sofisticada, imagens de campo, mapas e tipografia consistente, mas deve incluir resposta, fonte, data e limitações logo abaixo do hero. O visual não pode esconder o conteúdo que gera confiança.

### 3.3 Adaptar

#### A. “Buildings” da StreetEasy para “Condomínios e Produtos”

Criar páginas de entidade para cada condomínio/produto relevante, contendo histórico, estágio, metragens observadas, tipos de planta, vista, sol, perfil de usuário, relação com o bairro, custos quando disponíveis, diferenças e fontes. Não transformar automaticamente a página em listagem de unidades.

#### B. “Inspire” da Rightmove para “Guias do Bairro”

Reunir artigos, notícias, estudos, mobilidade, parque, comércio, eventos, sustentabilidade, segurança responsável e rotinas. Cada guia deve ter data de verificação e fontes.

#### C. “Collections”/curadoria da Compass para “Perfis e shortlists consultivas”

O usuário pode salvar um perfil — por exemplo, “80–120 m², 3 dormitórios, frente parque, sol da manhã” — e receber conteúdos e oportunidades compatíveis. A shortlist pode ser enviada por WhatsApp/e-mail quando houver lead consentido, mas o site público continua editorial.

#### D. “Recomendações” da Zillow para recomendações explicáveis

A recomendação deve dizer por que o conteúdo ou perfil apareceu:

```text
Recomendado porque você selecionou:
80–120 m² + 3 dormitórios + frente parque.
```

Não usar pontuação opaca ou declarar “melhor imóvel”.

#### E. Flexibilidade da Airbnb para relaxar filtros

Se não houver “frente parque + sol da manhã + 80–120 m²”, o sistema pode sugerir “vista parcial”, “80–160 m²” ou “orientação a confirmar”, mas deve mostrar exatamente qual critério foi relaxado. O usuário controla o relaxamento.

#### F. Assistente de linguagem natural

A Loft declara busca por características das fotos e o Zillow oferece exemplos de consultas em linguagem natural [1] [5]. A Broker pode implementar uma busca textual em português, mas o resultado inicial deve ser **interpretação + conteúdos + filtros sugeridos**, não uma resposta generativa sem fonte.

### 3.4 Evitar

| Padrão a evitar | Motivo |
|---|---|
| Sidebar vertical gigantesca com dezenas de filtros de uma vez | Aumenta carga cognitiva; Baymard alerta para problemas com filtros em sidebar vertical [11]. |
| Cada combinação de filtros virar uma URL indexável | Cria páginas finas, duplicidade e orçamento de rastreamento desperdiçado. |
| Contador de resultados sem explicar o que está sendo contado | Mistura perfis, artigos, condomínios e oportunidades e gera falsa precisão. |
| “Melhor imóvel”, “maior valorização” ou “mais seguro” sem método | Promessas e ranking sem evidência. |
| “Frente parque” ou “sol da manhã” como verdade automática | Atributos dependem de posição, orientação, altura, ambiente e confirmação. |
| Preço sem data ou sem tipo | Confunde pedido, tabela, repasse, revenda e transação. |
| Hero bonito sem resposta textual | Prejudica entendimento, acessibilidade, SEO, AEO e GEO. |
| Feed infinito que esconde filtros e contexto | Aumenta descoberta superficial e reduz comparação. |
| Pop-up de lead antes de o usuário entender a proposta | Destrói confiança e reduz awareness. |
| Copiar filtros, textos, fotos ou taxonomias protegidas | Risco de propriedade intelectual e falta de diferenciação. |
| Scraping, contorno de CAPTCHA, bloqueio ou paywall | Não é aceitável nem necessário. |

## 4. Benchmark por dimensão

A escala abaixo mede **adequação como referência para a Broker**, de 1 a 5, e não uma nota absoluta do produto.

| Referência | Arquitetura por intenção | Busca por entidade | Filtros | Mapa/contexto | Conteúdo/local | Confiança | Fit para Broker |
|---|---:|---:|---:|---:|---:|---:|---:|
| Loft | 4 | 3 | 5 | 3 | 2 | 3 | 4 |
| QuintoAndar | 5 | 3 | 5 | 5 | 3 | 4 | 4 |
| Zillow | 5 | 5 | 5 | 4 | 4 | 3 | 5 |
| Redfin | 5 | 5 | 4 | 4 | 4 | 4 | 5 |
| Rightmove | 5 | 4 | 4 | 3 | 5 | 4 | 5 |
| StreetEasy | 5 | 5 | 4 | 4 | 5 | 4 | 5 |
| Compass | 5 | 5 | 3 | 3 | 5 | 4 | 5 |
| Airbnb | 4 | 2 | 4 | 5 | 4 | 4 | 3 |

A leitura estratégica é clara: nenhum benchmark resolve sozinho o projeto. **StreetEasy, Rightmove, Compass e Zillow** são as referências mais importantes para arquitetura editorial + descoberta. **QuintoAndar e Loft** são as referências mais úteis para operação de filtros e atributos brasileiros. **Baymard e MeasuringU** funcionam como guardrails de usabilidade e confiança.

## 5. Arquitetura de informação recomendada

### Menu principal

```text
Home
Para Morar
Para Investir
Venda ou Alugue seu Imóvel
Guias do Bairro
Mercado & Dados
```

### CTA universal

```text
Encontre seu perfil ideal
```

### Menu secundário

```text
Sobre a Broker
Fontes e Método
Newsletter
Pesquisar
Contato
```

### Camada “Explorar”

O CTA “Encontre seu perfil ideal” abre o explorador sem necessariamente criar um novo item do menu principal. O explorador permite começar pela intenção ou ir direto aos atributos.

```text
Quero morar
Quero investir
Quero vender
Quero alugar meu imóvel
Quero alugar
Explorar livremente
```

## 6. Modelo da experiência de busca

### Etapa 1 — Busca aberta

Campo com placeholder:

> **Busque por bairro, condomínio, tema ou descreva o que procura**

Autocomplete dividido em grupos:

```text
Entidades: Jardim das Perdizes, Reserva Manacá, Parque Jardim das Perdizes
Lugares: Água Branca, Barra Funda, Perdizes, SESC-Pompeia
Temas: custo, Linha 6, segurança, valorização, aluguel
Perfis: 80–120 m², 3 dormitórios, frente parque, sol da manhã
Serviços: vender meu imóvel, alugar meu imóvel, estudo de investimento
```

### Etapa 2 — Intenção

Pergunta: **“O que você quer descobrir?”**

Cards: morar, investir, vender, alugar seu imóvel, alugar.

### Etapa 3 — Filtros prioritários

Abas horizontais ou barra de chips:

```text
Objetivo | Estágio | Uso | Área | Quartos | Vista | Sol
```

### Etapa 4 — Mais filtros

Painel modal ou bottom sheet no celular:

```text
Suítes | Banheiros | Vagas | Pet | Home office | Acessibilidade
Condomínio | IPTU | Custo total | Mobilidade | Horizonte | Operação
```

### Etapa 5 — Resultado

O resultado deve mostrar:

- interpretação dos filtros;
- quantidade de perfis/editoriais compatíveis;
- cards de perfis, condomínios, guias e estudos;
- mapa opcional para entidades e contexto local;
- chips removíveis;
- ordenação por relevância editorial, atualização ou compatibilidade explicada;
- sugestões de relaxamento caso a combinação seja restritiva;
- CTA para salvar perfil e receber oportunidades.

## 7. Taxonomia dos filtros

### Filtros de intenção

```text
Morar | Investir | Vender | Alugar meu imóvel | Alugar | Pesquisar
```

### Estágio

```text
Na planta | Em construção | Pronto novo | Revenda | Histórico/arquivo
```

### Uso

```text
Residencial | Comercial | Corporativo | Uso misto
```

### Área

```text
Até 80 m²
Mais de 80 até 120 m²
Mais de 120 até 160 m²
Mais de 160 até 200 m²
Mais de 200 m²
```

### Dormitórios e suítes

```text
Studio | 1 | 2 | 3 | 4 | 5+
0 suíte | 1+ | 2+ | 3+ | 4+
```

### Vista

```text
Frente para o parque | Frente para a cidade | Vista interna
Vista parcial | Múltiplas orientações | A confirmar
```

### Insolação

```text
Sol da manhã | Sol da tarde | Manhã e tarde | Luz indireta
Variável por ambiente | A confirmar
```

### Contexto de vida

```text
Famílias | Pets | Home office | Acessibilidade | Mobilidade
Privacidade | Espaço | Lazer | Baixo custo recorrente
```

### Finanças

```text
Preço/faixa | Aluguel/faixa | Condomínio | IPTU | Custo total
Renda | Yield | Horizonte | Reforma | Liquidez observada
```

Os filtros financeiros devem entrar com linguagem de “observado”, “estimado”, “cenário” e “a confirmar”, não como promessa.

## 8. Layout e design recomendados

### 8.1 Princípio visual

A linguagem deve combinar **publicação premium, clareza de produto digital e densidade de informação**. A referência visual pode ser Compass/StreetEasy, mas a clareza funcional deve se aproximar de QuintoAndar/Zillow.

### 8.2 Home

```text
Header enxuto
Hero com busca aberta e CTA Encontre seu perfil
Cinco intenções
Filtros/perfis populares
Guias em destaque
Mercado & Dados
Mapa/contexto local
Ferramentas
Método e fontes
Newsletter
Footer de confiança
```

A busca deve aparecer antes de uma longa apresentação institucional. O site deve manter uma navegação fixa, mas sem transformar cada tela em uma vitrine comercial.

### 8.3 Página de resultados

Em desktop, usar duas colunas quando o mapa acrescentar informação: resultados à esquerda e mapa contextual à direita, em vez de mapa como pano de fundo. O Baymard recomenda split view para permitir compreender a localização, mas alerta para overlay, sidebar longa e anúncios verticais [11].

Em mobile, alternar entre:

```text
Lista | Mapa
```

A barra de filtros deve permanecer acessível e mostrar os critérios ativos.

### 8.4 Densidade dos cards

O card deve ser escaneável, mas não superficial:

```text
Tipo de resultado
Nome do perfil/condomínio/guia
Atributos principais
O que é confirmado
O que depende da unidade
Público compatível
Pontos de atenção
Fonte e data
CTA
```

### 8.5 Imagens

Usar fotos próprias/autorizadas, mapas, diagramas, plantas autorizadas e imagens de campo. A imagem deve apoiar a compreensão, mas toda informação crítica deve estar em HTML. Vídeos precisam de legenda, transcrição, capítulos e fontes.

## 9. Padrões de cards

### Card de perfil

```text
Residencial · Em construção · 80–120 m²
2–3 dormitórios · 1–2 suítes
Perfil: família pequena ou casal com home office
Vista: possibilidade de parque — depende da posição
Sol: a confirmar por orientação/final
Custo: consultar faixa e metodologia
Atualizado em: DD/MM/AAAA
[Entenda este perfil] [Receba oportunidades compatíveis]
```

### Card de condomínio/produto

```text
Reserva/Bosque/Recanto [nome]
Estágio editorial
Faixas de área e tipologias observadas
Uso
Histórico e características
Pontos fortes e limitações
Fontes e data
[Ver análise] [Comparar]
```

### Card de estudo

```text
Mercado & Dados
Preço pedido por m² no Jardim das Perdizes
Amostra, período e método
Última atualização
[Ver metodologia] [Receber próxima edição]
```

### Card de guia

```text
Guia do Bairro
Como é a mobilidade até a Linha 6?
Resposta curta + data + fonte
[Leia o guia]
```

## 10. Página de resultado e zero resultado

### Resultado normal

H1 dinâmico e legível:

> **Perfis residenciais de 80 a 120 m², com 3 dormitórios, frente parque e interesse em sol da manhã**

Subtexto:

> “Esta exploração reúne conteúdos, perfis e entidades compatíveis. Vista, insolação, custos, disponibilidade e preço dependem da unidade e precisam ser confirmados.”

### Zero resultado

```text
Não encontramos conteúdo ou perfil com todos esses critérios.

Tente uma destas opções:
[Ver 80–160 m²]
[Remover “frente parque”]
[Ver “vista a confirmar”]
[Explorar 3 dormitórios]
[Receber alerta de oportunidades]

Enquanto isso, leia:
• Como avaliar vista para o parque
• Sol da manhã: orientação e visita
• Quanto custa morar no Jardim das Perdizes
```

O relaxamento de filtros deve ser explícito, reversível e controlado pelo usuário.

## 11. SEO, AEO e GEO da experiência de filtros

### Indexar

Landing pages com conteúdo próprio e demanda real:

```text
/para-morar/na-planta/
/para-morar/em-construcao/
/para-morar/pronto-novo/
/para-morar/revendas/
/para-morar/ate-80-m2/
/para-morar/80-a-120-m2/
/para-morar/frente-parque/
/para-morar/sol-da-manha/
/para-investir/para-locacao/
/para-investir/estrategia-de-revenda/
```

### Não indexar por padrão

Combinações livres como:

```text
?estagio=construcao&area=80-120&quartos=3&vista=parque&sol=manha
```

Essas combinações devem ser úteis para o usuário, mas não necessariamente gerar milhares de URLs indexáveis. Usar `noindex, follow` e canonicalização adequada, conforme a implementação técnica.

### Bloco AEO em cada landing

```text
Resposta direta
Definição dos filtros
Tabela de atributos
O que é confirmado
O que depende da unidade
Fontes e data
FAQ visível
CTA contextual
```

### Entidade para GEO

Interligar cada página a Jardim das Perdizes, produtos, condomínios, parque, mobilidade, Mercado & Dados, autores e fontes. A página precisa ser citável mesmo sem o usuário interagir com o filtro.

## 12. Confiança, acessibilidade e transparência

O MeasuringU identificou dificuldades em filtros e ordenação, além de problemas de precisão e confiança nos sites imobiliários avaliados [12]. Por isso, a Broker deve testar:

- busca com palavras incompletas e sinônimos;
- combinações de filtros restritivas;
- leitura por teclado e leitor de tela;
- contraste, foco e tamanho de toque;
- retorno ao estado anterior;
- back button;
- persistência de filtros;
- estados de carregamento;
- zero resultados;
- fonte, data e “não informado”.

Acessibilidade não é somente uma camada legal ou técnica. Ela melhora entendimento, rastreabilidade e experiência de todos.

## 13. Dados e governança dos filtros

Cada atributo deve ter:

```text
valor
unidade/definição
fonte
URL
capturado em
verificado em
nível de evidência
responsável
próxima revisão
```

Níveis recomendados:

| Nível | Significado |
|---|---|
| A — fonte primária | Prefeitura, órgão público, memorial, documento oficial ou fonte institucional direta. |
| B — fonte secundária qualificada | Imprensa, estudo acadêmico, associação ou pesquisa identificada. |
| C — observação/mercado | Portal, anúncio, visita, entrevista ou amostra própria, com data e limites. |
| D — opinião | Review, comentário, rede social ou percepção individual. |

O filtro deve mostrar “a confirmar” quando não houver evidência suficiente. Nunca preencher automaticamente com inferência não auditada.

## 14. Roadmap recomendado

| Fase | Entrega |
|---|---|
| 1 | Home com busca aberta, intenções e CTA “Encontre seu perfil ideal”. |
| 2 | Explorador com objetivo, estágio, uso, área, quartos, vista e sol. |
| 3 | Cards de perfil, condomínio, guia e estudo; chips e zero-result recovery. |
| 4 | Páginas indexáveis de filtros principais e hubs editoriais. |
| 5 | Busca em linguagem natural, autocomplete de entidades e mapa contextual. |
| 6 | Alertas de perfil, calculadoras, Data Watch e diagnósticos de venda/locação. |
| 7 | Testes de usabilidade, análise de buscas, melhoria de filtros e novas landing pages. |

## 15. Decisão final

A Broker deve replicar **a estrutura funcional** dos grandes portais, mas não a sua promessa de volume. A melhor combinação é:

| Origem | Padrão a incorporar |
|---|---|
| QuintoAndar | Filtros simples na primeira camada, chips, mapa/lista, custo total e alerta. |
| Loft | Atributos de comodidade, condomínio e gastos mensais; busca por características. |
| Zillow | Busca aberta, linguagem natural, recomendações explicáveis e recuperação de zero resultados. |
| Redfin | Arquitetura por intenção e integração de venda, aluguel, financiamento e agente. |
| Rightmove | Mercado & Dados, guias por público, valuation e conteúdo editorial integrado. |
| StreetEasy | Condomínios/edifícios como entidades, guias de bairro, dados, filtros populares e curadoria. |
| Compass | Estética premium, busca por entidade, lifestyle, bairros, desenvolvimento e agentes. |
| Airbnb | Descoberta por categorias, busca progressiva e flexibilização controlada. |
| Baymard | Lista + mapa quando fizer sentido; evitar sidebar longa, overlays e anúncios intrusivos. |
| MeasuringU | Precisão, confiança, informação do bairro, histórico e teste real com usuários. |

O padrão que a Broker deve criar é uma evolução: **um explorador imobiliário editorial**. O usuário navega por menus, abas, filtros e cards; encontra o perfil que procura; entende os critérios, fontes, custos, trade-offs e limitações; compara caminhos; e só então decide se quer receber uma oportunidade ou falar com a Broker.

Essa é a forma de unir design reconhecido, usabilidade de portal, autoridade editorial, indexação, AEO/GEO e geração de leads qualificados sem transformar o projeto em mais um classificado.

## Referências

[1]: https://apps.apple.com/us/app/loft-im%C3%B3veis/id1582516551 "Loft Imóveis — descrição oficial do aplicativo na App Store"
[2]: https://www.quintoandar.com.br/ "QuintoAndar — homepage observada"
[3]: https://www.quintoandar.com.br/alugar/imovel/sao-paulo-sp-brasil/apartamento "QuintoAndar — página de resultados observada"
[4]: https://www.zillow.com/ "Zillow — homepage observada"
[5]: https://www.zillow.com/homes/for_sale/ "Zillow — página de resultados observada"
[6]: https://www.redfin.com/ "Redfin — homepage observada"
[7]: https://www.rightmove.co.uk/ "Rightmove — homepage observada"
[8]: https://streeteasy.com/ "StreetEasy — homepage observada"
[9]: https://www.compass.com/ "Compass — homepage observada"
[10]: https://www.airbnb.com/ "Airbnb — homepage observada"
[11]: https://baymard.com/blog/accommodations-split-view "Baymard Institute — layout split view em busca de propriedades"
[12]: https://measuringu.com/real-estate-benchmark-2022/ "MeasuringU — benchmark de UX e NPS de sites imobiliários"
