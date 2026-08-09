import { getTeamById } from "@/lib/content/teams";

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const team = await getTeamById(id);
  if (!team) return new Response("Not found", { status: 404 });
  return Response.json(team);
}
