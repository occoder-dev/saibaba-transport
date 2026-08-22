"use server";

import { revalidatePath } from "next/cache";
import { requireRole } from "@/lib/auth/guard";
import { createFaq, updateFaq, deleteFaq } from "@/lib/services/faqs";

function parseFaqForm(formData: FormData) {
  const question = String(formData.get("question") ?? "").trim();
  const answer = String(formData.get("answer") ?? "").trim();
  const category = String(formData.get("category") ?? "General").trim() || "General";
  const sortOrder = Number(formData.get("sortOrder") ?? 0) || 0;

  if (!question || !answer) {
    return { error: "Question and answer are required." } as const;
  }

  return { data: { question, answer, category, sortOrder } } as const;
}

function revalidateFaqPaths() {
  revalidatePath("/admin/faqs");
  revalidatePath("/faq");
  revalidatePath("/");
}

export async function createFaqAction(formData: FormData) {
  const guard = await requireRole("ADMIN");
  if (!guard.ok) return { error: guard.error };

  const parsed = parseFaqForm(formData);
  if ("error" in parsed) return parsed;

  try {
    await createFaq(parsed.data);
  } catch (err) {
    console.error("Failed to create FAQ", err);
    return { error: "Failed to create FAQ." };
  }
  revalidateFaqPaths();
}

export async function updateFaqAction(formData: FormData) {
  const guard = await requireRole("ADMIN");
  if (!guard.ok) return { error: guard.error };

  const id = String(formData.get("id") ?? "");
  if (!id) return { error: "Missing FAQ id." };

  const parsed = parseFaqForm(formData);
  if ("error" in parsed) return parsed;

  try {
    await updateFaq(id, parsed.data);
  } catch (err) {
    console.error("Failed to update FAQ", err);
    return { error: "Failed to update FAQ." };
  }
  revalidateFaqPaths();
}

export async function deleteFaqAction(id: string) {
  const guard = await requireRole("ADMIN");
  if (!guard.ok) return { error: guard.error };

  try {
    await deleteFaq(id);
  } catch (err) {
    console.error("Failed to delete FAQ", err);
    return { error: "Failed to delete FAQ." };
  }
  revalidateFaqPaths();
}

export async function toggleFaqActiveAction(id: string, active: boolean) {
  const guard = await requireRole("ADMIN");
  if (!guard.ok) return { error: guard.error };

  try {
    await updateFaq(id, { active });
  } catch (err) {
    console.error("Failed to update FAQ", err);
    return { error: "Failed to update FAQ." };
  }
  revalidateFaqPaths();
}
