import type { StaffMember } from "@/lib/staff";
import { DeleteCommand, PutCommand, QueryCommand } from "@aws-sdk/lib-dynamodb";
import { getContentTableName, getDynamoDocClient } from "@/lib/dynamodb";

type StaffItem = StaffMember & {
  pk: "STAFF";
  sk: string;
  entity: "STAFF";
  updatedAt: string;
};

function asStaffMember(item: StaffItem): StaffMember {
  const { pk, sk, entity, updatedAt, ...member } = item;
  void pk;
  void sk;
  void entity;
  void updatedAt;
  return member;
}

export async function listStaff(): Promise<StaffMember[]> {
  const docClient = getDynamoDocClient();
  const tableName = getContentTableName();
  const { Items } = await docClient.send(
    new QueryCommand({
      TableName: tableName,
      KeyConditionExpression: "pk = :pk",
      ExpressionAttributeValues: {
        ":pk": "STAFF",
      },
    })
  );

  return ((Items ?? []) as StaffItem[])
    .map(asStaffMember)
    .sort((a, b) => a.type.localeCompare(b.type) || a.name.localeCompare(b.name));
}

export async function upsertStaff(staff: StaffMember[]): Promise<void> {
  const docClient = getDynamoDocClient();
  const tableName = getContentTableName();

  const { Items } = await docClient.send(
    new QueryCommand({
      TableName: tableName,
      KeyConditionExpression: "pk = :pk",
      ExpressionAttributeValues: {
        ":pk": "STAFF",
      },
      ProjectionExpression: "pk, sk",
    })
  );

  for (const item of Items ?? []) {
    const key = item as { pk: "STAFF"; sk: string };
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

  for (const member of staff) {
    await docClient.send(
      new PutCommand({
        TableName: tableName,
        Item: {
          pk: "STAFF",
          sk: member.id,
          entity: "STAFF",
          ...member,
          updatedAt: new Date().toISOString(),
        } satisfies StaffItem,
      })
    );
  }
}
