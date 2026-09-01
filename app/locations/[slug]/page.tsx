import { notFound } from "next/navigation";
import { business, locations } from "@/lib/content";
import {
  JsonLd,
  breadcrumbSchema,
  locationFaqSchema,
  locationSchema,
  pageMetadata,
} from "@/lib/seo";
import { Header } from "@/components/home/Header";
import { Footer } from "@/components/home/Footer";
import { QuoteForm } from "@/components/home/QuoteForm";
import { LocationHero } from "@/components/location/LocationHero";
import { LocationIntro } from "@/components/location/LocationIntro";
import { LocationServices } from "@/components/location/LocationServices";
import { LocationMap } from "@/components/location/LocationMap";
import { LocationFaq } from "@/components/location/LocationFaq";
import { NearbyAreas } from "@/components/location/NearbyAreas";
import { LocationClosing } from "@/components/location/LocationClosing";
import { SectionEdge } from "@/components/ui/SectionEdge";
import { ScrollToTop } from "@/components/ui/ScrollToTop";

type Params = { slug: string };

/**
 * Every community page, prerendered at build time from `locations` in
 * content.ts. The route knows nothing about how many communities there are
 * or what they are called — add one to that array with its `detail` block and
 * its page exists, with its card on /locations, its row in the coverage
 * index, its nav entry, its sitemap line and its JSON-LD.
 */
export function generateStaticParams(): Params[] {
  return locations.map((location) => ({ slug: location.slug }));
}

/**
 * No fallback rendering. The nine params above are the complete set, so any
 * other slug is a 404 rather than an attempt to build a page for a community
 * this company does not travel to. `/locations/richmond` should not resolve;
 * Richmond is inside the Metro Vancouver outline on the hub page's map and
 * deliberately not on the list beside it.
 */
export const dynamicParams = false;

const find = (slug: string) => locations.find((l) => l.slug === slug);

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const location = find(slug);
  if (!location) return {};

  return {
    ...pageMetadata({
      // "Property Maintenance in City, BC | Company" — the city and the service
      // first, because those are the two halves of the query this page is
      // written for, and the brand last because nobody is searching for it yet.
      title: `Property Maintenance in ${location.name}, BC | ${business.name}`,
      description: location.detail.metaDescription,
      path: `/locations/${location.slug}`,
      // City crossed with the service categories, and nothing regional. The
      // hub at /locations owns the "Greater Vancouver" terms and it already
      // carries a city-by-city set generated from this same array — these nine
      // pages exist so that each city's own query has one page to land on
      // rather than nine pages bidding against each other and their own index.
      keywords: [
        `property maintenance ${location.name} BC`,
        `exterior cleaning ${location.name}`,
        `pressure washing ${location.name} BC`,
        `gutter cleaning ${location.name}`,
        `window cleaning ${location.name} BC`,
        `strata property maintenance ${location.name}`,
      ],
    }),
  };
}

/**
 * /locations/[slug] — the shared template behind all nine community pages.
 *
 * There was no page worth inheriting for this route. The old site had nine of
 * them and the Anmore audit is what they were: a hero paragraph reused
 * verbatim halfway down the page, a nine-card services grid missing three of
 * the twelve services, a section still carrying Lorem ipsum, and a city name
 * swapped into eight places on an otherwise identical page. The one piece of
 * genuinely per-city information on it was a list of surrounding communities.
 * So the structure below is written from what the page is for, and the
 * audit's single good idea — name the places around this one — is section
 * six rather than a clause in a paragraph.
 *
 * The order is an argument, and it runs from the specific to the general:
 * which community this is (banner), what it is actually like to work in
 * (local brief), what we will do here (the catalogue), where it is (map),
 * what people ask before booking here (FAQ), and where to go if this is the
 * wrong page (nearby) — then the ask. Sections two and five are the two that
 * are written nine times; everything else is furniture the site already owns,
 * which is the correct ratio for a template that has to be filled in nine
 * times without going stale.
 *
 * WHAT IS DELIBERATELY ABSENT, and it matters more here than on any other
 * route: the numbered "Why Choose RainCity" column and the three-step "How It
 * Works" strip. Both are on /about, on /services and on all eleven service
 * pages already. Adding them to nine more would put the site's two most-
 * reused marketing blocks on twenty-two of its twenty-five pages, and a
 * community page that recites them has nothing left on it that is about the
 * community. /locations refuses them for the same reason and says so in its
 * own header comment; this is that refusal held at nine times the scale.
 *
 * The FAQ comes after the quote form, exactly as it does on a service page:
 * everything above the form is an argument for booking, and the questions are
 * for the reader who scrolled past it holding a specific doubt. The check
 * below and the matching one inside `LocationFaq` are what keep the markup
 * and the FAQPage node from ever disagreeing about whether a route has one.
 *
 * Header, Footer and QuoteForm are the homepage's own components, imported
 * rather than reimplemented, as every other route does. Every CTA on the page
 * points at the `#quote` anchor that form declares.
 *
 * One SectionEdge, signature use #3, and it sits where the page's only
 * light-into-dark boundary is: the white nearby-areas band meeting the navy
 * closing photograph. Amber rather than white, which is the same call the
 * service template makes at the same boundary — at `slim` a near-white wedge
 * is just the section above failing to end cleanly, and as amber it is a mark
 * pointing into the last ask. The cut is allowed in four places sitewide and
 * one instance per page is the budget; this is the one.
 */
export default async function LocationDetailPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const location = find(slug);
  // Unreachable with `dynamicParams = false`, and kept anyway: it is what
  // makes `location` non-optional for everything below.
  if (!location) notFound();

  return (
    <>
      <JsonLd schema={locationSchema(location)} />
      <JsonLd
        schema={breadcrumbSchema([
          { name: "Locations", path: "/locations" },
          { name: location.name, path: `/locations/${location.slug}` },
        ])}
      />
      {/* Only where there are questions to publish. The section below is
          governed by the same check, so the markup and the page can never
          disagree about whether this route has an FAQ on it. */}
      {location.detail.faqs?.length ? (
        <JsonLd schema={locationFaqSchema(location)} />
      ) : null}
      <Header />
      <main id="main">
        <LocationHero location={location} />
        <LocationIntro location={location} />
        <LocationServices location={location} />
        <LocationMap location={location} />
        <NearbyAreas location={location} />
        <SectionEdge from="bg-amber" to="bg-navy" size="slim" />
        <LocationClosing location={location} />
        <QuoteForm />
        <LocationFaq location={location} />
      </main>
      <Footer />
      <ScrollToTop />
    </>
  );
}
