import { describe, it, expect, afterEach, vi, beforeEach } from "vitest";

describe("GoogleAnalytics", () => {
  beforeEach(() => {
    vi.resetModules();
  });

  afterEach(() => {
    delete process.env.NEXT_PUBLIC_GA4_MEASUREMENT_ID;
  });

  it("returns null when no measurement ID is configured", async () => {
    process.env.NEXT_PUBLIC_GA4_MEASUREMENT_ID = "";
    const { default: GoogleAnalytics } = await import("./GoogleAnalytics");
    const react = await import("react");
    const { renderToStaticMarkup } = await import("react-dom/server");
    const html = renderToStaticMarkup(react.createElement(GoogleAnalytics));
    expect(html).toBe("");
  });

  it("renders the GA4 script tag when measurement ID is set", async () => {
    process.env.NEXT_PUBLIC_GA4_MEASUREMENT_ID = "G-TEST123";
    vi.mock("next/script", () => ({
      default: async ({ id, strategy }: { id?: string; strategy: string }) => {
        const react = await import("react");
        if (id) {
          return react.createElement("script", {
            id,
            "data-gaid": "G-TEST123",
            "data-strategy": strategy,
            dangerouslySetInnerHTML: { __html: "" },
          });
        }
        return react.createElement("script", {
          "data-strategy": strategy,
        });
      },
    }));
    const { default: GoogleAnalytics } = await import("./GoogleAnalytics");
    const react = await import("react");
    const { renderToStaticMarkup } = await import("react-dom/server");
    const html = renderToStaticMarkup(react.createElement(GoogleAnalytics));
    expect(html).toContain("G-TEST123");
  });
});
