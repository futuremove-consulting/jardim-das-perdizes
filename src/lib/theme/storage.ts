import { THEME_STORAGE_KEY, isStoredTheme, type ResolvedTheme } from "./theme";

/** Read the user's explicit choice; null means "follow the OS" (system). */
export function readStoredTheme(): ResolvedTheme | null {
  if (typeof window === "undefined") return null;
  try {
    const value = window.localStorage.getItem(THEME_STORAGE_KEY);
    return isStoredTheme(value) ? value : null;
  } catch {
    return null;
  }
}

/** Persist an explicit choice, or clear it (null) to follow the OS. */
export function writeStoredTheme(theme: ResolvedTheme | null): void {
  if (typeof window === "undefined") return;
  try {
    if (theme === null) window.localStorage.removeItem(THEME_STORAGE_KEY);
    else window.localStorage.setItem(THEME_STORAGE_KEY, theme);
  } catch {
    // Storage unavailable (private mode) — in-memory state still works.
  }
}

/** System preference, defaulting to light when matchMedia is absent. */
export function readSystemTheme(): ResolvedTheme {
  if (typeof window === "undefined" || !window.matchMedia) return "light";
  try {
    return window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light";
  } catch {
    return "light";
  }
}
