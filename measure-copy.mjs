/**
 * Rendered line counts for the two copy blocks the service template repeats:
 * the overview paragraph beside the H2, and each "What's Included" tile
 * description. Window Cleaning is the reference — everything else is edited
 * to land on its line count at the same widths.
 */
import { chromium } from "playwright";
import { services } from "./lib/content.ts";

const origin = process.argv[2] ?? "http://localhost:3000";
const widths = (process.argv[3] ?? "1440").split(",").map(Number);
const only = process.argv[4] ? process.argv[4].split(",") : null;
const browser = await chromium.launch();

for (const width of widths) {
  const rows = [];
  const page = await browser.newPage({ viewport: { width, height: 900 } });
  for (const s of services) {
    if (only && !only.includes(s.slug)) continue;
    await page.goto(`${origin}/services/${s.slug}`, { waitUntil: "domcontentloaded" });
    await page.evaluate(() => document.fonts.ready);
    await page.waitForTimeout(250);
    const m = await page.evaluate(() => {
      const lines = (el) =>
        Math.round(el.getBoundingClientRect().height / parseFloat(getComputedStyle(el).lineHeight));
      const overview = document.querySelector("#overview-heading")
        .closest(".grid").querySelectorAll("p")[0];
      const tiles = [...document.querySelectorAll("li.group p")].map(lines);
      return { overview: lines(overview), tiles };
    });
    rows.push({
      slug: s.slug,
      ovLines: m.overview,
      ovChars: s.detail.overview.length,
      tiles: m.tiles.join(" "),
      tileChars: s.detail.included.map((i) => i.description?.length ?? 0).join(" "),
    });
  }
  await page.close();
  console.log(`\n=== ${width}px ===`);
  console.table(rows);
}
await browser.close();
