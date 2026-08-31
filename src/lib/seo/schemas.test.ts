import { describe, it, expect, afterEach } from "vitest";
import { faqPageSchema, breadcrumbSchema, localBusinessSchema } from "./schemas";

const ORIGINAL_SITE_URL = process.env.NEXT_PUBLIC_SITE_URL;

afterEach(() => {
  process.env.NEXT_PUBLIC_SITE_URL = ORIGINAL_SITE_URL;
});

describe("faqPageSchema", () => {
  it("builds a FAQPage with pt-BR questions and answers from site URL base", () => {
    const schema = faqPageSchema([
      {
        question: "O parque do Jardim das Perdizes é público?",
        answer:
          "Sim. O parque central de 45 mil m² é público e aberto à visitação.",
      },
    ]);

    expect(schema["@context"]).toBe("https://schema.org");
    expect(schema["@type"]).toBe("FAQPage");
    const mainEntity = schema.mainEntity as Array<Record<string, unknown>>;
    expect(mainEntity).toHaveLength(1);
    expect(mainEntity[0]["@type"]).toBe("Question");
    expect(mainEntity[0].name).toContain("parque");
    const accepted = mainEntity[0].acceptedAnswer as Record<string, unknown>;
    expect(accepted["@type"]).toBe("Answer");
    expect(accepted.text).toContain("45 mil");
  });
});

describe("breadcrumbSchema", () => {
  it("builds a BreadcrumbList with absolute canonical URLs", () => {
    const schema = breadcrumbSchema([
      { name: "Home", path: "/" },
      { name: "Para Morar", path: "/para-morar/" },
    ]);

    expect(schema["@context"]).toBe("https://schema.org");
    expect(schema["@type"]).toBe("BreadcrumbList");
    const items = schema.itemListElement as Array<Record<string, unknown>>;
    expect(items).toHaveLength(2);
    expect(items[0]["@type"]).toBe("ListItem");
    expect(items[0].position).toBe(1);
    expect(items[1].position).toBe(2);
    expect(String(items[1].item)).toMatch(/\/para-morar\/$/);
  });
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
