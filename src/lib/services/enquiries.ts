import "server-only";
import { and, desc, eq } from "drizzle-orm";
import { db } from "@/db";
import { enquiries, type Enquiry, type NewEnquiry } from "@/db/schema";

export type EnquiryType = Enquiry["type"];
export type EnquiryStatus = Enquiry["status"];

export async function listEnquiries(filter?: {
  type?: EnquiryType;
  status?: EnquiryStatus;
}): Promise<Enquiry[]> {
  const conditions = [];
  if (filter?.type) conditions.push(eq(enquiries.type, filter.type));
  if (filter?.status) conditions.push(eq(enquiries.status, filter.status));

  if (conditions.length === 0) {
    return db.select().from(enquiries).orderBy(desc(enquiries.createdAt));
  }
  return db
    .select()
    .from(enquiries)
    .where(and(...conditions))
    .orderBy(desc(enquiries.createdAt));
}

export async function getEnquiry(id: string): Promise<Enquiry | undefined> {
  const [row] = await db.select().from(enquiries).where(eq(enquiries.id, id));
  return row;
}

export async function createEnquiry(
  data: Pick<NewEnquiry, "type" | "payload">
): Promise<Enquiry> {
  const [row] = await db.insert(enquiries).values(data).returning();
  return row;
}

export async function updateEnquiry(
  id: string,
  data: Partial<Pick<NewEnquiry, "status" | "notes" | "assignedToUserId">>
): Promise<Enquiry> {
  const [row] = await db
    .update(enquiries)
    .set({ ...data, updatedAt: new Date() })
    .where(eq(enquiries.id, id))
    .returning();
  return row;
}

export async function deleteEnquiry(id: string): Promise<void> {
  await db.delete(enquiries).where(eq(enquiries.id, id));
}

export async function getEnquiryCounts(): Promise<{
  total: number;
  byStatus: Record<EnquiryStatus, number>;
  byType: Record<EnquiryType, number>;
}> {
  const all = await db.select().from(enquiries);
  const byStatus: Record<EnquiryStatus, number> = { NEW: 0, IN_PROGRESS: 0, RESOLVED: 0, CLOSED: 0 };
  const byType: Record<EnquiryType, number> = {
    QUOTE: 0,
    PARTNER: 0,
    TRANSPORTER: 0,
    CONTACT: 0,
    CAREER: 0,
    REGISTRATION: 0,
  };

  for (const row of all) {
    byStatus[row.status]++;
    byType[row.type]++;
  }

  return { total: all.length, byStatus, byType };
}
