/**
 * The logo's geometry, defined once per page and referenced by every
 * `<Logo />` through `<use>`.
 *
 * Rendered once, at the top of `<body>` in app/layout.tsx. The wordmark is
 * about 5 KB of path data. Drawn inline it would be repeated in the header,
 * the mobile menu, the footer and the closing band on most routes, and every
 * copy would appear again in the RSC payload. Defined here it is paid for
 * once, and `Logo` itself stays a few hundred bytes — which matters, because
 * `HeaderClient` is a client component and imports it.
 *
 * ## Where the shapes came from
 *
 * The client's own logo, supplied as a 250x160 PNG on white. It is not traced
 * from that file — at that size a trace is a blur. It is rebuilt:
 *
 * - **RAINCITY** is Montserrat Medium at the font's own spacing.
 * - **PROPERTY MAINTENANCE** is Montserrat SemiBold, tracked +0.028em, which
 *   is what lands it flush under the wordmark as in the supplied file.
 * - Both were identified and fitted against the PNG — stem-to-cap ratio for
 *   the weight, least squares on letter centroids for the spacing — and both
 *   lines match the source's measured widths to within 0.3 of a source pixel.
 * - **The leaf** is redrawn as a polyline from the source's pixels. It is an
 *   open outline, not a closed shape, and it grows out of the Y's right arm.
 *   That is the client's drawing and it is kept as drawn. The stroke is 1.5
 *   units against roughly 1.1 in the source: at header size the source weight
 *   renders under a pixel and greys out against navy.
 *
 * The glyphs are outlines, not live text, so no Montserrat file is ever
 * downloaded and the type system is untouched: the site's faces are still
 * Chivo and Plex. This is a mark, not a third face.
 *
 * Do not edit the path data by hand. The originals — the supplied PNG, and
 * transparent SVG and PNG exports in the client's own indigo — are in
 * `assets/`, named `raincity-logo-*`.
 */

/** The lockup's box, in the units the paths below are drawn in. */
export const LOGO_BOX = { width: 233.8, height: 62.4 } as const;

export function LogoSprite() {
  return (
    <svg
      aria-hidden="true"
      focusable="false"
      width="0"
      height="0"
      // Out of flow rather than `display: none`: an engine is entitled to stop
      // resolving references into a subtree that is not rendered at all.
      className="absolute"
    >
      <defs>
        {/* Both lines of type. `currentColor` resolves against the <use>
            that references it, so each Logo sets its own colour. */}
        <path
          id="rc-logo-word"
          fill="currentColor"
          d={
            "M4.6 47.2L0 47.2L0 14.9L12.6 14.9Q18.9 14.9 22.5 17.8Q26.1 20.8 26.1 26.1" +
            "Q26.1 29.6 24.5 32.1Q22.8 34.6 19.8 36Q19.4 36.2 19 36.4L26.6 47.2L21.6 47.2L14.6 37.2" +
            "Q13.7 37.3 12.6 37.3L4.6 37.3L4.6 47.2M4.6 18.9L4.6 33.4L12.5 33.4Q16.9 33.4 19.2 31.5" +
            "Q21.5 29.6 21.5 26.1Q21.5 22.6 19.2 20.8Q16.9 18.9 12.5 18.9L4.6 18.9M33.3 47.2" +
            "L28.5 47.2L43.1 14.9L47.7 14.9L62.4 47.2L57.5 47.2L54 39.1L36.8 39.1L33.3 47.2M38.4 35.4" +
            "L52.4 35.4L45.4 19.6L38.4 35.4M71.7 47.2L67 47.2L67 14.9L71.7 14.9L71.7 47.2M85.8 47.2" +
            "L81.2 47.2L81.2 14.9L85 14.9L104.4 38.9L104.4 14.9L109 14.9L109 47.2L105.2 47.2" +
            "L85.8 23.1L85.8 47.2M133 47.5Q129.3 47.5 126.2 46.3Q123.1 45.1 120.8 42.8" +
            "Q118.5 40.6 117.2 37.6Q115.9 34.6 115.9 31Q115.9 27.4 117.2 24.4Q118.5 21.4 120.8 19.2" +
            "Q123.1 16.9 126.2 15.7Q129.3 14.5 133 14.5Q136.8 14.5 139.9 15.7Q143.1 17 145.3 19.5" +
            "L142.3 22.4Q140.5 20.5 138.2 19.5Q135.8 18.6 133.2 18.6Q130.5 18.6 128.2 19.5" +
            "Q125.8 20.4 124.1 22.1Q122.4 23.8 121.5 26Q120.5 28.3 120.5 31Q120.5 33.7 121.5 36" +
            "Q122.4 38.2 124.1 39.9Q125.8 41.6 128.2 42.5Q130.5 43.4 133.2 43.4Q135.8 43.4 138.2 42.5" +
            "Q140.5 41.5 142.3 39.5L145.3 42.4Q143.1 44.9 139.9 46.2Q136.8 47.5 133 47.5M155.9 47.2" +
            "L151.3 47.2L151.3 14.9L155.9 14.9L155.9 47.2M176.5 47.2L171.9 47.2L171.9 18.9L160.8 18.9" +
            "L160.8 14.9L187.5 14.9L187.5 18.9L176.5 18.9L176.5 47.2M204.8 47.2L200.2 47.2L200.2 35.9" +
            "L187.4 14.9L192.3 14.9L202.7 31.9L213 14.9L217.6 14.9L204.8 36L204.8 47.2M1.9 62.1" +
            "L0 62.1L0 51.8L4.2 51.8Q5.6 51.8 6.6 52.2Q7.6 52.7 8.1 53.5Q8.6 54.3 8.6 55.5" +
            "Q8.6 56.6 8.1 57.4Q7.6 58.2 6.6 58.7Q5.6 59.1 4.2 59.1L1.9 59.1L1.9 62.1M1.9 53.4" +
            "L1.9 57.5L4.1 57.5Q5.4 57.5 6.1 57Q6.7 56.4 6.7 55.5Q6.7 54.5 6.1 53.9Q5.4 53.4 4.1 53.4" +
            "L1.9 53.4M13 62.1L11.1 62.1L11.1 51.8L15.3 51.8Q17.4 51.8 18.5 52.8Q19.7 53.7 19.7 55.5" +
            "Q19.7 56.6 19.2 57.4Q18.7 58.2 17.7 58.7Q17.6 58.7 17.5 58.7L19.9 62.1L17.8 62.1" +
            "L15.7 59.1Q15.5 59.1 15.3 59.1L13 59.1L13 62.1M13 53.4L13 57.5L15.2 57.5" +
            "Q16.5 57.5 17.1 57Q17.8 56.4 17.8 55.5Q17.8 54.5 17.1 53.9Q16.5 53.4 15.2 53.4L13 53.4" +
            "M27.1 62.2Q25.9 62.2 24.9 61.8Q23.9 61.5 23.1 60.7Q22.4 60 21.9 59.1Q21.5 58.1 21.5 57" +
            "Q21.5 55.8 21.9 54.8Q22.4 53.9 23.1 53.2Q23.9 52.4 24.9 52.1Q25.9 51.7 27.1 51.7" +
            "Q28.3 51.7 29.3 52.1Q30.3 52.4 31 53.2Q31.8 53.9 32.2 54.8Q32.6 55.8 32.6 57" +
            "Q32.6 58.1 32.2 59.1Q31.8 60 31 60.7Q30.3 61.5 29.3 61.8Q28.3 62.2 27.1 62.2M27.1 60.6" +
            "Q27.9 60.6 28.5 60.3Q29.2 60 29.7 59.5Q30.1 59.1 30.4 58.4Q30.7 57.7 30.7 57" +
            "Q30.7 56.2 30.4 55.5Q30.1 54.8 29.7 54.4Q29.2 53.9 28.5 53.6Q27.9 53.3 27.1 53.3" +
            "Q26.3 53.3 25.6 53.6Q25 53.9 24.5 54.4Q24 54.8 23.7 55.5Q23.5 56.2 23.5 57" +
            "Q23.5 57.7 23.7 58.4Q24 59.1 24.5 59.5Q25 60 25.6 60.3Q26.3 60.6 27.1 60.6M37 62.1" +
            "L35.1 62.1L35.1 51.8L39.3 51.8Q40.7 51.8 41.6 52.2Q42.6 52.7 43.2 53.5" +
            "Q43.7 54.3 43.7 55.5Q43.7 56.6 43.2 57.4Q42.6 58.2 41.6 58.7Q40.7 59.1 39.3 59.1L37 59.1" +
            "L37 62.1M37 53.4L37 57.5L39.2 57.5Q40.5 57.5 41.1 57Q41.8 56.4 41.8 55.5" +
            "Q41.8 54.5 41.1 53.9Q40.5 53.4 39.2 53.4L37 53.4M53.9 62.1L46.2 62.1L46.2 51.8L53.7 51.8" +
            "L53.7 53.4L48.1 53.4L48.1 56.1L53 56.1L53 57.7L48.1 57.7L48.1 60.5L53.9 60.5L53.9 62.1" +
            "M58.3 62.1L56.4 62.1L56.4 51.8L60.7 51.8Q62.7 51.8 63.9 52.8Q65.1 53.7 65.1 55.5" +
            "Q65.1 56.6 64.5 57.4Q64 58.2 63 58.7Q62.9 58.7 62.9 58.7L65.2 62.1L63.2 62.1L61.1 59.1" +
            "Q60.9 59.1 60.7 59.1L58.3 59.1L58.3 62.1M58.3 53.4L58.3 57.5L60.6 57.5Q61.8 57.5 62.5 57" +
            "Q63.1 56.4 63.1 55.5Q63.1 54.5 62.5 53.9Q61.8 53.4 60.6 53.4L58.3 53.4M71.6 62.1" +
            "L69.7 62.1L69.7 53.4L66.3 53.4L66.3 51.8L75 51.8L75 53.4L71.6 53.4L71.6 62.1M81.3 62.1" +
            "L79.4 62.1L79.4 58.5L75.4 51.8L77.4 51.8L80.4 56.8L83.5 51.8L85.3 51.8L81.3 58.5" +
            "L81.3 62.1M93.3 62.1L91.5 62.1L91.5 51.8L93.1 51.8L97.1 58.6L101.2 51.8L102.7 51.8" +
            "L102.7 62.1L100.9 62.1L100.9 55.3L97.5 60.9L96.7 60.9L93.3 55.4L93.3 62.1M106.5 62.1" +
            "L104.5 62.1L109.1 51.8L111 51.8L115.7 62.1L113.7 62.1L112.6 59.7L107.5 59.7L106.5 62.1" +
            "M108.1 58.2L112 58.2L110 53.7L108.1 58.2M119.3 62.1L117.4 62.1L117.4 51.8L119.3 51.8" +
            "L119.3 62.1M124.4 62.1L122.5 62.1L122.5 51.8L124.1 51.8L129.7 58.8L129.7 51.8L131.6 51.8" +
            "L131.6 62.1L130.1 62.1L124.4 55.1L124.4 62.1M138.8 62.1L136.9 62.1L136.9 53.4L133.5 53.4" +
            "L133.5 51.8L142.2 51.8L142.2 53.4L138.8 53.4L138.8 62.1M151.8 62.1L144.1 62.1L144.1 51.8" +
            "L151.6 51.8L151.6 53.4L146 53.4L146 56.1L151 56.1L151 57.7L146 57.7L146 60.5L151.8 60.5" +
            "L151.8 62.1M156.3 62.1L154.4 62.1L154.4 51.8L155.9 51.8L161.6 58.8L161.6 51.8L163.5 51.8" +
            "L163.5 62.1L161.9 62.1L156.3 55.1L156.3 62.1M167.2 62.1L165.2 62.1L169.9 51.8L171.7 51.8" +
            "L176.4 62.1L174.4 62.1L173.4 59.7L168.2 59.7L167.2 62.1M168.9 58.2L172.7 58.2L170.8 53.7" +
            "L168.9 58.2M180 62.1L178.1 62.1L178.1 51.8L179.7 51.8L185.4 58.8L185.4 51.8L187.3 51.8" +
            "L187.3 62.1L185.7 62.1L180 55.1L180 62.1M195.2 62.2Q194 62.2 193 61.9" +
            "Q192 61.5 191.3 60.8Q190.5 60 190.1 59.1Q189.7 58.1 189.7 57Q189.7 55.8 190.1 54.8" +
            "Q190.5 53.9 191.3 53.1Q192 52.4 193 52Q194 51.7 195.2 51.7Q196.5 51.7 197.5 52.1" +
            "Q198.6 52.5 199.3 53.4L198.1 54.5Q197.5 53.9 196.8 53.6Q196.1 53.3 195.3 53.3" +
            "Q194.5 53.3 193.8 53.6Q193.2 53.9 192.7 54.3Q192.2 54.8 191.9 55.5Q191.6 56.2 191.6 57" +
            "Q191.6 57.7 191.9 58.4Q192.2 59.1 192.7 59.6Q193.2 60 193.8 60.3Q194.5 60.6 195.3 60.6" +
            "Q196.1 60.6 196.8 60.3Q197.5 60 198.1 59.3L199.3 60.5Q198.6 61.4 197.5 61.8" +
            "Q196.5 62.2 195.2 62.2M209.1 62.1L201.4 62.1L201.4 51.8L208.9 51.8L208.9 53.4L203.3 53.4" +
            "L203.3 56.1L208.3 56.1L208.3 57.7L203.3 57.7L203.3 60.5L209.1 60.5L209.1 62.1"
          }
        />
        <polyline
          id="rc-logo-leaf"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeMiterlimit="8"
          points="206.7 13.9 205.2 6.4 206.7 5.4 209.3 1.5 211.4 4.5 213.9 4.2 216.1 8.6 218.3 5.8 220.2 2 222.7 2.9 226.7 2.3 227.1 5.1 229.9 8.6 227.3 10.4 223.6 15.1 228.9 16.4 232.1 19.8 228.3 24.2 221.7 24.5"
        />
      </defs>
    </svg>
  );
}
