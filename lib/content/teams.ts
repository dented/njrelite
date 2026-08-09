import type { Team } from "@/lib/teams";
import { DynamoDBDocumentClient, GetCommand, PutCommand, QueryCommand } from "@aws-sdk/lib-dynamodb";
import { getContentTableName, getDynamoDocClient } from "@/lib/dynamodb";

type TeamItem = Team & {
  pk: "TEAM";
  sk: string;
  entity: "TEAM";
  updatedAt: string;
};

function asTeam(item: TeamItem): Team {
  const { pk, sk, entity, updatedAt, ...team } = item;
  void pk;
  void sk;
  void entity;
  void updatedAt;
  return team;
}

async function listTeamItems(docClient: DynamoDBDocumentClient, tableName: string): Promise<TeamItem[]> {
  const { Items } = await docClient.send(
    new QueryCommand({
      TableName: tableName,
      KeyConditionExpression: "pk = :pk",
      ExpressionAttributeValues: {
        ":pk": "TEAM",
      },
    })
  );

  return (Items ?? []) as TeamItem[];
}

export async function listTeams(): Promise<Team[]> {
  const docClient = getDynamoDocClient();
  const tableName = getContentTableName();
  const items = await listTeamItems(docClient, tableName);

  return items.map(asTeam).sort((a, b) => b.season.localeCompare(a.season));
}

export async function listPreviousTeams(): Promise<Team[]> {
  const teams = await listTeams();
  return teams.filter((team) => !team.isCurrent);
}

export async function getCurrentTeam(): Promise<Team> {
  const teams = await listTeams();
  const current = teams.find((team) => team.isCurrent);
  if (current) return current;

  if (teams[0]) return teams[0];
  throw new Error("No teams found in DynamoDB. Run the seed script.");
}

export async function getTeamById(id: string): Promise<Team | null> {
  const docClient = getDynamoDocClient();
  const tableName = getContentTableName();
  const { Item } = await docClient.send(
    new GetCommand({
      TableName: tableName,
      Key: {
        pk: "TEAM",
        sk: id,
      },
    })
  );

  return Item ? asTeam(Item as TeamItem) : null;
}

export async function upsertTeam(team: Team): Promise<void> {
  const docClient = getDynamoDocClient();
  const tableName = getContentTableName();
  await docClient.send(
    new PutCommand({
      TableName: tableName,
      Item: {
        pk: "TEAM",
        sk: team.id,
        entity: "TEAM",
        ...team,
        updatedAt: new Date().toISOString(),
      } satisfies TeamItem,
    })
  );
}
