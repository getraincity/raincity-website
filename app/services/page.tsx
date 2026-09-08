import { business, pageFaqs, services } from "@/lib/content";
import {
  breadcrumbSchema,
  canonical,
  JsonLd,
  pageFaqSchema,
  pageMetadata,
  servicesPageSchema,
} from "@/lib/seo";
import { Header } from "@/components/home/Header";
import { Footer } from "@/components/home/Footer";
import { Testimonials } from "@/components/home/Testimonials";
import { QuoteForm } from "@/components/home/QuoteForm";
import { ServicesHero } from "@/components/services/ServicesHero";
import { WhatWeOffer } from "@/components/services/WhatWeOffer";
import { ServicesCatalogue } from "@/components/services/ServicesCatalogue";
import { ScrollToTop } from "@/components/ui/ScrollToTop";
import { PageFaq } from "@/components/ui/PageFaq";

export const metadata = pageMetadata({
  // 52 characters, down from 80. The catalogue does not need to list itself
  // in its own title; that is what the page below it is for.
  title: `Our Services | Exterior Cleaning in ${business.region}`,
  // 139, down from 266. The old one named nine of the eleven services and
  // was cut after the fourth.
  description: `Eleven services, one company — pressure and soft washing, windows, gutters, roofs, sealing, painting, snow and lights, right across ${business.region}.`,
  path: "/services",
  // Service-led terms, where /about takes the company-led ones and the
  // homepage takes the city-by-city set. The three pages should not be
  // bidding against each other for the same query.
  keywords: [
    ...services.map((service) => `${service.title.toLowerCase()} ${business.region}`),
    "exterior cleaning services Greater Vancouver",
    "property maintenance services New Westminster",
    "strata maintenance services BC",
    "commercial property cleaning Vancouver",
  ],
});

/**
 * /services.
 *
 * Section order follows the content inventory: banner, what we offer, the
 * catalogue, testimonials, quote form. The catalogue is the page — everything
 * above it is one screen of framing, and nothing sits between it and the
 * social proof that closes.
 *
 * What the inventory lists and this page does not carry is the old site's
 * twelve services. `services` in content.ts is the current eleven and the
 * only place the catalogue comes from; the inventory supplied the structure,
 * not the list.
 *
 * Header, Footer, Testimonials and QuoteForm are the homepage's own
 * components. The last two are genuinely sitewide — the inventory has this
 * page carrying both blocks verbatim — and the banner's CTA points at the
 * `#quote` anchor QuoteForm already declares.
 *
 * No `SectionEdge`. The 12 degree cut is spent in exactly four places and one
 * of them is a navy band meeting a white one; this page's only navy is the
 * banner, and /about leaves that same boundary square. Cutting it here and
 * not there would make the signature a decoration rather than a rule.
 */
export default function ServicesPage() {
  return (
    <>
      <JsonLd
        schema={pageFaqSchema("/services", canonical("/services") + "#webpage", pageFaqs.services.faqs)}
      />
      <JsonLd schema={servicesPageSchema} />
      <JsonLd
        schema={breadcrumbSchema([{ name: "Services", path: "/services" }])}
      />
      <Header />
      <main id="main">
        <ServicesHero />
        <WhatWeOffer />
        <ServicesCatalogue />
        <Testimonials />
        <QuoteForm />
        {/* After the ask, not in front of it — the same placement and the
            same reasoning as ServiceFaq. */}
        <PageFaq
          id="services-faq-heading"
          label={pageFaqs.services.label}
          heading={pageFaqs.services.heading}
          body={pageFaqs.services.body}
          faqs={pageFaqs.services.faqs}
        />
      </main>
      <Footer />
      <ScrollToTop />
    </>
  );
}
