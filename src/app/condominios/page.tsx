import Link from "next/link";
import { CONDOMINIUMS, STATUS_LABELS, type DeliveryStatus } from "@/data/condominiums";
import { buildPageMetadata } from "@/lib/seo/metadata";

const STATUS_TONE: Record<DeliveryStatus, string> = {
  delivered: "bg-emerald-100 text-emerald-800",
  "ready-to-move": "bg-emerald-100 text-emerald-800",
  "under-construction": "bg-amber-100 text-amber-800",
  "coming-soon": "bg-sky-100 text-sky-800",
};

export const metadata = buildPageMetadata({
  title: "Condomínios — Jardim das Perdizes",
  description:
    "Os 9 condomínios e produtos do Jardim das Perdizes com dados verificados e fonte datada: torres confirmadas, unidades, metragens, tipologias e status de entrega.",
  path: "/condominios/",
});

export default function CondominiumsIndexPage() {
  return (
    <section className="px-6 py-12">
      <h1 className="text-3xl font-semibold tracking-tight">
        Condomínios
      </h1>
      <p className="mt-3 max-w-2xl text-ink-soft">
        Conheça os condomínios do Jardim das Perdizes com dados confirmados de
        torres, unidades, metragens, tipologias e status de entrega — cada
        ficha indica a fonte e a data de verificação.
      </p>

      <div className="mt-10 grid gap-6 md:grid-cols-2">
        {CONDOMINIUMS.map((c) => (
          <Link
            key={c.slug}
            href={`/condominios/${c.slug}/`}
            className="rounded-2xl border border-line p-6 transition-colors hover:border-brand"
          >
            <div className="flex items-center justify-between gap-3">
              <h2 className="text-xl font-semibold">{c.name}</h2>
              <span
                className={`shrink-0 rounded-full px-3 py-1 text-xs font-medium ${STATUS_TONE[c.deliveryStatus]}`}
              >
                {STATUS_LABELS[c.deliveryStatus]}
              </span>
            </div>
            <p className="mt-3 text-sm leading-6 text-ink-soft">{c.blurb}</p>
            <p className="mt-4 text-sm font-medium text-ink">
              {c.units !== undefined
                ? `${c.units} unidades`
                : "Unidades não divulgadas"}{" "}
              · {c.areaMin}–{c.areaMax} m²
            </p>
          </Link>
        ))}
      </div>
    </section>
  );
}