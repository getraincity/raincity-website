/**
 * Full-page /services/[slug] screenshots at the three review widths.
 *
 *   node shot-service.mjs [slug ...] [--origin=http://localhost:3000]
 *
 * With no slugs it shoots the three that stress the template hardest: the
 * longest headline, the longest section H2, and the shortest copy of the
 * eleven.
 */
import { chromium } from "playwright";

const args = process.argv.slice(2);
const originArg = args.find((a) => a.startsWith("--origin="));
const origin = originArg ? originArg.split("=")[1] : "http://localhost:3000";
const slugs = args.filter((a) => !a.startsWith("--"));
const targets = slugs.length
  ? slugs
  : ["commercial-cleaning", "gutter-cleaning", "window-cleaning"];

const widths = [1440, 768, 375];

const browser = await chromium.launch();

for (const slug of targets) {
  for (const width of widths) {
    const page = await browser.newPage({
      viewport: { width, height: width === 375 ? 812 : 900 },
      deviceScaleFactor: 1,
    });
    page.setDefaultTimeout(60_000);
    await page.goto(`${origin}/services/${slug}`, {
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
    await page.waitForTimeout(1200);
    const height = await page.evaluate(
      () => document.documentElement.scrollHeight,
    );
    const out = `service-${slug}-${width}.png`;
    await page.screenshot({ path: out, fullPage: true });
    console.log(`${out}  ${width}x${height}`);
    await page.close();
  }
}

await browser.close();
