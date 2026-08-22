import { NextResponse } from "next/server";
import { createEnquiry, type EnquiryType } from "@/lib/services/enquiries";

const VALID_TYPES: EnquiryType[] = ["QUOTE", "PARTNER", "TRANSPORTER", "CONTACT", "CAREER"];

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

  try {
    const enquiry = await createEnquiry({ type: type as EnquiryType, payload });
    return NextResponse.json({ ok: true, id: enquiry.id }, { status: 201 });
  } catch (err) {
    console.error("Failed to create enquiry", err);
    return NextResponse.json({ ok: false, error: "Something went wrong. Please try again." }, { status: 500 });
  }
}
