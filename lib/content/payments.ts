import { GetCommand, QueryCommand, TransactWriteCommand } from "@aws-sdk/lib-dynamodb";
import { z } from "zod";
import { getContentTableName, getDynamoDocClient } from "@/lib/dynamodb";
import { getTeamById } from "@/lib/content/teams";
import { PaymentSchema } from "@/lib/content/schemas";

export type Payment = z.infer<typeof PaymentSchema>;

type PaymentItem = Payment & {
  pk: "PAYMENT";
  sk: string;
  entity: "PAYMENT";
};

function asPayment(item: PaymentItem): Payment {
  const { pk, sk, entity, ...payment } = item;
  void pk;
  void sk;
  void entity;
  return PaymentSchema.parse(payment);
}

export async function listPayments(): Promise<Payment[]> {
  const { Items } = await getDynamoDocClient().send(new QueryCommand({
    TableName: getContentTableName(),
    KeyConditionExpression: "pk = :pk",
    ExpressionAttributeValues: { ":pk": "PAYMENT" },
  }));

  return ((Items ?? []) as PaymentItem[])
    .map(asPayment)
    .sort((a, b) => b.completedAt.localeCompare(a.completedAt));
}

export async function recordPaymentAndUpdateRaised(paymentInput: Payment): Promise<void> {
  const payment = PaymentSchema.parse(paymentInput);
  const docClient = getDynamoDocClient();
  const tableName = getContentTableName();
  const team = await getTeamById(payment.teamId);
  if (!team) throw new Error(`Cannot apply payment ${payment.id}: team ${payment.teamId} was not found.`);

  const playerIndex = payment.playerId
    ? team.players.findIndex((player) => player.id === payment.playerId)
    : -1;
  if (payment.targetType === "Player" && playerIndex < 0) {
    throw new Error(`Cannot apply payment ${payment.id}: player ${payment.playerId} was not found.`);
  }

  const expressionNames: Record<string, string> = {
    "#raised": "raised",
    "#updatedAt": "updatedAt",
  };
  const expressionValues: Record<string, unknown> = {
    ":amount": payment.donationAmountCad ?? payment.amountCad,
    ":zero": 0,
    ":updatedAt": payment.completedAt,
  };
  let updateExpression = "SET #raised = if_not_exists(#raised, :zero) + :amount, #updatedAt = :updatedAt";
  let conditionExpression = "attribute_exists(pk)";

  if (playerIndex >= 0) {
    expressionNames["#players"] = "players";
    expressionNames["#id"] = "id";
    expressionValues[":playerId"] = payment.playerId;
    updateExpression += `, #players[${playerIndex}].#raised = #players[${playerIndex}].#raised + :amount`;
    conditionExpression += ` AND #players[${playerIndex}].#id = :playerId`;
  }

  try {
    await docClient.send(new TransactWriteCommand({
      TransactItems: [
        {
          Put: {
            TableName: tableName,
            Item: { pk: "PAYMENT", sk: payment.id, entity: "PAYMENT", ...payment } satisfies PaymentItem,
            ConditionExpression: "attribute_not_exists(pk) AND attribute_not_exists(sk)",
          },
        },
        {
          Update: {
            TableName: tableName,
            Key: { pk: "TEAM", sk: payment.teamId },
            UpdateExpression: updateExpression,
            ConditionExpression: conditionExpression,
            ExpressionAttributeNames: expressionNames,
            ExpressionAttributeValues: expressionValues,
          },
        },
      ],
    }));
  } catch (error) {
    if (error instanceof Error && error.name === "TransactionCanceledException") {
      const existing = await docClient.send(new GetCommand({
        TableName: tableName,
        Key: { pk: "PAYMENT", sk: payment.id },
      }));
      if (existing.Item) return;
    }
    throw error;
  }
}
