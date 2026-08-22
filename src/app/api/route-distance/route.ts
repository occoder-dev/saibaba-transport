import { NextRequest, NextResponse } from "next/server";

export const runtime = "nodejs";

function haversineKm(lat1: number, lon1: number, lat2: number, lon2: number) {
  const R = 6371;
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos((lat1 * Math.PI) / 180) *
    Math.cos((lat2 * Math.PI) / 180) *
    Math.sin(dLon / 2) ** 2;
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

/**
 * Approximate road distance between a pickup and drop point, using the free
 * public OSRM routing API. Falls back to a padded straight-line (haversine)
 * distance if OSRM is unreachable, so the estimate calculator always gets a
 * usable number.
 */
export async function GET(req: NextRequest) {
  const params = req.nextUrl.searchParams;
  const pickupLat = Number(params.get("pickupLat"));
  const pickupLon = Number(params.get("pickupLon"));
  const dropLat = Number(params.get("dropLat"));
  const dropLon = Number(params.get("dropLon"));

  if ([pickupLat, pickupLon, dropLat, dropLon].some((n) => Number.isNaN(n))) {
    return NextResponse.json(
      { ok: false, error: "Missing or invalid coordinates." },
      { status: 400 }
    );
  }

  try {
    const url = `https://router.project-osrm.org/route/v1/driving/${pickupLon},${pickupLat};${dropLon},${dropLat}?overview=false`;
    const res = await fetch(url, { next: { revalidate: 3600 } });
    if (!res.ok) throw new Error(`OSRM responded with ${res.status}`);

    const data = await res.json();
    const meters = data?.routes?.[0]?.distance;

    if (typeof meters === "number" && meters > 0) {
      return NextResponse.json({
        ok: true,
        distanceKm: Math.max(1, Math.round(meters / 1000)),
        source: "road",
      });
    }
    throw new Error("No route returned");
  } catch (err) {
    console.error("Route distance lookup failed, using straight-line estimate", err);
    const straight = haversineKm(pickupLat, pickupLon, dropLat, dropLon);
    // Roads are never perfectly straight - pad for a more realistic estimate.
    const approx = Math.max(1, Math.round(straight * 1.3));
    return NextResponse.json({ ok: true, distanceKm: approx, source: "estimated" });
  }
}
