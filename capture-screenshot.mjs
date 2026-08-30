/**
 * Full-page desktop screenshot of the homepage.
 *   node capture-screenshot.mjs [url]
 * Defaults to the local dev server.
 */
import { chromium } from "playwright";
import { statSync } from "node:fs";
import { resolve } from "node:path";

const url = process.argv[2] ?? "http://localhost:3000";
const out = "homepage-desktop-full.png";

const browser = await chromium.launch();
const page = await browser.newPage({
  viewport: { width: 1440, height: 900 },
  deviceScaleFactor: 1,
});
page.setDefaultTimeout(60_000);

console.log(`→ ${url}`);
await page.goto(url, { waitUntil: "networkidle", timeout: 90_000 });

// globals.css sets scroll-behavior: smooth, which would make the priming pass
// below lag behind the loop. Also drop the review-mode widget, which is
// tooling rather than design.
await page.addStyleTag({
  content: `html{scroll-behavior:auto !important}
            [data-feedback-ui]{display:none !important}`,
});

// next/image lazy-loads everything below the fold, so a plain wait never
// triggers it. Step the whole document past the viewport to prime each one.
await page.evaluate(async () => {
  const step = Math.round(window.innerHeight * 0.8);
  for (let y = 0; y < document.body.scrollHeight; y += step) {
    window.scrollTo(0, y);
    await new Promise((r) => setTimeout(r, 220));
  }
  window.scrollTo(0, 0);
});

// Every image decoded, every webfont resolved.
await page.waitForFunction(
  () => {
    const imgs = [...document.images];
    return imgs.length > 0 && imgs.every((i) => i.complete && i.naturalWidth > 0);
  },
  null,
  { timeout: 60_000 },
);
await page.evaluate(() => document.fonts.ready);
await page.waitForTimeout(1500);

const shot = await page.evaluate(() => ({
  images: document.images.length,
  height: document.documentElement.scrollHeight,
}));

await page.screenshot({ path: out, fullPage: true });
await browser.close();

const { size } = statSync(out);
console.log(`images loaded : ${shot.images}`);
console.log(`page height   : ${shot.height}px`);
console.log(`saved         : ${resolve(out)}`);
console.log(`size          : ${size.toLocaleString()} bytes (${(size / 1024 / 1024).toFixed(2)} MB)`);
