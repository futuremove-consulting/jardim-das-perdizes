import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import Header from "./Header";
import { NAV_MAIN, NAV_SECONDARY } from "@/lib/routes";

// Next's Link normalizes trailing slashes in the rendered href, so compare
// paths against their canonical (trailing-slash-stripped, root "/") form.
function canonical(path: string): string {
  if (path === "/") return "/";
  return path.replace(/\/+$/, "");
}

describe("Header", () => {
  it("renders all main nav items as links with correct hrefs", () => {
    render(<Header />);
    for (const item of NAV_MAIN) {
      const links = screen.getAllByRole("link", { name: item.label });
      expect(links.length).toBeGreaterThan(0);
      for (const link of links) {
        expect(link).toHaveAttribute("href", canonical(item.path));
      }
    }
  });

  it("renders all secondary nav items as links with correct hrefs", () => {
    render(<Header />);
    for (const item of NAV_SECONDARY) {
      const links = screen.getAllByRole("link", { name: item.label });
      expect(links.length).toBeGreaterThan(0);
      for (const link of links) {
        expect(link).toHaveAttribute("href", canonical(item.path));
      }
    }
  });
});
