/**
 * Photo registry — the single source of truth for every image on the site.
 *
 * Replacing stock with RainCity's own job photography is a one-file edit:
 * swap `src` (and `credit`) for each slot and everything downstream updates.
 *
 * Every `src` is a local path under `public/`. Nothing is fetched from a
 * third-party host at runtime, which is why `next.config.ts` declares no
 * remote image patterns — adding one back would mean a page could go blank
 * because somebody else's CDN changed.
 *
 * Where a frame came from is recorded in `credit`, and the originals every
 * served file was made from are archived flat in `assets/`. Several of the
 * eleven services have no genuine "crew performing the work" photograph
 * available, so those slots use the subject or the finished result instead
 * of a staged substitute — see the `note` field on each.
 */

export type PhotoRatio = "16:9" | "16:10" | "7:5" | "4:5" | "3:2" | "1:1";

export type Photo = {
  /** Path under `public/`. Always local — see the note at the top. */
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

/** A flat-tone placeholder in the photo's dominant colour, for blur-up. */
export function tonePlaceholder(tone: string): string {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="8" height="8"><rect width="8" height="8" fill="${tone}"/></svg>`;
  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
}

export const photos = {
  hero: {
    src: "/hero.webp",
    alt: "Suburban homes set among tall evergreens under low coastal fog — the kind of Greater Vancouver property RainCity maintains year-round.",
    credit: "Anastasiia",
    tone: "#262626",
    ratio: "16:9",
    focal: "70% 55%",
    note: "Shot in Canada. Residential, evergreen, fogbound — the Greater Vancouver property this business actually maintains, in the weather that creates the work. Alternate: photo-1768333220836-26309aacd3db (Ali Kazal, a foggy residential street in Victoria BC) if a lighter, hazier frame is wanted.",
  },

  aboutCrew: {
    src: "/about-section-picture.webp",
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
    src: "/truck.webp",
    alt: "A white panel van of the kind RainCity works out of, parked at the kerb outside a brick building.",
    credit: "Mathias Reding",
    tone: "#c0c0c0",
    ratio: "1:1",
    focal: "50% 50%",
    note: "Stands in for the branded truck in a strata driveway. Swap for a signage shot once the fleet is wrapped. Carried full-bleed as the /blog banner — the one real frame in this registry with no other slot, and a van at the kerb suits a page of notes from the crew better than another photograph of a service does. The source is square and smaller than the other banner frames, so the slot holds it high; a frame shot for that banner should replace it. The alt text was tightened when this ran at full column width on an earlier /about layout: at that size 'a residential street' was visibly not what the frame shows.",
  },

  /**
   * Branded fleet — the slot for RainCity's wrapped service vehicle.
   *
   * Placeholder until the vehicle wrap is complete and the photograph is shot.
   * When ready: shoot the truck in a recognisable Greater Vancouver setting
   * (a strata driveway or a residential street), convert to 1920×774 webp,
   * save at /fleet.webp, and delete the `placeholder` line below. The /blog
   * hero and the About page can then both reference this key.
   *
   * Shot brief: van in three-quarter view, full signage visible, weather-wet
   * street optional — the company works in the rain and a dry-day photo of a
   * cleaning truck is a missed story. Background should read "Greater Vancouver"
   * (a strata driveway, a heritage-house frontage or a commercial car park),
   * not a generic kerb or a parking lot anywhere.
   */
  fleet: {
    src: "/fleet.webp",
    alt: "RainCity Property Maintenance's branded service vehicle, ready for a day of work in Greater Vancouver.",
    credit: "RainCity Property Maintenance",
    tone: "#1A5FA8",
    ratio: "16:9",
    focal: "50% 50%",
    placeholder: "Branded RainCity fleet vehicle in three-quarter view, full signage visible, Greater Vancouver setting",
  },

  // --- About page ----------------------------------------------------------

  aboutHero: {
    src: "/about-us-hero-background.webp",
    alt: "A single-family Greater Vancouver home with a grey composite roof, tucked among mature evergreens behind a trimmed hedge and paved walkway.",
    credit: "RainCity Property Maintenance",
    tone: "#4f5f3f",
    ratio: "16:9",
    focal: "70% 62%",
    note: "About page hero banner, rendered with `fill` so this ratio is nominal only. Focal keeps the house (right two-thirds of the frame, extending to the bottom edge) in view rather than the tree canopy that fills the upper-left.",
  },

  aboutWhoWeAre: {
    src: "/about-us-who-we-are-section-background.webp",
    alt: "A RainCity technician silhouetted against a bright sky, running a pressure-washing wand along a rooftop edge.",
    credit: "RainCity Property Maintenance",
    tone: "#a9c8e0",
    ratio: "1:1",
    focal: "46% 50%",
    note: "Who We Are figure on /about. Served at 1600x1232 (1.3:1), converted from the 2530x1948 original in `assets/`; cropped to the card's 1:1, the frame keeps its full height and loses only the outer ~12% of width, so the horizontal focal barely matters — set to hold the technician just left of centre.",
  },

  aboutProcess: {
    src: "/about-us-our-process-section-background.webp",
    alt: "A smiling RainCity technician in a navy apron holding a spray bottle and a folded microfiber cloth.",
    credit: "RainCity Property Maintenance",
    tone: "#f0eee8",
    ratio: "7:5",
    focal: "50% 40%",
    note: "Our Process figure on /about. Served at 1600x1232 (1.3:1), converted from the 2530x1948 original in `assets/`, against the section's 7:5 (1.4:1) crop, so the top/bottom lose about 7% combined; focal is held slightly high to keep the face clear of the crop.",
  },

  servicesHero: {
    src: "/our-services-hero-background.webp",
    alt: "A RainCity technician on a tiled Greater Vancouver roof running a pressure-washing wand across a row of solar panels under a clear blue sky.",
    credit: "RainCity Property Maintenance",
    tone: "#9ec3e2",
    ratio: "16:9",
    focal: "54% 30%",
    note: "Services page hero banner, rendered with `fill` so this ratio is nominal only. Focal holds the technician and roofline in the upper-centre of the frame, leaving the sky (left of the subject) as the quiet ground the heading sits over.",
  },

  servicesOffer: {
    src: "/what-we-offer-section-background.webp",
    alt: "A cleaner in rubber gloves carefully wiping down a blackout curtain beside a sunlit window.",
    credit: "RainCity Property Maintenance",
    tone: "#5b6570",
    ratio: "7:5",
    focal: "50% 40%",
    note: "What We Offer figure on /services. Served at 1600x1232 (1.3:1), converted from the 2530x1948 original in `assets/`, against the section's 7:5 (1.4:1) crop, so the top/bottom lose about 7% combined; focal is held slightly high to keep the face clear of the crop.",
  },

  // --- Contact page ---------------------------------------------------------

  contactHero: {
    src: "/contact-hero.webp",
    alt: "A foggy residential street on a Greater Vancouver hillside, evergreens rising above the rooflines and cloud settled low over the trees beyond.",
    credit: "Ali Kazal",
    tone: "#a9b0ac",
    ratio: "16:9",
    focal: "62% 55%",
    note: "Contact page hero banner, rendered with `fill` so this ratio is nominal only. The same frame flagged as an alternate for the homepage `hero` above — lighter and hazier — with the houses and evergreens held right of centre so the open, fogbound sky on the left carries the heading and breadcrumb.",
  },

  rooftops: {
    src: "/rooftops.webp",
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
    src: "/roof-clean.webp",
    alt: "An asphalt-shingle roof after cleaning, free of moss and debris.",
    credit: "Yucel M",
    tone: "#595959",
    ratio: "3:2",
    focal: "50% 50%",
  },

  roofMossy: {
    src: "/roof-mossy.webp",
    alt: "A tile roof carpeted in moss before cleaning, the tiles barely visible beneath it.",
    credit: "Nick Kane",
    tone: "#7a6a55",
    ratio: "3:2",
    focal: "50% 50%",
    note: "Held for the Projects before/after pair. The roofCleaning slot now carries RainCity's own finished-work photograph, which cannot double as a 'before'.",
  },

  mossyConcrete: {
    src: "/mossy-concrete.webp",
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
    src: "/soft-washing.webp",
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
    src: "/painting.webp",
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


  // --- The remaining eight services: scope tiles and closing bands ---------
  //
  // Fifty-six slots on the Window Cleaning pattern — six 16:10 tile frames and
  // one 16:9 closing band per service. Window Cleaning, Commercial Cleaning
  // and Power Washing carry the client's own photography and sit above.
  //
  // Forty-eight of the fifty-six below now carry an Unsplash frame, chosen per
  // slot against the shot brief that used to be its `placeholder` string. That
  // brief is preserved in each `note`, along with what the chosen frame does
  // and does not show — several are close, several argue only half of what the
  // tile beside them claims, and two or three are stand-ins. Read the note
  // before assuming a slot is finished.
  //
  // These are stock. `credit` says "Unsplash" rather than naming a
  // photographer: the licence does not require attribution and the names were
  // not verifiable from the search pages, so a name was not invented. If the
  // client wants photographer credits, they have to be looked up per photo.
  //
  // Eight slots are still `placeholder`, and they are the same kind of thing
  // in every case — process documentation that stock photography does not
  // contain. A timestamped service log on a tailgate, two sealer test squares
  // on one slab, a layout sketch held against a frontage, labelled coils going
  // into a bin. These are photographs a crew takes on a job, or they are made,
  // and no search will turn them up. Everything else about each entry is already written:
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
    alt: "Commercial cleaning: an empty lift lobby with two stainless steel lift doors, the polished floor and its blue inlay stripes running unbroken to full-height glazing on the left.",
    credit: "RainCity Property Maintenance",
    tone: "#ced2d6",
    ratio: "16:10",
    focal: "55% 45%",
    note: "Shows the finished state, not the job. The brief asked for a lit lobby after hours with matting down and the entrance glass being worked; this is daylight, no matting, no technician and nothing in progress. It reads closer to a closing band than a scope tile. A lit after-hours frame with a cleaner at the entrance glass is what the copy beside it describes.",
  },

  commercialCorridors: {
    src: "/services/commercial-cleaning/corridors-stairwells.webp",
    alt: "Commercial cleaning: three cleaners in blue uniforms working a carpeted atrium walkway, the nearest drawing a vacuum wand along the floor with a carpet machine running behind him.",
    credit: "RainCity Property Maintenance",
    tone: "#87989b",
    ratio: "16:10",
    focal: "60% 50%",
    note: "The closest of the six to its brief — vacuum and machine both in frame, and three people visibly working a shift rather than posing. The carpet does not show the parallel passes the copy mentions; the light across it is too flat for them to read. An atrium walkway rather than a corridor proper, which is the right kind of space either way.",
  },

  commercialWashrooms: {
    src: "/services/commercial-cleaning/washrooms-restocking.webp",
    alt: "Commercial cleaning: a housekeeper in a grey tunic wiping a mirror with a lilac microfibre cloth above a marble washroom counter, glasses and amenity bottles set out below.",
    credit: "RainCity Property Maintenance",
    tone: "#928e81",
    ratio: "16:10",
    focal: "55% 45%",
    note: "Holds because the colour-coded cloth the copy turns on is unmistakable — that is the detail a property manager reads as method rather than tidying. It is a hotel ensuite rather than a commercial washroom, though: no cubicles and no wall dispensers, so the restocking half of the tile has nothing in the frame to point at.",
  },

  commercialFloors: {
    src: "/services/commercial-cleaning/floors-and-matting.webp",
    alt: "Commercial cleaning: an operative in navy overalls walking a scrubber-drier across a tiled floor, the machine's red brush head visible at the front of the deck.",
    credit: "RainCity Property Maintenance",
    tone: "#a18e69",
    ratio: "16:10",
    focal: "52% 55%",
    note: "The machine is exactly right — a walk-behind scrubber-drier, not a mop and bucket, which is the distinction the copy draws. What is missing is the one thing both the copy and this slot's brief lean on: a clean/dirty line. The floor is uniformly clean, so nothing in the frame shows the pass actually doing anything.",
  },

  commercialBackOfHouse: {
    src: "/services/commercial-cleaning/back-of-house.webp",
    alt: "Commercial cleaning: four colour-separated recycling bins lined up against pale cabinetry, holding glass, plastics, flattened card and cans.",
    credit: "RainCity Property Maintenance",
    tone: "#909792",
    ratio: "16:10",
    focal: "50% 50%",
    note: "The weakest match in the set. This tile is loading bays and bin rooms — swept and hosed, bins squared against a painted wall — and the frame is a recycling station at domestic scale in a fitted kitchen. Waste separation is genuinely part of the contract, so it is not off-topic, but nothing here reads as back-of-house. First of the two frames on this page to replace.",
  },

  commercialSchedule: {
    src: "/services/commercial-cleaning/scope-and-schedule.webp",
    alt: "Commercial cleaning: a uniformed technician standing at a door with a clipboard in one hand and a tool bag in the other, a work van parked on the drive behind him.",
    credit: "RainCity Property Maintenance",
    tone: "#706c5f",
    ratio: "16:10",
    focal: "50% 45%",
    note: "Reads residential rather than commercial — a house door, a tool bag and a van on a drive, where the tile is about an agreed scope signed off at a service entrance with the cart in shot. It is also the one posed, straight-to-camera frame in a set that is otherwise people at work, which is the stock-photo register the rest of the site stays clear of. The clipboard is the right idea; it needs to be at a commercial service door.",
  },

  commercialClosing: {
    src: "/services/commercial-cleaning/a-building-that-looks-managed.webp",
    alt: "Two commercial elevations meeting against an open sky — pale cladding on one side, a blue glass curtain wall on the other, both clean to the top floor.",
    credit: "RainCity Property Maintenance",
    // Rendered with `fill`, so this is nominal. Source is 3200x1290 (2.48:1).
    ratio: "16:9",
    tone: "#9bb7d6",
    focal: "50% 55%",
    note: "No people and no equipment, which is what a closing band wants — the result, not the work. It is the building rather than the finished lobby the brief described, and it earns the swap: the heading is about a building that looks managed, and this is that building. Pale and bright like the Window Cleaning band, so the navy scrim over it carries the same weight here.",
  },

  // --- Power Washing -------------------------------------------------------

  powerDriveways: {
    src: "/services/power-washing/driveways-walkways.webp",
    alt: "Power washing: an operator running a wheeled surface cleaner across paving beside a dark brick house, spray driving out from under the head and the slab wet behind it.",
    credit: "RainCity Property Maintenance",
    tone: "#637272",
    ratio: "16:10",
    focal: "62% 50%",
    note: "On brief, and the tool is the point — a wheeled surface cleaner rather than a bare wand, which is what keeps a pass even and what the copy claims. The clean/dirty edge is softer than the brief asked for: the whole slab is wet, so the contrast reads as wet against dry more than clean against dirty.",
  },

  powerSiding: {
    src: "/services/power-washing/siding-brick-stone.webp",
    alt: "Power washing: a lance held up to a buff stone-clad wall, the spray fanning across the courses beside a white-framed window.",
    credit: "RainCity Property Maintenance",
    tone: "#818482",
    ratio: "16:10",
    focal: "55% 50%",
    note: "Stone frontage, operator in frame, jet on the wall — the tile's three requirements, all present. Two softer points: the water is not yet sheeting down the courses the way the copy describes, and the apron-over-shirt kit reads domestic rather than a uniformed crew on a job.",
  },

  powerDecks: {
    src: "/services/power-washing/decks-steps-railings.webp",
    alt: "Power washing: a lance played across the treads of a pale stone stair and the paving at its foot, potted geraniums lined along the wall behind.",
    credit: "RainCity Property Maintenance",
    tone: "#9f9b99",
    ratio: "16:10",
    focal: "50% 55%",
    note: "Steps yes, decks no. The tile carries decks, steps and railings, and its copy turns on timber going grey-green and coming back pale — there is no timber in the frame, so the half-done contrast it describes has nothing to sit on. Same subject and apron as the siding tile, which at least makes the two read as one visit rather than two stock buys.",
  },

  powerParkades: {
    src: "/services/power-washing/parkades-loading-bays.webp",
    alt: "Power washing: an operator in overalls and waterproof boots working a lance across grey paving slabs, the spray driving grime out of the joint line.",
    credit: "RainCity Property Maintenance",
    tone: "#9c9d93",
    ratio: "16:10",
    focal: "56% 50%",
    note: "Two things to know. It was supplied at 3200x1290 — the closing-band size, not the 2560x1600 the other tiles came at — so it is cropped to 16:10 here rather than squashed, the window pushed right to hold the lance and the wet slab and drop the empty hose run on the left. And it contradicts the tile it sits in: this slot is parkades and loading bays, its copy turns on tyre rubber and oil under strip lighting, and the frame is an exterior terrace in daylight. Either a parkade frame replaces it or the tile takes a different subject; as it stands the photograph argues against the words.",
  },

  powerMoss: {
    src: "/services/power-washing/moss-and-traffic-film.webp",
    alt: "Power washing: an operator in hi-vis waterproofs washing down a kerb line seen from above, the jet driving traffic film off the channel where asphalt meets block paving.",
    credit: "RainCity Property Maintenance",
    tone: "#595851",
    ratio: "16:10",
    focal: "50% 45%",
    note: "Traffic film, yes — and the overhead angle is the strongest composition anywhere in the two sets. Not the tile's other half: no moss packed into paver joints and no side-by-side of treated against untreated, which is the comparison the copy asks the reader to look for. It is also municipal street work, a heavier register than the strata and residential properties the rest of the page addresses.",
  },

  powerFinish: {
    src: "/services/power-washing/testing-and-protection.webp",
    alt: "Power washing: an operator in red waterproofs washing a paved path along the edge of a lawn, water running off the slabs into the grass.",
    credit: "RainCity Property Maintenance",
    tone: "#958259",
    ratio: "16:10",
    focal: "45% 60%",
    note: "The furthest of the six from its slot, and the reason matters. This tile is surface testing and site protection — a test patch, planting sheeted down, prep before anything is washed — and the frame is the wash itself with the lawn taking the runoff unprotected. It shows the opposite of the care the copy is selling. Second of the two frames on this page to replace.",
  },

  powerClosing: {
    src: "/services/power-washing/the-colour-underneath.webp",
    alt: "Power washing: a lance raised to the render of a white wall beside a shuttered window, the raised arm and the hose the only things breaking a plain elevation.",
    credit: "RainCity Property Maintenance",
    // Rendered with `fill`, so this is nominal. Source is 3200x1290 (2.48:1).
    ratio: "16:9",
    tone: "#e1e1e2",
    focal: "60% 50%",
    note: "Breaks the rule the Window Cleaning band set: a closing band is the result and not the work, and there is an operator and a lance in this one. The heading promises the colour underneath and the wall is already white, so the frame cannot show what it offers. It does sit well under type — very pale, and empty across the left where the heading lands.",
  },

  // --- Soft Washing --------------------------------------------------------

  softRoofs: {
    src: "/services/soft-washing/shingle-and-tile-roofs.webp",
    alt: "Soft washing: a roof slope carrying an unbroken layer of moss from ridge to eaves, the tiles beneath it barely showing through, with dark forest behind.",
    credit: "Unsplash",
    tone: "#858c35",
    ratio: "16:10",
    focal: "50% 50%",
    note: "The condition, not the cure. This tile is a slope being treated with a low-pressure fan and the treated half standing against the untreated one, and none of that is in the frame — no operator, no solution, no boundary. What it does show is why the service exists on a wet coast, and it shows it at a scale a homeowner recognises. The method argument is carried by the stucco tile instead.",
  },

  softStucco: {
    src: "/services/soft-washing/stucco-and-painted-siding.webp",
    alt: "Soft washing: an operator holding a lance at waist height and laying a wide, soft fan of solution across the elevation of a house.",
    credit: "Unsplash",
    tone: "#708f9e",
    ratio: "16:10",
    focal: "45% 55%",
    note: "The most useful frame on this page, because the fan is unmistakable — broad, low and falling rather than a hard jet, which is the entire distinction soft washing rests on and the one thing a photograph can settle. The wall itself is out of frame at the left, so the clean band opening down the render is inferred. Portrait source, cropped to a band.",
  },

  softCedar: {
    src: "/services/soft-washing/cedar-fascia-soffits.webp",
    alt: "Soft washing: courses of cedar shingles in warm red-brown, the grain and the saw marks still clear across every butt.",
    credit: "Unsplash",
    tone: "#bc8268",
    ratio: "16:10",
    focal: "50% 50%",
    note: "Grain intact is the phrase the brief used and it is what this frame is about — cedar that still reads as timber rather than as furred, blasted fibre, which is what pressure does to it. No rinse in progress: this is the surface the method protects, not the method.",
  },

  softFences: {
    src: "/services/soft-washing/fences-and-structures.webp",
    alt: "Soft washing: a weathered timber picket fence gone silver-grey along its run, dark foliage massed behind it.",
    credit: "Unsplash",
    tone: "#393b38",
    ratio: "16:10",
    focal: "50% 50%",
    note: "A fence in the state that brings the call, which the tile needs. It does not have the boundary the brief asked for — a treated length running into an untreated one along the same run, which is the single most persuasive thing this service can show and the hardest to find in stock.",
  },

  softAlgae: {
    src: "/services/soft-washing/algae-lichen-treatment.webp",
    alt: "Soft washing: green algae running in vertical streaks down a cream-painted wall, the paint blistered and lifting where the growth is heaviest.",
    credit: "Unsplash",
    tone: "#9c9c73",
    ratio: "16:10",
    focal: "50% 50%",
    note: "Close enough to read as a macro and it shows the argument the copy makes — that the growth is not just a stain, it is holding water against the surface and taking the finish with it. Part-dissolved is missing: the brief wanted the chemistry caught halfway through, and this is entirely the before. Portrait source, cropped to a band.",
  },

  softPlanting: {
    src: "/services/soft-washing/planting-protection.webp",
    alt: "Soft washing: a worker running a hose over the clipped shrubs planted along the foot of a building wall.",
    credit: "Unsplash",
    tone: "#9ba29f",
    ratio: "16:10",
    focal: "50% 55%",
    note: "Planting being watered down at the wall line, which is the first half of the tile and the step the copy says is skipped most often. The sheeting is not there, so the frame shows the pre-soak without the cover that follows it. Portrait source, cropped to a band.",
  },

  softClosing: {
    src: "/services/soft-washing/clean-the-surface-can-take.webp",
    alt: "The corner of a house against a clear sky, the siding running even in colour into the soffit above with no streaking anywhere along the run.",
    credit: "Unsplash",
    // Rendered with `fill`, so this is nominal.
    ratio: "16:9",
    tone: "#47556b",
    focal: "50% 55%",
    note: "Wall and soffit in one frame, even in tone and undamaged, with nobody in it — which is the band brief almost word for word. The one thing it cannot show is that it was ever otherwise, so the band depends on the tiles above having established what the surface looked like before.",
  },

  // --- Concrete and Asphalt Sealing ----------------------------------------

  sealingDriveways: {
    src: "/services/concrete-and-asphalt-sealing/residential-driveways.webp",
    alt: "Concrete and asphalt sealing: an operator drawing a squeegee across asphalt, the sealed surface behind the head dark and wet against the paler surface still to be covered.",
    credit: "Unsplash",
    tone: "#69625d",
    ratio: "16:10",
    focal: "45% 55%",
    note: "Meets the brief on both counts the tile depends on: the applicator is in shot, and there is a hard line across the slab between what has been pulled and what has not. It is the one frame in this set that shows sealing as an action rather than as a finish.",
  },

  sealingLots: {
    src: "/services/concrete-and-asphalt-sealing/parking-lots.webp",
    alt: "Concrete and asphalt sealing: a wide asphalt run curving away between mown grass and trees, the surface even and dark from edge to edge.",
    credit: "Unsplash",
    tone: "#737762",
    ratio: "16:10",
    focal: "50% 55%",
    note: "Shows a surface in the state sealing leaves it — even, dark, no bleached patches — across enough area to read as more than a driveway. The comparison the brief asked for is missing: sealed against unsealed in one frame, black beside faded grey, is what makes the argument by itself, and there is nothing here to measure against. Portrait source, cropped to a band.",
  },

  sealingWalkways: {
    src: "/services/concrete-and-asphalt-sealing/walkways-and-patios.webp",
    alt: "Concrete and asphalt sealing: a sealed walkway running through parkland, the surface unbroken and the edges holding a clean line against the grass either side.",
    credit: "Unsplash",
    tone: "#6f6b70",
    ratio: "16:10",
    focal: "50% 55%",
    note: "A walkway with its edges intact, which is what this tile is about — edges are where a path fails first and where a roller cannot reach. It is the finished run rather than the hand work: the brief wanted a close frame of someone cutting the detail in by hand, and this is the result of that work seen from standing height. Portrait source, cropped to a band.",
  },

  sealingCracks: {
    src: "/services/concrete-and-asphalt-sealing/crack-filling.webp",
    alt: "Concrete and asphalt sealing: an operator laying a bead of hot-pour sealant along a joint with a torch applicator, the finished bead running black across the slab behind their boots.",
    credit: "Unsplash",
    tone: "#78767a",
    ratio: "16:10",
    focal: "45% 55%",
    note: "Hot-pour in progress with the wand down and the bead already run — the brief almost exactly, and the frame that best explains why crack filling is a separate job from sealing rather than part of the same pass. The crack underneath is not visibly routed out first, which is the step the copy says the bead depends on.",
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
    alt: "Rain standing in separate beads across a dark sealed surface rather than soaking into it, each drop holding its own shape.",
    credit: "Unsplash",
    // Rendered with `fill`, so this is nominal.
    ratio: "16:9",
    tone: "#6b737d",
    focal: "50% 50%",
    note: "The band brief exactly: water beading rather than being absorbed is the seal doing its work, and on this coast it is the only proof that matters. No crew, no equipment, and shot close enough that the drops read at band size.",
  },

  // --- Gutter Cleaning -----------------------------------------------------

  gutterRuns: {
    src: "/services/gutter-cleaning/runs-cleared-by-hand.webp",
    alt: "Gutter cleaning: fallen maple leaves lying packed along the floor of a gutter run below the edge of a tiled roof.",
    credit: "Unsplash",
    tone: "#7a6961",
    ratio: "16:10",
    focal: "50% 55%",
    note: "The run and what fills it, which is the condition the tile exists to describe. Neither half of the brief's comparison is here — no hand working the channel, and no length of bare gutter floor beside the packed section to show what clearing it looks like. Portrait source, cropped to a band.",
  },

  gutterDownspouts: {
    src: "/services/gutter-cleaning/downspouts-flushed.webp",
    alt: "Gutter cleaning: water running clear out of the elbow at the foot of a downspout and falling away onto the ground below.",
    credit: "Unsplash",
    tone: "#1a1915",
    ratio: "16:10",
    focal: "50% 50%",
    note: "Exactly the proof the tile asks for — clear water leaving the elbow, which is the only way to know a downpipe runs the whole way and is not holding a blockage halfway up. The flushing itself is off-frame at the top, so the picture shows the result of the check rather than the check. Dark frame, so the blur-up tone is near-black by design.",
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
    alt: "Gutter cleaning: water running the length of a dark green gutter in heavy rain, the channel carrying it along rather than holding it.",
    credit: "Unsplash",
    tone: "#133b43",
    ratio: "16:10",
    focal: "50% 50%",
    note: "Water moving along a run with nothing pooling, which is what the tile wants shown. It is rain doing the testing rather than a hose — the brief's flow test is a deliberate check at the end of a visit, and a downpour is not that, though it is the same evidence. Portrait source, cropped to a band.",
  },

  gutterFascia: {
    src: "/services/gutter-cleaning/fascia-and-brackets.webp",
    alt: "Gutter cleaning: a close view of a gutter bracket and the joint where the channel meets the fascia board under the roof edge.",
    credit: "Unsplash",
    tone: "#736652",
    ratio: "16:10",
    focal: "50% 50%",
    note: "Bracket, joint and fascia in one close frame, which is the three things the condition check actually looks at and the three the brief named. Nothing in it is failing, so it shows what is being inspected rather than what inspection finds. Portrait source, cropped to a band.",
  },

  gutterGuards: {
    src: "/services/gutter-cleaning/gutter-guards.webp",
    alt: "Gutter cleaning: dry leaves caught in a drift on top of a mesh gutter guard, held above the channel running underneath.",
    credit: "Unsplash",
    tone: "#a9968b",
    ratio: "16:10",
    focal: "50% 55%",
    note: "Makes the tile's point on its own: the guard is doing its job and the debris is sitting on top of it rather than in the channel. The brief wanted the guard lifted off with the clear channel visible beneath, which would prove the second half — here the reader has to take the clear channel on trust.",
  },

  gutterClosing: {
    src: "/services/gutter-cleaning/water-where-it-belongs.webp",
    alt: "A roofline under a grey sky, the gutter running level along the fascia and the downpipe taking water away at the corner.",
    credit: "Unsplash",
    // Rendered with `fill`, so this is nominal.
    ratio: "16:9",
    tone: "#767878",
    focal: "50% 50%",
    note: "The whole system in one frame and nothing overflowing anywhere along it, which is the band's argument. Overcast rather than actually raining as the brief asked — the sky is the right grey, but water going where it should is inferred from the level of the run rather than watched happening.",
  },

  // --- Roof Cleaning -------------------------------------------------------

  roofSurfaces: {
    src: "/services/roof-cleaning/shingle-tile-metal.webp",
    alt: "Roof cleaning: a worker standing on an asphalt shingle slope working a hand tool across the courses, the siding and window of the upper storey behind him.",
    credit: "Unsplash",
    tone: "#9098a1",
    ratio: "16:10",
    focal: "45% 50%",
    note: "Stock, and it is a shingle roof being worked by hand at close quarters, which is the register the tile wants. Two gaps: the courses are uniform, so the half-done contrast the copy leans on is not in the frame, and the tool is lifting shingles rather than cleaning them — street clothes, no PPE, which reads as a homeowner rather than a crew.",
  },

  roofMoss: {
    src: "/services/roof-cleaning/moss-and-lichen.webp",
    alt: "Roof cleaning: cushions of moss spreading across the courses of a dark shingle roof, thickest along the lower edge above the gutter.",
    credit: "Unsplash",
    tone: "#565a62",
    ratio: "16:10",
    focal: "50% 50%",
    note: "The problem, not the treatment. This tile asks for a moss mat being lifted with a soft brush and there is no brush and no hand in the frame. As a condition shot it is accurate and it is genuinely a shingle roof, which is what the copy's method depends on. Portrait source, so the 16:10 crop takes a band through the middle of it.",
  },

  roofValleys: {
    src: "/services/roof-cleaning/valleys-and-vents.webp",
    alt: "Roof cleaning: two dormers set into a tiled slope, the channels where their cheeks meet the main roof running clear down to the eaves.",
    credit: "Unsplash",
    tone: "#626569",
    ratio: "16:10",
    focal: "50% 55%",
    note: "The dormers are what put valleys in this frame — the tile's subject is the channel where two planes meet, and each dormer makes two of them. No vent or skylight kerb as the brief asked, and nothing is being cleared: it is the geometry, not the work.",
  },

  roofGutters: {
    src: "/services/roof-cleaning/gutters-after-the-roof.webp",
    alt: "Roof cleaning: clumps of moss sitting along a roof edge directly above an open gutter run, the length of the channel visible against a clear sky.",
    credit: "Unsplash",
    tone: "#35526e",
    ratio: "16:10",
    focal: "50% 50%",
    note: "Puts roof and gutter in one frame, which is the composition this tile is built on. It is the wrong end of the job, though — the tile is the clear-out that follows the roof, with the treated slope above visible, and here the slope is still carrying its moss. This is the before.",
  },

  roofFlashing: {
    src: "/services/roof-cleaning/flashing-and-vents.webp",
    alt: "Roof cleaning: a skylight and a vent pipe set into a terracotta tiled slope, the tiles cut and closed around both upstands.",
    credit: "Unsplash",
    tone: "#8e4726",
    ratio: "16:10",
    focal: "50% 50%",
    note: "The upstands are the points a flashing check actually looks at, and the frame is close and sharp as the tile asks. Terracotta rather than the shingle the rest of this page describes, and no chimney — the penetrations are the subject here more than the flashing that seals them.",
  },

  roofTreatment: {
    src: "/services/roof-cleaning/preventative-treatment.webp",
    alt: "Roof cleaning: an operator in a white coverall laying an even spray across a roof surface from a hand lance, the treated area wet and pale behind the pass.",
    credit: "Unsplash",
    tone: "#88989e",
    ratio: "16:10",
    focal: "55% 55%",
    note: "The best match on this page for a low-pressure preventative pass: an even fan rather than a jet, an operator kitted up, and nothing being blasted. The geometry is wrong — a flat roof being coated, not a pitched slope being treated — but the method reads correctly, which is what the tile is arguing.",
  },

  roofClosing: {
    src: "/services/roof-cleaning/a-roof-with-years-left.webp",
    alt: "A suburban house seen from above, its grey shingle roof even in colour across every course from ridge to eaves.",
    credit: "Unsplash",
    // Rendered with `fill`, so this is nominal.
    ratio: "16:9",
    tone: "#7a806a",
    focal: "50% 50%",
    note: "No crew and no equipment, which is what a closing band wants. Shot from the air rather than from the ground as the brief asked, and in bright sun rather than the overcast the copy pictures — but it is the one frame available that shows a whole roof reading as uniformly sound, which is the argument the band is making.",
  },

  // --- Painting ------------------------------------------------------------

  paintInterior: {
    src: "/services/painting/interior-walls-trim.webp",
    alt: "Painting: a brush drawn along the boundary between a pale new coat and the colour underneath, the wet edge left clean and straight across the wall.",
    credit: "Unsplash",
    tone: "#acbbaa",
    ratio: "16:10",
    focal: "50% 50%",
    note: "The skill the tile is about is in the frame — a brush held to a line, and an edge that stays straight because a hand kept it there. Not the setting the brief asked for: no ceiling line and no masked trim below, so it reads as cutting one colour against another rather than cutting in at a junction. Portrait source, cropped to a band.",
  },

  paintExterior: {
    src: "/services/painting/exterior-siding-fascia.webp",
    alt: "Painting: a decorator on a stepladder reaching up to lay colour along the upper wall of a red building, working past the window heads and shutters.",
    credit: "Unsplash",
    tone: "#604739",
    ratio: "16:10",
    focal: "55% 50%",
    note: "Exterior work at height with the painter and the wall both in frame, which is the tile's subject. The half-and-half the brief wanted — new colour meeting weathered on the same run — is not readable here; the elevation is already one colour, so the frame shows the work without showing what it changes. Portrait source, cropped to a band.",
  },

  paintPrep: {
    src: "/services/painting/washing-scraping-sanding.webp",
    alt: "Painting: a hand working a scraper along a painted timber edge, lifting the old finish away in flakes and leaving bare wood behind the blade.",
    credit: "Unsplash",
    tone: "#744d39",
    ratio: "16:10",
    focal: "55% 50%",
    note: "The best match of the six. Bare timber and failed paint are both in the frame with the tool between them, which is exactly what the brief asked for and exactly the argument the copy makes — that the finish is only as good as what was taken off first.",
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
    alt: "Painting: a roller laying a pale coat across a wall, the covered band standing out against the older finish still showing to one side.",
    credit: "Unsplash",
    tone: "#c3c2bc",
    ratio: "16:10",
    focal: "50% 50%",
    note: "Pale coat going over an older one with the boundary visible, which is the substance of the tile. It is a roller laying a full coat rather than the spot-primed islands the brief described — the frame shows priming as an area, not as patches, so the copy's point about treating only what needs it has to carry itself.",
  },

  paintProtection: {
    src: "/services/painting/masking-and-tidy.webp",
    alt: "Painting: a decorator on a ladder taping sheeting over a window below the eaves, the covered opening squared off against the siding around it.",
    credit: "Unsplash",
    tone: "#5b7176",
    ratio: "16:10",
    focal: "55% 50%",
    note: "Masking and sheeting before a brush is opened, which is the whole point of the tile — the frame shows the covering being done properly rather than a room already covered. It is an exterior window, where the brief asked for a room set up inside with drop sheets and masked skirting, so it argues the principle in the wrong place.",
  },

  paintClosing: {
    src: "/services/painting/a-finish-that-holds.webp",
    alt: "A painted timber house under a bright sky, the body colour running clean to the white window trim and gable boards with every line held straight.",
    credit: "Unsplash",
    // Rendered with `fill`, so this is nominal.
    ratio: "16:9",
    tone: "#74888e",
    focal: "50% 55%",
    note: "The band wants the result and the sharp cut lines between colours, and both are here — body against trim, held straight the length of every board and around each opening. Bright sky rather than the overcast the brief asked for, which costs it a little: strong sun flattens the very edges the frame is meant to show off.",
  },

  // --- Snow Removal & Salting ----------------------------------------------

  snowDriveways: {
    src: "/services/snow-removal-salting/driveways-and-entrances.webp",
    alt: "Snow removal: an operator walking a snow blower up a driveway, the cleared strip running back to the garage between banks of snow thrown clear on both sides.",
    credit: "Unsplash",
    tone: "#b9b6b3",
    ratio: "16:10",
    focal: "45% 55%",
    note: "Close to the brief: cleared down to the surface, and the snow is banked off the run rather than pushed into it, which is the distinction the copy draws about where snow ends up. Daylight rather than the before-dawn the tile asks for, so it loses the one detail that says this happened before anybody needed to leave.",
  },

  snowLots: {
    src: "/services/snow-removal-salting/strata-and-commercial-lots.webp",
    alt: "Snow removal: a plough truck with its blade angled and down, pushing a windrow of snow along a road with a car waiting behind it.",
    credit: "Unsplash",
    tone: "#757a81",
    ratio: "16:10",
    focal: "45% 55%",
    note: "The blade is working and the windrow is forming, which is the machine and the action the tile names. It is a road rather than a parking lot: the stall lines the brief wanted visible behind the blade — the detail that says a lot was cleared to its markings and not just opened up — are not here.",
  },

  snowForecast: {
    src: "/services/snow-removal-salting/forecast-and-triggers.webp",
    alt: "Snow removal: a loader working under its own lights at first light, a pile of cleared snow stacked at the edge of an open lot against a deep blue sky.",
    credit: "Unsplash",
    tone: "#324262",
    ratio: "16:10",
    focal: "50% 55%",
    note: "Stands in for the brief rather than meeting it. The tile is about the trigger — a depth stake with snow measured against it, the truck behind, the decision to turn out — and there is no stake and no measurement here. What it does carry is the hour: lights on, sky still blue-black, a machine already working, which is the part of the argument about turning out before the site wakes up. Replace it if a depth-stake frame ever exists.",
  },

  snowSalting: {
    src: "/services/snow-removal-salting/salting-and-de-icing.webp",
    alt: "Snow removal: a compact tractor with a broom on the front and a hopper spreader on the back working a city footway through falling snow.",
    credit: "Unsplash",
    tone: "#616865",
    ratio: "16:10",
    focal: "50% 55%",
    note: "The hopper on the back is the reason this frame is here — it is a spreader, so the tile about de-icer going down has a machine that actually spreads it, clearing and treating in one pass exactly as the copy describes. What it cannot show at this distance is the even spread and the readable granules on the slab the brief asked for; that is a close frame and this is a street one.",
  },

  snowIce: {
    src: "/services/snow-removal-salting/ice-at-doors-and-steps.webp",
    alt: "Snow removal: an outdoor flight of steps under unbroken snow, the metal handrail running down beside treads whose edges have disappeared.",
    credit: "Unsplash",
    tone: "#867f74",
    ratio: "16:10",
    focal: "50% 50%",
    note: "Steps are the subject, and steps are what this tile is about — the highest-liability spot on any site and the reason the copy singles them out. It is the hazard rather than the fix: the brief wanted ice already chipped off a tread and a threshold, and here nothing has been touched. Portrait source, so the 16:10 crop takes a band across the flight.",
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
    alt: "A suburban street from above after a snowfall, every driveway and path cleared to the surface while the lawns and roofs either side are still under snow.",
    credit: "Unsplash",
    // Rendered with `fill`, so this is nominal. Source is natively 16:9.
    ratio: "16:9",
    tone: "#646777",
    focal: "50% 50%",
    note: "The band's argument in one frame: cleared where it has to be, untouched everywhere else, and nobody in shot. Natively 16:9, so it takes the closing crop without losing anything at the edges. From the air rather than at an entrance as the brief described, which suits a band that has to read at a glance.",
  },

  // --- Holiday Light Installation ------------------------------------------

  lightsRooflines: {
    src: "/services/holiday-light-installation/rooflines-and-eaves.webp",
    alt: "Holiday light installation: a run of large coloured bulbs clipped along the eave and gable of a house at dusk, the spacing even the whole length of the line.",
    credit: "Unsplash",
    tone: "#424a56",
    ratio: "16:10",
    focal: "50% 45%",
    note: "Meets the brief on the detail that matters: the spacing is even and the line follows the eave rather than sagging off it, which is the difference between an installed run and a thrown-up one and is the whole of this tile's argument. Dusk, as asked — bulbs lit and the roof still readable behind them.",
  },

  lightsPorches: {
    src: "/services/holiday-light-installation/porches-and-railings.webp",
    alt: "Holiday light installation: a covered porch lit along its eave and down the posts, with a wreath at the door and seating set out below.",
    credit: "Unsplash",
    tone: "#5e4638",
    ratio: "16:10",
    focal: "50% 50%",
    note: "Porch, posts and a lit wreath in one frame, which is the close-range decorative work the tile describes. The railing is not wrapped, so one of the four elements the brief listed is missing — and the cabling, which the copy makes a point of routing out of sight, is not visible either way at this distance.",
  },

  lightsTrees: {
    src: "/services/holiday-light-installation/trees-and-garden.webp",
    alt: "Holiday light installation: a small conifer lit in a snow-covered garden with a further run of lights picked out along the fence line behind it.",
    credit: "Unsplash",
    tone: "#5a6278",
    ratio: "16:10",
    focal: "50% 50%",
    note: "Carries the point the tile is actually making — that a scheme which stops at the house is flat, and lighting into the garden is what gives it depth. Tree in front, fence run behind, dark between them. The lower shrubs the brief also wanted are not in it. Portrait source, cropped to a band.",
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
    alt: "A large house seen from the street at night with its eaves, gables, porch and garden all lit in warm white, the whole frontage reading as one scheme.",
    credit: "Unsplash",
    // Rendered with `fill`, so this is nominal.
    ratio: "16:9",
    tone: "#4b3918",
    focal: "50% 50%",
    note: "The scheme rather than any part of it, shot from where a neighbour would see it, with nobody in frame — which is what the band brief asked for. Night rather than dusk, so the building is carried entirely by the lights and the roofline reads only where a run traces it; a dusk frame would hold both.",
  },

  // --- Landscaping & Lawn Care ---------------------------------------------

  lawnMowing: {
    src: "/services/landscaping-lawn-care/mowing-and-edging.webp",
    alt: "Landscaping and lawn care: two groundskeepers working a lawn together, one riding a mower along a cut stripe while the other trims the edge of the planted bed beside it.",
    credit: "Unsplash",
    tone: "#566a56",
    ratio: "16:10",
    focal: "45% 55%",
    note: "The closest match anywhere in this set. The brief asked for a mower mid-stripe with a sharp bed edge behind it and both are here in one frame, along with the thing the copy actually sells — two people on the same visit, cut and edge done together rather than a lawn mown and the borders left. Wide source (600x280 native), so the 16:10 crop is taken from a letterbox and loses nothing at the sides.",
  },

  lawnBeds: {
    src: "/services/landscaping-lawn-care/beds-and-mulch.webp",
    alt: "Landscaping and lawn care: a planted bed dressed with bark mulch and held by a low stone edge, petunias and silver foliage set through it.",
    credit: "Unsplash",
    tone: "#655043",
    ratio: "16:10",
    focal: "50% 55%",
    note: "The mulch is the subject and it is dressed evenly, which is what the tile is about. The edge in the frame is stone, not turf — this tile's brief calls the mulch-to-lawn line the whole shot, and that line is the one thing missing. A bed cut against grass would say it better.",
  },

  lawnPruning: {
    src: "/services/landscaping-lawn-care/hedge-and-shrub-pruning.webp",
    alt: "Landscaping and lawn care: a hedge trimmer held level against the face of a hedge, the operator in a green jacket and gloves working just behind the blade.",
    credit: "Unsplash",
    tone: "#40442e",
    ratio: "16:10",
    focal: "45% 50%",
    note: "Tool in frame and close to the work, which is what the tile asked for. No half-cut boundary: the brief wanted a square trimmed face standing against growth still to do, and this is a single face mid-pass, so nothing in the frame shows the difference the cut makes.",
  },

  lawnCleanups: {
    src: "/services/landscaping-lawn-care/seasonal-cleanups.webp",
    alt: "Landscaping and lawn care: a groundskeeper in a hi-vis vest working a line trimmer through a flowering border, cut growth lying where it has fallen.",
    credit: "Unsplash",
    tone: "#6e7a44",
    ratio: "16:10",
    focal: "45% 50%",
    note: "Work clearly under way on planted ground, which is the half of the brief that matters most. The tarp of arisings is not in it — that was the detail meant to show the clearing away rather than the cutting, and without it this reads as maintenance in progress rather than a seasonal clean-up.",
  },

  lawnLeaves: {
    src: "/services/landscaping-lawn-care/leaf-clearing.webp",
    alt: "Landscaping and lawn care: an operator working a leaf blower under a golden autumn tree, fallen leaves lying thick across the grass and path in front of him.",
    credit: "Unsplash",
    tone: "#c58f50",
    ratio: "16:10",
    focal: "50% 55%",
    note: "Unambiguously the job, in the season the copy is written for, and the leaves are dry as the brief specified — wet leaf is a different and slower task. The clean band behind the operator is not readable here; the frame is taken from the front, so the cleared ground is behind the camera rather than in the picture.",
  },

  lawnSchedule: {
    src: "/services/landscaping-lawn-care/on-a-schedule.webp",
    alt: "Landscaping and lawn care: a groundskeeper in a hi-vis vest working beside a clipped hedge at the foot of a building, the hedge squared off along the wall behind him.",
    credit: "Unsplash",
    tone: "#828277",
    ratio: "16:10",
    focal: "45% 50%",
    note: "Weakest of the seven. The tile is a visit ending — loading out at the kerb with the finished frontage behind — and none of that is here: no van, no kerb, no loading. What it does carry is the right context, a uniformed groundskeeper on commercial rather than domestic ground, which is the audience this tile addresses. Portrait source, so the 16:10 crop takes a band. Worth replacing when a real end-of-visit frame exists.",
  },

  lawnClosing: {
    src: "/services/landscaping-lawn-care/grounds-that-stay-looked-after.webp",
    alt: "A house frontage with the lawn cut evenly to a low retaining wall, clipped shrubs set along the planting and every edge closed off.",
    credit: "Unsplash",
    // Rendered with `fill`, so this is nominal.
    ratio: "16:9",
    tone: "#718056",
    focal: "50% 55%",
    note: "No crew and no machines, and every line the page has been arguing about is visible at once — the cut, the edge against the wall, the shrubs held to shape. A residential frontage rather than the strata grounds the brief offered as the alternative, which suits the band: it is the scale most readers are picturing.",
  },
} as const satisfies Record<string, Photo>;

export type PhotoKey = keyof typeof photos;
