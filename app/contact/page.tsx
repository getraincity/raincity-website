import { business } from "@/lib/content";
import {
  JsonLd,
  breadcrumbSchema,
  contactPageSchema,
  pageMetadata,
} from "@/lib/seo";
import { Header } from "@/components/home/Header";
import { Footer } from "@/components/home/Footer";
import { QuoteForm } from "@/components/home/QuoteForm";
import { ContactHero } from "@/components/contact/ContactHero";
import { ContactDetails } from "@/components/contact/ContactDetails";
import { NextSteps } from "@/components/contact/NextSteps";
import { ScrollToTop } from "@/components/ui/ScrollToTop";

export const metadata = pageMetadata({
  title: `Contact ${business.shortName} | Free Quotes in ${business.base}, BC`,
  // 145, down from 216.
  description: `Call, email or request a free quote from ${business.shortName} — mobile exterior cleaning and property maintenance based in ${business.base}, BC. No obligation.`,
  path: "/contact",
  keywords: [
    `contact ${business.name}`,
    "property maintenance quote New Westminster",
    "exterior cleaning quote Greater Vancouver",
    "free quote property maintenance BC",
    "book property maintenance Greater Vancouver",
  ],
});

/**
 * /contact.
 *
 * Section order: banner, the four direct-contact cards, the sitewide quote
 * form and map — the most prominent instance of it on the site, since this
 * page exists to be reached — then the reassurance band. Header, Footer and
 * QuoteForm are the homepage's own components, imported rather than
 * reimplemented; the form's `#quote` anchor is also what the header's
 * sitewide "Get A Quote" button and this page's own hero CTA point at.
 *
 * No `SectionEdge`. The only fog-to-navy boundary on the page is Reassurance
 * meeting the Footer, and every other page on the site leaves that particular
 * boundary square — /about, /services and the service template all cut the
 * edge somewhere inside `<main>`, never on the way into the Footer. Cutting
 * it here and nowhere else does would make the signature a decoration rather
 * than a rule.
 */
export default function ContactPage() {
  return (
    <>
      <JsonLd schema={contactPageSchema} />
      <JsonLd
        schema={breadcrumbSchema([{ name: "Get In Touch", path: "/contact" }])}
      />
      <Header />
      <main id="main">
        <ContactHero />
        <ContactDetails />
        <QuoteForm />
        <NextSteps />
      </main>
      <Footer />
      <ScrollToTop />
    </>
  );
}
