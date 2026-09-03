import Link from "next/link";
import { buildPageMetadata } from "@/lib/seo/metadata";
import { breadcrumbSchema, crumb, faqPageSchema } from "@/lib/seo/schemas";
import JsonLd from "@/components/seo/JsonLd";
import { getCommercialByModality } from "@/data/commercial";
import { STATUS_LABELS, STATUS_TONES } from "@/data/condominiums";

export const metadata = buildPageMetadata({
  title: "Comprar Salas e Lajes — Jardim das Perdizes",
  description:
    "Salas comerciais (TIME Office) e lajes corporativas (TIME Corporate) à venda no Jardim das Perdizes. Endereço empresarial com certificação AQUA.",
  path: "/para-trabalhar/comprar/",
});


const FAQ_COMPRAR = [
  {
    "question": "Quais são as diferenças entre sala comercial e laje corporativa?",
    "answer": "Salas comerciais (como o TIME Office) são modulares e ideais para escritórios de pequeno e médio porte. Lajes corporativas (como o TIME Corporate) são andares inteiros, personalizáveis para empresas que precisam de layouts exclusivos."
  },
  {
    "question": "Quais documentos são necessários para comprar um imóvel comercial?",
    "answer": "Pessoa física: RG, CPF, comprovante de renda e certidão de casamento. Pessoa jurídica: contrato social, balanço patrimonial e documentos dos sócios. Financiamento exige certidões negativas adicionais."
  },
  {
    "question": "O que é a certificação AQUA e por que ela importa?",
    "answer": "A certificação AQUA (Alta Qualidade Ambiental) atesta sustentabilidade na construção: eficiência energética, gestão de água, conforto acústico e qualidade do ar. Reduz custos operacionais e valoriza o ativo."
  },
  {
    "question": "Qual é o prazo médio para fechar a compra de um imóvel comercial?",
    "answer": "Geralmente 30 a 90 dias, dependendo da forma de pagamento. Com financiamento bancário, pode levar até 120 dias devido à análise de crédito e avaliação do imóvel."
  }
];

export default function ComprarPage() {
  const properties = getCommercialByModality("comprar");

  return (
    <section className="container-page py-12">
      <JsonLd
        schema={breadcrumbSchema([crumb("/"), crumb("/para-trabalhar/comprar/")])}
      />
      <JsonLd schema={faqPageSchema(FAQ_COMPRAR)} />
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

      <section className="mt-16">
        <h2 className="text-2xl font-semibold tracking-tight">
          Perguntas frequentes
        </h2>
        <dl className="mt-6 max-w-2xl space-y-6">
          {FAQ_COMPRAR.map((item, i) => (
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
