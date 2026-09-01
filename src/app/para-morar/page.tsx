import Link from "next/link";
import { buildPageMetadata } from "@/lib/seo/metadata";
import KeyTakeaways from "@/components/content/KeyTakeaways";
import Faq from "@/components/content/Faq";
import JsonLd from "@/components/seo/JsonLd";
import {
  faqPageSchema,
  breadcrumbSchema,
  type FaqItem,
} from "@/lib/seo/schemas";

export const metadata = buildPageMetadata({
  title: "Para Morar no Jardim das Perdizes — Jardim das Perdizes Broker",
  description:
    "Como avaliar bairro, condomínio, rotina e custo para morar no Jardim das Perdizes: modalidades (na planta, em construção, pronto e revenda), o que verificar em cada etapa e FAQ com dados verificados.",
  path: "/para-morar/",
});

const FAQ_ITEMS: FaqItem[] = [
  {
    question: "O parque do Jardim das Perdizes é público?",
    answer:
      "Sim. O parque central de 45 mil m² é público e aberto à visitação — morar no bairro significa viver ao lado dele, e as torres têm vista privilegiada para essa área verde.",
  },
  {
    question: "Dá para comprar na planta no bairro hoje?",
    answer:
      "Sim. Em 31/08/2026, a Tecnisa anunciava o Sequoia como breve lançamento e três produtos em obras — Bosque Cerejeiras, Reserva Flamboyant e Recanto Oliveiras. A comercialização do Sequoia ocorrerá após o registro da incorporação (Lei 4.591/64).",
  },
  {
    question: "Existem opções prontas para morar?",
    answer:
      "Sim. A Reserva Figueiras aparece como 'Pronto para morar' na página oficial da Tecnisa (verificado em 31/08/2026), e os produtos entregues — Reserva Manacá, Recanto Jacarandá, TIME Life e Bosque Pitangueiras — circulam no mercado de revenda.",
  },
  {
    question: "Quanto custa morar no Jardim das Perdizes?",
    answer:
      "Além do preço de compra ou aluguel, o custo total inclui condomínio, IPTU e custos de mudança. Os valores de condomínio variam por produto e por metragem; quando confirmados por fonte datada, constam na ficha de cada condomínio.",
  },
];

const MODALIDADES: Array<{
  modalidade: string;
  situacao: string;
  verificar: string;
}> = [
  {
    modalidade: "Na planta (breve lançamento)",
    situacao: "Sequoia — 3 e 4 dormitórios, 121–175 m², registro de incorporação em fase",
    verificar:
      "Memorial descritivo, incorporadora (Windsor) e o fato de a comercialização só ocorrer após o registro (Lei 4.591/64)",
  },
  {
    modalidade: "Em construção",
    situacao:
      "Bosque Cerejeiras (222–569 m²), Reserva Flamboyant (157–377 m²) e Recanto Oliveiras (83–111 m²)",
    verificar:
      "Estágio de obra publicado pela incorporadora, previsão de entrega e fluxo de pagamentos",
  },
  {
    modalidade: "Pronto para morar",
    situacao: "Reserva Figueiras — 165 e 188 m² (fonte oficial, 31/08/2026)",
    verificar:
      "Condomínio real em reais, taxa de ocupação e lazer efetivamente entregue",
  },
  {
    modalidade: "Revenda (mercado secundário)",
    situacao:
      "Produtos entregues: Reserva Manacá, Recanto Jacarandá, TIME Life e Bosque Pitangueiras",
    verificar:
      "Documentação, ausência de débitos, preço praticado vs. tabela de lançamento",
  },
];

export default function ParaMorarPage() {
  return (
    <section className="px-6 py-12">
      <h1 className="text-3xl font-semibold tracking-tight">
        Para Morar no Jardim das Perdizes
      </h1>

      <KeyTakeaways
        items={[
          "Parque central de 45 mil m², público, com certificação AQUA (primeiro bairro da América Latina) e câmeras integradas ao projeto Muralha Paulista.",
          "Nove produtos no bairro; em 31/08/2026, quatro à venda pela incorporadora — de 83 a 569 m² privativos.",
          "Quatro modalidades de compra: na planta, em construção, pronto para morar e revenda — cada uma com o que verificar.",
          "Custo total de moradia = preço + condomínio + IPTU; fichas com fonte e data de verificação em cada dado.",
        ]}
      />

      <p className="mt-8 max-w-2xl text-lg leading-8 text-ink-soft">
        Morar no Jardim das Perdizes é decidir entre comprar ou alugar e, em
        cada caso, entre na planta, em construção, pronto ou revenda. O caminho
        abaixo organiza a decisão em critérios verificáveis — bairro, condomínio,
        rotina e custo total — sem promessas de valorização, com fonte e data em
        cada dado.
      </p>

      <h2 className="mt-12 text-xl font-semibold">
        Modalidades de compra no bairro hoje
      </h2>
      <div className="mt-4 max-w-3xl overflow-x-auto">
        <table className="w-full border-collapse text-sm">
          <thead>
            <tr className="border-b border-line text-left text-muted">
              <th className="py-2 pr-4 font-medium">Modalidade</th>
              <th className="py-2 pr-4 font-medium">
                Situação no bairro (31/08/2026)
              </th>
              <th className="py-2 font-medium">O que verificar</th>
            </tr>
          </thead>
          <tbody>
            {MODALIDADES.map((row) => (
              <tr key={row.modalidade} className="border-b border-line align-top">
                <td className="py-3 pr-4 font-medium text-ink">{row.modalidade}</td>
                <td className="py-3 pr-4 text-ink-soft">{row.situacao}</td>
                <td className="py-3 text-ink-soft">{row.verificar}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h2 className="mt-12 text-xl font-semibold">Etapas e modos de decisão</h2>
      <ul className="mt-4 max-w-2xl list-disc space-y-2 pl-5 text-ink-soft">
        <li>Como é morar no Jardim das Perdizes: rotina, perfil e trade-offs.</li>
        <li>Na planta: aprovação, memorial, risco, prazo e decisão.</li>
        <li>Em construção: obra, etapas, entrega, financiamento e acompanhamento.</li>
        <li>Novos e recém-entregues: maturidade, garantia, condomínio e ocupação.</li>
        <li>Revendas: mercado secundário, preço, documentação e negociação.</li>
        <li>Quanto custa morar: custo total, não apenas o preço de compra.</li>
      </ul>

      <Faq items={FAQ_ITEMS} />

      <div className="mt-12 max-w-2xl rounded-2xl border border-line p-6">
        <h2 className="text-lg font-semibold">Próximo passo — duas portas</h2>
        <p className="mt-2 text-ink-soft">
          Explore as fichas verificadas dos condomínios ou descubra qual perfil
          de moradia combina com a sua rotina e orçamento.
        </p>
        <div className="mt-4 flex flex-wrap gap-3">
          <Link
            href="/condominios/"
            className="rounded-full bg-brand px-5 py-2.5 text-sm font-medium text-white transition-colors hover:opacity-90"
          >
            Explorar condomínios
          </Link>
          <Link
            href="/para-trabalhar/"
            className="rounded-full border border-line px-5 py-2.5 text-sm font-medium text-ink transition-colors hover:border-brand"
          >
            Trabalhar no bairro
          </Link>
        </div>
      </div>

      <JsonLd schema={faqPageSchema(FAQ_ITEMS)} />
      <JsonLd
        schema={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Para Morar", path: "/para-morar/" },
        ])}
      />

      <p className="mt-10 max-w-2xl text-xs text-muted">
        Fontes: páginas oficiais da Tecnisa dos produtos do bairro (captura
        31/08/2026) e matriz de torres e produtos do projeto. Verificação por
        ficha em{" "}
        <Link href="/condominios/" className="underline hover:text-ink">
          Condomínios
        </Link>
        .
      </p>
    </section>
  );
}
