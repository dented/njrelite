import { MongoClient } from "mongodb";
import { requireEnv } from "@/lib/env";

type GlobalWithMongo = typeof globalThis & {
  __njrMongoClient?: MongoClient;
};

const globalForMongo = globalThis as GlobalWithMongo;

function getMongoClient(): MongoClient {
  if (globalForMongo.__njrMongoClient) return globalForMongo.__njrMongoClient;
  const env = requireEnv(["MONGODB_URI"]);
  const uri = env.MONGODB_URI as string;
  const client = new MongoClient(uri);
  if (process.env.NODE_ENV !== "production") {
    globalForMongo.__njrMongoClient = client;
  }
  return client;
}

export async function getDb() {
  const { MONGODB_DB } = requireEnv(["MONGODB_URI"]);
  const client = getMongoClient();
  await client.connect();
  return client.db(MONGODB_DB);
}
