"use client";

import { useState } from "react";

type Prefix = "players" | "sponsors" | "gallery" | "tournaments" | "fundraisers" | "site";

type UploadWidgetProps = {
  defaultPrefix?: Prefix;
  accept?: string;
  onUploaded?: (result: { key: string; publicUrl: string }) => void;
};

export default function UploadWidget({ defaultPrefix = "gallery", accept = "image/*", onUploaded }: UploadWidgetProps) {
  const [prefix, setPrefix] = useState<Prefix>(defaultPrefix);
  const [status, setStatus] = useState<string>("");
  const [result, setResult] = useState<{ key: string; publicUrl: string } | null>(null);

  async function onPickFile(file: File | null) {
    setResult(null);
    if (!file) return;

    setStatus("Requesting upload URL...");
    const presignRes = await fetch("/api/admin/uploads/presign", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        prefix,
        fileName: file.name,
        contentType: file.type,
      }),
    });

    if (!presignRes.ok) {
      const text = await presignRes.text();
      setStatus(`Presign failed: ${text}`);
      return;
    }

    const presign = await presignRes.json();
    if (!presign.ok) {
      setStatus(presign.error ?? "Presign failed");
      return;
    }

    setStatus("Uploading to S3...");
    const putRes = await fetch(presign.uploadUrl, {
      method: "PUT",
      headers: {
        "Content-Type": file.type,
      },
      body: file,
    });

    if (!putRes.ok) {
      const text = await putRes.text();
      setStatus(`Upload failed: ${putRes.status} ${text}`);
      return;
    }

    const next = { key: presign.key as string, publicUrl: presign.publicUrl as string };
    setResult(next);
    setStatus("Upload complete.");
    onUploaded?.(next);
  }

  return (
    <div className="card njr-card">
      <div className="card-body p-4">
        <h2 className="h5 mb-3">Upload Media (S3)</h2>
        <div className="row g-3 align-items-end">
          <div className="col-12 col-md-4">
            <label className="form-label fw-bold" htmlFor="uploadPrefix">Folder</label>
            <select
              id="uploadPrefix"
              className="form-select"
              value={prefix}
              onChange={(e) => setPrefix(e.target.value as Prefix)}
              style={{ borderRadius: 16 }}
            >
              <option value="players">players</option>
              <option value="sponsors">sponsors</option>
              <option value="gallery">gallery</option>
              <option value="tournaments">tournaments</option>
              <option value="fundraisers">fundraisers</option>
              <option value="site">site</option>
            </select>
          </div>

          <div className="col-12 col-md-8">
            <label className="form-label fw-bold" htmlFor="uploadFile">File</label>
            <input
              id="uploadFile"
              className="form-control"
              type="file"
              accept={accept}
              onChange={(e) => onPickFile(e.target.files?.[0] ?? null)}
              style={{ borderRadius: 16 }}
            />
          </div>
        </div>

        {status ? <p className="small text-muted mt-3 mb-0">{status}</p> : null}

        {result ? (
          <div className="mt-3 p-3 rounded-4" style={{ background: "var(--njr-gray)", border: "1px dashed rgba(0,0,0,.18)" }}>
            <div className="small"><strong>S3 key:</strong> {result.key}</div>
            <div className="small"><strong>Public URL:</strong> <a href={result.publicUrl} target="_blank" rel="noreferrer">{result.publicUrl}</a></div>
          </div>
        ) : null}
      </div>
    </div>
  );
}
