import Link from "next/link";
import { buildPageMetadata } from "@/lib/seo/metadata";
import { faqPageSchema, breadcrumbSchema, crumb } from "@/lib/seo/schemas";
import JsonLd from "@/components/seo/JsonLd";
import KeyTakeaways from "@/components/content/KeyTakeaways";
import Faq from "@/components/content/Faq";

const FAQ_ITEMS = [
  {
    question: "Onde fica o Jardim das Perdizes?",
    answer:
      "Entre Perdizes e Pompéia, na Zona Oeste de São Paulo, junto à região de Água Branca e Barra Funda. Os endereços oficiais dos produtos do bairro usam CEPs 05036-xxx (verificado em 31/08/2026).",
  },
  {
    question: "O parque do Jardim das Perdizes é público?",
    answer:
      "Sim. O parque central tem aproximadamente 45 mil m² (a medição varia entre 44 e 46 mil m² conforme o perímetro adotado) e atributos públicos confirmados pela Prefeitura, como ciclovia, playground, acessibilidade e iluminação LED.",
  },
  {
    question: "O metrô já atende o Jardim das Perdizes?",
    answer:
      "A Linha 6-Laranja opera em regime de operação assistida no primeiro trecho desde 01/07/2026: dias úteis, das 10h às 15h, seis estações e intervalo médio de 19 minutos (Agência SP). Isso não equivale a operação plena, e prazos de expansão não são prometidos.",
  },
  {
    question: "Quais condomínios existem no bairro?",
    answer:
      "A Broker mapeia 9 produtos com fonte e data de verificação, dos quais 5 têm plantas oficiais divulgadas — do Sequoia (breve lançamento, 121–175 m²) ao Bosque Cerejeiras (até duplex de 569 m²).",
  },
];

export const metadata = buildPageMetadata({
  title: "Guia do Jardim das Perdizes — Jardim das Perdizes Broker",
  description:
    "Onde fica, o parque, a mobilidade (Linha 6-Laranja), o entorno e o mercado do Jardim das Perdizes — guia hiperlocal com fonte e data de verificação em cada fato.",
  path: "/guia-jardim-das-perdizes/",
});

export default function GuiaJardimDasPerdizesPage() {
  return (
    <section className="container-page py-12">
      <JsonLd schema={faqPageSchema(FAQ_ITEMS)} />
      <JsonLd
        schema={breadcrumbSchema([
          crumb("/"),
          crumb("/guia-jardim-das-perdizes/"),
        ])}
      />

      <h1 className="text-3xl font-semibold tracking-tight">
        Guia do Jardim das Perdizes: onde fica, o parque, a mobilidade e o
        mercado
      </h1>
      <p className="mt-4 max-w-2xl text-lg leading-8 text-ink-soft">
        O Jardim das Perdizes é um bairro planejado entre Perdizes e Pompéia,
        na Zona Oeste de São Paulo, organizado em torno de um parque central
        público de aproximadamente 45 mil m². Este guia reúne o que é
        verificado sobre localização, mobilidade, entorno e mercado — cada fato
        com fonte e data.
      </p>

      <KeyTakeaways
        items={[
          "Bairro planejado entre Perdizes e Pompéia (Zona Oeste de São Paulo), com parque central público.",
          "Parque de aproximadamente 45 mil m² — medições variam de 44 a 46 mil m² conforme o perímetro; publicamos fonte e data.",
          "Primeiro bairro da América Latina a conquistar o certificado AQUA (fonte institucional, 31/08/2026).",
          "Linha 6-Laranja em operação assistida no primeiro trecho (dias úteis, 10h–15h, seis estações) desde julho de 2026 — não é operação plena.",
        ]}
      />

      <h2 className="mt-10 text-xl font-semibold">Onde fica</h2>
      <p className="mt-3 max-w-2xl leading-7 text-ink-soft">
        O bairro ocupa a área entre Perdizes e Pompéia, na Zona Oeste de São
        Paulo, no entorno de Água Branca e Barra Funda. Os endereços oficiais
        dos produtos usam CEPs 05036-xxx (ex.: Rua Pablo Picasso, 50 —
        05036-040; R. Marc Chagall, s/n — 05036-170). Fonte: páginas oficiais
        dos produtos (captura 31/08/2026).
      </p>

      <h2 className="mt-10 text-xl font-semibold">O Parque Jardim das Perdizes</h2>
      <p className="mt-3 max-w-2xl leading-7 text-ink-soft">
        Parque central público de aproximadamente 45 mil m² com espécies
        nativas e obras de arte de Tomie Ohtake e Frans Krajcberg (fonte
        institucional, captura 31/08/2026). A fonte municipal confirma
        atributos públicos como ciclovia, playground, acessibilidade,
        iluminação LED, drenagem e inventário de flora. Por isso, publicamos a
        metragem com a ressalva de medição (44–46 mil m²) em vez de um número
        absoluto.
      </p>

      <h2 className="mt-10 text-xl font-semibold">
        Mobilidade e Linha 6-Laranja
      </h2>
      <p className="mt-3 max-w-2xl leading-7 text-ink-soft">
        Desde 01/07/2026, a Linha 6-Laranja opera em regime de{" "}
        <strong>operação assistida</strong> no primeiro trecho: de segunda a
        sexta, das 10h às 15h, em seis estações, com intervalo médio de 19
        minutos (Agência SP). Operação assistida não é operação plena — e não
        prometemos prazos de expansão nem efeitos de valorização.
      </p>

      <h2 className="mt-10 text-xl font-semibold">Entorno, cultura e lazer</h2>
      <p className="mt-3 max-w-2xl leading-7 text-ink-soft">
        No raio de convívio do bairro estão Allianz/Nubank Parque, SESC
        Pompeia, Memorial da América Latina e Parque da Água Branca, além do
        comércio de Pompéia e Perdizes. A segurança é apresentada pelo bairro
        como claim institucional (monitoramento 24h e câmeras interligadas ao
        projeto Muralha Paulista, 31/08/2026) — tratamos o claim como tal, não
        como fato absoluto.
      </p>

      <h2 className="mt-10 text-xl font-semibold">
        Fatos verificados, com fonte
      </h2>
      <div className="mt-4 max-w-3xl overflow-x-auto">
        <table className="w-full border-collapse text-sm">
          <thead>
            <tr className="border-b border-line text-left text-muted">
              <th className="py-2 pr-4 font-medium">Fato</th>
              <th className="py-2 pr-4 font-medium">Informação verificada</th>
              <th className="py-2 font-medium">Fonte</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b border-line">
              <td className="py-2 pr-4">Parque central</td>
              <td className="py-2 pr-4">
                ~45 mil m², público, espécies nativas, obras de Tomie Ohtake e
                Frans Krajcberg
              </td>
              <td className="py-2">Institucional (31/08/2026)</td>
            </tr>
            <tr className="border-b border-line">
              <td className="py-2 pr-4">Certificação AQUA</td>
              <td className="py-2 pr-4">
                Primeiro bairro da América Latina com o certificado
              </td>
              <td className="py-2">Institucional (31/08/2026)</td>
            </tr>
            <tr className="border-b border-line">
              <td className="py-2 pr-4">Linha 6-Laranja</td>
              <td className="py-2 pr-4">
                Operação assistida no 1º trecho: dias úteis, 10h–15h, seis
                estações, intervalo médio de 19 min
              </td>
              <td className="py-2">Agência SP (01/07/2026)</td>
            </tr>
            <tr className="border-b border-line">
              <td className="py-2 pr-4">Segurança</td>
              <td className="py-2 pr-4">
                Monitoramento 24h e câmeras interligadas ao Muralha Paulista
                (claim institucional)
              </td>
              <td className="py-2">Institucional (31/08/2026)</td>
            </tr>
            <tr className="border-b border-line">
              <td className="py-2 pr-4">Produtos do bairro</td>
              <td className="py-2 pr-4">
                9 condomínios mapeados; 5 com plantas oficiais divulgadas
              </td>
              <td className="py-2">Broker (captura 31/08/2026)</td>
            </tr>
          </tbody>
        </table>
      </div>

      <Faq items={FAQ_ITEMS} />

      <section
        className="mt-12 max-w-2xl rounded-2xl border border-line p-6"
        aria-label="Próximos passos"
      >
        <h2 className="text-lg font-semibold">Dê o próximo passo</h2>
        <p className="mt-2 text-ink-soft">
          Compare os produtos do bairro com dados verificados ou descubra qual
          perfil combina com a sua rotina:
        </p>
        <div className="mt-4 flex flex-wrap gap-3">
          <Link
            href="/condominios/"
            className="rounded-full bg-brand px-5 py-2.5 text-sm font-medium text-brand-contrast hover:opacity-90"
          >
            Explorar condomínios
          </Link>
          <Link
            href="/para-trabalhar"
            className="rounded-full border border-line px-5 py-2.5 text-sm font-medium hover:border-brand"
          >
            Trabalhar no bairro
          </Link>
        </div>
      </section>

      <p className="mt-10 max-w-2xl text-xs text-muted">
        Fontes: páginas oficiais dos produtos e do bairro (Tecnisa, captura
        31/08/2026); Agência SP — operação do primeiro trecho da Linha
        6-Laranja (01/07/2026); fonte municipal para atributos públicos do
        parque. Método em{" "}
        <Link href="/fontes-e-metodo/" className="underline hover:text-ink">
          Fontes e Método
        </Link>
        .
      </p>
    </section>
  );
}
