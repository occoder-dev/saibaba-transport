import "server-only";
import { cookies } from "next/headers";
import {
  SESSION_COOKIE_NAME,
  SESSION_MAX_AGE_SECONDS,
  createSessionToken,
  verifySessionToken,
  type Role,
  type SessionPayload,
} from "./session";

/** Set the signed session cookie for a freshly logged-in user. */
export async function setSessionCookie(user: { id: string; email: string; name: string; role: Role }) {
  const token = await createSessionToken(user);
  const store = await cookies();
  store.set(SESSION_COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: SESSION_MAX_AGE_SECONDS,
  });
}

export async function clearSessionCookie() {
  const store = await cookies();
  store.delete(SESSION_COOKIE_NAME);
}

/** Read and verify the current request's session, if any. */
export async function getCurrentUser(): Promise<SessionPayload | null> {
  const store = await cookies();
  const token = store.get(SESSION_COOKIE_NAME)?.value;
  return verifySessionToken(token);
}

/** Throws-free helper for Server Actions/pages that require a logged-in admin. */
export async function requireUser(minimumRole?: Role): Promise<SessionPayload> {
  const user = await getCurrentUser();
  if (!user) {
    throw new Error("UNAUTHENTICATED");
  }
  if (minimumRole) {
    const order: Role[] = ["STAFF", "ADMIN", "SUPER_ADMIN"];
    if (order.indexOf(user.role) < order.indexOf(minimumRole)) {
      throw new Error("FORBIDDEN");
    }
  }
  return user;
}
