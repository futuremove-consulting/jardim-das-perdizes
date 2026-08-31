"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useSyncExternalStore,
  type ReactNode,
} from "react";
import type { ResolvedTheme, Theme } from "./theme";
import { resolveTheme } from "./theme";
import { readStoredTheme, readSystemTheme, writeStoredTheme } from "./storage";
import { applyThemeToDocument } from "./apply";

interface ThemeContextValue {
  theme: Theme;
  resolvedTheme: ResolvedTheme;
  setTheme: (theme: Theme) => void;
  toggleTheme: () => void;
}

export const ThemeContext = createContext<ThemeContextValue | null>(null);

/**
 * External store for the persisted theme preference (localStorage-backed).
 * useSyncExternalStore keeps this provider rule-compliant (no setState inside
 * effects): React re-syncs the client snapshot after hydration on its own.
 */
const themeListeners = new Set<() => void>();

function subscribeTheme(listener: () => void): () => void {
  themeListeners.add(listener);
  return () => {
    themeListeners.delete(listener);
  };
}

function getThemeSnapshot(): Theme {
  return readStoredTheme() ?? "system";
}

function getThemeServerSnapshot(): Theme {
  return "system";
}

function emitThemeChange(): void {
  for (const listener of themeListeners) listener();
}

function subscribeSystemTheme(listener: () => void): () => void {
  if (typeof window === "undefined" || typeof window.matchMedia !== "function") {
    return () => undefined;
  }
  const query = window.matchMedia("(prefers-color-scheme: dark)");
  query.addEventListener("change", listener);
  return () => query.removeEventListener("change", listener);
}

function getSystemDarkSnapshot(): boolean {
  return readSystemTheme() === "dark";
}

function getSystemDarkServerSnapshot(): boolean {
  return false;
}

/** Script-safe, hydration-safe theme provider. Defaults to the OS preference. */
export function ThemeProvider({ children }: { children: ReactNode }) {
  const theme = useSyncExternalStore(
    subscribeTheme,
    getThemeSnapshot,
    getThemeServerSnapshot
  );
  const systemPrefersDark = useSyncExternalStore(
    subscribeSystemTheme,
    getSystemDarkSnapshot,
    getSystemDarkServerSnapshot
  );

  const resolvedTheme: ResolvedTheme =
    theme === "system" ? (systemPrefersDark ? "dark" : "light") : theme;

  // Sync the external system (document) with React state — DOM write only.
  useEffect(() => {
    applyThemeToDocument(resolvedTheme);
  }, [resolvedTheme]);

  const setTheme = useCallback((next: Theme) => {
    const resolved = resolveTheme(next, readSystemTheme());
    writeStoredTheme(next === "system" ? null : resolved);
    applyThemeToDocument(resolved);
    emitThemeChange();
  }, []);

  const toggleTheme = useCallback(() => {
    setTheme(resolvedTheme === "dark" ? "light" : "dark");
  }, [setTheme, resolvedTheme]);

  const value = useMemo<ThemeContextValue>(
    () => ({ theme, resolvedTheme, setTheme, toggleTheme }),
    [theme, resolvedTheme, setTheme, toggleTheme]
  );

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
}

export function useTheme(): ThemeContextValue {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme must be used within ThemeProvider");
  return ctx;
}
