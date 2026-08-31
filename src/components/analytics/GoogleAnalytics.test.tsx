import { describe, it, expect, afterEach, vi, beforeEach } from "vitest";
import React from "react";

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
      default: ({ id, strategy, src, dangerouslySetInnerHTML }: { id?: string; strategy: string; src?: string; dangerouslySetInnerHTML?: { __html: string } }) => {
        if (id) {
          return React.createElement("script", {
            id,
            "data-strategy": strategy,
            dangerouslySetInnerHTML: dangerouslySetInnerHTML ?? { __html: "" },
          });
        }
        return React.createElement("script", {
          src,
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
