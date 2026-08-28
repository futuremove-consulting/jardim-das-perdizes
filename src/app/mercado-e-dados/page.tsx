import { buildPageMetadata } from "@/lib/seo/metadata";

export const metadata = buildPageMetadata({
  title: "Mercado & Dados do Jardim das Perdizes — Broker",
  description:
    "O principal ativo de autoridade do bairro: preços pedidos, aluguéis observados, condomínio e IPTU, valorização e histórico de lançamentos — com fontes e metodologia.",
  path: "/mercado-e-dados/",
});

export default function MercadoEDadosPage() {
  return (
    <section className="px-6 py-12">
      <h1 className="text-3xl font-semibold tracking-tight">
        Mercado &amp; Dados
      </h1>
      <p className="mt-3 max-w-2xl text-lg leading-8 text-zinc-600">
        Este é o principal ativo de autoridade do Jardim das Perdizes: dados
        agregados, relatórios e análises sobre o mercado do bairro. Cada
        relatório informa período, data de captura, amostra, fonte, método e
        limitações.
      </p>

      <h2 className="mt-10 text-xl font-semibold">O que é monitorado</h2>
      <ul className="mt-4 max-w-2xl list-disc space-y-2 pl-5 text-zinc-700">
        <li>Preços pedidos e preços por m².</li>
        <li>Aluguéis observados.</li>
        <li>Condomínio e IPTU.</li>
        <li>Preço pedido versus fechado.</li>
        <li>Histórico de lançamentos e valorização nominal versus real.</li>
        <li>Oferta, demanda, liquidez e obras em andamento.</li>
      </ul>

      <p className="mt-10 max-w-2xl text-zinc-600">
        Detalhes sobre fontes e metodologia estão em{" "}
        <a href="/fontes-e-metodo/" className="underline hover:text-zinc-800">
          Fontes e Método
        </a>
        .
      </p>
    </section>
  );
}
