"use client";

import { MARQUEE_WORDS } from "@/lib/data";

function Row({ reverse = false, dur = "26s" }: { reverse?: boolean; dur?: string }) {
  const items = [...MARQUEE_WORDS, ...MARQUEE_WORDS];
  return (
    <div className="flex overflow-hidden">
      <div
        className={`nm-marquee-track items-center gap-8 py-2 ${reverse ? "nm-marquee-reverse" : ""}`}
        style={{ ["--marquee-dur" as string]: dur }}
      >
        {items.map((w, i) => (
          <span key={i} className="flex items-center gap-8">
            <span
              className={`font-display text-4xl font-extrabold tracking-tight md:text-6xl ${
                i % 2 === 0 ? "text-chalk" : "text-stroke-violet"
              }`}
            >
              {w}
            </span>
            <svg viewBox="0 0 100 100" className="h-6 w-6 text-limex md:h-8 md:w-8" aria-hidden>
              <path
                d="M18 88 V12 H38 L62 62 V12 H82 V88 H62 L38 38 V88 Z"
                fill="currentColor"
              />
            </svg>
          </span>
        ))}
      </div>
    </div>
  );
}

/** Infinite horizontal text band that keeps scrolling with the page. */
export default function MarqueeStrip() {
  return (
    <section
      aria-hidden
      className="relative z-20 -mt-6 rotate-[-2deg] border-y border-white/10 bg-panel/90 py-6 backdrop-blur-sm md:-mt-10"
    >
      <Row />
      <div className="mt-4 opacity-60">
        <Row reverse dur="34s" />
      </div>
    </section>
  );
}
