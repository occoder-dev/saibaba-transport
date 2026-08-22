"use server";

import { revalidatePath } from "next/cache";
import { requireRole } from "@/lib/auth/guard";
import { createService, updateService, deleteService } from "@/lib/services/services";

function linesToArray(value: FormDataEntryValue | null): string[] {
  return String(value ?? "")
    .split("\n")
    .map((s) => s.trim())
    .filter(Boolean);
}

function slugify(value: string): string {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "");
}

function parseServiceForm(formData: FormData) {
  const name = String(formData.get("name") ?? "").trim();
  const slugInput = String(formData.get("slug") ?? "").trim();
  const short = String(formData.get("short") ?? "").trim();
  const description = String(formData.get("description") ?? "").trim();
  const icon = String(formData.get("icon") ?? "Truck").trim() || "Truck";
  const points = linesToArray(formData.get("points"));
  const sortOrder = Number(formData.get("sortOrder") ?? 0) || 0;

  if (!name || !short || !description) {
    return { error: "Name, short description and full description are required." } as const;
  }

  const slug = slugify(slugInput || name);
  if (!slug) return { error: "Could not derive a valid slug from the name." } as const;

  return { data: { name, slug, short, description, icon, points, sortOrder } } as const;
}

function revalidateServicePaths() {
  revalidatePath("/admin/services");
  revalidatePath("/services");
  revalidatePath("/");
}

export async function createServiceAction(formData: FormData) {
  const guard = await requireRole("ADMIN");
  if (!guard.ok) return { error: guard.error };

  const parsed = parseServiceForm(formData);
  if ("error" in parsed) return parsed;

  try {
    await createService(parsed.data);
  } catch (err) {
    console.error("Failed to create service", err);
    return { error: "Failed to create service - the slug may already be in use." };
  }
  revalidateServicePaths();
}

export async function updateServiceAction(formData: FormData) {
  const guard = await requireRole("ADMIN");
  if (!guard.ok) return { error: guard.error };

  const id = String(formData.get("id") ?? "");
  if (!id) return { error: "Missing service id." };

  const parsed = parseServiceForm(formData);
  if ("error" in parsed) return parsed;

  try {
    await updateService(id, parsed.data);
  } catch (err) {
    console.error("Failed to update service", err);
    return { error: "Failed to update service - the slug may already be in use." };
  }
  revalidateServicePaths();
}

export async function deleteServiceAction(id: string) {
  const guard = await requireRole("ADMIN");
  if (!guard.ok) return { error: guard.error };

  try {
    await deleteService(id);
  } catch (err) {
    console.error("Failed to delete service", err);
    return { error: "Failed to delete service." };
  }
  revalidateServicePaths();
}

export async function toggleServiceActiveAction(id: string, active: boolean) {
  const guard = await requireRole("ADMIN");
  if (!guard.ok) return { error: guard.error };

  try {
    await updateService(id, { active });
  } catch (err) {
    console.error("Failed to update service", err);
    return { error: "Failed to update service." };
  }
  revalidateServicePaths();
}
