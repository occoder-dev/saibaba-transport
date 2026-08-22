import "server-only";
import { getCurrentUser } from "./current-user";
import { roleAtLeast, type Role, type SessionPayload } from "./session";

export type RoleGuardResult = { ok: true; user: SessionPayload } | { ok: false; error: string };

/**
 * Non-throwing role check for use inside Server Actions. The /admin proxy
 * already blocks unauthenticated access and SUPER_ADMIN-only routes, but
 * actions re-check here so a returned `{ error }` can be shown inline in
 * the calling form/dialog instead of crashing the client transition.
 */
export async function requireRole(minimum: Role): Promise<RoleGuardResult> {
  const user = await getCurrentUser();
  if (!user) {
    return { ok: false, error: "Your session has expired. Please sign in again." };
  }
  if (!roleAtLeast(user.role, minimum)) {
    return { ok: false, error: "You do not have permission to do this." };
  }
  return { ok: true, user };
}
