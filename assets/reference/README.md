# Reference implementations

Complete, proven components from a shipped build (NOISEMAKER — neon ad-agency site, verified desktop 1440x900 + mobile 390x844). Copy and adapt; do not re-derive from scratch — the subtle geometry and blend rules are encoded here.

Two facts that make these components universally reusable:
- **Variant-agnostic:** every component consumes theme tokens (`text-chalk`, `bg-ink`, `text-violetx`...) and FX utility classes (`.grain`, `.text-stroke`, `.blend-lighten`...) by NAME. Changing the style variant (stack-setup.md §0) swaps token VALUES only — no component edits.
- **`data.ts` is an EXAMPLE dataset, not content:** every string in it (brand name, cases, metrics, testimonials) is NOISEMAKER placeholder content. The exported TYPES are the contract — replace all values with the current brand's content via `lib/data.ts` (SKILL.md workflow step 5).

| File | What it is | Key recipes |
|---|---|---|
| `lib-gsap.ts` | ScrollTrigger registration + lint-safe `useGsap` hook | foundation (gotcha #1) |
| `lib-router.ts` | `useHashRoute()` — hash-based multi-page for sandbox root-route constraint | routing |
| `data.ts` | All site content in one typed file (BRAND, cases, steps, testimonials...) | content model |
| `app-page.tsx` | Root page: dynamic import, `ssr: false`, branded fallback | entry |
| `app-layout.tsx` | Syne + Space Grotesk via next/font, metadata | fonts |
| `globals.css` | Full theme tokens + all FX utilities (grain, strokes, glows, marquee, folders) | design system |
| `Experience.tsx` | Orchestrator: Lenis wiring, ready state, hash-route switch, curtain transitions, refresh hooks | recipes 2/11, gotchas #7/#11/#12 |
| `Preloader.tsx` | Chars + logo fill + counter + circular wipe | recipe 1 |
| `Header.tsx` | CSS-transition drop on ready, fullscreen menu overlay w/ circular clip | recipes 2, gotcha #4 |
| `Hero.tsx` | Word reveal, arch portrait, marquee cards w/ center dip, scroll-out parallax | recipe 2/3 |
| `MarqueeStrip.tsx` | Rotated double text band (CSS marquee) | recipe 4 |
| `OrbitCards.tsx` | 3D card ring w/ portrait dive, billboarded faces, counter, expansion layer | recipe 5, gotchas #2/#3 |
| `NoiseSection.tsx` | Parallax push-in, glitch slices, stats | recipe 6 |
| `CaseStudies.tsx` | Pinned horizontal scroll -> parallax floats -> zoom into glowing logo | recipe 7 |
| `Process.tsx` | SVG trim-path route, steps placed via getPointAtLength, matchMedia desktop/mobile | recipe 8 |
| `Testimonials.tsx` | Folder cards with 3D flap + plus-to-cross (CSS-only) | recipe 9 |
| `Footer.tsx` | Tape stack rise + marquee tapes + big CTA | recipe 10 |
| `TextReveal.tsx` | Word-by-word masked reveal (scroll-triggered, reversible) | recipe 12 |
| `CountUp.tsx` | Scroll-triggered number count-up | recipe 12 |

Run `scripts/gen-assets.ts` (edit ASSETS list first) to produce the imagery these components reference under `/images/*`.
