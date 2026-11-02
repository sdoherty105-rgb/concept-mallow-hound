import Link from "next/link";
import { PuppyMark } from "@/components/Dogs";

export default function NotFound() {
  return (
    <section className="stop stop--butter miss" data-layout="missed-stop">
      <div className="stop__inner miss__inner">
        <PuppyMark className="miss__dog" />
        <h1 className="h-step">
          <span>This stop is not </span>
          <span>on the route.</span>
        </h1>
        <p className="lead">The page you asked for isn’t one of ours.</p>
        <p>
          <Link prefetch={false} className="btn btn--solid" href="/">
            Back to the route
          </Link>
        </p>
      </div>
    </section>
  );
}
