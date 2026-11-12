# Animation Recipe Book

Twelve proven recipes. Each has: intent, markup sketch, and the exact GSAP/CSS that worked. Complete component files live in `assets/reference/` — prefer copying them over re-deriving. All snippets assume the `useGsap` hook from `assets/reference/lib-gsap.ts` and Tailwind 4 theme tokens from `references/stack-setup.md`.

Timeline conventions used throughout:
- Pinned scrub sections: `end: "+=N%"` (N = 130–420 depending on content), `scrub: 0.6` (slight lag feels premium; `true` feels cheap), `invalidateOnRefresh: true`, and a final `tl.to({}, { duration: 0.4 })` hold beat before unpin.
- Event (non-scrub) reveals: `scrollTrigger: { start: "top 80~88%", toggleActions: "play none none reverse" }`.
- Signature ease: `power4.out` for entrances, `back.out(1.5–2.2)` for pops, `power3.inOut` for wipes, `none` inside scrubs.

## Contents
1. [Preloader](#1-preloader) 2. [Hero intro](#2-hero-intro) 3. [Marquee cards with center dip](#3-marquee-cards-with-center-dip) 4. [Infinite text bands](#4-infinite-text-bands) 5. [3D card ring](#5-3d-card-ring) 6. [Scroll push-in + glitch](#6-scroll-push-in--glitch) 7. [Horizontal scroll -> floats -> logo dive](#7-horizontal-scroll--floats--logo-dive) 8. [SVG trim-path process](#8-svg-trim-path-process) 9. [Folder testimonials](#9-folder-testimonials) 10. [Footer tape stack](#10-footer-tape-stack) 11. [Curtain page transition](#11-curtain-page-transition) 12. [Reusable fx components](#12-reusable-fx-components)

---

## 1. Preloader

Full-screen overlay: brand name letter-by-letter, logo mark fills 0->100%, synced % counter, then a circular clip-path wipe closes to reveal the hero. It owns site readiness: `onReveal()` flips `ready` state which triggers the header drop and hero intro.

Key trick — the fill is a clipped duplicate: outline SVG below, a `width: 0%->100%` overflow-hidden wrapper above containing the lime-filled SVG. Counter and fill share `duration`/`ease` so they finish together.

```tsx
const tl = gsap.timeline({ defaults: { ease: "power4.out" }, onComplete: onReveal });

// chars up
tl.fromTo(".pl-char", { yPercent: 120, opacity: 0 },
  { yPercent: 0, opacity: 1, duration: 0.8, stagger: 0.05 }, 0.15);
// logo fill + counter + line, all synced
tl.fromTo(".pl-fill", { width: "0%" }, { width: "100%", duration: 1.7, ease: "power2.inOut" }, 0.55);
tl.to(counter, { v: 100, duration: 1.7, ease: "power2.inOut",
  onUpdate: () => setPct(Math.round(counter.v)) }, 0.55);
tl.fromTo(".pl-line", { scaleX: 0 }, { scaleX: 1, duration: 1.7, ease: "power2.inOut" }, 0.55);
// exit: circle closes
tl.to(root, { clipPath: "circle(0% at 50% 50%)", duration: 1.15,
  ease: "power3.inOut", delay: 0.35 });
```

Root starts `clipPath: "circle(140% at 50% 50%)"` (fully open). After exit completes the component stays mounted but invisible — fine. Full file: `assets/reference/Preloader.tsx`.

## 2. Hero intro

Plays once, gated on `ready` (see gotcha #5 — plain `useEffect` keyed on state, NOT useGsap). Word masks with `overflow-hidden` wrappers, portrait scale-in with back ease, CTA/chip pops, staggered:

```tsx
useEffect(() => {
  if (!root || !ready) return;
  const tl = gsap.timeline({ defaults: { ease: "power4.out" } });
  tl.fromTo(".hero-word", { yPercent: 118, opacity: 0 },
    { yPercent: 0, opacity: 1, duration: 1, stagger: 0.045 }, 0.1);
  tl.fromTo(".hero-portrait-wrap", { scale: 0, rotate: -6 },
    { scale: 1, rotate: 0, duration: 1.25, ease: "back.out(1.5)" }, 0.35);
  tl.fromTo(".hero-cta", { scale: 0, opacity: 0 },
    { scale: 1, opacity: 1, duration: 0.7, ease: "back.out(2)", stagger: 0.1 }, 0.85);
}, [ready]);
```

Word markup (mask + word, one line per `<span class="block overflow-hidden">`):

```tsx
<span className="block overflow-hidden pb-[0.06em]">
  {line.split(" ").map((w, i) => (
    <span key={i} className="hero-word inline-block will-change-transform">{w}&nbsp;</span>
  ))}
</span>
```

The `&nbsp;` keeps word spacing; `pb-[0.06em]` prevents descender clipping in the mask. Accent one word with a glow class (`text-limex glow-lime`). Header drop is pure CSS: `ready ? "translate-y-0 opacity-100" : "-translate-y-full opacity-0"` with `transition-all duration-1000 cubic-bezier(0.16,1,0.3,1)`. Add a gentle hero scroll-out: `.hero-inner` -> `yPercent: -8, opacity: 0.25` scrubbed over the first viewport.

Portrait sits in a **neon arch frame**: `rounded-t-[9rem] rounded-b-[1.6rem]` + border + layered box-shadow glow (`0 0 70px rgba(168,85,247,.4), 0 30px 80px rgba(0,0,0,.6)`) + a bottom gradient + neon wash overlay. Proof chips (metric + label) absolutely positioned at the sides.

## 3. Marquee cards with center dip

Row of ad-creative cards runs infinitely behind the portrait; as each card passes the portrait's center it **dips in scale and brightness** (recessed look). Two mechanisms compose:

(a) Seamless loop — render `AD_CARDS.concat(AD_CARDS)`, animate `x: "+=half"` with a wrap modifier:

```tsx
const half = row.scrollWidth / 2;
const loop = gsap.to(row, {
  x: `+=${half}`, duration: 26, ease: "none", repeat: -1,
  modifiers: { x: (x) => `${((parseFloat(x) % half) + half) % half}px` },
});
```

(b) Dip field — a rAF tick measures each card's distance to the portrait center every frame:

```tsx
let raf = 0;
const tick = () => {
  raf = requestAnimationFrame(tick);
  const zone = Math.min(360, window.innerWidth * 0.3);
  for (const card of allCards) {
    const d = Math.abs(cardCenterX - portraitCenterX);
    const t = Math.max(0, 1 - d / zone);
    gsap.set(card, { scale: 1 - 0.42 * t, filter: `brightness(${1 - 0.45 * t})` });
  }
};
raf = requestAnimationFrame(tick);
```

Return cleanup kills BOTH the loop tween and the rAF. Edge fades: two gradient divs (`from-ink to-transparent` / reverse) over the row ends.

## 4. Infinite text bands

Pure CSS marquee (no GSAP needed), slightly rotated band (-2deg) with two counter-directional rows. Content rendered twice, `width: max-content`, animate to `-50%`:

```css
@keyframes nm-marquee { from { transform: translateX(0); } to { transform: translateX(-50%); } }
.nm-marquee-track { display: flex; width: max-content;
  animation: nm-marquee var(--marquee-dur, 22s) linear infinite; }
.nm-marquee-reverse { animation-direction: reverse; }
```

```tsx
<div className="nm-marquee-track" style={{ ["--marquee-dur" as string]: "26s" }}>
  {[...WORDS, ...WORDS].map((w, i) => <span key={i}>{w}</span>)}
</div>
```

Alternate solid and outlined words (`text-chalk` / `text-stroke-violet`) with an inline SVG logo glyph between items. Per-row duration override makes rows drift apart.

## 5. 3D card ring

The signature piece. Scroll-pinned; a portrait dives into card 01, then N cards orbit like a billboarded carousel, counter shows `01/05`, final card expands into a full-screen tagline layer.

**Geometry (gotchas #3/#4):** container has `perspective: 1400px`; ring has `transformStyle: "preserve-3d"`; each card sits in a position wrapper. Radius responds to viewport:

```tsx
const R = () => Math.min(420, Math.max(260, window.innerWidth * 0.34));
const place = () => {
  posEls.forEach((p, i) => {
    gsap.set(p, { rotationY: i * (360 / N), transformOrigin: `50% 50% -${R()}px` });
    const face = p.querySelector(".orbit-card");
    gsap.set(face, { rotationY: -(i * (360 / N)), transformOrigin: "center center" });
  });
};
```

Timeline: portrait in -> portrait dives (scale 0.3, yPercent -18, then opacity 0) -> all position wrappers tween `rotationY` by `-288` (i.e. 4 steps of 72deg) while faces tween the opposite; counter driven by a proxy object tween `{p: 0 -> 1}` with onUpdate; finally `cards[N-1].scale = 3.6` + fade in the expand layer. Re-run `place()` via the ScrollTrigger `onRefresh` callback for resize correctness.

Counter trick (works inside scrub timelines). IMPORTANT: `onUpdate` must be a `function` (not an arrow function) — `this.targets()` only exists on regular functions; an arrow function fails silently and the counter never updates:

```tsx
tl.to({ p: 0 }, { p: 1, duration: 6, onUpdate: function () {
  const idx = Math.min(N, Math.floor(this.targets()[0].p * N) + 1);
  counter.textContent = `0${idx} / 0${N}`;
}}, 2.0);
```

Portrait is a **direct child of the section** (not inside the perspective wrapper) with `blend-lighten` — see gotcha #2. Full file: `assets/reference/OrbitCards.tsx`.

## 6. Scroll push-in + glitch

Full-bleed image section. Two effects:

(a) Cinematic push (parallax scale while scrolling through):

```tsx
gsap.fromTo(img, { scale: 1.18, yPercent: -4 }, { scale: 1, yPercent: 4, ease: "none",
  scrollTrigger: { trigger: root, start: "top bottom", end: "bottom top", scrub: true } });
```

(b) Glitch slices — two absolutely-positioned full-width layers using the SAME image as `background-image`, hue-rotated; a `setInterval(900ms)` flashes a random thin horizontal slice:

```tsx
const flash = () => {
  const s = slices[Math.floor(Math.random() * slices.length)];
  const y = Math.random() * 80 + 5, h = Math.random() * 6 + 2;
  gsap.timeline().set(s, { autoAlpha: 1, top: `${y}%`, height: `${h}%`,
    backgroundPosition: `50% ${y + h / 2}%` })
    .to(s, { autoAlpha: 0, duration: 0.09, delay: 0.05 });
};
```

useGsap callbacks may return a cleanup fn — return `() => clearInterval(iv)`. Stats rise on `start: "top 55%"` with stagger; numbers use the CountUp component (recipe 12).

## 7. Horizontal scroll -> floats -> logo dive

One pinned timeline with three acts (420% scroll distance). Act 1 — horizontal track:

```tsx
const getDist = () => Math.max(0, track.scrollWidth - viewport.clientWidth);
tl.to(track, { x: () => -getDist(), ease: "none", duration: 4 }, 0);
```

`x` as a function + `invalidateOnRefresh` keeps it correct after resizes. Cards: `h-[64svh] w-[82vw] md:h-[70svh] md:w-[46vw]` shrink-0.

Act 2 — parallax floaters: track dims to `autoAlpha: 0.15`, floats wrap fades in, each float drifts across at its own speed/direction (`fromTo` with alternating `dir`, staggered start `4.0 + i * 0.25`, `ease: "none"`). Floats are PNGs on black with `blend-lighten`.

Act 3 — the dive: glowing 3D logo + radial glow blob appear (`scale 0.28 -> 1`), then zoom THROUGH it:

```tsx
tl.to(logo, { scale: 7.5, filter: "brightness(1.9)", ease: "power3.in", duration: 2.2 }, 7.0);
tl.to(glow, { scale: 4, duration: 2.2 }, 7.0);
tl.fromTo(veil, { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.9, ease: "power2.in" }, 8.4);
tl.to({}, { duration: 0.4 }); // hold beat
```

The glow is a blurred radial-gradient div behind the logo. Both are in a **centering wrapper with NO z-index** and the logo itself carries `blend-lighten` (gotcha #2). The final black veil hands over to the next section so the unpin is invisible. **Light-variant note:** the `filter: "brightness(1.9)"` dive tween needs an explicit start (`filter: "brightness(1)"` in the reveal's from-vars) or it passes through near-black mid-tween — gotcha #14. On light variants also skip `blend-lighten` (see stack-setup §0) and veil in the NEXT section's background color instead of black.

## 8. SVG trim-path process

Pinned section: a dashed route line gets "drawn" in lime as you scroll, step cards pop in as the line reaches them, side ribbons slide in. SVG in a `viewBox="0 0 1000 1000"` with `preserveAspectRatio="none"` so it stretches; two paths stacked — gray dashed route + lime trim overlay, same `d`:

```tsx
root.querySelectorAll(".trim-path").forEach((p) => {
  const L = p.getTotalLength();
  gsap.set(p, { strokeDasharray: L, strokeDashoffset: L });
  trimTl.to(p, { strokeDashoffset: 0, ease: "none", duration: 9 }, 0);
});
```

Steps positioned ON the curve via `getPointAtLength` (desktop only, inside `gsap.matchMedia("(min-width: 768px)")`):

```tsx
const pt = path.getPointAtLength(total * FRACTIONS[i]); // [0.05, 0.36, 0.65, 0.94]
card.style.left = `${pt.x / 10}%`;  // viewBox 1000 -> percent
card.style.top = `${pt.y / 10}%`;
card.style.transform = "translate(-50%, -50%)";
```

Each step: card `fromTo(autoAlpha 0/y:34 -> 1/0)` slightly BEFORE its beat, then `.step-num` pops `scale 0 -> 1, rotate -90 -> 0` with `back.out(2.2)` AT the beat. Mobile gets a simpler straighter path + cards stacked normally (not absolute). Ribbons: `fromTo(x: ±140% -> 0)` with slight rotation, staggered. Full file: `assets/reference/Process.tsx`.

## 9. Folder testimonials

Hover/tap opens a 3D folder flap. Pure CSS transitions driven by a class — no GSAP:

```css
.folder-scene { perspective: 1100px; }
.folder-flap { transform-origin: top center;
  transition: transform 0.55s cubic-bezier(0.65,0,0.35,1); transform: rotateX(0deg); }
.folder-card:hover .folder-flap,
.folder-card.folder-open .folder-flap { transform: rotateX(-102deg); }
.folder-card:hover .folder-plus,
.folder-card.folder-open .folder-plus { transform: rotate(135deg); }
.folder-card:hover, .folder-card.folder-open { transform: translateY(-8px); }
```

Markup layers: body (with paper inside) at the bottom, tab above it, flap `z-10` covering both. The flap content shows a logo tile + "File 01 — testimonial.pdf" + the plus icon; the paper underneath holds the quote + author avatar/initials. Click toggles `folder-open` (keyboard: Enter/Space) so it works on touch and for a11y. Only the plus rotates into the cross; ribbon stays put.

## 10. Footer tape stack

Stack of rotated "tape" strips (marquee text bands, recipe 4) rising from the bottom on scroll into view, then drifting up as the page keeps scrolling:

```tsx
gsap.fromTo(".tape", { yPercent: 120, scale: 0.92, opacity: 0 },
  { yPercent: 0, scale: 1, opacity: 1, duration: 1.1, stagger: 0.14, ease: "power3.out",
    scrollTrigger: { trigger: root, start: "top 65%" } });
gsap.to(".tape-stack", { yPercent: -14, ease: "none",
  scrollTrigger: { trigger: root, start: "top bottom", end: "bottom bottom", scrub: true } });
```

Each tape: slight rotation (-3deg..2deg), translucent neon bg + neon border, `w-[110%] -translate-x-[4%]` so edges bleed off-screen, per-tape `--marquee-dur`. Pre-set `opacity-0` in markup to avoid flash-of-content.

## 11. Curtain page transition

Two full-screen panels hanging above the viewport (`-translate-y-[115%]`, second one carries "MAKE NOISE" text). Promise-based so navigation can await it:

```tsx
const playWipe = (dir: "in" | "out") => new Promise<void>((resolve) => {
  gsap.timeline({ onComplete: () => resolve() })
    .set(wipe, { display: "block", pointerEvents: "all" })
    .to(panels, dir === "in"
      ? { yPercent: 0, duration: 0.55, stagger: 0.07, ease: "power4.inOut" }
      : { yPercent: -115, duration: 0.6, stagger: 0.07, ease: "power4.inOut" })
    .set(wipe, { display: dir === "out" ? "none" : "block",
                 pointerEvents: dir === "in" ? "all" : "none" });
});
```

Navigation flow (`handleNavigate`): guard with `busyRef` (ignore double-clicks) -> `await playWipe("in")` -> set `window.location.hash` -> `lenis.scrollTo(0, { immediate: true })` + `window.scrollTo(0, 0)` -> `requestAnimationFrame(() => ScrollTrigger.refresh())` -> after 250ms `await playWipe("out")` -> release busy. Page content keyed by `route.path` (`<div key={route.path}>`) so React remounts cleanly and ScrollTrigger contexts revert. Plus a `useEffect` on `route.path` scheduling another refresh at +400ms.

## 12. Reusable fx components

**TextReveal** — Apple-style word-by-word reveal used everywhere (`as`, `delay`, `stagger`, `start` props). Mask per word, word slides `yPercent 115 -> 0` with low-to-high opacity, `toggleActions: "play none none reverse"`. Copy `assets/reference/TextReveal.tsx` verbatim.

**CountUp** — number counts up when scrolled into view (`top 88%`), proxy object tween + `toFixed(decimals)` + prefix/suffix. Copy `assets/reference/CountUp.tsx`.

**SectionTag** — small eyebrow chip: colored dot + tracked uppercase label (a plain component, no animation).

Both fx components are built on `useGsap`, which is why they self-revert on unmount (route changes) — building these on raw `useEffect` + ScrollTrigger leaks triggers across hash routes.
