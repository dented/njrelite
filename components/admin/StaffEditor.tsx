"use client";

import { useState } from "react";
import type { StaffMember } from "@/lib/staff";

const blankMember = (sortOrder: number): StaffMember => ({
  id: `staff-${Date.now()}`, name: "New staff member", type: "Coaches", role: "Role", bio: "Add a short biography.", photo: "/images/helmet-logo.png", sortOrder,
});

export default function StaffEditor({ initialValue }: { initialValue: StaffMember[] }) {
  const [items, setItems] = useState(initialValue);
  const [status, setStatus] = useState("");
  const update = (index: number, patch: Partial<StaffMember>) => setItems((current) => current.map((item, i) => i === index ? { ...item, ...patch } : item));

  async function save() {
    setStatus("Saving…");
    try {
      const normalized = items.map((item, sortOrder) => ({ ...item, sortOrder }));
      const response = await fetch("/api/admin/staff", { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ staff: normalized }) });
      if (!response.ok) throw new Error(await response.text());
      setItems(normalized); setStatus("Saved. The staff page is now up to date.");
    } catch (error) { setStatus(`Save failed: ${(error as Error).message}`); }
  }

  return <div>
    <div className="d-flex flex-wrap justify-content-between align-items-center gap-2 mb-3">
      <p className="small text-muted mb-0">Staff members appear publicly in this order.</p>
      <div className="d-flex gap-2"><button className="btn btn-njr btn-outline-dark" type="button" onClick={() => setItems((x) => [...x, blankMember(x.length)])}>Add staff member</button><button className="btn btn-njr btn-njr-primary" type="button" onClick={save}>Save all changes</button></div>
    </div>
    {status ? <div className="alert alert-secondary py-2" role="status">{status}</div> : null}
    <div className="d-grid gap-4">{items.map((item, index) => <article className="card njr-card" key={item.id}><div className="card-body p-4">
      <div className="d-flex justify-content-between align-items-start gap-3 mb-3"><div><span className="small text-muted">Staff member {index + 1}</span><h2 className="h5 mb-0">{item.name}</h2></div><button className="btn btn-sm btn-outline-danger" type="button" onClick={() => setItems((x) => x.filter((_, i) => i !== index))}>Delete</button></div>
      <div className="row g-3">
        <div className="col-md-8"><label className="form-label fw-bold" htmlFor={`staff-name-${item.id}`}>Name</label><input id={`staff-name-${item.id}`} className="form-control" value={item.name} onChange={(e) => update(index, { name: e.target.value })} /></div>
        <div className="col-md-4"><label className="form-label fw-bold" htmlFor={`staff-type-${item.id}`}>Group</label><select id={`staff-type-${item.id}`} className="form-select" value={item.type} onChange={(e) => update(index, { type: e.target.value as StaffMember["type"] })}><option>Coaches</option><option>Support</option></select></div>
        <div className="col-12"><label className="form-label fw-bold" htmlFor={`staff-role-${item.id}`}>Role</label><input id={`staff-role-${item.id}`} className="form-control" value={item.role} onChange={(e) => update(index, { role: e.target.value })} /></div>
        <div className="col-12"><label className="form-label fw-bold" htmlFor={`staff-bio-${item.id}`}>Biography</label><textarea id={`staff-bio-${item.id}`} className="form-control" rows={4} value={item.bio} onChange={(e) => update(index, { bio: e.target.value })} /></div>
        <div className="col-12"><label className="form-label fw-bold" htmlFor={`staff-photo-${item.id}`}>Photo URL</label><input id={`staff-photo-${item.id}`} className="form-control" value={item.photo} onChange={(e) => update(index, { photo: e.target.value })} placeholder="Paste the public URL from the uploader" /></div>
      </div>
    </div></article>)}</div>
  </div>;
}
