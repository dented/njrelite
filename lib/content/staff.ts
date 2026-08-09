import type { StaffMember } from "@/lib/staff";
import { staff as fallbackStaff } from "@/lib/staff";
import { staffCollection } from "@/lib/content/collections";

export async function listStaff(): Promise<StaffMember[]> {
  const col = await staffCollection();
  const docs = await col.find({}, { projection: { _id: 0, updatedAt: 0 } }).sort({ type: 1, name: 1 }).toArray();
  return docs.length ? docs : fallbackStaff;
}

export async function upsertStaff(staff: StaffMember[]): Promise<void> {
  const col = await staffCollection();
  await col.deleteMany({});
  if (staff.length) {
    await col.insertMany(staff.map((member) => ({ ...member, updatedAt: new Date() })));
  }
}
