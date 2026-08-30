import { notFound } from "next/navigation";
import { business, services } from "@/lib/content";
import {
  JsonLd,
  breadcrumbSchema,
  pageMetadata,
  serviceSchema,
} from "@/lib/seo";
import { Header } from "@/components/home/Header";
import { Footer } from "@/components/home/Footer";
import { QuoteForm } from "@/components/home/QuoteForm";
import { ServiceHero } from "@/components/service/ServiceHero";
import { ServiceOverview } from "@/components/service/ServiceOverview";
import { ServiceProcess } from "@/components/service/ServiceProcess";
import { ServiceClosing } from "@/components/service/ServiceClosing";
import { SectionEdge } from "@/components/ui/SectionEdge";
import { ScrollToTop } from "@/components/ui/ScrollToTop";

type Params = { slug: string };

/**
 * Every service page, prerendered at build time from `services` in
 * content.ts. Nothing about the route knows how many services there are or
 * what they are called — add one to that array and its page exists, with its
 * catalogue card, its nav entry, its sitemap line and its JSON-LD.
 */
export function generateStaticParams(): Params[] {
  return services.map((service) => ({ slug: service.slug }));
}

/**
 * No fallback rendering. The eleven params above are the complete set, so any
 * other slug is a 404 rather than an attempt to build a page for a service
 * this company does not offer.
 */
export const dynamicParams = false;

const find = (slug: string) => services.find((s) => s.slug === slug);

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const service = find(slug);
  if (!service) return {};

  return pageMetadata({
    // "Service | Company in Region" — the service first, because that is the
    // half of the title someone is scanning a result page for.
    title: `${service.title} | ${business.shortName} Property Maintenance, ${business.region}`,
    description: service.detail.metaDescription,
    path: `/services/${service.slug}`,
    // Eleven pages competing for one term is eleven pages losing to each
    // other, so each takes its own service crossed with the geography and
    // nothing else. The catalogue at /services keeps the general terms.
    keywords: [
      `${service.title.toLowerCase()} ${business.region}`,
      `${service.title.toLowerCase()} ${business.base} BC`,
      `${service.title.toLowerCase()} near me`,
      `strata ${service.title.toLowerCase()} BC`,
      `commercial ${service.title.toLowerCase()} Vancouver`,
    ],
  });
}

/**
 * /services/[slug] — the shared template behind all eleven service pages.
 *
 * Section order follows the service template inventory: banner, the service
 * overview with its trust panel, how it works, the final ask. What the
 * inventory does not list, and this page carries anyway, is the quote form:
 * every CTA in the template points at `#quote`, and that anchor is declared
 * by the sitewide QuoteForm module. Without it, five buttons on each of
 * eleven pages would scroll nowhere.
 *
 * The split between what changes and what does not is the whole design. The
 * banner heading, the overview, the scope list, the mid-page CTA label and
 * the closing headline come from that service's `detail` block; the "Our
 * Service" eyebrow, the trust panel, the phone prompt, the whole How It Works
 * section and the closing body and buttons are `servicePage`, identical on
 * every one of the eleven.
 *
 * Header, Footer and QuoteForm are the homepage's own components, imported
 * rather than reimplemented, exactly as /about and /services import them.
 *
 * One SectionEdge, signature use #3: the white overview meeting the navy
 * process band is precisely the transition the homepage and /about cut, and
 * the only navy-on-white boundary this page makes. The navy band closing back
 * into Fog is left square, which is what both of those pages do with their
 * outgoing edge too.
 */
export default async function ServiceDetailPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const service = find(slug);
  // Unreachable with `dynamicParams = false`, and kept anyway: it is what
  // makes `service` non-optional for everything below.
  if (!service) notFound();

  return (
    <>
      <JsonLd schema={serviceSchema(service)} />
      <JsonLd
        schema={breadcrumbSchema([
          { name: "Services", path: "/services" },
          { name: service.title, path: `/services/${service.slug}` },
        ])}
      />
      <Header />
      <main id="main">
        <ServiceHero service={service} />
        <ServiceOverview service={service} />
        <SectionEdge from="bg-white" to="bg-navy" />
        <ServiceProcess />
        <ServiceClosing service={service} />
        <QuoteForm />
      </main>
      <Footer />
      <ScrollToTop />
    </>
  );
}
