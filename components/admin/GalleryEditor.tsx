"use client";

import { useState } from "react";
import type { GalleryItem } from "@/lib/gallery";

const blankItem = (sortOrder: number): GalleryItem => ({ id: `gallery-${Date.now()}`, type: "photo", src: "", alt: "Gallery image", caption: "", poster: "", tags: [], sortOrder });

export default function GalleryEditor({ initialValue }: { initialValue: GalleryItem[] }) {
  const [items, setItems] = useState(initialValue);
  const [status, setStatus] = useState("");
  const update = (index: number, patch: Partial<GalleryItem>) => setItems((x) => x.map((item, i) => i === index ? { ...item, ...patch } : item));
  async function save() {
    setStatus("Saving…");
    try {
      const normalized = items.map((item, sortOrder) => ({ ...item, sortOrder, caption: item.caption || undefined, poster: item.poster || undefined }));
      const response = await fetch("/api/admin/gallery", { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ gallery: normalized }) });
      if (!response.ok) throw new Error(await response.text());
      setItems(normalized); setStatus("Saved. The gallery is now up to date.");
    } catch (error) { setStatus(`Save failed: ${(error as Error).message}`); }
  }
  return <div>
    <div className="d-flex flex-wrap justify-content-between align-items-center gap-2 mb-3"><p className="small text-muted mb-0">Gallery items appear in this order within their media type.</p><div className="d-flex gap-2"><button className="btn btn-njr btn-outline-dark" type="button" onClick={() => setItems((x) => [...x, blankItem(x.length)])}>Add gallery item</button><button className="btn btn-njr btn-njr-primary" type="button" onClick={save}>Save all changes</button></div></div>
    {status ? <div className="alert alert-secondary py-2" role="status">{status}</div> : null}
    <div className="d-grid gap-4">{items.map((item, index) => <article className="card njr-card" key={item.id}><div className="card-body p-4">
      <div className="d-flex justify-content-between align-items-start gap-3 mb-3"><div><span className="small text-muted">Gallery item {index + 1}</span><h2 className="h5 mb-0">{item.caption || item.alt}</h2></div><button className="btn btn-sm btn-outline-danger" type="button" onClick={() => setItems((x) => x.filter((_, i) => i !== index))}>Delete</button></div>
      <div className="row g-3">
        <div className="col-md-4"><label className="form-label fw-bold" htmlFor={`gallery-type-${item.id}`}>Media type</label><select id={`gallery-type-${item.id}`} className="form-select" value={item.type} onChange={(e) => update(index, { type: e.target.value as GalleryItem["type"] })}><option value="photo">Photo</option><option value="video">Video</option></select></div>
        <div className="col-md-8"><label className="form-label fw-bold" htmlFor={`gallery-src-${item.id}`}>Media URL</label><input id={`gallery-src-${item.id}`} className="form-control" value={item.src} onChange={(e) => update(index, { src: e.target.value })} placeholder="Paste the public URL from the uploader" /></div>
        <div className="col-md-6"><label className="form-label fw-bold" htmlFor={`gallery-alt-${item.id}`}>Alternative text</label><input id={`gallery-alt-${item.id}`} className="form-control" value={item.alt} onChange={(e) => update(index, { alt: e.target.value })} /></div>
        <div className="col-md-6"><label className="form-label fw-bold" htmlFor={`gallery-caption-${item.id}`}>Caption <span className="fw-normal text-muted">(optional)</span></label><input id={`gallery-caption-${item.id}`} className="form-control" value={item.caption ?? ""} onChange={(e) => update(index, { caption: e.target.value })} /></div>
        {item.type === "video" ? <div className="col-12"><label className="form-label fw-bold" htmlFor={`gallery-poster-${item.id}`}>Video poster URL <span className="fw-normal text-muted">(optional)</span></label><input id={`gallery-poster-${item.id}`} className="form-control" value={item.poster ?? ""} onChange={(e) => update(index, { poster: e.target.value })} /></div> : null}
        <div className="col-12"><label className="form-label fw-bold" htmlFor={`gallery-tags-${item.id}`}>Filter tags <span className="fw-normal text-muted">(comma separated)</span></label><input id={`gallery-tags-${item.id}`} className="form-control" value={item.tags.join(", ")} onChange={(e) => update(index, { tags: e.target.value.split(",").map((x) => x.trim()).filter(Boolean) })} /></div>
      </div>
    </div></article>)}</div>
  </div>;
}
