import Link from "next/link";
import SponsorGrid from "@/components/sponsors/SponsorGrid";
import { sponsors, sponsorPackages } from "@/lib/sponsors";
import { formatCurrency } from "@/lib/currency";

export default function SponsorsPage() {
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
                Sponsors
              </div>
              <h1 className="text-white">Partner with Us: Sponsorship Opportunities</h1>
              <p className="lead">
                Join us in supporting the next generation of hockey talent. Explore our sponsorship packages and the impact your contribution makes.
              </p>

              <div className="d-flex flex-wrap gap-2 mt-3">
                <a className="btn btn-njr btn-njr-primary" href="#tiers">View Sponsorship Tiers</a>
                <Link className="btn btn-njr btn-njr-ghost" href="/donate">Team/Player Donations</Link>
                <Link className="btn btn-njr btn-njr-ghost" href="/team">Meet the Team</Link>
              </div>
            </div>

            <aside className="col-12 col-lg-5">
              <div className="glass">
                <h3 className="text-white mb-2">Why Sponsor?</h3>
                <p className="small text-white-50 mb-0">Your sponsorship directly supports player development, travel expenses, and training resources.</p>
                <hr className="border-light border-opacity-25" />
                <p className="small text-white-50 mb-0">Sponsorship packages include branding opportunities, event access, and community recognition.</p>
              </div>
            </aside>
          </div>
        </div>
      </section>

      <section className="py-5" style={{ background: "var(--njr-gray)" }}>
        <div className="container py-4">
          <div id="tiers" className="mb-4">
            <h2 className="mb-1">Sponsorship Tiers</h2>
            <p className="small mb-0">Choose a package level and see exactly what your business receives.</p>
          </div>

          <div className="row g-4 mb-5" aria-label="Sponsorship tiers">
            {sponsorPackages.map((pkg) => (
              <div key={pkg.id} className="col-12 col-md-6 col-xl">
                <article className="card njr-card h-100">
                  <div className="card-body p-4 d-flex flex-column">
                    <h3 className="h5 mb-1">{pkg.name}</h3>
                    <p className="fw-bold mb-3 text-danger">
                      {pkg.priceLabel ?? (pkg.price !== null ? formatCurrency(pkg.price) : "Custom")}
                    </p>

                    <ul className="small ps-3 mb-0 d-flex flex-column gap-2">
                      {pkg.benefits.map((benefit) => (
                        <li key={`${pkg.id}-${benefit}`}>{benefit}</li>
                      ))}
                    </ul>
                  </div>
                </article>
              </div>
            ))}
          </div>

          <SponsorGrid sponsors={sponsors} />

          <div className="p-4 p-md-5 rounded-5 border mt-4" style={{ background: "#fff", borderColor: "rgba(0,0,0,.12)" }}>
            <h3 className="mb-2">Donate to Team or Player</h3>
            <p className="small mb-3">For direct team and player donations, use the dedicated donation form.</p>
            <Link className="btn btn-njr btn-njr-primary" href="/donate">Go to Donations</Link>
          </div>
        </div>
      </section>
    </main>
  );
}
