"use server";

import { revalidatePath } from "next/cache";
import { requireRole } from "@/lib/auth/guard";
import { getCurrentUser } from "@/lib/auth/current-user";
import { createUser, updateUser, deleteUser, getUserByEmail } from "@/lib/services/users";
import type { Role } from "@/lib/auth/session";

const VALID_ROLES: Role[] = ["SUPER_ADMIN", "ADMIN", "STAFF"];

function revalidateUserPaths() {
  revalidatePath("/admin/users");
}

export async function createUserAction(formData: FormData) {
  const guard = await requireRole("SUPER_ADMIN");
  if (!guard.ok) return { error: guard.error };

  const name = String(formData.get("name") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim().toLowerCase();
  const password = String(formData.get("password") ?? "");
  const role = String(formData.get("role") ?? "STAFF");

  if (!name || !email) return { error: "Name and email are required." };
  if (!VALID_ROLES.includes(role as Role)) return { error: "Invalid role." };
  if (password.length < 8) return { error: "Password must be at least 8 characters." };

  const existing = await getUserByEmail(email);
  if (existing) return { error: "A user with this email already exists." };

  try {
    await createUser({ name, email, password, role: role as Role });
  } catch (err) {
    console.error("Failed to create user", err);
    return { error: "Failed to create user." };
  }
  revalidateUserPaths();
}

export async function updateUserAction(formData: FormData) {
  const guard = await requireRole("SUPER_ADMIN");
  if (!guard.ok) return { error: guard.error };

  const id = String(formData.get("id") ?? "");
  if (!id) return { error: "Missing user id." };

  const name = String(formData.get("name") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim().toLowerCase();
  const password = String(formData.get("password") ?? "");
  const role = String(formData.get("role") ?? "STAFF");

  if (!name || !email) return { error: "Name and email are required." };
  if (!VALID_ROLES.includes(role as Role)) return { error: "Invalid role." };
  if (password && password.length < 8) return { error: "Password must be at least 8 characters." };

  if (id === guard.user.sub && role !== "SUPER_ADMIN") {
    return { error: "You cannot demote your own account." };
  }

  try {
    await updateUser(id, { name, email, role: role as Role, password: password || undefined });
  } catch (err) {
    console.error("Failed to update user", err);
    return { error: "Failed to update user - the email may already be in use." };
  }
  revalidateUserPaths();
}

export async function deleteUserAction(id: string) {
  const guard = await requireRole("SUPER_ADMIN");
  if (!guard.ok) return { error: guard.error };

  if (id === guard.user.sub) {
    return { error: "You cannot delete your own account." };
  }

  try {
    await deleteUser(id);
  } catch (err) {
    console.error("Failed to delete user", err);
    return { error: "Failed to delete user." };
  }
  revalidateUserPaths();
}

export async function toggleUserActiveAction(id: string, active: boolean) {
  const guard = await requireRole("SUPER_ADMIN");
  if (!guard.ok) return { error: guard.error };

  const currentUser = await getCurrentUser();
  if (id === currentUser?.sub && !active) {
    return { error: "You cannot deactivate your own account." };
  }

  try {
    await updateUser(id, { active });
  } catch (err) {
    console.error("Failed to update user", err);
    return { error: "Failed to update user." };
  }
  revalidateUserPaths();
}
