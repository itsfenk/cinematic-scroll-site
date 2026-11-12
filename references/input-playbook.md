# Input Playbook — building from ANY idea, reference, or transcript

The skill's power is **re-expression, not imitation**. The user may hand you anything: a video transcript, a reference site, three mood words, a bare brand name, or nothing. Your job is to translate that input into the proven recipes while producing something that feels tailor-made for THEIR idea. Never reproduce the reference's brand.

## 1. Input types and what to extract

| Input | How to mine it |
|---|---|
| Video transcript / video description ("loader fills a logo, cards fly past a portrait, cards orbit in 3D...") | Treat each described beat as a required MOTION, map it to a recipe (table below). Extract pacing (fast/snappy vs slow/cinematic) and the emotional arc. |
| Reference link / screenshots | Identify the motion DNA (what animates, what pins, what repeats) and the design system (palette, type scale, radius, density). Borrow mechanics; swap the skin. |
| Mood words ("dark, loud, brutal", "soft, editorial, premium") | Choose the matching style variant (stack-setup.md §0); pick recipes matching the energy (glitch/horizontal for loud; parallax/trim-path for soft). |
| Brand assets only (logo, colors, copy) | Design the metaphor FROM the brand's product (see step 3). |
| Nothing / one word / "surprise me" | Run the concept engine (`references/concept-engine.md`) end-to-end: domain archetype, brand name, metaphor, style variant, motion signature — commit to the 10-line brief and build. In autonomous contexts, do NOT wait for answers. |

## 2. Digest step — before proposing anything

Write (internally, or 3 lines to the user) the extracted **Motion DNA**:
- Loader signature? (fill / count / wipe / none)
- Hero entrance choreography (word masks? scale pop? clip wipe?) + one focal composition (portrait arch? product pedestal? split type?)
- Scroll rhythm: which scenes pin, which breathe; any horizontal travel; any dive/zoom peak
- Recurring motifs (marquee bands, tapes, rings, folders, glitch, floats)
- Palette + type personality + atmosphere (grain, glow, blend-lighten assets)

Then map every described effect to a recipe — this table is the translation layer:

| What the reference shows or says | Use recipe (animations.md) |
|---|---|
| loader, percentage counter, logo fills in | 1 Preloader |
| text appears word by word / masked lines | 2 Hero intro + 12 TextReveal |
| cards stream past, dip at center | 3 Marquee cards with center dip |
| infinite ticker band of words | 4 Infinite text bands |
| cards orbit / rotate in 3D | 5 3D card ring |
| image pushes in, RGB-split glitch | 6 Scroll push-in + glitch |
| section scrolls sideways | 7 Horizontal scroll |
| camera zooms INTO a logo / light | 7 act 3 (logo dive) |
| line draws along a path, steps appear | 8 SVG trim-path |
| hover card opens like a folder/door | 9 Folder testimonials |
| strips rise / parallax footer | 10 Footer tape stack |
| page change = wipe / curtain | 11 Curtain transition |
| numbers count up on screen | 12 CountUp |

If the reference shows a motion with NO recipe here, say so and propose the closest proven recipe plus one new pattern (build it only after the core sections work).

## 3. Concept proposal — find the METAPHOR

The difference between a copy and a masterpiece is the metaphor. Derive it from the user's product/idea, not from the reference:
- Coffee brand -> "voltage/charge" (espresso = electric charge), ring = brew methods orbiting the cup
- Fitness app -> "pulse", ring = muscle groups, dive = inside the heartbeat
- Real-estate -> "keys/stories", horizontal scroll = walking through rooms

Offer 2-3 one-line directions with a different metaphor hook each ("1) The Grid — your feed is a racetrack; 2) The Signal — one voice cutting through static; 3) The Assembly Line — how the product gets built"). Pick the strongest (user choice if they're responsive, else by quality bar) and commit. If there is no seed at all, the concept engine (`references/concept-engine.md`) performs this whole step for you.

## 4. Anti-copy rules (hard)

- Never reuse the reference's brand name, tagline, palette (if it IS the brand), imagery, or copy.
- Keep the TECHNIQUE, swap the METAPHOR and every string: ring of THEIR products, not ring of ad cards; counter counts THEIR units.
- Fictional content must be brand-specific and plausible (metrics with units, sector names, client archetypes).
- If the user explicitly says "recreate that site as-is for my brand", still rebuild from recipes — it keeps code quality and avoids smuggling reference assets.

## 5. Quality bar — the "same power" checklist

The result must hit this bar regardless of subject:
- [ ] Preloader with a brand-specific signature (their logo fills/theirs counts)
- [ ] Hero entrance choreography + one focal composition built around THEIR product
- [ ] At least TWO pinned scenes with distinct mechanics (never two horizontal scrolls back-to-back)
- [ ] One peak moment (dive/zoom/expand) that pays off the metaphor
- [ ] Oversized display type, one accent word per headline, tracked uppercase eyebrows
- [ ] Atmosphere: film grain + one glow/blend device + neon (or chosen-palette) accents
- [ ] Hover micro-interactions on every interactive element
- [ ] Desktop 1440x900 + mobile 390x844 browser-verified, mid-scroll screenshots of pinned scenes
- [ ] The scroll-through should make someone say "wow" at least three times before the footer

If a section feels flat, add a beat from the recipe book (a marquee band between heavy sections, metric chips floating beside the portrait, a trim-path connector) rather than padding copy.
