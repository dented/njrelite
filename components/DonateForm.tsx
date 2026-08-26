"use client";

import { FormEvent, useEffect, useMemo, useState } from "react";
import { Elements, PaymentElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import type { Player } from "@/lib/players";
import { formatCurrency } from "@/lib/currency";

type DonateFormProps = { players: Player[]; playerId?: string; raisedAmount?: number; goalAmount?: number };
const sponsorTypes = ["Team", "Player"] as const;
type SponsorType = (typeof sponsorTypes)[number];
const publishableKey = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY;
const stripePromise = publishableKey ? loadStripe(publishableKey) : null;

function StripePaymentForm({ amount, onBack }: { amount: number; onBack: () => void }) {
  const stripe = useStripe();
  const elements = useElements();
  const [isPaying, setIsPaying] = useState(false);
  const [error, setError] = useState("");

  async function onPay(event: FormEvent) {
    event.preventDefault();
    if (!stripe || !elements) return;
    setIsPaying(true);
    setError("");

    const submitResult = await elements.submit();
    if (submitResult.error) {
      setError(submitResult.error.message ?? "Please check your payment details.");
      setIsPaying(false);
      return;
    }

    const result = await stripe.confirmPayment({
      elements,
      confirmParams: { return_url: `${window.location.origin}/donate/success` },
      redirect: "if_required",
    });

    if (result.error) {
      setError(result.error.message ?? "The payment could not be completed.");
      setIsPaying(false);
      return;
    }
    if (result.paymentIntent) {
      window.location.assign(`/donate/success?payment_intent=${encodeURIComponent(result.paymentIntent.id)}`);
    }
  }

  return (
    <form onSubmit={onPay}>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div><div className="small text-muted">Donation total</div><strong className="fs-4">{formatCurrency(amount)}</strong></div>
        <button className="btn btn-sm btn-outline-secondary" type="button" onClick={onBack} disabled={isPaying}>Edit details</button>
      </div>
      <PaymentElement options={{ layout: "tabs" }} />
      {error && <div className="alert alert-danger mt-3 mb-0" role="alert">{error}</div>}
      <button className="btn btn-njr btn-njr-primary w-100 mt-4" type="submit" disabled={!stripe || isPaying}>
        {isPaying ? "Processing…" : `Donate ${formatCurrency(amount)} ❤️`}
      </button>
      <p className="small text-muted text-center mt-3 mb-0">Payment details are securely handled by Stripe.</p>
    </form>
  );
}

export default function DonateForm({ players, playerId, raisedAmount = 4000, goalAmount = 10000 }: DonateFormProps) {
  const playerOptions = useMemo(
    () => players.map((player) => ({ id: player.id, label: `${player.name} (${player.position})` })),
    [players]
  );
  const [playerIdFromQuery, setPlayerIdFromQuery] = useState<string>();
  useEffect(() => setPlayerIdFromQuery(new URLSearchParams(window.location.search).get("player") ?? undefined), []);

  const effectivePlayerId = playerId ?? playerIdFromQuery;
  const initialPlayerId = useMemo(() => {
    if (!effectivePlayerId) return "";
    return players.find((player) => player.id.toLowerCase() === effectivePlayerId.toLowerCase())?.id ?? "";
  }, [effectivePlayerId, players]);
  const progressPercent = goalAmount > 0 ? Math.max(0, Math.min(100, (raisedAmount / goalAmount) * 100)) : 0;
  const [amount, setAmount] = useState<number | "">("");
  const [sponsorshipType, setSponsorshipType] = useState<SponsorType>(initialPlayerId ? "Player" : "Team");
  const [selectedPlayerId, setSelectedPlayerId] = useState(initialPlayerId);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [clientSecret, setClientSecret] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (initialPlayerId) { setSponsorshipType("Player"); setSelectedPlayerId(initialPlayerId); }
  }, [initialPlayerId]);

  async function onSubmit(event: FormEvent) {
    event.preventDefault();
    setError("");
    const donationAmount = Number(amount);
    if (!Number.isInteger(donationAmount) || donationAmount < 1) return setError("Please enter a whole-dollar donation of at least $1.");
    if (sponsorshipType === "Player" && !selectedPlayerId) return setError("Please choose a player to sponsor.");
    if (!name.trim()) return setError("Please enter your name.");
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) return setError("Please enter a valid email address.");
    if (!publishableKey) return setError("Stripe is not configured yet. Add the Stripe environment variables and restart the app.");

    setIsLoading(true);
    try {
      const response = await fetch("/api/stripe/payment-intent", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount: donationAmount, sponsorshipType,
          playerId: sponsorshipType === "Player" ? selectedPlayerId : undefined,
          name: name.trim(), email: email.trim() }),
      });
      const result = await response.json();
      if (!response.ok || !result.clientSecret) throw new Error(result.error ?? "Unable to start payment.");
      setClientSecret(result.clientSecret);
    } catch (requestError) {
      setError(requestError instanceof Error ? requestError.message : "Unable to start payment.");
    } finally { setIsLoading(false); }
  }

  return (
    <div className="card njr-card"><div className="card-body p-4 p-md-5">
      <h2 id="donateForm" className="mb-2">Donation Form</h2>
      <p className="small mb-4">Support the team securely with Stripe.</p>
      {clientSecret && stripePromise ? (
        <Elements stripe={stripePromise} options={{ clientSecret, appearance: { theme: "stripe", variables: { colorPrimary: "#ff0000", borderRadius: "16px" } } }}>
          <StripePaymentForm amount={Number(amount)} onBack={() => setClientSecret("")} />
        </Elements>
      ) : (
        <form onSubmit={onSubmit} noValidate>
          <div className="mb-3">
            <label className="form-label fw-bold" htmlFor="sponsorshipType">Donation Target</label>
            <select id="sponsorshipType" className="form-select" value={sponsorshipType} onChange={(event) => setSponsorshipType(event.target.value as SponsorType)} style={{ borderRadius: 16 }}>
              {sponsorTypes.map((option) => <option key={option} value={option}>{option}</option>)}
            </select>
          </div>
          {sponsorshipType === "Player" && <div className="mb-3">
            <label className="form-label fw-bold" htmlFor="playerSponsor">Select Player</label>
            <select id="playerSponsor" className="form-select" value={selectedPlayerId} onChange={(event) => setSelectedPlayerId(event.target.value)} style={{ borderRadius: 16 }}>
              <option value="">Choose a player</option>
              {playerOptions.map((option) => <option key={option.id} value={option.id}>{option.label}</option>)}
            </select>
          </div>}
          <div className="mb-3">
            <label className="form-label fw-bold" htmlFor="amount">Amount (CAD)</label>
            <input id="amount" type="number" className="form-control" min={1} max={100000} step={1} inputMode="numeric" placeholder="e.g., 50" value={amount}
              onChange={(event) => setAmount(event.target.value === "" ? "" : Math.trunc(Number(event.target.value)))} style={{ borderRadius: 16 }} required />
            <div className="form-text">Minimum $1 (whole dollars only)</div>
          </div>
          <div className="mb-3">
            <label className="form-label fw-bold" htmlFor="name">Donor Name</label>
            <input id="name" type="text" className="form-control" placeholder="Your name" value={name} onChange={(event) => setName(event.target.value)} maxLength={100} style={{ borderRadius: 16 }} required />
          </div>
          <div className="mb-4">
            <label className="form-label fw-bold" htmlFor="email">Email</label>
            <input id="email" type="email" className="form-control" placeholder="you@example.com" value={email} onChange={(event) => setEmail(event.target.value)} maxLength={254} style={{ borderRadius: 16 }} required />
          </div>
          {error && <div className="alert alert-danger" role="alert">{error}</div>}
          <button className="btn btn-njr btn-njr-primary w-100" type="submit" disabled={isLoading}>{isLoading ? "Preparing secure payment…" : "Continue to Payment"}</button>
        </form>
      )}
      <div className="mt-4">
        <div className="d-flex justify-content-between small mb-2"><span><strong>Raised:</strong> {formatCurrency(raisedAmount)}</span><span><strong>Goal:</strong> {formatCurrency(goalAmount)}</span></div>
        <div className="progress" style={{ height: 16, borderRadius: 999, border: "1px solid rgba(0,0,0,.12)" }}>
          <div className="progress-bar" role="progressbar" style={{ width: `${progressPercent}%`, background: "linear-gradient(90deg,#FF0000,rgba(255,0,0,.72))" }} aria-valuenow={Math.round(progressPercent)} aria-valuemin={0} aria-valuemax={100} />
        </div>
      </div>
    </div></div>
  );
}
