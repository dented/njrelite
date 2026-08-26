"use client";

import { useMemo, useRef, useState } from "react";
import { formatCurrency } from "@/lib/currency";
import type { SponsorPackage } from "@/lib/sponsors";
import SponsorCheckoutForm from "@/components/sponsors/SponsorCheckoutForm";

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
  const formRef = useRef<HTMLDivElement | null>(null);

  const selectedPackage = useMemo(
    () => packages.find((pkg) => pkg.id === selectedPackageId) ?? null,
    [packages, selectedPackageId]
  );

  const onSelectPackage = (pkg: SponsorPackage) => {
    setSelectedPackageId(pkg.id);

    requestAnimationFrame(() => {
      formRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    });
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
            <p className="small mb-4">Package details are prefilled from your selection. Complete payment securely with Stripe.</p>
            <SponsorCheckoutForm key={selectedPackage.id} selectedPackage={selectedPackage} />
          </div>
        </div>
      )}
    </>
  );
};

export default SponsorPackagesSection;
