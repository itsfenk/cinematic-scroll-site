"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "@/lib/gsap";
import { BRAND } from "@/lib/data";

export type NavPage = "/" | "/about" | "/work" | "/contact";

const LINKS: { to: NavPage; label: string; num: string }[] = [
  { to: "/", label: "Home", num: "01" },
  { to: "/work", label: "Work", num: "02" },
  { to: "/about", label: "About", num: "03" },
  { to: "/contact", label: "Contact", num: "04" },
];

export function LogoMark({ className = "h-7 w-7" }: { className?: string }) {
  return (
    <svg viewBox="0 0 100 100" className={className} aria-hidden>
      <path
        d="M18 88 V12 H38 L62 62 V12 H82 V88 H62 L38 38 V88 Z"
        fill="currentColor"
      />
    </svg>
  );
}

export default function Header({
  ready,
  current,
  onNavigate,
}: {
  ready: boolean;
  current: string;
  onNavigate: (to: string) => void;
}) {
  const headerRef = useRef<HTMLElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const [menuOpen, setMenuOpen] = useState(false);

  // menu overlay animation
  useEffect(() => {
    const menu = menuRef.current;
    if (!menu) return;
    if (menuOpen) {
      gsap.set(menu, { display: "flex" });
      gsap
        .timeline()
        .fromTo(
          menu,
          { clipPath: "circle(0% at calc(100% - 44px) 44px)" },
          {
            clipPath: "circle(150% at calc(100% - 44px) 44px)",
            duration: 0.7,
            ease: "power3.inOut",
          },
        )
        .fromTo(
          menu.querySelectorAll(".menu-link"),
          { y: 60, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.5, stagger: 0.07, ease: "power3.out" },
          "-=0.25",
        );
      document.documentElement.style.overflow = "hidden";
    } else {
      gsap.to(menu, {
        clipPath: "circle(0% at calc(100% - 44px) 44px)",
        duration: 0.55,
        ease: "power3.inOut",
        onComplete: () => gsap.set(menu, { display: "none" }),
      });
      document.documentElement.style.overflow = "";
    }
    return () => {
      document.documentElement.style.overflow = "";
    };
  }, [menuOpen]);

  const go = (to: string) => {
    setMenuOpen(false);
    setTimeout(() => onNavigate(to), 60);
  };

  return (
    <>
      <header
        ref={headerRef}
        className={`fixed inset-x-0 top-0 z-[80] transition-all duration-1000 [transition-timing-function:cubic-bezier(0.16,1,0.3,1)] ${
          ready ? "translate-y-0 opacity-100" : "-translate-y-full opacity-0"
        }`}
        style={{ paddingTop: "env(safe-area-inset-top)" }}
      >
        <div className="mx-auto flex max-w-[1600px] items-center justify-between px-5 py-4 md:px-10 md:py-5">
          <button
            onClick={() => go("/")}
            className="group flex items-center gap-3"
            aria-label="NOISEMAKER home"
          >
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-limex text-ink shadow-[0_0_18px_rgba(200,255,61,0.45)] transition-transform duration-300 group-hover:rotate-6">
              <LogoMark className="h-5 w-5" />
            </span>
            <span className="font-display text-lg font-extrabold tracking-wide">
              NOISEMAKER<span className="text-limex">®</span>
            </span>
          </button>

          <nav className="hidden items-center gap-1 rounded-full border border-white/10 bg-white/[0.04] px-2 py-1.5 backdrop-blur-md lg:flex">
            {LINKS.map((l) => (
              <button
                key={l.to}
                onClick={() => go(l.to)}
                className={`rounded-full px-5 py-1.5 text-[13px] font-medium tracking-wide transition-colors ${
                  current === l.to
                    ? "bg-limex text-ink"
                    : "text-fog hover:text-chalk"
                }`}
              >
                {l.label}
              </button>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <button
              onClick={() => go("/contact")}
              className="hidden items-center gap-2 rounded-full bg-violetx px-5 py-2.5 text-[13px] font-semibold text-ink shadow-[0_0_22px_rgba(168,85,247,0.45)] transition-all hover:shadow-[0_0_32px_rgba(168,85,247,0.75)] md:flex"
            >
              Start a project
              <span aria-hidden>→</span>
            </button>
            <button
              onClick={() => setMenuOpen(true)}
              className="flex h-11 w-11 items-center justify-center rounded-full border border-white/15 bg-white/[0.05] backdrop-blur-md transition-colors hover:border-limex"
              aria-label="Open menu"
              aria-expanded={menuOpen}
            >
              <span className="flex flex-col gap-[5px]">
                <span className="h-[2px] w-5 bg-chalk" />
                <span className="h-[2px] w-5 bg-limex" />
                <span className="h-[2px] w-3 bg-chalk" />
              </span>
            </button>
          </div>
        </div>
      </header>

      {/* fullscreen menu */}
      <div
        ref={menuRef}
        className="fixed inset-0 z-[90] hidden flex-col justify-between overflow-hidden bg-[#0d0a1c] px-6 pb-10 pt-6 md:px-12"
        style={{ clipPath: "circle(0% at calc(100% - 44px) 44px)" }}
        role="dialog"
        aria-modal="true"
        aria-label="Menu"
      >
        <div
          aria-hidden
          className="pointer-events-none absolute -right-24 top-1/3 h-[55vmin] w-[55vmin] rounded-full opacity-35 blur-[100px]"
          style={{
            background:
              "radial-gradient(circle, rgba(168,85,247,.7), rgba(241,78,255,.35) 55%, transparent 78%)",
          }}
        />
        <div className="flex items-center justify-between">
          <span className="font-display text-lg font-extrabold tracking-wide">
            NOISEMAKER<span className="text-limex">®</span>
          </span>
          <button
            onClick={() => setMenuOpen(false)}
            className="flex h-11 w-11 items-center justify-center rounded-full border border-white/15 text-xl transition-colors hover:border-limex hover:text-limex"
            aria-label="Close menu"
          >
            ✕
          </button>
        </div>

        <nav className="flex flex-col gap-2">
          {LINKS.map((l) => (
            <button
              key={l.to}
              onClick={() => go(l.to)}
              className="menu-link group flex items-baseline gap-4 text-left"
            >
              <span className="font-mono text-xs text-violetx">{l.num}</span>
              <span
                className={`font-display text-[13vw] font-extrabold leading-[1.05] tracking-tight transition-all duration-300 group-hover:translate-x-3 group-hover:text-limex md:text-7xl ${
                  current === l.to ? "text-limex" : "text-chalk"
                }`}
              >
                {l.label}
              </span>
            </button>
          ))}
        </nav>

        <div className="flex flex-wrap items-end justify-between gap-4 border-t border-white/10 pt-6 text-sm text-fog">
          <a href={`mailto:${BRAND.email}`} className="hover:text-limex">
            {BRAND.email}
          </a>
          <span className="text-xs uppercase tracking-[0.3em]">
            Stand out from the noise
          </span>
        </div>
      </div>
    </>
  );
}
