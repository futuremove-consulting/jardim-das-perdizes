import { siteUrl } from "@/lib/config";

/**
 * LocalBusiness JSON-LD builder (plan 01-04).
 * Schema keys in English (schema.org); copy values in pt-BR (rendered).
 * Emitted via JSON.stringify at render time — never string-interpolated
 * into the script (threat T-04-01).
 */
export function localBusinessSchema(): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": "RealEstateAgent",
    name: "Jardim das Perdizes Broker",
    description:
      "Corretor independente e hub de conteúdo especializado no bairro Jardim das Perdizes, em Perdizes (São Paulo).",
    url: `${siteUrl().replace(/\/+$/, "")}/`,
    address: {
      "@type": "PostalAddress",
      addressLocality: "São Paulo",
      addressRegion: "SP",
      addressCountry: "BR",
    },
    areaServed: "Jardim das Perdizes, Perdizes, São Paulo",
  };
}
