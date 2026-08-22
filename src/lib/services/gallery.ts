import "server-only";
import { asc, eq } from "drizzle-orm";
import { db } from "@/db";
import { galleryImages, type GalleryImage, type NewGalleryImage } from "@/db/schema";

export async function listGalleryImages({ onlyActive = false } = {}): Promise<GalleryImage[]> {
  const rows = await db.select().from(galleryImages).orderBy(asc(galleryImages.sortOrder));
  return onlyActive ? rows.filter((g) => g.active) : rows;
}

export async function getGalleryImage(id: string): Promise<GalleryImage | undefined> {
  const [row] = await db.select().from(galleryImages).where(eq(galleryImages.id, id));
  return row;
}

export async function createGalleryImage(
  data: Omit<NewGalleryImage, "id" | "createdAt">
): Promise<GalleryImage> {
  const [row] = await db.insert(galleryImages).values(data).returning();
  return row;
}

export async function updateGalleryImage(
  id: string,
  data: Partial<Omit<NewGalleryImage, "id" | "createdAt">>
): Promise<GalleryImage> {
  const [row] = await db.update(galleryImages).set(data).where(eq(galleryImages.id, id)).returning();
  return row;
}

export async function deleteGalleryImage(id: string): Promise<void> {
  await db.delete(galleryImages).where(eq(galleryImages.id, id));
}
