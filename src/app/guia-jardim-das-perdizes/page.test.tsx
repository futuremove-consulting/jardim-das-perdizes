import { describe, it, expect, afterEach } from "vitest";
import { cleanup, render, screen } from "@testing-library/react";
import GuiaJardimDasPerdizesPage from "./page";

afterEach(cleanup);

describe("guia-jardim-das-perdizes page (pillar)", () => {
  it("renders H1, key takeaways and the dated facts table", () => {
    render(<GuiaJardimDasPerdizesPage />);

    expect(
      screen.getByRole("heading", {
        name: /guia do jardim das perdizes/i,
      })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("region", { name: /resumo rápido/i })
    ).toBeInTheDocument();
    expect(screen.getByRole("table")).toBeInTheDocument();
    expect(screen.getByText(/agência sp \(01\/07\/2026\)/i)).toBeInTheDocument();
  });

  it("renders the FAQ visibly with sourced, dated answers", () => {
    render(<GuiaJardimDasPerdizesPage />);

    expect(
      screen.getByText("O parque do Jardim das Perdizes é público?")
    ).toBeInTheDocument();
    expect(
      screen.getAllByText(/operação assistida/i).length
    ).toBeGreaterThan(0);
    expect(
      screen.getAllByText(/verificado em 31\/08\/2026|captura 31\/08\/2026/i).length
    ).toBeGreaterThan(0);
  });

  it("emits FAQPage and BreadcrumbList JSON-LD", () => {
    const { container } = render(<GuiaJardimDasPerdizesPage />);

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
    render(<GuiaJardimDasPerdizesPage />);

    expect(
      screen.getByRole("link", { name: /explorar condomínios/i })
    ).toHaveAttribute("href", "/condominios-e-produtos");
    expect(
      screen.getByRole("link", { name: /trabalhar no bairro/i })
    ).toHaveAttribute("href", "/para-trabalhar");
  });
});