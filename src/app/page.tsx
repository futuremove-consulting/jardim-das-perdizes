import Link from "next/link";
import { buildPageMetadata } from "@/lib/seo/metadata";
import { localBusinessSchema } from "@/lib/seo/schemas";
import { isDemo } from "@/lib/config";
import { CONDOMINIUMS } from "@/data/condominiums";
import LeadForm from "@/components/conversion/LeadForm";
import WhatsAppCta from "@/components/conversion/WhatsAppCta";

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
    title: "Comprador para morar",
    text: "Avaliar bairro, condomínio, rotina e custo para comprar o imóvel em que você vai viver.",
  },
  {
    key: "investidor",
    href: "/para-investir/",
    title: "Comprador para investir",
    text: "Comprar para renda (locação) ou para revender — com dados, custos, cenários e riscos.",
  },
  {
    key: "proprietario",
    href: "/venda-ou-alugue/",
    title: "Proprietário",
    text: "Quero vender ou alugar o meu imóvel — avaliação com método, não com promessa.",
  },
  {
    key: "locatario",
    href: "/encontre-seu-perfil/",
    title: "Alugar para morar",
    text: "Descubra qual perfil de imóvel e condomínio combina com a sua rotina e orçamento.",
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

          <h1 className="text-4xl font-semibold tracking-tight text-ink sm:text-5xl">
            Jardim das Perdizes Broker
          </h1>
          <p className="mt-4 max-w-2xl text-lg leading-8 text-ink-soft">
            Guias, dados, análises e contexto hiperlocal sobre o bairro, seus
            condomínios, o parque, a mobilidade e o mercado — com fontes, datas
            e metodologia. A informação certa para morar, investir, vender ou
            alugar melhor.
          </p>
          <p className="mt-6 max-w-2xl text-ink-soft">
            Precisa de um diagnóstico sob medida?{" "}
            <span className="font-medium text-ink">
              Receba uma análise
            </span>{" "}
            de um especialista local — o contato direto chega em uma próxima
            etapa.
          </p>
        </div>
      </section>

      <section className="px-6 pb-16">
        <div className="mx-auto max-w-4xl">
          <h2 className="text-2xl font-semibold tracking-tight text-ink">
            Escolha sua intenção
          </h2>
          <div className="mt-6 grid gap-6 sm:grid-cols-2">
            {INTENT_CARDS.map((card) => (
              <Link
                key={card.key}
                href={card.href}
                className="group rounded-2xl border border-line bg-surface p-8 transition-colors hover:border-brand"
              >
                <h3 className="text-xl font-semibold text-ink">{card.title}</h3>
                <p className="mt-3 text-ink-soft">{card.text}</p>
                <p className="mt-4 text-sm font-medium text-brand">
                  Explorar →
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 pb-16">
        <div className="mx-auto max-w-4xl">
          <h2 className="text-2xl font-semibold tracking-tight text-ink">
            Condomínios do bairro
          </h2>
          <ul className="mt-6 flex flex-wrap gap-3">
            {CONDOMINIUMS.map((c) => (
              <li key={c.slug}>
                <Link
                  href={`/condominios-e-produtos/${c.slug}/`}
                  className="rounded-full border border-line px-4 py-2 text-sm text-ink-soft transition-colors hover:border-brand hover:text-brand"
                >
                  {c.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* #conversao — CONV-01: the dual conversion doors (Header/Footer CTAs
          land here). Form is the qualifier; WhatsApp degrades gracefully when
          unconfigured. */}
      <section id="conversao" className="scroll-mt-8 border-t border-line bg-paper-secondary px-6 py-16">
        <div className="mx-auto max-w-4xl">
          <h2 className="text-2xl font-semibold tracking-tight text-ink">
            Encontrou o que procura?
          </h2>
          <p className="mt-3 max-w-2xl text-ink-soft">
            Envie sua solicitação em 4 passos e receba um retorno direcionado —
            ou fale agora com um especialista local pelo WhatsApp.
          </p>
          <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_auto] lg:items-start">
            <LeadForm source={{ page: "/" }} />
            <div className="rounded-2xl border border-line bg-paper p-6 lg:max-w-xs">
              <h3 className="text-sm font-semibold text-ink">
                Prefere falar agora?
              </h3>
              <p className="mt-2 text-sm text-ink-soft">
                Atendimento direto, sem formulário, com mensagem já preenchida
                conforme o seu objetivo.
              </p>
              <div className="mt-4">
                <WhatsAppCta source={{ page: "/" }} />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
