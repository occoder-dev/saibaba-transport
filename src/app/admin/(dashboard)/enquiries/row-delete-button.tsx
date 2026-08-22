"use client";

import { DeleteButton } from "@/components/admin/crud/delete-button";
import { deleteEnquiryAction } from "./actions";

export function EnquiryRowDeleteButton({ id, name }: { id: string; name?: string }) {
  return <DeleteButton action={() => deleteEnquiryAction(id)} itemLabel={name ?? "this enquiry"} resourceLabel="enquiry" />;
}
