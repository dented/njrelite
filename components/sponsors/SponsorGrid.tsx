"use client";

import type { Sponsor } from "@/lib/sponsors";
import Link from "next/link";

const SponsorGrid = ({ sponsors }: { sponsors: Sponsor[] }) => {

  return (
    <div className="row g-4" aria-label="Sponsors grid">
      {sponsors.map((sponsor: Sponsor) => (
        <div key={sponsor.name} className="col-6 col-md-4 col-lg-3">
          <Link href={`${sponsor.link}?utm_source=niagara_jr_elite&utm_medium=referral`} target="_blank" rel="noopener noreferrer" className="d-flex p-3 rounded-5">
            <img src={sponsor.logo} alt={`${sponsor.name} logo`} className="img-fluid mx-auto" />
          </Link>
        </div>
      ))}
    </div>
  );
}

export default SponsorGrid;