"use server";

import { redirect } from "next/navigation";
import { getUserByEmail } from "@/lib/services/users";
import { verifyPassword } from "@/lib/auth/password";
import { setSessionCookie, clearSessionCookie } from "@/lib/auth/current-user";

export type LoginState = {
  error?: string;
};

function isSafeNextPath(next: FormDataEntryValue | null): next is string {
  return typeof next === "string" && next.startsWith("/admin") && !next.startsWith("//");
}

export async function loginAction(_prevState: LoginState, formData: FormData): Promise<LoginState> {
  const email = String(formData.get("email") ?? "").trim();
  const password = String(formData.get("password") ?? "");
  const next = formData.get("next");

  if (!email || !password) {
    return { error: "Enter your email and password." };
  }

  const user = await getUserByEmail(email);
  if (!user || !user.active) {
    return { error: "Invalid email or password." };
  }

  const valid = await verifyPassword(password, user.passwordHash);
  if (!valid) {
    return { error: "Invalid email or password." };
  }

  await setSessionCookie({ id: user.id, email: user.email, name: user.name, role: user.role });

  redirect(isSafeNextPath(next) ? next : "/admin");
}

export async function logoutAction(): Promise<void> {
  await clearSessionCookie();
  redirect("/admin/login");
}
