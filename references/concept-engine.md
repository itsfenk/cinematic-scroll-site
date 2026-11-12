# Concept Engine — a complete creative brief from zero input

Run this whenever the user gave you nothing usable: no brand, no reference, no transcript — or just a single word ("perfume"), or "surprise me" / "you decide". An empty brief is the single biggest quality risk: without one, a model defaults to a generic purple-gradient landing page. This engine forces the decisions a creative director makes before a line of code exists. Run it BEFORE scaffolding, commit to the brief in writing, and never renegotiate mid-build.

- **Interactive user present?** You may still ask the ONE clarify round (SKILL.md workflow) — but your 2-3 options come FROM this engine. Never ask open-ended "what do you want?".
- **Autonomous context** (agent/batch run, or the user said "you decide")? Skip asking entirely: generate, commit, build.
- **Site language** = the language the USER is conversing in — not the seed word's language (a French word dropped into an English chat is not a request for a French site), unless stated otherwise.

## 1. Pick a domain with cinematic potential

Subjects with a physical product, a ritual, or a transformation are easiest to make expensive — they give you something to stage. Choose one archetype (or bend one toward any seed word the user did give):

| Archetype | Visual raw material | Motion hooks | Metric vocabulary |
|---|---|---|---|
| Electronic music label / festival | light beams, crowds, vinyl, waveforms | waveform trim-path, crowd parallax, strobe cuts | "38K attendees", "1.2M streams" |
| Specialty coffee / beverage | steam, pours, beans, packaging | pour loop, steam parallax, roast-curve trim-path | "92-pt cup score", "18g in / 36g out" |
| Fashion / sneaker drop | fabric, frozen motion, runway | horizontal runway walk, freeze-frame glitch | "40K pairs in 8 minutes" |
| Architecture / interiors studio | space, light, plans, models | plan-line trim-path, room-to-room horizontal | "12 awards", "48 built works" |
| Film / photo production | frames, grain, projection, contact sheets | projector flicker, frame-step scroll | "9 Cannes Lions", "140 spots shipped" |
| Fintech / trading | numbers, velocity, grids | count-up ticker, grid push-in | "4.8x avg ROAS", "$120M tracked" |
| Museum / gallery / biennale | whitespace, spotlights, plinths | spotlight wipe, plinth orbit ring | "212 works", "6 pavilions" |
| Fragrance / beauty | mist, glass, botanicals | mist parallax, bottle orbit ring | "72% repeat rate", "14 countries" |

## 2. Name the brand

Rules that produce ownable names instead of model filler:
- 2-3 syllables, reads clean in ALL CAPS at 20vw (the hero will set it that big).
- Hard consonants (K, V, T, X) for loud/aggressive temperaments; liquid consonants and open vowels (L, M, N, O) for soft/premium ones.
- Has a "suffix slot": ®, STUDIO, ROAST, ATELIER, LAB, RECORDS, WORKS.
- Banned stock names — they scream "generated": Nova, Lumina, Apex, Zenith, Vertex, Pulse, Echo, Vibe, Aether, Onyx, Quantum, Nexus, Orbit, Horizon.
- Do a quick collision check against well-known real companies (tech, music, fashion, AI labs): a fictional brand that collides with a famous one reads as lazy. If a name collides, mutate it (different suffix, one letter, or a synonym).

Proven examples from validation builds: NOISEMAKER (ad agency, loud), VOLT ROAST (coffee, electric).

## 3. The metaphor — one line of tension

The metaphor is what makes a site feel directed instead of decorated. Write it as "X is secretly Y", then derive every scene from it:

- coffee = electricity -> ring of brew methods orbiting a cup, counter counts grams, peak dive = inside the charge
- sneakers = a vault heist -> horizontal scroll = the corridor, expansion layer = the score
- finance = a pulse -> SVG heartbeat trim-path, count-ups = BPM
- fragrance = a held breath -> mist parallax, peak dive = inside the glass

Generate 3 candidates. Test each one: "can I name the peak moment from this line alone?" Commit to the candidate that answers yes with the most specific image.

## 4. Choose the style variant (do NOT default to neon)

The recipes are style-agnostic; the skin is a decision. Four proven variants (drop-in token blocks in `stack-setup.md` §0 — all variants keep the same token/utility NAMES, only values change):

| Variant | Use when | Type pairing | Atmosphere |
|---|---|---|---|
| A — Neon dark | loud, nocturnal, youth energy | Syne + Space Grotesk | grain + glow + blend-lighten |
| B — Editorial light | culture, craft, quiet confidence | Fraunces + Inter | big whitespace, hairline rules, one ink accent |
| C — Mono brutalist | raw, technical, anti-polish | Archivo Black + Space Grotesk | pure B/W + one acid accent, 0px radius, hard borders |
| D — Warm luxury | heritage, fragrance, hospitality | Cormorant Garamond + Jost | espresso bg, gold hairlines, soft vignette, serif italic moments |

Selection rule: match the temperament of the subject, and VARY across builds — two different runs of this skill must not produce the same palette. If you catch yourself defaulting to Variant A, either justify it from the subject or switch.

## 5. Assign the motion signature

Pick the 4-6 recipes (from the 12 in `animations.md`) that carry THIS concept, and name one peak moment:

- The preloader previews the metaphor (counts grams, sweeps light, draws the plan).
- The peak (dive / expansion / glitch storm) is expressible in one sentence from the metaphor.
- At least two pinned scenes with DIFFERENT mechanics; never two horizontal scrolls back-to-back.
- One breathable "palette cleanser" (marquee band / text reveal) between heavy scenes.

Vary the assignment per concept so the choreography is derived from the idea, not from habit.

Scope note: the RECIPES line in the brief lists the SIGNATURE (the 4-6 recipes that define this concept's identity). The house standard — footer tape stack, curtain transitions, TextReveal/CountUp, hover micro-interactions — ships as default chrome around the signature; you do not need to list it.

## 6. Commit to the 10-line brief

Write exactly this block, then build against it without renegotiating:

```
BRAND:      <NAME><SUFFIX>
INDUSTRY:   <one line>
MANIFESTO:  <the 3-5 word display line>
METAPHOR:   <X is secretly Y>
VARIANT:    <A/B/C/D> — <one sentence why>
FONTS:      <display> / <body>
ACCENT:     <token> <hex>
RECIPES:    <e.g. 1, 2, 4, 5, 7, 10>
PEAK:       <one sentence>
LANGUAGE:   <site language>
```

Fill `lib/data.ts` from this brief (SKILL.md workflow step 4); the brief is the single source of truth for every string, token and section.

## 7. The expensive-feel checklist (what actually reads as premium)

Screenshot test first: every hero and every pinned scene must look expensive with animations PAUSED. Then:

- [ ] One idea per screen; oversized negative space
- [ ] Display type huge (hero ~12-20vw desktop) with ONE accent word per headline
- [ ] Easing discipline: power2/expo in-out everywhere, never the default "ease"
- [ ] Hold beats: 600-900ms of stillness after every scene peak
- [ ] Grain + exactly ONE atmosphere device (glow OR hairlines OR vignette) — not three
- [ ] Consistent radius language: 0px everywhere OR generous (16-24px) everywhere — never mixed casually
- [ ] Numbers with units and tabular figures ("18g in / 36g out", not "18")
- [ ] Hover state on every interactive element; custom selection color; visible focus ring
- [ ] Copy is specific to the metaphor — eyebrows, chip labels, even the 404 line; zero lorem, zero placeholder
- [ ] Footer, menu and 404 get the same craft as the hero (that is where budgets usually get cut)

Generic is the enemy, not smallness: a compact brutalist site with a razor metaphor beats a big neon site with none.
