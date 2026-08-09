import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient } from "@aws-sdk/lib-dynamodb";
import { requireEnv } from "@/lib/env";

type GlobalWithDynamo = typeof globalThis & {
  __njrDynamoClient?: DynamoDBClient;
};

const globalForDynamo = globalThis as GlobalWithDynamo;

function getDynamoClient(): DynamoDBClient {
  if (globalForDynamo.__njrDynamoClient) return globalForDynamo.__njrDynamoClient;

  const { AWS_REGION } = requireEnv(["AWS_REGION"]);
  const client = new DynamoDBClient({ region: AWS_REGION });

  if (process.env.NODE_ENV !== "production") {
    globalForDynamo.__njrDynamoClient = client;
  }

  return client;
}

export function getDynamoDocClient(): DynamoDBDocumentClient {
  return DynamoDBDocumentClient.from(getDynamoClient(), {
    marshallOptions: {
      removeUndefinedValues: true,
    },
  });
}

export function getContentTableName(): string {
  const { DYNAMODB_TABLE_NAME } = requireEnv(["DYNAMODB_TABLE_NAME"]);
  return DYNAMODB_TABLE_NAME;
}
