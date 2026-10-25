"use client";

import { useEffect, useId, useRef, useState } from "react";
import { COATS, PACKAGES, SIZES, SUBURBS, formatDuration, recommend, type CoatId, type SizeId } from "@/lib/data";
import { EMPTY, ORDER, validate, type Errors, type Values } from "@/lib/booking";
import { PREFILL_EVENT, useHydrated, type PrefillDetail } from "@/lib/hydrated";

function todayIso() {
  const d = new Date();
  const p = (n: number) => String(n).padStart(2, "0");
  return `${d.getFullYear()}-${p(d.getMonth() + 1)}-${p(d.getDate())}`;
}

export function BookingForm() {
  const uid = useId();
  const hydrated = useHydrated();
  const [values, setValues] = useState<Values>(EMPTY);
  const [errors, setErrors] = useState<Errors>({});
  const [done, setDone] = useState<Values | null>(null);
  const [today, setToday] = useState("");
  const [prefilled, setPrefilled] = useState(false);
  const summaryRef = useRef<HTMLDivElement>(null);
  const successRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    setToday(todayIso());
  }, []);

  useEffect(() => {
    const handler = (ev: Event) => {
      const d = (ev as CustomEvent<PrefillDetail>).detail ?? {};
      setValues((v) => ({
        ...v,
        coat: d.coat ?? v.coat,
        size: d.size ?? v.size,
        packageId: d.packageId ?? v.packageId,
        suburb: d.suburb ?? v.suburb,
      }));
      setPrefilled(true);
    };
    window.addEventListener(PREFILL_EVENT, handler);
    return () => window.removeEventListener(PREFILL_EVENT, handler);
  }, []);

  const id = (k: string) => `${uid}-${k}`;
  const set = <K extends keyof Values>(k: K, val: Values[K]) => {
    setValues((v) => ({ ...v, [k]: val }));
    if (errors[k]) setErrors((e) => ({ ...e, [k]: undefined }));
  };

  const onSubmit = (ev: React.FormEvent) => {
    ev.preventDefault();
    const errs = validate(values, today);
    setErrors(errs);
    const firstKey = ORDER.find((k) => errs[k]);
    if (firstKey) {
      requestAnimationFrame(() => {
        summaryRef.current?.focus();
      });
      return;
    }
    setDone(values);
    requestAnimationFrame(() => successRef.current?.focus());
  };

  const focusField = (k: keyof Values) => {
    const el = formRef.current?.querySelector<HTMLElement>(`[name="${k}"]`);
    el?.focus();
  };

  const errorList = ORDER.filter((k) => errors[k]);
  const rec =
    values.coat && values.size ? recommend(values.coat as CoatId, values.size as SizeId) : null;

  const reset = () => {
    setValues(EMPTY);
    setErrors({});
    setDone(null);
    setPrefilled(false);
  };

  if (done) {
    const pack = PACKAGES.find((p) => p.id === done.packageId);
    const r = done.coat && done.size ? recommend(done.coat as CoatId, done.size as SizeId) : null;
    return (
      <div className="success" ref={successRef} tabIndex={-1} role="status">
        <p className="eyebrow">Demo only</p>
        <h3 className="success__title">Thanks, {done.ownerName.split(" ")[0]}. That’s how it would feel.</h3>
        <p>
          <strong>This is a demonstration form. Nothing was sent, saved or stored.</strong> Mallow Hound is a fictional business, so
          no one will contact you and no groom has been booked.
        </p>
        <dl className="success__summary">
          <div>
            <dt>Dog</dt>
            <dd>{done.dogName}</dd>
          </div>
          <div>
            <dt>Suburb</dt>
            <dd>{done.suburb}</dd>
          </div>
          <div>
            <dt>Package</dt>
            <dd>{pack ? pack.name : r ? `${r.package.name} (recommended)` : "We’d recommend one"}</dd>
          </div>
          <div>
            <dt>Preferred day</dt>
            <dd>
              {done.date}, {done.window}
            </dd>
          </div>
          {r && (
            <div>
              <dt>Estimate</dt>
              <dd>
                ${r.price} · {formatDuration(r.minutes)}
              </dd>
            </div>
          )}
        </dl>
        <button type="button" className="btn btn--ink" onClick={reset}>
          Try the demo again
        </button>
      </div>
    );
  }

  return (
    <form className="booking" ref={formRef} onSubmit={onSubmit} noValidate aria-describedby={id("demo")}>
      <p className="booking__demo" id={id("demo")}>
        <strong>Demo form.</strong> It checks your answers in the browser, then shows a pretend confirmation. Nothing is sent anywhere.
      </p>

      {errorList.length > 0 && (
        <div className="error-summary" role="alert" tabIndex={-1} ref={summaryRef}>
          <p className="error-summary__title">Please fix {errorList.length === 1 ? "this" : "these"} before we continue:</p>
          <ul>
            {errorList.map((k) => (
              <li key={k}>
                <button type="button" className="link-btn" onClick={() => focusField(k)}>
                  {errors[k]}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}

      {prefilled && (
        <p className="booking__prefill" role="status">
          We’ve filled in your choices from the selector. Change anything you like.
        </p>
      )}

      <fieldset className="fs">
        <legend>About you</legend>
        <div className="grid2">
          <Field id={id("ownerName")} label="Your name" error={errors.ownerName}>
            <input
              id={id("ownerName")}
              name="ownerName"
              className="input"
              autoComplete="name"
              value={values.ownerName}
              onChange={(e) => set("ownerName", e.target.value)}
              aria-invalid={!!errors.ownerName}
              aria-describedby={errors.ownerName ? `${id("ownerName")}-err` : undefined}
            />
          </Field>
          <Field id={id("mobile")} label="Mobile" error={errors.mobile}>
            <input
              id={id("mobile")}
              name="mobile"
              className="input"
              type="tel"
              autoComplete="tel"
              inputMode="tel"
              value={values.mobile}
              onChange={(e) => set("mobile", e.target.value)}
              aria-invalid={!!errors.mobile}
              aria-describedby={errors.mobile ? `${id("mobile")}-err` : undefined}
            />
          </Field>
          <Field id={id("email")} label="Email" error={errors.email}>
            <input
              id={id("email")}
              name="email"
              className="input"
              type="email"
              autoComplete="email"
              value={values.email}
              onChange={(e) => set("email", e.target.value)}
              aria-invalid={!!errors.email}
              aria-describedby={errors.email ? `${id("email")}-err` : undefined}
            />
          </Field>
          <Field id={id("suburb")} label="Suburb" error={errors.suburb}>
            <select
              id={id("suburb")}
              name="suburb"
              className="input"
              value={values.suburb}
              onChange={(e) => set("suburb", e.target.value)}
              aria-invalid={!!errors.suburb}
              aria-describedby={errors.suburb ? `${id("suburb")}-err` : undefined}
            >
              <option value="">Choose a suburb</option>
              {SUBURBS.map((s) => (
                <option key={s.name} value={s.name}>
                  {s.name}
                </option>
              ))}
              <option value="Somewhere else (waitlist)">Somewhere else (waitlist)</option>
            </select>
          </Field>
        </div>
      </fieldset>

      <fieldset className="fs">
        <legend>About your dog</legend>
        <div className="grid2">
          <Field id={id("dogName")} label="Dog’s name" error={errors.dogName}>
            <input
              id={id("dogName")}
              name="dogName"
              className="input"
              value={values.dogName}
              onChange={(e) => set("dogName", e.target.value)}
              aria-invalid={!!errors.dogName}
              aria-describedby={errors.dogName ? `${id("dogName")}-err` : undefined}
            />
          </Field>
          <Field id={id("packageId")} label="Package">
            <select
              id={id("packageId")}
              name="packageId"
              className="input"
              value={values.packageId}
              onChange={(e) => set("packageId", e.target.value)}
            >
              <option value="">Not sure, recommend one</option>
              {PACKAGES.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.name}
                </option>
              ))}
            </select>
          </Field>
          <Field id={id("coat")} label="Coat type" error={errors.coat}>
            <select
              id={id("coat")}
              name="coat"
              className="input"
              value={values.coat}
              onChange={(e) => set("coat", e.target.value)}
              aria-invalid={!!errors.coat}
              aria-describedby={errors.coat ? `${id("coat")}-err` : undefined}
            >
              <option value="">Choose a coat</option>
              {COATS.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              ))}
            </select>
          </Field>
          <Field id={id("size")} label="Size" error={errors.size}>
            <select
              id={id("size")}
              name="size"
              className="input"
              value={values.size}
              onChange={(e) => set("size", e.target.value)}
              aria-invalid={!!errors.size}
              aria-describedby={errors.size ? `${id("size")}-err` : undefined}
            >
              <option value="">Choose a size</option>
              {SIZES.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.name} ({s.range})
                </option>
              ))}
            </select>
          </Field>
        </div>
        {rec && (
          <p className="booking__estimate" role="status">
            Estimate: <strong>{rec.package.name}</strong>, ${rec.price}, about {formatDuration(rec.minutes)}.
          </p>
        )}
      </fieldset>

      <fieldset className="fs">
        <legend>When suits you?</legend>
        <div className="grid2">
          <Field id={id("date")} label="Preferred day" error={errors.date}>
            <input
              id={id("date")}
              name="date"
              className="input"
              type="date"
              min={today || undefined}
              value={values.date}
              onChange={(e) => set("date", e.target.value)}
              aria-invalid={!!errors.date}
              aria-describedby={errors.date ? `${id("date")}-err` : undefined}
            />
          </Field>
          <div className="field">
            <span className="field__label" id={id("window-l")}>
              Arrival window
            </span>
            <div className="pills" role="radiogroup" aria-labelledby={id("window-l")}>
              {[
                ["morning", "Morning"],
                ["midday", "Midday"],
                ["afternoon", "Afternoon"],
              ].map(([val, label]) => (
                <label key={val} className="pill">
                  <input
                    type="radio"
                    name="window"
                    value={val}
                    checked={values.window === val}
                    onChange={() => set("window", val)}
                  />
                  <span>{label}</span>
                </label>
              ))}
            </div>
          </div>
        </div>
        <label className="check-line">
          <input
            type="checkbox"
            name="anxious"
            checked={values.anxious}
            onChange={(e) => set("anxious", e.target.checked)}
          />
          <span>My dog gets nervous. Please allow extra time and a gentle start.</span>
        </label>
        <Field id={id("notes")} label="Anything we should know? (optional)">
          <textarea
            id={id("notes")}
            name="notes"
            className="input"
            rows={3}
            value={values.notes}
            onChange={(e) => set("notes", e.target.value)}
          />
        </Field>
      </fieldset>

      <div className={`field${errors.demoOk ? " has-error" : ""}`}>
        <label className="check-line">
          <input
            type="checkbox"
            name="demoOk"
            checked={values.demoOk}
            onChange={(e) => set("demoOk", e.target.checked)}
            aria-invalid={!!errors.demoOk}
            aria-describedby={errors.demoOk ? `${id("demoOk")}-err` : undefined}
          />
          <span>I understand this is a fictional demo and nothing will be sent.</span>
        </label>
        {errors.demoOk && (
          <p className="field__error" id={`${id("demoOk")}-err`}>
            {errors.demoOk}
          </p>
        )}
      </div>

      <div className="booking__actions">
        <button type="submit" className="btn btn--coral btn--lg" disabled={!hydrated}>
          Request a groom (demo)
        </button>
        <noscript>
          <p className="note">The demo form needs JavaScript to run. Without it, nothing can be submitted.</p>
        </noscript>
      </div>
    </form>
  );
}

function Field({
  id,
  label,
  error,
  children,
}: {
  id: string;
  label: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div className={`field${error ? " has-error" : ""}`}>
      <label className="field__label" htmlFor={id}>
        {label}
      </label>
      {children}
      {error && (
        <p className="field__error" id={`${id}-err`}>
          {error}
        </p>
      )}
    </div>
  );
}
