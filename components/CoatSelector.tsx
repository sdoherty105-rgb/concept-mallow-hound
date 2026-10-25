"use client";

import { useState } from "react";
import { COATS, SIZES, PACKAGES, formatDuration, recommend, type CoatId, type SizeId } from "@/lib/data";
import { emitPrefill, useHydrated } from "@/lib/hydrated";
import { Dog } from "./Dogs";

function SizeGlyph({ level }: { level: number }) {
  const s = 14 + level * 7;
  return (
    <svg width="44" height="44" viewBox="0 0 44 44" aria-hidden="true" focusable="false">
      <ellipse cx="22" cy="40" rx={8 + level * 3} ry="2.5" fill="currentColor" opacity=".18" />
      <g fill="currentColor" transform={`translate(22 ${40 - s * 0.55}) scale(${s / 32}) translate(-16 -16)`}>
        <ellipse cx="16" cy="21.5" rx="7.5" ry="6" />
        <ellipse cx="6.5" cy="14" rx="3" ry="4" transform="rotate(-18 6.5 14)" />
        <ellipse cx="12" cy="8.5" rx="3.1" ry="4.2" transform="rotate(-6 12 8.5)" />
        <ellipse cx="20" cy="8.5" rx="3.1" ry="4.2" transform="rotate(6 20 8.5)" />
        <ellipse cx="25.5" cy="14" rx="3" ry="4" transform="rotate(18 25.5 14)" />
      </g>
    </svg>
  );
}

export function CoatSelector() {
  const [coat, setCoat] = useState<CoatId>("curly");
  const [size, setSize] = useState<SizeId>("medium");
  const hydrated = useHydrated();
  const rec = recommend(coat, size);

  return (
    <div className="selector">
      <div className="selector__controls">
        <form onSubmit={(e) => e.preventDefault()} aria-label="Coat and size selector">
          <fieldset className="choice-set">
            <legend>
              <span className="step-pill">1</span> What’s their coat like?
            </legend>
            <div className="choice-grid choice-grid--coats">
              {COATS.map((c) => (
                <label key={c.id} className="choice">
                  <input
                    type="radio"
                    name="coat"
                    value={c.id}
                    checked={coat === c.id}
                    onChange={() => setCoat(c.id)}
                    disabled={!hydrated}
                  />
                  <span className="choice__card">
                    <Dog coat={c.id} className="choice__dog" />
                    <span className="choice__title">{c.name}</span>
                    <span className="choice__sub">{c.examples}</span>
                  </span>
                </label>
              ))}
            </div>
          </fieldset>

          <fieldset className="choice-set">
            <legend>
              <span className="step-pill">2</span> How big are they?
            </legend>
            <div className="choice-grid choice-grid--sizes">
              {SIZES.map((s, i) => (
                <label key={s.id} className="choice">
                  <input
                    type="radio"
                    name="size"
                    value={s.id}
                    checked={size === s.id}
                    onChange={() => setSize(s.id)}
                    disabled={!hydrated}
                  />
                  <span className="choice__card choice__card--size">
                    <SizeGlyph level={i} />
                    <span className="choice__title">{s.name}</span>
                    <span className="choice__sub">{s.range}</span>
                  </span>
                </label>
              ))}
            </div>
          </fieldset>
        </form>
        <noscript>
          <p className="note">
            The picker needs JavaScript. Without it, the full price guide below lists every coat and size.
          </p>
        </noscript>
      </div>

      <aside className="result" aria-labelledby="result-title">
        <div className="result__art" aria-hidden="true">
          <div className="result__stage">
            <div className="result__dog" style={{ transform: `scale(${rec.size.scale})` }}>
              <Dog coat={coat} />
            </div>
            <div className="result__ground" />
          </div>
        </div>
        <div className="result__body" aria-live="polite" aria-atomic="true">
          <p className="eyebrow" id="result-title">
            We’d book
          </p>
          <p className="result__package">{rec.package.name}</p>
          <dl className="result__facts">
            <div>
              <dt>Time on the van</dt>
              <dd>{formatDuration(rec.minutes)}</dd>
            </div>
            <div>
              <dt>Price</dt>
              <dd>${rec.price}</dd>
            </div>
          </dl>
          <p className="result__why">{rec.coat.why}</p>
          <p className="result__care">
            <strong>Between visits:</strong> {rec.coat.care}
          </p>
          <ul className="feature-list">
            {rec.package.includes.slice(0, 4).map((i) => (
              <li key={i}>{i}</li>
            ))}
          </ul>
        </div>
        <a
          className="btn btn--coral"
          href="#booking"
          onClick={() => emitPrefill({ coat, size, packageId: rec.package.id })}
        >
          Book this groom
        </a>
        <p className="result__fine">
          Outer-zone suburbs add a $15 travel fee. Matted coats are quoted before we start.
        </p>
      </aside>

      <details className="matrix">
        <summary>See every coat and size combination</summary>
        <div className="table-wrap" tabIndex={0} role="region" aria-label="Price guide table, scrollable">
          <table>
            <caption className="visually-hidden">Recommended package, time and price for every coat type and dog size</caption>
            <thead>
              <tr>
                <th scope="col">Coat</th>
                {SIZES.map((s) => (
                  <th scope="col" key={s.id}>
                    {s.name}
                    <span>{s.range}</span>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {COATS.map((c) => (
                <tr key={c.id}>
                  <th scope="row">
                    {c.name}
                    <span>{PACKAGES.find((p) => p.id === c.packageId)?.name}</span>
                  </th>
                  {SIZES.map((s) => {
                    const r = recommend(c.id, s.id);
                    return (
                      <td key={s.id}>
                        <strong>${r.price}</strong>
                        <span>{formatDuration(r.minutes)}</span>
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </details>
    </div>
  );
}
