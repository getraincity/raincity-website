/**
 * Full-page desktop (1440x900) captures of the review pages.
 * Same setup as shot-about.mjs / shot-services.mjs, narrowed to one width
 * and writing the review filenames requested for the desktop pass.
 *
 *   node shot-desktop-full.mjs [origin] [--only=<substring>]
 *
 * `--only` filters the target list by path, so a single page can be
 * recaptured without rewriting the other two.
 */
import { chromium } from "playwright";

const args = process.argv.slice(2);
const origin = args.find((a) => !a.startsWith("--")) ?? "http://localhost:3000";
const onlyArg = args.find((a) => a.startsWith("--only="));
const only = onlyArg ? onlyArg.slice("--only=".length) : null;

const allTargets = [
  { path: "/about", out: "about-desktop-full.png" },
  { path: "/services", out: "services-desktop-full.png" },
  // The service-page template, captured on the pilot service. One slug is
  // enough here: the other ten are the same template with different copy,
  // and shot-service.mjs is the script that walks a set of them.
  {
    path: "/services/window-cleaning",
    out: "window-cleaning-desktop-full.png",
  },
];

const targets = only
  ? allTargets.filter((t) => t.path.includes(only))
  : allTargets;

if (!targets.length) {
  console.error(`No target matches --only=${only}`);
  process.exit(1);
}

const browser = await chromium.launch();

for (const { path, out } of targets) {
  const page = await browser.newPage({
    viewport: { width: 1440, height: 900 },
    deviceScaleFactor: 1,
  });
  page.setDefaultTimeout(60_000);
  await page.goto(`${origin}${path}`, { waitUntil: "networkidle", timeout: 90_000 });
  await page.addStyleTag({
    content: `html{scroll-behavior:auto !important}
              [data-feedback-ui]{display:none !important}`,
  });
  // Scroll the whole page once so the Reveal/Stagger entries have fired
  // before the capture; they animate on entry only.
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
  const height = await page.evaluate(() => document.documentElement.scrollHeight);
  await page.screenshot({ path: out, fullPage: true });
  console.log(`${out}  1440x${height}`);
  await page.close();
}

await browser.close();
