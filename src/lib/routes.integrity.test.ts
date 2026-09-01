import { describe, it, expect } from "vitest";
import { existsSync, readdirSync, readFileSync, statSync } from "node:fs";
import { join } from "node:path";
import { ROUTES } from "./routes";
import { COMMERCIAL_PROPERTIES } from "@/data/commercial";

/**
 * SITE-INTEGRITY: every declared route and every literal internal href in the
 * codebase must resolve to a physical page file under src/app. This class of
 * bug (declared route without a page) produced silent 404s in the sitemap and
 * navigation before this test existed.
 */

const APP_DIR = join(process.cwd(), "src", "app");

function statSafe(path: string) {
  try {
    return statSync(path);
  } catch {
    return null;
  }
}

function resolveDynamicSegment(dir: string): string | null {
  const entries = readdirSync(dir);
  const dynamic = entries.find(
    (entry) =>
      entry.startsWith("[") &&
      entry.endsWith("]") &&
      statSafe(join(dir, entry))?.isDirectory()
  );
  return dynamic ? join(dir, dynamic) : null;
}

function pageExistsForPath(routePath: string): boolean {
  const segments = routePath.split("/").filter(Boolean);
  return pageExistsRecursive(APP_DIR, segments);
}

/**
 * Next.js App Router resolution: a path is matched by the route that consumes
 * ALL segments. Static and dynamic segments may coexist at the same level
 * (e.g. /para-trabalhar/comprar/ is a static page while
 * /para-trabalhar/[modality]/[slug]/ serves the product pages), so resolution
 * must backtrack when an exact segment has no page that consumes the rest.
 */
function pageExistsRecursive(dir: string, segments: string[]): boolean {
  if (segments.length === 0) return existsSync(join(dir, "page.tsx"));
  const [head, ...tail] = segments;

  const exact = join(dir, head);
  if (statSafe(exact)?.isDirectory() && pageExistsRecursive(exact, tail)) {
    return true;
  }
  const dynamic = resolveDynamicSegment(dir);
  if (dynamic && pageExistsRecursive(dynamic, tail)) return true;
  return false;
}

function collectTsxFiles(dir: string): string[] {
  const files: string[] = [];
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry);
    const stat = statSafe(full);
    if (!stat) continue;
    if (stat.isDirectory()) {
      if (entry === "node_modules" || entry === ".next") continue;
      files.push(...collectTsxFiles(full));
    } else if (
      /\.(tsx|ts)$/.test(entry) &&
      !/\.test\./.test(entry) &&
      !entry.endsWith(".d.ts")
    ) {
      files.push(full);
    }
  }
  return files;
}

describe("site integrity (declared routes vs physical pages)", () => {
  it("every ROUTES entry resolves to a physical page.tsx", () => {
    const broken = ROUTES.filter((r) => !pageExistsForPath(r.path));
    expect(
      broken.map((r) => r.path),
      "Routes declared in routes.ts without a physical page"
    ).toEqual([]);
  });

  it("every commercial product page resolves (modality × slug)", () => {
    const commercialPaths = COMMERCIAL_PROPERTIES.flatMap((p) => [
      `/para-trabalhar/comprar/${p.slug}/`,
      `/para-trabalhar/alugar/${p.slug}/`,
    ]);
    const broken = commercialPaths.filter((path) => !pageExistsForPath(path));
    expect(broken, "Commercial pages without physical file").toEqual([]);
  });

  it("every literal internal href in src/ resolves to a page", () => {
    const files = collectTsxFiles(join(process.cwd(), "src"));
    const broken: Array<{ file: string; href: string }> = [];
    const literalHref = /href="(\/[^"]*)"/g;
    // href={`/condominios-e-produtos/${slug}/`} — validate the literal prefix.
    const templateHref = /href=\{`([^`]*)`\}/g;

    for (const file of files) {
      const content = readFileSync(file, "utf8");
      for (const match of content.matchAll(literalHref)) {
        const href = match[1];
        const withoutAnchor = href.split("#")[0] || "/";
        if (!pageExistsForPath(withoutAnchor)) {
          broken.push({ file: file.replace(process.cwd() + "/", ""), href });
        }
      }
      for (const match of content.matchAll(templateHref)) {
        const literalPrefix = match[1].split("${")[0] || "/";
        const withoutAnchor = literalPrefix.split("#")[0] || "/";
        if (!pageExistsForPath(withoutAnchor)) {
          broken.push({ file: file.replace(process.cwd() + "/", ""), href: match[1] });
        }
      }
    }

    expect(
      broken,
      "Internal hrefs pointing to pages that do not exist"
    ).toEqual([]);
  });
});