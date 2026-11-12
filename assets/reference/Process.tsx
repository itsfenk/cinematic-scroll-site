"use client";

import { gsap, useGsap } from "@/lib/gsap";
import { PROCESS_STEPS } from "@/lib/data";

/** Desktop weave path in a 1000x1000 space (SVG stretches with the box). */
const WEAVE =
  "M 140 110 C 520 90, 700 280, 520 440 C 380 560, 170 620, 260 800 C 340 960, 660 940, 860 900";
const MOBILE_LINE = "M 40 60 C 400 60, 600 180, 60 320 C 400 460, 620 560, 80 700 C 400 840, 620 900, 500 960";

const FRACTIONS = [0.05, 0.36, 0.65, 0.94];

export default function Process() {
  const isDesktop =
    typeof window !== "undefined" && window.innerWidth >= 768;

  const scope = useGsap((rootRef) => {
    const root = rootRef.current!;

    // position step cards on the weave path (desktop only)
    const mm = gsap.matchMedia();
    mm.add("(min-width: 768px)", () => {
      const svg = root.querySelector<SVGPathElement>(".weave-path");
      const svgEl = root.querySelector<SVGSVGElement>("svg.weave-svg");
      const path = svg ?? svgEl?.querySelector("path");
      const cards = Array.from(root.querySelectorAll<HTMLElement>(".step-card"));
      if (!path) return;
      const total = path.getTotalLength();
      cards.forEach((card, i) => {
        const pt = path.getPointAtLength(total * FRACTIONS[i]);
        card.style.left = `${pt.x / 10}%`;
        card.style.top = `${pt.y / 10}%`;
        card.style.transform = "translate(-50%, -50%)";
      });
    });

    const trimTl = gsap.timeline({
      scrollTrigger: {
        trigger: root,
        start: "top top",
        end: "+=230%",
        pin: true,
        scrub: 0.6,
      },
    });

    // trim path animation — the lime line fills the gray route while scrolling
    root.querySelectorAll<SVGPathElement>(".trim-path").forEach((p) => {
      const L = p.getTotalLength();
      gsap.set(p, { strokeDasharray: L, strokeDashoffset: L });
      trimTl.to(p, { strokeDashoffset: 0, ease: "none", duration: 9 }, 0);
    });

    // steps pop as the path reaches them
    PROCESS_STEPS.forEach((_, i) => {
      const at = [0.5, 2.9, 5.4, 7.8][i];
      const card = root.querySelectorAll<HTMLElement>(".step-card")[i];
      trimTl.fromTo(
        card,
        { autoAlpha: 0, y: 34 },
        { autoAlpha: 1, y: 0, duration: 0.7, ease: "power3.out" },
        at - 0.35,
      );
      trimTl.fromTo(
        card.querySelector(".step-num"),
        { scale: 0, rotate: -90 },
        { scale: 1, rotate: 0, duration: 0.7, ease: "back.out(2.2)" },
        at,
      );
    });

    // side ribbons slide in
    trimTl.fromTo(
      root.querySelector(".ribbon-left"),
      { x: "-140%", opacity: 0, rotate: -10 },
      { x: "0%", opacity: 1, rotate: -6, duration: 1, ease: "power3.out" },
      0.2,
    );
    trimTl.fromTo(
      root.querySelector(".ribbon-right"),
      { x: "140%", opacity: 0, rotate: 10 },
      { x: "0%", opacity: 1, rotate: 5, duration: 1, ease: "power3.out" },
      0.45,
    );
  }, []);

  return (
    <section
      ref={scope}
      className="relative h-[100svh] overflow-hidden bg-ink grain"
      aria-label="Our process"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(42% 34% at 78% 78%, rgba(200,255,61,0.10), transparent 70%), radial-gradient(42% 34% at 18% 22%, rgba(124,58,237,0.18), transparent 70%)",
        }}
      />

      {/* ribbons */}
      <div className="ribbon-left absolute left-0 top-[16%] z-30 -rotate-6 opacity-0">
        <div className="border-y border-limex/30 bg-limex/10 px-8 py-2 backdrop-blur-sm">
          <span className="font-display text-sm font-extrabold tracking-[0.35em] text-limex">
            AUDIT — BUILD — LAUNCH — SCALE — AUDIT — BUILD
          </span>
        </div>
      </div>
      <div className="ribbon-right absolute right-0 bottom-[18%] z-30 opacity-0">
        <div className="border-y border-violetx/30 bg-violetx/10 px-8 py-2 backdrop-blur-sm">
          <span className="font-display text-sm font-extrabold tracking-[0.35em] text-violetx">
            SIGNAL OVER OPINION — SIGNAL OVER OPINION
          </span>
        </div>
      </div>

      <div className="relative mx-auto flex h-full max-w-[1600px] flex-col px-5 pt-24 md:px-10">
        <div className="flex items-end justify-between">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-fog">
              How the noise gets made
            </p>
            <h2 className="mt-3 font-display text-4xl font-extrabold tracking-tight md:text-6xl">
              THE PROCESS
            </h2>
          </div>
          <p className="hidden max-w-[240px] text-right text-xs leading-relaxed text-fog md:block">
            Four moves, repeated relentlessly until your brand is the loudest
            thing in the feed.
          </p>
        </div>

        {/* weave canvas */}
        <div className="relative mt-6 h-[calc(100%-8rem)] w-full md:mt-0 md:h-full md:flex-1">
          {/* desktop weave */}
          <svg
            className="weave-svg absolute inset-0 hidden h-full w-full md:block"
            viewBox="0 0 1000 1000"
            preserveAspectRatio="none"
            aria-hidden
          >
            <path d={WEAVE} fill="none" stroke="#2a2140" strokeWidth="3" strokeDasharray="2 10" strokeLinecap="round" />
            <path className="trim-path" d={WEAVE} fill="none" stroke="#c8ff3d" strokeWidth="5" strokeLinecap="round" />
          </svg>
          {/* mobile route */}
          <svg
            className="absolute inset-0 h-full w-full md:hidden"
            viewBox="0 0 1000 1000"
            preserveAspectRatio="none"
            aria-hidden
          >
            <path d={MOBILE_LINE} fill="none" stroke="#2a2140" strokeWidth="3" strokeDasharray="2 10" strokeLinecap="round" />
            <path className="trim-path" d={MOBILE_LINE} fill="none" stroke="#c8ff3d" strokeWidth="5" strokeLinecap="round" />
          </svg>

          {/* steps */}
          <div className="relative h-full w-full">
            {PROCESS_STEPS.map((s, i) => (
              <article
                key={s.n}
                className="step-card relative mx-auto mb-5 max-w-[330px] rounded-3xl border border-white/12 bg-panel/90 p-5 opacity-0 backdrop-blur-md md:absolute md:mb-0 md:w-[330px] md:p-6"
                style={
                  isDesktop
                    ? { left: `${18 + i * 6}%`, top: `${14 + i * 22}%` }
                    : undefined
                }
              >
                <div className="flex items-center gap-4">
                  <span
                    className="step-num flex h-14 w-14 shrink-0 origin-center items-center justify-center rounded-2xl font-display text-xl font-extrabold text-ink"
                    style={{
                      background: s.color,
                      boxShadow: `0 0 26px ${s.color}55`,
                    }}
                  >
                    {s.n}
                  </span>
                  <h3 className="font-display text-2xl font-extrabold tracking-tight">
                    {s.title}
                  </h3>
                </div>
                <p className="mt-3 hidden text-sm leading-relaxed text-fog sm:block">
                  {s.desc}
                </p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
