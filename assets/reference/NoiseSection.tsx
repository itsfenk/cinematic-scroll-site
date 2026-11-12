"use client";

 
import { gsap, useGsap } from "@/lib/gsap";
import { STATS } from "@/lib/data";
import CountUp from "@/components/fx/CountUp";
import { SectionTag } from "@/components/fx/Section";
import TextReveal from "@/components/fx/TextReveal";

export default function NoiseSection() {
  const scope = useGsap((rootRef) => {
    const root = rootRef.current!;
    const img = root.querySelector(".noise-img");

    // slow cinematic push-in on the crowd image
    gsap.fromTo(
      img,
      { scale: 1.18, yPercent: -4 },
      {
        scale: 1,
        yPercent: 4,
        ease: "none",
        scrollTrigger: {
          trigger: root,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      },
    );

    // glitch slices: brief random clip flashes while section is in view
    const slices = root.querySelectorAll<HTMLElement>(".noise-glitch");
    const flash = () => {
      const s = slices[Math.floor(Math.random() * slices.length)];
      if (!s) return;
      const y = Math.random() * 80 + 5;
      const h = Math.random() * 6 + 2;
      gsap
        .timeline()
        .set(s, {
          autoAlpha: 1,
          top: `${y}%`,
          height: `${h}%`,
          backgroundPosition: `50% ${y + h / 2}%`,
        })
        .to(s, { autoAlpha: 0, duration: 0.09, delay: 0.05 });
    };
    const iv = setInterval(flash, 900);

    // stats rise
    gsap.fromTo(
      root.querySelectorAll(".noise-stat"),
      { y: 40, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: { trigger: root, start: "top 55%" },
      },
    );

    return () => clearInterval(iv);
  }, []);

  return (
    <section
      ref={scope}
      className="relative overflow-hidden bg-ink grain"
      aria-label="Stand out from the noise"
    >
      <div className="relative flex min-h-[92svh] items-end">
        {/* crowd image */}
        <div className="absolute inset-0 overflow-hidden">
          <img
            src="/images/noise-wide.png"
            alt="A crowd of gray silhouettes with one glowing figure standing out"
            className="noise-img h-full w-full object-cover will-change-transform"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-ink/80 via-ink/25 to-ink" />
          {/* glitch slice layers */}
          <div className="noise-glitch pointer-events-none absolute inset-x-0 opacity-0" style={{ backgroundImage: "url(/images/noise-wide.png)", backgroundSize: "cover", backgroundPosition: "center", filter: "hue-rotate(45deg) saturate(3)" }} />
          <div className="noise-glitch pointer-events-none absolute inset-x-0 opacity-0" style={{ backgroundImage: "url(/images/noise-wide.png)", backgroundSize: "cover", backgroundPosition: "center", filter: "hue-rotate(-60deg) saturate(2.4)" }} />
        </div>

        <div className="relative z-10 mx-auto w-full max-w-[1600px] px-5 pb-20 pt-40 md:px-10">
          <SectionTag>The problem</SectionTag>
          <TextReveal
            as="h2"
            text="EVERY BRAND IS SHOUTING. NOBODY IS HEARD."
            className="mt-6 max-w-5xl text-[9.5vw] text-chalk md:text-[4.6rem]"
            stagger={0.04}
          />
          <TextReveal
            as="p"
            text="Feeds are saturated. CPMs keep climbing. Attention is the rarest currency on earth — and buying it with average ads is the fastest way to burn money."
            className="mt-6 max-w-2xl text-base leading-relaxed text-fog md:text-lg"
          />

          {/* proof stats */}
          <div className="mt-12 grid grid-cols-2 gap-px overflow-hidden rounded-3xl border border-white/10 bg-white/10 backdrop-blur-md md:grid-cols-4">
            {STATS.map((s) => (
              <div key={s.label} className="noise-stat bg-ink/80 p-6 md:p-8">
                <p className="font-display text-4xl font-extrabold text-limex glow-lime md:text-5xl">
                  <CountUp value={s.value} suffix={s.suffix} decimals={s.decimals} />
                </p>
                <p className="mt-2 text-xs uppercase tracking-[0.18em] text-fog">
                  {s.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
