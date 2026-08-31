import { describe, it, expect, afterEach } from "vitest";
import { localBusinessSchema } from "./schemas";

const ORIGINAL_SITE_URL = process.env.NEXT_PUBLIC_SITE_URL;

afterEach(() => {
  process.env.NEXT_PUBLIC_SITE_URL = ORIGINAL_SITE_URL;
});

describe("localBusinessSchema", () => {
  it("is a JSON-serializable object with RealEstateAgent type", () => {
    const schema = localBusinessSchema();
    expect(schema["@type"]).toBe("RealEstateAgent");
    // JSON-serializable guarantee: round-trips without throwing.
    expect(() => JSON.stringify(schema)).not.toThrow();
  });

  it("uses the pt-BR broker name and a São Paulo address", () => {
    const schema = localBusinessSchema();
    expect(schema.name).toContain("Jardim das Perdizes Broker");
    expect(schema.address).toMatchObject({
      addressLocality: "São Paulo",
      addressCountry: "BR",
    });
  });

  it("emits the canonical site URL", () => {
    process.env.NEXT_PUBLIC_SITE_URL = "https://example.com";
    const schema = localBusinessSchema();
    expect(schema.url).toBe("https://example.com/");
  });
});
