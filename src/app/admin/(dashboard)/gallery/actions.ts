"use server";

import { randomUUID } from "node:crypto";
import { put, del } from "@vercel/blob";
import { revalidatePath } from "next/cache";
import { requireRole } from "@/lib/auth/guard";
import {
  createGalleryImage,
  updateGalleryImage,
  deleteGalleryImage,
  getGalleryImage,
} from "@/lib/services/gallery";

// Uploaded images are stored in Vercel Blob rather than on the local
// filesystem. Vercel's production deployments run on a read-only,
// serverless filesystem (only /tmp is writable, and it isn't shared between
// invocations), so writing files with node:fs like the old implementation
// did works locally but silently/loudly fails once deployed - that's the
// "failed to upload" error on Vercel. Blob storage works the same way in
// both local dev and production, as long as BLOB_READ_WRITE_TOKEN is set
// (see .env.example).
const BLOB_FOLDER = "gallery";
const ALLOWED_TYPES = new Set(["image/jpeg", "image/png", "image/webp"]);
const MAX_BYTES = 8 * 1024 * 1024; // 8MB

function revalidateGalleryPaths() {
  revalidatePath("/admin/gallery");
  revalidatePath("/gallery");
}

export async function uploadGalleryImageAction(formData: FormData) {
  const guard = await requireRole("ADMIN");
  if (!guard.ok) return { error: guard.error };

  const file = formData.get("file");
  const caption = String(formData.get("caption") ?? "").trim();
  const category = String(formData.get("category") ?? "Fleet").trim() || "Fleet";
  const sortOrder = Number(formData.get("sortOrder") ?? 0) || 0;

  if (!(file instanceof File) || file.size === 0) {
    return { error: "Please choose an image to upload." };
  }
  if (!ALLOWED_TYPES.has(file.type)) {
    return { error: "Only JPEG, PNG or WebP images are supported." };
  }
  if (file.size > MAX_BYTES) {
    return { error: "Image is too large (max 8MB)." };
  }

  const ext = file.type === "image/png" ? "png" : file.type === "image/webp" ? "webp" : "jpg";
  const filename = `${BLOB_FOLDER}/${randomUUID()}.${ext}`;

  try {
    const blob = await put(filename, file, {
      access: "public",
      addRandomSuffix: false,
      contentType: file.type,
    });
    await createGalleryImage({ url: blob.url, caption, category, sortOrder });
  } catch (err) {
    console.error("Failed to upload gallery image", err);
    if (err instanceof Error && /BLOB_READ_WRITE_TOKEN/i.test(err.message)) {
      return {
        error:
          "Image storage isn't configured yet. Add a Blob store to this project in Vercel (Storage -> Create Database -> Blob) and set BLOB_READ_WRITE_TOKEN.",
      };
    }
    return { error: "Failed to upload image." };
  }
  revalidateGalleryPaths();
}

export async function updateGalleryImageAction(formData: FormData) {
  const guard = await requireRole("ADMIN");
  if (!guard.ok) return { error: guard.error };

  const id = String(formData.get("id") ?? "");
  if (!id) return { error: "Missing image id." };

  const caption = String(formData.get("caption") ?? "").trim();
  const category = String(formData.get("category") ?? "Fleet").trim() || "Fleet";
  const sortOrder = Number(formData.get("sortOrder") ?? 0) || 0;

  try {
    await updateGalleryImage(id, { caption, category, sortOrder });
  } catch (err) {
    console.error("Failed to update gallery image", err);
    return { error: "Failed to update image." };
  }
  revalidateGalleryPaths();
}

export async function deleteGalleryImageAction(id: string) {
  const guard = await requireRole("ADMIN");
  if (!guard.ok) return { error: guard.error };

  try {
    const image = await getGalleryImage(id);
    await deleteGalleryImage(id);
    if (image?.url.includes("blob.vercel-storage.com")) {
      await del(image.url).catch(() => {});
    }
  } catch (err) {
    console.error("Failed to delete gallery image", err);
    return { error: "Failed to delete image." };
  }
  revalidateGalleryPaths();
}

export async function toggleGalleryImageActiveAction(id: string, active: boolean) {
  const guard = await requireRole("ADMIN");
  if (!guard.ok) return { error: guard.error };

  try {
    await updateGalleryImage(id, { active });
  } catch (err) {
    console.error("Failed to update gallery image", err);
    return { error: "Failed to update image." };
  }
  revalidateGalleryPaths();
}
