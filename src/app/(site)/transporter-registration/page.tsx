import type { Metadata } from "next";
import { Banknote, MapPinned, TrendingUp, Handshake } from "lucide-react";

import { PageHero } from "@/components/site/page-hero";
import { SectionHeading } from "@/components/site/section-heading";
import { EnquiryForm, type EnquiryField } from "@/components/site/enquiry-form";
import { Stagger, StaggerItem } from "@/components/motion/reveal";
import { transporterBenefits } from "@/lib/data";
import { listVehicleTypes } from "@/lib/services/pricing";

export const metadata: Metadata = {
  title: "Transporter Registration",
  description: "Register your trucks with Saibaba Transport's third-party transporter network.",
};

const benefitIcons = [TrendingUp, Banknote, MapPinned, Handshake];

export default async function TransporterRegistrationPage() {
  const vehicleTypes = await listVehicleTypes({ onlyActive: true });

  const fields: EnquiryField[] = [
    { type: "text", name: "transporterName", label: "Transporter Name", placeholder: "Your full name", required: true },
    { type: "text", name: "companyName", label: "Company Name", placeholder: "Company / proprietorship name" },
    { type: "tel", name: "mobile", label: "Mobile Number", placeholder: "+91 98765 43210", required: true },
    { type: "email", name: "email", label: "Email Address", placeholder: "you@company.com" },
    { type: "text", name: "location", label: "Location", placeholder: "City, State", required: true },
    { type: "select", name: "vehicleType", label: "Vehicle Type", options: vehicleTypes.map((v) => v.name), required: true },
    { type: "number", name: "vehicleCount", label: "Number of Vehicles", placeholder: "e.g. 3" },
    { type: "text", name: "operatingStates", label: "Operating States", placeholder: "e.g. Gujarat, Maharashtra, Rajasthan" },
    { type: "text", name: "capacity", label: "Vehicle Capacity", placeholder: "e.g. 9 tons" },
    { type: "text", name: "gst", label: "GST Number", placeholder: "22AAAAA0000A1Z5" },
    { type: "textarea", name: "message", label: "Message", placeholder: "Anything else we should know?", span: 2 },
  ];

  return (
    <>
      <PageHero
        eyebrow="Transporter Registration"
        title="Register your fleet with our network"
        description="Truck owners and operators can register with Saibaba Transport to receive load opportunities across our growing pan-India network."
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Partner With Us", href: "/partners" }, { label: "Transporter Registration" }]}
      />

      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr]">
            <div>
              <SectionHeading eyebrow="Why Register With Us" title="Benefits for transporter partners" />
              <Stagger className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
                {transporterBenefits.map((benefit, i) => {
                  const Icon = benefitIcons[i % benefitIcons.length];
                  return (
                    <StaggerItem key={benefit}>
                      <div className="flex items-start gap-3 rounded-xl border border-border bg-card p-4">
                        <Icon className="mt-0.5 size-5 shrink-0 text-primary" />
                        <p className="text-sm leading-relaxed text-foreground/80">{benefit}</p>
                      </div>
                    </StaggerItem>
                  );
                })}
              </Stagger>
              <p className="mt-6 text-xs leading-relaxed text-muted-foreground">
                All transporter registrations are reviewed by our internal team before onboarding.
                Submitting this form does not guarantee immediate load allocation.
              </p>
            </div>

            <EnquiryForm
              fields={fields}
              enquiryType="TRANSPORTER"
              submitLabel="Submit Registration"
              successTitle="Registration received"
              successDescription="Thank you for registering. Our internal team will review your details and reach out if there's a match for your vehicles."
            />
          </div>
        </div>
      </section>
    </>
  );
}
