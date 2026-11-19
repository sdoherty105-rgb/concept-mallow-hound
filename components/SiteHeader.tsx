import Link from "next/link";
import { SiteNav } from "./SiteNav";

export function SiteHeader() {
  return (
    <header className="site-header">
      <Link prefetch={false} href="/" className="wordmark">
        Mallow Hound
      </Link>
      <SiteNav />
    </header>
  );
}
