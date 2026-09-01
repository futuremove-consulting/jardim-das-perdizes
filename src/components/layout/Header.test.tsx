import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import Header from "./Header";
import { ThemeProvider } from "@/lib/theme/ThemeProvider";
import { NAV_MAIN, NAV_SECONDARY } from "@/lib/routes";

// ActiveLink (client) reads usePathname — mock with a mutable current path so
// tests can drive the aria-current active state.
const currentPath = vi.hoisted(() => ({ value: "/" }));
vi.mock("next/navigation", () => ({
  usePathname: () => currentPath.value,
}));

// WhatsApp door (Header port 2) only renders when the number is configured.
process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ||= "5511999783379";

// Next's Link normalizes trailing slashes in the rendered href, so compare
// paths against their canonical (trailing-slash-stripped, root "/") form.
function canonical(path: string): string {
  if (path === "/") return "/";
  return path.replace(/\/+$/, "");
}

function renderHeader() {
  return render(
    <ThemeProvider>
      <Header />
    </ThemeProvider>
  );
}

describe("Header", () => {
  beforeEach(() => {
    currentPath.value = "/";
  });

  it("renders all main nav items as links with correct hrefs", () => {
    renderHeader();
    for (const item of NAV_MAIN) {
      const links = screen.getAllByRole("link", { name: item.label });
      expect(links.length).toBeGreaterThan(0);
      for (const link of links) {
        expect(link).toHaveAttribute("href", canonical(item.path));
      }
    }
  });

  it("renders all secondary nav items as links with correct hrefs", () => {
    renderHeader();
    for (const item of NAV_SECONDARY) {
      const links = screen.getAllByRole("link", { name: item.label });
      expect(links.length).toBeGreaterThan(0);
      for (const link of links) {
        expect(link).toHaveAttribute("href", canonical(item.path));
      }
    }
  });

  it("marks the active section with aria-current=page", () => {
    currentPath.value = "/para-morar/";
    renderHeader();
    for (const link of screen.getAllByRole("link", { name: "Para Morar" })) {
      expect(link).toHaveAttribute("aria-current", "page");
    }
    for (const link of screen.getAllByRole("link", { name: "Home" })) {
      expect(link).not.toHaveAttribute("aria-current");
    }
  });

  it("renders the two real conversion doors: form anchor + WhatsApp", () => {
    renderHeader();
    const sol = screen.getAllByRole("link", { name: /enviar solicitação/i });
    expect(sol.length).toBeGreaterThan(0);
    for (const link of sol) {
      expect(link.getAttribute("href")).toBe("/#conversao");
    }
    const zapp = screen.getAllByRole("link", {
      name: /falar agora com especialista/i,
    });
    expect(zapp.length).toBeGreaterThan(0);
    for (const link of zapp) {
      expect(link.getAttribute("href")).toMatch(/^https:\/\/wa\.me\//);
    }
  });

  it("renders the theme toggle in the header", () => {
    renderHeader();
    expect(screen.getAllByRole("button", { name: /tema/i }).length).toBeGreaterThan(0);
  });
});
