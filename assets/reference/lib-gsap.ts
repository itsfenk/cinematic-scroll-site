"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export { gsap, ScrollTrigger };

type SetupFn = (
  ref: React.RefObject<HTMLElement | null>,
) => void | (() => void);

/** Scoped gsap.context helper that reverts on unmount / dep change. */
export function useGsap(setup: SetupFn, deps: unknown[] = []) {
  const scopeRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!scopeRef.current) return;
    const ctx = gsap.context(
      () => setup(scopeRef),
      scopeRef.current,
    );
    return () => ctx.revert();
  }, deps);

  return scopeRef;
}
