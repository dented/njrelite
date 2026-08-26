import { DeleteCommand, PutCommand, QueryCommand } from "@aws-sdk/lib-dynamodb";
import { getContentTableName, getDynamoDocClient } from "@/lib/dynamodb";
import type { Fundraiser } from "@/lib/fundraisers";

type FundraiserItem = Fundraiser & {
  pk: "FUNDRAISERS";
  sk: string;
  entity: "FUNDRAISER";
  updatedAt: string;
};

export const defaultFundraisers: Fundraiser[] = [
  {
    id: "community-bbq-2026",
    title: "Community BBQ",
    date: "Wednesday, September 2, 2026",
    location: "LeMayzzz Meats · Welland, Ontario",
    description: "Great food for a great cause. Stop by for burgers, sausage, and steak on a bun — all proceeds support the Niagara Elite Canadians on their journey to Finland.",
    icon: "BBQ",
    accent: "#cc0000",
    image: "",
    featured: true,
    offerings: ["Burgers", "Sausage", "Steak on a bun"],
    sortOrder: 0,
  },
  {
    id: "bottle-drive",
    title: "Bottle Drive",
    date: "Date to be announced",
    location: "Drop-off locations across Niagara",
    description: "Save your eligible empties and donate them at one of our community collection points. Every return adds up for the team.",
    icon: "DRIVE",
    accent: "#101010",
    image: "",
    featured: false,
    offerings: [],
    sortOrder: 1,
  },
  {
    id: "dinner-prizes",
    title: "Dinner & Prizes",
    date: "Date to be announced",
    location: "Venue to be announced",
    description: "An evening of food, team spirit, and prizes donated by local supporters. Gather your table and help our athletes reach the next level.",
    icon: "DINNER",
    accent: "#cc0000",
    image: "",
    featured: false,
    offerings: [],
    sortOrder: 2,
  },
  {
    id: "charity-golf",
    title: "Charity Golf Classic",
    date: "Date to be announced",
    location: "Course to be announced",
    description: "Hit the links in support of Niagara Jr Elite. Team registrations, hole sponsorships, and prize donations will be available.",
    icon: "GOLF",
    accent: "#101010",
    image: "",
    featured: false,
    offerings: [],
    sortOrder: 3,
  },
];

function fromItem(item: FundraiserItem): Fundraiser {
  const { pk, sk, entity, updatedAt, ...fundraiser } = item;
  void pk; void sk; void entity; void updatedAt;
  return fundraiser;
}

export async function listFundraisers(): Promise<Fundraiser[]> {
  const { Items } = await getDynamoDocClient().send(new QueryCommand({
    TableName: getContentTableName(),
    KeyConditionExpression: "pk = :pk",
    ExpressionAttributeValues: { ":pk": "FUNDRAISERS" },
  }));

  const items = Items ?? [];
  const hasSavedCollection = items.some((item) => item.sk === "__CONFIG__");
  if (!hasSavedCollection) return defaultFundraisers;

  return (items as FundraiserItem[])
    .filter((item) => item.sk !== "__CONFIG__")
    .map(fromItem)
    .sort((a, b) => a.sortOrder - b.sortOrder);
}

export async function replaceFundraisers(fundraisers: Fundraiser[]): Promise<void> {
  const client = getDynamoDocClient();
  const table = getContentTableName();
  const { Items } = await client.send(new QueryCommand({
    TableName: table,
    KeyConditionExpression: "pk = :pk",
    ExpressionAttributeValues: { ":pk": "FUNDRAISERS" },
    ProjectionExpression: "pk, sk",
  }));

  for (const item of Items ?? []) {
    await client.send(new DeleteCommand({ TableName: table, Key: { pk: item.pk, sk: item.sk } }));
  }

  const updatedAt = new Date().toISOString();
  await client.send(new PutCommand({
    TableName: table,
    Item: { pk: "FUNDRAISERS", sk: "__CONFIG__", entity: "FUNDRAISER_CONFIG", updatedAt },
  }));

  for (const fundraiser of fundraisers) {
    await client.send(new PutCommand({
      TableName: table,
      Item: { pk: "FUNDRAISERS", sk: fundraiser.id, entity: "FUNDRAISER", ...fundraiser, updatedAt } satisfies FundraiserItem,
    }));
  }
}
