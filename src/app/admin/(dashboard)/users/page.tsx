import type { Metadata } from "next";
import { listUsers } from "@/lib/services/users";
import { requireUser } from "@/lib/auth/current-user";
import { UsersTable } from "./users-table";

export const metadata: Metadata = { title: "Admin Users", robots: { index: false, follow: false } };

export default async function AdminUsersPage() {
  const currentUser = await requireUser("SUPER_ADMIN");
  const users = await listUsers();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-brand-charcoal">Admin Users</h1>
        <p className="text-sm text-muted-foreground">
          Manage who can sign in to the admin panel and what they can access.
        </p>
      </div>
      <UsersTable users={users} currentUserId={currentUser.sub} />
    </div>
  );
}
