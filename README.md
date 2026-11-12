# cinematic-scroll-site

A reusable AI skill that builds **award-winning, cinematic scroll-animation websites** from any input — a video transcript, a reference site, screenshots, mood words, brand assets, a single word, or **nothing at all** (a built-in concept engine invents a complete fictional brand, metaphor and style variant).

Stack: Next.js 16 (App Router) + TypeScript + Tailwind CSS 4 + GSAP ScrollTrigger + Lenis + Prisma/SQLite.

## What it produces

A full scroll-driven "film": preloader with logo fill + counter, word-mask hero reveals, infinite marquee bands, 3D card-ring carousels, push-in + glitch scenes, pinned horizontal scroll, zoom-into-logo dives, SVG trim-path routes, folder-flip testimonials, footer tape stacks, curtain page transitions, and AI-generated imagery — at Awwwards production quality, for any brand, in four style variants (neon dark / editorial light / mono brutalist / warm luxury).

## How to use (paste to any AI that has the skill installed)

- **No idea at all:**
  `Use the cinematic-scroll-site skill to build me an award-winning cinematic site. No brief — you invent everything.`
- **One line of idea:**
  `Use the cinematic-scroll-site skill to build a site for <your idea/brand>.`
- **From a reference:**
  `Use the cinematic-scroll-site skill. Same energy as this reference, brand-new site for <my brand>: <transcript / link / description>.`

The skill never copies a reference — it extracts the motion DNA and re-expresses it for the new brand.

## Layout

| Path | Contents |
|---|---|
| `SKILL.md` | Entry point: the 10 laws, sandbox constraints, 10-step workflow, verification protocol, brand-voice template |
| `references/concept-engine.md` | Zero-input briefing engine: domain archetypes, naming rules, metaphor method, style-variant selection, the 10-line brief, the expensive-feel checklist |
| `references/input-playbook.md` | Digesting ANY input (transcript/reference/mood/brand) into motion DNA + recipe mapping, anti-copy rules, quality bar |
| `references/animations.md` | The 12 proven animation recipes with production code |
| `references/gotchas.md` | 13 real bugs with symptom -> cause -> fix (blend-mode stacking, 3D ring geometry, lint crashes...) |
| `references/stack-setup.md` | Deps, 4 style-variant token systems, fonts, orchestration skeleton, AI asset checklist |
| `assets/reference/` | 19 proven, copy-adapt component files from a shipped build |
| `scripts/gen-assets.ts` | AI image generation template (z-ai-web-dev-sdk) |
| `evals/evals.json` | 4 test prompts incl. a zero-input build test |

## Provenance & validation

- Extracted from a real shipped NOISEMAKER build (neon ad-agency site, browser-verified desktop + mobile).
- Independently validated: a subagent using only this skill built a different brand (VOLT ROAST, specialty coffee) that passed the full browser verification protocol.
- Zero-input test: with nothing but the skill and the word "perfume" (or nothing at all), the concept engine produced complete committed briefs for TUNGSTEN STUDIO (mono brutalist) and NUAGE ATELIER (warm luxury) — no stalling, no reflexive neon.

## License

MIT.
