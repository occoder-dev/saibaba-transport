"use client";

import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ResourceFormDialog, type FieldConfig } from "@/components/admin/crud/resource-form-dialog";
import { DeleteButton } from "@/components/admin/crud/delete-button";
import { ActiveToggle } from "@/components/admin/crud/active-toggle";
import type { User } from "@/db/schema";
import { createUserAction, updateUserAction, deleteUserAction, toggleUserActiveAction } from "./actions";

const ROLE_OPTIONS = [
  { value: "STAFF", label: "Staff" },
  { value: "ADMIN", label: "Admin" },
  { value: "SUPER_ADMIN", label: "Super Admin" },
];

const CREATE_FIELDS: FieldConfig[] = [
  { type: "text", name: "name", label: "Full name", required: true },
  { type: "email", name: "email", label: "Email", required: true, placeholder: "name@saibabat.com" },
  { type: "password", name: "password", label: "Password", required: true, placeholder: "At least 8 characters" },
  { type: "select", name: "role", label: "Role", options: ROLE_OPTIONS, required: true },
];

const EDIT_FIELDS: FieldConfig[] = [
  { type: "text", name: "name", label: "Full name", required: true },
  { type: "email", name: "email", label: "Email", required: true },
  { type: "password", name: "password", label: "New password", placeholder: "Leave blank to keep current password" },
  { type: "select", name: "role", label: "Role", options: ROLE_OPTIONS, required: true },
];

const ROLE_BADGE_LABEL: Record<string, string> = { SUPER_ADMIN: "Super Admin", ADMIN: "Admin", STAFF: "Staff" };

export function UsersTable({
  users,
  currentUserId,
}: {
  users: Omit<User, "passwordHash">[];
  currentUserId: string;
}) {
  return (
    <div className="space-y-4">
      <div className="flex justify-end">
        <ResourceFormDialog
          trigger={
            <Button>
              <Plus className="size-4" /> Add User
            </Button>
          }
          title="Add Admin User"
          description="They will be able to sign in to the admin panel with this email and password."
          fields={CREATE_FIELDS}
          action={createUserAction}
          submitLabel="Create User"
        />
      </div>

      <div className="overflow-hidden rounded-xl border border-border bg-card">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Active</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user.id}>
                <TableCell className="font-medium text-brand-charcoal">
                  {user.name}
                  {user.id === currentUserId ? <span className="ml-1.5 text-xs text-muted-foreground">(you)</span> : null}
                </TableCell>
                <TableCell className="text-muted-foreground">{user.email}</TableCell>
                <TableCell>
                  <Badge variant="secondary">{ROLE_BADGE_LABEL[user.role] ?? user.role}</Badge>
                </TableCell>
                <TableCell>
                  <ActiveToggle
                    active={user.active}
                    action={(next) => toggleUserActiveAction(user.id, next)}
                  />
                </TableCell>
                <TableCell>
                  <div className="flex items-center justify-end gap-1">
                    <ResourceFormDialog
                      trigger={
                        <Button variant="ghost" size="sm">
                          Edit
                        </Button>
                      }
                      title={`Edit ${user.name}`}
                      fields={[{ type: "hidden", name: "id" }, ...EDIT_FIELDS]}
                      defaultValues={{ ...user, id: user.id, password: "" }}
                      action={updateUserAction}
                      submitLabel="Save Changes"
                    />
                    {user.id !== currentUserId ? (
                      <DeleteButton
                        action={() => deleteUserAction(user.id)}
                        itemLabel={user.name}
                        resourceLabel="user"
                      />
                    ) : null}
                  </div>
                </TableCell>
              </TableRow>
            ))}
            {users.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} className="py-8 text-center text-muted-foreground">
                  No admin users yet.
                </TableCell>
              </TableRow>
            ) : null}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
