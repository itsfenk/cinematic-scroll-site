"use client";

import { useCallback, useEffect, useState } from "react";

export type Route = { path: string; segments: string[] };

function parseHash(): Route {
  if (typeof window === "undefined") return { path: "/", segments: [] };
  const raw = window.location.hash.replace(/^#/, "") || "/";
  const path = raw.startsWith("/") ? raw : `/${raw}`;
  const segments = path.split("/").filter(Boolean);
  return { path, segments };
}

export function useHashRoute() {
  const [route, setRoute] = useState<Route>({
    path: "/",
    segments: [],
  });

  useEffect(() => {
    const onChange = () => setRoute(parseHash());
    onChange();
    window.addEventListener("hashchange", onChange);
    return () => window.removeEventListener("hashchange", onChange);
  }, []);

  const navigate = useCallback((to: string) => {
    const next = to.startsWith("/") ? to : `/${to}`;
    if (window.location.hash === `#${next}`) {
      window.dispatchEvent(new HashChangeEvent("hashchange"));
      return;
    }
    window.location.hash = next;
  }, []);

  return { route, navigate };
}
