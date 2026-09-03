import Link from "next/link";
import JsonLd from "@/components/seo/JsonLd";
import { localBusinessSchema } from "@/lib/seo/schemas";

export default function NotFound() {
  return (
    <section className="container-page flex min-h-[60vh] flex-col items-center justify-center py-12 text-center">
      <JsonLd schema={localBusinessSchema()} />
      <p className="text-sm font-semibold uppercase tracking-widest text-accent">
        Erro 404
      </p>
      <h1 className="mt-4 text-4xl font-semibold tracking-tight">
        Página não encontrada
      </h1>
      <p className="mt-4 max-w-md text-ink-soft">
        A página que você procura pode ter sido movida ou não existe. Que tal
        explorar nossos conteúdos?
      </p>

      <nav className="mt-8 flex flex-wrap justify-center gap-3" aria-label="Recuperação">
        <Link
          href="/"
          className="rounded-full bg-brand px-5 py-2.5 text-sm font-medium text-brand-contrast transition-colors hover:bg-brand-strong"
        >
          Página inicial
        </Link>
        <Link
          href="/para-morar/"
          className="rounded-full border border-line px-5 py-2.5 text-sm font-medium text-ink transition-colors hover:border-brand"
        >
          Para Morar
        </Link>
        <Link
          href="/condominios/"
          className="rounded-full border border-line px-5 py-2.5 text-sm font-medium text-ink transition-colors hover:border-brand"
        >
          Condomínios
        </Link>
        <Link
          href="/para-investir/"
          className="rounded-full border border-line px-5 py-2.5 text-sm font-medium text-ink transition-colors hover:border-brand"
        >
          Para Investir
        </Link>
        <Link
          href="/mercado-e-dados/"
          className="rounded-full border border-line px-5 py-2.5 text-sm font-medium text-ink transition-colors hover:border-brand"
        >
          Mercado e Dados
        </Link>
      </nav>

      <a
        href="https://wa.me/5511999999999?text=Ol%C3%A1!%20Quero%20falar%20com%20um%20especialista%20do%20Jardim%20das%20Perdizes."
        target="_blank"
        rel="noopener noreferrer"
        className="mt-8 inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3 text-sm font-medium text-accent-contrast transition-colors hover:bg-accent-strong"
      >
        Falar com um especialista
      </a>
    </section>
  );
}
