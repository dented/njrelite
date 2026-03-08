"use client";

import { useEffect, useMemo, useState } from "react";
import { players } from "@/lib/players";
import { formatCurrency } from "@/lib/currency";

type DonateFormProps = {
  playerId?: string;
  raisedAmount?: number;
  goalAmount?: number;
};

const sponsorTypes = ["Team", "Player"] as const;
type SponsorType = (typeof sponsorTypes)[number];

const DonateForm = ({
  playerId,
  raisedAmount = 4000,
  goalAmount = 10000,
}: DonateFormProps) => {
  const playerOptions = useMemo(
    () => players.map((p) => ({ id: p.id, label: `${p.name} (${p.position})` })),
    []
  );

  const [playerIdFromQuery, setPlayerIdFromQuery] = useState<string>();

  useEffect(() => {
    const queryValue = new URLSearchParams(window.location.search).get("player") ?? undefined;
    setPlayerIdFromQuery(queryValue);
  }, []);

  const effectivePlayerId = playerId ?? playerIdFromQuery;

  const initialPlayerId = useMemo(() => {
    if (!effectivePlayerId) return "";
    const match = players.find((p) => p.id.toLowerCase() === effectivePlayerId.toLowerCase());
    return match ? match.id : "";
  }, [effectivePlayerId]);

  const progressPercent = goalAmount > 0
    ? Math.max(0, Math.min(100, (raisedAmount / goalAmount) * 100))
    : 0;

  const [amount, setAmount] = useState<number | "">("");
  const [sponsorshipType, setSponsorshipType] = useState<SponsorType>(initialPlayerId ? "Player" : "Team");
  const [selectedPlayerId, setSelectedPlayerId] = useState<string>(initialPlayerId);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [modalText, setModalText] = useState("");

  const selectedPlayer = useMemo(
    () => playerOptions.find((p) => p.id === selectedPlayerId),
    [playerOptions, selectedPlayerId]
  );

  useEffect(() => {
    if (initialPlayerId) {
      setSponsorshipType("Player");
      setSelectedPlayerId(initialPlayerId);
    }
  }, [initialPlayerId]);

  function validateEmail(v: string) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
  }

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    const amt = Number(amount);
    const errs: string[] = [];

    if (!amt || Number.isNaN(amt) || amt < 1) errs.push("Please enter a donation amount of at least $1.");
    if (!Number.isInteger(amt)) errs.push("Please enter a whole dollar amount (no decimals).");
    if (sponsorshipType === "Player" && !selectedPlayerId) errs.push("Please choose a player to sponsor.");
    if (!name.trim()) errs.push("Please enter your name.");
    if (!validateEmail(email.trim())) errs.push("Please enter a valid email address.");

    const sponsorTarget = sponsorshipType === "Team"
      ? "Team Fund"
      : (selectedPlayer?.label ?? "Player");

    const text = errs.length
      ? errs.join(" ")
      : `Thank you, ${name}! Your donation of $${amt.toFixed(2)} to "${sponsorTarget}" is ready to be processed. (Stripe/PayPal integration placeholder)`;

    setModalText(text);

    if (!errs.length) {
      setAmount("");
      setSponsorshipType(initialPlayerId ? "Player" : "Team");
      setSelectedPlayerId(initialPlayerId);
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
              <label className="form-label fw-bold" htmlFor="sponsorshipType">Donation Target</label>
              <select
                id="sponsorshipType"
                className="form-select"
                value={sponsorshipType}
                onChange={(e) => setSponsorshipType(e.target.value as SponsorType)}
                style={{ borderRadius: 16 }}
              >
                {sponsorTypes.map((option) => (
                  <option key={option} value={option}>{option}</option>
                ))}
              </select>
            </div>

            {sponsorshipType === "Player" && (
              <div className="mb-3">
                <label className="form-label fw-bold" htmlFor="playerSponsor">Select Player</label>
                <select
                  id="playerSponsor"
                  className="form-select"
                  value={selectedPlayerId}
                  onChange={(e) => setSelectedPlayerId(e.target.value)}
                  style={{ borderRadius: 16 }}
                >
                  <option value="">Choose a player</option>
                  {playerOptions.map((option) => (
                    <option key={option.id} value={option.id}>{option.label}</option>
                  ))}
                </select>
              </div>
            )}

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
                onChange={(e) => {
                  const nextValue = e.target.value;
                  if (nextValue === "") {
                    setAmount("");
                    return;
                  }
                  // Keep donation amounts in whole dollars.
                  setAmount(Math.trunc(Number(nextValue)));
                }}
                style={{ borderRadius: 16 }}
                required
              />
              <div className="form-text">Minimum $1 (whole dollars only)</div>
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
              <span><strong>Raised:</strong> {formatCurrency(raisedAmount)}</span>
              <span><strong>Goal:</strong> {formatCurrency(goalAmount)}</span>
            </div>
            <div className="progress" style={{ height: 16, borderRadius: 999, border: "1px solid rgba(0,0,0,.12)" }}>
              <div className="progress-bar" role="progressbar"
                style={{ width: `${progressPercent}%`, background: "linear-gradient(90deg,#FF0000,rgba(255,0,0,.72))" }}
                aria-valuenow={Math.round(progressPercent)} aria-valuemin={0} aria-valuemax={100} />
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