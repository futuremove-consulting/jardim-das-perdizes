import Link from "next/link";
import type { GuiaData } from "@/data/guias";
import KeyTakeaways from "@/components/content/KeyTakeaways";
import Faq from "@/components/content/Faq";
import JsonLd from "@/components/seo/JsonLd";
import {
  faqPageSchema,
  breadcrumbSchema,
  type FaqItem,
} from "@/lib/seo/schemas";

/**
 * Shared layout for the "Guias do Bairro" pages (AEO/GEO exemplar):
 * H1 → intro → KeyTakeaways → sourced tables → FAQ (1:1 with JSON-LD) →
 * two conversion doors → dated source note. Every row carries its source.
 */
export default function GuiaPage({
  guia,
  faq,
}: {
  guia: GuiaData;
  faq: FaqItem[];
}) {
  return (
    <section className="px-6 py-12">
      <h1 className="text-3xl font-semibold tracking-tight">{guia.title}</h1>
      <p className="mt-3 max-w-2xl text-lg leading-8 text-ink-soft">
        {guia.intro}
      </p>

      <KeyTakeaways items={[...guia.takeaways]} />

      {guia.sections.map((section) => (
        <div key={section.title} className="mt-12">
          <h2 className="text-xl font-semibold">{section.title}</h2>
          {section.intro && (
            <p className="mt-2 max-w-2xl text-ink-soft">{section.intro}</p>
          )}
          <div className="mt-4 max-w-3xl overflow-x-auto">
            <table className="w-full border-collapse text-sm">
              <thead>
                <tr className="border-b border-line text-left text-muted">
                  {section.headers.map((header) => (
                    <th key={header} className="py-2 pr-4 font-medium">
                      {header}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {section.rows.map((row) => (
                  <tr key={row.name} className="border-b border-line align-top">
                    <td className="py-3 pr-4 font-medium text-ink">
                      {row.name}
                    </td>
                    <td className="py-3 pr-4 text-ink-soft">{row.category}</td>
                    <td className="py-3 text-ink-soft">{row.source}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ))}

      <Faq items={faq} />

      <div className="mt-12 max-w-2xl rounded-2xl border border-line p-6">
        <h2 className="text-lg font-semibold">Próximo passo — duas portas</h2>
        <p className="mt-2 text-ink-soft">
          Comece pelo guia completo do bairro ou vá direto às fichas verificadas
          dos produtos.
        </p>
        <div className="mt-4 flex flex-wrap gap-3">
          <Link
            href="/guia-jardim-das-perdizes/"
            className="rounded-full bg-brand px-5 py-2.5 text-sm font-medium text-brand-contrast transition-colors hover:opacity-90"
          >
            Guia completo do bairro
          </Link>
          <Link
            href="/condominios/"
            className="rounded-full border border-line px-5 py-2.5 text-sm font-medium text-ink transition-colors hover:border-brand"
          >
            Explorar condomínios
          </Link>
        </div>
      </div>

      <JsonLd schema={faqPageSchema(faq)} />
      <JsonLd
        schema={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Guias do Bairro", path: "/guias-do-bairro/" },
          { name: guia.title, path: `/guias-do-bairro/${guia.slug}/` },
        ])}
      />

      <p className="mt-10 max-w-2xl text-xs text-muted">{guia.sourceNote}</p>
    </section>
  );
}
