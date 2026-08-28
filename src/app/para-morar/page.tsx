import { buildPageMetadata } from "@/lib/seo/metadata";

export const metadata = buildPageMetadata({
  title: "Para Morar no Jardim das Perdizes — Jardim das Perdizes Broker",
  description:
    "Como avaliar bairro, condomínio, rotina e custo para morar no Jardim das Perdizes: etapas, modalidades (na planta, em construção, novos, revendas) e perfil de moradia.",
  path: "/para-morar/",
});

export default function ParaMorarPage() {
  return (
    <section className="px-6 py-12">
      <h1 className="text-3xl font-semibold tracking-tight">
        Para Morar no Jardim das Perdizes
      </h1>
      <p className="mt-3 max-w-2xl text-lg leading-8 text-zinc-600">
        Morar no Jardim das Perdizes envolve decidir entre comprar ou alugar e,
        em cada caso, entre na planta, em construção, novo ou revenda. Aqui você
        encontra o caminho para avaliar bairro, condomínio, rotina e custo —
        sem promessas, com critérios claros.
      </p>

      <h2 className="mt-10 text-xl font-semibold">Etapas e modos de decisão</h2>
      <ul className="mt-4 max-w-2xl list-disc space-y-2 pl-5 text-zinc-700">
        <li>Como é morar no Jardim das Perdizes: rotina, perfil e trade-offs.</li>
        <li>Na planta: aprovação, memorial, risco, prazo e decisão.</li>
        <li>Em construção: obra, etapas, entrega, financiamento e acompanhamento.</li>
        <li>Novos e recém-entregues: maturidade, garantia, condomínio e ocupação.</li>
        <li>Revendas: mercado secundário, preço, documentação e negociação.</li>
        <li>Quanto custa morar: custo total, não apenas o preço de compra.</li>
      </ul>

      <p className="mt-10 max-w-2xl text-zinc-600">
        Os condomínios do bairro são apresentados com dados verificados de
        torres, unidades e metragens em{" "}
        <a href="/condominios-e-produtos/" className="underline hover:text-zinc-800">
          Condomínios e Produtos
        </a>
        .
      </p>
    </section>
  );
}
