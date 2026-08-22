import { NextResponse } from "next/server";
import { listVehicleTypes, listMaterialCategories } from "@/lib/services/pricing";

export async function GET() {
  try {
    const [vehicles, materials] = await Promise.all([
      listVehicleTypes({ onlyActive: true }),
      listMaterialCategories({ onlyActive: true }),
    ]);

    return NextResponse.json(
      {
        ok: true,
        vehicleTypes: vehicles.map((v) => ({
          name: v.name,
          perKmRate: Number(v.perKmRate),
          baseFare: Number(v.baseFare),
          capacityTons: Number(v.capacityTons),
        })),
        materialCategories: materials.map((m) => ({
          name: m.name,
          multiplier: Number(m.multiplier),
        })),
      },
      { headers: { "Cache-Control": "public, max-age=60, stale-while-revalidate=300" } }
    );
  } catch (err) {
    console.error("Failed to load pricing", err);
    return NextResponse.json({ ok: false, error: "Failed to load pricing." }, { status: 500 });
  }
}
