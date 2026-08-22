import "server-only";
import { asc, eq } from "drizzle-orm";
import { db } from "@/db";
import { faqs, type Faq, type NewFaq } from "@/db/schema";

export async function listFaqs({ onlyActive = false } = {}): Promise<Faq[]> {
  const rows = await db.select().from(faqs).orderBy(asc(faqs.sortOrder));
  return onlyActive ? rows.filter((f) => f.active) : rows;
}

export async function getFaq(id: string): Promise<Faq | undefined> {
  const [row] = await db.select().from(faqs).where(eq(faqs.id, id));
  return row;
}

export async function createFaq(data: Omit<NewFaq, "id" | "createdAt" | "updatedAt">): Promise<Faq> {
  const [row] = await db.insert(faqs).values(data).returning();
  return row;
}

export async function updateFaq(
  id: string,
  data: Partial<Omit<NewFaq, "id" | "createdAt" | "updatedAt">>
): Promise<Faq> {
  const [row] = await db
    .update(faqs)
    .set({ ...data, updatedAt: new Date() })
    .where(eq(faqs.id, id))
    .returning();
  return row;
}

export async function deleteFaq(id: string): Promise<void> {
  await db.delete(faqs).where(eq(faqs.id, id));
}
