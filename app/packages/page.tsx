import type { Metadata } from "next";
import Link from "next/link";
import { Dog, PuppyMark } from "@/components/Dogs";
import { ADD_ONS, COATS, DEMO_PRICE, PACKAGES, SIZES, ZONE_FEES, formatDuration, recommend, type CoatId } from "@/lib/data";

export const metadata: Metadata = {
  title: "The full menu",
  description: "Demonstration prices and times for every Mallow Hound groom, coat and size. A fictional OFF/SHIFT Studio concept.",
};

const DOG: Record<string, CoatId> = {
  "fresh-start": "short",
  "full-mallow": "curly",
  "shed-less": "double",
  "puppy-debut": "wiry",
};

export default function PackagesPage() {
  return (
    <>
      <section className="menu-mast" data-layout="menu-mast">
        <div className="stop__inner">
          <p className="kicker kicker--light">Every package, one page</p>
          <h1 className="stepped stepped--light">
            <span>The full </span>
            <span>menu.</span>
          </h1>
          <p className="menu-mast__lead">Every inclusion, then the price ledger. Figures are invented. Nothing here is a quote.</p>
        </div>
      </section>

      <section className="stop stop--paper" data-layout="menu-ledger" aria-labelledby="ledger-title">
        <div className="stop__inner">
          <h2 id="ledger-title" className="h-step">
            <span>Price ledger</span>
          </h2>
          <p className="demo-flag">{DEMO_PRICE}</p>
          <div className="table-wrap" tabIndex={0} role="region" aria-label="Demonstration price ledger, scrollable">
            <table>
              <caption>Recommended package, time and demonstration price for every coat and size. Puppy Debut is a flat $59.</caption>
              <thead>
                <tr>
                  <th scope="col">Coat</th>
                  {SIZES.map((size) => (
                    <th scope="col" key={size.id}>
                      {size.name}
                      <span>{size.range}</span>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {COATS.map((coat) => (
                  <tr key={coat.id}>
                    <th scope="row">
                      {coat.name}
                      <span>{PACKAGES.find((pack) => pack.id === coat.packageId)?.name}</span>
                    </th>
                    {SIZES.map((size) => {
                      const rec = recommend(coat.id, size.id);
                      return (
                        <td key={size.id}>
                          <strong>${rec.price}</strong>
                          <span>{formatDuration(rec.minutes)}</span>
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="fine">Outer-zone suburbs add a flat ${ZONE_FEES[2]} demonstration travel fee. Matted coats are discussed before a clipper comes out.</p>
        </div>
      </section>

      {PACKAGES.map((pack) => {
        const art = pack.id === "puppy-debut" ? <PuppyMark /> : <Dog coat={DOG[pack.id]} />;
        const price = (
          <p className="menu-price">
            <span className="demo-flag">Demonstration price</span>
            <strong>${pack.basePrice}</strong>
            <small>about {formatDuration(pack.baseMinutes)} for the smallest dogs</small>
          </p>
        );
        const includes = (
          <ul className="menu-includes">
            {pack.includes.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        );
        if (pack.id === "fresh-start") {
          return (
            <section key={pack.id} id={pack.id} className="menu-piece menu-piece--price" data-layout="menu-price" aria-labelledby={`${pack.id}-title`}>
              <div className="menu-piece__pad">
                {price}
                <div>
                  <h2 id={`${pack.id}-title`}>{pack.name}</h2>
                  <p>{pack.tagline}</p>
                  <p>
                    <strong>Best for:</strong> {pack.bestFor}
                  </p>
                  {includes}
                </div>
                <div className="menu-piece__dog" aria-hidden="true">
                  {art}
                </div>
              </div>
            </section>
          );
        }
        if (pack.id === "full-mallow") {
          return (
            <section key={pack.id} id={pack.id} className="menu-piece menu-piece--flip" data-layout="menu-flip" aria-labelledby={`${pack.id}-title`}>
              <div className="menu-piece__pad">
                <div>
                  <h2 id={`${pack.id}-title`}>{pack.name}</h2>
                  <p>{pack.tagline}</p>
                  {includes}
                  <p>
                    <strong>Best for:</strong> {pack.bestFor}
                  </p>
                </div>
                <div className="menu-piece__side">
                  <div className="menu-piece__dog" aria-hidden="true">
                    {art}
                  </div>
                  {price}
                </div>
              </div>
            </section>
          );
        }
        if (pack.id === "shed-less") {
          return (
            <section key={pack.id} id={pack.id} className="menu-piece menu-piece--ledger" data-layout="menu-rows" aria-labelledby={`${pack.id}-title`}>
              <div className="menu-piece__pad">
                <div className="menu-piece__head">
                  <h2 id={`${pack.id}-title`}>{pack.name}</h2>
                  <div className="menu-piece__dog menu-piece__dog--tiny" aria-hidden="true">
                    {art}
                  </div>
                  {price}
                </div>
                <p>{pack.tagline}</p>
                {includes}
                <p>
                  <strong>Best for:</strong> {pack.bestFor}
                </p>
              </div>
            </section>
          );
        }
        return (
          <section key={pack.id} id={pack.id} className="menu-piece menu-piece--stack" data-layout="menu-stack" aria-labelledby={`${pack.id}-title`}>
            <div className="menu-piece__pad">
              <div className="menu-piece__dog" aria-hidden="true">
                {art}
              </div>
              <h2 id={`${pack.id}-title`}>{pack.name}</h2>
              <p>{pack.tagline}</p>
              {price}
              {includes}
              <p>
                <strong>Best for:</strong> {pack.bestFor}
              </p>
            </div>
          </section>
        );
      })}

      <section className="stop stop--grape" data-layout="menu-extras" aria-labelledby="extras-title">
        <div className="stop__inner extras">
          <div>
            <h2 id="extras-title" className="h-step">
              <span>Little extras</span>
            </h2>
            <p>Add any of these when you book. Still demonstration prices.</p>
            <ul className="extras__list">
              {ADD_ONS.map((item) => (
                <li key={item.name}>
                  <div>
                    <h3>{item.name}</h3>
                    <p>{item.note}</p>
                  </div>
                  <strong>{item.price}</strong>
                </li>
              ))}
            </ul>
          </div>
          <p className="extras__cta">
            <Link prefetch={false} className="btn" href="/#booking">
              Pick a day on the route
            </Link>
          </p>
        </div>
      </section>
    </>
  );
}
