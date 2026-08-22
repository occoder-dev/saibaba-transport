import type { Metadata } from "next";
import { listBranches } from "@/lib/services/branches";
import { BranchesTable } from "./branches-table";

export const metadata: Metadata = { title: "Branches", robots: { index: false, follow: false } };

export default async function AdminBranchesPage() {
  const branches = await listBranches();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-brand-charcoal">Branches</h1>
        <p className="text-sm text-muted-foreground">
          Manage every branch location, address and contact numbers shown on the public site.
        </p>
      </div>
      <BranchesTable branches={branches} />
    </div>
  );
}
