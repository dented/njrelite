import { PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import crypto from "crypto";
import { PresignUploadSchema } from "@/lib/content/schemas";
import { getAwsRegion, getS3BucketName } from "@/lib/env";
import { getS3Client, getS3PublicUrl } from "@/lib/s3";

export const runtime = "nodejs";

const allowedContentTypes = new Set([
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/gif",
  "image/svg+xml",
]);

function safeFileName(name: string) {
  // Keep it simple: strip path separators and odd chars.
  return name
    .replaceAll("\\", "-")
    .replaceAll("/", "-")
    .replaceAll(/[^a-zA-Z0-9._-]+/g, "-")
    .slice(0, 120);
}

export async function POST(req: Request) {
  const { prefix, fileName, contentType } = PresignUploadSchema.parse(await req.json());

  if (!allowedContentTypes.has(contentType)) {
    return Response.json(
      { ok: false, error: `Unsupported contentType: ${contentType}` },
      { status: 400 }
    );
  }

  const ext = safeFileName(fileName);
  const nonce = crypto.randomBytes(8).toString("hex");
  const key = `${prefix}/${Date.now()}-${nonce}-${ext}`;

  const s3 = getS3Client();
  const command = new PutObjectCommand({
    Bucket: getS3BucketName(),
    Key: key,
    ContentType: contentType,
    // If you want public S3 objects, the bucket/prefix policy should allow read.
    // ACL is intentionally omitted (many buckets have ACLs disabled).
  });

  const url = await getSignedUrl(s3, command, { expiresIn: 60 * 10 });
  const publicUrl = getS3PublicUrl(key);

  // Optional: let the client know which region we used.
  return Response.json({ ok: true, uploadUrl: url, key, publicUrl, region: getAwsRegion() });
}
