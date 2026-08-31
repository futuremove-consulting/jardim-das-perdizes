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
  title: "Venda ou Alugue seu Imóvel no Jardim das Perdizes — Broker",
  description:
    "Como avaliar e posicionar seu imóvel para venda ou locação no Jardim das Perdizes: método de precificação, preparação, documentos e divulgação.",
  path: "/venda-ou-alugue/",
});

const FAQ_ITEMS: FaqItem[] = [
  {
    question: "Quanto vale o meu imóvel no Jardim das Perdizes?",
    answer:
      "O valor de referência sai de comparáveis datados por produto e tipologia — não da tabela de lançamento. O diagnóstico cruza preço pedido observado, metragem, andar, vista e estado de conservação.",
  },
  {
    question: "Vender ou alugar: como decidir?",
    answer:
      "Depende de prazo, necessidade de capital e custo de manutenção (condomínio e IPTU). O diagnóstico confidencial compara os dois caminhos com os custos reais do seu imóvel.",
  },
  {
    question: "Vocês são a Tecnisa?",
    answer:
      "Não. Somos corretor independente especializado no bairro. A divulgação do seu imóvel pode ser complementar aos canais oficiais — e a decisão de exclusividade é sempre sua.",
  },
  {
    question: "Quando abre o contato direto?",
    answer:
      "O formulário de solicitação e o WhatsApp entram na próxima etapa do site. Enquanto isso, o método de avaliação permanece público aqui e em Mercado & Dados.",
  },
];

const VENDER_VS_ALUGAR: Array<{
  dimensao: string;
  vender: string;
  alugar: string;
}> = [
  {
    dimensao: "Prazo",
    vender:
      "Liquidez varia por tipologia e preço — anúncios fora do comparável demoram",
    alugar: "Contratos típicos de 30 meses, com vacância entre contratos",
  },
  {
    dimensao: "Custos enquanto anuncia",
    vender: "Condomínio e IPTU continuam por sua conta",
    alugar: "Idem — mais os períodos de vacância",
  },
  {
    dimensao: "Risco principal",
    vender: "Preço fora do comparável prolonga o anúncio",
    alugar: "Inadimplência e desgaste do imóvel",
  },
  {
    dimensao: "Preparação",
    vender: "Documentos, planta, certidões e fotos atualizadas",
    alugar: "Vistoria, laudo, fotos e contrato de locação",
  },
];

export default function VendaOuAluguePage() {
  return (
    <section className="px-6 py-12">
      <h1 className="text-3xl font-semibold tracking-tight">
        Venda ou Alugue seu Imóvel
      </h1>

      <KeyTakeaways
        items={[
          "Diagnóstico antes de anúncio: preço por comparáveis datados, nunca pela tabela de lançamento.",
          "Vender e alugar têm riscos e custos distintos — a comparação honesta vem primeiro.",
          "Somos corretor independente: divulgação complementar aos canais oficiais, sem exclusividade imposta.",
          "Contato direto (formulário e WhatsApp) entra na próxima etapa do site.",
        ]}
      />

      <p className="mt-8 max-w-2xl text-lg leading-8 text-ink-soft">
        Se você tem um imóvel no bairro, a proposta é consultiva: antes de
        anunciar, um diagnóstico compara vender e alugar com preço por
        comparáveis datados, custos reais e riscos de cada caminho — método em
        vez de promessa, para você decidir com clareza.
      </p>

      <h2 className="mt-12 text-xl font-semibold">
        Vender ou alugar — o que muda na prática
      </h2>
      <div className="mt-4 max-w-3xl overflow-x-auto">
        <table className="w-full border-collapse text-sm">
          <thead>
            <tr className="border-b border-line text-left text-muted">
              <th className="py-2 pr-4 font-medium">Dimensão</th>
              <th className="py-2 pr-4 font-medium">Vender</th>
              <th className="py-2 font-medium">Alugar</th>
            </tr>
          </thead>
          <tbody>
            {VENDER_VS_ALUGAR.map((row) => (
              <tr key={row.dimensao} className="border-b border-line align-top">
                <td className="py-3 pr-4 font-medium text-ink">{row.dimensao}</td>
                <td className="py-3 pr-4 text-ink-soft">{row.vender}</td>
                <td className="py-3 text-ink-soft">{row.alugar}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h2 className="mt-12 text-xl font-semibold">Como conduzimos a captação</h2>
      <ul className="mt-4 max-w-2xl list-disc space-y-2 pl-5 text-ink-soft">
        <li>Avaliação do imóvel para venda ou locação, com critérios de preço por comparáveis.</li>
        <li>Definição de preço e estratégia com base em dados datados do bairro.</li>
        <li>Preparação do imóvel e documentos e informações necessárias.</li>
        <li>Divulgação e acompanhamento de contatos e visitas.</li>
        <li>Diagnóstico confidencial para decidir entre vender ou alugar.</li>
      </ul>

      <Faq items={FAQ_ITEMS} />

      <div className="mt-12 max-w-2xl rounded-2xl border border-line p-6">
        <h2 className="text-lg font-semibold">Próximo passo — duas portas</h2>
        <p className="mt-2 text-ink-soft">
          Avalie o contexto de preço no Mercado &amp; Dados ou compare seu
          produto com as fichas dos condomínios do bairro.
        </p>
        <div className="mt-4 flex flex-wrap gap-3">
          <Link
            href="/mercado-e-dados/"
            className="rounded-full bg-brand px-5 py-2.5 text-sm font-medium text-white transition-colors hover:opacity-90"
          >
            Ver Mercado &amp; Dados
          </Link>
          <Link
            href="/condominios-e-produtos/"
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
          { name: "Venda ou Alugue seu Imóvel", path: "/venda-ou-alugue/" },
        ])}
      />

      <p className="mt-10 max-w-2xl text-xs text-muted">
        Posicionamento: corretor independente especializado no bairro, sem
        vínculo com as incorporadoras. Método de dados em{" "}
        <Link href="/fontes-e-metodo/" className="underline hover:text-ink">
          Fontes e Método
        </Link>
        .
      </p>
    </section>
  );
}
