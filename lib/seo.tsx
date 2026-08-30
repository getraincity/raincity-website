import type { Metadata } from "next";
import { business, locations, services, type Service } from "./content";

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
}: {
  /** Written in full, brand included. Not left to the layout's template. */
  title: string;
  description: string;
  path?: string;
  keywords?: string[];
}): Metadata {
  const url = canonical(path);
  // Next replaces the whole `openGraph` / `twitter` object rather than
  // merging field by field, so the card image has to be repeated here — set
  // it only in the layout and every page that declares its own OG block
  // silently ships without one.
  const image = {
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
    openGraph: {
      type: "website",
      locale: "en_CA",
      siteName: business.name,
      title,
      description,
      url,
      images: [image],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [OG_IMAGE],
    },
  };
}

/* -------------------------------------------------------------------------- */
/* Structured data                                                            */
/* -------------------------------------------------------------------------- */

/** Stable @id so the Organization and the ProfessionalService are one entity. */
const ORG_ID = `${SITE_URL}/#organization`;

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
  areaServed: [
    { "@type": "AdministrativeArea", name: business.region },
    ...locations.map((city) => ({
      "@type": "City",
      name: city,
      containedInPlace: { "@type": "AdministrativeArea", name: business.region },
    })),
  ],
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
  isPartOf: { "@id": `${SITE_URL}/#business` },
  mainEntity: { "@id": ORG_ID },
  // The crew photograph the page opens on. RainCity's own, served locally.
  primaryImageOfPage: `${SITE_URL}/about-section-picture.jpg`,
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
  isPartOf: { "@id": `${SITE_URL}/#business` },
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
    // The region, then the cities inside it — the same shape and the same
    // source as the homepage business node, so the two agree on where this
    // company will travel.
    areaServed: [
      { "@type": "AdministrativeArea", name: business.region },
      ...locations.map((city) => ({
        "@type": "City",
        name: city,
        containedInPlace: {
          "@type": "AdministrativeArea",
          name: business.region,
        },
      })),
    ],
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
