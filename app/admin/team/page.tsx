import Link from "next/link";
import UploadWidget from "@/components/admin/UploadWidget";
import JsonEditor from "@/components/admin/JsonEditor";
import { getCurrentTeam } from "@/lib/content/teams";

export const dynamic = "force-dynamic";

export default async function AdminTeamPage() {
  const team = await getCurrentTeam();

  return (
    <main id="main" className="py-5" style={{ background: "var(--njr-gray)" }}>
      <div className="container py-4">
        <div className="d-flex flex-wrap justify-content-between align-items-end gap-3 mb-4">
          <div>
            <h1 className="mb-1">Admin: Team</h1>
            <p className="small mb-0">Edits save into MongoDB. Upload images to S3, then paste URLs into the JSON.</p>
          </div>
          <Link className="btn btn-njr btn-njr-ghost" href="/admin">Back</Link>
        </div>

        <div className="row g-4">
          <div className="col-12 col-lg-5">
            <UploadWidget defaultPrefix="players" />
          </div>
          <div className="col-12 col-lg-7">
            <JsonEditor
              title={`Current Team (${team.season}) JSON`}
              initialValue={team}
              saveUrl={`/api/admin/teams/${encodeURIComponent(team.id)}`}
            />
          </div>
        </div>
      </div>
    </main>
  );
}
