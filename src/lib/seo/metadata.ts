import type { Metadata } from "next";
import { siteUrl } from "@/lib/config";

export interface PageMetadataInput {
  title: string;
  description: string;
  /** Route path, e.g. "/condominios-e-produtos/reserva-manaca/" (trailing slash optional). */
  path: string;
}

const SITE_NAME = "Jardim das Perdizes Broker";
const DEFAULT_OG_IMAGE = "/og-image.jpg";

/**
 * Metadata factory: title + description + a single absolute canonical
 * assembled from siteUrl() (plan 01-01), plus OpenGraph + Twitter cards and
 * crawlable robots defaults. Trailing-slash-safe join.
 */
export function buildPageMetadata({
  title,
  description,
  path,
}: PageMetadataInput): Metadata {
  const base = siteUrl().replace(/\/+$/, "");
  const cleanPath = path.startsWith("/") ? path : `/${path}`;
  const canonical = `${base}/${cleanPath.replace(/^\/+|\/+$/g, "")}/`;

  return {
    title,
    description,
    alternates: { canonical },
    robots: {
      index: true,
      follow: true,
    },
    openGraph: {
      title,
      description,
      url: canonical,
      siteName: SITE_NAME,
      locale: "pt_BR",
      type: "website",
      images: [
        {
          url: DEFAULT_OG_IMAGE,
          width: 1200,
          height: 630,
          alt: SITE_NAME,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [DEFAULT_OG_IMAGE],
    },
  };
}
