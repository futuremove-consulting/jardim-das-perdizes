"use client";

import { useContext } from "react";
import { ThemeContext } from "@/lib/theme/ThemeProvider";

function useContextSafe() {
  return useContext(ThemeContext);
}

export default function ThemeToggle() {
  const ctx = useContextSafe();
  if (!ctx) return null;

  const isDark = ctx.resolvedTheme === "dark";
  const label = isDark ? "Ativar tema claro" : "Ativar tema escuro";

  return (
    <button
      type="button"
      onClick={ctx.toggleTheme}
      aria-label={label}
      title={label}
      className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-line text-ink transition-colors hover:border-brand hover:text-brand focus-visible:outline focus-visible:outline-2 focus-visible:outline-brand"
    >
      <span aria-hidden="true" className="block h-5 w-5">
        {isDark ? (
          // Sun
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="12" cy="12" r="4" />
            <path strokeLinecap="round" d="M12 2v2m0 16v2M4.9 4.9l1.4 1.4m11.4 11.4 1.4 1.4M2 12h2m16 0h2M4.9 19.1l1.4-1.4m11.4-11.4 1.4-1.4" />
          </svg>
        ) : (
          // Moon
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8Z" />
          </svg>
        )}
      </span>
      <span className="sr-only">{label}</span>
    </button>
  );
}
