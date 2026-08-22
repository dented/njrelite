import type { Metadata } from "next";
import GalleryGrid from "@/components/gallery/GalleryGrid";
import { listGalleryItems } from "@/lib/content/gallery";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Gallery | Niagara Jr Elite",
  description: "Photos and videos from Niagara Jr Elite games, tournaments, and team events.",
};

export default async function GalleryPage() {
  const items = await listGalleryItems();

  return (
    <main id="main" className="py-5" style={{ background: "var(--njr-gray)" }}>
      <div className="container py-4">
        <div className="mb-4">
          <h1 className="mb-2">Gallery</h1>
          <p className="text-muted mb-0">Photos and videos from Niagara Jr Elite.</p>
        </div>
        <GalleryGrid items={items} />
      </div>
    </main>
  );
}
