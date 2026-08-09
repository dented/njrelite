import type { Sponsor, SponsorPackage } from "@/lib/sponsors";
import { DeleteCommand, PutCommand, QueryCommand } from "@aws-sdk/lib-dynamodb";
import { getContentTableName, getDynamoDocClient } from "@/lib/dynamodb";

type SponsorItem = Sponsor & {
  pk: "SPONSOR";
  sk: string;
  entity: "SPONSOR";
  updatedAt: string;
};

type SponsorPackageItem = SponsorPackage & {
  pk: "SPONSOR_PACKAGE";
  sk: string;
  entity: "SPONSOR_PACKAGE";
  updatedAt: string;
};

function asSponsor(item: SponsorItem): Sponsor {
  const { pk, sk, entity, updatedAt, ...sponsor } = item;
  void pk;
  void sk;
  void entity;
  void updatedAt;
  return sponsor;
}

function asSponsorPackage(item: SponsorPackageItem): SponsorPackage {
  const { pk, sk, entity, updatedAt, ...pkg } = item;
  void pk;
  void sk;
  void entity;
  void updatedAt;
  return pkg;
}

export async function listSponsors(): Promise<Sponsor[]> {
  const docClient = getDynamoDocClient();
  const tableName = getContentTableName();
  const { Items } = await docClient.send(
    new QueryCommand({
      TableName: tableName,
      KeyConditionExpression: "pk = :pk",
      ExpressionAttributeValues: {
        ":pk": "SPONSOR",
      },
    })
  );

  return ((Items ?? []) as SponsorItem[])
    .map(asSponsor)
    .sort((a, b) => a.name.localeCompare(b.name));
}

export async function upsertSponsors(sponsors: Sponsor[]): Promise<void> {
  const docClient = getDynamoDocClient();
  const tableName = getContentTableName();

  const { Items } = await docClient.send(
    new QueryCommand({
      TableName: tableName,
      KeyConditionExpression: "pk = :pk",
      ExpressionAttributeValues: {
        ":pk": "SPONSOR",
      },
      ProjectionExpression: "pk, sk",
    })
  );

  for (const item of Items ?? []) {
    const key = item as { pk: "SPONSOR"; sk: string };
    await docClient.send(
      new DeleteCommand({
        TableName: tableName,
        Key: {
          pk: key.pk,
          sk: key.sk,
        },
      })
    );
  }

  for (const sponsor of sponsors) {
    await docClient.send(
      new PutCommand({
        TableName: tableName,
        Item: {
          pk: "SPONSOR",
          sk: sponsor.name,
          entity: "SPONSOR",
          ...sponsor,
          updatedAt: new Date().toISOString(),
        } satisfies SponsorItem,
      })
    );
  }
}

export async function listSponsorPackages(): Promise<SponsorPackage[]> {
  const docClient = getDynamoDocClient();
  const tableName = getContentTableName();
  const { Items } = await docClient.send(
    new QueryCommand({
      TableName: tableName,
      KeyConditionExpression: "pk = :pk",
      ExpressionAttributeValues: {
        ":pk": "SPONSOR_PACKAGE",
      },
    })
  );

  return ((Items ?? []) as SponsorPackageItem[])
    .map(asSponsorPackage)
    .sort((a, b) => {
      const ap = a.price ?? Number.NEGATIVE_INFINITY;
      const bp = b.price ?? Number.NEGATIVE_INFINITY;
      return ap - bp;
    });
}

export async function upsertSponsorPackages(packages: SponsorPackage[]): Promise<void> {
  const docClient = getDynamoDocClient();
  const tableName = getContentTableName();

  const { Items } = await docClient.send(
    new QueryCommand({
      TableName: tableName,
      KeyConditionExpression: "pk = :pk",
      ExpressionAttributeValues: {
        ":pk": "SPONSOR_PACKAGE",
      },
      ProjectionExpression: "pk, sk",
    })
  );

  for (const item of Items ?? []) {
    const key = item as { pk: "SPONSOR_PACKAGE"; sk: string };
    await docClient.send(
      new DeleteCommand({
        TableName: tableName,
        Key: {
          pk: key.pk,
          sk: key.sk,
        },
      })
    );
  }

  for (const pkg of packages) {
    await docClient.send(
      new PutCommand({
        TableName: tableName,
        Item: {
          pk: "SPONSOR_PACKAGE",
          sk: pkg.id,
          entity: "SPONSOR_PACKAGE",
          ...pkg,
          updatedAt: new Date().toISOString(),
        } satisfies SponsorPackageItem,
      })
    );
  }
}
