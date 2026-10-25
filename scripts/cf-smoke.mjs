import { spawn } from "node:child_process";
import { setTimeout as sleep } from "node:timers/promises";

const port = process.env.CF_PORT ?? "8799";
const base = `http://127.0.0.1:${port}`;

const child = spawn("npx", ["wrangler", "dev", "--port", port, "--ip", "127.0.0.1"], {
  cwd: process.cwd(),
  stdio: "ignore",
  env: process.env,
});

async function waitReady() {
  const deadline = Date.now() + 60_000;
  while (Date.now() < deadline) {
    try {
      const res = await fetch(base + "/");
      if (res.ok) return;
    } catch {
      /* not up yet */
    }
    await sleep(500);
  }
  throw new Error("wrangler dev did not respond on " + base + " within 60s");
}

try {
  await waitReady();
  for (const path of ["/", "/packages", "/robots.txt"]) {
    const res = await fetch(base + path);
    if (!res.ok) throw new Error(`${path} returned ${res.status}`);
    const robots = res.headers.get("x-robots-tag") ?? "";
    if (!/noindex/i.test(robots)) throw new Error(`${path} missing X-Robots-Tag noindex (${robots})`);
    if (path === "/robots.txt") {
      const body = await res.text();
      if (!/Disallow:\s*\//.test(body)) throw new Error("robots.txt does not disallow /");
    }
  }
  console.log("cf-smoke: OK (home, packages, robots.txt; X-Robots-Tag noindex)");
} finally {
  child.kill("SIGTERM");
  await sleep(500);
}
