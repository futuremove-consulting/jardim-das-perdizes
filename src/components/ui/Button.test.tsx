import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import Button, { ButtonLink } from "./Button";

describe("Button", () => {
  it("renders primary variant with correct classes", () => {
    render(<Button>Clique aqui</Button>);
    const button = screen.getByRole("button", { name: /clique aqui/i });
    expect(button).toHaveClass("bg-brand", "text-brand-contrast");
  });

  it("renders as a real <button> element with type=button", () => {
    render(<Button>Ação</Button>);
    const button = screen.getByRole("button", { name: /ação/i });
    expect(button.tagName).toBe("BUTTON");
    expect(button).toHaveAttribute("type", "button");
  });

  it("triggers onClick when clicked", async () => {
    const handleClick = vi.fn();
    render(<Button onClick={handleClick}>Clique</Button>);
    const { fireEvent } = await import("@testing-library/react");
    fireEvent.click(screen.getByRole("button", { name: /clique/i }));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it("renders secondary variant with border classes", () => {
    render(<Button variant="secondary">Saiba mais</Button>);
    const button = screen.getByRole("button", { name: /saiba mais/i });
    expect(button).toHaveClass("border", "text-ink");
  });

  it("renders ghost variant without background", () => {
    render(<Button variant="ghost">Detalhes</Button>);
    const button = screen.getByRole("button", { name: /detalhes/i });
    expect(button).toHaveClass("text-ink");
    expect(button).not.toHaveClass("bg-brand");
  });
});

describe("ButtonLink", () => {
  it("renders primary variant with correct classes", () => {
    render(<ButtonLink href="/test">Clique aqui</ButtonLink>);
    const link = screen.getByRole("link", { name: /clique aqui/i });
    expect(link).toHaveClass("bg-brand", "text-brand-contrast");
    expect(link).toHaveAttribute("href", "/test");
  });

  it("renders secondary variant with border classes", () => {
    render(
      <ButtonLink href="/test" variant="secondary">
        Saiba mais
      </ButtonLink>
    );
    const link = screen.getByRole("link", { name: /saiba mais/i });
    expect(link).toHaveClass("border", "text-ink");
  });

  it("renders ghost variant without background", () => {
    render(
      <ButtonLink href="/test" variant="ghost">
        Detalhes
      </ButtonLink>
    );
    const link = screen.getByRole("link", { name: /detalhes/i });
    expect(link).toHaveClass("text-ink");
    expect(link).not.toHaveClass("bg-brand");
  });

  it("applies custom className alongside variant classes", () => {
    render(
      <ButtonLink href="/test" className="extra-class">
        Custom
      </ButtonLink>
    );
    const link = screen.getByRole("link", { name: /custom/i });
    expect(link).toHaveClass("extra-class", "bg-brand");
  });
});