"use client";

import { useState } from "react";
import type { Fundraiser } from "@/lib/fundraisers";

const blankFundraiser = (sortOrder: number): Fundraiser => ({
  id: `fundraiser-${Date.now()}`,
  title: "New fundraiser",
  date: "Date to be announced",
  location: "Location to be announced",
  description: "Add the fundraiser description here.",
  icon: "EVENT",
  accent: "#cc0000",
  image: "",
  featured: false,
  offerings: [],
  sortOrder,
});

export default function FundraiserEditor({ initialValue }: { initialValue: Fundraiser[] }) {
  const [items, setItems] = useState(initialValue);
  const [status, setStatus] = useState("");

  function update(index: number, patch: Partial<Fundraiser>) {
    setItems((current) => current.map((item, i) => i === index ? { ...item, ...patch } : item));
  }

  function markFeatured(index: number, checked: boolean) {
    setItems((current) => current.map((item, i) => ({ ...item, featured: checked && i === index })));
  }

  async function save() {
    setStatus("Saving…");
    try {
      const normalized = items.map((item, index) => ({ ...item, sortOrder: index }));
      const response = await fetch("/api/admin/fundraisers", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ fundraisers: normalized }),
      });
      if (!response.ok) throw new Error(await response.text());
      setItems(normalized);
      setStatus("Saved. The fundraising page is now up to date.");
    } catch (error) {
      setStatus(`Save failed: ${(error as Error).message}`);
    }
  }

  return (
    <div>
      <div className="d-flex flex-wrap justify-content-between align-items-center gap-2 mb-3">
        <p className="small text-muted mb-0">Events appear publicly in this order.</p>
        <div className="d-flex gap-2">
          <button className="btn btn-njr btn-outline-dark" type="button" onClick={() => setItems((current) => [...current, blankFundraiser(current.length)])}>Add fundraiser</button>
          <button className="btn btn-njr btn-njr-primary" type="button" onClick={save}>Save all changes</button>
        </div>
      </div>

      {status ? <div className="alert alert-secondary py-2" role="status">{status}</div> : null}

      <div className="d-grid gap-4">
        {items.map((item, index) => (
          <article className="card njr-card" key={item.id}>
            <div className="card-body p-4">
              <div className="d-flex justify-content-between align-items-start gap-3 mb-4">
                <div>
                  <span className="small text-muted">Event {index + 1}</span>
                  <h2 className="h4 mb-0">{item.title}</h2>
                </div>
                <button className="btn btn-sm btn-outline-danger" type="button" onClick={() => setItems((current) => current.filter((_, i) => i !== index))}>Delete</button>
              </div>

              <div className="row g-3">
                <div className="col-12 col-md-8">
                  <label className="form-label fw-bold" htmlFor={`title-${item.id}`}>Title</label>
                  <input id={`title-${item.id}`} className="form-control" value={item.title} onChange={(e) => update(index, { title: e.target.value })} />
                </div>
                <div className="col-12 col-md-4">
                  <label className="form-label fw-bold" htmlFor={`icon-${item.id}`}>Short label</label>
                  <input id={`icon-${item.id}`} className="form-control" maxLength={16} value={item.icon} onChange={(e) => update(index, { icon: e.target.value.toUpperCase() })} />
                </div>
                <div className="col-12 col-md-6">
                  <label className="form-label fw-bold" htmlFor={`date-${item.id}`}>Date</label>
                  <input id={`date-${item.id}`} className="form-control" value={item.date} onChange={(e) => update(index, { date: e.target.value })} />
                </div>
                <div className="col-12 col-md-6">
                  <label className="form-label fw-bold" htmlFor={`location-${item.id}`}>Location</label>
                  <input id={`location-${item.id}`} className="form-control" value={item.location} onChange={(e) => update(index, { location: e.target.value })} />
                </div>
                <div className="col-12">
                  <label className="form-label fw-bold" htmlFor={`description-${item.id}`}>Description</label>
                  <textarea id={`description-${item.id}`} className="form-control" rows={3} value={item.description} onChange={(e) => update(index, { description: e.target.value })} />
                </div>
                <div className="col-12 col-md-8">
                  <label className="form-label fw-bold" htmlFor={`image-${item.id}`}>Poster image URL <span className="fw-normal text-muted">(optional)</span></label>
                  <input id={`image-${item.id}`} className="form-control" type="url" value={item.image} onChange={(e) => update(index, { image: e.target.value })} placeholder="Paste the public URL from the uploader" />
                </div>
                <div className="col-12 col-md-4">
                  <label className="form-label fw-bold" htmlFor={`accent-${item.id}`}>Card colour</label>
                  <input id={`accent-${item.id}`} className="form-control form-control-color w-100" type="color" value={item.accent} onChange={(e) => update(index, { accent: e.target.value })} />
                </div>
                <div className="col-12">
                  <label className="form-label fw-bold" htmlFor={`offerings-${item.id}`}>Menu / highlights <span className="fw-normal text-muted">(one per line)</span></label>
                  <textarea id={`offerings-${item.id}`} className="form-control" rows={3} value={item.offerings.join("\n")} onChange={(e) => update(index, { offerings: e.target.value.split("\n").map((value) => value.trim()).filter(Boolean) })} />
                </div>
                <div className="col-12">
                  <div className="form-check form-switch">
                    <input className="form-check-input" type="checkbox" role="switch" id={`featured-${item.id}`} checked={item.featured} onChange={(e) => markFeatured(index, e.target.checked)} />
                    <label className="form-check-label fw-bold" htmlFor={`featured-${item.id}`}>Feature as the next event</label>
                  </div>
                </div>
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
