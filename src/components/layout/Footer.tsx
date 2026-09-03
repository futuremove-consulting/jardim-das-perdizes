import Link from "next/link";
import { NAV_SECONDARY } from "@/lib/routes";
import WhatsAppCta from "@/components/conversion/WhatsAppCta";
import { BROKER } from "@/lib/config";

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
          <WhatsAppCta className="rounded-full border border-line-strong px-4 py-2 text-sm font-medium text-ink hover:border-accent hover:text-accent" />
            <Link
              href={CONVERSION_ANCHOR}
              className="rounded-full bg-accent px-4 py-2 text-sm font-semibold text-accent-contrast hover:opacity-90"
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
              Imobiliária especializada no Jardim das Perdizes
              (Perdizes, São Paulo). CRECI: {BROKER.creci}.
            </p>
          </div>

          {/* Contact */}
          <div>
            <p className="font-semibold text-ink">Contato</p>
            <p className="mt-2 text-sm text-muted">
              <a
                href={`mailto:${BROKER.email}`}
                className="underline underline-offset-4 hover:text-brand"
              >
                {BROKER.email}
              </a>
            </p>
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
              <li>
                <Link href="/privacidade/" className="hover:text-brand">
                  Privacidade (LGPD)
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}

