/**
 * Full-page /locations screenshots at the three review widths.
 *   node shot-locations.mjs [origin]
 */
import { chromium } from "playwright";

const origin = process.argv[2] ?? "http://localhost:3000";
const widths = [1440, 768, 375];

const browser = await chromium.launch();

for (const width of widths) {
  const page = await browser.newPage({
    viewport: { width, height: width === 375 ? 812 : 900 },
    deviceScaleFactor: 1,
  });
  page.setDefaultTimeout(60_000);
  await page.goto(`${origin}/locations`, { waitUntil: "networkidle", timeout: 90_000 });
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
  // The two Google Maps embeds load lazily and paint well after networkidle.
  // Without this the plates screenshot as empty bordered boxes.
  await page.waitForTimeout(6000);
  const height = await page.evaluate(() => document.documentElement.scrollHeight);
  const out = `shots/locations-page-${width}.png`;
  await page.screenshot({ path: out, fullPage: true });
  console.log(`${out}  ${width}x${height}`);
  await page.close();
}

await browser.close();
