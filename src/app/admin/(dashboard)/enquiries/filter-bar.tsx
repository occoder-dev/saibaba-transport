"use client";

import { useRouter } from "next/navigation";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import type { EnquiryStatus, EnquiryType } from "@/lib/services/enquiries";

const STATUS_OPTIONS: { value: EnquiryStatus | "ALL"; label: string }[] = [
  { value: "ALL", label: "All statuses" },
  { value: "NEW", label: "New" },
  { value: "IN_PROGRESS", label: "In Progress" },
  { value: "RESOLVED", label: "Resolved" },
  { value: "CLOSED", label: "Closed" },
];

const TYPE_OPTIONS: { value: EnquiryType | "ALL"; label: string }[] = [
  { value: "ALL", label: "All types" },
  { value: "QUOTE", label: "Quote Request" },
  { value: "PARTNER", label: "Partner Enquiry" },
  { value: "TRANSPORTER", label: "Transporter Registration" },
  { value: "CONTACT", label: "Contact Message" },
  { value: "CAREER", label: "Career Application" },
];

export function FilterBar({ status, type }: { status: string; type: string }) {
  const router = useRouter();

  function updateParam(key: "status" | "type", value: string) {
    const params = new URLSearchParams({ status, type });
    if (value === "ALL") {
      params.delete(key);
    } else {
      params.set(key, value);
    }
    if (params.get("status") === "ALL" || !params.get("status")) params.delete("status");
    if (params.get("type") === "ALL" || !params.get("type")) params.delete("type");
    const qs = params.toString();
    router.push(qs ? `/admin/enquiries?${qs}` : "/admin/enquiries");
  }

  return (
    <div className="flex flex-wrap gap-3">
      <Select value={status || "ALL"} onValueChange={(v) => updateParam("status", v)}>
        <SelectTrigger className="w-44">
          <SelectValue placeholder="Status" />
        </SelectTrigger>
        <SelectContent>
          {STATUS_OPTIONS.map((opt) => (
            <SelectItem key={opt.value} value={opt.value}>
              {opt.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Select value={type || "ALL"} onValueChange={(v) => updateParam("type", v)}>
        <SelectTrigger className="w-52">
          <SelectValue placeholder="Type" />
        </SelectTrigger>
        <SelectContent>
          {TYPE_OPTIONS.map((opt) => (
            <SelectItem key={opt.value} value={opt.value}>
              {opt.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
