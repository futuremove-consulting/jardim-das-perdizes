import Link from "next/link";
import { buildPageMetadata } from "@/lib/seo/metadata";
import { getCommercialByModality } from "@/data/commercial";
import { STATUS_LABELS, STATUS_TONES } from "@/data/condominiums";

export const metadata = buildPageMetadata({
  title: "Comprar Salas e Lajes — Jardim das Perdizes",
  description:
    "Salas comerciais (TIME Office) e lajes corporativas (TIME Corporate) à venda no Jardim das Perdizes. Endereço empresarial com certificação AQUA.",
  path: "/para-trabalhar/comprar/",
});

export default function ComprarPage() {
  const properties = getCommercialByModality("comprar");

  return (
    <section className="container-page py-12">
      <h1 className="text-3xl font-semibold tracking-tight">
        Comprar — Salas e Lajes Comerciais
      </h1>
      <p className="mt-3 max-w-2xl text-lg leading-8 text-ink-soft">
        Imóveis comerciais à venda no Jardim das Perdizes. Endereço empresarial
        de prestígio com segurança 24h e certificação AQUA.
      </p>

      <div className="mt-10 grid gap-6 md:grid-cols-2">
        {properties.map((p) => (
          <Link
            key={p.slug}
            href={`/para-trabalhar/comprar/${p.slug}/`}
            className="rounded-2xl border border-line bg-surface p-6 transition-colors hover:border-brand"
          >
            <div className="flex items-center justify-between gap-3">
              <h2 className="text-xl font-semibold">{p.name}</h2>
              <span
                className={`shrink-0 rounded-full px-3 py-1 text-xs font-medium ${STATUS_TONES[p.deliveryStatus]}`}
              >
                {STATUS_LABELS[p.deliveryStatus]}
              </span>
            </div>
            <p className="mt-3 text-sm leading-6 text-ink-soft">{p.blurb}</p>
            <p className="mt-4 text-sm font-medium text-ink">
              {p.areaMin}–{p.areaMax} m² · {p.tower}
            </p>
          </Link>
        ))}
      </div>
    </section>
  );
}
