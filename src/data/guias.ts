/**
 * Verified data for the "Guias do Bairro" system.
 * Data fidelity rule (AGENTS.md): every entity carries a human-readable source
 * and the verification date. Nothing invented — all entities come from the
 * project research cache (extracted/jardim-perdizes-ecossistema-fontes.md and
 * siblings), captured 27/08/2026 and re-verified by the broker on 31/08/2026.
 */

export interface GuiaRow {
  readonly name: string;
  readonly category: string;
  readonly source: string;
}

export interface GuiaSection {
  readonly title: string;
  readonly intro?: string;
  readonly headers: readonly [string, string, string];
  readonly rows: readonly GuiaRow[];
}

export interface GuiaData {
  readonly slug: string;
  readonly title: string;
  readonly metaTitle: string;
  readonly metaDescription: string;
  readonly intro: string;
  readonly takeaways: readonly string[];
  readonly sections: readonly GuiaSection[];
  readonly sourceNote: string;
}

const VERIFIED = "Verificado em 31/08/2026";

export const GUIAS: Record<string, GuiaData> = {
  escolas: {
    slug: "escolas",
    title: "Guia de Escolas do Jardim das Perdizes",
    metaTitle: "Escolas no Jardim das Perdizes — Guia de Educação do Bairro",
    metaDescription:
      "Colégios e universidades no entorno do Jardim das Perdizes: Pentágono, Santa Marcelina, Batista Brasileiro, Sagrado Coração, PUC-SP, Mackenzie, FAU-USP e Senac — com fonte e data de verificação.",
    intro:
      "Quem está escolhendo morar (ou investir) no Jardim das Perdizes avalia a educação do entorno: colégios, cursinhos de alto padrão e universidades. Este guia reúne as instituições citadas nas fontes institucionais e editoriais do bairro, com fonte datada em cada linha.",
    takeaways: [
      "As fontes institucionais citam colégios como Pentágono, Santa Marcelina e Batista Brasileiro no entorno imediato (Tecnisa).",
      "O guia editorial Zimmermann soma Sagrado Coração de Jesus, Américas, PUC-SP, Mackenzie, FAU-USP e Senac.",
      "Cada indicação traz a fonte — a lista é um inventário verificado, não um ranking.",
      "Distâncias e tempos a pé não estão medidos no acervo — confirme na visita antes de decidir.",
    ],
    sections: [
      {
        title: "Instituições citadas nas fontes",
        intro:
          "A lista abaixo junta as entidades mencionadas nas fontes primárias do acervo (página oficial Tecnisa e guia editorial Zimmermann). Não é um ranking: é um inventário verificado com fonte por linha.",
        headers: ["Instituição", "Tipo (conforme fonte)", "Fonte"],
        rows: [
          { name: "Colégio Pentágono", category: "Escola (educação básica)", source: "Tecnisa — artigo 'O privilégio de viver em um bairro planejado'" },
          { name: "Santa Marcelina", category: "Escola (educação básica)", source: "Tecnisa — mesmo artigo" },
          { name: "Colégio Batista Brasileiro", category: "Escola (educação básica)", source: "Tecnisa + Zimmermann (guia de bairro)" },
          { name: "Colégio Sagrado Coração de Jesus", category: "Escola (educação básica)", source: "Zimmermann (guia de bairro)" },
          { name: "Colégio Américas", category: "Escola (educação básica)", source: "Zimmermann (guia de bairro)" },
          { name: "PUC-SP Perdizes", category: "Universidade", source: "Tecnisa + Zimmermann" },
          { name: "Mackenzie", category: "Universidade", source: "Zimmermann (guia de bairro)" },
          { name: "FAU-USP", category: "Universidade", source: "Zimmermann (guia de bairro)" },
          { name: "Senac Francisco Matarazzo", category: "Ensino técnico/profissionalizante", source: "Tecnisa + Zimmermann" },
        ],
      },
    ],
    sourceNote: `${VERIFIED}. Fontes: Tecnisa (artigo "O privilégio de viver em um bairro planejado") e guia editorial Zimmermann, ambos consolidados no caderno de ecossistema do projeto (captura 27/08/2026). Tempos e distâncias não medidos; operação e endereços podem mudar.`,
  },


"bares-e-restaurantes": {
    slug: "bares-e-restaurantes",
    title: "Guia de Bares e Restaurantes do Jardim das Perdizes",
    metaTitle: "Bares e Restaurantes no Jardim das Perdizes — Guia de Gastronomia",
    metaDescription:
      "Onde comer e beber no entorno do Jardim das Perdizes: Reserva Rooftop, Sterna Café, Bráz Pizzaria, Écully Charbon, Deep Bar 611, Petí e outras indicações — com fonte e data de verificação.",
    intro:
      "A gastronomia do entorno é um dos fatores que sustentam a decisão de morar ou investir no bairro. Este guia reúne as indicações que aparecem nas fontes documentadas do projeto — da página oficial da Tecnisa ao guia da Veja São Paulo — com data e fonte em cada linha.",
    takeaways: [
      "Dentro do próprio bairro há o Reserva Rooftop, citado como restaurante criado para atrair clientes ao Jardim das Perdizes (InvestNews, 2026).",
      "O Sterna Café funciona no Corporate TIME, mostrando vida comercial nos endereços corporativos (portal Guia Jardim das Perdizes).",
      "A Tecnisa cita Quintal do Bráz, Bráz Pizzaria e Écully Charbon; o conceito 'cidade de 15 minutos' indica oferta a pé e de carro.",
      "A Veja São Paulo (2022) é fonte histórica de contexto — preços e horários mudam; confirme cada casa antes da visita.",
    ],
    sections: [
      {
        title: "Dentro do bairro (endereços confirmados)",
        intro: "Estabelecimentos com endereço associado a espaços do próprio loteamento.",
        headers: ["Estabelecimento", "Perfil", "Fonte"],
        rows: [
          { name: "Reserva Rooftop", category: "Restaurante do bairro", source: "InvestNews (15/04/2026) e caderno de ecossistema" },
          { name: "Sterna Café", category: "Café no Corporate TIME", source: "Portal Guia Jardim das Perdizes (captura 27/08/2026)" },
        ],
      },
      {
        title: "Entorno imediato (Perdizes, Água Branca, Barra Funda)",
        intro: "Indicações citadas pelas fontes institucionais e editoriais para o entorno.",
        headers: ["Estabelecimento", "Perfil", "Fonte"],
        rows: [
          { name: "Quintal do Bráz", category: "Restaurante", source: "Tecnisa — artigo do bairro" },
          { name: "Bráz Pizzaria", category: "Pizzaria", source: "Tecnisa — artigo do bairro" },
          { name: "Écully Charbon", category: "Restaurante", source: "Tecnisa + Veja SP (2022)" },
          { name: "É Brasileiro", category: "Restaurante", source: "Zimmermann (guia de bairro)" },
          { name: "Fogão Gaúcho", category: "Restaurante", source: "Zimmermann (guia de bairro)" },
          { name: "Zaatar", category: "Restaurante", source: "Zimmermann (guia de bairro)" },
          { name: "Petí Gastronomia", category: "Gastronomia", source: "Veja SP (27/05/2016, atual. 20/01/2022)" },
          { name: "Herança Cultural", category: "Gastronomia", source: "Veja SP (2022)" },
          { name: "Deep Bar 611", category: "Bar", source: "Veja SP (2022)" },
          { name: "Ecully", category: "Gastronomia", source: "Veja SP (2022)" },
          { name: "OpyCo", category: "Gastronomia", source: "Veja SP (2022)" },
          { name: "Lá da Vendinha", category: "Gastronomia", source: "Veja SP (2022)" },
          { name: "Galpão Fortes Vilaça", category: "Gastronomia", source: "Veja SP (2022)" },
        ],
      },
    ],
    sourceNote: `${VERIFIED}. Fontes: InvestNews (15/04/2026), Tecnisa, portal Guia Jardim das Perdizes, Zimmermann e Veja São Paulo — consolidados no caderno de ecossistema (captura 27/08/2026). Preços, horários, endereços e operação mudam; cada indicação deve ser confirmada antes da visita.`,
  },

  saude: {
    slug: "saude",
    title: "Guia de Saúde do Jardim das Perdizes",
    metaTitle: "Hospitais e Saúde no Jardim das Perdizes — Guia do Bairro",
    metaDescription:
      "Hospitais de referência e serviços de saúde no entorno do Jardim das Perdizes: Albert Einstein Perdizes, São Camilo Pompeia, Samaritano Higienópolis e clínicas no bairro — com fonte datada.",
    intro:
      "Hospitais de referência, clínicas e farmácias no entorno reduzem o risco percebido de quem muda de bairro. Este guia reúne as entidades de saúde citadas nas fontes documentadas do projeto, com fonte datada em cada linha.",
    takeaways: [
      "A Tecnisa cita três hospitais de referência no entorno: Albert Einstein (Perdizes), São Camilo (Pompeia) e Samaritano (Higienópolis).",
      "O próprio loteamento tem farmácia citada no artigo institucional do parque.",
      "O portal Guia Jardim das Perdizes documenta clínicas e serviços ocupando salas do Office/Corporate TIME (odontologia, dermatologia, pilates).",
      "Este guia é inventário, não recomendação médica — confirme convênios e horários com cada instituição.",
    ],
    sections: [
      {
        title: "Hospitais de referência no entorno",
        headers: ["Hospital", "Localização", "Fonte"],
        rows: [
          { name: "Hospital Albert Einstein Unidade Perdizes", category: "Perdizes", source: "Tecnisa — artigo 'O privilégio de viver' + Zimmermann" },
          { name: "Hospital São Camilo Pompeia", category: "Pompeia", source: "Tecnisa + Zimmermann" },
          { name: "Hospital Samaritano Higienópolis", category: "Higienópolis", source: "Tecnisa — artigo do bairro" },
        ],
      },
      {
        title: "Serviços e clínicas dentro do bairro",
        intro: "Entidades documentadas no portal hiperlocal Guia Jardim das Perdizes, muitas em endereços corporativos.",
        headers: ["Serviço", "Perfil", "Fonte"],
        rows: [
          { name: "Integrata Odontologia", category: "Odontologia", source: "Portal Guia Jardim das Perdizes (captura 27/08/2026)" },
          { name: "ITR Clinic", category: "Clínica", source: "Portal Guia Jardim das Perdizes" },
          { name: "Fisio feat Pilates", category: "Fisioterapia/pilates", source: "Portal Guia Jardim das Perdizes" },
          { name: "Farmácia do bairro", category: "Farmácia", source: "Artigo institucional Tecnisa (44 mil m²)" },
        ],
      },
    ],
    sourceNote: `${VERIFIED}. Fontes: Tecnisa, Zimmermann e portal Guia Jardim das Perdizes — consolidadas no caderno de ecossistema (captura 27/08/2026). Tempo de atendimento, convênios e horários devem ser confirmados com cada instituição.`,
  },

  "transporte-e-mobilidade": {
    slug: "transporte-e-mobilidade",
    title: "Guia de Transporte e Mobilidade do Jardim das Perdizes",
    metaTitle: "Transporte e Mobilidade no Jardim das Perdizes — Linha 6 e Acessos",
    metaDescription:
      "Como chegar e circular no Jardim das Perdizes: Linha 6-Laranja (operação assistida), estação Água Branca (Linha 7-Rubi), acessos viários, ciclovia e calçadas — com fonte datada.",
    intro:
      "A mobilidade é o fator que mais muda no bairro hoje: a Linha 6-Laranja está em operação assistida desde julho de 2026. Este guia documenta o estado atual com fonte datada e separa o que já funciona do que ainda é previsão.",
    takeaways: [
      "A Linha 6-Laranja opera em trecho assistido desde 01/07/2026: seis estações de João Paulo I a Perdizes, sem cobrança inicial (Agência SP).",
      "A estação Água Branca integra o metrô à Linha 7-Rubi (trem); a conexão ferroviária é paga, o acesso ao metrô é gratuito.",
      "O entorno tem acesso à Marginal Tietê, Av. Marquês de São Vicente e Av. Pompeia, além de ciclovia e calçadas largas (fontes do acervo).",
      "Tempos de deslocamento porta a porta não estão medidos no acervo — o '23 minutos' da Linha 6 é trajeto de trem, não porta a porta.",
    ],
    sections: [
      {
        title: "Linha 6-Laranja — estado atual (fonte datada)",
        intro: "Publicação da Agência de Notícias do Governo de São Paulo em 01/07/2026.",
        headers: ["Item", "Situação", "Fonte"],
        rows: [
          { name: "Operação assistida", category: "Trecho João Paulo I a Perdizes, 6 estações, seg–sex 10h–15h, sem cobrança inicial", source: "Agência SP (01/07/2026)" },
          { name: "Estação Água Branca", category: "Integração com a Linha 7-Rubi (trem)", source: "Agência SP (01/07/2026)" },
          { name: "Estações do entorno", category: "Água Branca, Sesc-Pompeia e Perdizes", source: "Agência SP (01/07/2026)" },
          { name: "Linha completa", category: "Brasilândia a São Joaquim (previsão; trecho assistido é parcial)", source: "Agência SP (01/07/2026)" },
        ],
      },
      {
        title: "Acessos viários e ativos de mobilidade",
        headers: ["Acesso", "Perfil", "Fonte"],
        rows: [
          { name: "Marginal Tietê", category: "Via expressa de acesso", source: "Tecnisa + Zimmermann" },
          { name: "Av. Marquês de São Vicente", category: "Avenida estrutural", source: "Zimmermann (guia de bairro)" },
          { name: "Av. Pompeia", category: "Avenida de conexão com Perdizes", source: "Zimmermann (guia de bairro)" },
          { name: "Ciclovia e bikesharing", category: "Ativos citados no entorno", source: "Zimmermann (guia de bairro)" },
          { name: "Calçadas largas e acessíveis", category: "Atributo do bairro planejado", source: "Tecnisa + Prefeitura (parque)" },
        ],
      },
    ],
    sourceNote: `${VERIFIED}. Fontes: Agência SP (01/07/2026), Tecnisa, Zimmermann e Prefeitura de São Paulo — consolidadas no caderno de ecossistema (captura 27/08/2026). Status operacional muda; re-verifique antes de decidir.`,
  },

  "comercio-e-servicos": {
    slug: "comercio-e-servicos",
    title: "Guia de Comércio e Serviços do Jardim das Perdizes",
    metaTitle: "Comércio e Serviços no Jardim das Perdizes — Guia do Bairro",
    metaDescription:
      "O que tem dentro e perto do Jardim das Perdizes: padaria, mercado, farmácia, WeWork, Sterna Café, Bourbon Shopping e West Plaza — com fonte e data de verificação.",
    intro:
      "O dia a dia de quem mora depende do comércio de proximidade. Este guia documenta o que as fontes do acervo confirmam dentro do loteamento e no entorno imediato, com fonte datada em cada linha.",
    takeaways: [
      "O artigo institucional do parque cita comércios dentro do bairro: padaria, farmácia, mercado, restaurante, sorveteria, pet shop e salão de beleza.",
      "O WeWork é citado como escritório compartilhado no bairro (artigo institucional).",
      "O portal Guia Jardim das Perdizes documenta serviços em salas do Office/Corporate TIME, como o Sterna Café.",
      "Shoppings do entorno citados: Bourbon e West Plaza (Tecnisa e guias editoriais).",
    ],
    sections: [
      {
        title: "Comércio dentro do bairro",
        intro: "Categorias citadas no artigo institucional do parque (44 mil m² de área verde).",
        headers: ["Comércio", "Perfil", "Fonte"],
        rows: [
          { name: "Padaria", category: "Alimentação", source: "Artigo institucional Tecnisa" },
          { name: "Mercado", category: "Alimentação", source: "Artigo institucional Tecnisa" },
          { name: "Farmácia", category: "Saúde", source: "Artigo institucional Tecnisa" },
          { name: "Restaurante", category: "Alimentação", source: "Artigo institucional Tecnisa" },
          { name: "Sorveteria", category: "Alimentação", source: "Artigo institucional Tecnisa" },
          { name: "Pet shop", category: "Serviços", source: "Artigo institucional Tecnisa" },
          { name: "Salão de beleza", category: "Serviços", source: "Artigo institucional Tecnisa" },
          { name: "WeWork", category: "Escritórios compartilhados", source: "Artigo institucional Tecnisa" },
        ],
      },
      {
        title: "Shoppings e serviços do entorno",
        headers: ["Estabelecimento", "Perfil", "Fonte"],
        rows: [
          { name: "Bourbon Shopping", category: "Shopping", source: "Tecnisa + Zimmermann" },
          { name: "West Plaza", category: "Shopping", source: "Tecnisa + Zimmermann" },
          { name: "Sterna Café", category: "Café no Corporate TIME", source: "Portal Guia Jardim das Perdizes" },
          { name: "Oito Patas Petshop", category: "Pet shop", source: "Portal Guia Jardim das Perdizes" },
        ],
      },
    ],
    sourceNote: `${VERIFIED}. Fontes: artigo institucional Tecnisa, Zimmermann e portal Guia Jardim das Perdizes — consolidadas no caderno de ecossistema (captura 27/08/2026). Horários, endereços e operação mudam; confirme antes da visita.`,
  },

  "lazer-e-cultura": {
    slug: "lazer-e-cultura",
    title: "Guia de Lazer e Cultura do Jardim das Perdizes",
    metaTitle: "Lazer e Cultura no Jardim das Perdizes — Guia do Bairro",
    metaDescription:
      "O que fazer no Jardim das Perdizes: parque de 45 mil m², programação JP Experience, SESC Pompeia, Memorial da América Latina, Nubank Parque e Parque da Água Branca — com fonte datada.",
    intro:
      "Lazer e cultura definem a qualidade de vida percebida do bairro. Este guia reúne os equipamentos citados nas fontes documentadas do projeto, com fonte datada em cada linha.",
    takeaways: [
      "O parque central tem mais de 45 mil m², com obras de Tomie Ohtake e Frans Krajcberg (fonte oficial).",
      "A programação cultural 'JP Experience' é citada pela página oficial do bairro, com eventos para famílias e pets.",
      "O entorno soma SESC Pompeia, Memorial da América Latina, Nubank Parque e Parque da Água Branca (fontes do acervo).",
      "Programação e horários mudam — cada indicação leva data de verificação.",
    ],
    sections: [
      {
        title: "Dentro do bairro",
        headers: ["Equipamento", "Perfil", "Fonte"],
        rows: [
          { name: "Parque Jardim das Perdizes", category: "Parque central, mais de 45 mil m², obras de Tomie Ohtake e Frans Krajcberg", source: "Tecnisa + Prefeitura de São Paulo" },
          { name: "JP Experience", category: "Programação cultural do bairro", source: "Página oficial do bairro (Tecnisa)" },
        ],
      },
      {
        title: "Entorno imediato",
        headers: ["Equipamento", "Perfil", "Fonte"],
        rows: [
          { name: "SESC Pompeia", category: "Centro cultural e lazer", source: "Tecnisa + Zimmermann + Veja SP" },
          { name: "Memorial da América Latina", category: "Centro cultural", source: "Tecnisa + Zimmermann + Veja SP" },
          { name: "Nubank Parque (Allianz)", category: "Arena de eventos e shows", source: "Tecnisa + Zimmermann" },
          { name: "Parque da Água Branca", category: "Parque público", source: "Zimmermann + Veja SP" },
        ],
      },
    ],
    sourceNote: `${VERIFIED}. Fontes: Tecnisa, Prefeitura de São Paulo, Zimmermann e Veja SP — consolidadas no caderno de ecossistema (captura 27/08/2026). Programação e horários mudam; confirme antes da visita.`,
  },

  seguranca: {
    slug: "seguranca",
    title: "Guia de Segurança do Jardim das Perdizes",
    metaTitle: "Segurança no Jardim das Perdizes — Guia do Bairro",
    metaDescription:
      "Como funciona a segurança no Jardim das Perdizes: monitoramento 24h, Muralha Paulista (política pública de câmeras) e condomínios independentes — com fonte datada.",
    intro:
      "Segurança é o tema que mais gera pergunta — e o mais fácil de virar promessa. Este guia separa o que as fontes documentam (monitoramento, Muralha Paulista, condomínios independentes) do que é claim institucional, com fonte datada em cada linha.",
    takeaways: [
      "A página oficial do bairro cita segurança 24h, monitoramento e integração com o programa Muralha Paulista.",
      "O Muralha Paulista é uma política pública do Governo de SP de integração de câmeras — não é 'segurança total' nem ausência de crime.",
      "Cada condomínio do bairro é independente e tem regras próprias de segurança.",
      "Este guia não promete segurança absoluta: apresenta o que as fontes dizem e o que deve ser verificado na visita.",
    ],
    sections: [
      {
        title: "O que as fontes documentam",
        headers: ["Item", "Situação", "Fonte"],
        rows: [
          { name: "Segurança 24h e monitoramento", category: "Citado na página oficial do bairro", source: "Tecnisa — landing page do bairro" },
          { name: "Muralha Paulista", category: "Política pública de integração de câmeras (usuários públicos e privados)", source: "Governo de São Paulo" },
          { name: "Condomínios independentes", category: "Cada condomínio tem regras próprias", source: "Página oficial do bairro" },
          { name: "Câmeras interligadas", category: "Citado como atributo do bairro", source: "Tecnisa + Governo de SP" },
        ],
      },
    ],
    sourceNote: `${VERIFIED}. Fontes: Tecnisa (landing page do bairro) e Governo de São Paulo (Muralha Paulista) — consolidadas no caderno de ecossistema (captura 27/08/2026). Sensação de segurança é subjetiva; verifique na visita e com moradores.`,
  },

  "pet-friendly": {
    slug: "pet-friendly",
    title: "Guia Pet-Friendly do Jardim das Perdizes",
    metaTitle: "Pet-Friendly no Jardim das Perdizes — Guia do Bairro",
    metaDescription:
      "Viver com pets no Jardim das Perdizes: bebedouros no parque, pet shops no bairro, eventos para pets e áreas verdes — com fonte e data de verificação.",
    intro:
      "Quem tem pet avalia o bairro por áreas verdes, bebedouros, pet shops e regras dos condomínios. Este guia reúne o que as fontes documentam sobre a vida pet no Jardim das Perdizes, com fonte datada em cada linha.",
    takeaways: [
      "O parque tem bebedouros para pets e é citado como espaço pet-friendly (artigo institucional).",
      "A programação JP Experience inclui eventos para famílias e pets (página oficial).",
      "O portal Guia Jardim das Perdizes documenta pet shops no bairro, como Oito Patas e Retiro Pet.",
      "Regras de pets variam por condomínio — confirme na ficha de cada produto.",
    ],
    sections: [
      {
        title: "Estrutura pet no bairro",
        headers: ["Item", "Perfil", "Fonte"],
        rows: [
          { name: "Bebedouros para pets", category: "Equipamento do parque", source: "Artigo institucional Tecnisa (44 mil m²)" },
          { name: "Eventos para pets", category: "Programação JP Experience", source: "Página oficial do bairro (Tecnisa)" },
          { name: "Oito Patas Petshop", category: "Pet shop no bairro", source: "Portal Guia Jardim das Perdizes" },
          { name: "Retiro Pet", category: "Serviço pet no bairro", source: "Portal Guia Jardim das Perdizes" },
        ],
      },
    ],
    sourceNote: `${VERIFIED}. Fontes: artigo institucional Tecnisa, página oficial do bairro e portal Guia Jardim das Perdizes — consolidadas no caderno de ecossistema (captura 27/08/2026). Regras de pets por condomínio variam; confirme na ficha de cada produto.`,
  },
};