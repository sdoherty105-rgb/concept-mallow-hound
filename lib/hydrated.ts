"use client";

import { useSyncExternalStore } from "react";

const subscribe = () => () => {};

export function useHydrated(): boolean {
  return useSyncExternalStore(
    subscribe,
    () => true,
    () => false,
  );
}

export interface PrefillDetail {
  coat?: string;
  size?: string;
  packageId?: string;
  suburb?: string;
}

export const PREFILL_EVENT = "mh:prefill";

export function emitPrefill(detail: PrefillDetail) {
  window.dispatchEvent(new CustomEvent<PrefillDetail>(PREFILL_EVENT, { detail }));
}
