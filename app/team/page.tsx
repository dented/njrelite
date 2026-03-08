import Link from "next/link";
import TeamGrid from "@/components/teams/TeamGrid"
import { team } from "@/lib/teams";
import { formatCurrency } from "@/lib/currency";

export default function TeamPage() {
  const teamTitle = `${team.season} Current Team: Ready to Dominate`;
  const progressPercent = team.goal > 0 ? Math.round((team.raised / team.goal) * 100) : 0;

  return (
    <main id="main">
      <section className="parallax bg-arena hero">
        <div className="parallax-layer grid" data-parallax="0.08" aria-hidden="true" />
        <div className="parallax-layer glow" data-parallax="0.12" aria-hidden="true" />
        <div className="pucks" aria-hidden="true"><span className="puck p2" /><span className="puck p3" /></div>

        <div className="container">
          <div className="row align-items-center g-4">
            <div className="col-12 col-lg-7">
              <div className="d-inline-flex align-items-center gap-2 fw-bold text-white-50 mb-2">
                <span className="rounded-circle" style={{ width: 12, height: 12, background: "var(--njr-red)" }} />
                Roster
              </div>
              <h1 className="text-white">{teamTitle}</h1>
              <p className="lead">
                Filter the roster by position. Profiles are placeholders — perfect for swapping in real stats, height/weight, and jersey numbers.
              </p>

              <div className="d-flex flex-wrap gap-2 mt-3">
                <Link className="btn btn-njr btn-njr-primary" href="/donate">Donate</Link>
                <Link className="btn btn-njr btn-njr-ghost" href="/previous-teams">View Legacy</Link>
              </div>
            </div>

            <aside className="col-12 col-lg-5">
              <div className="glass">
                <h3 className="text-white mb-2">Team Fundraising</h3>
                <div className="mb-3">
                  <div className="d-flex justify-content-between small mb-2 text-white-50">
                    <span><strong>Raised:</strong> {formatCurrency(team.raised)}</span>
                    <span><strong>Goal:</strong> {formatCurrency(team.goal)}</span>
                  </div>
                  <div className="progress" style={{ height: 16, borderRadius: 999, border: "1px solid rgba(255,255,255,.2)" }}>
                    <div className="progress-bar" role="progressbar"
                      style={{ width: `${progressPercent}%`, background: "linear-gradient(90deg,#FF0000,rgba(255,0,0,.72))" }}
                      aria-valuenow={progressPercent} aria-valuemin={0} aria-valuemax={100} />
                  </div>
                  <p className="small text-white-50 mb-0 mt-2">{progressPercent}% funded</p>
                </div>
                <hr className="border-light border-opacity-25" />
                <p className="small text-white-50 mb-0">Use the filter to quickly find forwards, defence, or goalies.</p>
              </div>
            </aside>
          </div>
        </div>
      </section>

      <section className="py-5" style={{ background: "var(--njr-gray)" }}>
        <div className="container py-4">
          <TeamGrid />

          <div className="p-4 p-md-5 rounded-5 border mt-4" style={{ background: "#fff", borderColor: "rgba(0,0,0,.12)" }}>
            <h3 className="mb-2">Support the Roster</h3>
            <p className="small mb-3">Sponsor a player or contribute to the general fund. Every dollar supports travel, ice, and training.</p>
            <Link className="btn btn-njr btn-njr-primary" href="/donate">Donate Now</Link>
          </div>
        </div>
      </section>
    </main>
  );
}
