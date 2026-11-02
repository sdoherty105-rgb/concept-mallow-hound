import { expect, test } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

const PAGES = [
  { path: "/", h1: /The groom\s*comes to you\./i },
  { path: "/packages", h1: /The full menu/ },
];
const LABEL = "An OFF/SHIFT concept — fictional demonstration";
const LABEL_URL = "https://offshiftstudio.com.au/concepts/mallow-hound";

for (const p of PAGES) {
  test.describe(`page ${p.path}`, () => {
    test("renders with a single h1 and landmarks", async ({ page }) => {
      const res = await page.goto(p.path);
      expect(res?.status()).toBe(200);
      await expect(page.locator("h1")).toHaveCount(1);
      await expect(page.locator("h1")).toContainText(p.h1);
      await expect(page.locator("body > header")).toHaveCount(1);
      await expect(page.locator("body > main")).toHaveCount(1);
      await expect(page.locator("body > footer")).toHaveCount(1);
    });

    test("shows the concept label linking to OFF/SHIFT", async ({ page }) => {
      await page.goto(p.path);
      const link = page.getByRole("link", { name: new RegExp(LABEL) }).first();
      await expect(link).toBeVisible();
      await expect(link).toHaveAttribute("href", LABEL_URL);
    });

    test("is noindex by meta tag and by header", async ({ page }) => {
      const res = await page.goto(p.path);
      expect(res?.headers()["x-robots-tag"]).toMatch(/noindex/);
      const robots = await page.locator('meta[name="robots"]').getAttribute("content");
      expect(robots).toMatch(/noindex/);
      expect(robots).toMatch(/nofollow/);
    });

    test("has no serious or critical axe violations", async ({ page }) => {
      await page.goto(p.path);
      await page.waitForLoadState("networkidle");
      const results = await new AxeBuilder({ page }).withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "wcag22aa"]).analyze();
      const bad = results.violations.filter((v) => v.impact === "serious" || v.impact === "critical");
      expect(bad.map((v) => `${v.id}: ${v.nodes.map((n) => n.target.join(" ")).join(" | ")}`)).toEqual([]);
    });

    test("works without JavaScript", async ({ browser }) => {
      const ctx = await browser.newContext({ javaScriptEnabled: false });
      const page = await ctx.newPage();
      await page.goto(p.path);
      await expect(page.locator("h1")).toContainText(p.h1);
      await expect(page.getByText(LABEL).first()).toBeVisible();
      await ctx.close();
    });
  });
}

test("robots.txt disallows everything", async ({ request }) => {
  const res = await request.get("/robots.txt");
  expect(res.status()).toBe(200);
  const body = await res.text();
  expect(body).toMatch(/User-agent: \*/);
  expect(body).toMatch(/Disallow: \//);
  expect(res.headers()["x-robots-tag"]).toMatch(/noindex/);
});

test("unknown routes show a friendly 404 that is also labelled and noindex", async ({ page }) => {
  const res = await page.goto("/definitely-not-here");
  expect(res?.status()).toBe(404);
  await expect(page.getByText(LABEL).first()).toBeVisible();
  expect(res?.headers()["x-robots-tag"]).toMatch(/noindex/);
});

test("home has every requested section", async ({ page }) => {
  await page.goto("/");
  for (const id of ["area", "how", "coat", "packages", "booking", "faq"]) {
    await expect(page.locator(`section#${id}`)).toHaveCount(1);
  }
  await expect(page.locator("footer")).toBeVisible();
});

test("coat selector updates package, time and price", async ({ page }) => {
  await page.goto("/");
  const result = page.locator(".result");
  await expect(result).toContainText("The Full Mallow");
  await expect(result).toContainText("$139");
  await page.getByLabel(/Double & fluffy/).click({ force: true });
  await expect(page.getByLabel(/Double & fluffy/)).toBeChecked();
  await page.getByLabel(/Giant/).click({ force: true });
  await expect(page.getByLabel(/^Giant/)).toBeChecked();
  await expect(result).toContainText("Shed Less");
  await expect(result).toContainText("$204");
  await expect(result).toContainText("3 hr 15 min");
  await page.getByLabel(/Short & smooth/).click({ force: true });
  await expect(page.getByLabel(/Short & smooth/)).toBeChecked();
  await page.getByLabel(/^Small/).click({ force: true });
  await expect(page.getByLabel(/^Small/)).toBeChecked();
  await expect(result).toContainText("Fresh Start");
  await expect(result).toContainText("$79");
});

test("coat selector radios are keyboard focusable", async ({ page, isMobile }) => {
  test.skip(!!isMobile, "keyboard flow is desktop only");
  await page.goto("/");
  const short = page.locator('input[name="coat"][value="short"]');
  await short.focus();
  await expect(short).toBeFocused();
  await page.keyboard.press("Space");
  await expect(short).toBeChecked();
  await expect(page.locator(".result")).toContainText("Fresh Start");
});

test("service area check answers for covered, outer and unknown suburbs", async ({ page }) => {
  await page.goto("/");
  const input = page.getByLabel("Your suburb");
  const out = page.locator(".check__out");
  await input.fill("Mallow Bay");
  await expect(out).toContainText("Yes, we come to Mallow Bay");
  await expect(out).toContainText("no travel fee");
  await input.fill("Pelican Hill");
  await expect(out).toContainText("$15 travel fee");
  await input.fill("Narnia");
  await expect(out).toContainText("don’t reach");
});

test("selector choices prefill the booking form", async ({ page }) => {
  await page.goto("/");
  await page.getByLabel(/Long & silky/).click({ force: true });
  await expect(page.getByLabel(/Long & silky/)).toBeChecked();
  await page.getByLabel(/^Large/).click({ force: true });
  await expect(page.getByLabel(/^Large/)).toBeChecked();
  await page.getByRole("link", { name: "Book this groom" }).click();
  await expect(page.locator('select[name="coat"]')).toHaveValue("long");
  await expect(page.locator('select[name="size"]')).toHaveValue("large");
  await expect(page.locator('select[name="packageId"]')).toHaveValue("full-mallow");
});

test("FAQ items expand", async ({ page }) => {
  await page.goto("/");
  const first = page.locator(".faq__item").first();
  await first.locator("summary").click();
  await expect(first).toHaveAttribute("open", "");
});

test.describe("demo booking form", () => {
  test("validates on the client and shows errors without any network request", async ({ page }) => {
    await page.goto("/");
    await page.waitForLoadState("networkidle");
    const requests: string[] = [];
    page.on("request", (r) => requests.push(`${r.method()} ${r.url()}`));
    await page.getByRole("button", { name: /Request a groom/ }).click();
    await expect(page.locator(".error-summary")).toContainText("Please tell us your name");
    expect(requests).toEqual([]);
  });

  test("valid submission shows a demo success state and never touches the network", async ({ page }) => {
    await page.goto("/");
    await page.waitForLoadState("networkidle");
    const requests: string[] = [];
    page.on("request", (r) => requests.push(`${r.method()} ${r.url()}`));
    let navigations = 0;
    page.on("framenavigated", () => navigations++);

    await page.getByLabel("Your name").fill("Sam Example");
    await page.getByRole("textbox", { name: "Mobile", exact: true }).fill("0400 000 000");
    await page.getByLabel("Email", { exact: true }).fill("sam@example.com");
    await page.getByLabel("Suburb", { exact: true }).selectOption("Mallow Bay");
    await page.getByLabel("Dog’s name").fill("Biscuit");
    await page.getByLabel("Coat type").selectOption("curly");
    await page.getByLabel("Size", { exact: true }).selectOption("small");
    await page.getByLabel("Preferred day").fill("2099-01-15");
    await page.getByLabel(/I understand this is a fictional demo/).check();
    await page.getByRole("button", { name: /Request a groom/ }).click();

    const success = page.locator(".success");
    await expect(success).toBeVisible();
    await expect(success).toContainText("Demo only");
    await expect(success).toContainText("Nothing was sent, saved or stored");
    await expect(success).toContainText("Biscuit");
    await page.waitForTimeout(500);
    expect(requests).toEqual([]);
    expect(navigations).toBe(0);
    expect(page.url()).not.toContain("?");
  });

  test("form element has no action attribute or endpoint", async ({ page }) => {
    await page.goto("/");
    const forms = await page.locator("form").evaluateAll((els) => els.map((f) => ({ action: f.getAttribute("action"), method: f.getAttribute("method") })));
    for (const f of forms) {
      expect(f.action).toBeNull();
      expect(f.method).toBeNull();
    }
  });
});

test("no third-party requests are made on load", async ({ page }) => {
  const external: string[] = [];
  page.on("request", (r) => {
    const u = new URL(r.url());
    if (u.hostname !== "localhost") external.push(r.url());
  });
  await page.goto("/");
  await page.goto("/packages");
  await page.waitForLoadState("networkidle");
  expect(external).toEqual([]);
});

test("reduced motion parks a static van instead of travelling", async ({ browser }) => {
  const ctx = await browser.newContext({ reducedMotion: "reduce" });
  const page = await ctx.newPage();
  await page.goto("/");
  const name = await page.locator(".route-van").evaluate((el) => getComputedStyle(el).animationName);
  expect(name).toBe("none");
  await expect(page.locator(".stop-van").first()).toBeVisible();
  const hero = await page.locator(".hero-van").evaluate((el) => getComputedStyle(el).animationName);
  expect(hero).toBe("none");
  await ctx.close();
});

