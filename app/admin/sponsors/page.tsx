import Link from "next/link";
import UploadWidget from "@/components/admin/UploadWidget";
import JsonEditor from "@/components/admin/JsonEditor";
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
            <p className="small mb-0">Upload logos to S3, then set `logo` fields to the public URL.</p>
          </div>
          <Link className="btn btn-njr btn-njr-ghost" href="/admin">Back</Link>
        </div>

        <div className="row g-4">
          <div className="col-12 col-lg-5">
            <UploadWidget defaultPrefix="sponsors" />
          </div>
          <div className="col-12 col-lg-7">
            <JsonEditor
              title="Sponsors JSON (array)"
              initialValue={sponsors}
              saveUrl="/api/admin/sponsors"
              wrapKey="sponsors"
            />
          </div>

          <div className="col-12">
            <JsonEditor
              title="Sponsor Packages JSON (array)"
              initialValue={packages}
              saveUrl="/api/admin/sponsor-packages"
              wrapKey="packages"
            />
          </div>
        </div>
      </div>
    </main>
  );
}
