import type { Metadata } from "next";
import Link from "next/link";
import { Dog } from "@/components/Dogs";
import { ADD_ONS, COATS, PACKAGES, SIZES, ZONE_FEES, formatDuration, recommend } from "@/lib/data";
import type { CoatId } from "@/lib/data";

export const metadata: Metadata = {
  title: "Package details",
  description: "Everything included in each Mallow Hound grooming package, with prices and times for every coat and size (fictional concept).",
};

const PACKAGE_DOG: Record<string, CoatId> = {
  "fresh-start": "short",
  "full-mallow": "curly",
  "shed-less": "double",
  "puppy-debut": "wiry",
};

export default function PackagesPage() {
  return (
    <>
      <section className="page-hero section--lav">
        <div className="wrap">
          <nav aria-label="Breadcrumb" className="crumbs">
            <ol>
              <li>
                <Link prefetch={false} href="/">Home</Link>
              </li>
              <li aria-current="page">Package details</li>
            </ol>
          </nav>
          <p className="eyebrow">Packages in detail</p>
          <h1 className="page-title">What’s included, and what it costs</h1>
          <p className="lead">
            Every groom starts with a hello and ends with a treat. Here’s exactly what each package covers, plus the price and time for your
            dog’s coat and size.
          </p>
        </div>
      </section>

      <section className="section section--cream" aria-labelledby="inc-title">
        <div className="wrap">
          <h2 id="inc-title" className="visually-hidden">
            Package inclusions
          </h2>
          <ul className="detail-list">
            {PACKAGES.map((p) => (
              <li key={p.id} id={p.id} className={`detail detail--${p.tint}`}>
                <div className="detail__art">
                  <Dog coat={PACKAGE_DOG[p.id]} collar={p.tint === "coral" ? "#FFF7EB" : undefined} />
                </div>
                <div className="detail__body">
                  <h3>{p.name}</h3>
                  <p className="detail__tag">{p.tagline}</p>
                  <ul className="ticks">
                    {p.includes.map((i) => (
                      <li key={i}>{i}</li>
                    ))}
                  </ul>
                  <p className="pkg__best">
                    <strong>Best for:</strong> {p.bestFor}
                  </p>
                </div>
                <div className="detail__price">
                  <span>From</span>
                  <strong>${p.basePrice}</strong>
                  <small>about {formatDuration(p.baseMinutes)} for the smallest dogs</small>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section section--mint" aria-labelledby="grid-title">
        <div className="wrap">
          <header className="section__head">
            <h2 id="grid-title">Price and time by coat and size</h2>
            <p className="lead lead--sm">
              The package shown is the one we’d recommend for that coat. Puppy Debut is a flat $59 for pups under six months.
            </p>
          </header>
          <div className="table-wrap table-wrap--big" tabIndex={0} role="region" aria-label="Price guide table, scrollable">
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
          <p className="fine">
            Outer-zone suburbs add a flat ${ZONE_FEES[2]} travel fee. Matted coats are quoted before we start.
          </p>
        </div>
      </section>

      <section className="section section--cream" aria-labelledby="add-title">
        <div className="wrap">
          <header className="section__head">
            <h2 id="add-title">Little extras</h2>
            <p className="lead lead--sm">Add any of these to a groom when you book.</p>
          </header>
          <ul className="addons">
            {ADD_ONS.map((a) => (
              <li key={a.name} className="addon">
                <div>
                  <h3>{a.name}</h3>
                  <p>{a.note}</p>
                </div>
                <strong>{a.price}</strong>
              </li>
            ))}
          </ul>
          <div className="cta-band">
            <div>
              <h2>Ready when you are</h2>
              <p>Choose a day and tell us about your dog. It only takes a minute.</p>
            </div>
            <Link prefetch={false} className="btn btn--coral btn--lg" href="/#booking">
              Book a groom
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
