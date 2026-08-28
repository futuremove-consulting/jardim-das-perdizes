import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import Home from "./page";
import { localBusinessSchema } from "@/lib/seo/schemas";

const INTENT_LINKS = [
  { label: /comprador/i, href: "/para-morar" },
  { label: /locatário/i, href: "/encontre-seu-perfil" },
  { label: /investidor/i, href: "/para-investir" },
  { label: /proprietário/i, href: "/venda-ou-alugue-seu-imovel" },
];

describe("Home identity page", () => {
  it("renders the site brand as a heading", () => {
    render(<Home />);
    expect(
      screen.getByRole("heading", { name: /jardim das perdizes/i })
    ).toBeInTheDocument();
  });

  it("renders the four intent cards linking to real phase-1 routes", () => {
    const { container } = render(<Home />);
    for (const intent of INTENT_LINKS) {
      const link = screen.getByRole("link", { name: intent.label });
      expect(link).toBeInTheDocument();
      expect(link.getAttribute("href")).toBe(intent.href);
    }
    expect(container).toBeTruthy();
  });

  it("embeds the LocalBusiness JSON-LD script from the schema builder", () => {
    const { container } = render(<Home />);
    const script = container.querySelector('script[type="application/ld+json"]');
    expect(script).not.toBeNull();
    const parsed = JSON.parse(script!.textContent as string);
    expect(parsed["@type"]).toBe(localBusinessSchema()["@type"]);
    expect(parsed["@type"]).toBe("RealEstateAgent");
    expect(parsed.name).toBe(localBusinessSchema().name);
  });

  it("renders the demo-mode banner in demo environment", () => {
    const { container } = render(<Home />);
    expect(
      screen.getByText(/modo demonstração/i)
    ).toBeInTheDocument();
    expect(container).toBeTruthy();
  });
});
