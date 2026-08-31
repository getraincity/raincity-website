/**
 * Full-page /locations/[slug] screenshots at the three review widths.
 *   node shot-location.mjs [slug ...] [--origin http://localhost:3000]
 *
 * Defaults to the three geographically spread communities the template was
 * reviewed on — Anmore up the hill, Vancouver on the coast, Surrey south of
 * the river — because those three exercise every branch the page has: two
 * neighbours versus three, a village zoom versus a city one, and the longest
 * and shortest local copy in the set.
 */
import { chromium } from "playwright";

const args = process.argv.slice(2);
const originFlag = args.indexOf("--origin");
const origin = originFlag === -1 ? "http://localhost:3000" : args[originFlag + 1];
const slugs = args.filter((a, i) => !a.startsWith("--") && i !== originFlag + 1);
const targets = slugs.length ? slugs : ["anmore", "vancouver", "surrey"];
const widths = [1440, 768, 375];

const browser = await chromium.launch();

for (const slug of targets) {
  for (const width of widths) {
    const page = await browser.newPage({
      viewport: { width, height: width === 375 ? 812 : 900 },
      deviceScaleFactor: 1,
    });
    page.setDefaultTimeout(60_000);
    await page.goto(`${origin}/locations/${slug}`, {
      waitUntil: "networkidle",
      timeout: 90_000,
    });
    await page.addStyleTag({
      content: `html{scroll-behavior:auto !important}
                [data-feedback-ui]{display:none !important}`,
    });
    await page.evaluate(async () => {
      const step = Math.round(window.innerHeight * 0.8);
      for (let y = 0; y < document.body.scrollHeight; y += step) {
        window.scrollTo(0, y);
        await new Promise((r) => setTimeout(r, 220));
      }
      window.scrollTo(0, 0);
    });
    await page.waitForFunction(
      () => [...document.images].every((i) => i.complete && i.naturalWidth > 0),
      null,
      { timeout: 60_000 },
    );
    await page.evaluate(() => document.fonts.ready);

    // Tall viewport rather than `fullPage: true`, and this is the one thing
    // in this file worth knowing. Chromium's full-page capture resizes the
    // surface to take the shot, and a Google Maps embed does not survive it —
    // both plates come out as empty bordered boxes. The existing
    // shots/locations-page-*.png have the same hole in them for the same
    // reason, and it was read as the map being slow rather than as the
    // capture mode. Sizing the viewport to the document and taking an
    // ordinary screenshot gives the iframes a stable surface to draw on.
    const height = await page.evaluate(
      () => document.documentElement.scrollHeight,
    );
    await page.setViewportSize({ width, height: Math.min(height, 16000) });
    // Both embeds are `loading="lazy"`; with the whole document in the
    // viewport they start together and want a moment to draw their tiles.
    await page.waitForTimeout(12_000);
    const out = `shots/location-${slug}-${width}.png`;
    await page.screenshot({ path: out });
    console.log(`${out}  ${width}x${height}`);
    await page.close();
  }
}

await browser.close();
