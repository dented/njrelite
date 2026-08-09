import SeasonArchiveClient from "@/components/legacy/SeasonArchiveClient";
import { listPreviousTeams } from "@/lib/content/teams";
import { getSiteCopy } from "@/lib/content/siteCopy";

export const dynamic = "force-dynamic";

export default async function LegacyPage() {
  const previousTeams = await listPreviousTeams();
  const copy = await getSiteCopy("legacy");
  return <SeasonArchiveClient previousTeams={previousTeams} title={copy?.title} lead={copy?.body} />;
}
