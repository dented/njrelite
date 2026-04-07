import Link from "next/link";

export default function AboutPage() {
  return (
    <main id="main">
      <section className="parallax bg-arena hero">
        <div className="parallax-layer grid" data-parallax="0.08" aria-hidden="true" />
        <div className="parallax-layer glow" data-parallax="0.12" aria-hidden="true" />
        <div className="pucks" aria-hidden="true"><span className="puck p1" /><span className="puck p2" /><span className="puck p3" /></div>

        <div className="container">
          <div className="row align-items-center g-4">
            <div className="col-12 col-lg-7">
              <div className="d-inline-flex align-items-center gap-2 fw-bold text-white-50 mb-2">
                <span className="rounded-circle" style={{ width: 12, height: 12, background: "var(--njr-red)" }} />
                Our Program
              </div>
              <h1 className="text-white">About Us: Building Elite Talent on the Ice</h1>
              <p className="lead">
                Niagara Jr Elite develops complete hockey players — skill, mindset, and character — while competing in top tournaments across Canada.
              </p>

              <div className="d-flex flex-wrap gap-2 mt-3">
                <Link className="btn btn-njr btn-njr-primary" href="/team">View the 2025 Team</Link>
                <Link className="btn btn-njr btn-njr-ghost" href="/donate">Support the Program</Link>
              </div>
            </div>

            <aside className="col-12 col-lg-5">
              <div className="glass">
                <h3 className="text-white mb-2">Mission</h3>
                <p className="small text-white-50 mb-0">
                  Since the beginning of time, residents all over Canada have enjoyed watching and playing the game of hockey.  Many Canadians across this nation have dreamt of playing the game at the International level.
                </p>
                <hr className="border-light border-opacity-25" />
                <p className="small text-white-50 mb-0">
                  This is a chance of a lifetime to travel to Finland, experience European culture, develop friendships and build life skills that will benefit us as a whole in Ontario, and in our great country, Canada.
                </p>
              </div>
            </aside>
          </div>
        </div>
      </section>

      <section className="py-5">
        <div className="container py-4">
          <div className="d-flex justify-content-between align-items-end flex-wrap gap-3 mb-4">
            <div>
              <h2 className="mb-1">Coaching Staff</h2>
              <p className="small mb-0">High standards, clear feedback, and modern development methods.</p>
            </div>
            <Link className="btn btn-njr btn-light" href="/team">Meet Players</Link>
          </div>

          <div className="row g-4">
            {[
              { src: "/images/coach-01.jpg", name: "Jane Smith", role: "Head Coach", bio: "Skill development, systems, and leadership habits." },
              { src: "/images/coach-02.jpg", name: "Mike Johnson", role: "Assistant Coach", bio: "Video review, special teams, and game prep." },
              { src: "/images/coach-03.jpg", name: "Sarah Lee", role: "Goalkeeping", bio: "Positioning, tracking, and elite goalie habits." },
            ].map((c) => (
              <div className="col-12 col-md-6 col-lg-4" key={c.name}>
                <article className="card njr-card h-100">
                  <div className="njr-media">
                    <img src={c.src} alt={`${c.role} ${c.name} (placeholder)`} loading="lazy" />
                  </div>
                  <div className="card-body p-4">
                    <h3 className="mb-1">{c.name}</h3>
                    <p className="small mb-0"><strong>{c.role}</strong> — {c.bio}</p>
                  </div>
                </article>
              </div>
            ))}
          </div>

          <div className="p-4 p-md-5 rounded-5 border mt-4" style={{ background: "var(--njr-gray)", borderColor: "rgba(0,0,0,.12)" }}>
            <h3 className="mb-2">Our Commitment</h3>
            <p className="small mb-0">A structured environment that encourages hard work, coachability, and leadership — so players are ready for the next level.</p>
          </div>
        </div>
      </section>
    </main>
  );
}
