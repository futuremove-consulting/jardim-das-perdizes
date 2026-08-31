import { describe, it, expect, afterEach } from "vitest";
import { cleanup, render, screen, fireEvent } from "@testing-library/react";
import ThemeToggle from "./ThemeToggle";
import { ThemeProvider } from "@/lib/theme/ThemeProvider";

// jsdom has no matchMedia by default; setup.ts polyfills → returns light.
afterEach(cleanup);

describe("ThemeToggle", () => {
  it("renders an accessible toggle button", () => {
    render(
      <ThemeProvider>
        <ThemeToggle />
      </ThemeProvider>
    );
    expect(
      screen.getByRole("button", { name: /tema/i })
    ).toBeInTheDocument();
  });

  it("toggles the document class to dark and back", () => {
    render(
      <ThemeProvider>
        <ThemeToggle />
      </ThemeProvider>
    );

    document.documentElement.classList.remove("dark");
    const button = screen.getByRole("button", { name: /tema/i });
    fireEvent.click(button);
    expect(document.documentElement.classList.contains("dark")).toBe(true);

    fireEvent.click(button);
    expect(document.documentElement.classList.contains("dark")).toBe(false);
  });
});
