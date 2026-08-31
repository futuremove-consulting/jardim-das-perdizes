import Link from "next/link";
import { notFound } from "next/navigation";
import {
  CONDOMINIUMS,
  getCondominiumBySlug,
  STATUS_LABELS,
  type DeliveryStatus,
} from "@/data/condominiums";
import { buildPageMetadata } from "@/lib/seo/metadata";
import { apartmentComplexSchema, breadcrumbSchema } from "@/lib/seo/schemas";
import JsonLd from "@/components/seo/JsonLd";

type PageProps = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return CONDOMINIUMS.map((c) => ({ slug: c.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const condominium = getCondominiumBySlug(slug);
  if (!condominium) return {};
  return buildPageMetadata({
    title: `${condominium.name} — Condomínio no Jardim das Perdizes`,
    description: condominium.blurb,
    path: `/condominios-e-produtos/${slug}/`,
  });
}

export default async function CondominiumPage({ params }: PageProps) {
  const { slug } = await params;
  const condominium = getCondominiumBySlug(slug);
  if (!condominium) notFound();

  const statusBadge = STATUS_LABELS[condominium.deliveryStatus];
  const statusTone: Record<DeliveryStatus, string> = {
    delivered: "bg-emerald-100 text-emerald-800",
    "ready-to-move": "bg-emerald-100 text-emerald-800",
    "under-construction": "bg-amber-100 text-amber-800",
    "coming-soon": "bg-sky-100 text-sky-800",
  };
  const isFinished =
    condominium.deliveryStatus === "delivered" ||
    condominium.deliveryStatus === "ready-to-move";
  const deliveryLabel = isFinished ? "Entrega" : "Previsão de entrega";
  const verifiedLabel = condominium.verifiedAt
    .split("-")
    .reverse()
    .join("/");

  return (
    <section className="px-6 py-12">
      <JsonLd
        schema={apartmentComplexSchema({
          name: condominium.name,
          path: `/condominios-e-produtos/${condominium.slug}/`,
          description: condominium.blurb,
          address: condominium.address,
          numberOfUnits: condominium.units,
          highlights: condominium.highlights,
        })}
      />
      <JsonLd
        schema={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Condomínios e Produtos", path: "/condominios-e-produtos/" },
          {
            name: condominium.name,
            path: `/condominios-e-produtos/${condominium.slug}/`,
          },
        ])}
      />
      <nav className="text-sm text-muted">
        <Link href="/condominios-e-produtos/" className="hover:text-ink">
          Condomínios e Produtos
        </Link>
        <span className="mx-2" aria-hidden="true">
          /
        </span>
        <span>{condominium.name}</span>
      </nav>

      <div className="mt-6 flex items-center justify-between gap-3">
        <h1 className="text-3xl font-semibold tracking-tight">
          {condominium.name}
        </h1>
        <span
          className={`shrink-0 rounded-full px-3 py-1 text-xs font-medium ${statusTone[condominium.deliveryStatus]}`}
        >
          {statusBadge}
        </span>
      </div>
      <p className="mt-3 max-w-2xl text-ink-soft">{condominium.blurb}</p>

      <h2 className="mt-10 text-xl font-semibold">Torres</h2>
      {condominium.towers ? (
        <table className="mt-4 w-full max-w-2xl border-collapse text-sm">
          <thead>
            <tr className="border-b border-line text-left text-muted">
              <th className="py-2 pr-4 font-medium">Torre</th>
              <th className="py-2 font-medium">Blocos</th>
            </tr>
          </thead>
          <tbody>
            {condominium.towers.map((t) => (
              <tr key={t.tower} className="border-b border-line">
                <td className="py-2 pr-4 font-medium">Torre {t.tower}</td>
                <td className="py-2">
                  <ul className="list-disc pl-5">
                    {t.blocks.map((block) => (
                      <li key={block}>{block}</li>
                    ))}
                  </ul>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p className="mt-4 max-w-2xl text-sm text-ink-soft">
          {condominium.towersNote}
        </p>
      )}

      {condominium.typologies && (
        <>
          <h2 className="mt-10 text-xl font-semibold">
            Tipologias (plantas oficiais)
          </h2>
          <ul className="mt-4 max-w-2xl list-disc space-y-1 pl-5 text-sm text-ink-soft">
            {condominium.typologies.map((t) => (
              <li key={t}>{t}</li>
            ))}
          </ul>
        </>
      )}

      {condominium.highlights && (
        <>
          <h2 className="mt-10 text-xl font-semibold">Destaques</h2>
          <ul className="mt-4 max-w-2xl list-disc space-y-1 pl-5 text-sm text-ink-soft">
            {condominium.highlights.map((h) => (
              <li key={h}>{h}</li>
            ))}
          </ul>
        </>
      )}

      <h2 className="mt-10 text-xl font-semibold">Ficha do produto</h2>
      <dl className="mt-4 grid max-w-2xl gap-x-8 gap-y-2 text-sm sm:grid-cols-2">
        <div className="flex justify-between gap-4 border-b border-line py-2">
          <dt className="text-muted">Unidades</dt>
          <dd className="text-right font-medium">
            {condominium.units ?? condominium.unitsNote}
          </dd>
        </div>
        {condominium.address && (
          <div className="flex justify-between gap-4 border-b border-line py-2 sm:col-span-2">
            <dt className="text-muted">Endereço</dt>
            <dd className="text-right font-medium">{condominium.address}</dd>
          </div>
        )}
        <div className="flex justify-between gap-4 border-b border-line py-2">
          <dt className="text-muted">Área</dt>
          <dd className="font-medium">
            {condominium.areaMin}–{condominium.areaMax} m²
          </dd>
        </div>
        {condominium.parking && (
          <div className="flex justify-between gap-4 border-b border-line py-2">
            <dt className="text-muted">Vagas</dt>
            <dd className="font-medium">{condominium.parking}</dd>
          </div>
        )}
        <div className="flex justify-between gap-4 border-b border-line py-2">
          <dt className="text-muted">{deliveryLabel}</dt>
          <dd className="font-medium">{condominium.deliveryDate}</dd>
        </div>
        {condominium.launch && (
          <div className="flex justify-between gap-4 border-b border-line py-2">
            <dt className="text-muted">Lançamento</dt>
            <dd className="font-medium">{condominium.launch}</dd>
          </div>
        )}
        {condominium.monthlyFee && (
          <div className="flex justify-between gap-4 border-b border-line py-2">
            <dt className="text-muted">Condomínio</dt>
            <dd className="font-medium">{condominium.monthlyFee}</dd>
          </div>
        )}
      </dl>

      {condominium.statusNote && (
        <p className="mt-6 max-w-2xl rounded-xl border border-line p-4 text-sm text-ink-soft">
          {condominium.statusNote}
        </p>
      )}

      <p className="mt-10 max-w-2xl text-xs text-muted">
        Fonte: {condominium.source} · Verificado em {verifiedLabel}
      </p>
    </section>
  );
}