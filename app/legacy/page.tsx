"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { previousTeams } from "@/lib/teams";

export default function PreviousTeamsPage() {
  const [seasonFilter, setSeasonFilter] = useState<string>("All");

  const seasonOptions = useMemo(
    () => ["All", ...previousTeams.map((s) => s.season)],
    []
  );

  const filteredSeasons = useMemo(() => {
    const filtered = seasonFilter === "All" 
      ? previousTeams 
      : previousTeams.filter((s) => s.season === seasonFilter);
    // Only show teams with recap data
    return filtered.filter((s) => s.recap);
  }, [seasonFilter]);

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
              <p className="lead">Every season adds to the standard. Browse each roster and team photo by season.</p>

              <div className="d-flex flex-wrap gap-2 mt-3">
                <Link className="btn btn-njr btn-njr-primary" href="/team">View Current Team</Link>
                <Link className="btn btn-njr btn-njr-ghost" href="/donate">Support Current Team</Link>
              </div>
            </div>

            <aside className="col-12 col-lg-5">
              <div className="glass">
                <h3 className="text-white mb-2">Legacy Rosters</h3>
                <p className="small text-white-50 mb-0">Each section shows a season photo and its roster snapshot.</p>
              </div>
            </aside>
          </div>
        </div>
      </section>

      <section className="py-5" style={{ background: "var(--njr-gray)" }}>
        <div className="container py-4">
          <div className="mb-4">
            <h2 className="mb-1">Season Archives</h2>
            <p className="small mb-0">Filter seasons to view roster and photo for each team.</p>
          </div>

          <div className="mb-4 d-flex align-items-center gap-2">
            <label className="fw-bold" htmlFor="seasonFilter">Season</label>
            <select
              id="seasonFilter"
              className="form-select"
              style={{ maxWidth: 220, borderRadius: 16 }}
              value={seasonFilter}
              onChange={(e) => setSeasonFilter(e.target.value)}
              aria-label="Filter previous teams by season"
            >
              {seasonOptions.map((year) => (
                <option key={year} value={year}>{year}</option>
              ))}
            </select>
          </div>

          <div className="d-flex flex-column gap-4">
            {filteredSeasons.map((y) => {
              const coverPhoto = y.photos[0];

              return (
                <article className="card njr-card" key={y.id}>
                  <div className="card-body p-4 p-md-5">
                    <div className="d-flex flex-wrap justify-content-between align-items-start gap-3 mb-4">
                      <div>
                        <h3 className="mb-1">{y.season} {y.name}</h3>
                        {y.recap && <p className="small mb-0 text-muted">{y.recap.title}</p>}
                      </div>
                    </div>

                    <div className="row g-4 align-items-start">
                      <div className="col-12 col-lg-6">
                        {coverPhoto ? (
                          <figure className="mb-0">
                            <img src={coverPhoto.src} alt={coverPhoto.alt} className="img-fluid rounded-4 border" style={{ borderColor: "rgba(0,0,0,.12)" }} loading="lazy" />
                            <figcaption className="small mt-2 text-muted">{coverPhoto.cap}</figcaption>
                          </figure>
                        ) : (
                          <div className="rounded-4 border p-4 small text-muted" style={{ borderColor: "rgba(0,0,0,.12)" }}>
                            Team photo coming soon.
                          </div>
                        )}

                        <h4 className="h6 fw-bold mt-4 mb-3">Tournaments</h4>
                        <div className="d-flex flex-column gap-3" aria-label={`${y.season} tournaments`}>
                          {y.tournaments.map((tournament) => (
                            <div key={tournament.id} className="rounded-4 p-3" style={{ background: "var(--njr-gray)" }}>
                              <div className="d-flex justify-content-between align-items-center mb-2">
                                <span className="fw-semibold">{tournament.name}</span>
                                <span className="chip">Final Rank: {tournament.finalRank}</span>
                              </div>
                              <img
                                src={tournament.photo.src}
                                alt={tournament.photo.alt}
                                className="img-fluid rounded-3 border"
                                style={{ borderColor: "rgba(0,0,0,.12)" }}
                                loading="lazy"
                              />
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="col-12 col-lg-6">
                        <h4 className="h6 fw-bold mb-3">Roster</h4>
                        <div className="d-flex flex-column gap-2" aria-label={`${y.season} roster`}>
                          {y.players.map((p) => (
                            <div key={p.id} className="d-flex justify-content-between align-items-center rounded-4 px-3 py-2" style={{ background: "var(--njr-gray)" }}>
                              <span className="fw-semibold">{p.name} - #{p.jerseyNumber}</span>
                              <span className="chip">{p.position}</span>
                            </div>
                          ))}
                        </div>

                        <h4 className="h6 fw-bold mt-4 mb-3">Coaching Staff</h4>
                        <div className="d-flex flex-column gap-2" aria-label={`${y.season} coaching staff`}>
                          {y.coaches.map((coach) => (
                            <div key={coach.id} className="d-flex justify-content-between align-items-center rounded-4 px-3 py-2" style={{ background: "var(--njr-gray)" }}>
                              <span className="fw-semibold">{coach.name}</span>
                              <span className="chip">{coach.position}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>
    </main>
  );
}
