import type { Collection } from "mongodb";
import { getDb } from "@/lib/mongodb";
import type { Team } from "@/lib/teams";
import type { Sponsor, SponsorPackage } from "@/lib/sponsors";
import type { StaffMember } from "@/lib/staff";

export type SiteCopy = {
  slug: string; // e.g. "home", "about", "legacy"
  title?: string;
  body?: string;
  updatedAt: Date;
};

export type TeamDoc = Team & {
  updatedAt: Date;
};

export type SponsorDoc = Sponsor & {
  updatedAt: Date;
};

export type SponsorPackageDoc = SponsorPackage & {
  updatedAt: Date;
};

export type StaffDoc = StaffMember & {
  updatedAt: Date;
};

export async function teamsCollection(): Promise<Collection<TeamDoc>> {
  const db = await getDb();
  return db.collection<TeamDoc>("teams");
}

export async function sponsorsCollection(): Promise<Collection<SponsorDoc>> {
  const db = await getDb();
  return db.collection<SponsorDoc>("sponsors");
}

export async function sponsorPackagesCollection(): Promise<Collection<SponsorPackageDoc>> {
  const db = await getDb();
  return db.collection<SponsorPackageDoc>("sponsorPackages");
}

export async function staffCollection(): Promise<Collection<StaffDoc>> {
  const db = await getDb();
  return db.collection<StaffDoc>("staff");
}

export async function siteCopyCollection(): Promise<Collection<SiteCopy>> {
  const db = await getDb();
  return db.collection<SiteCopy>("siteCopy");
}
