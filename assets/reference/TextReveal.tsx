"use client";

import { gsap, useGsap } from "@/lib/gsap";

type TextRevealProps = {
  text: string;
  className?: string;
  as?: "h1" | "h2" | "h3" | "p" | "span" | "div";
  delay?: number;
  stagger?: number;
  start?: string;
};

/**
 * Apple-style word-by-word reveal: words slide up from behind an
 * overflow mask with a low-to-high opacity transition, staggered.
 */
export default function TextReveal({
  text,
  className = "",
  as: Tag = "div",
  delay = 0,
  stagger = 0.055,
  start = "top 86%",
}: TextRevealProps) {
  const scope = useGsap((rootRef) => {
    const words = rootRef.current?.querySelectorAll<HTMLElement>(".tr-word");
    if (!words || words.length === 0) return;
    gsap.set(words, { yPercent: 115, opacity: 0 });
    gsap.to(words, {
      yPercent: 0,
      opacity: 1,
      duration: 0.9,
      ease: "power4.out",
      stagger,
      delay,
      scrollTrigger: {
        trigger: rootRef.current,
        start,
        toggleActions: "play none none reverse",
      },
    });
  }, [text]);

  const words = text.split(" ");

  return (
    <Tag className={className} ref={scope}>
      {words.map((w, i) => (
        <span
          key={i}
          className="tr-mask inline-block overflow-hidden align-bottom pb-[0.08em] -mb-[0.08em]"
        >
          <span className="tr-word inline-block will-change-transform">
            {w}
            {i < words.length - 1 ? "\u00A0" : ""}
          </span>
        </span>
      ))}
    </Tag>
  );
}
