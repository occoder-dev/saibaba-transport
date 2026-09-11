import type { Metadata } from "next";
import Link from "next/link";
import { listEnquiries, type EnquiryStatus, type EnquiryType } from "@/lib/services/enquiries";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { FilterBar } from "./filter-bar";
import { EnquiryRowDeleteButton } from "./row-delete-button";

export const metadata: Metadata = { title: "Enquiries & Support", robots: { index: false, follow: false } };

const TYPE_LABEL: Record<EnquiryType, string> = {
  QUOTE: "Quote Request",
  PARTNER: "Partner Enquiry",
  TRANSPORTER: "Transporter Registration",
  CONTACT: "Contact Message",
  CAREER: "Career Application",
  REGISTRATION: "Customer Registration",
};

const STATUS_VARIANT: Record<EnquiryStatus, "default" | "secondary" | "outline"> = {
  NEW: "default",
  IN_PROGRESS: "secondary",
  RESOLVED: "outline",
  CLOSED: "outline",
};

const VALID_STATUSES: EnquiryStatus[] = ["NEW", "IN_PROGRESS", "RESOLVED", "CLOSED"];
const VALID_TYPES: EnquiryType[] = ["QUOTE", "PARTNER", "TRANSPORTER", "CONTACT", "CAREER", "REGISTRATION"];

function firstPayloadValue(payload: Record<string, string>, keys: string[]): string | undefined {
  for (const key of keys) {
    if (payload[key]) return payload[key];
  }
  return undefined;
}

export default async function AdminEnquiriesPage({ searchParams }: PageProps<"/admin/enquiries">) {
  const params = await searchParams;
  const statusParam = typeof params?.status === "string" ? params.status : "";
  const typeParam = typeof params?.type === "string" ? params.type : "";

  const status = VALID_STATUSES.includes(statusParam as EnquiryStatus) ? (statusParam as EnquiryStatus) : undefined;
  const type = VALID_TYPES.includes(typeParam as EnquiryType) ? (typeParam as EnquiryType) : undefined;

  const enquiries = await listEnquiries({ status, type });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-brand-charcoal">Enquiries & Support</h1>
        <p className="text-sm text-muted-foreground">
          All quote requests, partner enquiries, transporter signups, customer registrations, contact messages and
          career applications from the website.
        </p>
      </div>

      <FilterBar status={statusParam} type={typeParam} />

      <div className="overflow-hidden rounded-xl border border-border bg-card">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>From</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Received</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {enquiries.map((enquiry) => {
              const name = firstPayloadValue(enquiry.payload, [
                "name",
                "fullName",
                "contactName",
                "companyName",
                "firmName",
              ]);
              const contact = firstPayloadValue(enquiry.payload, ["phone", "mobile", "email"]);
              return (
                <TableRow key={enquiry.id}>
                  <TableCell>
                    <Link href={`/admin/enquiries/${enquiry.id}`} className="font-medium text-brand-charcoal hover:text-primary">
                      {name ?? "Website visitor"}
                    </Link>
                    {contact ? <div className="text-xs text-muted-foreground">{contact}</div> : null}
                  </TableCell>
                  <TableCell className="text-muted-foreground">{TYPE_LABEL[enquiry.type]}</TableCell>
                  <TableCell className="text-muted-foreground">
                    {new Date(enquiry.createdAt).toLocaleDateString("en-IN", {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                    })}
                  </TableCell>
                  <TableCell>
                    <Badge variant={STATUS_VARIANT[enquiry.status]}>{enquiry.status.replace("_", " ")}</Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center justify-end gap-1">
                      <Link
                        href={`/admin/enquiries/${enquiry.id}`}
                        className="rounded-md px-2.5 py-1.5 text-sm font-medium text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                      >
                        View
                      </Link>
                      <EnquiryRowDeleteButton id={enquiry.id} name={name} />
                    </div>
                  </TableCell>
                </TableRow>
              );
            })}
            {enquiries.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} className="py-8 text-center text-muted-foreground">
                  No enquiries match this filter.
                </TableCell>
              </TableRow>
            ) : null}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
