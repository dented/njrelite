import { listStaff } from "@/lib/content/staff";

export async function GET() {
  const staff = await listStaff();
  return Response.json(staff);
}
