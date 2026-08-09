import { listSponsorPackages } from "@/lib/content/sponsors";

export async function GET() {
  const packages = await listSponsorPackages();
  return Response.json(packages);
}
