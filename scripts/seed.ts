import { config as loadEnv } from "dotenv";
import { z } from "zod";
import { upsertTeam } from "@/lib/content/teams";
import { upsertSponsors, upsertSponsorPackages } from "@/lib/content/sponsors";
import { upsertStaff } from "@/lib/content/staff";
import { upsertSiteCopy } from "@/lib/content/siteCopy";
import { getAwsRegion, requireEnv } from "@/lib/env";
import {
  SiteCopySchema,
  SponsorPackageSchema,
  SponsorSchema,
  StaffMemberSchema,
  TeamSchema,
} from "@/lib/content/schemas";
import teamsExportJson from "@/scripts/niagara-jr-elite.teams.json";
import sponsorsExportJson from "@/scripts/niagara-jr-elite.sponsors.json";
import sponsorPackagesExportJson from "@/scripts/niagara-jr-elite.sponsorPackages.json";
import staffExportJson from "@/scripts/niagara-jr-elite.staff.json";
import siteCopyExportJson from "@/scripts/niagara-jr-elite.siteCopy.json";

loadEnv({ path: ".env.local" });

function stripMongoMeta(value: unknown): unknown {
  if (Array.isArray(value)) {
    return value.map(stripMongoMeta);
  }

  if (value && typeof value === "object") {
    const entries = Object.entries(value as Record<string, unknown>)
      .filter(([key]) => key !== "_id" && key !== "updatedAt" && key !== "sortOrder")
      .map(([key, item]) => [key, stripMongoMeta(item)]);
    return Object.fromEntries(entries);
  }

  return value;
}

const TeamArraySchema = z.array(TeamSchema);
const SponsorArraySchema = z.array(SponsorSchema);
const SponsorPackageArraySchema = z.array(SponsorPackageSchema);
const StaffArraySchema = z.array(StaffMemberSchema);
const SiteCopyArraySchema = z.array(SiteCopySchema);

function loadSeedData() {
  const teamsInput = stripMongoMeta(teamsExportJson) as Array<Record<string, unknown>>;
  const normalizedTeams = teamsInput.map((team) => ({
    ...team,
    players: Array.isArray(team.players)
      ? team.players.map((player) => ({
          short: "",
          ...(player as Record<string, unknown>),
        }))
      : [],
  }));

  const staffInput = stripMongoMeta(staffExportJson) as Array<Record<string, unknown>>;
  const normalizedStaff = staffInput.map((member) => ({
    ...member,
    bio:
      typeof member.bio === "string" && member.bio.trim().length
        ? member.bio
        : "Profile coming soon.",
  }));

  return {
    teams: TeamArraySchema.parse(normalizedTeams),
    sponsors: SponsorArraySchema.parse(stripMongoMeta(sponsorsExportJson)),
    sponsorPackages: SponsorPackageArraySchema.parse(stripMongoMeta(sponsorPackagesExportJson)),
    staff: StaffArraySchema.parse(normalizedStaff),
    siteCopy: SiteCopyArraySchema.parse(stripMongoMeta(siteCopyExportJson)),
  };
}

async function main() {
  getAwsRegion();
  requireEnv(["DYNAMODB_TABLE_NAME"]);
  const { teams, sponsors, sponsorPackages, staff, siteCopy } = loadSeedData();

  for (const team of teams) {
    await upsertTeam(team);
  }

  await upsertSponsors(sponsors);
  await upsertSponsorPackages(sponsorPackages);
  await upsertStaff(staff);

  for (const value of siteCopy) {
    await upsertSiteCopy(value);
  }

  console.log(
    `Seed complete: inserted ${teams.length} teams, ${sponsors.length} sponsors, ${sponsorPackages.length} packages, ${staff.length} staff members.`
  );
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
