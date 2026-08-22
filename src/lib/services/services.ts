import "server-only";
import { asc, eq } from "drizzle-orm";
import { db } from "@/db";
import { services, type Service, type NewService } from "@/db/schema";

export async function listServices({ onlyActive = false } = {}): Promise<Service[]> {
  const rows = await db.select().from(services).orderBy(asc(services.sortOrder));
  return onlyActive ? rows.filter((s) => s.active) : rows;
}

export async function getService(id: string): Promise<Service | undefined> {
  const [row] = await db.select().from(services).where(eq(services.id, id));
  return row;
}

export async function getServiceBySlug(slug: string): Promise<Service | undefined> {
  const [row] = await db.select().from(services).where(eq(services.slug, slug));
  return row;
}

export async function createService(data: Omit<NewService, "id" | "createdAt" | "updatedAt">): Promise<Service> {
  const [row] = await db.insert(services).values(data).returning();
  return row;
}

export async function updateService(
  id: string,
  data: Partial<Omit<NewService, "id" | "createdAt" | "updatedAt">>
): Promise<Service> {
  const [row] = await db
    .update(services)
    .set({ ...data, updatedAt: new Date() })
    .where(eq(services.id, id))
    .returning();
  return row;
}

export async function deleteService(id: string): Promise<void> {
  await db.delete(services).where(eq(services.id, id));
}
