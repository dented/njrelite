import Link from "next/link";
import FundraiserEditor from "@/components/admin/FundraiserEditor";
import UploadWidget from "@/components/admin/UploadWidget";
import { listFundraisers } from "@/lib/content/fundraisers";

export const dynamic = "force-dynamic";

export default async function AdminFundraisingPage() {
  const fundraisers = await listFundraisers();

  return (
    <main id="main" className="py-5" style={{ background: "var(--njr-gray)" }}>
      <div className="container py-4">
        <div className="d-flex flex-wrap justify-content-between align-items-end gap-3 mb-4">
          <div>
            <h1 className="mb-1">Admin: Fundraising</h1>
            <p className="small mb-0">Manage event details, posters, menus, and the featured fundraiser.</p>
          </div>
          <div className="d-flex gap-2">
            <Link className="btn btn-njr btn-outline-dark" href="/fundraising" target="_blank">View page</Link>
            <Link className="btn btn-njr btn-outline-dark" href="/admin">Back</Link>
          </div>
        </div>

        <div className="mb-4">
          <UploadWidget defaultPrefix="fundraisers" />
          <p className="small text-muted mt-2 mb-0">After uploading a poster, copy its public URL into the event’s Poster image URL field.</p>
        </div>

        <FundraiserEditor initialValue={fundraisers} />
      </div>
    </main>
  );
}
