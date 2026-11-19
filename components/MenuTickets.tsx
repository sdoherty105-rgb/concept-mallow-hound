"use client";

import Link from "next/link";
import { DEMO_PRICE, PACKAGES, formatDuration, recommend, type CoatId } from "@/lib/data";
import { Dog, PuppyMark } from "./Dogs";
import { useRoute } from "./RouteState";

const DOG: Record<string, CoatId> = {
  "fresh-start": "short",
  "full-mallow": "curly",
  "shed-less": "double",
  "puppy-debut": "wiry",
};

const TINT: Record<string, string> = {
  "fresh-start": "mint",
  "full-mallow": "butter",
  "shed-less": "cobalt",
  puppy: "tangerine",
  "puppy-debut": "tangerine",
};

export function MenuTickets() {
  const { coat, size } = useRoute();
  const rec = recommend(coat, size);
  const ordered = [...PACKAGES].sort((a, b) => {
    if (a.id === rec.package.id) return -1;
    if (b.id === rec.package.id) return 1;
    return 0;
  });

  return (
    <div className="menu-block">
      <ul className="tickets">
        {ordered.map((pack, index) => {
          const match = pack.id === rec.package.id;
          return (
            <li key={pack.id} className={`ticket ticket--${TINT[pack.id]} ticket--${index} ${match ? "is-match" : ""}`}>
              <div className="ticket__art" aria-hidden="true">
                {pack.id === "puppy-debut" ? <PuppyMark /> : <Dog coat={DOG[pack.id]} />}
              </div>
              <div className="ticket__body">
                {match && <p className="ticket__match">Matched to this coat</p>}
                <h3 className={pack.id === "puppy-debut" ? "ticket__nameband" : undefined}>{pack.name}</h3>
                <p>{pack.tagline}</p>
                <p className="ticket__price">
                  <span className="demo-flag">{DEMO_PRICE}</span>
                  <strong>From ${pack.basePrice}</strong>
                  <small>from {formatDuration(pack.baseMinutes)} on the van</small>
                </p>
              </div>
            </li>
          );
        })}
      </ul>
      <p className="menu-more">
        <Link prefetch={false} className="btn" href="/packages">
          Open the full menu
        </Link>
      </p>
    </div>
  );
}
