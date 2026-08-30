/**
 * Capture one section at a given width.
 *   node shot-section.mjs <outfile> [width] [selector] [padTop]
 */
import { chromium } from "playwright";
import { statSync } from "node:fs";

const out = process.argv[2] ?? "section.png";
const width = Number(process.argv[3] ?? 1440);
const selector = process.argv[4] ?? "#about-heading";
const padTop = Number(process.argv[5] ?? 120);

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width, height: 900 }, deviceScaleFactor: 1 });
await page.goto("http://localhost:3000", { waitUntil: "networkidle", timeout: 90_000 });
await page.addStyleTag({
  content: `html{scroll-behavior:auto !important}[data-feedback-ui]{display:none !important}`,
});
await page.evaluate(async () => {
  const step = Math.round(window.innerHeight * 0.8);
  for (let y = 0; y < document.body.scrollHeight; y += step) {
    window.scrollTo(0, y); await new Promise(r => setTimeout(r, 200));
  }
  window.scrollTo(0, 0);
});
await page.waitForFunction(
  () => [...document.images].every(i => i.complete && i.naturalWidth > 0), null, { timeout: 60_000 });
await page.evaluate(() => document.fonts.ready);
await page.waitForTimeout(900);

// Frame the section the heading belongs to, plus some room above it so any
// decorative edge sitting on the boundary is included.
const box = await page.evaluate(({ sel, pad }) => {
  const node = document.querySelector(sel);
  const section = node.closest("section");
  const r = section.getBoundingClientRect();
  return { x: 0, y: Math.max(0, r.top + window.scrollY - pad),
           width: document.documentElement.clientWidth, height: r.height + pad };
}, { sel: selector, pad: padTop });

await page.screenshot({ path: out, clip: box, fullPage: true });
await browser.close();
console.log(`${out}  ${width}px wide  ${Math.round(box.height)}px tall  ${(statSync(out).size/1024).toFixed(0)} KB`);
