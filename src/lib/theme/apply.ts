import type { ResolvedTheme } from "./theme";

/** Apply the resolved theme to <html> (class + color-scheme). */
export function applyThemeToDocument(theme: ResolvedTheme): void {
  if (typeof document === "undefined") return;
  document.documentElement.classList.toggle("dark", theme === "dark");
  document.documentElement.style.colorScheme = theme;
}
