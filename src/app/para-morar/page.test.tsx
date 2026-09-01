import { describe, it, expect, afterEach } from "vitest";
import { cleanup, render, screen } from "@testing-library/react";
import ParaMorarPage from "./page";

afterEach(cleanup);

describe("para-morar page", () => {
  it("renders H1, key takeaways and the modalities table", () => {
    render(<ParaMorarPage />);

    expect(
      screen.getByRole("heading", { name: /para morar no jardim das perdizes/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("region", { name: /resumo rápido/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("table")
    ).toBeInTheDocument();
    expect(screen.getByText(/reserva figueiras — 165 e 188 m²/i)).toBeInTheDocument();
  });

  it("renders the FAQ visibly with dated, sourced answers", () => {
    render(<ParaMorarPage />);

    expect(
      screen.getByText("O parque do Jardim das Perdizes é público?")
    ).toBeInTheDocument();
    expect(
      screen.getAllByText(/verificado em 31\/08\/2026|captura 31\/08\/2026/i).length
    ).toBeGreaterThan(0);
  });

  it("emits FAQPage and BreadcrumbList JSON-LD", () => {
    const { container } = render(<ParaMorarPage />);

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
    render(<ParaMorarPage />);

    expect(
      screen.getByRole("link", { name: /explorar condomínios/i })
    ).toHaveAttribute("href", "/condominios-e-produtos");
    expect(
      screen.getByRole("link", { name: /trabalhar no bairro/i })
    ).toHaveAttribute("href", "/para-trabalhar");
  });
});