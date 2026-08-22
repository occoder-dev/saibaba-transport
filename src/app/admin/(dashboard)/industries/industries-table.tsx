"use client";

import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ResourceFormDialog, type FieldConfig } from "@/components/admin/crud/resource-form-dialog";
import { DeleteButton } from "@/components/admin/crud/delete-button";
import { ActiveToggle } from "@/components/admin/crud/active-toggle";
import type { Industry } from "@/db/schema";
import {
  createIndustryAction,
  updateIndustryAction,
  deleteIndustryAction,
  toggleIndustryActiveAction,
} from "./actions";

const FIELDS: FieldConfig[] = [
  { type: "text", name: "name", label: "Name", required: true, placeholder: "Textile" },
  { type: "textarea", name: "description", label: "Description", required: true, rows: 3 },
  { type: "text", name: "icon", label: "Icon name", placeholder: "Shirt (a lucide-react icon name)" },
  { type: "number", name: "sortOrder", label: "Sort order", placeholder: "0" },
];

export function IndustriesTable({ industries }: { industries: Industry[] }) {
  return (
    <div className="space-y-4">
      <div className="flex justify-end">
        <ResourceFormDialog
          trigger={
            <Button>
              <Plus className="size-4" /> Add Industry
            </Button>
          }
          title="Add Industry"
          fields={FIELDS}
          action={createIndustryAction}
          submitLabel="Create Industry"
        />
      </div>

      <div className="overflow-hidden rounded-xl border border-border bg-card">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Description</TableHead>
              <TableHead>Active</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {industries.map((industry) => (
              <TableRow key={industry.id}>
                <TableCell className="font-medium text-brand-charcoal">{industry.name}</TableCell>
                <TableCell className="max-w-md truncate text-muted-foreground">{industry.description}</TableCell>
                <TableCell>
                  <ActiveToggle
                    active={industry.active}
                    action={(next) => toggleIndustryActiveAction(industry.id, next)}
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
                      title={`Edit ${industry.name}`}
                      fields={[{ type: "hidden", name: "id" }, ...FIELDS]}
                      defaultValues={{ ...industry, id: industry.id }}
                      action={updateIndustryAction}
                      submitLabel="Save Changes"
                    />
                    <DeleteButton
                      action={() => deleteIndustryAction(industry.id)}
                      itemLabel={industry.name}
                      resourceLabel="industry"
                    />
                  </div>
                </TableCell>
              </TableRow>
            ))}
            {industries.length === 0 ? (
              <TableRow>
                <TableCell colSpan={4} className="py-8 text-center text-muted-foreground">
                  No industries yet.
                </TableCell>
              </TableRow>
            ) : null}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
