"use client";

import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ResourceFormDialog, type FieldConfig } from "@/components/admin/crud/resource-form-dialog";
import { DeleteButton } from "@/components/admin/crud/delete-button";
import { ActiveToggle } from "@/components/admin/crud/active-toggle";
import type { VehicleType, MaterialCategory } from "@/db/schema";
import {
  createVehicleTypeAction,
  updateVehicleTypeAction,
  deleteVehicleTypeAction,
  toggleVehicleTypeActiveAction,
  createMaterialCategoryAction,
  updateMaterialCategoryAction,
  deleteMaterialCategoryAction,
  toggleMaterialCategoryActiveAction,
} from "./actions";

const VEHICLE_FIELDS: FieldConfig[] = [
  { type: "text", name: "name", label: "Vehicle type name", required: true, placeholder: "17-ft Truck" },
  { type: "number", name: "perKmRate", label: "Rate per km (₹)", required: true, step: "0.01", min: "0" },
  { type: "number", name: "baseFare", label: "Base fare (₹)", required: true, step: "0.01", min: "0" },
  { type: "number", name: "capacityTons", label: "Capacity (tons)", required: true, step: "0.1", min: "0" },
  { type: "number", name: "sortOrder", label: "Sort order", placeholder: "0" },
];

const MATERIAL_FIELDS: FieldConfig[] = [
  { type: "text", name: "name", label: "Material category name", required: true, placeholder: "Textile / Fabric / Garments" },
  {
    type: "number",
    name: "multiplier",
    label: "Price multiplier",
    required: true,
    step: "0.01",
    min: "0",
    placeholder: "1.00",
  },
  { type: "number", name: "sortOrder", label: "Sort order", placeholder: "0" },
];

export function PricingTable({
  vehicleTypes,
  materialCategories,
}: {
  vehicleTypes: VehicleType[];
  materialCategories: MaterialCategory[];
}) {
  return (
    <Tabs defaultValue="vehicles">
      <TabsList>
        <TabsTrigger value="vehicles">Vehicle Types</TabsTrigger>
        <TabsTrigger value="materials">Material Categories</TabsTrigger>
      </TabsList>

      <TabsContent value="vehicles" className="space-y-4">
        <div className="flex justify-end">
          <ResourceFormDialog
            trigger={
              <Button>
                <Plus className="size-4" /> Add Vehicle Type
              </Button>
            }
            title="Add Vehicle Type"
            fields={VEHICLE_FIELDS}
            action={createVehicleTypeAction}
            submitLabel="Create"
          />
        </div>
        <div className="overflow-hidden rounded-xl border border-border bg-card">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Vehicle Type</TableHead>
                <TableHead>Rate / km</TableHead>
                <TableHead>Base Fare</TableHead>
                <TableHead>Capacity</TableHead>
                <TableHead>Active</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {vehicleTypes.map((v) => (
                <TableRow key={v.id}>
                  <TableCell className="font-medium text-brand-charcoal">{v.name}</TableCell>
                  <TableCell className="text-muted-foreground">₹{Number(v.perKmRate).toFixed(2)}</TableCell>
                  <TableCell className="text-muted-foreground">₹{Number(v.baseFare).toFixed(2)}</TableCell>
                  <TableCell className="text-muted-foreground">{Number(v.capacityTons)}t</TableCell>
                  <TableCell>
                    <ActiveToggle active={v.active} action={(next) => toggleVehicleTypeActiveAction(v.id, next)} />
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center justify-end gap-1">
                      <ResourceFormDialog
                        trigger={
                          <Button variant="ghost" size="sm">
                            Edit
                          </Button>
                        }
                        title={`Edit ${v.name}`}
                        fields={[{ type: "hidden", name: "id" }, ...VEHICLE_FIELDS]}
                        defaultValues={{ ...v, id: v.id }}
                        action={updateVehicleTypeAction}
                        submitLabel="Save Changes"
                      />
                      <DeleteButton
                        action={() => deleteVehicleTypeAction(v.id)}
                        itemLabel={v.name}
                        resourceLabel="vehicle type"
                      />
                    </div>
                  </TableCell>
                </TableRow>
              ))}
              {vehicleTypes.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="py-8 text-center text-muted-foreground">
                    No vehicle types yet.
                  </TableCell>
                </TableRow>
              ) : null}
            </TableBody>
          </Table>
        </div>
      </TabsContent>

      <TabsContent value="materials" className="space-y-4">
        <div className="flex justify-end">
          <ResourceFormDialog
            trigger={
              <Button>
                <Plus className="size-4" /> Add Material Category
              </Button>
            }
            title="Add Material Category"
            fields={MATERIAL_FIELDS}
            action={createMaterialCategoryAction}
            submitLabel="Create"
          />
        </div>
        <div className="overflow-hidden rounded-xl border border-border bg-card">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Material Category</TableHead>
                <TableHead>Multiplier</TableHead>
                <TableHead>Active</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {materialCategories.map((m) => (
                <TableRow key={m.id}>
                  <TableCell className="font-medium text-brand-charcoal">{m.name}</TableCell>
                  <TableCell className="text-muted-foreground">×{Number(m.multiplier).toFixed(2)}</TableCell>
                  <TableCell>
                    <ActiveToggle
                      active={m.active}
                      action={(next) => toggleMaterialCategoryActiveAction(m.id, next)}
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
                        title={`Edit ${m.name}`}
                        fields={[{ type: "hidden", name: "id" }, ...MATERIAL_FIELDS]}
                        defaultValues={{ ...m, id: m.id }}
                        action={updateMaterialCategoryAction}
                        submitLabel="Save Changes"
                      />
                      <DeleteButton
                        action={() => deleteMaterialCategoryAction(m.id)}
                        itemLabel={m.name}
                        resourceLabel="material category"
                      />
                    </div>
                  </TableCell>
                </TableRow>
              ))}
              {materialCategories.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={4} className="py-8 text-center text-muted-foreground">
                    No material categories yet.
                  </TableCell>
                </TableRow>
              ) : null}
            </TableBody>
          </Table>
        </div>
      </TabsContent>
    </Tabs>
  );
}
