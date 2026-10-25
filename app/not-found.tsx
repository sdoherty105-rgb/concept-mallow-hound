import Link from "next/link";
import { Dog } from "@/components/Dogs";

export default function NotFound() {
  return (
    <section className="section section--cream">
      <div className="wrap center nf">
        <Dog coat="wiry" className="nf__dog" />
        <h1 className="page-title">This page has wandered off</h1>
        <p className="lead lead--sm">We couldn’t find what you were sniffing for.</p>
        <p>
          <Link prefetch={false} className="btn btn--coral btn--lg" href="/">
            Back to the van
          </Link>
        </p>
      </div>
    </section>
  );
}
