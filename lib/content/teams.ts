import type { Team } from "@/lib/teams";
import { teamsCollection } from "@/lib/content/collections";

export async function listTeams(): Promise<Team[]> {
  const col = await teamsCollection();
  const docs = await col.find({}, { projection: { _id: 0 } }).sort({ season: -1 }).toArray();
  return docs;
}

export async function getCurrentTeam(): Promise<Team> {
  const col = await teamsCollection();
  const current = await col.findOne({ isCurrent: true }, { projection: { _id: 0 } });
  if (current) return current;

  const fallback = await col.find({}, { projection: { _id: 0 } }).sort({ season: -1 }).limit(1).toArray();
  if (fallback[0]) return fallback[0];
  throw new Error("No teams found in MongoDB. Run the seed script.");
}

export async function getTeamById(id: string): Promise<Team | null> {
  const col = await teamsCollection();
  return await col.findOne({ id }, { projection: { _id: 0 } });
}

export async function upsertTeam(team: Team): Promise<void> {
  const col = await teamsCollection();
  await col.updateOne(
    { id: team.id },
    { $set: { ...team, updatedAt: new Date() } },
    { upsert: true }
  );
}
