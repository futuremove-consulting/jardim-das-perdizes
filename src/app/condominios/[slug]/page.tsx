import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";

import {
  CONDOMINIUMS,
  getCondominiumBySlug,
} from "@/data/condominiums";
import { getCondoMedia } from "@/data/projectMedia";
import { buildPageMetadata } from "@/lib/seo/metadata";
import {
  apartmentComplexSchema,
  breadcrumbSchema,
  crumb,
} from "@/lib/seo/schemas";
import JsonLd from "@/components/seo/JsonLd";
import Badge from "@/components/ui/Badge";
import Icon, { type IconName } from "@/components/ui/Icon";
import SectionTable from "@/components/ui/SectionTable";
import DiscoveryCard from "@/components/discovery/DiscoveryCard";
import LeadForm from "@/components/conversion/LeadForm";
import WhatsAppCta from "@/components/conversion/WhatsAppCta";
import SectionHeading from "@/components/sections/SectionHeading";
import StatusTimeline from "@/components/sections/StatusTimeline";
import StickyCtaBar from "@/components/sections/StickyCtaBar";

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

const CATEGORY_LABELS: Record<string, string> = {
  "areas-comuns": "Áreas comuns",
  planta: "Planta",
  localizacao: "Bairro",
  hero: "Empreendimento",
  outros: "Imagem",
};

/** Facts verified at the neighborhood level (guia do bairro) — not unit claims. */
const PROXIMITY: Array<{ icon: IconName; label: string }> = [
  { icon: "tree", label: "Parque Jardim das Perdizes (45 mil m²)" },
  { icon: "train", label: "Metrô Estação Perdizes — Linha 4-Amarela" },
  { icon: "hospital", label: "Hospitais Einstein e Sírio-Libanês" },
  { icon: "school", label: "Escolas e universidades da região" },
  { icon: "shopping", label: "Comércio e serviços no entorno" },
];

/** Keyword -> icon mapping for highlight sentences (presentation only). */
const HIGHLIGHT_ICONS: Array<[RegExp, IconName]> = [
  [/piscina|raia|borda infinita/i, "waves"],
  [/academia|fitness|pilates|muscula/i, "dumbbell"],
  [/spa|sauna|massagem|escalda|frigo/i, "sparkles"],
  [/churrasqueira|gourmet/i, "flame"],
  [/jogos|game|playground|ludoteca|teen/i, "gamepad"],
  [/parque|verde|jardim|mata|natureza/i, "tree"],
  [/segur|monitor|24h|vigil/i, "shield"],
  [/metrô|estação|transporte|trem/i, "train"],
  [/hospital|saúde|médico/i, "hospital"],
  [/escola|educa|colégio|universidade/i, "school"],
  [/comércio|mercado|shopping|loja/i, "shopping"],
  [/tênis|squash|beach/i, "users"],
  [/hall|privativo|acesso independente|elevador/i, "key"],
  [/garden|térreo/i, "home"],
];

function highlightIcon(text: string): IconName {
  for (const [pattern, icon] of HIGHLIGHT_ICONS) {
    if (pattern.test(text)) return icon;
  }
  return "check";
}

export default async function CondominiumPage({ params }: PageProps) {
  const { slug } = await params;
  const condominium = getCondominiumBySlug(slug);
  if (!condominium) notFound();

  const isFinished =
    condominium.deliveryStatus === "delivered" ||
    condominium.deliveryStatus === "ready-to-move";
  const deliveryLabel = isFinished ? "Entregue" : "Previsão de entrega";
  const verifiedLabel = condominium.verifiedAt.split("-").reverse().join("/");
  const media = getCondoMedia(condominium.slug);
  const related = CONDOMINIUMS.filter((c) => c.slug !== condominium.slug).slice(0, 3);

  const chips: Array<{ icon: IconName; label: string; value: string }> = [
    {
      icon: "ruler",
      label: "Área",
      value: condominium.areaMin + "–" + condominium.areaMax + " m²",
    },
    ...(condominium.parking
      ? [{ icon: "car" as IconName, label: "Vagas", value: condominium.parking }]
      : []),
    ...(condominium.units
      ? [{ icon: "building" as IconName, label: "Unidades", value: String(condominium.units) }]
      : condominium.unitsNote
        ? [{ icon: "building" as IconName, label: "Unidades", value: condominium.unitsNote }]
        : []),
    ...(condominium.typologies && condominium.typologies.length > 0
      ? [{
          icon: "layers" as IconName,
          label: "Tipologias",
          value: String(condominium.typologies.length) + " plantas",
        }]
      : []),
    ...(condominium.launch
      ? [{ icon: "calendar" as IconName, label: "Lançamento", value: condominium.launch }]
      : []),
    ...(condominium.monthlyFee
      ? [{ icon: "banknote" as IconName, label: "Condomínio", value: condominium.monthlyFee }]
      : []),
  ];

  return (
    <section className="container-page pb-28 pt-12 sm:pb-16">
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
          crumb("/"),
          crumb("/condominios/"),
          crumb(`/condominios/${condominium.slug}/`),
        ])}
      />

      <nav aria-label="Você está em" className="text-sm text-muted">
        <Link href="/condominios/" className="hover:text-ink">
          Condomínios
        </Link>
        <span className="mx-2" aria-hidden="true">/</span>
        <span aria-current="page" className="text-ink">
          {condominium.name}
        </span>
      </nav>

      {/* Header — reference-style title block with spec chips */}
      <header className="mt-6">
        <div className="flex flex-wrap items-center gap-3">
          <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
            {condominium.name}
          </h1>
          <Badge status={condominium.deliveryStatus} />
        </div>
        {condominium.address && (
          <p className="mt-2 flex items-center gap-1.5 text-sm text-muted">
            <Icon name="map" size="xs" />
            {condominium.address}
          </p>
        )}
        <p className="mt-4 max-w-2xl text-base leading-relaxed text-ink-soft">
          {condominium.blurb}
        </p>

        {chips.length > 0 && (
          <ul className="mt-6 flex flex-wrap gap-2">
            {chips.map((chip) => (
              <li
                key={chip.label}
                className="flex items-center gap-2 rounded-full border border-line bg-surface px-4 py-2 text-sm"
              >
                <Icon name={chip.icon} size="sm" className="text-brand" />
                <span className="text-muted">{chip.label}:</span>
                <span className="font-semibold text-ink">{chip.value}</span>
              </li>
            ))}
          </ul>
        )}

        <div className="mt-6 flex flex-wrap gap-3">
          <a
            href="#conversao"
            className="inline-flex items-center justify-center rounded-full bg-accent px-6 py-3 text-sm font-semibold text-accent-contrast hover:opacity-90"
          >
            Quero mais informações
          </a>
          <WhatsAppCta
            intent="buy-to-live"
            interest={condominium.name}
            className="inline-flex rounded-full border border-line-strong px-6 py-3 text-sm font-medium text-ink hover:border-brand hover:text-brand"
          />
        </div>
      </header>

      {/* Hero media with status overlay */}
      {media && (
        <div className="relative mt-8 aspect-[16/10] w-full overflow-hidden rounded-2xl border border-line sm:aspect-[16/8] md:aspect-[16/7]">
          <Image
            src={media.hero}
            alt={media.heroAlt}
            fill
            sizes="(max-width: 768px) 100vw, 64rem"
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" aria-hidden="true" />
          <div className="absolute bottom-4 left-4">
            <Badge status={condominium.deliveryStatus} />
          </div>
        </div>
      )}

      {/* Lifecycle status — reference pattern */}
      <SectionHeading
        eyebrow="Etapa da obra"
        title="Status do empreendimento"
      />
      <StatusTimeline
        status={condominium.deliveryStatus}
        deliveryLabel={deliveryLabel}
        deliveryDate={condominium.deliveryDate}
      />

      {/* Gallery — swipeable on mobile, grid on desktop */}
      {media && media.gallery && media.gallery.length > 0 && (
        <section aria-labelledby="galeria-heading">
          <SectionHeading eyebrow="Fotos" title="Galeria de imagens" id="galeria-heading" />
          <div className="mt-6 flex snap-x snap-mandatory gap-3 overflow-x-auto pb-2 lg:grid lg:grid-cols-3 lg:snap-none lg:overflow-visible">
            {media.gallery.map((item) => (
              <figure
                key={item.src}
                className="group min-w-[76vw] max-w-[76vw] snap-center overflow-hidden rounded-2xl border border-line sm:min-w-[46vw] sm:max-w-[46vw] lg:min-w-0 lg:max-w-none"
              >
                <div className="relative aspect-[4/3]">
                  <Image
                    src={item.src}
                    alt={item.alt}
                    fill
                    sizes="(min-width: 1024px) 33vw, (min-width: 640px) 46vw, 76vw"
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                    loading="lazy"
                  />
                </div>
                <figcaption className="flex items-center justify-between gap-2 bg-surface px-3 py-2 text-xs">
                  <span className="truncate text-ink-soft">{item.alt}</span>
                  <span className="shrink-0 rounded-full bg-brand-soft px-2 py-0.5 font-medium text-brand">
                    {CATEGORY_LABELS[item.category] ?? "Imagem"}
                  </span>
                </figcaption>
              </figure>
            ))}
          </div>
        </section>
      )}

      {/* Quadro de áreas — official typologies, table like iApartamentos */}
      {condominium.typologies && condominium.typologies.length > 0 && (
        <section aria-labelledby="tipologias-heading">
          <SectionHeading
            eyebrow="Plantas oficiais"
            title="Quadro de áreas"
            id="tipologias-heading"
            description="Tipologias exatamente como publicadas pela incorporadora — cada linha com a área oficial. Valores e disponibilidade mediante solicitação."
          />
          <div className="mt-6 max-w-2xl">
            <SectionTable
              caption="Tipologias (plantas oficiais)"
              rows={condominium.typologies.map((t) => {
                const area = t.match(/([\d.,]+)\s*m²/);
                return { label: t, value: area ? area[1] + " m²" : "—" };
              })}
            />
            <p className="mt-3 text-xs text-muted">
              Sem estoque fictício — valores por tipologia informados pelo canal de
              atendimento com fonte e data.
            </p>
          </div>
        </section>
      )}

      {/* Ficha técnica — verified datapoints */}
      <section aria-labelledby="ficha-heading">
        <SectionHeading
          eyebrow="Dados verificados"
          title="Ficha do produto"
          id="ficha-heading"
        />
        <div className="mt-6 max-w-2xl">
          <SectionTable
            caption={"Ficha do " + condominium.name}
            rows={[
              condominium.units
                ? { label: "Unidades", value: String(condominium.units) }
                : condominium.unitsNote
                  ? { label: "Unidades", value: condominium.unitsNote }
                  : null,
              ...(condominium.address
                ? [{ label: "Endereço", value: condominium.address }]
                : []),
              {
                label: "Área",
                value: condominium.areaMin + "–" + condominium.areaMax + " m²",
              },
              ...(condominium.parking
                ? [{ label: "Vagas", value: condominium.parking }]
                : []),
              { label: deliveryLabel, value: condominium.deliveryDate },
              ...(condominium.launch
                ? [{ label: "Lançamento", value: condominium.launch }]
                : []),
              ...(condominium.monthlyFee
                ? [{ label: "Condomínio", value: condominium.monthlyFee }]
                : []),
            ].filter((r) => r !== null)}
          />
        </div>
      </section>

      {/* Torres e blocos */}
      <section aria-labelledby="torres-heading">
        <SectionHeading eyebrow="Empreendimento" title="Torres e blocos" id="torres-heading" />
        {condominium.towers ? (
          <div className="mt-6 max-w-2xl overflow-x-auto rounded-2xl border border-line">
            <table className="w-full text-sm">
              <thead className="border-b border-line bg-paper-secondary text-left text-muted">
                <tr>
                  <th scope="col" className="px-4 py-3 font-medium">Torre</th>
                  <th scope="col" className="px-4 py-3 font-medium">Blocos</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-line">
                {condominium.towers.map((t) => (
                  <tr key={t.tower}>
                    <th scope="row" className="px-4 py-3 font-medium text-ink">
                      Torre {t.tower}
                    </th>
                    <td className="px-4 py-3">
                      <ul className="flex flex-wrap gap-1.5">
                        {t.blocks.map((block) => (
                          <li
                            key={block}
                            className="rounded-full bg-brand-soft/50 px-2.5 py-1 text-ink"
                          >
                            {block}
                          </li>
                        ))}
                      </ul>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="mt-4 max-w-2xl text-sm text-ink-soft">
            {condominium.towersNote}
          </p>
        )}
      </section>

      {/* Diferenciais — icons like the reference amenity grids */}
      {condominium.highlights && condominium.highlights.length > 0 && (
        <section aria-labelledby="diferenciais-heading">
          <SectionHeading
            eyebrow="O empreendimento"
            title="Destaques"
            id="diferenciais-heading"
          />
          <ul className="mx-auto mt-6 grid max-w-3xl gap-3 sm:grid-cols-2">
            {condominium.highlights.map((h) => (
              <li
                key={h}
                className="flex items-start gap-3 rounded-2xl border border-line bg-surface p-4"
              >
                <span className="mt-0.5 inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-brand-soft text-brand">
                  <Icon name={highlightIcon(h)} size="sm" />
                </span>
                <span className="text-sm leading-relaxed text-ink">{h}</span>
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* Localização — maps + neighborhood facts */}
      {condominium.address && (
        <section aria-labelledby="localizacao-heading">
          <SectionHeading eyebrow="Onde fica" title="Localização" id="localizacao-heading" />
          <p className="mt-4 max-w-2xl text-ink">{condominium.address}</p>
          <div className="mt-4 flex flex-wrap gap-3">
            <a
              href={"https://www.google.com/maps/search/?api=1&query=" + encodeURIComponent(condominium.address)}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-line-strong px-4 py-2 text-sm font-medium text-ink hover:border-brand hover:text-brand"
            >
              <Icon name="map" size="sm" />
              Ver no mapa
            </a>
            <a
              href={"https://waze.com/ul?q=" + encodeURIComponent(condominium.address)}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-line-strong px-4 py-2 text-sm font-medium text-ink hover:border-brand hover:text-brand"
            >
              <Icon name="compass" size="sm" />
              Vá com Waze
            </a>
          </div>

          <div className="mt-6">
            <h3 className="text-base font-semibold text-ink">O que tem por perto — bairro Jardim das Perdizes</h3>
            <ul className="mt-3 flex flex-wrap gap-2">
              {PROXIMITY.map((item) => (
                <li
                  key={item.label}
                  className="flex items-center gap-2 rounded-full border border-line bg-surface px-3 py-1.5 text-sm text-ink-soft"
                >
                  <Icon name={item.icon} size="sm" className="text-brand" />
                  {item.label}
                </li>
              ))}
            </ul>
            <p className="mt-3 text-xs text-muted">
              Fatos do bairro verificados no{" "}
              <Link href="/guias-do-bairro/" className="underline hover:text-ink">
                Guia do Bairro
              </Link>
              .
            </p>
          </div>
        </section>
      )}

      {/* Nota de reconciliação — transparência sobre status */}
      {condominium.statusNote && (
        <section aria-labelledby="nota-heading">
          <SectionHeading eyebrow="Transparência" title="Nota de reconciliação" id="nota-heading" />
          <p className="mt-4 max-w-2xl rounded-2xl border border-line bg-paper-secondary p-4 text-sm leading-relaxed text-ink-soft">
            {condominium.statusNote}
          </p>
        </section>
      )}

      {/* Outros condomínios — internal cross-navigation (Tecnisa pattern) */}
      <section aria-labelledby="relacionados-heading">
        <SectionHeading
          eyebrow="Continue explorando"
          title="Veja outros condomínios do bairro"
          id="relacionados-heading"
        />
        {related.length > 0 && (
          <div className="mt-6 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {related.map((c) => (
              <DiscoveryCard key={c.slug} condominium={c} />
            ))}
          </div>
        )}
      </section>

      {/* Conversão — dual doors anchored for the sticky CTA */}
      <section
        id="conversao"
        aria-label="Atendimento"
        className="mt-14 scroll-mt-28 border-t border-line pt-12 sm:mt-16"
      >
        <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-start">
          <div>
            <h2 className="text-2xl font-bold tracking-tight text-ink sm:text-3xl">
              Interessado no {condominium.name}?
            </h2>
            <p className="mt-3 max-w-2xl text-ink-soft">
              Envie sua solicitação em 4 passos e receba um retorno direcionado —
              ou fale agora com um especialista local pelo WhatsApp.
            </p>
            <div className="mt-6">
              <LeadForm source={{ page: `/condominios/${condominium.slug}/` }} />
            </div>
          </div>
          <aside className="w-full max-w-xs rounded-2xl border border-line bg-paper p-6 lg:sticky lg:top-24">
            <h3 className="text-base font-semibold text-ink">Prefere falar agora?</h3>
            <p className="mt-2 text-sm text-ink-soft">
              Atendimento direto, sem formulário, com mensagem já preenchida
              sobre o {condominium.name}.
            </p>
            <div className="mt-4">
              <WhatsAppCta
                intent="buy-to-live"
                interest={condominium.name}
                className="inline-flex w-full justify-center rounded-full bg-[#25D36F] px-5 py-3 text-sm font-semibold text-white hover:opacity-90"
              />
            </div>
            <a
              href="#conversao"
              className="mt-3 inline-flex w-full justify-center rounded-full border border-line-strong px-5 py-3 text-sm font-medium text-ink hover:border-brand hover:text-brand"
            >
              Enviar solicitação
            </a>
          </aside>
        </div>
      </section>

      <p className="mt-12 border-t border-line pt-6 text-xs leading-relaxed text-muted">
        Fonte: {condominium.source} · Verificado em {verifiedLabel}
      </p>

      <StickyCtaBar />
    </section>
  );
}
