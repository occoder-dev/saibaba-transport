import type { Metadata } from "next";

import { PageHero } from "@/components/site/page-hero";
import { CtaBand } from "@/components/site/cta-band";
import { listBranches } from "@/lib/services/branches";
import { BranchesClient } from "./branches-client";

export const metadata: Metadata = {
  title: "Our Branches",
  description:
    "Saibaba Transport branches across India - addresses, contact details and services available at each location.",
};

export default async function BranchesPage() {
  const branches = await listBranches({ onlyActive: true });

  return (
    <>
      <PageHero
        eyebrow="Our Network"
        title="Branches across India"
        description="Local support, backed by a single point of coordination for multi-state shipments. Our branch network continues to grow - more locations are added regularly."
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Branches" }]}
      />

      <section className="py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <BranchesClient branches={branches} />
        </div>
      </section>

      <CtaBand
        title="Looking for a branch near you?"
        description="If we don't have a branch in your city yet, our partner network can likely still cover your route."
        primaryHref="/contact"
        primaryLabel="Contact Head Office"
      />
    </>
  );
}
