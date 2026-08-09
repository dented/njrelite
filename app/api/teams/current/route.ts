import { getCurrentTeam } from "@/lib/content/teams";

export async function GET() {
  const team = await getCurrentTeam();
  return Response.json(team);
}
