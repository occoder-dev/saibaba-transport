import { NextRequest, NextResponse } from "next/server";
import type { TrackResult } from "@/lib/tracking";

export const runtime = "nodejs";

// The CRM's tracking endpoint. Documented with a backslash in the usage
// guide, but the sample .NET code (and every real HTTP client) uses a
// normal forward-slash URL.
const TRACKING_ENDPOINTS = [
  "https://crm.saibabat.com/API_Tracking.aspx",
  "http://crm.saibabat.com/API_Tracking.aspx",
];

const LR_NUMBER_PATTERN = /^[A-Za-z0-9/-]{3,25}$/;

/**
 * Server-side proxy for Sai Baba Transport's "Get LR Tracking" API.
 * Proxied through our own route so we can:
 *  - avoid a browser-side CORS/mixed-content failure (the CRM is on plain
 *    http, our site is served over https),
 *  - keep the raw CRM host out of client-side network calls,
 *  - normalize a handful of inconsistent response shapes into one contract.
 */
export async function GET(req: NextRequest) {
  const lrNo = req.nextUrl.searchParams.get("lr")?.trim();

  if (!lrNo) {
    return NextResponse.json({ ok: false, error: "Please enter an LR number." }, { status: 400 });
  }

  if (!LR_NUMBER_PATTERN.test(lrNo)) {
    return NextResponse.json(
      { ok: false, error: "That doesn't look like a valid LR number. Please double-check and try again." },
      { status: 400 }
    );
  }

  let lastError: unknown = null;

  for (const endpoint of TRACKING_ENDPOINTS) {
    try {
      const url = `${endpoint}?LRNo=${encodeURIComponent(lrNo)}`;
      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), 12000);

      const res = await fetch(url, {
        cache: "no-store",
        signal: controller.signal,
        headers: { Accept: "application/json, text/plain, */*" },
      });
      clearTimeout(timeout);

      if (!res.ok) {
        throw new Error(`Tracking API responded with ${res.status}`);
      }

      // The API is documented to return JSON, but some ASP.NET endpoints
      // like this one occasionally reply with text/plain or text/html
      // content-type while the body is still valid JSON - so parse the raw
      // text ourselves rather than trusting res.json()'s content-type check.
      const raw = await res.text();
      let data: TrackResult;
      try {
        data = JSON.parse(raw);
      } catch {
        throw new Error("Received an unexpected response from the tracking service.");
      }

      const opStatus = (data?.OpStatus || "").toString();

      if (!opStatus.toUpperCase().startsWith("SUCCEED")) {
        const message = opStatus.replace(/^FAILED:?\s*/i, "").trim();
        return NextResponse.json({
          ok: false,
          error: message || "We couldn't find a shipment with that LR number. Please check the number and try again.",
        });
      }

      return NextResponse.json({
        ok: true,
        data: {
          ...data,
          TrackData: Array.isArray(data.TrackData) ? data.TrackData : [],
          LastLocation: Array.isArray(data.LastLocation) ? data.LastLocation : [],
        },
      });
    } catch (err) {
      lastError = err;
      // Try the next endpoint (https -> http fallback) before giving up.
    }
  }

  console.error("LR tracking lookup failed", lastError);
  return NextResponse.json(
    {
      ok: false,
      error: "We couldn't reach the tracking service right now. Please try again in a moment or contact your branch directly.",
    },
    { status: 502 }
  );
}
