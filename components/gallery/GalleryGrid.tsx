"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import type { GalleryItem } from "@/lib/gallery";

export default function GalleryGrid({ items }: { items: GalleryItem[] }) {
  const [selected, setSelected] = useState<GalleryItem | null>(null);
  const [activeTag, setActiveTag] = useState<string | null>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  const tags = useMemo(
    () => Array.from(new Set(items.flatMap((item) => item.tags ?? []))).sort((a, b) => a.localeCompare(b)),
    [items]
  );
  const visibleItems = activeTag
    ? items.filter((item) => (item.tags ?? []).includes(activeTag))
    : items;

  useEffect(() => {
    if (!selected) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeButtonRef.current?.focus();
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setSelected(null);
    };
    window.addEventListener("keydown", closeOnEscape);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", closeOnEscape);
      videoRef.current?.pause();
    };
  }, [selected]);

  if (!items.length) {
    return <p className="text-center text-muted py-5">Gallery items are coming soon.</p>;
  }

  return (
    <>
      {tags.length ? (
        <div className="gallery-filters d-flex flex-wrap gap-2 mb-4" aria-label="Filter gallery by tag">
          <button className={`btn btn-njr ${activeTag === null ? "btn-njr-primary" : "btn-light"}`} type="button" onClick={() => setActiveTag(null)} aria-pressed={activeTag === null}>
            All <span className="badge text-bg-dark ms-1">{items.length}</span>
          </button>
          {tags.map((tag) => {
            const isActive = activeTag === tag;
            const count = items.filter((item) => (item.tags ?? []).includes(tag)).length;
            return (
              <button className={`btn btn-njr ${isActive ? "btn-njr-primary" : "btn-light"}`} type="button" onClick={() => setActiveTag(tag)} aria-pressed={isActive} key={tag}>
                {tag} <span className="badge text-bg-dark ms-1">{count}</span>
              </button>
            );
          })}
        </div>
      ) : null}

      <div className="row g-4">
        {visibleItems.map((item) => (
          <div className="col-12 col-sm-6 col-lg-4" key={item.id}>
            <button
              className="gallery-card card njr-card h-100 w-100 p-0 text-start"
              type="button"
              onClick={() => setSelected(item)}
              aria-label={`Open ${item.type}: ${item.alt}`}
            >
              <span className="gallery-card-media">
                {item.type === "video" && item.poster ? (
                  <img src={item.poster} alt="" loading="lazy" />
                ) : item.type === "video" ? (
                  <video src={item.src} muted preload="metadata" aria-label={item.alt} />
                ) : (
                  <img src={item.src} alt={item.alt} loading="lazy" />
                )}
                {item.type === "video" ? <span className="gallery-play" aria-hidden="true">▶</span> : null}
              </span>
              {item.caption || item.tags?.length ? (
                <span className="card-body">
                  {item.caption ? <span className="d-block fw-bold mb-2">{item.caption}</span> : null}
                  {item.tags?.length ? <span className="d-flex flex-wrap gap-1">{item.tags.map((tag) => <span className="badge rounded-pill text-bg-light border" key={tag}>{tag}</span>)}</span> : null}
                </span>
              ) : null}
            </button>
          </div>
        ))}
      </div>

      {selected ? (
        <div
          className="gallery-modal"
          role="dialog"
          aria-modal="true"
          aria-label={selected.alt}
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) setSelected(null);
          }}
        >
          <div className="gallery-modal-dialog">
            <button ref={closeButtonRef} className="gallery-modal-close" type="button" onClick={() => setSelected(null)} aria-label="Close gallery item">×</button>
            {selected.type === "video" ? (
              <video ref={videoRef} src={selected.src} poster={selected.poster} controls autoPlay playsInline aria-label={selected.alt} />
            ) : (
              <img src={selected.src} alt={selected.alt} />
            )}
            {selected.caption ? <p className="gallery-modal-caption mb-0">{selected.caption}</p> : null}
          </div>
        </div>
      ) : null}
    </>
  );
}
