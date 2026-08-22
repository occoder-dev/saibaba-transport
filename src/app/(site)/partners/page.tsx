import type { Metadata } from "next";
import { Handshake } from "lucide-react";

import { PageHero } from "@/components/site/page-hero";
import { SectionHeading } from "@/components/site/section-heading";
import { EnquiryForm, type EnquiryField } from "@/components/site/enquiry-form";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/reveal";
import { partnerReasons } from "@/lib/data";
import { listIndustries } from "@/lib/services/industries";

export const metadata: Metadata = {
  title: "Business Partnership",
  description: "Become a transportation partner with Saibaba Transport - submit your business partnership enquiry.",
};

export default async function PartnersPage() {
  const industries = await listIndustries({ onlyActive: true });

  const fields: EnquiryField[] = [
    { type: "text", name: "companyName", label: "Company Name", placeholder: "Your company name", required: true },
    { type: "text", name: "contactPerson", label: "Contact Person", placeholder: "Full name", required: true },
    { type: "tel", name: "mobile", label: "Mobile Number", placeholder: "+91 98765 43210", required: true },
    { type: "email", name: "email", label: "Email Address", placeholder: "you@company.com", required: true },
    {
      type: "select",
      name: "industry",
      label: "Industry",
      options: industries.map((i) => i.name),
      required: true,
    },
    { type: "location", name: "pickup", label: "Pickup Location", placeholder: "Search city or address" },
    { type: "location", name: "delivery", label: "Delivery Location", placeholder: "Search city or address" },
    { type: "text", name: "monthlyLoad", label: "Monthly Approximate Load", placeholder: "e.g. 40 tons / month" },
    { type: "textarea", name: "requirement", label: "Requirement", placeholder: "Describe your transportation requirement..." },
    { type: "textarea", name: "message", label: "Message", placeholder: "Anything else we should know?", span: 2 },
  ];

  return (
    <>
      <PageHero
        eyebrow="Become Our Transportation Partner"
        title="Grow your business with a reliable logistics partner"
        description="Whether you're a manufacturer, trader or retailer looking for a dependable transportation partner, we'd like to hear about your business."
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Partner With Us", href: "/partners" }, { label: "Business Partnership" }]}
      />

      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr]">
            <div>
              <SectionHeading
                eyebrow="Why Partner With Us"
                title="What business partners get with Saibaba Transport"
              />
              <Stagger className="mt-8 space-y-4">
                {partnerReasons.map((reason) => (
                  <StaggerItem key={reason}>
                    <div className="flex items-start gap-3 rounded-xl border border-border bg-card p-4">
                      <Handshake className="mt-0.5 size-5 shrink-0 text-primary" />
                      <p className="text-sm leading-relaxed text-foreground/80">{reason}</p>
                    </div>
                  </StaggerItem>
                ))}
              </Stagger>
              <Reveal delay={0.2} className="mt-8 rounded-2xl bg-accent/60 p-5">
                <p className="text-sm leading-relaxed text-foreground/70">
                  Looking to register your trucks with us instead?{" "}
                  <a href="/transporter-registration" className="font-medium text-primary underline underline-offset-2">
                    Visit Transporter Registration
                  </a>
                  .
                </p>
              </Reveal>
            </div>

            <EnquiryForm
              fields={fields}
              enquiryType="PARTNER"
              submitLabel="Submit Partnership Enquiry"
              successTitle="Partnership enquiry received"
              successDescription="Thank you for your interest in partnering with Saibaba Transport. Our team will review your details and reach out soon."
            />
          </div>
        </div>
      </section>
    </>
  );
}
