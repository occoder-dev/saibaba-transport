"use server";

import { revalidatePath } from "next/cache";
import { requireRole } from "@/lib/auth/guard";
import {
  createVehicleType,
  updateVehicleType,
  deleteVehicleType,
  createMaterialCategory,
  updateMaterialCategory,
  deleteMaterialCategory,
} from "@/lib/services/pricing";

function parseDecimal(value: FormDataEntryValue | null, label: string): { value: string } | { error: string } {
  const raw = String(value ?? "").trim();
  const n = Number(raw);
  if (!raw || Number.isNaN(n) || n < 0) {
    return { error: `${label} must be a valid positive number.` };
  }
  return { value: n.toFixed(2) };
}

function revalidatePricingPaths() {
  revalidatePath("/admin/pricing");
  revalidatePath("/estimate");
  revalidatePath("/api/pricing");
}

// --- Vehicle types --------------------------------------------------------

function parseVehicleTypeForm(formData: FormData) {
  const name = String(formData.get("name") ?? "").trim();
  const sortOrder = Number(formData.get("sortOrder") ?? 0) || 0;

  const perKmRate = parseDecimal(formData.get("perKmRate"), "Per-km rate");
  const baseFare = parseDecimal(formData.get("baseFare"), "Base fare");
  const capacityTons = parseDecimal(formData.get("capacityTons"), "Capacity (tons)");

  if (!name) return { error: "Vehicle type name is required." } as const;
  if ("error" in perKmRate) return perKmRate;
  if ("error" in baseFare) return baseFare;
  if ("error" in capacityTons) return capacityTons;

  return {
    data: {
      name,
      perKmRate: perKmRate.value,
      baseFare: baseFare.value,
      capacityTons: capacityTons.value,
      sortOrder,
    },
  } as const;
}

export async function createVehicleTypeAction(formData: FormData) {
  const guard = await requireRole("ADMIN");
  if (!guard.ok) return { error: guard.error };

  const parsed = parseVehicleTypeForm(formData);
  if ("error" in parsed) return parsed;

  try {
    await createVehicleType(parsed.data);
  } catch (err) {
    console.error("Failed to create vehicle type", err);
    return { error: "Failed to create vehicle type - the name may already be in use." };
  }
  revalidatePricingPaths();
}

export async function updateVehicleTypeAction(formData: FormData) {
  const guard = await requireRole("ADMIN");
  if (!guard.ok) return { error: guard.error };

  const id = String(formData.get("id") ?? "");
  if (!id) return { error: "Missing vehicle type id." };

  const parsed = parseVehicleTypeForm(formData);
  if ("error" in parsed) return parsed;

  try {
    await updateVehicleType(id, parsed.data);
  } catch (err) {
    console.error("Failed to update vehicle type", err);
    return { error: "Failed to update vehicle type." };
  }
  revalidatePricingPaths();
}

export async function deleteVehicleTypeAction(id: string) {
  const guard = await requireRole("ADMIN");
  if (!guard.ok) return { error: guard.error };

  try {
    await deleteVehicleType(id);
  } catch (err) {
    console.error("Failed to delete vehicle type", err);
    return { error: "Failed to delete vehicle type." };
  }
  revalidatePricingPaths();
}

export async function toggleVehicleTypeActiveAction(id: string, active: boolean) {
  const guard = await requireRole("ADMIN");
  if (!guard.ok) return { error: guard.error };

  try {
    await updateVehicleType(id, { active });
  } catch (err) {
    console.error("Failed to update vehicle type", err);
    return { error: "Failed to update vehicle type." };
  }
  revalidatePricingPaths();
}

// --- Material categories ---------------------------------------------------

function parseMaterialCategoryForm(formData: FormData) {
  const name = String(formData.get("name") ?? "").trim();
  const sortOrder = Number(formData.get("sortOrder") ?? 0) || 0;
  const multiplier = parseDecimal(formData.get("multiplier"), "Multiplier");

  if (!name) return { error: "Material category name is required." } as const;
  if ("error" in multiplier) return multiplier;

  return { data: { name, multiplier: multiplier.value, sortOrder } } as const;
}

export async function createMaterialCategoryAction(formData: FormData) {
  const guard = await requireRole("ADMIN");
  if (!guard.ok) return { error: guard.error };

  const parsed = parseMaterialCategoryForm(formData);
  if ("error" in parsed) return parsed;

  try {
    await createMaterialCategory(parsed.data);
  } catch (err) {
    console.error("Failed to create material category", err);
    return { error: "Failed to create material category - the name may already be in use." };
  }
  revalidatePricingPaths();
}

export async function updateMaterialCategoryAction(formData: FormData) {
  const guard = await requireRole("ADMIN");
  if (!guard.ok) return { error: guard.error };

  const id = String(formData.get("id") ?? "");
  if (!id) return { error: "Missing material category id." };

  const parsed = parseMaterialCategoryForm(formData);
  if ("error" in parsed) return parsed;

  try {
    await updateMaterialCategory(id, parsed.data);
  } catch (err) {
    console.error("Failed to update material category", err);
    return { error: "Failed to update material category." };
  }
  revalidatePricingPaths();
}

export async function deleteMaterialCategoryAction(id: string) {
  const guard = await requireRole("ADMIN");
  if (!guard.ok) return { error: guard.error };

  try {
    await deleteMaterialCategory(id);
  } catch (err) {
    console.error("Failed to delete material category", err);
    return { error: "Failed to delete material category." };
  }
  revalidatePricingPaths();
}

export async function toggleMaterialCategoryActiveAction(id: string, active: boolean) {
  const guard = await requireRole("ADMIN");
  if (!guard.ok) return { error: guard.error };

  try {
    await updateMaterialCategory(id, { active });
  } catch (err) {
    console.error("Failed to update material category", err);
    return { error: "Failed to update material category." };
  }
  revalidatePricingPaths();
}
