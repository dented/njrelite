"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import UploadWidget from "@/components/admin/UploadWidget";
import JsonEditor from "@/components/admin/JsonEditor";

export const dynamic = "force-dynamic";

const slugs = [
  "home",
  "about",
  "legacy",
  "previous-teams",
  "team",
  "sponsors",
  "donate",
] as const;

type Slug = (typeof slugs)[number];

type SiteCopyValue = {
  slug: string;
  title?: string;
  body?: string;
};

export default function AdminSiteCopyPage() {
  const [slug, setSlug] = useState<Slug>("home");
  const [value, setValue] = useState<SiteCopyValue>({ slug: "home", title: "", body: "" });

  useEffect(() => {
    let cancelled = false;
    (async () => {
      const res = await fetch(`/api/site-copy/${encodeURIComponent(slug)}`);
      if (cancelled) return;
      if (!res.ok) {
        setValue({ slug, title: "", body: "" });
        return;
      }
      const json = await res.json();
      setValue(json);
    })();
    return () => {
      cancelled = true;
    };
  }, [slug]);

  return (
    <main id="main" className="py-5" style={{ background: "var(--njr-gray)" }}>
      <div className="container py-4">
        <div className="d-flex flex-wrap justify-content-between align-items-end gap-3 mb-4">
          <div>
            <h1 className="mb-1">Admin: Site Copy</h1>
            <p className="small mb-0">Edit page copy in MongoDB. (Markdown/plain text — render rules are up to the page.)</p>
          </div>
          <Link className="btn btn-njr btn-njr-ghost" href="/admin">Back</Link>
        </div>

        <div className="card njr-card mb-4">
          <div className="card-body p-4">
            <label className="form-label fw-bold" htmlFor="slug">Page</label>
            <select
              id="slug"
              className="form-select"
              value={slug}
              onChange={(e) => setSlug(e.target.value as Slug)}
              style={{ borderRadius: 16, maxWidth: 320 }}
            >
              {slugs.map((s) => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="row g-4">
          <div className="col-12 col-lg-5">
            <UploadWidget defaultPrefix="site" />
          </div>
          <div className="col-12 col-lg-7">
            <JsonEditor
              title={`Site Copy: ${slug}`}
              initialValue={value}
              onSave={async (next) => {
                const res = await fetch(`/api/admin/site-copy/${encodeURIComponent(slug)}`, {
                  method: "PUT",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify(next),
                });
                if (!res.ok) throw new Error(await res.text());
              }}
            />
          </div>
        </div>
      </div>
    </main>
  );
}
