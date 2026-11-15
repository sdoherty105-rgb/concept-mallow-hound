"use client";

import { cloneElement, isValidElement, useEffect, useId, useMemo, useRef, useState, type FormEvent, type ReactElement, type ReactNode } from "react";
import { COATS, DEMO_SLOTS, PACKAGES, SIZES, SUBURBS, estimate, formatDuration, type CoatId, type SizeId } from "@/lib/data";
import { EMPTY, ORDER, validate, type Errors, type Values } from "@/lib/booking";
import { PREFILL_EVENT, useHydrated, type PrefillDetail } from "@/lib/hydrated";

function isoFromDate(date: Date) {
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`;
}

function todayIso() {
  return isoFromDate(new Date());
}

const WINDOWS: Record<string, string> = { morning: "Morning", midday: "Midday", afternoon: "Afternoon" };

function longDay(iso: string) {
  if (!iso) return "";
  return new Intl.DateTimeFormat("en-AU", { weekday: "long", day: "numeric", month: "long" }).format(new Date(`${iso}T12:00:00`));
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
    const handler = (event: Event) => {
      const detail = (event as CustomEvent<PrefillDetail>).detail ?? {};
      setValues((current) => ({
        ...current,
        coat: detail.coat ?? current.coat,
        size: detail.size ?? current.size,
        packageId: detail.packageId ?? current.packageId,
        suburb: detail.suburb ?? current.suburb,
      }));
      setPrefilled(true);
    };
    window.addEventListener(PREFILL_EVENT, handler);
    return () => window.removeEventListener(PREFILL_EVENT, handler);
  }, []);

  const days = useMemo(() => {
    if (!today) return [];
    const start = new Date(`${today}T12:00:00`);
    return Array.from({ length: 7 }, (_, index) => {
      const date = new Date(start);
      date.setDate(start.getDate() + index);
      const iso = isoFromDate(date);
      const resting = date.getDay() === 0;
      const label = new Intl.DateTimeFormat("en-AU", { weekday: "short", day: "numeric", month: "short" }).format(date);
      return { iso, label, resting };
    });
  }, [today]);

  const id = (key: string) => `${uid}-${key}`;
  const set = <K extends keyof Values>(key: K, val: Values[K]) => {
    setValues((current) => ({ ...current, [key]: val }));
    if (errors[key]) setErrors((current) => ({ ...current, [key]: undefined }));
  };

  const onSubmit = (event: FormEvent) => {
    event.preventDefault();
    const nextErrors = validate(values, today);
    setErrors(nextErrors);
    const firstKey = ORDER.find((key) => nextErrors[key]);
    if (firstKey) {
      requestAnimationFrame(() => {
        summaryRef.current?.focus();
      });
      return;
    }
    setDone(values);
    requestAnimationFrame(() => successRef.current?.focus());
  };

  const focusField = (key: keyof Values) => {
    const el = formRef.current?.querySelector<HTMLElement>(`[name="${key}"]:not(:disabled)`);
    el?.focus();
  };

  const errorList = ORDER.filter((key) => errors[key]);
  const est = values.coat && values.size ? estimate(values.coat as CoatId, values.size as SizeId, values.packageId, values.suburb) : null;

  const reset = () => {
    setValues(EMPTY);
    setErrors({});
    setDone(null);
    setPrefilled(false);
  };

  if (done) {
    const doneEst = estimate(done.coat as CoatId, done.size as SizeId, done.packageId, done.suburb);
    return (
      <div className="success" ref={successRef} tabIndex={-1} role="status">
        <p className="eyebrow">Demo only</p>
        <h3 className="success__title">Thanks, {done.ownerName.split(" ")[0]}. That’s the shape of a booking.</h3>
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
            <dd>
              {doneEst.package.name}
              {doneEst.recommended ? " (recommended)" : ""}
            </dd>
          </div>
          <div>
            <dt>Preferred day</dt>
            <dd>
              {longDay(done.date)}, {WINDOWS[done.window]?.toLowerCase()}
            </dd>
          </div>
          <div>
            <dt>Demonstration estimate</dt>
            <dd>
              ${doneEst.total}
              {doneEst.travel ? ` incl. $${doneEst.travel} travel` : ""}, about {formatDuration(doneEst.minutes)}
            </dd>
          </div>
        </dl>
        <button type="button" className="btn" onClick={reset}>
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

      <fieldset className={`fs days-set${errors.date ? " has-error" : ""}`} aria-describedby={errors.date ? `${id("date")}-err` : id("days-note")}>
        <legend>Pick a day</legend>
        <p className="days-note" id={id("days-note")}>
          {DEMO_SLOTS} Sundays the van rests.
        </p>
        <div className="days">
          {days.map((day) => (
            <label key={day.iso} className={`day${day.resting ? " day--rest" : ""}`}>
              <input
                type="radio"
                name="date"
                value={day.iso}
                checked={values.date === day.iso}
                disabled={!hydrated || day.resting}
                onChange={() => set("date", day.iso)}
              />
              <span className="day__face">
                <span>{day.label}</span>
                {day.resting && <small>Resting</small>}
              </span>
            </label>
          ))}
        </div>
        {errors.date && (
          <p className="field__error" id={`${id("date")}-err`}>
            {errors.date}
          </p>
        )}
      </fieldset>

      {errorList.length > 0 && (
        <div className="error-summary" role="alert" tabIndex={-1} ref={summaryRef}>
          <p className="error-summary__title">Please fix {errorList.length === 1 ? "this" : "these"} before we continue:</p>
          <ul>
            {errorList.map((key) => (
              <li key={key}>
                <button type="button" className="link-btn" onClick={() => focusField(key)}>
                  {errors[key]}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}

      {prefilled && (
        <p className="booking__prefill" role="status">
          We’ve filled in your choices from earlier on the route. Change anything you like.
        </p>
      )}

      <fieldset className="fs">
        <legend>About you and your dog</legend>
        <div className="grid2">
          <Field id={id("ownerName")} label="Your name" error={errors.ownerName} required>
            <input
              id={id("ownerName")}
              name="ownerName"
              className="input"
              autoComplete="name"
              value={values.ownerName}
              onChange={(event) => set("ownerName", event.target.value)}
              aria-invalid={!!errors.ownerName}
              aria-describedby={errors.ownerName ? `${id("ownerName")}-err` : undefined}
            />
          </Field>
          <Field id={id("mobile")} label="Mobile" error={errors.mobile} required>
            <input
              id={id("mobile")}
              name="mobile"
              className="input"
              type="tel"
              autoComplete="tel"
              inputMode="tel"
              value={values.mobile}
              onChange={(event) => set("mobile", event.target.value)}
              aria-invalid={!!errors.mobile}
              aria-describedby={errors.mobile ? `${id("mobile")}-err` : undefined}
            />
          </Field>
          <Field id={id("email")} label="Email" error={errors.email} required>
            <input
              id={id("email")}
              name="email"
              className="input"
              type="email"
              autoComplete="email"
              value={values.email}
              onChange={(event) => set("email", event.target.value)}
              aria-invalid={!!errors.email}
              aria-describedby={errors.email ? `${id("email")}-err` : undefined}
            />
          </Field>
          <Field id={id("suburb")} label="Suburb" error={errors.suburb} required>
            <select
              id={id("suburb")}
              name="suburb"
              className="input"
              value={values.suburb}
              onChange={(event) => set("suburb", event.target.value)}
              aria-invalid={!!errors.suburb}
              aria-describedby={errors.suburb ? `${id("suburb")}-err` : undefined}
            >
              <option value="">Choose a suburb</option>
              {SUBURBS.map((suburb) => (
                <option key={suburb.name} value={suburb.name}>
                  {suburb.name}
                </option>
              ))}
              <option value="Somewhere else (waitlist)">Somewhere else (waitlist)</option>
            </select>
          </Field>
          <Field id={id("dogName")} label="Dog’s name" error={errors.dogName} required>
            <input
              id={id("dogName")}
              name="dogName"
              className="input"
              value={values.dogName}
              onChange={(event) => set("dogName", event.target.value)}
              aria-invalid={!!errors.dogName}
              aria-describedby={errors.dogName ? `${id("dogName")}-err` : undefined}
            />
          </Field>
          <Field id={id("packageId")} label="Package">
            <select id={id("packageId")} name="packageId" className="input" value={values.packageId} onChange={(event) => set("packageId", event.target.value)}>
              <option value="">Not sure, recommend one</option>
              {PACKAGES.map((pack) => (
                <option key={pack.id} value={pack.id}>
                  {pack.name}
                </option>
              ))}
            </select>
          </Field>
          <Field id={id("coat")} label="Coat type" error={errors.coat} required>
            <select
              id={id("coat")}
              name="coat"
              className="input"
              value={values.coat}
              onChange={(event) => set("coat", event.target.value)}
              aria-invalid={!!errors.coat}
              aria-describedby={errors.coat ? `${id("coat")}-err` : undefined}
            >
              <option value="">Choose a coat</option>
              {COATS.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.name}
                </option>
              ))}
            </select>
          </Field>
          <Field id={id("size")} label="Size" error={errors.size} required>
            <select
              id={id("size")}
              name="size"
              className="input"
              value={values.size}
              onChange={(event) => set("size", event.target.value)}
              aria-invalid={!!errors.size}
              aria-describedby={errors.size ? `${id("size")}-err` : undefined}
            >
              <option value="">Choose a size</option>
              {SIZES.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.name} ({item.range})
                </option>
              ))}
            </select>
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
                <label key={val} className="pill-choice">
                  <input type="radio" name="window" value={val} checked={values.window === val} onChange={() => set("window", val)} />
                  <span>{label}</span>
                </label>
              ))}
            </div>
          </div>
        </div>
        <div className="booking__estimate" aria-live="polite">
          {est ? (
            <p>
              Estimate: <strong>{est.package.name}</strong>
              {est.recommended ? " (recommended)" : ""}, ${est.groom}
              {est.travel ? ` + $${est.travel} outer-zone travel = $${est.total}` : ""}, about {formatDuration(est.minutes)}. Demonstration
              figure.
            </p>
          ) : (
            <p>Choose a coat and size to see a demonstration estimate.</p>
          )}
        </div>
        <label className="check-line">
          <input type="checkbox" name="anxious" checked={values.anxious} onChange={(event) => set("anxious", event.target.checked)} />
          <span>My dog gets nervous. Please allow extra time and a gentle start.</span>
        </label>
        <Field id={id("notes")} label="Anything we should know? (optional)">
          <textarea id={id("notes")} name="notes" className="input" rows={3} value={values.notes} onChange={(event) => set("notes", event.target.value)} />
        </Field>
      </fieldset>

      <div className={`field${errors.demoOk ? " has-error" : ""}`}>
        <label className="check-line">
          <input
            type="checkbox"
            name="demoOk"
            checked={values.demoOk}
            onChange={(event) => set("demoOk", event.target.checked)}
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
        <button type="submit" className="btn btn--solid" disabled={!hydrated}>
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
  required = false,
  children,
}: {
  id: string;
  label: string;
  error?: string;
  /** Marks the label "(required)" and sets aria-required on the control. */
  required?: boolean;
  children: ReactNode;
}) {
  const control =
    required && isValidElement(children)
      ? cloneElement(children as ReactElement<{ "aria-required"?: boolean }>, { "aria-required": true })
      : children;
  return (
    <div className={`field${error ? " has-error" : ""}`}>
      <label className="field__label" htmlFor={id}>
        {label}
        {required && (
          // aria-required already tells assistive tech; this keeps the accessible name to the label.
          <span className="field__req" aria-hidden="true">
            {" "}
            (required)
          </span>
        )}
      </label>
      {control}
      {error && (
        <p className="field__error" id={`${id}-err`}>
          {error}
        </p>
      )}
    </div>
  );
}
