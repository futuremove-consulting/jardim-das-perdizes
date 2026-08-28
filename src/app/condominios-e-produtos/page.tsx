import Link from "next/link";
import { CONDOMINIUMS } from "@/data/condominiums";
import { buildPageMetadata } from "@/lib/seo/metadata";

export const metadata = buildPageMetadata({
  title: "Condomínios e Produtos — Jardim das Perdizes",
  description:
    "Os 5 condomínios do Jardim das Perdizes com dados verificados: torres confirmadas, unidades, metragens e status de entrega.",
  path: "/condominios-e-produtos/",
});

export default function CondominiumsIndexPage() {
  return (
    <section className="px-6 py-12">
      <h1 className="text-3xl font-semibold tracking-tight">
        Condomínios e Produtos
      </h1>
      <p className="mt-3 max-w-2xl text-zinc-600">
        Conheça os condomínios do Jardim das Perdizes com os dados confirmados
        de torres, unidades, metragens e status de entrega.
      </p>

      <div className="mt-10 grid gap-6 md:grid-cols-2">
        {CONDOMINIUMS.map((c) => (
          <Link
            key={c.slug}
            href={`/condominios-e-produtos/${c.slug}/`}
            className="rounded-2xl border border-zinc-200 p-6 transition-colors hover:border-zinc-400"
          >
            <div className="flex items-center justify-between gap-3">
              <h2 className="text-xl font-semibold">{c.name}</h2>
              <span
                className={`shrink-0 rounded-full px-3 py-1 text-xs font-medium ${
                  c.deliveryStatus === "delivered"
                    ? "bg-emerald-100 text-emerald-800"
                    : "bg-amber-100 text-amber-800"
                }`}
              >
                {c.deliveryStatus === "delivered" ? "Entregue" : "Em construção"}
              </span>
            </div>
            <p className="mt-3 text-sm leading-6 text-zinc-600">{c.blurb}</p>
            <p className="mt-4 text-sm font-medium text-zinc-800">
              {c.units} unidades · {c.areaMin}–{c.areaMax} m²
            </p>
          </Link>
        ))}
      </div>
    </section>
  );
}