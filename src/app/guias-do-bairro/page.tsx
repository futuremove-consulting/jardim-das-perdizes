import { buildPageMetadata } from "@/lib/seo/metadata";

export const metadata = buildPageMetadata({
  title: "Guias do Bairro Jardim das Perdizes — Jardim das Perdizes Broker",
  description:
    "O parque, a mobilidade, o comércio, a educação, a cultura e a segurança do Jardim das Perdizes — um sistema de guias atualizado e verificado.",
  path: "/guias-do-bairro/",
});

export default function GuiasDoBairroPage() {
  return (
    <section className="px-6 py-12">
      <h1 className="text-3xl font-semibold tracking-tight">
        Guias do Bairro
      </h1>
      <p className="mt-3 max-w-2xl text-lg leading-8 text-zinc-600">
        Os guias do Jardim das Perdizes ajudam a entender a vida no bairro
        antes de decidir morar. Cada tema é tratado como um sistema atualizado,
        com fontes e avisos de que horários e operações podem mudar.
      </p>

      <h2 className="mt-10 text-xl font-semibold">Temas cobertos</h2>
      <ul className="mt-4 max-w-2xl list-disc space-y-2 pl-5 text-zinc-700">
        <li>Parque Jardim das Perdizes: horários, regras, acessibilidade e história.</li>
        <li>Mobilidade: Linha 6-Laranja, estações, ônibus, trem e metrô.</li>
        <li>Comércio e serviços do bairro.</li>
        <li>Educação e saúde.</li>
        <li>Cultura, lazer e eventos na região.</li>
        <li>Segurança, privacidade e governança.</li>
      </ul>

      <p className="mt-10 max-w-2xl text-zinc-600">
        Comece pelo{" "}
        <a href="/guia-jardim-das-perdizes/" className="underline hover:text-zinc-800">
          Guia do Jardim das Perdizes
        </a>
        , a porta de entrada para o bairro.
      </p>
    </section>
  );
}
