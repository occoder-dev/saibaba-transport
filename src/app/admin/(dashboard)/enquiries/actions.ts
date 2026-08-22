"use server";

import { revalidatePath } from "next/cache";
import { requireRole } from "@/lib/auth/guard";
import { updateEnquiry, deleteEnquiry, type EnquiryStatus } from "@/lib/services/enquiries";

const VALID_STATUSES: EnquiryStatus[] = ["NEW", "IN_PROGRESS", "RESOLVED", "CLOSED"];

function revalidateEnquiryPaths(id?: string) {
  revalidatePath("/admin/enquiries");
  revalidatePath("/admin");
  if (id) revalidatePath(`/admin/enquiries/${id}`);
}

export async function updateEnquiryAction(formData: FormData) {
  const guard = await requireRole("STAFF");
  if (!guard.ok) return { error: guard.error };

  const id = String(formData.get("id") ?? "");
  if (!id) return { error: "Missing enquiry id." };

  const status = String(formData.get("status") ?? "");
  if (!VALID_STATUSES.includes(status as EnquiryStatus)) {
    return { error: "Invalid status." };
  }

  const notes = String(formData.get("notes") ?? "").trim();
  const assignedToRaw = String(formData.get("assignedToUserId") ?? "");
  const assignedToUserId = assignedToRaw && assignedToRaw !== "unassigned" ? assignedToRaw : null;

  try {
    await updateEnquiry(id, {
      status: status as EnquiryStatus,
      notes: notes || null,
      assignedToUserId,
    });
  } catch (err) {
    console.error("Failed to update enquiry", err);
    return { error: "Failed to update enquiry." };
  }
  revalidateEnquiryPaths(id);
}

export async function deleteEnquiryAction(id: string) {
  const guard = await requireRole("ADMIN");
  if (!guard.ok) return { error: guard.error };

  try {
    await deleteEnquiry(id);
  } catch (err) {
    console.error("Failed to delete enquiry", err);
    return { error: "Failed to delete enquiry." };
  }
  revalidateEnquiryPaths();
}
