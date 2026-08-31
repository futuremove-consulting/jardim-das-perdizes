import { afterEach, describe, expect, it } from "vitest";
import { buildPageMetadata } from "./metadata";

const ORIGINAL_SITE_URL = process.env.NEXT_PUBLIC_SITE_URL;
const ORIGINAL_APP_MODE = process.env.APP_MODE;

afterEach(() => {
  if (ORIGINAL_SITE_URL === undefined) delete process.env.NEXT_PUBLIC_SITE_URL;
  else process.env.NEXT_PUBLIC_SITE_URL = ORIGINAL_SITE_URL;
  if (ORIGINAL_APP_MODE === undefined) delete process.env.APP_MODE;
  else process.env.APP_MODE = ORIGINAL_APP_MODE;
});

describe("buildPageMetadata", () => {
  it("returns title, description and an absolute canonical from site URL + path", () => {
    process.env.NEXT_PUBLIC_SITE_URL = "http://localhost:3000";
    const metadata = buildPageMetadata({
      title: "Reserva Manacá",
      description: "Três torres com seis blocos de alto padrão.",
      path: "/condominios-e-produtos/reserva-manaca/",
    });
    expect(metadata.title).toBe("Reserva Manacá");
    expect(metadata.description).toBe("Três torres com seis blocos de alto padrão.");
    expect(metadata.alternates?.canonical).toBe(
      "http://localhost:3000/condominios-e-produtos/reserva-manaca/"
    );
  });

  it("joins base and path with exactly one trailing slash", () => {
    process.env.NEXT_PUBLIC_SITE_URL = "http://localhost:3000";
    const metadata = buildPageMetadata({
      title: "T",
      description: "D",
      path: "/condominios-e-produtos/reserva-manaca/",
    });
    expect(metadata.alternates?.canonical).toBe(
      "http://localhost:3000/condominios-e-produtos/reserva-manaca/"
    );
  });

  it("falls back to the production domain when the site URL env var is unset", () => {
    delete process.env.NEXT_PUBLIC_SITE_URL;
    process.env.APP_MODE = "prod";
    const metadata = buildPageMetadata({
      title: "T",
      description: "D",
      path: "/condominios-e-produtos/reserva-manaca/",
    });
    expect(metadata.alternates?.canonical).toBe(
      "https://www.jardimdasperdizes.com.br/condominios-e-produtos/reserva-manaca/"
    );
  });

  it("audits openGraph and twitter cards for every page", () => {
    process.env.NEXT_PUBLIC_SITE_URL = "https://example.com";
    const metadata = buildPageMetadata({
      title: "Reserva Manacá",
      description: "Três torres com seis blocos.",
      path: "/condominios-e-produtos/reserva-manaca/",
    });
    expect(metadata.openGraph?.title).toBe("Reserva Manacá");
    expect(metadata.openGraph?.url).toBe(
      "https://example.com/condominios-e-produtos/reserva-manaca/"
    );
    expect(metadata.openGraph?.locale).toBe("pt_BR");
    expect(Array.isArray(metadata.openGraph?.images)).toBe(true);
    // `Metadata["twitter"]` is a union whose base member (`TwitterMetadata`)
    // lacks `card`, so we assert via matcher instead of property access.
    expect(metadata.twitter).toMatchObject({ card: "summary_large_image" });
    expect(metadata.robots).toEqual({ index: true, follow: true });
  });
});