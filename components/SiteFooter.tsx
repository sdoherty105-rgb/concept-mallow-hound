import Link from "next/link";
import { BACK_LABEL, CONCEPT_URL, CTA_LABEL, DISCLOSURE, HOURS, STUDIO_CONTACT_URL, STUDIO_HOME_URL, STUDIO_WORDMARK } from "@/lib/data";

export function SiteFooter() {
  return (
    <footer className="depot" data-layout="depot">
      <div className="depot__inner">
        <div>
          <p className="depot__kicker">The depot</p>
          <p className="depot__name">Mallow Hound</p>
          <p className="depot__blurb">The van sleeps here. One dog at a time, then back to the curb outside your place.</p>
        </div>
        <div>
          <h2 className="depot__h">Van hours</h2>
          <ul className="depot__list">
            {HOURS.map((slot) => (
              <li key={slot.day}>
                <strong>{slot.day}</strong>
                <span>{slot.time}</span>
              </li>
            ))}
          </ul>
          <p className="demo-flag">Demonstration hours. Not a live roster.</p>
        </div>
        <div>
          <h2 className="depot__h">Stops</h2>
          <ul className="depot__list">
            <li>
              <a href="/#how">How the van works</a>
            </li>
            <li>
              <a href="/#coat">Coat and size</a>
            </li>
            <li>
              <Link prefetch={false} href="/packages">
                Full menu
              </Link>
            </li>
            <li>
              <a href="/#booking">Book a day</a>
            </li>
            <li>
              <a href="/#faq">Questions</a>
            </li>
          </ul>
        </div>
        <div>
          <h2 className="depot__h">Say hello</h2>
          <ul className="depot__list">
            <li>(08) 5550 0142</li>
            <li>hello@mallowhound.example</li>
            <li>Perth, Western Australia</li>
          </ul>
          <p className="demo-flag">Fictional contact details. Nothing here is monitored.</p>
        </div>
      </div>
      <div className="depot__legal">
        <p className="depot__disclosure">
          <strong>{DISCLOSURE}</strong> Mallow Hound is not a real business. Prices, suburbs, visit windows and promises are invented, and
          nothing on this site is sent anywhere.
        </p>
        <p className="depot__studio">
          <a href={CONCEPT_URL}>{BACK_LABEL}</a>
          <a className="depot__cta" href={STUDIO_CONTACT_URL}>
            {CTA_LABEL}
          </a>
        </p>
        <p className="depot__credit" data-footer-credit>
          <span>Designed by</span>
          <a href={STUDIO_HOME_URL} rel="noopener">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={STUDIO_WORDMARK} alt="OFF/SHIFT Studio" width={88} height={24} />
          </a>
        </p>
      </div>
    </footer>
  );
}
