import { z } from "zod";
import { SponsorSchema } from "@/lib/content/schemas";
import { upsertSponsors } from "@/lib/content/sponsors";

const BodySchema = z.object({
  sponsors: z.array(SponsorSchema),
});

export async function PUT(req: Request) {
  const json = await req.json();
  const { sponsors } = BodySchema.parse(json);
  await upsertSponsors(sponsors);
  return Response.json({ ok: true });
}
