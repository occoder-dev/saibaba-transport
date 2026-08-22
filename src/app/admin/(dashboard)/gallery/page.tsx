import type { Metadata } from "next";
import { listGalleryImages } from "@/lib/services/gallery";
import { GalleryTable } from "./gallery-table";

export const metadata: Metadata = { title: "Gallery", robots: { index: false, follow: false } };

export default async function AdminGalleryPage() {
  const images = await listGalleryImages();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight text-brand-charcoal">Gallery</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Upload and manage fleet, loading and warehouse photos shown on the public gallery page.
        </p>
      </div>
      <GalleryTable images={images} />
    </div>
  );
}
