import { describe, it, expect, afterEach } from "vitest";
import { cleanup, render, screen } from "@testing-library/react";
import ParaTrabalharPage from "./page";

afterEach(cleanup);

describe("para-trabalhar page (commercial hub)", () => {
  it("renders H1, key takeaways and the two modality cards", () => {
    render(<ParaTrabalharPage />);

    expect(
      screen.getByRole("heading", { name: /trabalhar no jardim das perdizes/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("region", { name: /resumo rápido/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: /comprar/i })
    ).toHaveAttribute("href", "/para-trabalhar/comprar");
    expect(
      screen.getByRole("link", { name: /alugar/i })
    ).toHaveAttribute("href", "/para-trabalhar/alugar");
  });

  it("renders the FAQ visibly with sourced answers", () => {
    render(<ParaTrabalharPage />);

    expect(
      screen.getByText("Onde ficam as salas comerciais no Jardim das Perdizes?")
    ).toBeInTheDocument();
  });

  it("emits FAQPage and BreadcrumbList JSON-LD", () => {
    const { container } = render(<ParaTrabalharPage />);

    const scripts = container.querySelectorAll(
      'script[type="application/ld+json"]'
    );
    expect(scripts).toHaveLength(2);
    const types = Array.from(scripts).map(
      (s) => (JSON.parse(s.textContent!) as { "@type": string })["@type"]
    );
    expect(types).toEqual(["FAQPage", "BreadcrumbList"]);
  });
});