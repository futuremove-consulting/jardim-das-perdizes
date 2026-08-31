import Link from "next/link";
import { NAV_MAIN, NAV_SECONDARY } from "@/lib/routes";
import ThemeToggle from "./ThemeToggle";

/** Conversion anchor on the home page where the dual CTAs land (Phase 3 builds the form there). */
const CONVERSION_ANCHOR = "/#conversao";

export default function Header() {
  return (
    <header className="border-b border-line bg-paper">
      <div className="container-page flex items-center justify-between gap-3 py-3">
        <Link href="/" className="text-lg font-semibold tracking-tight text-ink">
          Jardim das Perdizes Broker
        </Link>

        <div className="flex items-center gap-2">
          <ThemeToggle />
          {/* Dual conversion CTAs — two ports, never competing (docs: Duas portas de conversão). */}
          <Link
            href={CONVERSION_ANCHOR}
            className="hidden rounded-full border border-line-strong px-3 py-1.5 text-sm font-medium text-ink hover:border-brand hover:text-brand sm:inline-flex"
          >
            Falar agora com especialista
          </Link>
          <Link
            href={CONVERSION_ANCHOR}
            className="inline-flex rounded-full bg-brand px-3 py-1.5 text-sm font-semibold text-brand-contrast hover:opacity-90"
          >
            Enviar solicitação
          </Link>
        </div>
      </div>

      {/* Desktop: main nav */}
      <nav aria-label="Navegação principal" className="container-page py-2">
        <ul className="hidden gap-6 text-sm font-medium text-ink lg:flex">
          {NAV_MAIN.map((item) => (
            <li key={item.path}>
              <Link href={item.path} className="hover:text-brand">
                {item.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Mobile: simple hierarchical list (CSS only, no JS drawer) */}
        <ul className="flex flex-col gap-2 text-sm text-ink lg:hidden">
          {NAV_MAIN.map((item) => (
            <li key={item.path}>
              <Link href={item.path} className="hover:text-brand">
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      {/* Secondary nav */}
      <nav aria-label="Navegação secundária" className="container-page py-2">
        <ul className="flex flex-wrap gap-x-5 gap-y-1 text-xs text-muted">
          {NAV_SECONDARY.map((item) => (
            <li key={item.path}>
              <Link href={item.path} className="hover:text-brand">
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}

