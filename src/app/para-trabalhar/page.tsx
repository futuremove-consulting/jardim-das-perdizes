import Link from "next/link";
import { buildPageMetadata } from "@/lib/seo/metadata";
import { faqPageSchema, breadcrumbSchema } from "@/lib/seo/schemas";
import KeyTakeaways from "@/components/content/KeyTakeaways";
import Faq from "@/components/content/Faq";
import JsonLd from "@/components/seo/JsonLd";

export const metadata = buildPageMetadata({
  title: "Trabalhar no Jardim das Perdizes — Salas e Lajes Comerciais",
  description:
    "Salas comerciais (TIME Office) e lajes corporativas (TIME Corporate) no Jardim das Perdizes. Comprar ou alugar no bairro planejado mais moderno de São Paulo.",
  path: "/para-trabalhar/",
});

const TAKEAWAYS = [
  "TIME Office: salas comerciais de 57 a 83 m², prontas para uso.",
  "TIME Corporate: lajes corporativas de 100 a 500 m² em torre de 23 andares.",
  "Endereço empresarial de prestígio no bairro com certificação AQUA.",
  "Segurança 24h, infraestrutura completa e proximidade com a Linha 6.",
];

const FAQ_ITEMS = [
  {
    question: "Onde ficam as salas comerciais no Jardim das Perdizes?",
    answer:
      "No TIME Office e no TIME Corporate, no coração do bairro, com fácil acesso à R. Marc Chagall e proximidade com Perdizes, Pompeia e Água Branca.",
  },
  {
    question: "As salas são vendidas ou alugadas?",
    answer:
      "Ambas as modalidades estão disponíveis. Consulte as vitrines de compra e de locação para ver as condições atuais.",
  },
];

export default function ParaTrabalharPage() {
  return (
    <section className="container-page py-12">
      <h1 className="text-3xl font-semibold tracking-tight">
        Trabalhar no Jardim das Perdizes
      </h1>
      <p className="mt-3 max-w-2xl text-lg leading-8 text-ink-soft">
        Salas comerciais e lajes corporativas no bairro planejado mais moderno
        de São Paulo. TIME Office e TIME Corporate — comprar ou alugar com
        endereço de prestígio, segurança 24h e certificação AQUA.
      </p>

      <KeyTakeaways items={TAKEAWAYS} />

      <div className="mt-10 grid gap-6 md:grid-cols-2">
        <Link
          href="/para-trabalhar/comprar/"
          className="rounded-2xl border border-line bg-surface p-6 transition-colors hover:border-brand"
        >
          <h2 className="text-xl font-semibold">Comprar</h2>
          <p className="mt-3 text-sm leading-6 text-ink-soft">
            Salas e lajes à venda no TIME Office e TIME Corporate. Endereço
            empresarial de prestígio no bairro planejado.
          </p>
        </Link>
        <Link
          href="/para-trabalhar/alugar/"
          className="rounded-2xl border border-line bg-surface p-6 transition-colors hover:border-brand"
        >
          <h2 className="text-xl font-semibold">Alugar</h2>
          <p className="mt-3 text-sm leading-6 text-ink-soft">
            Salas e lajes para locação. Flexibilidade com endereço estratégico
            entre Perdizes e Pompeia.
          </p>
        </Link>
      </div>

      <Faq items={FAQ_ITEMS} />

      <JsonLd schema={faqPageSchema(FAQ_ITEMS)} />
      <JsonLd
        schema={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Trabalhar", path: "/para-trabalhar/" },
        ])}
      />
    </section>
  );
}
