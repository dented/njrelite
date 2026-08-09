import { SiteCopySchema } from "@/lib/content/schemas";
import { upsertSiteCopy } from "@/lib/content/siteCopy";

export async function PUT(
  req: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  const json = await req.json();
  const value = SiteCopySchema.parse({ ...json, slug });
  await upsertSiteCopy(value);
  return Response.json({ ok: true });
}
