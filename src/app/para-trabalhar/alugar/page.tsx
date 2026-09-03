import Link from "next/link";
import { buildPageMetadata } from "@/lib/seo/metadata";
import { breadcrumbSchema, crumb, faqPageSchema } from "@/lib/seo/schemas";
import JsonLd from "@/components/seo/JsonLd";
import { getCommercialByModality } from "@/data/commercial";
import { STATUS_LABELS, STATUS_TONES } from "@/data/condominiums";

export const metadata = buildPageMetadata({
  title: "Alugar Salas e Lajes — Jardim das Perdizes",
  description:
    "Salas comerciais (TIME Office) e lajes corporativas (TIME Corporate) para locação no Jardim das Perdizes. Endereço estratégico entre Perdizes e Pompeia.",
  path: "/para-trabalhar/alugar/",
});


const FAQ_ALUGAR = [
  {
    "question": "Quais são as garantias exigidas para alugar um imóvel comercial?",
    "answer": "As mais comuns são fiador, caução (até 3 meses de aluguel) e seguro fiança. Em alguns casos, o locador pode aceitar letter of credit ou capital de giro como garantia alternativa."
  },
  {
    "question": "Quem paga o IPTU e as despesas de condomínio na locação comercial?",
    "answer": "Normalmente, o inquilino arca com IPTU, condomínio e taxas prediais. O aluguel base geralmente não inclui esses encargos — verifique o contrato para confirmar a divisão de despesas."
  },
  {
    "question": "Qual é a duração típica de um contrato de aluguel comercial?",
    "answer": "Contratos de 5 anos são comuns no mercado comercial, com reajuste anual por IPCA ou IGP-M. Contratos mais longos (10 anos) podem ser negociados para lajes corporativas."
  },
  {
    "question": "Posso fazer reformas no imóvel comercial alugado?",
    "answer": "Sim, com autorização do locador. Adequações de layout geralmente são permitidas, mas modificações estruturais exigem aprovação formal. Consulte o contrato para verificar as condições específicas."
  }
];

export default function AlugarPage() {
  const properties = getCommercialByModality("alugar");

  return (
    <section className="container-page py-12">
      <JsonLd
        schema={breadcrumbSchema([crumb("/"), crumb("/para-trabalhar/alugar/")])}
      />
      <JsonLd schema={faqPageSchema(FAQ_ALUGAR)} />
      <h1 className="text-3xl font-semibold tracking-tight">
        Alugar — Salas e Lajes Comerciais
      </h1>
      <p className="mt-3 max-w-2xl text-lg leading-8 text-ink-soft">
        Imóveis comerciais para locação no Jardim das Perdizes. Flexibilidade
        com endereço estratégico entre Perdizes e Pompeia.
      </p>

      <div className="mt-10 grid gap-6 md:grid-cols-2">
        {properties.map((p) => (
          <Link
            key={p.slug}
            href={`/para-trabalhar/alugar/${p.slug}/`}
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

      <section className="mt-16">
        <h2 className="text-2xl font-semibold tracking-tight">
          Perguntas frequentes
        </h2>
        <dl className="mt-6 max-w-2xl space-y-6">
          {FAQ_ALUGAR.map((item, i) => (
            <div key={i}>
              <dt className="text-base font-medium text-ink">{item.question}</dt>
              <dd className="mt-2 text-ink-soft">{item.answer}</dd>
            </div>
          ))}
        </dl>
      </section>
    </section>
  );
}
