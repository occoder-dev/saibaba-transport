import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { getEnquiry, type EnquiryType } from "@/lib/services/enquiries";
import { listUsers } from "@/lib/services/users";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { EnquiryDetailForm } from "./detail-form";

export const metadata: Metadata = { title: "Enquiry Details", robots: { index: false, follow: false } };

const TYPE_LABEL: Record<EnquiryType, string> = {
  QUOTE: "Quote Request",
  PARTNER: "Partner Enquiry",
  TRANSPORTER: "Transporter Registration",
  CONTACT: "Contact Message",
  CAREER: "Career Application",
  REGISTRATION: "Customer Registration",
};

function fieldLabel(key: string): string {
  return key
    .replace(/([a-z])([A-Z])/g, "$1 $2")
    .replace(/^./, (c) => c.toUpperCase())
    .trim();
}

export default async function AdminEnquiryDetailPage({ params }: PageProps<"/admin/enquiries/[id]">) {
  const { id } = await params;
  const [enquiry, users] = await Promise.all([getEnquiry(id), listUsers()]);

  if (!enquiry) notFound();

  const entries = Object.entries(enquiry.payload).filter(([, v]) => v);

  return (
    <div className="space-y-6">
      <div>
        <Link
          href="/admin/enquiries"
          className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-primary"
        >
          <ArrowLeft className="size-3.5" /> Back to Enquiries
        </Link>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-semibold text-brand-charcoal">{TYPE_LABEL[enquiry.type]}</h1>
          <p className="text-sm text-muted-foreground">
            Received{" "}
            {new Date(enquiry.createdAt).toLocaleString("en-IN", {
              day: "numeric",
              month: "short",
              year: "numeric",
              hour: "numeric",
              minute: "2-digit",
            })}
          </p>
        </div>
        <Badge>{enquiry.status.replace("_", " ")}</Badge>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Submitted Details</CardTitle>
          </CardHeader>
          <CardContent>
            {entries.length === 0 ? (
              <p className="text-sm text-muted-foreground">No details were submitted.</p>
            ) : (
              <dl className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                {entries.map(([key, value]) => (
                  <div key={key} className="space-y-0.5">
                    <dt className="text-xs font-medium tracking-wide text-muted-foreground uppercase">
                      {fieldLabel(key)}
                    </dt>
                    <dd className="text-sm break-words text-brand-charcoal">{value}</dd>
                  </div>
                ))}
              </dl>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Resolution</CardTitle>
          </CardHeader>
          <CardContent>
            <EnquiryDetailForm enquiry={enquiry} staff={users.filter((u) => u.active)} />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
