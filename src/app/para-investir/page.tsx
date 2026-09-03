import Link from "next/link";
import { buildPageMetadata } from "@/lib/seo/metadata";
import KeyTakeaways from "@/components/content/KeyTakeaways";
import Faq from "@/components/content/Faq";
import JsonLd from "@/components/seo/JsonLd";
import {
  faqPageSchema,
  breadcrumbSchema,
  crumb,
  type FaqItem,
} from "@/lib/seo/schemas";

export const metadata = buildPageMetadata({
  title: "Para Investir no Jardim das Perdizes — Jardim das Perdizes Broker",
  description:
    "Dados, cenários, custos e riscos para investir no Jardim das Perdizes: renda e locação, estratégia de revenda e análise honesta — sem promessa de valorização garantida.",
  path: "/para-investir/",
});

const FAQ_ITEMS: FaqItem[] = [
  {
    question: "Quais produtos estão disponíveis para investir hoje?",
    answer:
      "Em 31/08/2026: Sequoia (breve lançamento), Bosque Cerejeiras, Reserva Flamboyant e Recanto Oliveiras (em obras), Reserva Figueiras (pronto para morar) e quatro produtos entregues no mercado secundário — Reserva Manacá, Recanto Jacarandá, TIME Life e Bosque Pitangueiras.",
  },
  {
    question: "Comprar na planta para revender vale a pena?",
    answer:
      "Pode ser uma estratégia, com riscos claros: prazo de entrega, liquidez da tipologia e custo total até a entrega. A revenda nunca é garantida — avalie cenários com dados datados antes de decidir.",
  },
  {
    question: "O bairro tem boa demanda de aluguel?",
    answer:
      "O perfil do bairro é de alto padrão, e a demanda de locação deve ser avaliada por aluguéis observados e tempo médio de anúncio por tipologia. O diagnóstico de Mercado reúne esses indicadores com fonte e data.",
  },
  {
    question: "E o mercado comercial (lojas e lajes)?",
    answer:
      "O bairro conta com braço corporativo — o endereço oficial da Tecnisa no bairro é a Torre Time Corporate, na Av. Nicolas Boer. Análises de lojas e lajes exigem laudo próprio; procure com o objetivo declarado.",
  },
];

const ESTRATEGIAS: Array<{
  estrategia: string;
  produtos: string;
  verificar: string;
}> = [
  {
    estrategia: "Renda e locação — fluxo mensal preservando a titularidade",
    produtos:
      "Produtos entregues e prontos: Reserva Manacá, Recanto Jacarandá, TIME Life (57–83 m²), Bosque Pitangueiras (79–136 m²) e Reserva Figueiras (165–188 m², pronto para morar)",
    verificar:
      "Aluguel observado por tipologia, vacância, condomínio, IPTU e yield líquido — nunca o yield bruto isolado",
  },
  {
    estrategia: "Revenda em fase inicial — entrada antes da entrega",
    produtos:
      "Sequoia (breve lançamento, 121–175 m²), Bosque Cerejeiras (222–569 m²), Reserva Flamboyant (157–377 m²) e Recanto Oliveiras (83–111 m²)",
    verificar:
      "Horizonte de saída, liquidez da tipologia, estágio de obra publicado e risco de prazo",
  },
  {
    estrategia: "Comercial — lojas e lajes corporativas",
    produtos:
      "Braço corporativo do bairro (a Torre Time Corporate, na Av. Nicolas Boer, abriga o endereço oficial da Tecnisa)",
    verificar:
      "Laudo específico, tipologia autorizada, fluxo de pedestres e estacionamento",
  },
];

export default function ParaInvestirPage() {
  return (
    <section className="container-page py-12">
      <h1 className="text-3xl font-semibold tracking-tight">
        Para Investir no Jardim das Perdizes
      </h1>

      <KeyTakeaways
        items={[
          "Dois caminhos claros: renda por locação ou estratégia de revenda — sempre com o custo total (condomínio e IPTU) no cálculo.",
          "Espectro de entrada completo (31/08/2026): 4 produtos em fase inicial, 1 pronto para morar e 4 entregues no mercado secundário.",
          "Nenhuma promessa de valorização: séries, inflação e cenários com fonte datada.",
          "O braço comercial existe no bairro, mas exige laudo específico.",
        ]}
      />

      <p className="mt-8 max-w-2xl text-lg leading-8 text-ink-soft">
        Investir no Jardim das Perdizes é escolher entre dois caminhos — renda
        por locação ou revenda — avaliando custo total, liquidez da tipologia e
        riscos de prazo. Nenhuma valorização é garantida: aqui você encontra
        cenários com fonte e data e as fichas verificadas dos 9 produtos do
        bairro.
      </p>

      <h2 className="mt-12 text-xl font-semibold">
        Estratégias de investimento no bairro
      </h2>
      <div className="mt-4 max-w-3xl overflow-x-auto">
        <table className="w-full border-collapse text-sm">
          <thead>
            <tr className="border-b border-line text-left text-muted">
              <th className="py-2 pr-4 font-medium">Estratégia</th>
              <th className="py-2 pr-4 font-medium">
                Produtos do bairro (31/08/2026)
              </th>
              <th className="py-2 font-medium">O que verificar</th>
            </tr>
          </thead>
          <tbody>
            {ESTRATEGIAS.map((row) => (
              <tr key={row.estrategia} className="border-b border-line align-top">
                <td className="py-3 pr-4 font-medium text-ink">
                  {row.estrategia}
                </td>
                <td className="py-3 pr-4 text-ink-soft">{row.produtos}</td>
                <td className="py-3 text-ink-soft">{row.verificar}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h2 className="mt-12 text-xl font-semibold">
        Custo total: o que corrói o yield
      </h2>
      <ul className="mt-4 max-w-2xl list-disc space-y-2 pl-5 text-ink-soft">
        <li>Condomínio e IPTU variam por produto e metragem — constam na ficha quando confirmados por fonte datada.</li>
        <li>Vacância entre contratos e períodos de obra reduzem o retorno efetivo.</li>
        <li>Valorização nominal não é ganho real: compare com a inflação do período.</li>
      </ul>

      <Faq items={FAQ_ITEMS} />

      <div className="mt-12 max-w-2xl rounded-2xl border border-line p-6">
        <h2 className="text-lg font-semibold">Próximo passo — duas portas</h2>
        <p className="mt-2 text-ink-soft">
          Compare as fichas verificadas dos produtos ou aprofunde nos dados de
          mercado antes de decidir.
        </p>
        <div className="mt-4 flex flex-wrap gap-3">
          <Link
            href="/condominios/"
            className="rounded-full bg-brand px-5 py-2.5 text-sm font-medium text-brand-contrast transition-colors hover:opacity-90"
          >
            Explorar condomínios
          </Link>
          <Link
            href="/mercado-e-dados/"
            className="rounded-full border border-line px-5 py-2.5 text-sm font-medium text-ink transition-colors hover:border-brand"
          >
            Ver Mercado &amp; Dados
          </Link>
        </div>
      </div>

      <JsonLd schema={faqPageSchema(FAQ_ITEMS)} />
      <JsonLd
        schema={breadcrumbSchema([crumb("/"), crumb("/para-investir/")])}
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
