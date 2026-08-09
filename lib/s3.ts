import { S3Client } from "@aws-sdk/client-s3";
import { getAwsRegion, getEnv, getS3BucketName } from "@/lib/env";

type GlobalWithS3 = typeof globalThis & {
  __njrS3Client?: S3Client;
};

const globalForS3 = globalThis as GlobalWithS3;

export function getS3Client(): S3Client {
  const region = getAwsRegion();

  const client = globalForS3.__njrS3Client ?? new S3Client({ region });
  if (process.env.NODE_ENV !== "production") {
    globalForS3.__njrS3Client = client;
  }
  return client;
}

export function getS3PublicUrl(key: string): string {
  const env = getEnv();
  const encodedKey = encodeURIComponent(key).replaceAll("%2F", "/");

  if (env.CLOUDFRONT_URL) {
    const base = env.CLOUDFRONT_URL.replace(/\/+$/, "");
    return `${base}/${encodedKey}`;
  }

  const region = getAwsRegion();
  const bucket = getS3BucketName();

  // Simple virtual-hosted style URL. Works for most regions.
  return `https://${bucket}.s3.${region}.amazonaws.com/${encodedKey}`;
}
