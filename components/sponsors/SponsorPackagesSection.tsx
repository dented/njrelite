"use client";

import { useMemo, useRef, useState } from "react";
import { formatCurrency } from "@/lib/currency";
import type { SponsorPackage } from "@/lib/sponsors";

type SponsorPackagesSectionProps = {
  packages: SponsorPackage[];
};

const getTierVisual = (id: string) => {
  if (id === "bronze-medal") {
    return {
      accent: "#8C6239",
      bg: "linear-gradient(180deg, rgba(140,98,57,.12), rgba(140,98,57,.02))",
      chip: "Bronze",
      cardClass: "col-12 col-md-6 col-xl-3",
      titleClass: "h5",
    };
  }
  if (id === "silver-medal") {
    return {
      accent: "#8A8F98",
      bg: "linear-gradient(180deg, rgba(138,143,152,.14), rgba(138,143,152,.03))",
      chip: "Silver",
      cardClass: "col-12 col-md-6 col-xl-3",
      titleClass: "h5",
    };
  }
  if (id === "gold-medal") {
    return {
      accent: "#B58900",
      bg: "linear-gradient(180deg, rgba(181,137,0,.18), rgba(181,137,0,.03))",
      chip: "Featured",
      cardClass: "col-12 col-md-6 col-xl-3",
      titleClass: "h4",
    };
  }
  if (id === "tournament-sponsor") {
    return {
      accent: "#C62828",
      bg: "linear-gradient(180deg, rgba(198,40,40,.16), rgba(198,40,40,.03))",
      chip: "Title Sponsor",
      cardClass: "col-12 col-md-6 col-xl-3",
      titleClass: "h4",
    };
  }
  return {
    accent: "#1E4FA3",
    bg: "linear-gradient(180deg, rgba(30,79,163,.12), rgba(30,79,163,.02))",
    chip: "Custom",
    cardClass: "col-12 col-md-6",
    titleClass: "h5",
  };
};

const SponsorPackagesSection = ({ packages }: SponsorPackagesSectionProps) => {
  const [selectedPackageId, setSelectedPackageId] = useState<string | null>(null);
  const [amount, setAmount] = useState<number | "">("");
  const [contactName, setContactName] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const formRef = useRef<HTMLDivElement | null>(null);

  const selectedPackage = useMemo(
    () => packages.find((pkg) => pkg.id === selectedPackageId) ?? null,
    [packages, selectedPackageId]
  );

  const onSelectPackage = (pkg: SponsorPackage) => {
    setSelectedPackageId(pkg.id);
    setAmount(pkg.price ?? "");
    setMessage("");

    requestAnimationFrame(() => {
      formRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  };

  const validateEmail = (value: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!selectedPackage) {
      setMessage("Please select a sponsorship package first.");
      return;
    }

    const errors: string[] = [];
    const normalizedAmount = Number(amount);

    if (!normalizedAmount || Number.isNaN(normalizedAmount) || normalizedAmount < 1) {
      errors.push("Please enter a valid sponsorship amount.");
    }
    if (!contactName.trim()) errors.push("Please enter your name.");
    if (!companyName.trim()) errors.push("Please enter your company name.");
    if (!validateEmail(email.trim())) errors.push("Please enter a valid email.");
    if (!phone.trim()) errors.push("Please enter your phone number.");

    if (errors.length > 0) {
      setMessage(errors.join(" "));
      return;
    }

    setMessage(`Thanks ${contactName}! Your ${selectedPackage.name} sponsorship request for ${formatCurrency(normalizedAmount)} has been captured.`);

    setContactName("");
    setCompanyName("");
    setEmail("");
    setPhone("");
  };

  return (
    <>
      <div className="row g-4 mb-4 justify-content-center" aria-label="Sponsorship tiers">
        {packages.map((pkg) => {
          const visual = getTierVisual(pkg.id);

          return (
          <div key={pkg.id} className={visual.cardClass}>
            <article
              className="card njr-card h-100"
              style={{ borderColor: `${visual.accent}55`, background: visual.bg }}
            >
              <div className="card-body p-4 d-flex flex-column">
                <div className="d-flex align-items-center justify-content-between mb-2">
                  <span
                    className="small fw-bold px-2 py-1 rounded-pill"
                    style={{ background: `${visual.accent}22`, color: visual.accent }}
                  >
                    {visual.chip}
                  </span>
                </div>

                <h3 className={`${visual.titleClass} mb-1`}>{pkg.name}</h3>
                <p className="fw-bold mb-3" style={{ color: visual.accent }}>
                  {pkg.priceLabel ?? (pkg.price !== null ? formatCurrency(pkg.price) : "Custom")}
                </p>

                <ul className="small ps-3 mb-4 d-flex flex-column gap-2">
                  {pkg.benefits.map((benefit) => (
                    <li key={`${pkg.id}-${benefit}`}>{benefit}</li>
                  ))}
                </ul>

                <button
                  type="button"
                  className="btn btn-njr btn-njr-primary mt-auto"
                  style={{ boxShadow: `inset 0 0 0 1px ${visual.accent}44` }}
                  onClick={() => onSelectPackage(pkg)}
                >
                  Select Package
                </button>
              </div>
            </article>
          </div>
          );
        })}
      </div>

      {selectedPackage && (
        <div ref={formRef} className="p-4 p-md-5 rounded-5 border mt-4 bg-white" id="sponsorForm">
          <div className="card-body p-4 p-md-5">
            <h3 className="mb-2">Sponsor Form</h3>
            <p className="small mb-4">Package details are prefilled from your selection.</p>

            <form onSubmit={onSubmit} noValidate>
              <div className="mb-3">
                <label className="form-label fw-bold" htmlFor="selectedPackage">Selected Package</label>
                <input
                  id="selectedPackage"
                  className="form-control"
                  value={selectedPackage.name}
                  readOnly
                  style={{ borderRadius: 16 }}
                />
              </div>

              <div className="mb-3">
                <label className="form-label fw-bold" htmlFor="sponsorAmount">Amount (CAD)</label>
                <input
                  id="sponsorAmount"
                  type="number"
                  min={1}
                  step={1}
                  className="form-control"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value === "" ? "" : Number(e.target.value))}
                  style={{ borderRadius: 16 }}
                  required
                />
              </div>

              <div className="mb-3">
                <label className="form-label fw-bold" htmlFor="packageDetails">Package Details</label>
                <div
                  id="packageDetails"
                  className="rounded-4 p-3"
                  style={{ border: "1px solid rgba(0,0,0,.12)", background: "#fff" }}
                >
                  <ul className="small ps-3 mb-0 d-flex flex-column gap-2">
                    {selectedPackage.benefits.map((benefit) => (
                      <li key={`selected-${selectedPackage.id}-${benefit}`}>{benefit}</li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="row g-3">
                <div className="col-12 col-md-6">
                  <label className="form-label fw-bold" htmlFor="contactName">Name</label>
                  <input
                    id="contactName"
                    type="text"
                    className="form-control"
                    value={contactName}
                    onChange={(e) => setContactName(e.target.value)}
                    style={{ borderRadius: 16 }}
                    required
                  />
                </div>

                <div className="col-12 col-md-6">
                  <label className="form-label fw-bold" htmlFor="companyName">Company Name</label>
                  <input
                    id="companyName"
                    type="text"
                    className="form-control"
                    value={companyName}
                    onChange={(e) => setCompanyName(e.target.value)}
                    style={{ borderRadius: 16 }}
                    required
                  />
                </div>

                <div className="col-12 col-md-6">
                  <label className="form-label fw-bold" htmlFor="sponsorEmail">Email</label>
                  <input
                    id="sponsorEmail"
                    type="email"
                    className="form-control"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    style={{ borderRadius: 16 }}
                    required
                  />
                </div>

                <div className="col-12 col-md-6">
                  <label className="form-label fw-bold" htmlFor="sponsorPhone">Phone</label>
                  <input
                    id="sponsorPhone"
                    type="tel"
                    className="form-control"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    style={{ borderRadius: 16 }}
                    required
                  />
                </div>
              </div>

              <button type="submit" className="btn btn-njr btn-njr-primary w-100 mt-4">Submit Sponsorship Request</button>

              {message && (
                <div className="mt-3 p-3 rounded-4" style={{ background: "var(--njr-gray)", border: "1px dashed rgba(0,0,0,.18)" }}>
                  <p className="small mb-0">{message}</p>
                </div>
              )}
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default SponsorPackagesSection;
