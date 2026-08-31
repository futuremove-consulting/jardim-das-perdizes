import Link from "next/link";
import { buildPageMetadata } from "@/lib/seo/metadata";
import DiscoveryExplorer from "@/components/discovery/DiscoveryExplorer";

export const metadata = buildPageMetadata({
  title: "Encontre seu Perfil no Jardim das Perdizes — Broker",
  description:
    "Explore os 9 produtos do Jardim das Perdizes por estágio, área e plantas oficiais: prontos para morar, em obras e breve lançamento, com dados verificados e fonte datada.",
  path: "/encontre-seu-perfil/",
});

export default function EncontreSeuPerfilPage() {
  return (
    <section className="px-6 py-12">
      <h1 className="text-3xl font-semibold tracking-tight">
        Encontre seu Perfil
      </h1>
      <p className="mt-3 max-w-2xl text-lg leading-8 text-ink-soft">
        Seja para morar, alugar ou investir, cada perfil tem um tipo de imóvel e
        de condomínio mais adequado. Explore os produtos do bairro por estágio,
        área e plantas oficiais — e entenda o que combina com sua rotina,
        família, orçamento e preferências.
      </p>

      <DiscoveryExplorer />

      <h2 className="mt-16 text-xl font-semibold">
        O que o explorador não responde (e o atendimento sim)
      </h2>
      <ul className="mt-4 max-w-2xl list-disc space-y-2 pl-5 text-ink-soft">
        <li>Unidades específicas: disponibilidade, posição, preço e condições.</li>
        <li>Valores de venda e de locação — negociados por unidade, não por perfil.</li>
        <li>Plantas de produtos que não as publicaram (sempre explicitados acima).</li>
      </ul>

      <p className="mt-10 max-w-2xl text-ink-soft">
        As fichas completas de cada condomínio ficam em{" "}
        <Link href="/condominios/" className="underline hover:text-ink">
          Condomínios
        </Link>
        .
      </p>
    </section>
  );
}
