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
  // WHERE THE NUMBER IS SHOWN, IT OPENS WHATSAPP (client request, 2026-09-25),
  // with the WhatsApp mark beside it. The "Call Us Now" buttons print no
  // number and stay `phoneHref`, so calling is always one tap away too. The
  // structured data keeps `telephone`. `wa.me` takes the number with no plus.
  whatsappHref: "https://wa.me/16042093357",
  // The accessible name for every WhatsApp number link, since the visible text
  // is only the number and the link does not dial it.
  whatsappLabel: "Message RainCity on WhatsApp at +1 604 209 3357 (opens WhatsApp)",
  email: "info@raincitypms.com",
  emailHref: "mailto:info@raincitypms.com",
  hours: {
    // OFFICE HOURS, Mon–Sat 8am–4pm, Sunday closed (client, 2026-09-25 —
    // the third correction that day: 7am–10pm, then 9–5, then this). They
    // are the office's hours, not the crew's, and the client asked that the
    // site never call them "work" or "working" hours, which read as when jobs
    // happen and confused people. So every place they show is labelled
    // "Office Hours" (`label`). `openingHoursSpecification` in lib/seo.tsx,
    // the two "What are your office hours?" answers in `pageFaqs` and
    // public/llms.txt must match.
    label: "Office Hours",
    days: "Mon – Sat, 8 am – 4 pm",
  },
  base: "New Westminster",
  region: "Greater Vancouver",
} as const;

/*
 * Social and profile links. Add an entry per network only once its real URL is
 * confirmed — never a "#" or a guessed handle, which points visitors at a
 * stranger's account. Every entry renders an icon in the header strip and the
 * footer and feeds `sameAs` in the structured data automatically.
 *
 * Only the Google Business Profile is known so far (2026-09-23). Facebook,
 * Instagram and the rest still need their real URLs from the client; the
 * icons for them already exist in Icon.tsx.
 */
export const social: readonly { label: string; href: string; icon: string }[] =
  [
    {
      // The Google Business Profile, supplied by Touseef on 2026-09-23 as a
      // share.google link. That link resolves through a Google search page,
      // so this is the listing's permanent CID form instead — checked to open
      // "Raincity Property Maintenance" on Google Maps the same day. Being in
      // this array is what turns on `sameAs` in the Organization and
      // LocalBusiness structured data (lib/seo.tsx), tying the site to the
      // listing its reviews live on.
      label: "RainCity on Google",
      href: "https://maps.google.com/?cid=6027837514590759918",
      icon: "google",
    },
  ];

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
/**
 * One line of "What's Included".
 *
 * Window Cleaning piloted the expanded treatment — every scope line rewritten
 * with a title, a paragraph of its own and its own photograph — and all ten
 * remaining services have now been written to it. The `string` shorthand the
 * union used to allow is gone with them: a bare scope line would render a
 * tile with a title and nothing under it, which is no longer what any page on
 * this site does, and leaving the shorthand in the type is how a twelfth
 * service quietly ships one.
 *
 * `description` and `photo` stay optional so the tile can still close up
 * around a title, but nothing takes that path today. Every one of the
 * sixty-six tiles across the eleven pages carries both.
 */
export type IncludedItem = {
  /** The scope line itself. Set in display-s, so keep it short. */
  title: string;
  /** The detail under it. Written for all sixty-six tiles; without one the
      tile closes up around the title rather than leaving a gap. */
  description?: string;
  /** The tile's photograph. Every tile has a slot in `photos.ts`, though the
      seventy on the ten non-pilot services are placeholders until the real
      frames are shot. Without one the tile falls back to a blue rule. */
  photo?: PhotoKey;
};

/**
 * One question and its answer.
 *
 * All eleven services carry a written set — five or six questions each, the
 * ones that actually come in before that service is booked. The field stays
 * optional because the section and the FAQPage node are both written to
 * return nothing without it, which is the behaviour a twelfth service should
 * get on the day it is added and before its copy exists.
 *
 * Both fields are published as FAQPage structured data, so an answer has to
 * be true standing on its own, away from the page that frames it.
 */
export type Faq = {
  question: string;
  answer: string;
};

/**
 * The "Why Choose RainCity?" band, where a service writes its own.
 *
 * The band is fixed furniture — same title, same button, same phone prompt on
 * all eleven pages — and `servicePage.overview.trust` still holds all of that
 * plus a default blurb and default points. What a service may override here is
 * only the argument: the paragraph, and the five claims beside it.
 *
 * The five claims are the same five facts on every page — licensed and
 * insured, based in New Westminster and working region-wide, residential and
 * strata and commercial, free written quotes, work guaranteed. Nothing new is
 * asserted about the company on any of these pages; what changes is which
 * half of each fact matters for the service you are reading about. Insurance
 * is a certificate a strata manager files on the commercial page, cover for
 * the damage pressure can do on the power washing page, and cover for work at
 * height on the roof and gutter pages. It is one fact wearing the clothes of
 * the page it is standing on.
 *
 * That is also why this is not a template with a noun slot. Eleven pages
 * carrying one paragraph with the service name swapped is eleven pages of
 * duplicate copy wearing a disguise, and it reads as one to a person as
 * clearly as it does to a crawler.
 *
 * Window Cleaning has no override: the default in `servicePage` is the
 * approved wording from that page, and leaving it there keeps the pilot
 * exactly as it shipped while giving the fallback something real to be.
 */
export type ServiceTrust = {
  /** The standing claim. Says something the five points below do not. */
  blurb: string;
  /** Exactly five: the shared facts, phrased for this service. */
  points: string[];
};

export type ServiceDetail = {
  /** Page H1. Says what the service is; never just the service name again. */
  heading: string;
  /** Hero paragraph, under the H1. Two sentences at most. */
  intro: string;
  /** Overview H2. Two lines at most — it is set in display-l against a
      five-column measure, and a heading that wraps three times reads as an
      unedited list rather than as a claim. */
  overviewHeading: string;
  /** Overview paragraph — the substantive description of the work. */
  overview: string;
  /** "What's Included" — the scope, in the order the work happens.
      Either a bare scope line or the expanded form; see `IncludedItem`. */
  included: IncludedItem[];
  /** Overview CTA label. Names the service, per the inventory. */
  cta: string;
  /** The "Why Choose RainCity?" argument, in this service's terms. Optional:
      without one the band falls back to `servicePage.overview.trust`. See
      `ServiceTrust`. */
  trust?: ServiceTrust;
  /** Final CTA H2. */
  closing: string;
  /** The closing band's photograph. Optional: without one the band falls
      back to `rooftops`, the overcast Greater Vancouver roofline that is
      equally true of all eleven services. Set it where a service has a frame
      of its own that says something the shared one cannot. */
  closingPhoto?: PhotoKey;
  /** Meta description. Written, not derived: 150-158 characters is a
      constraint on the sentence, and a paragraph reused from the page body
      gets cut mid-clause in the result. All eleven were trimmed to that
      ceiling in the SEO pass — they had drifted to 162-171, which reads as
      "about right" and is in fact past where Google stops rendering. */
  metaDescription: string;
  /** The questions this service actually gets asked. Optional in the type
      because the section and its JSON-LD are both written to return nothing
      without it; all eleven services carry them today. */
  faqs?: Faq[];
};

export type Service = {
  slug: string;
  title: string;
  blurb: string;
  photo: PhotoKey;
  detail: ServiceDetail;
};

/**
 * The `included` list, in the shape the tile grid consumes it.
 *
 * It used to normalise a `string | IncludedItem` union into the object form.
 * With the shorthand gone the list already arrives that way, and the seam is
 * kept rather than inlined because every service page reads its scope through
 * here — which makes it the one place to change if the list is ever derived
 * rather than declared.
 */
export function includedItems(service: Service): IncludedItem[] {
  return service.detail.included;
}

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
        "Offices, retail units and strata common areas cleaned to a scope agreed in writing — after hours, before them, or on whatever cycle keeps the building presentable.",
      overviewHeading: "The Same Crew, Every Visit",
      overview:
        "We walk the building with you first and write the scope down room by room: what happens nightly, what happens weekly, and what is explicitly not ours. Colour-coded cloths keep washroom work off a boardroom table, high-touch points are done every visit rather than saved for a deep clean, and every visit is logged and signed. And the same crew stay on a building: most of a cleaning contract is knowing which door sticks.",
      included: [
        {
          title: "Lobbies, entrances and elevator cabs",
          photo: "commercialLobbies",
          description:
            "The first forty feet carry most of a building's impression and the most traffic. Entrance glass, door furniture, matting and the grit under it are done every visit; cabs get the floor, the call panel and the stainless. In wet weeks the matting lifts and the floor beneath it is dried, not mopped around.",
        },
        {
          title: "Corridors, stairwells and amenity rooms",
          photo: "commercialCorridors",
          description:
            "Shared circulation is where a strata building ages fastest. Carpets are vacuumed on a set pattern rather than a wander, hard floors are dust-mopped before they are damp-mopped, and handrails, nosings and baseboards are cleaned rather than stepped past. Amenity rooms are reset too.",
        },
        {
          title: "Washrooms and consumable restocking",
          photo: "commercialWashrooms",
          description:
            "Cleaned with dedicated colour-coded cloths and mop heads that never leave the washroom — the single most important rule in the building. Fixtures, partitions, mirrors and touch points get disinfectant with the dwell time the product asks for. Soap, paper and liners are restocked before they run out.",
        },
        {
          title: "Hard floors, carpet and entrance matting",
          photo: "commercialFloors",
          description:
            "Day-to-day floor care and the periodic work that keeps it worth doing: buffing, scrubbing and refinishing on vinyl and tile, hot-water extraction on carpet. Grout lines, edges and corners get their own pass — that is where a ride-on machine leaves a lobby half finished. Matting is lifted and dried under.",
        },
        {
          title: "Back-of-house, storage and loading areas",
          photo: "commercialBackOfHouse",
          description:
            "The rooms nobody photographs and every inspector opens. Bin rooms, loading bays, service corridors and janitorial closets are swept, washed down and left clear enough to use. Odour in a bin room is a drainage and residue problem, so it gets treated as one — floor drain and bin bases first, then the walls.",
        },
        {
          title: "Nightly, weekly or monthly scheduling",
          photo: "commercialSchedule",
          description:
            "The cycle is set to the building rather than sold as a package: nightly for an occupied office, weekly or monthly for a small strata. Work happens outside operating hours wherever the site allows, and keys are held under a signed handling agreement. Change the cycle and the scope sheet changes with it, in writing.",
        },
      ],
      cta: "Book Your Commercial Clean",
      trust: {
        blurb:
          "Property managers and strata councils do not need a cleaner who is enthusiastic. They need one who is there on the nights they said they would be, with a scope on file and paperwork that survives an AGM. That is the business we run: insurance certificates, a signed key-handling agreement and a visit log come as standard, and the contract price holds for its term unless you ask us to change what is in it.",
        points: [
          "Fully licensed and insured, certificates on file",
          "New Westminster based, on site across the region",
          "Strata, commercial and multi-residential buildings",
          "Free walkthrough, then a scope and price in writing",
          "Anything missed on a visit is put right, no charge",
        ],
      },
      closing: "Ready for a Building That Looks Managed?",
      closingPhoto: "commercialClosing",
      metaDescription:
      "Commercial cleaning across Greater Vancouver. Offices, retail and strata common areas cleaned to a written scope, on the cycle your building actually needs.",
      faqs: [
        {
          question: "Can you clean outside our operating hours?",
          answer:
            "Almost always, and for most sites it is the better arrangement. Offices are usually cleaned in the evening after the last person leaves; retail units are done before opening; strata common areas can go either way depending on how residents use them. What matters is that the crew has an uninterrupted run at the building, because cleaning around occupied desks and open tills takes longer and finishes worse.",
        },
        {
          question: "How do you handle keys, fobs and alarm codes?",
          answer:
            "Under a signed key-handling agreement that names which staff hold what, where it is stored between visits, and what happens if a set is lost. Fobs and codes are issued to the crew assigned to your building rather than shared across the company, and they are returned or deactivated the day a contract ends. If your site prefers a lockbox or a concierge handover instead, that works too — it just needs to be written down.",
        },
        {
          question:
            "What is the difference between the regular scope and a deep clean?",
          answer:
            "The regular scope is what keeps the building in the condition it is in: surfaces, floors, washrooms, bins, touch points, on the agreed cycle. Periodic work is what resets it — stripping and refinishing hard floors, extracting carpet, washing interior glass throughout, high dusting above reach. Those are quoted separately and scheduled a few times a year, because paying for them nightly would be paying for something a building does not need nightly.",
        },
        {
          question: "Can you provide insurance documentation for our strata?",
          answer:
            "Yes. We are fully licensed and carry commercial liability insurance, and we will send the certificate directly to a strata council, property manager or building owner on request rather than making you chase it. If your building requires us to be named on any additional documentation before a contract starts, tell us at the walkthrough and it will be dealt with before the first visit.",
        },
        {
          question: "How is a commercial cleaning contract priced?",
          answer:
            "On the building, not on a square-foot rate card. We walk the site, count what is actually in the scope — floors, washrooms, fixtures, bins, the awkward stairwell nobody mentions — and price the visit and the cycle from that. You get an itemised written quote, and that figure is what appears on the invoice each month. It changes only when you ask for the scope to change.",
        },
        {
          question: "What happens if something gets missed on a visit?",
          answer:
            "Tell us and we come back and do it, at no charge, rather than crediting it against the next invoice. The visit log makes that a short conversation: it records what was done and by whom, so it is usually clear straight away whether something was skipped or whether it needs to be added to the scope. If the same thing is being missed repeatedly, the scope is wrong and we will rewrite it with you.",
        },
      ],
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
        "Concrete, pavers, brick and painted siding brought back to the colour they started at — with the pressure set by what the surface can take, not by what the machine can do.",
      overviewHeading: "The Wrong PSI Doesn't Wash Out",
      overview:
        "Every surface has a number. Broom-finished concrete takes three thousand PSI behind a rotating surface cleaner; painted cedar will not survive half of it, and jointed pavers lose their sand first. We test an out-of-sight patch, then run the whole area at one setting — a bare wand swung by hand is what leaves the arcs you can still read two summers later. Planting and glass are soaked first and rinsed at the end.",
      included: [
        {
          title: "Driveways, walkways and patios",
          photo: "powerDriveways",
          description:
            "Poured concrete, exposed aggregate, pavers and flagstone, run with a rotating surface cleaner rather than a hand-held wand so the finish comes out uniform instead of striped. Oil and rust marks are treated separately first. On jointed paving we work at a pressure the sand survives and re-sand the joints after.",
        },
        {
          title: "Siding, brick and stonework",
          photo: "powerSiding",
          description:
            "Vinyl, Hardie, brick, block and stone, washed from a distance and angle that cleans the face without forcing water up behind a lap or into a mortar joint. We wash bottom-up and rinse top-down, so run-off never streaks dry material below. Painted and cedar surfaces get a soft wash instead, and we say so at the quote.",
        },
        {
          title: "Decks, steps and railings",
          photo: "powerDecks",
          description:
            "Timber, composite and concrete, cleaned with the grain and at a pressure that lifts the grey without raising the fibres. Softwood decking is the easiest surface on a property to permanently furrow, so it gets a wider fan and a slower pass. Steps, railings and the spindles everyone skips are done by hand.",
        },
        {
          title: "Parkades, loading bays and bin enclosures",
          photo: "powerParkades",
          description:
            "The concrete that carries traffic film, tyre rubber, oil and whatever came out of the bins. Work is scheduled around access — usually overnight or by level — and drains are covered or managed. Bin enclosures get degreased rather than rinsed, because the smell in there is residue on the slab, not the bins.",
        },
        {
          title: "Moss, algae and traffic film",
          photo: "powerMoss",
          description:
            "The three things a Greater Vancouver winter leaves behind, each taking a different approach. Moss is treated so the root goes with it rather than regrowing by June; algae comes off with detergent and dwell time; traffic film needs heat or a degreaser. Maximum PSI just rebooks you.",
        },
        {
          title: "Surface testing and site protection",
          photo: "powerFinish",
          description:
            "Before anything runs at full pressure we test a patch out of sight and show you the result. Planting is soaked with clean water first and rinsed again after, outlets and light fittings are covered, windows checked shut. Water, power and detergent all come off our own truck, not your tap or a common supply.",
        },
      ],
      cta: "Book Your Power Wash",
      trust: {
        blurb:
          "High-pressure water in the wrong hands takes paint off siding, sand out of pavers and mortar out of joints, and a low price does not cover any of that. We carry full liability cover, we quote after looking at the surface rather than over the phone, and we run entirely off our own truck. When the machine is packed away we walk the finished area with you — in daylight, before we leave — because that is the only point at which a wash can honestly be called done.",
        points: [
          "Licensed, and insured for the damage pressure can do",
          "A New Westminster crew, working the whole region",
          "Homes, strata properties and commercial sites",
          "Free quotes, priced at the property, in writing",
          "We don't leave until you have seen the finished surface",
        ],
      },
      closing: "Ready to Find the Colour Underneath?",
      closingPhoto: "powerClosing",
      metaDescription:
      "Pressure washing across Greater Vancouver for driveways, patios, siding and parkades. Pressure and tip matched to the surface, tested before we start.",
      faqs: [
        {
          question: "Will pressure washing damage my driveway or my siding?",
          answer:
            "It can, which is why the pressure is chosen for the surface rather than left at maximum. Concrete takes a great deal; painted wood, cedar, stucco and old mortar take very little, and pavers lose their jointing sand well before they lose their moss. We test an out-of-sight patch first and show you the result. Where a surface should not be pressure washed at all, we say so and quote a soft wash instead.",
        },
        {
          question: "How often does a driveway need washing here?",
          answer:
            "Once a year suits most Greater Vancouver properties, and the useful timing is late spring — after the winter has finished growing moss on it and before a dry summer bakes the staining in. North-facing surfaces, anything under conifers and anything shaded most of the day will want it annually without question. A sunny, open driveway can often go two years between washes.",
        },
        {
          question: "Do you need to use my water and power?",
          answer:
            "No. Water, pressure, detergent and power all come off the truck, so nothing is drawn from your outside tap, your outlets or a building's common supply — which on strata and commercial sites means no coordination with building services and no charge appearing on a shared meter. Should you prefer we ran off the property's own water instead, say so when we quote and we will.",
        },
        {
          question: "Is it safe for my plants, lawn and pets?",
          answer:
            "Yes, because of what happens before the machine starts. Anything growing next to the work gets a long drink of clean water first — a root zone already full of water will not take up much of anything else — and the whole area is hosed down again once we finish. Delicate specimens are sheeted. We ask that pets stay inside while the equipment is running, mostly because the noise is considerable at close range.",
        },
        {
          question:
            "What is the difference between power washing and soft washing?",
          answer:
            "Power washing removes material with pressure and is right for hard, durable surfaces — concrete, brick, stone, parkade floors. Soft washing runs at garden-hose pressure and uses a cleaning solution and dwell time instead, which is what a roof, stucco, painted siding or cedar needs. Many properties want both, and a quote will say which surfaces are getting which rather than treating the whole house one way.",
        },
        {
          question: "Should I seal the surface after it has been washed?",
          answer:
            "On concrete and asphalt it is worth considering, because a clean, dry surface is the only time sealing is straightforward, and a sealed slab sheds the water and salt that break it up over winter. It is a separate service with its own quote, and it needs the surface fully dry first, so it is normally booked as a follow-up visit a few days later rather than the same afternoon.",
        },
      ],
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
        "A low-pressure detergent wash for roofs, stucco, painted siding and cedar — the surfaces a pressure lance would ruin, and the ones growth takes hold on fastest.",
      overviewHeading: "Kill It, Don't Knock It Off",
      overview:
        "Soft washing runs at roughly garden-hose pressure and lets a dilute solution do what force otherwise would. Moss, algae and lichen are organisms rather than dirt: knock them off and the root stays and regrows by winter; kill them and the growth breaks down over the weeks after we leave. Nothing is driven under a shingle or past a window seal. It cleans slower, and stays clean two to three times longer.",
      included: [
        {
          title: "Asphalt shingle and tile roofs",
          photo: "softRoofs",
          description:
            "The surface that most needs this method and least tolerates the other one. Solution is applied at low pressure across the slope, left to work, and rinsed gently or left for the rain. No granules come away with the growth, which is why a treated roof outlives a pressure-washed one.",
        },
        {
          title: "Stucco, render and painted siding",
          photo: "softStucco",
          description:
            "Porous, cracked and painted surfaces hold water in a way brick does not, and forcing it in behind them causes the blistering and interior damp that shows up a season later. Here the solution sits on the face, lifts the growth and rinses off. Painted finishes are tested first — a failing coating comes away with the algae.",
        },
        {
          title: "Cedar shingles, fascia and soffits",
          photo: "softCedar",
          description:
            "Cedar is soft enough to furrow under pressure and never recovers its grain once it has. A soft wash lifts the black weathering and green film without raising the fibres, so the timber can still be stained afterwards. Fascia, soffits and the underside of eaves go at the same time — that shaded band is where growth starts.",
        },
        {
          title: "Fences, pergolas and garden structures",
          photo: "softFences",
          description:
            "Fence panels, pergolas, arbours, sheds, planters and the north face of anything are all growing something by February here. They come up cleanly at low pressure and, being freestanding, are the surfaces most often wrecked by a rented pressure washer. Adjacent planting is protected first — usually the whole bed.",
        },
        {
          title: "Algae, lichen and black-streak treatment",
          photo: "softAlgae",
          description:
            "Black roof streaking is a cyanobacteria colony, not dirt, and lichen has a holdfast that grips into the surface. Neither responds to water alone at any pressure. The treatment kills both at the root so they release rather than tear — which is why lichen keeps fading for two or three weeks after we have gone.",
        },
        {
          title: "Planting protection and rinse-down",
          photo: "softPlanting",
          description:
            "Standard on every job, not an extra. Beds, lawn and any planting under the work are saturated with clean water before a drop of solution is mixed, because a soaked root zone cannot take up much else. Delicate specimens are sheeted, and everything gets a full rinse at the end. Twenty minutes beats replacing a hedge.",
        },
      ],
      cta: "Book Your Soft Wash",
      trust: {
        blurb:
          "Soft washing is the method you pick when the surface matters more than the speed, and the same instinct runs through how the rest of the job is handled. Nothing goes onto a roof or a wall before we know what it is made of, planting is protected as routine rather than as a favour, and we tell you what a treatment will and will not shift before you agree to it. Everything below holds whether it is a single-storey bungalow or a forty-unit strata.",
        points: [
          "Insured and fully licensed for exterior work",
          "Working out of New Westminster, right across the Lower Mainland",
          "Houses, strata buildings and commercial premises",
          "No charge to quote, and no obligation after it",
          "Not right when it dries? We come back and put it right",
        ],
      },
      closing: "Ready for a Wash Your Siding Survives?",
      closingPhoto: "softClosing",
      metaDescription:
      "Soft washing across Greater Vancouver for roofs, stucco, painted siding and cedar. Low pressure only, with the moss and algae killed off at the roots.",
      faqs: [
        {
          question: "What actually is soft washing?",
          answer:
            "A cleaning method that uses a dilute detergent solution and dwell time instead of high pressure. The water leaves the nozzle at roughly the pressure of a garden hose — a fraction of what a pressure washer produces — so the chemistry does the cleaning and the water only rinses. It is the standard method for roofs, stucco, painted siding and cedar, all of which are damaged by pressure long before they are cleaned by it.",
        },
        {
          question: "Is the solution safe around plants, pets and children?",
          answer:
            "It is used safely on residential properties every day, and the safety comes from the preparation as much as the dilution. Beds and lawns are saturated with clean water before mixing, sensitive planting is sheeted, and everything is rinsed thoroughly afterwards. We ask that pets and children stay indoors while solution is being applied and until the rinse is finished, after which the surfaces are fine to be around.",
        },
        {
          question: "How long does a soft wash last?",
          answer:
            "Typically two to four years on a roof and two to three on siding in this climate, against roughly a year for growth blasted off at pressure. The difference is that the root structure is killed rather than removed, so regrowth starts from spores landing on a clean surface rather than from what was left behind. Shaded, north-facing and tree-covered properties sit at the shorter end of both ranges.",
        },
        {
          question: "Will it get the black streaks off my roof?",
          answer:
            "Yes — those streaks are algae rather than staining, and they are exactly what this method is for. They lift as the colony dies rather than washing off on contact, so the roof keeps improving for two or three weeks after the visit. Heavy lichen is the slowest to go and can leave faint shadows on an older roof where it has been established long enough to mark the granule surface.",
        },
        {
          question: "Does it look clean straight away?",
          answer:
            "Partly. Surface film, algae and light growth go on the day; thick moss and established lichen release gradually as they break down and finish clearing over the following weeks, helped along by the next few rains. If you need a surface visibly clean for a specific date — a listing photograph, an inspection — say so at the quote, because that sometimes changes the method or the timing.",
        },
        {
          question: "Can you soft wash in the rain?",
          answer:
            "Light rain is usually fine and occasionally helps with the rinse. Steady rain is not, because it dilutes the solution off the surface before it has had time to work, so a downpour will move a booking. Wind matters more than rain does: solution carries in a breeze, and we will not spray a wall next to your neighbour's car in twenty knots.",
        },
      ],
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
        "Driveways, walkways and parking lots sealed against water, road salt and freeze-thaw — the three things that turn a hairline crack into a resurfacing bill.",
      overviewHeading: "The Damage Starts as a Hairline",
      overview:
        "Water gets into the pores and the joints, freezes overnight, expands and levers the surface apart from the inside; road salt and engine oil finish what the frost begins. Most of the work is preparation: wash the surface, degrease the oil spots, rout and fill the cracks — then wait. Sealer over a slab still holding moisture is why these jobs peel inside a year, so we check with a meter.",
      included: [
        {
          title: "Residential driveways and garage aprons",
          photo: "sealingDriveways",
          description:
            "The most exposed slab on a house, and the one that carries the salt off the street every January. The apron and the joint where a driveway meets the garage take the worst of it, because water pools there. Expect to lose the driveway for about a day, which is why these are booked to the forecast, not the calendar.",
        },
        {
          title: "Parking lots, aisles and loading areas",
          photo: "sealingLots",
          description:
            "Sealcoating an asphalt lot is the cheapest maintenance a strata or commercial landlord will ever do, and skipping it is among the most expensive. We work in sections so a site keeps partial access, coordinate closures in advance, and re-stripe stalls afterwards. Loading areas get the heavier prep — oil lands there.",
        },
        {
          title: "Walkways, patios and pool surrounds",
          photo: "sealingWalkways",
          description:
            "Smaller concrete areas where appearance does as much work as protection. Sealer deepens the colour of exposed aggregate and stamped concrete noticeably, so we show you a test square before committing the area. Around pools and on sloped walks we specify a slip additive rather than a straight gloss.",
        },
        {
          title: "Crack routing and joint filling",
          photo: "sealingCracks",
          description:
            "A crack painted over reopens through the sealer by spring. Working cracks are routed to a clean reservoir, blown clear and filled — hot-pour rubberised filler on asphalt, flexible urethane in concrete joints — so the filler moves with the slab. Anything wider than an inch is structural, and we say so before quoting.",
        },
        {
          title: "Degreasing and surface preparation",
          photo: "sealingPrep",
          description:
            "Sealer bonds to the surface, so whatever is on the surface decides whether it holds. Oil and transmission drips are degreased and scrubbed, then spot-primed where the contamination has gone deep; moss and loose material are washed off; joint vegetation is pulled at the root. This is the part that decides year five.",
        },
        {
          title: "Penetrating and topical sealers",
          photo: "sealingProduct",
          description:
            "Two products for two aims. A penetrating silane or siloxane soaks in and waterproofs from within, leaving the surface matte — the right answer wherever slip resistance matters. A topical acrylic sits on top and adds sheen, but recoats sooner. The quote names the product.",
        },
      ],
      cta: "Book Your Sealing Job",
      trust: {
        blurb:
          "Sealing is one of the few property jobs where the result is invisible for three years and unmistakable in the fifth. That puts all the weight on whether the surface was properly prepared and whether the product used was the product quoted — so we write the sealer, the number of coats and the cure times onto the quote, and you can hold us to all three. Everything else is the standing arrangement we offer on any RainCity job.",
        points: [
          "Fully licensed and carrying full liability cover",
          "Based in New Westminster, working across Greater Vancouver",
          "Private driveways, strata lots and commercial parking",
          "Free site visit and an itemised written quote",
          "Guaranteed workmanship on every surface we seal",
        ],
      },
      closing: "Ready to Seal Before the First Frost?",
      closingPhoto: "sealingClosing",
      metaDescription:
      "Concrete and asphalt sealing across Greater Vancouver. Cracks routed and filled, oil degreased, the slab metered dry, then sealed against water and salt.",
      faqs: [
        {
          question: "How often should a driveway be resealed?",
          answer:
            "Asphalt wants sealcoating every two to three years and concrete every three to five, though both depend more on exposure than on the calendar. A driveway in full sun, on a slope, or catching road salt off a main street will be at the short end; a shaded, level, lightly used one at the long end. The honest test is water: if it soaks in and darkens the surface rather than beading on it, the seal has gone.",
        },
        {
          question: "When is it too late in the year to seal?",
          answer:
            "Sealing wants a slab that is warm, dry, and going to stay dry: ten degrees or better underfoot, no moisture held in the pores, and a settled stretch afterwards long enough for the product to cure. In Greater Vancouver that realistically means late spring through early autumn. October is usually the last safe month and it depends entirely on the forecast. If you are asking in November, the right answer is to book for spring rather than seal something that will not cure and will have to be redone.",
        },
        {
          question: "How long before I can walk and drive on it?",
          answer:
            "Foot traffic after about four to six hours and vehicles after twenty-four to forty-eight, depending on the product, the temperature and how much sun the surface gets. You get the actual figures for your job in writing before we leave, along with the tape or cones to keep it off. Turning a wheel on a sealer that is still soft leaves a scuff mark that does not come out, so the wait genuinely matters.",
        },
        {
          question: "Does sealing fix cracks, or just cover them?",
          answer:
            "Sealer alone covers them and they reopen. That is why crack routing and filling is a separate step done before any sealer goes down: the crack is opened to a clean reservoir and filled with a flexible material that moves with the slab. What sealing cannot do is repair structural failure — heaving, sinking or cracks wider than roughly an inch mean the base underneath has gone, and we will tell you that instead of sealing over it.",
        },
        {
          question: "Will the surface be slippery afterwards?",
          answer:
            "A topical acrylic sealer can be, particularly on a slope or around a pool when wet. Where that is a concern we either specify a penetrating sealer, which leaves the surface texture as it was, or add a fine aggregate to the topcoat for grip. It is worth raising at the quote if the area includes steps, a ramp, a pool surround or a walkway that gets used in the rain.",
        },
        {
          question: "What is the difference between the two sealer types?",
          answer:
            "A penetrating sealer soaks into the pores and waterproofs from inside, leaving the appearance essentially unchanged and the grip intact; it lasts longer and is the usual choice for exposed aggregate and walked surfaces. A topical sealer forms a film on top, enriches the colour and adds a sheen, and needs redoing sooner. Neither is better in the abstract — they suit different surfaces, and the quote names which one and why.",
        },
      ],
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
      // Three words shorter than it looks. "Glass, Frames, Tracks and
      // Screens" ran to three lines of display-l in a five-column measure,
      // and a headline that wraps three times reads as an unedited list
      // rather than a claim. This is the claim the paragraph under it then
      // proves, and it holds on two lines at every width.
      overviewHeading: "Not Just the Glass",
      overview:
        "Most window cleaning stops at the glass, which is why a tidemark reappears along the frame a week later. We clean the whole opening — sill, track, screen and frame — and finish the glass last, so nothing runs back down over work already done. Above the second storey the ladder comes off the building altogether and the work goes onto a water-fed pole, which is steadier for the crew and leaves nothing resting on your gutters.",
      // The pilot for the expanded scope tile: title, photograph and a
      // paragraph that says something only true of that line of work. All ten
      // remaining services are now written to this shape; this is the one
      // whose photography is real rather than a placeholder.
      included: [
        {
          title: "Interior and exterior glass",
          photo: "windowGlass",
          description:
            "Both faces of every pane, washed and squeegeed rather than wiped dry — wiping is what leaves the lint and the swirl you only see once the low winter sun is on it. Inside we work off drop sheets, lift blinds clear and wipe the sill down before moving to the next opening.",
        },
        {
          title: "Frames, sills and sliding tracks",
          photo: "windowFrames",
          description:
            "The parts that actually hold the dirt. Tracks are vacuumed out before any water reaches them, so grit leaves the property instead of turning to paste in the channel. Frames, sills and weep holes are washed after the glass and dried by hand, which is what stops the tidemark coming back.",
        },
        {
          title: "Screens removed, washed and refitted",
          photo: "windowScreens",
          description:
            "Every screen comes out, is washed on both sides and goes back into the opening it came from — numbered first on larger jobs, because a screen refitted to the wrong frame never sits square again. Torn mesh and bent spline get pointed out, not quietly pushed back in.",
        },
        {
          title: "Skylights and hard-to-reach glazing",
          photo: "windowSkylights",
          description:
            "Skylights, stairwell windows, transoms and anything else above a comfortable ladder line. We reach it from the roof or on a pole depending on the pitch, and clear the flashing around a skylight while we are up there — otherwise the next rain washes grit straight back over the glass we have just cleaned.",
        },
        {
          title: "Hard-water and mineral-stain removal",
          photo: "windowHardWater",
          description:
            "Sprinkler overspray and years of runoff bond calcium into the glass, and no amount of soap shifts it. We test a corner, cut the deposit back with a mineral remover and polish the pane out. Where the glass has already etched we say so, rather than charge for a mark that is now part of it.",
        },
        {
          title: "Water-fed pole work on multi-storey buildings",
          photo: "windowPoleWork",
          description:
            "Up to about five storeys we work from the ground on a carbon-fibre pole fed with purified water — no ladder against your gutter line and nobody standing on a sill. The water carries no minerals, so the glass dries without spotting. It is how we run most strata and low-rise work across Greater Vancouver.",
        },
      ],
      cta: "Book Your Window Clean",
      closing: "Ready for Glass You Can See Through?",
      closingPhoto: "windowClosing",
      metaDescription:
      "Streak-free window cleaning across Greater Vancouver — glass, frames, sills, tracks and screens cleaned on homes, storefronts and multi-storey buildings.",
      // The six questions that actually come in before a window job is
      // booked, answered the way they would be answered on the phone. Each
      // one is published as FAQPage structured data, so none of them lean on
      // the page around them to make sense, and none of them promise
      // anything the rest of this entry does not already commit to.
      faqs: [
        {
          question:
            "Do you clean the inside of the windows as well as the outside?",
          answer:
            "Yes, and it is quoted separately, because it is a different job. Exterior work happens whether anyone is home or not; interior work needs access to every room, so we book a window of time with you, work off drop sheets and move what needs moving rather than reaching around it. Plenty of customers have the outside done twice a year and the inside once.",
        },
        {
          question: "How often should windows be cleaned in Greater Vancouver?",
          answer:
            "Twice a year suits most homes here — once after the winter, when months of rain have finished driving grit and organic matter onto the glass, and once in the autumn before it starts again. Ground-floor storefronts and anything on a busy road want quarterly or monthly. If the property sits under conifers or near the water, assume the shorter interval.",
        },
        {
          question: "What happens if it rains right after you clean?",
          answer:
            "Nothing. Clean glass sheds rain; what makes a window look dirty again a day later is dirt still sitting on the frame and sill washing down over it, which is exactly why we clean the whole opening rather than just the pane. We do not reschedule for rain either — steady rain is fine to work in. Wind and ice are different, and those are the two things that will move a booking.",
        },
        {
          question: "Do you bring your own water and equipment?",
          answer:
            "Everything arrives on the truck: squeegees, poles, ladders and a tank of purified water, so nobody is asking to borrow a hose or an outside tap. On strata and commercial sites that means no coordination with building services and nothing plugged into a common-area outlet. If you would rather we drew from your supply, that is fine — say so at the quote.",
        },
        {
          question: "Can you reach upper-storey and awkward windows?",
          answer:
            "Up to about five storeys, yes, and most of it is done from the ground on a water-fed pole rather than a ladder leaning on your building. Skylights, stairwell glass and transoms are routine. Above that height, or where a pane can only be reached from outside a fixed line, we will tell you at the quote rather than after the crew has arrived.",
        },
        {
          question: "Are you insured, and how does a quote work?",
          answer:
            "We are fully licensed and insured, and we will send the certificate straight to a strata council or property manager on request. Quotes are free and priced on the property: we count the openings, look at the access and give you a written figure. No rate card and no per-pane guess over the phone, and the figure does not move afterwards unless the scope does.",
        },
      ],
    },
  },
  /*
   * Balcony Cleaning — the twelfth service, added 2026-09-23 at the client's
   * request: "detailed hand washing, no spills, for condos and apartments, and
   * the standard pressure washing for homes". Those two sentences are the
   * whole of the brief and the spine of every block below; everything else
   * restates method this site already publishes (the soak-and-rinse around
   * planting, the pressure-to-surface rule, the free written quote, the
   * return visit under the workmanship guarantee).
   *
   * Nothing here names a price, a duration, a crew size or a notice period.
   * The one operational claim — that no water goes over the edge onto the
   * unit below — is the client's own "no spills", and it is the claim the
   * office has to hold to on the phone.
   */
  {
    slug: "balcony-cleaning",
    title: "Balcony Cleaning",
    blurb:
      "Condo balconies hand-washed with nothing dripping below; house decks pressure washed.",
    photo: "balconyCleaning",
    detail: {
      heading: "Balconies Washed by Hand, Not Hosed Off",
      intro:
        "Condo and apartment balconies hand-washed with the water kept on the slab, so nothing runs over the edge onto the balcony below. House decks and patios get a standard pressure wash.",
      overviewHeading: "Every Balcony Has a Neighbour Below",
      overview:
        "A hose on a fourth-floor balcony is a complaint on the third. So on a condo or apartment balcony the work is done by hand: glass and railings washed with a cloth and squeegee, the floor scrubbed with a brush and a bucket rather than flooded, and the dirty water collected before it can reach the edge. Drains are checked clear before anything gets wet. On a house, where a deck sits over a lawn rather than someone's patio chairs, a pressure wash set for timber or concrete is the better tool.",
      included: [
        {
          title: "Glass railings and privacy panels",
          photo: "balconyGlass",
          description:
            "Both faces of every panel, washed by hand and squeegeed dry, with the top cap and the channel the glass stands in wiped out rather than left holding grit. Frosted privacy screens get the same care, and so do the handrails and brackets, which are where the weather lays its film down first.",
        },
        {
          title: "Floors scrubbed by hand",
          photo: "balconyFloors",
          description:
            "Concrete, pavers, tile and membrane worked with a stiff brush and a measured amount of water instead of a hose. Moss in the joints and the grey film a wet winter leaves are loosened by hand, and the dirty water is gathered up rather than swept to the edge. Membranes are handled gently: they are the building's waterproofing.",
        },
        {
          title: "Nothing over the edge",
          photo: "balconyBelow",
          description:
            "On a stacked building this is the job. The water stays on the balcony being cleaned — no hose, no pressure washer, no run-off down the face of the building or across the unit beneath. Drains and scuppers are cleared first, so the little water there is leaves the way the building was designed to send it.",
        },
        {
          title: "Sliding doors, frames and tracks",
          photo: "balconyDoors",
          description:
            "The outside of the sliding door, its frame, and the track it runs in — the part that fills with grit and needles until the door drags. Tracks are brushed out and wiped, weep holes are checked open so the next storm drains away from the sill, and the glass is finished streak-free.",
        },
        {
          title: "House decks and patios, pressure washed",
          photo: "balconyDecks",
          description:
            "On a house the deck sits over a garden, not a neighbour, so a standard pressure wash is the right tool: timber, composite and concrete cleaned at a pressure the surface can take, working with the grain on wood. Beds beside the deck are watered down before we start and again when we finish.",
        },
        {
          title: "Whole buildings, on the strata's schedule",
          photo: "balconyBuilding",
          description:
            "For strata councils and property managers, every balcony in a building on one programme instead of one door at a time. The order and the dates are agreed with the council or manager, timed to the notice the building gives its residents, and balconies we could not reach on the day are listed rather than quietly skipped.",
        },
      ],
      cta: "Book Your Balcony Clean",
      trust: {
        blurb:
          "On a stacked building the risk in balcony cleaning is not the balcony — it is the one below it, and the resident who comes home to a wet chair and a streaked window. That is why condos and apartments are washed by hand rather than with a hose, and why a building-wide clean is planned with the strata council or property manager instead of arranged one suite at a time. Houses, where the only thing under a deck is the lawn, get the standard pressure wash.",
        points: [
          "Licensed and insured, certificates on request",
          "Based in New Westminster, on balconies region-wide",
          "Condos, apartment buildings, stratas and houses",
          "Free quotes, in writing, before any work starts",
          "Anything missed is put right on a return visit",
        ],
      },
      closing: "Ready for a Balcony You Actually Use?",
      closingPhoto: "balconyClosing",
      metaDescription:
        "Balcony cleaning in Greater Vancouver: condo and apartment balconies hand-washed with no spills onto the units below, and house decks pressure washed.",
      faqs: [
        {
          question: "Will water drip onto the balcony below?",
          answer:
            "No — that is exactly why condo and apartment balconies are hand-washed rather than hosed. The water used is a bucket's worth, not a hose's; it stays on the slab being cleaned and is collected before it reaches the edge. Drains are checked clear first, so what little runs goes into the building's own drainage rather than down its face.",
        },
        {
          question: "Why not just pressure wash a condo balcony?",
          answer:
            "Because the water has to go somewhere, and on a stacked building somewhere is the balcony below, the window beside it and whatever the neighbour left outside. Pressure also drives water under door sills and into membrane seams that were never built to take it. A house deck over a lawn has neither problem, which is why houses get a pressure wash and condos get hand washing.",
        },
        {
          question: "Do I need to be home?",
          answer:
            "Usually, or someone needs to let us through: on most buildings the only way onto a balcony is through the suite. On a building-wide clean, access is arranged through the strata council or property manager, and any balcony that cannot be reached on the day is noted so it can be picked up rather than missed.",
        },
        {
          question: "What should I take off the balcony first?",
          answer:
            "Anything you would not want wet, and anything fragile. Light furniture and planters can stay and be moved around as we go; heavy planters are cleaned around rather than dragged across a membrane. If something on the balcony belongs to the building — a planter box, a privacy screen — mention it when you book.",
        },
        {
          question: "Can you do every balcony in our building?",
          answer:
            "Yes. For a strata or rental building the work is planned with the council or property manager as one programme rather than booked suite by suite, and it is quoted in writing before anything starts. Pairing it with the building's window cleaning is often worth asking about, since the glass on both sides of the balcony door ends up clean on the same visit.",
        },
      ],
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
        "Every run cleared by hand, every downspout flushed, and the water watched all the way out of the system before we pack up.",
      overviewHeading: "It Isn't Debris. It's Drainage.",
      overview:
        "A gutter is a drainage system that happens to be full of leaves, and the leaves are not the problem — the water that stops moving is. Once a run fills, the overflow goes over the front lip: onto the fascia, behind the siding, and eventually against the foundation. We clear by hand, bag everything off the property, flush and auger every downspout, then run water each length and watch it leave.",
      included: [
        {
          title: "Every run cleared by hand",
          photo: "gutterRuns",
          description:
            "Needles, leaf mould, shingle grit and the compacted layer underneath, all lifted out by hand along the full length of each run — including the awkward sections behind a dormer that a quick job quietly skips. Hand clearing is slower than blowing it out, and it is the only method that empties the channel rather than moving it.",
        },
        {
          title: "Downspouts flushed and augered",
          photo: "gutterDownspouts",
          description:
            "A clear gutter feeding a blocked spout is still a blocked system. Every downspout is flushed from the top and, where the water backs up, augered until it runs free — elbows and offsets first, since that is where the plug sits. Where a leader runs underground and has a clean-out, we check that it takes water too.",
        },
        {
          title: "Debris bagged and taken away",
          photo: "gutterDebris",
          description:
            "Everything that comes out of the gutters goes into bags and onto the truck. It is not raked into a bed, tipped behind the shed or left by the driveway for you — partly because that is not a finished job, and partly because debris tipped under the eaves is back in the gutter within two seasons.",
        },
        {
          title: "A flow test on every outlet",
          photo: "gutterFlowTest",
          description:
            "The step that turns a clear-out into a working system. Water is run into each run and watched the whole way: along the gutter, down the spout and out at the bottom. It shows up what a visual check cannot — a run pitched the wrong way holding water, a joint weeping behind a bracket, a spout draining slowly.",
        },
        {
          title: "Fascia, bracket and joint check",
          photo: "gutterFascia",
          description:
            "While the run is empty and we are on it, the hardware gets looked at: brackets pulling out, spikes backing off, joints and end caps weeping, sections sagging out of pitch, and the fascia behind them. You get photographs and a straight answer about whether it needs doing now or needs watching. No pressure to book.",
        },
        {
          title: "Gutter guards lifted, cleaned and refitted",
          photo: "gutterGuards",
          description:
            "Guards reduce what gets into a gutter; they do not stop it, and the fine grit that gets through has nowhere to go. Mesh and screen sections are lifted, the channel underneath cleared, the guard washed off and refitted properly seated. Where a guard has become the reason a run keeps blocking, we tell you.",
        },
      ],
      cta: "Book Your Gutter Clean",
      trust: {
        blurb:
          "Gutter work is ladder work, and ladder work is where an uninsured contractor stops being their own problem and becomes yours. We are licensed and insured for it, and the certificate goes to a strata manager the same day it is asked for. Past that the arrangement is straightforward: we look at the roofline, we tell you the price, and the price does not move afterwards. If a downspout is still running slow a week later, we come back and finish it.",
        points: [
          "Licensed and insured, certificates sent on request",
          "A New Westminster company, working region-wide",
          "Detached homes, townhouse complexes and commercial rooflines",
          "Free quotes, priced on the roofline in front of us",
          "Still not draining? We come back and clear it",
        ],
      },
      closing: "Ready Before the Rain Finds a Way In?",
      closingPhoto: "gutterClosing",
      metaDescription:
      "Gutter cleaning across Greater Vancouver — every run cleared by hand, debris bagged and taken away, downspouts flushed and augered, and then flow-tested.",
      faqs: [
        {
          question: "How often do gutters need clearing in Greater Vancouver?",
          answer:
            "Twice a year for most properties here: once in late autumn after the deciduous leaves are down, and once in spring to clear the needles, buds and blossom that come after them. A house under mature conifers — which is a great many of them in this region — often needs three or four visits, because cedar and fir shed all year rather than in one go. Anything with no overhanging trees can usually manage annually.",
        },
        {
          question: "Do I need to be home while you work?",
          answer:
            "No. It is all outside work and it needs access to the perimeter rather than to the house, so gates left unlocked and vehicles moved off the driveway are the only things we usually ask for. You get photographs of anything found on the fascia or the hardware whether you were there or not, so nothing is reported second-hand.",
        },
        {
          question: "What if the blockage is in an underground drain?",
          answer:
            "We flush and auger the downspout itself as part of the job, and where there is an accessible clean-out at the base we check that the underground leader takes water. If the blockage is further along the buried line, that is drainage work rather than gutter cleaning — a different trade and a different piece of equipment — and we will tell you what we found rather than charge for repeated attempts at it.",
        },
        {
          question: "I have gutter guards. Do I still need this?",
          answer:
            "Yes, though usually less often. Guards keep leaves and larger debris out and let fine material through: shingle grit, seed, needles and the sediment that settles into a paste in the bottom of the channel. That builds up steadily and is invisible from the ground, so guarded gutters tend to be neglected until they overflow. Annual clearing with the guards lifted is normally enough.",
        },
        {
          question: "Do you repair gutters as well as clean them?",
          answer:
            "We handle the small things that come up on the day — resecuring a bracket, resealing a joint, refitting an end cap or a length of guard — and those are usually part of the visit. Full replacement of a run, re-pitching a system or renewing rotten fascia is a bigger job with its own quote. Either way you see photographs of what was found before anything is decided.",
        },
        {
          question: "Do you work off ladders or from the roof?",
          answer:
            "From ladders in most cases, properly footed and standoff-braced so nothing rests on the gutter itself — a ladder leant against a full gutter is how a run gets bent. Where the pitch and the access make it safer, we work from the roof instead. On multi-storey and commercial buildings the method is agreed with the property manager before the day rather than decided on it.",
        },
      ],
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
        "Moss lifted off shingle, tile and metal with a low-pressure treatment — never a lance, which takes years off the roof it is supposed to be saving.",
      overviewHeading: "Granules Don't Grow Back",
      overview:
        "The mineral granules on an asphalt shingle are its sunscreen and most of its life expectancy, and a pressure washer strips them in a single pass. We treat instead: a low-pressure application that kills moss and lichen at the root, a soft brush only where a mat needs it, and then time. Everything is worked down-slope, never against a lap — and the gutters are cleared after the roof, not before.",
      included: [
        {
          title: "Asphalt shingle, tile and metal roofs",
          photo: "roofSurfaces",
          description:
            "Three surfaces with three tolerances. Asphalt shingle is the most common here and the least forgiving of pressure; concrete and clay tile are more robust but crack under a careless footfall; metal and standing-seam need a product that will not attack the coating. The method is set at the quote, not from the ground.",
        },
        {
          title: "Moss and lichen lifted at low pressure",
          photo: "roofMoss",
          description:
            "Thick moss on a coastal roof grows a mat that grips into the granule surface, so tearing it off takes the granules with it. Treated first, it releases as a sheet and lifts cleanly, with a soft brush used only where a mat is heavy. Lichen is slower — its holdfast grips harder — and keeps clearing for weeks after the visit.",
        },
        {
          title: "Valleys, vents and skylight kerbs cleared",
          photo: "roofValleys",
          description:
            "The places where a roof actually leaks. Valleys carry water off two slopes at once and block first; vent boots, stack collars and skylight kerbs catch debris on their upslope side and hold it against the seal. All of it is cleared by hand so the channels run free, which matters more than the visible slope does.",
        },
        {
          title: "Gutters cleared after the roof, not before",
          photo: "roofGutters",
          description:
            "Roof cleaning fills gutters — with moss, grit and dislodged granules — so clearing them first is wasted work. They come last, with the runs emptied, the downspouts flushed and the water watched out at the bottom, which means the drainage system is working on the day we leave rather than blocked by the roof job.",
        },
        {
          title: "Flashing and vent condition report",
          photo: "roofFlashing",
          description:
            "Walking a roof is the only good look anyone gets at it, so we use it. Step and chimney flashing, sealant beads, ridge caps, vent boots and any lifted or missing shingles are checked and photographed, and you get told what is urgent and what is simply old. We do not roof, so there is nothing behind the report.",
        },
        {
          title: "Preventative treatment to slow regrowth",
          photo: "roofTreatment",
          description:
            "On a wet, shaded coastal roof the moss is coming back — the only question is how fast. A preventative application after cleaning, or a zinc strip at the ridge so rainwater carries a trace of metal down the slope, typically doubles the interval between cleans. Quoted as an option: on a sunny roof it is not worth it.",
        },
      ],
      cta: "Book Your Roof Clean",
      trust: {
        blurb:
          "A roof is the most expensive thing on a property to get wrong, which makes it worth knowing who is walking on yours. We are licensed and fully insured for work at height, we use a method that does not shorten the roof's life to make the day go quicker, and we will tell you honestly when a roof is past cleaning and into replacement — including on the occasions when saying so costs us the job.",
        points: [
          "Fully insured and licensed for work at height",
          "Operating from New Westminster across Greater Vancouver",
          "Single homes, strata roofs and commercial buildings",
          "Free quotes, with photographs of what we found",
          "Every job guaranteed — including the honest no",
        ],
      },
      closing: "Ready to Take the Moss Off, Not the Roof?",
      closingPhoto: "roofClosing",
      metaDescription:
      "Roof moss removal across Greater Vancouver. Shingle, tile and metal roofs treated at low pressure — no lance, no lost granules — gutters cleared after.",
      faqs: [
        {
          question: "Will cleaning damage my shingles?",
          answer:
            "Not the way we do it. The damage people associate with roof cleaning comes from pressure washing, which strips the mineral granules that protect an asphalt shingle from UV and can take years off the roof in an afternoon. A low-pressure treatment kills the growth and lets it release on its own, and the brushwork is limited to lifting mats that are already loose. Nothing is scrubbed against the lap of a shingle.",
        },
        {
          question: "Why not just pressure wash it? It would be quicker.",
          answer:
            "It would, and it is the single most common way a roof is ruined by someone trying to help it. High pressure removes granules, forces water up under the courses and behind flashings, and leaves the moss root structure in place so it regrows within a season anyway. You get a roof that looks dramatically better for a year and fails several years early. We do not offer it, at any price.",
        },
        {
          question: "How long until the moss comes back?",
          answer:
            "Three to five years is typical on a Greater Vancouver roof after a proper treatment, against roughly a year if the growth is simply knocked off. North-facing slopes, roofs under conifers and anything permanently shaded are at the short end of that. A preventative treatment or a zinc strip at the ridge extends it considerably, and we will tell you at the quote whether your roof is a candidate.",
        },
        {
          question: "How long before the roof looks clean?",
          answer:
            "Some of it is immediate and the rest is gradual. Surface algae and black streaking go quickly; heavy moss and established lichen die and then break down and wash off over the following few weeks, which on this coast the rain does for us. If you need the roof visibly clear by a particular date, tell us at the quote — it can change the method and it definitely changes the timing.",
        },
        {
          question: "Could roof cleaning affect my roof warranty?",
          answer:
            "Most shingle manufacturers explicitly warn against pressure washing and accept low-pressure cleaning, which is one of several reasons we work the way we do. If your roof is still inside its warranty period it is worth checking the manufacturer's own maintenance guidance, and we are happy to confirm in writing what method and what products were used on your roof so you have it on file.",
        },
        {
          question: "Do you walk on the roof?",
          answer:
            "Only where it is safe and appropriate for the surface. Asphalt shingle in mild weather takes foot traffic well; tile is walked on boards or not at all; a steep pitch, a wet day or an aged roof means the work is done from ladders, edge access or a pole. The approach is decided at the quote, and if a roof should not be walked we will say so before booking rather than after arriving.",
        },
      ],
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
        "Interior walls, ceilings and trim; exterior siding, fascia and railings — washed, filled, caulked and primed long before the first finish coat.",
      overviewHeading: "The Paint Is the Last Ten Percent",
      overview:
        "On this coast a coating fails from underneath rather than from above. Paint laid over a chalky, damp or flaking surface lets go within a season whatever was in the tin, so most of our hours go into washing down, scraping back to a sound edge, feathering, filling and caulking. Exteriors are checked for moisture before priming, and we work to a dew-point window rather than a calendar.",
      included: [
        {
          title: "Interior walls, ceilings, trim and doors",
          photo: "paintInterior",
          description:
            "Full rooms or single elements: walls, ceilings, baseboards, casings, doors, spindles and built-ins. Cut lines are done freehand by brush where a steady hand beats tape, and rolled surfaces are laid off in one direction so the sheen reads evenly. Sheen is chosen per surface.",
        },
        {
          title: "Exterior siding, fascia, soffits and railings",
          photo: "paintExterior",
          description:
            "Wood, Hardie, stucco and metal, with the north and west elevations getting the closest attention because that is where a coating fails first here. Sprayed work is always back-rolled or back-brushed so the film is worked into the surface rather than sitting on it — the difference between eight years and three.",
        },
        {
          title: "Washing, scraping and feather sanding",
          photo: "paintPrep",
          description:
            "Every surface is washed to remove chalk, dirt, mildew and salt, because paint will not bond through any of them. Failed coating is scraped back to an edge that holds, then feathered so the repair disappears under the finish rather than showing as a ridge. Inside, that also means filling, sanding and dusting off.",
        },
        {
          title: "Caulking and minor wood repair",
          photo: "paintCaulking",
          description:
            "Open joints are how water gets behind a wall, and painting over them just hides the entry point. Siding-to-trim joints, window and door perimeters, corner boards and mitres are caulked with a flexible exterior sealant and tooled off. Soft trim, sill and fascia are cut out and made good before priming.",
        },
        {
          title: "Spot and full priming",
          photo: "paintPriming",
          description:
            "Primer is what the finish coat actually bonds to. Bare timber, filler, patched drywall and any burn-through from sanding gets spot-primed; weathered elevations get primed in full. Stains, knots and tannin bleed need a blocking primer — which is why a mark keeps reappearing.",
        },
        {
          title: "Masking, protection and a daily tidy",
          photo: "paintProtection",
          description:
            "Floors covered, furniture centred and sheeted, hardware and switch plates removed rather than cut around, and outside, planting and paving protected. Everything is made usable again at the end of each day, not the end of the job — living in a house being painted comes down to how the crew leaves it at five.",
        },
      ],
      cta: "Book Your Painting Quote",
      trust: {
        blurb:
          "Painting puts a crew inside your home, or on ladders against it, for days at a stretch — which asks more of a contractor than most exterior work does. We are licensed and insured for both, we protect what we are working around rather than working around what we should have protected, and the colours, sheens and surfaces are agreed in writing before a tin is opened so nobody discovers a misunderstanding on day three.",
        points: [
          "Licensed and insured, interior work and exterior",
          "New Westminster based, working across the region",
          "Houses, townhomes, strata common areas and commercial units",
          "Free colour and surface consultation with every quote",
          "Not finished until you have walked it with us",
        ],
      },
      closing: "Ready for a Finish That Survives the Winter?",
      closingPhoto: "paintClosing",
      metaDescription:
      "Interior and exterior painting across Greater Vancouver. Surfaces washed, scraped, filled, caulked and primed properly before any finish coat goes on.",
      faqs: [
        {
          question: "What time of year can you paint outside here?",
          answer:
            "Roughly April through October, and the constraint is not the season but the conditions on the day. Exterior coatings need surface temperatures above about ten degrees, a dry substrate and enough of a window before dew or rain for the film to form. That rules out most of a Greater Vancouver winter and makes late spring and early autumn the busiest booking periods, so exterior work is worth arranging well ahead.",
        },
        {
          question: "How long does an exterior repaint last in this climate?",
          answer:
            "Seven to ten years on well-prepared wood siding, longer on fibre cement, and less on exposed south and west elevations or anywhere that stays damp. The variable that moves that number most is preparation rather than the paint: a properly washed, scraped, primed surface will hold a mid-range coating far longer than a premium coating rolled onto a chalky wall. Trim and railings usually need attention before the field does.",
        },
        {
          question: "Do you spray or brush and roll?",
          answer:
            "Both, chosen for the surface. Spraying is faster and lays a more even film on siding, fences and large ceilings; brush and roller is right for trim, cut lines and anywhere overspray would be a problem. Where we spray an exterior we back-roll or back-brush behind it, which works the coating into the surface instead of leaving it sitting on top — that step is what makes sprayed work last.",
        },
        {
          question: "Do I need to move out, or empty the rooms?",
          answer:
            "No on both counts for most jobs. We work room by room so the house stays livable, move and sheet furniture ourselves rather than asking you to clear it, and put everything back at the end of each day. What helps is taking down anything fragile or personal from the walls beforehand. If low-odour products matter — a nursery, an allergy, someone working from home — say so and we will specify accordingly.",
        },
        {
          question: "Do you supply the paint, and can I pick the brand?",
          answer:
            "We supply it, and the quote names the product and the number of coats so you can see exactly what you are getting rather than the word 'premium'. If you have a brand or a line you prefer, that is fine and the quote is adjusted for it. Colour selection is part of the free consultation, and we would rather sample two or three on the actual wall than have you choose from a chip under shop lighting.",
        },
        {
          question: "What is not included in a painting quote?",
          answer:
            "Anything structural found once the surface is opened up: rotten sheathing behind failed trim, water damage inside a wall, failed windows. Those get reported with photographs and quoted separately rather than absorbed quietly or painted over. Lead-safe procedures on pre-1980 homes and full stucco or siding replacement are also separate. The quote itself lists what is in it, surface by surface, so the boundary is on paper before we start.",
        },
      ],
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
        "Driveways, walkways, strata lots and commercial entrances cleared and salted before the first arrival — booked as a season, or called out event by event.",
      overviewHeading: "The Risk Isn't the Snow. It's 7 a.m.",
      overview:
        "Snow here is wet, heavy and almost always overnight, which is what makes it a liability: nothing in Greater Vancouver is set up for it, and by morning it has compacted into ice under the first few footsteps. We watch the forecast and dispatch at an agreed trigger depth, usually two centimetres, so a site is done before the first car turns in. Every visit is logged with time, depth and product.",
      included: [
        {
          title: "Driveways, walkways and building entrances",
          photo: "snowDriveways",
          description:
            "Cleared to the surface rather than to a passable rut, with snow banked where it will not melt back across the path it came off or block sightlines at the street. Entrances, thresholds and the first few metres of walkway are done by hand and salted — that transition to a wet lobby floor is where most falls happen.",
        },
        {
          title: "Strata visitor lots and parking aisles",
          photo: "snowLots",
          description:
            "Aisles, stalls, ramps and turning areas ploughed on a route agreed in advance so residents can still get out. Stockpile locations are set at the start of the season, not improvised at five in the morning — a pile in the wrong corner blocks four stalls for a fortnight. Parkade ramps get a membrane-safe product.",
        },
        {
          title: "Forecast monitoring and trigger-depth dispatch",
          photo: "snowForecast",
          description:
            "You do not have to watch the sky or make the call. We monitor the forecast through the season and dispatch automatically once accumulation reaches the trigger depth in your contract — commonly two centimetres, adjustable for the site. Often before it stops falling.",
        },
        {
          title: "Salting, brining and de-icing",
          photo: "snowSalting",
          description:
            "Product matched to the temperature and the surface. A liquid brine laid before an event stops ice bonding and cuts what has to be cleared afterwards; granular salt after clearing; magnesium chloride or a CMA blend on new concrete and parkade membranes. Rates are measured.",
        },
        {
          title: "Ice cleared at doors, steps and ramps",
          photo: "snowIce",
          description:
            "The handful of square metres that carry most of a site's liability. Steps, thresholds, ramps, handrail bases and the drip line under a canopy refreeze first and hardest, especially where meltwater runs across them overnight. Compacted ice is chipped and cleared rather than salted over, then treated. It is hand work.",
        },
        {
          title: "Seasonal contracts or per-event call-outs",
          photo: "snowContracts",
          description:
            "A seasonal contract holds capacity for your site from November to March at a fixed price, whatever the winter does — which is what a strata or a landlord needs for a budget and for an insurer. Per-event call-out costs less in a mild year. Either way, the log is yours.",
        },
      ],
      cta: "Book Your Snow Contract",
      trust: {
        blurb:
          "Snow service is bought once and judged on about four mornings a year, so the only question that matters is whether the company answers at five in the morning in January. We hold seasonal capacity rather than overselling it, we log every visit with a time and a product, and we carry the liability cover a strata council or a commercial landlord has to see before signing anything at all.",
        points: [
          "Fully licensed and insured, certificates for your council",
          "New Westminster based, dispatching across Greater Vancouver",
          "Private driveways, strata grounds and commercial sites",
          "Free site assessment and a fixed price for the season",
          "Service guaranteed for every event in your contract",
        ],
      },
      closing: "Ready Before the First Flake Lands?",
      closingPhoto: "snowClosing",
      metaDescription:
      "Snow removal and salting across Greater Vancouver. Driveways, strata lots and commercial entrances cleared at the agreed trigger depth, salted and logged.",
      faqs: [
        {
          question: "When do I need to book snow service?",
          answer:
            "Before the season, not during it. Seasonal contracts are set up through September and October, because that is when routes and capacity are allocated and once they are full they are full. Calling on the morning of the first real snowfall means joining a queue behind every contracted site, which in a bad week can mean a wait of a day or more. Booking early is genuinely the whole difference here.",
        },
        {
          question: "What is a trigger depth, and who sets it?",
          answer:
            "It is the accumulation at which we dispatch to your site without being called. Two centimetres is the common setting; a commercial entrance or a site with accessibility requirements often wants it lower, a quiet residential driveway can sit higher. It is written into the contract, so nobody has to make a judgement call at five in the morning about whether it is enough snow to be worth a visit.",
        },
        {
          question: "What time will you actually clear?",
          answer:
            "The aim is to have commercial and strata sites done before the first arrivals — generally before seven — and residential driveways cleared through the morning after those. Where snow keeps falling, sites get return visits rather than one pass, because a lot cleared at five and snowed on until nine has not been cleared. Overnight and continuing events are the reason contracts are written by event rather than by visit.",
        },
        {
          question:
            "Is a seasonal contract or per-event call-out better value?",
          answer:
            "A seasonal contract costs more in a mild winter and much less in a heavy one, and it fixes the number for a budget — which is why strata councils and commercial landlords almost always take it. It also guarantees you a place in the route. Per-event suits a private driveway where an occasional missed morning is an inconvenience rather than a liability. We will tell you honestly which one fits your site.",
        },
        {
          question:
            "What de-icer do you use on new concrete or over a parkade?",
          answer:
            "Not rock salt. Concrete under a year old scales badly under sodium chloride, and salt-laden meltwater running through a parkade deck attacks the reinforcement below it. Those areas get magnesium chloride or a CMA blend instead, which is gentler on concrete and on adjacent planting. Tell us at the site assessment if any area is newly poured, membraned or draining into landscaping, and it gets specified accordingly.",
        },
        {
          question: "What is not covered?",
          answer:
            "Roof snow load and ice damming are specialist work and are not part of a ground contract. Damage to items hidden under snow — low-voltage lighting, irrigation heads, unmarked kerbs and garden edging — is why we stake site hazards before the season and ask you to point out anything we would not know about. Extraction and trucking of stockpiled snow off a full site is quoted separately when a winter runs long enough to need it.",
        },
      ],
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
        "Layout planned with you, installed on commercial-grade LED, kept working through the season and taken down in January — none of it from the top of your own ladder.",
      overviewHeading: "The Hard Part Was Never the Lights",
      overview:
        "Anyone can buy a box of lights. The job is a wet gutter in November, a clip that has to hold through a coastal windstorm, and a cable run that reaches a switched outlet without crossing a walkway. We measure the elevation and cut every run to length, clip to the shingle edge or gutter lip — nothing stapled into your fascia — and put the scheme on a GFCI circuit and a timer before we leave.",
      included: [
        {
          title: "Roofline, gable and eave runs",
          photo: "lightsRooflines",
          description:
            "The line that defines the house from the street, and the one that has to be dead straight to look like anything. Runs are measured to each elevation and cut to length, clipped at consistent spacing along the shingle edge or gutter lip, and set so the bulbs face the road. Peaks, dormers and gable ends take the time.",
        },
        {
          title: "Porches, columns, railings and doorways",
          photo: "lightsPorches",
          description:
            "The close-range work people walk past, where spacing and neatness show. Columns are wrapped at an even pitch, railings run cleanly along their length, and doorways and wreaths are lit without a cord looping across the entry. Cables route under a step, never over it.",
        },
        {
          title: "Trees, shrubs and garden lighting",
          photo: "lightsTrees",
          description:
            "What stops a scheme reading as a single flat line across the front of the house. Trunks and limbs are wrapped from the base outwards, shrubs are net-lit or draped depending on shape, and pathway and bed lighting fills the ground level. A mature conifer will do more for a frontage than another string on the roof.",
        },
        {
          title: "Layout design and power routing",
          photo: "lightsDesign",
          description:
            "Before anything is ordered we measure the elevations, count the runs and find where the power actually is. That sets circuit loading, cord routing and whether a timer or a photocell suits. It is also where the design happens — warm white or colour, C9 or mini, roofline only or full frontage — and you agree it first.",
        },
        {
          title: "In-season repairs and replacements",
          photo: "lightsService",
          description:
            "Included, not chargeable. A dropped section, a failed run, a clip lost to an atmospheric river in the second week of December — we come back and fix it, in the weather it broke in. Everything on a Greater Vancouver roofline in winter is being tested by wind and water for six straight weeks.",
        },
        {
          title: "January takedown and labelled storage",
          photo: "lightsTakedown",
          description:
            "Booked at the same time as the install, so it is not something you have to arrange in January. Everything comes down, gets coiled by run and labelled with where it goes, and is boxed for next year — and the clips come off the roofline with it. Where storage is part of the agreement, your bins go with us.",
        },
      ],
      cta: "Book Your Light Install",
      trust: {
        blurb:
          "Holiday lighting is electrical work at height in the worst weather of the year, done to a deadline that does not move. That is the entire argument for not doing it off your own ladder, and it is also the reason to check that whoever does it for you is properly covered before they are standing on your gutter. We are — and everything else here is the same arrangement we offer on any other RainCity job.",
        points: [
          "Licensed and insured for work at height",
          "Based in New Westminster, installing region-wide",
          "Family homes, strata frontages and commercial premises",
          "Free design visit and a quote before you commit",
          "Anything that fails in season, we come back and fix",
        ],
      },
      closing: "Ready to Light It Up Without the Ladder?",
      closingPhoto: "lightsClosing",
      metaDescription:
      "Holiday light installation across Greater Vancouver. Rooflines, porches and trees measured, clipped and powered safely, then serviced all season long.",
      faqs: [
        {
          question: "When should I book, and when do you install?",
          answer:
            "Book from September, and expect installation from early November onwards. The season is short and weather-dependent, so the calendar fills from the top down and the last two weeks of November are usually gone by the middle of October. Existing customers are scheduled first. Booking early also means the design visit happens in daylight and reasonable weather, which makes for a better scheme.",
        },
        {
          question: "Do you supply the lights, or can you install mine?",
          answer:
            "We normally supply, because commercial-grade LED on all-copper wire survives a coastal winter and big-box retail strings largely do not — and because runs cut to your elevations look completely different from strings joined end to end. If you already have quality product we will happily install it, though we cannot warrant how it performs and mid-season failures on customer-supplied lights are chargeable.",
        },
        {
          question:
            "How are the lights attached — will it damage my roof or gutters?",
          answer:
            "With purpose-made clips that grip the shingle edge, the gutter lip or the railing. Nothing is stapled, nailed or screwed into fascia, siding or shingle, all of which puncture the building envelope and cause exactly the leak they look harmless enough to cause. Clips come off completely at takedown, so nothing is left on the roofline over the summer either.",
        },
        {
          question: "What if a section stops working in December?",
          answer:
            "Call us and we come out and repair it at no charge, and that cover runs for the whole season. It is part of the installation rather than an add-on. Coastal windstorms and heavy rain do take sections down occasionally, which is precisely why the service is included — a scheme that goes dark on the fifteenth and stays dark is not what you paid for.",
        },
        {
          question: "Is takedown included, and can you store them?",
          answer:
            "Takedown is quoted with the install and scheduled at the same time, normally through January, so it is not a decision you have to make in the new year. Everything is coiled, labelled by run and boxed. Off-season storage is available as an option — your product goes with us and comes back for the next install — which is worth having if the alternative is a garage shelf you would rather use for something else.",
        },
        {
          question: "Do you do strata and commercial properties?",
          answer:
            "Yes: strata frontages, common entrances, townhouse complexes, retail units and office buildings, alongside residential work. Commercial schemes tend to be booked earliest because they involve a council or a management decision and often a larger design. Insurance certificates and any site documentation go to your manager on request, and access and out-of-hours work are agreed before install day.",
        },
      ],
    },
  },
  {
    slug: "landscaping-lawn-care",
    title: "Landscaping & Lawn Care",
    blurb: "Mowing, edging, beds and seasonal cleanups, kept on a schedule.",
    photo: "landscaping",
    detail: {
      heading: "Grounds That Stay Looked After",
      intro:
        "Mowing, edging, beds, pruning and seasonal cleanups on a set rhythm — for homes, strata grounds and commercial frontages across Greater Vancouver.",
      overviewHeading: "Cut High, Cut Often, Cut Sharp",
      overview:
        "Three things separate a lawn that looks looked after from one that merely gets mown. Height: two and a half to three inches through the summer, because a longer blade shades its own root zone and crowds out most of the weeds. Frequency: no more than a third of the leaf comes off in a visit. And a sharp blade — a dull one tears rather than cuts, and the torn tips brown off within a day.",
      included: [
        {
          title: "Mowing, edging and line trimming",
          photo: "lawnMowing",
          description:
            "Cut at the right height for the season on sharpened blades, with the direction alternated each visit. Hard edges along paths and driveways are cut back so the line stays where it was laid, bed edges are trimmed to the spade line, and trimming around posts and trunks is done without ring-barking anything.",
        },
        {
          title: "Bed weeding, edging and mulching",
          photo: "lawnBeds",
          description:
            "Beds are weeded by hand at the root rather than hoed off at the top, which is what stops the same weeds returning three weeks later. Edges are cut in with a spade to give the clean line that does most of the visual work on a property. Mulch is topped up at depth and kept clear of stems so nothing rots at the collar.",
        },
        {
          title: "Hedge and shrub pruning",
          photo: "lawnPruning",
          description:
            "Timed to the plant rather than the calendar. Spring-flowering shrubs are pruned after they flower, because cutting them in early spring removes the buds you were waiting for; hedges are trimmed with the face slightly battered so light reaches the base. Arisings are cleared as we go rather than left on the beds.",
        },
        {
          title: "Spring and fall cleanups",
          photo: "lawnCleanups",
          description:
            "The two visits that reset a property. In spring: winter debris cleared, perennials cut back, beds weeded and re-edged, mulch topped up, the first proper cut and a moss assessment. In autumn: leaves off, growth cut back, beds put to bed. Both are quoted separately.",
        },
        {
          title: "Leaf clearing and green-waste removal",
          photo: "lawnLeaves",
          description:
            "Leaf fall here runs for two months, and a lawn left under a wet mat of them comes back thin and diseased in spring. Leaves are cleared off lawns, beds, paths and driveways while they are still dry enough to move rather than after they have plastered down. Everything goes on the truck and off the property.",
        },
        {
          title: "Weekly, biweekly or monthly schedules",
          photo: "lawnSchedule",
          description:
            "Weekly through the growing season is what a lawn wants here, dropping to fortnightly as growth slows in late summer, then monthly through the winter for tidying and leaf work. Strata and commercial grounds are contracted for the year with the frequency stepping by season. Same crew, same day of the week.",
        },
      ],
      cta: "Book Your Lawn Care",
      trust: {
        blurb:
          "Grounds maintenance is a relationship rather than a transaction — the same crew, on your property, most weeks of the year. Ours are licensed and insured, they turn up on the day the schedule says they will, and the price is set for the season so no invoice arrives that you were not expecting. Strata councils and property managers get the documentation they need the first time they ask for it rather than the third.",
        points: [
          "Fully licensed and insured for grounds work",
          "A New Westminster crew covering the whole region",
          "Private gardens, strata grounds and commercial frontages",
          "Free walk-round and a written price for the season",
          "Unhappy with a visit? We return before the next one",
        ],
      },
      closing: "Ready to Stop Thinking About the Lawn?",
      closingPhoto: "lawnClosing",
      metaDescription:
      "Landscaping and lawn care across Greater Vancouver — mowing at the right height, bed edging, seasonal pruning and cleanups for homes and strata grounds.",
      faqs: [
        {
          question: "How often should the lawn be cut in Greater Vancouver?",
          answer:
            "Weekly from April to about the end of June, when growth is at its fastest and a fortnightly cut would take more than a third of the leaf off at once. Fortnightly is usually enough through the drier part of the summer, and monthly visits through the winter cover tidying, leaf work and edges. Most schedules here step through all three rather than holding one frequency all year.",
        },
        {
          question: "Do you take the clippings and green waste away?",
          answer:
            "Yes — clippings when we are collecting rather than mulching, and all prunings, leaves and cleanup arisings without exception. It goes on the truck and off the property to be composted. Nothing is piled behind a shed or tipped into a back corner, which matters more than it sounds: a green-waste pile against a fence line is where the next season's weeds and the rats both come from.",
        },
        {
          question: "Do I pay through the winter when nothing is growing?",
          answer:
            "There is still work in winter — leaf clearing, edges, dormant pruning, keeping hard surfaces clear of moss and debris — so visits continue at a lower frequency. Annual contracts are usually priced as a level monthly figure across the year rather than tracking the season, which suits most strata and commercial budgets. Residential customers can take the same arrangement or pay per visit.",
        },
        {
          question: "Can you deal with moss in the lawn?",
          answer:
            "Moss in a lawn here is a symptom rather than a disease: shade, compaction, poor drainage and acidic soil. Killing it without changing any of those means it returns by the following spring. We will treat and rake it out, then tell you which of the underlying causes is actually driving it — usually aeration, overseeding, and cutting higher — because that is what changes the lawn rather than the season's appearance.",
        },
        {
          question: "Do you look after strata and commercial grounds?",
          answer:
            "Yes, and a good deal of our work is exactly that: townhouse complexes, apartment grounds, retail frontages and office landscaping. Those are normally annual contracts with the frequency stepped by season, a named schedule day and a defined scope, and insurance documentation goes to the council or the manager on request. Ad-hoc work outside the scope is quoted before it happens, not added to an invoice.",
        },
        {
          question: "What is not included in a regular maintenance visit?",
          answer:
            "Anything that is a project rather than upkeep: turf replacement, new planting and design, irrigation installation or repair, tree work needing a certified arborist, retaining walls and hardscaping. Spring and fall cleanups are also quoted separately, because each is several times the size of a normal visit. What the schedule does cover is written into the agreement, so the line is on paper before the season starts.",
        },
      ],
    },
  },
];

// --- Locations -------------------------------------------------------------

/**
 * The nine communities RainCity travels to, and the single source for all of
 * them — exactly as `services` above is for the catalogue. The Locations nav
 * dropdown, the `/locations` page (its coverage index and its card grid), the
 * `areaServed` in every piece of structured data and the homepage keyword set
 * all derive from this array. Add a community here and all of them follow.
 *
 * One list still does not derive and must be updated by hand alongside it:
 * the "Service area" block in `public/llms.txt`, which is a static file.
 *
 * It used to be a bare `string[]`. It became a record when `/locations`
 * landed and needed a slug, a photograph and a line of copy per community;
 * keeping a second array keyed by city name would have been exactly the drift
 * the note above exists to prevent.
 *
 * `bearing` is the field the coverage index is built on, and it is the reason
 * that section is not simply another card grid. The Fraser is the fact that
 * organises this region — it is what New Westminster sits on, what the
 * bridges queue for, and the first thing anyone booking work here thinks in.
 * Grouping the nine by which bank they are on, and which way they lie from
 * the base, is real geography a reader can check on the map beside it, rather
 * than a "12 km · 18 min" figure that would look precise and be unverified.
 *
 * "Ridge Meadow" is carried through from the client's own site and nav (it is
 * the Maple Ridge / Pitt Meadows pair, more usually written "Ridge Meadows").
 * Left as the client writes it rather than quietly corrected: it is their
 * name for the area and it is the string every existing link uses. Worth
 * raising with them — it is a one-line change here if they want the s.
 *
 * PHOTOGRAPHY NOTE, and it matters more here than on any other page. The
 * `photo` on each entry is a frame of the kind of work and the kind of
 * property that community is made of — the ladder and the leaf litter for
 * Anmore's treed lots, the crew on a heritage roof for New Westminster, a
 * sealed suburban driveway for Langley. None of them was taken in the city it
 * sits under, and no alt text on the page claims otherwise: each keeps the
 * description of the frame that is actually there, which is the rule
 * everywhere else in photos.ts and is not bent for this.
 *
 * All nine are drawn from the thirty-two slots in photos.ts that hold a real
 * photograph. The per-service detail sets are the obvious place to shop for
 * community-flavoured frames — a needle-packed gutter run, a mossed roof
 * slope, a sealed parking lot — and seventy of those slots are still
 * `placeholder` entries waiting on the shoot, so they render as the hatch and
 * are not eligible. Check that before swapping one in.
 *
 * Nine genuine location photographs should replace these, at which point
 * photos.ts gains nine entries and this column points at them instead.
 * Nothing else on the page changes.
 */
/**
 * The per-community copy for `/locations/[slug]`.
 *
 * It lives on `Location` for exactly the reason `detail` lives on `Service`:
 * a lookup table keyed by slug would let a tenth community be added and a
 * page ship with nothing on it. Here the compiler refuses the incomplete
 * entry.
 *
 * Everything in here is written per community and none of it is a template
 * with the name swapped. That is not a stylistic preference — nine pages
 * carrying one paragraph with a single proper noun changed is the doorway-
 * page pattern by definition, and it was flagged as the risk on this route
 * before a line of it was written. The test to apply when editing: if a
 * sentence below would still read true with a different city's name in it,
 * it is wrong, and it should be rewritten rather than shipped.
 *
 * WHAT IS ASSERTED HERE, AND WHAT IS NOT. The geography is checkable — which
 * municipalities make up a pair, what the housing stock is, which ground is
 * flat and which is on a hill, that it rains harder at the east end of the
 * valley than at the west. Nothing below invents an operational commitment:
 * no response-time promise, no crew count, no "we are in your area every
 * Tuesday". The `faqs` are published as FAQPage structured data, so every
 * answer has to be true standing on its own, away from the page that frames
 * it — and where one describes equipment or method it restates what the
 * service pages already say (the truck's own water tank, the roughly
 * five-storey water-fed pole limit, never pressure-washing a roof) rather
 * than adding a new claim to the pile.
 *
 * Worth putting in front of the client all the same, in the same pass as the
 * testimonials, the policy pages and the blog: this copy reads as RainCity's
 * own local knowledge and nobody at RainCity has been asked whether they
 * agree with it. It is a smaller exposure than the invented reviews — a
 * wrong sentence about Tsawwassen's salt air is an error, not a fabricated
 * endorsement — but it is the same kind of thing, and it should be read
 * before launch.
 */
export type LocationDetail = {
  /** Banner supporting line. One sentence, and about this place. */
  intro: string;
  /**
   * The route's own <title>. Written per community rather than built from a
   * `Property Maintenance in {name}, BC` template, for two reasons.
   *
   * The derived form printed the brand twice — once as the generic phrase and
   * again as the company name — and ran to 75 characters on New Westminster,
   * which is fifteen past the point a SERP truncates. More importantly it
   * could only ever say the slug's own name, and two of the nine slugs are
   * groupings rather than municipalities: nobody searches "Tri-Cities
   * pressure washing", they search Coquitlam or Port Moody, and nobody
   * searches "Ridge Meadow" at all. Those two titles now carry the names
   * people actually type, which is the whole point of the field being
   * written rather than generated.
   *
   * Keep every one of these at 60 characters or under.
   */
  metaTitle: string;
  /** The route's own meta description. Keep to 150-158 characters. */
  metaDescription: string;
  /** The local block's h2. Not "Property Care In X" nine times over. */
  heading: string;
  /** The local block itself. Two paragraphs, four to six sentences. */
  body: readonly [string, string];
  /**
   * Three short notes beside that copy. Each is a fact about working here
   * that a reader could check, not a benefit statement — the block is a
   * local brief, and the moment these turn into "fast, friendly service" it
   * stops being worth reading.
   */
  notes: readonly [string, string, string];
  /**
   * The Google Maps embed query, and the zoom that frames it.
   *
   * Written out per community rather than built from `name` + ", BC". Two of
   * the nine are not place names at all — "Tri-Cities" and "Ridge Meadow"
   * are groupings and Google resolves neither to a boundary — so each points
   * at the municipality holding most of its housing, and its caption says so
   * rather than letting the outline imply the coverage stops there.
   *
   * Zoom is per community for the same reason the hub map is pinned at 10:
   * the embed has no fit-to-bounds, so the number is the only control over
   * what is in frame. Surrey at 13 would show a quarter of Surrey.
   */
  mapQuery: string;
  mapZoom: number;
  /** What the map is showing, and what it is not. */
  mapCaption: string;
  /** Four or five, written for this community. Published as FAQPage. */
  faqs: Faq[];
  /**
   * Two or three neighbouring communities, by slug.
   *
   * Geography, not a ranking and not a reciprocal-link arrangement: each one
   * is somewhere a reader who landed on the wrong page might actually live.
   * The slugs resolve through `nearbyLocations` below rather than being read
   * directly, so a renamed slug drops the link instead of publishing a dead
   * one.
   */
  nearby: readonly string[];
  /** The closing headline. Names the community; everything under it is fixed. */
  closing: string;
};

export type Location = {
  name: string;
  slug: string;
  /** One line for the card. What the properties here are actually like. */
  blurb: string;
  /** Which bank of the Fraser, and which way from the New Westminster base. */
  bearing: "base" | "north-west" | "north-east" | "south";
  /**
   * The incorporated municipalities this entry actually covers, where `name`
   * is not one of them.
   *
   * Seven of the nine entries are municipalities and leave this unset. Two are
   * groupings: "Tri-Cities" is Coquitlam, Port Coquitlam and Port Moody, and
   * "Ridge Meadow" is Maple Ridge and Pitt Meadows. Neither is a place — you
   * cannot find either on a map, and `{"@type":"City","name":"Ridge Meadow"}`
   * asks a crawler to resolve a city that does not exist.
   *
   * So the structured data expands this list where it is set: `areaServed` on
   * every node that carries it now names five real municipalities instead of
   * two groupings, which is what a search engine matching a query against a
   * service area is trying to do. The page copy already names all five —
   * sixteen to thirty-one times each — so this is the markup catching up with
   * the prose rather than a new claim about where the company works.
   *
   * The display name stays as it is. "Maple Ridge & Pitt Meadows" on a card,
   * in the nav and in nine breadcrumb trails is a layout problem, and the
   * grouping is how the company actually talks about the area.
   */
  municipalities?: readonly string[];
  photo: PhotoKey;
  /** The copy for this community's own page. See `LocationDetail` above. */
  detail: LocationDetail;
};

export const locations: Location[] = [
  {
    name: "Anmore",
    slug: "anmore",
    blurb:
      "Large treed lots above Port Moody, where the gutters fill with needles long before the leaves start.",
    bearing: "north-east",
    photo: "gutterCleaning",
    detail: {
      intro:
        "A village of acreages above Port Moody, where the conifers overhang the roofline all year and the driveway is usually longer than the house.",
      metaTitle: "Anmore Exterior Cleaning & Property Care | RainCity",
      metaDescription:
        "Gutters, roofs, windows and driveways on Anmore's treed acreage lots. under conifer cover all year. Exterior cleaning from a crew based in New Westminster.",
      heading: "Working On Anmore's Acreages",
      body: [
        "Anmore is a village of a couple of thousand people spread across large lots between Port Moody and Buntzen Lake, and nearly every property in it is detached, private and standing in second-growth fir and cedar. That one fact sets most of the work. Needles and cones land on the roof and in the gutters twelve months of the year rather than for six weeks in October, and a north-facing slope under that much canopy stays damp enough to grow moss straight through the summer.",
        "There is very little strata or commercial ground in the village, so what we do here is overwhelmingly residential and it happens at the scale of an acreage — long driveways, detached garages and shops, decks and railings that see more shade than sun, and roof access that more often means working from the roof than off a ladder in a flowerbed. Anmore also sits high enough that a snowfall which turns to rain down on the inlet stays snow up here, which is worth knowing before you book anything for January.",
      ],
      notes: [
        "Conifer needles all year, not a six-week leaf drop",
        "Long private driveways, and grade at the top of most of them",
        "Holds snow after Port Moody has gone back to rain",
      ],
      mapQuery: "Anmore, British Columbia, Canada",
      mapZoom: 13,
      mapCaption:
        "Anmore, between Port Moody and Buntzen Lake. We work the whole village, not a radius drawn inside it.",
      faqs: [
        {
          question: "Will you come out to Anmore for a single job?",
          answer:
            "Yes. Travel is already included in the price we quote, so an Anmore property is priced the same way a New Westminster one is; the usual minimum job size of $120 applies, though it depends on the job, and a travel fee may apply to an on-site visit this far out. What we will often suggest is combining work into one visit rather than two: if the gutters are being cleared the roof is already being walked, and doing both while the crew is set up costs less than coming back for the second one.",
        },
        {
          question: "Our driveway is long and steep. Does that make it harder?",
          answer:
            "It is the first thing we look at when we quote, and it is rarely a problem. Water, pressure, detergent and power all come off the truck, so it does not need to be parked at the house to work on it — hose and cord runs cover most Anmore driveways. Where the grade or the surface will not take a loaded vehicle we park where it is safe and carry in, and if that adds time to the job it is on the quote rather than added to the invoice afterwards.",
        },
        {
          question: "We are on a well and a septic field. Does that change anything?",
          answer:
            "It does, and it is worth telling us before we quote rather than on the day. The truck carries its own tank of water, so a wash here is not a draw on your well. Around a septic field we keep run-off away from the bed and use the lowest pressure and the mildest product that will do the job — which is how a soft-wash is run anyway, but it is the reason we ask about the field before choosing a method.",
        },
        {
          question: "How often does a treed Anmore lot need the gutters cleared?",
          answer:
            "More often than a property on an open lot lower down, because the debris here arrives continuously rather than seasonally. One autumn clear is frequently not enough under heavy conifer cover and a lot of these properties settle on twice a year. We would rather look at the roofline and tell you what yours needs than sell you a frequency over the phone.",
        },
        {
          question: "Do you take on strata or commercial work in Anmore?",
          answer:
            "Yes, though there is very little of either in the village itself. We are licensed and insured whether the invoice goes to a homeowner or to a strata council, and a certificate goes to a manager the same day it is asked for. Most of our strata and commercial work in this direction sits a few minutes down the hill in the Tri-Cities.",
        },
      ],
      nearby: ["tri-cities", "ridge-meadow", "burnaby"],
      closing: "Book Property Care in Anmore",
    },
  },
  {
    name: "Burnaby",
    slug: "burnaby",
    blurb:
      "Towers, townhouse complexes and single-family streets — a good deal of our strata common-area work sits here.",
    bearing: "north-west",
    photo: "windowCleaning",
    detail: {
      intro:
        "Four town centres, a mountain and a long industrial spine — the widest mix of property types we work in inside one city.",
      metaTitle: "Burnaby Exterior Cleaning & Property Care | RainCity",
      metaDescription:
        "Exterior cleaning in Burnaby, BC — strata common areas, parkades, high glass and family homes from Metrotown up to Burnaby Heights. Free written quotes.",
      heading: "One City, Four Town Centres",
      body: [
        "Burnaby fits four town centres, a university on a mountain and a long industrial spine into a single municipality, so the work changes street by street. Metrotown, Brentwood and Lougheed are concrete and glass — parkades, lobbies, common-area walkways and windows that only come clean off a water-fed pole. The streets between them are largely mid-century detached houses on standard lots, with the deep eaves and the mature street trees that come with that vintage.",
        "In between sit the townhouse complexes, and they are where a large share of our strata work is: shared driveways and visitor bays that stain, siding that greens on the shaded elevations, and gutter runs counted in buildings rather than in metres. Burnaby is also the one city we cover where the elevation swings hard inside its own boundary — Burnaby Mountain holds weather that Big Bend never sees — so a winter schedule for a complex up near SFU is not the same schedule as one down in Edmonds.",
      ],
      notes: [
        "Four town centres, and a strata for most blocks of them",
        "Mid-century detached stock: deep eaves, mature street trees",
        "Burnaby Mountain keeps snow the flats have already lost",
      ],
      mapQuery: "Burnaby, British Columbia, Canada",
      mapZoom: 12,
      mapCaption:
        "Burnaby, from the Vancouver line across to the Brunette. The whole city is in the service area, not a radius inside it.",
      faqs: [
        {
          question: "Do you take on strata contracts in Burnaby?",
          answer:
            "Yes, and a good deal of our Burnaby work is exactly that. Strata work is normally set up as an annual agreement with the frequency stepped by season, a named schedule day and a scope written down before the year starts, so anything outside it is quoted before it happens rather than appearing on an invoice. Insurance documentation goes to the council or the property manager on request.",
        },
        {
          question: "Can you reach the glass on a low-rise or mid-rise building?",
          answer:
            "Up to about five storeys, yes, and most of it is done from the ground on a carbon-fibre pole fed with purified water rather than off a ladder leaning on the building — steadier for the crew, and nothing resting on your gutter line. That covers the four- and five-storey wood-frame stock Burnaby has a great deal of. Above that height we say so at the quote rather than after the crew has arrived.",
        },
        {
          question: "Do you wash parkades and common-area hard surfaces?",
          answer:
            "Yes — parkade decks and ramps, loading bays, bin enclosures, walkways and visitor parking are routine strata and commercial work. Ramps and decks with a traffic membrane get a product and a pressure chosen for the membrane rather than for the stain, and the method is agreed with the manager before the day rather than decided on site.",
        },
        {
          question: "How far ahead should we book?",
          answer:
            "It depends on the season more than on the city. Anything with a weather window on it stacks up — gutters before the autumn rain, sealing during a dry stretch — and those are worth booking well ahead. One-off work outside those peaks is usually a matter of weeks. Either way you get a date when we quote, not a place in a queue.",
        },
        {
          question: "Is there a travel charge for Burnaby?",
          answer:
            "Not on the job. Travel is already included in the price we quote, Burnaby included — a job is priced on the property in front of us, exactly as one on our own street in New Westminster would be. A travel fee may apply to an on-site visit depending on location, and being next door does not make the work cheaper either; the rate is the rate.",
        },
      ],
      nearby: ["new-westminster", "vancouver", "tri-cities"],
      closing: "Book Property Care in Burnaby",
    },
  },
  {
    name: "Delta",
    slug: "delta",
    blurb:
      "Ladner, Tsawwassen and North Delta: flat, open and close to the water, which is hard on painted siding.",
    bearing: "south",
    photo: "painting",
    detail: {
      intro:
        "Ladner, Tsawwassen and North Delta — flat, open, and close enough to the water that salt gets into everything.",
      metaTitle: "Delta, Ladner & Tsawwassen Exterior Cleaning | RainCity",
      metaDescription:
        "Exterior cleaning in Ladner, Tsawwassen and North Delta — salt-film window cleaning, siding soft-washing and driveway sealing work. Free written quotes.",
      heading: "Three Communities, One Exposure",
      body: [
        "Delta is three places that share a municipality and very little else. Ladner is a village core with dyked farmland along the south arm of the Fraser. Tsawwassen faces the Strait of Georgia with almost nothing between it and the weather. North Delta is postwar subdivision on the escarpment above the river. What they have in common, and what matters to us, is exposure — this is the most open, least sheltered ground in our service area, and the wind carries salt and grit onto surfaces here that stay clean inland.",
        "It shows on paint and on glass first. Marine air leaves a film on south- and west-facing elevations that a rinse will not shift, siding chalks earlier than it does up the valley, and glass in Tsawwassen can pick up a haze within weeks of being cleaned. Roofs tend towards algae and black streaking rather than the deep moss the north-east of the region grows, because there is more light and more air moving across them. Lots are flatter and generally larger than the regional average too, so driveways, patios and long fence runs are a bigger share of what gets quoted in Delta than almost anywhere else we go.",
      ],
      notes: [
        "Marine air — salt film on glass and on painted siding",
        "Flat, open lots with long driveways and fence runs",
        "Algae and black streak rather than deep moss",
      ],
      mapQuery: "Delta, British Columbia, Canada",
      mapZoom: 11,
      mapCaption:
        "Delta — Ladner, Tsawwassen and North Delta. All three, not only the one nearest our base.",
      faqs: [
        {
          question: "Do you cover all of Delta, or only North Delta?",
          answer:
            "All of it. North Delta, Ladner and Tsawwassen are one service area for us and priced the same way, which is on the property rather than on the postal code. Tsawwassen is the furthest point south we work, and travel there is already built into the price of the job.",
        },
        {
          question: "Does being near the water change how often things need doing?",
          answer:
            "In our experience yes, particularly for glass and for exterior paint on the elevations facing the water and the prevailing wind. Salt film builds on those faster than it does inland, and a coating on a west-facing wall in Tsawwassen works harder than the same coating on a sheltered street. We would rather look at your elevations and tell you what we see than publish an interval that would be a guess for your property.",
        },
        {
          question: "Can you paint an exterior this close to the coast?",
          answer:
            "Yes, and the preparation matters more here than the product does. On this coast a coating fails from underneath rather than from above, so most of the hours go into washing down, scraping back to a sound edge, feathering, filling and caulking. Exteriors are checked for moisture before priming and we work to a dew-point window rather than to a calendar date, which on an exposed Delta site occasionally means moving a day.",
        },
        {
          question: "Do you work on strata and commercial property in Delta?",
          answer:
            "Yes — townhouse complexes, retail frontages, offices and light-industrial sites are all normal work for us here. The arrangement is the one a strata council anywhere else in the region would get: a written scope, a named schedule, insurance documentation to the manager on request, and anything outside the scope quoted before it happens.",
        },
        {
          question: "Is Delta far enough out to cost more?",
          answer:
            "Not the job itself: travel is already included in the price we quote, which is set by the property and the work. A travel fee may apply to an on-site visit depending on where in Delta the property is. Being flexible about the day can make a booking easier to place at the far ends of the area, but it does not change the figure on the quote.",
        },
      ],
      nearby: ["surrey", "vancouver", "new-westminster"],
      closing: "Book Property Care in Delta",
    },
  },
  {
    name: "Langley",
    slug: "langley",
    blurb:
      "The Township and the City both. Bigger lots, longer driveways, and surfaces that take a full season of weather.",
    bearing: "south",
    photo: "concreteAsphaltSealing",
    detail: {
      intro:
        "The Township and the City both — bigger lots, longer driveways, and a climate that runs a step away from the coast's.",
      metaTitle: "Langley Exterior Cleaning & Property Care | RainCity",
      metaDescription:
        "Driveway and lot sealing, pressure washing, gutters and roofs across Willoughby, Walnut Grove, Fort Langley and out to Aldergrove. Free written quotes.",
      heading: "Acreages, Subdivisions And A Longer Dry Window",
      body: [
        "Langley is two municipalities and about as wide a spread of property as this region offers. Willoughby and Walnut Grove are recent subdivision — dense, new, and largely strata or small-lot detached. Fort Langley and Murrayville are heritage and mature. South of the highway, Brookswood, Campbell Valley and the land out towards Aldergrove are acreages, horse property and workshops. Twenty minutes inside the Township and the job in front of us has changed completely.",
        "It is also far enough inland to keep its own weather. Summers run hotter and drier than they do at the water, winters run colder, and Langley sees frost and snow on days when Vancouver sees rain — which matters for anything with a temperature window attached to it. Sealing is the clearest case: a driveway or a parking lot wants a warm dry stretch to cure properly, and out here that window opens earlier and closes later than it does on the coast. There is simply more concrete and asphalt per property in Langley than anywhere else we work, and it is a correspondingly larger share of what we are asked to quote.",
      ],
      notes: [
        "Acreages, shops and long concrete aprons south of the highway",
        "New Willoughby subdivision at one end, Fort Langley heritage at the other",
        "Hotter, drier summers than the coast — a longer sealing window",
      ],
      mapQuery: "Langley, British Columbia, Canada",
      mapZoom: 11,
      mapCaption:
        "The City of Langley and the Township that surrounds it. Both are covered, from Walnut Grove down to Aldergrove.",
      faqs: [
        {
          question: "Do you cover the Township as well as the City of Langley?",
          answer:
            "Both, and we do not price them differently. Walnut Grove, Willoughby, Fort Langley, Murrayville, Brookswood, Campbell Valley and Aldergrove are all inside the service area along with the City itself. An acreage twenty minutes out is quoted on what the property needs, the same as a townhouse in Willoughby.",
        },
        {
          question: "When is the right time to seal a driveway out here?",
          answer:
            "During a warm dry stretch, and Langley gets a longer one than the coast does. A sealer needs the surface dry through and warm enough to cure, with no rain in the window on either side — in practice late spring through early autumn, and it means we will move a booking rather than lay a coat into weather that will spoil it. Cracks are routed and filled and the surface is degreased and prepared before anything goes down; that preparation is most of the job.",
        },
        {
          question: "Our driveway and apron are much bigger than a city lot. How is that quoted?",
          answer:
            "On what is actually there, measured at the quote. Large acreage driveways, turning areas, shop aprons and outbuilding surrounds are normal work in Langley and there is no rate card being read off — we look at the surface, its condition and its size, and give you a written figure before anything starts. That figure does not move afterwards.",
        },
        {
          question: "Do you handle strata complexes in Willoughby and Walnut Grove?",
          answer:
            "Yes. The newer Langley complexes are much the same work as the Burnaby and Tri-Cities ones: shared driveways and visitor parking, common-area gutter runs, siding on the shaded elevations, and hard surfaces that want the moss off in spring. It runs as an annual agreement with a written scope and a named schedule day, and insurance documentation goes to the council or manager on request.",
        },
        {
          question: "Do you do snow clearing and salting in Langley?",
          answer:
            "Yes, and Langley needs it on days the coast does not. Winter work is set up before the season rather than during it — the surfaces, the route and the trigger depth agreed in advance, along with where the snow gets stockpiled, so nobody is deciding that at five in the morning. Salt does very little far below freezing, which is why timing it ahead of a freeze matters more than the quantity.",
        },
      ],
      nearby: ["surrey", "ridge-meadow", "delta"],
      closing: "Book Property Care in Langley",
    },
  },
  {
    name: "New Westminster",
    slug: "new-westminster",
    blurb:
      "Home. Heritage houses on the hill and a steep grid of streets — we know which ones the truck can park on.",
    bearing: "base",
    // Was `aboutCrew`, which shows a crew RE-ROOFING a house — not one of the
    // eleven services, standing in for this company's work on its own home
    // page. Now the Westminster Pier Park frame: the SkyBridge and the
    // Pattullo arch make it unmistakably New Westminster, and it is the same
    // photograph /about's Home Ground section uses for the same city.
    photo: "aboutHomeGround",
    detail: {
      intro:
        "Home. The truck loads here, on the hill above the Fraser, and works its way out from it.",
      metaTitle: "New Westminster Exterior Cleaning & Property Care",
      metaDescription:
        "Exterior cleaning in New Westminster, BC — RainCity's own home city. Heritage window and gutter work on the hill, strata care at the Quay. Free quotes.",
      heading: "The City The Truck Loads In",
      body: [
        "New Westminster is where we are based, which means it is the city we know street by street rather than by postal code — and it is also one of the harder ones to work in. The old grid runs straight down the hill to the river, so a great many properties in Queen's Park, Glenbrooke and the Brow of the Hill sit on a slope with a lane behind and tight on-street parking in front. The heritage stock is tall and timber, with original single-glazed windows and boxed gutters that do not behave like the modern equivalents.",
        "Away from the hill the city changes again. Uptown and the Quay are towers and mid-rise strata, Sapperton mixes older houses with new density, and Queensborough is flat, newer and out on Lulu Island with the drainage that implies. Being based here mostly makes the practical things easier: we already know which streets the truck fits on, which lanes are worth backing into, and where parking is going to be a problem before the crew arrives rather than after.",
      ],
      notes: [
        "A steep heritage grid — slope, lanes and tight street parking",
        "Original glazing, boxed gutters, tall timber elevations",
        "Queensborough is flat and newer; the hill is neither",
      ],
      mapQuery: "New Westminster, British Columbia, Canada",
      mapZoom: 13,
      mapCaption:
        "New Westminster, our base. The whole city — the hill, the Quay, Sapperton and Queensborough across the bridge.",
      faqs: [
        {
          question: "Is it cheaper because you are based here?",
          answer:
            "No, and that is deliberate. Travel is already included in every price we quote and there is no local discount — a property in New Westminster is quoted on exactly the same basis as one in Langley or Tsawwassen, which is what the work in front of us takes. What being local actually buys you is scheduling: this is usually the easiest city in the area for us to fit a job into.",
        },
        {
          question: "There is nowhere to park on our street. Is that a problem?",
          answer:
            "Rarely, and it is something we plan for rather than discover. Water, pressure, detergent and power all come off the truck, so it does not need to be at the kerb outside the house — hose and cord runs cover most of the hill, and a lot of these properties are easier to reach from the lane behind than from the street in front. Where a job genuinely needs a parking arrangement, that is sorted at the quote.",
        },
        {
          question: "Can you clean original heritage windows without damaging them?",
          answer:
            "Yes, and on this stock the frames matter as much as the glass. Divided lights, timber sashes and old putty lines are washed by hand at a pressure that will not drive water past a failing bead, the whole opening is cleaned rather than only the pane, and anything we find — a soft sill, a cracked light, a sash that has dropped — is pointed out rather than quietly worked around.",
        },
        {
          question: "Do boxed or hidden gutters need something different?",
          answer:
            "They do. A boxed gutter is a built-in trough rather than a hung one, so it cannot be checked from the ground and a blockage backs water into the structure instead of over the lip. We clear them by hand, flush each outlet, run a flow test, and report the condition of the lining and the joints — which on an older New Westminster house is usually the more valuable half of the visit.",
        },
        {
          question: "Do you work with the Uptown and Quay strata buildings?",
          answer:
            "Yes. Mid-rise strata is routine work — common-area glass to about five storeys from a water-fed pole, parkade and walkway washing, gutter and roof work on the low-rise stock. It runs as an annual agreement with a written scope and a named schedule day, and insurance documentation goes to the council or manager on request.",
        },
      ],
      nearby: ["burnaby", "surrey", "vancouver"],
      closing: "Book Property Care in New Westminster",
    },
  },
  {
    name: "Ridge Meadow",
    slug: "ridge-meadow",
    municipalities: ["Maple Ridge", "Pitt Meadows"],
    blurb:
      "Maple Ridge and Pitt Meadows, out where the rain sits longest and a north-facing roof greens over fastest.",
    bearing: "north-east",
    photo: "roofCleaning",
    detail: {
      intro:
        "Maple Ridge and Pitt Meadows, at the wet end of the valley, where a north-facing roof greens over faster than anywhere else we go.",
      metaTitle: "Maple Ridge & Pitt Meadows Exterior Cleaning | RainCity",
      metaDescription:
        "Exterior cleaning in Maple Ridge and Pitt Meadows — roof moss treatment, soft washing and gutter clearing at the wettest end of the whole Fraser Valley.",
      heading: "The Wet End Of The Valley",
      body: [
        "Ridge Meadows takes the weather the rest of the region only hears about. Rainfall climbs as you move east up the Fraser, and against the Golden Ears the cloud stalls and empties — so moss, algae and lichen out here are not an occasional problem, they are the standing condition. A north-facing roof slope in Silver Valley or Websters Corners will green over in a season and a half, and the shaded half of a driveway does much the same.",
        "The two municipalities are not alike, though. Pitt Meadows is flat, agricultural and dyked, with a compact residential core and a great deal of open, exposed ground. Maple Ridge climbs from the river up into hillside subdivisions and acreages, which brings grade, gravel, outbuildings and roof pitches that have to be worked from above. Most of what we are asked for here is roof work, gutters and soft-washing, in roughly that order, and most of it is residential — the town centres carry the usual strata and retail frontage, and that gets the same crew.",
      ],
      notes: [
        "The wettest ground we cover — moss is a condition, not an event",
        "Pitt Meadows flat and open; Maple Ridge on the hill",
        "North-facing slopes green over first, and fastest",
      ],
      mapQuery: "Maple Ridge, British Columbia, Canada",
      mapZoom: 11,
      mapCaption:
        "Centred on Maple Ridge, where most of the housing sits. Pitt Meadows, immediately west of it, is covered on the same terms.",
      faqs: [
        {
          question: "Does this cover Pitt Meadows as well as Maple Ridge?",
          answer:
            "It covers both. Ridge Meadows is the pair — Maple Ridge and Pitt Meadows — and they are one service area for us, priced the same way. The map above is centred on Maple Ridge only because that is where most of the housing sits; Pitt Meadows is immediately west of it and is fully inside the area.",
        },
        {
          question: "Can you pressure wash the moss off our roof?",
          answer:
            "No, and we would talk you out of anyone who offers to. High pressure strips granules, forces water up under the courses and behind flashings, and leaves the moss root structure in place so it grows back within a season anyway — a roof that looks dramatically better for a year and then fails several years early. Moss comes off at low pressure with a treatment that kills the root, and out here that is a great deal of what we do.",
        },
        {
          question: "How often will a roof out here actually need doing?",
          answer:
            "More often than one at the west end of the region, because the growing conditions are simply better for moss. Rather than publish an interval we look at the pitch, the aspect, the surrounding trees and how much regrowth is already showing, and tell you what that particular roof needs. A preventative treatment after a clean slows the regrowth considerably and is usually the cheaper way to hold it.",
        },
        {
          question: "Is there a best time of year to book?",
          answer:
            "Gutters before the autumn rain rather than after the first storm — the single most useful piece of timing anywhere in this region, and it matters more here than most places. Roof and moss work runs through the milder parts of the year. Anything with a dry window on it, sealing especially, is harder to place out here than in Langley, so it is worth asking early rather than late.",
        },
        {
          question: "Do you go out to the acreages and the eastern edge?",
          answer:
            "Yes, across the built-up parts of both municipalities and out to the acreages around them. Travel is included in the price of the job; out on the acreages a travel fee may apply to an on-site visit, and the usual $120 minimum job size applies. If your property sits well beyond the edge of the map above, ask anyway — the answer takes one phone call, and we cross the odd boundary for the right job.",
        },
      ],
      nearby: ["tri-cities", "langley"],
      closing: "Book Property Care in Maple Ridge and Pitt Meadows",
    },
  },
  {
    name: "Surrey",
    slug: "surrey",
    blurb:
      "The largest area we cover, Cloverdale down to South Surrey, and no shortage of commercial ground to keep sealed.",
    bearing: "south",
    // Was `concreteSealing`, a 550x419 file stretched 2.6x across the hero
    // banner at desktop and visibly soft on every screen (image audit,
    // 2026-09-13). `powerParkades` is RainCity's own photograph, 1600px, of an
    // operator driving grime out of paving — the hard-surface work this
    // page's copy is about.
    photo: "powerParkades",
    detail: {
      intro:
        "The largest area we cover — Whalley down to the border, and more commercial hard surface than the rest of the region put together.",
      metaTitle: "Surrey Exterior Cleaning & Property Care | RainCity",
      metaDescription:
        "Exterior cleaning in Surrey, BC — lot sealing, commercial pressure washing, strata common areas and family homes from City Centre down to South Surrey.",
      heading: "Six Town Centres And A Lot Of Asphalt",
      body: [
        "Surrey is six town centres rather than one city, and covering it properly means treating it that way. City Centre is towers and new mid-rise. Guildford, Fleetwood and Newton are largely 1980s and 90s subdivision with the townhouse complexes that arrived alongside them. Cloverdale is older and quieter. South Surrey runs newer, larger and closer to the water. It is the biggest single area we work in and the one with the widest span of building ages.",
        "It also holds most of our commercial and light-industrial work. Campbell Heights, Port Kells and the Newton business parks are acres of asphalt and concrete — parking lots, aisles, loading bays, bin enclosures and frontages — and that is surface which has to be washed and sealed on a cycle rather than whenever somebody notices it. On the residential side the stock is newer than the regional average, which changes the job: less heritage detail, more vinyl and stucco, attached garages and wider driveways.",
      ],
      notes: [
        "Six town centres, and building stock from the 1970s to last year",
        "The region's densest concentration of lot and loading-bay work",
        "Newer residential stock — more vinyl and stucco than heritage timber",
      ],
      mapQuery: "Surrey, British Columbia, Canada",
      mapZoom: 11,
      mapCaption:
        "Surrey, from the Fraser down to the border. All six town centres are inside the service area, not only the north end.",
      faqs: [
        {
          question: "Which parts of Surrey do you cover?",
          answer:
            "All of it — Whalley and City Centre, Guildford, Fleetwood, Newton, Cloverdale and South Surrey, out to the Langley and Delta lines and down to the border. Surrey is the largest area we work in and it is not split into a near half and a far half; travel is already built into the price of a job anywhere in it.",
        },
        {
          question: "Do you seal commercial parking lots, and how often is that needed?",
          answer:
            "Yes — parking lots, aisles, loading areas and walkways are core commercial work for us. How often depends on the traffic the surface takes and the condition it is already in, which is why it is quoted after looking at it rather than off a published cycle. Cracks are routed and filled and the surface is degreased and prepared before any sealer goes down, and the sealer is chosen for the surface rather than one product being used on everything.",
        },
        {
          question: "Can commercial work happen outside business hours?",
          answer:
            "Yes, and for a lot of sites it has to. Commercial cleaning and washing can be scheduled nightly, weekly or monthly and worked around trading hours, deliveries and staff access. The scope and the schedule are agreed in writing before the first visit, so nobody on your side is finding out on the night what we intend to do.",
        },
        {
          question: "Do you look after strata complexes in Surrey?",
          answer:
            "Yes, and Surrey's townhouse stock is a large part of what we do south of the river. It runs as an annual agreement: a written scope, frequency stepped by season, a named schedule day, and insurance documentation to the council or property manager on request. Work outside the agreed scope is quoted before it happens rather than added to an invoice afterwards.",
        },
        {
          question: "Is South Surrey too far out?",
          answer:
            "No. South Surrey and the ground down towards the border are inside the service area on the same terms as everywhere else: travel included in the price, the usual $120 minimum job size, and a possible travel fee on an on-site visit at that distance. Being flexible on the day can make a booking easier to place at that end of the area, but it does not change the price.",
        },
      ],
      nearby: ["delta", "langley", "new-westminster"],
      closing: "Book Property Care in Surrey",
    },
  },
  {
    name: "Tri-Cities",
    slug: "tri-cities",
    municipalities: ["Coquitlam", "Port Coquitlam", "Port Moody"],
    blurb:
      "Coquitlam, Port Coquitlam and Port Moody. Hillside subdivisions, and hard surfaces that want the moss off every spring.",
    bearing: "north-east",
    photo: "powerWashing",
    detail: {
      intro:
        "Coquitlam, Port Coquitlam and Port Moody — hillside subdivision on one side, river and inlet flats on the other.",
      metaTitle: "Tri-Cities Exterior Cleaning, Coquitlam BC | RainCity",
      metaDescription:
        "Exterior cleaning in Coquitlam, Port Coquitlam and Port Moody — roof moss removal, pressure washing, gutters and strata common areas. Free written quotes.",
      heading: "Three Cities, And A Lot Of Gradient",
      body: [
        "The Tri-Cities are three municipalities with one thing in common: gradient. Burke Mountain, Westwood Plateau and Heritage Mountain are hillside subdivision built into second-growth forest, so driveways are steep, lots are shaded, and hard surfaces stay damp long enough to grow moss down the north side of the house. At the bottom of the hill, Port Coquitlam's river flats and Port Moody's inlet edge are flatter, older and closer to water.",
        "Most of the newer housing up the slopes is strata — townhouse complexes with shared driveways, visitor bays and long common-area gutter runs — and most of it wants the same list every spring: moss off the hard surfaces, gutters cleared before the wet, siding soft-washed where the canopy overhangs it. The plateaus also sit high enough to hold snow after the valley floor has turned back to rain, which is the single most useful thing to know when a council is setting a winter schedule up there.",
      ],
      notes: [
        "Steep, shaded hillside lots — moss on the north side as standard",
        "Plateau strata: shared driveways, visitor bays, long gutter runs",
        "Burke Mountain and Westwood hold snow the flats have lost",
      ],
      mapQuery: "Coquitlam, British Columbia, Canada",
      mapZoom: 11,
      mapCaption:
        "Centred on Coquitlam. Port Coquitlam and Port Moody sit either side of it and are covered on the same terms.",
      faqs: [
        {
          question: "Which cities does this cover?",
          answer:
            "Coquitlam, Port Coquitlam and Port Moody — all three, priced the same way. Anmore sits immediately above Port Moody and has a page of its own because the properties there are a different kind of work, but it is the same crew and the same service area.",
        },
        {
          question: "Our driveway is steep and shaded. Can it be cleaned safely?",
          answer:
            "Yes, and a shaded slope is one of the more worthwhile surfaces to do, because moss on a gradient is a slip risk as much as it is a stain. The surface is tested before we settle on a pressure, adjacent planting is protected as routine, and run-off is directed away from where it would do harm — which on a hillside lot means working out where downhill actually goes before starting rather than after.",
        },
        {
          question: "Do you take on townhouse strata complexes here?",
          answer:
            "Yes, and the plateau complexes are a large part of our Tri-Cities work. It runs as an annual agreement with a written scope, frequency stepped by season and a named schedule day, and insurance documentation goes to the council or manager on request. Common-area driveways, visitor parking, gutter runs and shaded siding are the usual list.",
        },
        {
          question: "Is winter different up on the plateaus?",
          answer:
            "It genuinely is. Burke Mountain and Westwood Plateau will be holding snow while Port Coquitlam has gone back to rain, so a winter service set up for the bottom of the hill can be the wrong plan at the top of it. Winter work is arranged before the season — surfaces, route, trigger depth and where the snow gets stockpiled agreed in advance — rather than improvised on the first cold morning.",
        },
        {
          question: "When should spring moss work be booked?",
          answer:
            "Ahead of the season rather than into it. Moss on hard surfaces here is an annual job on most shaded lots, and the properties that book early get the choice of dates. On roofs the answer is different: it comes off at low pressure with a treatment that kills the root, never with a pressure washer, and a preventative treatment afterwards is what slows the regrowth.",
        },
      ],
      nearby: ["anmore", "burnaby", "ridge-meadow"],
      closing: "Book Property Care in the Tri-Cities",
    },
  },
  {
    name: "Vancouver",
    slug: "vancouver",
    blurb:
      "Character houses, laneways and mid-rise strata. Access is tight, so the water-fed pole earns its keep.",
    bearing: "north-west",
    photo: "softWashing",
    detail: {
      intro:
        "Character houses, laneways and mid-rise strata, on lots where access is the first thing we look at.",
      metaTitle: "Vancouver Exterior Cleaning & Property Care | RainCity",
      metaDescription:
        "Exterior cleaning in Vancouver, BC — character-home window and gutter work, soft washing and mid-rise strata common areas, on the east side and the west.",
      heading: "The Tightest Lots We Work On",
      body: [
        "Vancouver is the most constrained city in our area, and access decides a great deal of the quote. Character houses in Kitsilano, Dunbar, Mount Pleasant and across the east side sit close to their neighbours on narrow lots, often with a laneway house behind and no driveway at all — which means no truck at the house, hose and cord runs down a side yard barely wide enough for a ladder, and a word with the neighbour before anything is set up on their side of the fence. Cambie, Main and the West End add mid-rise strata, where the glass goes higher than a ladder ought to.",
        "The building stock is old and it is detailed. Original wood windows with divided lights, painted trim and soffits, cedar shingle, and heavy street-tree cover — which means gutters fill from above rather than off the roof, and they do it twice a year rather than once. The advantage of a dense city is that we are rarely far away. The constraint is time on site: on a lot of Vancouver properties the setting up is a real fraction of the job, and we would rather price that honestly at the quote than discover it on the day.",
      ],
      notes: [
        "Narrow lots and laneways, and often nowhere to put the truck",
        "Original wood glazing and painted trim on the character stock",
        "Heavy street-tree cover — gutters fill from above, twice a year",
      ],
      mapQuery: "Vancouver, British Columbia, Canada",
      mapZoom: 12,
      mapCaption:
        "The City of Vancouver — east side and west, the West End and out along the peninsula.",
      faqs: [
        {
          question: "There is no driveway and no parking. Can you still do the job?",
          answer:
            "Almost always, and it is the first thing we assess at the quote. Water, pressure, detergent and power all come off the truck, so it does not have to be at the house — hose and cord runs reach down most side yards and in from most lanes. Where a job needs paid or permitted parking to happen at all, that sits inside the quoted figure rather than appearing as a line on the invoice afterwards.",
        },
        {
          question: "How high can you reach on a mid-rise building?",
          answer:
            "To about five storeys, worked from the ground on a carbon-fibre pole fed with purified water rather than from a ladder against the building. The water carries no minerals, so the glass dries without spotting, and nothing rests on your gutter line. Above that height, or where a pane can only be reached from outside a fixed line, we say so at the quote rather than after the crew has arrived.",
        },
        {
          question: "Can you clean original wood windows without wrecking them?",
          answer:
            "Yes. Divided lights, timber sashes and old putty beads are washed by hand at a pressure that will not drive water past a failing bead, and the whole opening is cleaned — sill, track, frame — rather than only the pane, so no tidemark reappears a week later. Anything we find on the way, a soft sill or a cracked light, is pointed out instead of quietly worked around.",
        },
        {
          question: "Do you work with strata councils in Vancouver?",
          answer:
            "Yes — low- and mid-rise strata is routine work. Common-area glass to about five storeys, walkway and parkade washing, gutter and roof work on the lower stock. It is set up as an annual agreement with a written scope and a named schedule day, and insurance documentation goes to the council or the property manager on request.",
        },
        {
          question: "How often do gutters need clearing on a treed Vancouver street?",
          answer:
            "Under mature street trees, usually twice a year rather than once — leaf fall lands on the roof and washes into the run, and a single autumn clear leaves a spring's worth of seed and blossom sitting in it. Every run is cleared by hand, outlets are flushed and flow-tested, and the debris leaves with us rather than going into your green bin.",
        },
      ],
      nearby: ["burnaby", "new-westminster", "delta"],
      closing: "Book Property Care in Vancouver",
    },
  },
];

/**
 * Resolve a community's `nearby` slugs to the records themselves.
 *
 * Filtering rather than mapping, and that is the point: a slug that no longer
 * matches anything drops out of the list instead of rendering a card that
 * links to a 404. The alternative — typing `nearby` as a union of the nine
 * slugs — would catch it at compile time and would also make the array
 * self-referential, which TypeScript will not do for a value this file is
 * still in the middle of defining.
 */
export function nearbyLocations(location: Location): Location[] {
  return location.detail.nearby
    .map((slug) => locations.find((l) => l.slug === slug))
    .filter((l): l is Location => Boolean(l));
}

/**
 * ===========================================================================
 * PLACEHOLDER COMMUNITY CONTENT — written for the build, not supplied.
 * ===========================================================================
 *
 * The "Off The Clock" section on every community page. The client asked for
 * community involvement "with some local events pictures", said real phone
 * photos exist but cannot be supplied yet, and on 2026-09-13 told us to write
 * plausible entries ourselves so the section can be reviewed as a finished
 * design. So:
 *
 *  - THE EVENTS AND PLACES ARE REAL and were checked on 2026-09-13: the Hyack
 *    Festival parade (New Westminster, May), Burnaby Blues + Roots at Deer
 *    Lake Park (August), the Cloverdale Rodeo and Country Fair (Surrey, May
 *    long weekend), the Tsawwassen Sun Festival (Delta, BC Day weekend), the
 *    Fort Langley Cranberry Festival (October), Pitt Meadows Day (first
 *    Saturday in June), the Haney Farmers Market at Memorial Peace Park
 *    (Saturdays, May to October), Golden Spike Days at Rocky Point Park (Port
 *    Moody, late June), and the Great Canadian Shoreline Cleanup (Ocean Wise
 *    and WWF-Canada, national, September).
 *  - RAINCITY'S PART IN EACH IS ASSUMED. Nobody has confirmed that the crew
 *    turned out for any of these. Every entry is the kind of help an exterior
 *    cleaning company plausibly gives — litter crews, shoreline and trail
 *    clean-ups, snow and leaves for neighbours — and none claims a
 *    sponsorship, an official role or a relationship with an organiser.
 *  - THE PHOTOGRAPHS ARE ILLUSTRATIVE STOCK. See the community block in
 *    photos.ts, and `locationPage.community.illustrative`.
 *
 * BEFORE LAUNCH, and raise it with the other launch items: the client replaces
 * each entry with what actually happened (or deletes it), and swaps in their
 * own photos. A named festival on a business's site is read as "we were
 * there"; if the crew was not, the entry comes out. An empty array for a
 * community renders no section rather than an empty one.
 *
 * Kept as a map beside the locations rather than inside each `detail` block
 * — the `relatedBySlug` arrangement — so the whole placeholder set sits under
 * one banner and can be replaced in one pass. Each community's three entries
 * are its own: the doorway-page rule on `LocationDetail` applies here too.
 *
 * `when` is a month or a season, never a year — a dated entry goes stale the
 * day after launch. The first entry is the large feature frame.
 */
export type CommunityItem = {
  /** Month or season. Printed as the caption's eyebrow. */
  when: string;
  title: string;
  /** One line, roughly 90 characters. What the help was, and where. */
  line: string;
  photo: PhotoKey;
};

export const communityBySlug: Record<string, readonly CommunityItem[]> = {
  anmore: [
    {
      when: "April",
      title: "Litter pick on the Buntzen Lake trails",
      line: "Gloves and bags on the trails around Buntzen Lake before the summer crowds arrive.",
      photo: "communityTrail",
    },
    {
      when: "Winter",
      title: "Driveways for neighbours",
      line: "When snow holds up the hill, clearing long driveways for neighbours who cannot.",
      photo: "communitySnow",
    },
    {
      when: "November",
      title: "Needles and leaves, cleared",
      line: "A clear-out of needles and leaves on lots whose owners can no longer get up a ladder.",
      photo: "communityLeaves",
    },
  ],
  burnaby: [
    {
      when: "August",
      title: "Blues + Roots at Deer Lake Park",
      line: "Working the litter crew on the grounds of the free festival at Deer Lake Park.",
      photo: "communityConcert",
    },
    {
      when: "April",
      title: "Brunette River clean-up",
      line: "Pulling litter out of the banks of the Brunette before the spring runoff moves it on.",
      photo: "communityTrail",
    },
    {
      when: "November",
      title: "Leaves for neighbours",
      line: "Clearing yards and walks for Burnaby neighbours who cannot manage the autumn drop.",
      photo: "communityLeaves",
    },
  ],
  delta: [
    {
      when: "August",
      title: "Tsawwassen Sun Festival",
      line: "On bags and gloves along the Rotary Parade route over the BC Day long weekend.",
      photo: "communityParade",
    },
    {
      when: "September",
      title: "Shoreline Cleanup at Boundary Bay",
      line: "Part of the Great Canadian Shoreline Cleanup, on the beach at Boundary Bay.",
      photo: "communityShoreline",
    },
    {
      when: "November",
      title: "Leaves in Ladner",
      line: "Clearing autumn leaves off walks and lawns for Ladner neighbours who need a hand.",
      photo: "communityLeaves",
    },
  ],
  langley: [
    {
      when: "October",
      title: "Fort Langley Cranberry Festival",
      line: "Helping keep the village streets clear through the festival weekend before Thanksgiving.",
      photo: "communityStreetFair",
    },
    {
      when: "April",
      title: "Brydon Lagoon clean-up",
      line: "A spring litter pick on the paths around Brydon Lagoon in Langley City.",
      photo: "communityTrail",
    },
    {
      when: "Winter",
      title: "Walks cleared for neighbours",
      line: "After a snowfall, clearing walks and steps for neighbours who cannot do it themselves.",
      photo: "communitySnow",
    },
  ],
  "new-westminster": [
    {
      when: "May",
      title: "Hyack Festival parade",
      line: "Clearing the route behind the parade, from downtown up to Queens Park.",
      photo: "communityParade",
    },
    {
      when: "September",
      title: "Shoreline Cleanup on the Fraser",
      line: "Part of the Great Canadian Shoreline Cleanup, along the river below the Quay.",
      photo: "communityShoreline",
    },
    {
      when: "Winter",
      title: "Stairs and sidewalks on the hill",
      line: "When snow lands on New West's slopes, clearing steps and walks for neighbours who cannot.",
      photo: "communitySnow",
    },
  ],
  "ridge-meadow": [
    {
      when: "May to October",
      title: "Haney Farmers Market",
      line: "Helping keep Memorial Peace Park clear through the Saturday market season.",
      photo: "communityMarket",
    },
    {
      when: "June",
      title: "Pitt Meadows Day",
      line: "On the clean-up crew for the parade and the day at Pitt Meadows Athletic Park.",
      photo: "communityParade",
    },
    {
      when: "September",
      title: "Alouette River clean-up",
      line: "Part of the Great Canadian Shoreline Cleanup, along the banks of the Alouette.",
      photo: "communityShoreline",
    },
  ],
  surrey: [
    {
      when: "May",
      title: "Cloverdale Rodeo and Country Fair",
      line: "Working the litter crew around the fairgrounds over the Victoria Day long weekend.",
      photo: "communityCrew",
    },
    {
      when: "September",
      title: "Shoreline Cleanup at Crescent Beach",
      line: "Part of the Great Canadian Shoreline Cleanup, on the sand at Crescent Beach.",
      photo: "communityShoreline",
    },
    {
      when: "Winter",
      title: "Sidewalks for neighbours",
      line: "After a snowfall, clearing walks for Surrey neighbours who cannot get out to do it.",
      photo: "communitySnow",
    },
  ],
  "tri-cities": [
    {
      when: "June",
      title: "Golden Spike Days",
      line: "Working the litter crew at Rocky Point Park through Port Moody's festival weekend.",
      photo: "communityConcert",
    },
    {
      when: "September",
      title: "Shoreline Cleanup in Port Moody",
      line: "Part of the Great Canadian Shoreline Cleanup, along the Shoreline Trail at the head of the inlet.",
      photo: "communityShoreline",
    },
    {
      when: "November",
      title: "Leaves in Coquitlam",
      line: "Clearing autumn leaves off walks and yards for Coquitlam neighbours who need a hand.",
      photo: "communityLeaves",
    },
  ],
  vancouver: [
    {
      when: "September",
      title: "Shoreline Cleanup at Jericho Beach",
      line: "Part of the Great Canadian Shoreline Cleanup, working the tideline at Jericho.",
      photo: "communityShoreline",
    },
    {
      when: "April",
      title: "A litter pick on Commercial Drive",
      line: "A spring neighbourhood clean-up along the Drive and the side streets off it.",
      photo: "communityCrew",
    },
    {
      when: "Winter",
      title: "Sidewalks for neighbours",
      line: "The city asks owners to clear their walks by ten. Some neighbours cannot, so we help.",
      photo: "communitySnow",
    },
  ],
};

/** The entries for one community, in order. Empty when there are none. */
export function communityFor(location: Location): readonly CommunityItem[] {
  return communityBySlug[location.slug] ?? [];
}

/**
 * Partners that operate in this community, for the Local Partners section.
 *
 * Only a partner whose `local.slugs` names this community qualifies — the
 * slugs come from each partner's own published service area or campus list,
 * never from a guess. Partners with a national reach (`local.everywhere`)
 * fill the row up to three, so a community with fewer local matches still
 * gets a full row, and the card says "Across Canada" rather than implying
 * they are local.
 */
export function localPartnersFor(
  location: Location,
): { partner: Partner; tag: string; where: string }[] {
  // Logo or nothing, as on /about and the homepage: no name-only partner card
  // anywhere on the site (standing rule, 2026-09-23).
  const all = partnerships.groups.flatMap((group) =>
    group.items
      .filter((partner) => partner.logo)
      .map((partner) => ({ partner, group })),
  );
  const local = all.flatMap(({ partner, group }) =>
    partner.local && "slugs" in partner.local && partner.local.slugs.includes(location.slug)
      ? [{ partner, tag: group.tag, where: `${partner.local.verb} ${location.name}` }]
      : [],
  );
  const national = all.flatMap(({ partner, group }) =>
    partner.local && "everywhere" in partner.local
      ? [{ partner, tag: group.tag, where: partner.local.everywhere }]
      : [],
  );
  return [...local, ...national].slice(0, 3);
}

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
    // The slug is now written on the record rather than derived from the
    // label here. It was `toLowerCase().replace(/\s+/g, "-")`, which happens
    // to produce the right string for all nine — and would have quietly
    // produced a different one the first time a community arrived with an
    // apostrophe or an ampersand in its name.
    children: locations.map((l) => ({
      label: l.name,
      href: `/locations/${l.slug}`,
    })),
  },
  { label: "Blog", href: "/blog" },
];

// --- Section content -------------------------------------------------------

export const about = {
  label: "About Us",
  headline: "Restoring the Beauty of Your Property",
  /** The client's own wording, supplied 2026-09-23. */
  body: "RainCity Property Maintenance provides reliable strata and apartment building maintenance services across Greater Vancouver, including janitorial cleaning, pressure washing, window cleaning, leaf blowing and bagging, balcony hand washing, and seasonal exterior care. We help strata councils and property managers keep their buildings clean, safe, and well-maintained year-round.",
  tags: [
    {
      title: "Skilled Team",
      support:
        "Trained technicians who have worked these roofs and walls before.",
      icon: "team",
    },
    {
      // Was "Fast Service", changed at the client's request. The support line
      // makes no claim about rates — it describes how a price is given, which
      // is the part of "affordable" the site can stand behind in writing.
      title: "Affordable Prices",
      support: "Fair rates, a written quote first, and no surprises on the invoice.",
      icon: "receipt",
    },
    {
      title: "Trusted Work",
      support:
        "Insured, accountable, and used to strata and property-manager standards.",
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
    /*
     * The last two rows were "Eco-Friendly Cleaning" and "Holiday & Specialty
     * Cleaning" until 2026-09-23, replaced at the client's request. Both new
     * bodies restate facts the client has confirmed — insured, more than five
     * years trading, travel built into the price — and name no rate, because
     * "affordable" is the client's word and a figure would be ours.
     */
    {
      title: "Affordable Pricing",
      body: "Fair, competitive rates with a free written quote before any work begins, and travel already built into the price of the job.",
    },
    {
      title: "Insured, Over Five Years in Business",
      body: "Fully insured, and trusted by homeowners, strata councils and property managers across Greater Vancouver for more than five years.",
    },
  ],
  cta: "Get Free Quote",
} as const;

/**
 * One RainCity job, photographed before and after.
 *
 * THE SINGLE SOURCE FOR PROJECT PHOTOGRAPHY. The homepage shows every entry
 * as a before/after pair; each service page's gallery shows the entries whose
 * `service` is that page's slug, and opens `before`, `after` and then `more`
 * in its viewer. Add a job here and both places pick it up.
 *
 * `job` and `detail` describe what the photographs show and nothing else —
 * no street, no customer, no date, no claim about method the photos do not
 * support. `service` is a slug from `services`; it builds the homepage
 * card link and picks the gallery, so a typo shows up as a broken link in the
 * build check and as a job missing from its page.
 */
export type Project = {
  id: string;
  job: string;
  detail: string;
  service: string;
  before: PhotoKey;
  after: PhotoKey;
  /** Further photographs of the same job, shown in the service gallery. */
  more?: readonly PhotoKey[];
};

export const projects = {
  label: "Our Recent Projects",
  headline: "See The RainCity Difference",
  body: "Explore real before and after transformations from our residential and commercial property maintenance projects across Canada.",
  /**
   * FALSE SINCE 2026-09-25: every pair below is a RainCity job, from the
   * client's own photographs. The two stock pairs these replaced were
   * labelled illustrative, with the disclaimer shown above them; with real
   * work in place the label would now be untrue, so it is off. It is kept as
   * a switch in case a stock frame is ever needed here again — set it true
   * and the disclaimer returns with it.
   */
  illustrative: false,
  disclaimer:
    "Illustrative of the conditions we work in and the standard we finish to. Photographs of RainCity jobs replace these as each project is documented.",
  /** The homepage shows this many pairs, and the rest behind a button. */
  initialCount: 4,
  moreLabel: "Show More Projects",
  lessLabel: "Show Fewer Projects",
  /**
   * The client's order in the feedback doc, except that the strongest
   * like-for-like pairs lead, because only the first four show before the
   * button: the two balconies and the garden benches are shot from nearly
   * the same spot before and after, which is the comparison a reader wants
   * first. Every entry is one job; nothing is paired across two properties.
   */
  items: [
    {
      id: "balcony-deck",
      job: "Balcony Cleaning",
      detail: "Condo balcony, concrete deck",
      service: "balcony-cleaning",
      before: "projectBalconyDeckBefore",
      after: "projectBalconyDeckAfter",
    },
    {
      id: "concrete-benches",
      job: "Concrete Benches",
      detail: "Garden benches, pressure washed",
      service: "power-washing",
      before: "projectBenchesBefore",
      after: "projectBenchesAfter",
    },
    {
      id: "balcony-enclosed",
      job: "Balcony Cleaning",
      detail: "Enclosed balcony, coated floor",
      service: "balcony-cleaning",
      before: "projectBalconyEnclosedBefore",
      after: "projectBalconyEnclosedAfter",
    },
    {
      id: "glass-canopy",
      job: "Glass Patio Cover",
      detail: "Overhead glass panels",
      service: "window-cleaning",
      before: "projectGlassCanopyBefore",
      after: "projectGlassCanopyAfter",
    },
    {
      id: "roof",
      job: "Roof Cleaning",
      detail: "Asphalt shingle roof",
      service: "roof-cleaning",
      before: "projectRoofBefore",
      after: "projectRoofAfter",
    },
    {
      id: "siding",
      job: "Siding Wash",
      detail: "Horizontal siding and trim",
      service: "power-washing",
      before: "projectSidingBefore",
      after: "projectSidingAfter",
    },
    {
      id: "paver-path",
      job: "Paver Path",
      detail: "Side-yard walkway, pressure washed",
      service: "power-washing",
      before: "projectPaversBefore",
      after: "projectPaversAfter",
    },
    {
      id: "entry",
      job: "Stone Wall & Entry",
      detail: "Capstones, pillars and walkway",
      service: "power-washing",
      before: "projectEntryBefore",
      after: "projectEntryAfter",
    },
  ] as readonly Project[],
};

/**
 * The project gallery on each service page — requested by the client on
 * 2026-09-25: "each service page add a section to put some pictures for each
 * of the project we did. I can send but put some placeholders first just to
 * show me. And then can click for more pictures."
 *
 * The gallery holds `slots` cards. A service's real projects (from
 * `projects.items`) fill them first; the rest are placeholders, drawn as
 * plates that say photos are on the way. Clicking a real card opens every
 * photograph of that job. Four pages have real work today — Balcony
 * Cleaning, Power Washing, Window Cleaning and Roof Cleaning — and the other
 * eight are placeholder-only until the client sends their photos.
 */
/**
 * The service page's photo section (2026-09-25). ALWAYS FULL ROWS OF THREE,
 * on the client's request that no page show one or two columns.
 *
 * REAL JOBS FIRST — a service's jobs in `projects.items`, however many, then
 * examples from `examples.bySlug` top the row up to the next multiple of
 * three (Power Washing: four jobs and two examples, two full rows). The body
 * becomes `bodyMixed`, which says example photos are marked.
 *
 * NO REAL JOB YET — three examples, under a different label and heading
 * ("What This Work Looks Like") and a body saying in plain words they are
 * examples and not RainCity jobs.
 *
 * WHY STOCK AND NOT OTHER COMPANIES' PHOTOS. The client first suggested
 * taking photos from other cleaning companies' websites; that was declined
 * (another company's copyrighted photo, presented as RainCity's own project,
 * is both infringement and a false claim), and Touseef chose free-licence
 * stock instead. THE LABELLING IS THE CONDITION: every example card carries
 * "Example photo" / "Not a RainCity job", in the viewer too; never caption
 * one as a job, never show one on the homepage.
 *
 * Examples step aside on their own as real jobs are added. List them in the
 * order they should be dropped last-first. Titles describe only what the
 * photograph shows.
 */
export const serviceGallery = {
  label: "Recent Projects",
  heading: "See the Work Up Close",
  body: "Photographs from our own jobs, before and after. Select a project to see every photo from it.",
  bodyMixed: "Photographs from our own jobs, before and after, with example photos marked as such. Select a project to see every photo from it.",
  viewLabel: "View photos",
  /** Cards per row at desktop; the row is always topped up to a multiple. */
  perRow: 3,
  examples: {
    label: "What to Expect",
    heading: "What This Work Looks Like",
    body: "Example photographs of this kind of work, not RainCity jobs. Photos from our own projects on this service are being added.",
    tag: "Example photo",
    detail: "Not a RainCity job",
    viewLabel: "View larger",
    bySlug: {
      "balcony-cleaning": [
        { photo: "exampleBalconyCleaning1", title: "Paved balcony, glass railing" },
      ],
      "power-washing": [
        { photo: "examplePowerWashing1", title: "Surface cleaner on paving" },
        { photo: "examplePowerWashing2", title: "Pressure-washing a sidewalk" },
      ],
      "window-cleaning": [
        { photo: "exampleWindowCleaning1", title: "Squeegee on wet glass" },
        { photo: "exampleWindowCleaning2", title: "Glass frontage from a lift" },
      ],
      "roof-cleaning": [
        { photo: "exampleRoofCleaning1", title: "Moss on the ridges" },
        { photo: "exampleRoofCleaning2", title: "Lichen across old slate" },
      ],
      "commercial-cleaning": [
        { photo: "exampleCommercialCleaning1", title: "Lobby floor, mopped" },
        { photo: "exampleCommercialCleaning2", title: "Desks wiped down" },
        { photo: "exampleCommercialCleaning3", title: "Open-plan office, after hours" },
      ],
      "soft-washing": [
        { photo: "exampleSoftWashing1", title: "Clean white lap siding" },
        { photo: "exampleSoftWashing2", title: "White rendered wall" },
        { photo: "exampleSoftWashing3", title: "Board-and-batten exterior" },
      ],
      "concrete-and-asphalt-sealing": [
        { photo: "exampleConcreteAndAsphaltSealing1", title: "Hot crack sealing" },
        { photo: "exampleConcreteAndAsphaltSealing2", title: "Concrete at the garage" },
        { photo: "exampleConcreteAndAsphaltSealing3", title: "Broad concrete apron" },
      ],
      "gutter-cleaning": [
        { photo: "exampleGutterCleaning1", title: "Moss along the gutter" },
        { photo: "exampleGutterCleaning2", title: "Sapling growing in a gutter" },
        { photo: "exampleGutterCleaning3", title: "Clear gutter and downspout" },
      ],
      painting: [
        { photo: "examplePainting1", title: "Window trim from the porch roof" },
        { photo: "examplePainting2", title: "Windows masked for paint" },
        { photo: "examplePainting3", title: "Blue siding, white trim" },
      ],
      "snow-removal-salting": [
        { photo: "exampleSnowRemovalSalting1", title: "Snow blower between the banks" },
        { photo: "exampleSnowRemovalSalting2", title: "Clearing a front walk" },
        { photo: "exampleSnowRemovalSalting3", title: "Ice on hard surfaces" },
      ],
      "holiday-light-installation": [
        { photo: "exampleHolidayLightInstallation1", title: "Warm white along the rooflines" },
        { photo: "exampleHolidayLightInstallation2", title: "Multicoloured C9s on the eave" },
        { photo: "exampleHolidayLightInstallation3", title: "Lit gables on a snowy night" },
      ],
      "landscaping-lawn-care": [
        { photo: "exampleLandscapingLawnCare1", title: "Mowing and edging" },
        { photo: "exampleLandscapingLawnCare2", title: "Hedge trimming" },
        { photo: "exampleLandscapingLawnCare3", title: "Striped lawn, neat beds" },
      ],
    } as Record<string, readonly { photo: PhotoKey; title: string }[]>,
  },
} as const;

/**
 * The homepage's navy band. Until 2026-09-23 it was "Why Choose RainCity —
 * Built on Quality. Driven by Results": three abstract claims that restated
 * Why Choose Us two sections up. The client turned it into a showcase of the
 * blog, and the heading and body are their wording (lightly corrected for
 * number). The posts are the three newest, from `latestPosts` in lib/blog.ts,
 * so the section updates itself every time an article is published.
 */
export const latestWork = {
  label: "From The Blog",
  headline: "Explore Our Latest Work",
  body: "Discover helpful property maintenance tips, local updates and recent projects from RainCity Property Maintenance. Check out the latest blog posts featuring New Westminster properties and the services we provide.",
  cta: "View All Posts",
} as const;

/**
 * One customer review, exactly as the customer wrote it.
 *
 * `place` only when the source states it; a Google review does not, so those
 * carry `source` and `stars` instead, and the card prints "Google review" under
 * the stars rather than a city nobody told us.
 */
export type Testimonial = {
  quote: string;
  /** First name and last initial, as the older entries already are. */
  name: string;
  place?: string;
  source?: "Google";
  stars?: number;
  service?: string;
};

export const testimonials = {
  label: "Testimonials",
  headline: "Real Feedback from Our Customers",
  /**
   * Every quote in `items` is a real customer review. True since the four
   * invented entries were removed, and still true now that Google reviews
   * have been added.
   */
  verified: true,
  /**
   * DELIBERATELY STILL ZERO, even though the Google figures are known (see
   * `google` below). A non-zero pair here publishes an `aggregateRating` in
   * the LocalBusiness structured data, and Google's review-snippet rules make
   * a business's own reviews of itself, marked up on its own site, ineligible
   * for stars — "self-serving" — with markup that breaks those rules exposed to
   * a manual action. The stars would never show, and the risk is not zero. So
   * the rating is shown to visitors on the page, from `google`, and kept out of
   * the markup. Do not "fix" this by filling these in.
   */
  averageRating: 0,
  reviewCount: 0,
  /**
   * The Google Business Profile summary, read off the listing on 2026-09-23:
   * 5.0 from 17 reviews, all five stars. It is printed with the date it was
   * read, because the count goes up and a static site does not know when —
   * update it with the reviews, and move `checked` with it.
   */
  google: {
    rating: "5.0",
    count: 17,
    checked: "September 2026",
    url: "https://maps.google.com/?cid=6027837514590759918",
  },
  /*
   * Google reviews first, then the two from the client's original homepage.
   *
   * All twelve Google reviews are copied word for word from the listing, read
   * signed in on 2026-09-23, with the customers' own spelling ("no long
   * clogging and spilling sideway", "exemplorary") and paragraph breaks — the
   * card renders `\n` as a break. Names are shortened to first name and last
   * initial, as the older two already are, and capitalised. No date is
   * printed: Google gives only "5 months ago", and turning that into a month
   * would be a guess. Staff first names that customers used (Wass, Mathew)
   * are left in — they are the customers' words.
   *
   * SIXTEEN OF THE SEVENTEEN COULD BE READ, AND FOUR ARE LEFT OUT ON PURPOSE:
   *  - Clayton D'mello: the review has no text — what shows under it is
   *    RainCity's own reply ("Hi Clayton, Thank you…"), which is not a quote.
   *  - Jisel Dcunha: Google shows it truncated and it would not expand, so it
   *    cannot be quoted whole.
   *  - Salman Shan: almost certainly the same reviewer as "Sal Shan", who is
   *    already here; two cards from one person reads as padding.
   *  - "Iamdanishofficial": a username, not a name, and the review runs almost
   *    sentence for sentence alongside Josephine C.'s. Side by side the two
   *    would invite exactly the doubt a reviews section exists to remove.
   * The seventeenth never loads in any view, so it is likely a rating with no
   * text. Order mixes long and short so the first screenful is not all one
   * length.
   *
   * The standing rule is unchanged: never a review without a real customer
   * behind it, and never a `service` field the review itself does not state.
   */
  items: [
    {
      quote:
        "Very impressed with their gutter cleaning services.\n\nI could tell the team took their time to blow and clean every corner of my gutter and roof and after the rain today I could tell it’s no long clogging and spilling sideway! Pricing was very reasonable for the work that was done. They definitely went above and beyond. Highly recommended!!",
      name: "Tri N.",
      source: "Google",
      stars: 5,
    },
    {
      quote:
        "Great experience had my siding cleaned and driveway pressure washed and they did a really good job, looking forward to calling in the future for more work.",
      name: "Sal S.",
      source: "Google",
      stars: 5,
    },
    {
      quote:
        "I recently used Raincity for exterior cleaning and pressure washing, and I'm incredibly happy with the results. From the first phone call to the job's completion, their crew was courteous, on time, and paid close attention to detail. They cleaned my driveway, siding, deck, and patio to perfection—everything looks freshly restored. I also really valued how careful they were with my property and how they made sure I was completely satisfied before finishing up. Their pricing is reasonable for the high standard of work they provide. I wouldn't hesitate to recommend Raincity to anyone in need of trustworthy and thorough exterior cleaning.",
      name: "Josephine C.",
      source: "Google",
      stars: 5,
    },
    {
      quote:
        "Wass did a fantastic job cleaning our very slippery walkways and fixing some unsightly and wearing stones.  Great job, fast and efficient service within the quote they gave us.  We'll definitely be using them again!",
      name: "Michael B.",
      source: "Google",
      stars: 5,
    },
    {
      quote:
        "Impressive Driveway Sealing Work\n\nI’m really happy with the driveway sealing service. The crew arrived on time, prepped everything properly, and applied the sealer with care and precision. The finish looks great — smooth, clean, and even throughout. They were friendly, professional, and took the time to explain the drying process and how to maintain it. Great value for the quality of work. I’d definitely recommend them to anyone looking to protect and refresh their driveway.",
      name: "Yash S.",
      source: "Google",
      stars: 5,
    },
    {
      quote:
        "Fantastic job blowing and packing leaves on our yard and driveway. Fair prices, prompt service, great result.",
      name: "Heather A.",
      source: "Google",
      stars: 5,
    },
    {
      quote:
        "We had a great experience with RainCity Property Maintenance. They showed up right on time, were extremely professional, and treated our property with care—especially around the landscaping. Our driveway and siding look brand new! Excellent service at a great price.\nHighly recommend them for any exterior cleaning needs.",
      name: "Shaina S.",
      source: "Google",
      stars: 5,
    },
    {
      quote:
        "Mathew is great. The company is fantastic. I’d recommend them to anyone who is looking for any sort of service related to their properties.",
      name: "Gurinder M.",
      source: "Google",
      stars: 5,
    },
    {
      quote:
        "Recently hired them for yard cleaning and fence repair, they did a great job on both.",
      name: "Adeel S.",
      source: "Google",
      stars: 5,
    },
    {
      quote:
        "Great Company did a fantastic job power washing the deck…. I would highly recommend this company!!!!",
      name: "Linda P.",
      source: "Google",
      stars: 5,
    },
    {
      quote:
        "Cleaned my rental house and everything is perfect now! Thank you !",
      name: "Lucy L.",
      source: "Google",
      stars: 5,
    },
    {
      quote: "Attention to detail was exemplorary.",
      name: "John C.",
      source: "Google",
      stars: 5,
    },
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
  ] as readonly Testimonial[],
};

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
  membershipsLabel: "Memberships & Partnerships",
  /**
   * The client's own list, supplied 2026-09-23. It replaced four generic
   * badges — Licensed & Insured, Satisfaction Guaranteed, Five-Star Rated,
   * Best Quality — which were stock artwork rather than anything issued to
   * RainCity. (The Five-Star badge was also a rating with no review count
   * behind it, which is the claim this site has a standing rule against.)
   *
   * The same `Partner` shape and the same `PartnerCard` as /about, so the
   * two sections cannot drift apart. `tag` is the card's eyebrow.
   *
   * EVERY ENTRY SHOWS ITS ORIGINAL LOGO, AND AN ENTRY WITH NO LOGO IS NOT
   * RENDERED. That is a standing instruction from Touseef (2026-09-23):
   * people recognise these organisations by their marks, RainCity is their
   * official partner, and he carries responsibility for their use. So
   * Awards.tsx filters on `logo`, and an organisation without a file waits in
   * this list — ready to appear the moment one is added — rather than going
   * up as a name-only card. Since 2026-09-25 all six have their logo, the
   * client having supplied the last ones in the feedback doc.
   *
   * Also rendered on /about, as the "Memberships" row under the partner
   * cards (Touseef, 2026-09-25) — from this same array, so the two pages
   * cannot list different memberships.
   *
   * Blurbs follow the `Partner.blurb` rule: what the ORGANISATION is, from
   * its own public description, never what RainCity does with it.
   */
  memberships: [
    {
      name: "New West Spotlight",
      tag: "Local news & events",
      blurb: "New Westminster's community site and podcast for local news, events and what's on around the city.",
      href: "https://www.newwestspotlight.com/",
      // The client's own file, supplied in the feedback doc on 2026-09-25 and
      // replacing the Facebook profile badge used until then. The supplied
      // square was more than half white margin, which drew the mark at a
      // third of its neighbours' size; trimmed to the artwork plus 8px.
      // Original in `assets/partner-new-west-spotlight-supplied.png`.
      logo: {
        src: "/partners/new-west-spotlight.png",
        width: 459,
        height: 213,
        alt: "New West Spotlight — membership",
      },
    },
    {
      name: "CFIB",
      tag: "Business federation",
      blurb: "The Canadian Federation of Independent Business, the national association of small and medium-sized businesses.",
      href: "https://www.cfib-fcei.ca/",
      // The same file /about already uses for CFIB.
      logo: {
        src: "/partners/cfib.svg",
        width: 323,
        height: 110,
        alt: "CFIB — Canadian Federation of Independent Business — membership",
      },
    },
    {
      name: "WorkSafeBC",
      tag: "Workplace safety",
      /**
       * WORD FOR WORD. WorkSafeBC permits a registered employer exactly this
       * statement, in exactly this form — do not paraphrase it. Confirmed
       * true by the client on 2026-09-23.
       */
      blurb: "RainCity Property Maintenance is registered and in good standing with WorkSafeBC.",
      /**
       * WorkSafeBC's published terms say employers may not use its logo
       * without its written permission
       * (https://www.worksafebc.com/en/legal/copyright-and-trademark/). This
       * was raised with Touseef, who has instructed that the logo be shown
       * and takes responsibility for its use (2026-09-23). The file is the SVG
       * from WorkSafeBC's Wikipedia article, checked by eye against the logo
       * in the worksafebc.com header the same day — identical. No `href`: a
       * logo that is also a link is the use those terms single out.
       */
      logo: {
        src: "/partners/worksafebc.svg",
        width: 652,
        height: 122,
        alt: "WorkSafeBC logo",
      },
    },
    {
      /**
       * ZENSURANCE — the client's logo settled it (2026-09-25). This entry
       * was "Zen Insurance" (Zen Insurance Inc., Calgary) from 2026-09-23,
       * a guess at the client's "Zeninsurance" that was confirmed at the
       * time but had no logo anywhere. The file the client then supplied is
       * Zensurance's wordmark, pixel for pixel the 244x37 logo in the
       * zensurance.com header — so it is Zensurance, the Canadian online
       * commercial insurance brokerage. The SVG is that same header logo,
       * taken from their own site the same day.
       */
      name: "Zensurance",
      tag: "Business insurance",
      blurb: "A Canadian commercial insurance brokerage for small businesses, contractors and the self-employed.",
      href: "https://www.zensurance.com/",
      logo: {
        src: "/partners/zensurance.svg",
        width: 244,
        height: 37,
        alt: "Zensurance — partner",
      },
    },
    {
      /**
       * HELLO GUBBY, with a U — not Hello Gabby (2026-09-25). The client's
       * doc and the logo it supplied both read "Hello Gubby": the Vancouver
       * AI front-desk company at hellogubby.ai (phone answering, website
       * chat and booking for service businesses). From 2026-09-23 this entry
       * was Hello Gabby, an unrelated virtual-assistant business, because
       * the name reached us misspelled; its logo file has been deleted.
       *
       * The supplied file is 187x49, too small for a 2x screen, so the logo
       * is the rabbit tile and wordmark cropped from Hello Gubby's own
       * share image (the og:image on hellogubby.ai) — the same
       * lockup, checked by eye against the client's file. Near-white ground
       * flattened to white so the card's multiply blend drops it, and trimmed
       * to its ink at 436x131 (2026-09-25, for the equal-area sizing).
       */
      name: "Hello Gubby",
      tag: "Business support",
      blurb: "A Vancouver AI front desk for service businesses, answering calls and website chats and booking appointments.",
      href: "https://www.hellogubby.ai/",
      logo: {
        src: "/partners/hello-gubby.png",
        width: 436,
        height: 131,
        alt: "Hello Gubby — partner",
      },
    },
    {
      /**
       * The client's own file, supplied 2026-09-25, with the 1-3px black
       * frame it carried trimmed off. Still no website for the group, so
       * the card has no link. Trimmed to its ink at 167x154 (2026-09-25).
       * It now renders about 125px tall, so it is soft on a 2x screen: ask for
       * a larger file if one exists.
       */
      name: "Tri-Cities Business Networking Group",
      tag: "Business networking",
      blurb: "Local business networking across Coquitlam, Port Coquitlam and Port Moody.",
      logo: {
        src: "/partners/tri-cities-business-networking-group.png",
        width: 167,
        height: 154,
        alt: "Tri-Cities Business Networking Group — membership",
      },
    },
  ] as readonly (Partner & { tag: string })[],
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
   * Every service, then "Other". Derived from `services` since 2026-09-23,
   * when the client asked for the full list: it used to be a hand-kept list
   * of six, which is how a renamed or added service went missing from the
   * one place a customer names what they want. Now it cannot drift.
   */
  serviceOptions: [...services.map((s) => s.title), "Other"],
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
    { label: "Blog", href: "/blog" },
  ],
  additionalLinks: [
    { label: "Privacy Policy", href: "/privacy-policy" },
    { label: "Terms & Conditions", href: "/terms" },
    // Was `#quote`, an anchor to the sitewide form, before /contact existed.
    { label: "Get In Touch", href: "/contact" },
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
    /** The client's wording, supplied 2026-09-23. */
    body: "We’re a local, customer-focused property maintenance company helping homeowners, businesses, strata buildings, and property managers keep their properties clean, safe, and well-maintained across Greater Vancouver.",
    cta: "Get a Free Quote",
  },

  intro: {
    label: "Who We Are",
    headline: "RainCity Property Maintenance",
    /**
     * The client's wording, supplied 2026-09-23, verbatim. Every service it
     * names is one this site offers: "common-area cleaning", "office
     * cleaning" and "customized janitorial maintenance" are the scope of
     * Commercial Cleaning, and balcony cleaning is its own page.
     */
    body: [
      "At RainCity Property Maintenance, we provide professional exterior cleaning and commercial janitorial cleaning services for homes, businesses, strata buildings, and property managers across New Westminster and Greater Vancouver. Our services include pressure washing, window cleaning, gutter cleaning, balcony cleaning, common-area cleaning, office cleaning, and customized janitorial maintenance.",
      "Our experienced team is committed to reliable service, detailed workmanship, and consistent results that help keep every property clean, safe, and well-maintained year-round.",
    ],
    cta: "Explore Our Services",
  },

  /**
   * Supporting Our Community — the client's special-pricing offer, supplied
   * word for word on 2026-09-23. The groups are listed in the client's order.
   *
   * THIS IS A PUBLISHED OFFER, so the disclaimer is not decoration: it is the
   * client's own text, and it goes up with the offer or not at all. It names
   * no discount size on purpose — the client gave none, and "special pricing"
   * with eligibility confirmed at the quote is what they wrote.
   */
  community: {
    label: "Community Pricing",
    heading: "Supporting Our Community",
    body: "We are proud to support our community by offering special pricing to seniors, people with disabilities, single parents, veterans, healthcare workers, first responders and teachers. Contact RainCity Property Maintenance to learn more and receive a personalized quote.",
    groups: [
      "Seniors",
      "People with disabilities",
      "Single parents",
      "Veterans",
      "Healthcare workers",
      "First responders",
      "Teachers",
    ],
    cta: "Get a Personalized Quote",
    disclaimerLabel: "Offer details",
    disclaimer:
      "Valid on select residential services. Eligibility may be confirmed when requesting a quote. Cannot be combined with other offers. Some restrictions may apply.",
  },

  /**
   * By the numbers — rebuilt 2026-09-25 after the client said the band
   * "just looks funny, i think something is missing". It was three bare
   * figures floating in a wide Fog band with no heading and nothing to say
   * what they meant. Now: a heading and a line of context on the left, and
   * each figure with one sentence under it.
   *
   * THE THREE FIGURES are the client's own published claims, unchanged and
   * still unverified (they stay out of the structured data). Every `note`
   * restates something the client has already confirmed elsewhere: insured
   * and over five years in business (Why Choose Us), who the customers are
   * (Who We Are), the satisfaction guarantee (the service pages and /terms).
   *
   * THE FOURTH is the real Google rating, read from `testimonials.google`
   * at render so it moves with the count; see Stats.tsx.
   */
  statsLabel: "By the numbers",
  statsHeading: "Five Years of Work You Can Check",
  statsBody: "One local team, looking after homes, strata buildings and commercial properties across Greater Vancouver.",
  stats: [
    {
      value: "5+",
      label: "Years of experience",
      note: "More than five years in business, fully insured on every job.",
    },
    {
      value: "1K+",
      label: "Properties serviced",
      note: "Homes, strata buildings and commercial properties.",
    },
    {
      value: "100%",
      label: "Customer satisfaction",
      note: "Every job is backed by our satisfaction guarantee.",
    },
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

  /**
   * Home Ground — the local section, added at the client's request.
   *
   * The brief was "about local to New West". The obvious version of that
   * section is unbuildable here: this site already says "New Westminster
   * based" in fourteen places — a trust point on all eleven service pages,
   * the `pageFaqs.about` answer "Is RainCity a local company?", and two full
   * paragraphs on /locations/new-westminster — so a section whose argument is
   * "we are local" would be the fifteenth and would add nothing. Worse,
   * rewriting the New Westminster location copy onto /about would put two of
   * our own pages in front of the same queries, which is the doorway pattern
   * the note on `LocationDetail` exists to prevent.
   *
   * So this section argues the thing the repetitions do not: what being based
   * here changes about the work. The seed is a clause already in the About
   * FAQ — that the timing of nearly every job is set by a rainfall pattern
   * specific to this coast — and the second paragraph is that clause expanded
   * into the three windows the service pages already publish. The FAQ's own
   * wording is deliberately not reused; both sit on this page, and the two
   * would have read as one sentence printed twice.
   *
   * WHAT IS ASSERTED HERE: nothing new. Moss releasing gradually after a
   * treatment is the Soft Washing FAQ. A slab needing time before it will
   * take a sealer is the `twenty-eight-days-before-sealing` article. The
   * paintable season is the Painting FAQ. The hill above the Fraser and the
   * Quay are the New Westminster location copy. The one clause that is not a
   * restatement of settled copy is "travel built into the price" — and that
   * one is now the client's own: on 2026-09-23 they confirmed travel is
   * included in the price of a job (a fee may apply to an on-site visit, by
   * location). It replaced "nothing added for the distance", which asserted
   * an unconfirmed no-travel-charge policy and was a launch item until then.
   *
   * SET TO THE WHO WE ARE TEMPLATE, 2026-09-13, at the client's instruction:
   * same structure, same heading size, and copy held to the same length as
   * `intro` above (heading 27 vs 29 characters, paragraphs 306 vs 315 and
   * 254 vs 258). The three-fact list went with the redesign; its two derived
   * facts moved into the photo caption, as Who We Are's base and region do.
   *
   * No count is written into the copy, for the reason given on
   * `servicesPage.catalogue`: `areaSuffix` is a suffix because the number in
   * front of it is `locations.length` at render, so adding a tenth community
   * cannot leave a stale "nine" behind on this page.
   */
  local: {
    label: "Home Ground",
    /**
     * Split in two so the component can set `headingMark` under the amber
     * highlighter the client asked for. Read together they are the heading.
     */
    heading: "New Westminster Is",
    headingMark: "Our Home",
    body: [
      "We are based in New Westminster, on the hill above the Fraser, and every job on the schedule starts from there. It is not a mailing address — it is where the truck loads and the equipment lives, so a property at the Quay and one in Langley are quoted on the same basis, with travel built into the price.",
      "Almost everything we do is timed by this coast’s weather rather than by a calendar: when moss lets go, when a slab will take a sealer, how much of a summer is dry enough to paint. A company based elsewhere looks those windows up. We schedule inside them.",
    ],
    /** Button under the copy — Who We Are's CTA sits in the same place. */
    cta: "See Where We Work",
    /** Photo caption, line one; the base city is appended at render. */
    captionPrefix: "Based in",
    areaSuffix: "communities, both banks of the Fraser",
  },} as const;

// --- Founders and partnerships ---------------------------------------------

/**
 * Added at the client's request — "add partnerships section, add founders
 * section, add some companies we work with n built the developers logos n some
 * we work with" — which is two sections, because the third clause is the
 * content of the first rather than a section of its own.
 *
 * ONE INSTRUCTION IN THAT MESSAGE WAS NOT CARRIED OUT, and it should not be
 * without the client understanding what it does: "u can put just some property
 * management companies for now". Inventing property-management names would put
 * identifiable third parties on this page as customers of a company they may
 * never have engaged, in a market small enough that both sides would recognise
 * the error. That is a false endorsement rather than filler copy, and it is a
 * different order of problem from the placeholder text elsewhere in this file.
 * The group is declared and empty; it fills when real names arrive.
 *
 * The same line governs logos. A partner mark is somebody else's trademark and
 * printing it asserts a relationship, so nothing goes in `logo` that the client
 * has not sent and confirmed.
 */

/** One founder. Everything here has to come from the client. */
export type Founder = {
  /** As they want it printed, and spelled as they spell it. */
  name: string;
  /** "Co-Founder" — the relationship to the company, printed over the name. */
  role: string;
  /** The job they do, as the client wrote it — the card's blue eyebrow. */
  title: string;
  /** Two or three sentences, in their voice or approved by them. */
  bio: string;
  /**
   * The portrait. Until it is set, the card holds the photograph's place with
   * a navy 4:5 plate carrying the founder's initial — the same frame, so the
   * layout does not move when the real picture lands. Add a `photos.ts` entry
   * (4:5, face in the upper third), then set this key.
   */
  photo?: PhotoKey;
};

/**
 * TWO FOUNDERS, WILSON AND GLEVIN.
 *
 * THE SPELLING IS "GLEVIN", as the client writes it in the 2026-09-25
 * feedback doc, confirmed by Touseef the same day. It had been "Glavin"
 * since 2026-09-23 (Touseef's answer then, and the LinkedIn handle
 * linkedin.com/in/andglavin); the client's own spelling of a founder's name
 * wins. If a question ever comes up again, ask the founder, not the handle.
 * Order: Wilson, then Glevin.
 *
 * ROLES are the client's, word for word (2026-09-25): Wilson is Quality
 * Control Inspector / Site Supervisor, Glevin is Operations Coordinator /
 * Office Administrator. The client asked for "some description of what they
 * do", so the bios describe THE JOB, not the person: what a site supervisor
 * and an operations coordinator do at this company, tied to what the site
 * already publishes (the Inspection / Service / Review steps of Our Process,
 * the written quote). Nothing about background, years or previous trades,
 * and no pronouns — nobody has told us theirs. Replace with the founders'
 * own words whenever they send them.
 *
 * PORTRAITS: both are in (2026-09-25), and both arrived small — Wilson's at
 * 480x550 on WhatsApp, Glevin's at 340x490 as a circular crop. Ask for the
 * originals, which would sharpen the cards on high-density screens. The navy
 * initial plate in `Founders.tsx` still stands for any founder without
 * `photo`.
 */
export const founders = {
  label: "Our Founders",
  heading: "The People Behind RainCity",
  body: "RainCity Property Maintenance was started by two founders, Wilson and Glevin: one on site making sure every job is done right, one in the office making sure every job runs on time.",
  people: [
    {
      name: "Wilson",
      role: "Co-Founder",
      title: "Quality Control Inspector / Site Supervisor",
      bio: "Wilson runs the work on site: supervising the crew on every job, inspecting the finished work against the scope agreed with the customer, and making sure nothing is signed off until it meets the RainCity standard.",
      photo: "founderWilson",
    },
    {
      name: "Glevin",
      role: "Co-Founder",
      title: "Operations Coordinator / Office Administrator",
      bio: "Glevin keeps RainCity running from the office: coordinating schedules, crews and equipment, preparing quotes and bookings, and staying the first point of contact for homeowners, strata councils and property managers.",
      photo: "founderGlevin",
    },
  ] as readonly Founder[],
};

/**
 * One partner.
 *
 * `logo` is OPTIONAL and is the reason this section can ship today. No logo
 * file has been supplied for any of the names below, so each renders as its
 * name set in the site's own type inside the standard plate. That is honest,
 * it needs no trademark asset, and it reads as deliberate rather than as a
 * broken image. When real files arrive they drop into `logo` and the plate
 * swaps what is inside it — no component change.
 *
 * A logo is NOT a `PhotoKey` and does not belong in `photos.ts`. That registry
 * is for photography and carries a dominant tone, an aspect ratio and a focal
 * point, none of which mean anything for a wordmark. Logos follow the
 * `awards.badge` shape instead: a path, intrinsic dimensions and alt text,
 * rendered straight through `next/image`.
 *
 * `href` IS NOW ALLOWED, AND THAT IS A REVERSAL OF THE ORIGINAL RULE HERE. The
 * previous version of this comment said linking out is a decision about who
 * this company sends its readers to, and that a partner's marketing site does
 * not meet the outbound-link bar the rest of the site holds citations to — see
 * the outbound-citations note in CLAUDE.md. That bar is still correct for an
 * *editorial* link from inside an article, which is what it was written for.
 * It was the wrong bar for this section: a trade partner's own site is not a
 * source being cited, it is the other half of a relationship this page is
 * already asserting exists, and Touseef gave explicit sign-off to add
 * "redirect links" here on 2026-09-09. So `href` is independent of `logo` —
 * a partner can carry a real URL before a logo file exists, or a logo with no
 * URL — and it stays `undefined` for every entry below until a real one is
 * supplied. No URL has been invented for any partner. A tile or plate with no
 * `href` renders as inert (no wrapping link), never as a link to nowhere.
 * Rendered as `target="_blank" rel="noopener"`, deliberately without
 * `nofollow` — the same choice `PostBody.tsx` makes for outbound citations,
 * for the same reason: a relationship the company is willing to publish is
 * what a followed link is for.
 */
export type Partner = {
  /** The organisation's name as it writes it. This is what renders today. */
  name: string;
  /** The partner's own site. Absent until the client supplies it — see above. */
  href?: string;
  /**
   * Two lines on the card saying what the organisation is. HELD TO WHAT THE
   * ORGANISATION SAYS OF ITSELF, checked on 2026-09-13 — its own site for the
   * companies, the public record for the universities and CFIB. It describes
   * THEM, never the relationship: nothing here claims what RainCity does with
   * or for a partner, because the client has confirmed only that they are
   * partners. Where nothing verifiable is on file (SA Cleaning, CFOne) the
   * blurb says only that, and should be replaced once the client supplies it.
   */
  blurb: string;
  /**
   * Where the organisation itself operates, for the Local Partners section on
   * the community pages (`localPartnersFor`). Either the community slugs it
   * publishes as its own service area or campus list — with the verb the card
   * prints, "Serves" or "Campus in" — or a national reach, printed as-is.
   *
   * SOURCED FROM THE PARTNER, NOT INFERRED, checked 2026-09-13. Absent means
   * nothing checkable is on file, and the partner does not appear on any
   * community page. It says where THEY work, never that RainCity works with
   * them there.
   */
  local?:
    | { verb: string; slugs: readonly string[] }
    | { everywhere: string };
  // No `accent` field any more. A per-partner brand colour used to run along
  // the top of each tile; with real marks in the cells the logo carries the
  // identity the client asked to keep, and a navy stripe beside a pink one
  // read as noise rather than as two brands. See `Partnerships.tsx`.
  logo?: {
    /** Under `public/partners/`. SVG, or transparent PNG at 1000px or more. */
    src: string;
    width: number;
    height: number;
    /** Describes the mark and names the relationship. */
    alt: string;
  };
};

/**
 * A group is a claim, which is the whole reason this is grouped rather than
 * one undifferentiated strip. "We maintain their buildings", "we refer work to
 * each other" and "they certify us" are three different statements, and a
 * single row of marks silently makes the strongest of the three about every
 * name in it.
 *
 * A group with no items is skipped rather than rendered as an empty heading,
 * so the four below fill one at a time and in any order.
 *
 * Every group renders the same way — one row of the register in
 * `Partnerships.tsx`. There used to be a `layout` field choosing between
 * tiles and a carousel per group; three treatments on one section was the
 * main reason it read as unfinished, and a carousel holding three plates
 * scrolled nothing. One grammar, so a group needs nothing but its names.
 */
export type PartnerGroup = {
  label: string;
  /** The short sector name printed on each partner's card: "Cleaning". */
  tag: string;
  items: readonly Partner[];
};

/**
 * EVERY GROUP SAYS "PARTNERS", AND THAT IS THE CLIENT'S OWN INSTRUCTION RATHER
 * THAN CAUTION ON THIS SIDE. Asked what these organisations are, they said the
 * companies are trade partners, that RainCity also works at some of their
 * sites, and that because those are separate businesses the relationship to
 * publish is the partnership rather than the customer one.
 *
 * That is the more conservative of the two available claims and it is the one
 * to keep. "Client" asserts a commercial engagement about a named third party
 * and would need each of them to agree to it being published; "partner" is
 * what the client has actually confirmed. Do not upgrade a group to "clients"
 * because somebody mentions in passing that a name on this list is one.
 *
 * The three groups split by sector, not by relationship — the relationship is
 * the same across all nine. The split is there because nine names in one flat
 * row scans worse than three groups of three, and because sector is checkable.
 *
 * Two names also need their spelling settled before this is published:
 * "CFOne" and "CFIB" were sent as "cfone" and "cfib". CFIB is almost certainly
 * the Canadian Federation of Independent Business and CFOne is most likely the
 * Canadian Armed Forces community programme, but "almost certainly" is not the
 * standard for printing an organisation's name on a client's website.
 */
export const partnerships = {
  label: "Partnerships",
  /** Was "Who We Work With"; renamed at the client's request, 2026-09-23. */
  heading: "Our Affiliates & Partnerships",
  /** The client's wording, supplied 2026-09-23. */
  body: "We work alongside trusted organizations and institutions that support our business, our team, and the communities we serve.",
  /** The link row on a partner card that has a site — the service card's "View Service". */
  visitLabel: "Visit Site",
  groups: [
    {
      label: "Cleaning partners",
      tag: "Cleaning",
      items: [
        {
          name: "Bright Nest Cleaning",
          // Was "across Burnaby, the Tri-Cities and New Westminster" — true but
          // partial, and it contradicted the "Serves Delta" tag this card now
          // carries on the community pages. Their own site lists all nine.
          blurb: "Residential and commercial cleaning, from deep cleans to move-outs, across Greater Vancouver and the Tri-Cities.",
          href: "https://brightnestcleaning.ca/",
          // Their homepage names Coquitlam, Vancouver, Burnaby, Port
          // Coquitlam, Port Moody, Surrey and New Westminster; their locations
          // menu adds Anmore, Delta, Langley, Maple Ridge and Pitt Meadows.
          // That covers all nine communities. Checked 2026-09-13.
          local: {
            verb: "Serves",
            slugs: ["anmore", "burnaby", "delta", "langley", "new-westminster", "ridge-meadow", "surrey", "tri-cities", "vancouver"],
          },
          // Pulled from their own site's header on 2026-09-10. The file
          // is a WebP served as .png at the source; saved with the
          // correct extension here. Two things stated at the point of use:
          // 1) this is the company's own trademarked mark, published for
          //    a partnerships review pass at the client's explicit
          //    instruction ("use their identity in this partner section")
          //    and needs written permission before the page ships publicly;
          // 2) the file is 7 KB — small enough that Next's image optimiser
          //    would add nothing measurable, so the render below uses a
          //    plain <img>, consistent with SVG partners on this page.
          logo: {
            src: "/partners/bright-nest-cleaning.webp",
            width: 308,
            height: 90,
            alt: "Bright Nest Cleaning — partner",
          },
        },
        {
          name: "Crystal Clear Cleans",
          blurb: "Residential and commercial cleaning across Greater Vancouver, from Vancouver and Richmond out to Langley.",
          href: "https://crystalclearcleans.ca/",
          // Their homepage: Vancouver, Burnaby, Coquitlam, Port Coquitlam,
          // Port Moody, New Westminster, Richmond, Surrey, Delta, Langley,
          // North Vancouver, Anmore "and the Ridge Meadows area" — all nine.
          // Checked 2026-09-13.
          local: {
            verb: "Serves",
            slugs: ["anmore", "burnaby", "delta", "langley", "new-westminster", "ridge-meadow", "surrey", "tri-cities", "vancouver"],
          },
          // Their site-icon file — a transparent PNG at 273×257. Same
          // permission caveat as Bright Nest applies.
          logo: {
            src: "/partners/crystal-clear-cleans.png",
            width: 273,
            height: 257,
            alt: "Crystal Clear Cleans — partner",
          },
        },
        {
          // Written as the company writes it — "S&A Cleaning Group" — on its
          // own site. The client supplied the name as "SA Cleaning" and the
          // site as sacleaninggroup.ca (2026-09-23).
          name: "S&A Cleaning Group",
          blurb: "Home cleaning and car detailing across Vancouver, booked online with a professional team and eco-friendly products.",
          href: "https://sacleaninggroup.ca/",
          // Their site says "throughout Vancouver" and names nowhere else.
          local: { verb: "Serves", slugs: ["vancouver"] },
          // Their navbar logo, from sacleaninggroup.ca, 2026-09-23.
          // Transparent PNG, trimmed to the mark.
          logo: {
            src: "/partners/sa-cleaning-group.png",
            width: 624,
            height: 609,
            alt: "S&A Cleaning Group — partner",
          },
        },
      ],
    },
    // The three universities' CURRENT logos, each taken from the university's
    // own website header on 2026-09-23. They replaced the coats of arms that
    // were here before — heraldic arms from Wikipedia, which is not the mark
    // any of the three uses, and which the client flagged as wrong.
    {
      label: "Post-secondary partners",
      tag: "Post-secondary",
      items: [
        {
          name: "Kwantlen Polytechnic University",
          blurb: "A public polytechnic university with campuses in Surrey, Richmond, Langley and Cloverdale.",
          // Public record: Surrey (and Cloverdale, which is in Surrey) and
          // Langley. Richmond is not one of the nine communities.
          local: { verb: "Campus in", slugs: ["surrey", "langley"] },
          // kpu.ca/themes/custom/kpu/logo.svg — the site header's own file.
          logo: {
            src: "/partners/kpu.svg",
            width: 110,
            height: 101,
            alt: "Kwantlen Polytechnic University — partner",
          },
        },
        {
          name: "Capilano University",
          blurb: "A public university based in North Vancouver, serving the North Shore and the Sunshine Coast.",
          // capilanou.ca's own logo file (CapU-logo-print.svg): the shield
          // and wordmark in black, which is the version meant for a light
          // ground.
          logo: {
            src: "/partners/capilano.svg",
            width: 773,
            height: 182,
            alt: "Capilano University — partner",
          },
        },
        {
          name: "Thompson Rivers University",
          blurb: "A public university in Kamloops, with distance learning across Canada through TRU Open Learning.",
          // tru.ca's header logo (TRU-LOGO-LEFT-BLUE), transparent PNG,
          // trimmed. Named -logo so no cache can serve the old arms file.
          logo: {
            src: "/partners/tru-logo.png",
            width: 685,
            height: 253,
            alt: "Thompson Rivers University — partner",
          },
        },
      ],
    },
    {
      label: "Business and member partners",
      tag: "Business & member",
      items: [
        // CF One — the Canadian Armed Forces community card, run by Canadian
        // Forces Morale and Welfare Services. Businesses become CF One Member
        // Appreciation partners by offering the military community a
        // discount, which is also why veterans appear in the Supporting Our
        // Community pricing on this page. Identified 2026-09-23 from
        // cfmws.ca; the logo is CFMWS's own web-safe CF One lockup from the
        // CF One registration page.
        {
          name: "CFOne",
          blurb: "The Canadian Armed Forces community card, giving serving members, Veterans and their families access to programs and partner discounts.",
          href: "https://cfmws.ca/about-us/cfone-registration",
          local: { everywhere: "Across Canada" },
          logo: {
            src: "/partners/cfone.png",
            width: 964,
            height: 368,
            alt: "CF One — Canadian Armed Forces community program — partner",
          },
        },
        {
          name: "Union Savings",
          blurb: "A not-for-profit, union-run benefits program offering everyday savings to union members across Canada.",
          // Source: their own header logo, `unionsavings.ca/img/logo_en.svg`,
          // fetched on 2026-09-10. SVG, so rendered via a plain <img>
          // rather than next/image — the site config deliberately does
          // not enable `dangerouslyAllowSVG` on the image optimiser, and
          // that setting isn't going to change for one wordmark.
          logo: {
            src: "/partners/union-savings.svg",
            width: 310,
            height: 48,
            alt: "Union Savings — partner",
          },
        },
        {
          name: "CFIB",
          blurb: "The Canadian Federation of Independent Business, the country's largest association of small businesses.",
          local: { everywhere: "Across Canada" },
          // Canonical CFIB logo from the Canadian Federation of
          // Independent Business page on Wikimedia Commons. SVG, same
          // <img>-vs-next/image reasoning as Union Savings above.
          logo: {
            src: "/partners/cfib.svg",
            width: 323,
            height: 110,
            alt: "CFIB — Canadian Federation of Independent Business — partner",
          },
        },
      ],
    },
    /**
     * Empty on purpose. See the note at the top of this block: the client
     * asked for "just some property management companies for now" and that is
     * the one thing that cannot be filled in from here.
     */
    { label: "Property management", tag: "Property management", items: [] },
  ] as readonly PartnerGroup[],
};

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
 * and the quote-per-property policy in public/llms.txt, the tailoring claim in
 * the written, per-property scope every service page describes). Nothing new
 * is asserted about the business.
 */
export const servicesPage = {
  hero: {
    crumb: "Services",
    heading: "Our Services",
    /** Second line of the h1. See `locationPage.hero.h1Sub` for the why. */
    headingSub: "Exterior Cleaning Across Greater Vancouver",
    body: "Exterior cleaning and property care for homes, stratas and businesses across Greater Vancouver — booked year-round, in whatever the sky is doing.",
    cta: "Get a Free Quote",
  },

  intro: {
    label: "What We Offer",
    headline: "Property Care Services",
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
        support:
          "Scoped to the building in front of us, not a standard package.",
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
 *  2. `trust.blurb` and `trust.points` are the band's default rather than
 *     its only version. Each service writes its own pair on `detail.trust`
 *     — see `ServiceTrust` — and what is here is the fallback, which today
 *     is reached only by Window Cleaning. The five claims are the same five
 *     claims wherever they appear, and they restate what this site already
 *     publishes elsewhere: the licence and the per-property quote in
 *     public/llms.txt and Why Choose Us, the satisfaction guarantee in the
 *     workmanship guarantee (Section 07 of /terms — the homepage badge that
 *     also carried it was retired on 2026-09-23), the base city and service
 *     area in `business`.
 *     Nothing new is asserted about the company on eleven pages at once, on
 *     any of the eleven wordings. In particular the source template's
 *     "Serving Greater Vancouver since 2018" is not carried on any of them:
 *     a founding year is a checkable fact, it is nowhere in the material we
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
    /**
     * The second line of the h1, under the service name.
     *
     * Same reasoning as `locationPage.hero.h1Sub`: the heading was the bare
     * service name, so eleven pages each targeting "<service> Greater
     * Vancouver" had the region in the title tag and nowhere in the heading.
     *
     * This is the fixed string rather than a template, and it is fixed for
     * the reason recorded against `servicePage.areas.heading`: measured at
     * 375px, "{service.title} Across Greater Vancouver" at display size wrapped
     * to three and four lines. That constraint applied to a `display-l` h2
     * carrying the whole phrase. Here the long half sits on its own line at
     * `display-m`, which is where the wrapping problem goes away — the
     * service name keeps `display-xl` to itself.
     */
    h1Sub: "In Greater Vancouver",
    quoteCta: "Get a Free Quote",
    callCta: "Call Us Now",
  },

  overview: {
    label: "Our Service",
    includedLabel: "What's Included",
    trust: {
      title: "Why Choose RainCity?",
      /* Deliberately says something the five points below do not. A blurb
         that restates "licensed, insured, free quotes" would make the list
         read as a caption to itself; this is the standing claim, and the
         list is the evidence.

         This is now the fallback rather than the text of all eleven bands.
         It names no single service, which is what a fallback has to do, and
         it is Window Cleaning's approved wording — that page is the one with
         no `detail.trust` override, so leaving it here keeps the pilot
         exactly as it shipped instead of stranding a stub nothing renders. */
      blurb:
        "We maintain properties across Greater Vancouver in every kind of weather this coast produces — for homeowners, strata councils and commercial managers alike. What that buys you is a crew that turns up when it says it will, and work you can check before we leave. The same holds whether it is one house or forty units: the scope is agreed in writing before anything starts, and the figure on the quote is the figure on the invoice.",
      /* Levelled twice. First for parallel phrasing — each point opens on
         the thing being claimed rather than on a mixture of adjectives and
         nouns, and none borrows a line the process steps already use. Then
         for length: the set ran 26 to 58 characters, and the long one wrapped
         to three lines on a phone against one for its neighbours, which read
         as a list that had not been edited. It now runs 32 to 45, so every
         point holds a single line at desktop and none takes more than two on
         a phone. "Greater Vancouver" leaves the second point and is not lost
         — the paragraph directly beside it opens on the phrase, and the
         closing band, the FAQ and the meta description all carry it.

         The ten per-service sets on `detail.trust` are written to the same
         length discipline for the same reason. They run longer at the top of
         the range because a phrase like "certificates on file" is doing work
         the bare word "insured" is not, but none of them takes a third line
         on a phone. */
      points: [
        "Fully licensed and fully insured",
        "Based in New Westminster, working region-wide",
        "Residential, strata and commercial work",
        "Free written quotes, priced per property",
        "Satisfaction guaranteed on every job",
      ],
      cta: "Get a Free Quote",
      callPrompt: "Have questions? Message us on WhatsApp",
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

  /**
   * The FAQ section's fixed half. The questions themselves are per-service
   * and live on `detail.faqs`; only the label, the heading and the line under
   * it are shared, exactly as `process` is.
   */
  faq: {
    label: "Common Questions",
    headline: "Questions We Get Asked",
    body: "The things people actually ask before booking, answered the way we would answer them on the phone. If yours is not here, call — you will get a straight answer from someone who does the work.",
  },

  /**
   * The band that sends a service page back into the nine community pages.
   *
   * It exists because the link graph ran one way. `LocationServices` puts all
   * eleven service links on all nine community pages, and nothing pointed
   * back: a crawler reading the built HTML of /services/gutter-cleaning found
   * links to `/`, `/about`, `/blog`, `/contact`, `/locations`, `/services`
   * and the two policy pages, and nothing else. Not one deep link, on the
   * eleven most commercially valuable pages on the site.
   *
   * The header's dropdowns do not count and are the reason this went
   * unnoticed. `Header` holds its children behind `openMenu` state, so the
   * eleven service links and the nine community links exist only after
   * hydration — they are in nobody's server HTML, on any route.
   *
   * The heading is one fixed string across all eleven rather than taking the
   * service name, and that was measured rather than preferred. `{title}
   * Across Greater Vancouver` is the phrase the page would like to be found
   * for; at display-l on a 375px screen it wraps to three lines on six of the
   * eleven services and four on Concrete and Asphalt Sealing, against the
   * two-line rule `overviewHeading` states and `check-layout.mjs` enforces.
   * Every shorter suffix tried behaved the same way — the service names are
   * simply too long for this type size plus a region.
   *
   * So the region stays and the service name comes off. The page has already
   * named the service twice above this point, in the h1 and in the overview
   * h2, so "this work" is not vague where it lands; and the nine links under
   * the heading carry the geography that actually matters here. The two
   * sibling bands on this template, `process` and `related`, are fixed
   * strings for the same reason.
   */
  areas: {
    label: "Where We Work",
    heading: "This Work, Across Greater Vancouver",
    body: "Everything comes off the truck — water, pressure, detergent and power — so the kit that reaches a strata lot in Surrey is the one that reaches an acreage in Anmore. Pick your community and the page will tell you what the work looks like there.",
    /** The plate's link row. The community name is appended by the card. */
    cardCta: "View",
    allCta: "See all nine communities",
  },

  /**
   * Two or three services that get booked alongside this one.
   *
   * `relatedServices` in this file is the map, and it is written rather than
   * derived: the adjacencies that matter are the ones a crew actually sees on
   * a job — the roof being cleared means the gutters are already open, the
   * driveway being washed is the step before it can be sealed — and no
   * ordering of the `services` array encodes that.
   */
  related: {
    label: "Often Booked Together",
    heading: "While We Are Already There",
    body: "These are the jobs that go with this one, and the reason is nearly always the setup: the ladder, the truck or the dried surface is already where it needs to be. Worth knowing before a second visit is booked for something the first one was already set up for.",
  },

  closing: {
    body: "Get a free quote today. Serving New Westminster and all of Greater Vancouver.",
    cta: "Get Your Free Quote",
  },
} as const;

/**
 * Which services get booked alongside which, by slug.
 *
 * Written, not derived, and the reasoning is on `servicePage.related` above.
 * Every value is a slug in `services`; `relatedServices` below resolves them,
 * so a renamed slug drops a card rather than publishing a dead link — the
 * same arrangement `nearbyLocations` has with `detail.nearby`.
 *
 * Two or three each. A fourth turns the band into a second catalogue, and the
 * page already carries the full one in the footer of every community page it
 * links to.
 */
const relatedBySlug: Record<string, readonly string[]> = {
  // The roof is walked to clear the moss; the gutters are directly below it
  // and the debris from one lands in the other.
  "roof-cleaning": ["gutter-cleaning", "soft-washing", "window-cleaning"],
  // The ladder is already up and the run is already open.
  "gutter-cleaning": ["roof-cleaning", "window-cleaning", "soft-washing"],
  // Same truck, same water, opposite ends of the pressure range. Which end a
  // surface takes is the distinction the soft-washing page is written around,
  // so the two belong beside each other.
  "power-washing": ["concrete-and-asphalt-sealing", "soft-washing", "window-cleaning"],
  "soft-washing": ["roof-cleaning", "power-washing", "painting"],
  // A slab has to be washed and dried before it can be sealed. This pair is
  // an order of operations, not a suggestion.
  "concrete-and-asphalt-sealing": ["power-washing", "snow-removal-salting"],
  // Glass, frames and tracks on the same elevation as the gutters above them —
  // and the balcony door, whose glass is cleaned from both sides at once.
  "window-cleaning": ["gutter-cleaning", "balcony-cleaning", "power-washing"],
  // The balcony door is glass, a house deck is a pressure wash, and a
  // building-wide balcony programme sits in the same strata contract as the
  // common-area cleaning.
  "balcony-cleaning": ["window-cleaning", "power-washing", "commercial-cleaning"],
  // Prep is a wash. Paint goes on a clean, sound surface or it does not hold.
  painting: ["soft-washing", "power-washing"],
  // The two seasonal ends of a strata or commercial contract.
  "snow-removal-salting": ["landscaping-lawn-care", "concrete-and-asphalt-sealing", "commercial-cleaning"],
  "holiday-light-installation": ["gutter-cleaning", "window-cleaning"],
  "landscaping-lawn-care": ["power-washing", "snow-removal-salting", "gutter-cleaning"],
  // A strata building's inside, its glass, and its balconies — the three
  // cleaning lines a property manager buys together.
  "commercial-cleaning": ["window-cleaning", "balcony-cleaning", "power-washing"],
};

/** The related services for one service, resolved. Unknown slugs drop out. */
export function relatedServices(service: Service): Service[] {
  return (relatedBySlug[service.slug] ?? [])
    .map((slug) => services.find((s) => s.slug === slug))
    .filter((s): s is Service => Boolean(s));
}

// --- Contact page ------------------------------------------------------

/**
 * /contact. The footer has carried a "Get In Touch" link since the homepage
 * shipped (`footer.additionalLinks` above); it pointed at the sitewide
 * `#quote` anchor because there was nowhere else to send it. It now points
 * here, and the hero crumb keeps the same label so the link text and the
 * page it lands on read as one destination rather than two.
 *
 * `details.cards` carries only the copy — title and a supporting line. The
 * phone number, email, hours and service area are not restated here; the
 * card component reads those straight off `business` above, the same way
 * the footer and header utility strip already do, so there is exactly one
 * place to correct a number.
 */
export const contactPage = {
  hero: {
    crumb: "Get In Touch",
    heading: "Get In Touch",
    body: "Mobile and based in New Westminster — no office to visit, just a crew that comes to you anywhere across Greater Vancouver. Call, email or send the form below and we'll get back to you fast.",
    cta: "Request a Free Quote",
  },

  details: {
    label: "Reach Us Directly",
    headline: "Four Ways To Reach RainCity",
    cards: [
      {
        icon: "phone",
        title: "WhatsApp Us",
        note: "Fastest way to reach us — tap the number to message us on WhatsApp.",
      },
      {
        icon: "mail",
        title: "Email Us",
        note: "For anything you'd rather put in writing, or send photos along with.",
      },
      {
        icon: "clock",
        title: "Office Hours",
        note: "When our office is open to take your call.",
      },
      {
        icon: "pin",
        title: "Service Area",
        note: "Mobile only — no storefront, we come to you.",
      },
    ],
  },

  reassurance: {
    label: "What Happens Next",
    headline: "Reaching Out Doesn't Commit You To Anything",
    body: "Sending the form below starts a conversation, not a contract. Here's exactly what happens after you do.",
    points: [
      {
        title: "You'll Hear Back Within a Day",
        body: "A real person on the RainCity team reads every submission and calls or emails back within one business day — not an autoresponder, and not a week of silence.",
      },
      {
        title: "The Quote Costs Nothing",
        body: "We price the property in front of us and tell you the number. If the timing or the price isn't right for you, that's the end of it.",
      },
      {
        title: "No Follow-Up Calls You Didn't Ask For",
        body: "Say the word and we'll get you on the schedule. If you don't, we won't chase you — the quote is yours to use whenever you're ready.",
      },
    ],
  },
} as const;


// --- Locations page --------------------------------------------------------

/**
 * /locations. The copy for the hub page; the nine communities themselves are
 * the `locations` array near the top of this file, not restated here.
 *
 * There is no source page for this route — the old site had per-city pages
 * and no index above them — so the structure is written from what the page
 * is for rather than inherited. A service-area page is asked one question,
 * and it is a geographic one: do you come to me? Everything here answers that
 * in a different register — the map shows the shape of the area, the coverage
 * index lets a reader find their own city in a list of nine, and the grid
 * says what each community is actually like to work in.
 *
 * Two patterns are deliberately absent, and their absence is the reason this
 * page reads as its own thing. There is no numbered "why choose us" column —
 * /about, /services and all eleven service pages already carry one — and no
 * three-step "how it works" strip, for the same reason. A hub page that
 * repeats the site's two most-used marketing blocks has no identity beyond
 * them.
 */
export const locationsPage = {
  hero: {
    crumb: "Locations",
    heading: "Where We Work",
    /** Second line of the h1. See `locationPage.hero.h1Sub` for the why. */
    headingSub: "Nine Communities Across Greater Vancouver",
    body: "A mobile crew out of New Westminster, covering nine communities across Greater Vancouver — both banks of the Fraser, all year.",
    cta: "Get a Free Quote",
  },

  /**
   * The two figures are counted from `locations` and `services` at render
   * time rather than typed here. They are the only two numbers on this page,
   * and both are facts about this site's own content — unlike the figures on
   * /about, which are the client's unverified claims and stay out of the
   * structured data for that reason.
   */
  overview: {
    label: "Service Area",
    headline: "No Storefront. A Van, And A Map.",
    body: "RainCity is a mobile business. There is no shop to visit — the truck loads in New Westminster and drives to the property, which is why the service area is drawn in communities rather than in a radius around a front door. If you are inside it, you get the same crew and the same rates as the street we park on.",
    stats: [
      { label: "Communities served" },
      { label: "Services in every one" },
    ],
  },

  /**
   * The coverage index. Group order is the order the bands are printed in,
   * and every community on the page is placed by its own `bearing` — so a
   * tenth community appears here the moment it is added to `locations`, in
   * the band it belongs to, with nothing in this file to remember.
   */
  map: {
    label: "Coverage",
    headline: "The Area, And Everything In It",
    body: "Greater Vancouver is organised by one river, and so is this list. New Westminster sits on the Fraser; everywhere else we go is a matter of which bank it is on and which way it lies from us.",
    /** Under the map, when a Maps key exists and the outline is drawn. */
    caption: "The Metro Vancouver boundary, outlined. We work in nine of the communities inside it — the nine listed here.",
    /**
     * With no key, the plate shows `regionPortMann` instead (2026-09-25), so
     * the caption stops describing an outline that is not there. The title
     * and place are the scrim caption inside the photo, shared with the
     * community pages.
     */
    photoCaption: "Greater Vancouver, on both banks of the Fraser. We work in nine communities across it — the nine listed here.",
    photoTitle: "The Fraser at the Port Mann Bridge",
    photoPlace: "Between Coquitlam and Surrey, Burnaby beyond",
    groups: [
      { bearing: "base", title: "Our base" },
      { bearing: "north-west", title: "North of the Fraser — west" },
      { bearing: "north-east", title: "North of the Fraser — east" },
      { bearing: "south", title: "South of the Fraser" },
    ],
    /** Marks the New Westminster row. Not a claim, just a fact about us. */
    baseTag: "Where we load in",
  },

  grid: {
    label: "Communities",
    headline: "Nine Places We Know Our Way Around",
    body: "Every property gets quoted on what is in front of us, but the weather, the housing stock and the access are different in each of these — and after a few years working them, so is what we bring.",
    /** The city name is appended by the card. */
    cardCta: "View Services in",
  },

  closing: {
    heading: "Not Sure If We Reach You?",
    body: "If your community is on this page we already come to it. If it is just outside, ask anyway — we cross the odd boundary for the right job, and the answer takes one phone call.",
    cta: "Get a Free Quote",
  },
} as const;


// --- Location page ---------------------------------------------------------

/**
 * /locations/[slug]. The blocks all nine community pages repeat verbatim —
 * eyebrows, section headings, fixed body copy and button labels.
 *
 * The same split `servicePage` has with `Service.detail`, and drawn in the
 * same place: what is genuinely different community to community lives on
 * `Location.detail`, and what is a label lives here. A section heading that
 * reads "Every Service We Offer, In Anmore" is a label with a variable in
 * it, so the variable is interpolated by the component and the sentence
 * stays in one file.
 *
 * Where a heading needs the community's name, the copy below carries the
 * halves either side of it rather than a `{name}` token and a replace() —
 * one fewer string-templating idiom on a site that has none, and the
 * component reads as the sentence it prints.
 *
 * On what this page deliberately does NOT contain, which is the same refusal
 * `locationsPage` above documents and for a reason that gets stronger with
 * nine pages rather than one: no numbered "Why Choose RainCity" column and
 * no three-step "How It Works" strip. Both are already on /about, on
 * /services and on all eleven service pages. Running them here as well would
 * put the site's two most-reused marketing blocks on twenty-two of its
 * twenty-five pages, and a location page repeating them has nothing left
 * that is about the location. What this route has instead is the local brief,
 * the map at community zoom, questions written for this community and the
 * nearby cross-links — none of which appears anywhere else on the site.
 */
/**
 * The questions on the five pages above the two templates.
 *
 * Every other question set on this site belongs to one service or one
 * community. These five belong to the pages a broad question lands on —
 * the homepage, the two hubs, /about and /contact — which between them
 * carried no machine-readable answers at all until this existed.
 *
 * One hard rule was applied writing these, and it is the same rule the blog
 * compliance pass ran on: **an answer here may restate what the site already
 * says and may not invent what it does not.** Every operational fact below
 * is drawn from somewhere already published — the hours on `business`, the
 * free written quote the CTAs promise site-wide, the licensed-and-insured
 * claim in `servicesPage.intro.principles`, the no-storefront position in
 * `locationsPage.overview`.
 *
 * The one price on this site is here, and it is the client's: on 2026-09-23
 * they supplied the minimum job size (usually $120, depending on the job) and
 * the travel policy (included in the price; a fee may apply to an on-site
 * visit, by location), replacing the "no travel charge and no minimum" line
 * this block used to restate. Both are worded identically wherever they
 * appear. Change them everywhere or nowhere.
 *
 * Nothing else here commits the office to a response time, a price, a crew
 * size or a booking window. Those are the six kinds of sentence the blog audit
 * had to strip, and a question set is exactly where they creep back in: an
 * answer wants to be reassuring, and "we usually get back to you within the
 * hour" is a promise somebody has to keep on a Tuesday in November.
 *
 * These are published as `FAQPage` on their pages. Editing an answer here
 * edits what a search engine and an answer engine are told this company
 * says, so treat a change to this object as a change to the site's copy
 * rather than to its configuration.
 */
export const pageFaqs = {
  home: {
    label: "Common Questions",
    heading: "The Questions We Get Asked First",
    body: "Before a quote, most people want the same handful of things settled. These are the answers, and none of them change depending on who is asking.",
    faqs: [
      {
        question: "What areas does RainCity cover?",
        answer:
          "Nine communities across Greater Vancouver, on both banks of the Fraser — Vancouver, Burnaby, New Westminster, Surrey, Delta, Langley, Anmore, the Tri-Cities and the Ridge Meadow area. RainCity is a mobile business working out of New Westminster, so the service area is drawn in communities rather than as a radius around a shop. If a property sits just beyond the edge of the map, it is worth asking rather than assuming.",
      },
      {
        question: "Do you work with stratas and commercial properties?",
        answer:
          "Yes, alongside residential. Strata common areas, commercial frontages, parkades and multi-unit sites are a substantial share of the work, and they are scoped the same way a house is — in writing, against what is actually there. The difference is usually frequency: a building runs on a schedule where a house runs on a season.",
      },
      {
        question: "Are quotes free, and are they in writing?",
        answer:
          "Yes to both. The quote is given in writing after looking at the property, and the figure on it is the figure on the invoice. Anything that could change it — a blocked downspout that has to be augered, a guard system nobody mentioned, a surface that turns out to be sealed rather than bare — is better identified before the work than argued about after it.",
      },
      {
        question: "Are you licensed and insured?",
        answer:
          "Yes, and we will confirm it in writing on request. It is worth asking any contractor for on work involving height, and worth asking before anyone arrives rather than after an incident.",
      },
      {
        question: "What are your office hours?",
        answer:
          "Our office is open Monday to Saturday, 8am to 4pm, and closed on Sunday. Exterior work in this region is weather-dependent by nature, so scheduling is agreed against a forecast as well as a date — which is usually why a contractor moving a date is doing the right thing rather than the inconvenient one.",
      },
      {
        // Supplied by the client on 2026-09-23, replacing "no to both". The
        // same two facts are worded the same way everywhere they appear — the
        // community FAQs, /locations, /contact and the /about Home Ground — so
        // a reader comparing pages never finds two policies.
        question: "Is there a minimum job size or a travel charge?",
        answer:
          "There is a minimum job size, usually $120, though it depends on the job. Travel is already included in the price we quote. A travel fee may apply to an on-site visit, depending on where the property is — ask when you arrange one.",
      },
    ],
  },

  services: {
    label: "About The Catalogue",
    heading: "How These Services Fit Together",
    body: "It is a wide list of services, and the questions it raises are mostly about how they combine rather than about any one of them.",
    faqs: [
      {
        question: "Can several services be booked in one visit?",
        answer:
          "Usually, and often they should be. Some jobs are naturally one visit — the ladder is already at the gutter line when the roof needs looking at, and a slab is washed before it is sealed. Combining them is quoted as one scope rather than as separate jobs stacked together.",
      },
      {
        question: "Which services are seasonal?",
        answer:
          "Sealing and exterior painting need consecutive dry days and are effectively a late-spring-to-early-autumn proposition here. Snow clearing and holiday lighting are winter. Everything else runs year-round, though the sensible timing for roof and gutter work is tied to the growth flush in spring and the leaf drop in autumn rather than to the calendar.",
      },
      {
        question: "What is the difference between power washing and soft washing?",
        answer:
          "Power washing removes what is on a surface with force; soft washing removes it with a detergent applied at low pressure and then rinsed. The surface decides which is appropriate, not the stain. Hard ground surfaces take pressure. Roofs, cedar, stucco and painted siding take soft washing, because pressure removes the finish along with the growth.",
      },
      {
        question: "Do you offer maintenance on a schedule rather than one-off?",
        answer:
          "Yes. Recurring work is the normal arrangement for stratas and commercial sites and is available residentially too. The practical argument for it is scheduling rather than price — exterior work in this region has narrow right weeks, and work booked in advance lands in them.",
      },
      {
        question: "What is included in a quote?",
        answer:
          "The areas covered, the method, the access assumed, what happens to any debris, and what finished looks like. Those five are what make two quotes comparable, and a quote that leaves one out has made an assumption about it that you cannot see.",
      },
    ],
  },

  locations: {
    label: "About The Coverage",
    heading: "Whether We Come To You",
    body: "The map answers most of it. These are the questions the map raises — edges, boundaries and whether where you are changes anything.",
    faqs: [
      {
        question: "Do you charge more for communities further out?",
        answer:
          "Not on the work itself: travel is already included in the price we quote, so a job in Aldergrove is priced the way one four blocks from the New Westminster yard is. A travel fee may apply to an on-site visit depending on location, and the usual minimum job size of $120 applies everywhere.",
      },
      {
        question: "My property is just outside the areas listed. Can you still come?",
        answer:
          "Ask. The nine communities are where the work concentrates rather than a hard boundary, and the answer takes one phone call. We cross the odd municipal line for the right job.",
      },
      {
        question: "Why are Tri-Cities and Ridge Meadow listed as groupings?",
        answer:
          "Because that is how the areas are talked about locally, but they are not municipalities. Tri-Cities means Coquitlam, Port Coquitlam and Port Moody; Ridge Meadow means Maple Ridge and Pitt Meadows. All five are covered individually — the grouping is a label on a map, not a limit on where the truck goes.",
      },
      {
        question: "Is there an office or a shop I can visit?",
        answer:
          "No. RainCity is a mobile business and there is no storefront — the truck loads in New Westminster and drives to the property. Everything that would happen at a counter happens at the property instead, which is where the quote has to be worked out anyway.",
      },
      {
        question: "Does the same crew cover every community?",
        answer:
          "The whole catalogue travels, and the terms do not change by postcode. What changes between communities is what the properties there actually need — acreage lots under conifer cover ask for different work than a mid-rise strata does, and the individual community pages set out what each one tends to want.",
      },
    ],
  },

  about: {
    label: "About Us",
    heading: "Who You Are Actually Hiring",
    body: "The page above answers what we do. These are the questions about who turns up and what stands behind the work.",
    faqs: [
      {
        question: "Is RainCity a local company?",
        answer:
          "Yes — based in New Westminster and working across Greater Vancouver. That matters more here than it sounds: the timing of nearly every job on the list is set by a rainfall pattern that is specific to this coast, and knowing when the window closes is most of knowing how to schedule the work.",
      },
      {
        question: "Are you licensed and insured?",
        answer:
          "Yes, and confirmed in writing on request. On any work involving height it is worth asking a contractor for both, along with confirmation that their workers are covered.",
      },
      {
        question: "What happens if I am not happy with the work?",
        answer:
          "Tell us, and the first remedy is putting it right rather than arguing about it. The workmanship guarantee is set out in the terms and conditions, and it is written with a return visit as the first response.",
      },
      {
        question: "Do you do residential and commercial, or specialise?",
        answer:
          "Both, and the same crew and the same standard cover them. What differs is the scope and the rhythm — a house is generally seasonal work, a building is generally a schedule — rather than the method or the equipment.",
      },
      {
        question: "How is a job scoped before it starts?",
        answer:
          "Someone looks at the property, and the scope comes back in writing: the areas, the method, the access, what happens to debris, and what finished means. That document is what the crew works to on the day, which is why it is written before anything starts rather than after.",
      },
    ],
  },

  contact: {
    label: "Before You Call",
    heading: "What To Expect From A Quote",
    body: "A few things worth knowing before you pick up the phone, so the call is a short one.",
    faqs: [
      {
        question: "How do I get a quote?",
        answer:
          "Call, email, or send the form on this page with the property and the work in it. For anything with height or awkward access, the quote follows someone looking at the property — a number given over the phone for work nobody has seen is a number that changes on the day.",
      },
      {
        question: "Does a quote cost anything or commit me to anything?",
        answer:
          "No to both. Quotes are free and carry no obligation. If a quote needs someone to visit the property, a travel fee may apply depending on the location — ask when you arrange the visit.",
      },
      {
        question: "What should I tell you when I get in touch?",
        answer:
          "The address, roughly what needs doing, how many storeys, and anything awkward about getting to it — a deck under the eaves, a steep bank, a locked side gate, a parkade with a height bar. Access is the thing that most often changes a quote, so it is the thing most worth mentioning first.",
      },
      {
        question: "Can I book several jobs at once?",
        answer:
          "Yes, and it is usually the cheaper way round. Work that shares access shares setup — gutters and roof, washing and sealing — and it is quoted as one scope rather than as separate visits.",
      },
      {
        question: "What are your office hours?",
        answer:
          "Our office is open Monday to Saturday, 8am to 4pm, and closed on Sunday. Email arrives whenever you send it; the phone is the faster route while the office is open.",
      },
    ],
  },
} as const;

export const locationPage = {
  hero: {
    /** The middle crumb. The trail is Home / Locations / [community]. */
    crumb: "Locations",
    /**
     * The second line of the h1, under the community name.
     *
     * The heading used to be the bare community name and nothing else, which
     * read well and said nothing: "Burnaby" is the strongest on-page signal
     * on the page most likely to be entered on "exterior cleaning Burnaby",
     * and it carried no service term at all. The title tag had them; the
     * heading did not.
     *
     * Splitting the h1 rather than rewriting it keeps both. The community
     * name stays at `display-xl` and still dominates — a reader arriving from
     * a search for their own city is checking they landed in the right place,
     * which is what the original note here argued and is still true — while
     * the line under it at `display-m` puts the service terms inside the
     * heading element. Read as text, the h1 is now "Burnaby Exterior Cleaning
     * & Property Maintenance".
     *
     * `grouped` is the variant for the two entries that are not
     * municipalities. "Ridge Meadow" is a name nobody searches, and the whole
     * reason `municipalities` exists on `Location` is that Maple Ridge and
     * Pitt Meadows are what people actually type. The display name is
     * deliberately unchanged — see the note on `municipalities` — so this
     * line is where the real names go.
     */
    h1Sub: "Exterior Cleaning & Property Maintenance",
    h1SubGrouped: "Exterior Cleaning in ",
    quoteCta: "Get a Free Quote",
    callCta: "Call Us Now",
  },

  /** The local brief. Heading and body are per community; this is the label. */
  intro: {
    label: "In the Area",
    /** Sits over the three notes beside the copy. */
    notesTitle: "What we plan for here",
  },

  /**
   * The service grid. This section is the one thing on the site that ties
   * the services half to the locations half — /services never mentions a
   * community and /locations never mentions a service — so it prints the
   * whole catalogue rather than a selection. Every service is offered in
   * every community; showing six would imply the other five are not.
   */
  services: {
    label: "Services",
    headingBefore: "Every Service We Offer, In ",
    body: "The full catalogue travels. Whatever is on this list is available at your property on the same terms as anywhere else we work — quoted on what is in front of us, in writing, before anything starts.",
  },

  map: {
    label: "On the Map",
    heading: "Where This Sits, And What Is Around It",
    /** Beside the map: two facts, both derived rather than written. */
    baseLabel: "Booked and loaded from",
    bearingLabel: "Where it sits",
  },

  /**
   * "Off The Clock" — community involvement, per community. The entries are
   * `communityBySlug` above, and they are PLACEHOLDER: read that banner.
   */
  community: {
    label: "In the Community",
    /** Two lines: "Off The Clock" / "In {name}". */
    headingBefore: "Off The Clock",
    headingPlace: "In ",
    body: "Not everything the crew does here goes on an invoice. These are the festivals, shorelines and sidewalks we turn out for when the schedule allows.",
    /**
     * True while the photographs are stock. Prints `illustrativeNote` under
     * the frames; set false only when every frame is the client's own.
     */
    illustrative: true,
    illustrativeNote: "Photographs are illustrative.",
    /** The invitation under the photographs. The community name goes between. */
    inviteBefore: "Running a clean-up or a community event in ",
    inviteAfter: "?",
    inviteCta: "Tell Us About It",
  },

  /**
   * Partners that operate in this community. Derived by `localPartnersFor`
   * from each partner's own published service area — see `Partner.local`.
   */
  localPartners: {
    label: "Local Partners",
    /** Two lines: "Who We Work With" / "Around {name}". */
    headingBefore: "Who We Work With",
    headingPlace: "Around ",
    body: "RainCity partners whose own service area or campus includes this community, from what they publish themselves.",
    allCta: "See all our partners",
  },

  faq: {
    label: "Common Questions",
    headingBefore: "Questions We Get Asked In ",
    body: "The things people actually ask before booking here, answered the way we would answer them on the phone. If yours is not on the list, call — you will get a straight answer from someone who does the work.",
  },

  nearby: {
    label: "Nearby",
    heading: "Not Quite Your Area?",
    body: "These are the communities next to this one. If your property is closer to one of them, start there — it is the same crew either way, and the page will tell you what the work looks like on that side of the line.",
    /**
     * The card's own link row. The community name is appended by the card.
     *
     * Deliberately short. It was "Property care in", which is better copy and
     * does not fit: "Property care in New Westminster" fills the row at every
     * width these plates are ever laid out at, and the arrow after it either
     * wraps alone onto a second line or floats unattached beside a two-line
     * label. "View" plus the name holds one line on a phone, and it is the
     * same construction `ServiceCard` uses for "View Service".
     */
    cardCta: "View",
    /** Under the two or three cards, back to the full list. */
    allCta: "See all nine communities",
  },

  closing: {
    body: "Free written quotes, no contracts to sign, and the same crew whichever side of the river you are on.",
    cta: "Get Your Free Quote",
  },
} as const;


// --- Blog ------------------------------------------------------------------

/**
 * ===========================================================================
 * PUBLISHED BLOG CONTENT — authorised by the client, indexed, and no longer
 * a placeholder. Read the two standing rules at the bottom before editing.
 * ===========================================================================
 *
 * Every post below was originally written for this build rather than supplied
 * by RainCity, and for two passes it was held out of search on that basis.
 * The client has since authorised publication, `indexing.blog` in lib/seo.tsx
 * is `true`, and the six articles are in sitemap.xml with their own
 * BlogPosting markup and a `blogPost` list on the index. They are the
 * company's published position now, which is the whole reason for what
 * follows.
 *
 * WHAT WAS CHANGED BEFORE THAT FLAG MOVED, and what to repeat for any new
 * post: the FAQ answers carried operational commitments nobody had confirmed.
 * A completion time ("in practice before seven in the morning"), a trigger
 * depth ("two centimetres is the standard starting point"), a pricing model
 * ("priced per event rather than per pass"), a capacity guarantee, a
 * visit-duration range, and a claim about what most commercial clients buy.
 * Ten sentences across all six posts were rewritten to keep the advice and
 * hand the specifics back to the written quote. A number in an article is a
 * number the office has to hold to on the phone.
 *
 * The excerpts are the route's meta descriptions as well as the card copy, so
 * they are held to 150-158 characters like every other description on the
 * site. The post titles feed a `{title} | RainCity` template that has to stay
 * under 60, which is why one of them lost the word "Actually".
 *
 * TWO RULES THAT STILL STAND:
 *
 *  1. No author, and no byline. There is no `author` field on `BlogPost`,
 *     because putting a real person's name on copy they did not write is a
 *     worse kind of placeholder than an invented date. `blogPostingSchema`
 *     names the *organisation* as author, which is true of any page on this
 *     domain and asserts nothing about a person. Add the field and the byline
 *     together, on the day there is somebody to name.
 *  2. The dates are build dates, not editorial ones. `lastModified` in the
 *     sitemap is the publication date rather than a deploy timestamp, and
 *     nothing tracks revisions. If a post is materially rewritten, move its
 *     date deliberately rather than leaving a freshness signal nobody earned.
 *
 * On the shape of the copy below. Three of the six were expanded when the
 * template landed, so the page was built against a real range rather than
 * against six posts of identical length: `what-a-strata-schedule-covers` runs
 * long, with lists, an ordered sequence, a pull quote and a photograph in the
 * body; `moss-isnt-the-problem` sits in the middle; `three-days-of-snow` was
 * left as three short sections of plain prose. `readMinutes` was re-estimated
 * to match. Keep that spread if the set grows: six posts of identical length
 * is what a template looks like when nobody has read it.
 */

/**
 * One element of a post's body, in the order it is read.
 *
 * A bare string is a paragraph. That shorthand is the whole reason this is a
 * union and not a list of tagged objects: the overwhelming majority of what a
 * post contains is prose, and `{ kind: "text", text: "..." }` around every
 * paragraph would bury the copy in punctuation for the sake of the four
 * blocks that are not prose. Anything richer says what it is.
 *
 * The set is deliberately small and closed. `PostBody` renders exactly these
 * seven shapes and nothing else — there is no HTML string field and no
 * Markdown parser anywhere in this codebase, so no post can introduce a style
 * the design system has not already ruled on. A body that needs a new element
 * adds a member here and a branch there, and both are reviewable.
 */
export type BlogBlock =
  /** A paragraph. */
  | string
  /** An h3 inside the section's h2. */
  | { kind: "subheading"; text: string }
  /** Unordered. Rendered with the site's blue dash marker, never a disc. */
  | { kind: "list"; items: readonly string[] }
  /** Ordered, and only where the order is the point — see CLAUDE.md. */
  | { kind: "steps"; items: readonly string[] }
  /** A pulled line. `cite` names who said it, and is usually absent. */
  | { kind: "quote"; text: string; cite?: string }
  /**
   * A photograph inside the body. The caption is required: an image dropped
   * into an article without one is decoration, and this site does not
   * decorate. `alt` still comes from the registry, as everywhere else.
   */
  | { kind: "photo"; photo: PhotoKey; caption: string }
  /**
   * A paragraph with links in it.
   *
   * A bare string is still the shorthand for a paragraph and still the shape
   * most blocks take; this is the same paragraph with the sentence broken
   * into parts, so a phrase inside it can point at a page. `parts` reads in
   * order — a string is prose, an object is an anchor — and the renderer
   * joins them with no separator, so the spaces around a link belong to the
   * strings either side of it.
   *
   * It exists because six articles about moss, gutters, strata schedules and
   * driveway sealing could not link to the service that does the work. The
   * union had no link in any shape, `PostBody` renders paragraphs as plain
   * text, and there is deliberately no Markdown parser anywhere in the path —
   * so the only route to a link was to add a member here and a branch there,
   * which is exactly the extension CLAUDE.md prescribes. Both halves are
   * reviewable, and a post still cannot introduce a treatment the design
   * system has not ruled on.
   *
   * `href` was internal only, on the reasoning that an external link is a
   * decision about who this company is willing to send a reader to and not
   * something a content array should be able to make quietly. That reasoning
   * is intact; what changed is the answer to it.
   *
   * Across all thirty-five public pages this site linked out precisely
   * nowhere. For a company publishing advice about strata obligations, roof
   * method and winter salting, citing nothing is its own signal: the claims
   * are unsupported to a reader and uncorroborated to the systems that decide
   * what to quote. So `external` was added rather than the rule relaxed —
   * every outbound link is still a deliberate, reviewable act, it just now
   * has a shape.
   *
   * The bar for setting it: a primary source, and only a primary source. The
   * regulator, the statute, the standards body, the meteorological record.
   * Not a competitor, not a supplier, not a blog that also says the thing.
   * Every URL carried in this file was checked to resolve before it was
   * written, and any that dies should be removed rather than redirected to
   * something approximate.
   *
   * Rendered with `target="_blank"` and `rel="noopener"`, and deliberately
   * *without* `nofollow`: a citation the company stands behind is exactly
   * what a followed link is for.
   */
  | {
      kind: "linked";
      parts: readonly (
        | string
        | { href: string; text: string; external?: boolean }
      )[];
    };

/**
 * One section of a post — an h2 and everything under it until the next one.
 *
 * Sections rather than a single flat block list, because the h2s are the
 * skeleton a long post is navigated by: `postContents` in lib/blog.ts builds
 * the in-article contents from exactly this array. A flat list would mean
 * finding the headings again by inspecting block kinds.
 *
 * There is no `id` field. The anchor is derived from the heading in
 * lib/blog.ts, so a heading and the link that jumps to it cannot drift apart.
 */
export type BlogSection = {
  heading: string;
  blocks: readonly BlogBlock[];
};

export type BlogPost = {
  slug: string;
  title: string;
  /**
   * Two sentences for the card, and the route's meta description — see
   * `/blog/[slug]`, which passes this straight to `pageMetadata`.
   *
   * Written to stand alone in a search result, which means **150-158
   * characters**. The six here run 178 to 205 and are the last set on the
   * site still over that ceiling; they were left alone in the SEO pass
   * because the copy they summarise is placeholder and is being replaced
   * whole (see the PLACEHOLDER note on `blogPosts` below), and rewriting a
   * summary of a draft is work that gets thrown away. Hold the replacement
   * copy to the number.
   */
  excerpt: string;
  /**
   * Named author. Add when a real person at RainCity is confirmed as the
   * writer — do not invent a name for placeholder content. When set, a byline
   * appears in PostHeader and `blogPostingSchema` publishes a `Person` node
   * instead of the `Organization` fallback. Add the field here, the byline
   * component, and the schema in one pass; do not publish a Person name for
   * content the named person did not write.
   */
  author?: { name: string; title: string };
  /**
   * The tag printed on the card. Free text rather than a union, because the
   * set will change as the blog does and a union would make adding a post a
   * two-file edit. Keep the list short — six posts across six categories is a
   * tag cloud, not a taxonomy.
   */
  category: string;
  /** ISO 8601. Formatted for display in lib/blog.ts, and the sort key. */
  date: string;
  /** Whole minutes. The card prints "6 min read". */
  readMinutes: number;
  photo: PhotoKey;
  /**
   * Promoted to the featured strip above the archive grid. A featured post is
   * not repeated in the grid below it — see the note in lib/blog.ts.
   */
  featured?: boolean;
  /**
   * The article itself, rendered by `/blog/[slug]`.
   *
   * Length is not fixed and the template does not assume one: the posts below
   * run from three short sections to nine with lists, a pull quote and a
   * photograph in them, and both ends of that range were built against.
   */
  body: readonly BlogSection[];
};

export const blogPosts: BlogPost[] = [
  {
    slug: "moss-isnt-the-problem",
    title: "Moss Isn’t The Problem. What It Holds Is.",
    excerpt:
      "A green roof looks bad long before it is bad. What shortens a shingle's life is the water the moss holds against it, day after day, through a wet winter.",
    category: "Roof Care",
    date: "2026-08-18",
    readMinutes: 4,
    photo: "roofCleaning",
    featured: true,
    body: [
      {
        heading: "What moss is actually doing up there",
        blocks: [
          "Moss does not eat asphalt. It holds water, and that is enough. A shingle is built to shed rain in minutes and then dry; under a mat of moss it stays damp for days, and on this coast that is most of the season.",
          "Damp shingle loses its granules. Freeze-thaw lifts the edges of the courses. The moss then roots into the gap it made, and the next winter starts further ahead than the last one did.",
          {
            kind: "quote",
            text: "A roof does not fail because something grew on it. It fails because it never got the chance to dry.",
          },
        ],
      },
      {
        heading: "Why a pressure washer makes it worse",
        blocks: [
          "Pressure takes the green off in an afternoon and takes the granule layer with it. It also drives water up under the courses, which is the one place on a roof water is not supposed to go.",
          "The slower method is a low-pressure treatment that kills the growth and lets the weather carry it off over the following weeks. The roof looks worse for a month and lasts years longer.",
          {
            kind: "photo",
            photo: "roofMossy",
            caption:
              "At this depth the mat is holding water against the tile right through the winter. Pressure would clear it in an afternoon and cost the surface years.",
          },
        ],
      },
      {
        heading: "What gets looked at before a price is given",
        blocks: [
          "A roof is quoted off its condition rather than its footprint, and most of what moves the number is not the moss itself.",
          {
            kind: "list",
            items: [
              "How much granule is already sitting in the gutters — the cheapest indication of how much life the surface has left.",
              "Whether the growth is sitting on the courses or rooted under their edges.",
              "The north and shaded slopes, which carry most of it and dry last.",
              "Overhanging growth, because a roof under a cedar is a roof that will need this again sooner.",
              "Valleys and flashings, where a mat holds water against a joint rather than against a shingle.",
            ],
          },
        ],
      },
      {
        heading: "When it is worth booking",
        blocks: [
          "Spring, after the growth flush, or early autumn before the rain settles in. Both give the treatment dry days to work in and leave the roof clear for the season that matters.",
          {
            kind: "linked",
            parts: [
              "If there is already moss thick enough to see from the street, the ",
              { href: "/services/gutter-cleaning", text: "gutters are carrying it too" },
              ". The two jobs are usually one visit.",
            ],
          },
          {
            kind: "linked",
            parts: [
              "The scope and the method are set out on the ",
              { href: "/services/roof-cleaning", text: "roof cleaning page" },
              ", and the low-pressure approach this article describes is ",
              { href: "/services/soft-washing", text: "soft washing" },
              ". We work across ",
              { href: "/locations", text: "nine Greater Vancouver communities" },
              ".",
            ],
          },
        ],
      },
      {
        heading: "Questions About Roof Moss in Greater Vancouver",
        blocks: [
          { kind: "subheading", text: "How do I know if my roof needs moss treatment?" },
          "Visible growth on shingles is the obvious sign, but the more useful test is the north-facing slope in late spring. If it is still carrying a mat after the drier months, the root structure is well established. Gutters filling with granule grit are the other indicator — that is the shingle surface telling you how much life it has left.",
          { kind: "subheading", text: "How long does a treated Greater Vancouver roof stay clean?" },
          "Typically three to five years after a proper low-pressure treatment, against roughly one year when growth is knocked off at pressure. The difference is the root: treatment kills it, so regrowth starts from new spores on a clean surface rather than from the root mass left behind. North-facing slopes and roofs under heavy conifer cover sit at the short end of that range.",
          { kind: "subheading", text: "Can I pressure wash my own roof to save money?" },
          "The machine is available for rent, and the damage to an asphalt shingle is dramatic and invisible on the same afternoon. Granules leave the surface with the moss, water is driven up under the courses, and the roof looks dramatically better for one season before failing several years early. Low-pressure treatment is slower and is the only method that does not shorten the life of the roof it is treating.",
          { kind: "subheading", text: "Does roof cleaning affect my shingle warranty?" },
          "Most shingle manufacturers explicitly permit low-pressure cleaning and warn against pressure washing. If your roof is inside its warranty period, the manufacturer's own maintenance guidance is worth reading before booking either method. We confirm the method and the products used in writing on request, which is what a warranty claim may eventually ask for.",
          { kind: "subheading", text: "When is the best time of year to treat a roof in BC?" },
          "Spring and early autumn are both practical windows — after the growth flush and before the sustained rain sets in, respectively. Both give the treatment dry working days and leave the roof ready for the season that follows. Moss visible from the street usually means the gutters are carrying it too, and clearing both in one visit is the usual approach.",
        ],
      },
    ],
  },
  {
    slug: "the-fortnight-before-the-rain",
    title: "The Fortnight Before The Rain Sets In",
    excerpt:
      "Late September is the cheapest fortnight of the year to own a building in Greater Vancouver. Everything left until after the first storm is harder work.",
    category: "Seasonal",
    date: "2026-08-04",
    readMinutes: 3,
    photo: "gutterCleaning",
    featured: true,
    body: [
      {
        heading: "The window",
        blocks: [
          "There is a fortnight most years — late September into the first week of October — where enough leaves are down to be worth clearing and the weather is still dry enough to work in. It closes without warning.",
          "Everything on the list below is ordinary maintenance inside that fortnight and an emergency call in November.",
        ],
      },
      {
        heading: "What belongs in it",
        blocks: [
          {
            kind: "linked",
            parts: [
              { href: "/services/gutter-cleaning", text: "Gutters cleared and flow-tested" },
              ", not just scooped. Downspouts checked at the bottom as well as the top, because the blockage is usually at the elbow. ",
              { href: "/services/roof-cleaning", text: "Roof valleys cleared of needles" },
              ". Yard drains and catch basins lifted and looked at.",
            ],
          },
          "On a strata, add the parkade drains and the walkway grates. They are the two that flood first and the two nobody has on a schedule.",
        ],
      },
      {
        heading: "What it costs to miss it",
        blocks: [
          "A blocked downspout does not overflow neatly. It backs up behind the fascia, runs down the inside of the board, and the first anyone knows about it is a stain on a ceiling in January.",
          {
            kind: "photo",
            photo: "gutterDownspouts",
            caption:
              "The elbow is where most blockages form — it collects what the run above it carries down, and clears last in a flush from the top.",
          },
          "The clearing job is an hour. The fascia and the drywall behind it are a different trade and a different invoice.",
          {
            kind: "linked",
            parts: [
              "What a clearing visit covers is on the ",
              { href: "/services/gutter-cleaning", text: "gutter cleaning page" },
              "; the valleys and the roof itself are ",
              { href: "/services/roof-cleaning", text: "roof cleaning" },
              ". Both are booked in every one of the ",
              { href: "/locations", text: "communities we cover" },
              ".",
            ],
          },
        ],
      },
      {
        heading: "Questions About Fall Maintenance Timing in Greater Vancouver",
        blocks: [
          { kind: "subheading", text: "When exactly should I book gutters cleaned in autumn?" },
          "Mid-September to early October is the ideal window — late enough that most deciduous leaves are down, early enough that the autumn rains have not set in. In practice the window is short and it closes without much warning. Booking while the weather is still fine, rather than when the first storm arrives, is the whole difference between a scheduled visit and an emergency call.",
          { kind: "subheading", text: "What happens if I wait until after the first storm?" },
          "A blocked downspout does not fail quietly. The overflow backs up behind the fascia, runs down the inside of the board, and the first sign is usually a stain on an interior ceiling in December or January. The clearing job remains an hour's work; the fascia and the ceiling behind it are a different trade and a larger invoice.",
          { kind: "subheading", text: "Does timing change on a property with conifers?" },
          "Yes. Deciduous trees drop their leaves in a six-week window; cedars and firs shed needles year-round, and by November a gutter cleared in September under heavy conifer cover can be carrying a second season's load. Properties with no overhanging trees have the most flexibility. Properties under mature fir or cedar should assume two clears a year rather than one.",
          { kind: "subheading", text: "What is the full pre-rain checklist for a strata?" },
          "Gutters and downspouts cleared and flow-tested. Roof valleys and flat sections cleared of needles. Parkade drains and floor channels lifted and looked at. Walkway and stairwell grates checked. Yard drains and catch basins opened. The parkade drains and the grates are the two items most often missing from an inherited strata schedule and the ones that flood first.",
          { kind: "subheading", text: "How long does a gutter clearing visit take?" },
          "How long a visit runs depends on the length of the runs, the volume of debris and how many downspouts need augering. A complex or strata with multiple buildings is priced by the scope. The flow test on every outlet is included rather than quoted separately — it is what turns a clearing into a working system.",
        ],
      },
    ],
  },
  {
    slug: "why-the-north-wall-greens-first",
    title: "Why The North Wall Greens Over First",
    excerpt:
      "Same house, same siding, same year, and one wall is green while the other is fine. It is not the paint. It is how long a north-facing wall stays wet here.",
    category: "Exterior Cleaning",
    date: "2026-07-21",
    readMinutes: 3,
    photo: "softWashing",
    body: [
      {
        heading: "It is drying time, not dirt",
        blocks: [
          "Algae needs moisture and shade, and a north elevation in Greater Vancouver has both from October to April. The south wall gets a few hours of sun a day even in winter and dries out between showers; the north wall does not.",
          "That is why the green line usually stops exactly where the shade does, and why it comes back on the same wall every time.",
        ],
      },
      {
        heading: "Low pressure, and a detergent that does the work",
        blocks: [
          {
            kind: "linked",
            parts: [
              "Painted siding, stucco and cedar all take damage from a ",
              { href: "/services/power-washing", text: "pressure washer" },
              " long before the algae does. A ",
              { href: "/services/soft-washing", text: "soft wash" },
              " puts a cleaning solution on the surface, gives it time, and rinses at something closer to garden-hose pressure.",
            ],
          },
          "It also kills what is rooted in the surface rather than shaving off what is visible, which is the difference between a wall that stays clean for two years and one that is green again by spring.",
        ],
      },
      {
        heading: "How often it actually needs doing",
        blocks: [
          "Most north elevations here want a wash every two to three years. Under heavy tree cover, every year.",
          {
            kind: "photo",
            photo: "softAlgae",
            caption:
              "Algae growth on an exterior surface mid-treatment. The colour lifts as the solution works into the root structure; the weather carries the remainder off over the following weeks.",
          },
          "If the same wall is green twelve months after a wash, the problem is drainage or overhanging growth rather than the wash — worth looking at before booking the same job again.",
          {
            kind: "linked",
            parts: [
              "The wash this article describes is ",
              { href: "/services/soft-washing", text: "soft washing" },
              ", and a wall that has been left long enough to need refinishing afterwards is ",
              { href: "/services/painting", text: "painting" },
              ". Both are quoted on what is in front of us, anywhere in ",
              { href: "/locations", text: "Greater Vancouver" },
              ".",
            ],
          },
        ],
      },
      {
        heading: "Questions About Exterior Soft Washing in Greater Vancouver",
        blocks: [
          { kind: "subheading", text: "How often does a north-facing wall need soft washing in BC?" },
          "Every two to three years on most Greater Vancouver properties, and annually on anything under heavy tree cover or beside standing water. The interval is set by how quickly algae re-establishes on a shaded wall, which in this climate is faster than on any other elevation. A wall that is green again twelve months after a wash usually has a drainage or overhanging-canopy problem that washing alone will not solve.",
          { kind: "subheading", text: "What surfaces can be soft washed?" },
          "Any surface that should not take pressure: stucco, painted siding, cedar shingles, aged brick, rendered walls, fascia and soffits. Those are the surfaces that sustain real damage from a pressure washer before the algae does — water forced into a failing paint film blisters it from behind, and a pressure lance on cedar raises the grain permanently. Soft washing puts a dilute solution on the surface, lets it dwell, and rinses at garden-hose pressure.",
          { kind: "subheading", text: "Will soft washing remove the black streaks on my siding?" },
          "Yes. Those streaks are typically algae or a related organism, not staining, and soft washing kills them at the root. They do not lift immediately on contact — the colony dies and the surface clears over the following weeks as the next rains carry the residue off. Where a wall has been staining for several seasons, faint shadow lines may remain in the surface material itself, which is a different problem.",
          { kind: "subheading", text: "Is the solution safe around plants and pets?" },
          "Yes, when the job is run properly. Any planting adjacent to the work is saturated with clean water before solution is mixed, because a root zone already full of water absorbs little else. Sensitive specimens are sheeted, and everything is rinsed at the end of the visit. Pets and children should stay inside while solution is being applied and until the rinse is finished — after that, the surface is safe to be around.",
          { kind: "subheading", text: "Does soft washing prevent algae from coming back?" },
          "It slows it significantly. Killing the colony at the root means regrowth starts from new spores on a clean surface rather than from what was left behind — typically two to three times longer than the interval after blasting. Persistent short-cycle regrowth usually points to a drainage or overhanging-canopy problem that washing alone will not solve.",
        ],
      },
    ],
  },
  {
    slug: "what-a-strata-schedule-covers",
    title: "What A Strata Maintenance Schedule Covers",
    excerpt:
      "Strata councils usually inherit a maintenance schedule rather than write one. What belongs on it, what goes missing, and what is worth an argument at the AGM.",
    category: "Strata & Commercial",
    date: "2026-06-30",
    readMinutes: 6,
    photo: "commercialCleaning",
    body: [
      {
        heading: "Three rhythms, not one list",
        blocks: [
          "A working schedule has three parts, and the reason an inherited one goes wrong is almost always that it only has the first of them.",
          {
            kind: "steps",
            items: [
              "The fixed cycle. Work that happens on a date regardless of what anyone can see — the things that are cheap on a calendar and expensive as a surprise.",
              "The seasonal pair. Two visits a year timed against the weather rather than the calendar, which on this coast means before the rain and after the leaf drop.",
              "The conditional work. Everything that happens because an inspection found it, and nothing that happens because it was on last year’s schedule.",
            ],
          },
          {
            kind: "linked",
            parts: [
              "Most inherited schedules only have the first, which is how the same complex ends up paying for quarterly ",
              { href: "/services/window-cleaning", text: "window cleaning" },
              " it does not need and no ",
              { href: "/services/gutter-cleaning", text: "gutter clearing" },
              " at all.",
            ],
          },
        ],
      },
      {
        heading: "What belongs on the fixed cycle",
        blocks: [
          "This is the part of the schedule that should not need a decision every year. It is written once, priced once, and the only question it needs at the AGM is whether the frequency is still right.",
          { kind: "subheading", text: "Twice a year" },
          {
            kind: "list",
            items: [
              "Gutters and downspouts cleared and flow-tested, once before the rain and once after the leaf drop.",
              "Roof valleys and flat sections cleared of needles and debris.",
              "Yard drains, catch basins and parkade drains lifted and looked at, not swept over.",
              "Exterior common-area lighting checked while somebody is already up a ladder.",
            ],
          },
          { kind: "subheading", text: "Once a year" },
          {
            kind: "list",
            items: [
              "An exterior wash of the elevations that green over — north and shaded walls, not the whole envelope.",
              "Walkway, stairwell and entrance hard surfaces, which are the fall-risk items an insurer asks about.",
              "A roof condition walk, which is a look rather than a clean and is the cheapest line on this list.",
            ],
          },
          "Every one of those is ordinary maintenance on a schedule and an emergency call without one. That is the whole argument for the fixed cycle.",
        ],
      },
      {
        heading: "What is usually missing",
        blocks: [
          "Parkade drains. Walkway and stairwell grates. The back-of-house corridors nobody walks through except staff. Roof access points, which are where moss gets a hold unnoticed.",
          "None of these are expensive on a schedule. All of them are expensive as a repair.",
          {
            kind: "photo",
            photo: "gutterCleaning",
            caption:
              "The line item cut first and the one that most often causes the repair. Clearing a run is an hour; the fascia behind it is a different trade and a different invoice.",
          },
          "The other common gap is not a place but a proof: a schedule that records that work happened, and nothing that records whether it worked.",
        ],
      },
      {
        heading: "Reading a schedule you inherited",
        blocks: [
          "A council taking over a schedule from somebody who has left can usually sort it out in an evening, in this order.",
          {
            kind: "steps",
            items: [
              "Put every line item against one of the three rhythms above. Anything that fits none of them is the first thing to question.",
              "Mark which items come back with a report and which come back with only an invoice. The second group is where money goes quietly.",
              "Walk the property against the list. What is on the schedule and not on the ground, and what is on the ground and not on the schedule, are both worth knowing.",
              "Only then look at the prices. A line item nobody can find on the property is not a saving, it is a mistake.",
            ],
          },
        ],
      },
      {
        heading: "The line items worth arguing about",
        blocks: [
          "Frequency, not scope. Halving a service is usually cheaper than cutting it out, and it is far easier to restore when the contingency fund recovers.",
          "The other one is the flow test on the gutters. It adds a little to the visit, and it is the only part of the job that tells anyone whether the work achieved anything.",
          {
            kind: "quote",
            text: "A cleared gutter and a working gutter are not the same claim, and only one of them survives a November storm.",
          },
        ],
      },
      {
        heading: "What to ask a contractor for",
        blocks: [
          "None of the below is an unusual request, and a contractor who cannot produce it is telling a council something useful about how the work is run.",
          {
            kind: "list",
            items: [
              "Proof of liability insurance and WorkSafeBC coverage, current, before the first visit rather than after an incident.",
              "A written scope that names the areas covered, so “exterior common areas” cannot quietly come to mean the front of the building.",
              "A service log per visit: what was done, what was found, what needs a decision.",
              "One point of contact who has actually stood on the property.",
              "A price that separates the scheduled work from the conditional work, so a council can cut one without losing the other.",
            ],
          },
        ],
      },
      {
        heading: "Before the AGM",
        blocks: [
          "A schedule is easier to defend as three rhythms and a set of reports than as a list of prices, because the question a council is actually being asked is not what the work costs but what it prevents.",
          "If a line item has no answer to that question, it is worth cutting. If it has one, it is worth keeping at half the frequency rather than at none.",
          {
            kind: "linked",
            parts: [
              "The scheduled work described here is ",
              { href: "/services/commercial-cleaning", text: "commercial and strata cleaning" },
              ", and the line item this article keeps returning to is ",
              { href: "/services/gutter-cleaning", text: "gutter clearing" },
              ". Both are available in every one of the ",
              { href: "/locations", text: "communities we cover" },
              ".",
            ],
          },
        ],
      },
      {
        heading: "Questions About Strata Maintenance Scheduling",
        blocks: [
          { kind: "subheading", text: "What is the minimum a strata maintenance schedule should cover?" },
          "Twice-yearly gutter and downspout clearing and flow-testing, an annual walk of the roof, annual soft-washing of the shaded elevations, and seasonal maintenance of walkways and stairwells. Those four items are cheap on a schedule and expensive as a surprise. Everything else a schedule carries is worth having; those are the ones that create liability when they are missing.",
          { kind: "subheading", text: "How do I get meaningful quotes from maintenance contractors?" },
          "Ask for three things before the first visit: a written scope that names the specific areas covered, current proof of liability insurance and WorkSafeBC coverage, and a price that separates the scheduled work from the conditional work. A contractor who cannot produce all three is telling the council something useful about how the work is actually run.",
          { kind: "subheading", text: "Can strata maintenance be scheduled outside business hours?" },
          "Most of it, yes. Exterior cleaning, pressure washing, gutter work and roof treatment are all outside work and can be scheduled early morning or on weekends without disrupting residents. The scope and the schedule are agreed in writing before the season starts, so nobody on the council side is finding out on the day what the crew intends to do.",
          { kind: "subheading", text: "What documentation should a strata get from its maintenance contractor?" },
          "A certificate of current liability insurance and WorkSafeBC coverage before the first visit. A written scope that survives an AGM question. A visit log recording what was done, what was found and what needs a decision. A separate quote for any work outside the scope, issued before that work begins. An insurer asking about a slip-and-fall on a December stairwell will ask for the log, not the invoice.",
          { kind: "subheading", text: "How often should a Greater Vancouver strata book gutter clearing?" },
          "Twice a year for most properties in this region: once before the autumn rain and once after the leaf drop, which are two different events here. A complex under heavy deciduous cover may need both within six weeks of each other. A property under conifers needs clearing more often than once annually because the needles run year-round rather than falling in one go.",
        ],
      },
    ],
  },
  {
    slug: "sealing-between-two-rainstorms",
    title: "Sealing A Driveway Between Two Rainstorms",
    excerpt:
      "Sealer needs a dry surface and a dry forecast, which is a narrow ask in Greater Vancouver. The window is real, though, and wider than most people assume.",
    category: "Hard Surfaces",
    date: "2026-05-19",
    readMinutes: 3,
    photo: "concreteAsphaltSealing",
    body: [
      {
        heading: "What the product actually needs",
        blocks: [
          "A clean, dry surface, air above about ten degrees, and enough hours after application to cure before the next rain. The surface matters more than the sky — concrete that looks dry can still be holding water from two days ago.",
          {
            kind: "linked",
            parts: [
              "That is why the ",
              { href: "/services/power-washing", text: "prep wash" },
              " happens well before the ",
              { href: "/services/concrete-and-asphalt-sealing", text: "seal coat" },
              " rather than on the morning of it.",
            ],
          },
        ],
      },
      {
        heading: "Finding the window",
        blocks: [
          "Between May and September there are more workable stretches here than the region's reputation suggests. The job is scheduled against the forecast rather than the calendar, and it moves when the forecast does.",
          "A booking that cannot move is a booking that gets sealed in the wrong conditions, which is worse than not sealing at all.",
        ],
      },
      {
        heading: "Why it is worth the scheduling trouble",
        blocks: [
          "Water, road salt and freeze-thaw are what break a driveway or a lot, and all three work through the surface rather than on it.",
          {
            kind: "photo",
            photo: "sealingDriveways",
            caption:
              "A residential driveway after sealing. The sheen comes off after curing; what remains is the surface barrier that slows water ingress through the winter.",
          },
          "Sealed on a sensible cycle, the same slab lasts years longer, and the cracks that do appear stay small enough to fill.",
          {
            kind: "linked",
            parts: [
              "The full scope — routing, filling, degreasing, metering and the coat itself — is on the ",
              { href: "/services/concrete-and-asphalt-sealing", text: "concrete and asphalt sealing page" },
              ", and the prep wash that has to come first is ",
              { href: "/services/power-washing", text: "pressure washing" },
              ". Both travel across ",
              { href: "/locations", text: "Greater Vancouver" },
              ".",
            ],
          },
        ],
      },
      {
        heading: "Questions About Driveway Sealing in Greater Vancouver",
        blocks: [
          { kind: "subheading", text: "When is the best time to seal a driveway in Greater Vancouver?" },
          "Late spring through early autumn — roughly May through September — when surfaces are warm, dry and finished curing from the winter. The product needs about ten degrees at the slab and enough hours after application to cure before the next rain. Between May and September there are more usable windows here than the coast's reputation suggests. A job scheduled against the forecast rather than the calendar is how we ensure conditions are right on the day.",
          { kind: "subheading", text: "How do I know when my driveway needs resealing?" },
          "Pour a small amount of water on the surface. If it beads and sits on top, the seal is working. If it soaks in and darkens the concrete, the surface is open to water — worth sealing before frost cycles work the moisture further in. Asphalt that has turned grey-brown and crumbly at the edges, or concrete with a spreading crack network, is approaching the point where sealing buys less time than repair.",
          { kind: "subheading", text: "How long does driveway sealing last in BC?" },
          "Asphalt sealcoat typically holds two to three years under normal residential traffic; penetrating concrete sealers commonly run three to five. Both depend more on the quality of the preparation than on the product itself. A sealed slab on a flat, open property will outlast the same product on a sloped driveway catching road salt off a busy street.",
          { kind: "subheading", text: "Does sealing prevent cracks from forming?" },
          "It slows them. A sealed surface sheds water rather than absorbing it, which limits the freeze-thaw expansion that levers concrete apart from the inside. What sealing cannot do is repair structural failure — a slab where the base underneath has settled needs attention that sealing will not provide. Working cracks are routed to a clean reservoir and filled before any coat goes down, because sealer painted over a crack reopens through the film by spring.",
          { kind: "subheading", text: "What is the difference between a penetrating sealer and a topical one?" },
          "A penetrating silane or siloxate soaks into the pores and waterproofs from inside, leaving the surface appearance unchanged — the right choice wherever slip resistance matters, on exposed aggregate and around water. A topical acrylic sits on top, adds sheen and enriches colour, and needs redoing sooner because it wears rather than being bonded into the slab. The quote names which one and why for each surface.",
        ],
      },
    ],
  },
  {
    slug: "three-days-of-snow",
    title: "Three Days Of Snow, And They All Matter",
    excerpt:
      "Greater Vancouver gets a handful of days a year that genuinely need clearing. Nobody knows which ones in advance, which is why the plan beats the shovel.",
    category: "Seasonal",
    date: "2026-01-20",
    readMinutes: 3,
    photo: "snowRemoval",
    body: [
      {
        heading: "The problem with a rare event",
        blocks: [
          "A city that gets snow every week owns equipment for it. A city that gets snow three times a year phones somebody at six in the morning, along with everyone else.",
          "By the time a property is calling, the crews are already committed to the properties that booked in October.",
        ],
      },
      {
        heading: "What a seasonal contract actually buys",
        blocks: [
          "A place in the route, and a trigger depth that says when the truck comes without anyone having to phone. On a commercial site it also buys a service log, which is what an insurer asks for after a fall.",
          "A seasonal agreement is written for the season rather than the visit, because the alternative is a business that only makes money in a bad winter.",
        ],
      },
      {
        heading: "Salt, and when it stops working",
        blocks: [
          {
            kind: "linked",
            parts: [
              "Rock salt does very little far below freezing, and this region spends most of its cold snaps within a few degrees of it — which is why ",
              { href: "/services/snow-removal-salting", text: "salting" },
              " works here, and why timing it ahead of the freeze matters more than the quantity.",
            ],
          },
          {
            kind: "photo",
            photo: "snowSalting",
            caption:
              "Salting ahead of a freeze rather than after it. The difference between the two is the difference between prevention and remediation, and on a commercial site the liability follows the same line.",
          },
          "Applied after the ice has bonded, it is mostly grit. Applied before, it stops the bond forming at all.",
          {
            kind: "linked",
            parts: [
              "Trigger depths, route position and the service log are set out on the ",
              { href: "/services/snow-removal-salting", text: "snow removal and salting page" },
              ", and the year-round side of a commercial site is ",
              { href: "/services/commercial-cleaning", text: "common-area cleaning" },
              ". Both are quoted for the property, in any of the ",
              { href: "/locations", text: "communities we cover" },
              ".",
            ],
          },
        ],
      },
      {
        heading: "Questions About Snow Removal and Winter Property Care",
        blocks: [
          { kind: "subheading", text: "Why book a snow removal contract instead of calling when it snows?" },
          "By the time a property in Greater Vancouver calls, the crews with capacity are already committed to sites that booked in October. This region gets snow on perhaps three to six days a year — often overnight, often heavily — and every uncovered property phones at the same time. A seasonal contract reserves capacity for your site before the season starts and means the truck comes automatically at the agreed trigger depth, without anyone having to call.",
          { kind: "subheading", text: "What trigger depth should I set for snow clearing?" },
          "The trigger depth is set for the site rather than taken from a rule of thumb: low enough that the surface is covered, high enough that the snow has not yet compacted into the ice that makes mechanical clearing difficult. Sites with steep ramps, high pedestrian traffic or accessibility requirements often go lower. Residential driveways can usually go higher. The trigger is written into the contract and is not a judgement call on the morning of the event.",
          { kind: "subheading", text: "Is rock salt safe on concrete and parkade membranes?" },
          "Not on new concrete or waterproofed parkade decks. Sodium chloride on concrete under a year old causes surface scaling, and salt-laden meltwater running through a parkade membrane attacks the reinforcement below it. Those areas need magnesium chloride or a CMA blend. Tell us at the site walk if any area is newly poured, membraned or draining into landscaping, and the product is chosen for the surface.",
          { kind: "subheading", text: "How early will clearing happen on a commercial site?" },
          "The aim for commercial and strata sites is completion before the first arrivals, and the start time that follows from it is written into the agreement rather than left to the morning. Heavy overnight events get a first pass before dawn and a second if the snow continues. A site cleared at five and snowed on until nine has not been cleared, which is why the number of passes an event needs is settled with the site in advance rather than argued about afterwards.",
          { kind: "subheading", text: "What is the difference between a seasonal contract and a per-event rate?" },
          "A seasonal agreement covers the winter regardless of how many events occur and holds a place in the route. A per-event arrangement is called on when it snows. Which one suits a property depends on what an uncleared morning actually costs it and how much certainty is worth paying for, and that is a conversation worth having before November rather than during it.",
        ],
      },
    ],
  },
  {
    slug: "what-changes-a-gutter-quote",
    title: "What Changes The Number On A Gutter Quote",
    excerpt:
      "Two houses on the same street get different gutter quotes. Six things move the figure, and the length of the run is nowhere near the biggest of the six.",
    category: "Costs",
    date: "2026-08-25",
    readMinutes: 4,
    photo: "gutterRuns",
    body: [
      {
        heading: "Why nobody quotes this over the phone",
        blocks: [
          "The question that comes in most often is what gutter cleaning costs, and the honest answer is that the number is set by things nobody can see from a phone call. Two houses on the same street, built the same year, can be quoted differently — and usually are.",
          "That is not evasion. It is that the length of the gutter run, the one thing a caller can measure, is a long way from being the thing that decides the work.",
        ],
      },
      {
        heading: "The six things that actually move it",
        blocks: [
          "Roughly in the order they matter:",
          {
            kind: "list",
            items: [
              "Height, and what it does to access. A single-storey bungalow is ladder work. A three-storey with a walkout basement at the back is a different job on the same footprint — and on that building the front and the back are two different jobs.",
              "What is standing under the eaves. A deck, a conservatory, a hedge or a steep bank all mean the ladder cannot go where the gutter is, and the work moves to poles or to roof access.",
              "Roof pitch, where the gutter has to be reached from above. A low slope can be walked. A steep one cannot, and that changes the equipment before it changes anything else.",
              "Tree cover, and the species. Conifers are the ones that matter here — needles pack rather than pile, and packed needles are pulled out rather than scooped.",
              "Whether there are guards, and what kind. Removing and refitting a guard system is often the largest single block of time on the job.",
              "The state of the downspouts. A clear run is flushed in minutes. A blocked elbow is augered, and until it is opened the gutter above it has not actually been fixed.",
            ],
          },
        ],
      },
      {
        heading: "What matters less than people expect",
        blocks: [
          "Linear footage is the obvious one. It sets a floor and very little else — the difference between ninety and a hundred and thirty feet of gutter is far smaller than the difference between reaching it off a ladder and reaching it off a roof.",
          "How bad it looks from the ground is the other. A gutter packed solid and a gutter half full take a similar amount of time to do properly, because both are emptied along their whole length and both end on the same flow test.",
          {
            kind: "quote",
            text: "The expensive part of a gutter is almost never the gutter. It is what has to happen before anyone can stand next to it.",
          },
        ],
      },
      {
        heading: "The one that surprises people",
        blocks: [
          "Guards. They are sold as the thing that ends gutter cleaning and they are closer to the thing that changes it: fine debris still passes, moss still grows on the mesh, and the guard now has to come off and go back on around whatever is cleared underneath.",
          "None of that makes them a bad idea. It does mean a guarded gutter is not automatically a cheaper one, and a quote that does not mention them has probably not accounted for them.",
        ],
      },
      {
        heading: "Why this matters more here than most places",
        blocks: [
          {
            kind: "linked",
            parts: [
              "The climate normals for Vancouver International Airport put the site at roughly 1,189 mm of precipitation a year, with about three quarters of it falling between October and March — ",
              {
                href: "https://climate.weather.gc.ca/climate_normals/",
                text: "Environment and Climate Change Canada publishes the record",
                external: true,
              },
              ". A gutter here is not managing the occasional storm. It is moving water more or less continuously for half the year.",
            ],
          },
          "That is why the flow test at the end is the part worth insisting on. A gutter that has been emptied looks finished. A gutter that has been tested is finished.",
        ],
      },
      {
        heading: "Questions About Gutter Pricing in Greater Vancouver",
        blocks: [
          { kind: "subheading", text: "Why will nobody give me a price over the phone?" },
          "Because the two things that set the figure — how the gutter is reached, and what is standing under the eaves — cannot be described accurately by someone on the ground looking up. A number given without seeing those is a number that changes on the day, which is worse than no number at all.",
          { kind: "subheading", text: "Does a bigger house always cost more?" },
          "Not reliably. A long single-storey run with clear ground under it can be quicker than a short second-storey run over a deck. Footprint sets a floor; access sets the price.",
          { kind: "subheading", text: "Do gutter guards make cleaning cheaper?" },
          "They tend to make it less frequent rather than less expensive per visit, because the guard is lifted and refitted around whatever is cleared. Ask whether a quote includes guard removal — that single line is the most common reason two quotes on the same house do not match.",
          { kind: "subheading", text: "Should downspouts be included?" },
          "They should be quoted explicitly, one way or the other. A gutter cleared into a blocked downspout has not been fixed, and the blockage is usually at the elbow rather than at the top where it can be seen from a ladder.",
          { kind: "subheading", text: "What should be in writing before work starts?" },
          "The runs included, whether guards are removed and refitted, whether downspouts are flushed and augered, what happens to the debris, and whether the job ends on a flow test. Anything absent from that list is the thing most likely to be argued about afterwards.",
        ],
      },
      {
        heading: "Where to read the rest",
        blocks: [
          {
            kind: "linked",
            parts: [
              "The full scope and method is on the ",
              { href: "/services/gutter-cleaning", text: "gutter cleaning page" },
              ". If the gutters are carrying moss, the ",
              { href: "/services/roof-cleaning", text: "roof is where it is coming from" },
              " and the two are usually one visit. We quote across ",
              { href: "/locations", text: "nine Greater Vancouver communities" },
              ".",
            ],
          },
        ],
      },
    ],
  },
  {
    slug: "soft-washing-or-pressure-washing",
    title: "Soft Washing Or Pressure Washing For A Roof",
    excerpt:
      "Two different machines doing two different jobs, and choosing wrong costs a roof years. The surface decides it, not the stain. Here is how the call is made.",
    category: "Exterior Cleaning",
    date: "2026-08-11",
    readMinutes: 4,
    photo: "softRoofs",
    body: [
      {
        heading: "What the two actually are",
        blocks: [
          "Pressure washing removes what is on a surface with force — water at high pressure through a tip that concentrates it. It is mechanical. The dirt comes off because it is knocked off.",
          "Soft washing removes what is on a surface with chemistry — a detergent solution applied at roughly garden-hose pressure, left to work, then rinsed. It is biological. The growth comes off because it has been killed and has let go.",
          "Everything else about the choice follows from that. One of them strips. The other one treats.",
        ],
      },
      {
        heading: "The surface decides, not the stain",
        blocks: [
          "The instinct is to pick the method by how bad the mess looks. That is backwards. The mess tells you what needs removing; the surface tells you what may be used to remove it.",
          {
            kind: "list",
            items: [
              "Asphalt shingle — soft wash only. The granule layer is the wearing surface, and pressure takes it off along with the moss.",
              "Cedar shakes and cedar siding — soft wash. Pressure raises the grain and drives water into it.",
              "Stucco and painted siding — soft wash. Pressure finds every hairline crack and puts water behind the finish.",
              "Concrete driveways, walkways and parkade decks — pressure. Nothing on the surface is damaged by it, and the soiling is mechanical rather than biological.",
              "Brick and concrete block — usually pressure, at a reduced setting, tested on an inconspicuous patch first.",
              "Composite and painted decking — soft wash or low pressure. The manufacturer's guidance for the board almost always caps the pressure, and it is worth reading before anyone starts.",
            ],
          },
        ],
      },
      {
        heading: "The roof is the one that is not a judgement call",
        blocks: [
          {
            kind: "linked",
            parts: [
              "On asphalt shingle there is no debate to have. The ",
              {
                href: "https://www.asphaltroofing.org/algae-moss-prevention-cleaning-asphalt-roofing-systems/",
                text: "Asphalt Roofing Manufacturers Association",
                external: true,
              },
              " — the trade body behind the major North American shingle makers — states that high-pressure washing is likely to damage asphalt roofing and should not be used on it, for removing algae or for any other purpose.",
            ],
          },
          "That is not a preference published by a cleaning company. It is the position of the people who make the product, and it is the document a manufacturer reaches for if a warranty claim ever turns on how the roof was cleaned.",
          {
            kind: "photo",
            photo: "roofMossy",
            caption:
              "Growth at this depth comes off in an afternoon under pressure, and takes the granule layer with it. Treated instead, it releases over the following weeks and the surface stays intact.",
          },
        ],
      },
      {
        heading: "Why the treated roof looks worse first",
        blocks: [
          "This is worth knowing before booking, because it is what generates the phone call a fortnight later.",
          "A pressure-washed roof looks finished the same day. A soft-washed roof does not — the growth is dead but still sitting there, and it releases over the following weeks as the weather works on it. The roof looks untidy for a month and then clears.",
          {
            kind: "quote",
            text: "One method is finished when the crew leaves. The other is finished when the next month of rain has done its half of the work.",
          },
        ],
      },
      {
        heading: "Questions About Roof And Siding Cleaning Methods",
        blocks: [
          { kind: "subheading", text: "Which one does my roof need?" },
          "If it is asphalt shingle, cedar, or tile with any age on it, soft washing. Pressure belongs on hard, non-porous ground surfaces and on very little else around a house. The surface is the deciding factor, not how heavy the growth looks.",
          { kind: "subheading", text: "Is soft washing just spraying bleach on my roof?" },
          "The active ingredient in most roof treatments is a dilute sodium hypochlorite solution, which is what the manufacturers' own guidance describes. The work is in the dilution, the dwell time and the rinse — and in protecting what sits underneath, because planting, gutters and downspouts all need handling before anything is applied.",
          { kind: "subheading", text: "Will pressure washing void my roof warranty?" },
          "It can, and manufacturers are explicit about it. If a roof is inside its warranty period, the maintenance section of that warranty is worth reading before choosing a method — and worth asking any contractor to confirm in writing which method they intend to use.",
          { kind: "subheading", text: "Can pressure washing be used anywhere on a house?" },
          "On hard ground surfaces, yes — driveways, walkways, parkade decks, some brick. The rule of thumb is that if a surface has a coating, a grain or a granule layer that is doing a job, pressure will remove that too.",
          { kind: "subheading", text: "How long does each one last?" },
          "A treated surface stays clear substantially longer than a stripped one, because treatment kills the root structure while stripping leaves it behind to regrow from. Shaded and north-facing elevations come back first either way — that is orientation, not method.",
        ],
      },
      {
        heading: "Where to read the rest",
        blocks: [
          {
            kind: "linked",
            parts: [
              "The low-pressure method is set out on the ",
              { href: "/services/soft-washing", text: "soft washing page" },
              ", the machine work on the ",
              { href: "/services/power-washing", text: "power washing page" },
              ", and how the two apply to a roof on the ",
              { href: "/services/roof-cleaning", text: "roof cleaning page" },
              ".",
            ],
          },
        ],
      },
    ],
  },
  {
    slug: "who-clears-the-sidewalk",
    title: "Who Clears The Sidewalk, And By When",
    excerpt:
      "In Vancouver the public sidewalk outside your building is your responsibility and the deadline is 10am. Most owners have that rule the wrong way round.",
    category: "Seasonal",
    date: "2026-02-17",
    readMinutes: 4,
    photo: "snowSalting",
    body: [
      {
        heading: "The rule most people have backwards",
        blocks: [
          "The common assumption is that the city clears the public sidewalk and the owner clears their own driveway. In Vancouver it is closer to the opposite.",
          {
            kind: "linked",
            parts: [
              "The ",
              {
                href: "https://vancouver.ca/streets-transportation/snow-removal-from-city-streets.aspx",
                text: "City of Vancouver's winter maintenance rules",
                external: true,
              },
              " make the property owner and the occupant responsible for clearing snow and ice from the full width of the sidewalk in front of their property — and alongside it as well, on a corner lot — by 10am each day.",
            ],
          },
          "Meanwhile there is no bylaw requirement to clear snow from your own private property at all. The part you are legally obliged to clear is the part you do not own.",
        ],
      },
      {
        heading: "What full width means",
        blocks: [
          "It means what it says: property line to curb, not a shovel-width path down the middle. A cleared track through the snow is the most common good-faith attempt and it is not compliance.",
          "It also means the sidewalk is cleared every day there is snow on it, rather than once after the storm. Snow that melts in the afternoon and refreezes overnight is the condition that puts people in hospital, and it is the condition a daily deadline exists for.",
        ],
      },
      {
        heading: "The number that gets attention",
        blocks: [
          "Vancouver attaches a fine to missing the deadline, and a substantially larger one where snow and ice is left beyond twenty-four hours. The city publishes the current figures and they have moved upward over the years, so they are worth checking against the winter you are reading this in rather than trusting a number in an article.",
          "The larger exposure is not the fine. A fall on an uncleared sidewalk in front of a commercial building or a strata is a liability question, and the answer to it starts with whether the owner met the standard the bylaw sets.",
          {
            kind: "quote",
            text: "The fine is the cheap outcome. The expensive one arrives months later on a lawyer's letterhead.",
          },
        ],
      },
      {
        heading: "This is a municipal rule, not a regional one",
        blocks: [
          "Every municipality in Greater Vancouver writes its own version and the deadlines are not the same. Vancouver's is 10am. Others sit later in the morning, and some define the obligation differently for commercial and residential frontages.",
          "If a property sits on a boundary — and a surprising number of strata sites do — the rule that applies is the one for the municipality the frontage is in, not the one the strata office is in. Worth confirming once, in writing, rather than every December.",
        ],
      },
      {
        heading: "What this means for a strata or a commercial site",
        blocks: [
          "Three things, in practice:",
          {
            kind: "steps",
            items: [
              "Establish which municipality's rule applies and what its deadline actually is. A five-minute job done once, and it decides everything below it.",
              "Decide before the season who is clearing and at what trigger. An arrangement agreed in November is an arrangement. One agreed at six in the morning during a snowfall is not.",
              "Keep a record of what was done and when. If a fall claim ever arrives, the log is the difference between demonstrating a standard and asserting one.",
            ],
          },
          "The third is the one most often skipped, and the only one that matters after the fact.",
        ],
      },
      {
        heading: "Questions About Snow Clearing Obligations in BC",
        blocks: [
          { kind: "subheading", text: "Am I really responsible for the public sidewalk?" },
          "In Vancouver, yes — the bylaw places it on the property owner and the occupant, for the full width, by 10am daily. Most Greater Vancouver municipalities have an equivalent rule with a different deadline. Read the city's own page rather than a summary of it, including this one.",
          { kind: "subheading", text: "Does this apply to renters as well as owners?" },
          "In Vancouver the obligation names both the owner and the occupier, so a tenant in a commercial unit or a house can carry it. Where a lease is silent on it, both parties are exposed — which is an argument for making it explicit in the lease rather than discovering it in February.",
          { kind: "subheading", text: "What if I clear a path down the middle?" },
          "That is not compliance. The requirement is the full width, property line to curb. A cleared track is the most common form of good-faith non-compliance and it is still non-compliance.",
          { kind: "subheading", text: "Who is liable if someone falls?" },
          "That is decided on the facts, and whether the bylaw standard was met forms a substantial part of it. This article is general information rather than legal advice — for a specific site, and particularly a commercial one, that conversation belongs with your insurer and your lawyer before the season rather than after an incident.",
          { kind: "subheading", text: "Does salting count as clearing?" },
          "Salting is part of the job and not the whole of it. Snow has to be removed; salt manages what is left behind and what refreezes. Salt spread onto an uncleared sidewalk melts a layer and produces exactly the refreeze the daily deadline exists to prevent.",
        ],
      },
      {
        heading: "Where to read the rest",
        blocks: [
          {
            kind: "linked",
            parts: [
              "How clearing and salting is scoped, triggered and logged is on the ",
              { href: "/services/snow-removal-salting", text: "snow removal and salting page" },
              ". Commercial entrances and strata common areas sit under ",
              { href: "/services/commercial-cleaning", text: "commercial cleaning" },
              ".",
            ],
          },
        ],
      },
    ],
  },
  {
    slug: "what-a-strata-budgets-outside",
    title: "What A Strata Should Budget For Outside",
    excerpt:
      "Depreciation reports cover the roof and the envelope. The recurring exterior work that keeps both alive usually sits in a line nobody has costed properly.",
    category: "Strata & Commercial",
    date: "2026-04-14",
    readMinutes: 5,
    photo: "commercialSchedule",
    body: [
      {
        heading: "The report that changed the conversation",
        blocks: [
          {
            kind: "linked",
            parts: [
              "Strata corporations in British Columbia with five or more lots are required to obtain a depreciation report on a five-year cycle, projecting the repair, maintenance and renewal of common property across a thirty-year horizon. The ",
              {
                href: "https://www2.gov.bc.ca/gov/content/housing-tenancy/strata-housing/operating-a-strata/repairs-and-maintenance/depreciation-reports",
                text: "Province publishes the requirements and the guidance",
                external: true,
              },
              ", and the option to defer by annual three-quarter vote is no longer available.",
            ],
          },
          "That has pushed a lot of councils into looking properly at the exterior for the first time. The report tells you the roof has a remaining life and what replacing it will cost. What it is generally not written to tell you is how much of that remaining life depends on work nobody has scheduled.",
        ],
      },
      {
        heading: "Two different kinds of spending",
        blocks: [
          "It helps to separate them, because they behave differently and they are funded differently.",
          {
            kind: "list",
            items: [
              "Renewal — the roof, the membrane, the paint cycle, the asphalt. Large, infrequent, forecastable, and the thing the depreciation report exists to model.",
              "Recurring maintenance — gutters, roof moss, drains, common-area glass, hard surfaces, seasonal clearing. Small individually, annual or better, and the thing that decides whether the renewal line arrives on schedule or early.",
            ],
          },
          "A council that funds the first and skips the second is not saving money. It is moving a large number forward in time, and the depreciation report will duly capture that movement at the next five-year cycle.",
          {
            kind: "quote",
            text: "Deferred maintenance does not disappear from a budget. It changes column, and it grows on the way across.",
          },
        ],
      },
      {
        heading: "What belongs in the recurring line",
        blocks: [
          "Not an exhaustive list, and the mix changes with the building. But most sites in this region have some version of all of it:",
          {
            kind: "list",
            items: [
              "Gutters and downspouts, cleared and flow-tested. On a treed site this is twice a year rather than once, and the second visit is the one that gets cut first and matters most.",
              "Roof moss, treated rather than stripped. This is the single line with the clearest link to the renewal date of the largest asset on the site.",
              "Perimeter and site drains, checked before the wet season rather than during it.",
              "Common-area glass — lobby, corridor, amenity room. Frequency is a presentation decision more than a building one, which is why it belongs in a schedule rather than in a phone call.",
              "Hard surfaces: walkways, entrance aprons, visitor parking and the parkade deck. Moss on a walkway is a slip claim waiting for the right morning.",
              "Winter clearing and salting, with the trigger and the responsibility agreed before the season.",
            ],
          },
        ],
      },
      {
        heading: "What usually gets missed",
        blocks: [
          "Three things, consistently.",
          "The first is the second gutter clean. A treed site fills again between late October and December, and a single autumn visit booked for early October is a site with full gutters through the wettest eight weeks of the year.",
          "The second is anything that requires access equipment. Work that needs a lift or rope access gets deferred not because it is unimportant but because it needs a decision at council rather than a phone call from the manager — so it waits for a meeting, and then for the next one.",
          "The third is the record. A strata that has the work done and does not keep a log of what was done and when is a strata that cannot demonstrate a maintenance standard when it needs to — to an insurer, to a purchaser's lawyer, or in a dispute with an owner.",
        ],
      },
      {
        heading: "How to make it comparable between contractors",
        blocks: [
          "Most exterior quotes to stratas are not comparable, because they are not scoped the same way. Four things make them comparable:",
          {
            kind: "steps",
            items: [
              "State the frequency, not just the work. Twice-yearly gutters and annual gutters are different products at different prices, and a quote that omits frequency is quoting one visit.",
              "State what is included at the boundary. Downspouts, guard removal, debris disposal, and whether the drains at the bottom are anyone's job.",
              "State the access method. Ladder, pole, lift or rope changes the price more than the surface area does, and a quote silent on it has assumed the cheapest one.",
              "Require a written record per visit. Date, areas covered, anything found. This costs a contractor nothing and is the only part of the whole arrangement that has value years later.",
            ],
          },
        ],
      },
      {
        heading: "Questions About Strata Exterior Budgeting in BC",
        blocks: [
          { kind: "subheading", text: "Does the depreciation report cover exterior cleaning?" },
          "It is written around common property renewal — roofs, envelope, paving, membranes — rather than around recurring cleaning. The two are connected, though: the assumed remaining life of a roof or a hard surface generally presumes it is being maintained, and a council reading the report is entitled to ask what that assumption depends on.",
          { kind: "subheading", text: "How often should strata gutters be cleared?" },
          "It is set by tree cover rather than by the calendar. A site with mature conifers overhanging the roofline usually needs two visits, weighted so the second falls after the bulk of the drop rather than in the middle of it. An open site with no overhang can often hold at one.",
          { kind: "subheading", text: "Who decides — the council, the manager, or the contractor?" },
          "The council owns the decision and the budget. The value a contractor adds is telling you what the building in front of them actually needs, including where the answer is less than you were expecting. A scope that never shrinks is a sales document.",
          { kind: "subheading", text: "Is a multi-year agreement worth it?" },
          "The practical argument for one is scheduling rather than price: work that is booked in advance happens in the right week, and exterior work in this region has narrow right weeks. Terms vary and should be settled in the agreement itself rather than assumed from an article.",
          { kind: "subheading", text: "What should we keep on file?" },
          "The scope, the frequency, the access method, and a dated record of each visit with anything found noted on it. That file is the evidence of a maintenance standard, and it is worth more at the point of an insurance question or a sale than it costs to keep.",
        ],
      },
      {
        heading: "Where to read the rest",
        blocks: [
          {
            kind: "linked",
            parts: [
              "Common areas, back-of-house and scheduled cycles are on the ",
              { href: "/services/commercial-cleaning", text: "commercial cleaning page" },
              ". The two lines with the clearest link to renewal dates are ",
              { href: "/services/gutter-cleaning", text: "gutter cleaning" },
              " and ",
              { href: "/services/roof-cleaning", text: "roof moss treatment" },
              ".",
            ],
          },
        ],
      },
    ],
  },
  {
    slug: "how-often-gutters-need-doing",
    title: "How Often Gutters Actually Need Doing Here",
    excerpt:
      "Twice a year is the standard answer and it is right about half the time. What decides it is what is growing over the roof, not what the calendar says.",
    category: "Seasonal",
    date: "2026-09-02",
    readMinutes: 4,
    // Was `gutterDebris`, a slot still waiting for its job photograph — it
    // rendered as a flat panel, and once the homepage began showing the three
    // newest posts (2026-09-23) that panel sat in the middle of it. Rain
    // running a gutter is also the truer frame for an article about how often
    // the work comes round.
    photo: "gutterFlowTest",
    body: [
      {
        heading: "The standard answer, and where it fails",
        blocks: [
          "Twice a year — spring and autumn — is the answer most people have heard, and for a lot of properties it is correct. It fails in two directions, and both are common here.",
          "It over-serves an open site. A townhouse with no overhanging trees and a low-pitched roof may genuinely need one visit a year, and paying for two is paying for a schedule rather than for a building.",
          "It under-serves a treed one. A house under mature conifers can fill a gutter completely between two visits booked six months apart, and the fill will happen at the worst possible point in the year.",
        ],
      },
      {
        heading: "What actually decides it",
        blocks: [
          {
            kind: "list",
            items: [
              "Species overhead. Deciduous trees drop heavily and briefly, in a window you can plan around. Conifers shed all year and the needles pack into a mat that holds water rather than letting it through.",
              "Distance and height of the canopy relative to the roofline. A tall tree twenty feet away puts more into a gutter than a short one against the wall.",
              "Roof pitch. A steep roof throws debris off into the gutter. A shallow one lets it sit on the surface, which is a different problem and a slower one.",
              "Whether there are guards, and whether they are working. A guard that is doing its job changes the interval substantially. A guard with a moss mat growing on it has become the blockage.",
              "What the gutter is protecting. A gutter above a finished basement stairwell or a below-grade entry is not a maintenance item, it is a water-ingress control.",
            ],
          },
        ],
      },
      {
        heading: "The timing matters more than the count",
        blocks: [
          {
            kind: "linked",
            parts: [
              "About three quarters of this region's annual precipitation falls between October and March — the ",
              {
                href: "https://climate.weather.gc.ca/climate_normals/",
                text: "Environment and Climate Change Canada climate normals",
                external: true,
              },
              " put the airport near 1,189 mm a year, concentrated hard into that half. November and December are the two heaviest months on the record.",
            ],
          },
          "Which makes the autumn visit the one that carries the year. Booked too early, it clears the first of the leaves and misses the rest; the gutter is full again before the rain peaks. Booked after the drop has finished, it holds through the season.",
          {
            kind: "quote",
            text: "An autumn gutter clean done in early October is a spring clean done six months early. It is the same work, at the wrong end of the drop.",
          },
        ],
      },
      {
        heading: "How to tell without going up there",
        blocks: [
          "Three checks from the ground, none of which need a ladder:",
          {
            kind: "steps",
            items: [
              "Watch a downspout during steady rain. Water should be running out of it. If a downspout is dry while the others are running, the gutter feeding it is blocked or the elbow is.",
              "Look at the line of the gutter from across the street. A run holding a full load of wet debris sags visibly between brackets.",
              "Look for growth on the outside edge. Anything green on the front lip of a gutter is growing in what is inside it, and it has been there long enough to root.",
            ],
          },
          "Staining down the fascia below a joint is the fourth sign, and by the time it shows the water has already been going somewhere it should not for a while.",
        ],
      },
      {
        heading: "Questions About Gutter Frequency in Greater Vancouver",
        blocks: [
          { kind: "subheading", text: "How often should I clean my gutters in Vancouver?" },
          "Twice a year is a reasonable default for a property with any overhanging tree cover, and once a year can be enough on an open site with no canopy over the roofline. Tree species overhead is the deciding factor, not the size of the house.",
          { kind: "subheading", text: "When is the best time for the autumn clean?" },
          "After the bulk of the drop has finished rather than at the start of it, so the gutter goes into the wettest months clear. Booked too early it clears the first fall of leaves and refills before the rain peaks, which spends the visit at the wrong end of the season.",
          { kind: "subheading", text: "Do I still need it done if I have gutter guards?" },
          "Yes, usually less often. Fine debris passes through most guard systems and moss will grow on the mesh itself, at which point the guard has become the blockage. Guards change the interval; they do not remove the job.",
          { kind: "subheading", text: "What happens if I skip a year?" },
          "The immediate risk is overflow at the joints, which puts water down the fascia and against the wall rather than into the downspout. The slower one is weight — a full gutter holding water is heavy, and brackets and fascia are the things that give.",
          { kind: "subheading", text: "Is it worth doing before or after the first storm?" },
          "Before. Everything on this list is ordinary maintenance in September and October and becomes an access problem once the roof is wet and the weather has closed in.",
        ],
      },
      {
        heading: "Where to read the rest",
        blocks: [
          {
            kind: "linked",
            parts: [
              "The scope and the flow test are on the ",
              { href: "/services/gutter-cleaning", text: "gutter cleaning page" },
              ". Moss coming off the roof into the gutters is dealt with on the ",
              { href: "/services/roof-cleaning", text: "roof cleaning page" },
              ".",
            ],
          },
        ],
      },
    ],
  },
  {
    slug: "what-makes-a-window-quote-different",
    title: "What Makes One Window Quote Different",
    excerpt:
      "Counting panes is the least useful way to price window cleaning. Access, what is included at the edges, and frequency are what separate any two quotes.",
    category: "Costs",
    date: "2026-07-28",
    readMinutes: 4,
    photo: "windowGlass",
    body: [
      {
        heading: "Pane count is not the number",
        blocks: [
          "Almost every window quote starts with a count, and the count is the least useful thing in it. Panes tell you how much glass there is. They tell you nothing about how long it takes to stand in front of each one, which is where the time goes.",
          "A ground-floor picture window and a stairwell window over a staircase are one pane each. They are not one job each.",
        ],
      },
      {
        heading: "What separates two quotes on the same house",
        blocks: [
          {
            kind: "list",
            items: [
              "Access. Reachable from the ground, from a ladder, from a pole system, or from inside over a stairwell — four different jobs, and the last one is the one that gets underestimated.",
              "Interior as well as exterior. Interiors mean furniture moved, floors protected and someone home. Some quotes assume both sides; some assume one.",
              "Tracks and sills. Cleaning the glass and cleaning the opening are different amounts of work, and the difference is not small on an older house.",
              "Screens. Removing, washing, drying and refitting screens is a real block of time and is the single most common thing to be quietly excluded.",
              "Frames. Painted, vinyl and aluminium frames all clean differently, and cedar frames are a soft-wash job rather than a glass job.",
              "Hard water and mineral staining. Glass with etched mineral deposits is a restoration task, not a cleaning one, and it should be quoted separately or it will be argued about later.",
            ],
          },
        ],
      },
      {
        heading: "The exclusions that cause the arguments",
        blocks: [
          "Two quotes that look ten per cent apart are usually thirty per cent apart on scope. The gap is nearly always in the same four places: screens, tracks, interiors, and what happens to glass that will not come clean.",
          "That last one deserves a sentence of its own. Glass with hard-water etching or construction overspray may not return to clear with ordinary cleaning, and a contractor who has looked at it should say so before the job rather than after it.",
          {
            kind: "quote",
            text: "The cheapest quote and the most expensive quote are usually the same work. One of them has told you where it stops.",
          },
        ],
      },
      {
        heading: "How often is a separate question",
        blocks: [
          "Frequency is driven by exposure rather than by preference. A west-facing elevation on an arterial road collects traffic film and needs doing more often than a sheltered garden elevation on the same building.",
          "For commercial frontage the driver is presentation and it is usually a fixed cycle. For a house it is generally twice a year, weighted to spring — after the winter has finished putting everything it has onto the glass.",
          "Salt is the regional variable worth naming. Properties near the water in Tsawwassen, Ladner and along the Fraser carry a salt film that returns faster than ordinary road dust, and the interval there is genuinely shorter.",
        ],
      },
      {
        heading: "Questions About Window Cleaning Quotes",
        blocks: [
          { kind: "subheading", text: "Why does one quote cost more than another for the same windows?" },
          "Nearly always scope rather than rate. Check four lines specifically: are interiors included, are screens removed and washed, are tracks and sills done, and what has been assumed about access. Two quotes matching on all four are comparable; otherwise they are not.",
          { kind: "subheading", text: "Are screens usually included?" },
          "Not by default, and this is the most common exclusion. Removing, washing, drying and refitting screens takes real time, so it should be a named line either way rather than an assumption on either side.",
          { kind: "subheading", text: "How often should house windows be cleaned?" },
          "Twice a year suits most properties, weighted towards spring so the winter's film comes off. Exposure moves it — an elevation facing a busy road or sitting near salt water will want doing more often than a sheltered one on the same house.",
          { kind: "subheading", text: "Can all glass be made clear again?" },
          "No. Hard-water etching, mineral scale and construction overspray can be permanent, and standard cleaning will not shift them. Anyone quoting should identify that before starting and price any restoration attempt separately from the cleaning.",
          { kind: "subheading", text: "Do high windows cost significantly more?" },
          "They can, because the access method changes rather than the glass. Pole work, ladder work and anything requiring a lift are different jobs, and a quote that has not stated its access method has assumed the cheapest one available.",
        ],
      },
      {
        heading: "Where to read the rest",
        blocks: [
          {
            kind: "linked",
            parts: [
              "Glass, frames, sills, tracks and screens are all set out on the ",
              { href: "/services/window-cleaning", text: "window cleaning page" },
              ". Cedar frames and painted trim are handled as ",
              { href: "/services/soft-washing", text: "soft washing" },
              " rather than as glass work.",
            ],
          },
        ],
      },
    ],
  },
  {
    slug: "twenty-eight-days-before-sealing",
    title: "The Twenty-Eight Days Before A Slab Is Sealed",
    excerpt:
      "New concrete cannot be sealed straight away, and salt on an uncured slab is the most expensive winter mistake available. The timing is not negotiable.",
    category: "Hard Surfaces",
    date: "2026-07-07",
    readMinutes: 4,
    photo: "sealingPrep",
    body: [
      {
        heading: "Why the slab waits",
        blocks: [
          "Fresh concrete is still curing long after it is hard enough to drive on. The usual figure in manufacturer guidance is twenty-eight days before a slab should meet a penetrating sealer or a de-icing salt, and full strength development runs longer than that again.",
          "Seal it early and the sealer sits on a surface that is still releasing moisture, which is how you get a cloudy finish, poor adhesion, or a film that lifts within a season. Salt it early and the damage is structural rather than cosmetic.",
        ],
      },
      {
        heading: "What salt actually does to it",
        blocks: [
          "De-icing salt does not dissolve concrete. It does something less obvious and worse: it lowers the freezing point of water at the surface, which multiplies the number of freeze-thaw cycles the slab goes through in a winter.",
          "Each cycle expands trapped water inside the surface layer. Repeat it enough times and the top few millimetres let go — scaling, pop-outs, then a pitted surface that holds more water and freezes faster. On a young slab that has not reached full strength, the process starts earlier and moves faster.",
          {
            kind: "quote",
            text: "Salt does not eat concrete. It just arranges for the winter to do it far more times than it otherwise would.",
          },
        ],
      },
      {
        heading: "The window here is narrower than the calendar suggests",
        blocks: [
          "Sealing needs the slab dry, the air warm enough, and no rain during cure. In this region that rules out most of the year rather than a little of it.",
          {
            kind: "linked",
            parts: [
              "With roughly three quarters of the annual precipitation falling between October and March according to the ",
              {
                href: "https://climate.weather.gc.ca/climate_normals/",
                text: "Environment and Climate Change Canada normals",
                external: true,
              },
              ", the practical sealing season runs from late spring to early autumn — and inside it, what is actually needed is a run of consecutive dry days rather than one.",
            ],
          },
          "That is why sealing gets booked against a forecast rather than against a date, and why a contractor who moves the date is usually doing the right thing.",
        ],
      },
      {
        heading: "What happens before the sealer",
        blocks: [
          "Sealing a dirty slab locks the dirt in. The preparation is most of the job and it runs in a fixed order:",
          {
            kind: "steps",
            items: [
              "Clean the surface properly, including the oil. Oil and tyre marks are not dirt and do not come off with water alone; they are degreased separately or the sealer will not bond over them.",
              "Deal with the cracks. Routed and filled before sealing, because a sealer bridges nothing — a crack under a fresh coat is a crack with a coat over it.",
              "Let it dry. A washed slab holds water for longer than it looks, and this is where a rushed job goes wrong.",
              "Confirm the slab is actually dry rather than dry-looking, then seal in two light coats rather than one heavy one, with the second worked across the first.",
            ],
          },
          "The order is not stylistic. Every step is there because the one after it fails without it.",
        ],
      },
      {
        heading: "Questions About Concrete And Asphalt Sealing in BC",
        blocks: [
          { kind: "subheading", text: "How long after pouring can concrete be sealed?" },
          "Manufacturer guidance commonly sets twenty-eight days as the minimum before a penetrating sealer or de-icing salt should touch a new slab, and the product data sheet for whatever is being applied governs. If a contractor offers to seal a slab poured a fortnight ago, that is the wrong answer.",
          { kind: "subheading", text: "Does sealing actually prevent salt damage?" },
          "It substantially reduces it rather than eliminating it, by limiting how much water and dissolved salt gets into the surface in the first place. It is not a substitute for keeping salt use proportionate, particularly on younger concrete.",
          { kind: "subheading", text: "When is the best time of year to seal in Greater Vancouver?" },
          "Late spring through early autumn, and inside that window the deciding factor is a run of dry days rather than the month. Sealing needs the slab dry going on and dry while it cures, which is a scarcer condition here than the calendar implies.",
          { kind: "subheading", text: "How often does a driveway need resealing?" },
          "It depends on the product used, the traffic it carries and how much sun the surface takes. The honest way to answer it is to look at how the last coat is wearing rather than to count years — a surface that has started to darken and absorb water at the edges is telling you where it is.",
          { kind: "subheading", text: "Can a slab be sealed over moss or oil?" },
          "No. Both have to come off first — moss because the sealer will not bond to it, oil because it will not bond over it and the stain is then permanent under a coat. Preparation is most of the job, and skipping it is visible within a year.",
        ],
      },
      {
        heading: "Where to read the rest",
        blocks: [
          {
            kind: "linked",
            parts: [
              "Crack routing, degreasing, moisture metering and the two-coat application are set out on the ",
              { href: "/services/concrete-and-asphalt-sealing", text: "concrete and asphalt sealing page" },
              ". The cleaning that comes first is ",
              { href: "/services/power-washing", text: "power washing" },
              ", and winter salting is on the ",
              { href: "/services/snow-removal-salting", text: "snow removal page" },
              ".",
            ],
          },
        ],
      },
    ],
  },
  {
    slug: "what-should-be-in-writing",
    title: "Reading A Quote: What Belongs In Writing",
    excerpt:
      "Most exterior quotes are not comparable because they are not scoped alike. Seven lines decide whether two numbers mean the same thing. Here they all are.",
    category: "Costs",
    date: "2026-06-16",
    readMinutes: 5,
    photo: "truck",
    body: [
      {
        heading: "Why three quotes rarely compare",
        blocks: [
          "The standard advice is to get three quotes, and it is good advice that mostly does not work. Three numbers arrive, they are spread across a wide range, and there is no way to tell whether the cheapest one is efficient or is simply doing less.",
          "That is not usually anybody being dishonest. Exterior work has no standard scope, so each contractor quotes what they assume the job is — and those assumptions are invisible in the total.",
        ],
      },
      {
        heading: "The seven lines that make quotes comparable",
        blocks: [
          "Ask for these explicitly and the spread between three quotes usually collapses to something rational:",
          {
            kind: "list",
            items: [
              "The areas included, named. Not the property — the elevations, the runs, the surfaces. A quote for a house is a quote for whichever parts of it the writer had in mind.",
              "The method, and for a roof, the pressure. This is the difference between a surface that is treated and a surface that is stripped, and it does not show up in a total.",
              "The access assumed. Ladder, pole, lift or rope. Access moves a price more than area does, and an unstated one is the cheapest one.",
              "What happens at the boundaries. Downspouts, guard removal, screens, tracks, the drain at the bottom of the run — the parts that sit between two obvious jobs are the parts that fall out of both.",
              "Debris. Bagged and removed, or left on site. This is a small line that generates a disproportionate number of complaints.",
              "The finish condition. What does done look like — is there a flow test, a walk-round, a rinse-down of what was worked over?",
              "Frequency, where the work recurs. One visit and a twice-yearly cycle are different products, and a quote silent on frequency has priced one visit.",
            ],
          },
        ],
      },
      {
        heading: "The two questions worth asking out loud",
        blocks: [
          "First: what is not included that I might reasonably expect to be? A contractor who answers that one straightforwardly is telling you where their scope stops, which is the single most useful thing you can learn before signing anything.",
          "Second: what would change this price on the day? The honest answers are specific — a blocked downspout that has to be augered, a guard system nobody mentioned, a surface that turns out to be sealed rather than bare. A quote that cannot change is either padded or about to become a conversation.",
          {
            kind: "quote",
            text: "The useful question is not what does it cost. It is what stops being your problem when I pay this.",
          },
        ],
      },
      {
        heading: "What a scope protects on both sides",
        blocks: [
          "A written scope is usually presented as a protection for the customer, and it is. It is also the reason the crew on site knows what they are doing without phoning anyone, and the reason the invoice matches the quote.",
          "For a strata or a commercial site it does a third thing, and this is the one that gets underrated: it produces a record. A dated scope with a record of each visit against it is evidence of a maintenance standard — which matters to an insurer, to a purchaser's lawyer, and in any dispute about whether a building was being looked after.",
        ],
      },
      {
        heading: "Warning signs in a quote",
        blocks: [
          {
            kind: "list",
            items: [
              "A single line and a total, with no scope under it.",
              "A price given over the phone for work nobody has looked at, on a property with any height or access complexity.",
              "No mention of method on roof or siding work, where method is the whole question.",
              "Pressure offered on asphalt shingle, cedar or stucco — that is a red flag about the work rather than about the price.",
              "Payment in full up front for work not yet started.",
              "No written confirmation of licensing and insurance, on any job involving height.",
            ],
          },
        ],
      },
      {
        heading: "Questions About Comparing Exterior Quotes",
        blocks: [
          { kind: "subheading", text: "How do I compare exterior cleaning quotes properly?" },
          "Normalise the scope before you compare the numbers. Ask each contractor for the areas included, the method, the access assumed, what happens to debris, and what done looks like. Quotes that match on those five are comparable; quotes that do not are not, whatever the totals say.",
          { kind: "subheading", text: "Is the cheapest quote usually doing less?" },
          "Frequently, and not always dishonestly — it may simply be a narrower assumption about the job. The way to find out is to ask what is excluded rather than to assume the difference is efficiency or greed.",
          { kind: "subheading", text: "Should I pay a deposit?" },
          "Deposits are normal on larger or materials-heavy work and terms vary by contractor, so the arrangement belongs in the written agreement. What is not normal is full payment up front for work that has not started.",
          { kind: "subheading", text: "What should I check about insurance?" },
          "That the contractor is licensed and carries liability insurance, and for anything at height, that their workers are covered. Ask for it in writing before work begins rather than after an incident, when it is too late for the answer to help.",
          { kind: "subheading", text: "Does a written scope really matter for a small job?" },
          "It matters most where the work is recurring or where anyone other than you will need to know what was agreed — a strata council, a property manager, a future owner. On a one-off residential job it mostly protects against a disagreement about what done meant.",
        ],
      },
      {
        heading: "Where to read the rest",
        blocks: [
          {
            kind: "linked",
            parts: [
              "Every service page here sets out its own scope and method — the ",
              { href: "/services", text: "full catalogue is here" },
              " — and quotes are given in writing after looking at the property. If it is easier to talk it through, the ",
              { href: "/contact", text: "contact page" },
              " has the phone number on it.",
            ],
          },
        ],
      },
    ],
  },
  {
    slug: "three-metres",
    title: "Three Metres, And Why We Bring A Ladder",
    excerpt:
      "British Columbia sets fall protection at three metres, and a second-storey gutter sits above it. The rule explains most of what a quote is actually buying.",
    category: "Exterior Cleaning",
    date: "2026-06-02",
    readMinutes: 4,
    photo: "gutterFascia",
    body: [
      {
        heading: "The number everything else follows from",
        blocks: [
          {
            kind: "linked",
            parts: [
              "British Columbia's Occupational Health and Safety Regulation requires fall protection where a worker could fall three metres — about ten feet — or more, and also where a fall from less than that could cause serious injury. ",
              {
                href: "https://www.worksafebc.com/en/health-safety/tools-machinery-equipment/fall-protection",
                text: "WorkSafeBC sets out the requirement and the systems that satisfy it",
                external: true,
              },
              ".",
            ],
          },
          "A second-storey gutter on an ordinary house sits above that line. So does most roof work, and so does a good deal of what looks from the driveway like straightforward ladder work.",
        ],
      },
      {
        heading: "The ladder exception, and its conditions",
        blocks: [
          "There is a limited exception for working from a portable ladder, and it is narrower than most people assume. Broadly, the work has to be light duty and short in duration at each position, the worker's centre of gravity has to stay between the side rails, one hand has to remain available for the ladder, and the ladder must not be positioned where a fall would carry further than the ladder height.",
          "Read that list against what gutter clearing actually involves — reaching sideways along a run, two hands in the trough, moving along without repositioning — and most of the exception has been used up before the work starts.",
          {
            kind: "quote",
            text: "The exception is for changing a bulb. It was never written for spending an afternoon leaning into a gutter.",
          },
        ],
      },
      {
        heading: "What this means if you are doing it yourself",
        blocks: [
          "The regulation governs workers rather than homeowners on their own property, so nothing here makes a Saturday on a ladder unlawful. What it does is tell you what the people whose job is to assess this risk concluded about it.",
          "Falls from height are among the most serious injury categories in residential work, and the ladder is over-represented in it relative to how dangerous it feels. The characteristic incident is not a dramatic one — it is a side-reach on a stable ladder that becomes an off-centre load.",
          "If the decision is to do it anyway: work from the ground where possible, move the ladder rather than reaching, keep a hand free, and do not do it on wet ground or against a gutter you intend to lean on. A gutter is not a handhold and it is not fixed to the building to be one.",
        ],
      },
      {
        heading: "What it means in a quote",
        blocks: [
          "This is why access is the line that moves an exterior price more than area does. Above three metres the work needs a system — anchored fall arrest, an elevated platform, or a method that keeps the worker off the height altogether, such as pole work from the ground.",
          "It is also why a quote should say which of those it assumed. A number priced for ladder work on a building that turns out to need a lift is not a competitive quote; it is a quote that has not been finished.",
          "And it is worth asking a contractor to confirm their workers are covered. On any job involving height, that answer belongs in writing before the work rather than after an incident.",
        ],
      },
      {
        heading: "Questions About Height, Ladders And Exterior Work",
        blocks: [
          { kind: "subheading", text: "What height does fall protection become mandatory in BC?" },
          "Three metres, or roughly ten feet, for workers under the provincial OHS Regulation — and lower than that where a fall could still cause serious injury. WorkSafeBC publishes the requirement and the acceptable systems.",
          { kind: "subheading", text: "Can a contractor just use a ladder?" },
          "Only within a narrow exception: light work, short duration at each position, centre of gravity between the rails, a hand free for the ladder, and no increased fall distance. Sustained gutter or roof work generally falls outside it.",
          { kind: "subheading", text: "Is it illegal for me to clean my own gutters?" },
          "No. The regulation covers workers rather than homeowners on their own property. It is still the most useful available assessment of the risk, made by people whose job is to assess exactly this.",
          { kind: "subheading", text: "Why is second-storey work more expensive?" },
          "Because above three metres the method changes, not just the height. Fall protection, elevated platforms or pole systems are different ways of working with different equipment, and that difference is most of the price gap between a bungalow and a three-storey.",
          { kind: "subheading", text: "What should I ask a contractor about safety?" },
          "That they are licensed and insured, that their workers are covered, and what access method they have assumed for your property specifically. All three should be answerable in writing before anyone arrives.",
        ],
      },
      {
        heading: "Where to read the rest",
        blocks: [
          {
            kind: "linked",
            parts: [
              "Most of what this affects is ",
              { href: "/services/gutter-cleaning", text: "gutter cleaning" },
              " and ",
              { href: "/services/roof-cleaning", text: "roof work" },
              ", where the height is unavoidable, and ",
              { href: "/services/window-cleaning", text: "window cleaning" },
              " on anything above one storey.",
            ],
          },
        ],
      },
    ],
  },
  {
    slug: "the-exterior-year",
    title: "The Exterior Year, Month By Month",
    excerpt:
      "Exterior work here has narrow right weeks and most of them are missed by a month. A calendar for a Greater Vancouver property, built around the rainfall.",
    category: "Seasonal",
    date: "2026-09-08",
    readMinutes: 4,
    photo: "rooftops",
    body: [
      {
        heading: "Why a calendar and not a checklist",
        blocks: [
          {
            kind: "linked",
            parts: [
              "Everything outside a building here is scheduled around one fact: roughly three quarters of the year's precipitation arrives between October and March. The ",
              {
                href: "https://climate.weather.gc.ca/climate_normals/",
                text: "Environment and Climate Change Canada climate normals",
                external: true,
              },
              " put Vancouver International Airport near 1,189 mm a year, with November and December the two heaviest months on the record and July by far the driest.",
            ],
          },
          "That is not a mild seasonal skew. It means the work that has to happen dry has a genuinely short window, and the work that protects against water has a hard deadline. A checklist ignores both. A calendar is the same list with the timing that makes it work.",
        ],
      },
      {
        heading: "Spring — March to May",
        blocks: [
          "The catch-up months. Everything the winter did is visible and the weather is workable again.",
          {
            kind: "list",
            items: [
              "Roof moss treatment, after the growth flush. Treated now it has the dry season to release.",
              "Gutters, clearing whatever the winter storms put in after the autumn visit.",
              "Windows, weighted here rather than to autumn — this is the visit that takes off the winter's film and salt.",
              "Hard surfaces: walkways, patios and driveways washed of the moss and traffic film that built up through the wet months.",
              "A walk of the perimeter drains before anyone forgets about them for six months.",
            ],
          },
        ],
      },
      {
        heading: "Summer — June to August",
        blocks: [
          "The only reliable dry window, and therefore the only sensible slot for anything that has to cure.",
          {
            kind: "list",
            items: [
              "Concrete and asphalt sealing. This needs consecutive dry days on both sides of the application and there is no other season that reliably supplies them.",
              "Exterior painting, for the same reason and with the same constraint.",
              "Soft washing of siding, stucco and cedar, where the surface needs to dry properly afterwards.",
              "Anything needing an elevated platform, while the ground is firm and the weather is predictable.",
            ],
          },
          {
            kind: "quote",
            text: "Everything that has to cure competes for the same eight weeks. The work does not get harder in September — it gets impossible to schedule.",
          },
        ],
      },
      {
        heading: "Autumn — September to November",
        blocks: [
          "The most important stretch of the year, and the one most often mistimed.",
          {
            kind: "steps",
            items: [
              "Early September: book the autumn gutter clean now, for later. The booking happens in September; the visit should not.",
              "Late September into early October: the last practical window for anything that needs dry weather. Sealing, painting and exterior repairs close here.",
              "Late October into November: the gutter clean itself, after the bulk of the drop rather than at the start of it. This is the single most valuable visit of the year.",
              "November: agree the winter arrangement — who clears, at what trigger, and by when. Before it snows, not during.",
            ],
          },
          "The second item and the third are the ones that get collapsed into one visit in early October, which is how a property ends up with clear gutters in the middle of the leaf drop and full ones through the rain.",
        ],
      },
      {
        heading: "Winter — December to February",
        blocks: [
          "Reactive rather than scheduled, with two exceptions.",
          {
            kind: "list",
            items: [
              "Snow clearing and salting to whatever trigger was agreed in November, on the municipal deadline that applies to the frontage.",
              "Holiday lighting, installed before the weather closes in and serviced through the season rather than left to fail.",
              "A check of the downspouts and drains during the first real storm — this is the one time of year the system can be observed under load, and a dry downspout in heavy rain tells you exactly where the blockage is.",
            ],
          },
          "The third one costs nothing and is the best diagnostic available all year. It only works while it is raining, which is why it never gets scheduled.",
        ],
      },
      {
        heading: "Questions About Seasonal Exterior Maintenance in BC",
        blocks: [
          { kind: "subheading", text: "What is the single most important job on this list?" },
          "The late-autumn gutter clean, timed after the bulk of the leaf drop. It is the one visit that determines whether water goes down the downspout or down the wall through the wettest eight weeks of the year.",
          { kind: "subheading", text: "When should exterior painting and sealing be booked?" },
          "Between late spring and early autumn, and inside that on a run of dry days rather than on a date. Both need dry going on and dry while curing, which this region supplies reliably only in summer.",
          { kind: "subheading", text: "Is winter a dead season for exterior work?" },
          "For anything requiring cure or dry surfaces, largely yes. Snow clearing, salting, lighting service and storm-driven drainage problems are what actually happens between December and February.",
          { kind: "subheading", text: "When is the best time to treat roof moss?" },
          "Spring after the growth flush, or early autumn before the sustained rain. Both give the treatment dry working days, and both leave the roof clear going into the season that follows.",
          { kind: "subheading", text: "How far ahead should this be booked?" },
          "The autumn work is worth arranging in late summer, because the useful weeks in October and November are narrow and everyone wants the same ones. Booking early does not move the visit earlier — it makes sure the visit lands in the right week.",
        ],
      },
      {
        heading: "Where to read the rest",
        blocks: [
          {
            kind: "linked",
            parts: [
              "Everything above has its own page: ",
              { href: "/services/gutter-cleaning", text: "gutters" },
              ", ",
              { href: "/services/roof-cleaning", text: "roof moss" },
              ", ",
              { href: "/services/window-cleaning", text: "windows" },
              ", ",
              { href: "/services/concrete-and-asphalt-sealing", text: "sealing" },
              ", ",
              { href: "/services/painting", text: "painting" },
              ", ",
              { href: "/services/snow-removal-salting", text: "snow and salting" },
              " and ",
              { href: "/services/holiday-light-installation", text: "holiday lighting" },
              ". We work across ",
              { href: "/locations", text: "nine Greater Vancouver communities" },
              ".",
            ],
          },
        ],
      },
    ],
  },
];

/**
 * /blog. The copy for the index; the posts themselves are `blogPosts` above.
 *
 * The page is asked one thing — is there anything here worth my time — so it
 * answers in two registers: a short featured strip for a first visit, and the
 * full archive under it for somebody who came back. There is no category
 * filter and no search box. Six posts do not need filtering, and a filter that
 * returns four results on every click is furniture pretending to be a feature;
 * the category is printed on each card because it tells a reader what a post
 * is, not because anything sorts by it.
 */
export const blogPage = {
  hero: {
    crumb: "Blog",
    /**
     * Was "Notes From The Wet Coast". "Wet Coast" is a local joke on "West
     * Coast", but in a page heading it reads as a misspelling — which is how
     * the client read it (2026-09-23). The body opened on a fragment ("What
     * we learn on the ladder, written down —") that had the same problem.
     *
     * Now two lines like every other hero heading on the site (the AEO rule
     * in CLAUDE.md): the name, then the keyword line in the same `h1`. The
     * body picks up the homepage's "tips, local updates" wording so the band
     * that sends people here and the page they land on say the same thing.
     */
    heading: "The RainCity Blog",
    headingSub: "Property Maintenance Tips for Greater Vancouver",
    body: "Practical advice from our crew on seasonal timing, the maintenance that pays for itself, and what this rainy climate does to homes, stratas and businesses across Greater Vancouver.",
    cta: "Get a Free Quote",
  },

  featured: {
    label: "Start Here",
    headline: "Worth Reading First",
    body: "The pieces that answer most of what gets asked on a first visit: what this weather does to a building, and when it is worth getting ahead of it.",
  },

  archive: {
    label: "All Articles",
    headline: "Everything We’ve Written Down",
    body: "Short, specific pieces about the work itself. Nothing here is a seasonal listicle — if it is on this page, it is because somebody asked about it more than once.",
  },

  card: {
    cta: "Read More",
    /** Follows the minute count: "6 min read". */
    readTime: "min read",
    /** Builds each share link's accessible name: Share "<title>" on X. */
    shareOn: "on",
    shareLabel: "Share",
  },

  pagination: {
    /** Accessible name for the pager itself. */
    label: "Blog pages",
    previous: "Previous",
    next: "Next",
    /** Prefixes each numbered cell's accessible name. */
    page: "Page",
  },

  /**
   * /blog/[slug] — the furniture around an article, identical on every post.
   *
   * Everything a post page says that is not the post itself lives here, for
   * the same reason `servicePage` holds what is identical across the eleven
   * service pages: the template should be one design with six sets of copy
   * poured through it, not six pages that happen to look similar.
   *
   * There is no byline string, because there is no author. See the note on
   * `blogPosts` above.
   */
  post: {
    /** The trail on the article: Home / Blog / <title>. */
    crumb: "Blog",
    /** In-article contents, on long posts only. */
    contents: "In This Article",
    /** Back to the index, under the article. */
    backToIndex: "All Articles",

    share: {
      label: "Share",
      heading: "Pass It On",
      body: "If this is useful to a neighbour, a strata council or a property manager, send it their way.",
      /** The copy-link control, in its three states. */
      copy: "Copy link",
      copied: "Link copied",
      copyFailed: "Copy failed",
    },

    related: {
      label: "Keep Reading",
      headline: "More From The Ladder",
      body: "Other notes on the same weather, the same buildings and the same jobs.",
    },
  },
} as const;

// --- Policy pages ----------------------------------------------------------

/**
 * These two policy pages cover the same legal ground as the reference pages
 * reviewed during the September 2026 rebuild, rewritten in RainCity's own
 * words. They still need sign-off from two separate people before launch:
 *
 *  1. A lawyer or paralegal — specifically for the limitation-of-liability
 *     clause, the PIPA/PIPEDA rights section and the governing-law clause.
 *  2. The client — to confirm every operational number (24-hour cancellation
 *     window, 50% late-fee, net-30 invoicing, 7-day issue window, retention
 *     periods) reflects what the business actually does.
 *
 * Both pages are currently noindex. Remove the robots override in their
 * respective page.tsx files after both sign-offs are obtained.
 *
 * Known gaps to address before launch:
 *  - No named privacy officer (PIPA expects one to be designated).
 *  - Accepted payment methods are referred to but not listed.
 *  - No business registration number or incorporation details.
 */

/**
 * ===========================================================================
 * NEEDS LEGAL REVIEW — not yet reviewed by a licensed lawyer/paralegal.
 * ===========================================================================
 *
 * Every string in `legalPages` below was written to read as standard,
 * plain-language policy copy for a British Columbia service business. None of
 * it has been reviewed by anyone qualified to review it, and several clauses
 * state specific commitments — a 24-hour cancellation window, a 50% late-
 * cancellation charge, a 7-day reporting window, a 12-month and 7-year
 * retention split, a liability cap at the job price, net-30 invoicing — that
 * are plausible defaults rather than the client's actual practice.
 *
 * Two separate things have to happen before launch:
 *
 *  1. A lawyer or paralegal reviews all four pages. Limitation of liability,
 *     the PIPA/PIPEDA rights section and the governing-law clause are the
 *     three that carry real exposure if they are wrong.
 *  2. The client confirms each operational number is what they actually do.
 *     A published cancellation window the office does not enforce is worse
 *     than no published window at all.
 *
 * This is the same treatment `testimonials` gets and for the same reason: it
 * is content that looks finished, would ship silently, and must not. See the
 * note in CLAUDE.md, which is what raises it again at launch.
 *
 * Known gaps a reviewer will need answers to, none of which are invented here:
 *  - No business number, incorporation details or registered address. The
 *    LocalBusiness schema deliberately has no `streetAddress` (mobile
 *    business, no storefront) and these pages inherit that silence.
 *  - No named privacy officer. PIPA expects one to be designated.
 *  - Accepted payment methods are referred to but not listed.
 *  - The quote form has no backend yet (see the TODO in QuoteForm.tsx), so
 *    the Privacy Policy's description of form handling describes the intended
 *    path, not a live one. Reconcile it with the real handler when it lands.
 */

/** One clause. The icon is a key into the lookup in `LegalSections`. */
export type LegalSection = {
  /** Anchor target, and the id the table of contents jumps to. */
  id: string;
  /** Doubles as the sidebar label, so keep it to a few words. */
  title: string;
  icon: LegalIconName;
  /** Paragraphs above the list. */
  body?: readonly string[];
  /** The accent-marked list. */
  list?: readonly string[];
  /** Paragraphs below the list, where a section needs a line to close on. */
  after?: readonly string[];
  /** The one clause on this page a reader must not scroll past. */
  callout?: { title: string; body: string };
};

/**
 * The section-icon names. A union rather than the component itself, because
 * content.ts holds copy and must not import from components/ — the lookup
 * that turns one of these into an SVG lives in `LegalSections`.
 */
export type LegalIconName =
  | "fileText"
  | "clipboardList"
  | "calendar"
  | "receipt"
  | "creditCard"
  | "scale"
  | "route"
  | "share"
  | "cookie"
  | "archive"
  | "key"
  | "lock"
  | "info"
  | "target"
  | "camera"
  | "externalLink"
  | "alertTriangle"
  | "shieldCheck"
  | "users"
  | "clock"
  | "check"
  | "mail";

export type LegalPage = {
  /** Route segment. Matches the hrefs `footer.additionalLinks` already uses. */
  slug: string;
  crumb: string;
  /** Page H1. */
  heading: string;
  /** One line under the H1, same slot as the About and Contact banners. */
  intro: string;
  /** Rendered in the badge. */
  lastUpdated: string;
  /** The same date as a machine-readable value for <time datetime>. */
  updatedISO: string;
  /** The route's own <title>. 60 characters or under. */
  metaTitle: string;
  /** The route's own meta description. 150-158 characters. */
  metaDescription: string;
  keywords: readonly string[];
  sections: readonly LegalSection[];
  /** The closing card. */
  outro: { heading: string; body: string; cta: string };
};

/**
 * The two policy pages, in one shape.
 *
 * They share a template rather than a layout file: `LegalPageTemplate` takes
 * one of these objects and renders the whole route. Nothing about a policy
 * page is per-page except its copy, and the moment one of them needs a
 * section type the others do not have, it belongs in `LegalSection` as an
 * optional field rather than in a fork of the template.
 *
 * Disclaimer and Refund Policy were removed in September 2026. Their routes
 * permanently redirect: /disclaimer → /, /refund-policy → /terms.
 * The workmanship guarantee that lived in the Refund Policy is now in the
 * Terms & Conditions ("Our Workmanship Guarantee" section).
 *
 * Section numbering is the one place these pages break the site's rule
 * against numbered markers. It is earned for the same reason `servicePage`'s
 * process steps are: a clause number is how a legal document is cited, and
 * "see section 4" has to resolve to something a reader can find.
 */
export const legalPages = {
  terms: {
    slug: "terms",
    crumb: "Terms & Conditions",
    heading: "Terms & Conditions",
    intro:
      "The terms that govern quotes, bookings, payment, and work carried out by RainCity Property Maintenance.",
    lastUpdated: "September 1, 2026",
    updatedISO: "2026-09-01",
    metaTitle: "Terms & Conditions | RainCity Property Maintenance",
    metaDescription:
      "The terms governing quotes, scheduling, cancellation, payment, our workmanship guarantee and liability for all RainCity work, under British Columbia law.",
    keywords: [
      "RainCity terms and conditions",
      "property maintenance terms of service BC",
      "exterior cleaning terms Greater Vancouver",
      "service agreement New Westminster",
    ],
    sections: [
      {
        id: "agreement",
        title: "Agreement to These Terms",
        icon: "fileText",
        body: [
          "These Terms and Conditions govern your use of this website and any quote, booking or work carried out by RainCity Property Maintenance (“RainCity”, “we”, “us”), a mobile property maintenance and exterior cleaning business based in New Westminster, British Columbia and serving Greater Vancouver.",
          "By requesting a quote, accepting a quote, or allowing us onto a property to carry out work, you agree to be bound by these terms. If you do not agree with them, please do not request a quote or book a service.",
          "They apply equally to residential homeowners, strata corporations and their agents, and commercial property managers. Where a separate written service agreement is signed between us, that agreement governs to the extent it conflicts with anything set out here.",
        ],
      },
      {
        id: "scope",
        title: "Services and Scope of Work",
        icon: "clipboardList",
        body: [
          "We provide exterior cleaning and property maintenance on a mobile basis. There is no storefront; all work is carried out at your property.",
          "The scope of any job is defined by the written quote issued for it. Work described in that quote is included; work not described in it is not.",
        ],
        list: [
          "Services are performed to the specification set out in the accepted quote",
          "Additional work identified on site is quoted separately and does not begin without your approval",
          "Verbal requests made to a crew on the day are confirmed in writing before they become part of the job",
          "We may decline or stop work where a surface, structure or access point cannot be worked on safely or without risk of damage",
          "Subcontractors may be engaged for specialist elements of a job; the work remains our responsibility",
        ],
      },
      {
        id: "quotes",
        title: "Quotes and Pricing",
        icon: "receipt",
        body: [
          "Quotes are free, issued in writing, and priced on the property rather than from a rate card. We assess access, surface area and condition before giving a figure.",
          "Unless the quote states otherwise, it is valid for 30 days from the date of issue. The quoted figure does not change after acceptance unless the scope of work changes.",
          "Where conditions on site differ materially from what was described or observed at the time of quoting, we stop, explain the difference and give you a revised figure before continuing. Work does not proceed at a higher price without your agreement.",
        ],
      },
      {
        id: "scheduling",
        title: "Scheduling, Access and Cancellation",
        icon: "calendar",
        body: [
          "Bookings are scheduled by date and, in most cases, by an arrival window rather than a fixed time. Exterior work is weather-dependent: steady rain is generally workable, but high wind, ice, snow and lightning are not, and we will move a booking rather than work in conditions that are unsafe or that would compromise the result.",
          "You are responsible for providing safe and reasonable access to the areas to be worked on, including gates, keys, fobs, parking and, where the job needs them, water and power.",
        ],
        callout: {
          title: "Cancellation and rescheduling",
          body: "Please give at least 24 hours’ notice to cancel or reschedule. Cancellations inside that window, or a visit where our crew arrives and cannot access the property, may be charged at up to 50% of the quoted price to cover the reserved crew time. A booking we postpone for weather is never charged.",
        },
      },
      {
        id: "payment",
        title: "Payment Terms",
        icon: "creditCard",
        body: [
          "Unless a separate account arrangement is in place, payment is due on completion of the work. For larger projects, a deposit or staged payments may be set out in the quote.",
          "Strata corporations, property managers and commercial clients may be invoiced on agreed terms, ordinarily net 30 days from the invoice date.",
        ],
        list: [
          "Accepted payment methods are set out on your quote or invoice",
          "Overdue accounts may be subject to interest at the rate stated on the invoice",
          "A deposit is applied against the final invoice for the same job",
          "Prices are exclusive of applicable taxes unless the quote states otherwise",
        ],
      },
      {
        id: "responsibilities",
        title: "Your Responsibilities",
        icon: "users",
        body: [
          "So that a job can be completed safely and on schedule, we ask you to attend to a few things before the crew arrives.",
        ],
        list: [
          "Move or secure vehicles, patio furniture, planters, decorations and anything else in the work area",
          "Close and latch windows, doors and skylights before exterior washing begins",
          "Tell us in advance about aged or previously repaired surfaces, failing seals, loose siding, or anything already leaking",
          "Secure pets, and let anyone else at the property know that work is taking place",
          "Disclose known hazards, including unmarked services, unstable ground, fragile roofing and electrical faults",
          "Obtain any consent required from a strata council, landlord or neighbour before booking work that affects shared or adjoining property",
        ],
      },
      {
        id: "guarantee",
        title: "Our Workmanship Guarantee",
        icon: "shieldCheck",
        body: [
          "Every job we do is guaranteed. If the work carried out does not meet the standard set out in your quote, we come back and put it right at no charge.",
        ],
        callout: {
          title: "Redo first, refund second",
          body: "This is a workmanship guarantee. The first remedy is always a return visit at no cost to you. A refund is offered where a return visit is not practical, where the same issue is not resolved after a reasonable further attempt, or where you would prefer not to have us on site again.",
        },
        list: [
          "Report any issue within 7 days of the job finishing — the sooner we look, the more clearly we can assess the work as we left it",
          "Give us the property address, the date of work, a description of the issue and, where possible, a photograph",
          "We acknowledge requests within one business day and arrange a return visit, normally within five business days",
          "Where a refund is the appropriate remedy, it is issued to the original payment method within 10 business days of being agreed",
          "The guarantee covers our workmanship, not re-soiling from weather or use, regrowth over time, pre-existing damage, or surfaces already at the end of their service life",
        ],
      },
      {
        id: "liability",
        title: "Liability and Limitations",
        icon: "alertTriangle",
        body: [
          "RainCity is licensed and carries liability insurance. A certificate is available on request and is sent directly to a strata council or property manager where one is required.",
          "We take responsibility for damage caused by our negligence in the course of carrying out work. We are not responsible for pre-existing damage, for wear that our work reveals rather than causes, or for the failure of a component already at or beyond the end of its service life.",
        ],
        callout: {
          title: "Limitation of liability",
          body: "To the fullest extent permitted by law, our total liability arising from any job is limited to the amount paid for that job, and we are not liable for indirect, incidental or consequential loss, including loss of use, income or business opportunity. Nothing in these terms limits liability that cannot lawfully be limited in British Columbia.",
        },
      },
      {
        id: "governing-law",
        title: "Governing Law and Changes",
        icon: "scale",
        body: [
          "These terms are governed by the laws of the Province of British Columbia and the federal laws of Canada that apply in it. Any dispute arising from them is subject to the exclusive jurisdiction of the courts of British Columbia.",
          "We may revise these terms from time to time. The version published here when you request or accept a quote is the version that applies to that job, and the date of the current revision is shown at the top of this page.",
          "If any provision is found to be unenforceable, the remaining provisions continue in full effect.",
        ],
      },
    ],
    outro: {
      heading: "Questions about these terms?",
      body: "Ask before you book. We would far rather answer a question in advance than have a term come as a surprise on the day.",
      cta: "Get In Touch",
    },
  },

  /**
   * Privacy Policy — the form endpoint is now live (Resend via /api/contact),
   * so the third-parties section names the actual provider. Needs legal review
   * before publishing; noindex is set on the route until that happens.
   */
  privacy: {
    slug: "privacy-policy",
    crumb: "Privacy Policy",
    heading: "Privacy Policy",
    intro:
      "What we collect when you contact us, how it is used, how long it is kept, and how to request access or deletion.",
    lastUpdated: "September 1, 2026",
    updatedISO: "2026-09-01",
    metaTitle: "Privacy Policy | RainCity Property Maintenance",
    metaDescription:
      "How RainCity collects, uses, stores and deletes the information you give us when requesting a quote — and your rights under BC privacy law, explained.",
    keywords: [
      "RainCity privacy policy",
      "property maintenance privacy policy BC",
      "PIPA privacy British Columbia",
      "quote form data protection",
    ],
    sections: [
      {
        id: "introduction",
        title: "About This Policy",
        icon: "info",
        body: [
          "RainCity Property Maintenance is committed to protecting the personal information of the people we work with and work for. This policy explains what we collect, how we use it, and what rights you have over it.",
          "By using this website or contacting us about a job, you consent to the collection and use of your information as described here. We collect only what is necessary, and we handle it with care.",
        ],
      },
      {
        id: "what-we-collect",
        title: "Information We Collect",
        icon: "clipboardList",
        body: [
          "We collect only what we need in order to quote and carry out work. Most of it comes directly from you, through the quote form on this website or in the course of a phone call or email.",
          "The quote form asks for the following:",
        ],
        list: [
          "Your full name",
          "Your phone number",
          "Your email address",
          "The service you are enquiring about",
          "Your preferred date, if you provide one",
          "Any details you add in the additional information field",
        ],
        after: [
          "While a job is being arranged, we also hold the property address, access details, site notes and the history of work we have carried out for you. No payment card details are collected or stored through this website.",
        ],
      },
      {
        id: "how-we-use-it",
        title: "How We Use Your Information",
        icon: "route",
        body: [
          "Your information is used to respond to you and to run the job. Specifically:",
        ],
        list: [
          "To prepare and send you a quote",
          "To contact you about scheduling, access and arrival times",
          "To carry out the work and issue an invoice",
          "To follow up on a completed job, including any issue raised under our workmanship guarantee",
          "To maintain the records that a licensed and insured business is required to keep",
        ],
        after: [
          "We do not use your information for automated decision-making or profiling, and we do not send marketing messages unless you have specifically asked us to.",
        ],
      },
      {
        id: "third-parties",
        title: "Service Providers and Third Parties",
        icon: "share",
        body: [
          "Operating a website and business email account involves third-party providers. Where a provider handles your information on our behalf, it does so only for the specific purpose we engaged it for.",
        ],
        list: [
          "Quote form delivery — submissions are routed to our inbox through Resend (resend.com), a transactional email service",
          "Website hosting — the provider that serves this site stores the files and logs standard server access data",
          "Business email — the provider carrying our email account, through which correspondence arrives",
          "Maps — the quote and contact sections embed a Google map of the area we serve. Loading it sends your IP address to Google and may set cookies under Google’s own privacy policy",
        ],
        callout: {
          title: "We do not sell your information",
          body: "RainCity does not sell, rent or trade personal information to anyone, for any purpose. We disclose it only to the service providers described above, to a subcontractor carrying out part of your job, or where the law requires us to.",
        },
      },
      {
        id: "cookies",
        title: "Cookies and Analytics",
        icon: "cookie",
        body: [
          "This website sets no advertising or tracking cookies of its own and runs no third-party analytics package.",
          "Cookies may still be placed by the embedded Google map described above. Browser settings can block or delete cookies; doing so may prevent the map from loading, but the rest of the site works normally.",
        ],
      },
      {
        id: "retention",
        title: "How Long We Keep It",
        icon: "archive",
        body: [
          "Personal information is kept only as long as it is needed for the purpose it was collected for, or as long as we are required to retain it.",
        ],
        callout: {
          title: "Retention at a glance",
          body: "Quote requests that do not become bookings are deleted after 12 months. Records relating to completed work — invoices, site notes and correspondence — are kept for seven years, the period ordinarily required for Canadian business and tax records.",
        },
      },
      {
        id: "security",
        title: "How We Protect It",
        icon: "lock",
        body: [
          "Access to customer information is limited to those who need it to quote, schedule, carry out or invoice a job. Accounts are protected by passwords, and this website is served over an encrypted connection.",
          "No method of transmission or storage is completely secure, and we cannot guarantee absolute security. If a breach affecting your personal information creates a real risk of significant harm, we will notify you and the appropriate authorities as Canadian privacy law requires.",
        ],
      },
      {
        id: "children",
        title: "Children’s Privacy",
        icon: "users",
        body: [
          "Our services are directed at property owners, strata councils and commercial property managers — adults who can enter into a service agreement. We do not knowingly collect personal information from anyone under the age of 18.",
          "If you believe we have inadvertently received information from a minor, please contact us using the details below and we will delete it promptly.",
        ],
      },
      {
        id: "your-rights",
        title: "Your Rights",
        icon: "key",
        body: [
          "Under British Columbia’s Personal Information Protection Act, and the federal Personal Information Protection and Electronic Documents Act where it applies, you have the following rights over the information we hold about you.",
        ],
        list: [
          "To ask what personal information we hold and how it has been used",
          "To request a correction of anything inaccurate or incomplete",
          "To request deletion of information we no longer have a legal or business reason to keep",
          "To withdraw consent to further contact, subject to records we are required to retain",
          "To complain to the Office of the Information and Privacy Commissioner for British Columbia if you are not satisfied with our response",
        ],
        after: [
          "We respond to requests within 30 days, and there is no charge for a reasonable one.",
        ],
      },
      {
        id: "contact",
        title: "Contacting Us About Privacy",
        icon: "mail",
        body: [
          "Privacy questions, access requests and deletion requests can be sent to info@raincitypms.com or by phone using the number in the footer. Marking the subject line ‘Privacy Request’ gets it to the right person faster.",
        ],
      },
      {
        id: "changes",
        title: "Changes to This Policy",
        icon: "fileText",
        body: [
          "We may update this policy from time to time. When we do, the revised version is published here and the date at the top of the page is updated. We encourage you to review it periodically if you are a returning customer.",
          "Continued use of this website or our services after an update constitutes acceptance of the revised policy.",
        ],
      },
    ],
    outro: {
      heading: "Questions about this policy?",
      body: "Ask us what we hold, or tell us to delete it. You will get a straight answer from a person, not a ticket number.",
      cta: "Get In Touch",
    },
  },
} as const satisfies Record<string, LegalPage>;
