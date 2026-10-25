import { readdirSync, readFileSync } from "node:fs";

const dir = process.argv[2] ?? ".lighthouseci";
const files = readdirSync(dir).filter((f) => /^lhr-.*\.json$/.test(f));
const byUrl = new Map();
for (const f of files) {
  const lhr = JSON.parse(readFileSync(`${dir}/${f}`, "utf8"));
  const arr = byUrl.get(lhr.finalDisplayedUrl) ?? [];
  arr.push(lhr);
  byUrl.set(lhr.finalDisplayedUrl, arr);
}
const median = (a) => [...a].sort((x, y) => x - y)[Math.floor(a.length / 2)];
for (const [url, runs] of byUrl) {
  const cat = (k) => Math.round(median(runs.map((r) => r.categories[k].score * 100)));
  const m = (id) => median(runs.map((r) => r.audits[id].numericValue));
  console.log(
    `${url} (median of ${runs.length}, ${runs[0].configSettings.formFactor}) perf=${cat("performance")} a11y=${cat("accessibility")} bp=${cat("best-practices")} seo=${cat("seo")} LCP=${(m("largest-contentful-paint") / 1000).toFixed(2)}s CLS=${m("cumulative-layout-shift").toFixed(3)} TBT=${Math.round(m("total-blocking-time"))}ms`,
  );
  const failed = Object.values(runs[0].audits).filter((a) => a.score !== null && a.score < 1 && a.scoreDisplayMode === "binary" && runs[0].categories.seo.auditRefs.some((r) => r.id === a.id));
  if (failed.length) console.log("  SEO audits not passing:", failed.map((a) => a.id).join(", "));
}
