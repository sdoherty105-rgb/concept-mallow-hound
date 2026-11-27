import { expect, test } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

const PAGES = [
  { path: "/", h1: /The groom\s*comes to you\./i },
  { path: "/packages", h1: /The full menu/ },
];
const DISCLOSURE = "Fictional business. A concept site by OFF/SHIFT Studio.";
const LABEL = DISCLOSURE;
const LABEL_URL = "https://offshiftstudio.com.au/concepts/mallow-hound";
const CTA_URL = "https://offshiftstudio.com.au/?concept=mallow-hound#contact";
const BANNER_CTA = "Want a site like this?";

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

    test("discloses the fictional business and links back to OFF/SHIFT", async ({ page, isMobile }) => {
      await page.goto(p.path);
      const strip = page.getByRole("complementary", { name: "About this concept site" });
      await expect(strip).toContainText(DISCLOSURE);
      const footer = page.locator("body > footer");
      if (isMobile) {
        const box = await strip.boundingBox();
        expect(box?.height ?? 999).toBeLessThanOrEqual(76);
        await expect(strip.getByRole("link", { name: "OFF/SHIFT Studio" })).toHaveAttribute("href", LABEL_URL);
        const bannerCta = strip.getByRole("link", { name: BANNER_CTA });
        await expect(bannerCta).toBeVisible();
        await expect(bannerCta).toHaveAttribute("href", CTA_URL);
        await expect(strip).not.toContainText("…");
        await expect(footer.getByRole("link", { name: "Back to the concept" })).toBeVisible();
      } else {
        await expect(strip.locator(".road-sign__disclosure--wide")).toContainText(DISCLOSURE);
        const back = strip.getByRole("link", { name: "Back to the concept" });
        await expect(back).toBeVisible();
        await expect(back).toHaveAttribute("href", LABEL_URL);
        const cta = strip.getByRole("link", { name: "Want a website like this?" });
        await expect(cta).toBeVisible();
        await expect(cta).toHaveAttribute("href", CTA_URL);
        await expect(cta).not.toHaveAttribute("target", /.+/);
      }
      await expect(footer.getByRole("link", { name: "Back to the concept" })).toHaveAttribute("href", LABEL_URL);
      await expect(footer.getByRole("link", { name: "Want a website like this?" })).toHaveAttribute("href", CTA_URL);
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

    test("works without JavaScript", async ({ browser, isMobile }) => {
      const ctx = await browser.newContext({
        javaScriptEnabled: false,
        viewport: isMobile ? { width: 390, height: 844 } : { width: 1440, height: 900 },
      });
      const page = await ctx.newPage();
      await page.goto(p.path);
      await expect(page.locator("h1")).toContainText(p.h1);
      const strip = page.getByRole("complementary", { name: "About this concept site" });
      await expect(strip).toContainText(DISCLOSURE);
      if (isMobile) {
        await expect(strip.locator(".road-sign__disclosure--narrow")).toBeVisible();
        await expect(strip.getByText(/Fictional concept by OFF\/SHIFT Studio/)).toBeVisible();
      } else {
        await expect(strip.locator(".road-sign__disclosure--wide")).toBeVisible();
        await expect(strip.locator(".road-sign__disclosure--wide")).toContainText(LABEL);
      }
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

test("unknown routes show a friendly 404 that is also labelled and noindex", async ({ page, isMobile }) => {
  const res = await page.goto("/definitely-not-here");
  expect(res?.status()).toBe(404);
  const strip = page.getByRole("complementary", { name: "About this concept site" });
  await expect(strip).toContainText(DISCLOSURE);
  if (isMobile) {
    await expect(strip.locator(".road-sign__disclosure--narrow")).toBeVisible();
    await expect(strip.getByText(/Fictional concept by OFF\/SHIFT Studio/)).toBeVisible();
  } else {
    await expect(strip.locator(".road-sign__disclosure--wide")).toBeVisible();
    await expect(strip.locator(".road-sign__disclosure--wide")).toContainText(LABEL);
  }
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

test("mobile banner shows full studio CTA without ellipsis from 360 to 430 wide", async ({ browser, isMobile }) => {
  test.skip(!isMobile, "phone widths only");
  for (const width of [360, 390, 430]) {
    const ctx = await browser.newContext({ viewport: { width, height: 844 } });
    const page = await ctx.newPage();
    await page.goto("/");
    const strip = page.getByRole("complementary", { name: "About this concept site" });
    const cta = strip.getByRole("link", { name: BANNER_CTA });
    await expect(cta).toBeVisible();
    await expect(strip).not.toContainText("…");
    await expect(cta).toHaveText(BANNER_CTA);
    await ctx.close();
  }
});

test("hero suburb field has a visible check control", async ({ page }) => {
  await page.goto("/");
  const check = page.getByRole("button", { name: "Check" });
  await expect(check).toBeVisible();
  const box = await check.boundingBox();
  expect(box?.height ?? 0).toBeGreaterThanOrEqual(44);
  expect(box?.width ?? 0).toBeGreaterThanOrEqual(44);
});

test("service area check answers for covered, outer and unknown suburbs", async ({ page }) => {
  await page.goto("/");
  const input = page.getByLabel("Your suburb");
  const out = page.locator(".check__out");
  await input.fill("Mallow Bay");
  await expect(out).toContainText("Yes, we come to Mallow Bay");
  await expect(page.locator(".van-panel")).toHaveText("Mallow Bay");
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

test("a chosen package changes the estimate and Sundays cannot be booked", async ({ page }) => {
  await page.goto("/");
  await page.waitForLoadState("networkidle");
  await page.getByLabel("Coat type").selectOption("curly");
  await page.getByRole("combobox", { name: "Size", exact: true }).selectOption("large");
  await expect(page.locator(".booking__estimate")).toContainText("The Full Mallow (recommended), $164");
  await page.getByLabel("Package").selectOption("puppy-debut");
  await expect(page.locator(".booking__estimate")).toContainText("Puppy Debut, $59");
  const days = page.locator('input[name="date"]');
  await expect(days).toHaveCount(7);
  await expect(page.locator(".day--rest input")).toBeDisabled();
  await page.getByRole("button", { name: /Request a groom/ }).click();
  await page.getByRole("button", { name: "Pick the day you’d like." }).click();
  await expect(page.locator('input[name="date"]:not(:disabled)').first()).toBeFocused();
});

test("phones get a single-row stop bar that never covers the footer links", async ({ page, isMobile }) => {
  test.skip(!isMobile, "mobile only");
  await page.goto("/");
  const bar = page.getByRole("navigation", { name: "Quick stops" });
  await expect(bar.getByRole("link")).toHaveText(["Suburb", "Price", "Menu", "Book"]);
  const box = await bar.boundingBox();
  expect(box!.height).toBeLessThan(72);
  await page.evaluate(() => window.scrollTo(0, document.documentElement.scrollHeight));
  const cta = page.locator("body > footer").getByRole("link", { name: "Want a website like this?" });
  const ctaBox = await cta.boundingBox();
  expect(ctaBox!.y + ctaBox!.height).toBeLessThanOrEqual(box!.y);
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
    await page.getByRole("textbox", { name: "Email", exact: true }).fill("sam@example.com");
    await page.getByRole("combobox", { name: "Suburb", exact: true }).selectOption("Pelican Hill");
    await page.getByLabel("Dog’s name").fill("Biscuit");
    await page.getByLabel("Coat type").selectOption("curly");
    await page.getByRole("combobox", { name: "Size", exact: true }).selectOption("small");
    await expect(page.locator(".booking__estimate")).toContainText("$119 + $15 outer-zone travel = $134");
    await page.locator('input[name="date"]:not(:disabled)').first().check({ force: true });
    await page.getByLabel(/I understand this is a fictional demo/).check();
    await page.getByRole("button", { name: /Request a groom/ }).click();

    const success = page.locator(".success");
    await expect(success).toBeVisible();
    await expect(success).toContainText("Demo only");
    await expect(success).toContainText("Nothing was sent, saved or stored");
    await expect(success).toContainText("Biscuit");
    await expect(success).toContainText("$134 incl. $15 travel");
    await expect(success).not.toContainText(/\d{4}-\d{2}-\d{2}/);
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

test("booking form marks exactly the required fields, visibly and with required semantics (M1)", async ({ page }) => {
  await page.goto("/");
  const form = page.locator("form.booking");
  const required = [
    ["Your name", "ownerName"],
    ["Mobile", "mobile"],
    ["Email", "email"],
    ["Suburb", "suburb"],
    ["Dog’s name", "dogName"],
    ["Coat type", "coat"],
    ["Size", "size"],
  ];
  for (const [label, name] of required) {
    const control = form.locator(`[name="${name}"]`);
    await expect(control, label).toHaveAttribute("aria-required", "true");
    // The visible marker is on the control's own label; the accessible name stays the plain label.
    const id = await control.getAttribute("id");
    await expect(form.locator(`label[for="${id}"]`)).toHaveText(`${label} (required)`);
    await expect(control).toHaveAccessibleName(label);
  }
  await expect(form.locator(".field__req")).toHaveCount(9);
  // The day picker and the demo tick are required by validation too: native `required`
  // (the form is noValidate, so the browser adds no popups) plus the same visible marker.
  const days = form.locator('input[name="date"]');
  expect(await days.count()).toBeGreaterThan(0);
  for (const day of await days.all()) await expect(day).toHaveAttribute("required", "");
  await expect(form.locator("fieldset.days-set legend")).toHaveText("Pick a day (required)");
  await expect(form.getByRole("group", { name: "Pick a day", exact: true })).toBeVisible();
  const demo = form.locator('input[name="demoOk"]');
  await expect(demo).toHaveAttribute("required", "");
  await expect(demo).toHaveAccessibleName("I understand this is a fictional demo and nothing will be sent.");
  await expect(form.locator('label.check-line:has(input[name="demoOk"])')).toContainText("(required)");
  for (const name of ["packageId", "notes", "anxious", "window"]) {
    await expect(form.locator(`[name="${name}"][aria-required]`), name).toHaveCount(0);
    await expect(form.locator(`[name="${name}"][required]`), name).toHaveCount(0);
  }
});

test("price ledger fits on a phone without horizontal scrolling", async ({ browser }) => {
  const ctx = await browser.newContext({ viewport: { width: 390, height: 844 } });
  const page = await ctx.newPage();
  await page.goto("/packages");
  await expect(page.locator(".ledger-cards")).toBeVisible();
  await expect(page.locator(".ledger-table")).toBeHidden();
  await expect(page.locator(".ledger-card__size strong")).toHaveCount(20);
  const scrollW = await page.evaluate(() => document.documentElement.scrollWidth);
  const clientW = await page.evaluate(() => document.documentElement.clientWidth);
  expect(scrollW).toBeLessThanOrEqual(clientW + 1);
  await ctx.close();
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

test("footer credits OFF/SHIFT Studio with the canonical wordmark", async ({ page }) => {
  await page.goto("/");
  const credit = page.locator("body > footer [data-footer-credit]");
  await expect(credit).toContainText("Designed by");
  const link = credit.getByRole("link", { name: "OFF/SHIFT Studio" });
  await expect(link).toHaveAttribute("href", "https://offshiftstudio.com.au");
  await expect(link).toHaveAttribute("rel", /noopener/);
  const img = link.locator("img");
  await expect(img).toHaveAttribute("src", "/brand/offshift-wordmark-light.svg");
  const box = await img.boundingBox();
  expect(box?.width ?? 0).toBeGreaterThanOrEqual(72);
  expect(box?.width ?? 999).toBeLessThanOrEqual(96);
});
