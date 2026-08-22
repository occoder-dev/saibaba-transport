import type { Metadata } from "next";
import { listIndustries } from "@/lib/services/industries";
import { IndustriesTable } from "./industries-table";

export const metadata: Metadata = { title: "Industries", robots: { index: false, follow: false } };

export default async function AdminIndustriesPage() {
  const industries = await listIndustries();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-brand-charcoal">Industries</h1>
        <p className="text-sm text-muted-foreground">Manage the industries served, shown on the website.</p>
      </div>
      <IndustriesTable industries={industries} />
    </div>
  );
}
