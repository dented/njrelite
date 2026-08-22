import { z } from "zod";
import { GalleryItemSchema } from "@/lib/content/schemas";
import { replaceGalleryItems } from "@/lib/content/gallery";

const BodySchema = z.object({ gallery: z.array(GalleryItemSchema) });

export async function PUT(req: Request) {
  const { gallery } = BodySchema.parse(await req.json());
  await replaceGalleryItems(gallery);
  return Response.json({ ok: true });
}
