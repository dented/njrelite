import type { Sponsor, SponsorPackage } from "@/lib/sponsors";
import { sponsorPackagesCollection, sponsorsCollection } from "@/lib/content/collections";

export async function listSponsors(): Promise<Sponsor[]> {
  const col = await sponsorsCollection();
  const docs = await col.find({}, { projection: { _id: 0 } }).sort({ name: 1 }).toArray();
  return docs;
}

export async function upsertSponsors(sponsors: Sponsor[]): Promise<void> {
  const col = await sponsorsCollection();
  await col.deleteMany({});
  if (sponsors.length) {
    await col.insertMany(sponsors.map((s) => ({ ...s, updatedAt: new Date() })));
  }
}

export async function listSponsorPackages(): Promise<SponsorPackage[]> {
  const col = await sponsorPackagesCollection();
  const docs = await col.find({}, { projection: { _id: 0 } }).sort({ price: 1 }).toArray();
  return docs;
}

export async function upsertSponsorPackages(packages: SponsorPackage[]): Promise<void> {
  const col = await sponsorPackagesCollection();
  await col.deleteMany({});
  if (packages.length) {
    await col.insertMany(packages.map((p) => ({ ...p, updatedAt: new Date() })));
  }
}
