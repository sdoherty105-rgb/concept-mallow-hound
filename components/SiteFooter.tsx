import Link from "next/link";
import { CONCEPT_LABEL, CONCEPT_URL, HOURS } from "@/lib/data";
import { LogoMark } from "./Logo";
import { NAV } from "./SiteHeader";

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="wrap site-footer__grid">
        <div>
          <p className="brand brand--footer">
            <LogoMark size={44} />
            <span className="brand__name">Mallow Hound</span>
          </p>
          <p className="site-footer__blurb">
            A mobile grooming van for dogs across the Perth area. Warm water, calm hands and a fresh pup at your front gate.
          </p>
        </div>
        <nav aria-label="Footer">
          <h2 className="footer-h">Explore</h2>
          <ul className="footer-list">
            {NAV.map((l) => (
              <li key={l.href}>
                <a href={l.href}>{l.label}</a>
              </li>
            ))}
            <li>
              <Link prefetch={false} href="/packages">Package details</Link>
            </li>
            <li>
              <a href="/#booking">Book a groom</a>
            </li>
          </ul>
        </nav>
        <div>
          <h2 className="footer-h">Van hours</h2>
          <ul className="footer-list">
            {HOURS.map((h) => (
              <li key={h.day}>
                <strong>{h.day}</strong>
                <br />
                {h.time}
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h2 className="footer-h">Say hello</h2>
          <ul className="footer-list">
            <li>(08) 5550 0142</li>
            <li>hello@mallowhound.example</li>
            <li>Perth, Western Australia</li>
          </ul>
          <p className="footer-small">Fictional contact details. Nothing here is monitored.</p>
        </div>
      </div>
      <div className="wrap site-footer__legal">
        <p>
          <a href={CONCEPT_URL} target="_blank" rel="noopener noreferrer">
            {CONCEPT_LABEL}
            <span className="visually-hidden"> (opens in a new tab)</span>
          </a>
        </p>
        <p>
          Mallow Hound is not a real business. Prices, services and suburbs are invented. Illustrations are original SVG artwork made for this concept.
        </p>
      </div>
    </footer>
  );
}
