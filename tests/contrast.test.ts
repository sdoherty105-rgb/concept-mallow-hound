import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import { contrast } from "@/lib/contrast";

const css = readFileSync("app/globals.css", "utf8");
const token = (name: string) => {
  const m = css.match(new RegExp(`--${name}:\\s*(#[0-9a-fA-F]{6})`));
  if (!m) throw new Error(`token ${name} missing`);
  return m[1];
};

const t = {
  cream: token("cream"),
  lav: token("lav"),
  ink: token("ink"),
  coral: token("coral"),
  mint: token("mint"),
  inkSoft: token("ink-soft"),
  coralDeep: token("coral-deep"),
  lavSoft: token("lav-soft"),
  mintSoft: token("mint-soft"),
  coralSoft: token("coral-soft"),
  paper: token("paper"),
};

const AA_TEXT = 4.5;

describe("palette tokens match the brief", () => {
  it("uses the specified brand colours", () => {
    expect(t.cream.toLowerCase()).toBe("#fff7eb");
    expect(t.lav.toLowerCase()).toBe("#c9b6e4");
    expect(t.ink.toLowerCase()).toBe("#34303b");
    expect(t.coral.toLowerCase()).toBe("#ed917a");
    expect(t.mint.toLowerCase()).toBe("#c0dcc8");
  });
});

describe("WCAG AA text contrast for every pairing used", () => {
  const pairs: [string, string, string][] = [
    ["ink on cream", t.ink, t.cream],
    ["ink on lavender", t.ink, t.lav],
    ["ink on mint", t.ink, t.mint],
    ["ink on coral (buttons)", t.ink, t.coral],
    ["ink on paper", t.ink, t.paper],
    ["ink on lav-soft", t.ink, t.lavSoft],
    ["ink on mint-soft", t.ink, t.mintSoft],
    ["ink on coral-soft", t.ink, t.coralSoft],
    ["ink-soft on cream", t.inkSoft, t.cream],
    ["ink-soft on paper", t.inkSoft, t.paper],
    ["ink-soft on mint-soft", t.inkSoft, t.mintSoft],
    ["ink-soft on coral-soft", t.inkSoft, t.coralSoft],
    ["ink-soft on lav-soft", t.inkSoft, t.lavSoft],
    ["coral-deep (errors) on cream", t.coralDeep, t.cream],
    ["coral-deep (errors) on white", t.coralDeep, "#ffffff"],
    ["coral-deep (errors) on paper", t.coralDeep, t.paper],
    ["cream on ink (banner, footer, ink buttons)", t.cream, t.ink],
    ["lavender on ink (footer headings)", t.lav, t.ink],
    ["footer blurb on ink", "#e4dcec", t.ink],
    ["footer small on ink", "#d6cde0", t.ink],
  ];
  it.each(pairs)("%s", (_name, fg, bg) => {
    expect(contrast(fg, bg)).toBeGreaterThanOrEqual(AA_TEXT);
  });
});

describe("non-text contrast (3:1) for UI boundaries", () => {
  it("ink outline against cream, lavender and mint", () => {
    for (const bg of [t.cream, t.lav, t.mint, t.coral]) {
      expect(contrast(t.ink, bg)).toBeGreaterThanOrEqual(3);
    }
  });
});
