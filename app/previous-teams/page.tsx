import Link from "next/link";

export default function PreviousTeamsPage() {
  return (
    <main id="main">
      <section className="parallax bg-rink hero">
        <div className="parallax-layer grid" data-parallax="0.08" aria-hidden="true" />
        <div className="parallax-layer glow" data-parallax="0.13" aria-hidden="true" />
        <div className="pucks" aria-hidden="true"><span className="puck p1" /><span className="puck p3" /><span className="puck p4" /></div>

        <div className="container">
          <div className="row align-items-center g-4">
            <div className="col-12 col-lg-7">
              <div className="d-inline-flex align-items-center gap-2 fw-bold text-white-50 mb-2">
                <span className="rounded-circle" style={{ width: 12, height: 12, background: "var(--njr-red)" }} />
                Legacy
              </div>
              <h1 className="text-white">Our Legacy: Past Seasons and Achievements</h1>
              <p className="lead">Every season adds to the standard. Expand a year to view highlights.</p>

              <div className="d-flex flex-wrap gap-2 mt-3">
                <Link className="btn btn-njr btn-njr-primary" href="/team">View Current Team</Link>
                <Link className="btn btn-njr btn-njr-ghost" href="/donate">Support Current Team</Link>
              </div>
            </div>

            <aside className="col-12 col-lg-5">
              <div className="glass">
                <h3 className="text-white mb-2">Scalable by Design</h3>
                <p className="small text-white-50 mb-0">Add more years by duplicating an accordion item — Bootstrap handles the animation.</p>
              </div>
            </aside>
          </div>
        </div>
      </section>

      <section className="py-5" style={{ background: "var(--njr-gray)" }}>
        <div className="container py-4">
          <div className="mb-4">
            <h2 className="mb-1">Yearly Recaps</h2>
            <p className="small mb-0">Accordion recaps (Bootstrap).</p>
          </div>

          <div className="accordion" id="legacyAccordion">
            {[
              {
                year: "2024",
                title: "Regional Champions",
                text: "A complete season built on depth and pace. The 2024 group set the standard with disciplined play and relentless work ethic.",
                bullets: ["Championship run with clutch special teams", "Top-3 goals against in the region", "Multiple players advanced to higher levels"],
                img: "/images/past-2024.jpg",
              },
              {
                year: "2023",
                title: "Nationals Runner-Up",
                text: "A high-tempo season with standout goaltending and consistent scoring across the lineup.",
                bullets: ["Strong playoff performance and late-game execution", "Team culture built on accountability", "Breakout tournament performances"],
                img: "/images/past-2023.jpg",
              },
              {
                year: "2022",
                title: "Debut Year",
                text: "The beginning of Niagara Jr Elite — launching the program, establishing standards, and building the foundation.",
                bullets: ["Program launch and first tournament appearances", "Development-first approach with measurable progress", "Strong community support and sponsorship growth"],
                img: "/images/past-2022.jpg",
              },
            ].map((y, idx) => {
              const headingId = `heading-${y.year}`;
              const collapseId = `collapse-${y.year}`;
              return (
                <div className="accordion-item rounded-5 overflow-hidden border mb-3" key={y.year} style={{ borderColor: "rgba(0,0,0,.12)" }}>
                  <h2 className="accordion-header" id={headingId}>
                    <button
                      className={`accordion-button fw-bold ${idx === 0 ? "" : "collapsed"}`}
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target={`#${collapseId}`}
                      aria-expanded={idx === 0 ? "true" : "false"}
                      aria-controls={collapseId}
                    >
                      {y.year} — {y.title}
                    </button>
                  </h2>
                  <div
                    id={collapseId}
                    className={`accordion-collapse collapse ${idx === 0 ? "show" : ""}`}
                    aria-labelledby={headingId}
                    data-bs-parent="#legacyAccordion"
                  >
                    <div className="accordion-body">
                      <p className="small">{y.text}</p>
                      <ul className="small">
                        {y.bullets.map((b) => <li key={b}>{b}</li>)}
                      </ul>
                      <img src={y.img} alt={`${y.year} team photo (placeholder)`} className="img-fluid rounded-4 border" style={{ borderColor: "rgba(0,0,0,.12)" }} loading="lazy" />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </main>
  );
}
