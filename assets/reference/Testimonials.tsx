"use client";

import { TESTIMONIALS } from "@/lib/data";
import TextReveal from "@/components/fx/TextReveal";
import { SectionTag } from "@/components/fx/Section";
import { LogoMark } from "@/components/site/Header";

/**
 * Folder cards: closed by default with a plus icon; hovering (or tapping)
 * opens the flap revealing the quote. Only the plus rotates into a cross —
 * the ribbon stays put, exactly like the reference.
 */
export default function Testimonials() {
  return (
    <section
      className="relative overflow-hidden bg-ink py-28 grain"
      aria-label="Testimonials"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(40% 30% at 85% 20%, rgba(241,78,255,0.10), transparent 70%)",
        }}
      />
      <div className="mx-auto max-w-[1600px] px-5 md:px-10">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <SectionTag color="#f14eff">Client folder</SectionTag>
            <TextReveal
              as="h2"
              text="WORDS FROM THE LOUD ONES"
              className="mt-6 text-4xl text-chalk md:text-6xl"
            />
          </div>
          <p className="max-w-sm text-sm leading-relaxed text-fog">
            Hover a folder to open it. Every file inside is a brand we made
            louder — and what they said after the numbers came in.
          </p>
        </div>

        <div className="folder-scene mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {TESTIMONIALS.map((t, i) => (
            <div
              key={i}
              className="folder-card group relative h-64 cursor-pointer"
              tabIndex={0}
              onClick={(e) => e.currentTarget.classList.toggle("folder-open")}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  e.currentTarget.classList.toggle("folder-open");
                }
              }}
              role="button"
              aria-pressed={false}
              aria-label={`Open testimonial ${i + 1}`}
            >
              {/* folder body */}
              <div className="absolute inset-x-0 bottom-0 top-6 rounded-2xl border border-white/12 bg-panel2/80 backdrop-blur-sm">
                {/* paper inside */}
                <div className="absolute inset-x-3 bottom-3 top-2 rounded-xl border border-white/10 bg-ink/85 p-5 opacity-90">
                  <span
                    className="font-display text-3xl leading-none"
                    style={{ color: t.color }}
                  >
                    &ldquo;
                  </span>
                  <p className="mt-1 text-sm leading-relaxed text-chalk">
                    {t.quote}
                  </p>
                  <div className="absolute bottom-4 left-5 right-5 flex items-center gap-3">
                    <span
                      className="flex h-9 w-9 items-center justify-center rounded-full font-display text-sm font-extrabold text-ink"
                      style={{ background: t.color }}
                    >
                      {t.author
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </span>
                    <div>
                      <p className="text-xs font-semibold text-chalk">{t.author}</p>
                      <p className="text-[10px] uppercase tracking-widest text-fog">
                        {t.role}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* folder tab */}
              <div className="absolute left-4 top-0 h-10 w-32 rounded-t-xl border-x border-t border-white/12 bg-panel2/90" />

              {/* flap (closes over the paper) */}
              <div className="folder-flap absolute inset-x-0 bottom-0 top-4 z-10 rounded-2xl border border-white/15 bg-gradient-to-br from-panel to-panel2 shadow-[0_18px_50px_rgba(0,0,0,0.45)] [transform-style:preserve-3d]">
                <div className="flex h-full flex-col items-center justify-center gap-4">
                  <span
                    className="flex h-14 w-14 items-center justify-center rounded-2xl"
                    style={{
                      background: `${t.color}1f`,
                      border: `1px solid ${t.color}55`,
                    }}
                  >
                    <LogoMark className="h-7 w-7" />
                  </span>
                  <div className="text-center">
                    <p className="font-display text-sm font-bold tracking-wide">
                      {t.role.split(",")[1]?.trim() || t.author}
                    </p>
                    <p className="mt-1 text-[10px] uppercase tracking-[0.25em] text-fog">
                      File {String(i + 1).padStart(2, "0")} — testimonial.pdf
                    </p>
                  </div>
                  {/* plus icon — rotates into a cross on hover, nothing else moves */}
                  <span className="folder-plus flex h-10 w-10 items-center justify-center rounded-full border border-white/25 text-xl text-chalk">
                    +
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
