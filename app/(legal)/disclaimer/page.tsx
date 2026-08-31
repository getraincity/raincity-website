import { legalPages } from "@/lib/content";
import { pageMetadata } from "@/lib/seo";
import { LegalPageTemplate } from "@/components/legal/LegalPageTemplate";

const page = legalPages.disclaimer;

export const metadata = pageMetadata({
  title: page.metaTitle,
  description: page.metaDescription,
  path: `/${page.slug}`,
  keywords: [...page.keywords],
});

/**
 * /disclaimer. The route decides which policy this is and nothing else — the
 * banner, contents rail, clause body and closing card are all
 * `LegalPageTemplate`, shared with the other three policy pages.
 */
export default function Page() {
  return <LegalPageTemplate page={page} />;
}
