import { getSiteCopy } from "@/lib/content/siteCopy";

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  const doc = await getSiteCopy(slug);
  if (!doc) return new Response("Not found", { status: 404 });
  return Response.json(doc);
}
