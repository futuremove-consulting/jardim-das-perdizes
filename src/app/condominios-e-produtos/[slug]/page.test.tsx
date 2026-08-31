import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import CondominiumPage, { generateMetadata } from "./page";

describe("condominium [slug] page", () => {
  it("renders Reserva Manacá confirmed towers, blocks and delivery status", async () => {
    const element = await CondominiumPage({
      params: Promise.resolve({ slug: "reserva-manaca" }),
    });
    render(element);

    expect(
      screen.getByRole("heading", { name: /reserva manacá/i })
    ).toBeInTheDocument();
    for (const block of [
      "Andorinha",
      "Sabiá",
      "Arara",
      "Cacatua",
      "Falcão",
      "Jacutinga",
    ]) {
      expect(screen.getByText(block)).toBeInTheDocument();
    }
    expect(screen.getByText(/entregue/i)).toBeInTheDocument();
  });

  it("renders Recanto Jacarandá unconfirmed-towers disclosure", async () => {
    const element = await CondominiumPage({
      params: Promise.resolve({ slug: "recanto-jacaranda" }),
    });
    render(element);

    expect(
      screen.getByText(/torres não identificadas publicamente/i)
    ).toBeInTheDocument();
  });

  it("derives per-page metadata (title + canonical) from the shared factory", async () => {
    const metadata = await generateMetadata({
      params: Promise.resolve({ slug: "reserva-manaca" }),
    });

    expect(metadata.title).toContain("Reserva Manacá");
    expect(metadata.alternates?.canonical).toContain(
      "/condominios-e-produtos/reserva-manaca/"
    );
  });

  it("renders Sequoia as breve lançamento with undisclosed-units note and dated source", async () => {
    const element = await CondominiumPage({
      params: Promise.resolve({ slug: "sequoia" }),
    });
    render(element);

    expect(screen.getAllByText(/breve lançamento/i).length).toBeGreaterThan(0);
    expect(screen.getByText(/não divulgado — breve lançamento/i)).toBeInTheDocument();
    expect(screen.getByText(/tecnisa\.com\.br\/imoveis\/sequoia/i)).toBeInTheDocument();
    expect(screen.getByText("4 dormitórios — 148 m²")).toBeInTheDocument();
  });

  it("renders Reserva Figueiras 'Pronto para morar' with the reconciliation note", async () => {
    const element = await CondominiumPage({
      params: Promise.resolve({ slug: "reserva-figueiras" }),
    });
    render(element);

    expect(screen.getAllByText(/pronto para morar/i).length).toBeGreaterThan(0);
    expect(screen.getByText(/outubro de 2026/i)).toBeInTheDocument();
    expect(screen.getByText(/captura 31\/08\/2026/i)).toBeInTheDocument();
  });
});