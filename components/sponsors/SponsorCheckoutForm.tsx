"use client";

import { FormEvent, useState } from "react";
import { Elements, PaymentElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { formatCurrency } from "@/lib/currency";
import type { SponsorPackage } from "@/lib/sponsors";

const publishableKey = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY;
const stripePromise = publishableKey ? loadStripe(publishableKey) : null;

function SponsorshipPayment({ amount, onBack }: { amount: number; onBack: () => void }) {
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
      confirmParams: { return_url: `${window.location.origin}/sponsors/success` },
      redirect: "if_required",
    });
    if (result.error) {
      setError(result.error.message ?? "The payment could not be completed.");
      setIsPaying(false);
      return;
    }
    if (result.paymentIntent) {
      window.location.assign(`/sponsors/success?payment_intent=${encodeURIComponent(result.paymentIntent.id)}`);
    }
  }

  return <form onSubmit={onPay}>
    <div className="d-flex justify-content-between align-items-center mb-4">
      <div><div className="small text-muted">Sponsorship total</div><strong className="fs-4">{formatCurrency(amount)}</strong></div>
      <button className="btn btn-sm btn-outline-secondary" type="button" onClick={onBack} disabled={isPaying}>Edit details</button>
    </div>
    <PaymentElement options={{ layout: "tabs" }} />
    {error && <div className="alert alert-danger mt-3 mb-0" role="alert">{error}</div>}
    <button className="btn btn-njr btn-njr-primary w-100 mt-4" type="submit" disabled={!stripe || isPaying}>
      {isPaying ? "Processing…" : `Pay ${formatCurrency(amount)}`}
    </button>
    <p className="small text-muted text-center mt-3 mb-0">Payment details are securely handled by Stripe.</p>
  </form>;
}

export default function SponsorCheckoutForm({ selectedPackage }: { selectedPackage: SponsorPackage }) {
  const [amount, setAmount] = useState<number | "">(selectedPackage.price ?? "");
  const [contactName, setContactName] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [clientSecret, setClientSecret] = useState("");
  const [paymentAmount, setPaymentAmount] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  async function onSubmit(event: FormEvent) {
    event.preventDefault();
    setError("");
    const normalizedAmount = Number(amount);
    if (!Number.isInteger(normalizedAmount) || normalizedAmount < 1) return setError("Please enter a whole-dollar sponsorship amount of at least $1.");
    if (!contactName.trim()) return setError("Please enter your name.");
    if (!companyName.trim()) return setError("Please enter your company name.");
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) return setError("Please enter a valid email address.");
    if (!phone.trim()) return setError("Please enter your phone number.");
    if (!publishableKey) return setError("Stripe is not configured yet. Add the Stripe environment variables and restart the app.");

    setIsLoading(true);
    try {
      const response = await fetch("/api/stripe/sponsorship-intent", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ packageId: selectedPackage.id, amount: normalizedAmount,
          contactName: contactName.trim(), companyName: companyName.trim(), email: email.trim(), phone: phone.trim() }),
      });
      const result = await response.json();
      if (!response.ok || !result.clientSecret) throw new Error(result.error ?? "Unable to start payment.");
      setPaymentAmount(result.amount);
      setClientSecret(result.clientSecret);
    } catch (requestError) {
      setError(requestError instanceof Error ? requestError.message : "Unable to start payment.");
    } finally { setIsLoading(false); }
  }

  if (clientSecret && stripePromise) {
    return <Elements stripe={stripePromise} options={{ clientSecret, appearance: { theme: "stripe", variables: { colorPrimary: "#ff0000", borderRadius: "16px" } } }}>
      <SponsorshipPayment amount={paymentAmount} onBack={() => setClientSecret("")} />
    </Elements>;
  }

  return <form onSubmit={onSubmit} noValidate>
    <div className="mb-3">
      <label className="form-label fw-bold" htmlFor="selectedPackage">Selected Package</label>
      <input id="selectedPackage" className="form-control" value={selectedPackage.name} readOnly style={{ borderRadius: 16 }} />
    </div>
    <div className="mb-3">
      <label className="form-label fw-bold" htmlFor="sponsorAmount">Amount (CAD)</label>
      <input id="sponsorAmount" type="number" min={1} max={100000} step={1} className="form-control" value={amount}
        readOnly={selectedPackage.price !== null}
        onChange={(event) => setAmount(event.target.value === "" ? "" : Math.trunc(Number(event.target.value)))} style={{ borderRadius: 16 }} required />
      {selectedPackage.price !== null && <div className="form-text">This package has a fixed price.</div>}
    </div>
    <div className="mb-3">
      <label className="form-label fw-bold" htmlFor="packageDetails">Package Details</label>
      <div id="packageDetails" className="rounded-4 p-3" style={{ border: "1px solid rgba(0,0,0,.12)", background: "#fff" }}>
        <ul className="small ps-3 mb-0 d-flex flex-column gap-2">
          {selectedPackage.benefits.map((benefit) => <li key={`${selectedPackage.id}-${benefit}`}>{benefit}</li>)}
        </ul>
      </div>
    </div>
    <div className="row g-3">
      <div className="col-12 col-md-6"><label className="form-label fw-bold" htmlFor="contactName">Name</label>
        <input id="contactName" type="text" className="form-control" value={contactName} onChange={(event) => setContactName(event.target.value)} maxLength={100} style={{ borderRadius: 16 }} required /></div>
      <div className="col-12 col-md-6"><label className="form-label fw-bold" htmlFor="companyName">Company Name</label>
        <input id="companyName" type="text" className="form-control" value={companyName} onChange={(event) => setCompanyName(event.target.value)} maxLength={100} style={{ borderRadius: 16 }} required /></div>
      <div className="col-12 col-md-6"><label className="form-label fw-bold" htmlFor="sponsorEmail">Email</label>
        <input id="sponsorEmail" type="email" className="form-control" value={email} onChange={(event) => setEmail(event.target.value)} maxLength={254} style={{ borderRadius: 16 }} required /></div>
      <div className="col-12 col-md-6"><label className="form-label fw-bold" htmlFor="sponsorPhone">Phone</label>
        <input id="sponsorPhone" type="tel" className="form-control" value={phone} onChange={(event) => setPhone(event.target.value)} maxLength={40} style={{ borderRadius: 16 }} required /></div>
    </div>
    {error && <div className="alert alert-danger mt-3 mb-0" role="alert">{error}</div>}
    <button type="submit" className="btn btn-njr btn-njr-primary w-100 mt-4" disabled={isLoading}>
      {isLoading ? "Preparing secure payment…" : "Continue to Payment"}
    </button>
  </form>;
}
