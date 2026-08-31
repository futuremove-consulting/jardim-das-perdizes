import { describe, it, expect } from "vitest";
import { resolveTheme, type Theme } from "./theme";
import { readStoredTheme, writeStoredTheme, readSystemTheme } from "./storage";

describe("resolveTheme", () => {
  it("maps explicit preference to itself", () => {
    expect(resolveTheme("light", "dark")).toBe("light");
    expect(resolveTheme("dark", "light")).toBe("dark");
  });

  it("falls back to the system theme for 'system' preference", () => {
    expect(resolveTheme("system", "dark")).toBe("dark");
    expect(resolveTheme("system", "light")).toBe("light");
  });
});

describe("storage", () => {
  it("round-trips an explicit stored theme", () => {
    writeStoredTheme("dark");
    expect(readStoredTheme()).toBe("dark");
  });

  it("returns null when cleared (system follows OS)", () => {
    writeStoredTheme(null);
    expect(readStoredTheme()).toBeNull();
  });

  it("readSystemTheme falls back to light without matchMedia", () => {
    expect(readSystemTheme()).toBe("light");
  });
});

describe("types", () => {
  it("Theme union is light|dark|system", () => {
    const t: Theme = "system";
    expect(["light", "dark", "system"]).toContain(t);
  });
});
