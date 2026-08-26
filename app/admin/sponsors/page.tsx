import Link from "next/link";
import UploadWidget from "@/components/admin/UploadWidget";
import SponsorsEditor from "@/components/admin/SponsorsEditor";
import { listSponsors, listSponsorPackages } from "@/lib/content/sponsors";

export const dynamic = "force-dynamic";

export default async function AdminSponsorsPage() {
  const sponsors = await listSponsors();
  const packages = await listSponsorPackages();

  return (
    <main id="main" className="py-5" style={{ background: "var(--njr-gray)" }}>
      <div className="container py-4">
        <div className="d-flex flex-wrap justify-content-between align-items-end gap-3 mb-4">
          <div>
            <h1 className="mb-1">Admin: Sponsors</h1>
            <p className="small mb-0">Manage sponsors, logos, links, and sponsorship packages.</p>
          </div>
          <Link className="btn btn-njr btn-njr-ghost" href="/admin">Back</Link>
        </div>

        <div className="mb-4"><UploadWidget defaultPrefix="sponsors" /><p className="small text-muted mt-2 mb-0">After uploading a logo, copy its public URL into the sponsor’s Logo URL field.</p></div>
        <SponsorsEditor initialSponsors={sponsors} initialPackages={packages} />
      </div>
    </main>
  );
}
