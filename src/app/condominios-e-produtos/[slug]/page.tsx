import Link from "next/link";
import { notFound } from "next/navigation";
import { CONDOMINIUMS, getCondominiumBySlug } from "@/data/condominiums";
import { buildPageMetadata } from "@/lib/seo/metadata";

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

  const statusBadge =
    condominium.deliveryStatus === "delivered" ? "Entregue" : "Em construção";
  const deliveryLabel =
    condominium.deliveryStatus === "delivered" ? "Entrega" : "Previsão de entrega";

  return (
    <section className="px-6 py-12">
      <nav className="text-sm text-zinc-500">
        <Link href="/condominios-e-produtos/" className="hover:text-zinc-800">
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
          className={`shrink-0 rounded-full px-3 py-1 text-xs font-medium ${
            condominium.deliveryStatus === "delivered"
              ? "bg-emerald-100 text-emerald-800"
              : "bg-amber-100 text-amber-800"
          }`}
        >
          {statusBadge}
        </span>
      </div>
      <p className="mt-3 max-w-2xl text-zinc-600">{condominium.blurb}</p>

      <h2 className="mt-10 text-xl font-semibold">Torres</h2>
      {condominium.towers ? (
        <table className="mt-4 w-full max-w-2xl border-collapse text-sm">
          <thead>
            <tr className="border-b border-zinc-200 text-left text-zinc-500">
              <th className="py-2 pr-4 font-medium">Torre</th>
              <th className="py-2 font-medium">Blocos</th>
            </tr>
          </thead>
          <tbody>
            {condominium.towers.map((t) => (
              <tr key={t.tower} className="border-b border-zinc-100">
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
        <p className="mt-4 max-w-2xl text-sm text-zinc-600">
          {condominium.towersNote}
        </p>
      )}

      <h2 className="mt-10 text-xl font-semibold">Ficha do produto</h2>
      <dl className="mt-4 grid max-w-2xl gap-x-8 gap-y-2 text-sm sm:grid-cols-2">
        <div className="flex justify-between gap-4 border-b border-zinc-100 py-2">
          <dt className="text-zinc-500">Unidades</dt>
          <dd className="font-medium">{condominium.units}</dd>
        </div>
        <div className="flex justify-between gap-4 border-b border-zinc-100 py-2">
          <dt className="text-zinc-500">Área</dt>
          <dd className="font-medium">
            {condominium.areaMin}–{condominium.areaMax} m²
          </dd>
        </div>
        {condominium.parking && (
          <div className="flex justify-between gap-4 border-b border-zinc-100 py-2">
            <dt className="text-zinc-500">Vagas</dt>
            <dd className="font-medium">{condominium.parking}</dd>
          </div>
        )}
        <div className="flex justify-between gap-4 border-b border-zinc-100 py-2">
          <dt className="text-zinc-500">{deliveryLabel}</dt>
          <dd className="font-medium">{condominium.deliveryDate}</dd>
        </div>
        {condominium.launch && (
          <div className="flex justify-between gap-4 border-b border-zinc-100 py-2">
            <dt className="text-zinc-500">Lançamento</dt>
            <dd className="font-medium">{condominium.launch}</dd>
          </div>
        )}
        {condominium.monthlyFee && (
          <div className="flex justify-between gap-4 border-b border-zinc-100 py-2">
            <dt className="text-zinc-500">Condomínio</dt>
            <dd className="font-medium">{condominium.monthlyFee}</dd>
          </div>
        )}
      </dl>
    </section>
  );
}