import Link from "next/link";
import UploadWidget from "@/components/admin/UploadWidget";
import TeamEditor from "@/components/admin/TeamEditor";
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
            <p className="small mb-0">Manage team details, roster profiles, coaches, tournaments, photos, and the season recap.</p>
          </div>
          <Link className="btn btn-njr btn-njr-ghost" href="/admin">Back</Link>
        </div>

        <div className="mb-4"><UploadWidget defaultPrefix="players" /><p className="small text-muted mt-2 mb-0">After uploading an image, copy its public URL into the matching photo field below.</p></div>
        <TeamEditor initialValue={team} />
      </div>
    </main>
  );
}
