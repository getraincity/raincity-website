/**
 * Photo registry — the single source of truth for every image on the site.
 *
 * Replacing stock with RainCity's own job photography is a one-file edit:
 * swap `src` (and `credit`) for each slot and everything downstream updates.
 *
 * Sourced from Unsplash. Several of the eleven services have no genuine
 * "crew performing the work" photograph available, so those slots use the
 * subject or the finished result instead of a staged substitute — see the
 * `note` field on each.
 */

export type PhotoRatio = "16:9" | "16:10" | "7:5" | "4:5" | "3:2" | "1:1";

export type Photo = {
  /** Full source URL. */
  src: string;
  /** Descriptive alt text. Never decorative — every photo carries meaning. */
  alt: string;
  /** Photographer, for attribution. */
  credit: string;
  /** Dominant colour, used for the blur-up placeholder. */
  tone: string;
  /** Intended crop ratio per the design system's photography table. */
  ratio: PhotoRatio;
  /** object-position, for holding the subject when the crop tightens. */
  focal?: string;
  /** Why this frame was chosen, or what real photo should replace it. */
  note?: string;
};

const unsplash = (id: string, width = 2000) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${width}&q=80`;

/** A flat-tone placeholder in the photo's dominant colour, for blur-up. */
export function tonePlaceholder(tone: string): string {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="8" height="8"><rect width="8" height="8" fill="${tone}"/></svg>`;
  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
}

export const photos = {
  hero: {
    src: unsplash("photo-1776142380514-2c264a38f263", 2560),
    alt: "Suburban homes set among tall evergreens under low coastal fog — the kind of Greater Vancouver property RainCity maintains year-round.",
    credit: "Anastasiia",
    tone: "#262626",
    ratio: "16:9",
    focal: "70% 55%",
    note: "Shot in Canada. Residential, evergreen, fogbound — the Greater Vancouver property this business actually maintains, in the weather that creates the work. Alternate: photo-1768333220836-26309aacd3db (Ali Kazal, a foggy residential street in Victoria BC) if a lighter, hazier frame is wanted.",
  },

  aboutCrew: {
    src: "/about-section-picture.jpg",
    alt: "A RainCity crew re-roofing a heritage house on a clear day: one worker on a ladder at the ridge, others laying underlay across the porch roof, stripped shingles bagged on tarps below.",
    credit: "RainCity Property Maintenance",
    tone: "#7fa3bf",
    // Source is 1445 x 1017 (1.42:1). 7:5 is 1.40, so the crop costs about
    // 1.5% of the width — the frame arrives essentially as shot.
    ratio: "7:5",
    focal: "46% 50%",
    note: "RainCity's own photograph, so no third-party attribution is owed. Held slightly high in the frame: the crew and roofline are the subject, the tarps and offcuts along the bottom edge are the first thing worth losing when the crop tightens.",
  },

  truck: {
    src: unsplash("photo-1641199788912-9a7385a35c82", 1600),
    alt: "A white panel van of the kind RainCity works out of, parked at the kerb outside a brick building.",
    credit: "Mathias Reding",
    tone: "#c0c0c0",
    ratio: "1:1",
    focal: "50% 50%",
    note: "Stands in for the branded truck in a strata driveway. Swap for a signage shot once the fleet is wrapped. Carried at full column width on /about, where it stands for the fact that this is a mobile business with no storefront — the alt text was tightened for that, because at that size 'a residential street' is visibly not what the frame shows.",
  },

  // --- About page ----------------------------------------------------------

  aboutHero: {
    src: "/about-us-hero-background.png",
    alt: "A single-family Greater Vancouver home with a grey composite roof, tucked among mature evergreens behind a trimmed hedge and paved walkway.",
    credit: "RainCity Property Maintenance",
    tone: "#4f5f3f",
    ratio: "16:9",
    focal: "70% 62%",
    note: "About page hero banner, rendered with `fill` so this ratio is nominal only. Focal keeps the house (right two-thirds of the frame, extending to the bottom edge) in view rather than the tree canopy that fills the upper-left.",
  },

  aboutWhoWeAre: {
    src: "/about-us-who-we-are-section-background.png",
    alt: "A RainCity technician silhouetted against a bright sky, running a pressure-washing wand along a rooftop edge.",
    credit: "RainCity Property Maintenance",
    tone: "#a9c8e0",
    ratio: "1:1",
    focal: "46% 50%",
    note: "Who We Are figure on /about. Source is 2530x1948 (1.3:1); cropped to the card's 1:1, the frame keeps its full height and loses only the outer ~12% of width, so the horizontal focal barely matters — set to hold the technician just left of centre.",
  },

  aboutProcess: {
    src: "/about-us-our-process-section-background.png",
    alt: "A smiling RainCity technician in a navy apron holding a spray bottle and a folded microfiber cloth.",
    credit: "RainCity Property Maintenance",
    tone: "#f0eee8",
    ratio: "7:5",
    focal: "50% 40%",
    note: "Our Process figure on /about. Source is 2530x1948 (1.3:1) against the section's 7:5 (1.4:1) crop, so the top/bottom lose about 7% combined; focal is held slightly high to keep the face clear of the crop.",
  },

  servicesHero: {
    src: "/our-services-hero-background.png",
    alt: "A RainCity technician on a tiled Greater Vancouver roof running a pressure-washing wand across a row of solar panels under a clear blue sky.",
    credit: "RainCity Property Maintenance",
    tone: "#9ec3e2",
    ratio: "16:9",
    focal: "54% 30%",
    note: "Services page hero banner, rendered with `fill` so this ratio is nominal only. Focal holds the technician and roofline in the upper-centre of the frame, leaving the sky (left of the subject) as the quiet ground the heading sits over.",
  },

  servicesOffer: {
    src: "/what-we-offer-section-background.png",
    alt: "A cleaner in rubber gloves carefully wiping down a blackout curtain beside a sunlit window.",
    credit: "RainCity Property Maintenance",
    tone: "#5b6570",
    ratio: "7:5",
    focal: "50% 40%",
    note: "What We Offer figure on /services. Source is 2530x1948 (1.3:1) against the section's 7:5 (1.4:1) crop, so the top/bottom lose about 7% combined; focal is held slightly high to keep the face clear of the crop.",
  },

  rooftops: {
    src: unsplash("photo-1762359365240-8c96c225165a", 2000),
    alt: "Residential rooftops and evergreens under a low, overcast Pacific Northwest sky.",
    credit: "T",
    tone: "#a6a6a6",
    ratio: "3:2",
    focal: "50% 60%",
    note: "The Pacific Northwest weather that creates the work in the first place.",
  },

  // --- Recent projects -----------------------------------------------------
  // Illustrative pairs, captioned as such. Materials are matched within each
  // pair (roof to roof, concrete to concrete) so the comparison is fair; they
  // are not the same property, and the section says so.

  roofClean: {
    src: unsplash("photo-1590365876016-da05ac533e83", 1600),
    alt: "An asphalt-shingle roof after cleaning, free of moss and debris.",
    credit: "Yucel M",
    tone: "#595959",
    ratio: "3:2",
    focal: "50% 50%",
  },

  roofMossy: {
    src: unsplash("photo-1564783679669-f5391270417b", 1600),
    alt: "A tile roof carpeted in moss before cleaning, the tiles barely visible beneath it.",
    credit: "Nick Kane",
    tone: "#7a6a55",
    ratio: "3:2",
    focal: "50% 50%",
    note: "Held for the Projects before/after pair. The roofCleaning slot now carries RainCity's own finished-work photograph, which cannot double as a 'before'.",
  },

  mossyConcrete: {
    src: unsplash("photo-1604420379461-7c7613cd5815", 1600),
    alt: "Concrete steps overgrown with moss and algae before pressure washing.",
    credit: "Vianney Cahen",
    tone: "#26260c",
    ratio: "3:2",
    focal: "50% 50%",
  },

  // --- Service cards -------------------------------------------------------

  commercialCleaning: {
    src: "/services/commercial-cleaning.webp",
    alt: "Commercial cleaning: a worker running a floor squeegee across the tiled floor of a commercial kitchen.",
    credit: "RainCity Property Maintenance",
    tone: "#8f8b86",
    ratio: "4:5",
    focal: "50% 50%",
  },

  powerWashing: {
    src: "/services/power-washing.webp",
    alt: "Power washing: a technician in waterproofs washing down exterior stonework with a pressure lance.",
    credit: "RainCity Property Maintenance",
    tone: "#7d8896",
    ratio: "4:5",
    focal: "46% 50%",
  },

  softWashing: {
    src: unsplash("photo-1721620780493-e905708eba0b", 2000),
    alt: "Soft washing: an operative running a water-fed pole with a soft brush head down the exterior of a brick house, water sheeting off the surface.",
    credit: "Joshua Bowers",
    tone: "#8d8378",
    ratio: "4:5",
    focal: "45% 50%",
    note: "Unsplash has no photograph of a residential soft wash in progress. This is the closest true depiction of the method — water-fed pole, soft brush, low-pressure flow rather than a jet — which is exactly the distinction the blurb draws against Power Washing. Two caveats for whoever replaces it: the frame is a window rather than siding or a roof, and the operative's sweatshirt carries another cleaning company's mark, faded and illegible at card size but present. A RainCity soft-wash job photo on siding or a roof should replace this before it is enlarged anywhere.",
  },

  concreteSealing: {
    src: "/services/concrete-sealing.webp",
    alt: "Concrete sealing: a sealed concrete walkway curving past planting beside a modern building.",
    credit: "RainCity Property Maintenance",
    tone: "#a9a49e",
    ratio: "4:5",
    focal: "50% 50%",
    note: "Held for the Projects before/after pair only. The service card for sealing now uses `concreteAsphaltSealing`, which is the sharper and more representative of the two frames.",
  },

  concreteAsphaltSealing: {
    src: "/services/concrete-and-asphalt-sealing.webp",
    alt: "Concrete and asphalt sealing: a sealed stamped-concrete driveway sweeping up to the garage of a suburban home.",
    credit: "RainCity Property Maintenance",
    tone: "#b9a48c",
    ratio: "4:5",
    focal: "52% 50%",
    note: "Reused from the former Driveway Sealing slot when that service merged with Concrete Sealing. Chosen over the old concrete-sealing frame on resolution alone — 1600x966 against 550x442 — and it reads as a finished driveway at card size, where the walkway shot reads as street furniture. It shows concrete; a job photo of a sealed asphalt lot would let the card carry both halves of its title.",
  },

  windowCleaning: {
    src: "/services/window-cleaning.webp",
    alt: "Window cleaning: a cleaner wiping down a full-height interior pane, a colleague working the next bay.",
    credit: "RainCity Property Maintenance",
    tone: "#cfd4d8",
    ratio: "4:5",
    focal: "62% 50%",
  },

  gutterCleaning: {
    src: "/services/gutter-cleaning.webp",
    alt: "Gutter cleaning: a worker at the top of a ladder lifting leaf litter out of a roof gutter into a paper garden sack.",
    credit: "RainCity Property Maintenance",
    tone: "#6f8f4e",
    ratio: "4:5",
    focal: "58% 50%",
  },

  roofCleaning: {
    src: "/services/roof-cleaning.webp",
    alt: "Roof cleaning: a worker on a pitched tile roof washing the surface down alongside a run of solar panels.",
    credit: "RainCity Property Maintenance",
    tone: "#8fa8bd",
    ratio: "4:5",
    focal: "50% 45%",
  },

  painting: {
    src: unsplash("photo-1613844044163-1ad2f2d0b152", 2000),
    alt: "Painting: a decorator on a stepladder cutting in around a window on the white rendered exterior of a house.",
    credit: "Flow Clark",
    tone: "#dfe6ec",
    // Source is 4898 x 3266, a true 3:2, so the card renders it uncropped.
    // The 4:5 declaration is for the portrait slots the other service photos
    // fill; focal holds the decorator when the crop tightens to it.
    ratio: "4:5",
    focal: "42% 50%",
    note: "A real decorator working a real facade in daylight, which is the register the rest of the service photography sits in. Preferred over the alternatives Unsplash offers: a studio-lit painter against a seamless backdrop, and a rope-access painter working barefoot without a harness — the second reads as unsafe practice on the site of a licensed and insured contractor.",
  },

  snowRemoval: {
    src: "/services/snow-removal-and-salting.webp",
    alt: "Snow removal: an operator running a snowblower along a path, snow arcing away from the auger.",
    credit: "RainCity Property Maintenance",
    tone: "#d5dde3",
    ratio: "4:5",
    focal: "38% 50%",
  },

  holidayLights: {
    src: "/services/holiday-light-installation.webp",
    alt: "Holiday light installation: a house outlined in festive lights at dusk, roofline, porch and planting all strung.",
    credit: "RainCity Property Maintenance",
    tone: "#2a2438",
    ratio: "4:5",
    focal: "50% 50%",
  },

  landscaping: {
    src: "/services/landscaping-and-lawn-care.webp",
    alt: "Landscaping and lawn care: a clipped shrub and flowering border standing above a freshly cut lawn.",
    credit: "RainCity Property Maintenance",
    tone: "#6d8a4f",
    ratio: "4:5",
    focal: "40% 50%",
  },
} as const satisfies Record<string, Photo>;

export type PhotoKey = keyof typeof photos;
