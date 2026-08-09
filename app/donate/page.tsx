import Link from "next/link";
import DonateForm from "@/components/DonateForm";
import { formatCurrency } from "@/lib/currency";
import { getCurrentTeam } from "@/lib/content/teams";
import { getSiteCopy } from "@/lib/content/siteCopy";

export const dynamic = "force-dynamic";

export default async function DonatePage() {
  const currentTeam = await getCurrentTeam();
  const copy = await getSiteCopy("donate");
  const raisedAmount = currentTeam.raised;
  const goalAmount = currentTeam.goal;
  const progressPercent = goalAmount > 0 ? Math.round((raisedAmount / goalAmount) * 100) : 0;

  return (
    <main id="main">
      <section className="parallax bg-ice hero">
        <div className="parallax-layer grid" data-parallax="0.08" aria-hidden="true" />
        <div className="parallax-layer glow" data-parallax="0.12" aria-hidden="true" />
        <div className="pucks" aria-hidden="true"><span className="puck p1" /><span className="puck p4" /></div>

        <div className="container">
          <div className="row align-items-center g-4">
            <div className="col-12 col-lg-7">
              <div className="d-inline-flex align-items-center gap-2 fw-bold text-white-50 mb-2">
                <span className="rounded-circle" style={{ width: 12, height: 12, background: "var(--njr-red)" }} />
                Support
              </div>
              <h1 className="text-white">{copy?.title ?? "Support Niagara Jr Elite: Fuel Our Future"}</h1>
              <p className="lead">{copy?.body ?? "Donations support travel, ice time, equipment, video review, and athlete development. This form is a placeholder for Stripe/PayPal integration."}</p>

              <div className="d-flex flex-wrap gap-2 mt-3">
                <a className="btn btn-njr btn-njr-primary" href="#donateForm">Donate Now</a>
                <Link className="btn btn-njr btn-njr-ghost" href="/team">View Team</Link>
              </div>
            </div>

            <aside className="col-12 col-lg-5">
              <div className="glass">
                <h3 className="text-white mb-2">Fundraising Goal</h3>
                <p className="small text-white-50 mb-0">Goal: <strong>{formatCurrency(goalAmount)}</strong> • Raised: <strong>{formatCurrency(raisedAmount)}</strong> ({progressPercent}%)</p>
                <hr className="border-light border-opacity-25" />
                <p className="small text-white-50 mb-0">Making memories on and off the ice.</p>
              </div>
            </aside>
          </div>
        </div>
      </section>

      <section className="py-5" style={{ background: "var(--njr-gray)" }}>
        <div className="container py-4">
          <DonateForm
            players={currentTeam.players}
            raisedAmount={raisedAmount}
            goalAmount={goalAmount}
          />
        </div>
      </section>
    </main>
  );
}
