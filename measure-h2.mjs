/**
 * Line count of each service page's overview H2 at the three review widths.
 * The heading is set in display-l against a five-column measure and the
 * template's rule is two lines at most; three reads as an unedited list.
 */
import { chromium } from "playwright";
import { services } from "./lib/content.ts";

const origin = process.argv[2] ?? "http://localhost:3000";
const widths = [1440, 768, 375];
const browser = await chromium.launch();
const rows = [];

for (const s of services) {
  const row = { slug: s.slug, chars: s.detail.overviewHeading.length };
  for (const width of widths) {
    const page = await browser.newPage({ viewport: { width, height: 900 } });
    await page.goto(`${origin}/services/${s.slug}`, { waitUntil: "domcontentloaded" });
    await page.evaluate(() => document.fonts.ready);
    await page.waitForTimeout(300);
    row[width] = await page.evaluate(() => {
      const h = document.querySelector("#overview-heading");
      const lh = parseFloat(getComputedStyle(h).lineHeight);
      return Math.round(h.getBoundingClientRect().height / lh);
    });
    await page.close();
  }
  rows.push(row);
}
await browser.close();
console.table(rows);
