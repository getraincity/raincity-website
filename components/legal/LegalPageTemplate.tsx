import type { LegalPage } from "@/lib/content";
import { Button } from "@/components/ui/Button";
import { Clock } from "@/components/ui/Icon";
import { Reveal } from "@/components/ui/Motion";
import { Header } from "@/components/home/Header";
import { Footer } from "@/components/home/Footer";
import { ScrollToTop } from "@/components/ui/ScrollToTop";
import { JsonLd, breadcrumbSchema } from "@/lib/seo";
import { LegalHero } from "@/components/legal/LegalHero";
import { LegalSections } from "@/components/legal/LegalSections";
import { LegalTocDesktop, LegalTocMobile } from "@/components/legal/LegalToc";

/**
 * The whole of a policy route, from one `LegalPage` object.
 *
 * Four pages share this rather than a layout file. A layout would give them a
 * common shell and leave four page bodies to drift apart; this gives them one
 * body, and the only thing a route file decides is which object to hand it.
 * The moment one policy needs something the others do not, it belongs in
 * `LegalSection` as an optional field — see the note on `legalPages`.
 *
 * Layout is 3 / 8 with column 4 left empty: the contents rail, a gutter, and
 * the clauses. The empty column is the same device the service overview's
 * masthead uses, and it is what stops the rail reading as a caption attached
 * to the text. Below lg the rail becomes a disclosure at the top of the
 * content column and the grid collapses to one column.
 *
 * No `SectionEdge`. The only light-to-navy boundary on the page is the closing
 * card meeting the footer, and the 12deg cut is allowed in exactly four
 * places on this site — none of them is here.
 */
export function LegalPageTemplate({ page }: { page: LegalPage }) {
  return (
    <>
      <JsonLd
        schema={breadcrumbSchema([{ name: page.crumb, path: `/${page.slug}` }])}
      />
      <Header />
      <main id="main">
        <LegalHero page={page} />

        <div className="bg-white py-section">
          <div className="mx-auto max-w-site px-edge">
            <div className="grid grid-cols-1 gap-x-gap-x lg:grid-cols-12">
              <div className="lg:col-span-3">
                <LegalTocDesktop sections={page.sections} />
              </div>

              <div className="lg:col-span-8 lg:col-start-5">
                {/* Revision date first, above the contents and the first
                    clause. On a policy page it is the one fact a reader may
                    have come specifically to check — whether what they agreed
                    to is what is on the screen — so it does not sit in the
                    footer of the page as a postscript. */}
                <Reveal>
                  <p className="meta inline-flex items-center gap-2.5 border border-line px-4 py-2 text-steel">
                    <Clock className="shrink-0 text-rc-blue" />
                    <span>
                      Last updated{" "}
                      <time dateTime={page.updatedISO}>{page.lastUpdated}</time>
                    </span>
                  </p>
                </Reveal>

                <Reveal className="mt-6 lg:hidden" delay={0.06}>
                  <LegalTocMobile sections={page.sections} />
                </Reveal>

                <div className="mt-block">
                  <LegalSections sections={page.sections} />
                </div>

                {/* The ask, once — at the bottom, after the reader has what
                    they came for. RainCity Blue as a ground, which on this
                    site is the service overview's trust band and nothing else;
                    navy would have vanished into the footer directly under it,
                    and Fog would have read as a fifth callout. */}
                <Reveal className="on-navy mt-block bg-rc-blue p-8 sm:p-10">
                  <h2 className="display-m text-white">{page.outro.heading}</h2>
                  <p className="body-base mt-4 max-w-prose text-mist">
                    {page.outro.body}
                  </p>
                  <Button href="/contact" className="mt-8">
                    {page.outro.cta}
                  </Button>
                </Reveal>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
      <ScrollToTop />
    </>
  );
}
