import type { Metadata } from "next";
import { siteUrl } from "@/lib/config";

export interface PageMetadataInput {
  title: string;
  description: string;
  /** Route path, e.g. "/condominios-e-produtos/reserva-manaca/" (trailing slash optional). */
  path: string;
}

/**
 * Metadata factory: title + description + a single absolute canonical
 * assembled from siteUrl() (plan 01-01). Trailing-slash-safe join.
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
  };
}