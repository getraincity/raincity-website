/**
 * Layout guardrails across all eleven service pages at the three review
 * widths: H2 line counts (two at most, per the template rule) and any
 * horizontal overflow of the document.
 *
 * It used to check `#overview-heading` alone, which is the heading the rule
 * was written for and was the only variable one on the page. The SEO pass
 * added two more bands, and the first draft of one of them took the service
 * name into a display-l heading — three lines on six services at 375px and
 * four on Concrete and Asphalt Sealing. The rule caught it, but only because
 * somebody measured by hand; this script did not know those headings existed.
 * All three are checked now, so the next heading added to this template is
 * measured by the thing that is supposed to measure it.
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
      const lines = (id) => {
        const h = document.getElementById(id);
        if (!h) return 0;
        return Math.round(
          h.getBoundingClientRect().height / parseFloat(getComputedStyle(h).lineHeight),
        );
      };
      const de = document.documentElement;
      return {
        overview: lines("overview-heading"),
        areas: lines("areas-heading"),
        related: lines("related-heading"),
        overflow: de.scrollWidth - de.clientWidth,
        tiles: document.querySelectorAll("#overview-heading ~ * li, section li").length,
      };
    });
    const worst = Math.max(r.overview, r.areas, r.related);
    row[`h2@${width}`] = worst;
    row[`ovf@${width}`] = r.overflow;
    if (worst > 2 || r.overflow > 0) bad++;
    await page.close();
  }
  rows.push(row);
}
await browser.close();
console.table(rows);
console.log(bad === 0 ? "PASS: no heading over two lines, no horizontal overflow" : `FAIL: ${bad} violations`);
process.exit(bad === 0 ? 0 : 1);
