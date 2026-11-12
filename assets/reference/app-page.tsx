"use client";

import dynamic from "next/dynamic";

const Experience = dynamic(
  () => import("@/components/experience/Experience"),
  {
    ssr: false,
    loading: () => (
      <div className="fixed inset-0 flex items-center justify-center bg-ink">
        <span className="font-display text-xl font-extrabold tracking-[0.3em] text-limex">
          NOISEMAKER®
        </span>
      </div>
    ),
  },
);

export default function Page() {
  return <Experience />;
}
