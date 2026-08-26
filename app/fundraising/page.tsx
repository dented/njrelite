import type { Metadata } from "next";
import Link from "next/link";
import { listFundraisers } from "@/lib/content/fundraisers";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Fundraising Events | Niagara Jr Elite",
  description: "Join Niagara Jr Elite at upcoming community fundraising events and help support our players.",
};

export default async function FundraisingPage() {
  const events = await listFundraisers();
  const hasFeaturedEvent = events.some((event) => event.featured);
  return (
    <main id="main">
      <section className="parallax bg-arena hero fundraising-hero">
        <div className="parallax-layer grid" data-parallax="0.08" aria-hidden="true" />
        <div className="parallax-layer glow" data-parallax="0.12" aria-hidden="true" />
        <div className="pucks" aria-hidden="true"><span className="puck p1" /><span className="puck p3" /><span className="puck p4" /></div>

        <div className="container position-relative">
          <div className="row align-items-end g-4">
            <div className="col-12 col-lg-8">
              <div className="fundraising-kicker mb-3">
                <span aria-hidden="true">◆</span> Fuel the journey
              </div>
              <h1 className="text-white display-3 mb-3">Fundraising that<br />moves our team forward.</h1>
              <p className="lead mb-4">
                Good events bring great communities together. Join us throughout the season and help give Niagara Jr Elite players every opportunity to compete, develop, and succeed.
              </p>
              <div className="d-flex flex-wrap gap-2">
                <a className="btn btn-njr btn-njr-primary px-4" href={hasFeaturedEvent ? "#featured-event" : "#events"}>View the next fundraiser</a>
                <Link className="btn btn-njr btn-njr-ghost px-4" href="/donate">Donate directly</Link>
              </div>
            </div>

            <aside className="col-12 col-lg-4">
              <div className="glass fundraising-impact">
                <span className="small text-uppercase fw-bold text-white-50">Every contribution supports</span>
                <div className="row g-3 mt-1">
                  {["Ice time", "Travel", "Equipment", "Development"].map((item) => (
                    <div className="col-6" key={item}>
                      <div className="fundraising-impact-item">{item}</div>
                    </div>
                  ))}
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>

      <section className="fundraising-events py-5" id="events">
        <div className="container py-4">
          <div className="row align-items-end g-3 mb-5">
            <div className="col-12 col-lg-8">
              <p className="fundraising-section-label mb-2">Come out & support</p>
              <h2 className="display-5 mb-2">Upcoming fundraising events</h2>
              <p className="text-secondary mb-0">Event details will be updated as dates and venues are confirmed.</p>
            </div>
            <div className="col-12 col-lg-4 text-lg-end">
              <Link className="btn btn-njr btn-outline-dark" href="/donate">Make a direct donation</Link>
            </div>
          </div>

          <div className="row g-4">
            {events.map((event, index) => (
              <div className="col-12 col-md-6 col-lg-4" key={event.id}>
                <article
                  id={event.featured ? "featured-event" : undefined}
                  className={`fundraising-card h-100 reveal ${event.featured ? "fundraising-card-featured" : ""}`}
                  style={{ "--event-accent": event.accent } as React.CSSProperties}
                >
                  <div className="fundraising-card-top justify-content-end">
                    <div className="d-flex align-items-center gap-2">
                      {event.featured ? <span className="fundraising-live-label">Next event</span> : null}
                      <span className="fundraising-event-icon" aria-hidden="true">{event.icon}</span>
                    </div>
                  </div>
                  {event.image ? (
                    <div className="fundraising-poster">
                      <img src={event.image} alt={`${event.title} event poster`} loading={event.featured ? "eager" : "lazy"} />
                    </div>
                  ) : null}
                  <div className="fundraising-card-body">
                    <h3 className="mb-3">{event.title}</h3>
                    <div className="fundraising-details mb-4">
                      <div><span>Date</span><strong>{event.date}</strong></div>
                      <div>
                        <span>Location</span>
                        <strong>
                          <a
                            className="fundraising-location-link"
                            href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(event.location)}`}
                            target="_blank"
                            rel="noreferrer"
                            aria-label={`View ${event.location} on Google Maps`}
                          >
                            {event.location}
                            <span className="fundraising-location-arrow" aria-hidden="true">↗</span>
                          </a>
                        </strong>
                      </div>
                    </div>
                    <p className="text-secondary mb-0">{event.description}</p>
                    {event.offerings.length ? (
                      <div className="fundraising-menu mt-4" aria-label="Food available">
                        {event.offerings.map((offering) => <span key={offering}>{offering}</span>)}
                      </div>
                    ) : null}
                  </div>
                </article>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="fundraising-cta py-5">
        <div className="container py-3">
          <div className="row align-items-center g-4">
            <div className="col-12 col-lg-8">
              <p className="small text-uppercase fw-bold text-white-50 mb-2">Want to get involved?</p>
              <h2 className="text-white mb-2">Sponsor an event or lend a hand.</h2>
              <p className="text-white-50 mb-0">Local businesses, prize donors, volunteers, and community partners make these events possible.</p>
            </div>
            <div className="col-12 col-lg-4 d-flex gap-2 justify-content-lg-end flex-wrap">
              <Link className="btn btn-njr btn-njr-secondary" href="/sponsors">Become a sponsor</Link>
              <Link className="btn btn-njr btn-njr-primary" href="/about">About our program</Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
