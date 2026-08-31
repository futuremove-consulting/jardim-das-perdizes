import { buildPageMetadata } from "@/lib/seo/metadata";

export const metadata = buildPageMetadata({
  title: "Fontes e Método — Jardim das Perdizes Broker",
  description:
    "Como a Jardim das Perdizes Broker pesquisa, verifica e contextualiza dados e notícias — com nível de evidência, correções e política editorial.",
  path: "/fontes-e-metodo/",
});

export default function FontesEMetodoPage() {
  return (
    <section className="px-6 py-12">
      <h1 className="text-3xl font-semibold tracking-tight">Fontes e Método</h1>
      <p className="mt-3 max-w-2xl text-lg leading-8 text-ink-soft">
        A credibilidade do nosso conteúdo vem do método. Explicamos aqui como
        pesquisamos, verificamos, contextualizamos e orientamos — e como você
        pode conferir cada afirmação.
      </p>

      <h2 className="mt-10 text-xl font-semibold">As quatro etapas</h2>
      <ol className="mt-4 max-w-2xl list-decimal space-y-2 pl-5 text-ink-soft">
        <li>Pesquisar: reunir dados e informações a partir de fontes declaradas.</li>
        <li>Verificar: cruzar fontes e informar o nível de evidência de cada fato.</li>
        <li>Contextualizar: explicar o que os dados significam, com limitações.</li>
        <li>Orientar: apoiar decisões sem prometer resultados.</li>
      </ol>

      <h2 className="mt-10 text-xl font-semibold">Compromissos</h2>
      <ul className="mt-4 max-w-2xl list-disc space-y-2 pl-5 text-ink-soft">
        <li>Nunca inventar preços, torres ou dados de condomínios.</li>
        <li>Separar publicidade de dado e de análise.</li>
        <li>Publicar correções e changelog quando necessário.</li>
        <li>Manter um nível de evidência claro em cada página.</li>
      </ul>

      <h2 className="mt-10 text-xl font-semibold">Changelog de verificação</h2>
      <ul className="mt-4 max-w-2xl list-disc space-y-2 pl-5 text-ink-soft">
        <li>
          <strong>31/08/2026</strong> — Portfólio ampliado de 5 para 9 produtos
          com captura das páginas oficiais da Tecnisa (fonte e data em cada
          ficha). Status da Reserva Figueiras reconciliado: a página oficial
          exibe &quot;Pronto para morar&quot;, divergindo dos registros
          documentais anteriores (entrega prevista para outubro de 2026); a
          divergência está documentada na própria ficha.
        </li>
        <li>
          <strong>31/08/2026</strong> — Dados de mercado e metragens conferidos
          contra as fontes primárias; unidades não divulgadas oficialmente são
          exibidas como &quot;não divulgado&quot;, nunca estimadas.
        </li>
      </ul>
    </section>
  );
}
