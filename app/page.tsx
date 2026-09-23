import { business, pageFaqs } from "@/lib/content";
import {
  JsonLd,
  localBusinessSchema,
  pageFaqSchema,
  pageMetadata,
  SITE_URL,
} from "@/lib/seo";
import { Header } from "@/components/home/Header";
import { Hero } from "@/components/home/Hero";
import { About } from "@/components/home/About";
import { Services } from "@/components/home/Services";
import { WhyChooseUs } from "@/components/home/WhyChooseUs";
import { Projects } from "@/components/home/Projects";
import { LatestWork } from "@/components/home/LatestWork";
import { Testimonials } from "@/components/home/Testimonials";
import { Awards } from "@/components/home/Awards";
import { QuoteForm } from "@/components/home/QuoteForm";
import { Footer } from "@/components/home/Footer";
import { SectionEdge } from "@/components/ui/SectionEdge";
import { ScrollToTop } from "@/components/ui/ScrollToTop";
import { PageFaq } from "@/components/ui/PageFaq";

export const metadata = pageMetadata({
  // 58 characters. The previous title ran to 72 and lost the region.
  title: `Exterior Cleaning & Property Maintenance, ${business.region}`,
  // The description this replaced was 270 characters — a hundred past what a
  // SERP renders — and the clause that got cut was the phone number at the
  // end. The number is already a tel: link on the page and the `telephone`
  // field in the LocalBusiness markup; a meta description is not where it
  // earns anything, and putting it last guaranteed it was the first thing
  // dropped.
  description: `Year-round pressure washing, gutter, roof and window cleaning for homes, stratas and businesses across ${business.region}. Free written quotes, no obligation.`,
  path: "/",
  // Region and service-plus-city terms. The nine-city
  // `property maintenance ${city} BC` set used to be spread in here too and
  // moved to /locations the day that route landed: that page is now the one
  // whose whole subject is the service area, and the note on /services —
  // three pages should not bid against each other for one query — applies to
  // the fourth as soon as it exists. The handful of city names left below are
  // paired with a specific service, which is a different query from the bare
  // city one and is the homepage's to hold.
  keywords: [
    "property maintenance Greater Vancouver",
    "exterior cleaning New Westminster",
    "pressure washing Vancouver",
    "gutter cleaning Burnaby",
    "roof cleaning Surrey",
    "window cleaning Coquitlam",
    "snow removal Greater Vancouver",
    "strata property maintenance BC",
  ],
});

export default function HomePage() {
  return (
    <>
      <JsonLd
        schema={pageFaqSchema("/", SITE_URL + "/#business", pageFaqs.home.faqs)}
      />
      <JsonLd schema={localBusinessSchema} />
      <Header />
      <main id="main">
        <Hero />
        <About />
        <Services />
        <WhyChooseUs />
        <Projects />
        <SectionEdge from="bg-mist" to="bg-navy" />
        <LatestWork />
        <Testimonials />
        <Awards />
        <QuoteForm />
        {/* After the ask, not in front of it — the same placement and the
            same reasoning as ServiceFaq. */}
        <PageFaq
          id="home-faq-heading"
          label={pageFaqs.home.label}
          heading={pageFaqs.home.heading}
          body={pageFaqs.home.body}
          faqs={pageFaqs.home.faqs}
        />
      </main>
      <Footer />
      <ScrollToTop />
    </>
  );
}
