/**
 * Capture one service-page section at the three review widths.
 *
 *   node shot-part.mjs <slug> <selector> <label> [outDir]
 *
 * Wraps the same load/settle sequence shot-service.mjs uses, but screenshots
 * the section element rather than the full page, so a single part can be
 * reviewed on its own while the rest of the template is still being worked.
 */
import { chromium } from "playwright";
import path from "node:path";

const [slug, selector, label, outDir = "."] = process.argv.slice(2);
const widths = [1440, 768, 375];

const browser = await chromium.launch();

for (const width of widths) {
  const page = await browser.newPage({
    viewport: { width, height: width === 375 ? 812 : 900 },
    deviceScaleFactor: 1,
  });
  page.setDefaultTimeout(60_000);
  await page.goto(`http://localhost:3000/services/${slug}`, {
    waitUntil: "networkidle",
    timeout: 90_000,
  });
  await page.addStyleTag({
    content: `html{scroll-behavior:auto !important}
              [data-feedback-ui]{display:none !important}
              header{visibility:hidden !important}`,
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
  await page.waitForTimeout(1200);

  const el = page.locator(selector).locator("xpath=ancestor-or-self::section[1]");
  const out = path.join(outDir, `${label}-${width}.png`);
  await el.screenshot({ path: out });
  const box = await el.boundingBox();
  console.log(`${out}  ${Math.round(box.width)}x${Math.round(box.height)}`);
  await page.close();
}

await browser.close();
