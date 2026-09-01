import Link from "next/link";
import { buildPageMetadata } from "@/lib/seo/metadata";
import { CONDOMINIUMS } from "@/data/condominiums";
import DiscoveryCard from "@/components/discovery/DiscoveryCard";
import JsonLd from "@/components/seo/JsonLd";
import { breadcrumbSchema } from "@/lib/seo/schemas";

export const metadata = buildPageMetadata({
  title: "Condomínios e produtos do Jardim das Perdizes",
  description:
    "Os 9 produtos residenciais e comerciais do Jardim das Perdizes com torres, tipologias oficiais, status de entrega e fonte datada — fichas verificadas, sem estoque fictício.",
  path: "/condominios-e-produtos/",
});

export default function CondominiumsHubPage() {
  return (
    <section className="px-6 py-12">
      <JsonLd
        schema={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Condomínios", path: "/condominios-e-produtos/" },
        ])}
      />

      <nav className="text-sm text-muted" aria-label="Você está em">
        <Link href="/" className="hover:text-ink">
          Home
        </Link>
        <span className="mx-2" aria-hidden="true">
          /
        </span>
        <span>Condomínios</span>
      </nav>

      <h1 className="mt-6 text-3xl font-semibold tracking-tight">
        Condomínios e produtos do bairro
      </h1>
      <p className="mt-3 max-w-2xl text-ink-soft">
        Todos os produtos residenciais e comerciais do Jardim das Perdizes com
        torres, blocos, plantas oficiais e status de entrega — cada dado com
        fonte e data de verificação.
      </p>

      <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {CONDOMINIUMS.map((condominium) => (
          <DiscoveryCard key={condominium.slug} condominium={condominium} />
        ))}
      </div>

      <div className="mt-12 max-w-2xl rounded-2xl border border-line p-6">
        <h2 className="text-lg font-semibold">Próximo passo — duas portas</h2>
        <p className="mt-2 text-ink-soft">
          Quer comparar perfis por área e plantas? Use o explorador do{" "}
          <Link
            href="/para-morar/"
            className="underline hover:text-ink"
          >
            Para Morar
          </Link>{" "}
          — ou vá direto ao atendimento.
        </p>
        <div className="mt-4 flex flex-wrap gap-3">
          <Link
            href="/#conversao"
            className="rounded-full bg-brand px-5 py-2.5 text-sm font-semibold text-brand-contrast transition-colors hover:opacity-90"
          >
            Enviar solicitação
          </Link>
          <Link
            href="/#conversao"
            className="rounded-full border border-line-strong px-5 py-2.5 text-sm font-medium text-ink transition-colors hover:border-brand hover:text-brand"
          >
            Falar agora com especialista
          </Link>
        </div>
      </div>

      <p className="mt-10 max-w-2xl text-xs text-muted">
        Fontes: páginas oficiais da Tecnisa dos produtos do bairro (captura
        31/08/2026) e matriz de torres e produtos do projeto.
      </p>
    </section>
  );
}