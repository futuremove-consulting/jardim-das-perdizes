import { describe, it, expect, afterEach } from "vitest";
import { cleanup, render, screen } from "@testing-library/react";
import Faq from "./Faq";
import KeyTakeaways from "./KeyTakeaways";
import JsonLd from "@/components/seo/JsonLd";
import { faqPageSchema } from "@/lib/seo/schemas";

afterEach(cleanup);

const ITEMS = [
  {
    question: "O parque do Jardim das Perdizes é público?",
    answer: "Sim. O parque central de 45 mil m² é público.",
  },
  {
    question: "Quantos produtos existem no bairro?",
    answer: "Nove produtos, com dados verificados em 31/08/2026.",
  },
];

describe("Faq", () => {
  it("renders questions and answers visibly", () => {
    render(<Faq items={ITEMS} />);
    expect(
      screen.getByRole("heading", { name: /perguntas frequentes/i })
    ).toBeInTheDocument();
    expect(screen.getByText(ITEMS[0].question)).toBeInTheDocument();
    expect(screen.getByText(ITEMS[0].answer)).toBeInTheDocument();
    expect(screen.getByText(ITEMS[1].question)).toBeInTheDocument();
  });
});

describe("KeyTakeaways", () => {
  it("renders the extraction block with its bullets", () => {
    render(
      <KeyTakeaways items={["Fato um.", "Fato dois."]} />
    );
    expect(
      screen.getByRole("region", { name: /resumo rápido/i })
    ).toBeInTheDocument();
    expect(screen.getByText("Fato um.")).toBeInTheDocument();
    expect(screen.getByText("Fato dois.")).toBeInTheDocument();
  });
});

describe("JsonLd", () => {
  it("emits application/ld+json with serialized schema", () => {
    const { container } = render(<JsonLd schema={faqPageSchema(ITEMS)} />);
    const script = container.querySelector('script[type="application/ld+json"]');
    expect(script).not.toBeNull();
    const parsed = JSON.parse(script!.textContent!) as {
      "@type": string;
      mainEntity: unknown[];
    };
    expect(parsed["@type"]).toBe("FAQPage");
    expect(parsed.mainEntity).toHaveLength(2);
  });
});
