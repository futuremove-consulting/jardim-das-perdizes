# Cards e fichas técnicas de imóveis, tipologias e condomínios

## Jardim das Perdizes Broker

**Objetivo:** definir como apresentar, filtrar, comparar e aprofundar informações de **condomínios/produtos, torres, tipologias/plantas e unidades específicas**, mantendo o site capaz de gerar tráfego, autoridade, leads e descoberta por qualquer parâmetro relevante.

**Princípio:** cada nível de entidade deve ter seu próprio card, sua própria ficha técnica, seus próprios atributos e seu próprio grau de atualização. Não se deve misturar automaticamente dado de condomínio com dado de tipologia, nem dado de tipologia com dado de unidade.

> **Regra de ouro:** o condomínio explica o contexto; a torre explica a posição; a tipologia explica a planta; a unidade explica a oportunidade concreta.

## 1. Hierarquia de entidades

A estrutura recomendada é uma hierarquia de cinco níveis:

```text
Jardim das Perdizes — complexo/bairro planejado
    ↓
Produto/condomínio — Reserva Figueiras, Bosque Jequitibá etc.
    ↓
Torre/bloco — identificação da torre e sua posição
    ↓
Tipologia/planta — 80 m², 3 dormitórios, final, layout e padrão construtivo
    ↓
Unidade — andar, final, vista, sol, preço, condição e disponibilidade
```

### 1.1 Diferença entre os níveis

| Nível | O que representa | O que é relativamente estável | O que muda com frequência |
|---|---|---|---|
| Complexo | O ecossistema Jardim das Perdizes e seu entorno. | História, localização, parque, mobilidade, urbanismo e entidades. | Obras, transporte, comércio e eventos. |
| Produto/condomínio | Empreendimento, fase ou condomínio com nome próprio. | Nome, incorporadora, arquitetura, tipos de planta, áreas comuns, estágio e histórico. | Estoque, preço, obra, condomínio, regras e disponibilidade. |
| Torre/bloco | Edificação ou bloco dentro do produto. | Nome, implantação, posição, número de pavimentos, acessos e relação espacial. | Obras, vizinhança, vista efetiva e manutenção. |
| Tipologia/planta | Modelo repetível de unidade. | Área, quartos, suítes, banheiros, layout, vagas típicas e posição prevista. | Condições comerciais, disponibilidade, pequenas variações documentais. |
| Unidade | Imóvel concreto identificado por torre, andar, final ou código interno. | Características físicas, matrícula, planta aplicada e posição. | Preço, ocupação, reforma, mobília, anúncio, disponibilidade e negociação. |

### 1.2 Nomenclatura no site

Usar rótulos fáceis para o usuário, mas manter a nomenclatura técnica no banco de dados:

```text
Condomínio/produto
Torre ou bloco
Tipologia/planta
Unidade específica
```

Quando a distinção entre produto, condomínio e subcondomínio não estiver documentalmente clara, usar “produto/condomínio” na interface e marcar a classificação como “a confirmar”. Não converter automaticamente material de marketing em classificação jurídica.

## 2. Regras de publicação por nível

| Entidade | Visibilidade pública | SEO | Atualização | Principal função |
|---|---|---|---|---|
| Complexo | Pública | Indexável | Trimestral ou quando houver mudança relevante. | Awareness e autoridade hiperlocal. |
| Produto/condomínio | Pública | Indexável quando houver conteúdo suficiente. | Mensal/trimestral conforme dados. | Entidade, comparação e decisão. |
| Torre/bloco | Pública ou incorporada à ficha do produto. | Indexável apenas se houver conteúdo original suficiente. | Quando documentos/implantação mudarem. | Contexto de posição, acessos e vista. |
| Tipologia/planta | Pública | Indexável se houver demanda e conteúdo substancial. | Quando memorial, planta ou dados forem revisados. | Comparação de perfis e filtros. |
| Unidade | Pública, privada ou encaminhada no atendimento. | Preferencialmente noindex se dinâmica e transacional. | A cada alteração de preço/status. | Oportunidade concreta e lead quente. |

A existência de ficha pública de unidade não obriga a sua indexação. Para um site cuja força é editorial, a recomendação inicial é indexar o condomínio e tipologias com conteúdo real e usar unidades específicas em área dinâmica, privada, noindex ou integrada ao atendimento, conforme autorização, estratégia e capacidade de atualização.

## 3. Card de condomínio/produto

### 3.1 Função do card

O card de condomínio deve ajudar o usuário a reconhecer, comparar e decidir se vale a pena aprofundar. Não deve parecer um anúncio de unidade. Deve responder: **o que é, em que estágio está, para quem faz sentido e o que ainda precisa ser verificado**.

### 3.2 Estrutura visual

```text
[Imagem principal autorizada / implantação / diagrama]

Reserva Figueiras
Produto/condomínio · Pronto novo

Residencial · [número de torres se confirmado]
Faixas de área: 157–189 m² observados
Tipologias: [quartos/suítes conforme fonte]
Vista: parque/cidade/interna — depende da torre e unidade

Leitura rápida:
Perfil de alto padrão para [público/uso], com [atributo confirmado].

Pontos de atenção:
Custos, vista, sol, disponibilidade e condição variam por unidade.

Verificado em: DD/MM/AAAA · Fonte: [link]

[Ver ficha do condomínio] [Comparar]
```

### 3.3 Atributos do card

| Grupo | Atributos |
|---|---|
| Identidade | Nome comercial; nome técnico; aliases; incorporadora; desenvolvedora; SPE quando confirmada; arquiteto; paisagismo; interiores; ID interno. |
| Classificação | Produto, condomínio, fase, subcondomínio; residencial, comercial, corporativo ou misto; histórico/atual. |
| Estágio | Na planta; em construção; pronto novo; entregue; revenda; histórico/arquivo; data e fonte do status. |
| Localização | Endereço; CEP; bairro conforme fonte; relação com Jardim das Perdizes; mapa; portão/acesso; fonte. |
| Escala | Torres; blocos; pavimentos; unidades; área do terreno; áreas comuns; números somente se escopo confirmado. |
| Tipologias | Área mínima/máxima; quartos; suítes; banheiros; vagas; depósitos; duplex/garden/cobertura. |
| Experiência | Vista; orientação; sol; privacidade; ruído potencial; parque; lazer; acessibilidade; coworking/home office. |
| Mercado | Preço pedido observado; aluguel observado; condomínio/IPTU quando houver; período; amostra; não apresentar como transação. |
| Público | Moradia; família; pet; profissional; investidor; locador; comercial/corporativo. |
| Confiança | Fonte; data de publicação; data de verificação; nível de evidência; limitações; responsável. |
| Conversão | Comparar; receber guia; salvar perfil; receber oportunidades; solicitar estudo. |

### 3.4 O que não colocar no card

Não incluir “melhor condomínio”, “maior valorização”, “vista garantida”, “segurança total”, “últimas unidades” ou “oportunidade imperdível” sem evidência e data. Não usar preço de uma unidade como se fosse faixa do condomínio inteiro.

## 4. Ficha técnica de condomínio/produto

### 4.1 Cabeçalho

```text
Breadcrumb: Jardim das Perdizes > Condomínios e produtos > [Nome]

H1: [Nome]: perfil, plantas, estágio, características e pontos de atenção

Resposta direta: 60–100 palavras
Status editorial: [atual/histórico/a confirmar]
Publicado em: DD/MM/AAAA
Verificado em: DD/MM/AAAA
Autor e responsável técnico/editorial
```

O resumo deve dizer o que está confirmado, em que escopo e para quem a ficha é útil. Se houver divergências históricas ou de metragem, elas devem aparecer no texto, e não ser escondidas em nota de rodapé.

### 4.2 Estrutura da ficha

| Seção | Conteúdo |
|---|---|
| Visão geral | O que é o produto, onde se encaixa no complexo, finalidade e estágio. |
| História | Lançamento, fase, entregas, mudanças e distinção entre plano original e estado atual. |
| Ficha técnica | Incorporadora, desenvolvedora, arquitetura, paisagismo, interiores, número de torres/pavimentos/unidades quando confirmado. |
| Tipologias | Tabela de áreas, dormitórios, suítes, banheiros, vagas, depósitos e formatos. |
| Implantação | Torres, acessos, parque, cidade, ruas, áreas comuns e circulação. |
| Vista e sol | O que pode ser inferido da implantação; o que depende de torre/final/andar; como confirmar. |
| Uso e perfil | Morador, família, pet, home office, investidor, locatário e uso comercial. |
| Áreas e serviços | Lazer, acessibilidade, sustentabilidade, segurança operacional, bicicletário e infraestrutura, sempre por fonte. |
| Custos | Preço pedido e aluguel observados; condomínio/IPTU quando disponíveis; metodologia e data. |
| Mercado | Oferta primária/secundária, preço/m² observado, aluguel e limitações da amostra. |
| Pontos fortes | Evidências ou atributos verificáveis. |
| Pontos de atenção | Custos, status, divergências, ruído, obra, acesso, regras e informação não confirmada. |
| Documentos | Memorial, RI, convenção, regulamento, ficha pública e fontes. Não publicar dados pessoais. |
| FAQ | Perguntas reais sobre estágio, planta, custo, parque, vista, sol e compra/locação. |
| Relacionados | Outras fichas, guias, relatórios, comparadores, calculadoras e artigos. |
| CTA | Comparar perfil; receber oportunidades; estudo de investimento; guia; conversa consultiva. |
| Fontes | Referências numeradas e data de consulta. |

### 4.3 Tabela técnica exemplo

| Campo | Valor | Fonte | Verificado em | Confiança |
|---|---|---|---|---|
| Estágio | Pronto novo / a confirmar | Fonte oficial/documental | DD/MM/AAAA | A/B/C |
| Uso | Residencial | Ficha/documento | DD/MM/AAAA | A/B |
| Área observada | Faixa em m² | Planta/memorial/anúncios | DD/MM/AAAA | A/B/C |
| Dormitórios | Faixa | Planta/ficha | DD/MM/AAAA | A/B |
| Suítes | Faixa | Planta/ficha | DD/MM/AAAA | A/B |
| Vagas | Conforme tipologia/unidade | Memorial/anúncio | DD/MM/AAAA | B/C |
| Vista | Depende da posição | Implantação/visita | DD/MM/AAAA | B/C |
| Sol | Depende da orientação | Implantação | DD/MM/AAAA | B/C |
| Preço | Preço pedido observado | Amostra datada | DD/MM/AAAA | C |
| Aluguel | Aluguel pedido observado | Amostra datada | DD/MM/AAAA | C |
| Condomínio/IPTU | Quando informado | Anúncio/documento | DD/MM/AAAA | B/C |

## 5. Card de torre/bloco

A torre pode ser uma camada própria quando a posição altera muito a experiência. Caso contrário, seus dados devem aparecer na ficha do produto e na tipologia.

```text
Torre [nome]
Produto: [condomínio]
Posição: [parque/cidade/interna/lateral]
Pavimentos: [confirmado/a confirmar]
Tipologias associadas: [áreas e dormitórios]
Acessos: [fonte]
Vista/sol: orientação e grau de confirmação
Pontos de atenção: ruído, obra, vizinhança, circulação
[Ver tipologias] [Comparar torres]
```

### Atributos de torre

```text
nome_torre
alias
produto_id
condominio_id
posicao_implantacao
frente_principal
orientacao_geografica
relacao_parque
relacao_cidade
numero_pavimentos
numero_elevadores
acessos
subcondominio
tipologias_associadas
vista_predominante
sol_predominante
ruido_potencial
fase_obra
fonte_implantacao
verificado_em
nivel_evidencia
```

Não assumir que uma torre é “melhor”. Apresentar trade-offs: vista, sol, privacidade, ruído, proximidade de acesso e eventual obra.

## 6. Card de tipologia/planta

### 6.1 Função do card

O card de tipologia é o principal instrumento para o usuário que sabe o perfil que deseja, mas ainda não escolheu condomínio ou unidade. Deve apresentar a planta como **modelo de uso** e não apenas como metragem.

```text
[Planta autorizada / diagrama simplificado]

Tipologia 157 m² · 3 suítes · 2/3 vagas
Residencial · Pronto novo / produto relacionado

Área privativa: 157 m²
Dormitórios: 3 · Suítes: 3
Vagas: conforme planta/memorial
Formato: [padrão/duplex/garden/cobertura]

Perfil de uso:
Família que busca suítes e home office, sujeito ao layout.

Vista e sol:
Variam por torre, final e andar.

[Ver ficha da tipologia] [Comparar planta]
[Receber oportunidades compatíveis]
```

### 6.2 Atributos da tipologia

| Grupo | Atributos |
|---|---|
| Identidade | Nome/código da tipologia; produto; condomínio; torre(s); final(is); versão da planta. |
| Área | Área privativa; área útil quando definida; área total; área de depósito; área externa; unidade de medida. |
| Ambientes | Dormitórios; suítes; banheiros; lavabo; sala; cozinha; varanda; escritório; serviço; despensa. |
| Circulação | Integração sala/cozinha; separação social/íntima; acessibilidade; elevador privativo; hall. |
| Vagas | Número; tipo; localização; vagas fixas/indeterminadas; depósito associado. |
| Formato | Padrão; garden; cobertura; duplex; triplex; junção de unidades; mobiliada como referência. |
| Orientação | Finais compatíveis; orientações possíveis; vista; sol; ventilação; dependência de torre/andar. |
| Perfil | Família; casal; home office; pet; investidor; locação; comercial/corporativo se aplicável. |
| Custos | Faixa de preço pedido; aluguel observado; condomínio/IPTU da amostra; custo por m². |
| Evidência | Planta, memorial, ficha, visita, anúncio, fonte, data e nível de confirmação. |

### 6.3 Estrutura da ficha de tipologia

1. **Resumo da tipologia:** para quem pode fazer sentido e qual é o trade-off principal.
2. **Planta legível:** imagem autorizada e versão textual/HTML com ambientes e medidas quando disponíveis.
3. **Tabela de atributos:** área, dormitórios, suítes, banheiros, vagas, depósito e formato.
4. **Distribuição:** ambientes, circulação, integração, privacidade e possibilidades de uso.
5. **Variações:** diferença entre finais, torres, espelhos, duplex, garden ou cobertura.
6. **Vista, sol e ventilação:** hipóteses por orientação e o que precisa ser confirmado.
7. **Condomínios/produtos onde aparece:** links para entidades relacionadas.
8. **Custos:** preço/aluguel observados e custos recorrentes, sem transformar amostra em média universal.
9. **Pontos fortes e limitações:** linguagem equilibrada.
10. **Perguntas frequentes:** “cabe home office?”, “qual é a diferença para 188 m²?”, “tem depósito?”.
11. **Comparador:** até três tipologias.
12. **CTA:** receber oportunidades ou solicitar curadoria por perfil.
13. **Fontes, versão da planta e data.**

## 7. Card de unidade específica

### 7.1 Função

O card de unidade serve para a etapa de intenção alta. Ele pode aparecer em resultado filtrado, área privada, atendimento ou página pública autorizada. É muito mais dinâmico e exige atualização rigorosa.

```text
[Foto autorizada / planta / vista]

Apartamento 3 dormitórios · 157 m²
[Condomínio] · Torre [X] · [andar, se autorizado]

R$ [preço pedido] · Verificado em [data]
Condomínio: R$ [valor/data] · IPTU: R$ [valor/data]

3 dormitórios · 3 suítes · 2/3 vagas
Vista: frente parque — confirmado por [fonte]
Sol: manhã — orientação [fonte]
Estado: novo/reformado/mobiliado/vazio

Pontos de atenção: [obra, reforma, custo, documentação]

[Ver ficha] [Comparar] [Solicitar visita/análise]
```

### 7.2 Atributos obrigatórios da unidade

| Grupo | Atributos |
|---|---|
| Identificação | ID interno; código de atendimento; produto; condomínio; torre; bloco; andar; final; unidade; origem/autorização. |
| Operação | Venda; aluguel; repasse; revenda; cessão; comercial; corporativo; data de entrada; data de atualização. |
| Preço | Preço pedido; aluguel pedido; condomínio; IPTU; seguro; custo total estimado; moeda; condição; aceita financiamento; aceita permuta, se confirmado. |
| Física | Área privativa; área útil; área total; depósito; área externa; dormitórios; suítes; banheiros; lavabo; vagas. |
| Posição | Torre; final; andar; orientação; frente parque/cidade; vista; sol; ventilação; ruído potencial; proximidade de elevador/lixeira/rua, se verificado. |
| Estado | Novo; usado; reformado; original; mobiliado; semimobiliado; ocupado; vazio; alugado; previsão de desocupação. |
| Documentação | Matrícula analisada ou não; ônus informado; condomínio/IPTU; convenção; reforma autorizada; pendências; nível de verificação. |
| Mídia | Fotos autorizadas; planta; vídeo; tour; data; fotógrafo; autorização de terceiros. |
| Confiança | Fonte; data; responsável; validade; nível A/B/C/D; observações. |
| Conversão | Favoritar; comparar; solicitar ficha; receber proposta; agendar visita; falar com especialista. |

### 7.3 O que não deve ser público por padrão

Não publicar matrícula, documentos pessoais, dados de proprietário, telefone particular, número completo de unidade quando houver risco de privacidade, informações de segurança, rotinas de moradores, códigos de acesso, fotos com documentos, rostos de terceiros, placas ou qualquer dado que não seja necessário à decisão pública.

## 8. Ficha técnica de unidade

### 8.1 Cabeçalho

```text
[Operação] · [tipo] · [área] · [condomínio]

H1: [Tipo] de [área] no [condomínio]: planta, posição, custos e condições

Preço/aluguel pedido: [valor] — verificado em [data]
Disponibilidade: confirmada em [data] / a confirmar
Fonte: [origem autorizada]
```

O título não deve usar “oportunidade única”, “imperdível” ou “abaixo do mercado” sem análise comparativa publicada.

### 8.2 Estrutura da ficha

| Seção | Conteúdo |
|---|---|
| Resumo executivo | Por que a unidade pode ser relevante e para qual perfil. |
| Identificação | Condomínio, torre, andar, final/código, operação e status. |
| Características físicas | Área, dormitórios, suítes, banheiros, vagas, depósito e formato. |
| Planta e distribuição | Imagem autorizada, descrição textual, medidas e variações. |
| Posição | Vista, orientação, sol, ventilação, ruído e relação com acessos. |
| Estado | Original, reformada, mobiliada, ocupada, vazia e obras. |
| Custos | Preço/aluguel, condomínio, IPTU, seguro, manutenção, entrada e custo mensal estimado. |
| Comparáveis | Tipologia e amostra de produtos/unidades semelhantes, com data e método. |
| Documentação | O que foi recebido/analisado e o que falta. |
| Pontos fortes | Fatos e observações verificáveis. |
| Pontos de atenção | Limitações, custos, obras, regras, vista/sol a confirmar. |
| Galeria | Fotos autorizadas, planta, vídeo e legenda. |
| FAQ | Perguntas transacionais e de uso. |
| CTA | Falar, solicitar documentos, visita ou receber análise. |
| Atualização | Histórico de preço/status e próxima revisão. |

### 8.3 Status de disponibilidade

Usar estados explícitos:

```text
Disponibilidade confirmada em DD/MM/AAAA
Disponibilidade a confirmar
Em negociação
Reservada
Alugada
Vendida
Indisponível
Arquivo editorial
```

Nunca deixar uma ficha dinâmica antiga parecer uma oferta atual. Quando a unidade sair, redirecionar para tipologia/condomínio ou transformá-la em case/arquivo, com aviso claro.

## 9. Comparador

O comparador deve permitir comparar até três entidades do mesmo nível:

```text
Condomínio x condomínio
Tipologia x tipologia
Unidade x unidade
```

Não misturar níveis sem explicar. Uma unidade pode ser comparada a outras unidades; uma tipologia pode ser comparada a outra tipologia; um condomínio pode ser comparado a outro condomínio.

### Tabela comparativa

| Critério | Condomínio/produto | Tipologia/planta | Unidade |
|---|---|---|---|
| O que compara | História, estágio, uso, áreas, perfil e custos observados. | Área, layout, quartos, suítes, vagas e perfil. | Preço, posição, estado, custos, documentação e disponibilidade. |
| Preço | Faixa/amostra. | Faixa/amostra. | Preço pedido específico. |
| Vista/sol | Possibilidades e limites. | Possibilidades por finais/torres. | Posição confirmada ou a confirmar. |
| Mercado | Oferta, aluguel, demanda e liquidez observada. | Público e faixa. | Comparáveis e tempo observado. |
| CTA | Ver estudo/guia. | Receber curadoria. | Falar, visita ou proposta. |

## 10. Filtros alimentados pelos cards e fichas

Os filtros devem ser baseados em campos normalizados e mostrar quando o dado é confirmado ou não informado.

### Filtros principais

```text
Nível: condomínio | tipologia | unidade
Objetivo: morar | investir | vender | alugar | comparar
Operação: venda | aluguel | repasse | revenda | comercial/corporativo
Estágio: na planta | em construção | pronto novo | revenda | histórico
Área: até 80 | 80–120 | 120–160 | 160–200 | mais de 200 m²
Dormitórios: studio | 1 | 2 | 3 | 4 | 5+
Suítes: 0 | 1+ | 2+ | 3+ | 4+
Vagas: 0 | 1 | 2 | 3+
Vista: parque | cidade | interna | parcial | múltipla | a confirmar
Sol: manhã | tarde | manhã e tarde | variável | a confirmar
Perfil: família | pet | home office | acessibilidade | investidor
Custos: preço | aluguel | condomínio | IPTU | custo total
```

### Regra de confirmação

O filtro deve permitir:

```text
Confirmado
Observado em fonte secundária
Inferido da implantação
Relatado, não confirmado
Não informado
```

A interface pode oferecer “incluir a confirmar”, mas deve deixar isso visível. Não apresentar uma unidade com “sol da manhã” se a informação foi apenas inferida sem aviso.

## 11. SEO, AEO e GEO

### Condomínio/produto

Normalmente é a melhor entidade para indexação. Deve ter H1, resumo, tabela, FAQ, fontes, data, links para tipologias, guias, mercado e comparadores. Schema possível: `Article`, `Place`, `Residence` ou entidade compatível com a implementação e com o que estiver visível.

### Tipologia/planta

Pode ser indexável quando houver conteúdo substancial e demanda real. A página deve responder “para quem é”, “qual a diferença para outra área”, “como é a planta”, “quais custos” e “o que depende da unidade”.

### Unidade

Páginas específicas são dinâmicas e podem gerar conteúdo duplicado e desatualizado. Usar `noindex` ou área privada quando apropriado; só indexar páginas com autorização, estabilidade, conteúdo único, dados atualizados e valor de busca claro. Nunca deixar preço, disponibilidade e status antigos indexados.

### Card não substitui conteúdo

O card deve levar a uma página completa. Não esconder informação essencial apenas em imagem ou tooltip. A resposta principal, atributos, data e fonte devem estar em HTML acessível.

## 12. Padrão de confiança e governança

Todo card e ficha deve conter:

```text
Fonte
URL
Capturado em
Verificado em
Responsável
Nível de evidência
Validade/next review
Limitação
```

### Níveis de evidência

| Nível | Exemplos |
|---|---|
| A — primária | Prefeitura, órgão público, memorial, matrícula/documento, fonte oficial do produto. |
| B — qualificada | Imprensa, Secovi, estudo acadêmico, associação, pesquisa identificada. |
| C — observada | Portal, anúncio, visita, foto de campo, amostra própria, entrevista. |
| D — opinião | Review, comentário, rede social, percepção individual. |

O campo “fonte” deve acompanhar o atributo quando houver risco de interpretação, especialmente preço, área, vista, sol, estágio, segurança, mobilidade e disponibilidade.

## 13. Card responsivo e acessível

No desktop, o card pode usar imagem à esquerda e dados à direita; no mobile, imagem no topo, atributos em duas linhas e ações no rodapé. O botão principal deve ser grande e ter texto específico:

```text
Ver análise do condomínio
Ver ficha da tipologia
Comparar plantas
Receber oportunidades compatíveis
Solicitar análise do imóvel
```

Evitar ícones sem legenda, texto sobre imagem com baixo contraste, carrossel sem controle de teclado, autoplay, excesso de selos e campos escondidos.

## 14. Relação entre card, ficha e CRM

| Ação do usuário | Dados que podem ir para o CRM |
|---|---|
| Abriu card de condomínio | Entidade, estágio, área/interesse, origem e data. |
| Comparou tipologias | Tipologias, critérios, objetivo e profundidade. |
| Filtrou vista/sol | Preferências e nível de intenção. |
| Salvou perfil | Combinação de atributos e frequência. |
| Pediu oportunidades | Nome, canal, prazo, objetivo, orçamento e consentimento. |
| Pediu diagnóstico | Tipo de proprietário, condomínio, área, operação e urgência. |
| Abriu ficha de unidade | ID interno, produto, tipologia e ação, sem guardar informação sensível desnecessária. |

## 15. Recomendação final

A arquitetura ideal não é “um card único para tudo”. É um sistema de componentes que respeita a hierarquia:

```text
Card de condomínio
    ↓ ficha técnica de condomínio
Card de torre, quando relevante
    ↓ ficha de torre/implantação
Card de tipologia/planta
    ↓ ficha técnica de tipologia
Card de unidade
    ↓ ficha dinâmica de unidade e atendimento
```

O **card** deve permitir escaneabilidade, comparação e escolha rápida. A **ficha técnica** deve permitir compreensão, verificação, educação e decisão. O condomínio responde “o que é”; a tipologia responde “como é a planta”; a unidade responde “qual é a oportunidade concreta, em que condição e com quais custos”.

A recomendação é iniciar com três componentes públicos e um componente transacional opcional:

1. **Card/ficha de condomínio ou produto**, indexável e editorial.
2. **Card/ficha de tipologia/planta**, indexável quando houver conteúdo e demanda.
3. **Card/ficha de torre/implantação**, incorporado quando a posição for decisiva.
4. **Card/ficha de unidade**, dinâmica, atualizada e preferencialmente noindex/privada no início.

Assim, a Broker consegue oferecer filtros avançados — estágio, residencial/comercial, área, quartos, suítes, vista, sol, custos e perfil — sem perder autoridade editorial, e ainda entrega ao lead quente a informação concreta necessária quando ele estiver pronto para avançar.
