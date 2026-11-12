"use client";

import { gsap, useGsap } from "@/lib/gsap";

type CountUpProps = {
  value: number;
  suffix?: string;
  prefix?: string;
  decimals?: number;
  className?: string;
};

export default function CountUp({
  value,
  suffix = "",
  prefix = "",
  decimals = 0,
  className = "",
}: CountUpProps) {
  const scope = useGsap((rootRef) => {
    const el = rootRef.current?.querySelector<HTMLElement>(".cu-num");
    if (!el) return;
    const obj = { v: 0 };
    gsap.to(obj, {
      v: value,
      duration: 1.8,
      ease: "power3.out",
      scrollTrigger: {
        trigger: rootRef.current,
        start: "top 88%",
        toggleActions: "play none none none",
      },
      onUpdate: () => {
        el.textContent = `${prefix}${obj.v.toFixed(decimals)}${suffix}`;
      },
    });
  }, [value]);

  return (
    <span className={className} ref={scope}>
      <span className="cu-num">
        {prefix}0{suffix}
      </span>
    </span>
  );
}
