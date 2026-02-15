"use client";

import { useMemo, useState } from "react";
import { players } from "@/lib/players";

const DonateForm = () => {
  const sponsorOptions = useMemo(
    () => ["General Fund", ...players.map((p) => `${p.name} (${p.position})`)],
    []
  );

  const [amount, setAmount] = useState<number | "">("");
  const [sponsor, setSponsor] = useState<string>("General Fund");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [modalText, setModalText] = useState("");

  function validateEmail(v: string) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
  }

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    const amt = Number(amount);
    const errs: string[] = [];

    if (!amt || Number.isNaN(amt) || amt < 1) errs.push("Please enter a donation amount of at least $1.");
    if (!name.trim()) errs.push("Please enter your name.");
    if (!validateEmail(email.trim())) errs.push("Please enter a valid email address.");

    const text = errs.length
      ? errs.join(" ")
      : `Thank you, ${name}! Your donation of $${amt.toFixed(2)} to "${sponsor}" is ready to be processed. (Stripe/PayPal integration placeholder)`;

    setModalText(text);

    if (!errs.length) {
      setAmount("");
      setSponsor("General Fund");
      setName("");
      setEmail("");
    }

    // Trigger Bootstrap modal
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const bootstrap = (window as any).bootstrap;
    const el = document.getElementById("thankYouModal");
    if (bootstrap && el) {
      const modal = bootstrap.Modal.getOrCreateInstance(el);
      modal.show();
    } else {
      alert(text);
    }
  }

  return (
    <>
      <div className="card njr-card">
        <div className="card-body p-4 p-md-5">
          <h2 id="donateForm" className="mb-2">Donation Form</h2>
          <p className="small mb-4">Integration placeholder: replace submit handler with Stripe Checkout / PayPal buttons.</p>

          <form onSubmit={onSubmit} noValidate>
            <div className="mb-3">
              <label className="form-label fw-bold" htmlFor="amount">Amount (CAD)</label>
              <input
                id="amount"
                type="number"
                className="form-control"
                min={1}
                step={1}
                inputMode="numeric"
                placeholder="e.g., 50"
                value={amount}
                onChange={(e) => setAmount(e.target.value === "" ? "" : Number(e.target.value))}
                style={{ borderRadius: 16 }}
                required
              />
              <div className="form-text">Minimum $1.00</div>
            </div>

            <div className="mb-3">
              <label className="form-label fw-bold" htmlFor="sponsor">Sponsor Player</label>
              <select
                id="sponsor"
                className="form-select"
                value={sponsor}
                onChange={(e) => setSponsor(e.target.value)}
                style={{ borderRadius: 16 }}
                required
              >
                {sponsorOptions.map((o) => <option key={o} value={o}>{o}</option>)}
              </select>
              <div className="form-text">Choose “General Fund” or sponsor a specific player.</div>
            </div>

            <div className="mb-3">
              <label className="form-label fw-bold" htmlFor="name">Donor Name</label>
              <input
                id="name"
                type="text"
                className="form-control"
                placeholder="Your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                style={{ borderRadius: 16 }}
                required
              />
            </div>

            <div className="mb-4">
              <label className="form-label fw-bold" htmlFor="email">Email</label>
              <input
                id="email"
                type="email"
                className="form-control"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={{ borderRadius: 16 }}
                required
              />
            </div>

            <button className="btn btn-njr btn-njr-primary w-100" type="submit">Donate Now ❤️</button>

            <div className="mt-3 p-3 rounded-4" style={{ background: "var(--njr-gray)", border: "1px dashed rgba(0,0,0,.18)" }}>
              <p className="small mb-0"><strong>Note:</strong> Demo shows validation + a thank-you modal. Replace it with Stripe/PayPal when ready.</p>
            </div>
          </form>

          <div className="mt-4">
            <div className="d-flex justify-content-between small mb-2">
              <span><strong>Raised:</strong> $4,000</span>
              <span><strong>Goal:</strong> $10,000</span>
            </div>
            <div className="progress" style={{ height: 16, borderRadius: 999, border: "1px solid rgba(0,0,0,.12)" }}>
              <div className="progress-bar" role="progressbar"
                style={{ width: "40%", background: "linear-gradient(90deg,#FF0000,rgba(255,0,0,.72))" }}
                aria-valuenow={40} aria-valuemin={0} aria-valuemax={100} />
            </div>
          </div>
        </div>
      </div>

      <div className="modal fade" id="thankYouModal" tabIndex={-1} aria-labelledby="thankYouLabel" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content" style={{ borderRadius: 26, border: "2px solid rgba(0,0,0,.86)" }}>
            <div className="modal-header" style={{ background: "var(--njr-gray)" }}>
              <h5 className="modal-title fw-bold" id="thankYouLabel">Thank you</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <p className="small mb-0">{modalText}</p>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-njr btn-njr-primary" data-bs-dismiss="modal">OK</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default DonateForm;