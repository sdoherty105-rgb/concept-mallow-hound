"use client";

import { useRef } from "react";

export interface NavLink {
  href: string;
  label: string;
}

export function MobileNav({ links }: { links: NavLink[] }) {
  const ref = useRef<HTMLDetailsElement>(null);
  return (
    <details className="mobile-nav" ref={ref}>
      <summary>
        <span className="mobile-nav__label">Menu</span>
        <span className="mobile-nav__icon" aria-hidden="true">
          <i />
          <i />
          <i />
        </span>
      </summary>
      <nav aria-label="Site menu">
        <ul>
          {links.map((l) => (
            <li key={l.href}>
              <a href={l.href} onClick={() => ref.current?.removeAttribute("open")}>
                {l.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </details>
  );
}
