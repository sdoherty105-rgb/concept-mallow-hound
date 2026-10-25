"use client";

import { useId, useState } from "react";
import { SUBURBS, ZONE_FEES, checkSuburb, type SuburbCheck, type Zone } from "@/lib/data";
import { emitPrefill, useHydrated } from "@/lib/hydrated";


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

    </div>
  );
}

