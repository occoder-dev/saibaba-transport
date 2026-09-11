import { NextResponse } from "next/server";
import { createEnquiry, type EnquiryType } from "@/lib/services/enquiries";

const VALID_TYPES: EnquiryType[] = ["QUOTE", "PARTNER", "TRANSPORTER", "CONTACT", "CAREER", "REGISTRATION"];

// Standard 15-character GSTIN format, e.g. 24AAAAA0000A1Z5.
const GST_REGEX = /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/;
// Indian mobile numbers: 10 digits, starting 6-9.
const MOBILE_REGEX = /^[6-9]\d{9}$/;

/**
 * Type-specific server-side validation, in addition to the generic payload
 * checks below. Client-side validation (see the register page's form) can
 * always be bypassed by calling this API directly, so the important checks
 * for each form are re-verified here before anything is written to the
 * database.
 */
function validateTypedPayload(type: EnquiryType, payload: Record<string, string>): string | null {
  if (type === "REGISTRATION") {
    const firmName = payload.firmName?.trim() ?? "";
    const gstNumber = payload.gstNumber?.trim().toUpperCase() ?? "";
    const mobile = (payload.mobile ?? "").replace(/\D/g, "");
    const branch = payload.branch?.trim() ?? "";

    if (firmName.length < 2) return "Please enter a valid firm name.";
    if (!GST_REGEX.test(gstNumber)) {
      return "Please enter a valid 15-character GST number (e.g. 24AAAAA0000A1Z5).";
    }
    if (!MOBILE_REGEX.test(mobile)) return "Please enter a valid 10-digit mobile number.";
    if (!branch) return "Please select a branch.";

    // Normalize before storage so the admin panel always sees a clean value
    // regardless of how the client formatted it.
    payload.firmName = firmName;
    payload.gstNumber = gstNumber;
    payload.mobile = mobile;
    payload.branch = branch;
  }

  return null;
}

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid JSON body." }, { status: 400 });
  }

  if (typeof body !== "object" || body === null) {
    return NextResponse.json({ ok: false, error: "Invalid request body." }, { status: 400 });
  }

  const { type, ...rest } = body as Record<string, unknown>;

  if (typeof type !== "string" || !VALID_TYPES.includes(type as EnquiryType)) {
    return NextResponse.json(
      { ok: false, error: `"type" must be one of: ${VALID_TYPES.join(", ")}` },
      { status: 400 }
    );
  }

  // Coerce all remaining fields to strings and drop anything empty, so we
  // store a clean flat payload regardless of which form submitted it. Cap
  // the number of fields and their length as basic abuse protection.
  const payload: Record<string, string> = {};
  for (const [key, value] of Object.entries(rest).slice(0, 40)) {
    if (value === undefined || value === null || value === "") continue;
    payload[key.slice(0, 100)] = String(value).slice(0, 5000);
  }

  if (Object.keys(payload).length === 0) {
    return NextResponse.json({ ok: false, error: "Enquiry payload is empty." }, { status: 400 });
  }

  const validationError = validateTypedPayload(type as EnquiryType, payload);
  if (validationError) {
    return NextResponse.json({ ok: false, error: validationError }, { status: 400 });
  }

  try {
    const enquiry = await createEnquiry({ type: type as EnquiryType, payload });
    return NextResponse.json({ ok: true, id: enquiry.id }, { status: 201 });
  } catch (err) {
    console.error("Failed to create enquiry", err);
    return NextResponse.json({ ok: false, error: "Something went wrong. Please try again." }, { status: 500 });
  }
}
