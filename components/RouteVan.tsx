"use client";

import { useEffect, useRef } from "react";
import { MiniVan } from "./Van";

const IDS = ["area", "how", "coat", "packages", "booking", "faq"];

export function RouteVan() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const linked = CSS.supports("animation-timeline: scroll()") && !reduce;
    const van = ref.current;
    if (!van || linked || reduce) return;

    const stops = IDS.map((id) => document.getElementById(id)).filter((node): node is HTMLElement => !!node);
    const observer = new IntersectionObserver(
      (entries) => {
        const hit = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (!hit) return;
        const top = (hit.target as HTMLElement).offsetTop;
        van.style.transform = `translateY(${top + 32}px)`;
      },
      { threshold: [0.35, 0.6] },
    );
    stops.forEach((stop) => observer.observe(stop));
    return () => observer.disconnect();
  }, []);

  return (
    <div className="road" aria-hidden="true">
      <div className="route-van" ref={ref}>
        <MiniVan />
      </div>
    </div>
  );
}
