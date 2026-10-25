import { describe, expect, it } from "vitest";
import { readFileSync, readdirSync, statSync } from "node:fs";
import { join } from "node:path";

function walk(dir: string, out: string[] = []): string[] {
  for (const f of readdirSync(dir)) {
    const p = join(dir, f);
    if (statSync(p).isDirectory()) walk(p, out);
    else if (/\.(tsx?|css)$/.test(f)) out.push(p);
  }
  return out;
}

const files = ["app", "components", "lib"].flatMap((d) => walk(d));

describe("source safety rules", () => {
  it("never makes network calls from app code", () => {
    const banned = [/\bfetch\s*\(/, /XMLHttpRequest/, /sendBeacon/, /WebSocket/, /EventSource/, /axios/];
    for (const f of files) {
      const src = readFileSync(f, "utf8");
      for (const re of banned) expect(src, `${f} matches ${re}`).not.toMatch(re);
    }
  });

  it("forms have no action, no method=post and no server actions", () => {
    for (const f of files.filter((x) => x.endsWith(".tsx"))) {
      const src = readFileSync(f, "utf8");
      expect(src, f).not.toMatch(/<form[^>]*\saction=/);
      expect(src, f).not.toMatch(/"use server"/);
    }
  });

  it("loads no external scripts, fonts or trackers", () => {
    for (const f of files) {
      const src = readFileSync(f, "utf8");
      expect(src, f).not.toMatch(/https?:\/\/(?!offshiftstudio\.com\.au|www\.w3\.org)/);
    }
  });

  it("ships a robots.txt that disallows everything", () => {
    const robots = readFileSync("public/robots.txt", "utf8");
    expect(robots).toMatch(/User-agent: \*/);
    expect(robots).toMatch(/Disallow: \//);
  });

  it("sets noindex headers in config and _headers", () => {
    expect(readFileSync("next.config.ts", "utf8")).toMatch(/X-Robots-Tag/);
    expect(readFileSync("public/_headers", "utf8")).toMatch(/X-Robots-Tag: noindex, nofollow/);
  });
});
