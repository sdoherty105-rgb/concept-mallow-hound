"use client";

import { useId, useState } from "react";
import { DEMO_SCHEDULE, SUBURBS, ZONE_FEES, checkSuburb, type SuburbCheck, type Zone } from "@/lib/data";
import { emitPrefill, useHydrated } from "@/lib/hydrated";
import { VanArt } from "./Van";

function ZoneList({ zone, active, onPick }: { zone: Zone; active?: string; onPick: (name: string) => void }) {
  const hydrated = useHydrated();
  return (
    <ul className="suburb-list">
      {SUBURBS.filter((suburb) => suburb.zone === zone).map((suburb) => (
        <li key={suburb.name}>
          {hydrated ? (
            <button type="button" className={`suburb-btn${active === suburb.name ? " is-on" : ""}`} onClick={() => onPick(suburb.name)} aria-pressed={active === suburb.name}>
              {suburb.name}
            </button>
          ) : (
            <span className="suburb-btn">{suburb.name}</span>
          )}
        </li>
      ))}
    </ul>
  );
}

function Result({ res, onWaitlist }: { res: SuburbCheck; onWaitlist: () => void }) {
  if (res.kind === "empty") {
    return <p className="check__hint">The side panel stays blank until a suburb is named.</p>;
  }
  if (res.kind === "covered") {
    const fee = ZONE_FEES[res.suburb.zone];
    return (
      <div className="check__result">
        <p className="check__headline">Yes, we come to {res.suburb.name}.</p>
        <p className="van-window">{res.suburb.visit}</p>
        <p className="demo-flag">{DEMO_SCHEDULE}</p>
        <p>
          {fee === 0
            ? "It’s in our home zone, so there’s no travel fee."
            : `It’s in our outer zone, so there’s a flat $${fee} travel fee.`}
        </p>
        <a className="text-link" href="#booking" onClick={() => emitPrefill({ suburb: res.suburb.name })}>
          Use {res.suburb.name} in the booking
        </a>
      </div>
    );
  }
  return (
    <div className="check__result">
      <p className="check__headline">We don’t reach “{res.query}” yet.</p>
      {res.suggestions.length > 0 && <p>Did you mean {res.suggestions.map((suburb) => suburb.name).join(" or ")}?</p>}
      <p>The route is fictional. You can still add the name to the demonstration booking.</p>
      <a className="text-link" href="#booking" onClick={onWaitlist}>
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
  const panel = res.kind === "covered" ? res.suburb.name : "Your suburb";

  const run = (query: string) => {
    setValue(query);
    setSubmitted(query);
  };

  return (
    <>
      <form
        className="suburb-form"
        onSubmit={(event) => {
          event.preventDefault();
          setSubmitted(value);
        }}
        role="search"
        aria-label="Suburb checker"
      >
        <label htmlFor={inputId} className="suburb-label">
          Your suburb
        </label>
        <input
          id={inputId}
          className="suburb-input"
          type="text"
          list={listId}
          value={value}
          onChange={(event) => {
            setValue(event.target.value);
            setSubmitted(event.target.value);
          }}
          placeholder="Type your suburb"
          autoComplete="off"
          disabled={!hydrated}
        />
        <datalist id={listId}>
          {SUBURBS.map((suburb) => (
            <option key={suburb.name} value={suburb.name} />
          ))}
        </datalist>
        <p className="suburb-note">Invented suburbs only. The check runs in the browser.</p>
      </form>

      <div className="hero-stage">
        <div className="hero-van">
          <VanArt />
          <p className="van-panel" data-suburb={active ?? ""}>
            {panel}
          </p>
        </div>
        <div className="curb" />
        <div className="check__out" role="status" aria-live="polite">
          <Result res={res} onWaitlist={() => emitPrefill({ suburb: "Somewhere else (waitlist)" })} />
        </div>
        <noscript>
          <p className="note">The suburb checker needs JavaScript. The full list of invented suburbs is below.</p>
        </noscript>
        <details className="zone-fold">
          <summary>Every suburb on the route</summary>
          <div className="zones">
            <div>
              <p className="zone-h">Home zone, no travel fee</p>
              <ZoneList zone={1} active={active} onPick={run} />
            </div>
            <div>
              <p className="zone-h">Outer zone, $15 travel</p>
              <ZoneList zone={2} active={active} onPick={run} />
            </div>
          </div>
          <p className="fine">Suburb names are invented for this concept. Travel fees are demonstration figures.</p>
        </details>
      </div>
    </>
  );
}
