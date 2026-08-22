import "server-only";
import { asc, eq } from "drizzle-orm";
import { db } from "@/db";
import { industries, type Industry, type NewIndustry } from "@/db/schema";

export async function listIndustries({ onlyActive = false } = {}): Promise<Industry[]> {
  const rows = await db.select().from(industries).orderBy(asc(industries.sortOrder));
  return onlyActive ? rows.filter((i) => i.active) : rows;
}

export async function getIndustry(id: string): Promise<Industry | undefined> {
  const [row] = await db.select().from(industries).where(eq(industries.id, id));
  return row;
}

export async function createIndustry(
  data: Omit<NewIndustry, "id" | "createdAt" | "updatedAt">
): Promise<Industry> {
  const [row] = await db.insert(industries).values(data).returning();
  return row;
}

export async function updateIndustry(
  id: string,
  data: Partial<Omit<NewIndustry, "id" | "createdAt" | "updatedAt">>
): Promise<Industry> {
  const [row] = await db
    .update(industries)
    .set({ ...data, updatedAt: new Date() })
    .where(eq(industries.id, id))
    .returning();
  return row;
}

export async function deleteIndustry(id: string): Promise<void> {
  await db.delete(industries).where(eq(industries.id, id));
}
