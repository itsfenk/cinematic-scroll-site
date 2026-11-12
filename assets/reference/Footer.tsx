"use client";

import { BRAND } from "@/lib/data";
import TextReveal from "@/components/fx/TextReveal";
import { gsap, useGsap } from "@/lib/gsap";

const TAPES = [
  { text: "MAKE NOISE — MAKE NOISE — MAKE NOISE", color: "#c8ff3d", bg: "rgba(200,255,61,0.10)", border: "rgba(200,255,61,0.4)", rotate: -3 },
  { text: "STAND OUT — STAND OUT — STAND OUT", color: "#a855f7", bg: "rgba(168,85,247,0.12)", border: "rgba(168,85,247,0.45)", rotate: 2 },
  { text: "BE UNMISSABLE — BE UNMISSABLE", color: "#22d3ee", bg: "rgba(34,211,238,0.10)", border: "rgba(34,211,238,0.4)", rotate: -1.5 },
];

export default function Footer({
  onNavigate,
}: {
  onNavigate: (to: string) => void;
}) {
  const scope = useGsap((rootRef) => {
    const root = rootRef.current!;
    // tapes rise from the bottom with a little scale — parallax-like reveal
    gsap.fromTo(
      root.querySelectorAll(".tape"),
      { yPercent: 120, scale: 0.92, opacity: 0 },
      {
        yPercent: 0,
        scale: 1,
        opacity: 1,
        duration: 1.1,
        stagger: 0.14,
        ease: "power3.out",
        scrollTrigger: { trigger: root, start: "top 65%" },
      },
    );
    // subtle upward drift as you keep scrolling
    gsap.to(root.querySelector(".tape-stack"), {
      yPercent: -14,
      ease: "none",
      scrollTrigger: {
        trigger: root,
        start: "top bottom",
        end: "bottom bottom",
        scrub: true,
      },
    });
  }, []);

  return (
    <footer
      ref={scope}
      className="relative overflow-hidden bg-ink pt-24 grain"
      aria-label="Footer"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-px"
        style={{
          background:
            "linear-gradient(90deg, transparent, rgba(168,85,247,0.6), rgba(200,255,61,0.6), transparent)",
        }}
      />

      <div className="relative z-10 mx-auto max-w-[1600px] px-5 md:px-10">
        <div className="flex flex-col items-start justify-between gap-10 pb-24 md:flex-row md:items-end">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-fog">
              Ready when you are
            </p>
            <TextReveal
              as="h2"
              text="LET'S MAKE SOME NOISE"
              className="mt-4 text-[13vw] leading-[0.95] md:text-8xl"
              stagger={0.06}
            />
          </div>
          <button
            onClick={() => onNavigate("/contact")}
            className="group flex items-center gap-3 rounded-full bg-limex px-8 py-4 text-base font-bold text-ink shadow-[0_0_34px_rgba(200,255,61,0.4)] transition-all hover:shadow-[0_0_50px_rgba(200,255,61,0.65)]"
          >
            Start a project
            <span className="transition-transform duration-300 group-hover:translate-x-1" aria-hidden>
              →
            </span>
          </button>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-6 border-t border-white/10 py-8 text-sm text-fog">
          <a href={`mailto:${BRAND.email}`} className="transition-colors hover:text-limex">
            {BRAND.email}
          </a>
          <a href={`tel:${BRAND.phone.replace(/\s/g, "")}`} className="transition-colors hover:text-limex">
            {BRAND.phone}
          </a>
          <span className="text-xs uppercase tracking-[0.2em]">{BRAND.address}</span>
          <div className="flex gap-6">
            {["Instagram", "LinkedIn", "TikTok"].map((s) => (
              <a
                key={s}
                href="#/"
                onClick={(e) => e.preventDefault()}
                className="transition-colors hover:text-limex"
              >
                {s}
              </a>
            ))}
          </div>
        </div>

        <div className="flex items-center justify-between border-t border-white/10 py-6 text-[11px] uppercase tracking-[0.25em] text-fog">
          <span>
            © {new Date().getFullYear()} {BRAND.name}
            {BRAND.suffix} All noise reserved
          </span>
          <span>Made loud on Next.js + GSAP</span>
        </div>
      </div>

      {/* tape stack */}
      <div className="tape-stack relative z-0 -mb-6 space-y-3 pb-8 md:-mb-10">
        {TAPES.map((t, i) => (
          <div
            key={i}
            className="tape opacity-0"
            style={{ transform: `rotate(${t.rotate}deg)` }}
          >
            <div
              className="mx-auto w-[110%] -translate-x-[4%] border-y py-3 backdrop-blur-sm"
              style={{ background: t.bg, borderColor: t.border }}
            >
              <p className="nm-marquee-track whitespace-nowrap font-display text-xl font-extrabold tracking-[0.3em] md:text-3xl" style={{ color: t.color, ["--marquee-dur" as string]: `${30 + i * 8}s` }}>
                <span className="pr-8">{t.text}</span>
                <span className="pr-8">{t.text}</span>
                <span className="pr-8">{t.text}</span>
                <span className="pr-8">{t.text}</span>
              </p>
            </div>
          </div>
        ))}
      </div>
    </footer>
  );
}
