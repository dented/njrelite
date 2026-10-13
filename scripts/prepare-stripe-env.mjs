import { appendFileSync } from "node:fs";

// Amplify build variables must be persisted for Next.js server routes.
// Never print the values: the secret and webhook keys are server-only.
const required = ["STRIPE_SECRET_KEY", "NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY"];
const keys = [...required, "STRIPE_WEBHOOK_SECRET"];
const missing = required.filter((key) => !process.env[key]?.trim());
if (missing.length) {
  throw new Error(`Missing Amplify environment variables: ${missing.join(", ")}`);
}

const lines = keys.flatMap((key) => {
  const value = process.env[key]?.trim();
  if (!value) return [];
  if (/[\r\n#'"`]/.test(value)) {
    throw new Error(`Invalid ${key}: enter the Stripe key without quotes or line breaks.`);
  }
  return [`${key}=${value}`];
});

appendFileSync(".env.production", `\n${lines.join("\n")}\n`, { mode: 0o600 });
console.log("Prepared Stripe environment variables for the Next.js runtime.");
