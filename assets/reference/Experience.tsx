"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import Lenis from "lenis";
import { useHashRoute } from "@/lib/router";
import Preloader from "@/components/site/Preloader";
import Header from "@/components/site/Header";
import Home from "@/components/home/Home";
import About from "@/components/about/About";
import WorkIndex from "@/components/work/WorkIndex";
import CaseStudyDetail from "@/components/work/CaseStudyDetail";
import Contact from "@/components/contact/Contact";

export default function Experience() {
  const { route, navigate } = useHashRoute();
  const [ready, setReady] = useState(false);
  const lenisRef = useRef<Lenis | null>(null);
  const wipeRef = useRef<HTMLDivElement>(null);
  const busyRef = useRef(false);

  // ---------- smooth scroll (Lenis) wired to ScrollTrigger ----------
  useEffect(() => {
    const lenis = new Lenis({ lerp: 0.11, smoothWheel: true });
    lenisRef.current = lenis;
    lenis.on("scroll", ScrollTrigger.update);
    const raf = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0);

    const onLoad = () => ScrollTrigger.refresh();
    window.addEventListener("load", onLoad);
    const t = setTimeout(() => ScrollTrigger.refresh(), 1600);

    return () => {
      window.removeEventListener("load", onLoad);
      clearTimeout(t);
      gsap.ticker.remove(raf);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  // ---------- page transition curtain ----------
  const playWipe = useCallback((dir: "in" | "out") => {
    return new Promise<void>((resolve) => {
      const wipe = wipeRef.current;
      if (!wipe) return resolve();
      const panels = wipe.querySelectorAll(".wipe-panel");
      gsap
        .timeline({ onComplete: () => resolve() })
        .set(wipe, { display: "block", pointerEvents: "all" })
        .to(
          panels,
          dir === "in"
            ? { yPercent: 0, duration: 0.55, stagger: 0.07, ease: "power4.inOut" }
            : { yPercent: -115, duration: 0.6, stagger: 0.07, ease: "power4.inOut" },
        )
        .set(wipe, { display: dir === "out" ? "none" : "block", pointerEvents: dir === "in" ? "all" : "none" });
    });
  }, []);

  const handleNavigate = useCallback(
    async (to: string) => {
      if (busyRef.current) return;
      if (to === route.path) {
        lenisRef.current?.scrollTo(0, { immediate: true });
        return;
      }
      busyRef.current = true;
      await playWipe("in");
      window.location.hash = to;
      lenisRef.current?.scrollTo(0, { immediate: true });
      window.scrollTo(0, 0);
      requestAnimationFrame(() => ScrollTrigger.refresh());
      setTimeout(async () => {
        await playWipe("out");
        busyRef.current = false;
      }, 250);
    },
    [playWipe, route.path],
  );

  // refresh triggers whenever the page changes
  useEffect(() => {
    const t = setTimeout(() => ScrollTrigger.refresh(), 400);
    return () => clearTimeout(t);
  }, [route.path]);

  let page: React.ReactNode;
  if (route.path === "/") {
    page = <Home ready={ready} onNavigate={handleNavigate} />;
  } else if (route.path === "/about") {
    page = <About onNavigate={handleNavigate} />;
  } else if (route.path === "/work") {
    page = <WorkIndex onNavigate={handleNavigate} />;
  } else if (route.segments[0] === "work" && route.segments[1]) {
    page = <CaseStudyDetail slug={route.segments[1]} onNavigate={handleNavigate} />;
  } else if (route.path === "/contact") {
    page = <Contact onNavigate={handleNavigate} />;
  } else {
    page = (
      <main className="flex min-h-[100svh] flex-col items-center justify-center gap-6 px-6 text-center">
        <p className="font-display text-8xl font-extrabold text-stroke">404</p>
        <p className="text-fog">This page went off-script.</p>
        <button
          onClick={() => handleNavigate("/")}
          className="rounded-full bg-limex px-7 py-3 font-bold text-ink"
        >
          Back to the noise
        </button>
      </main>
    );
  }

  const headerCurrent =
    route.path === "/" || route.path.startsWith("/work") ? (route.path === "/" ? "/" : "/work") : route.path;

  return (
    <div className="min-h-screen bg-ink text-chalk">
      <Preloader onReveal={() => setReady(true)} />
      <Header ready={ready} current={headerCurrent} onNavigate={handleNavigate} />

      <div key={route.path || "/"}>{page}</div>

      {/* transition curtain */}
      <div
        ref={wipeRef}
        className="pointer-events-none fixed inset-0 z-[95] hidden"
        aria-hidden
      >
        <div
          className="wipe-panel absolute inset-x-0 -translate-y-[115%]"
          style={{
            top: 0,
            bottom: 0,
            background:
              "linear-gradient(135deg, #1a1030 0%, #2a1548 55%, #120e20 100%)",
            boxShadow: "0 -20px 80px rgba(168,85,247,0.25)",
          }}
        />
        <div
          className="wipe-panel absolute inset-x-0 -translate-y-[115%]"
          style={{
            top: 0,
            bottom: 0,
            background: "#0b0817",
          }}
        >
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="font-display text-2xl font-extrabold tracking-[0.3em] text-limex opacity-70">
              MAKE NOISE
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
