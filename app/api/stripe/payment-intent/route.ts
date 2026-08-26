import { z } from "zod";
import { getCurrentTeam } from "@/lib/content/teams";
import { getStripe } from "@/lib/stripe";

export const runtime = "nodejs";

const requestSchema = z.object({
  amount: z.number().int().min(1).max(100_000),
  sponsorshipType: z.enum(["Team", "Player"]),
  playerId: z.string().max(100).optional(),
  name: z.string().trim().min(1).max(100),
  email: z.string().trim().email().max(254),
});

export async function POST(request: Request) {
  const parsed = requestSchema.safeParse(await request.json().catch(() => null));
  if (!parsed.success) {
    return Response.json({ error: "Please check the donation details and try again." }, { status: 400 });
  }

  const donation = parsed.data;
  const team = await getCurrentTeam();
  const player = donation.playerId
    ? team.players.find((candidate) => candidate.id === donation.playerId)
    : undefined;

  if (donation.sponsorshipType === "Player" && !player) {
    return Response.json({ error: "Please choose a valid player." }, { status: 400 });
  }

  try {
    const paymentIntent = await getStripe().paymentIntents.create({
      amount: donation.amount * 100,
      currency: "cad",
      receipt_email: donation.email,
      description: donation.sponsorshipType === "Team"
        ? "TEAM"
        : `PLAYER: ${player!.id} - ${player!.name}`,
      metadata: {
        paymentKind: "donation",
        donorName: donation.name,
        donorEmail: donation.email,
        teamId: team.id,
        targetType: donation.sponsorshipType,
        playerId: player?.id ?? "",
        playerName: player?.name ?? "",
      },
      automatic_payment_methods: { enabled: true },
    });

    if (!paymentIntent.client_secret) {
      throw new Error("Stripe did not return a client secret.");
    }

    return Response.json({ clientSecret: paymentIntent.client_secret });
  } catch (error) {
    console.error("Unable to create Stripe PaymentIntent", error);
    return Response.json({ error: "Payment setup is temporarily unavailable." }, { status: 500 });
  }
}
