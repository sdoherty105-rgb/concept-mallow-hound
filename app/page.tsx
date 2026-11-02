import { BookingForm } from "@/components/BookingForm";
import { CoatSelector } from "@/components/CoatSelector";
import { MenuTickets } from "@/components/MenuTickets";
import { RouteProvider } from "@/components/RouteState";
import { RouteVan } from "@/components/RouteVan";
import { ServiceCheck } from "@/components/ServiceCheck";
import { StopMark, VanCutaway } from "@/components/Van";
import { DEMO_PROMISE, FAQS, PROMISES } from "@/lib/data";

const FEATURES = [
  { t: "Onboard water and power", d: "A tank and a power pack live in the van. We never touch your tap or a power point." },
  { t: "Warm-water tub", d: "A tub at a working height, with a handheld sprayer and a floor that doesn’t skate." },
  { t: "Quiet dryer", d: "An arm-mounted dryer, kept on the lowest setting that actually dries the coat." },
  { t: "Non-slip table", d: "A padded table with a loose support loop for a dog who wobbles or thinks about leaving." },
];

export default function HomePage() {
  return (
    <div className="route">
      <RouteVan />
      <RouteProvider>
        <section id="area" className="stop stop--butter" data-layout="stop-hero" aria-labelledby="hero-title">
          <StopMark n="0" />
          <div className="stop__inner hero-screen">
            <div className="hero-copy">
              <p className="kicker">Mobile dog grooming, Perth</p>
              <h1 id="hero-title" className="stepped">
                <span>The groom </span>
                <span>comes to </span>
                <span>you.</span>
              </h1>
              <p className="hero-lead">One dog in the van. No waiting room, no car ride, no cage dryer. Parked at your curb.</p>
            </div>
            <ServiceCheck />
          </div>
        </section>

        <section id="how" className="stop stop--cobalt" data-layout="stop-cutaway" aria-labelledby="how-title">
          <StopMark n="1" />
          <div className="stop__inner how-split">
            <div className="how-art">
              <VanCutaway />
            </div>
            <div className="how-copy">
              <p className="kicker">Stop 1</p>
              <h2 id="how-title" className="h-step">
                <span>Inside </span>
                <span>the van.</span>
              </h2>
              <p>Four things, and then the dog. The numbers sit on the drawing.</p>
              <ol className="feature-list">
                {FEATURES.map((feature, index) => (
                  <li key={feature.t}>
                    <span className="feature-list__n">{index + 1}</span>
                    <div>
                      <h3>{feature.t}</h3>
                      <p>{feature.d}</p>
                    </div>
                  </li>
                ))}
              </ol>
              <p className="demo-flag demo-flag--on-dark">{DEMO_PROMISE}</p>
              <ul className="promise-line">
                {PROMISES.slice(0, 4).map((promise) => (
                  <li key={promise.title}>
                    <strong>{promise.title}.</strong> {promise.body}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        <section id="coat" className="stop stop--grape" data-layout="stop-coats" aria-labelledby="coat-title">
          <StopMark n="2" />
          <div className="stop__inner">
            <p className="kicker">Stop 2</p>
            <h2 id="coat-title" className="h-step">
              <span>Your dog, </span>
              <span>priced honestly.</span>
            </h2>
            <p className="lead">Pick a coat and a size. The accent shifts, and the matching ticket moves to the top of the menu.</p>
            <CoatSelector />
          </div>
        </section>

        <section id="packages" className="stop stop--paper" data-layout="stop-tickets" aria-labelledby="menu-title">
          <StopMark n="3" />
          <div className="stop__inner">
            <p className="kicker">Stop 3</p>
            <h2 id="menu-title" className="h-step">
              <span>Four tickets, </span>
              <span>none the same size.</span>
            </h2>
            <p className="lead">A coat picks the ticket. Puppy Debut is the one you choose when the dog is under six months.</p>
            <MenuTickets />
          </div>
        </section>

        <section id="booking" className="stop stop--mint" data-layout="stop-week" aria-labelledby="book-title">
          <StopMark n="4" />
          <div className="stop__inner book-split">
            <div>
              <p className="kicker">Stop 4</p>
              <h2 id="book-title" className="h-step">
                <span>Pick a day. </span>
                <span>Then the short form.</span>
              </h2>
              <p className="lead">Seven chunky days, Sundays resting. The form does not leave this browser.</p>
            </div>
            <BookingForm />
          </div>
        </section>

        <section id="faq" className="stop stop--paper stop--faq" data-layout="stop-strips" aria-labelledby="faq-title">
          <StopMark n="5" />
          <div className="stop__inner">
            <p className="kicker">Stop 5</p>
            <h2 id="faq-title" className="h-step">
              <span>Questions, </span>
              <span>in strips.</span>
            </h2>
            <div className="faq">
              {FAQS.map((item, index) => (
                <details key={item.q} className={`faq__item faq__item--${index % 5}`}>
                  <summary>
                    <span>{item.q}</span>
                    <span className="faq__hint">Answer</span>
                  </summary>
                  <p>{item.a}</p>
                </details>
              ))}
            </div>
          </div>
        </section>
      </RouteProvider>
    </div>
  );
}
