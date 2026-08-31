import { business } from "@/lib/content";
import { JsonLd, localBusinessSchema, pageMetadata } from "@/lib/seo";
import { Header } from "@/components/home/Header";
import { Hero } from "@/components/home/Hero";
import { About } from "@/components/home/About";
import { Services } from "@/components/home/Services";
import { WhyChooseUs } from "@/components/home/WhyChooseUs";
import { Projects } from "@/components/home/Projects";
import { Pillars } from "@/components/home/Pillars";
import { Testimonials } from "@/components/home/Testimonials";
import { Awards } from "@/components/home/Awards";
import { QuoteForm } from "@/components/home/QuoteForm";
import { Footer } from "@/components/home/Footer";
import { SectionEdge } from "@/components/ui/SectionEdge";
import { ScrollToTop } from "@/components/ui/ScrollToTop";

export const metadata = pageMetadata({
  title: `Property Maintenance & Exterior Cleaning in ${business.region} | ${business.shortName}`,
  description: `${business.name} provides year-round pressure washing, window and gutter cleaning, roof and driveway care, snow removal and landscaping for homes, stratas and businesses in ${business.base} and across ${business.region}. Call ${business.phone} for a free quote.`,
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
      <JsonLd schema={localBusinessSchema} />
      <Header />
      <main id="main">
        <Hero />
        <About />
        <Services />
        <WhyChooseUs />
        <Projects />
        <SectionEdge from="bg-mist" to="bg-navy" />
        <Pillars />
        <Testimonials />
        <Awards />
        <QuoteForm />
      </main>
      <Footer />
      <ScrollToTop />
    </>
  );
}
