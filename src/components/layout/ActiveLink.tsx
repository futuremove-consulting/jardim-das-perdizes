"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { NavItem } from "@/lib/routes";

/**
 * Nav link with an accessible active state (aria-current="page"). The visual
 * active treatment mirrors the hover treatment (brand color) so the two never
 * compete — the active page is simply "already here".
 */
export default function ActiveLink({
  path,
  label,
  className = "",
}: NavItem & { className?: string }) {
  const pathname = usePathname();
  // "/" is only active on the exact home page; section hubs match by prefix
  // (e.g. /para-morar/ is active for /para-morar/ and its future children).
  const normalized = pathname.replace(/\/+$/, "") || "/";
  const target = path.replace(/\/+$/, "") || "/";
  const isActive =
    target === "/" ? normalized === "/" : normalized.startsWith(target);

  return (
    <Link
      href={path}
      aria-current={isActive ? "page" : undefined}
      className={`${isActive ? "text-brand" : "hover:text-brand"} ${className}`.trim()}
    >
      {label}
    </Link>
  );
}