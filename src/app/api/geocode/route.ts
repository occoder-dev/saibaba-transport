import { NextRequest, NextResponse } from "next/server";

export const runtime = "nodejs";

type NominatimResult = {
  display_name?: string;
  lat?: string;
  lon?: string;
};

/**
 * Free location search, backed by OpenStreetMap's Nominatim API.
 * Proxied through our own server route so we can set a proper User-Agent
 * (required by Nominatim's usage policy) and keep the API key-free lookup
 * off the client.
 */
export async function GET(req: NextRequest) {
  const q = req.nextUrl.searchParams.get("q")?.trim();

  if (!q || q.length < 3) {
    return NextResponse.json({ ok: true, results: [] });
  }

  try {
    const url = new URL("https://nominatim.openstreetmap.org/search");
    url.searchParams.set("format", "jsonv2");
    url.searchParams.set("q", q);
    url.searchParams.set("countrycodes", "in");
    url.searchParams.set("limit", "6");
    url.searchParams.set("addressdetails", "0");

    const res = await fetch(url, {
      headers: {
        "User-Agent": "Sai BabaTransportWebsite/1.0 (+saibabatpt23@gmail.com)",
        "Accept-Language": "en",
      },
      // Nominatim asks integrators to be light on requests; short-lived
      // caching keeps repeated searches for the same place near-instant.
      next: { revalidate: 3600 },
    });

    if (!res.ok) {
      throw new Error(`Nominatim responded with ${res.status}`);
    }

    const data = (await res.json()) as NominatimResult[];

    const results = (Array.isArray(data) ? data : [])
      .filter((item) => item.display_name && item.lat && item.lon)
      .map((item) => ({
        label: item.display_name as string,
        lat: Number(item.lat),
        lon: Number(item.lon),
      }));

    return NextResponse.json({ ok: true, results });
  } catch (err) {
    console.error("Geocode lookup failed", err);
    // Fail soft - the caller just shows no suggestions rather than an error.
    return NextResponse.json({ ok: false, results: [] });
  }
}
