---
name: cinematic-scroll-site
description: |
  Build award-winning cinematic scroll-animation websites (Awwwards style) from ANY input - video transcript, reference site, screenshots, mood words, brand assets, a bare idea, or NOTHING AT ALL (a built-in concept engine invents a complete fictional brand, metaphor and style variant) - using Next.js 16, Tailwind 4, GSAP ScrollTrigger and Lenis: preloader with logo fill + counter, word-by-word hero reveals, 3D card-ring carousels, pinned horizontal scroll, zoom-into-logo dives, SVG trim-path drawing, folder-flip testimonials, marquee bands, curtain transitions, AI-generated imagery. Translates any reference's motion DNA into proven recipes (never imitation) at the same production quality for any brand. Use whenever the user asks for advanced scroll animations, an awwwards-level/cinematic/immersive/premium site, animated agency/portfolio/landing pages, recreating a motion video as a live site, GSAP/ScrollTrigger/smooth-scrolling work, or says "make it animated" / "like the video I sent" - even with no technology named. Also for fixing broken scroll animations, 3D carousels, or mix-blend-mode issues in GSAP sites.
---

# Cinematic Scroll-Animation Website

You are building a full-screen, scroll-driven, animated marketing site: every section is a scene, the scrollbar is the timeline playhead. The skill is **idea-agnostic** — the same machinery built a neon ad agency (NOISEMAKER) and, in validation, a specialty coffee brand (VOLT ROAST). What transfers is the motion DNA, the recipes, and the quality bar — never the brand. Given no input at all, the concept engine (`references/concept-engine.md`) supplies a complete creative brief so you can still deliver at full power.

## Read these next (progressive disclosure)

| File | When to read |
|---|---|
| `references/concept-engine.md` | FIRST, whenever the user gave nothing, one word, or "you decide" — invent the brand, metaphor, style variant and motion signature, and commit to the 10-line brief |
| `references/input-playbook.md` | FIRST, whenever the user gave any input (transcript, reference, mood, brand) — digest it into a metaphor + recipe mapping |
| `references/stack-setup.md` | Scaffolding, deps, theme tokens, fonts, orchestration skeleton |
| `references/animations.md` | Before writing ANY animated section — the 12 proven recipes with code |
| `references/gotchas.md` | Before writing ANY animation code — the bugs that cost real debugging time |
| `assets/reference/*.tsx` | Complete, proven, copy-adapt component implementations |
| `scripts/gen-assets.ts` | When generating AI imagery (run once, edit the ASSETS list) |

## The 10 laws (violations cost real debugging time — read gotchas.md for why)

1. **Never touch `scope.current` inside a `useGsap` callback.** The callback receives `rootRef` as a parameter (react-hooks lint crashes otherwise). Use `assets/reference/lib-gsap.ts` verbatim.
2. **`mix-blend-mode` dies when GSAP transforms an ancestor wrapper.** GSAP sets a transform -> new stacking context -> blend group is isolated and the effect disappears. Blend goes directly ON the `img`; ancestors get NO z-index (or opacity/filter/will-change — all isolation triggers); center blended elements with `gsap.set(el, {xPercent: -50, yPercent: -50})`, never Tailwind translate classes. Full trigger list + escape hatches in gotchas.md #2.
3. **GSAP applies translate BEFORE rotate.** To orbit cards in a 3D ring, do not translate them to a radius. Push the transform-origin BEHIND the element: `transformOrigin: "50% 50% -Rpx"` on the position wrapper, then `rotationY: i * (360/n)`; counter-rotate the card face `rotationY: -(i * (360/n))` so cards billboard toward the viewer.
4. **One perspective only.** `perspective` on the ring container in CSS; never also `transformPerspective` per card — double perspective warps the geometry.
5. **State-driven reveals (post-preloader `ready`) are CSS transitions** on a toggled class, or a fromTo timeline inside `useEffect` keyed on the state. A GSAP tween that races an unmounting/mounting subtree gets stuck.
6. **Mobile headline overflow:** size display type in `vw` on mobile (`text-[8.2vw]`) and only clamp to fixed `rem` at `md:`. A word like "IMPOSSIBLE" at 401px wide overflows a 390px viewport.
7. **AI image prompts must end with "absolutely no text, no words, no letters, no typography"** (models love inventing gibberish labels) and dimensions must be multiples of 32 (768x1344, 1024x1024, 1440x704). Assets intended for `mix-blend-mode: lighten` must sit on **pure solid black**.
8. **Infinite marquee = render the set twice + `modifiers` wrap.** Animate `x: "+=half"` where `half = scrollWidth / 2`, with `x: (v) => \`${((v % half) + half) % half}px\``. Never hand-roll per-card teleport loops.
9. **`ScrollTrigger.refresh()` after route change (+400ms) and after load (+1600ms)**; every pinned timeline uses `end: "+=N%"`, `scrub: 0.6`, `invalidateOnRefresh: true`.
10. **Clean up what outlives gsap.context:** kill `gsap.to` loops, rAF loops and `setInterval`s in the effect's return; `ctx.revert()` handles the rest.

## Sandbox constraints

- The dev server/preview exposes ONLY the root route. **All multi-page navigation is hash routing** (`#/work`, `#/about`, `#/work/<slug>`) via `useHashRoute()` — do not create `app/**/page.tsx` routes, do not use next/link. One `app/page.tsx` that dynamically imports the whole experience with `{ ssr: false }`.
- Scaffold (Next.js 16, Tailwind 4, shadcn, Prisma/SQLite) already exists. Add only: `bun add gsap lenis`.
- Fonts via `next/font/google` — Variant A default: display **Syne** (800 for headlines), body **Space Grotesk**, wired as `--font-display` / `--font-sans`. Other variants swap the fonts, never the CSS variable names (stack-setup.md §0).
- The contact form (if any) goes through `app/api/contact/route.ts` -> Prisma; verify the row lands in the DB.
- dev server: `bun run dev` (port 3000, logs to dev.log). Lint: `bun run lint`.

## Workflow

1. **Digest the input** per `references/input-playbook.md`: identify the motion DNA, map described effects to recipes, derive a brand-specific METAPHOR, propose 2-3 one-line concepts and commit to the strongest.
2. **No input (or one word / "you decide")? Run `references/concept-engine.md`** end-to-end: domain archetype, brand name, metaphor, style variant A-D (do not default to neon), motion signature, and the 10-line brief. If an interactive user is present, the engine's 2-3 candidate directions ARE your single clarify round; if autonomous, commit yourself. Site language = the conversation language unless stated. After this step, do NOT renegotiate the brief.
3. **Clarify once, only if genuinely needed** (single AskUserQuestion round): use it to let the user pick between engine-generated directions, or to confirm brand/language/page-count when the user HAS given partial input. Then never ask again.
4. **Set up** per `references/stack-setup.md`: deps, the chosen style-variant token block (§0) + FX utilities, layout fonts, `lib/gsap.ts`, `lib/router.ts`, `app/page.tsx`.
5. **Invent or map content into one data file** `lib/data.ts`: BRAND, nav, hero words, marquee words, cards, ring cards, stats, cases (slug/sector/headline/results/accent), process steps, testimonials, floats. All copy fictional-but-specific (real-sounding metrics: "4.8x avg ROAS", "+212% signup rate") and derived from the user's product, not from any reference.
6. **Generate AI assets** with `scripts/gen-assets.ts` (edit the ASSETS list for the brand). Portrait/character 768x1344; creatives + covers 1024x1024 / 1344x768; floaters + 3D logo on pure black 1024x1024. Re-run per asset if one has text artifacts.
7. **Static layout first.** Build every section with real content and zero animation, in one `Home.tsx`. Verify it scrolls and looks right. Do not animate a broken layout.
8. **Animate recipe by recipe** from `references/animations.md`, in section order. After each section: refresh the browser, scroll through, screenshot. Copy from `assets/reference/` rather than re-deriving.
9. **Wire the chrome:** Preloader (blocks intro until `onReveal`), Header (CSS-transition drop on `ready`), fullscreen menu overlay, curtain page transitions in `Experience.tsx`, 404.
10. **Verify everything** (below), fix, re-verify, then check the quality-bar checklist in `references/input-playbook.md` §5 AND the expensive-feel checklist in `references/concept-engine.md` §7, and hand over with the hash-route list.

## Verification protocol (no exceptions)

1. `bun run lint` — zero errors, zero warnings. If errors come from inherited template files (shadcn `ui/*`, `hooks/*`), fix them locally or add targeted eslint-disable comments — do not rewrite the primitives, and never leave site code failing.
2. `tail -50 dev.log` — no compile or runtime errors.
3. Browser agent walkthrough (agent-browser skill): desktop 1440x900 AND mobile 390x844.
   - Preloader completes and hero intro plays.
   - Every pinned section actually pins and scrubs (screenshot mid-scroll, not only at rest).
   - Horizontal scroll covers all cards; the logo dive ends with the veil.
   - Menu overlay opens/closes; folder cards flip on hover AND tap; every nav link lands on the right hash route; 404 works.
   - Contact form submit -> `sqlite3 db/custom.db "SELECT * FROM Contact ORDER BY id DESC LIMIT 1"` (or Prisma Studio query) shows the row.
4. Any fix = edit the generator code, regenerate, re-verify. Never hand-patch built output.

## Brand voice template (general — fill for any idea)

The proven voice pattern, as a fill-in template — apply it to the USER's product, never to NOISEMAKER:
- One-line manifesto: "[Verb] [object] [prepositional punch]" (e.g. "Stand Out From The Noise" -> "Charge Every Cup", "Own The Spotlight")
- Short aggressive claims + concrete metric chips with units ("4.8x avg ROAS", "+212% signup rate" -> equivalents for the user's domain)
- Section eyebrows in tracked uppercase describing the section's job ("What lives behind our ads" -> the user's equivalent)
- Oversized display headlines with ONE accent word carrying the palette's accent treatment (glow, solid acid color, or italic serif — per variant)
- "0X / 0N" counters wherever a series is browsed

Swap every brand string, palette token and industry via `lib/data.ts` + globals.css tokens; the structure, recipes and quality bar stay constant. The anti-copy rules in `references/input-playbook.md` §4 are binding.
