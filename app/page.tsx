import Link from "next/link";
import { BookingForm } from "@/components/BookingForm";
import { CoatSelector } from "@/components/CoatSelector";
import { Dog } from "@/components/Dogs";

import { ServiceCheck } from "@/components/ServiceCheck";
import { VanBody, VanCutaway } from "@/components/Van";
import { FAQS, PACKAGES, PROMISES, formatDuration } from "@/lib/data";
import type { CoatId } from "@/lib/data";

const PACKAGE_DOG: Record<string, CoatId> = {
  "fresh-start": "short",
  "full-mallow": "curly",
  "shed-less": "double",
  "puppy-debut": "wiry",
};

const STEPS = [
  { t: "Pick a time", d: "Choose a day and arrival window, and tell us about your dog’s coat, size and any worries." },
  { t: "We pull up outside", d: "The van parks at your place with its own heated water and power. Nothing to plug in." },
  { t: "Spa time on board", d: "Your dog has the van to themselves: bath, dry and style, with breaks whenever they like." },
  { t: "A fresh pup at the gate", d: "We hand back a clean, fluffy, pleased dog and tell you how they went." },
];

const FEATURES = [
  { t: "Onboard water and power", d: "A water tank and power supply built into the van, so we never touch your tap or power points." },
  { t: "Warm-water tub", d: "A walk-in style tub at a comfy height, with a handheld sprayer and non-slip floor." },
  { t: "Quiet dryer", d: "A low-noise dryer on a movable arm, kept on the gentlest setting that works." },
  { t: "Non-slip grooming table", d: "A steady, padded table with a gentle support loop for wriggly or wobbly dogs." },
];



export default function HomePage() {
  return (
    <>
      <section className="hound-front" aria-labelledby="hero-title">
        <div className="wrap">
          <p className="hound-location">Mobile dog grooming / Perth</p>
          <h1 id="hero-title">The groom<br />comes to you.</h1>
          <div className="hound-van"><svg viewBox="0 0 650 335" role="img" aria-label="The Mallow Hound mobile grooming van, with a dog at its window"><VanBody /></svg></div>
          <div className="hound-welcome"><p>A warm bath, a tidy coat and a familiar face at the gate.<br />One dog at a time, right outside your home.</p><a className="btn btn--ink" href="#booking">Book a groom</a></div>
          <div className="hound-links"><a href="#area">Check your suburb</a><span>Onboard water &amp; power</span><a href="#coat">Find your dog&rsquo;s groom</a></div>
        </div>
      </section>

      <section id="area" className="section section--mint" aria-labelledby="area-title">
        <div className="wrap">
          <header className="section__head">
            <p className="eyebrow">Service area</p>
            <h2 id="area-title">Does the van come to you?</h2>
            <p className="lead lead--sm">We cover a loop of Perth suburbs, with a home zone and a slightly wider outer zone.</p>
          </header>
          <ServiceCheck />
        </div>
      </section>

      <section id="coat" className="section section--cream" aria-labelledby="coat-title">
        <div className="wrap">
          <header className="section__head">
            <p className="eyebrow">Coat selector</p>
            <h2 id="coat-title">Every coat is different.</h2>
            <p className="lead lead--sm">Pick a coat type and a size. We’ll show the package we’d book, how long it takes and what it costs.</p>
          </header>
          <CoatSelector />
        </div>
      </section>

      <section id="packages" className="section section--lav" aria-labelledby="pk-title">
        <div className="wrap">
          <header className="section__head">
            <p className="eyebrow">Packages</p>
            <h2 id="pk-title">The grooming menu.</h2>
            <p className="lead lead--sm">Honest prices, set by coat and size. Not sure which? The coat selector below will point you to the right one.</p>
          </header>
          <ul className="pkgs">
            {PACKAGES.map((p) => (
              <li key={p.id} className={`pkg pkg--${p.tint}`}>
                <div className="pkg__art">
                  <Dog coat={PACKAGE_DOG[p.id]} className="pkg__dog" collar={p.tint === "coral" ? "#FFF7EB" : undefined} />
                </div>
                <h3>{p.name}</h3>
                <p className="pkg__tag">{p.tagline}</p>
                <p className="pkg__price">
                  <span>From</span> ${p.basePrice}
                  <small>from {formatDuration(p.baseMinutes)} on the van</small>
                </p>
                <ul className="feature-list feature-list--sm">
                  {p.includes.slice(0, 4).map((i) => (
                    <li key={i}>{i}</li>
                  ))}
                </ul>
                <p className="pkg__best">
                  <strong>Best for:</strong> {p.bestFor}
                </p>
              </li>
            ))}
          </ul>
          <p className="center">
            <Link prefetch={false} className="btn btn--ink" href="/packages">
              See everything that’s included
            </Link>
          </p>
        </div>
      </section>

      <section id="how" className="section section--cream" aria-labelledby="how-title">
        <div className="wrap">
          <header className="section__head">
            <p className="eyebrow">How the mobile van works</p>
            <h2 id="how-title">A grooming salon on wheels, parked at your gate</h2>
            <p className="lead lead--sm">
              No car trips, no waiting room, no stressed goodbye at the door. Everything your dog needs is inside the van.
            </p>
          </header>
          <ol className="steps">
            {STEPS.map((s, i) => (
              <li key={s.t} className="step">
                <span className="step__n" aria-hidden="true">
                  {i + 1}
                </span>
                <h3>{s.t}</h3>
                <p>{s.d}</p>
              </li>
            ))}
          </ol>
          <div className="cutaway-wrap">
            <div className="cutaway-art">
              <VanCutaway />
            </div>
            <div className="cutaway-legend">
              <h3>Inside the van</h3>
              <ol className="legend">
                {FEATURES.map((f, i) => (
                  <li key={f.t}>
                    <span className="legend__n" aria-hidden="true">
                      {i + 1}
                    </span>
                    <div>
                      <strong>{f.t}</strong>
                      <p>{f.d}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </div>
      </section>

      <section id="calm" className="section section--lav calm" aria-labelledby="calm-title">
        <div className="wrap calm__grid">
          <div className="calm__art">
            <p className="calm-type">A little<br />patience.<br /><em>A lot of care.</em></p>
          </div>
          <div>
            <p className="eyebrow">At your dog’s pace</p>
            <h2 id="calm-title">Grooming should never feel like something being done to your dog</h2>
            <p className="lead lead--sm">Time to settle in. Breaks when they need them. Here is how we work.</p>
            <ul className="promises">
              {PROMISES.map((p) => (
                <li key={p.title} className="promise">

                  <div>
                    <h3>{p.title}</h3>
                    <p>{p.body}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section id="booking" className="section section--cream" aria-labelledby="book-title">
        <div className="wrap booking-grid">
          <div className="booking-intro">
            <p className="eyebrow">Book a groom</p>
            <h2 id="book-title">Tell us about your dog and pick a day</h2>
            <p className="lead lead--sm">
              It takes about a minute. Choose a package, or leave it blank and we’ll recommend one based on coat and size.
            </p>

          </div>
          <div className="booking-card">
            <BookingForm />
          </div>
        </div>
      </section>

      <section id="faq" className="section section--mint" aria-labelledby="faq-title">
        <div className="wrap faq-grid">
          <header className="section__head section__head--left">
            <p className="eyebrow">Questions</p>
            <h2 id="faq-title">Good questions, straight answers</h2>
            <p className="lead lead--sm">Don’t see yours? Most dogs have a story, so tell us in the booking form.</p>
          </header>
          <div className="faq">
            {FAQS.map((f) => (
              <details key={f.q} className="faq__item">
                <summary>{f.q}</summary>
                <p>{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

