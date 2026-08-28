import { buildPageMetadata } from "@/lib/seo/metadata";

export const metadata = buildPageMetadata({
  title: "Para Investir no Jardim das Perdizes — Jardim das Perdizes Broker",
  description:
    "Dados, cenários, custos e riscos para investir no Jardim das Perdizes: renda e locação, estratégia de revenda e análise honesta — sem promessa de valorização garantida.",
  path: "/para-investir/",
});

export default function ParaInvestirPage() {
  return (
    <section className="px-6 py-12">
      <h1 className="text-3xl font-semibold tracking-tight">
        Para Investir no Jardim das Perdizes
      </h1>
      <p className="mt-3 max-w-2xl text-lg leading-8 text-zinc-600">
        Investir no bairro exige avaliar renda e locação, custos e riscos — e
        tratar revenda como uma possível saída, nunca como garantia. Aqui você
        encontra método e dados para decidir com critério.
      </p>

      <h2 className="mt-10 text-xl font-semibold">O que analisar antes de investir</h2>
      <ul className="mt-4 max-w-2xl list-disc space-y-2 pl-5 text-zinc-700">
        <li>Renda e locação: aluguel observado, vacância, condomínio, IPTU e yield.</li>
        <li>Estratégia de revenda: entrada, horizonte, liquidez e risco de saída.</li>
        <li>Valorização: séries, inflação e cenários — sem promessa de ganho.</li>
        <li>Liquidez e demanda: tipologia, prazo de anúncio e estoque.</li>
        <li>Riscos: documentação, obra, vacância, concentração e mercado.</li>
      </ul>

      <p className="mt-10 max-w-2xl text-zinc-600">
        Relatórios e séries de preço do bairro ficam em{" "}
        <a href="/mercado-e-dados/" className="underline hover:text-zinc-800">
          Mercado &amp; Dados
        </a>
        , com metodologia e limitações declaradas.
      </p>
    </section>
  );
}
