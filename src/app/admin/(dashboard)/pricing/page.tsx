import type { Metadata } from "next";
import { listVehicleTypes, listMaterialCategories } from "@/lib/services/pricing";
import { PricingTable } from "./pricing-table";

export const metadata: Metadata = { title: "Pricing & Estimator", robots: { index: false, follow: false } };

export default async function AdminPricingPage() {
  const [vehicleTypes, materialCategories] = await Promise.all([listVehicleTypes(), listMaterialCategories()]);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-brand-charcoal">Pricing & Estimator</h1>
        <p className="text-sm text-muted-foreground">
          Manage the vehicle rates and material multipliers used by the public transport cost estimator.
        </p>
      </div>
      <PricingTable vehicleTypes={vehicleTypes} materialCategories={materialCategories} />
    </div>
  );
}
