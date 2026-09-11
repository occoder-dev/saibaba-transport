import type { Metadata } from "next";
import { PageHero } from "@/components/site/page-hero";
import { CtaBand } from "@/components/site/cta-band";
import { listBranches } from "@/lib/services/branches";
import { RegisterForm } from "./register-form";

export const metadata: Metadata = {
  title: "Customer Registration",
  description:
    "Register your firm with Sai Baba Transport to get a dedicated Login ID for online shipment tracking, booking and priority support.",
};

export default async function RegisterPage() {
  const branches = await listBranches({ onlyActive: true });
  const branchOptions = branches.map((b) => ({
    value: b.city,
    label: b.isHeadOffice ? `${b.city} (Head Office)` : `${b.city}, ${b.state}`,
  }));

  return (
    <>
      <PageHero
        eyebrow="Customer Registration"
        title="Register your firm for a Login ID"
        description="A one-time registration gets your firm a dedicated Login ID for online shipment tracking, booking and priority support - free of cost."
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Customer Registration" }]}
      />

      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <RegisterForm branches={branchOptions} />
        </div>
      </section>

      <CtaBand
        title="Need to move a shipment right away?"
        description="You don't need a Login ID to get started - request a quote or check an indicative transport cost in minutes."
      />
    </>
  );
}
