import Link from "next/link";
import { NAV_SECONDARY } from "@/lib/routes";

export default function Footer() {
  return (
    <footer className="border-t border-ink/10 bg-paper mt-auto">
      <div className="container-page py-10">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {/* Institutional */}
          <div>
            <p className="font-semibold">Jardim das Perdizes Broker</p>
            <p className="mt-2 text-sm text-ink/70">
              Corretor independente especializado no Jardim das Perdizes
              (Perdizes, São Paulo).
            </p>
            <p className="mt-2 text-sm text-ink/70">CRECI: [inserir número]</p>
          </div>

          {/* Contact */}
          <div>
            <p className="font-semibold">Contato</p>
            <p className="mt-2 text-sm text-ink/70">
              [inserir e-mail e telefone]
            </p>
          </div>

          {/* Institutional links (no dead links: only existing P0 routes) */}
          <div>
            <p className="font-semibold">Institucional</p>
            <ul className="mt-2 space-y-1 text-sm text-ink/70">
              {NAV_SECONDARY.map((item) => (
                <li key={item.path}>
                  <Link href={item.path} className="hover:text-brand">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
            {/* Privacy page is Phase 3 — render label as text, not a dead link */}
            <p className="mt-2 text-sm text-ink/70">Privacidade</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
