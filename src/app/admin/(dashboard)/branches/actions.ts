"use server";

import { revalidatePath } from "next/cache";
import { requireRole } from "@/lib/auth/guard";
import { createBranch, updateBranch, deleteBranch } from "@/lib/services/branches";

function linesToArray(value: FormDataEntryValue | null): string[] {
  return String(value ?? "")
    .split("\n")
    .map((s) => s.trim())
    .filter(Boolean);
}

// Normalize a state name to Title Case ("BIHAR" / "bihar" -> "Bihar") so
// entries typed in different cases don't create duplicate-looking states in
// the branches list and filters.
function toTitleCase(value: string): string {
  return value
    .trim()
    .toLowerCase()
    .split(/\s+/)
    .filter(Boolean)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

function parseBranchForm(formData: FormData) {
  const city = String(formData.get("city") ?? "").trim();
  const state = toTitleCase(String(formData.get("state") ?? ""));
  const address = String(formData.get("address") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim();
  const phones = linesToArray(formData.get("phones"));
  const services = linesToArray(formData.get("services"));
  const isHeadOffice = formData.get("isHeadOffice") === "true";
  const sortOrder = Number(formData.get("sortOrder") ?? 0) || 0;

  if (!city || !state || !email) {
    return { error: "City, state and email are required." } as const;
  }
  if (phones.length === 0) {
    return { error: "At least one phone number is required (one per line)." } as const;
  }

  return {
    data: { city, state, address: address || null, email, phones, services, isHeadOffice, sortOrder },
  } as const;
}

function revalidateBranchPaths() {
  revalidatePath("/admin/branches");
  revalidatePath("/branches");
  revalidatePath("/contact");
  revalidatePath("/");
}

export async function createBranchAction(formData: FormData) {
  const guard = await requireRole("ADMIN");
  if (!guard.ok) return { error: guard.error };

  const parsed = parseBranchForm(formData);
  if ("error" in parsed) return parsed;

  try {
    await createBranch(parsed.data);
  } catch (err) {
    console.error("Failed to create branch", err);
    return { error: "Failed to create branch." };
  }
  revalidateBranchPaths();
}

export async function updateBranchAction(formData: FormData) {
  const guard = await requireRole("ADMIN");
  if (!guard.ok) return { error: guard.error };

  const id = String(formData.get("id") ?? "");
  if (!id) return { error: "Missing branch id." };

  const parsed = parseBranchForm(formData);
  if ("error" in parsed) return parsed;

  try {
    await updateBranch(id, parsed.data);
  } catch (err) {
    console.error("Failed to update branch", err);
    return { error: "Failed to update branch." };
  }
  revalidateBranchPaths();
}

export async function deleteBranchAction(id: string) {
  const guard = await requireRole("ADMIN");
  if (!guard.ok) return { error: guard.error };

  try {
    await deleteBranch(id);
  } catch (err) {
    console.error("Failed to delete branch", err);
    return { error: "Failed to delete branch." };
  }
  revalidateBranchPaths();
}

export async function toggleBranchActiveAction(id: string, active: boolean) {
  const guard = await requireRole("ADMIN");
  if (!guard.ok) return { error: guard.error };

  try {
    await updateBranch(id, { active });
  } catch (err) {
    console.error("Failed to update branch", err);
    return { error: "Failed to update branch." };
  }
  revalidateBranchPaths();
}
