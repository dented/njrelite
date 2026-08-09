import { z } from "zod";
import { StaffMemberSchema } from "@/lib/content/schemas";
import { upsertStaff } from "@/lib/content/staff";

const BodySchema = z.object({
  staff: z.array(StaffMemberSchema),
});

export async function PUT(req: Request) {
  const json = await req.json();
  const { staff } = BodySchema.parse(json);
  await upsertStaff(staff);
  return Response.json({ ok: true });
}
