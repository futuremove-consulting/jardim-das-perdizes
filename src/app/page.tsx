import Link from "next/link";
import { buildPageMetadata } from "@/lib/seo/metadata";
import { localBusinessSchema } from "@/lib/seo/schemas";
import { isDemo } from "@/lib/config";
import { CONDOMINIUMS } from "@/data/condominiums";

export const metadata = buildPageMetadata({
  title: "Jardim das Perdizes Broker — Guia, Dados e Imóveis do Bairro",
  description:
    "Broker independente especializado no Jardim das Perdizes, em Perdizes (São Paulo). Guias, dados verificados e consultoria para morar, investir, vender ou alugar no bairro.",
  path: "/",
});

const INTENT_CARDS = [
  {
    key: "comprador",
    href: "/para-morar/",
    title: "Comprador",
    text: "Como avaliar bairro, condomínio, rotina e custo para comprar ou alugar.",
  },
  {
    key: "locatario",
    href: "/encontre-seu-perfil/",
    title: "Locatário",
    text: "Descubra qual perfil de imóvel e condomínio combina com você.",
  },
  {
    key: "investidor",
    href: "/para-investir/",
    title: "Investidor",
    text: "Dados, cenários, custos e riscos para decidir com critério.",
  },
  {
    key: "proprietario",
    href: "/venda-ou-alugue-seu-imovel/",
    title: "Proprietário",
    text: "Avaliação e posicionamento do seu imóvel com método, não com promessa.",
  },
];

export default function Home() {
  const schema = JSON.stringify(localBusinessSchema());

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: schema }}
      />

      <section className="px-6 py-16">
        <div className="mx-auto max-w-4xl">
          {isDemo() && (
            <p className="mb-6 inline-block rounded-full border border-amber-300 bg-amber-50 px-3 py-1 text-sm text-amber-800">
              Modo demonstração — conteúdo de exemplo exibido sem banco de dados.
            </p>
          )}

          <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">
            Jardim das Perdizes Broker
          </h1>
          <p className="mt-4 max-w-2xl text-lg leading-8 text-zinc-600">
            Guias, dados, análises e contexto hiperlocal sobre o bairro, seus
            condomínios, o parque, a mobilidade e o mercado — com fontes, datas
            e metodologia. A informação certa para morar, investir, vender ou
            alugar melhor.
          </p>
          <p className="mt-6 max-w-2xl text-zinc-700">
            Precisa de um diagnóstico sob medida?{" "}
            <span className="font-medium text-zinc-900">
              Receba uma análise
            </span>{" "}
            de um especialista local — o contato direto chega em uma próxima
            etapa.
          </p>
        </div>
      </section>

      <section className="px-6 pb-16">
        <div className="mx-auto max-w-4xl">
          <h2 className="text-2xl font-semibold tracking-tight">
            Escolha sua intenção
          </h2>
          <div className="mt-6 grid gap-6 sm:grid-cols-2">
            {INTENT_CARDS.map((card) => (
              <Link
                key={card.key}
                href={card.href}
                className="group rounded-2xl border border-zinc-200 p-8 transition-colors hover:border-zinc-400"
              >
                <h3 className="text-xl font-semibold">{card.title}</h3>
                <p className="mt-3 text-zinc-600">{card.text}</p>
                <p className="mt-4 text-sm font-medium text-zinc-800 transition-colors group-hover:text-zinc-950">
                  Explorar →
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 pb-16">
        <div className="mx-auto max-w-4xl">
          <h2 className="text-2xl font-semibold tracking-tight">
            Condomínios do bairro
          </h2>
          <ul className="mt-6 flex flex-wrap gap-3">
            {CONDOMINIUMS.map((c) => (
              <li key={c.slug}>
                <Link
                  href={`/condominios-e-produtos/${c.slug}/`}
                  className="rounded-full border border-zinc-200 px-4 py-2 text-sm text-zinc-700 transition-colors hover:border-zinc-400"
                >
                  {c.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
