"use client";

 
import { useRef } from "react";
import { gsap, useGsap } from "@/lib/gsap";
import { PROCESS_STEPS } from "@/lib/data";

const RING = [
  { img: "/images/ad-sneaker.png", label: "Drop campaigns" },
  { img: "/images/ad-perfume.png", label: "Launch films" },
  { img: "/images/ad-fintech.png", label: "Performance creative" },
  { img: "/images/ad-energy.png", label: "Product hype" },
  { img: "/images/ad-headphones.png", label: "Brand worlds" },
];

/**
 * Section 2 of the ride: the portrait hands off into card 01, then five
 * cards rotate in a 3D ring driven by scroll. Card 05 expands at the end.
 */
export default function OrbitCards() {
  const scope = useGsap((rootRef) => {
    const root = rootRef.current!;
    const ring = root.querySelector<HTMLElement>(".orbit-ring");
    const cards = Array.from(root.querySelectorAll<HTMLElement>(".orbit-card"));
    const portrait = root.querySelector<HTMLElement>(".orbit-portrait");
    const counter = root.querySelector<HTMLElement>(".orbit-count");
    const expandLayer = root.querySelector<HTMLElement>(".orbit-expand");

    if (!ring || cards.length === 0) return;

    // center the blended portrait via GSAP (tailwind translate would clash
    // with gsap-owned transforms)
    if (portrait) gsap.set(portrait, { xPercent: -50, yPercent: -50 });

    const R = () => Math.min(420, Math.max(260, window.innerWidth * 0.34));
    const posEls = Array.from(root.querySelectorAll<HTMLElement>(".orbit-pos"));
    const place = () => {
      posEls.forEach((p, i) => {
        // GSAP applies translate before rotate, so `z` would just push the
        // card forward. The canonical GSAP carousel trick: push the
        // transform-origin BEHIND the element — the card then revolves
        // around the ring center at radius R.
        gsap.set(p, {
          rotationY: i * 72,
          transformOrigin: `50% 50% -${R()}px`,
        });
        const face = p.querySelector<HTMLElement>(".orbit-card");
        if (face) gsap.set(face, { rotationY: -i * 72, transformOrigin: "center center" });
      });
    };
    place();

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: root,
        start: "top top",
        end: "+=260%",
        pin: true,
        scrub: 0.6,
        invalidateOnRefresh: true,
        onRefresh: place,
      },
    });

    // 1) portrait enters center then dives into card 01 (img is animated
    // directly so mix-blend-mode keeps working against the section backdrop)
    tl.fromTo(
      portrait,
      { scale: 0.62, opacity: 0, yPercent: 12 },
      { scale: 1, opacity: 1, yPercent: 0, duration: 1 },
      0,
    );
    tl.to(portrait, { scale: 0.3, yPercent: -18, duration: 1.1, ease: "power2.in" }, 1.4);
    tl.to(portrait, { opacity: 0, duration: 0.35 }, 2.2);

    // 2) billboarded orbit — position wrappers revolve, card faces stay
    // pointed at the viewer (like the reference video)
    posEls.forEach((p, i) => {
      tl.to(p, { rotationY: i * 72 - 288, duration: 6, ease: "none" }, 2.0);
      const face = p.querySelector<HTMLElement>(".orbit-card");
      if (face)
        tl.to(face, { rotationY: 288 - i * 72, duration: 6, ease: "none" }, 2.0);
    });

    // counter update
    tl.to(
      { p: 0 },
      {
        p: 1,
        duration: 6,
        onUpdate: function () {
          const p = this.targets()[0].p as number;
          const idx = Math.min(5, Math.floor(p * 5) + 1);
          if (counter) counter.textContent = `0${idx} / 05`;
        },
      },
      2.0,
    );

    // 3) card 05 expands to fill the screen
    tl.to(cards[4], { scale: 3.6, duration: 1.4, ease: "power3.in" }, 8.0);
    tl.fromTo(
      expandLayer,
      { opacity: 0 },
      { opacity: 1, duration: 0.8, ease: "power2.out" },
      8.6,
    );
    tl.to({}, { duration: 0.6 }); // hold
  }, []);

  return (
    <section
      ref={scope}
      className="relative flex h-[100svh] items-center justify-center overflow-hidden bg-ink grain"
      aria-label="What we build"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(50% 40% at 50% 50%, rgba(124,58,237,0.22), transparent 72%)",
        }}
      />

      {/* heading band (behind the ring, like the video's text layer) */}
      <div className="absolute inset-x-0 top-[13%] z-0 text-center">
        <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-fog">
          What lives behind our ads
        </p>
        <h2 className="mt-3 font-display text-[8vw] font-extrabold leading-none tracking-tight text-stroke md:text-7xl">
          THE MACHINE
        </h2>
      </div>

      {/* counter */}
      <div className="absolute left-6 top-1/2 z-30 -translate-y-1/2 md:left-12">
        <p className="font-display text-4xl font-extrabold text-limex glow-lime md:text-6xl">
          <span className="orbit-count">01 / 05</span>
        </p>
        <p className="mt-1 text-[10px] uppercase tracking-[0.3em] text-fog">Scroll to spin</p>
      </div>

      {/* 3D ring */}
      <div className="relative z-10" style={{ perspective: "1400px" }}>
        <div className="orbit-ring relative h-[300px] w-[220px] md:h-[380px] md:w-[280px]" style={{ transformStyle: "preserve-3d" }}>
          {RING.map((c, i) => (
            <div
              key={i}
              className="orbit-pos absolute inset-0 will-change-transform"
              style={{ transformStyle: "preserve-3d" }}
            >
              <figure
                className="orbit-card absolute inset-0 flex flex-col overflow-hidden rounded-3xl border border-white/15 bg-panel shadow-[0_20px_60px_rgba(0,0,0,0.55)] will-change-transform"
              >
                <img src={c.img} alt={c.label} className="h-[78%] w-full object-cover" />
                <figcaption className="flex flex-1 items-center justify-between px-4">
                  <span className="text-xs font-semibold uppercase tracking-widest text-fog">
                    {c.label}
                  </span>
                  <span className="font-display text-lg font-extrabold text-limex">
                    0{i + 1}
                  </span>
                </figcaption>
              </figure>
            </div>
          ))}
        </div>
      </div>

      {/* portrait that dives into card 01 — direct child of the section so
          mix-blend-mode can see the section backdrop (no isolating wrapper) */}
      <img
        src="/images/portrait.png"
        alt=""
        className="orbit-portrait blend-lighten pointer-events-none absolute left-1/2 top-1/2 z-20 h-[38svh] w-auto object-contain opacity-0 will-change-transform"
      />

      {/* expansion layer revealed as card 05 fills the screen */}
      <div className="orbit-expand pointer-events-none absolute inset-0 z-40 flex flex-col items-center justify-center bg-panel opacity-0">
        <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-fog">
          Everything we build has one job
        </p>
        <h3 className="mt-4 px-4 text-center font-display text-[10vw] font-extrabold leading-[0.95] tracking-tight md:text-8xl">
          STAND OUT<br />
          <span className="text-limex glow-lime">FROM THE NOISE</span>
        </h3>
      </div>
    </section>
  );
}
