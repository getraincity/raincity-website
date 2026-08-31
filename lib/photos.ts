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
  /**
   * Set only while the slot is waiting for its photograph.
   *
   * The value is the caption drawn across the placeholder — name the shot, so
   * whoever goes out to take it knows what the layout is asking for. `src`
   * still points at the path the real file will be saved to, and `alt`, `tone`,
   * `ratio` and `focal` are already written for it. Save the file at that path,
   * delete this one line, and the slot becomes a real photograph with nothing
   * downstream to change.
   */
  placeholder?: string;
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
    // 2400 rather than the 1600 this was catalogued at: it is the /blog
    // banner, and a full-bleed background is the widest any frame on this
    // site is asked to render.
    src: unsplash("photo-1641199788912-9a7385a35c82", 2400),
    alt: "A white panel van of the kind RainCity works out of, parked at the kerb outside a brick building.",
    credit: "Mathias Reding",
    tone: "#c0c0c0",
    ratio: "1:1",
    focal: "50% 50%",
    note: "Stands in for the branded truck in a strata driveway. Swap for a signage shot once the fleet is wrapped. Carried full-bleed as the /blog banner — the one real frame in this registry with no other slot, and a van at the kerb suits a page of notes from the crew better than another photograph of a service does. The source is square and smaller than the other banner frames, so the slot holds it high; a frame shot for that banner should replace it. The alt text was tightened when this ran at full column width on an earlier /about layout: at that size 'a residential street' was visibly not what the frame shows.",
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

  // --- Contact page ---------------------------------------------------------

  contactHero: {
    src: unsplash("photo-1768333220836-26309aacd3db", 2560),
    alt: "A foggy residential street on a Greater Vancouver hillside, evergreens rising above the rooflines and cloud settled low over the trees beyond.",
    credit: "Ali Kazal",
    tone: "#a9b0ac",
    ratio: "16:9",
    focal: "62% 55%",
    note: "Contact page hero banner, rendered with `fill` so this ratio is nominal only. The same frame flagged as an alternate for the homepage `hero` above — lighter and hazier — with the houses and evergreens held right of centre so the open, fogbound sky on the left carries the heading and breadcrumb.",
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
  // --- Window Cleaning: the pilot page's own photography --------------------
  //
  // Seven frames, supplied as 2560x1600 and 3200x1290 PNGs and converted to
  // webp at 1600 / 1920 wide (45MB of source down to 860KB served). The six
  // tile frames arrive at exactly 16:10, which is the ratio the tile declares,
  // so none of them is cropped at any breakpoint and the focal points below
  // only bite if that ratio is ever changed. They are set anyway, to where
  // the subject actually sits, so a future crop lands somewhere sensible.
  //
  // Three of the six show something other than what their slot is named for.
  // Each is flagged in its own `note` rather than papered over in the alt
  // text: alt describes the frame that is on the page, always.

  windowGlass: {
    src: "/services/window-cleaning/interior-exterior-glass.webp",
    alt: "Window cleaning: a cleaner in a blue work shirt drawing a squeegee down the inside of a sliding patio door, the cleared strip sharp against the wet glass beside it.",
    credit: "RainCity Property Maintenance",
    tone: "#e8e8e8",
    ratio: "16:10",
    // Subject sits centre-right; the left third is bare wall and is the first
    // thing worth losing if this is ever cropped tighter than 16:10.
    focal: "58% 55%",
    note: "Exactly the brief: mid-stroke, wet/dry line visible. One thing to weigh before launch — the cleaner is wearing a surgical face mask, which dates the frame to the pandemic years and will read that way to anyone looking at it in 2026.",
  },

  windowFrames: {
    src: "/services/window-cleaning/frames-sills-tracks.webp",
    alt: "Window cleaning: a technician in blue overalls standing in the opening of a sliding patio door, one hand on the frame, looking up the run.",
    credit: "RainCity Property Maintenance",
    tone: "#384858",
    ratio: "16:10",
    focal: "72% 50%",
    note: "Does not show what the tile says. The copy is about tracks being vacuumed out before any water reaches them, and the frame is a technician standing in a doorway — no tool, no track, no work in progress. It is a sliding door, so it is at least the right hardware. A close, low frame along the run with the vacuum head in shot is what this tile actually wants.",
  },

  windowScreens: {
    src: "/services/window-cleaning/screens-washed.webp",
    alt: "Window cleaning: a technician in a blue polo, squeegee and scrubber on the tool belt, lifting an insect screen out of a window in a stucco wall.",
    credit: "RainCity Property Maintenance",
    tone: "#a89888",
    ratio: "16:10",
    focal: "62% 50%",
    note: "The strongest of the six and the closest to its brief — the screen is genuinely coming out of the opening, and the tool belt puts the rest of the job in the same frame. Left half is blank stucco, which is why the focal holds right of centre.",
  },

  windowSkylights: {
    src: "/services/window-cleaning/skylights-glazing.webp",
    alt: "Window cleaning: a cleaner reaching up to wash a pitched-roof skylight from inside the room, a spray-and-squeegee tool drawn down the wet glass.",
    credit: "RainCity Property Maintenance",
    tone: "#383838",
    ratio: "16:10",
    focal: "52% 55%",
    note: "Cleaned from inside the room, not from the roof — so the height and the access the tile's copy turns on are not in the frame. It is still a skylight being cleaned, which is the tile's subject; the alt text says 'from inside' rather than borrowing the filename's claim.",
  },

  windowHardWater: {
    src: "/services/window-cleaning/hard-water-removal.webp",
    alt: "Window cleaning: a soapy sponge worked across a glass shower screen, a clear arc opening through the film with a tiled wall behind.",
    credit: "RainCity Property Maintenance",
    tone: "#d8d8d8",
    ratio: "16:10",
    focal: "45% 50%",
    note: "A domestic shower screen, not a window. Defensible in that shower glass is where most people have actually seen mineral scale, and the half-cleared arc does read as a treatment in progress — but the tile's copy is about sprinkler overspray and years of runoff on exterior panes, which is a different job in a different place.",
  },

  windowPoleWork: {
    src: "/services/window-cleaning/water-fed-pole.webp",
    alt: "Window cleaning: four rope-access cleaners abseiling down the curved glass facade of a high-rise, each on twin ropes with a red bucket at the harness.",
    credit: "RainCity Property Maintenance",
    tone: "#e8e8f8",
    ratio: "16:10",
    focal: "62% 50%",
    note: "Contradicts the tile it sits in. That copy exists to say the work is done from the ground on a pole, with nobody on the building — 'no ladder against your gutter line and nobody standing on a sill' — and the frame is four operatives hanging off a tower well above the five storeys the copy tops out at. It is a striking photograph and it is the wrong argument. Either a ground-level pole shot replaces it or the copy has to change; they cannot both stay.",
  },

  // --- Window Cleaning: closing band ---------------------------------------

  windowClosing: {
    src: "/services/window-cleaning/glass-you-can-see-through.webp",
    alt: "A frameless glass balustrade curving along a paved terrace, the panels clean enough to read the stone paving and the planted bank straight through them.",
    credit: "RainCity Property Maintenance",
    tone: "#d8e8f8",
    // Rendered with `fill`, so this is nominal. Source is 3200x1290 (2.48:1).
    ratio: "16:9",
    // The glass run sweeps low-left to upper-right through the middle band of
    // the frame. Held a shade high so the desktop crop — which takes the
    // centre and loses top and bottom — keeps the planted bank the panels are
    // reflecting, and so the narrow phone crop lands on the middle panels
    // rather than on the empty paving at either end.
    focal: "50% 45%",
    note: "No people and no equipment, which is what a closing band on a service page wants — it is the result, not the work. Cool and pale where the `rooftops` frame it replaces was dark and overcast, so the scrim over it carries more weight than that one needed; see ServiceClosing.",
  },


  // --- The remaining ten services: scope tiles and closing bands -----------
  //
  // Seventy slots on the Window Cleaning pattern — six 16:10 tile frames and
  // one 16:9 closing band per service — carrying `placeholder` until the real
  // photography is shot. Everything else about each entry is already written:
  // `src` is the path the file will be saved to, and `alt`, `tone`, `ratio`
  // and `focal` describe the frame the layout is asking for. Take the shot,
  // save it at that path, delete the one `placeholder` line, and the slot
  // becomes a photograph with nothing downstream to change.
  //
  // The `placeholder` string is the shot list, drawn across the hatch on the
  // page, so it is written for whoever is going out with the camera: subject
  // first, then the thing that has to be visible in the frame for the tile's
  // copy to be true. `alt` is written for the photograph that will exist, not
  // for the hatch — the placeholder is hidden from assistive technology
  // entirely, so nothing announces alt text for a frame that is not there yet.
  //
  // Tones are the dominant colour each frame is expected to land on, so the
  // blur-up is already right when the file drops in. They are a first
  // estimate; correct them against the real photograph if it comes back
  // materially warmer or colder than the brief.

  // --- Commercial Cleaning -------------------------------------------------

  commercialLobbies: {
    src: "/services/commercial-cleaning/lobbies-entrances.webp",
    alt: "Commercial cleaning: a technician working the glass of a lit office lobby entrance after hours, the floor still wet along the mat line.",
    credit: "RainCity Property Maintenance",
    tone: "#3c4a58",
    ratio: "16:10",
    focal: "50% 50%",
    placeholder: "Lobby after hours — entrance glass and matting, lights on, building empty",
  },

  commercialCorridors: {
    src: "/services/commercial-cleaning/corridors-stairwells.webp",
    alt: "Commercial cleaning: a residential building corridor being vacuumed, the machine mid-run and the carpet showing fresh parallel passes behind it.",
    credit: "RainCity Property Maintenance",
    tone: "#5a5f63",
    ratio: "16:10",
    focal: "55% 55%",
    placeholder: "Corridor vacuum pass — parallel tracks visible in the carpet, machine in frame",
  },

  commercialWashrooms: {
    src: "/services/commercial-cleaning/washrooms-restocking.webp",
    alt: "Commercial cleaning: a gloved hand wiping down a washroom counter and tap run with a colour-coded cloth, dispensers restocked on the wall behind.",
    credit: "RainCity Property Maintenance",
    tone: "#c8ccd0",
    ratio: "16:10",
    focal: "48% 52%",
    placeholder: "Washroom counter — colour-coded cloth clearly visible, dispensers filled",
  },

  commercialFloors: {
    src: "/services/commercial-cleaning/floors-and-matting.webp",
    alt: "Commercial cleaning: an auto-scrubber laying a clean wet arc across a hard-floor lobby, the untouched floor visibly duller alongside it.",
    credit: "RainCity Property Maintenance",
    tone: "#8a8f94",
    ratio: "16:10",
    focal: "52% 58%",
    placeholder: "Floor machine mid-pass — the clean/dirty line has to be obvious in frame",
  },

  commercialBackOfHouse: {
    src: "/services/commercial-cleaning/back-of-house.webp",
    alt: "Commercial cleaning: a loading bay and bin enclosure swept out and hosed down, bins squared up against a painted wall.",
    credit: "RainCity Property Maintenance",
    tone: "#6e7378",
    ratio: "16:10",
    focal: "50% 55%",
    placeholder: "Loading bay or bin room — swept and hosed, bins squared, floor still wet",
  },

  commercialSchedule: {
    src: "/services/commercial-cleaning/scope-and-schedule.webp",
    alt: "Commercial cleaning: a supervisor signing a printed scope sheet on a clipboard at a service door, the cleaning cart parked behind.",
    credit: "RainCity Property Maintenance",
    tone: "#4a5560",
    ratio: "16:10",
    focal: "45% 50%",
    placeholder: "Sign-off sheet on a clipboard at the service door, cart in shot behind",
  },

  commercialClosing: {
    src: "/services/commercial-cleaning/a-building-that-looks-managed.webp",
    alt: "An empty office lobby at dusk, floors and glass clean enough that the ceiling light reads evenly across both.",
    credit: "RainCity Property Maintenance",
    tone: "#2e3a46",
    ratio: "16:9",
    focal: "50% 50%",
    placeholder: "Finished lobby at dusk — no crew, no equipment, the result only",
  },

  // --- Power Washing -------------------------------------------------------

  powerDriveways: {
    src: "/services/power-washing/driveways-walkways.webp",
    alt: "Power washing: a surface cleaner mid-pass across a concrete driveway, a broad clean band standing out sharply against the grey the rest of the slab still is.",
    credit: "RainCity Property Maintenance",
    tone: "#9a9a96",
    ratio: "16:10",
    focal: "50% 58%",
    placeholder: "Driveway mid-pass — hard clean/dirty edge, surface cleaner and not a bare wand",
  },

  powerSiding: {
    src: "/services/power-washing/siding-brick-stone.webp",
    alt: "Power washing: a technician washing down a brick and stone frontage from ground level, water sheeting off the courses below the nozzle.",
    credit: "RainCity Property Maintenance",
    tone: "#8c7a6a",
    ratio: "16:10",
    focal: "55% 50%",
    placeholder: "Brick or stone frontage being washed — water sheeting, operator in frame",
  },

  powerDecks: {
    src: "/services/power-washing/decks-steps-railings.webp",
    alt: "Power washing: a timber deck cleaned board by board, the finished boards pale against the grey-green of the ones still to do.",
    credit: "RainCity Property Maintenance",
    tone: "#a08f6f",
    ratio: "16:10",
    focal: "50% 60%",
    placeholder: "Deck boards half done — pale cleaned boards against grey-green untreated",
  },

  powerParkades: {
    src: "/services/power-washing/parkades-loading-bays.webp",
    alt: "Power washing: a parkade floor being washed under strip lighting, tyre marks and oil staining lifting off the concrete ahead of the water.",
    credit: "RainCity Property Maintenance",
    tone: "#6c7075",
    ratio: "16:10",
    focal: "50% 55%",
    placeholder: "Parkade level under strip lights — tyre and oil staining lifting in the pass",
  },

  powerMoss: {
    src: "/services/power-washing/moss-and-traffic-film.webp",
    alt: "Power washing: a close frame of paving slabs with moss packed into the joints, half of it already stripped back to clean stone.",
    credit: "RainCity Property Maintenance",
    tone: "#7f8a6a",
    ratio: "16:10",
    focal: "50% 55%",
    placeholder: "Close on jointed pavers — moss in the joints one side, clean stone the other",
  },

  powerFinish: {
    src: "/services/power-washing/testing-and-protection.webp",
    alt: "Power washing: a planted border wetted down and sheeted before work starts, the wand resting against the wall beside a small test patch.",
    credit: "RainCity Property Maintenance",
    tone: "#7d8f76",
    ratio: "16:10",
    focal: "45% 55%",
    placeholder: "Test patch on a wall with planting sheeted below it — prep, not the wash",
  },

  powerClosing: {
    src: "/services/power-washing/the-colour-underneath.webp",
    alt: "A finished concrete driveway and paved walk running up to a house, the surface even in colour from the garage door out to the kerb.",
    credit: "RainCity Property Maintenance",
    tone: "#b0aca4",
    ratio: "16:9",
    focal: "50% 55%",
    placeholder: "Finished driveway, whole run, even edge to edge — no crew, no equipment",
  },

  // --- Soft Washing --------------------------------------------------------

  softRoofs: {
    src: "/services/soft-washing/shingle-and-tile-roofs.webp",
    alt: "Soft washing: a low-pressure fan of solution laid across an asphalt shingle roof, the treated slope already lighter than the black-streaked one beside it.",
    credit: "RainCity Property Maintenance",
    tone: "#77808a",
    ratio: "16:10",
    focal: "50% 50%",
    placeholder: "Roof slope being treated — low-pressure fan not a jet, treated vs untreated visible",
  },

  softStucco: {
    src: "/services/soft-washing/stucco-and-painted-siding.webp",
    alt: "Soft washing: solution being applied to a stucco wall from a soft-wash nozzle, a clean band opening down the render below the applicator.",
    credit: "RainCity Property Maintenance",
    tone: "#d2cabc",
    ratio: "16:10",
    focal: "52% 50%",
    placeholder: "Stucco wall — soft-wash nozzle close in, clean band opening down the render",
  },

  softCedar: {
    src: "/services/soft-washing/cedar-fascia-soffits.webp",
    alt: "Soft washing: cedar shingles and painted soffits under the eave of a house being rinsed at low pressure, the grain of the timber still intact.",
    credit: "RainCity Property Maintenance",
    tone: "#a08761",
    ratio: "16:10",
    focal: "50% 45%",
    placeholder: "Cedar shingle wall or soffit run — grain intact, low-pressure rinse in progress",
  },

  softFences: {
    src: "/services/soft-washing/fences-and-structures.webp",
    alt: "Soft washing: a timber fence and pergola treated along one run, the cleaned length noticeably lighter where it meets the untreated bays.",
    credit: "RainCity Property Maintenance",
    tone: "#8f8265",
    ratio: "16:10",
    focal: "50% 52%",
    placeholder: "Fence or pergola with a clear treated/untreated boundary along the run",
  },

  softAlgae: {
    src: "/services/soft-washing/algae-lichen-treatment.webp",
    alt: "Soft washing: a close frame of black algal streaking and lichen on a shingle, half of it dissolved away by the treatment.",
    credit: "RainCity Property Maintenance",
    tone: "#6b7168",
    ratio: "16:10",
    focal: "50% 50%",
    placeholder: "Macro on lichen or black streaking, part dissolved — the chemistry doing the work",
  },

  softPlanting: {
    src: "/services/soft-washing/planting-protection.webp",
    alt: "Soft washing: a planted bed under a wall being soaked with clean water before treatment begins, hose in hand and sheeting laid to the wall line.",
    credit: "RainCity Property Maintenance",
    tone: "#6f8355",
    ratio: "16:10",
    focal: "48% 55%",
    placeholder: "Beds being pre-soaked and sheeted at the wall line — before shot, not after",
  },

  softClosing: {
    src: "/services/soft-washing/clean-the-surface-can-take.webp",
    alt: "A rendered house wall and its cedar soffits after a soft wash, the surfaces even in tone and the paint and grain unmarked.",
    credit: "RainCity Property Maintenance",
    tone: "#c7c2b4",
    ratio: "16:9",
    focal: "50% 50%",
    placeholder: "Finished wall and soffit run, even tone, surface undamaged — result only",
  },

  // --- Concrete and Asphalt Sealing ----------------------------------------

  sealingDriveways: {
    src: "/services/concrete-and-asphalt-sealing/residential-driveways.webp",
    alt: "Concrete sealing: sealer drawn across a residential driveway with a squeegee applicator, the sealed half dark and wet against the dry grey ahead of it.",
    credit: "RainCity Property Maintenance",
    tone: "#7a7873",
    ratio: "16:10",
    focal: "50% 58%",
    placeholder: "Driveway mid-application — hard wet/dry line across the slab, applicator in shot",
  },

  sealingLots: {
    src: "/services/concrete-and-asphalt-sealing/parking-lots.webp",
    alt: "Asphalt sealing: a freshly sealed parking lot in deep black, the stall lines not yet repainted and the untreated aisle beyond it faded grey.",
    credit: "RainCity Property Maintenance",
    tone: "#3a3a3c",
    ratio: "16:10",
    focal: "50% 55%",
    placeholder: "Sealed asphalt lot against unsealed — black vs faded grey, wide enough to read",
  },

  sealingWalkways: {
    src: "/services/concrete-and-asphalt-sealing/walkways-and-patios.webp",
    alt: "Concrete sealing: a paved walkway and patio surround being sealed by hand along the edges, the wet sealer picking up the aggregate in the slab.",
    credit: "RainCity Property Maintenance",
    tone: "#9c9890",
    ratio: "16:10",
    focal: "50% 55%",
    placeholder: "Edge and detail work on a walkway or patio — hand application, close in",
  },

  sealingCracks: {
    src: "/services/concrete-and-asphalt-sealing/crack-filling.webp",
    alt: "Asphalt repair: a routed crack being filled with hot-pour rubberised sealant, the black bead standing proud along the length of the run.",
    credit: "RainCity Property Maintenance",
    tone: "#4a4a48",
    ratio: "16:10",
    focal: "50% 55%",
    placeholder: "Hot-pour crack fill in progress — routed crack, wand, bead along the run",
  },

  sealingPrep: {
    src: "/services/concrete-and-asphalt-sealing/surface-prep.webp",
    alt: "Sealing prep: an oil-stained bay being degreased and scrubbed back before sealer is applied, the stain visibly lifting under the brush.",
    credit: "RainCity Property Maintenance",
    tone: "#8b8882",
    ratio: "16:10",
    focal: "50% 58%",
    placeholder: "Oil spot being degreased and scrubbed — stain lifting, prep stage not sealing",
  },

  sealingProduct: {
    src: "/services/concrete-and-asphalt-sealing/sealer-selection.webp",
    alt: "Sealing: two test squares side by side on one slab, the left finished matte by a penetrating sealer and the right carrying the wet sheen of a topical.",
    credit: "RainCity Property Maintenance",
    tone: "#a5a099",
    ratio: "16:10",
    focal: "50% 55%",
    placeholder: "Two sealer test squares on one slab — matte penetrating vs sheen topical",
  },

  sealingClosing: {
    src: "/services/concrete-and-asphalt-sealing/sealed-before-the-freeze.webp",
    alt: "A sealed concrete driveway running down to the kerb on a wet day, rain beading and standing on the surface rather than soaking into it.",
    credit: "RainCity Property Maintenance",
    tone: "#84837e",
    ratio: "16:9",
    focal: "50% 55%",
    placeholder: "Rain beading on a sealed slab — the seal working, shot in real wet weather",
  },

  // --- Gutter Cleaning -----------------------------------------------------

  gutterRuns: {
    src: "/services/gutter-cleaning/runs-cleared-by-hand.webp",
    alt: "Gutter cleaning: a gloved hand lifting packed needles and leaf mould out of a gutter run, a cleared length of bare metal opening up along the eave.",
    credit: "RainCity Property Maintenance",
    tone: "#6a6f62",
    ratio: "16:10",
    focal: "50% 50%",
    placeholder: "Hand clearing a run — packed debris one side, bare gutter floor the other",
  },

  gutterDownspouts: {
    src: "/services/gutter-cleaning/downspouts-flushed.webp",
    alt: "Gutter cleaning: a hose fed into the top of a downspout from the ladder, water running clear out of the elbow at the bottom of the wall.",
    credit: "RainCity Property Maintenance",
    tone: "#7c8288",
    ratio: "16:10",
    focal: "50% 48%",
    placeholder: "Downspout being flushed from the top — clear water leaving the elbow below",
  },

  gutterDebris: {
    src: "/services/gutter-cleaning/debris-bagged.webp",
    alt: "Gutter cleaning: bagged gutter debris standing on a driveway beside a ladder, the beds and lawn under the eaves untouched.",
    credit: "RainCity Property Maintenance",
    tone: "#8e8b7e",
    ratio: "16:10",
    focal: "50% 55%",
    placeholder: "Tied bags on the drive with clean beds behind — proof nothing was dropped",
  },

  gutterFlowTest: {
    src: "/services/gutter-cleaning/flow-test.webp",
    alt: "Gutter cleaning: water running the full length of a cleared gutter and away down the spout during a flow test, the run holding no standing water.",
    credit: "RainCity Property Maintenance",
    tone: "#8fa0ab",
    ratio: "16:10",
    focal: "50% 50%",
    placeholder: "Flow test running — water moving along the run, nothing pooling",
  },

  gutterFascia: {
    src: "/services/gutter-cleaning/fascia-and-brackets.webp",
    alt: "Gutter cleaning: a close frame of a gutter bracket and the fascia behind it, the sealed joint and screw fixings visible along the run.",
    credit: "RainCity Property Maintenance",
    tone: "#a5a29a",
    ratio: "16:10",
    focal: "50% 50%",
    placeholder: "Close on bracket, joint and fascia — the condition check, not the clearing",
  },

  gutterGuards: {
    src: "/services/gutter-cleaning/gutter-guards.webp",
    alt: "Gutter cleaning: a section of mesh gutter guard lifted clear of the run, debris sitting on top of it and the channel beneath already cleaned out.",
    credit: "RainCity Property Maintenance",
    tone: "#767b74",
    ratio: "16:10",
    focal: "50% 50%",
    placeholder: "Guard lifted off with debris on top — the channel underneath already clear",
  },

  gutterClosing: {
    src: "/services/gutter-cleaning/water-where-it-belongs.webp",
    alt: "Rain running off a roofline into a clear gutter and down the spout of a Greater Vancouver house, nothing spilling over the front lip.",
    credit: "RainCity Property Maintenance",
    tone: "#5d6a72",
    ratio: "16:9",
    focal: "50% 45%",
    placeholder: "Roofline in real rain — water going where it should, no overspill; result only",
  },

  // --- Roof Cleaning -------------------------------------------------------

  roofSurfaces: {
    src: "/services/roof-cleaning/shingle-tile-metal.webp",
    alt: "Roof cleaning: a run of asphalt shingles part treated, the cleared course showing its granule surface intact against the mossed course above it.",
    credit: "RainCity Property Maintenance",
    tone: "#7d8388",
    ratio: "16:10",
    focal: "50% 50%",
    placeholder: "Shingle roof half done — granules visibly intact on the cleaned course",
  },

  roofMoss: {
    src: "/services/roof-cleaning/moss-and-lichen.webp",
    alt: "Roof cleaning: thick moss being lifted off a shingle edge with a soft brush, the mat coming away in one piece rather than breaking up.",
    credit: "RainCity Property Maintenance",
    tone: "#6d7a55",
    ratio: "16:10",
    focal: "50% 52%",
    placeholder: "Moss mat lifting off a shingle edge with a soft brush — no lance in frame",
  },

  roofValleys: {
    src: "/services/roof-cleaning/valleys-and-vents.webp",
    alt: "Roof cleaning: a roof valley cleared of needle build-up, the metal channel running clean past a vent stack and a skylight kerb.",
    credit: "RainCity Property Maintenance",
    tone: "#7f8489",
    ratio: "16:10",
    focal: "50% 50%",
    placeholder: "Cleared valley with a vent or skylight kerb in shot — the channel running free",
  },

  roofGutters: {
    src: "/services/roof-cleaning/gutters-after-the-roof.webp",
    alt: "Roof cleaning: gutters being cleared of the moss and grit brought down by the roof work, the run emptied and the roof above it already treated.",
    credit: "RainCity Property Maintenance",
    tone: "#89877c",
    ratio: "16:10",
    focal: "50% 52%",
    placeholder: "Gutter clear-out after the roof — treated roof above must be visible in frame",
  },

  roofFlashing: {
    src: "/services/roof-cleaning/flashing-and-vents.webp",
    alt: "Roof cleaning: a close frame of step flashing at a chimney, the sealant line and the shingle courses either side clear of growth.",
    credit: "RainCity Property Maintenance",
    tone: "#94918a",
    ratio: "16:10",
    focal: "50% 50%",
    placeholder: "Flashing detail at a chimney or vent — the condition check, close and sharp",
  },

  roofTreatment: {
    src: "/services/roof-cleaning/preventative-treatment.webp",
    alt: "Roof cleaning: preventative treatment being applied across a cleaned slope from a low-pressure applicator, the shingles even in colour underneath.",
    credit: "RainCity Property Maintenance",
    tone: "#8b939b",
    ratio: "16:10",
    focal: "50% 50%",
    placeholder: "Preventative pass over an already-clean slope — even colour, low pressure",
  },

  roofClosing: {
    src: "/services/roof-cleaning/a-roof-with-years-left.webp",
    alt: "A cleaned asphalt shingle roof on a Greater Vancouver house under overcast light, the courses even and the ridge and valleys clear of growth.",
    credit: "RainCity Property Maintenance",
    tone: "#6f767c",
    ratio: "16:9",
    focal: "50% 45%",
    placeholder: "Finished roof from the ground, overcast light, courses even — result only",
  },

  // --- Painting ------------------------------------------------------------

  paintInterior: {
    src: "/services/painting/interior-walls-trim.webp",
    alt: "Painting: a decorator cutting in along a ceiling line with a brush, the wall below already rolled and the trim masked off.",
    credit: "RainCity Property Maintenance",
    tone: "#ddd8ce",
    ratio: "16:10",
    focal: "50% 45%",
    placeholder: "Cutting in at a ceiling line — brushwork close, masked trim visible below",
  },

  paintExterior: {
    src: "/services/painting/exterior-siding-fascia.webp",
    alt: "Painting: exterior siding being back-rolled after spraying, the finished boards even in colour against the weathered ones still to come.",
    credit: "RainCity Property Maintenance",
    tone: "#a8b0b6",
    ratio: "16:10",
    focal: "52% 50%",
    placeholder: "Siding half repainted — new colour against weathered, roller or brush in frame",
  },

  paintPrep: {
    src: "/services/painting/washing-scraping-sanding.webp",
    alt: "Painting prep: flaking paint being scraped back to a sound edge on exterior trim, bare timber showing where the failed coating has come away.",
    credit: "RainCity Property Maintenance",
    tone: "#b3aa9c",
    ratio: "16:10",
    focal: "50% 50%",
    placeholder: "Scraping back to a sound edge — bare timber and failed paint both in shot",
  },

  paintCaulking: {
    src: "/services/painting/caulking-and-repair.webp",
    alt: "Painting prep: a bead of caulk run into the joint between siding and trim, tooled smooth along the length of the seam.",
    credit: "RainCity Property Maintenance",
    tone: "#c4bcae",
    ratio: "16:10",
    focal: "50% 52%",
    placeholder: "Caulk bead tooled into a siding-to-trim joint — close enough to see the seam",
  },

  paintPriming: {
    src: "/services/painting/spot-and-full-priming.webp",
    alt: "Painting: primer laid over bare timber patches on an exterior wall, the pale primed areas standing out against the existing finish.",
    credit: "RainCity Property Maintenance",
    tone: "#cfc9bd",
    ratio: "16:10",
    focal: "50% 50%",
    placeholder: "Spot-primed patches on a wall — pale primer islands over the old finish",
  },

  paintProtection: {
    src: "/services/painting/masking-and-tidy.webp",
    alt: "Painting: a room set up for work with drop sheets across the floor, furniture centred and sheeted, and masking run along the skirting.",
    credit: "RainCity Property Maintenance",
    tone: "#c8c4bb",
    ratio: "16:10",
    focal: "50% 55%",
    placeholder: "Room set up before work — drop sheets, sheeted furniture, masked skirting",
  },

  paintClosing: {
    src: "/services/painting/a-finish-that-holds.webp",
    alt: "A repainted house exterior under overcast coastal light, the siding, fascia and trim all even and the cut lines sharp between them.",
    credit: "RainCity Property Maintenance",
    tone: "#9fa9b0",
    ratio: "16:9",
    focal: "50% 50%",
    placeholder: "Finished exterior, overcast light, sharp cut lines between colours — result only",
  },

  // --- Snow Removal & Salting ----------------------------------------------

  snowDriveways: {
    src: "/services/snow-removal-salting/driveways-and-entrances.webp",
    alt: "Snow removal: a residential driveway and front walk cleared to the concrete before dawn, snow banked clear of the parking area on both sides.",
    credit: "RainCity Property Maintenance",
    tone: "#93a3b0",
    ratio: "16:10",
    focal: "50% 55%",
    placeholder: "Driveway cleared before dawn — down to concrete, snow banked off the parking",
  },

  snowLots: {
    src: "/services/snow-removal-salting/strata-and-commercial-lots.webp",
    alt: "Snow removal: a plough clearing the aisles of a strata visitor lot at first light, stall lines showing through behind the blade.",
    credit: "RainCity Property Maintenance",
    tone: "#7f8f9c",
    ratio: "16:10",
    focal: "50% 55%",
    placeholder: "Plough working a lot at first light — stall lines visible behind the blade",
  },

  snowForecast: {
    src: "/services/snow-removal-salting/forecast-and-triggers.webp",
    alt: "Snow removal: a marked depth stake at the edge of a cleared lot with fresh snow measured against it, the truck idling in the background.",
    credit: "RainCity Property Maintenance",
    tone: "#8b98a4",
    ratio: "16:10",
    focal: "45% 52%",
    placeholder: "Depth stake with snow measured against it, truck behind — the trigger, not the clear",
  },

  snowSalting: {
    src: "/services/snow-removal-salting/salting-and-de-icing.webp",
    alt: "Snow removal: de-icer being spread across a cleared walkway by hand, the granules scattered evenly over the wet concrete.",
    credit: "RainCity Property Maintenance",
    tone: "#a4aeb6",
    ratio: "16:10",
    focal: "50% 58%",
    placeholder: "De-icer going down on a cleared walk — even spread, granules readable on the slab",
  },

  snowIce: {
    src: "/services/snow-removal-salting/ice-at-doors-and-steps.webp",
    alt: "Snow removal: compacted ice being chipped clear of a set of building steps and the threshold at the top of them, the handrail cleared alongside.",
    credit: "RainCity Property Maintenance",
    tone: "#9aa8b2",
    ratio: "16:10",
    focal: "50% 55%",
    placeholder: "Ice chipped off steps and a threshold — the highest-liability spot on a site",
  },

  snowContracts: {
    src: "/services/snow-removal-salting/seasonal-contracts.webp",
    alt: "Snow removal: a timestamped site log filled in on the tailgate of a truck at a cleared entrance, salt bags stacked in the bed behind.",
    credit: "RainCity Property Maintenance",
    tone: "#6f7c88",
    ratio: "16:10",
    focal: "48% 52%",
    placeholder: "Timestamped service log on a tailgate, salt in the bed — the liability record",
  },

  snowClosing: {
    src: "/services/snow-removal-salting/open-before-the-first-arrival.webp",
    alt: "A commercial entrance and its walkway cleared and salted at dawn, snow standing untouched on the ground either side of the cleared path.",
    credit: "RainCity Property Maintenance",
    tone: "#7d8b98",
    ratio: "16:9",
    focal: "50% 50%",
    placeholder: "Cleared entrance at dawn, untouched snow either side — no crew, result only",
  },

  // --- Holiday Light Installation ------------------------------------------

  lightsRooflines: {
    src: "/services/holiday-light-installation/rooflines-and-eaves.webp",
    alt: "Holiday lights: a run of warm-white bulbs clipped along the eave of a house at dusk, the line following the roofline evenly to the gable.",
    credit: "RainCity Property Maintenance",
    tone: "#2c3444",
    ratio: "16:10",
    focal: "50% 50%",
    placeholder: "Roofline run at dusk — even spacing, the line true along the whole eave",
  },

  lightsPorches: {
    src: "/services/holiday-light-installation/porches-and-railings.webp",
    alt: "Holiday lights: a front porch with lights wrapped along the columns and railing and a lit wreath on the door, the walk up to it clear.",
    credit: "RainCity Property Maintenance",
    tone: "#33302f",
    ratio: "16:10",
    focal: "50% 52%",
    placeholder: "Porch, columns and railing wrapped, wreath lit — the close-range decorative work",
  },

  lightsTrees: {
    src: "/services/holiday-light-installation/trees-and-garden.webp",
    alt: "Holiday lights: a mature front-garden conifer wrapped in lights against a dark sky, the shrubs beneath it lit at a lower level.",
    credit: "RainCity Property Maintenance",
    tone: "#232b33",
    ratio: "16:10",
    focal: "50% 50%",
    placeholder: "Wrapped tree and lower shrubs at night — depth in the garden, not just the house",
  },

  lightsDesign: {
    src: "/services/holiday-light-installation/layout-and-power.webp",
    alt: "Holiday lights: a marked-up layout sketch of a house frontage held against the real elevation in daylight, run lengths and the outlet noted on it.",
    credit: "RainCity Property Maintenance",
    tone: "#8c9299",
    ratio: "16:10",
    focal: "48% 50%",
    placeholder: "Layout sketch held against the real frontage in daylight — the planning stage",
  },

  lightsService: {
    src: "/services/holiday-light-installation/in-season-repairs.webp",
    alt: "Holiday lights: a technician on a ladder in the rain replacing a dropped section of roofline lighting, spare bulbs and clips on the belt.",
    credit: "RainCity Property Maintenance",
    tone: "#3d4650",
    ratio: "16:10",
    focal: "52% 50%",
    placeholder: "Mid-season fix in the rain — ladder, spare bulbs, a section being replaced",
  },

  lightsTakedown: {
    src: "/services/holiday-light-installation/january-takedown.webp",
    alt: "Holiday lights: runs coiled and labelled into a lidded storage bin in January, clips bagged separately alongside them.",
    credit: "RainCity Property Maintenance",
    tone: "#7f8489",
    ratio: "16:10",
    focal: "50% 52%",
    placeholder: "Labelled coils going into a bin, clips bagged — the takedown, in daylight",
  },

  lightsClosing: {
    src: "/services/holiday-light-installation/lit-from-the-street.webp",
    alt: "A house lit for the season seen from the street at dusk, roofline, porch and garden trees reading as one scheme with no ladder in sight.",
    credit: "RainCity Property Maintenance",
    tone: "#1f2733",
    ratio: "16:9",
    focal: "50% 50%",
    placeholder: "Whole frontage lit, shot from the street at dusk — the scheme, no crew",
  },

  // --- Landscaping & Lawn Care ---------------------------------------------

  lawnMowing: {
    src: "/services/landscaping-lawn-care/mowing-and-edging.webp",
    alt: "Lawn care: a mower mid-pass across a lawn leaving a clean stripe, the cut edge along the bed line sharp behind it.",
    credit: "RainCity Property Maintenance",
    tone: "#5f7d43",
    ratio: "16:10",
    focal: "50% 55%",
    placeholder: "Mower mid-stripe with a sharp bed edge behind — cut quality has to read",
  },

  lawnBeds: {
    src: "/services/landscaping-lawn-care/beds-and-mulch.webp",
    alt: "Landscaping: a planted bed freshly weeded, edged and mulched, the mulch line stopping clean at the lawn.",
    credit: "RainCity Property Maintenance",
    tone: "#6b5b46",
    ratio: "16:10",
    focal: "50% 55%",
    placeholder: "Mulched and edged bed — the mulch-to-lawn line is the whole shot",
  },

  lawnPruning: {
    src: "/services/landscaping-lawn-care/hedge-and-shrub-pruning.webp",
    alt: "Landscaping: a hedge being cut back to a straight line, the trimmed run standing square against the untrimmed growth beyond it.",
    credit: "RainCity Property Maintenance",
    tone: "#4f6b3c",
    ratio: "16:10",
    focal: "52% 50%",
    placeholder: "Hedge half cut — square trimmed face against unruly growth, tool in frame",
  },

  lawnCleanups: {
    src: "/services/landscaping-lawn-care/seasonal-cleanups.webp",
    alt: "Landscaping: a garden mid spring cleanup, cut-back perennials and clipped growth gathered on a tarp with the beds behind already tidied.",
    credit: "RainCity Property Maintenance",
    tone: "#7a7a55",
    ratio: "16:10",
    focal: "50% 55%",
    placeholder: "Cleanup in progress — tarp of arisings, tidied beds behind, work clearly underway",
  },

  lawnLeaves: {
    src: "/services/landscaping-lawn-care/leaf-clearing.webp",
    alt: "Landscaping: autumn leaves being blown clear of a lawn and driveway, a cleared band of grass opening behind the operator.",
    credit: "RainCity Property Maintenance",
    tone: "#8a7443",
    ratio: "16:10",
    focal: "50% 55%",
    placeholder: "Leaf clearing with a clean band behind the operator — leaves still dry",
  },

  lawnSchedule: {
    src: "/services/landscaping-lawn-care/on-a-schedule.webp",
    alt: "Landscaping: a crew loading mowers and green waste back onto a trailer at the kerb, the finished frontage behind them cut and edged.",
    credit: "RainCity Property Maintenance",
    tone: "#6d7a5e",
    ratio: "16:10",
    focal: "50% 55%",
    placeholder: "Loading out at the kerb with the finished frontage behind — the visit ending",
  },

  lawnClosing: {
    src: "/services/landscaping-lawn-care/grounds-that-stay-looked-after.webp",
    alt: "Strata grounds under coastal cloud with the lawn cut, the bed edges cut in and the hedges square along the full frontage.",
    credit: "RainCity Property Maintenance",
    tone: "#5c7448",
    ratio: "16:9",
    focal: "50% 50%",
    placeholder: "Wide finished frontage or strata grounds — no crew, no machines, result only",
  },
} as const satisfies Record<string, Photo>;

export type PhotoKey = keyof typeof photos;
