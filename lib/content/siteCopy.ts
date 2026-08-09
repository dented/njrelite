import { siteCopyCollection } from "@/lib/content/collections";

export type SiteCopyValue = {
  slug: string;
  title?: string;
  body?: string;
};

export async function getSiteCopy(slug: string): Promise<SiteCopyValue | null> {
  const col = await siteCopyCollection();
  const doc = await col.findOne({ slug }, { projection: { _id: 0, updatedAt: 0 } });
  return doc;
}

export async function upsertSiteCopy(value: SiteCopyValue): Promise<void> {
  const col = await siteCopyCollection();
  await col.updateOne(
    { slug: value.slug },
    { $set: { ...value, updatedAt: new Date() } },
    { upsert: true }
  );
}

export async function listSiteCopySlugs(): Promise<string[]> {
  const col = await siteCopyCollection();
  const docs = await col.find({}, { projection: { slug: 1 } }).toArray();
  return docs.map((d) => d.slug).sort();
}
