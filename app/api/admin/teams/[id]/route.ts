import { TeamSchema } from "@/lib/content/schemas";
import { upsertTeam } from "@/lib/content/teams";

export async function PUT(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const json = await req.json();
  const team = TeamSchema.parse({ ...json, id });
  await upsertTeam(team);
  return Response.json({ ok: true });
}
