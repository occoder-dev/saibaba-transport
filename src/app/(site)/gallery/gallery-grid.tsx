"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Expand } from "lucide-react";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Stagger, StaggerItem } from "@/components/motion/reveal";
import type { GalleryImage } from "@/db/schema";

export function GalleryGrid({ images }: { images: GalleryImage[] }) {
  const categories = useMemo(
    () => ["All", ...Array.from(new Set(images.map((img) => img.category)))],
    [images]
  );
  const [active, setActive] = useState("All");
  const [lightbox, setLightbox] = useState<GalleryImage | null>(null);

  const filtered = active === "All" ? images : images.filter((img) => img.category === active);

  if (images.length === 0) {
    return (
      <div className="rounded-2xl border border-dashed border-border bg-secondary/30 py-20 text-center text-muted-foreground">
        No gallery photos have been added yet - check back soon.
      </div>
    );
  }

  return (
    <div>
      {categories.length > 2 && (
        <div className="mb-10 flex flex-wrap gap-2">
          {categories.map((cat) => (
            <Button
              key={cat}
              size="sm"
              variant={active === cat ? "default" : "outline"}
              onClick={() => setActive(cat)}
              className="rounded-full"
            >
              {cat}
            </Button>
          ))}
        </div>
      )}

      <Stagger className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
        {filtered.map((image) => (
          <StaggerItem key={image.id}>
            <motion.button
              type="button"
              onClick={() => setLightbox(image)}
              whileHover={{ y: -4 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className="group relative block aspect-square w-full overflow-hidden rounded-2xl border border-border bg-muted shadow-sm"
            >
              <Image
                src={image.url}
                alt={image.caption || "Saibaba Transport gallery photo"}
                fill
                sizes="(min-width: 1024px) 25vw, (min-width: 640px) 33vw, 50vw"
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 flex items-end bg-gradient-to-t from-black/60 via-black/0 to-black/0 p-3 opacity-0 transition-opacity group-hover:opacity-100">
                <span className="flex items-center gap-1.5 text-xs font-medium text-white">
                  <Expand className="size-3.5" /> View
                </span>
              </div>
            </motion.button>
          </StaggerItem>
        ))}
      </Stagger>

      <Dialog open={!!lightbox} onOpenChange={(open) => !open && setLightbox(null)}>
        <DialogContent className="max-w-3xl border-none bg-transparent p-0 shadow-none">
          <DialogTitle className="sr-only">{lightbox?.caption || "Gallery photo"}</DialogTitle>
          {lightbox && (
            <div className="overflow-hidden rounded-2xl bg-black">
              <div className="relative aspect-4/3 w-full">
                <Image
                  src={lightbox.url}
                  alt={lightbox.caption || "Saibaba Transport gallery photo"}
                  fill
                  sizes="100vw"
                  className="object-contain"
                />
              </div>
              {lightbox.caption && (
                <p className="bg-black/80 px-5 py-3 text-center text-sm text-white/90">{lightbox.caption}</p>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
