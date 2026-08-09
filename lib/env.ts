import { z } from "zod";

const base = z.object({
  DYNAMODB_TABLE_NAME: z.string().min(1).default("niagara-jr-elite-content"),

  ADMIN_BASIC_AUTH_USER: z.string().min(1).optional(),
  ADMIN_BASIC_AUTH_PASS: z.string().min(1).optional(),

  AWS_REGION: z.string().min(1).optional(),
  AWS_S3_BUCKET_NAME: z.string().min(1).optional(),

  CLOUDFRONT_URL: z.string().min(1).optional(),
});

export type Env = z.infer<typeof base>;

let cached: Env | undefined;

export function getEnv(): Env {
  if (cached) return cached;
  const parsed = base.safeParse(process.env);
  if (!parsed.success) {
    // Keep runtime errors readable; this is mostly used server-side.
    throw new Error(
      `Invalid environment variables: ${parsed.error.issues.map((i) => i.path.join(".") + ": " + i.message).join(", ")}`
    );
  }
  cached = parsed.data;
  return cached;
}

export function requireEnv(keys: Array<keyof Env>): Env {
  const env = getEnv();
  const missing = keys.filter((k) => !env[k]);
  if (missing.length) {
    throw new Error(`Missing required env vars: ${missing.join(", ")}`);
  }
  return env;
}
