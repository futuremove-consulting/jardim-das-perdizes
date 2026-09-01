import Link from "next/link";
import { notFound } from "next/navigation";
import {
  COMMERCIAL_PROPERTIES,
  getCommercialBySlug,
  type CommercialModality,
} from "@/data/commercial";
import { STATUS_LABELS, STATUS_TONES } from "@/data/condominiums";
import { buildPageMetadata } from "@/lib/seo/metadata";
import { breadcrumbSchema } from "@/lib/seo/schemas";
import JsonLd from "@/components/seo/JsonLd";

type PageProps = {
  params: Promise<{ modality: string; slug: string }>;
};

const MODALITY_LABELS: Record<CommercialModality, string> = {
  comprar: "Comprar",
  alugar: "Alugar",
};

export function generateStaticParams() {
  return COMMERCIAL_PROPERTIES.flatMap((p) =>
    p.modalities.map((modality) => ({ modality, slug: p.slug }))
  );
}

export const dynamicParams = false;

export async function generateMetadata({ params }: PageProps) {
  const { modality, slug } = await params;
  const property = getCommercialBySlug(slug);
  if (!property || !property.modalities.includes(modality as CommercialModality)) {
    return {};
  }
  const action = MODALITY_LABELS[modality as CommercialModality];
  return buildPageMetadata({
    title: `${action} ${property.name} — Jardim das Perdizes`,
    description: property.blurb,
    path: `/para-trabalhar/${modality}/${slug}/`,
  });
}

export default async function CommercialPropertyPage({ params }: PageProps) {
  const { modality, slug } = await params;
  const property = getCommercialBySlug(slug);
  if (
    !property ||
    !property.modalities.includes(modality as CommercialModality)
  ) {
    notFound();
  }

  const action = MODALITY_LABELS[modality as CommercialModality];
  const verifiedLabel = property.verifiedAt.split("-").reverse().join("/");

  return (
    <section className="container-page py-12">
      <JsonLd
        schema={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Trabalhar", path: "/para-trabalhar/" },
          { name: action, path: `/para-trabalhar/${modality}/` },
          {
            name: property.name,
            path: `/para-trabalhar/${modality}/${property.slug}/`,
          },
        ])}
      />
      <nav className="text-sm text-muted">
        <Link href="/para-trabalhar/" className="hover:text-ink">
          Trabalhar
        </Link>
        <span className="mx-2" aria-hidden="true">
          /
        </span>
        <Link
          href={`/para-trabalhar/${modality}/`}
          className="hover:text-ink"
        >
          {action}
        </Link>
      </nav>

      <div className="mt-6 flex flex-wrap items-center gap-3">
        <h1 className="text-3xl font-semibold tracking-tight">
          {property.name}
        </h1>
        <span
          className={`rounded-full px-3 py-1 text-xs font-medium ${STATUS_TONES[property.deliveryStatus]}`}
        >
          {STATUS_LABELS[property.deliveryStatus]}
        </span>
      </div>
      <p className="mt-3 max-w-2xl text-lg leading-8 text-ink-soft">
        {property.blurb}
      </p>

      <dl className="mt-8 max-w-2xl rounded-2xl border border-line bg-paper-secondary p-6">
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <dt className="text-sm font-medium text-muted">Área</dt>
            <dd className="mt-1 text-ink">
              {property.areaMin}–{property.areaMax} m²
            </dd>
          </div>
          <div>
            <dt className="text-sm font-medium text-muted">Torre</dt>
            <dd className="mt-1 text-ink">{property.tower}</dd>
          </div>
          {property.parking && (
            <div>
              <dt className="text-sm font-medium text-muted">Estacionamento</dt>
              <dd className="mt-1 text-ink">{property.parking}</dd>
            </div>
          )}
          <div>
            <dt className="text-sm font-medium text-muted">Entrega</dt>
            <dd className="mt-1 text-ink">{property.deliveryDate}</dd>
          </div>
          {property.address && (
            <div className="sm:col-span-2">
              <dt className="text-sm font-medium text-muted">Endereço</dt>
              <dd className="mt-1 text-ink">{property.address}</dd>
            </div>
          )}
        </div>
      </dl>

      <h2 className="mt-10 text-xl font-semibold">Diferenciais</h2>
      <ul className="mt-4 max-w-2xl list-disc space-y-2 pl-5 text-ink-soft">
        {property.highlights.map((h) => (
          <li key={h}>{h}</li>
        ))}
      </ul>

      <p className="mt-10 max-w-2xl text-xs text-muted">
        Fonte: {property.source}. Verificado em {verifiedLabel}.
      </p>
    </section>
  );
}
