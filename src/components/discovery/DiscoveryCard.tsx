import Link from "next/link";
import {
  STATUS_LABELS,
  STATUS_TONES,
  type Condominium,
} from "@/data/condominiums";

/**
 * Presentational product card (spec §4: identidade, classificação, escala,
 * experiência e confiança). Links to the static product page — the explorer
 * matches PROFILES/PRODUCTS, never specific units (editorial model).
 */
export default function DiscoveryCard({
  condominium,
}: {
  condominium: Condominium;
}) {
  return (
    <Link
      href={`/condominios-e-produtos/${condominium.slug}/`}
      className="group flex flex-col rounded-2xl border border-line bg-surface p-6 transition-colors hover:border-brand"
    >
      <div className="flex items-center justify-between gap-3">
        <h3 className="text-lg font-semibold text-ink group-hover:text-brand">
          {condominium.name}
        </h3>
        <span
          className={`shrink-0 rounded-full px-3 py-1 text-xs font-medium ${STATUS_TONES[condominium.deliveryStatus]}`}
        >
          {STATUS_LABELS[condominium.deliveryStatus]}
        </span>
      </div>
      <p className="mt-3 text-sm leading-6 text-ink-soft">{condominium.blurb}</p>
      <dl className="mt-4 grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
        <div>
          <dt className="text-muted">Área</dt>
          <dd className="font-medium text-ink">
            {condominium.areaMin}–{condominium.areaMax} m²
          </dd>
        </div>
        <div>
          <dt className="text-muted">Unidades</dt>
          <dd className="font-medium text-ink">
            {condominium.units ?? condominium.unitsNote}
          </dd>
        </div>
      </dl>
      <span className="mt-4 text-sm font-medium text-brand">
        Ver ficha do produto
      </span>
    </Link>
  );
}