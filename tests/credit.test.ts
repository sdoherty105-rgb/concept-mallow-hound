import { createHash } from "node:crypto";
import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";
import { STUDIO_HOME_URL, STUDIO_WORDMARK } from "@/lib/data";

// SHA-256 of public/brand/offshift-wordmark-light.svg in sdoherty105-rgb/offshift-studio.
// The credit must use that file unaltered. Never redraw or recolour it.
const CANONICAL_LIGHT_WORDMARK_SHA256 = "2aeb99ff7e3dd000eefd861a936a05be5fc526b510781102cf7426e95cb115ca";

describe("OFF/SHIFT footer credit", () => {
  it("links to the studio home page with rel noopener", () => {
    expect(STUDIO_HOME_URL).toBe("https://offshiftstudio.com.au");
    const footer = readFileSync("components/SiteFooter.tsx", "utf8");
    expect(footer).toMatch(/href=\{STUDIO_HOME_URL\}\s+rel="noopener"/);
    expect(footer).toMatch(/alt="OFF\/SHIFT Studio"/);
    expect(footer).toMatch(/Designed by/);
  });

  it("serves the canonical wordmark file byte for byte", () => {
    expect(STUDIO_WORDMARK).toBe("/brand/offshift-wordmark-light.svg");
    const bytes = readFileSync("public" + STUDIO_WORDMARK);
    expect(createHash("sha256").update(bytes).digest("hex")).toBe(CANONICAL_LIGHT_WORDMARK_SHA256);
  });
});
