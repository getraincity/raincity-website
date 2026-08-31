import { business, locations } from "@/lib/content";
import {
  JsonLd,
  breadcrumbSchema,
  locationsPageSchema,
  pageMetadata,
} from "@/lib/seo";
import { Header } from "@/components/home/Header";
import { Footer } from "@/components/home/Footer";
import { QuoteForm } from "@/components/home/QuoteForm";
import { LocationsHero } from "@/components/locations/LocationsHero";
import { ServiceArea } from "@/components/locations/ServiceArea";
import { CoverageMap } from "@/components/locations/CoverageMap";
import { LocationsGrid } from "@/components/locations/LocationsGrid";
import { LocationsClosing } from "@/components/locations/LocationsClosing";
import { ScrollToTop } from "@/components/ui/ScrollToTop";

export const metadata = pageMetadata({
  title: `Service Areas | Property Maintenance Across ${business.region}`,
  description: `${business.name} is mobile, based in ${business.base} and working in ${locations.length} communities across ${business.region} — ${locations
    .map((location) => location.name)
    .join(", ")}. Find yours and get a free quote.`,
  path: "/locations",
  // The city-by-city set, which this page is now the owner of. It used to sit
  // in the homepage's list; /services carries the service-led terms and
  // /about the company-led ones, and the note there — that these pages should
  // not bid against each other for one query — is why it moved rather than
  // being duplicated. Generated from `locations` so a tenth community brings
  // its own keyword with it.
  keywords: [
    `property maintenance ${business.region}`,
    `exterior cleaning ${business.region}`,
    ...locations.map(
      (location) => `property maintenance ${location.name} BC`,
    ),
    ...locations.map((location) => `exterior cleaning ${location.name} BC`),
  ],
});

/**
 * /locations — the service-area hub.
 *
 * There was no page to inventory for this route. The old site had nine
 * per-city pages and nothing above them, so the structure below is written
 * from what the page is for rather than inherited from a source, and the
 * ordering is an argument: the shape of the area (banner), why it is drawn in
 * communities at all (overview), where the line actually falls (the map and
 * index), what each place is like to work in (the grid), and then the ask.
 *
 * The map section is the page. Everything above it is one screen of framing
 * and everything below it is elaboration — which is the same shape /services
 * has around its catalogue, and the reason the closing block and the quote
 * form sit where they do.
 *
 * What is deliberately not on this page: the numbered "Why Choose RainCity"
 * column and the three-step "How It Works" strip. Both already appear on
 * /about, on /services and on all eleven service pages. A hub page that
 * repeats the site's two most-reused marketing blocks has no identity of its
 * own, and this one's identity is meant to come from the coverage index being
 * genuinely useful — a reader finding their city in four bands and clicking
 * it — rather than from a third recitation of what makes us good.
 *
 * Header, Footer and QuoteForm are the homepage's own components, imported
 * rather than reimplemented. Every "Get A Quote" on the page, the header's
 * included, is an anchor to the `#quote` the form already declares.
 *
 * No `SectionEdge`. The 12 degree cut is spent in exactly four places and one
 * of them is a navy band meeting a white one; the only such boundary here is
 * the closing block, and /services, /contact and the service template all
 * leave that same boundary square. Cutting it here alone would make the
 * signature a decoration rather than a rule.
 *
 * All nine cards and all nine index rows link to `/locations/[slug]`. Those
 * routes 404ed for as long as this page existed without them — the same state
 * /services was in before its own template landed — and they resolve as of
 * that template shipping. The two things held back on that account went with
 * it in the same commit: the nine sitemap entries, and the `url` on each item
 * of the ItemList in `locationsPageSchema`.
 */
export default function LocationsPage() {
  return (
    <>
      <JsonLd schema={locationsPageSchema} />
      <JsonLd
        schema={breadcrumbSchema([{ name: "Locations", path: "/locations" }])}
      />
      <Header />
      <main id="main">
        <LocationsHero />
        <ServiceArea />
        <CoverageMap />
        <LocationsGrid />
        <LocationsClosing />
        <QuoteForm />
      </main>
      <Footer />
      <ScrollToTop />
    </>
  );
}
