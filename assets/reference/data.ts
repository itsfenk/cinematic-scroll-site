export const BRAND = {
  name: "NOISEMAKER",
  suffix: "®",
  tagline: "Stand out from the noise.",
  email: "hello@noisemaker.agency",
  phone: "+20 100 555 0134",
  address: "74 Graffiti Lane, Cairo Creative District",
  founded: 2016,
};

export const MARQUEE_WORDS = [
  "MAKE NOISE",
  "STAND OUT",
  "BE UNMISSABLE",
  "STOP THE SCROLL",
  "GET LOUD",
];

export const SERVICES = [
  {
    id: "01",
    title: "Paid Social",
    desc: "Thumb-stopping campaigns on Meta, TikTok and LinkedIn built for the feed, not the billboard.",
    color: "#a855f7",
  },
  {
    id: "02",
    title: "PPC & Search",
    desc: "Google Ads and performance search engineered around intent, margin and ruthless testing.",
    color: "#22d3ee",
  },
  {
    id: "03",
    title: "Creative Studio",
    desc: "Scroll-native video, statics and UGC pipelines producing 40+ assets a month per brand.",
    color: "#c8ff3d",
  },
  {
    id: "04",
    title: "Influencer",
    desc: "Creator partnerships with real audiences and tracked, attributable performance.",
    color: "#f14eff",
  },
  {
    id: "05",
    title: "CRO & Analytics",
    desc: "Landing pages, funnel instrumentation and dashboards that turn clicks into revenue.",
    color: "#a855f7",
  },
  {
    id: "06",
    title: "Brand Strategy",
    desc: "Positioning, voice and identity systems that make the ads land harder.",
    color: "#22d3ee",
  },
];

export const STATS = [
  { value: 4.8, suffix: "x", label: "Average blended ROAS", decimals: 1 },
  { value: 212, suffix: "%", label: "Avg. signup rate lift", decimals: 0 },
  { value: 96, suffix: "M", label: "Monthly search impressions", decimals: 0 },
  { value: 140, suffix: "+", label: "Brands made loud", decimals: 0 },
];

export type CaseStudy = {
  slug: string;
  client: string;
  title: string;
  sector: string;
  image: string;
  accent: string;
  headline: string;
  challenge: string;
  approach: string[];
  results: { value: string; label: string }[];
  quote: { text: string; author: string; role: string };
};

export const CASES: CaseStudy[] = [
  {
    slug: "volt",
    client: "VOLT",
    title: "Turning a sneaker drop into a street riot",
    sector: "Footwear / DTC",
    image: "/images/case-volt.png",
    accent: "#c8ff3d",
    headline: "A drop that sold out in 47 minutes.",
    challenge:
      "VOLT makes limited-run sneakers but was shouting into a saturated feed. Drop after drop under-performed, CPMs climbed, and the hype never converted to carts.",
    approach: [
      "Rebuilt the drop calendar around a 3-week teaser arc with creator seeding",
      "Produced 62 UGC-style cutdowns from a single 2-day shoot",
      "Launched a geo-fenced hype map that unlocked city-by-city early access",
      "Retargeted watch-time segments with dynamic restock alerts",
    ],
    results: [
      { value: "+312%", label: "ROAS vs previous drop" },
      { value: "47 min", label: "Sell-out time" },
      { value: "8.4x", label: "Peak-day revenue" },
    ],
    quote: {
      text: "NOISEMAKER didn't run our ads. they made the whole city feel the drop.",
      author: "Karim Hafez",
      role: "CMO, VOLT",
    },
  },
  {
    slug: "aurea",
    client: "AUREA",
    title: "A perfume launch you could almost smell through the screen",
    sector: "Beauty / Luxury",
    image: "/images/case-aurea.png",
    accent: "#f14eff",
    headline: "12M people watched a bottle float.",
    challenge:
      "AUREA needed to launch its first unisex fragrance in a category where luxury budgets fight for the same three ad slots and sameness wins by default.",
    approach: [
      "Built a cinematic launch film engineered for silent autoplay",
      "Sequenced influencer unboxings against paid amplification waves",
      "Ran scent-profile quizzes that segmented cold traffic into personas",
      "Captured demand with a limited pre-order window and waitlist",
    ],
    results: [
      { value: "12M", label: "Campaign reach" },
      { value: "34%", label: "Waitlist conversion" },
      { value: "2.1x", label: "Launch revenue target" },
    ],
    quote: {
      text: "They turned a product launch into a cultural moment. our waitlist broke twice.",
      author: "Laila Mansour",
      role: "Founder, AUREA",
    },
  },
  {
    slug: "orbit",
    client: "ORBIT",
    title: "Making a fintech app impossible to scroll past",
    sector: "Fintech / App",
    image: "/images/case-orbit.png",
    accent: "#22d3ee",
    headline: "CAC down 38% while installs tripled.",
    challenge:
      "ORBIT's savings app looked like every other fintech. Generic creative, expensive auctions, and a onboarding funnel leaking 70% of installs before activation.",
    approach: [
      "Repositioned around one loud idea: money that moves first",
      "Shipped 40+ feature-led motion assets tested weekly",
      "Rebuilt the onboarding flow with a 4-field signup",
      "Shifted budget to creative-led bidding with margin guardrails",
    ],
    results: [
      { value: "-38%", label: "Customer acquisition cost" },
      { value: "3.1x", label: "Monthly installs" },
      { value: "+64%", label: "Activation rate" },
    ],
    quote: {
      text: "The first agency that treated our unit economics like their own P&L.",
      author: "Omar El-Deeb",
      role: "CEO, ORBIT",
    },
  },
];

export const PROCESS_STEPS = [
  {
    n: "01",
    title: "Audit",
    desc: "Two weeks inside your data, funnel and feed. We map every leak and every wasted impression before spending a pound.",
    color: "#a855f7",
  },
  {
    n: "02",
    title: "Build",
    desc: "Creative pipelines, tracking, landing pages and the testing matrix — the machine gets assembled before the switch flips.",
    color: "#22d3ee",
  },
  {
    n: "03",
    title: "Launch",
    desc: "Campaigns go live in controlled waves. Budget follows signal, not opinions, from day one.",
    color: "#c8ff3d",
  },
  {
    n: "04",
    title: "Scale",
    desc: "Winners get multiplied, losers get killed weekly. Compounding creative volume keeps the machine loud.",
    color: "#f14eff",
  },
];

export const TESTIMONIALS = [
  {
    quote:
      "Our CPMs dropped 41% in the first month. Same budget, louder creative.",
    author: "Karim Hafez",
    role: "CMO, VOLT",
    color: "#c8ff3d",
  },
  {
    quote:
      "They ship more ad variants in a week than our last agency did in a quarter.",
    author: "Laila Mansour",
    role: "Founder, AUREA",
    color: "#f14eff",
  },
  {
    quote:
      "Finally a partner that reports in revenue, not vanity metrics.",
    author: "Omar El-Deeb",
    role: "CEO, ORBIT",
    color: "#22d3ee",
  },
  {
    quote:
      "The drop campaign paid for itself in 6 days. Then it kept going.",
    author: "Nour Abdel Aziz",
    role: "Growth Lead, HEXA Wear",
    color: "#a855f7",
  },
  {
    quote:
      "Our signup rate went from 1.9% to 7.4%. The math is embarrassing.",
    author: "Youssef Kamal",
    role: "CPO, ORBIT",
    color: "#c8ff3d",
  },
  {
    quote:
      "Working with them feels illegal. Like we're reading the examiner's paper.",
    author: "Mariam Fathy",
    role: "Marketing Director, PLUME",
    color: "#f14eff",
  },
];

export const AD_CARDS = [
  { image: "/images/ad-sneaker.png", label: "VOLT — Drop 04" },
  { image: "/images/ad-perfume.png", label: "AUREA — Noir" },
  { image: "/images/ad-energy.png", label: "BOLT — Zero Sugar" },
  { image: "/images/ad-fintech.png", label: "ORBIT — Save Fast" },
  { image: "/images/ad-headphones.png", label: "SONIQ — Bass Lab" },
];

export const FLOATS = [
  { image: "/images/float-star.png", label: "" },
  { image: "/images/float-sphere.png", label: "" },
  { image: "/images/float-bolt.png", label: "" },
  { image: "/images/float-ring.png", label: "" },
];
