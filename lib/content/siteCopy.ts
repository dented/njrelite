import { GetCommand, PutCommand, QueryCommand } from "@aws-sdk/lib-dynamodb";
import { getContentTableName, getDynamoDocClient } from "@/lib/dynamodb";

export type SiteCopyValue = {
  slug: string;
  title?: string;
  body?: string;
};

type SiteCopyItem = SiteCopyValue & {
  pk: "SITE_COPY";
  sk: string;
  entity: "SITE_COPY";
  updatedAt: string;
};

function asSiteCopy(item: SiteCopyItem): SiteCopyValue {
  const { pk, sk, entity, updatedAt, ...value } = item;
  void pk;
  void sk;
  void entity;
  void updatedAt;
  return value;
}

export async function getSiteCopy(slug: string): Promise<SiteCopyValue | null> {
  const docClient = getDynamoDocClient();
  const tableName = getContentTableName();
  const { Item } = await docClient.send(
    new GetCommand({
      TableName: tableName,
      Key: {
        pk: "SITE_COPY",
        sk: slug,
      },
    })
  );

  return Item ? asSiteCopy(Item as SiteCopyItem) : null;
}

export async function upsertSiteCopy(value: SiteCopyValue): Promise<void> {
  const docClient = getDynamoDocClient();
  const tableName = getContentTableName();
  await docClient.send(
    new PutCommand({
      TableName: tableName,
      Item: {
        pk: "SITE_COPY",
        sk: value.slug,
        entity: "SITE_COPY",
        ...value,
        updatedAt: new Date().toISOString(),
      } satisfies SiteCopyItem,
    })
  );
}

export async function listSiteCopySlugs(): Promise<string[]> {
  const docClient = getDynamoDocClient();
  const tableName = getContentTableName();
  const { Items } = await docClient.send(
    new QueryCommand({
      TableName: tableName,
      KeyConditionExpression: "pk = :pk",
      ExpressionAttributeValues: {
        ":pk": "SITE_COPY",
      },
      ProjectionExpression: "slug",
    })
  );

  return (Items ?? [])
    .map((d) => (d as { slug: string }).slug)
    .sort((a, b) => a.localeCompare(b));
}
