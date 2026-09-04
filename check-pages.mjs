/**
 * End-to-end check of all eleven service pages: HTTP status, console errors,
 * the section inventory, and the JSON-LD each page publishes.
 */
import { chromium } from "playwright";
import { services } from "./lib/content.ts";

const origin = process.argv[2] ?? "http://localhost:3000";
const browser = await chromium.launch();
const rows = [];
let fails = [];

for (const s of services) {
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  const errs = [];
  page.on("pageerror", (e) => errs.push(String(e)));
  page.on("console", (m) => { if (m.type() === "error") errs.push(m.text()); });
  const resp = await page.goto(`${origin}/services/${s.slug}`, { waitUntil: "networkidle" });
  const d = await page.evaluate(() => {
    const ld = [...document.querySelectorAll('script[type="application/ld+json"]')]
      .map((n) => JSON.parse(n.textContent));
    const byType = (t) => ld.find((n) => n["@type"] === t);
    const faq = byType("FAQPage");
    const svc = byType("Service");
    return {
      h1: document.querySelector("h1")?.textContent?.trim(),
      tiles: document.querySelectorAll('[aria-labelledby="overview-heading"] li:has(h4)').length,
      trustPts: document.querySelectorAll('[aria-labelledby="overview-heading"] li:not(:has(h4))').length,
      steps: document.querySelectorAll('[aria-labelledby="process-heading"] li, [aria-labelledby="process-heading"] ol li').length,
      closing: document.querySelector("#service-closing-heading")?.textContent?.trim(),
      faqCount: document.querySelectorAll('[aria-labelledby="faq-heading"] button').length,
      ldTypes: ld.map((n) => n["@type"]).join(","),
      faqQs: faq ? faq.mainEntity.length : 0,
      svcDescLen: svc ? svc.description.length : 0,
      metaLen: document.querySelector('meta[name="description"]')?.content?.length ?? 0,
      placeholders: document.querySelectorAll(".photo-placeholder").length,
    };
  });
  const row = { slug: s.slug, status: resp.status(), h1ok: d.h1 === s.title, tiles: d.tiles,
    faqUI: d.faqCount, faqLD: d.faqQs, trust: d.trustPts, ph: d.placeholders, metaLen: d.metaLen,
    ld: d.ldTypes, errs: errs.length };
  rows.push(row);
  if (resp.status() !== 200) fails.push(`${s.slug}: status ${resp.status()}`);
  if (errs.length) fails.push(`${s.slug}: ${errs.length} console errors -> ${errs[0]}`);
  if (d.trustPts !== 5) fails.push(`${s.slug}: ${d.trustPts} trust points, expected 5`);
  if (d.tiles !== 6) fails.push(`${s.slug}: ${d.tiles} scope tiles, expected 6`);
  if (d.faqCount < 5 || d.faqCount !== d.faqQs) fails.push(`${s.slug}: FAQ UI ${d.faqCount} vs LD ${d.faqQs}`);
  if (!d.ldTypes.includes("FAQPage") || !d.ldTypes.includes("Service")) fails.push(`${s.slug}: missing JSON-LD (${d.ldTypes})`);
  if (d.metaLen < 120 || d.metaLen > 175) fails.push(`${s.slug}: meta description ${d.metaLen} chars`);
  if (!d.closing) fails.push(`${s.slug}: no closing headline`);
  await page.close();
}
await browser.close();
console.table(rows);
console.log(fails.length ? "FAILURES:\n" + fails.join("\n") : "PASS: all eleven pages render clean");
process.exit(fails.length ? 1 : 0);
