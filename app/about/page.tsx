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
import { CommunitySupport } from "@/components/about/CommunitySupport";
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
        {/* Both added at the client's request. Stats (Fog) → Founders (White)
            → Partnerships (Fog) is the designed alternation, restored on
            2026-09-23 when the two founders were confirmed and Founders began
            to render. Both still return null on an empty array, and if
            Founders ever did, Partnerships would sit Fog-on-Fog under Stats —
            check the grounds in both states before changing either. */}
        <Founders />
        <Partnerships />
        {/* Signature use #3 — the 12 degree cut, carrying Partnerships' Fog
            into Navy. */}
        <SectionEdge from="bg-fog" to="bg-navy" />
        <MissionVision />
        <Process />
        {/* The client's special pricing (2026-09-23). The page's one RainCity
            Blue band, between Process's White and Home Ground's Fog — see the
            note on the component for the placement. */}
        <CommunitySupport />
        {/* Added at the client's request. It sits between two white
            sections on purpose — see the comment block on the component for
            why Mist, why here, and why no map. */}
        <HomeGround />
        {/* The regional roofline rather than the form's usual New
            Westminster frame: Home Ground, directly above, already shows the
            SkyBridge, and the same bridge twice in one screen reads as a
            mistake. */}
        <QuoteForm photo="rooftops" />
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
