import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import { contrast } from "@/lib/contrast";

const css = readFileSync("app/globals.css", "utf8");
const token = (name: string) => {
  const match = css.match(new RegExp(`--${name}:\\s*(#[0-9a-fA-F]{6})`));
  if (!match) throw new Error(`token ${name} missing`);
  return match[1];
};

const t = {
  paper: token("paper"),
  cobalt: token("cobalt"),
  butter: token("butter"),
  mint: token("mint"),
  tangerine: token("tangerine"),
  grape: token("grape"),
  white: token("white"),
};

const AA_TEXT = 4.5;
const AA_LARGE = 3;

describe("palette tokens match the brief", () => {
  it("uses the route colours", () => {
    expect(t.paper.toLowerCase()).toBe("#fff9ee");
    expect(t.cobalt.toLowerCase()).toBe("#2a3df0");
    expect(t.butter.toLowerCase()).toBe("#ffd84d");
    expect(t.mint.toLowerCase()).toBe("#7de0b5");
    expect(t.tangerine.toLowerCase()).toBe("#ff6a2b");
    expect(t.grape.toLowerCase()).toBe("#3b1c6b");
  });
});

describe("WCAG AA text contrast for every pairing used", () => {
  const pairs: [string, string, string][] = [
    ["grape on paper", t.grape, t.paper],
    ["grape on butter", t.grape, t.butter],
    ["grape on mint", t.grape, t.mint],
    ["grape on white", t.grape, t.white],
    ["white on cobalt", t.white, t.cobalt],
    ["paper on cobalt", t.paper, t.cobalt],
    ["butter on cobalt", t.butter, t.cobalt],
    ["white on grape", t.white, t.grape],
    ["paper on grape", t.paper, t.grape],
    ["butter on grape", t.butter, t.grape],
    ["mint on grape", t.mint, t.grape],
  ];
  it.each(pairs)("%s", (_name, fg, bg) => {
    expect(contrast(fg, bg)).toBeGreaterThanOrEqual(AA_TEXT);
  });

  it("keeps grape on tangerine for large display only", () => {
    expect(contrast(t.grape, t.tangerine)).toBeGreaterThanOrEqual(AA_LARGE);
    expect(css).not.toMatch(/(^|[^-])color:\s*var\(--tangerine\)/);
  });
});

describe("non-text contrast (3:1) for UI boundaries", () => {
  it("grape against paper, butter and mint", () => {
    for (const bg of [t.paper, t.butter, t.mint]) {
      expect(contrast(t.grape, bg)).toBeGreaterThanOrEqual(3);
    }
  });
});
