import { z } from "zod";
import { FundraiserSchema } from "@/lib/content/schemas";
import { replaceFundraisers } from "@/lib/content/fundraisers";

const BodySchema = z.object({ fundraisers: z.array(FundraiserSchema) });

export async function PUT(req: Request) {
  const { fundraisers } = BodySchema.parse(await req.json());
  await replaceFundraisers(fundraisers);
  return Response.json({ ok: true });
}
