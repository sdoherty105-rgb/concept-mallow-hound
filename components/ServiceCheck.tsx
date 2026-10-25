"use client";

import { useId, useState } from "react";
import { SUBURBS, ZONE_FEES, checkSuburb, type SuburbCheck, type Zone } from "@/lib/data";
import { emitPrefill, useHydrated } from "@/lib/hydrated";
import { C, Paw } from "./Dogs";

function ZoneList({ zone, active, onPick }: { zone: Zone; active?: string; onPick: (name: string) => void }) {
  const hydrated = useHydrated();
  return (
    <ul className="chips">
      {SUBURBS.filter((s) => s.zone === zone).map((s) => (
        <li key={s.name}>
          {hydrated ? (
            <button
              type="button"
              className={`chip${active === s.name ? " is-active" : ""}`}
              onClick={() => onPick(s.name)}
              aria-pressed={active === s.name}
            >
              {s.name}
            </button>
          ) : (
            <span className="chip">{s.name}</span>
          )}
        </li>
      ))}
    </ul>
  );
}

function AreaMap({ active }: { active?: string }) {
  return (
    <svg viewBox="0 0 640 400" className="map" aria-hidden="true" focusable="false">
      <rect width="640" height="400" rx="36" fill={C.cream} />
      <path d="M0 0 H150 C100 60 140 110 96 160 C60 200 110 250 80 300 C60 340 90 380 70 400 H0Z" fill={C.lavender} opacity=".8" />
      <path d="M0 0 H150 C100 60 140 110 96 160 C60 200 110 250 80 300 C60 340 90 380 70 400" fill="none" stroke={C.ink} strokeWidth="3.5" strokeLinecap="round" />
      <path d="M26 70 q12 -10 24 0 t24 0 M18 180 q12 -10 24 0 t24 0 M24 300 q12 -10 24 0 t24 0" fill="none" stroke={C.cream} strokeWidth="4" strokeLinecap="round" />
      <ellipse cx="320" cy="205" rx="268" ry="196" fill={C.mint} opacity=".35" />
      <ellipse cx="300" cy="206" rx="146" ry="104" fill={C.coral} opacity=".22" stroke={C.ink} strokeWidth="2.5" strokeDasharray="2 9" strokeLinecap="round" />
      <ellipse cx="320" cy="205" rx="268" ry="196" fill="none" stroke={C.ink} strokeWidth="2.5" strokeDasharray="2 9" strokeLinecap="round" />
      <path d="M440 0 C410 60 470 110 420 170 C390 210 440 250 420 300 C410 340 450 380 430 400" fill="none" stroke={C.lavender} strokeWidth="14" strokeLinecap="round" opacity=".85" />
      <g>
        <circle cx="300" cy="206" r="26" fill={C.ink} />
        <g transform="translate(284 190)">
          <Paw size={32} color={C.cream} />
        </g>
      </g>
      {SUBURBS.map((s) => {
        const on = active === s.name;
        return (
          <g key={s.name} className={`pin${on ? " is-active" : ""}`} transform={`translate(${s.x} ${s.y})`}>
            {on && <circle r="22" fill={C.coral} opacity=".35" className="pin__pulse" />}
            <circle r={on ? 11 : 8} fill={s.zone === 1 ? C.coral : C.lavender} stroke={C.ink} strokeWidth="3.5" />
          </g>
        );
      })}
    </svg>
  );
}

function Result({ res, onWaitlist }: { res: SuburbCheck; onWaitlist: () => void }) {
  if (res.kind === "empty") {
    return (
      <p className="check__hint">
        Type your suburb, or tap one from the lists, to see whether the van reaches you.
      </p>
    );
  }
  if (res.kind === "covered") {
    const fee = ZONE_FEES[res.suburb.zone];
    return (
      <div className="check__result check__result--yes">
        <p className="check__headline">Yes, we come to {res.suburb.name}.</p>
        <p>
          {fee === 0
            ? "It’s in our home zone, so there’s no travel fee."
            : `It’s in our outer zone, so there’s a flat $${fee} travel fee.`}
        </p>
        <a
          className="btn btn--ink btn--sm"
          href="#booking"
          onClick={() => emitPrefill({ suburb: res.suburb.name })}
        >
          Book in {res.suburb.name}
        </a>
      </div>
    );
  }
  return (
    <div className="check__result check__result--no">
      <p className="check__headline">We don’t reach “{res.query}” yet.</p>
      {res.suggestions.length > 0 && (
        <p>
          Did you mean {res.suggestions.map((s) => s.name).join(" or ")}?
        </p>
      )}
      <p>The van is only fictional, but if it were real you could join the waitlist for new areas.</p>
      <a className="btn btn--ink btn--sm" href="#booking" onClick={onWaitlist}>
        Join the waitlist (demo)
      </a>
    </div>
  );
}

export function ServiceCheck() {
  const inputId = useId();
  const listId = useId();
  const hydrated = useHydrated();
  const [value, setValue] = useState("");
  const [submitted, setSubmitted] = useState("");
  const res = checkSuburb(submitted);
  const active = res.kind === "covered" ? res.suburb.name : undefined;

  const run = (q: string) => {
    setValue(q);
    setSubmitted(q);
  };

  return (
    <div className="area">
      <div className="area__panel">
        <form
          className="check"
          onSubmit={(e) => {
            e.preventDefault();
            setSubmitted(value);
          }}
          role="search"
          aria-label="Suburb checker"
        >
          <label htmlFor={inputId} className="field__label">
            Your suburb
          </label>
          <div className="check__row">
            <input
              id={inputId}
              className="input"
              type="text"
              list={listId}
              value={value}
              onChange={(e) => {
                setValue(e.target.value);
                setSubmitted(e.target.value);
              }}
              placeholder="e.g. Mallow Bay"
              autoComplete="off"
              disabled={!hydrated}
            />
            <button type="submit" className="btn btn--ink" disabled={!hydrated}>
              Check
            </button>
          </div>
          <datalist id={listId}>
            {SUBURBS.map((s) => (
              <option key={s.name} value={s.name} />
            ))}
          </datalist>
        </form>
        <noscript>
          <p className="note">The suburb checker needs JavaScript. The full list of suburbs is below.</p>
        </noscript>
        <div className="check__out" role="status" aria-live="polite">
          <Result res={res} onWaitlist={() => emitPrefill({ suburb: "Somewhere else (waitlist)" })} />
        </div>

        <div className="zones">
          <div>
            <h3 className="zone-h">
              <span className="dot dot--coral" aria-hidden="true" /> Home zone, no travel fee
            </h3>
            <ZoneList zone={1} active={active} onPick={run} />
          </div>
          <div>
            <h3 className="zone-h">
              <span className="dot dot--lav" aria-hidden="true" /> Outer zone, +$15 travel
            </h3>
            <ZoneList zone={2} active={active} onPick={run} />
          </div>
        </div>
        <p className="fine">Suburb names are invented for this concept.</p>
      </div>
      <div className="area__map">
        <AreaMap active={active} />
      </div>
    </div>
  );
}
