"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import { motion, type Variants } from "framer-motion";
import {
  ChevronLeft,
  ChevronRight,
  Download,
  Expand,
  ExternalLink,
  Search,
  X,
} from "lucide-react";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import type { GalleryImage } from "@/db/schema";

const gridVariants: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.05 } },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] } },
};

export function GalleryGrid({ images }: { images: GalleryImage[] }) {
  const categories = useMemo(
    () => ["All", ...Array.from(new Set(images.map((img) => img.category)))],
    [images]
  );
  const [active, setActive] = useState("All");
  const [query, setQuery] = useState("");
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return images.filter((img) => {
      const matchesCategory = active === "All" || img.category === active;
      const matchesQuery =
        !q || img.caption.toLowerCase().includes(q) || img.category.toLowerCase().includes(q);
      return matchesCategory && matchesQuery;
    });
  }, [images, active, query]);

  // Guard against a filter change making the list shorter than the open
  // index (rather than resetting state in an effect) - the lightbox just
  // closes on its own since lightboxImage becomes null.
  const lightboxImage =
    lightboxIndex !== null && lightboxIndex < filtered.length ? filtered[lightboxIndex] : null;

  function showPrev() {
    setLightboxIndex((i) => (i === null || filtered.length === 0 ? null : (i - 1 + filtered.length) % filtered.length));
  }
  function showNext() {
    setLightboxIndex((i) => (i === null || filtered.length === 0 ? null : (i + 1) % filtered.length));
  }

  useEffect(() => {
    if (lightboxIndex === null) return;
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "ArrowLeft") showPrev();
      if (e.key === "ArrowRight") showNext();
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lightboxIndex]);

  if (images.length === 0) {
    return (
      <div className="rounded-2xl border border-dashed border-border bg-secondary/30 py-20 text-center text-muted-foreground">
        No gallery photos have been added yet - check back soon.
      </div>
    );
  }

  return (
    <div>
      {/* Category filter + search */}
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        {categories.length > 2 ? (
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <Button
                key={cat}
                type="button"
                size="sm"
                variant={active === cat ? "default" : "outline"}
                onClick={() => setActive(cat)}
                className="rounded-full"
              >
                {cat}
              </Button>
            ))}
          </div>
        ) : (
          <div />
        )}

        <div className="relative w-full sm:w-72">
          <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search photos..."
            aria-label="Search gallery photos"
            className="pl-9 pr-8"
          />
          {query && (
            <button
              type="button"
              onClick={() => setQuery("")}
              aria-label="Clear search"
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
            >
              <X className="size-4" />
            </button>
          )}
        </div>
      </div>

      <p className="mb-6 text-xs text-muted-foreground">
        Showing {filtered.length} of {images.length} photo{images.length === 1 ? "" : "s"}
      </p>

      {/* Keying on the active filter + search remounts the grid on every
          change, so the reveal animation (and the grid itself) reliably
          replays every time - including switching back to "All" after
          another tab, which a scroll-triggered reveal would otherwise skip. */}
      {filtered.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-border bg-secondary/30 py-20 text-center text-muted-foreground">
          No photos match your search.
        </div>
      ) : (
        <motion.div
          key={`${active}__${query}`}
          variants={gridVariants}
          initial="hidden"
          animate="show"
          className="grid auto-rows-[140px] grid-cols-2 gap-4 sm:auto-rows-[170px] sm:grid-cols-3 lg:grid-cols-4"
        >
          {filtered.map((image, i) => {
            // A recurring larger tile every few photos gives the grid a
            // curated, magazine-style rhythm instead of a flat uniform grid.
            const feature = i % 7 === 0;
            return (
              <motion.div key={image.id} variants={itemVariants} className={feature ? "col-span-2 row-span-2" : ""}>
                <motion.button
                  type="button"
                  onClick={() => setLightboxIndex(i)}
                  whileHover={{ y: -4 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  className="group relative block h-full w-full overflow-hidden rounded-2xl border border-border bg-muted shadow-sm"
                >
                  <Image
                    src={image.url}
                    alt={image.caption || "Sai Baba Transport gallery photo"}
                    fill
                    sizes={
                      feature
                        ? "(min-width: 1024px) 50vw, 66vw"
                        : "(min-width: 1024px) 25vw, (min-width: 640px) 33vw, 50vw"
                    }
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  {image.category && (
                    <span className="absolute left-2.5 top-2.5 rounded-full bg-black/60 px-2.5 py-1 text-[10px] font-medium uppercase tracking-wide text-white backdrop-blur-sm">
                      {image.category}
                    </span>
                  )}
                  <div className="absolute inset-0 flex items-end justify-between gap-2 bg-gradient-to-t from-black/70 via-black/0 to-black/0 p-3 opacity-0 transition-opacity group-hover:opacity-100">
                    <span className="flex items-center gap-1.5 text-xs font-medium text-white">
                      <Expand className="size-3.5" /> View
                    </span>
                    {image.caption && (
                      <span className="max-w-[60%] truncate text-xs text-white/80">{image.caption}</span>
                    )}
                  </div>
                </motion.button>
              </motion.div>
            );
          })}
        </motion.div>
      )}

      {/* Full-screen lightbox: large centered photo, close/open-original/
          download controls up top, prev/next arrows on the sides, and a
          bottom filmstrip of every photo in the current filtered set so you
          can jump straight to any of them. */}
      <Dialog open={lightboxImage !== null} onOpenChange={(open) => !open && setLightboxIndex(null)}>
        <DialogContent
          showCloseButton={false}
          className="inset-0 top-0 left-0 h-dvh w-screen max-w-none translate-x-0 translate-y-0 gap-0 rounded-none border-none bg-black/97 p-0 shadow-none sm:max-w-none"
        >
          <DialogTitle className="sr-only">{lightboxImage?.caption || "Gallery photo"}</DialogTitle>
          {lightboxImage && (
            <div className="flex h-full w-full flex-col">
              {/* Top bar */}
              <div className="flex shrink-0 items-center justify-between gap-3 p-4 sm:p-6">
                <button
                  type="button"
                  onClick={() => setLightboxIndex(null)}
                  aria-label="Close"
                  className="flex size-10 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20"
                >
                  <X className="size-5" />
                </button>
                <div className="flex items-center gap-2">
                  <a
                    href={lightboxImage.url}
                    target="_blank"
                    rel="noreferrer"
                    aria-label="Open original photo"
                    className="flex size-10 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20"
                  >
                    <ExternalLink className="size-4.5" />
                  </a>
                  <a
                    href={lightboxImage.url}
                    download
                    aria-label="Download photo"
                    className="flex size-10 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20"
                  >
                    <Download className="size-4.5" />
                  </a>
                </div>
              </div>

              {/* Photo */}
              <div className="relative min-h-0 flex-1 px-3 sm:px-16">
                <Image
                  src={lightboxImage.url}
                  alt={lightboxImage.caption || "Sai Baba Transport gallery photo"}
                  fill
                  sizes="100vw"
                  className="object-contain"
                  priority
                />

                {filtered.length > 1 && (
                  <>
                    <button
                      type="button"
                      onClick={showPrev}
                      aria-label="Previous photo"
                      className="absolute left-1 top-1/2 flex size-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20 sm:left-4 sm:size-11"
                    >
                      <ChevronLeft className="size-5 sm:size-6" />
                    </button>
                    <button
                      type="button"
                      onClick={showNext}
                      aria-label="Next photo"
                      className="absolute right-1 top-1/2 flex size-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20 sm:right-4 sm:size-11"
                    >
                      <ChevronRight className="size-5 sm:size-6" />
                    </button>
                  </>
                )}
              </div>

              {/* Caption */}
              {(lightboxImage.caption || lightboxImage.category) && (
                <div className="shrink-0 px-4 pt-3 pb-1 text-center sm:px-6">
                  {lightboxImage.caption && <p className="text-sm text-white/85">{lightboxImage.caption}</p>}
                  <p className="mt-0.5 text-[11px] uppercase tracking-wide text-white/45">{lightboxImage.category}</p>
                </div>
              )}

              {/* Bottom filmstrip */}
              {filtered.length > 1 && (
                <div className="mt-3 shrink-0 overflow-x-auto border-t border-white/10 px-3 py-3 sm:px-6">
                  <div className="flex gap-2">
                    {filtered.map((img, idx) => (
                      <button
                        key={img.id}
                        type="button"
                        ref={(el) => {
                          if (idx === lightboxIndex) {
                            el?.scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" });
                          }
                        }}
                        onClick={() => setLightboxIndex(idx)}
                        aria-label={`Show photo ${idx + 1}`}
                        aria-current={idx === lightboxIndex}
                        className={`relative h-14 w-20 shrink-0 overflow-hidden rounded-lg border-2 transition-opacity sm:h-16 sm:w-24 ${
                          idx === lightboxIndex
                            ? "border-primary opacity-100"
                            : "border-transparent opacity-45 hover:opacity-80"
                        }`}
                      >
                        <Image src={img.url} alt="" fill sizes="96px" className="object-cover" />
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
