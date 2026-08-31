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
  title: "Mercado & Dados do Jardim das Perdizes — Broker",
  description:
    "O principal ativo de autoridade do bairro: preços pedidos, aluguéis observados, condomínio e IPTU, valorização e histórico de lançamentos — com fontes e metodologia.",
  path: "/mercado-e-dados/",
});

const FAQ_ITEMS: FaqItem[] = [
  {
    question: "Qual é o preço do m² no Jardim das Perdizes?",
    answer:
      "Varia por produto, tipologia e vista; a série consolidada por m² está em preparação, com captura datada. Referências regionais como o FipeZAP servem de contexto, não substituem a leitura do bairro.",
  },
  {
    question: "Preço pedido é o mesmo que preço fechado?",
    answer:
      "Não. A lacuna entre anúncio e transação é um dos indicadores mais relevantes do monitoramento — e exige amostra de transações efetivas, não apenas anúncios.",
  },
  {
    question: "Onde vejo a metodologia?",
    answer:
      "Em Fontes e Método, com declaração de período, amostra, fonte e limitações de cada série publicada.",
  },
  {
    question: "Com que frequência os dados são atualizados?",
    answer:
      "Por captura datada: cada atualização registra a data de verificação. Nada é publicado sem fonte identificada.",
  },
];

const MONITORADOS: Array<{
  indicador: string;
  mostra: string;
  status: string;
}> = [
  {
    indicador: "Preço pedido por m²",
    mostra: "Nível e dispersão por produto e tipologia",
    status: "Série em preparação — coleta datada",
  },
  {
    indicador: "Aluguéis observados",
    mostra: "Renda potencial por tipologia",
    status: "Série em preparação",
  },
  {
    indicador: "Condomínio e IPTU",
    mostra: "Custo total de posse por produto",
    status: "Coletado por ficha quando confirmado",
  },
  {
    indicador: "Preço pedido vs fechado",
    mostra: "Lacuna entre anúncio e transação",
    status: "Em estruturação — depende de amostra de transações",
  },
  {
    indicador: "Lançamentos e entregas",
    mostra: "Ciclo de oferta do bairro",
    status: "Primeira leva publicada (2015–2026)",
  },
  {
    indicador: "Valorização nominal vs real",
    mostra: "Ganho acima ou abaixo da inflação",
    status: "Em estruturação — séries longas",
  },
];

const TIMELINE: Array<{ periodo: string; evento: string; fonte: string }> = [
  {
    periodo: "2014–2015",
    evento:
      "TIME Life: lançamento registrado no 2T14 (histórico oficial) e lançamento comercial em maio/2015; entrega em maio/2017",
    fonte: "Histórico Tecnisa + Apto",
  },
  {
    periodo: "2023",
    evento: "Reserva Figueiras: lançamento em fevereiro; obras iniciadas em agosto",
    fonte: "Página oficial (estágio de obras)",
  },
  {
    periodo: "2024",
    evento: "Recanto Oliveiras: movimentação de terra e fundações desde agosto",
    fonte: "Página oficial (estágio de obras)",
  },
  {
    periodo: "2025",
    evento: "Reserva Flamboyant: contenção e fundações entre maio e agosto",
    fonte: "Página oficial (estágio de obras)",
  },
  {
    periodo: "2026",
    evento: "Sequoia anunciado como breve lançamento (agosto)",
    fonte: "Página oficial",
  },
];

export default function MercadoEDadosPage() {
  return (
    <section className="px-6 py-12">
      <h1 className="text-3xl font-semibold tracking-tight">
        Mercado &amp; Dados
      </h1>

      <KeyTakeaways
        items={[
          "Todo relatório declara período, amostra, fonte, método e limitações.",
          "Preço pedido ≠ preço fechado: a lacuna entre anúncio e transação é monitorada.",
          "Ciclo de oferta do bairro mapeado: de TIME Life (2014/15) ao breve lançamento Sequoia (2026).",
          "Atualização por captura datada — nada é publicado sem fonte identificada.",
        ]}
      />

      <p className="mt-8 max-w-2xl text-lg leading-8 text-ink-soft">
        Este é o principal ativo de autoridade do site: dados agregados do
        mercado do bairro — preços pedidos, aluguéis, custos, lançamentos —
        publicados com período, amostra, fonte, método e limitações. Onde a
        série ainda não existe, isso é dito com clareza.
      </p>

      <h2 className="mt-12 text-xl font-semibold">Indicadores monitorados</h2>
      <div className="mt-4 max-w-3xl overflow-x-auto">
        <table className="w-full border-collapse text-sm">
          <thead>
            <tr className="border-b border-line text-left text-muted">
              <th className="py-2 pr-4 font-medium">Indicador</th>
              <th className="py-2 pr-4 font-medium">O que mostra</th>
              <th className="py-2 font-medium">Status (31/08/2026)</th>
            </tr>
          </thead>
          <tbody>
            {MONITORADOS.map((row) => (
              <tr key={row.indicador} className="border-b border-line align-top">
                <td className="py-3 pr-4 font-medium text-ink">{row.indicador}</td>
                <td className="py-3 pr-4 text-ink-soft">{row.mostra}</td>
                <td className="py-3 text-ink-soft">{row.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h2 className="mt-12 text-xl font-semibold">
        Linha do tempo de lançamentos do bairro
      </h2>
      <div className="mt-4 max-w-3xl overflow-x-auto">
        <table className="w-full border-collapse text-sm">
          <thead>
            <tr className="border-b border-line text-left text-muted">
              <th className="py-2 pr-4 font-medium">Período</th>
              <th className="py-2 pr-4 font-medium">Evento</th>
              <th className="py-2 font-medium">Fonte</th>
            </tr>
          </thead>
          <tbody>
            {TIMELINE.map((row) => (
              <tr key={row.periodo} className="border-b border-line align-top">
                <td className="py-3 pr-4 font-medium text-ink">{row.periodo}</td>
                <td className="py-3 pr-4 text-ink-soft">{row.evento}</td>
                <td className="py-3 text-ink-soft">{row.fonte}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="mt-3 max-w-3xl text-xs text-muted">
        Levantamento próprio a partir das páginas oficiais da Tecnisa (captura
        31/08/2026). Datas de lançamento podem divergir entre registro
        societário e lançamento comercial — ambas são exibidas quando
        disponíveis.
      </p>

      <Faq items={FAQ_ITEMS} />

      <div className="mt-12 max-w-2xl rounded-2xl border border-line p-6">
        <h2 className="text-lg font-semibold">Próximo passo — duas portas</h2>
        <p className="mt-2 text-ink-soft">
          Entenda como cada série é construída ou use os dados para avaliar uma
          estratégia de investimento.
        </p>
        <div className="mt-4 flex flex-wrap gap-3">
          <Link
            href="/fontes-e-metodo/"
            className="rounded-full bg-brand px-5 py-2.5 text-sm font-medium text-white transition-colors hover:opacity-90"
          >
            Ver Fontes e Método
          </Link>
          <Link
            href="/para-investir/"
            className="rounded-full border border-line px-5 py-2.5 text-sm font-medium text-ink transition-colors hover:border-brand"
          >
            Explorar Para Investir
          </Link>
        </div>
      </div>

      <JsonLd schema={faqPageSchema(FAQ_ITEMS)} />
      <JsonLd
        schema={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Mercado & Dados", path: "/mercado-e-dados/" },
        ])}
      />

      <p className="mt-10 max-w-2xl text-xs text-muted">
        Fontes: páginas oficiais da Tecnisa dos produtos do bairro (captura
        31/08/2026), histórico Tecnisa e anúncios de mercado citados por ficha.
      </p>
    </section>
  );
}
