import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { appMode, isDemo, isProd, siteUrl } from "./config";

const ORIGINAL_APP_MODE = process.env.APP_MODE;
const ORIGINAL_SITE_URL = process.env.NEXT_PUBLIC_SITE_URL;

beforeEach(() => {
  vi.resetModules();
  delete process.env.APP_MODE;
  delete process.env.NEXT_PUBLIC_SITE_URL;
});

afterEach(() => {
  process.env.APP_MODE = ORIGINAL_APP_MODE;
  process.env.NEXT_PUBLIC_SITE_URL = ORIGINAL_SITE_URL;
});

describe("appMode", () => {
  it("defaults to 'demo' when APP_MODE is unset", () => {
    expect(appMode()).toBe("demo");
  });

  it("returns 'demo' when APP_MODE=demo", () => {
    process.env.APP_MODE = "demo";
    expect(appMode()).toBe("demo");
  });

  it("returns 'prod' when APP_MODE=prod", () => {
    process.env.APP_MODE = "prod";
    expect(appMode()).toBe("prod");
  });
});

describe("isDemo / isProd", () => {
  it("isDemo() is true and isProd() is false in demo", () => {
    process.env.APP_MODE = "demo";
    expect(isDemo()).toBe(true);
    expect(isProd()).toBe(false);
  });

  it("isProd() is true and isDemo() is false in prod", () => {
    process.env.APP_MODE = "prod";
    expect(isProd()).toBe(true);
    expect(isDemo()).toBe(false);
  });
});

describe("siteUrl", () => {
  it("reads NEXT_PUBLIC_SITE_URL when set", () => {
    process.env.NEXT_PUBLIC_SITE_URL = "https://example.com";
    expect(siteUrl()).toBe("https://example.com");
  });

  it("defaults to localhost in dev/demo when unset", () => {
    expect(siteUrl()).toBe("http://localhost:3000");
  });
});
