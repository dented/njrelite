import { listSponsors } from "@/lib/content/sponsors";

export async function GET() {
  const sponsors = await listSponsors();
  return Response.json(sponsors);
}
