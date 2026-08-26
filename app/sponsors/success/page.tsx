import Link from "next/link";
import { formatCurrency } from "@/lib/currency";
import { getStripe } from "@/lib/stripe";

export const dynamic = "force-dynamic";

export default async function SponsorshipSuccessPage({ searchParams }: {
  searchParams: Promise<{ payment_intent?: string }>;
}) {
  const { payment_intent: paymentIntentId } = await searchParams;
  let amount: number | undefined;
  let packageName = "";
  let succeeded = false;

  if (paymentIntentId?.startsWith("pi_")) {
    try {
      const intent = await getStripe().paymentIntents.retrieve(paymentIntentId);
      succeeded = intent.status === "succeeded" && intent.metadata.paymentKind === "sponsorship";
      amount = intent.amount_received / 100;
      packageName = intent.metadata.packageName ?? "";
    } catch {
      succeeded = false;
    }
  }

  return <main id="main"><section className="py-5" style={{ background: "var(--njr-gray)", minHeight: "70vh" }}>
    <div className="container py-5"><div className="card njr-card mx-auto" style={{ maxWidth: 680 }}>
      <div className="card-body p-4 p-md-5 text-center">
        {succeeded ? <>
          <div className="display-4 mb-3" aria-hidden="true">🏒</div>
          <h1 className="h2">Thank you for your sponsorship!</h1>
          <p className="lead mb-4">Your {packageName || "sponsorship"}{amount !== undefined ? ` payment of ${formatCurrency(amount)}` : ""} was successful. A payment receipt will be sent by Stripe.</p>
        </> : <>
          <h1 className="h2">Payment status unavailable</h1>
          <p className="mb-4">We could not confirm this sponsorship payment yet. Please check your email before trying again.</p>
        </>}
        <Link className="btn btn-njr btn-njr-primary" href="/sponsors">Return to Sponsors</Link>
      </div>
    </div></div>
  </section></main>;
}
