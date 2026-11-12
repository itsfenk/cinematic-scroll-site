"use client";

 
import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";
import { AD_CARDS } from "@/lib/data";

export default function Hero({
  ready,
  onNavigate,
}: {
  ready: boolean;
  onNavigate: (to: string) => void;
}) {
  const rootRef = useRef<HTMLDivElement>(null);
  const rowRef = useRef<HTMLDivElement>(null);
  const introRef = useRef<gsap.core.Timeline | null>(null);

  // ----- intro: header words, portrait scale 0->100, CTA scale, cards ------
  useEffect(() => {
    const root = rootRef.current;
    if (!root || !ready) return;

    const tl = gsap.timeline({ defaults: { ease: "power4.out" } });
    introRef.current = tl;

    tl.fromTo(
      root.querySelectorAll(".hero-word"),
      { yPercent: 118, opacity: 0 },
      { yPercent: 0, opacity: 1, duration: 1, stagger: 0.045 },
      0.1,
    );
    tl.fromTo(
      root.querySelector(".hero-tag"),
      { opacity: 0, y: 16 },
      { opacity: 1, y: 0, duration: 0.6 },
      0.05,
    );
    tl.fromTo(
      root.querySelector(".hero-portrait-wrap"),
      { scale: 0, rotate: -6 },
      { scale: 1, rotate: 0, duration: 1.25, ease: "back.out(1.5)" },
      0.35,
    );
    tl.fromTo(
      root.querySelectorAll(".hero-cta"),
      { scale: 0, opacity: 0 },
      { scale: 1, opacity: 1, duration: 0.7, ease: "back.out(2)", stagger: 0.1 },
      0.85,
    );
    tl.fromTo(
      root.querySelectorAll(".hero-chip"),
      { scale: 0, opacity: 0 },
      { scale: 1, opacity: 1, duration: 0.6, ease: "back.out(2)", stagger: 0.12 },
      1.0,
    );
    tl.fromTo(
      rowRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 0.9 },
      0.6,
    );
    tl.fromTo(
      root.querySelector(".hero-scroll"),
      { opacity: 0 },
      { opacity: 1, duration: 0.5 },
      1.4,
    );
  }, [ready]);

  // ----- cards infinite run left->right, dipping in scale behind portrait ---
  useEffect(() => {
    const row = rowRef.current;
    const root = rootRef.current;
    if (!row || !root) return;

    // JSX renders the card set twice -> half of scrollWidth is one seamless set
    const half = row.scrollWidth / 2;

    const allCards = Array.from(row.querySelectorAll<HTMLElement>(".hero-card"));

    const loop = gsap.to(row, {
      x: `+=${half}`,
      duration: 26,
      ease: "none",
      repeat: -1,
      modifiers: {
        x: (x) => {
          const v = parseFloat(x);
          return `${((v % half) + half) % half}px`;
        },
      },
    });

    const centerEl = root.querySelector<HTMLElement>(".hero-portrait-wrap");
    let raf = 0;
    const tick = () => {
      raf = requestAnimationFrame(tick);
      if (!centerEl) return;
      const r = centerEl.getBoundingClientRect();
      const cx = r.left + r.width / 2;
      const vw = window.innerWidth;
      const zone = Math.min(360, vw * 0.3);
      for (const card of allCards) {
        const cr = card.getBoundingClientRect();
        const ccx = cr.left + cr.width / 2;
        const d = Math.abs(ccx - cx);
        const t = Math.max(0, 1 - d / zone);
        const scale = 1 - 0.42 * t;
        const dim = 1 - 0.45 * t;
        gsap.set(card, {
          scale,
          filter: `brightness(${dim})`,
          transformOrigin: "center center",
        });
      }
    };
    raf = requestAnimationFrame(tick);

    return () => {
      loop.kill();
      cancelAnimationFrame(raf);
      gsap.ticker.remove(tick);
    };
  }, []);

  // ----- gentle scroll-out parallax for hero content ------------------------
  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const st = gsap.to(root.querySelector(".hero-inner"), {
      yPercent: -8,
      opacity: 0.25,
      ease: "none",
      scrollTrigger: {
        trigger: root,
        start: "top top",
        end: "bottom 35%",
        scrub: true,
      },
    });
    return () => {
      st.scrollTrigger?.kill();
      st.kill();
    };
  }, []);

  const line1 = "WE MAKE BRANDS";
  const line2 = "IMPOSSIBLE TO IGNORE";

  return (
    <section
      ref={rootRef}
      className="relative flex min-h-[100svh] flex-col justify-center overflow-hidden pt-24 grain"
      aria-label="Intro"
    >
      {/* ambient background */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(60% 45% at 50% 62%, rgba(124,58,237,0.32), transparent 70%), radial-gradient(38% 30% at 18% 22%, rgba(34,211,238,0.14), transparent 70%), radial-gradient(38% 30% at 84% 18%, rgba(241,78,255,0.12), transparent 70%)",
        }}
      />

      {/* cards running behind the portrait */}
      <div className="pointer-events-none absolute left-0 right-0 top-[54%] z-10 md:top-[52%]">
        <div ref={rowRef} className="flex w-max items-center gap-4 pr-4 md:gap-6">
          {AD_CARDS.concat(AD_CARDS).map((c, i) => (
            <figure
              key={i}
              className="hero-card relative h-36 w-36 shrink-0 overflow-hidden rounded-2xl border border-white/12 shadow-[0_10px_40px_rgba(0,0,0,0.5)] md:h-52 md:w-52"
            >
              <img src={c.image} alt={c.label} className="h-full w-full object-cover" />
              <figcaption className="absolute bottom-2 left-2 rounded-full bg-black/55 px-2.5 py-1 text-[10px] font-medium tracking-wide text-chalk backdrop-blur-sm">
                {c.label}
              </figcaption>
            </figure>
          ))}
        </div>
        {/* edge fades */}
        <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-ink to-transparent" />
        <div className="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-ink to-transparent" />
      </div>

      <div className="hero-inner relative z-20 mx-auto w-full max-w-[1600px] px-5 text-center md:px-10">
        <div className="hero-tag mx-auto mb-5 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.04] px-4 py-1.5 backdrop-blur-sm">
          <span className="h-2 w-2 rounded-full bg-limex nm-pulse" />
          <span className="text-[11px] font-semibold uppercase tracking-[0.22em] text-fog">
            Full-service ads agency — Cairo / Dubai / Remote
          </span>
        </div>

        <h1 className="mx-auto max-w-6xl font-display text-[8.2vw] font-extrabold leading-[0.95] tracking-tight md:text-[4.4rem]">
          <span className="block overflow-hidden pb-[0.06em]">
            {line1.split(" ").map((w, i) => (
              <span key={i} className="hero-word inline-block will-change-transform">
                {w}&nbsp;
              </span>
            ))}
          </span>
          <span className="block overflow-hidden pb-[0.08em]">
            {line2.split(" ").map((w, i) => (
              <span
                key={i}
                className={`hero-word inline-block will-change-transform ${
                  w === "IGNORE" ? "text-limex glow-lime" : ""
                }`}
              >
                {w}&nbsp;
              </span>
            ))}
          </span>
        </h1>

        {/* portrait in a neon arch frame */}
        <div className="hero-portrait-wrap relative mx-auto -mt-4 h-[40svh] w-fit md:-mt-12 md:h-[42svh]">
          <div className="relative h-full overflow-hidden rounded-t-[9rem] rounded-b-[1.6rem] border border-white/15 shadow-[0_0_70px_rgba(168,85,247,0.4),0_30px_80px_rgba(0,0,0,0.6)]">
            <img
              src="/images/portrait.png"
              alt="NOISEMAKER creative director character"
              className="h-full w-auto object-cover will-change-transform"
            />
            {/* neon wash over the studio backdrop */}
            <div
              aria-hidden
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(to top, rgba(168,85,247,0.28), transparent 40%, rgba(34,211,238,0.12))",
              }}
            />
            <div aria-hidden className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-ink/70 to-transparent" />
          </div>

          {/* floating proof chips */}
          <div className="hero-chip absolute -left-12 top-[14%] hidden rounded-2xl border border-limex/40 bg-ink/80 px-4 py-3 backdrop-blur-md sm:block">
            <p className="font-display text-xl font-bold text-limex">4.8x</p>
            <p className="text-[10px] uppercase tracking-widest text-fog">avg ROAS</p>
          </div>
          <div className="hero-chip absolute -right-14 top-[40%] hidden rounded-2xl border border-violetx/40 bg-ink/80 px-4 py-3 backdrop-blur-md sm:block">
            <p className="font-display text-xl font-bold text-violetx">+212%</p>
            <p className="text-[10px] uppercase tracking-widest text-fog">signup rate</p>
          </div>
        </div>

        {/* CTAs */}
        <div className="mt-3 flex items-center justify-center gap-4 md:mt-1">
          <button
            onClick={() => onNavigate("/contact")}
            className="hero-cta group flex items-center gap-2 rounded-full bg-limex px-7 py-3.5 text-sm font-bold text-ink shadow-[0_0_30px_rgba(200,255,61,0.35)] transition-all hover:shadow-[0_0_44px_rgba(200,255,61,0.6)] md:text-base"
          >
            Make some noise
            <span className="transition-transform duration-300 group-hover:translate-x-1" aria-hidden>
              →
            </span>
          </button>
          <button
            onClick={() => onNavigate("/work")}
            className="hero-cta rounded-full border border-white/20 px-7 py-3.5 text-sm font-semibold text-chalk backdrop-blur-sm transition-colors hover:border-violetx hover:text-violetx md:text-base"
          >
            See the work
          </button>
        </div>
      </div>

      {/* scroll cue */}
      <div className="hero-scroll pointer-events-none absolute bottom-6 left-1/2 z-20 -translate-x-1/2">
        <div className="flex h-10 w-6 items-start justify-center rounded-full border border-white/25 p-1.5">
          <span className="h-2 w-1 animate-bounce rounded-full bg-limex" />
        </div>
      </div>
    </section>
  );
}
