import { buildPageMetadata } from "@/lib/seo/metadata";

export const metadata = buildPageMetadata({
  title: "Glossário Imobiliário — Jardim das Perdizes Broker",
  description:
    "Termos do mercado imobiliário explicados com clareza: memorial, aprovação, RI, financiamento, condomínio, IPTU e mais — no contexto do Jardim das Perdizes.",
  path: "/ferramentas/glossario/",
});

export default function GlossarioPage() {
  return (
    <section className="container-page py-12">
      <h1 className="text-3xl font-semibold tracking-tight">Glossário</h1>
      <p className="mt-3 max-w-2xl text-lg leading-8 text-ink-soft">
        Um glossário para você entender os termos do mercado imobiliário sem
        jargões. Cada verbete é explicado no contexto do Jardim das Perdizes.
      </p>

      <h2 className="mt-10 text-xl font-semibold">Termos iniciais</h2>
      <dl className="mt-4 max-w-2xl space-y-4 text-ink-soft">
        <div>
          <dt className="font-medium text-ink">Memorial descritivo</dt>
          <dd className="mt-1">
            Documento que descreve as especificações e acabamentos de um
            empreendimento. É referência para avaliar o produto na planta.
          </dd>
        </div>
        <div>
          <dt className="font-medium text-ink">Unidade na planta</dt>
          <dd className="mt-1">
            Imóvel vendido antes da entrega, com prazo e estágio de obra a
            considerar.
          </dd>
        </div>
        <div>
          <dt className="font-medium text-ink">Condomínio</dt>
          <dd className="mt-1">
            Custo mensal para manutenção das áreas comuns do empreendimento.
          </dd>
        </div>
        <div>
          <dt className="font-medium text-ink">IPTU</dt>
          <dd className="mt-1">
            Imposto predial e territorial urbano, cobrado anualmente pelo
            município.
          </dd>
        </div>
        <div>
          <dt className="font-medium text-ink">Yield (renda de locação)</dt>
          <dd className="mt-1">
            Relação entre o aluguel recebido e o valor do imóvel, usada para
            avaliar retorno de locação.
          </dd>
        </div>
      </dl>
    </section>
  );
}
