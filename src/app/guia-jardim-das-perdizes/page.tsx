import { buildPageMetadata } from "@/lib/seo/metadata";

export const metadata = buildPageMetadata({
  title: "Guia do Jardim das Perdizes — Jardim das Perdizes Broker",
  description:
    "A porta de entrada para o bairro: onde fica, o parque, a mobilidade, o comércio, a educação, a cultura e o mercado — em um guia hiperlocal verificado.",
  path: "/guia-jardim-das-perdizes/",
});

export default function GuiaJardimDasPerdizesPage() {
  return (
    <section className="px-6 py-12">
      <h1 className="text-3xl font-semibold tracking-tight">
        Guia do Jardim das Perdizes
      </h1>
      <p className="mt-3 max-w-2xl text-lg leading-8 text-zinc-600">
        O Jardim das Perdizes é um bairro na região de Perdizes, em São Paulo,
        marcado pela presença do Parque Jardim das Perdizes e pela chegada de
        novas opções de mobilidade. Este guia reúne o que é verificado sobre o
        bairro para você decidir com contexto.
      </p>

      <h2 className="mt-10 text-xl font-semibold">O que este guia cobre</h2>
      <ul className="mt-4 max-w-2xl list-disc space-y-2 pl-5 text-zinc-700">
        <li>Onde fica e como se relaciona com a região de Perdizes.</li>
        <li>O Parque Jardim das Perdizes: uso, regras e história.</li>
        <li>Mobilidade, incluindo a Linha 6-Laranja e distâncias reais.</li>
        <li>Comércio, serviços, educação, saúde e lazer.</li>
        <li>Segurança, privacidade e governança do bairro.</li>
        <li>Relação com o mercado imobiliário local.</li>
      </ul>

      <p className="mt-10 max-w-2xl text-zinc-600">
        Continue explorando:{" "}
        <a href="/guias-do-bairro/" className="underline hover:text-zinc-800">
          Guias do Bairro
        </a>{" "}
        ·{" "}
        <a href="/mercado-e-dados/" className="underline hover:text-zinc-800">
          Mercado &amp; Dados
        </a>
      </p>
    </section>
  );
}
