"use client";

import { useState } from "react";
import type { Sponsor, SponsorPackage } from "@/lib/sponsors";

const blankSponsor = (): Sponsor => ({ name: "New sponsor", logo: "/images/helmet-logo.png", link: "https://" });
const blankPackage = (sortOrder: number): SponsorPackage => ({ id: `package-${Date.now()}`, name: "New package", price: null, priceLabel: "Contact us", benefits: [], sortOrder });

export default function SponsorsEditor({ initialSponsors, initialPackages }: { initialSponsors: Sponsor[]; initialPackages: SponsorPackage[] }) {
  const [sponsors, setSponsors] = useState(initialSponsors);
  const [packages, setPackages] = useState(initialPackages);
  const [status, setStatus] = useState("");
  const updateSponsor = (index: number, patch: Partial<Sponsor>) => setSponsors((x) => x.map((item, i) => i === index ? { ...item, ...patch } : item));
  const updatePackage = (index: number, patch: Partial<SponsorPackage>) => setPackages((x) => x.map((item, i) => i === index ? { ...item, ...patch } : item));

  async function save() {
    setStatus("Saving…");
    try {
      const normalizedPackages = packages.map((item, sortOrder) => ({ ...item, sortOrder, priceLabel: item.priceLabel || undefined }));
      const [sponsorResponse, packageResponse] = await Promise.all([
        fetch("/api/admin/sponsors", { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ sponsors }) }),
        fetch("/api/admin/sponsor-packages", { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ packages: normalizedPackages }) }),
      ]);
      if (!sponsorResponse.ok) throw new Error(await sponsorResponse.text());
      if (!packageResponse.ok) throw new Error(await packageResponse.text());
      setPackages(normalizedPackages); setStatus("Saved. Sponsors and packages are now up to date.");
    } catch (error) { setStatus(`Save failed: ${(error as Error).message}`); }
  }

  return <div>
    <div className="d-flex justify-content-end mb-3"><button className="btn btn-njr btn-njr-primary" type="button" onClick={save}>Save all changes</button></div>
    {status ? <div className="alert alert-secondary py-2" role="status">{status}</div> : null}
    <section className="mb-5"><div className="d-flex flex-wrap justify-content-between align-items-center gap-2 mb-3"><div><h2 className="h4 mb-1">Sponsors</h2><p className="small text-muted mb-0">Sponsor logos are shown alphabetically by name.</p></div><button className="btn btn-njr btn-outline-dark" type="button" onClick={() => setSponsors((x) => [...x, blankSponsor()])}>Add sponsor</button></div>
      <div className="d-grid gap-3">{sponsors.map((item, index) => <article className="card njr-card" key={`${item.name}-${index}`}><div className="card-body p-4"><div className="d-flex justify-content-between gap-3 mb-3"><h3 className="h5 mb-0">{item.name}</h3><button className="btn btn-sm btn-outline-danger" type="button" onClick={() => setSponsors((x) => x.filter((_, i) => i !== index))}>Delete</button></div><div className="row g-3">
        <div className="col-md-5"><label className="form-label fw-bold" htmlFor={`sponsor-name-${index}`}>Name</label><input id={`sponsor-name-${index}`} className="form-control" value={item.name} onChange={(e) => updateSponsor(index, { name: e.target.value })} /></div>
        <div className="col-md-7"><label className="form-label fw-bold" htmlFor={`sponsor-link-${index}`}>Website URL</label><input id={`sponsor-link-${index}`} type="url" className="form-control" value={item.link} onChange={(e) => updateSponsor(index, { link: e.target.value })} /></div>
        <div className="col-12"><label className="form-label fw-bold" htmlFor={`sponsor-logo-${index}`}>Logo URL</label><input id={`sponsor-logo-${index}`} className="form-control" value={item.logo} onChange={(e) => updateSponsor(index, { logo: e.target.value })} placeholder="Paste the public URL from the uploader" /></div>
      </div></div></article>)}</div>
    </section>
    <section><div className="d-flex flex-wrap justify-content-between align-items-center gap-2 mb-3"><div><h2 className="h4 mb-1">Sponsorship packages</h2><p className="small text-muted mb-0">Packages appear publicly in this order.</p></div><button className="btn btn-njr btn-outline-dark" type="button" onClick={() => setPackages((x) => [...x, blankPackage(x.length)])}>Add package</button></div>
      <div className="d-grid gap-3">{packages.map((item, index) => <article className="card njr-card" key={item.id}><div className="card-body p-4"><div className="d-flex justify-content-between gap-3 mb-3"><div><span className="small text-muted">Package {index + 1}</span><h3 className="h5 mb-0">{item.name}</h3></div><button className="btn btn-sm btn-outline-danger" type="button" onClick={() => setPackages((x) => x.filter((_, i) => i !== index))}>Delete</button></div><div className="row g-3">
        <div className="col-md-6"><label className="form-label fw-bold" htmlFor={`package-name-${item.id}`}>Name</label><input id={`package-name-${item.id}`} className="form-control" value={item.name} onChange={(e) => updatePackage(index, { name: e.target.value })} /></div>
        <div className="col-md-3"><label className="form-label fw-bold" htmlFor={`package-price-${item.id}`}>Price <span className="fw-normal text-muted">(optional)</span></label><input id={`package-price-${item.id}`} type="number" min="0" step="0.01" className="form-control" value={item.price ?? ""} onChange={(e) => updatePackage(index, { price: e.target.value === "" ? null : Number(e.target.value) })} /></div>
        <div className="col-md-3"><label className="form-label fw-bold" htmlFor={`package-label-${item.id}`}>Price label <span className="fw-normal text-muted">(optional)</span></label><input id={`package-label-${item.id}`} className="form-control" value={item.priceLabel ?? ""} onChange={(e) => updatePackage(index, { priceLabel: e.target.value })} /></div>
        <div className="col-12"><label className="form-label fw-bold" htmlFor={`package-benefits-${item.id}`}>Benefits <span className="fw-normal text-muted">(one per line)</span></label><textarea id={`package-benefits-${item.id}`} className="form-control" rows={4} value={item.benefits.join("\n")} onChange={(e) => updatePackage(index, { benefits: e.target.value.split("\n").map((x) => x.trim()).filter(Boolean) })} /></div>
      </div></div></article>)}</div>
    </section>
  </div>;
}
