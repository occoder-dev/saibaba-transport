import type { Metadata } from "next";
import Link from "next/link";
import {
  Inbox,
  Clock,
  CheckCircle2,
  Building2,
  Truck,
  Images,
  ArrowUpRight,
} from "lucide-react";
import { getEnquiryCounts, listEnquiries, type EnquiryType } from "@/lib/services/enquiries";
import { listBranches } from "@/lib/services/branches";
import { listServices } from "@/lib/services/services";
import { listGalleryImages } from "@/lib/services/gallery";
import { StatCard } from "@/components/admin/stat-card";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Dashboard",
  robots: { index: false, follow: false },
};

const TYPE_LABEL: Record<EnquiryType, string> = {
  QUOTE: "Quote Request",
  PARTNER: "Partner Enquiry",
  TRANSPORTER: "Transporter Registration",
  CONTACT: "Contact Message",
  CAREER: "Career Application",
};

const STATUS_VARIANT: Record<string, "default" | "secondary" | "outline"> = {
  NEW: "default",
  IN_PROGRESS: "secondary",
  RESOLVED: "outline",
  CLOSED: "outline",
};

function firstPayloadValue(payload: Record<string, string>, keys: string[]): string | undefined {
  for (const key of keys) {
    if (payload[key]) return payload[key];
  }
  return undefined;
}

export default async function AdminDashboardPage() {
  const [counts, recentEnquiries, branches, services, gallery] = await Promise.all([
    getEnquiryCounts(),
    listEnquiries(),
    listBranches(),
    listServices(),
    listGalleryImages(),
  ]);

  const recent = recentEnquiries.slice(0, 8);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight text-brand-charcoal">Dashboard</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Overview of website enquiries, support resolution and content.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Total Enquiries" value={counts.total} icon={Inbox} href="/admin/enquiries" />
        <StatCard
          label="New / Unresolved"
          value={counts.byStatus.NEW + counts.byStatus.IN_PROGRESS}
          icon={Clock}
          href="/admin/enquiries?status=NEW"
          accent="amber"
        />
        <StatCard
          label="Resolved"
          value={counts.byStatus.RESOLVED + counts.byStatus.CLOSED}
          icon={CheckCircle2}
          href="/admin/enquiries?status=RESOLVED"
          accent="green"
        />
        <StatCard label="Branches Live" value={branches.length} icon={Building2} href="/admin/branches" accent="muted" />
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Quote Requests" value={counts.byType.QUOTE} icon={Inbox} href="/admin/enquiries?type=QUOTE" />
        <StatCard label="Transporter Signups" value={counts.byType.TRANSPORTER} icon={Truck} href="/admin/enquiries?type=TRANSPORTER" />
        <StatCard label="Active Services" value={services.length} icon={Truck} href="/admin/services" accent="muted" />
        <StatCard label="Gallery Images" value={gallery.length} icon={Images} href="/admin/gallery" accent="muted" />
      </div>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between gap-2 border-b border-border/70 pb-5">
          <CardTitle className="text-base">Recent Enquiries</CardTitle>
          <Button asChild variant="ghost" size="sm">
            <Link href="/admin/enquiries">
              View all <ArrowUpRight className="size-3.5" />
            </Link>
          </Button>
        </CardHeader>
        <CardContent>
          {recent.length === 0 ? (
            <p className="py-6 text-center text-sm text-muted-foreground">
              No enquiries have come in yet.
            </p>
          ) : (
            <div className="divide-y divide-border">
              {recent.map((enquiry) => {
                const name = firstPayloadValue(enquiry.payload, ["name", "fullName", "contactName", "companyName"]);
                const contact = firstPayloadValue(enquiry.payload, ["phone", "mobile", "email"]);
                return (
                  <Link
                    key={enquiry.id}
                    href={`/admin/enquiries/${enquiry.id}`}
                    className="-mx-2 flex flex-col gap-1 rounded-xl px-2 py-3 transition-colors hover:bg-muted/50 sm:flex-row sm:items-center sm:justify-between"
                  >
                    <div className="min-w-0">
                      <p className="truncate text-sm font-medium text-brand-charcoal">
                        {name ?? "Website visitor"}
                        {contact ? <span className="ml-2 font-normal text-muted-foreground">{contact}</span> : null}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {TYPE_LABEL[enquiry.type]} ·{" "}
                        {new Date(enquiry.createdAt).toLocaleDateString("en-IN", {
                          day: "numeric",
                          month: "short",
                          year: "numeric",
                        })}
                      </p>
                    </div>
                    <Badge variant={STATUS_VARIANT[enquiry.status] ?? "outline"} className="w-fit shrink-0">
                      {enquiry.status.replace("_", " ")}
                    </Badge>
                  </Link>
                );
              })}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
