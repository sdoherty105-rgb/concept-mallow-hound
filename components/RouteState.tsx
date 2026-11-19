"use client";

import { createContext, useContext, useState, type ReactNode } from "react";
import { flushSync } from "react-dom";
import type { CoatId, SizeId } from "@/lib/data";

type Ctx = {
  coat: CoatId;
  size: SizeId;
  chooseCoat: (id: CoatId) => void;
  chooseSize: (id: SizeId) => void;
};

const RouteCtx = createContext<Ctx | null>(null);

export function useRoute(): Ctx {
  const value = useContext(RouteCtx);
  if (!value) throw new Error("useRoute must be used inside RouteProvider");
  return value;
}

const ACCENT: Record<CoatId, string> = {
  short: "mint",
  double: "butter",
  curly: "cobalt",
  long: "tangerine",
  wiry: "grape",
};

export function RouteProvider({ children }: { children: ReactNode }) {
  const [coat, setCoat] = useState<CoatId>("curly");
  const [size, setSize] = useState<SizeId>("medium");

  const chooseCoat = (id: CoatId) => {
    const apply = () => {
      setCoat(id);
      document.documentElement.dataset.accent = ACCENT[id];
    };
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const stage = document.querySelector(".result") as (HTMLElement & { startViewTransition?: (callback: () => void) => void }) | null;
    // Scope the snapshot to the recommendation panel so the coat and size
    // controls stay clickable while the accent crossfades.
    if (!reduce && stage?.startViewTransition) stage.startViewTransition(() => flushSync(apply));
    else apply();
  };

  return <RouteCtx.Provider value={{ coat, size, chooseCoat, chooseSize: setSize }}>{children}</RouteCtx.Provider>;
}
