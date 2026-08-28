export default function Home() {
  return (
    <main className="flex flex-1 flex-col">
      <section className="flex flex-1 flex-col items-center justify-center px-6 py-24 text-center">
        <h1 className="max-w-3xl text-4xl font-semibold tracking-tight sm:text-5xl">
          Jardim das Perdizes Broker
        </h1>
        <p className="mt-6 max-w-2xl text-lg leading-8 text-zinc-600">
          Corretor independente e hub de conteúdo especializado no Jardim das
          Perdizes, em Perdizes (São Paulo). Acompanhamento real de cada
          condomínio, dados verificados e consultoria para decidir com
          confiança.
        </p>
      </section>

      <section className="px-6 pb-24">
        <div className="mx-auto grid max-w-4xl gap-6 sm:grid-cols-2">
          <a
            href="/condominios-e-produtos"
            className="rounded-2xl border border-zinc-200 p-8 transition-colors hover:border-zinc-400"
          >
            <h2 className="text-2xl font-semibold">Condomínios e Produtos</h2>
            <p className="mt-3 text-zinc-600">
              Conheça os condomínios do bairro, as torres confirmadas e os
              produtos de cada empreendimento.
            </p>
          </a>
          <a
            href="/para-morar"
            className="rounded-2xl border border-zinc-200 p-8 transition-colors hover:border-zinc-400"
          >
            <h2 className="text-2xl font-semibold">Para Morar</h2>
            <p className="mt-3 text-zinc-600">
              Encontre o caminho ideal para quem quer comprar ou alugar no
              Jardim das Perdizes.
            </p>
          </a>
        </div>
      </section>
    </main>
  );
}
