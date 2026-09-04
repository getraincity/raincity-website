import type { Metadata } from "next";
import {
  business,
  locations,
  services,
  testimonials,
  type BlogPost,
  type Faq,
  type Location,
  type Service,
} from "./content";
import { photos } from "./photos";

/**
 * SEO primitives — canonical origin, per-page metadata, and the JSON-LD the
 * site publishes.
 *
 * Everything here reads from `business` and `services` in content.ts, so the
 * name, phone, email, hours and service area in the structured data can never
 * drift from the ones printed in the header and footer. That consistency is
 * the whole point of NAP: a search engine reconciling the page against the
 * markup has to find the same three facts both times.
 */

/** Production origin. Also the base every canonical and OG URL is built on. */
export const SITE_URL = "https://raincitypms.com";

/** New Westminster, BC. The base city — no street address is on file. */
export const GEO = { latitude: 49.2057, longitude: -122.911 } as const;

export const canonical = (path = "/") => new URL(path, SITE_URL).toString();

/** The shared social card. Generated from the brand system; 1200x630. */
export const OG_IMAGE = "/og-default.png";

/**
 * Which route groups are published to search — and the only place that
 * decides.
 *
 * Two groups on this site are deliberately held back, and until now each was
 * held back in two unrelated files: a `robots: { index: false }` on the route,
 * and nothing at all in `app/sitemap.ts`, which went on listing all eight blog
 * URLs. That is a contradiction a crawler reads twice — the sitemap says "this
 * is canonical content, index it", the page header says "do not" — and it puts
 * eight URLs into Search Console's "Excluded by 'noindex' tag" report for no
 * reason. Worse, lifting the hold meant remembering to edit four route files
 * *and* the sitemap, and the sitemap is the one that gets forgotten.
 *
 * One flag now drives both. Flipping `blog` to `true` took the `noindex` off
 * three route files and put eight URLs into the sitemap, in one edit; `legal`
 * does the same for two more on the day the lawyer signs off.
 *
 * The reasons for the holds are in CLAUDE.md and in the PLACEHOLDER blocks on
 * `blogPosts` and `legalPages` in content.ts. Do not flip either of these
 * because a build is being prepared; flip them because the condition named
 * there has actually been met.
 */
export const indexing = {
  /**
   * Released. The client has authorised publication of the six articles.
   *
   * One thing was done before flipping this, and it is the thing to redo if
   * more articles are ever written. Indexing an article turns every sentence
   * in it into a published position of the company, and a compliance pass
   * found the FAQ answers carrying commitments nobody at RainCity had
   * confirmed: a completion time ("in practice before seven in the morning"),
   * a trigger depth ("two centimetres is the standard starting point"), a
   * pricing model ("priced per event rather than per pass"), a capacity
   * guarantee, a visit-duration range, and a claim about what most commercial
   * clients buy. Ten sentences across all six posts were rewritten to keep the
   * advice and hand the specifics back to the agreement, because a published
   * number the office does not hold to is worse than no number.
   *
   * Still true, and still worth knowing: no author is named on any post, and
   * `blogPostingSchema` publishes the organisation as author rather than a
   * person. That is deliberate — see the note there.
   */
  blog: true,
  /** Terms & Privacy Policy. Blocked on legal review + operational sign-off. */
  legal: false,
} as const;

/**
 * The `robots` half of a page's Metadata, for a route in a held-back group.
 *
 * Spread into the metadata object rather than assigned, so a published route
 * gets no `robots` key at all and inherits the layout's — rather than getting
 * an explicit `index: true` that would have to be kept in step with it.
 *
 * `follow: true` is deliberate on a held route: the page is not for the index
 * but the links out of it still pass through, so a noindex blog post still
 * feeds the service page it points at.
 */
export function searchDirectives(published: boolean): Pick<Metadata, "robots"> {
  return published ? {} : { robots: { index: false, follow: true } };
}

/**
 * Per-page metadata. Title and description are required rather than
 * defaulted: a page without its own pair inherits the site template and ends
 * up competing with the homepage for the same query. The title is emitted
 * absolute — see the note in the return below.
 */
export function pageMetadata({
  title,
  description,
  path = "/",
  keywords,
  article,
  image,
}: {
  /** Written in full, brand included. Not left to the layout's template. */
  title: string;
  description: string;
  path?: string;
  keywords?: string[];
  /**
   * Set only by `/blog/[slug]`. Present, it flips the Open Graph type from
   * `website` to `article` and adds the two fields that type carries.
   *
   * Every other route on this site is a `website` and says so; a blog post is
   * the one page here that is genuinely a dated piece of writing rather than
   * a page about the company, and it is the only place the distinction earns
   * an extra branch.
   */
  article?: { publishedTime: string; section?: string };
  /**
   * Social card override. Defaults to the shared brand card. A post passes
   * its own photograph so a shared link shows the article rather than the
   * same logo card every other route shares.
   *
   * `alt` comes with it and is not optional in practice: every photograph on
   * this site has real alt text in the registry, and a card that showed a
   * roof while its alt described the company would be the one place on the
   * site where those two things disagreed.
   */
  image?: { url: string; alt: string };
}): Metadata {
  const url = canonical(path);
  // Next replaces the whole `openGraph` / `twitter` object rather than
  // merging field by field, so the card image has to be repeated here — set
  // it only in the layout and every page that declares its own OG block
  // silently ships without one.
  // The shared brand card is a known 1200x630 and says so; an overriding
  // photograph is whatever the registry points at, and declaring dimensions
  // for it would be guessing at numbers a scraper is about to measure anyway.
  const card = image
    ? { url: image.url, alt: image.alt }
    : {
        url: OG_IMAGE,
        width: 1200,
        height: 630,
        alt: `${business.name} — year-round property maintenance in ${business.region}.`,
      };
  return {
    // `absolute` opts out of the layout's `%s | RainCity Property Maintenance`
    // template, which is what the note above already assumed. The homepage
    // never showed the problem: a template applies to child segments only, and
    // app/page.tsx sits in the same segment as the layout that declares it.
    // The first route one level down — /about — came out as "About RainCity |
    // Property Maintenance in New Westminster, BC | RainCity Property
    // Maintenance", ninety-one characters with the brand in it twice. Titles
    // written here are already complete; the template has nothing to add.
    title: { absolute: title },
    description,
    keywords,
    alternates: { canonical: url },
    openGraph: article
      ? {
          type: "article",
          locale: "en_CA",
          siteName: business.name,
          title,
          description,
          url,
          images: [card],
          publishedTime: article.publishedTime,
          section: article.section,
        }
      : {
          type: "website",
          locale: "en_CA",
          siteName: business.name,
          title,
          description,
          url,
          images: [card],
        },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [card.url],
    },
  };
}

/* -------------------------------------------------------------------------- */
/* Structured data                                                            */
/* -------------------------------------------------------------------------- */

/** Stable @id so the Organization and the ProfessionalService are one entity. */
const ORG_ID = `${SITE_URL}/#organization`;

/**
 * Where this company will travel, as schema.org — the region, then the nine
 * cities inside it, all derived from `locations` in content.ts.
 *
 * Written once and shared. It was inlined twice, identically, in
 * `localBusinessSchema` and `serviceSchema`, and /locations would have made
 * three copies of the same twelve lines. Three nodes claiming a service area
 * have to claim the same one — that is the whole reason a crawler is given it
 * more than once — so the shape is a constant rather than a pattern everyone
 * is trusted to repeat.
 */
/**
 * One `City` node per municipality this entry covers.
 *
 * Seven of the nine locations are municipalities and produce one node each.
 * The two groupings produce their real constituents instead — see
 * `municipalities` on `Location` in content.ts for why publishing
 * `City: "Ridge Meadow"` was a claim about a place that does not exist.
 */
const citiesOf = (location: Location) =>
  (location.municipalities ?? [location.name]).map((name) => ({
    "@type": "City",
    name,
    containedInPlace: { "@type": "AdministrativeArea", name: business.region },
  }));

export const areaServed = [
  { "@type": "AdministrativeArea", name: business.region },
  ...locations.flatMap(citiesOf),
];

/** Site-wide. Rendered once in the root layout. */
export const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": ORG_ID,
  name: business.name,
  alternateName: business.shortName,
  url: SITE_URL,
  logo: `${SITE_URL}${OG_IMAGE}`,
  email: business.email,
  telephone: business.phone,
  address: {
    "@type": "PostalAddress",
    addressLocality: business.base,
    addressRegion: "BC",
    addressCountry: "CA",
  },
};

/** Stable @id for the site itself, so every page can say what it is part of. */
const SITE_ID = `${SITE_URL}/#website`;

/**
 * The site as an entity. Rendered once in the root layout, beside the
 * Organization.
 *
 * Three nodes, three different claims, and they are not interchangeable: the
 * Organization is the company, the ProfessionalService on the homepage is the
 * local business a searcher can hire, and this is the publication those two
 * appear on. Answer engines resolve entities before they resolve pages, and
 * without this node the graph had a page tier and an organisation tier with
 * nothing joining them. Every page-level node in this file — /about,
 * /services, each service, /locations, /contact, the blog index — was
 * pointing its `isPartOf` at the ProfessionalService, which is a business
 * rather than a website, and which is only declared on the homepage. All six
 * now point here instead, which is what `isPartOf` on a WebPage means.
 *
 * No `potentialAction` / `SearchAction`. There is no site search on this
 * site, and publishing a search endpoint that does not exist is a claim a
 * crawler can follow and find nothing at. Add it if and when a search route
 * lands, not before.
 */
export const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": SITE_ID,
  url: SITE_URL,
  name: business.name,
  alternateName: business.shortName,
  description: `Year-round exterior cleaning and property maintenance for homes, stratas and businesses in ${business.base} and across ${business.region}.`,
  inLanguage: "en-CA",
  publisher: { "@id": ORG_ID },
};

/**
 * Homepage. ProfessionalService rather than the bare LocalBusiness: it is the
 * narrower type and Google treats it as a LocalBusiness anyway.
 *
 * No `streetAddress` and no `aggregateRating`. There is no street address in
 * content.ts to publish, and the testimonials on the page are placeholder
 * copy — marking them up as ratings would be a fabricated review signal.
 */
export const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  "@id": `${SITE_URL}/#business`,
  parentOrganization: { "@id": ORG_ID },
  name: business.name,
  description: `Year-round exterior cleaning and property maintenance for homes, stratas and businesses in ${business.base} and across ${business.region}.`,
  url: SITE_URL,
  telephone: business.phone,
  email: business.email,
  image: `${SITE_URL}${OG_IMAGE}`,
  address: {
    "@type": "PostalAddress",
    addressLocality: business.base,
    addressRegion: "BC",
    addressCountry: "CA",
  },
  geo: { "@type": "GeoCoordinates", ...GEO },
  areaServed,
  // Mon–Sat 07:00–22:00. Sunday is closed, so it is simply absent: the spec
  // reads a missing day as closed, and an explicit 00:00–00:00 entry is a
  // common way to accidentally publish "open all day".
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
      ],
      opens: "07:00",
      closes: "22:00",
    },
  ],
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Property maintenance services",
    itemListElement: services.map((service) => ({
      "@type": "Offer",
      itemOffered: {
        "@type": "Service",
        name: service.title,
        description: service.blurb,
        serviceType: service.title,
        provider: { "@id": ORG_ID },
        areaServed: { "@type": "AdministrativeArea", name: business.region },
      },
    })),
  },
  // Published only once testimonials are verified real customer reviews.
  // Set `testimonials.verified = true` and fill `averageRating` / `reviewCount`
  // in lib/content.ts when replacing placeholder reviews. The node is absent
  // while `verified` is false so no fabricated rating reaches a crawler.
  ...(testimonials.verified && testimonials.reviewCount > 0
    ? {
        aggregateRating: {
          "@type": "AggregateRating",
          ratingValue: testimonials.averageRating,
          reviewCount: testimonials.reviewCount,
          bestRating: 5,
          worstRating: 1,
        },
      }
    : {}),
};

/**
 * /about. AboutPage is the narrower WebPage subtype and is exactly what this
 * route is, so it is used in preference to a bare WebPage.
 *
 * The page claims almost nothing of its own: `mainEntity` points at the same
 * Organization node the layout already publishes, so /about is described as
 * being *about* that entity rather than re-declaring the name, phone and
 * address a second time and leaving a crawler two copies to reconcile.
 *
 * Note what is deliberately absent. The page prints three figures — years in
 * business, properties serviced, satisfaction — and none of them appear here.
 * They are the client's own unverified claims (see the comment block on
 * `aboutPage` in content.ts). A satisfaction percentage has an obvious home
 * in `aggregateRating`, and putting it there would publish a review signal
 * that no review supports. Same reason `localBusinessSchema` above carries
 * no rating either.
 */
export const aboutPageSchema = {
  "@context": "https://schema.org",
  "@type": "AboutPage",
  "@id": `${canonical("/about")}#webpage`,
  url: canonical("/about"),
  name: `About ${business.name}`,
  description: `Who ${business.name} is, how the work is done and the standard it is held to — property maintenance and exterior cleaning in ${business.base} and across ${business.region}.`,
  inLanguage: "en-CA",
  isPartOf: { "@id": SITE_ID },
  mainEntity: { "@id": ORG_ID },
  // The crew photograph the page opens on. RainCity's own, served locally.
  //
  // Read from the registry rather than written out. It was a hardcoded
  // `/about-section-picture.jpg`, and when that file was converted to webp
  // the registry entry moved and this string did not — leaving the one image
  // a crawler is explicitly told is this page's principal image pointing at a
  // 404. `photos.aboutCrew.src` cannot drift from the file the page actually
  // serves, because it is the same value the page renders from.
  primaryImageOfPage: `${SITE_URL}${photos.aboutCrew.src}`,
};

/**
 * /services. CollectionPage is what this route is — a page whose subject is a
 * set of other things — and the set itself is published as an ItemList so a
 * crawler reads the catalogue as an ordered whole rather than eleven
 * unrelated mentions of a service name.
 *
 * It derives from `services`, exactly as the homepage OfferCatalog does, so
 * the two can never disagree about what this company sells.
 *
 * The list items carry `url` as of the day `/services/[slug]` landed. They
 * deliberately did not before: putting a URL in structured data is a
 * machine-readable assertion that it is real, canonical content, and until
 * the route existed it was the same claim app/sitemap.ts was refusing to
 * make. Both pieces changed together, and both derive from `services`, so
 * neither can now point at a route the other does not.
 */
export const servicesPageSchema = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  "@id": `${canonical("/services")}#webpage`,
  url: canonical("/services"),
  name: `Services | ${business.name}`,
  description: `The full range of exterior cleaning and property maintenance ${business.name} provides in ${business.base} and across ${business.region}.`,
  inLanguage: "en-CA",
  isPartOf: { "@id": SITE_ID },
  about: { "@id": ORG_ID },
  mainEntity: {
    "@type": "ItemList",
    name: "Property maintenance services",
    numberOfItems: services.length,
    // The grid is a catalogue, not a ranking. ItemListOrderAscending would
    // claim an order that the page does not mean and the cards do not show.
    itemListOrder: "https://schema.org/ItemListUnordered",
    itemListElement: services.map((service, i) => ({
      "@type": "ListItem",
      position: i + 1,
      item: {
        "@type": "Service",
        // Same `@id` the service's own page publishes, so the catalogue entry
        // and the page are read as one node rather than two Services with
        // the same name.
        "@id": `${canonical(`/services/${service.slug}`)}#service`,
        name: service.title,
        description: service.blurb,
        serviceType: service.title,
        url: canonical(`/services/${service.slug}`),
        provider: { "@id": ORG_ID },
        areaServed: { "@type": "AdministrativeArea", name: business.region },
      },
    })),
  },
};

/**
 * /services/[slug]. One Service node per route, and the page is declared as
 * its `mainEntityOfPage` rather than wrapped in a second WebPage node — the
 * subject of the page and the thing being described are the same thing here,
 * and two nodes would only give a crawler a pair to reconcile.
 *
 * `description` is the page's own overview paragraph, not the card blurb the
 * catalogue publishes: this is the fuller of the two, and it is what a reader
 * actually finds on the page the URL points at.
 *
 * What is deliberately absent, for the third time in this file: no `offers`
 * and no `aggregateRating`. Prices are quoted per property and none are
 * published, and an `offers` block with no price is an empty assertion; the
 * ratings question is settled in the note on `localBusinessSchema` above.
 *
 * `hasOfferCatalog` is not used for the "What's Included" list either. Those
 * are the parts of one job, not things that can be bought separately, and
 * marking them as Offers would publish eleven catalogues of services this
 * company does not actually sell on their own.
 */
export function serviceSchema(service: Service) {
  const url = canonical(`/services/${service.slug}`);
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${url}#service`,
    name: service.title,
    serviceType: service.title,
    description: service.detail.overview,
    url,
    mainEntityOfPage: url,
    inLanguage: "en-CA",
    provider: { "@id": ORG_ID },
    image: `${SITE_URL}${OG_IMAGE}`,
    // The region, then the cities inside it — literally the same object the
    // homepage business node and /locations publish, so the three cannot
    // disagree about where this company will travel.
    areaServed,
  };
}

/**
 * The questions on a service page, as FAQPage.
 *
 * Published as a separate node rather than folded into the Service above:
 * the two describe different things — one the work, one the page's own
 * question-and-answer content — and `mainEntity` on a Service is not where a
 * crawler looks for either.
 *
 * This one carries real copy, which is the whole reason it exists. The
 * testimonials elsewhere on the site are placeholder text and are marked up
 * as nothing at all (see the note on `localBusinessSchema`); these answers
 * were written for this service and are true of it, so they go out as
 * structured data. Anything less than that is not eligible to be here.
 *
 * Worth knowing when reading a Search Console report against it: since 2023
 * Google has limited FAQ *rich results* to government and health sites, so
 * this will not draw an accordion into the SERP for a cleaning company. It is
 * still valid, still parsed, and still the machine-readable form of the
 * answers — which is what the AI systems reading `llms.txt` want too.
 *
 * Callers must check `service.detail.faqs` first; ten of the eleven services
 * have none yet, and an FAQPage with an empty `mainEntity` is a page claiming
 * to be an FAQ and then not being one.
 */
export function faqSchema(service: Service) {
  const url = canonical(`/services/${service.slug}`);
  return faqPage(url, `${url}#service`, service.detail.faqs ?? []);
}

/**
 * The shared body of the two FAQPage nodes this site publishes.
 *
 * Extracted when `/locations/[slug]` landed with its own per-community
 * question set, for the same reason `areaServed` above is a constant rather
 * than a pattern: two nodes claiming to be FAQPages have to be built the same
 * way, and a second hand-written copy is a second thing to keep in step with
 * whatever Google decides an FAQPage is next.
 *
 * `aboutId` is the node on the page the questions are about — the Service on
 * a service page, the city-scoped Service on a community page — so a crawler
 * reads the answers as attached to something rather than floating on a URL.
 */
function faqPage(url: string, aboutId: string, faqs: readonly Faq[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "@id": `${url}#faq`,
    url,
    inLanguage: "en-CA",
    isPartOf: { "@id": SITE_ID },
    about: { "@id": aboutId },
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}

/**
 * /locations/[slug]. The service this company provides, scoped to one city.
 *
 * The obvious move was a `ProfessionalService` or `LocalBusiness` node per
 * community, and it is the wrong one. This site publishes exactly one
 * business entity — `localBusinessSchema`, at `#business`, with the New
 * Westminster locality and the coordinates of the base — and nine more of
 * them, one per city page, would assert nine RainCity locations that do not
 * exist. There is no storefront in Anmore to describe, no address to give it
 * and no separate phone number; a per-city LocalBusiness would be a
 * fabricated premises, which is the same class of thing as a fabricated
 * review. The company node stays singular and this page describes the
 * *service*, offered *there*.
 *
 * So: one Service per community, provided by the Organization the layout
 * already publishes, with `areaServed` narrowed from the region to this one
 * City. The catalogue hangs off it because that is the page's actual claim —
 * all eleven services are available in this community, which is what the grid
 * on the page shows and what `areaServed` on every service page already
 * implies. Each offer carries the city rather than the region, so the
 * narrowing holds all the way down.
 *
 * `description` is the route's own meta description rather than a slice of
 * the local copy: it is the one sentence written to describe the page as a
 * whole, and it is what the same crawler is already reading in the head.
 *
 * No `offers` and no `aggregateRating`, for the fourth time in this file.
 * Prices are quoted per property and none are published; the ratings question
 * is settled in the note on `localBusinessSchema`.
 */
export function locationSchema(location: Location) {
  const url = canonical(`/locations/${location.slug}`);
  // One node for a municipality, several for a grouping. `areaServed` accepts
  // either a node or an array, so the single-entry case is unwrapped rather
  // than published as a one-element list.
  const cities = citiesOf(location);
  const city = cities.length === 1 ? cities[0] : cities;

  return {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${url}#service-area`,
    name: `Property maintenance in ${location.name}`,
    serviceType: "Property maintenance and exterior cleaning",
    description: location.detail.metaDescription,
    url,
    mainEntityOfPage: url,
    inLanguage: "en-CA",
    provider: { "@id": ORG_ID },
    areaServed: city,
    image: `${SITE_URL}${OG_IMAGE}`,
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: `Property maintenance services in ${location.name}`,
      itemListElement: services.map((service) => ({
        "@type": "Offer",
        itemOffered: {
          // The same `@id` the service's own page publishes, so the offer and
          // that page are read as one node rather than as ninety-nine
          // Services with eleven names between them.
          "@id": `${canonical(`/services/${service.slug}`)}#service`,
          "@type": "Service",
          name: service.title,
          serviceType: service.title,
          url: canonical(`/services/${service.slug}`),
          provider: { "@id": ORG_ID },
          areaServed: city,
        },
      })),
    },
  };
}

/**
 * The questions on a community page, as FAQPage.
 *
 * Same shape and same rule as the service version above: these answers were
 * written for this community and are true of it, so they are eligible to go
 * out as structured data. Read that alongside the note on `LocationDetail` in
 * content.ts — nothing in any of the forty-five answers is an operational
 * commitment nobody made, and the ones that describe method restate what a
 * service page already says.
 *
 * Callers must check `detail.faqs` first, exactly as the service pages do.
 * All nine communities carry a set; the guard is for the tenth.
 */
export function locationFaqSchema(location: Location) {
  const url = canonical(`/locations/${location.slug}`);
  return faqPage(url, `${url}#service-area`, location.detail.faqs ?? []);
}

/**
 * /locations. CollectionPage, for the same reason /services is one: the
 * subject of the page is a set of other things.
 *
 * Two things it deliberately does and does not do.
 *
 * It publishes `areaServed` — the same constant the business node and every
 * service page carry — because that is the one assertion this page exists to
 * make, and a service-area page whose markup says nothing about the service
 * area would be a strange thing to ship. The list is not re-derived here;
 * pointing all three at one object is what guarantees they agree.
 *
 * The ItemList entries carry `url` as of the day `/locations/[slug]` landed.
 * They deliberately did not before: a URL in structured data is a
 * machine-readable claim that the page is real, canonical content, and while
 * all nine of these 404ed it was the same claim app/sitemap.ts was refusing
 * to make. The service list went the same way, without `url` until its
 * template shipped and with it from that commit on. Both changes landed here
 * alongside the sitemap entries, which is where they belonged.
 *
 * The item stays a `City` with a `url` on it rather than borrowing the `@id`
 * of the Service that page publishes. The two are not the same thing — one
 * is a place, the other is what this company does there — and collapsing
 * them would give a crawler a City that has an offer catalogue.
 */
export const locationsPageSchema = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  "@id": `${canonical("/locations")}#webpage`,
  url: canonical("/locations"),
  name: `Service Areas | ${business.name}`,
  description: `The ${locations.length} communities ${business.name} travels to across ${business.region}, from its ${business.base} base.`,
  inLanguage: "en-CA",
  isPartOf: { "@id": SITE_ID },
  about: { "@id": ORG_ID },
  areaServed,
  mainEntity: {
    "@type": "ItemList",
    name: `${business.region} communities served`,
    numberOfItems: locations.length,
    // Alphabetical, which is a sequence and not a ranking. The nearest
    // community is not the best one and the page does not say it is.
    itemListOrder: "https://schema.org/ItemListUnordered",
    // One entry per page, not per municipality — this is a list of the nine
    // routes, and `numberOfItems` above says nine.
    //
    // The item is a `City` for the seven entries that are one, and a `Place`
    // holding real `City` nodes for the two that are not. It published
    // `City: "Ridge Meadow"` and `City: "Tri-Cities"` until an independent
    // QA pass caught it: `citiesOf` was threaded through `areaServed`,
    // `serviceSchema` and `locationSchema` and missed here, because this node
    // carries a `url` and so did not read as a bare place node. It is the
    // same category error — a crawler asked to resolve a city that does not
    // exist — on the one page whose whole job is to enumerate the service
    // area. See `municipalities` on `Location` in content.ts.
    itemListElement: locations.map((location, i) => {
      const cities = citiesOf(location);
      const url = canonical(`/locations/${location.slug}`);
      return {
        "@type": "ListItem",
        position: i + 1,
        item:
          cities.length === 1
            ? { ...cities[0], url }
            : {
                "@type": "Place",
                name: location.name,
                url,
                containsPlace: cities,
                containedInPlace: {
                  "@type": "AdministrativeArea",
                  name: business.region,
                },
              },
      };
    }),
  },
};

/**
 * /contact. ContactPage is the narrower WebPage subtype, exactly as
 * AboutPage is used for /about above and for the same reason: `mainEntity`
 * points at the Organization node the layout already publishes, so the page
 * is described as being *about* reaching that entity rather than restating
 * its phone, email and address a second time for a crawler to reconcile.
 */
export const contactPageSchema = {
  "@context": "https://schema.org",
  "@type": "ContactPage",
  "@id": `${canonical("/contact")}#webpage`,
  url: canonical("/contact"),
  name: `Contact ${business.name}`,
  description: `Call, email or request a free quote from ${business.name} — mobile property maintenance and exterior cleaning based in ${business.base}, serving ${business.region}.`,
  inLanguage: "en-CA",
  isPartOf: { "@id": SITE_ID },
  mainEntity: { "@id": ORG_ID },
};

/**
 * /blog, and each of its paginated pages.
 *
 * Two types on one node: CollectionPage, for the same reason /services and
 * /locations are one — the subject of the page is a set of other things — and
 * Blog, which is what that particular set is. Multi-typing says both without
 * publishing two nodes for a crawler to reconcile.
 *
 * `blogPost` lists the articles, published as of the release of
 * `indexing.blog`. It was held back through two earlier passes on the rule
 * that structured data is a claim rather than copy: while the six articles
 * were unconfirmed, an index that also enumerated them would have stated the
 * same untrue thing a second time, in the part of the page a crawler reads as
 * an assertion. That condition is met, so the list goes out.
 *
 * Each entry is a reference to the `@id` that post's own page publishes, not
 * a second copy of its headline, date and image. One article described twice
 * is a crawler's problem to reconcile; a reference is the same claim made
 * once.
 *
 * `posts` is passed in rather than sliced here. The pagination lives in
 * lib/blog.ts, and lib/blog.ts already imports `canonical` from this file —
 * reaching back for `pagePosts` would close that into a cycle. The route
 * rendering this node already holds its own slice, so it hands it over.
 * Called with nothing, the node simply carries no list, which is the correct
 * shape for a page whose posts are not known.
 *
 * Page two and beyond get their own node at their own URL rather than
 * pointing back at /blog: each is a different set of posts, and
 * `pageMetadata` already canonicalises each page to itself.
 */
export function blogPageSchema(page = 1, posts: readonly BlogPost[] = []) {
  const url = canonical(page <= 1 ? "/blog" : `/blog/page/${page}`);
  return {
    "@context": "https://schema.org",
    "@type": ["CollectionPage", "Blog"],
    "@id": `${url}#webpage`,
    url,
    name: `Blog | ${business.name}`,
    description: `Seasonal timing, maintenance that pays for itself, and notes from the work — exterior cleaning and property maintenance in ${business.base} and across ${business.region}.`,
    inLanguage: "en-CA",
    isPartOf: { "@id": SITE_ID },
    about: { "@id": ORG_ID },
    publisher: { "@id": ORG_ID },
    // Only the posts on this page of the archive. Each page of the pager is a
    // different document and canonicalises to itself, so its node describes
    // what is on it rather than the whole collection.
    blogPost: posts.map((post) => ({
      "@type": "BlogPosting",
      "@id": `${canonical(`/blog/${post.slug}`)}#article`,
    })),
  };
}

/**
 * /blog/[slug]. One BlogPosting per article.
 *
 * Held back until the template landed, on the rule this file applies
 * everywhere: a URL in structured data is a machine-readable claim that the
 * page is real, canonical content, and until the route resolved that claim
 * would have been false. It resolves now. The same change lifted the sitemap
 * entries, and the two belong together.
 *
 * Read this alongside the PLACEHOLDER note on `blogPosts` in content.ts. The
 * markup is only as true as the copy under it, and this copy is invented — so
 * what goes out here is the smallest set of assertions that describes the
 * page rather than the fullest one available. Everything below is a fact
 * about the document; nothing is a fact about the world.
 *
 * `author` is the organisation, not a person, and that is not a placeholder
 * standing in for a byline. There is no `author` field on `BlogPost` and no
 * byline anywhere on the site, because a real name on copy somebody did not
 * write is the one fabrication this build has refused throughout. An
 * Organization author says only that this company published this page, which
 * is true of every page on this domain. Add a Person here on the day there is
 * a person to name, in the same commit that adds the field and the byline.
 *
 * `dateModified` is deliberately equal to `datePublished`. Nothing tracks
 * revisions to a post, and a modified date that silently means "published"
 * is a freshness signal nobody earned.
 *
 * `wordCount` and `articleBody` are absent for the same reason: both would be
 * derived from placeholder prose, and neither is what a search engine is
 * short of when the body copy is already on the page it is reading.
 */
export function blogPostingSchema(post: BlogPost) {
  const url = canonical(`/blog/${post.slug}`);
  const photo = photos[post.photo];
  // Relative registry paths become absolute; the Unsplash entries are already
  // absolute and are passed through. Structured data has no page to resolve a
  // relative URL against.
  const image = photo.src.startsWith("http")
    ? photo.src
    : `${SITE_URL}${photo.src}`;

  // When a confirmed author exists, publish a Person node; otherwise fall back
  // to the Organisation so the schema always has a valid `author`. Add the
  // `author` field to a post in content.ts only when the person named actually
  // wrote it — the field, the byline and the schema change together.
  const author = post.author
    ? {
        "@type": "Person",
        name: post.author.name,
        jobTitle: post.author.title,
        worksFor: { "@id": ORG_ID },
      }
    : { "@id": ORG_ID };

  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "@id": `${url}#article`,
    headline: post.title,
    description: post.excerpt,
    url,
    mainEntityOfPage: url,
    inLanguage: "en-CA",
    datePublished: post.date,
    dateModified: post.date,
    articleSection: post.category,
    image,
    author,
    publisher: { "@id": ORG_ID },
    isPartOf: { "@id": `${canonical("/blog")}#webpage` },
  };
}

/**
 * Breadcrumbs for any page below the root. First used by /about, and kept
 * generic so the trail stays defined in one place as the service and location
 * pages land.
 */
export function breadcrumbSchema(trail: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [{ name: "Home", path: "/" }, ...trail].map(
      (crumb, i) => ({
        "@type": "ListItem",
        position: i + 1,
        name: crumb.name,
        item: canonical(crumb.path),
      }),
    ),
  };
}

/** Renders a schema object as the script tag Google looks for. */
export function JsonLd({ schema }: { schema: object }) {
  return (
    <script
      type="application/ld+json"
      // Schema objects are authored in this file, never user input.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
