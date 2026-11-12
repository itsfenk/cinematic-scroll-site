"use client";

 
import { useRef } from "react";
import { gsap, useGsap } from "@/lib/gsap";
import { CASES, FLOATS } from "@/lib/data";

/**
 * Section 4 of the ride: horizontal case-study scroll -> floating parallax
 * objects -> dive inside the glowing NOISEMAKER emblem.
 */
export default function CaseStudies({
  onOpenCase,
}: {
  onOpenCase: (slug: string) => void;
}) {
  const trackRef = useRef<HTMLDivElement>(null);

  const scope = useGsap((rootRef) => {
    const root = rootRef.current!;
    const track = trackRef.current;
    const logo = root.querySelector<HTMLElement>(".dive-logo");
    const glow = root.querySelector<HTMLElement>(".dive-glow");
    const veil = root.querySelector<HTMLElement>(".dive-veil");
    const floats = Array.from(root.querySelectorAll<HTMLElement>(".dive-float"));
    const floatsWrap = root.querySelector<HTMLElement>(".dive-floats");
    if (!track) return;

    const getDist = () =>
      Math.max(0, track.scrollWidth - root.querySelector(".dive-viewport")!.clientWidth);

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: root,
        start: "top top",
        end: "+=420%",
        pin: true,
        scrub: 0.6,
        invalidateOnRefresh: true,
      },
    });

    // 1) horizontal scroll through the case cards
    tl.to(track, { x: () => -getDist(), ease: "none", duration: 4 }, 0);

    // 2) floats zone: objects drift at different speeds (parallax)
    tl.fromTo(
      floatsWrap,
      { autoAlpha: 0 },
      { autoAlpha: 1, duration: 0.5, ease: "none" },
      3.9,
    );
    tl.to(track, { autoAlpha: 0.15, duration: 0.5, ease: "none" }, 3.9);
    floats.forEach((f, i) => {
      const dir = i % 2 === 0 ? -1 : 1;
      tl.fromTo(
        f,
        { x: `${dir * (14 + i * 6)}vw`, y: `${i % 3 === 0 ? 8 : -10}vh`, scale: 0.85 },
        {
          x: `${-dir * (16 + i * 5)}vw`,
          y: `${i % 3 === 0 ? -14 : 12}vh`,
          scale: 1.05,
          ease: "none",
          duration: 2.2,
        },
        4.0 + i * 0.25,
      );
    });

    // 3) glowing emblem appears and we zoom inside it
    tl.fromTo(
      logo,
      { autoAlpha: 0, scale: 0.28, filter: "brightness(1)" },
      { autoAlpha: 1, scale: 1, duration: 1.2, ease: "power2.out" },
      5.6,
    );
    tl.fromTo(
      glow,
      { autoAlpha: 0, scale: 0.5 },
      { autoAlpha: 1, scale: 1.6, duration: 1.2, ease: "power2.out" },
      5.6,
    );
    tl.to(
      logo,
      { scale: 7.5, filter: "brightness(1.9)", ease: "power3.in", duration: 2.2 },
      7.0,
    );
    tl.to(glow, { scale: 4, autoAlpha: 1, ease: "power3.in", duration: 2.2 }, 7.0);
    tl.to(floats, { autoAlpha: 0, ease: "none", duration: 0.8 }, 7.4);
    tl.to(track, { autoAlpha: 0, ease: "none", duration: 0.5 }, 7.4);

    // 4) black veil — we are "inside" the logo; next section slides in after
    tl.fromTo(
      veil,
      { autoAlpha: 0 },
      { autoAlpha: 1, duration: 0.9, ease: "power2.in" },
      8.4,
    );
    tl.to({}, { duration: 0.4 }); // hold beat before unpin
  }, []);

  return (
    <section
      ref={scope}
      className="relative h-[100svh] overflow-hidden bg-ink grain"
      aria-label="Case studies"
    >
      {/* horizontal track */}
      <div className="dive-viewport absolute inset-0 flex items-center">
        <div ref={trackRef} className="flex items-center gap-6 px-[6vw] md:gap-10 will-change-transform">
          <div className="shrink-0 pr-4 md:pr-10">
            <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-limex">
              Selected work
            </p>
            <h2 className="mt-4 font-display text-[13vw] font-extrabold leading-[0.92] tracking-tight md:text-[7.5rem]">
              LOUD
              <br />
              <span className="text-stroke-violet">RESULTS</span>
            </h2>
            <p className="mt-6 max-w-xs text-sm leading-relaxed text-fog">
              Three brands, three industries, one common denominator — campaigns
              that refuse to blend in.
            </p>
            <div className="mt-8 flex items-center gap-3 text-fog">
              <span className="h-px w-16 bg-gradient-to-r from-limex to-transparent" />
              <span className="text-[10px] uppercase tracking-[0.3em]">Keep scrolling →</span>
            </div>
          </div>

          {CASES.map((c, i) => (
            <article
              key={c.slug}
              className="group relative flex h-[64svh] w-[82vw] shrink-0 flex-col overflow-hidden rounded-[2rem] border border-white/12 bg-panel md:h-[70svh] md:w-[46vw]"
            >
              <div className="relative h-[62%] overflow-hidden">
                <img
                  src={c.image}
                  alt={`${c.client} campaign`}
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-panel via-transparent to-transparent" />
                <span
                  className="absolute left-5 top-5 rounded-full px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.2em] text-ink"
                  style={{ background: c.accent }}
                >
                  {String(i + 1).padStart(2, "0")} — {c.sector}
                </span>
              </div>
              <div className="flex flex-1 flex-col justify-between p-6 md:p-8">
                <div>
                  <h3 className="font-display text-2xl font-extrabold tracking-tight md:text-4xl">
                    {c.client}
                    <span className="text-fog"> — </span>
                    <span className="text-fog">{c.headline}</span>
                  </h3>
                </div>
                <div className="flex items-end justify-between gap-4">
                  <div className="flex gap-6">
                    {c.results.slice(0, 2).map((r) => (
                      <div key={r.label}>
                        <p
                          className="font-display text-2xl font-extrabold md:text-3xl"
                          style={{ color: c.accent }}
                        >
                          {r.value}
                        </p>
                        <p className="text-[10px] uppercase tracking-[0.16em] text-fog">
                          {r.label}
                        </p>
                      </div>
                    ))}
                  </div>
                  <button
                    onClick={() => onOpenCase(c.slug)}
                    className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-white/20 text-lg transition-all hover:rotate-45 hover:border-limex hover:text-limex"
                    aria-label={`Open ${c.client} case study`}
                  >
                    ↗
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>

      {/* floating parallax zone */}
      <div className="dive-floats pointer-events-none absolute inset-0 z-10 opacity-0">
        {FLOATS.map((f, i) => {
          const pos = [
            { left: "12%", top: "18%", w: "12vw" },
            { left: "72%", top: "12%", w: "15vw" },
            { left: "24%", top: "62%", w: "10vw" },
            { left: "64%", top: "60%", w: "13vw" },
          ][i];
          return (
            <img
              key={i}
              src={f.image}
              alt=""
              className="dive-float blend-lighten absolute will-change-transform"
              style={{ left: pos.left, top: pos.top, width: pos.w }}
            />
          );
        })}
      </div>

      {/* glowing emblem + dive — no z-index on this wrapper so the blended
          logo can still see the section backdrop */}
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
        <div
          className="dive-glow absolute h-[52vmin] w-[52vmin] rounded-full opacity-0 blur-[60px]"
          style={{
            background:
              "radial-gradient(circle, rgba(168,85,247,0.75), rgba(34,211,238,0.35) 55%, transparent 78%)",
          }}
        />
        <img
          src="/images/logo-3d.png"
          alt="NOISEMAKER emblem"
          className="dive-logo blend-lighten relative h-[52vmin] w-[52vmin] object-contain opacity-0 will-change-transform"
        />
      </div>

      {/* black veil that hands over to the next section */}
      <div className="dive-veil pointer-events-none absolute inset-0 z-30 bg-ink opacity-0" />
    </section>
  );
}
