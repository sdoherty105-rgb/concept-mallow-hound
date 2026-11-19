"use client";

import { COATS, DEMO_PRICE, SIZES, formatDuration, recommend } from "@/lib/data";
import { emitPrefill, useHydrated } from "@/lib/hydrated";
import { Dog } from "./Dogs";
import { useRoute } from "./RouteState";

export function CoatSelector() {
  const { coat, size, chooseCoat, chooseSize } = useRoute();
  const hydrated = useHydrated();
  const rec = recommend(coat, size);

  return (
    <div className="selector">
      <form onSubmit={(event) => event.preventDefault()} aria-label="Coat and size selector">
        <fieldset className="choice-set">
          <legend>What’s their coat like?</legend>
          <div className="choice-grid choice-grid--coats">
            {COATS.map((item) => (
              <label key={item.id} className="choice">
                <input
                  type="radio"
                  name="coat"
                  value={item.id}
                  checked={coat === item.id}
                  onChange={() => chooseCoat(item.id)}
                  disabled={!hydrated}
                />
                <span className="choice__card">
                  <Dog coat={item.id} className="choice__dog" />
                  <span className="choice__title">{item.name}</span>
                  <span className="choice__sub">{item.examples}</span>
                </span>
              </label>
            ))}
          </div>
        </fieldset>

        <fieldset className="choice-set">
          <legend>How big are they?</legend>
          <div className="choice-grid choice-grid--sizes">
            {SIZES.map((item) => (
              <label key={item.id} className="choice">
                <input
                  type="radio"
                  name="size"
                  value={item.id}
                  checked={size === item.id}
                  onChange={() => chooseSize(item.id)}
                  disabled={!hydrated}
                />
                <span className="choice__card choice__card--size">
                  <span className="choice__title">{item.name}</span>
                  <span className="choice__sub">{item.range}</span>
                </span>
              </label>
            ))}
          </div>
        </fieldset>
      </form>
      <noscript>
        <p className="note">The picker needs JavaScript. The full price ledger is on the menu page.</p>
      </noscript>

      <aside className="result" aria-labelledby="result-title">
        <div className="result__art" aria-hidden="true">
          <Dog coat={coat} className="result__dog" />
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
          <p className="demo-flag">{DEMO_PRICE}</p>
          <p className="result__why">{rec.coat.why}</p>
          <p className="result__care">
            <strong>Between visits:</strong> {rec.coat.care}
          </p>
        </div>
        <a className="btn" href="#booking" onClick={() => emitPrefill({ coat, size, packageId: rec.package.id })}>
          Book this groom
        </a>
        <p className="result__fine">Outer-zone suburbs add a $15 demonstration travel fee. Matted coats are quoted before anything starts.</p>
      </aside>
    </div>
  );
}
