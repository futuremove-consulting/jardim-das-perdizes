import Link from "next/link";
import { NAV_SECONDARY } from "@/lib/routes";

const CONVERSION_ANCHOR = "/#conversao";

export default function Footer() {
  return (
    <footer className="bg-paper mt-auto">
      {/* Conversion band — the two-port CTA repeated at the bottom */}
      <section className="border-y border-line bg-paper-secondary">
        <div className="container-page flex flex-col items-start justify-between gap-4 py-8 sm:flex-row sm:items-center">
          <div>
            <h2 className="text-lg font-semibold text-ink">Dê o próximo passo</h2>
            <p className="mt-1 text-sm text-muted">
              Envie o que você procura ou fale com um especialista local — com
              método e dados verificados.
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            <Link
              href={CONVERSION_ANCHOR}
              className="rounded-full border border-line-strong px-4 py-2 text-sm font-medium text-ink hover:border-brand hover:text-brand"
            >
              Falar agora com especialista
            </Link>
            <Link
              href={CONVERSION_ANCHOR}
              className="rounded-full bg-brand px-4 py-2 text-sm font-semibold text-brand-contrast hover:opacity-90"
            >
              Enviar solicitação
            </Link>
          </div>
        </div>
      </section>

      <div className="container-page py-10">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {/* Institutional */}
          <div>
            <p className="font-semibold text-ink">Jardim das Perdizes Broker</p>
            <p className="mt-2 text-sm text-muted">
              Corretor independente especializado no Jardim das Perdizes
              (Perdizes, São Paulo).
            </p>
            <p className="mt-2 text-sm text-muted">CRECI: [inserir número]</p>
          </div>

          {/* Contact */}
          <div>
            <p className="font-semibold text-ink">Contato</p>
            <p className="mt-2 text-sm text-muted">[inserir e-mail e telefone]</p>
          </div>

          {/* Institutional links (no dead links: only existing P0 routes) */}
          <div>
            <p className="font-semibold text-ink">Institucional</p>
            <ul className="mt-2 space-y-1 text-sm text-muted">
              {NAV_SECONDARY.map((item) => (
                <li key={item.path}>
                  <Link href={item.path} className="hover:text-brand">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
            {/* Privacy page is Phase 3 — render label as text, not a dead link */}
            <p className="mt-2 text-sm text-muted">Privacidade</p>
          </div>
        </div>
      </div>
    </footer>
  );
}

