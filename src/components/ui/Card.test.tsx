import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import Card from "./Card";

describe("Card", () => {
  it("renders children content", () => {
    render(<Card>Conteúdo do card</Card>);
    expect(screen.getByText("Conteúdo do card")).toBeInTheDocument();
  });

  it("applies base card classes", () => {
    const { container } = render(<Card>Base</Card>);
    const card = container.firstChild as HTMLElement;
    expect(card.className).toMatch(/rounded-2xl/);
    expect(card.className).toMatch(/border-line/);
    expect(card.className).toMatch(/p-6/);
  });

  it("applies interactive classes when interactive is true", () => {
    const { container } = render(<Card interactive>Linkável</Card>);
    const card = container.firstChild as HTMLElement;
    expect(card.className).toMatch(/hover:border-brand/);
    expect(card.className).toMatch(/transition-colors/);
  });

  it("applies elevated background when elevated is true", () => {
    const { container } = render(<Card elevated>Destaque</Card>);
    const card = container.firstChild as HTMLElement;
    expect(card.className).toMatch(/bg-paper-secondary/);
  });

  it("applies custom className alongside base classes", () => {
    const { container } = render(<Card className="custom">Custom</Card>);
    const card = container.firstChild as HTMLElement;
    expect(card.className).toMatch(/custom/);
    expect(card.className).toMatch(/rounded-2xl/);
  });
});