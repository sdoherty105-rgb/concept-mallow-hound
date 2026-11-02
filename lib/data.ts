export const CONCEPT_SLUG = "mallow-hound";
export const CONCEPT_URL = `https://offshiftstudio.com.au/concepts/${CONCEPT_SLUG}`;
export const CONCEPT_LABEL = "An OFF/SHIFT concept — fictional demonstration";

export const DEMO_PRICE = "Demonstration price. Invented for this concept, not a quote.";
export const DEMO_SCHEDULE = "Demonstration schedule. Not a live timetable.";
export const DEMO_SLOTS = "Demonstration week. These slots are invented, not a live diary.";
export const DEMO_PROMISE = "Demonstration promise. Not a real policy.";

export type CoatId = "short" | "double" | "curly" | "long" | "wiry";
export type SizeId = "small" | "medium" | "large" | "giant";
export type PackageId = "fresh-start" | "full-mallow" | "shed-less" | "puppy-debut";

export type AccentName = "mint" | "butter" | "cobalt" | "tangerine" | "grape";

export interface Coat {
  id: CoatId;
  name: string;
  examples: string;
  care: string;
  timeFactor: number;
  packageId: PackageId;
  why: string;
  accent: AccentName;
}

export interface Size {
  id: SizeId;
  name: string;
  range: string;
  examples: string;
  priceAdd: number;
  timeFactor: number;
  scale: number;
}

export interface GroomPackage {
  id: PackageId;
  name: string;
  tagline: string;
  basePrice: number;
  baseMinutes: number;
  includes: string[];
  bestFor: string;
  tint: "lavender" | "mint" | "coral" | "cream";
}

export const COATS: Coat[] = [
  {
    id: "short",
    name: "Short & smooth",
    examples: "Think whippet, staffy, labrador, boxer.",
    care: "A weekly rub-down with a rubber brush keeps shedding in check between visits.",
    timeFactor: 0.9,
    packageId: "fresh-start",
    accent: "mint",
    why: "Smooth coats don’t need a haircut. A proper bath, a good dry and a tidy of the nails and ears keeps them glossy.",
  },
  {
    id: "double",
    name: "Double & fluffy",
    examples: "Think husky, golden retriever, border collie, samoyed.",
    care: "Brush through to the skin twice a week. We’ll show you where the undercoat likes to hide.",
    timeFactor: 1.1,
    packageId: "shed-less",
    accent: "butter",
    why: "A thick undercoat needs releasing, not cutting. A treatment bath and rake-out lifts the loose fluff so your house (and your dog) can breathe.",
  },
  {
    id: "curly",
    name: "Curly & woolly",
    examples: "Think poodle, cavoodle, groodle, bichon.",
    care: "Brush to the skin every couple of days. Curls knot fast, especially behind the ears.",
    timeFactor: 1.1,
    packageId: "full-mallow",
    accent: "cobalt",
    why: "Curly coats keep growing and tangle easily. A full groom with a haircut in the style you choose keeps them comfy and easy to brush.",
  },
  {
    id: "long",
    name: "Long & silky",
    examples: "Think shih tzu, maltese, cocker spaniel, yorkie.",
    care: "Brush daily if you can, a few minutes is plenty. Feathering on ears and legs loves to tangle.",
    timeFactor: 1.05,
    packageId: "full-mallow",
    accent: "tangerine",
    why: "Long coats are happiest with a trim and style to keep the length manageable, so we pair the bath with a full finish.",
  },
  {
    id: "wiry",
    name: "Wiry & scruffy",
    examples: "Think schnauzer, border terrier, jack russell, irish terrier.",
    care: "Brush weekly and keep the beard dry and combed. Wiry coats hold on to everything the garden offers.",
    timeFactor: 1,
    packageId: "full-mallow",
    accent: "grape",
    why: "Wiry coats look their best with a tidy of the beard, brows and legs, so a full groom keeps the scruffy charm without the scruff.",
  },
];

export const SIZES: Size[] = [
  { id: "small", name: "Small", range: "Under 10 kg", examples: "Maltese, cavoodle, dachshund", priceAdd: 0, timeFactor: 1, scale: 0.62 },
  { id: "medium", name: "Medium", range: "10 to 22 kg", examples: "Beagle, cocker, border terrier", priceAdd: 20, timeFactor: 1.2, scale: 0.78 },
  { id: "large", name: "Large", range: "22 to 35 kg", examples: "Labrador, border collie, boxer", priceAdd: 45, timeFactor: 1.45, scale: 0.92 },
  { id: "giant", name: "Giant", range: "35 kg and over", examples: "Great dane, bernese, newfoundland", priceAdd: 75, timeFactor: 1.75, scale: 1.04 },
];

export const PACKAGES: GroomPackage[] = [
  {
    id: "fresh-start",
    name: "Fresh Start",
    tagline: "Bath, blow-dry and a tidy-up for smooth coats, or a refresh between full grooms.",
    basePrice: 79,
    baseMinutes: 60,
    includes: [
      "Warm-water bath with gentle, tear-free shampoo",
      "Conditioning rinse and a fluffy blow-dry",
      "Full brush-out",
      "Ear clean and nail trim",
      "Paw-pad and sanitary tidy",
      "Finishing spritz of coconut-and-oat dog cologne",
    ],
    bestFor: "Short and smooth coats, or any dog between full grooms.",
    tint: "mint",
  },
  {
    id: "full-mallow",
    name: "The Full Mallow",
    tagline: "Everything in Fresh Start plus a full haircut in the style you choose.",
    basePrice: 119,
    baseMinutes: 105,
    includes: [
      "Everything in Fresh Start",
      "Full haircut: clipper and scissor work to your chosen style",
      "Face, feet and tail finishing",
      "Light de-tangling included",
      "Bandana or bow to go home in",
    ],
    bestFor: "Curly, long and wiry coats that keep growing.",
    tint: "lavender",
  },
  {
    id: "shed-less",
    name: "Shed Less",
    tagline: "An undercoat release for thick, fluffy double coats, with no haircut needed.",
    basePrice: 129,
    baseMinutes: 100,
    includes: [
      "Deshedding shampoo and conditioning treatment",
      "High-velocity dry to lift loose undercoat",
      "Undercoat rake-out and brush-through",
      "Ear clean and nail trim",
      "Paw-pad and sanitary tidy",
    ],
    bestFor: "Double coats that shed in clouds: huskies, goldens, collies.",
    tint: "coral",
  },
  {
    id: "puppy-debut",
    name: "Puppy Debut",
    tagline: "A gentle, treat-filled first groom for pups under six months.",
    basePrice: 59,
    baseMinutes: 45,
    includes: [
      "Lukewarm splash bath with puppy-mild shampoo",
      "Dryer introduced on the lowest setting",
      "Gentle nail touch-up and face and feet tidy",
      "Plenty of treats and short breaks",
    ],
    bestFor: "Puppies once their vaccinations are complete. Pick it when you book.",
    tint: "cream",
  },
];

export const ADD_ONS = [
  { name: "Teeth brushing", price: "$12", note: "Dog-safe poultry-flavoured paste." },
  { name: "Blueberry facial", price: "$10", note: "A gentle tear-stain and face scrub." },
  { name: "Paw balm", price: "$8", note: "Soothes pads after hot Perth pavements." },
  { name: "Flea and tick bath", price: "$18", note: "Medicated bath, applied with a calm hand." },
  { name: "Extra de-tangling", price: "From $15", note: "Per 10 minutes, quoted before we start." },
];

export function getPackage(id: PackageId): GroomPackage {
  const found = PACKAGES.find((p) => p.id === id);
  if (!found) throw new Error(`Unknown package ${id}`);
  return found;
}

export function getCoat(id: CoatId): Coat {
  const found = COATS.find((c) => c.id === id);
  if (!found) throw new Error(`Unknown coat ${id}`);
  return found;
}

export function getSize(id: SizeId): Size {
  const found = SIZES.find((s) => s.id === id);
  if (!found) throw new Error(`Unknown size ${id}`);
  return found;
}

export interface Recommendation {
  package: GroomPackage;
  coat: Coat;
  size: Size;
  price: number;
  minutes: number;
}

const roundToFive = (n: number) => Math.round(n / 5) * 5;

export function recommend(coatId: CoatId, sizeId: SizeId): Recommendation {
  const coat = getCoat(coatId);
  const size = getSize(sizeId);
  const pack = getPackage(coat.packageId);
  return {
    package: pack,
    coat,
    size,
    price: pack.basePrice + size.priceAdd,
    minutes: roundToFive(pack.baseMinutes * size.timeFactor * coat.timeFactor),
  };
}

export function formatDuration(minutes: number): string {
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  if (h === 0) return `${m} min`;
  if (m === 0) return `${h} hr`;
  return `${h} hr ${m} min`;
}

export type Zone = 1 | 2;

export interface Suburb {
  name: string;
  zone: Zone;
  x: number;
  y: number;
  /** Invented demonstration visit window. Not a live timetable. */
  visit: string;
}

export const ZONE_FEES: Record<Zone, number> = { 1: 0, 2: 15 };

export const SUBURBS: Suburb[] = [
  { name: "Mallow Bay", zone: 1, x: 250, y: 205, visit: "Fridays, 8 to 12" },
  { name: "Quandong Rise", zone: 1, x: 330, y: 160, visit: "Tuesdays, 9 to 1" },
  { name: "Tuart Hollow", zone: 1, x: 330, y: 255, visit: "Wednesdays, 8 to 12" },
  { name: "Coolibah Park", zone: 1, x: 410, y: 205, visit: "Thursdays, 12 to 4" },
  { name: "Saltbush Heads", zone: 1, x: 205, y: 125, visit: "Mondays, 8 to 12" },
  { name: "Wattlebird Flats", zone: 1, x: 205, y: 290, visit: "Mondays, 12 to 4" },
  { name: "Kingfisher Reach", zone: 2, x: 480, y: 120, visit: "Fridays, 1 to 4" },
  { name: "Marri Springs", zone: 2, x: 520, y: 235, visit: "Tuesdays, 1 to 4" },
  { name: "Pelican Hill", zone: 2, x: 130, y: 205, visit: "Wednesdays, 1 to 4" },
  { name: "Boronia Downs", zone: 2, x: 440, y: 320, visit: "Thursdays, 8 to 12" },
  { name: "Sandplain Ridge", zone: 2, x: 360, y: 60, visit: "Saturdays, 8 to 12" },
];

export const norm = (s: string) =>
  s
    .toLowerCase()
    .replace(/[^a-z\s]/g, " ")
    .replace(/\s+/g, " ")
    .trim();

export type SuburbCheck =
  | { kind: "empty" }
  | { kind: "covered"; suburb: Suburb }
  | { kind: "outside"; query: string; suggestions: Suburb[] };

export function checkSuburb(query: string): SuburbCheck {
  const q = norm(query);
  if (!q) return { kind: "empty" };
  const exact = SUBURBS.find((s) => norm(s.name) === q);
  if (exact) return { kind: "covered", suburb: exact };
  const suggestions = SUBURBS.filter((s) => {
    const n = norm(s.name);
    return n.includes(q) || (q.length >= 3 && n.startsWith(q.slice(0, 3)));
  });
  if (suggestions.length === 1 && q.length >= 4 && norm(suggestions[0].name).startsWith(q)) {
    return { kind: "covered", suburb: suggestions[0] };
  }
  return { kind: "outside", query: query.trim(), suggestions };
}

export const PROMISES = [
  {
    title: "One dog at a time",
    body: "No kennels, no cage dryers, no waiting room full of barking. Your dog has the van to themselves.",
  },
  {
    title: "A proper hello first",
    body: "We meet your dog at the door, offer a sniff and a treat, and let them set the pace before anything starts.",
  },
  {
    title: "Breaks whenever they need",
    body: "Wobbly paws, a worried look or a big sigh means we pause. A short walk around the van is part of the groom.",
  },
  {
    title: "Warm water, quiet tools",
    body: "Water is always warm, and the dryer runs on the lowest setting that gets the job done.",
  },
  {
    title: "We stop if they’re not coping",
    body: "If your dog is too stressed, we finish what’s comfortable, and rebook a shorter visit at no extra charge.",
  },
  {
    title: "You’re always in the loop",
    body: "Stay home or stay close. We’ll text you when we start and when we’re nearly done, and tell you exactly how it went.",
  },
];

export const FAQS = [
  {
    q: "Do I need to be home during the groom?",
    a: "Not necessarily. Many owners are, but you only need to be reachable and have given us a clear place to park. We’ll text when we arrive and again when your dog is ready for their handover.",
  },
  {
    q: "What does the van need from me?",
    a: "Just a flat spot about the length of a large van, ideally in front of your home. We carry our own heated water and power, so there’s nothing for you to plug in or hook up.",
  },
  {
    q: "My dog gets anxious. Can you still groom them?",
    a: "Very likely, yes. Tell us when you book and we’ll allow extra time, begin with a hello, and take breaks. If it isn’t working for your dog, we stop and rebook a shorter visit. That promise is a demonstration, not a real policy.",
  },
  {
    q: "What if my dog’s coat is matted?",
    a: "Mats are uncomfortable, so we’ll never pull them out. Light de-tangling is part of The Full Mallow. If your dog is heavily matted we’ll quote a gentle clip-down or extra brushing time before we start.",
  },
  {
    q: "How are prices worked out?",
    a: "Price depends on the package your dog’s coat suits and their size. Our coat selector shows both, plus the time it usually takes. Homes in our outer zone add a flat $15 travel fee.",
  },
  {
    q: "Can I book for a puppy?",
    a: "Yes, with Puppy Debut, once your pup has finished their vaccinations. It’s a short, gentle first groom that teaches them the dryer and the bath are nothing to worry about.",
  },
  {
    q: "What happens if I need to reschedule?",
    a: "Just let us know at least 24 hours before your slot and we’ll move it for free. Later changes may incur a small fee, since the van’s day is planned around you.",
  },
  {
    q: "Is this a real booking?",
    a: "No. Mallow Hound is a fictional concept created by OFF/SHIFT Studio. The booking form is a demonstration and doesn’t send or store anything.",
  },
];

export const HOURS = [
  { day: "Monday to Friday", time: "8:00 am – 5:00 pm" },
  { day: "Saturday", time: "8:00 am – 1:00 pm" },
  { day: "Sunday", time: "Resting (the van gets a wash too)" },
];
