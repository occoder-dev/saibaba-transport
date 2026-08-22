"use client";

import { Plus, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ResourceFormDialog, type FieldConfig } from "@/components/admin/crud/resource-form-dialog";
import { DeleteButton } from "@/components/admin/crud/delete-button";
import { ActiveToggle } from "@/components/admin/crud/active-toggle";
import type { Branch } from "@/db/schema";
import { createBranchAction, updateBranchAction, deleteBranchAction, toggleBranchActiveAction } from "./actions";

const FIELDS: FieldConfig[] = [
  { type: "text", name: "city", label: "City", required: true, placeholder: "Surat" },
  { type: "text", name: "state", label: "State", required: true, placeholder: "Gujarat" },
  { type: "textarea", name: "address", label: "Address", rows: 2, placeholder: "Full postal address" },
  { type: "text", name: "email", label: "Email", required: true, placeholder: "branch@saibabat.com" },
  {
    type: "lines",
    name: "phones",
    label: "Phone numbers",
    required: true,
    rows: 3,
    placeholder: "9033470451\n8866969284",
    hint: "One phone number per line.",
  },
  {
    type: "lines",
    name: "services",
    label: "Services offered here",
    rows: 3,
    placeholder: "Full Truck Load\nPart Truck Load",
    hint: "Optional - one per line.",
  },
  { type: "number", name: "sortOrder", label: "Sort order", placeholder: "0" },
  { type: "switch", name: "isHeadOffice", label: "Head office" },
];

export function BranchesTable({ branches }: { branches: Branch[] }) {
  return (
    <div className="space-y-4">
      <div className="flex justify-end">
        <ResourceFormDialog
          trigger={
            <Button>
              <Plus className="size-4" /> Add Branch
            </Button>
          }
          title="Add Branch"
          fields={FIELDS}
          action={createBranchAction}
          submitLabel="Create Branch"
        />
      </div>

      <div className="overflow-hidden rounded-xl border border-border bg-card">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>City / State</TableHead>
              <TableHead>Phones</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Active</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {branches.map((branch) => (
              <TableRow key={branch.id}>
                <TableCell>
                  <div className="flex items-center gap-1.5 font-medium text-brand-charcoal">
                    {branch.isHeadOffice ? <Star className="size-3.5 fill-primary text-primary" /> : null}
                    {branch.city}
                  </div>
                  <div className="text-xs text-muted-foreground">{branch.state}</div>
                </TableCell>
                <TableCell>
                  <div className="flex flex-wrap gap-1">
                    {branch.phones.slice(0, 2).map((p) => (
                      <Badge key={p} variant="outline">
                        {p}
                      </Badge>
                    ))}
                    {branch.phones.length > 2 ? (
                      <Badge variant="outline">+{branch.phones.length - 2}</Badge>
                    ) : null}
                  </div>
                </TableCell>
                <TableCell className="text-muted-foreground">{branch.email}</TableCell>
                <TableCell>
                  <ActiveToggle
                    active={branch.active}
                    action={(next) => toggleBranchActiveAction(branch.id, next)}
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
                      title={`Edit ${branch.city}`}
                      fields={[{ type: "hidden", name: "id" }, ...FIELDS]}
                      defaultValues={{ ...branch, id: branch.id, address: branch.address ?? "" }}
                      action={updateBranchAction}
                      submitLabel="Save Changes"
                    />
                    <DeleteButton
                      action={() => deleteBranchAction(branch.id)}
                      itemLabel={`${branch.city} branch`}
                      resourceLabel="branch"
                    />
                  </div>
                </TableCell>
              </TableRow>
            ))}
            {branches.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} className="py-8 text-center text-muted-foreground">
                  No branches yet.
                </TableCell>
              </TableRow>
            ) : null}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
