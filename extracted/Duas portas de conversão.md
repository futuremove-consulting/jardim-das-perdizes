# Duas portas de conversão

## Recomendação executiva

Sim. Para a Jardim das Perdizes Broker, recomendo separar as duas ações:

```text
[Enviar solicitação]       [Falar agora com especialista]
```

Essa arquitetura é superior a um único CTA quando a operação consegue responder rapidamente pelo WhatsApp e tratar formulários com acompanhamento posterior.

As duas ações representam comportamentos diferentes:

| Ação | Usuário | Expectativa | Tratamento |
|---|---|---|---|
| Enviar solicitação | Quer explicar melhor, comparar, pedir seleção, avaliação ou estudo. | Retorno organizado. | CRM, distribuição e follow-up. |
| Falar agora com especialista | Quer conversar imediatamente, tirar dúvida, negociar ou marcar visita. | Resposta síncrona ou quase imediata. | WhatsApp com plantão/horário e roteiro. |

O CTA não deve ser “WhatsApp” como único texto. **“Falar agora com especialista” comunica o benefício; o ícone/canal WhatsApp aparece como apoio.**

## Hierarquia visual

### Header

```text
[Enviar solicitação] [Falar agora com especialista]
```

Usar “Falar agora com especialista” como botão visualmente mais forte somente se houver disponibilidade real de atendimento. Fora do horário, trocar para “Falar com especialista” ou mostrar o horário de atendimento.

### Home

```text
Encontrou o que procura?
[Enviar solicitação] [Falar agora com especialista]
```

### Cards e fichas

Os CTAs devem herdar o contexto:

| Página | Formulário | WhatsApp |
|---|---|---|
| Imóvel/unidade | Enviar solicitação | Falar agora sobre este imóvel |
| Tipologia/planta | Enviar solicitação | Falar agora sobre esta planta |
| Condomínio | Receber informações | Falar agora sobre este condomínio |
| Lançamento/decorado | Solicitar visita | Falar agora sobre o decorado |
| Investimento | Solicitar estudo | Falar agora sobre investimento |
| Venda | Solicitar avaliação | Falar agora sobre meu imóvel |
| Locação do proprietário | Avaliar aluguel | Falar agora sobre meu imóvel |
| Artigo/guia | Enviar solicitação | Falar com especialista |

O botão contextual pode variar no texto, mas deve abrir o mesmo motor de captura, já com intenção, página, entidade e filtros preenchidos.

## Mini formulário

### Etapa 1

**Como podemos ajudar?**

```text
( ) Quero encontrar um imóvel
( ) Tenho um imóvel
```

### Etapa 2 — quero encontrar um imóvel

```text
( ) Comprar para morar
( ) Comprar para investir
( ) Alugar para morar
( ) Conhecer um lançamento/decorado
( ) Ainda estou pesquisando
```

### Etapa 2 — tenho um imóvel

```text
( ) Vender meu imóvel
( ) Alugar meu imóvel
( ) Ainda estou avaliando
```

### Etapa 3 — contato mínimo

```text
Nome
WhatsApp
Melhor horário para contato
```

E-mail, orçamento, área, quartos, estágio, condomínio, vista, sol e prazo podem ser opcionais ou aparecer progressivamente conforme a intenção.

### Etapa 4 — próximo passo

```text
( ) Quero agendar uma visita
( ) Quero conhecer o decorado
( ) Quero receber imóveis compatíveis
( ) Quero solicitar um estudo de investimento
( ) Quero solicitar uma avaliação
( ) Quero apenas tirar dúvidas
```

## WhatsApp

O botão “Falar agora com especialista” deve abrir uma conversa com mensagem contextual pré-preenchida. Exemplos:

```text
Olá, sou [nome]. Quero comprar para morar no Jardim das Perdizes e gostaria de falar sobre [página/produto].
```

```text
Olá, sou [nome]. Tenho um imóvel no Jardim das Perdizes e quero avaliar a venda/locação.
```

```text
Olá, sou [nome]. Quero conhecer o decorado de [produto] e verificar horários de visita.
```

A origem, URL, entidade, filtros e campanha devem ser enviados ao CRM por parâmetros de rastreamento. O WhatsApp sozinho não deve ser a base de dados principal.

## Regra de horário

“Falar agora” só deve ser utilizado quando houver atendimento disponível. Fora do horário:

```text
[Falar com especialista] [Enviar solicitação]

Atendimento pelo WhatsApp: segunda a sexta, das X às Y.
Envie uma solicitação e retornaremos no próximo período de atendimento.
```

Não prometer resposta imediata sem SLA operacional real.

## Roteamento

```text
Compra para morar → especialista de compra + visita
Compra para investir → especialista de investimento + estudo/reunião
Aluguel para morar → especialista de locação + visita
Venda → captação/avaliação + especialista de proprietário
Aluguel do próprio imóvel → captação de locação + avaliação
Lançamento/decorado → equipe/produto + agendamento
```

O CRM deve registrar:

```text
role
intent
next_action
source_page
source_campaign
entity_interest
filters_selected
preferred_time
channel
consent
created_at
first_response_at
appointment_at
```

## Qualificação sem fricção

O princípio recomendado é **capturar primeiro a intenção e o contato; aprofundar depois**. O formulário não deve exigir todos os filtros antes de liberar o envio.

Lead quente normalmente apresenta ação explícita — visita, decorado, proposta, prazo curto, imóvel definido ou reunião. Lead morno quer estudo, comparação ou seleção. Lead frio está pesquisando e deve entrar em nutrição, newsletter ou alertas.

## Mensagens de confirmação

### Formulário

> Recebemos sua solicitação. Um especialista da Jardim das Perdizes Broker entrará em contato pelo WhatsApp no horário informado.

Se houver agendamento:

> Sua solicitação de visita foi recebida. Vamos confirmar disponibilidade e horário com você.

### WhatsApp

> Você será atendido pelo especialista responsável por este assunto. Se preferir, envie uma solicitação estruturada e nossa equipe retornará com contexto completo.

## Ações que não devem competir

Não colocar quatro ou cinco CTAs no mesmo bloco, como “Falar conosco”, “WhatsApp”, “Solicitar informações”, “Agendar visita” e “Receber curadoria” sem hierarquia. Usar duas portas visíveis e pré-configurar a intenção no formulário.

Também não usar “Enviar solicitação” como botão sem explicar o que acontece depois. A legenda deve indicar o benefício:

> Envie o que você procura e receberá um retorno direcionado.

## Métricas

Medir separadamente:

| Métrica | Interpretação |
|---|---|
| Cliques em Enviar solicitação | Interesse em retorno estruturado. |
| Formulários iniciados/concluídos | Fricção do formulário. |
| Cliques em Falar agora | Intenção imediata. |
| Conversas iniciadas | Qualidade do link e mensagem. |
| Tempo até primeira resposta | Capacidade operacional. |
| Contato realizado | Efetividade do atendimento. |
| Visitas agendadas | Conversão comercial intermediária. |
| Reuniões/estudos/avaliações | Qualificação por intenção. |
| Oportunidades criadas | Resultado de negócio. |

A métrica decisiva não é apenas “leads gerados”. É **lead qualificado por canal e intenção até visita, reunião, avaliação ou oportunidade criada**.

## Decisão final

Recomendo adotar oficialmente:

```text
CTA primário de resposta estruturada:
[Enviar solicitação]

CTA primário de urgência:
[Falar agora com especialista]
```

Com a seguinte regra:

> **Enviar solicitação** é a porta para quem deseja explicar, pedir seleção, estudo ou avaliação. **Falar agora com especialista** é a porta para quem quer conversar imediatamente, tirar dúvidas, negociar ou avançar para uma visita.

Esta solução mantém a simplicidade no front-end, melhora a qualificação no back-end, preserva o WhatsApp como canal de alta intenção e evita perder leads que não podem ou não querem conversar naquele momento.

## Referências brasileiras observadas

[1]: https://proprietario.quintoandar.com.br/anunciar-imovel "QuintoAndar — anunciar imóvel"
[2]: https://www.quintoandar.com.br/ajuda/artigo/como-solicitar-ajuda-no-quintoandar-1Zih6Tx7jrJIHGWtrBdHHa "QuintoAndar — atendimento e especialistas"
[3]: https://www.lopes.com.br/ "Lopes — compra, aluguel, busca e Fale conosco"
