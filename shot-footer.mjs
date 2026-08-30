/**
 * Capture the footer (plus the scroll-to-top button in its shown state) at a
 * given width.  node shot-footer.mjs <outfile> [width]
 */
import { chromium } from "playwright";
import { statSync } from "node:fs";

const out = process.argv[2] ?? "footer.png";
const width = Number(process.argv[3] ?? 1440);
const height = Number(process.argv[4] ?? 900);

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width, height }, deviceScaleFactor: 1 });
await page.goto("http://localhost:3000", { waitUntil: "networkidle", timeout: 90_000 });
await page.addStyleTag({
  content: `html{scroll-behavior:auto !important}[data-feedback-ui]{display:none !important}`,
});
await page.evaluate(async () => {
  const step = Math.round(window.innerHeight * 0.8);
  for (let y = 0; y < document.body.scrollHeight; y += step) {
    window.scrollTo(0, y); await new Promise(r => setTimeout(r, 150));
  }
});
await page.evaluate(() => document.fonts.ready);
await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
await page.waitForTimeout(1200);

// Report what the links and the bar actually measure at this width.
const facts = await page.evaluate(() => {
  const lh = 24; // body-s 15px / 1.6
  const links = [...document.querySelectorAll("footer nav a")].map((a) => ({
    label: a.textContent.trim(),
    lines: Math.round(a.getBoundingClientRect().height / lh) - 1,
  }));
  const f = document.querySelector("footer");
  const bar = f.lastElementChild;
  const b = bar.getBoundingClientRect();
  const btn = document.querySelector('button[aria-label="Scroll back to top"]');
  const br = btn.getBoundingClientRect();
  return {
    wrapped: links.filter((l) => l.lines > 1).map((l) => `${l.label} (${l.lines})`),
    overflow: [...document.querySelectorAll("footer nav a")]
      .filter((a) => a.getBoundingClientRect().right > document.documentElement.clientWidth - 1)
      .map((a) => a.textContent.trim()),
    docOverflow: document.documentElement.scrollWidth > document.documentElement.clientWidth,
    bar: { h: Math.round(b.height), w: Math.round(b.width), bg: getComputedStyle(bar).backgroundColor },
    btn: {
      opacity: getComputedStyle(btn).opacity,
      right: Math.round(innerWidth - br.right),
      bottom: Math.round(innerHeight - br.bottom),
      clearsBar: Math.round(b.top - br.bottom),
    },
  };
});

await page.screenshot({ path: out });
await browser.close();
console.log(`${out}  ${width}x${height}  ${(statSync(out).size / 1024).toFixed(0)} KB`);
console.log(JSON.stringify(facts, null, 2));
