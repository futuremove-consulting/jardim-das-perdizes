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
});