import "server-only";
import { asc, eq } from "drizzle-orm";
import { db } from "@/db";
import { branches, type Branch, type NewBranch } from "@/db/schema";

export async function listBranches({ onlyActive = false } = {}): Promise<Branch[]> {
  const rows = await db.select().from(branches).orderBy(asc(branches.sortOrder), asc(branches.city));
  return onlyActive ? rows.filter((b) => b.active) : rows;
}

export async function getBranch(id: string): Promise<Branch | undefined> {
  const [row] = await db.select().from(branches).where(eq(branches.id, id));
  return row;
}

export async function createBranch(data: Omit<NewBranch, "id" | "createdAt" | "updatedAt">): Promise<Branch> {
  const [row] = await db.insert(branches).values(data).returning();
  return row;
}

export async function updateBranch(
  id: string,
  data: Partial<Omit<NewBranch, "id" | "createdAt" | "updatedAt">>
): Promise<Branch> {
  const [row] = await db
    .update(branches)
    .set({ ...data, updatedAt: new Date() })
    .where(eq(branches.id, id))
    .returning();
  return row;
}

export async function deleteBranch(id: string): Promise<void> {
  await db.delete(branches).where(eq(branches.id, id));
}
