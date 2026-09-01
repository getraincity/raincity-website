/**
 * Layout guardrails across all eleven service pages at the three review
 * widths: the overview H2's line count (two at most, per the template rule)
 * and any horizontal overflow of the document.
 */
import { chromium } from "playwright";
import { services } from "./lib/content.ts";

const origin = process.argv[2] ?? "http://localhost:3000";
const widths = [1440, 768, 375];
const browser = await chromium.launch();
const rows = [];
let bad = 0;

for (const s of services) {
  const row = { slug: s.slug };
  for (const width of widths) {
    const page = await browser.newPage({ viewport: { width, height: 900 } });
    await page.goto(`${origin}/services/${s.slug}`, { waitUntil: "domcontentloaded" });
    await page.evaluate(() => document.fonts.ready);
    await page.waitForTimeout(300);
    const r = await page.evaluate(() => {
      const h = document.querySelector("#overview-heading");
      const lh = parseFloat(getComputedStyle(h).lineHeight);
      const de = document.documentElement;
      return {
        lines: Math.round(h.getBoundingClientRect().height / lh),
        overflow: de.scrollWidth - de.clientWidth,
        tiles: document.querySelectorAll("#overview-heading ~ * li, section li").length,
      };
    });
    row[`h2@${width}`] = r.lines;
    row[`ovf@${width}`] = r.overflow;
    if (r.lines > 2 || r.overflow > 0) bad++;
    await page.close();
  }
  rows.push(row);
}
await browser.close();
console.table(rows);
console.log(bad === 0 ? "PASS: no heading over two lines, no horizontal overflow" : `FAIL: ${bad} violations`);
process.exit(bad === 0 ? 0 : 1);
