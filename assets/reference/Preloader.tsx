"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "@/lib/gsap";

const MARK = "M18 88 V12 H38 L62 62 V12 H82 V88 H62 L38 38 V88 Z";
const NAME = "NOISEMAKER";

export default function Preloader({
  onReveal,
}: {
  onReveal: () => void;
}) {
  const rootRef = useRef<HTMLDivElement>(null);
  const [pct, setPct] = useState(0);
  const doneRef = useRef(false);

  const start = () => {
    if (doneRef.current) return;
    doneRef.current = true;
    const root = rootRef.current;
    if (!root) return;

    const tl = gsap.timeline({
      defaults: { ease: "power4.out" },
      onComplete: () => {
        onReveal();
      },
    });

    // character-by-character brand name reveal
    tl.fromTo(
      root.querySelectorAll(".pl-char"),
      { yPercent: 120, opacity: 0 },
      { yPercent: 0, opacity: 1, duration: 0.8, stagger: 0.05 },
      0.15,
    );
    tl.fromTo(
      root.querySelector(".pl-sub"),
      { opacity: 0, y: 14 },
      { opacity: 1, y: 0, duration: 0.6 },
      0.7,
    );

    // logo mark fills 0 -> 100%
    tl.fromTo(
      root.querySelector(".pl-fill"),
      { width: "0%" },
      { width: "100%", duration: 1.7, ease: "power2.inOut" },
      0.55,
    );

    // progress counter
    const counter = { v: 0 };
    tl.to(
      counter,
      {
        v: 100,
        duration: 1.7,
        ease: "power2.inOut",
        onUpdate: () => setPct(Math.round(counter.v)),
      },
      0.55,
    );

    // thin line under
    tl.fromTo(
      root.querySelector(".pl-line"),
      { scaleX: 0 },
      { scaleX: 1, duration: 1.7, ease: "power2.inOut" },
      0.55,
    );

    // circular wipe exit — loader circle closes revealing the hero
    tl.to(root, {
      clipPath: "circle(0% at 50% 50%)",
      duration: 1.15,
      ease: "power3.inOut",
      delay: 0.35,
    });
  };

  useEffect(() => {
    start();
  }, []);

  return (
    <div
      ref={rootRef}
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center overflow-hidden bg-ink grain"
      style={{
        clipPath: "circle(140% at 50% 50%)",
      }}
    >
      {/* ambient glows */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/2 h-[60vmin] w-[60vmin] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-40 blur-[90px]"
        style={{
          background:
            "radial-gradient(circle, rgba(168,85,247,.55), rgba(34,211,238,.25) 55%, transparent 75%)",
        }}
      />

      {/* logo mark with 0-100% fill */}
      <div className="relative mb-8 h-24 w-24 md:h-28 md:w-28">
        <svg viewBox="0 0 100 100" className="absolute inset-0 h-full w-full" aria-hidden>
          <path
            d={MARK}
            fill="none"
            stroke="rgba(244,242,250,0.22)"
            strokeWidth="2"
          />
        </svg>
        <div className="pl-fill absolute inset-0 overflow-hidden" style={{ width: "0%" }}>
          <svg viewBox="0 0 100 100" className="h-24 w-24 md:h-28 md:w-28" aria-hidden>
            <path d={MARK} fill="#c8ff3d" />
          </svg>
        </div>
      </div>

      {/* brand name, char by char */}
      <div className="flex overflow-hidden font-display text-3xl font-extrabold tracking-[0.08em] md:text-5xl">
        {NAME.split("").map((c, i) => (
          <span key={i} className="pl-char inline-block will-change-transform">
            {c}
          </span>
        ))}
        <span className="pl-char inline-block align-super text-base text-limex md:text-xl">
          ®
        </span>
      </div>

      <p className="pl-sub mt-4 text-[11px] uppercase tracking-[0.35em] text-fog">
        Loading the loud stuff
      </p>

      {/* progress */}
      <div className="absolute bottom-10 left-1/2 w-[min(420px,70vw)] -translate-x-1/2">
        <div className="flex items-end justify-between pb-3">
          <span className="text-[10px] uppercase tracking-[0.3em] text-fog">
            NOISEMAKER® 2026
          </span>
          <span className="font-display text-2xl font-bold text-limex glow-lime">
            {pct}%
          </span>
        </div>
        <div className="pl-line h-px w-full origin-left bg-gradient-to-r from-violetx via-magentax to-limex" />
      </div>
    </div>
  );
}
