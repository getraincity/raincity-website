import { business, pageFaqs } from "@/lib/content";
import {
  aboutPageSchema,
  breadcrumbSchema,
  canonical,
  JsonLd,
  pageFaqSchema,
  pageMetadata,
} from "@/lib/seo";
import { Header } from "@/components/home/Header";
import { Footer } from "@/components/home/Footer";
import { QuoteForm } from "@/components/home/QuoteForm";
import { AboutHero } from "@/components/about/AboutHero";
import { WhoWeAre } from "@/components/about/WhoWeAre";
import { Stats } from "@/components/about/Stats";
import { Founders } from "@/components/about/Founders";
import { Partnerships } from "@/components/about/Partnerships";
import { MissionVision } from "@/components/about/MissionVision";
import { Process } from "@/components/about/Process";
import { HomeGround } from "@/components/about/HomeGround";
import { SectionEdge } from "@/components/ui/SectionEdge";
import { ScrollToTop } from "@/components/ui/ScrollToTop";
import { PageFaq } from "@/components/ui/PageFaq";

export const metadata = pageMetadata({
  title: `About ${business.shortName} | Property Maintenance in ${business.base}, BC`,
  // 147, down from 229.
  description: `A mobile property maintenance and exterior cleaning company based in ${business.base}, BC. Meet the crew, the standard and the process behind every job.`,
  path: "/about",
  // Deliberately narrower than the homepage's list. The homepage competes for
  // the service and city queries; this page should not be bidding against it
  // for the same ones, so the terms here are the ones someone uses when they
  // are checking out a company rather than shopping for a service.
  keywords: [
    `about ${business.name}`,
    "property maintenance company New Westminster",
    "exterior cleaning company Greater Vancouver",
    "local property maintenance team BC",
    "licensed insured property maintenance Vancouver",
    "strata maintenance contractor Greater Vancouver",
  ],
});

/**
 * /about.
 *
 * Section order follows the content inventory: banner, who we are, the
 * figures, mission and vision, the process, then the sitewide quote module.
 * Mission and Vision arrive as two sections in the source and are set as one
 * two-row band here — see the note on `MissionVision`.
 *
 * Header, Footer and QuoteForm are the homepage's own components, imported
 * rather than reimplemented. The quote module is genuinely sitewide: the
 * inventory flags that the About page carries the identical block, and the
 * `#quote` anchor the banner CTA points at is the one it already declares.
 */
export default function AboutPage() {
  return (
    <>
      <JsonLd
        schema={pageFaqSchema("/about", canonical("/about") + "#webpage", pageFaqs.about.faqs)}
      />
      <JsonLd schema={aboutPageSchema} />
      <JsonLd schema={breadcrumbSchema([{ name: "About", path: "/about" }])} />
      <Header />
      <main id="main">
        <AboutHero />
        <WhoWeAre />
        <Stats />
        {/* Both added at the client request, and both render nothing while
            their arrays are empty. Founders is empty today, which is exactly
            why Partnerships is White rather than Fog: with Founders absent it
            sits straight under Stats, and two Fog bands in a row read as one.
            Grounds here have to work in both states, not just the filled one. */}
        <Founders />
        <Partnerships />
        {/* Signature use #3 — the 12 degree cut, now carrying White into
            Navy. It ran out of Fog until Partnerships landed above it; that
            section is White because Founders between it and Stats renders
            nothing while it has no people, and the cut has to come out of
            whichever section actually precedes it in both states. The note on
            Partnerships carries the full reasoning. */}
        <SectionEdge from="bg-white" to="bg-navy" />
        <MissionVision />
        <Process />
        {/* Added at the client's request. It sits between two white
            sections on purpose — see the comment block on the component for
            why Mist, why here, and why no map: QuoteForm directly below
            already embeds one queried on the base city. */}
        <HomeGround />
        <QuoteForm />
        {/* After the ask, not in front of it — the same placement and the
            same reasoning as ServiceFaq. */}
        <PageFaq
          id="about-faq-heading"
          label={pageFaqs.about.label}
          heading={pageFaqs.about.heading}
          body={pageFaqs.about.body}
          faqs={pageFaqs.about.faqs}
        />
      </main>
      <Footer />
      <ScrollToTop />
    </>
  );
}
