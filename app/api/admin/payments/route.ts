import { listPayments } from "@/lib/content/payments";

export async function GET() {
  return Response.json(await listPayments());
}
