"use client";

import { useTransition } from "react";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import type { Enquiry } from "@/db/schema";
import type { EnquiryStatus } from "@/lib/services/enquiries";
import { updateEnquiryAction } from "../actions";

const STATUS_OPTIONS: { value: EnquiryStatus; label: string }[] = [
  { value: "NEW", label: "New" },
  { value: "IN_PROGRESS", label: "In Progress" },
  { value: "RESOLVED", label: "Resolved" },
  { value: "CLOSED", label: "Closed" },
];

export function EnquiryDetailForm({
  enquiry,
  staff,
}: {
  enquiry: Enquiry;
  staff: { id: string; name: string }[];
}) {
  const [pending, startTransition] = useTransition();

  function handleSubmit(formData: FormData) {
    startTransition(async () => {
      const result = await updateEnquiryAction(formData);
      if (result && "error" in result && result.error) {
        toast.error(result.error);
        return;
      }
      toast.success("Enquiry updated");
    });
  }

  return (
    <form action={handleSubmit} className="space-y-4">
      <input type="hidden" name="id" value={enquiry.id} />

      <div className="space-y-1.5">
        <Label htmlFor="status">Status</Label>
        <Select name="status" defaultValue={enquiry.status}>
          <SelectTrigger id="status" className="w-full">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {STATUS_OPTIONS.map((opt) => (
              <SelectItem key={opt.value} value={opt.value}>
                {opt.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-1.5">
        <Label htmlFor="assignedToUserId">Assigned to</Label>
        <Select name="assignedToUserId" defaultValue={enquiry.assignedToUserId ?? "unassigned"}>
          <SelectTrigger id="assignedToUserId" className="w-full">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="unassigned">Unassigned</SelectItem>
            {staff.map((s) => (
              <SelectItem key={s.id} value={s.id}>
                {s.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-1.5">
        <Label htmlFor="notes">Resolution notes</Label>
        <Textarea
          id="notes"
          name="notes"
          rows={5}
          placeholder="Internal notes on how this was resolved..."
          defaultValue={enquiry.notes ?? ""}
        />
      </div>

      <Button type="submit" disabled={pending} className="w-full">
        {pending ? <Loader2 className="size-4 animate-spin" /> : null}
        Save
      </Button>
    </form>
  );
}
