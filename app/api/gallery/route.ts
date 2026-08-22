import { listGalleryItems } from "@/lib/content/gallery";

export async function GET() {
  return Response.json(await listGalleryItems());
}
