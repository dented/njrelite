import SeasonArchiveClient from "@/components/legacy/SeasonArchiveClient";
import { listTeams } from "@/lib/content/teams";
import { getSiteCopy } from "@/lib/content/siteCopy";

export const dynamic = "force-dynamic";

export default async function PreviousTeamsPage() {
  const teams = await listTeams();
  const previousTeams = teams.filter((t) => !t.isCurrent);
  const copy = await getSiteCopy("previous-teams");
  return <SeasonArchiveClient previousTeams={previousTeams} title={copy?.title} lead={copy?.body} />;
}
