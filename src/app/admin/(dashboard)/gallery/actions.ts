"use server";

import { randomUUID } from "node:crypto";
import { mkdir, unlink, writeFile } from "node:fs/promises";
import path from "node:path";
import { revalidatePath } from "next/cache";
import { requireRole } from "@/lib/auth/guard";
import {
  createGalleryImage,
  updateGalleryImage,
  deleteGalleryImage,
  getGalleryImage,
} from "@/lib/services/gallery";

const UPLOAD_DIR = path.join(process.cwd(), "public", "uploads", "gallery");
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
  const filename = `${randomUUID()}.${ext}`;

  try {
    await mkdir(UPLOAD_DIR, { recursive: true });
    const bytes = Buffer.from(await file.arrayBuffer());
    await writeFile(path.join(UPLOAD_DIR, filename), bytes);
    await createGalleryImage({ url: `/uploads/gallery/${filename}`, caption, category, sortOrder });
  } catch (err) {
    console.error("Failed to upload gallery image", err);
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
    if (image?.url.startsWith("/uploads/gallery/")) {
      await unlink(path.join(process.cwd(), "public", image.url)).catch(() => {});
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
