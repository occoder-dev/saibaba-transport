"use client";

import { useRef, useState, useTransition } from "react";
import { Loader2, Upload } from "lucide-react";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { uploadGalleryImageAction } from "./actions";

// Curated, relevant categories for a pan-India transport company's gallery.
// "Other..." falls through to a free-text field so a new category can still
// be added without a code change.
export const GALLERY_CATEGORIES = [
  "Fleet",
  "Warehouse",
  "Loading & Unloading",
  "Textile Transportation",
  "Industrial Cargo",
  "Rail Freight",
  "Branch Operations",
  "Team & Events",
];
const OTHER_VALUE = "__other__";

export function UploadImageDialog() {
  const [open, setOpen] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [category, setCategory] = useState<string>(GALLERY_CATEGORIES[0]);
  const [customCategory, setCustomCategory] = useState("");
  const [pending, startTransition] = useTransition();
  const formRef = useRef<HTMLFormElement>(null);

  function resetCategory() {
    setCategory(GALLERY_CATEGORIES[0]);
    setCustomCategory("");
  }

  function handleSubmit(formData: FormData) {
    setError(null);

    const finalCategory = category === OTHER_VALUE ? customCategory.trim() : category;
    if (!finalCategory) {
      setError("Please enter a category name.");
      return;
    }
    formData.set("category", finalCategory);

    startTransition(async () => {
      const result = await uploadGalleryImageAction(formData);
      if (result && "error" in result && result.error) {
        setError(result.error);
        return;
      }
      toast.success("Image uploaded");
      setOpen(false);
      setPreview(null);
      resetCategory();
      formRef.current?.reset();
    });
  }

  return (
    <Dialog
      open={open}
      onOpenChange={(next) => {
        setOpen(next);
        if (next) setError(null);
        else {
          setPreview(null);
          resetCategory();
          formRef.current?.reset();
        }
      }}
    >
      <DialogTrigger asChild>
        <Button>
          <Upload className="size-4" /> Upload Image
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Upload Gallery Image</DialogTitle>
          <DialogDescription>JPEG, PNG or WebP, up to 8MB - trucks, loads, warehouse, fleet.</DialogDescription>
        </DialogHeader>
        <form ref={formRef} action={handleSubmit} className="space-y-4">
          <div className="space-y-1.5">
            <Label htmlFor="file">Image</Label>
            <Input
              id="file"
              name="file"
              type="file"
              accept="image/jpeg,image/png,image/webp"
              required
              onChange={(e) => {
                const file = e.target.files?.[0];
                setPreview(file ? URL.createObjectURL(file) : null);
              }}
            />
            {preview ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={preview} alt="Preview" className="mt-2 h-40 w-full rounded-lg object-cover" />
            ) : null}
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="caption">Caption</Label>
            <Input id="caption" name="caption" placeholder="Truck loaded and ready for dispatch" />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="category">Category</Label>
            <Select value={category} onValueChange={setCategory}>
              <SelectTrigger id="category" className="w-full">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {GALLERY_CATEGORIES.map((cat) => (
                  <SelectItem key={cat} value={cat}>
                    {cat}
                  </SelectItem>
                ))}
                <SelectItem value={OTHER_VALUE}>Other...</SelectItem>
              </SelectContent>
            </Select>
            {category === OTHER_VALUE ? (
              <Input
                value={customCategory}
                onChange={(e) => setCustomCategory(e.target.value)}
                placeholder="Enter a category name"
                required
                className="mt-2"
              />
            ) : null}
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="sortOrder">Sort order</Label>
            <Input id="sortOrder" name="sortOrder" type="number" placeholder="0" defaultValue={0} />
          </div>

          {error ? (
            <p className="rounded-md bg-destructive/10 px-3 py-2 text-sm text-destructive" role="alert">
              {error}
            </p>
          ) : null}

          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => setOpen(false)} disabled={pending}>
              Cancel
            </Button>
            <Button type="submit" disabled={pending}>
              {pending ? <Loader2 className="size-4 animate-spin" /> : null}
              Upload
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
