import { listTeams } from "@/lib/content/teams";

export async function GET() {
  const teams = await listTeams();
  return Response.json(teams);
}
