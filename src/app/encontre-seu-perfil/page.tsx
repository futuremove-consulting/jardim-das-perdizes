import { buildPageMetadata } from "@/lib/seo/metadata";

export const metadata = buildPageMetadata({
  title: "Encontre seu Perfil no Jardim das Perdizes — Broker",
  description:
    "Descubra qual perfil de imóvel e de condomínio combina com sua rotina, orçamento e preferências no Jardim das Perdizes.",
  path: "/encontre-seu-perfil/",
});

export default function EncontreSeuPerfilPage() {
  return (
    <section className="px-6 py-12">
      <h1 className="text-3xl font-semibold tracking-tight">
        Encontre seu Perfil
      </h1>
      <p className="mt-3 max-w-2xl text-lg leading-8 text-zinc-600">
        Seja para morar, alugar ou investir, cada perfil tem um tipo de imóvel e
        de condomínio mais adequado. Aqui você entende o que combina com sua
        rotina, família, orçamento e preferências.
      </p>

      <h2 className="mt-10 text-xl font-semibold">Dimensões do perfil</h2>
      <ul className="mt-4 max-w-2xl list-disc space-y-2 pl-5 text-zinc-700">
        <li>Família, pets e home office.</li>
        <li>Rotina de deslocamento e mobilidade.</li>
        <li>Metragem e tipo de condomínio como conceito, sem estoque específico.</li>
        <li>Orçamento e custo total de moradia.</li>
        <li>Perfil para investimento: renda, revenda ou liquidez.</li>
      </ul>

      <p className="mt-10 max-w-2xl text-zinc-600">
        Conheça os condomínios do bairro em{" "}
        <a href="/condominios-e-produtos/" className="underline hover:text-zinc-800">
          Condomínios e Produtos
        </a>
        .
      </p>
    </section>
  );
}
