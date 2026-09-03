import { describe, it, expect, afterEach } from "vitest";
import { cleanup, render, screen } from "@testing-library/react";
import GuiaPage from "./GuiaPage";
import { GUIAS } from "@/data/guias";
import type { FaqItem } from "@/lib/seo/schemas";

afterEach(cleanup);

const FAQ: FaqItem[] = [
  {
    question: "Pergunta de teste?",
    answer: "Resposta de teste com fonte datada.",
  },
];

describe("GuiaPage (shared guia layout)", () => {
  it("renders H1, intro, key takeaways and a sourced table", () => {
    const guia = GUIAS.escolas;
    render(<GuiaPage guia={guia} faq={FAQ} />);

    expect(
      screen.getByRole("heading", { name: guia.title })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("region", { name: /resumo rápido/i })
    ).toBeInTheDocument();
    expect(screen.getByRole("table")).toBeInTheDocument();
    expect(screen.getByText(/Colégio Pentágono/i)).toBeInTheDocument();
    expect(screen.getAllByText(/Tecnisa/i).length).toBeGreaterThan(0);
  });

  it("renders the FAQ visibly and emits FAQPage + BreadcrumbList JSON-LD", () => {
    const guia = GUIAS.escolas;
    const { container } = render(<GuiaPage guia={guia} faq={FAQ} />);

    expect(screen.getByText("Pergunta de teste?")).toBeInTheDocument();

    const scripts = container.querySelectorAll(
      'script[type="application/ld+json"]'
    );
    expect(scripts).toHaveLength(2);
    const types = Array.from(scripts).map(
      (s) => (JSON.parse(s.textContent!) as { "@type": string })["@type"]
    );
    expect(types).toEqual(["FAQPage", "BreadcrumbList"]);
  });

  it("bridges to the two conversion doors", () => {
    const guia = GUIAS.escolas;
    render(<GuiaPage guia={guia} faq={FAQ} />);

    expect(
      screen.getByRole("link", { name: /guia completo do bairro/i })
    ).toHaveAttribute("href", "/guia-jardim-das-perdizes");
    expect(
      screen.getByRole("link", { name: /explorar condomínios/i })
    ).toHaveAttribute("href", "/condominios");
  });
});
