import { buildPageMetadata } from "@/lib/seo/metadata";

export const metadata = buildPageMetadata({
  title: "Venda ou Alugue seu Imóvel no Jardim das Perdizes — Broker",
  description:
    "Como avaliar e posicionar seu imóvel para venda ou locação no Jardim das Perdizes: método de precificação, preparação, documentos e divulgação.",
  path: "/venda-ou-alugue-seu-imovel/",
});

export default function VendaOuAluguePage() {
  return (
    <section className="px-6 py-12">
      <h1 className="text-3xl font-semibold tracking-tight">
        Venda ou Alugue seu Imóvel
      </h1>
      <p className="mt-3 max-w-2xl text-lg leading-8 text-ink-soft">
        Se você tem um imóvel no Jardim das Perdizes e quer vender ou alugar,
        a proposta é consultiva: você chega pela dúvida de preço, prazo,
        liquidez ou renda e encontra método, não uma promessa.
      </p>

      <h2 className="mt-10 text-xl font-semibold">Como conduzimos a captação</h2>
      <ul className="mt-4 max-w-2xl list-disc space-y-2 pl-5 text-ink-soft">
        <li>Avaliação do imóvel para venda ou locação, com critérios de preço.</li>
        <li>Definição de preço e estratégia com base em comparáveis do bairro.</li>
        <li>Preparação do imóvel e documentos e informações necessárias.</li>
        <li>Divulgação e acompanhamento de contatos e visitas.</li>
        <li>Diagnóstico confidencial para decidir entre vender ou alugar.</li>
      </ul>

      <p className="mt-10 max-w-2xl text-ink-soft">
        O diagnóstico e o contato direto (formulário e WhatsApp) serão
        disponibilizados em uma próxima etapa do site.
      </p>
    </section>
  );
}
