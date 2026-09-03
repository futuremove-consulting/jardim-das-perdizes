import Link from "next/link";
import Image from "next/image";
import { BROKER } from "@/lib/config";

interface HeroSectionProps {
  /** Optional background image (defaults to the bairro hero). */
  imageSrc?: string;
  /** Optional image alt */
  imageAlt?: string;
  headline?: string;
  subhead?: string;
  ctaHref?: string;
  ctaLabel?: string;
  /** Trust badges shown below the CTA (e.g. CRECI, anos de experiência). */
  badges?: string[];
  className?: string;
}

/**
 * HeroSection — full-bleed hero matching the reference sites' visual impact.
 * Uses a layered background image with a dark scrim so headline stays legible,
 * a centered typographic stack, and a clear primary CTA (accent red).
 *
 * Reference pattern: iApartamentos / ZN empreendimento pages.
 */
export default function HeroSection({
  imageSrc = "/assets/condominios/jardim-das-perdizes/sequoia/hero/fachada-vista-parque.webp",
  imageAlt = "Sequoia Jardim das Perdizes — fachada e parque",
  headline = "Jardim das Perdizes\nGuia, dados e imóveis verificados",
  subhead = "Broker independente especializado no bairro. Conteúdo com fonte e data para morar, investing, vender ou alugar com informação certa.",
  ctaHref = "/#conversao",
  ctaLabel = "Fale com um especialista",
  badges = [
    `CRECI ${BROKER.creci}`,
    "Conteúdo verificado com fonte",
    "Atendimento local",
  ],
  className = "",
}: HeroSectionProps) {
  return (
    <section
      className={`relative flex items-center justify-center py-28 md:py-36 lg:py-44 ${className}`}
    >
      {/* Background image + scrim */}
      <Image
        src={imageSrc}
        alt={imageAlt}
        fill
        priority
        sizes="100vw"
        className="object-cover object-center"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/40 to-black/20" />

      {/* Content stack */}
      <div className="relative z-10 container-page mx-auto px-4 text-center text-white">
        <h1 className="mx-auto max-w-4xl text-3xl font-extrabold tracking-tight sm:text-4xl md:text-5xl lg:text-6xl">
          {headline.split("\n").map((line, i) => (
            <span key={i} className="block">
              {line}
            </span>
          ))}
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-lg text-gray-200">
          {subhead}
        </p>

        <div className="mt-8 flex flex-col items-center justify-center gap-4">
          <Link
            href={ctaHref}
            className="inline-flex items-center justify-center rounded-full bg-accent px-8 py-3.5 text-base font-semibold text-accent-contrast shadow-lg hover:opacity-90"
          >
            {ctaLabel}
          </Link>
          {badges && (
            <div className="flex flex-wrap items-center justify-center gap-2 text-xs text-gray-300">
              {badges.map((b, i) => (
                <span key={i} className="inline-flex items-center">
                  {i > 0 && <span className="mx-1.5 opacity-40">·</span>}
                  {b}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
