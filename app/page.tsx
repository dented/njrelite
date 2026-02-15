import Link from "next/link";
import Countdown from "@/components/Countdown";
import GalleryCarousel from "@/components/GalleryCarousel";
import { players } from "@/lib/players";

const HomePage = () => {
  return (
    <main id="main">
      <section className="parallax bg-rink hero">
        <div className="parallax-layer grid" data-parallax="0.08" aria-hidden="true" />
        <div className="parallax-layer glow" data-parallax="0.14" aria-hidden="true" />
        <div className="pucks" aria-hidden="true">
          <span className="puck p1" /><span className="puck p2" /><span className="puck p3" /><span className="puck p4" />
        </div>

        <div className="container">
          <div className="row align-items-center g-4">
            <div className="col-12 col-lg-7">
              <div className="d-inline-flex align-items-center gap-2 fw-bold text-white-50 mb-2">
                <span className="rounded-circle" style={{ width: 12, height: 12, background: "var(--njr-red)" }} />
                Junior Elite Ice Hockey
              </div>
              <h1 className="text-white">Welcome to Niagara Jr Elite: Forging Junior Hockey Champions</h1>
              <p className="lead">
                A clean, modern tournament-ready presence with fast navigation, immersive visuals, and player-focused pages — built for mobile-first fans and sponsors.
              </p>

              <div className="d-flex flex-wrap gap-2 mt-3">
                <Link className="btn btn-njr btn-njr-primary" href="/donate">Donate Now ❤️</Link>
                <Link className="btn btn-njr btn-njr-ghost" href="/team">Meet the Team 🧊</Link>
              </div>

              <div className="row g-2 mt-4">
                {[
                  ["12", "Roster Spots"],
                  ["3", "Seasons"],
                  ["6+", "Tournaments"],
                  ["100%", "Compete"],
                ].map(([n, l]) => (
                  <div className="col-6 col-md-3" key={l}>
                    <div className="rounded-4 p-3 border border-light border-opacity-25 bg-black bg-opacity-25">
                      <div className="fs-4 fw-bold text-white">{n}</div>
                      <div className="small text-white-50">{l}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <aside className="col-12 col-lg-5">
              <div className="glass">
                <div className="d-inline-flex align-items-center gap-2 fw-bold text-white-50 mb-2">
                  <span className="rounded-circle" style={{ width: 12, height: 12, background: "var(--njr-red)" }} />
                  Next Tournament
                </div>

                <h3 className="text-white mb-1">Niagara Invitational</h3>
                <p className="small text-white-50 mb-0">January 15, 2026 • Niagara Region, Ontario</p>

                <Countdown iso="2026-01-15T19:00:00" />

                <hr className="border-light border-opacity-25" />

                <p className="small text-white-50 mb-3">
                  Your support helps cover travel, ice time, gear, video review, and development resources.
                </p>

                <Link className="btn btn-njr btn-njr-primary w-100" href="/donate">Support the Team</Link>
              </div>
            </aside>
          </div>
        </div>
      </section>

      <section className="py-5" style={{ background: "var(--njr-gray)" }}>
        <div className="container py-4">
          <div className="d-flex flex-wrap justify-content-between align-items-end gap-3 mb-4">
            <div>
              <h2 className="mb-1">Current Team Highlights</h2>
              <p className="small mb-0">A few 2025 standouts — swap in real photos anytime.</p>
            </div>
            <div className="d-flex gap-2 flex-wrap">
              <Link className="btn btn-njr btn-njr-primary" href="/team">Full Roster</Link>
              <Link className="btn btn-njr btn-light" href="/donate">Donate</Link>
            </div>
          </div>

          <div className="row g-4">
            {players.map((p) => (
              <div className="col-12 col-md-6 col-lg-3" key={p.name}>
                <article className="card njr-card h-100">
                  <div className="njr-media">
                    <img src={p.img} alt={`Player highlight: ${p.name}`} loading="lazy" />
                  </div>
                  <div className="card-body px-2 pb-0">
                    <h3 className="mb-1">{p.name}</h3>
                    <p className="small mb-3">{p.short}</p>
                  </div>
                  <div className="card-footer p-4 bg-white border-0">
                    <div className="d-flex justify-content-between align-items-center gap-2">
                      <span className="chip">{p.position}</span>
                      <Link className="btn btn-njr btn-njr-primary" href="/team">View</Link>
                    </div>
                  </div>
                </article>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="parallax bg-ice py-5">
        <div className="parallax-layer grid" data-parallax="0.06" aria-hidden="true" />
        <div className="pucks" aria-hidden="true"><span className="puck p1" /><span className="puck p3" /></div>

        <div className="container py-4">
          <div className="d-flex flex-wrap justify-content-between align-items-end gap-3 mb-4 text-white">
            <div>
              <h2 className="mb-1">Photo Gallery</h2>
              <p className="small text-white-50 mb-0">Action shots and tournament moments (placeholders).</p>
            </div>
            <Link className="btn btn-njr btn-njr-primary" href="/donate">Donate Now</Link>
          </div>

          <GalleryCarousel />
        </div>
      </section>

      <section className="py-5" style={{ background: "var(--njr-gray)" }}>
        <div className="container py-4">
          <div className="p-4 p-md-5 rounded-5 border" style={{ background: "#fff", borderColor: "rgba(0,0,0,.12)" }}>
            <h3 className="mb-2">Ready to support Niagara Jr Elite?</h3>
            <p className="small mb-3">Donations help fund training, travel, equipment, and tournament fees.</p>
            <Link className="btn btn-njr btn-njr-primary" href="/donate">Donate Now</Link>
          </div>
        </div>
      </section>
    </main>
  );
}

export default HomePage;