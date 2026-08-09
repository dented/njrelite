"use client";

import { useEffect, useMemo, useState } from "react";

type JsonEditorProps = {
  title: string;
  initialValue: unknown;
  saveLabel?: string;
  onSave?: (value: unknown) => Promise<void>;
  saveUrl?: string;
  wrapKey?: string;
};

export default function JsonEditor({ title, initialValue, saveLabel = "Save", onSave, saveUrl, wrapKey }: JsonEditorProps) {
  const initialText = useMemo(() => JSON.stringify(initialValue, null, 2), [initialValue]);
  const [text, setText] = useState(initialText);
  const [status, setStatus] = useState<string>("");

  useEffect(() => {
    setText(JSON.stringify(initialValue, null, 2));
    setStatus("");
  }, [initialValue]);

  async function handleSave() {
    setStatus("");

    let value: unknown;
    try {
      value = JSON.parse(text);
    } catch (e) {
      setStatus(`Invalid JSON: ${(e as Error).message}`);
      return;
    }

    try {
      setStatus("Saving...");

      if (onSave) {
        await onSave(value);
      } else if (saveUrl) {
        const body = wrapKey ? { [wrapKey]: value } : value;
        const res = await fetch(saveUrl, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body),
        });
        if (!res.ok) throw new Error(await res.text());
      } else {
        throw new Error("Missing save handler. Provide onSave or saveUrl.");
      }

      setStatus("Saved.");
    } catch (e) {
      setStatus(`Save failed: ${(e as Error).message}`);
    }
  }

  return (
    <div className="card njr-card">
      <div className="card-body p-4">
        <div className="d-flex flex-wrap align-items-center justify-content-between gap-2 mb-3">
          <h2 className="h5 mb-0">{title}</h2>
          <button className="btn btn-njr btn-njr-primary" type="button" onClick={handleSave}>{saveLabel}</button>
        </div>

        <textarea
          className="form-control"
          value={text}
          onChange={(e) => setText(e.target.value)}
          spellCheck={false}
          rows={22}
          style={{ borderRadius: 16 }}
        />

        {status ? <p className="small text-muted mt-2 mb-0">{status}</p> : null}
      </div>
    </div>
  );
}
