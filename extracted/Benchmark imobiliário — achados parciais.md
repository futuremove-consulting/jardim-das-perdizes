# Benchmark imobiliário — achados parciais

## Loft — página pública observada

URL: https://loft.com.br/venda/imoveis/sp/sao-paulo  
Data de observação: 28/08/2026.  
Resultado: acesso bloqueado por resposta 403 do CloudFront. Não houve tentativa de contornar bloqueio. O recurso público da App Store informa filtros por bairro, preço, cômodos, tipo de imóvel, comodidades, condomínio, gastos mensais e metragem. O material público também descreve busca por características textuais/fotográficas, mas será tratado como evidência secundária até validação na interface.

Implicação para o benchmark: registrar o bloqueio como limitação operacional e não inferir detalhes visuais da página web da Loft. Usar páginas de app store e materiais públicos apenas para observar o conjunto de funcionalidades declaradas.

## QuintoAndar — página inicial observada

URL: https://www.quintoandar.com.br/  
Data de observação: 28/08/2026.  
A home apresenta navegação por Alugar, Comprar, Anunciar, QPreço, Consórcio, Links úteis e Ajuda. O buscador inicial oferece abas Buscar Imóveis/Anunciar Imóveis, modos Alugar/Comprar, campos de cidade e bairro, valor total até, quartos e botão Buscar imóveis. A home também organiza atalhos indexáveis para apartamentos, casas, kitnets e condomínios por cidade, além de conteúdos/serviços de consórcio e financiamento.

Padrões observáveis: entrada de busca muito cedo; distinção clara entre demanda (buscar) e oferta (anunciar); filtros mínimos na home; taxonomia por operação e tipologia; conteúdo/serviços auxiliares em blocos visuais; CTAs diretos e linguagem simples; arquitetura híbrida de transação e conteúdo.

Aplicação preliminar para Jardim das Perdizes Broker: replicar entrada imediata de exploração, separação entre intenção do usuário e conteúdo de serviço, filtros essenciais e cards por caminhos. Adaptar o foco de catálogo para perfis, conteúdos e oportunidades consultivas; não replicar a dependência de volume de anúncios nem a lógica de portal horizontal.

## QuintoAndar — página de resultados observada

URL: https://www.quintoandar.com.br/alugar/imovel/sao-paulo-sp-brasil/apartamento  
A busca apresenta localização em campo combobox e filtros em chips: operação, aluguel, tipo, quartos, vagas, banheiros, área, mobiliado, aceita pets, próximo ao metrô e disponibilidade. Há botão “Mais filtros”, “Criar alerta de imóvel”, ordenação “Mais relevantes” e layout dividido entre lista e mapa. Os cards exibem selos como “Exclusivo” e “Baixou o preço”, preço do aluguel e total, área, quartos, vagas e localização. Há favoritos e navegação de fotos. A página observada exibe um contador amplo de resultados e conteúdo SEO contextual abaixo.

Padrões fortes: filtros visíveis e removíveis; progressive disclosure por “Mais filtros”; mapa sincronizado; distinção entre aluguel e custo total; alertas; ordenação; sinais de novidade/redução; cards escaneáveis; combinação de busca transacional e SEO de categoria.

Riscos para adaptação: o contador e o volume de resultados são próprios de marketplace; selos comerciais podem ser inadequados sem base; a linguagem de disponibilidade e preço exige atualização constante; mapa/lista pode dominar e reduzir o papel editorial.

## Redfin — homepage observada

URL: https://www.redfin.com/  
A home organiza Buy, Rent, Sell, Mortgage, Real Estate Agents e Feed, além de Join/Sign in. O hero apresenta busca ampla por City, Address, School, Agent ou ZIP. Há abas Buy, Mortgage, Sell, Rent e My Home Value. Cards de serviço conectam compra, financiamento, venda e aluguel. A home também mantém links exploráveis por cidades/estados, sinalizando forte arquitetura de descoberta e distribuição indexável.

Padrões fortes: entrada por busca aberta; separação de intenções; integração entre conteúdo e serviços; busca por múltiplos tipos de entidade; CTA específico para comprador, vendedor, locatário e proprietário; arquitetura escalável por geografia.

Aplicação para a Broker: replicar busca aberta por entidade/pergunta, caminhos de intenção e módulos de serviço. Adaptar a escala geográfica para o hiperlocal e substituir páginas massivas de cidades por entidades, temas e perfis do Jardim das Perdizes.

## Zillow — homepage observada

URL: https://www.zillow.com/  
Data de observação: 28/08/2026.  
A navegação separa Buy, Rent, Sell, Get a mortgage, Find an agent, Manage rentals, Advertise e Help. O hero usa busca aberta por address, neighborhood, city ou ZIP. A home informa que recomendações consideram localização, histórico de busca, imóveis vistos/salvos e filtros utilizados. A estrutura institucional inclui About, Zestimates, News, Research, AI e acessibilidade/privacidade.

Padrões fortes: busca por múltiplos tipos de entidade; personalização baseada em comportamento; integração entre compra, aluguel, venda, financiamento e avaliação; conteúdo de pesquisa e notícias; transparência institucional e acessibilidade; área de conta com Search, Updates, Favorites, Plan e Inbox.

Aplicação para a Broker: replicar a busca por entidade e a personalização, mas usar preferências declaradas e consentidas, com transparência. Adaptar “recommendations” para recomendações de conteúdo/perfis, não para uma classificação algorítmica opaca de imóveis.

## Rightmove — homepage observada

URL: https://www.rightmove.co.uk/  
Data de observação: 28/08/2026.  
A navegação separa Buy, Rent, House Prices, Mortgages, Find Agent, Commercial, Inspire e Overseas. O hub Inspire agrega Moving stories, Property news, Energy efficiency, Property guides, Housing trends e Mortgage guides. A home destaca busca de propriedades, login para salvar, alertas e acompanhar consultas, valuation gratuita e conteúdo para compradores. O rodapé oferece hubs de preço vendido, valuation, guias de comprador, vendedor, locador e landlord, além de calculadoras e sitemap.

Padrões fortes: separação por jobs-to-be-done; conteúdo editorial próprio dentro da mesma arquitetura; serviços de valuation e financiamento; guias por público; alertas e organização da jornada; distinção residencial/comercial; presença forte de dados de preço e história.

Aplicação para a Broker: replicar a arquitetura “Inspire” como Guias do Bairro/Mercado & Dados; criar guias específicos para morador, investidor, vendedor, locador e locatário; adaptar valuation para diagnóstico consultivo e não promessa instantânea. Respeitar termos de uso e não fazer scraping.

## Airbnb — homepage observada

URL: https://www.airbnb.com/  
Data de observação: 28/08/2026.  
A interface separa All, Homes, Experiences e Services, mostra busca em etapas e CTA Become a host. A experiência observada estava carregando skeletons, mas revelou a lógica de categorias, busca progressiva, foco visual e separação entre usuário consumidor e anfitrião.

Padrões úteis: categorias como portas de descoberta; busca progressiva em poucos passos; interface visual limpa; separação clara de oferta e demanda; possibilidade de incorporar flexibilidade/matching e comparação por experiência.

Aplicação para a Broker: usar categorias/intenções e busca em etapas; criar “Encontre seu perfil” por preferência; usar imagens e cards editoriais com consistência. Não copiar a lógica de datas/hóspedes, avaliações de hospedagem ou preço por viagem.

## Compass — homepage observada

URL: https://www.compass.com/  
Data de observação: 28/08/2026.  
A Compass separa Buy, Rent, Sell, Compass Exclusives, New Development e Agents. A busca aberta aceita cidade, bairro, endereço, escola, ZIP, agente ou MLS. O hero usa imagem aspiracional com busca central. A página organiza bairros/lifestyles, mercados, guias de bairro, New Development, Commercial, Market Outlook, Private Exclusives e serviços como Mortgage Calculator.

Padrões fortes: arquitetura premium orientada por intenção; busca por entidades e não só localização; integração de lifestyle, neighborhood guides, market outlook, new development, commercial e agentes; curadoria/exclusives; estética editorial e relacionamento personalizado.

Aplicação para a Broker: replicar busca por entidade/pergunta e a integração entre conteúdo local, mercado, novos desenvolvimentos, comercial e relacionamento. Adaptar “Exclusives” para “curadoria consultiva” sem insinuar inventário público exclusivo; adaptar estética premium sem sacrificar dados, fonte, data e limitações.

## Baymard — pesquisa independente de layout de busca

URL: https://baymard.com/blog/accommodations-split-view  
Data de observação: 28/08/2026.  
A pesquisa recomenda apresentar resultados de propriedades em “split view”, com lista e mapa lado a lado, para permitir que o usuário entenda rapidamente a localização. O artigo alerta para três problemas: split view em overlay, filtros em sidebar vertical e anúncios verticais na página de resultados.

Aplicação para a Broker: usar lista + mapa em telas de descoberta geográfica quando houver dados confiáveis e consentimento de uso; no explorador editorial, o mapa pode representar entidades, acessos, guias e perfis, não necessariamente unidades. Usar barra horizontal/abas e filtros progressivos em vez de uma sidebar longa. Evitar publicidade vertical que prejudique leitura e confiança.

## MeasuringU — benchmark de usabilidade e confiança

URL: https://measuringu.com/real-estate-benchmark-2022/  
Data de observação: 28/08/2026.  
O estudo de 2022 consultou 269 usuários e conduziu 49 testes remotos de think-aloud com websites imobiliários dos EUA. O conjunto teve média de 68º percentil no SUPR-Q; Zillow e Realtor.com ficaram nos percentis 83 e 82, respectivamente. O estudo relata que Zillow teve usabilidade no 89º percentil e confiança no 57º; os problemas comuns incluíam informação imprecisa/não confiável e dificuldades em filtros e ordenação. Os principais drivers de qualidade citados incluem boa representação dos imóveis, imagens de qualidade, informação sobre o bairro e informação sobre última venda.

Aplicação para a Broker: tratar **atualidade e confiabilidade dos dados** como requisito de UX, não apenas editorial; mostrar última verificação, “não informado” e diferença entre pedido e transação; incluir informação de bairro como componente central; testar filtros com usuários antes de expandir a taxonomia; não assumir que muitos filtros significam melhor usabilidade.

## Loft — App Store observada

URL: https://apps.apple.com/us/app/loft-im%C3%B3veis/id1582516551  
Data de observação: 28/08/2026.  
A descrição oficial informa filtros por bairro, preço, cômodos, tipo de imóvel, comodidades, condomínio, gastos mensais e metragem; fotos e visita online; documentação em dia como proposta de serviço; rede de corretores; financiamento; e ajustes de usabilidade para facilitar a busca.

Padrões úteis: filtros ligados a custos mensais e condomínio, não apenas preço de compra; visita online; documentação como elemento de confiança; integração de financiamento; linguagem de redução de burocracia.

Limitação: a descrição de App Store é declaração de funcionalidade, não teste independente nem prova de que todos os filtros estejam expostos na mesma forma no web. A página web da Loft foi bloqueada por 403 nesta sessão.

## StreetEasy — homepage observada

URL: https://streeteasy.com/  
Data de observação: 28/08/2026.  
A StreetEasy apresenta Rent, Buy, Sell, Buildings, Resources e Blog. A busca aceita endereço, edifício ou agente; possui aluguel/compra, bairros/boroughs e faixa de preço. Destaca ferramentas de vendedor, agentes especialistas, filtros populares como pets, elevador e porteiro, guias de bairros, dados de mercado, listings curados e guias para locatário, comprador e vendedor. Também propõe perfil do usuário, buscas salvas e novos anúncios.

Padrões fortes: hiperlocalidade por edifício; união de busca, buildings, blog e dados; “top filters” baseados em demanda; curadoria editorial; perfil e buscas salvas; jornadas separadas para alugar, comprar e vender.

Aplicação para a Broker: é o benchmark internacional mais próximo da estratégia do Jardim das Perdizes. Replicar a integração entre entidades/condomínios, guias de bairro, dados, filtros por atributos relevantes e trilhas por público. Adaptar “Buildings” para Condomínios/Produtos como base de conhecimento, não catálogo de unidades; adaptar “hand-curated listings” para curadoria de oportunidades consultivas.

## StreetEasy — limitações na página de resultados

URL: https://streeteasy.com/for-rent/nyc  
Resultado: a página de resultados solicitou confirmação humana e não foi usada além da tela de bloqueio. Não houve tentativa de contornar CAPTCHA ou bloqueio. A homepage continua sendo a fonte observada para a arquitetura geral.

## Zillow — página de resultados observada

URL: https://www.zillow.com/homes/for_sale/  
Data de observação: 28/08/2026.  
A página apresentou barra fixa de filtros com Search, For sale, Price, Beds & baths, Property type, Filters e Save search. O estado sem resultados mostrou recomendações acionáveis: inserir características e localização ou escola, diminuir filtros e ampliar escopo/zoom do mapa. Exemplos de busca textual incluem “3 bedroom townhouses with fireplace in Seattle, WA”, nome de escola e open houses.

Padrões fortes: barra de filtros curta e persistente; salvamento de busca; busca por linguagem natural/atributos; mensagens de zero resultado que ajudam a recuperar a busca; filtros progressivos; possibilidade de pesquisar por escola/entidade. A página também evidencia a importância de não deixar o usuário em estado vazio sem orientação.

Aplicação para a Broker: replicar barra compacta, chips/filtros prioritários, salvar perfil e mensagens úteis de zero resultado. Adaptar a busca natural para português e atributos locais, por exemplo: “apartamento residencial de 80 a 120 m², 3 dormitórios, frente parque e sol da manhã”. Se não houver combinação exata, mostrar perfis próximos, conteúdos e filtros para relaxar — não uma tela vazia.
