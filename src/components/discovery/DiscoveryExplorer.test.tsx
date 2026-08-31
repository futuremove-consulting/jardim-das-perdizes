import { describe, it, expect, afterEach } from "vitest";
import { cleanup, render, screen, fireEvent } from "@testing-library/react";
import DiscoveryExplorer from "./DiscoveryExplorer";
import DiscoveryCard from "./DiscoveryCard";
import { CONDOMINIUMS } from "@/data/condominiums";

afterEach(cleanup);

describe("DiscoveryExplorer", () => {
  it("renders the full 9-product catalog by default", () => {
    render(<DiscoveryExplorer />);
    expect(screen.getByText(/9 de 9 produtos/i)).toBeInTheDocument();
    for (const c of CONDOMINIUMS) {
      expect(screen.getAllByText(c.name).length).toBeGreaterThan(0);
    }
  });

  it("filters by stage — Breve lançamento shows only Sequoia", () => {
    render(<DiscoveryExplorer />);
    fireEvent.click(screen.getByRole("button", { name: "Breve lançamento" }));

    expect(screen.getByText(/1 de 9 produtos/i)).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Sequoia" })).toBeInTheDocument();
    expect(
      screen.queryByRole("heading", { name: "Reserva Manacá" })
    ).not.toBeInTheDocument();
  });

  it("discloses data-limitation exclusions instead of hiding them", () => {
    render(<DiscoveryExplorer />);
    fireEvent.change(screen.getByLabelText(/suítes \(mínimo\)/i), {
      target: { value: "2" },
    });

    expect(
      screen.getByText(/não avaliados neste recorte/i)
    ).toBeInTheDocument();
    expect(screen.getByText(/reserva manacá/i)).toBeInTheDocument();
    expect(
      screen.getByText(/plantas oficiais não especificam/i)
    ).toBeInTheDocument();
  });

  it("empty state suggests nearest profiles and reset restores the catalog", () => {
    render(<DiscoveryExplorer />);
    fireEvent.click(screen.getByRole("button", { name: "Até 80 m²" }));
    fireEvent.change(screen.getByLabelText(/suítes \(mínimo\)/i), {
      target: { value: "2" },
    });

    expect(screen.getByText(/0 de 9 produtos/i)).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: /perfis mais próximos/i })
    ).toBeInTheDocument();

    fireEvent.click(screen.getByRole("button", { name: /limpar filtros/i }));
    expect(screen.getByText(/9 de 9 produtos/i)).toBeInTheDocument();
  });

  // Next's Link normalizes trailing slashes in the rendered href (same
  // convention as Header.test.tsx); production serves the trailing-slash URL
  // via trailingSlash: true in next.config.ts.
  it("links each result card to its static product page", () => {
    render(<DiscoveryCard condominium={CONDOMINIUMS[0]} />);
    const link = screen.getByRole("link");
    expect(link).toHaveAttribute(
      "href",
      `/condominios-e-produtos/${CONDOMINIUMS[0].slug}`
    );
    expect(screen.getByText(/ver ficha do produto/i)).toBeInTheDocument();
  });

  it("closes with the two-port conversion CTA when there are matches", () => {
    render(<DiscoveryExplorer />);
    const ctas = screen
      .getAllByRole("link", { name: /enviar meu recorte|especialista/i })
      .filter((a) => a.getAttribute("href") === "/#conversao");
    expect(ctas.length).toBe(2);
  });
});