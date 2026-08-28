export type AppMode = "demo" | "prod";

const DEFAULT_MODE: AppMode = "demo";

const SITE_URL_DEFAULT = {
  prod: "https://www.jardimdasperdizes.com.br",
  demo: "http://localhost:3000",
};

export function appMode(): AppMode {
  const raw = process.env.APP_MODE;
  if (raw === "prod") return "prod";
  // Strict: only 'demo' | 'prod' accepted; anything else falls back to demo.
  return DEFAULT_MODE;
}

export function isDemo(): boolean {
  return appMode() === "demo";
}

export function isProd(): boolean {
  return appMode() === "prod";
}

export function siteUrl(): string {
  const configured = process.env.NEXT_PUBLIC_SITE_URL;
  if (configured) return configured;
  return SITE_URL_DEFAULT[appMode()];
}
