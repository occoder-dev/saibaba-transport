import type { Metadata } from "next";
import { listFaqs } from "@/lib/services/faqs";
import { FaqsTable } from "./faqs-table";

export const metadata: Metadata = { title: "FAQs", robots: { index: false, follow: false } };

export default async function AdminFaqsPage() {
  const faqs = await listFaqs();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-brand-charcoal">FAQs</h1>
        <p className="text-sm text-muted-foreground">Manage the frequently asked questions shown on the website.</p>
      </div>
      <FaqsTable faqs={faqs} />
    </div>
  );
}
