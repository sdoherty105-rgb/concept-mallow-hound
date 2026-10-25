import { chromium } from "@playwright/test";
import { mkdirSync } from "node:fs";

const base = process.env.BASE_URL ?? "http://localhost:3100";
const out = process.env.OUT_DIR ?? "docs/screens";
mkdirSync(out, { recursive: true });

const widths = [
  { w: 390, h: 844, name: "390" },
  { w: 768, h: 1024, name: "768" },
  { w: 1440, h: 900, name: "1440" },
];
const pages = [
  { path: "/", name: "home" },
  { path: "/packages", name: "packages" },
];

const browser = await chromium.launch(process.env.CHROME_PATH ? { executablePath: process.env.CHROME_PATH } : {});
for (const vp of widths) {
  const ctx = await browser.newContext({
    viewport: { width: vp.w, height: vp.h },
    deviceScaleFactor: vp.w < 500 ? 2 : 1,
    reducedMotion: "reduce",
  });
  const page = await ctx.newPage();
  for (const p of pages) {
    await page.goto(base + p.path, { waitUntil: "networkidle" });
    await page.waitForTimeout(400);
    await page.screenshot({ path: `${out}/${p.name}-${vp.name}.png`, fullPage: true });
    console.log("saved", p.name, vp.name);
  }
  await ctx.close();
}
await browser.close();
