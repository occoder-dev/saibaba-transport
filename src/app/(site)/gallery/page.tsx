import type { Metadata } from "next";
import { PageHero } from "@/components/site/page-hero";
import { CtaBand } from "@/components/site/cta-band";
import { listGalleryImages } from "@/lib/services/gallery";
import { GalleryGrid } from "./gallery-grid";

export const metadata: Metadata = {
  title: "Gallery",
  description:
    "Photos of Sai Baba Transport's fleet, ongoing loads and warehouse operations from across our pan-India branch network.",
};

export default async function GalleryPage() {
  const images = await listGalleryImages({ onlyActive: true });

  return (
    <>
      <PageHero
        eyebrow="Gallery"
        title="Our fleet, loads & operations"
        description="A look at our fleet, ongoing loads and warehouse operations from across the Sai Baba Transport network."
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Gallery" }]}
      />

      <section className="py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <GalleryGrid images={images} />
        </div>
      </section>

      <CtaBand />
    </>
  );
}
