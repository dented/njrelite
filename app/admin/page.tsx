import Link from "next/link";

export const dynamic = "force-dynamic";

export default function AdminHomePage() {
  return (
    <main id="main" className="py-5" style={{ background: "var(--njr-gray)" }}>
      <div className="container py-4">
        <div className="mb-4">
          <h1 className="mb-1">Admin</h1>
          <p className="small mb-0">Basic-auth protected content management.</p>
        </div>

        <div className="row g-4">
          <div className="col-12 col-md-4">
            <article className="card njr-card h-100">
              <div className="card-body p-4">
                <h2 className="h5">Team</h2>
                <p className="small text-muted">Edit current team, roster, coaches, tournaments, gallery, and fundraising.</p>
                <Link className="btn btn-njr btn-njr-primary" href="/admin/team">Open</Link>
              </div>
            </article>
          </div>

          <div className="col-12 col-md-4">
            <article className="card njr-card h-100">
              <div className="card-body p-4">
                <h2 className="h5">Staff</h2>
                <p className="small text-muted">Edit About page staff profiles including photos, role, and bio.</p>
                <Link className="btn btn-njr btn-njr-primary" href="/admin/staff">Open</Link>
              </div>
            </article>
          </div>

          <div className="col-12 col-md-4">
            <article className="card njr-card h-100">
              <div className="card-body p-4">
                <h2 className="h5">Sponsors</h2>
                <p className="small text-muted">Edit sponsor logos/links and sponsorship packages.</p>
                <Link className="btn btn-njr btn-njr-primary" href="/admin/sponsors">Open</Link>
              </div>
            </article>
          </div>

          <div className="col-12 col-md-4">
            <article className="card njr-card h-100">
              <div className="card-body p-4">
                <h2 className="h5">Site Copy</h2>
                <p className="small text-muted">Edit page text for Home/About/Legacy and other routes.</p>
                <Link className="btn btn-njr btn-njr-primary" href="/admin/site-copy">Open</Link>
              </div>
            </article>
          </div>
        </div>
      </div>
    </main>
  );
}
