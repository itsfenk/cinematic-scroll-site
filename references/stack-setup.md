# Stack Setup

Target stack: Next.js 16 (App Router) + TypeScript + Tailwind CSS 4 + GSAP ScrollTrigger + Lenis + Prisma/SQLite. The sandbox template project already ships Next/Tailwind/shadcn/Prisma — add only GSAP and Lenis.

```bash
bun add gsap lenis
bun run dev        # port 3000, logs to dev.log
bun run lint
```

## 0. Style variants — pick ONE, keep the NAMES

The reference build ships **Variant A (Neon dark)**. Every variant below keeps the SAME token names (`ink`, `panel`, `panel2`, `violetx`, `violetdeep`, `cyanx`, `limex`, `magentax`, `fog`, `chalk`) and the SAME CSS variable names (`--font-display`, `--font-sans`) and FX utility class names — only VALUES change. This is deliberate: the copy-adapted components in `assets/reference/` reference tokens and utility classes by name, so a variant is a find-replace of values, never a refactor.

`violetx`/`cyanx`/`limex`/`magentax` are NAMES, not promises: in Variant B, `violetx` IS vermilion.

| Variant | Temperament | Pick when |
|---|---|---|
| **A — Neon dark** (proven block in §2 below) | loud, nocturnal, youth | music, streetwear, agencies, gaming |
| **B — Editorial light** | quiet confidence, culture | galleries, publications, craft brands, studios |
| **C — Mono brutalist** | raw, technical, anti-polish | dev tools, events, zines, street culture |
| **D — Warm luxury** | heritage, sensual, expensive | fragrance, hospitality, jewelry, architecture |

Full blocks — replace §2's token values with one of these:

```css
/* B — Editorial light: Fraunces (display, 600-700, italics for moments) + Inter (body) */
--color-ink: #f7f4ee;        /* page bg = warm paper (name stays "ink") */
--color-panel: #efe9df;
--color-panel2: #e7dfd2;
--color-violetx: #e8480c;    /* primary accent = vermilion */
--color-violetdeep: #c23a08;
--color-cyanx: #1f3a8c;      /* secondary accent = ink blue */
--color-limex: #16130e;      /* CTA = near-black solid */
--color-magentax: #8c6f46;   /* extra = bronze */
--color-fog: #6f675c;        /* secondary text */
--color-chalk: #16130e;      /* primary text = near-black (name stays "chalk") */

/* C — Mono brutalist: Archivo Black (display) + Space Grotesk (body) */
--color-ink: #ffffff;        /* page bg */
--color-panel: #f2f2f2;
--color-panel2: #e6e6e6;
--color-violetx: #d8ff3a;    /* primary accent = acid */
--color-violetdeep: #b8dd21;
--color-cyanx: #000000;
--color-limex: #d8ff3a;      /* CTA = acid block */
--color-magentax: #ff3f3f;
--color-fog: #8a8a8a;
--color-chalk: #000000;      /* primary text */

/* D — Warm luxury: Cormorant Garamond (display, 500-600) + Jost (body) */
--color-ink: #16110d;        /* page bg = espresso */
--color-panel: #241c15;
--color-panel2: #2e241b;
--color-violetx: #c9a45c;    /* primary accent = gold */
--color-violetdeep: #a9853f;
--color-cyanx: #7a9e9f;      /* secondary = sage */
--color-limex: #c9a45c;      /* CTA = gold */
--color-magentax: #b0563a;   /* extra = terracotta */
--color-fog: #a08e7d;
--color-chalk: #f3ece1;      /* primary text = bone */
```

Per-variant FX overrides (keep class names, change definitions):

| Utility | A Neon dark | B Editorial light | C Mono brutalist | D Warm luxury |
|---|---|---|---|---|
| `.text-stroke` color | chalk @ .28 | ink @ .22 | void @ .35 | gold @ .35 |
| `.glow-*` | as shown in §2 | delete (accent = solid color) | delete (accent = solid block + hard shadow) | 1 subtle layer: `0 0 24px rgba(201,164,92,.18)` |
| `.grain::after` opacity | .06 | .04 | none (remove class usage) | .05 |
| blend device | `blend-lighten` on black | `mix-blend-mode: multiply` imagery | none | none (use crops + vignette) |
| radius language | 12-24px | 0-2px | 0px everywhere + `border-2` + hard shadow `4px 4px 0` | 0px + hairlines `rgba(201,164,92,.35)` |

Blend assets (floaters, 3D logo) sit on pure black with `blend-lighten` (gotcha #6) — **Variant A ONLY**: lighten physically needs a near-black page behind it. Variants B/C (light pages) and D (dark, but vignette-driven by design) place imagery as normal masked crops — generate on the variant's page tone, never blend-lighten. When an archetype's motion hook suggests a blend effect but the chosen variant forbids it, the VARIANT CONTRACT WINS — re-express the motion as parallax/masks/crops.

## 1. Fonts (app/layout.tsx)

Variant A default — display font **Syne** (headlines, weights up to 800 — its quirkiness carries the brand), body **Space Grotesk**. For variants B/C/D swap the Google font wired into the SAME two variables (pairings in §0); never rename the variables:

```tsx
const syne = Syne({ variable: "--font-syne", subsets: ["latin"],
  weight: ["400","500","600","700","800"], display: "swap" });
const grotesk = Space_Grotesk({ variable: "--font-grotesk", subsets: ["latin"],
  weight: ["300","400","500","600","700"], display: "swap" });
// <body className={`${syne.variable} ${grotesk.variable} antialiased ...`}>
```

## 2. globals.css — theme tokens + FX utilities

Tailwind 4 inline theme. This is the full **Variant A — Neon dark** palette (for variants B/C/D swap the values per §0, keep the names):

```css
@theme inline {
  --font-sans: var(--font-grotesk);
  --font-display: var(--font-syne);
  /* neon dark system */
  --color-ink: #08060e;        /* page background */
  --color-panel: #120e20;      /* card surface */
  --color-panel2: #1a1430;     /* raised surface */
  --color-violetx: #a855f7;    /* primary neon */
  --color-violetdeep: #7c3aed;
  --color-cyanx: #22d3ee;
  --color-limex: #c8ff3d;      /* accent / CTA */
  --color-magentax: #f14eff;
  --color-fog: #9b94b0;        /* secondary text */
  --color-chalk: #f4f2fa;      /* primary text */
}
```

FX utilities (copy verbatim — every recipe depends on them):

```css
.blend-lighten { mix-blend-mode: lighten; }
.text-stroke { -webkit-text-stroke: 1.5px rgba(244,242,250,.28); color: transparent; }
.text-stroke-violet { -webkit-text-stroke: 1.5px rgba(168,85,247,.65); color: transparent; }
.glow-lime { text-shadow: 0 0 18px rgba(200,255,61,.5), 0 0 60px rgba(200,255,61,.25); }
.glow-violet { text-shadow: 0 0 18px rgba(168,85,247,.55), 0 0 60px rgba(168,85,247,.3); }
.grain::after { content:""; position:absolute; inset:0; pointer-events:none; opacity:.5;
  background-image:url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.06'/%3E%3C/svg%3E"); }
@keyframes nm-marquee { from { transform: translateX(0); } to { transform: translateX(-50%); } }
.nm-marquee-track { display:flex; width:max-content; animation: nm-marquee var(--marquee-dur,22s) linear infinite; }
.nm-marquee-reverse { animation-direction: reverse; }
```

Also: `::selection` in the accent color, custom scrollbar (ink track / violet hover thumb), `:focus-visible` outline in accent, `body { overflow-x: hidden }`. The `grain` class on every section adds film grain — it is what makes flat dark backgrounds feel expensive.

## 3. Core infra files

- `src/lib/gsap.ts` — ScrollTrigger registration + the lint-safe `useGsap` hook. Copy `assets/reference/lib-gsap.ts` **verbatim** (gotcha #1).
- `src/lib/router.ts` — `useHashRoute()` parsing `#/path/segments` + `navigate()`. Copy `assets/reference/lib-router.ts`.
- `src/lib/data.ts` — ALL content in one typed file: BRAND (name, suffix, email, phone, address), HERO lines, MARQUEE_WORDS, AD_CARDS, RING/PROCESS_STEPS, STATS, CASES (slug, client, sector, headline, results[], accent, image), TESTIMONIALS, FLOATS. Fictional content must be specific (see SKILL.md copy-voice section).
- `src/app/page.tsx` — one line: `dynamic(() => import("@/components/experience/Experience"), { ssr: false })` with a branded loading fallback. The entire site is client-side (hash router + GSAP require it).

## 4. Experience.tsx — the orchestration skeleton

Single client component owning everything (copy `assets/reference/Experience.tsx`):

1. **Lenis init** (one useEffect): create, wire to ScrollTrigger, drive from gsap.ticker, `lagSmoothing(0)`, refresh on window load + 1600ms.
2. **`ready` state** flipped by `<Preloader onReveal={() => setReady(true)} />`.
3. **Route switch**: `useHashRoute()` -> render Home / About / WorkIndex / CaseStudyDetail / Contact / 404 inside `<div key={route.path}>` (remount = contexts revert cleanly).
4. **Curtain transitions**: `playWipe("in"|"out")` promise + `handleNavigate` with `busyRef` guard (recipe 11).
5. **Refresh hooks**: ScrollTrigger.refresh on route change (+400ms).
6. **Curtain DOM**: two `.wipe-panel` divs fixed at z-[95], second carries the brand word.
7. Header receives `ready` + current path; z-order: preloader z-[100] > menu z-[90] > curtain z-[95] > header z-[80].

**Scoped / single-page builds:** when the user asked for one page, drop the hash router, route switch, and curtain entirely — render `<Home ready={ready} onNavigate={...}/>` (nav buttons scroll to sections) — but keep the Lenis wiring and refresh hooks verbatim. The preloader -> `ready` -> header/intro chain is not optional; it is what prevents animation races.

## 5. Home section order (proven rhythm)

```
Hero (100svh) -> MarqueeStrip (-mt rotated band) -> OrbitCards (pin 260%)
-> NoiseSection (tall parallax) -> CaseStudies (pin 420%: horizontal -> floats -> logo dive)
-> Process (pin 230%, SVG trim path) -> Testimonials (folders) -> Footer (tape stack)
```

Rhythm rule: alternate pinned "rides" with breathable normal-flow sections; every pinned section ends with a hold beat or veil so the unpin is invisible.

## 6. Contact form (optional page)

shadcn form (name/email/company/budget select/message) -> POST `/api/contact` -> zod validate -> `prisma.contact.create` -> toast. Schema:

```prisma
model Contact {
  id        Int      @id @default(autoincrement())
  name      String
  email     String
  company   String?
  budget    String?
  message   String
  createdAt DateTime @default(now())
}
```

`bun run db:push` after editing schema; verify end-to-end by submitting via the browser agent and querying the DB.

## 7. AI asset generation

Edit the ASSETS list in `scripts/gen-assets.ts` (brand-appropriate prompts) and run `bun scripts/gen-assets.ts`. Asset checklist for a standard build:

| Asset | Size | Black bg? |
|---|---|---|
| portrait/character (hero + ring) | 768x1344 | yes (blend-lighten in ring) |
| 4-6 ad creatives (marquee) | 1024x1024 | no (cards are opaque) |
| 3 case covers | 1344x768 | no |
| 4 floaters | 1024x1024 | yes |
| glowing 3D logo | 1024x1024 | yes |
| crowd/ambient wide shot | 1440x704 | no |

Every prompt: style keywords + background matching the variant (dark variants: "dark background"/pure black for blend assets; light variants: the page's paper/white tone, no blend) + (for blend/text-free assets) the no-text suffix from gotcha #6. After generation, eyeball each image for baked-in text and re-run offenders.

**Scoped builds** (preloader + hero + one pinned section): 5-6 images suffice — portrait (768x1344, black bg), 4-5 ring/marquee creatives (1024x1024). Skip covers, floaters, crowd, and the 3D logo unless that section is in scope.
