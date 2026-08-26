import Stripe from "stripe";
import { requireEnv } from "@/lib/env";

let stripeClient: Stripe | undefined;

export function getStripe(): Stripe {
  if (stripeClient) return stripeClient;

  const { STRIPE_SECRET_KEY } = requireEnv(["STRIPE_SECRET_KEY"]);
  stripeClient = new Stripe(STRIPE_SECRET_KEY!);
  return stripeClient;
}
