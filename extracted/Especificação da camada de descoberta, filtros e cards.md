# Especificação da camada de descoberta, filtros e cards

## Jardim das Perdizes Broker — site editorial com inteligência imobiliária

**Modelo:** conteúdo indexável + descoberta guiada + matching consultivo  
**Não é:** portal genérico de anúncios ou catálogo público obrigatório de unidades  
**Objetivo:** permitir que o usuário explore perfis de imóveis e conteúdos por diversos parâmetros, encontre o caminho mais compatível e deixe um lead qualificado para receber oportunidades atuais.

## 1. Decisão estrutural

A definição correta não é escolher entre “site de conteúdo” e “site com filtros”. O projeto deve ter duas camadas complementares:

| Camada | O que o usuário vê | Função |
|---|---|---|
| **Camada editorial indexável** | Guias, estudos, páginas de perfil, comparadores, glossário, mapas, entidades e relatórios. | Atrair tráfego, gerar autoridade, ser citado por Google/LLMs e educar. |
| **Camada de descoberta e matching** | Abas, filtros, cards e resultados por atributos. | Ajudar o usuário a formular o imóvel ideal e revelar intenção comercial. |

O filtro não precisa exibir unidades específicas. Ele pode produzir **perfis, condomínios, tipologias, estudos e conteúdos compatíveis** e, ao final, oferecer o recebimento privado de oportunidades atuais. Assim, o site preserva seu caráter editorial, mas não perde a capacidade de encaminhar o usuário a um imóvel real.

> **Modelo recomendado:** “Explore por qualquer critério; entenda o perfil; receba oportunidades compatíveis quando quiser.”

## 2. Menu principal revisado

```text
Home
Para Morar
Para Investir
Venda ou Alugue seu Imóvel
Guias do Bairro
Mercado & Dados
```

CTA persistente no cabeçalho:

```text
Encontre seu perfil ideal
```

Menu secundário:

```text
Sobre a Broker
Fontes e Método
Newsletter
Pesquisar
Contato
```

### Por que o CTA “Encontre seu perfil ideal” é importante

Ele cria uma porta de entrada transversal. O usuário não precisa saber se deve começar em “Para Morar”, “Para Investir”, “Na planta” ou “Revendas”. Ele pode iniciar por parâmetros concretos: área, quartos, suítes, vista, insolação, uso, estágio, objetivo ou orçamento.

O CTA deve levar a uma interface de descoberta, não a uma página de anúncios:

```text
/encontre-seu-perfil/
```

## 3. Árvore de menus e submenus

### 3.1 Para Morar

```text
Para Morar
├── Como é morar no Jardim das Perdizes?
├── Encontre seu perfil de moradia
├── Por estágio
│   ├── Na planta
│   ├── Em construção
│   ├── Pronto novo
│   └── Revendas
├── Por tipo de uso
│   ├── Residencial
│   └── Comercial e corporativo
├── Por área
│   ├── Até 80 m²
│   ├── De 80 a 120 m²
│   ├── De 120 a 160 m²
│   ├── De 160 a 200 m²
│   └── Mais de 200 m²
├── Por dormitórios e suítes
├── Por vista e insolação
│   ├── Frente para o parque
│   ├── Frente para a cidade
│   ├── Sol da manhã
│   └── Sol da tarde
├── Família, pets e home office
├── Custos e rotina
├── Pontos fortes e limitações
└── Checklist antes de decidir
```

### 3.2 Para Investir

```text
Para Investir
├── Tese de investimento no Jardim das Perdizes
├── Encontre o perfil de investimento
├── Para renda e locação
│   ├── Residencial para locação
│   ├── Comercial/corporativo para renda
│   ├── Custos e yield
│   └── Vacância e demanda
├── Estratégia de revenda
│   ├── Perfil de liquidez
│   ├── Preço de entrada
│   ├── Horizonte e riscos
│   └── Saída e comparáveis
├── Por estágio
│   ├── Na planta
│   ├── Em construção
│   ├── Pronto novo
│   └── Revendas
├── Por área, tipologia e vista
├── Valorização: dados e cenários
├── Mercado, oferta e demanda
├── Riscos e due diligence
├── Calculadora de cenários
└── Solicite um estudo personalizado
```

### 3.3 Venda ou Alugue seu Imóvel

```text
Venda ou Alugue seu Imóvel
├── Quero vender
├── Quero alugar
├── Venda ou aluguel: como decidir?
├── Como avaliamos valor e renda
├── Comparáveis por área, torre, vista e condição
├── Como preparar o imóvel
├── Documentação
├── Plano de divulgação
├── Acompanhamento de contatos e visitas
└── Solicite um diagnóstico
```

### 3.4 Guias do Bairro

```text
Guias do Bairro
├── Guia completo
├── Onde fica?
├── Perdizes, Água Branca ou Barra Funda?
├── Parque Jardim das Perdizes
├── Mobilidade e Linha 6
├── Comércio e serviços
├── Educação e saúde
├── Cultura, lazer e eventos
├── Segurança, privacidade e governança
├── Rotina por perfil
├── Pontos fortes e limitações
└── Mapa e diretório local
```

### 3.5 Mercado & Dados

```text
Mercado & Dados
├── Data Watch
├── Preços pedidos
├── Preço por m²
├── Aluguéis observados
├── Condomínio e IPTU
├── Preço pedido x preço fechado
├── Histórico de lançamentos
├── Valorização nominal x real
├── Oferta, demanda e liquidez
├── Obras e lançamentos
├── Relatórios
└── Fontes, método e changelog
```

## 4. Taxonomia de filtros

Os filtros devem ser pensados como atributos de entidades e perfis, não apenas como campos de anúncios. Todo atributo precisa ter fonte, data, grau de confirmação e possibilidade de “não informado”. Nunca transformar ausência de dado em “não possui”.

### 4.1 Filtros de intenção

| Filtro | Opções |
|---|---|
| O que você quer fazer? | Morar; investir; vender; alugar seu imóvel; alugar um imóvel; apenas pesquisar. |
| Objetivo | Moradia própria; renda de locação; possível revenda; preservação patrimonial; comparação de bairros; entendimento do mercado. |
| Momento | Apenas aprender; pesquisar opções; decidir em até 3 meses; decidir em 3–6 meses; mais de 6 meses; sem prazo. |

Esse bloco é usado para personalizar conteúdo e CRM, não necessariamente para indexação.

### 4.2 Estágio do imóvel/produto

| Filtro | Definição editorial |
|---|---|
| **Na planta** | Produto em fase de aprovação, lançamento ou comercialização inicial, com atenção a RI, memorial, aprovação e condições. |
| **Em construção** | Obra iniciada, com acompanhamento de etapas, cronograma e riscos. |
| **Pronto novo** | Produto novo ou recém-entregue, com checagem de entrega, habite-se, condomínio, garantia e ocupação. |
| **Revenda** | Unidade do mercado secundário, com histórico, condição, reforma, documentação e negociação própria. |
| **Histórico/arquivo** | Produto ou fase usada para pesquisa, não apresentada como oferta atual. |

O estágio precisa ser datado. “Pronto novo” não deve ser aplicado apenas porque a página comercial diz “pronto para morar”; a Broker deve distinguir status observado, entrega, documentação e disponibilidade.

### 4.3 Finalidade e uso

| Filtro | Opções |
|---|---|
| Uso | Residencial; comercial; corporativo; uso misto; histórico/planejado. |
| Finalidade | Moradia; renda de aluguel; revenda; escritório; consultório; loja/serviço; patrimônio. |
| Ocupação | Morar; alugar; trabalhar; investir; combinar usos, quando permitido. |

“Residencial/comercial” deve ser um filtro global, pois atende tanto “Para Morar” quanto “Para Investir”. No menu “Para Morar”, o bloco comercial pode aparecer como conteúdo sobre o ecossistema de uso misto, mas não como promessa de moradia.

### 4.4 Faixas de área

Para evitar sobreposição, usar limites matemáticos claros:

| Rótulo exibido | Regra de filtro |
|---|---|
| Até 80 m² | `área ≤ 80` |
| Mais de 80 até 120 m² | `80 < área ≤ 120` |
| Mais de 120 até 160 m² | `120 < área ≤ 160` |
| Mais de 160 até 200 m² | `160 < área ≤ 200` |
| Mais de 200 m² | `área > 200` |

Na interface, pode-se simplificar para “80–120 m²”, mas a definição deve ficar visível no tooltip ou na metodologia. O sistema precisa distinguir área privativa, área útil, área total, área comercial, depósito e duplex. Quando a fonte não informar a definição, marcar “área não normalizada”.

### 4.5 Dormitórios e suítes

| Filtro | Opções recomendadas |
|---|---|
| Dormitórios | Studio/sem dormitório; 1; 2; 3; 4; 5 ou mais. |
| Suítes | 0; 1; 2; 3; 4 ou mais. |
| Banheiros | 1; 2; 3; 4 ou mais. |
| Vagas | 0; 1; 2; 3; 4 ou mais. |

O usuário deve poder combinar “3 dormitórios e 2 suítes” e “4 dormitórios ou mais”. A interface deve evitar tratar “2 dormitórios” como “2 suítes”.

### 4.6 Vista e relação com o entorno

| Filtro | Valores |
|---|---|
| Relação visual | Frente para o parque; frente para a cidade; vista interna; vista para rua; vista parcial; duplex/cobertura com múltiplas orientações; não informado. |
| Grau de confirmação | Declarado em material; visível em planta/foto; confirmado por visita; não confirmado. |
| Distância/posição | Frente direta; proximidade; vista lateral; sem vista relevante; não informado. |

“Frente parque” deve ser um atributo verificável por implantação, orientação ou visita. Não aplicar o rótulo a qualquer unidade do empreendimento apenas porque o condomínio fica perto do parque.

### 4.7 Insolação

| Filtro | Valores recomendados |
|---|---|
| Sol predominante | Sol da manhã; sol da tarde; manhã e tarde; luz indireta; variável por cômodo; não informado. |
| Confirmação | Orientação geográfica; planta/implantação; observação em campo; relato; não confirmado. |
| Explicação | Indicar que a insolação muda por estação, altura, edifício vizinho, varanda e ambiente. |

A expressão “sol da manhã” deve ser usada como orientação de exposição, não como garantia de que todos os ambientes receberão sol direto.

### 4.8 Perfil de vida

| Filtro | Opções |
|---|---|
| Família | Crianças; adolescentes; casal; pessoa só; multigeracional. |
| Pets | Aceita análise de regras; áreas pet; proximidade de serviços; parque com regras específicas. |
| Trabalho | Home office; escritório externo; uso corporativo; proximidade de transporte. |
| Acessibilidade | Rota acessível; elevador; vaga; banheiro; informação a confirmar. |
| Estilo | Mais espaço; praticidade; lazer; vista; privacidade; mobilidade; investimento; baixo custo recorrente. |

Esses filtros devem gerar conteúdo e perfil de decisão, não alegações universais.

## 5. Interface de descoberta

### 5.1 Tela inicial

Título: **“Encontre o perfil de imóvel que combina com o que você procura.”**

Subtítulo: “Explore por estágio, uso, área, quartos, suítes, vista, insolação e objetivo. Primeiro você entende as opções; depois, se quiser, recebe oportunidades compatíveis.”

A primeira tela deve exibir três caminhos:

```text
Quero morar
Quero investir
Quero vender ou alugar meu imóvel
```

Depois, o usuário pode continuar por filtros livres.

### 5.2 Abas principais

As abas devem reduzir a sensação de formulário extenso:

```text
Objetivo | Estágio | Uso | Área | Quartos e suítes | Vista | Sol | Perfil | Custos
```

No celular, usar botão “Filtrar” com resumo dos critérios selecionados e chips removíveis.

### 5.3 Ordenação

Como o site não será um portal de anúncios, a ordenação deve ser editorial:

- mais compatível com o perfil;
- mais conteúdo disponível;
- mais recente;
- mais comparado;
- menor custo recorrente informado;
- maior área;
- melhor relação entre atributos, quando a metodologia estiver explicada.

Evitar “melhor imóvel” sem critério. Se houver ranking, explicar fórmula e data.

## 6. Cards de resultado

### 6.1 Card de perfil/editorial

```text
[Imagem ou diagrama autorizado]
Perfil: Residencial · Pronto novo · 120–160 m²
3 dormitórios · 2 suítes · 2 vagas
Vista: frente parque ou vista urbana — confirmação depende da posição
Sol: variável por orientação e final
Ideal para: família que busca espaço e áreas de lazer
Pontos de atenção: custos, condomínio, unidade e disponibilidade variam
Atualizado em: DD/MM/AAAA
[Entenda este perfil] [Receba oportunidades compatíveis]
```

### 6.2 Card de condomínio/produto

```text
Nome do condomínio/produto
Estágio: pronto novo / em construção / revenda / histórico
Uso: residencial / comercial / misto
Faixas de área observadas
Quartos e suítes observados
Vista e insolação: o que é confirmado e o que depende da unidade
Leitura independente: pontos fortes e limitações
Fontes e data
[Ver análise] [Comparar]
```

### 6.3 Card de artigo/guia

```text
Categoria: Guia / Mercado / Investimento / Moradia
Título orientado a pergunta
Resumo de duas linhas
Entidade principal
Verificado em
Nível de evidência
[Leia o guia]
```

### 6.4 Card de estudo/ferramenta

```text
[Calculadora / relatório / checklist]
O que você descobre
Quais dados são usados
Quais limitações existem
Tempo estimado
[Começar] [Receber por e-mail]
```

### 6.5 Card de oportunidade privada

Quando houver inventário real, ele pode ser apresentado depois do lead, por WhatsApp, e-mail ou área de atendimento. Se for exibido publicamente, deve ser claramente rotulado como “oportunidade observada”, com data, fonte, operação, preço pedido e aviso de disponibilidade. Não é obrigatório para o lançamento do site.

## 7. Página de resultados filtrados

A página deve conter:

1. H1 que reflita os filtros escolhidos.
2. Resumo: “Você está explorando perfis com…”.
3. Chips removíveis dos critérios.
4. Contador de resultados editoriais, não de “unidades”, quando esse for o caso.
5. Cards de perfil, condomínio, guia e ferramenta.
6. Bloco “o que estes filtros não conseguem confirmar”.
7. Sugestões de filtros próximos.
8. CTA para salvar busca ou receber oportunidades.
9. Links para páginas pilar e metodologia.
10. Data de atualização dos dados.

Exemplo de H1:

> **Perfis residenciais de 80 a 120 m², com 2 ou 3 dormitórios e interesse em vista para o parque**

Exemplo de subtexto:

> “Esta página reúne conteúdos e perfis editoriais compatíveis. Vista, insolação, disponibilidade e preço dependem da unidade e devem ser confirmados antes de qualquer decisão.”

## 8. Como preservar SEO sem indexar combinações infinitas

A interface pode oferecer combinações livres sem transformar cada combinação em uma página indexável. Essa é uma distinção fundamental.

### 8.1 Páginas indexáveis e canônicas

Criar landing pages permanentes apenas para combinações com demanda e conteúdo suficiente, por exemplo:

```text
/para-morar/na-planta/
/para-morar/em-construcao/
/para-morar/pronto-novo/
/para-morar/revendas/
/para-morar/residencial-ate-80m2/
/para-morar/residencial-80-a-120m2/
/para-morar/frente-parque/
/para-morar/sol-da-manha/
/para-investir/para-locacao/
/para-investir/estrategia-de-revenda/
```

Essas páginas devem ter texto original, dados, FAQ, fontes, exemplos de perfil e CTA. Não criar uma landing para toda combinação de área + quartos + vista + sol + estágio.

### 8.2 Combinações dinâmicas

Filtros livres podem usar URL com query string ou estado de aplicação, mas por padrão devem ter `noindex, follow` e canonical para o hub mais próximo, quando não houver conteúdo editorial único. A decisão técnica deve ser validada na implementação.

### 8.3 Quando uma combinação merece indexação

Uma combinação pode virar página indexável quando cumprir simultaneamente:

- intenção identificável e persistente em Search Console/Google Ads ou CRM;
- pelo menos uma resposta editorial original;
- fontes e dados suficientes;
- CTA coerente;
- atualização sustentável;
- diferença real em relação a outras páginas;
- ausência de conteúdo gerado apenas por troca de palavras-chave.

## 9. Filtros para cada contexto de negócio

### 9.1 Para Morar

Filtros de maior relevância: estágio, residencial, área, dormitórios, suítes, vagas, vista, insolação, família, pet, home office, acessibilidade, custo recorrente e proximidade de transporte.

Resultado: perfil de moradia + guias + comparadores + quiz + CTA de curadoria.

### 9.2 Para Investir

Filtros de maior relevância: renda ou revenda, residencial/comercial, estágio, área, liquidez observada, aluguel, custo condominial, horizonte, risco, necessidade de reforma e público-alvo.

Resultado: tese, cenário, calculadora, estudo, dados e CTA de análise. Nunca classificar automaticamente uma opção como “melhor investimento” sem fórmula e contexto.

### 9.3 Para proprietários

Filtros não são apenas de imóvel desejado. O formulário de diagnóstico deve capturar: venda ou aluguel, condomínio, área, quartos, suítes, vagas, torre, andar, vista, sol, reforma, mobília, ocupação, renda atual, preço esperado, urgência e documentação.

Resultado: faixa de valor, checklist de preparação e convite para avaliação.

### 9.4 Para locatários

Filtros: aluguel total máximo, área, quartos, vagas, mobiliado, pet, home office, prazo, garantia, estágio/pronto, vista, sol e mobilidade.

Resultado: guia de decisão e alerta consultivo, mesmo que as oportunidades específicas sejam encaminhadas fora do hub editorial.

## 10. Matching sem promessa de “imóvel ideal”

A expressão “imóvel ideal” é útil para experiência do usuário, mas o sistema deve comunicar que entrega **compatibilidade baseada nas preferências informadas**, não uma verdade objetiva.

### Resultado do matching

```text
Seu perfil prioriza:
• 3 dormitórios
• 2 suítes
• 80–120 m²
• uso residencial
• sol da manhã
• possibilidade de vista para o parque
• home office
• decisão em até 6 meses

Conteúdos recomendados:
1. Como comparar 80–120 m² no Jardim das Perdizes
2. Vista para o parque: o que precisa ser confirmado
3. Sol da manhã: orientação, planta e visita
4. Custo total de morar
5. Checklist de visita

Próximo passo:
Receba uma curadoria de oportunidades compatíveis quando houver disponibilidade.
```

## 11. Filtros e dados: modelo mínimo

Cada entidade ou perfil deve possuir:

```text
id
nome
tipo_entidade
uso
estagio
area_minima
area_maxima
area_definicao
quartos_minimos
quartos_maximos
suites_minimas
suites_maximas
banheiros
vagas
vista
vista_grau_confirmacao
insolacao
insolacao_grau_confirmacao
perfil_vida
condominio_observado
iptu_observado
preco_observado
aluguel_observado
fonte
url_fonte
data_fonte
verificado_em
nivel_evidencia
status
observacoes
slug_editorial
```

Campos ausentes devem receber “não informado”, não zero. O sistema deve registrar histórico de alteração e não apagar a versão anterior.

## 12. CTA e geração de leads

A descoberta deve conduzir a quatro saídas:

| Saída | CTA | Lead |
|---|---|---|
| Educação | “Leia o guia recomendado.” | Baixo compromisso. |
| Personalização | “Receba seu perfil por e-mail/WhatsApp.” | Intenção e preferências. |
| Oportunidade | “Receba oportunidades compatíveis.” | Objetivo, prazo e orçamento. |
| Consultoria | “Solicite uma análise personalizada.” | Lead quente. |

### Campos progressivos

Primeira etapa: objetivo e filtros.  
Segunda etapa: prazo, orçamento, tipologia e mobilidade.  
Terceira etapa: nome, contato e consentimento.  
Quarta etapa, somente quando necessário: imóvel próprio, unidade, documentação ou informações para valuation.

## 13. Navegação interna

Cada combinação de filtro deve recomendar conteúdo relacionado, não apenas resultados:

| Filtro selecionado | Conteúdo contextual |
|---|---|
| Na planta | RI, memorial, aprovação, fluxo, riscos e checklist. |
| Em construção | Obra, prazo, financiamento, vistoria e entrega. |
| Pronto novo | Habite-se, condomínio, garantia, ocupação e custos. |
| Revenda | Documentação, reforma, negociação, histórico e liquidez. |
| Residencial | Moradia, famílias, pets, home office e rotina. |
| Comercial | Uso, renda, demanda, localização e custos operacionais. |
| Até 80 m² | Compactos, praticidade, locação e custo por m². |
| 80–120 m² | Famílias pequenas, home office e equilíbrio de custo. |
| 120–160 m² | Espaço, suítes, vagas e público-alvo. |
| 160–200 m² | Alto padrão, privacidade, vista e condomínio. |
| Mais de 200 m² | Plantas amplas, duplex, personalização e liquidez. |
| Frente parque | Vista, orientação, privacidade, preço e confirmação. |
| Sol da manhã/tarde | Orientação, conforto, cômodos e visita em horários. |

## 14. Prioridade de implementação

### MVP editorial + descoberta

1. Home com CTA “Encontre seu perfil ideal”.
2. Hub Para Morar com abas por estágio.
3. Hub Para Investir com renda e estratégia de revenda.
4. Interface de filtros por uso, estágio, área, quartos, suítes, vista e sol.
5. Cards de perfis e conteúdos, sem exigir unidades.
6. Quiz de compatibilidade.
7. Formulário “receba oportunidades compatíveis”.
8. Páginas indexáveis para estágio, área e principais intenções.
9. Página de método, fontes e data de atualização.
10. CRM com captura dos filtros e da intenção.

### Segunda etapa

Adicionar custo, condomínio, IPTU, vagas, pet, home office, acessibilidade, mobilidade, comparação de bairros, calculadora de investimento, diagnóstico de venda e análise de locação.

### Terceira etapa

Adicionar mapa de vista/insolação, relatórios por torre/produto, pesquisa de experiência, Data Watch, alertas segmentados, transcrição de vídeo e páginas de combinações validadas por dados reais.

## 15. Métricas da camada de descoberta

| Métrica | O que informa |
|---|---|
| Início do explorador | Interesse inicial. |
| Filtros utilizados | Quais atributos têm maior demanda. |
| Combinações recorrentes | Oportunidades de novos conteúdos e landing pages. |
| Conclusão do quiz | Qualidade da experiência e consciência. |
| Salvamento de perfil | Intenção de retorno. |
| Solicitação de oportunidades | Lead com intenção comercial. |
| Solicitação de estudo | Lead mais quente, especialmente investidor. |
| Diagnóstico de venda/locação | Potencial de captação. |
| Conteúdo consumido antes do lead | Caminho de consciência e atribuição. |
| Conversão por filtro | Atributos que geram leads e contratos. |

Não usar somente “número de resultados” como métrica. O site deve medir se os filtros conduzem a melhor compreensão, melhores leads e maior conversão consultiva.

## 16. Recomendação final

A melhor solução é ter um site que combine **publicação editorial, biblioteca de perfis e explorador interativo**. O usuário poderá selecionar “em construção”, “residencial”, “80–120 m²”, “3 dormitórios”, “2 suítes”, “frente parque” e “sol da manhã”, mas receberá primeiro uma resposta editorial contextualizada: o que esse perfil significa, quais produtos/condomínios se aproximam, quais atributos precisam ser confirmados, quais custos existem, quais trade-offs aparecem e quais perguntas fazer.

Depois, o usuário poderá deixar os dados para receber oportunidades reais compatíveis. Isso cria o melhor equilíbrio entre SEO/AEO/GEO e geração de leads: as páginas estruturadas geram descoberta e autoridade; os filtros aumentam o nível de consciência; o matching captura intenção; e o atendimento consultivo converte.

A arquitetura final deve ser, portanto:

```text
Conteúdo indexável
        ↓
Explorador por atributos
        ↓
Perfil de decisão
        ↓
Comparação e ferramenta
        ↓
Lead qualificado
        ↓
Curadoria/oportunidade privada
        ↓
Atendimento consultivo
```

O site não precisa escolher entre ser um blog e ajudar o usuário a encontrar o imóvel ideal. Ele deve ser um **blog estruturado como produto de descoberta**, onde os filtros funcionam como instrumento de educação, segmentação e geração de demanda.
