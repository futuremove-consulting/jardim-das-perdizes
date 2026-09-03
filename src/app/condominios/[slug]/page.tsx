import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import {
  CONDOMINIUMS,
  getCondominiumBySlug,
} from "@/data/condominiums";
import { getCondoMedia } from "@/data/projectMedia";
import { buildPageMetadata } from "@/lib/seo/metadata";
import { apartmentComplexSchema, breadcrumbSchema } from "@/lib/seo/schemas";
import JsonLd from "@/components/seo/JsonLd";
import Badge from "@/components/ui/Badge";

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
    path: `/condominios/${slug}/`,
  });
}

export default async function CondominiumPage({ params }: PageProps) {
  const { slug } = await params;
  const condominium = getCondominiumBySlug(slug);
  if (!condominium) notFound();

  const isFinished =
    condominium.deliveryStatus === "delivered" ||
    condominium.deliveryStatus === "ready-to-move";
  const deliveryLabel = isFinished ? "Entrega" : "Previsão de entrega";
    const verifiedLabel = condominium.verifiedAt
    .split("-")
    .reverse()
    .join("/");

  const media = getCondoMedia(condominium.slug);

  return (
    <section className="container-page py-12">
      <JsonLd
        schema={apartmentComplexSchema({
          name: condominium.name,
          path: `/condominios/${condominium.slug}/`,
          description: condominium.blurb,
          address: condominium.address,
          numberOfUnits: condominium.units,
          highlights: condominium.highlights,
        })}
      />
      <JsonLd
        schema={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Condomínios", path: "/condominios/" },
          {
            name: condominium.name,
            path: `/condominios/${condominium.slug}/`,
          },
        ])}
      />
      <nav className="text-sm text-muted">
        <Link href="/condominios/" className="hover:text-ink">
          Condomínios
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
        <Badge status={condominium.deliveryStatus} />
      </div>
            <p className="mt-3 max-w-2xl text-ink-soft">{condominium.blurb}</p>

      {media && (
        <>
          {/* Hero image — reference-style full-bleed aspect ratio with badge overlay */}
          <div className="relative mt-8 w-full overflow-hidden rounded-2xl border border-line md:aspect-[16/9] sm:aspect-[16/10]">
            <Image
              src={media.hero}
              alt={media.heroAlt}
              fill
              sizes="(max-width: 768px) 100vw, 64rem"
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
            <div className="absolute bottom-4 left-4">
              <Badge status={condominium.deliveryStatus} />
            </div>
          </div>

          {/* Gallery grid — first 8 images in reference style */}
          <h2 className="mt-10 text-xl font-semibold tracking-tight">Galeria</h2>
          <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
            {media.gallery.slice(0, 8).map((item) => (
              <div
                key={item.src}
                className="relative aspect-square overflow-hidden rounded-xl border border-line"
              >
                <Image
                  src={item.src}
                  alt={item.alt}
                  fill
                  sizes="(max-width: 768px) 50vw, 25vw"
                  className="object-cover"
                  loading="lazy"
                />
              </div>
            ))}
          </div>
        </>
      )}

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

            <div className="mt-8 flex flex-wrap gap-3">
        <Link
          href="#conversao"
          className="inline-flex items-center justify-center rounded-full bg-accent px-6 py-3 text-sm font-semibold text-accent-contrast hover:opacity-90"
        >
          Quero mais informações
        </Link>
        <Link
          href="/privacidade/"
          className="inline-flex items-center justify-center rounded-full border border-line-strong px-6 py-3 text-sm font-medium text-ink hover:border-accent hover:text-accent"
        >
          Ver política de privacidade
        </Link>
      </div>

      <p className="mt-10 max-w-2xl text-xs text-muted">
        Fonte: {condominium.source} · Verificado em {verifiedLabel}
      </p>
    </section>
  );
}