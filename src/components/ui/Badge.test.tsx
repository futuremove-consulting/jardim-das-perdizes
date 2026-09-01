import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import Badge, { STATUS_LABELS } from "./Badge";

describe("Badge", () => {
  it("renders 'Entregue' for delivered status", () => {
    render(<Badge status="delivered" />);
    expect(screen.getByText("Entregue")).toBeInTheDocument();
  });

  it("renders 'Pronto para morar' for ready-to-move status", () => {
    render(<Badge status="ready-to-move" />);
    expect(screen.getByText("Pronto para morar")).toBeInTheDocument();
  });

  it("renders 'Em obras' for under-construction status", () => {
    render(<Badge status="under-construction" />);
    expect(screen.getByText("Em obras")).toBeInTheDocument();
  });

  it("renders 'Breve lançamento' for coming-soon status", () => {
    render(<Badge status="coming-soon" />);
    expect(screen.getByText("Breve lançamento")).toBeInTheDocument();
  });

  it("applies status-specific tone classes (light + dark)", () => {
    const { container } = render(<Badge status="delivered" />);
    const badge = container.firstChild as HTMLElement;
    expect(badge.className).toMatch(/bg-emerald-100/);
    expect(badge.className).toMatch(/text-emerald-800/);
    expect(badge.className).toMatch(/dark:bg-emerald-950\/60/);
    expect(badge.className).toMatch(/dark:text-emerald-300/);
  });

  it("exports STATUS_LABELS with all statuses", () => {
    expect(STATUS_LABELS.delivered).toBe("Entregue");
    expect(STATUS_LABELS["ready-to-move"]).toBe("Pronto para morar");
    expect(STATUS_LABELS["under-construction"]).toBe("Em obras");
    expect(STATUS_LABELS["coming-soon"]).toBe("Breve lançamento");
  });
});