import { business, locations } from "@/lib/content";
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
  keywords: [
    "property maintenance Greater Vancouver",
    "exterior cleaning New Westminster",
    "pressure washing Vancouver",
    "gutter cleaning Burnaby",
    "roof cleaning Surrey",
    "window cleaning Coquitlam",
    "snow removal Greater Vancouver",
    "strata property maintenance BC",
    ...locations.map((city) => `property maintenance ${city} BC`),
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
