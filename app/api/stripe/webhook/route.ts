import Stripe from "stripe";
import { requireEnv } from "@/lib/env";
import { recordPaymentAndUpdateRaised, type Payment } from "@/lib/content/payments";
import { getStripe } from "@/lib/stripe";

export const runtime = "nodejs";

export async function POST(request: Request) {
  const signature = request.headers.get("stripe-signature");
  if (!signature) return new Response("Missing Stripe signature", { status: 400 });

  const payload = await request.text();
  const { STRIPE_WEBHOOK_SECRET } = requireEnv(["STRIPE_WEBHOOK_SECRET"]);
  let event: Stripe.Event;

  try {
    event = getStripe().webhooks.constructEvent(payload, signature, STRIPE_WEBHOOK_SECRET!);
  } catch (error) {
    console.error("Invalid Stripe webhook signature", error);
    return new Response("Invalid signature", { status: 400 });
  }

  if (event.type === "payment_intent.succeeded") {
    const intent = event.data.object;
    const targetType = intent.metadata.targetType;

    let payment: Payment | undefined;
    if (intent.metadata.paymentKind === "sponsorship" && intent.metadata.teamId) {
      payment = {
        id: intent.id,
        stripeEventId: event.id,
        kind: "sponsorship",
        status: "succeeded",
        amount: intent.amount_received,
        amountCad: intent.amount_received / 100,
        currency: intent.currency,
        description: intent.description ?? "",
        teamId: intent.metadata.teamId,
        targetType: "Sponsor",
        packageId: intent.metadata.packageId || undefined,
        packageName: intent.metadata.packageName || undefined,
        donorName: intent.metadata.contactName || undefined,
        companyName: intent.metadata.companyName || undefined,
        email: intent.metadata.email || intent.receipt_email || undefined,
        phone: intent.metadata.phone || undefined,
        completedAt: new Date(event.created * 1000).toISOString(),
      };
    } else if ((targetType === "Team" || targetType === "Player") && intent.metadata.teamId) {
      const donationCents = Number(intent.metadata.donationCents);
      payment = {
        id: intent.id,
        stripeEventId: event.id,
        kind: "donation",
        donationAmountCad: Number.isSafeInteger(donationCents) && donationCents > 0 && donationCents <= intent.amount_received
          ? donationCents / 100 : undefined,
        status: "succeeded",
        amount: intent.amount_received,
        amountCad: intent.amount_received / 100,
        currency: intent.currency,
        description: intent.description ?? "",
        teamId: intent.metadata.teamId,
        targetType,
        playerId: intent.metadata.playerId || undefined,
        playerName: intent.metadata.playerName || undefined,
        donorName: intent.metadata.donorName || undefined,
        email: intent.metadata.donorEmail || intent.receipt_email || undefined,
        completedAt: new Date(event.created * 1000).toISOString(),
      };
    }

    if (payment) {
      await recordPaymentAndUpdateRaised(payment);
    }
  }

  return Response.json({ received: true });
}
