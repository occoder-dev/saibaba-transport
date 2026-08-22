import "server-only";
import { asc, eq } from "drizzle-orm";
import { db } from "@/db";
import {
  vehicleTypes,
  materialCategories,
  type VehicleType,
  type NewVehicleType,
  type MaterialCategory,
  type NewMaterialCategory,
} from "@/db/schema";

// --- Vehicle types ----------------------------------------------------

export async function listVehicleTypes({ onlyActive = false } = {}): Promise<VehicleType[]> {
  const rows = await db.select().from(vehicleTypes).orderBy(asc(vehicleTypes.sortOrder));
  return onlyActive ? rows.filter((v) => v.active) : rows;
}

export async function createVehicleType(
  data: Omit<NewVehicleType, "id" | "createdAt" | "updatedAt">
): Promise<VehicleType> {
  const [row] = await db.insert(vehicleTypes).values(data).returning();
  return row;
}

export async function updateVehicleType(
  id: string,
  data: Partial<Omit<NewVehicleType, "id" | "createdAt" | "updatedAt">>
): Promise<VehicleType> {
  const [row] = await db
    .update(vehicleTypes)
    .set({ ...data, updatedAt: new Date() })
    .where(eq(vehicleTypes.id, id))
    .returning();
  return row;
}

export async function deleteVehicleType(id: string): Promise<void> {
  await db.delete(vehicleTypes).where(eq(vehicleTypes.id, id));
}

// --- Material categories ------------------------------------------------

export async function listMaterialCategories({ onlyActive = false } = {}): Promise<MaterialCategory[]> {
  const rows = await db.select().from(materialCategories).orderBy(asc(materialCategories.sortOrder));
  return onlyActive ? rows.filter((m) => m.active) : rows;
}

export async function createMaterialCategory(
  data: Omit<NewMaterialCategory, "id" | "createdAt" | "updatedAt">
): Promise<MaterialCategory> {
  const [row] = await db.insert(materialCategories).values(data).returning();
  return row;
}

export async function updateMaterialCategory(
  id: string,
  data: Partial<Omit<NewMaterialCategory, "id" | "createdAt" | "updatedAt">>
): Promise<MaterialCategory> {
  const [row] = await db
    .update(materialCategories)
    .set({ ...data, updatedAt: new Date() })
    .where(eq(materialCategories.id, id))
    .returning();
  return row;
}

export async function deleteMaterialCategory(id: string): Promise<void> {
  await db.delete(materialCategories).where(eq(materialCategories.id, id));
}
