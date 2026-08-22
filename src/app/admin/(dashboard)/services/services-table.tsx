"use client";

import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ResourceFormDialog, type FieldConfig } from "@/components/admin/crud/resource-form-dialog";
import { DeleteButton } from "@/components/admin/crud/delete-button";
import { ActiveToggle } from "@/components/admin/crud/active-toggle";
import type { Service } from "@/db/schema";
import { createServiceAction, updateServiceAction, deleteServiceAction, toggleServiceActiveAction } from "./actions";

const FIELDS: FieldConfig[] = [
  { type: "text", name: "name", label: "Name", required: true, placeholder: "Full Truck Load (FTL)" },
  {
    type: "text",
    name: "slug",
    label: "URL slug",
    placeholder: "full-truck-load (auto-generated from name if left blank)",
  },
  { type: "textarea", name: "short", label: "Short description", required: true, rows: 2 },
  { type: "textarea", name: "description", label: "Full description", required: true, rows: 4 },
  { type: "text", name: "icon", label: "Icon name", placeholder: "Truck (a lucide-react icon name)" },
  {
    type: "lines",
    name: "points",
    label: "Highlight points",
    rows: 4,
    placeholder: "Dedicated vehicle, no sharing\nFaster point-to-point transit",
    hint: "One point per line, shown as a checklist.",
  },
  { type: "number", name: "sortOrder", label: "Sort order", placeholder: "0" },
];

export function ServicesTable({ services }: { services: Service[] }) {
  return (
    <div className="space-y-4">
      <div className="flex justify-end">
        <ResourceFormDialog
          trigger={
            <Button>
              <Plus className="size-4" /> Add Service
            </Button>
          }
          title="Add Service"
          fields={FIELDS}
          action={createServiceAction}
          submitLabel="Create Service"
        />
      </div>

      <div className="overflow-hidden rounded-xl border border-border bg-card">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Slug</TableHead>
              <TableHead>Sort</TableHead>
              <TableHead>Active</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {services.map((service) => (
              <TableRow key={service.id}>
                <TableCell className="font-medium text-brand-charcoal">{service.name}</TableCell>
                <TableCell className="text-muted-foreground">/{service.slug}</TableCell>
                <TableCell className="text-muted-foreground">{service.sortOrder}</TableCell>
                <TableCell>
                  <ActiveToggle
                    active={service.active}
                    action={(next) => toggleServiceActiveAction(service.id, next)}
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
                      title={`Edit ${service.name}`}
                      fields={[{ type: "hidden", name: "id" }, ...FIELDS]}
                      defaultValues={{ ...service, id: service.id }}
                      action={updateServiceAction}
                      submitLabel="Save Changes"
                    />
                    <DeleteButton
                      action={() => deleteServiceAction(service.id)}
                      itemLabel={service.name}
                      resourceLabel="service"
                    />
                  </div>
                </TableCell>
              </TableRow>
            ))}
            {services.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} className="py-8 text-center text-muted-foreground">
                  No services yet.
                </TableCell>
              </TableRow>
            ) : null}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
