"use server";

import { revalidatePath } from "next/cache";
import { requireRole } from "@/lib/auth/guard";
import { createIndustry, updateIndustry, deleteIndustry } from "@/lib/services/industries";

function parseIndustryForm(formData: FormData) {
  const name = String(formData.get("name") ?? "").trim();
  const description = String(formData.get("description") ?? "").trim();
  const icon = String(formData.get("icon") ?? "Boxes").trim() || "Boxes";
  const sortOrder = Number(formData.get("sortOrder") ?? 0) || 0;

  if (!name || !description) {
    return { error: "Name and description are required." } as const;
  }

  return { data: { name, description, icon, sortOrder } } as const;
}

function revalidateIndustryPaths() {
  revalidatePath("/admin/industries");
  revalidatePath("/industries");
  revalidatePath("/");
}

export async function createIndustryAction(formData: FormData) {
  const guard = await requireRole("ADMIN");
  if (!guard.ok) return { error: guard.error };

  const parsed = parseIndustryForm(formData);
  if ("error" in parsed) return parsed;

  try {
    await createIndustry(parsed.data);
  } catch (err) {
    console.error("Failed to create industry", err);
    return { error: "Failed to create industry." };
  }
  revalidateIndustryPaths();
}

export async function updateIndustryAction(formData: FormData) {
  const guard = await requireRole("ADMIN");
  if (!guard.ok) return { error: guard.error };

  const id = String(formData.get("id") ?? "");
  if (!id) return { error: "Missing industry id." };

  const parsed = parseIndustryForm(formData);
  if ("error" in parsed) return parsed;

  try {
    await updateIndustry(id, parsed.data);
  } catch (err) {
    console.error("Failed to update industry", err);
    return { error: "Failed to update industry." };
  }
  revalidateIndustryPaths();
}

export async function deleteIndustryAction(id: string) {
  const guard = await requireRole("ADMIN");
  if (!guard.ok) return { error: guard.error };

  try {
    await deleteIndustry(id);
  } catch (err) {
    console.error("Failed to delete industry", err);
    return { error: "Failed to delete industry." };
  }
  revalidateIndustryPaths();
}

export async function toggleIndustryActiveAction(id: string, active: boolean) {
  const guard = await requireRole("ADMIN");
  if (!guard.ok) return { error: guard.error };

  try {
    await updateIndustry(id, { active });
  } catch (err) {
    console.error("Failed to update industry", err);
    return { error: "Failed to update industry." };
  }
  revalidateIndustryPaths();
}
