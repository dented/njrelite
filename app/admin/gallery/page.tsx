import Link from "next/link";
import UploadWidget from "@/components/admin/UploadWidget";
import GalleryEditor from "@/components/admin/GalleryEditor";
import { listGalleryItems } from "@/lib/content/gallery";

export const dynamic = "force-dynamic";

export default async function AdminGalleryPage() {
  const items = await listGalleryItems();
  return (
    <main id="main" className="py-5" style={{ background: "var(--njr-gray)" }}>
      <div className="container py-4">
        <div className="d-flex flex-wrap justify-content-between align-items-end gap-3 mb-4">
          <div>
            <h1 className="mb-1">Admin: Gallery</h1>
            <p className="small mb-0">Upload media, then add its URL as a photo or video. Caption and poster are optional; use `tags` to create gallery filters.</p>
          </div>
          <Link className="btn btn-njr btn-njr-ghost" href="/admin">Back</Link>
        </div>
        <div className="mb-4"><UploadWidget defaultPrefix="gallery" accept="image/*,video/*" /><p className="small text-muted mt-2 mb-0">After uploading media, copy its public URL into the gallery item below.</p></div>
        <GalleryEditor initialValue={items} />
      </div>
    </main>
  );
}
