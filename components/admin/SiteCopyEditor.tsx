"use client";

import { useEffect, useState } from "react";

type SiteCopyValue = { slug: string; title?: string; body?: string };

export default function SiteCopyEditor({ slug, initialValue }: { slug: string; initialValue: SiteCopyValue }) {
  const [value, setValue] = useState(initialValue);
  const [status, setStatus] = useState("");
  useEffect(() => { setValue(initialValue); setStatus(""); }, [initialValue]);
  async function save() {
    setStatus("Saving…");
    try {
      const response = await fetch(`/api/admin/site-copy/${encodeURIComponent(slug)}`, { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify(value) });
      if (!response.ok) throw new Error(await response.text());
      setStatus("Saved. This page’s copy is now up to date.");
    } catch (error) { setStatus(`Save failed: ${(error as Error).message}`); }
  }
  return <div className="card njr-card"><div className="card-body p-4">
    <div className="d-flex flex-wrap justify-content-between align-items-center gap-2 mb-3"><h2 className="h5 mb-0">Site Copy: {slug}</h2><button className="btn btn-njr btn-njr-primary" type="button" onClick={save}>Save changes</button></div>
    {status ? <div className="alert alert-secondary py-2" role="status">{status}</div> : null}
    <div className="d-grid gap-3"><div><label className="form-label fw-bold" htmlFor={`copy-title-${slug}`}>Page title</label><input id={`copy-title-${slug}`} className="form-control" value={value.title ?? ""} onChange={(e) => setValue((x) => ({ ...x, title: e.target.value }))} /></div><div><label className="form-label fw-bold" htmlFor={`copy-body-${slug}`}>Page copy</label><textarea id={`copy-body-${slug}`} className="form-control" rows={16} value={value.body ?? ""} onChange={(e) => setValue((x) => ({ ...x, body: e.target.value }))} /></div></div>
  </div></div>;
}
