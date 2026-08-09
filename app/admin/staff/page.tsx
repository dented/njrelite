import Link from "next/link";
import UploadWidget from "@/components/admin/UploadWidget";
import JsonEditor from "@/components/admin/JsonEditor";
import { listStaff } from "@/lib/content/staff";

export const dynamic = "force-dynamic";

export default async function AdminStaffPage() {
  const staff = await listStaff();

  return (
    <main id="main" className="py-5" style={{ background: "var(--njr-gray)" }}>
      <div className="container py-4">
        <div className="d-flex flex-wrap justify-content-between align-items-end gap-3 mb-4">
          <div>
            <h1 className="mb-1">Admin: Staff</h1>
            <p className="small mb-0">Upload staff photos to S3, then set each `photo` URL in the JSON.</p>
          </div>
          <Link className="btn btn-njr btn-njr-ghost" href="/admin">Back</Link>
        </div>

        <div className="row g-4">
          <div className="col-12 col-lg-5">
            <UploadWidget defaultPrefix="site" />
          </div>
          <div className="col-12 col-lg-7">
            <JsonEditor
              title="Staff JSON (array)"
              initialValue={staff}
              saveUrl="/api/admin/staff"
              wrapKey="staff"
            />
          </div>
        </div>
      </div>
    </main>
  );
}
