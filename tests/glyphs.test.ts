import { describe, expect, it } from "vitest";
import { readFileSync, readdirSync, statSync } from "node:fs";
import { join } from "node:path";

const ROOTS = ["app", "components", "lib"];

function walk(dir: string, out: string[] = []): string[] {
  for (const f of readdirSync(dir)) {
    const p = join(dir, f);
    if (statSync(p).isDirectory()) walk(p, out);
    else if (/\.(tsx|ts|css)$/.test(f)) out.push(p);
  }
  return out;
}

const files = ROOTS.flatMap((d) => walk(d));

/** Decorative / navigational glyphs that must not appear in UI source. */
const TEXT_GLYPH =
  /[\u2190-\u21FF\u2192\u2190\u21D2\u21E8\u27A1\u25B6\u25BC\u25B2\u25C0\u00BB\u00AB\u2022\u2023\u2713\u2714\u2605\u2606\u2728]|[\u{1F300}-\u{1FAFF}]/u;

const TYPO_ARROW = /(^|[^a-zA-Z0-9_])(->|→|←|⇒|➜|➤)([^a-zA-Z0-9_]|$)/;

const CSS_DECORATIVE_ICON =
  /data:image\/svg\+xml[^)]*(?:M5[\s.]*8l5\s*5|M5\.5[\s.]*10\.5l3|M4\.5[\s.]*10\.5l4|l3\s*3\s*6-6)/i;

const BANNED_IDENTIFIERS = /\bSparkle\b|className=["']twinkle|\.ticks\b/;

describe("no arrows or decorative text glyphs in UI source", () => {
  it("scans app/, components/ and lib/", () => {
    expect(files.length).toBeGreaterThan(10);
    const hits: string[] = [];
    for (const f of files) {
      const src = readFileSync(f, "utf8");
      if (TEXT_GLYPH.test(src)) hits.push(`${f}: unicode decorative glyph`);
      if (TYPO_ARROW.test(src)) hits.push(`${f}: typographic arrow`);
      if (f.endsWith(".css") && CSS_DECORATIVE_ICON.test(src)) hits.push(`${f}: CSS data-URI chevron/tick/star icon`);
      if (BANNED_IDENTIFIERS.test(src)) hits.push(`${f}: removed decorative icon pattern`);
      if (/<img[^>]+src=["'][^"']*\.svg/i.test(src)) hits.push(`${f}: external SVG image`);
    }
    expect(hits).toEqual([]);
  });
});
