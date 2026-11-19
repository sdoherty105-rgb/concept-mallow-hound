"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

const STOPS = [
  { id: "how", n: "1", label: "How" },
  { id: "coat", n: "2", label: "Dogs" },
  { id: "packages", n: "3", label: "Menu" },
  { id: "booking", n: "4", label: "Book" },
  { id: "faq", n: "5", label: "Questions" },
] as const;

/** Phones get the four stops that move a booking forward, in one row. */
const MOBILE = [
  { id: "area", label: "Suburb" },
  { id: "coat", label: "Price" },
  { id: "packages", label: "Menu" },
  { id: "booking", label: "Book" },
] as const;

export function SiteNav() {
  const pathname = usePathname();
  const onMenu = pathname === "/packages";
  const [current, setCurrent] = useState(onMenu ? "packages" : "");

  useEffect(() => {
    if (onMenu) {
      setCurrent("packages");
      return;
    }
    const nodes = ["area", ...STOPS.map((stop) => stop.id)].map((id) => document.getElementById(id)).filter((node): node is HTMLElement => !!node);
    if (!nodes.length) return;
    const ratios = new Map<string, number>();
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) ratios.set(entry.target.id, entry.isIntersecting ? entry.intersectionRatio : 0);
        let best = "";
        let bestRatio = 0;
        for (const [id, ratio] of ratios) {
          if (ratio > bestRatio) {
            best = id;
            bestRatio = ratio;
          }
        }
        if (best) setCurrent(best);
      },
      { rootMargin: "-28% 0px -48% 0px", threshold: [0, 0.25, 0.5, 0.75, 1] },
    );
    nodes.forEach((node) => observer.observe(node));
    return () => observer.disconnect();
  }, [onMenu]);

  const hrefFor = (id: string) => (onMenu && id === "packages" ? "/packages" : `/#${id}`);

  const list = (className: string) => (
    <ul className={className}>
      {STOPS.map((stop) => {
        const on = current === stop.id;
        const page = onMenu && stop.id === "packages";
        return (
          <li key={stop.id}>
            <a className={`pill${on ? " is-on" : ""}`} href={hrefFor(stop.id)} aria-current={on ? (page ? "page" : "location") : undefined}>
              <span className="pill__n" data-numeric>{stop.n}</span>
              <span className="pill__l">{stop.label}</span>
            </a>
          </li>
        );
      })}
    </ul>
  );

  return (
    <>
      <nav className="stop-nav" aria-label="Primary" data-nav="stop-pills">
        {list("stop-nav__list")}
      </nav>
      <nav className="mobile-stops" aria-label="Quick stops">
        {MOBILE.map((stop) => {
          const on = current === stop.id;
          const page = onMenu && stop.id === "packages";
          return (
            <a key={stop.id} className={`pill${on ? " is-on" : ""}${stop.id === "booking" ? " pill--go" : ""}`} href={hrefFor(stop.id)} aria-current={on ? (page ? "page" : "location") : undefined}>
              {stop.label}
            </a>
          );
        })}
      </nav>
    </>
  );
}
