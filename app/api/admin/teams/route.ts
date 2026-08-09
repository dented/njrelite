import { upsertTeam } from "@/lib/content/teams";
import { TeamSchema } from "@/lib/content/schemas";

export async function POST(req: Request) {
  const json = await req.json();
  const team = TeamSchema.parse(json);
  await upsertTeam(team);
  return Response.json({ ok: true });
}
