import { z } from "zod";
import { listSponsorPackages } from "@/lib/content/sponsors";
import { getCurrentTeam } from "@/lib/content/teams";
import { getStripe } from "@/lib/stripe";

export const runtime = "nodejs";

const requestSchema = z.object({
  packageId: z.string().trim().min(1).max(100),
  amount: z.number().int().min(1).max(100_000),
  contactName: z.string().trim().min(1).max(100),
  companyName: z.string().trim().min(1).max(100),
  email: z.string().trim().email().max(254),
  phone: z.string().trim().min(1).max(40),
});

export async function POST(request: Request) {
  const parsed = requestSchema.safeParse(await request.json().catch(() => null));
  if (!parsed.success) {
    return Response.json({ error: "Please check the sponsorship details and try again." }, { status: 400 });
  }

  const sponsorship = parsed.data;
  const [packages, team] = await Promise.all([listSponsorPackages(), getCurrentTeam()]);
  const selectedPackage = packages.find((pkg) => pkg.id === sponsorship.packageId);
  if (!selectedPackage) {
    return Response.json({ error: "Please choose a valid sponsorship package." }, { status: 400 });
  }

  // Fixed-price packages always use the server-side package price. Custom packages use the submitted amount.
  const amount = selectedPackage.price ?? sponsorship.amount;
  if (!Number.isInteger(amount) || amount < 1 || amount > 100_000) {
    return Response.json({ error: "This package does not have a valid payment amount." }, { status: 400 });
  }

  try {
    const paymentIntent = await getStripe().paymentIntents.create({
      amount: amount * 100,
      currency: "cad",
      receipt_email: sponsorship.email,
      description: `SPONSOR: ${selectedPackage.id} - ${selectedPackage.name}`,
      metadata: {
        paymentKind: "sponsorship",
        teamId: team.id,
        packageId: selectedPackage.id,
        packageName: selectedPackage.name,
        contactName: sponsorship.contactName,
        companyName: sponsorship.companyName,
        email: sponsorship.email,
        phone: sponsorship.phone,
      },
      automatic_payment_methods: { enabled: true },
    });

    if (!paymentIntent.client_secret) throw new Error("Stripe did not return a client secret.");
    return Response.json({ clientSecret: paymentIntent.client_secret, amount });
  } catch (error) {
    console.error("Unable to create sponsorship PaymentIntent", error);
    return Response.json({ error: "Payment setup is temporarily unavailable." }, { status: 500 });
  }
}
