import Link from "next/link";
import UploadWidget from "@/components/admin/UploadWidget";
import StaffEditor from "@/components/admin/StaffEditor";
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
            <p className="small mb-0">Manage staff details and upload photos for their profiles.</p>
          </div>
          <Link className="btn btn-njr btn-njr-ghost" href="/admin">Back</Link>
        </div>

        <div className="mb-4"><UploadWidget defaultPrefix="site" /><p className="small text-muted mt-2 mb-0">After uploading a photo, copy its public URL into the staff member’s Photo URL field.</p></div>
        <StaffEditor initialValue={staff} />
      </div>
    </main>
  );
}
