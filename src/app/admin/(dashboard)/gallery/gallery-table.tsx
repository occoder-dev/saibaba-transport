"use client";

import Image from "next/image";
import { ImageOff } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ResourceFormDialog, type FieldConfig } from "@/components/admin/crud/resource-form-dialog";
import { DeleteButton } from "@/components/admin/crud/delete-button";
import { ActiveToggle } from "@/components/admin/crud/active-toggle";
import type { GalleryImage } from "@/db/schema";
import { updateGalleryImageAction, deleteGalleryImageAction, toggleGalleryImageActiveAction } from "./actions";
import { UploadImageDialog, GALLERY_CATEGORIES } from "./upload-dialog";

// Same curated category list as the upload dialog. If an image's existing
// category isn't one of the curated options (e.g. it was set before this
// list existed, or via "Other..." at upload time), it's added in as an
// extra option so editing never silently discards it.
function editFieldsFor(currentCategory: string): FieldConfig[] {
  const options = GALLERY_CATEGORIES.includes(currentCategory)
    ? GALLERY_CATEGORIES
    : [...GALLERY_CATEGORIES, currentCategory];

  return [
    { type: "text", name: "caption", label: "Caption" },
    {
      type: "select",
      name: "category",
      label: "Category",
      options: options.map((cat) => ({ value: cat, label: cat })),
    },
    { type: "number", name: "sortOrder", label: "Sort order", placeholder: "0" },
  ];
}

export function GalleryTable({ images }: { images: GalleryImage[] }) {
  return (
    <div className="space-y-4">
      <div className="flex justify-end">
        <UploadImageDialog />
      </div>

      {images.length === 0 ? (
        <div className="flex flex-col items-center gap-3 rounded-2xl border border-dashed border-border bg-card py-20 text-center text-muted-foreground">
          <ImageOff className="size-8 text-muted-foreground/50" />
          <p className="text-sm">No gallery images yet - upload one to get started.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {images.map((image) => (
            <div
              key={image.id}
              className="flex h-full flex-col overflow-hidden rounded-2xl border border-border/70 bg-card shadow-sm shadow-black/[0.03] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-premium"
            >
              <div className="relative aspect-4/3 w-full shrink-0 bg-muted">
                <Image src={image.url} alt={image.caption || "Gallery image"} fill className="object-cover" />
                {!image.active ? (
                  <div className="absolute inset-0 flex items-center justify-center bg-black/50 text-xs font-medium text-white">
                    Hidden
                  </div>
                ) : null}
                <Badge variant="outline" className="absolute left-2.5 top-2.5 border-white/40 bg-black/50 text-white backdrop-blur-sm">
                  {image.category}
                </Badge>
              </div>

              {/* flex-1 + mt-auto footer keeps action rows bottom-aligned across cards regardless of caption length */}
              <div className="flex flex-1 flex-col gap-3 p-3.5">
                <div className="flex items-start justify-between gap-2">
                  <p className="line-clamp-2 flex-1 text-sm text-muted-foreground">{image.caption || "-"}</p>
                  <ActiveToggle
                    active={image.active}
                    action={(next) => toggleGalleryImageActiveAction(image.id, next)}
                  />
                </div>
                <div className="mt-auto flex items-center justify-end gap-1 border-t border-border/70 pt-2.5">
                  <ResourceFormDialog
                    trigger={
                      <Button variant="ghost" size="sm">
                        Edit
                      </Button>
                    }
                    title="Edit Image Details"
                    fields={[{ type: "hidden", name: "id" }, ...editFieldsFor(image.category)]}
                    defaultValues={{ ...image, id: image.id }}
                    action={updateGalleryImageAction}
                    submitLabel="Save Changes"
                  />
                  <DeleteButton
                    action={() => deleteGalleryImageAction(image.id)}
                    itemLabel={image.caption || "this image"}
                    resourceLabel="image"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
