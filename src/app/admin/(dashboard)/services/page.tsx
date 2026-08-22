import type { Metadata } from "next";
import { listServices } from "@/lib/services/services";
import { ServicesTable } from "./services-table";

export const metadata: Metadata = { title: "Services", robots: { index: false, follow: false } };

export default async function AdminServicesPage() {
  const services = await listServices();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-brand-charcoal">Services</h1>
        <p className="text-sm text-muted-foreground">
          Manage the transportation services listed across the website.
        </p>
      </div>
      <ServicesTable services={services} />
    </div>
  );
}
