import Link from "next/link";
import { LogoMark } from "./Logo";
import { MobileNav, type NavLink } from "./MobileNav";

export const NAV: NavLink[] = [
  { href: "/#how", label: "How the van works" },
  { href: "/#packages", label: "Packages" },
  { href: "/#coat", label: "Coat selector" },
  { href: "/#area", label: "Service area" },
  { href: "/#calm", label: "Calm promise" },
  { href: "/#faq", label: "FAQ" },
];

export function SiteHeader() {
  return (
    <header className="site-header">
      <div className="wrap site-header__row">
        <Link prefetch={false} href="/" className="brand" aria-label="Mallow Hound, home">
          <LogoMark />
          <span className="brand__name">Mallow Hound</span>
        </Link>
        <nav aria-label="Primary" className="primary-nav">
          <ul>
            {NAV.map((l) => (
              <li key={l.href}>
                <a href={l.href}>{l.label}</a>
              </li>
            ))}
          </ul>
        </nav>
        <a className="btn btn--coral btn--sm" href="/#booking">
          Book a groom
        </a>
        <MobileNav links={NAV} />
      </div>
    </header>
  );
}
