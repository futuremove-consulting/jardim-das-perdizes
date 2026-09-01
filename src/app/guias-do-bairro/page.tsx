import Link from "next/link";
import { buildPageMetadata } from "@/lib/seo/metadata";
import KeyTakeaways from "@/components/content/KeyTakeaways";
import Faq from "@/components/content/Faq";
import JsonLd from "@/components/seo/JsonLd";
import {
  faqPageSchema,
  breadcrumbSchema,
  type FaqItem,
} from "@/lib/seo/schemas";

export const metadata = buildPageMetadata({
  title: "Guias do Bairro Jardim das Perdizes — Jardim das Perdizes Broker",
  description:
    "O parque, a mobilidade (Linha 6-Laranja), o comércio, a educação, a cultura e a segurança do Jardim das Perdizes — sistema de guias com fonte e data de verificação.",
  path: "/guias-do-bairro/",
});

const FAQ_ITEMS: FaqItem[] = [
  {
    question: "O Parque Jardim das Perdizes é aberto a visitantes?",
    answer:
      "O parque é o coração do bairro planejado, e o guia dedicado documenta regras de acesso, horários e acessibilidade com fonte e data de verificação. Como a operação pode mudar, a página registra sempre quando foi verificada.",
  },
  {
    question: "A Linha 6-Laranja já funciona para o bairro?",
    answer:
      "A Linha 6-Laranja está em construção. O guia de mobilidade reúne o estado atual — estações, conexões de ônibus, trem e metrô — com fonte datada e indica o que deve ser re-verificado conforme as estações entrarem em operação.",
  },
  {
    question: "Os guias substituem a visita ao bairro?",
    answer:
      "Não — preparam a visita e a decisão. Cada guia termina no que precisa ser confirmado pessoalmente: rotina, ruído, sol, fluxo de pessoas e comércio do dia a dia.",
  },
  {
    question: "Qual é a diferença entre a segurança do bairro e a do condomínio?",
    answer:
      "O bairro tem segurança 24h e monitoramento — com câmeras interligadas ao projeto Muralha Paulista, segundo a página oficial. Cada condomínio do bairro é independente e tem regras próprias; os guias separam o que é atributo do bairro e o que é atributo do condomínio.",
  },
];

const GUIDES: Array<{
  slug: string;
  guia: string;
  responde: string;
  indicamos: string;
}> = [
  {
    slug: "escolas",
    guia: "Escolas",
    responde: "Colégios e universidades no entorno imediato",
    indicamos: "Inventário verificado com fonte datada — sem ranking promocional",
  },
  {
    slug: "bares-e-restaurantes",
    guia: "Bares e Restaurantes",
    responde: "Gastronomia dentro do bairro e no entorno",
    indicamos: "Cada casa com fonte; preços e horários mudam — confirme antes",
  },
  {
    slug: "saude",
    guia: "Saúde",
    responde: "Hospitais de referência e clínicas no bairro",
    indicamos: "Inventário, não recomendação médica — confirme convênios",
  },
  {
    slug: "transporte-e-mobilidade",
    guia: "Transporte e Mobilidade",
    responde: "Linha 6-Laranja (operação assistida), ônibus, trem e acessos",
    indicamos: "O que já funciona hoje e o que muda a cada estação operando",
  },
  {
    slug: "comercio-e-servicos",
    guia: "Comércio e Serviços",
    responde: "Padaria, mercado, farmácia, WeWork, Bourbon e o dia a dia",
    indicamos: "Distâncias reais e horários verificados por fonte",
  },
  {
    slug: "lazer-e-cultura",
    guia: "Lazer e Cultura",
    responde: "Parque, JP Experience, SESC Pompeia e o entorno cultural",
    indicamos: "Programação muda — cada indicação leva data de verificação",
  },
  {
    slug: "seguranca",
    guia: "Segurança e Governança",
    responde: "Segurança 24h, Muralha Paulista e condomínios independentes",
    indicamos: "O que é atributo do bairro e o que é atributo de cada condomínio",
  },
  {
    slug: "pet-friendly",
    guia: "Pet-Friendly",
    responde: "Parque, bebedouros, pet shops e eventos para pets",
    indicamos: "Regras de pets variam por condomínio — confirme na ficha",
  },
];

export default function GuiasDoBairroPage() {
  return (
    <section className="px-6 py-12">
      <h1 className="text-3xl font-semibold tracking-tight">
        Guias do Bairro
      </h1>

      <KeyTakeaways
        items={[
          "O bairro foi desenhado em torno de um parque central de 45 mil m², com obras de Tomie Ohtake e Frans Krajcberg (fonte oficial, captura 31/08/2026).",
          "Primeiro bairro da América Latina com certificado AQUA e câmeras interligadas ao projeto Muralha Paulista, segundo a página oficial.",
          "Cada guia é um sistema atualizado: fonte, data de verificação e aviso de que horários e operações podem mudar.",
          "A mobilidade muda com a Linha 6-Laranja em construção — o diagnóstico é sempre datado.",
        ]}
      />

      <p className="mt-8 max-w-2xl text-lg leading-8 text-ink-soft">
        Os guias do Jardim das Perdizes ajudam a entender a vida no bairro antes
        de decidir morar. Cada tema é tratado como um sistema atualizado — com
        fonte identificada, data de verificação e o que ainda precisa ser
        confirmado pessoalmente na visita.
      </p>

      <h2 className="mt-12 text-xl font-semibold">Os oito guias do bairro</h2>
      <div className="mt-4 max-w-3xl overflow-x-auto">
        <table className="w-full border-collapse text-sm">
          <thead>
            <tr className="border-b border-line text-left text-muted">
              <th className="py-2 pr-4 font-medium">Guia</th>
              <th className="py-2 pr-4 font-medium">O que responde</th>
              <th className="py-2 font-medium">O que sempre indicamos</th>
            </tr>
          </thead>
          <tbody>
            {GUIDES.map((row) => (
              <tr key={row.slug} className="border-b border-line align-top">
                <td className="py-3 pr-4 font-medium text-ink">
                  <Link
                    href={`/guias-do-bairro/${row.slug}/`}
                    className="underline decoration-line underline-offset-4 transition-colors hover:text-brand"
                  >
                    {row.guia}
                  </Link>
                </td>
                <td className="py-3 pr-4 text-ink-soft">{row.responde}</td>
                <td className="py-3 text-ink-soft">{row.indicamos}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Faq items={FAQ_ITEMS} />

      <div className="mt-12 max-w-2xl rounded-2xl border border-line p-6">
        <h2 className="text-lg font-semibold">Próximo passo — duas portas</h2>
        <p className="mt-2 text-ink-soft">
          Comece pelo guia completo do bairro ou vá direto às fichas verificadas
          dos produtos.
        </p>
        <div className="mt-4 flex flex-wrap gap-3">
          <Link
            href="/guia-jardim-das-perdizes/"
            className="rounded-full bg-brand px-5 py-2.5 text-sm font-medium text-white transition-colors hover:opacity-90"
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

      <JsonLd schema={faqPageSchema(FAQ_ITEMS)} />
      <JsonLd
        schema={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Guias do Bairro", path: "/guias-do-bairro/" },
        ])}
      />

      <p className="mt-10 max-w-2xl text-xs text-muted">
        Fontes: jardimdasperdizes.com.br e páginas oficiais da Tecnisa (captura
        31/08/2026) e matriz de torres e produtos do projeto. Horários e
        operações podem mudar — cada guia indica a data de verificação.
      </p>
    </section>
  );
}
