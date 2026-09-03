import Image from "next/image";
import Link from "next/link";

export interface PropertySpec {
  label: string;
  value: string;
  /** Emoji or SVG icon name (simple). */
  icon?: string;
}

export interface PropertyCardProps {
  /** Image asset path (in /public). Omitted -> placeholder fallback. */
  image?: string;
  imageAlt?: string;
  /** Property / development name. */
  title: string;
  /** Short descriptor: e.g. "Lançamento", "Cobertura". */
  badge?: string;
  /** "Sob Consulta", "R$ 2.500.000", etc. */
  priceLabel?: string;
  /** Key specs shown as a row: Área, Dorms, Vagas, Suítes. */
  specs?: PropertySpec[];
  /** Destination URL. */
  href: string;
  ctaLabel?: string;
  className?: string;
}

/**
 * PropertyCard - matches the reference sites' card layout:
 *   [ image w/ badge overlay ]
 *   title + subtitle
 *   specs row (icons + values)
 *   price
 *   [ Ver imóvel -> ]
 *
 * Reference: iApartamentos / ZN property listing cards.
 */
export default function PropertyCard({
  image,
  imageAlt,
  title,
  badge,
  priceLabel = "Sob Consulta",
  specs = [],
  href,
  ctaLabel = "Ver detalhes →",
  className = "",
}: PropertyCardProps) {
  return (
    <article
      className={`group flex flex-col overflow-hidden rounded-2xl border border-line bg-surface shadow-sm transition-shadow hover:shadow-md dark:border-line-dark ${className}`}
    >
      <div className="relative aspect-[3/2] overflow-hidden rounded-xl">
        {image ? (
          <Image
            src={image}
            alt={imageAlt ?? title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33.333vw"
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            loading="lazy"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-brand/5 to-brand-strong/10">
            <span className="text-center text-sm font-medium text-ink-soft">
              {title}
            </span>
          </div>
        )}
        {badge && (
          <span className="absolute left-3 top-3 rounded-full bg-accent px-2.5 py-0.5 text-xs font-semibold text-accent-contrast">
            {badge}
          </span>
        )}
      </div>

      <div className="flex flex-1 flex-col p-5">
        <h3 className="text-lg font-semibold text-ink">{title}</h3>

        {priceLabel && (
          <p className="mt-1 text-sm font-medium text-accent">{priceLabel}</p>
        )}

        {specs.length > 0 && (
          <ul className="mt-4 grid grid-cols-2 gap-x-3 gap-y-2 text-xs text-ink-soft">
            {specs.map((s) => (
              <li key={s.label} className="flex items-center gap-1.5">
                {s.icon && <span aria-hidden="true">{s.icon}</span>}
                <span className="font-medium">{s.value}</span>
                <span className="text-muted">— {s.label}</span>
              </li>
            ))}
          </ul>
        )}

        <Link
          href={href}
          className="mt-auto pt-4 text-sm font-semibold text-accent underline underline-offset-4 hover:text-accent-strong"
        >
          {ctaLabel}
        </Link>
      </div>
    </article>
  );
}
