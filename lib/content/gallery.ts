import type { GalleryItem } from "@/lib/gallery";
import { DeleteCommand, PutCommand, QueryCommand } from "@aws-sdk/lib-dynamodb";
import { getContentTableName, getDynamoDocClient } from "@/lib/dynamodb";

type GalleryRecord = GalleryItem & {
  pk: "GALLERY";
  sk: string;
  entity: "GALLERY_ITEM";
  updatedAt: string;
};

function asGalleryItem(record: GalleryRecord): GalleryItem {
  const { pk, sk, entity, updatedAt, ...item } = record;
  void pk;
  void sk;
  void entity;
  void updatedAt;
  return item;
}

export async function listGalleryItems(): Promise<GalleryItem[]> {
  const { Items } = await getDynamoDocClient().send(
    new QueryCommand({
      TableName: getContentTableName(),
      KeyConditionExpression: "pk = :pk",
      ExpressionAttributeValues: { ":pk": "GALLERY" },
    })
  );

  return ((Items ?? []) as GalleryRecord[])
    .map(asGalleryItem)
    .sort((a, b) => {
      if (a.type !== b.type) return a.type === "video" ? -1 : 1;
      return a.sortOrder - b.sortOrder;
    });
}

export async function replaceGalleryItems(items: GalleryItem[]): Promise<void> {
  const docClient = getDynamoDocClient();
  const tableName = getContentTableName();
  const { Items } = await docClient.send(
    new QueryCommand({
      TableName: tableName,
      KeyConditionExpression: "pk = :pk",
      ExpressionAttributeValues: { ":pk": "GALLERY" },
      ProjectionExpression: "pk, sk",
    })
  );

  for (const record of Items ?? []) {
    await docClient.send(new DeleteCommand({ TableName: tableName, Key: record }));
  }

  for (const item of items) {
    await docClient.send(
      new PutCommand({
        TableName: tableName,
        Item: {
          pk: "GALLERY",
          sk: item.id,
          entity: "GALLERY_ITEM",
          ...item,
          updatedAt: new Date().toISOString(),
        } satisfies GalleryRecord,
      })
    );
  }
}
