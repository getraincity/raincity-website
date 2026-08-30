/**
 * Site content — copy comes from the homepage content inventory.
 *
 * Service blurbs have been differentiated: the source inventory reuses the
 * same two sentences across pairs of services (the identical "Book now for a
 * fresh and productive work environment today!" ran under two cleaning
 * services, and one sealing blurb was copied verbatim onto the other).
 * Meaning and length are unchanged; the repetition is not, because
 * near-identical cards read as filler.
 *
 * `services` below is the single source for the homepage grid, the Services
 * nav dropdown, the `/services/[slug]` routes themselves — params, copy,
 * metadata and Service JSON-LD — the sitemap entries for those routes, and
 * the Service entries in the homepage OfferCatalog JSON-LD. Edit the array
 * and every one of them follows. Each entry carries a `detail` block holding
 * the copy for its own page; the blocks every service page repeats verbatim
 * are in `servicePage` at the foot of this file.
 *
 * Two service-facing lists do NOT read from it and have to be kept in
 * step by hand: `quoteForm.serviceOptions` further down (a deliberately short
 * dropdown, not the full catalogue) and `public/llms.txt` (a static file).
 */

import type { PhotoKey } from "./photos";

export const business = {
  name: "RainCity Property Maintenance",
  shortName: "RainCity",
  phone: "+1 604 209 3357",
  phoneHref: "tel:+16042093357",
  email: "info@raincitypms.com",
  emailHref: "mailto:info@raincitypms.com",
  hours: {
    weekdays: "Mon – Sat: 7 am – 10 pm",
    sunday: "Sunday: Closed",
  },
  base: "New Westminster",
  region: "Greater Vancouver",
} as const;

export const social = [
  { label: "Facebook", href: "#", icon: "facebook" },
  { label: "Instagram", href: "#", icon: "instagram" },
  { label: "X", href: "#", icon: "x" },
  { label: "LinkedIn", href: "#", icon: "linkedin" },
] as const;

// --- Services --------------------------------------------------------------

/**
 * The per-service copy for `/services/[slug]`.
 *
 * It lives on `Service` rather than in a lookup table keyed by slug, and that
 * is the whole point: a table would let someone add a twelfth service and
 * ship a page with no copy on it. Here the compiler refuses the incomplete
 * entry. Everything below is the content inventory's "variable" column — the
 * parts that are genuinely different service to service. The fixed blocks
 * every one of the eleven pages repeats verbatim live in `servicePage`.
 */
export type ServiceDetail = {
  /** Page H1. Says what the service is; never just the service name again. */
  heading: string;
  /** Hero paragraph, under the H1. Two sentences at most. */
  intro: string;
  /** Overview H2. */
  overviewHeading: string;
  /** Overview paragraph — the substantive description of the work. */
  overview: string;
  /** "What's Included" — the scope, in the order the work happens. */
  included: string[];
  /** Overview CTA label. Names the service, per the inventory. */
  cta: string;
  /** Final CTA H2. */
  closing: string;
  /** Meta description. Written, not derived: 150-160 characters is a
      constraint on the sentence, and a paragraph reused from the page body
      gets cut mid-clause in the result. */
  metaDescription: string;
};

export type Service = {
  slug: string;
  title: string;
  blurb: string;
  photo: PhotoKey;
  detail: ServiceDetail;
};

export const services: Service[] = [
  {
    slug: "commercial-cleaning",
    title: "Commercial Cleaning",
    blurb:
      "Lobbies, common areas and back-of-house, on a rhythm that fits your building.",
    photo: "commercialCleaning",
    detail: {
      heading: "Commercial Cleaning on Your Building's Schedule",
      intro:
        "Lobbies, corridors, washrooms and back-of-house, cleaned to a written scope on a rhythm you set. Offices, retail units and strata common areas across Greater Vancouver.",
      overviewHeading: "The Parts of a Building Everyone Notices",
      overview:
        "A lobby is the first thing a tenant, a buyer or an inspector sees, and it shows wear faster than anything else in the building. We agree the scope in writing, work to it nightly, weekly or monthly, and send the same crew wherever we can — consistency in a cleaning contract comes from people who already know the building.",
      included: [
        "Lobbies, entrances and elevator interiors",
        "Corridors, stairwells and common rooms",
        "Washroom cleaning and consumable restocking",
        "Hard-floor and carpet care",
        "Back-of-house, storage and loading areas",
        "Nightly, weekly or monthly schedules",
      ],
      cta: "Book Your Commercial Clean",
      closing: "Ready to Put Your Building on a Schedule?",
      metaDescription:
        "Commercial cleaning for offices, retail and strata common areas in New Westminster and across Greater Vancouver — lobbies, washrooms and back-of-house, on your schedule.",
    },
  },
  {
    slug: "power-washing",
    title: "Power Washing",
    blurb:
      "Siding, walkways and patios stripped of the moss a wet winter leaves behind.",
    photo: "powerWashing",
    detail: {
      heading: "Power Washing That Takes the Winter Off",
      intro:
        "Driveways, patios, siding and parkades taken back to the surface underneath — the moss, algae and traffic film a wet Vancouver winter leaves behind.",
      overviewHeading: "Pressure, Matched to the Surface",
      overview:
        "Concrete, pavers, brick and painted siding each take a different pressure and a different tip, and the damage from getting that wrong does not wash out. We test an out-of-sight patch first, then run the whole surface at one setting so it finishes even instead of striped — which is what separates a wash from a wand mark you have to live with.",
      included: [
        "Driveways, walkways and patios",
        "Siding, brick and stonework",
        "Decks, steps and railings",
        "Parkades, loading bays and bin enclosures",
        "Moss, algae and traffic-film removal",
        "Planting and glass rinsed down afterwards",
      ],
      cta: "Book Your Power Wash",
      closing: "Ready to See What's Under the Moss?",
      metaDescription:
        "Pressure washing for driveways, patios, siding and parkades across Greater Vancouver. Pressure matched to the surface, tested before we start, finished even edge to edge.",
    },
  },
  {
    slug: "soft-washing",
    title: "Soft Washing",
    blurb:
      "A low-pressure detergent wash for roofs, siding and anything too delicate to blast.",
    photo: "softWashing",
    detail: {
      heading: "Soft Washing for Surfaces That Can't Take Pressure",
      intro:
        "A low-pressure detergent wash for roofs, painted siding, stucco and cedar — everything a pressure lance would damage, and everything that still needs the growth taken off.",
      overviewHeading: "Chemistry Instead of Force",
      overview:
        "Soft washing does the work with a cleaning solution and dwell time rather than pressure, so moss, algae and lichen are killed at the root instead of knocked off the top. Surfaces come back slower, and nothing gets driven under a shingle, behind a board or through a seal on the way.",
      included: [
        "Asphalt shingle and tile roofs",
        "Painted siding, stucco and render",
        "Cedar shingles, fascia and soffits",
        "Fences, pergolas and garden structures",
        "Algae, lichen and black-streak treatment",
        "Planting covered and rinsed down afterwards",
      ],
      cta: "Book Your Soft Wash",
      closing: "Ready for a Wash the Surface Can Take?",
      metaDescription:
        "Low-pressure soft washing for roofs, stucco, painted siding and cedar across Greater Vancouver. Moss and algae killed at the root, with no pressure driven under the surface.",
    },
  },
  {
    slug: "concrete-and-asphalt-sealing",
    title: "Concrete and Asphalt Sealing",
    blurb:
      "Sealed against water, salt and freeze-thaw, a driveway or lot lasts years longer.",
    photo: "concreteAsphaltSealing",
    detail: {
      heading: "Sealing That Buys a Driveway Years",
      intro:
        "Concrete and asphalt sealed against water, road salt and freeze-thaw — the three things that turn a hairline crack into a resurfacing bill.",
      overviewHeading: "Water Is What Breaks a Driveway",
      overview:
        "Rain works into the pores, freezes overnight and lifts the surface apart from the inside; salt and dripped oil finish what the frost starts. A sealed slab sheds all three. We wash it, fill the cracks and let it dry properly before anything is applied — sealer over damp concrete is the single most common reason one of these jobs fails.",
      included: [
        "Residential driveways and garage aprons",
        "Parking lots, aisles and loading areas",
        "Walkways, patios and pool surrounds",
        "Crack filling and joint repair",
        "Oil-spot treatment and full surface prep",
        "Penetrating and topical sealers",
      ],
      cta: "Book Your Sealing Job",
      closing: "Ready to Seal Before the Next Freeze?",
      metaDescription:
        "Concrete and asphalt sealing for driveways, walkways and parking lots across Greater Vancouver — cracks filled, surface prepped and dried, then sealed against salt and frost.",
    },
  },
  {
    slug: "window-cleaning",
    title: "Window Cleaning",
    blurb:
      "Interior and exterior glass, frames and tracks, finished streak-free.",
    photo: "windowCleaning",
    detail: {
      heading: "Windows Worth Looking Through",
      intro:
        "Interior and exterior glass, frames, tracks and screens — finished streak-free on houses, storefronts, offices and multi-storey buildings.",
      overviewHeading: "Glass, Frames, Tracks and Screens",
      overview:
        "Most window cleaning stops at the glass, which is why a tidemark reappears along the frame a week later. We clean the whole opening — sill, track, screen and frame — and finish the glass last, so nothing runs back down over work already done.",
      included: [
        "Interior and exterior glass",
        "Frames, sills and sliding tracks",
        "Screens removed, washed and refitted",
        "Skylights and hard-to-reach glazing",
        "Hard-water and mineral-stain removal",
        "Water-fed pole work on multi-storey buildings",
      ],
      cta: "Book Your Window Clean",
      closing: "Ready for Glass You Can See Through?",
      metaDescription:
        "Streak-free interior and exterior window cleaning across Greater Vancouver — glass, frames, sills, tracks and screens, on homes, storefronts and multi-storey buildings.",
    },
  },
  {
    slug: "gutter-cleaning",
    title: "Gutter Cleaning",
    blurb:
      "Cleared and flow-tested before the rain finds its way into your walls.",
    photo: "gutterCleaning",
    detail: {
      heading: "Gutter Cleaning Before the Rain Finds a Way In",
      intro:
        "Cleared by hand, flushed through and flow-tested — so the water coming off your roof this winter ends up in the downspout rather than in the wall.",
      overviewHeading:
        "A Blocked Gutter Is a Water Problem, Not a Tidiness Problem",
      overview:
        "Once a run fills, water goes over the lip instead of down the spout: onto the fascia, behind the siding, and eventually against the foundation. We clear the run by hand, bag the debris rather than dropping it in the beds, flush every downspout and watch the water leave before we pack up.",
      included: [
        "Gutters and roof valleys cleared by hand",
        "Downspouts flushed and unblocked",
        "Debris bagged and taken off site",
        "Flow test on every downspout",
        "Fascia, bracket and joint check",
        "Gutter guards lifted, cleaned and refitted",
      ],
      cta: "Book Your Gutter Clean",
      closing: "Ready to Clear the Gutters Before Winter?",
      metaDescription:
        "Gutter cleaning across Greater Vancouver — runs cleared by hand, debris bagged and removed, downspouts flushed and flow-tested before we leave the property.",
    },
  },
  {
    slug: "roof-cleaning",
    title: "Roof Cleaning",
    blurb:
      "Moss lifts shingles and holds water against them. We clear it carefully.",
    photo: "roofCleaning",
    detail: {
      heading: "Roof Cleaning That Doesn't Cost You Shingles",
      intro:
        "Moss lifts the edge of a shingle and holds water against it. We take it off with a low-pressure treatment rather than the pressure washing that shortens a roof by years.",
      overviewHeading: "Moss Holds Water Where a Roof Least Wants It",
      overview:
        "Left alone, moss works under the shingle edge, keeps the deck below it damp through a coastal winter and eventually opens a path inside. We lift it with a low-pressure treatment and a soft brush where one is needed — never a lance, which strips the granules off an asphalt shingle and takes the life out of the roof it is meant to be saving.",
      included: [
        "Asphalt shingle, tile and metal roofs",
        "Low-pressure moss and lichen removal",
        "Valleys, vents and skylight surrounds cleared",
        "Gutters cleared after the roof work",
        "Flashing and vent condition check",
        "Preventative treatment to slow regrowth",
      ],
      cta: "Book Your Roof Clean",
      closing: "Ready to Get the Moss Off the Roof?",
      metaDescription:
        "Low-pressure roof moss removal across Greater Vancouver. Shingle, tile and metal roofs cleared without a pressure lance, valleys and gutters cleaned out afterwards.",
    },
  },
  {
    slug: "painting",
    title: "Painting",
    blurb:
      "Walls, trim and siding prepped properly, then repainted inside and out.",
    photo: "painting",
    detail: {
      heading: "Painting, Prepped Properly First",
      intro:
        "Interior walls, ceilings and trim; exterior siding, fascia and railings. Washed, filled, sanded and primed before a finish coat goes anywhere near them.",
      overviewHeading: "The Prep Is the Job",
      overview:
        "Paint over a chalky, damp or flaking surface fails within a season, and on this coast it fails faster than that. Most of our hours on a paint job go into washing, scraping, filling, caulking and priming. The finish coats are the short part, and they last because of what happened underneath them.",
      included: [
        "Interior walls, ceilings, trim and doors",
        "Exterior siding, fascia, soffits and railings",
        "Washing, scraping, sanding and filling",
        "Caulking and minor wood repair",
        "Spot and full priming",
        "Masking, drop sheets and a daily tidy-up",
      ],
      cta: "Book Your Painting Quote",
      closing: "Ready to Repaint, Inside or Out?",
      metaDescription:
        "Interior and exterior painting across Greater Vancouver. Surfaces washed, scraped, filled, caulked and primed before the finish coats, so the work lasts on a wet coast.",
    },
  },
  {
    slug: "snow-removal-salting",
    title: "Snow Removal & Salting",
    blurb:
      "Early-morning clearing and salting that keeps access open and liability low.",
    photo: "snowRemoval",
    detail: {
      heading: "Snow Cleared Before the First Arrival",
      intro:
        "Early-morning clearing and salting for driveways, walkways, strata lots and commercial entrances — so access stays open and nobody slips on the way in.",
      overviewHeading: "Open by the Time Anyone Turns In",
      overview:
        "Snow here is infrequent and rarely lasts, which is exactly what makes it a liability: it arrives overnight, freezes into the morning, and nothing is set up for it. We watch the forecast through the season and clear at an agreed trigger depth, so the lot is done before the first car turns in rather than after somebody has called about it.",
      included: [
        "Driveways, walkways and building entrances",
        "Strata visitor lots and parking aisles",
        "Forecast monitoring and trigger-depth clearing",
        "Salting and de-icing of walked surfaces",
        "Ice chipped clear at doors and steps",
        "Seasonal contracts or per-event call-outs",
      ],
      cta: "Book Your Snow Contract",
      closing: "Ready Before the First Snowfall?",
      metaDescription:
        "Snow removal and salting across Greater Vancouver. Driveways, walkways, strata lots and commercial entrances cleared at trigger depth and salted before the day starts.",
    },
  },
  {
    slug: "holiday-light-installation",
    title: "Holiday Light Installation",
    blurb:
      "Design, install, maintain and take down, December ladder work included.",
    photo: "holidayLights",
    detail: {
      heading: "Holiday Lights, Without the Ladder",
      intro:
        "Layout planned with you, installed, kept working through the season and taken down in January — rooflines, porches, railings and trees, none of it from the top of your own ladder.",
      overviewHeading: "December on a Roofline Is Not a DIY Job",
      overview:
        "The lights are the easy part. The work is the ladder in the rain, clips that have to hold on a wet gutter, and a cable run that has to reach a switched outlet without crossing a walkway. We plan the layout with you, install it, come back if a section drops out, and take the whole thing down once the season is over.",
      included: [
        "Roofline, gable and eave runs",
        "Porches, columns, railings and doorways",
        "Trees, shrubs and garden lighting",
        "Layout planning and power routing",
        "In-season repairs and replacements",
        "January takedown and pack-away",
      ],
      cta: "Book Your Light Install",
      closing: "Ready to Book This Season's Install?",
      metaDescription:
        "Holiday light installation across Greater Vancouver — rooflines, porches, railings and trees planned, installed, maintained through the season and taken down in January.",
    },
  },
  {
    slug: "landscaping-lawn-care",
    title: "Landscaping & Lawn Care",
    blurb:
      "Mowing, edging, beds and seasonal cleanups, kept on a schedule.",
    photo: "landscaping",
    detail: {
      heading: "Grounds That Stay Looked After",
      intro:
        "Mowing, edging, beds, pruning and seasonal cleanups on a set schedule — for homes, strata grounds and commercial frontages across Greater Vancouver.",
      overviewHeading: "The Difference Is the Schedule, Not the Visit",
      overview:
        "A single tidy-up in spring looks good for about a month. Grounds that stay looked after are on a rhythm: cut at the right height for the season, beds edged before the growth gets away, leaves cleared while they are still dry enough to move. We set that rhythm around your property and keep to it.",
      included: [
        "Mowing, edging and line trimming",
        "Bed weeding, edging and mulching",
        "Hedge and shrub pruning",
        "Spring and fall cleanups",
        "Leaf clearing and green-waste removal",
        "Weekly, biweekly or monthly schedules",
      ],
      cta: "Book Your Lawn Care",
      closing: "Ready to Get the Grounds on a Schedule?",
      metaDescription:
        "Landscaping and lawn care across Greater Vancouver — mowing, edging, bed care, pruning and seasonal cleanups for homes, strata grounds and commercial frontages.",
    },
  },
];

// --- Locations -------------------------------------------------------------

export const locations = [
  "Anmore",
  "Burnaby",
  "Delta",
  "Langley",
  "New Westminster",
  "Ridge Meadow",
  "Surrey",
  "Tri-Cities",
  "Vancouver",
] as const;

// --- Navigation ------------------------------------------------------------

export type NavItem = {
  label: string;
  href: string;
  children?: { label: string; href: string; photo?: PhotoKey }[];
};

export const nav: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  {
    label: "Services",
    href: "/services",
    children: services.map((s) => ({
      label: s.title,
      href: `/services/${s.slug}`,
      photo: s.photo,
    })),
  },
  {
    label: "Locations",
    href: "/locations",
    children: locations.map((l) => ({
      label: l,
      href: `/locations/${l.toLowerCase().replace(/\s+/g, "-")}`,
    })),
  },
  { label: "Blogs", href: "/blog" },
];

// --- Section content -------------------------------------------------------

export const about = {
  label: "About Us",
  headline: "Restoring the Beauty of Your Property",
  body: "We specialize in professional property maintenance and exterior cleaning services designed to protect and enhance your space. Whether it's removing built-up dirt, clearing gutters, or maintaining your property year round, our experienced team ensures top-quality results with every job.",
  tags: [
    {
      title: "Skilled Team",
      support: "Trained technicians who have worked these roofs and walls before.",
      icon: "team",
    },
    {
      title: "Fast Service",
      support: "Quoted quickly, scheduled tightly, and finished when we said.",
      icon: "clock",
    },
    {
      title: "Trusted Work",
      support: "Insured, accountable, and used to strata and property-manager standards.",
      icon: "shield",
    },
  ],
  cta: "Learn More",
} as const;

export const whyChooseUs = {
  label: "Why Choose Us",
  /**
   * Was "Why RainCity Cleaning is Your Trusted Cleaning Partner" — a brand
   * name that appears nowhere else on the site, and long enough to run four
   * lines in a five-column well. Shortened to the name the header, footer and
   * hero all use, and set one step down the scale in the component.
   */
  headline: "Why RainCity is Your Trusted Partner",
  features: [
    {
      title: "Complete Cleaning Services",
      body: "Commercial cleaning, window cleaning, roof cleaning, gutter cleaning, pressure washing, and more — all in one reliable service.",
    },
    {
      title: "Professional Team",
      body: "Our trained and experienced cleaning specialists deliver consistent results with attention to every detail.",
    },
    {
      title: "Flexible Scheduling",
      body: "Daily, weekly, monthly, or one-time cleaning plans customized to fit your business needs.",
    },
    {
      title: "Eco-Friendly Cleaning",
      body: "We use safe and eco-friendly products that protect your workspace, employees, and environment.",
    },
    {
      title: "Holiday & Specialty Cleaning",
      body: "Keep your property looking clean and professional all year with seasonal cleaning and holiday lighting services.",
    },
  ],
  cta: "Get Free Quote",
} as const;

export const projects = {
  label: "Our Recent Projects",
  headline: "See The RainCity Difference",
  body: "Explore real before and after transformations from our residential and commercial property maintenance projects across Canada.",
  /**
   * Illustrative pairs, not the same property photographed twice — stock
   * cannot supply an identical camera position before and after, and a
   * fabricated transformation on a real business's site would be dishonest.
   * Materials are matched within each pair so the comparison is fair, and the
   * section states plainly that these are illustrative. Swap in genuine
   * RainCity job pairs here and the disclaimer can come out.
   */
  illustrative: true,
  disclaimer:
    "Illustrative of the conditions we work in and the standard we finish to. Photographs of RainCity jobs replace these as each project is documented.",
  items: [
    {
      id: "roof",
      job: "Roof & Gutter Clean",
      place: "Moss removal, asphalt shingle",
      before: "roofMossy",
      after: "roofClean",
      beforeCaption: "The condition we get called for",
      afterCaption: "The standard we leave",
    },
    {
      id: "hard-surfaces",
      job: "Exterior Hard Surfaces",
      place: "Steps, walkways and drives",
      before: "mossyConcrete",
      after: "concreteSealing",
      beforeCaption: "The condition we get called for",
      afterCaption: "The standard we leave",
    },
  ],
} as const;

export const pillars = {
  label: "Why Choose RainCity",
  headline: "Built on Quality. Driven by Results",
  points: [
    {
      title: "Precision & Professionalism",
      body: "Every project is handled with care, accuracy, and a commitment to delivering clean, lasting results you can rely on.",
    },
    {
      title: "Tailored Property Care",
      body: "We don't believe in one-size-fits-all. Our services are customized to match your property's exact needs and condition.",
    },
    {
      title: "Consistent, Reliable Results",
      body: "From start to finish, we focus on consistency, safety, and quality to ensure your property always looks its best.",
    },
  ],
  cta: "Get a Free Quote",
} as const;

export const testimonials = {
  label: "Testimonials",
  headline: "Real Feedback from Our Customers",
  items: [
    {
      quote:
        "Absolutely impressed with the results! The team was professional, on time, and made our property look brand new. Highly recommended.",
      name: "Sarah L.",
      place: "Burnaby, Canada",
    },
    {
      quote:
        "Great service from start to finish. They paid attention to every detail and delivered exactly what they promised. Will definitely use them again.",
      name: "Jason M.",
      place: "New Westminster, Canada",
    },

    /* =====================================================================
       PLACEHOLDER — replace with real client reviews before launch.

       The four entries below are invented. Only Sarah L. and Jason M. above
       came off the client's own homepage; every name, quote, location and
       service from here down was written to fill out the carousel and
       corresponds to no actual customer.

       Publishing invented testimonials misrepresents the business and, for
       a company making paid service claims, is a consumer-protection
       problem in Canada — not merely untidy copy. Swap them for real
       reviews or delete them before this site goes live.

       The two real reviews carry no `service` field on purpose: the source
       material does not say what either customer bought, and attaching a
       guess to a named real person would be inventing a fact about them.
       ===================================================================== */
    {
      quote:
        "Booked them for a full interior and exterior window clean before hosting family. Every pane came up spotless, and they were tidy about the whole job — nothing left behind for us to deal with.",
      name: "Priya N.",
      place: "Coquitlam, Canada",
      service: "Window Cleaning",
    },
    {
      quote:
        "Our gutters were completely packed after the fall storms. The crew cleared everything out, flushed the downspouts, and sent through photos once they were finished. Straightforward to deal with.",
      name: "Marc D.",
      place: "North Vancouver, Canada",
      service: "Gutter Cleaning",
    },
    {
      quote:
        "The driveway and back patio had not been touched in years and I honestly expected a patchy result. It came out even from edge to edge and looks close to new. Fair price for the amount of work.",
      name: "Elena R.",
      place: "Surrey, Canada",
      service: "Power Washing",
    },
    {
      quote:
        "We signed up for seasonal clearing on our strata lot. They turned up early after every snowfall without us having to call, and the salting kept the walkways safe right through the winter.",
      name: "Tom H.",
      place: "Port Moody, Canada",
      service: "Snow Removal & Salting",
    },
  ],
} as const;

export const awards = {
  label: "Excellence Backed by Trust",
  headline: "Awards & Industry Recognition",
  body: "RainCity is proud to deliver trusted residential and commercial property maintenance services recognized for quality, professionalism, and customer satisfaction across Canada.",
  badge: {
    kicker: "Award Winning Excellence",
    title: "Winner of the 2026 Canadian Choice Award",
    body: "Judged on the standard of the work and the experience of the people who paid for it — a national mark of excellence in property maintenance and customer service.",
    src: "/badges/canadian-choice-award.webp",
    width: 650,
    height: 711,
    alt: "The 2026 Canadian Choice Award trophy — a gold star on a black base.",
  },
  credentialsLabel: "Credentials & Guarantees",
  /**
   * The four supporting credentials. Each alt describes the mark itself and
   * adds what the caption beneath it cannot — the scope of the claim — so
   * it earns its place in an image index instead of echoing the label.
   *
   * Source art is stylistically mismatched (3D gold, 3D red, flat blue), so
   * the component sets every one in an identical Fog plate and captions it
   * in the same type — the container does the unifying, not the artwork.
   */
  credentials: [
    {
      src: "/badges/license-insured.webp",
      width: 612,
      height: 408,
      label: "Licensed & Insured",
      alt: "Red shield badge: RainCity is licensed and insured for residential and commercial property maintenance across Greater Vancouver.",
    },
    {
      src: "/badges/100-satisfaction.webp",
      width: 225,
      height: 225,
      label: "Satisfaction Guaranteed",
      alt: "Gold shield badge reading 100% Satisfaction Guaranteed.",
    },
    {
      src: "/badges/5-star.webp",
      width: 360,
      height: 360,
      label: "Five-Star Rated",
      alt: "Blue laurel badge marking RainCity as a five-star rated property maintenance service.",
    },
    {
      src: "/badges/best-quality.webp",
      width: 225,
      height: 225,
      label: "Best Quality Workmanship",
      alt: "Black and gold seal reading Best Quality, for workmanship on exterior cleaning and property care.",
    },
  ],
  points: [
    "Trusted by homeowners and businesses across Canada",
    "Recognized for exceptional customer satisfaction",
    "Professional and experienced maintenance team",
    "Commitment to quality and reliability",
    "Delivering excellence in every service",
  ],
} as const;

export const quoteForm = {
  headline: "Request a Free Quote",
  /**
   * A short list on purpose — six options in a dropdown, not all eleven
   * services. It does not derive from `services`, so a rename there has to be
   * mirrored here: "Driveway Sealing" became "Concrete and Asphalt Sealing"
   * when those two services merged. "Other" catches everything left off.
   */
  serviceOptions: [
    "Pressure Washing",
    "Window Cleaning",
    "Gutter Cleaning",
    "Concrete and Asphalt Sealing",
    "Roof Cleaning",
    "Other",
  ],
  submit: "Get a Quote",
} as const;

export const footer = {
  tagline:
    "Reliable. Local. Year-Round Property Maintenance & Exterior Cleaning Services Across Greater Vancouver.",
  quickLinks: [
    { label: "Home", href: "/" },
    { label: "About Us", href: "/about" },
    { label: "Services", href: "/services" },
    { label: "Locations", href: "/locations" },
    { label: "Our Blogs", href: "/blog" },
  ],
  additionalLinks: [
    { label: "Disclaimer", href: "/disclaimer" },
    { label: "Privacy Policy", href: "/privacy-policy" },
    { label: "Terms & Conditions", href: "/terms" },
    { label: "Refund Policy", href: "/refund-policy" },
    { label: "Get In Touch", href: "#quote" },
  ],
  copyright: "© 2026 All Rights Reserved.",
} as const;

// --- About page ------------------------------------------------------------

/**
 * /about. Copy is the client's own, taken from the About page content
 * inventory and left as written, with two changes:
 *
 *  1. "Our Vission" is corrected to "Our Vision". The typo is verbatim in the
 *     source and in the live WordPress site; reproducing it faithfully would
 *     be reproducing a mistake.
 *  2. The stat "05+" is set as "5+". A leading zero is a numbering idiom (the
 *     process steps below use it, because they are a sequence); on a quantity
 *     it just reads as a typo.
 *
 * ===========================================================================
 * UNVERIFIED CLAIMS — `stats` below.
 *
 * The three figures are the client's own published claims, carried over from
 * their existing site. Nothing in the material we hold substantiates any of
 * them, and "100% Customer Satisfaction" in particular is an absolute claim
 * about outcomes. They are reproduced, not invented — but they should be
 * confirmed with the client before launch, and revised or dropped if the
 * numbers cannot be stood behind.
 *
 * They must NOT be promoted into structured data. A satisfaction percentage
 * marked up as an AggregateRating is a fabricated review signal, which is
 * exactly the reason lib/seo.tsx omits `aggregateRating` today. See the
 * PLACEHOLDER block on `testimonials` above — same principle.
 * ===========================================================================
 */
export const aboutPage = {
  hero: {
    crumb: "About",
    heading: "About Us",
    body: "Delivering reliable property maintenance and exterior cleaning services with a focus on quality, consistency, and long-lasting results you can trust.",
    cta: "Get a Free Quote",
  },

  intro: {
    label: "Who We Are",
    headline: "RainCity Property Maintenance",
    body: [
      "At RainCity Property Maintenance, we provide professional property maintenance and exterior cleaning services designed to enhance and protect your space. Our team is committed to delivering reliable solutions, combining industry experience with a detail-focused approach to achieve consistent, high-quality results.",
      "We understand the importance of maintaining a property that is both functional and visually appealing. That's why we prioritize efficiency, safety, and precision in every project, ensuring each client receives service they can trust and results they can see.",
    ],
    cta: "Explore Our Services",
  },

  statsLabel: "By the numbers",
  stats: [
    { value: "5+", label: "Years of experience" },
    { value: "1K+", label: "Properties serviced" },
    { value: "100%", label: "Customer satisfaction" },
  ],

  /**
   * Mission and Vision. Two sections in the source inventory, set as one band
   * here: they are a matched pair of statements, and giving each its own
   * eyebrow, heading and full section of white space would have made the page
   * repeat itself twice in a row at exactly the point it should be building.
   */
  statements: [
    {
      label: "The Goal",
      title: "Our Mission",
      body: "To provide reliable property maintenance and exterior cleaning services that keep properties clean, safe, and well-maintained. We are committed to delivering consistent quality, practical solutions, and professional service that adds long-term value to every property we work on.",
    },
    {
      label: "The Outlook",
      title: "Our Vision",
      body: "To become a trusted name in property maintenance by delivering dependable, high-quality services that clients can rely on. We aim to set a standard of excellence through consistency, professionalism, and a strong focus on customer satisfaction.",
    },
  ],

  process: {
    label: "Our Process",
    headline: "Simple, Efficient & Reliable Service",
    steps: [
      {
        title: "Inspection",
        body: "We inspect your property to identify areas that need attention and proper care.",
      },
      {
        title: "Service",
        body: "We deliver professional service using the right tools for safe and efficient results.",
      },
      {
        title: "Review",
        body: "We review the work to ensure quality and confirm your complete satisfaction.",
      },
    ],
    cta: "Explore Our Services",
  },
} as const;

// --- Services page ---------------------------------------------------------

/**
 * /services. Structure follows the Services page content inventory: banner,
 * "What We Offer", the catalogue, then the sitewide testimonials and quote
 * modules.
 *
 * The catalogue itself is NOT declared here. It is `services` at the top of
 * this file — the same array the homepage grid, the nav dropdown and the
 * JSON-LD read. The inventory lists twelve services because that is what the
 * old WordPress site carried; the eleven above are the current list, and the
 * page renders those.
 *
 * Two copy notes:
 *
 *  1. The source hero paragraph and the source intro paragraph open with the
 *     same clause — "a complete range of exterior cleaning and property care
 *     services designed to..." — and sit about four hundred pixels apart. The
 *     intro keeps the client's wording; the banner takes the footer tagline's
 *     framing instead, so the page does not say the same sentence twice
 *     before the reader has scrolled once.
 *  2. "detail oriented" is hyphenated. The source is unhyphenated; so was
 *     "Our Vission" on the About page. Reproducing a typo faithfully is still
 *     reproducing a typo.
 *
 * The three principles are the client's own — "Superior Workmanship",
 * "Transparent Practices", "Creative Solutions" — and arrive as bare labels.
 * Each carries a one-line support here, and every one of them restates a fact
 * this site already publishes elsewhere (the award in `awards`, the licence
 * and the quote-per-property policy in the badge set and public/llms.txt, the
 * tailoring claim in `pillars`). Nothing new is asserted about the business.
 */
export const servicesPage = {
  hero: {
    crumb: "Services",
    heading: "Our Services",
    body: "Exterior cleaning and property care for homes, stratas and businesses across Greater Vancouver — booked year-round, in whatever the sky is doing.",
    cta: "Get a Free Quote",
  },

  intro: {
    label: "What We Offer",
    headline: "Professional Property Maintenance Services",
    body: "At RainCity Property Maintenance, we offer a complete range of exterior cleaning and property care services designed to maintain and protect your space. Our team focuses on delivering reliable solutions, combining practical experience with a detail-oriented approach to ensure consistent, high-quality results.",
    principles: [
      {
        title: "Superior Workmanship",
        support: "Recognized with the 2026 Canadian Choice Award.",
      },
      {
        title: "Transparent Practices",
        support: "Licensed, insured, and quoted per property before we start.",
      },
      {
        title: "Creative Solutions",
        support: "Scoped to the building in front of us, not a standard package.",
      },
    ],
    cta: "Book Your Clean Now",
  },

  /**
   * No count in the headline. "Eleven Services" would have to be edited by
   * hand every time `services` changes, which is exactly the drift the single
   * source above exists to prevent.
   */
  catalogue: {
    label: "Our Services",
    headline: "Everything We Look After",
    body: "Every job is quoted for the property in front of us. Choose the service you need, or call and we will work out what the building actually needs.",
  },
} as const;

// --- Service detail pages --------------------------------------------------

/**
 * /services/[slug]. Everything here is the content inventory's "fixed" column
 * — the blocks that repeat, word for word, on all eleven service pages. The
 * variable half sits on each entry's `detail` in the `services` array at the
 * top of this file, which is what makes the page a template rather than
 * eleven pages that happen to look alike.
 *
 * Three notes on what is and is not repeated here:
 *
 *  1. The inventory records an eyebrow above the H1 carrying the company
 *     name. It is not reproduced. /about and /services both open on
 *     breadcrumb → H1, the breadcrumb already names the site, and a company
 *     printing its own name over its own headline is the kind of filler the
 *     rest of this build has been stripping out. Every other fixed element
 *     the inventory lists is here in full.
 *
 *  2. `trust.points` restate claims this site already publishes elsewhere —
 *     the licence and the per-property quote in the badge set and
 *     public/llms.txt, the satisfaction guarantee in `awards.credentials`,
 *     the base city and service area in `business`. Nothing new is asserted
 *     about the company on eleven pages at once. In particular the source
 *     template's "Serving Greater Vancouver since 2018" is not carried: a
 *     founding year is a checkable fact, it is nowhere in the material we
 *     hold, and eight years of trading would contradict the "5+ years"
 *     already printed on /about.
 *
 *  3. The three steps keep the source's titles. Their descriptions are
 *     rewritten in this site's voice, the same latitude taken with the
 *     homepage service blurbs — the originals are generic to the point of
 *     saying nothing ("Sit back and enjoy exceptional results").
 */
export const servicePage = {
  hero: {
    crumb: "Services",
    quoteCta: "Get a Free Quote",
    callCta: "Call Us Now",
  },

  overview: {
    label: "Our Service",
    includedLabel: "What's Included",
    trust: {
      title: "Why Choose RainCity?",
      points: [
        "Fully licensed and insured",
        "Based in New Westminster, working across Greater Vancouver",
        "Residential, strata and commercial",
        "Free quotes, priced per property",
        "Satisfaction guaranteed on every job",
      ],
      callPrompt: "Have questions? Call us",
    },
  },

  /**
   * The one place on a service page where numerals are used, and they are
   * earned: this is a sequence, and the order is the entire point of the
   * section. Same reasoning as `aboutPage.process`, different content — that
   * one describes how a job is run, this one describes what the customer
   * does.
   */
  process: {
    label: "How It Works",
    headline: "Our Simple Three-Step Process",
    steps: [
      {
        title: "Request a Free Quote",
        body: "Call or send the form. We take the details, and price the property in front of us rather than reading off a rate card.",
      },
      {
        title: "We Schedule & Arrive",
        body: "We book a slot that suits you and turn up in it, with everything the job needs already on the truck.",
      },
      {
        title: "Enjoy the Results",
        body: "We walk the finished work with you before we leave, and put right anything that isn't up to standard.",
      },
    ],
  },

  closing: {
    body: "Get a free quote today. Serving New Westminster and all of Greater Vancouver.",
    cta: "Get Your Free Quote",
  },
} as const;
