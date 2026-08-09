import { z } from "zod";
import { SponsorPackageSchema } from "@/lib/content/schemas";
import { upsertSponsorPackages } from "@/lib/content/sponsors";

const BodySchema = z.object({
  packages: z.array(SponsorPackageSchema),
});

export async function PUT(req: Request) {
  const json = await req.json();
  const { packages } = BodySchema.parse(json);
  await upsertSponsorPackages(packages);
  return Response.json({ ok: true });
}
