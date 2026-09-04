/**
 * Duplicate-phrase check across the eleven services' page copy.
 *
 * Two passes: exact duplicates of any whole field, and shared 8-word shingles
 * between any two fields. The second is what catches a paragraph that was
 * written once and had its noun swapped.
 */
import { services } from "./lib/content.ts";

const fields = [];
for (const s of services) {
  const d = s.detail;
  const add = (kind, text) => fields.push({ slug: s.slug, kind, text });
  add("intro", d.intro);
  add("overviewHeading", d.overviewHeading);
  add("overview", d.overview);
  add("cta", d.cta);
  add("closing", d.closing);
  add("meta", d.metaDescription);
  if (d.trust) { add("trust.blurb", d.trust.blurb); d.trust.points.forEach((p, i) => add(`trust.pt${i}`, p)); }
  d.included.forEach((it, i) => { add(`inc${i}.title`, it.title); if (it.description) add(`inc${i}.desc`, it.description); });
  (d.faqs ?? []).forEach((f, i) => { add(`faq${i}.q`, f.question); add(`faq${i}.a`, f.answer); });
}

const norm = (t) => t.toLowerCase().replace(/[^a-z0-9 ]+/g, " ").replace(/\s+/g, " ").trim();

// Exact duplicate fields
const seen = new Map();
const exact = [];
for (const f of fields) {
  const k = norm(f.text);
  if (seen.has(k)) exact.push(`${seen.get(k)}  ==  ${f.slug}/${f.kind}\n    "${f.text.slice(0, 90)}"`);
  else seen.set(k, `${f.slug}/${f.kind}`);
}

// Shared 8-word shingles
const N = 8;
const shingles = new Map();
const shared = [];
for (const f of fields) {
  const w = norm(f.text).split(" ");
  const local = new Set();
  for (let i = 0; i + N <= w.length; i++) local.add(w.slice(i, i + N).join(" "));
  for (const sh of local) {
    if (shingles.has(sh)) {
      const prev = shingles.get(sh);
      if (prev.slug !== f.slug || prev.kind !== f.kind) shared.push(`${prev.slug}/${prev.kind}  ~~  ${f.slug}/${f.kind}\n    "${sh}"`);
    } else shingles.set(sh, f);
  }
}

console.log(`fields checked: ${fields.length}`);
console.log(`\nexact duplicate fields: ${exact.length}`);
exact.forEach((e) => console.log("  " + e));
console.log(`\nshared ${N}-word phrases: ${shared.length}`);
shared.slice(0, 40).forEach((e) => console.log("  " + e));
process.exit(exact.length || shared.length ? 1 : 0);
