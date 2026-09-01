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

/*
 * Social profile links. Add an entry for each network once the real URL is
 * confirmed. An empty array is the correct state here — rendering a "#" icon
 * reads as broken, and the wrong handle points visitors to a stranger's account.
 *
 * When real URLs are ready: add them here and add `sameAs` to the
 * LocalBusiness schema in lib/seo.tsx in the same pass.
 */
export const social: readonly { label: string; href: string; icon: string }[] =
  [];

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
  /** Meta description. Written, not derived: 150-160 characters is a
      constraint on the sentence, and a paragraph reused from the page body
      gets cut mid-clause in the result. */
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
        "Commercial cleaning in New Westminster and across Greater Vancouver. Offices, retail and strata common areas cleaned to a written scope, on the cycle your building needs.",
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
        "Pressure washing across Greater Vancouver for driveways, patios, siding and parkades. Pressure and tip matched to the surface, tested first, finished even edge to edge.",
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
        "Soft washing across Greater Vancouver for roofs, stucco, painted siding and cedar. Low pressure only, with moss and algae killed at the root instead of blasted off.",
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
        "Concrete and asphalt sealing across Greater Vancouver. Cracks routed and filled, oil degreased, the slab dried and metered, then sealed against water, salt and frost.",
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
        "Streak-free interior and exterior window cleaning across Greater Vancouver — glass, frames, sills, tracks and screens, on homes, storefronts and multi-storey buildings.",
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
        "Gutter cleaning across Greater Vancouver — every run cleared by hand, debris bagged and removed, downspouts flushed and augered, then flow-tested before we leave.",
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
        "Roof moss removal across Greater Vancouver. Shingle, tile and metal roofs treated at low pressure — no lance, no lost granules — with valleys and gutters cleared after.",
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
        "Interior and exterior painting across Greater Vancouver. Surfaces washed, scraped, filled, caulked and primed before the finish coats, so the work holds on a wet coast.",
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
        "Snow removal and salting across Greater Vancouver. Driveways, walkways, strata lots and commercial entrances cleared at trigger depth, salted, and logged for your insurer.",
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
        "Holiday light installation across Greater Vancouver. Rooflines, porches and trees measured, clipped and powered safely, serviced all season and taken down in January.",
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
        "Landscaping and lawn care across Greater Vancouver — mowing at the right height, bed edging, pruning in season, and cleanups for homes, strata grounds and frontages.",
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
  /** The route's own meta description. */
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
      metaDescription:
        "Exterior cleaning and property maintenance in Anmore, BC — gutters, roofs, windows and driveways on the village's treed acreage lots. Free written quotes from RainCity, based in New Westminster.",
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
            "Yes, and there is no minimum job size or travel surcharge on the quote — an Anmore property is priced the same way a New Westminster one is. What we will often suggest is combining work into one visit rather than two: if the gutters are being cleared the roof is already being walked, and doing both while the crew is set up costs less than coming back for the second one.",
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
      metaDescription:
        "Exterior cleaning and property maintenance in Burnaby, BC — strata common areas, parkades, high glass and single-family homes across Metrotown, Brentwood, Lougheed and the Heights. Free written quotes from RainCity.",
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
            "No. There is no travel charge anywhere in our service area, Burnaby included — a job is priced on the property in front of us, exactly as one on our own street in New Westminster would be. Being next door does not make it cheaper either; the rate is the rate.",
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
      metaDescription:
        "Exterior cleaning and property maintenance in Delta, BC — Ladner, Tsawwassen and North Delta. Salt-film window cleaning, siding soft-washing, exterior painting and driveway work. Free written quotes from RainCity.",
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
            "All of it. North Delta, Ladner and Tsawwassen are one service area for us and priced the same way, which is on the property rather than on the postal code. Tsawwassen is the furthest point south we work and there is no surcharge attached to it.",
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
            "No. There is no travel charge anywhere in our service area. Being flexible about the day can make a booking easier to place, particularly at the far ends of the area, but it does not change the figure — the price is set by the property and the work, and the figure on the quote is the figure on the invoice.",
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
      metaDescription:
        "Exterior cleaning and property maintenance in Langley, BC — driveway and lot sealing, pressure washing, gutters and roofs across Willoughby, Walnut Grove, Fort Langley, Brookswood and Aldergrove. Free quotes from RainCity.",
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
    photo: "aboutCrew",
    detail: {
      intro:
        "Home. The truck loads here, on the hill above the Fraser, and works its way out from it.",
      metaDescription:
        "Exterior cleaning and property maintenance in New Westminster, BC — RainCity's home city. Heritage window and gutter work on the hill, strata care Uptown, at the Quay and in Queensborough. Free written quotes.",
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
            "No, and that is deliberate. There is no travel charge anywhere in the service area and no local discount either — a property in New Westminster is quoted on exactly the same basis as one in Langley or Tsawwassen, which is what the work in front of us takes. What being local actually buys you is scheduling: this is usually the easiest city in the area for us to fit a job into.",
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
    blurb:
      "Maple Ridge and Pitt Meadows, out where the rain sits longest and a north-facing roof greens over fastest.",
    bearing: "north-east",
    photo: "roofCleaning",
    detail: {
      intro:
        "Maple Ridge and Pitt Meadows, at the wet end of the valley, where a north-facing roof greens over faster than anywhere else we go.",
      metaDescription:
        "Exterior cleaning and property maintenance in Maple Ridge and Pitt Meadows, BC — roof moss treatment, soft washing and gutter clearing at the wettest end of the valley. Free written quotes from RainCity.",
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
            "Yes, across the built-up parts of both municipalities and out to the acreages around them. There is no travel charge and no minimum job size. If your property sits well beyond the edge of the map above, ask anyway — the answer takes one phone call, and we cross the odd boundary for the right job.",
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
    photo: "concreteSealing",
    detail: {
      intro:
        "The largest area we cover — Whalley down to the border, and more commercial hard surface than the rest of the region put together.",
      metaDescription:
        "Exterior cleaning and property maintenance in Surrey, BC — parking lot sealing, commercial pressure washing, strata common areas and residential exterior cleaning from City Centre to South Surrey. Free quotes from RainCity.",
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
            "All of it — Whalley and City Centre, Guildford, Fleetwood, Newton, Cloverdale and South Surrey, out to the Langley and Delta lines and down to the border. Surrey is the largest area we work in and it is not split into a near half and a far half; there is no travel charge attached to any of it.",
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
            "No. South Surrey and the ground down towards the border are inside the service area on the same terms as everywhere else, with no surcharge and no minimum job size. Being flexible on the day can make a booking easier to place at that end of the area, but it does not change the price.",
        },
      ],
      nearby: ["delta", "langley", "new-westminster"],
      closing: "Book Property Care in Surrey",
    },
  },
  {
    name: "Tri-Cities",
    slug: "tri-cities",
    blurb:
      "Coquitlam, Port Coquitlam and Port Moody. Hillside subdivisions, and hard surfaces that want the moss off every spring.",
    bearing: "north-east",
    photo: "powerWashing",
    detail: {
      intro:
        "Coquitlam, Port Coquitlam and Port Moody — hillside subdivision on one side, river and inlet flats on the other.",
      metaDescription:
        "Exterior cleaning and property maintenance in the Tri-Cities, BC — Coquitlam, Port Coquitlam and Port Moody. Moss removal, pressure washing, gutters and strata common areas. Free written quotes from RainCity.",
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
      metaDescription:
        "Exterior cleaning and property maintenance in Vancouver, BC — character-home window and gutter work, soft washing, and mid-rise strata common areas on the east side and the west. Free written quotes from RainCity.",
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
  body: "We specialize in professional property maintenance and exterior cleaning services designed to protect and enhance your space. Whether it's removing built-up dirt, clearing gutters, or maintaining your property year round, our experienced team ensures top-quality results with every job.",
  tags: [
    {
      title: "Skilled Team",
      support:
        "Trained technicians who have worked these roofs and walls before.",
      icon: "team",
    },
    {
      title: "Fast Service",
      support: "Quoted quickly, scheduled tightly, and finished when we said.",
      icon: "clock",
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
  /**
   * Set to true once all reviews are verified real customer reviews and the
   * placeholder entries have been replaced. When true, `localBusinessSchema`
   * in lib/seo.tsx publishes an `aggregateRating` node using the values below.
   * Do not set true while any placeholder entries remain — the schema would
   * publish a fabricated rating signal.
   */
  verified: false,
  /**
   * Filled in when `verified` is true. Set both together: the average is
   * meaningless without the count it was drawn from, and the count is
   * unverifiable without the average it produces.
   */
  averageRating: 0,
  reviewCount: 0,
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
 *     publishes elsewhere: the licence and the per-property quote in the
 *     badge set and public/llms.txt, the satisfaction guarantee in
 *     `awards.credentials`, the base city and service area in `business`.
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

  closing: {
    body: "Get a free quote today. Serving New Westminster and all of Greater Vancouver.",
    cta: "Get Your Free Quote",
  },
} as const;

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
        title: "Call Us",
        note: "Fastest way to reach us — most calls get answered straight away.",
      },
      {
        icon: "mail",
        title: "Email Us",
        note: "For anything you'd rather put in writing, or send photos along with.",
      },
      {
        icon: "clock",
        title: "Service Hours",
        note: "When we're on the clock and taking calls.",
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
    caption: "The Metro Vancouver boundary, outlined. We work in nine of the communities inside it — the nine listed here.",
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
export const locationPage = {
  hero: {
    /** The middle crumb. The trail is Home / Locations / [community]. */
    crumb: "Locations",
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
 * PLACEHOLDER BLOG CONTENT — written to build and review the blog, not
 * supplied or approved by RainCity. Replace before launch.
 * ===========================================================================
 *
 * Every post in `blogPosts` below was written for this build. The titles,
 * excerpts, dates, read times and body copy are all invented. The advice in
 * them is plausible for a Lower Mainland exterior-cleaning company and was
 * written to sound like this one, but nobody at RainCity has said any of it,
 * and some of it states timing and method as fact — when moss treatment
 * should be booked, what belongs on a strata schedule, how a sealer window
 * works. That is exactly the sort of thing a customer will quote back on the
 * phone, so it has to be confirmed or rewritten before it is public.
 *
 * This is the same treatment `testimonials` and `legalPages` get, for the
 * same reason: it is content that looks finished, would ship silently, and
 * must not.
 *
 * Three deliberate absences were held while `/blog/[slug]` did not exist.
 * Two of them are now spent and one is not:
 *
 *  1. No author, and this one stands. There is still no `author` field on
 *     `BlogPost` and no byline anywhere on the site, because putting a real
 *     person's name on copy they did not write is a worse kind of placeholder
 *     than an invented date. The BlogPosting markup names the *organisation*
 *     as author instead, which is true of any page on this site and asserts
 *     nothing about a person. Add the field, and the byline, when there is
 *     somebody to name.
 *  2. BlogPosting JSON-LD — lifted, with the template. Each post page now
 *     publishes a headline, image, date and author for its own article. Read
 *     that alongside the warning at the top of this block: the structured
 *     data is only as true as the copy under it, and this copy is invented.
 *     `blogPageSchema` still publishes no list of posts, because the index is
 *     not the place to assert six articles exist.
 *  3. Sitemap entries — lifted, with the template. The URLs resolve now, so
 *     listing them is no longer the claim about a 404 that app/sitemap.ts
 *     refused to make. /blog/page/N is still deliberately absent.
 *
 * What that leaves is the one thing to be careful about before launch: a
 * crawler is now told these six articles are real, at real URLs, with real
 * dates. If the copy is not going to be replaced or confirmed first, the
 * control is `noindex` on the route — the same answer the policy pages get —
 * not quietly deleting the markup again.
 *
 * When real posts land: replace this array and keep `slug` stable for
 * anything that was ever published.
 *
 * On the shape of the copy below. Three of the six were expanded when the
 * template landed, so the page was built against a real range rather than
 * against six posts of identical length: `what-a-strata-schedule-covers` runs
 * long, with lists, an ordered sequence, a pull quote and a photograph in the
 * body; `moss-isnt-the-problem` sits in the middle; `three-days-of-snow` was
 * left as three short sections of plain prose. `readMinutes` was re-estimated
 * to match. That is more invented copy, not less, and it is replaced with the
 * rest of it.
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
  | { kind: "photo"; photo: PhotoKey; caption: string };

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
  /** Two sentences for the card. Written to stand alone in a search result. */
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
      "In Greater Vancouver, a green roof looks bad long before it is bad. What actually shortens a shingle’s life is the water the moss keeps against it, day after day, right through a coast winter.",
    category: "Roof Care",
    date: "2026-08-18",
    readMinutes: 9,
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
          "If there is already moss thick enough to see from the street, the gutters are carrying it too. The two jobs are usually one visit.",
        ],
      },
      {
        heading: "Questions About Roof Moss in Greater Vancouver",
        blocks: [
          { kind: "subheading", text: "How do I know if my roof needs moss treatment?" },
          "Visible growth on shingles is the obvious sign, but the more useful test is the north-facing slope in late spring. If it is still carrying a mat after the drier months, the root structure is well established. Gutters filling with granule grit are the other indicator — that is the shingle surface telling you how much life it has left.",
          { kind: "subheading", text: "How long does a treated Greater Vancouver roof stay clean?" },
          "Three to five years after a proper low-pressure treatment, against roughly one year when growth is knocked off at pressure. The difference is the root: treatment kills it, so regrowth starts from new spores on a clean surface rather than from the root mass left behind. North-facing slopes and roofs under heavy conifer cover sit at the short end of that range.",
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
      "Late September is the cheapest two weeks of the year to own a building in Greater Vancouver. Everything booked after the first real storm costs more, takes longer, and usually involves a ladder in the wet.",
    category: "Seasonal",
    date: "2026-08-04",
    readMinutes: 8,
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
          "Gutters cleared and flow-tested, not just scooped. Downspouts checked at the bottom as well as the top, because the blockage is usually at the elbow. Roof valleys cleared of needles. Yard drains and catch basins lifted and looked at.",
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
        ],
      },
      {
        heading: "Questions About Fall Maintenance Timing in Greater Vancouver",
        blocks: [
          { kind: "subheading", text: "When exactly should I book gutters cleaned in autumn?" },
          "Mid-September to early October is the ideal window — late enough that most deciduous leaves are down, early enough that the autumn rains have not set in. In practice this means the calendar fills quickly from early September. Booking when the weather is still fine, rather than when the first storm arrives, is the whole difference between a scheduled visit and an emergency call.",
          { kind: "subheading", text: "What happens if I wait until after the first storm?" },
          "A blocked downspout does not fail quietly. The overflow backs up behind the fascia, runs down the inside of the board, and the first sign is usually a stain on an interior ceiling in December or January. The clearing job remains an hour's work; the fascia and the ceiling behind it are a different trade and a larger invoice.",
          { kind: "subheading", text: "Does timing change on a property with conifers?" },
          "Yes. Deciduous trees drop their leaves in a six-week window; cedars and firs shed needles year-round, and by November a gutter cleared in September under heavy conifer cover can be carrying a second season's load. Properties with no overhanging trees have the most flexibility. Properties under mature fir or cedar should assume two clears a year rather than one.",
          { kind: "subheading", text: "What is the full pre-rain checklist for a strata?" },
          "Gutters and downspouts cleared and flow-tested. Roof valleys and flat sections cleared of needles. Parkade drains and floor channels lifted and looked at. Walkway and stairwell grates checked. Yard drains and catch basins opened. The parkade drains and the grates are the two items most often missing from an inherited strata schedule and the ones that flood first.",
          { kind: "subheading", text: "How long does a gutter clearing visit take?" },
          "A single-family home typically runs ninety minutes to two and a half hours depending on the run length, the volume of debris and how many downspouts need augering. A complex or strata with multiple buildings is priced by the scope. The flow test on every outlet is included rather than quoted separately — it is what turns a clearing into a working system.",
        ],
      },
    ],
  },
  {
    slug: "why-the-north-wall-greens-first",
    title: "Why The North Wall Greens Over First",
    excerpt:
      "Same house, same siding, same year — and one elevation is green while the other is fine. It is not the paint. It is how long a north-facing wall in Greater Vancouver stays wet after it rains.",
    category: "Exterior Cleaning",
    date: "2026-07-21",
    readMinutes: 7,
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
          "Painted siding, stucco and cedar all take damage from a pressure washer long before the algae does. A soft wash puts a cleaning solution on the surface, gives it time, and rinses at something closer to garden-hose pressure.",
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
    title: "What A Strata Maintenance Schedule Actually Covers",
    excerpt:
      "Strata councils in Greater Vancouver usually inherit a schedule rather than write one. Here is what belongs on it, what is almost always missing, and which line items are worth an argument at the AGM.",
    category: "Strata & Commercial",
    date: "2026-06-30",
    readMinutes: 13,
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
          "Most inherited schedules only have the first, which is how the same complex ends up paying for quarterly window cleaning it does not need and no gutter clearing at all.",
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
      "Sealer needs a dry surface and a dry forecast — a narrow ask in Greater Vancouver. The window is real, though, and it is wider than most people assume, and worth getting ahead of before the season fills.",
    category: "Hard Surfaces",
    date: "2026-05-19",
    readMinutes: 8,
    photo: "concreteAsphaltSealing",
    body: [
      {
        heading: "What the product actually needs",
        blocks: [
          "A clean, dry surface, air above about ten degrees, and enough hours after application to cure before the next rain. The surface matters more than the sky — concrete that looks dry can still be holding water from two days ago.",
          "That is why the prep wash happens well before the seal coat rather than on the morning of it.",
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
          "Asphalt sealcoat holds two to three years under normal residential traffic; penetrating concrete sealers run three to five. Both depend more on the quality of the preparation than on the product itself. A sealed slab on a flat, open property will outlast the same product on a sloped driveway catching road salt off a busy street.",
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
      "Greater Vancouver gets a handful of days a year that genuinely need clearing. The trouble is that nobody knows which ones, which is why the contract matters more than the shovel.",
    category: "Seasonal",
    date: "2026-01-20",
    readMinutes: 7,
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
          "It is priced for the season rather than the visit, because the alternative is a business that only makes money in a bad winter.",
        ],
      },
      {
        heading: "Salt, and when it stops working",
        blocks: [
          "Rock salt does very little far below freezing, and this region spends most of its cold snaps within a few degrees of it — which is why salting works here, and why timing it ahead of the freeze matters more than the quantity.",
          {
            kind: "photo",
            photo: "snowSalting",
            caption:
              "Salting ahead of a freeze rather than after it. The difference between the two is the difference between prevention and remediation, and on a commercial site the liability follows the same line.",
          },
          "Applied after the ice has bonded, it is mostly grit. Applied before, it stops the bond forming at all.",
        ],
      },
      {
        heading: "Questions About Snow Removal and Winter Property Care",
        blocks: [
          { kind: "subheading", text: "Why book a snow removal contract instead of calling when it snows?" },
          "By the time a property in Greater Vancouver calls, the crews with capacity are already committed to sites that booked in October. This region gets snow on perhaps three to six days a year — often overnight, often heavily — and every uncovered property phones at the same time. A seasonal contract reserves capacity for your site before the season starts and means the truck comes automatically at the agreed trigger depth, without anyone having to call.",
          { kind: "subheading", text: "What trigger depth should I set for snow clearing?" },
          "Two centimetres is the standard starting point for most commercial and strata sites, because at that depth the surface is covered but the snow has not yet compacted into the ice that makes mechanical clearing difficult. Sites with steep ramps, high pedestrian traffic or accessibility requirements often go lower. Residential driveways can usually go higher. The trigger is written into the contract and is not a judgement call on the morning of the event.",
          { kind: "subheading", text: "Is rock salt safe on concrete and parkade membranes?" },
          "Not on new concrete or waterproofed parkade decks. Sodium chloride on concrete under a year old causes surface scaling, and salt-laden meltwater running through a parkade membrane attacks the reinforcement below it. Those areas need magnesium chloride or a CMA blend. Tell us at the site walk if any area is newly poured, membraned or draining into landscaping, and the product is chosen for the surface.",
          { kind: "subheading", text: "How early will clearing happen on a commercial site?" },
          "The aim for commercial and strata sites is completion before the first arrivals — in practice before seven in the morning. Heavy overnight events get a first pass before dawn and a second if the snow continues. Contracts are priced per event rather than per pass, because a site cleared at five and snowed on until nine has not been cleared.",
          { kind: "subheading", text: "What is the difference between a seasonal contract and a per-event rate?" },
          "A seasonal contract locks in a fixed price for the winter regardless of how many events occur and holds you a place in the route. A per-event rate means paying a higher price only when it snows. A seasonal contract costs more in a mild winter and considerably less in a heavy one, and it guarantees the crew capacity that per-event clients often cannot get during a bad week. Most commercial and strata clients take the contract.",
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
    heading: "Notes From The Wet Coast",
    body: "What we learn on the ladder, written down — seasonal timing, the maintenance that pays for itself, and advice that only really applies here in Greater Vancouver.",
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
  metaTitle: string;
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
    metaTitle:
      "Terms & Conditions | RainCity Property Maintenance, New Westminster BC",
    metaDescription:
      "The terms governing quotes, scheduling, cancellation, payment, our workmanship guarantee and liability for RainCity Property Maintenance work across Greater Vancouver, under BC law.",
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
    metaTitle:
      "Privacy Policy | RainCity Property Maintenance, New Westminster BC",
    metaDescription:
      "How RainCity Property Maintenance collects, uses, stores and deletes the information you give us when requesting a quote — and your rights under BC privacy law.",
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
