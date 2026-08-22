import "server-only";
import { asc, eq } from "drizzle-orm";
import { db } from "@/db";
import { users, type User, type NewUser } from "@/db/schema";
import { hashPassword } from "@/lib/auth/password";

export async function listUsers(): Promise<Omit<User, "passwordHash">[]> {
  const rows = await db.select().from(users).orderBy(asc(users.createdAt));
  return rows.map(({ passwordHash: _passwordHash, ...rest }) => rest);
}

export async function getUserByEmail(email: string): Promise<User | undefined> {
  const [row] = await db.select().from(users).where(eq(users.email, email.toLowerCase().trim()));
  return row;
}

export async function getUser(id: string): Promise<User | undefined> {
  const [row] = await db.select().from(users).where(eq(users.id, id));
  return row;
}

export async function createUser(data: {
  name: string;
  email: string;
  password: string;
  role: User["role"];
}): Promise<Omit<User, "passwordHash">> {
  const passwordHash = await hashPassword(data.password);
  const [row] = await db
    .insert(users)
    .values({
      name: data.name,
      email: data.email.toLowerCase().trim(),
      passwordHash,
      role: data.role,
    })
    .returning();
  const { passwordHash: _passwordHash, ...rest } = row;
  return rest;
}

export async function updateUser(
  id: string,
  data: Partial<{ name: string; email: string; role: User["role"]; active: boolean; password: string }>
): Promise<Omit<User, "passwordHash">> {
  const patch: Partial<NewUser> = { updatedAt: new Date() };
  if (data.name !== undefined) patch.name = data.name;
  if (data.email !== undefined) patch.email = data.email.toLowerCase().trim();
  if (data.role !== undefined) patch.role = data.role;
  if (data.active !== undefined) patch.active = data.active;
  if (data.password) patch.passwordHash = await hashPassword(data.password);

  const [row] = await db.update(users).set(patch).where(eq(users.id, id)).returning();
  const { passwordHash: _passwordHash, ...rest } = row;
  return rest;
}

export async function deleteUser(id: string): Promise<void> {
  await db.delete(users).where(eq(users.id, id));
}
