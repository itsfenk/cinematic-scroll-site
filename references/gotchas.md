# Gotchas — bugs that actually happened, symptoms, and fixes

Every entry here was hit in a real build and cost debugging time. Read before writing animation code; check again when something "just doesn't show up" or "moves wrong".

## 1. react-hooks lint crash inside useGsap callbacks

- **Symptom:** `bun run lint` fails with react-hooks errors ("ref value may change", cleanup rules) in every component using the gsap helper.
- **Cause:** writing `useGsap(() => { ...scope.current... })` — the closure captures the hook's own ref, which lint forbids.
- **Fix:** the helper's callback RECEIVES the rootRef as a parameter: `useGsap((rootRef) => { const root = rootRef.current!; ... })`. Use `assets/reference/lib-gsap.ts` verbatim and never reference any outer ref inside the callback. Element lookups go through `root.querySelector(...)`.

## 2. mix-blend-mode silently not blending

- **Symptom:** a portrait/logo PNG shot on black with `mix-blend-mode: lighten` renders as an ugly black box instead of glowing into the backdrop.
- **Cause:** GSAP sets inline `transform` on a WRAPPER around the blended element (or Tailwind translate classes on it). A transform creates a stacking context; the blend then only sees INSIDE that isolated group, whose backdrop is transparent — so `lighten` composites the source pixels unchanged and the black PNG background shows as-is.
- **Diagnose first (10 seconds):** in DevTools, set the wrapper's `transform: none`. If the box instantly blends, diagnosis confirmed — stop reading, apply the fixes below.
- **Fix (all three, or it stays broken):**
  1. Put `mix-blend-mode` directly ON the `<img>` (the `.blend-lighten` utility), not on a wrapper.
  2. Remove `z-index` from any ancestor between the img and the section backdrop (`pointer-events-none absolute inset-0 flex items-center justify-center` with NO z-* class).
  3. Center with GSAP, not CSS: `gsap.set(el, { xPercent: -50, yPercent: -50 })` — Tailwind `translate-x/y-1/2` classes fight GSAP-owned transforms and can also introduce the stacking context.
- **Audit for the OTHER isolation triggers** — transform and z-index are only two of many. Any of these on an ancestor between the img and the section backdrop re-isolates the blend the same way: `opacity < 1` (including GSAP `autoAlpha` tweens on a wrapper), `filter`/`blur()`, `backdrop-filter`, `will-change: transform`, `isolation: isolate`, `clip-path`, `mask`, `perspective`. Opacity/blur/will-change are safe ON the blended img itself.
- **Alternative escape hatch:** an element's OWN transform does not disable its OWN blend. If a wrapper genuinely must stay animated, move `mix-blend-mode: lighten` up onto that wrapper (with `background: none`) and drop it from the img — the wrapper blends with the section even while GSAP transforms it. Only works when the wrapper contains just the blended artwork and no other isolator sits between it and the section.
- **Structural rule:** blended elements that GSAP animates (the diving portrait, the logo) are direct children of the pinned section, NOT nested inside the 3D/perspective wrapper.

## 3. 3D carousel rotates in place / cards fly off-screen

- **Symptom:** cards spin around their own center instead of orbiting; or they orbit but sheared/distorted.
- **Cause A:** GSAP's transform order is translate THEN rotate, so `x: R; rotationY: deg` rotates the card after pushing it out — wrong model. 
- **Fix A:** the canonical GSAP carousel trick — keep cards at `inset-0` and push the transform-origin BEHIND them: `transformOrigin: "50% 50% -Rpx"` + `rotationY: i * step`. The card then revolves around the ring center at radius R. 
- **Cause B:** double perspective — `perspective` on the container AND `transformPerspective` per card.
- **Fix B:** one `perspective` in CSS on the outer container only; never set `transformPerspective` on cards; both ring and position wrappers need `transformStyle: "preserve-3d"`.
- **Billboarding:** counter-rotate each card FACE by `-(i * step)` and tween it by the same negative amount during the orbit, so cards stay readable like a billboard instead of showing their backs.

## 4. Header/intro animation stuck mid-way or plays twice

- **Symptom:** header hangs half-dropped; or hero intro replays oddly when state flips.
- **Cause:** a GSAP tween started imperatively races the component subtree that mounts/unmounts when the preloader flips `ready` (React remounts keyed content).
- **Fix:** state-driven entrances use CSS transitions on toggled classes (`ready ? "translate-y-0 opacity-100" : "-translate-y-full opacity-0"` with a nice cubic-bezier) or a fromTo timeline inside `useEffect` keyed EXACTLY on `[ready]`. Never fire a GSAP tween from a parent that also remounts the target.

## 5. Hero headline overflows mobile viewport

- **Symptom:** horizontal scroll on phones; "IMPOSSIBLE" clipped at the right edge (401px wide word in a 390px viewport).
- **Fix:** mobile display type in vw: `text-[8.2vw] md:text-[4.4rem]`. Verify with a 390px-wide browser screenshot; the longest word must fit. Same for oversized section titles (`text-[13vw] md:text-[7.5rem]`).

## 6. AI images arrive with gibberish text / wrong size / broken blending

- **Symptom:** fake brand labels ("SNAK 01") baked into ad creatives; image-generation errors on 1440x720; floater PNGs show a gray box instead of blending.
- **Fix:**
  - Append to every product/creative prompt: "absolutely no text, no words, no letters, no numbers, no typography, pure visual only".
  - Dimensions must be multiples of 32: 768x1344 (portrait), 1024x1024 (square), 1344x768 (wide) — 1440x720 is invalid, use 1440x704.
  - Anything animated with `blend-lighten` must be generated "isolated on pure solid black background" (floaters, glowing 3D logo, portrait). Re-run individual assets until clean; it's cheap.

## 7. Sections misaligned / pin distances wrong after images load or route change

- **Symptom:** pinned section starts scrolling too early/late; triggers fire at wrong positions after navigating.
- **Fix:** `ScrollTrigger.refresh()` at +1600ms after load, on route change (+400ms), and inside the wipe transition (`requestAnimationFrame` after hash change). Pinned timelines: `end: "+=N%"` + `invalidateOnRefresh: true`, and resize-dependent geometry (ring radius, horizontal distance) recomputed via functions + `onRefresh`.

## 8. Marquee stutters or jumps

- **Symptom:** text band visibly teleports; a gap appears mid-loop.
- **Fix:** render the content set TWICE, animate one tween `x: "+=half"` where `half = row.scrollWidth / 2`, wrap with a modifier. Canonical snippet (use exactly this shape):

```tsx
const half = row.scrollWidth / 2;
gsap.to(row, {
  x: `+=${half}`, duration: 26, ease: "none", repeat: -1,
  modifiers: { x: (x) => `${((parseFloat(x) % half) + half) % half}px` },
});
```

For CSS marquees animate to exactly `-50%` with `width: max-content`. Never loop per-card `gsap.set` positions — the modifier approach is seamless.

## 9. Cleanup leaks (interval flashes continue after leaving a page)

- **Symptom:** glitch flashes or marquee dips keep running after navigating away; console warnings on unmount.
- **Fix:** gsap.context revert handles tweens/ScrollTriggers created inside `useGsap`, but NOT: `setInterval`s (return `() => clearInterval(iv)` from the useGsap callback), rAF loops and standalone `gsap.to` marquee loops (kill in the useEffect return), `document.documentElement.style.overflow` locks (reset on cleanup). The menu overlay sets overflow hidden — always restore it.

## 10. Hook order violations in preloader-style components

- **Symptom:** React error "Rendered more hooks than during the previous render" or `start is not defined`.
- **Cause:** defining a function that uses state/refs BEFORE the hooks it depends on, or calling hooks conditionally.
- **Fix:** order inside the component: refs -> state -> plain functions that close over them -> `useEffect` LAST. Never call hooks inside conditions or callbacks.

## 11. Double navigation / wipe plays twice

- **Symptom:** clicking two nav links fast plays two curtains; the page changes mid-wipe.
- **Fix:** a `busyRef` guard in `handleNavigate` (return early while a wipe is in flight) and route to the same path = scroll-to-top instead of a wipe. Menu links close the menu, then navigate after ~60ms so the overlay doesn't fight the curtain.

## 12. Lenis + ScrollTrigger desync

- **Symptom:** scroll feels native then snaps; triggers lag behind the visual scroll.
- **Fix:** the exact wiring in `assets/reference/Experience.tsx`: `new Lenis({ lerp: 0.11 })`, `lenis.on("scroll", ScrollTrigger.update)`, drive `lenis.raf(time * 1000)` from `gsap.ticker.add`, and `gsap.ticker.lagSmoothing(0)`. Programmatic jumps use `lenis.scrollTo(0, { immediate: true })`.

## 13. Word masks clip descenders / flash unstyled

- **Symptom:** "g"/"y" bottoms cut off during the word reveal; headline visible before the animation sets.
- **Fix:** masks get `pb-[0.08em] -mb-[0.08em]` (padding inside the mask, negative margin to keep line-height); words pre-set via `gsap.set(words, { yPercent: 115, opacity: 0 })` inside the same effect that animates them; sections that GSAP reveals later start with `opacity-0` in markup to prevent a flash.

## 14. Tweening `filter` from computed "none" passes through near-black (light variants)

- **Symptom:** on Variant B/C (light palettes) an element that zooms/dives — e.g. the doorway or logo in recipe 7 act 3 — renders as a solid BLACK box mid-tween, then recovers at full scale.
- **Cause:** the dive tween was `filter: "brightness(1.9)"` with no start value. GSAP parses the computed start (`none`) and defaults its numeric parts to 0, so the interpolation runs 0 -> 1.9 and every early frame is near-black. On the neon-dark reference this was invisible: a darkened logo on a black page with `blend-lighten` just looked like glow. On a light page it is catastrophic.
- **Fix:** either set the start explicitly in the preceding reveal (`fromTo(..., { filter: "brightness(1)" , ... })` so the dive interpolates 1 -> 1.9), or drop the filter tween entirely — scale + a glow div carry the effect. Rule: ANY `filter`/`blur` tween on a light variant needs an explicit FROM value.
- **Variant lesson:** dark-variant recipes can hide value-parsing bugs that light variants expose. When porting a recipe to a new variant, screenshot the whole scrub range, not just the endpoints.
