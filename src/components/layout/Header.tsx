import Link from "next/link";
import { NAV_MAIN, NAV_SECONDARY } from "@/lib/routes";

export default function Header() {
  return (
    <header className="border-b border-ink/10">
      <div className="container-page flex items-center justify-between py-4">
        <Link href="/" className="text-lg font-semibold tracking-tight">
          Jardim das Perdizes Broker
        </Link>
      </div>

      {/* Desktop: main nav */}
      <nav aria-label="Navegação principal" className="container-page py-2">
        <ul className="hidden gap-6 text-sm font-medium lg:flex">
          {NAV_MAIN.map((item) => (
            <li key={item.path}>
              <Link href={item.path} className="hover:text-brand">
                {item.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Mobile: simple hierarchical list (CSS only, no JS drawer) */}
        <ul className="flex flex-col gap-2 text-sm lg:hidden">
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
        <ul className="flex flex-wrap gap-x-5 gap-y-1 text-xs text-ink/70">
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
