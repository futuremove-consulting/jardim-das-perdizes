export type Theme = "light" | "dark" | "system";
export type ResolvedTheme = "light" | "dark";

export const THEME_STORAGE_KEY = "jdp-theme";

/**
 * Resolve the effective theme: an explicit preference maps to itself;
 * "system" falls back to the OS-level theme.
 */
export function resolveTheme(
  preference: Theme,
  system: ResolvedTheme
): ResolvedTheme {
  return preference === "system" ? system : preference;
}

export function isStoredTheme(value: unknown): value is ResolvedTheme {
  return value === "light" || value === "dark";
}
