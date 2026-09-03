import Link from "next/link";
import { NAV_MAIN, NAV_SECONDARY } from "@/lib/routes";
import ActiveLink from "./ActiveLink";
import ThemeToggle from "./ThemeToggle";
import WhatsAppCta from "@/components/conversion/WhatsAppCta";

/** Conversion anchor on the home page where the dual CTAs land. */
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
          {/* Dual conversion doors — door 2 is the real WhatsApp, never a link
              to the form (docs: Duas portas de conversão). */}
                    <WhatsAppCta className="hidden rounded-full border border-line-strong px-3 py-1.5 text-sm font-medium text-ink hover:border-accent hover:text-accent sm:inline-flex" />
                    <Link
            href={CONVERSION_ANCHOR}
            className="inline-flex rounded-full bg-accent px-3 py-1.5 text-sm font-semibold text-accent-contrast hover:opacity-90"
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
              <ActiveLink {...item} className="inline-block py-2" />
            </li>
          ))}
        </ul>

        {/* Mobile: horizontally scrollable chips (CSS only, no JS drawer) */}
        <ul className="flex gap-2 overflow-x-auto pb-1 text-sm font-medium text-ink lg:hidden">
          {NAV_MAIN.map((item) => (
            <li key={item.path} className="shrink-0">
              <ActiveLink
                {...item}
                className="whitespace-nowrap rounded-full border border-line px-3 py-1.5"
              />
            </li>
          ))}
        </ul>
      </nav>

      {/* Secondary nav */}
      <nav aria-label="Navegação secundária" className="container-page py-2">
        <ul className="flex flex-wrap gap-x-5 gap-y-1 text-xs text-muted">
          {NAV_SECONDARY.map((item) => (
            <li key={item.path}>
              <ActiveLink {...item} className="inline-block py-2" />
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}

