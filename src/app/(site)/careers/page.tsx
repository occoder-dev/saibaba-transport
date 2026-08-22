import type { Metadata } from "next";
import { Briefcase, MapPin } from "lucide-react";

import { PageHero } from "@/components/site/page-hero";
import { SectionHeading } from "@/components/site/section-heading";
import { EnquiryForm, type EnquiryField } from "@/components/site/enquiry-form";
import { Stagger, StaggerItem } from "@/components/motion/reveal";

export const metadata: Metadata = {
  title: "Careers",
  description: "Explore career opportunities with Saibaba Transport across our pan-India branch network.",
};

const openings = [
  { title: "Branch Operations Coordinator", location: "Surat, Gujarat", type: "Full-time" },
  { title: "Fleet & Dispatch Executive", location: "Mumbai, Maharashtra", type: "Full-time" },
  { title: "Customer Support Associate", location: "Delhi NCR", type: "Full-time" },
];

const fields: EnquiryField[] = [
  { type: "text", name: "name", label: "Full Name", placeholder: "Your name", required: true },
  { type: "tel", name: "mobile", label: "Mobile Number", placeholder: "+91 98765 43210", required: true },
  { type: "email", name: "email", label: "Email Address", placeholder: "you@email.com", required: true },
  { type: "text", name: "position", label: "Position Applying For", placeholder: "e.g. Branch Operations Coordinator", required: true },
  { type: "text", name: "experience", label: "Years of Experience", placeholder: "e.g. 3 years" },
  { type: "textarea", name: "message", label: "Tell Us About Yourself", placeholder: "Brief introduction and relevant experience...", span: 2 },
];

export default function CareersPage() {
  return (
    <>
      <PageHero
        eyebrow="Careers"
        title="Build your career in transportation & logistics"
        description="We're growing across India - explore current openings or send us your details for future opportunities."
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Careers" }]}
      />

      <section className="py-20 sm:py-28">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <SectionHeading eyebrow="Current Openings" title="Open positions across our branches" />
          <Stagger className="mt-10 space-y-4">
            {openings.map((job) => (
              <StaggerItem key={job.title}>
                <div className="flex flex-col justify-between gap-3 rounded-2xl border border-border bg-card p-6 shadow-sm sm:flex-row sm:items-center">
                  <div>
                    <h3 className="text-base font-semibold text-brand-charcoal">{job.title}</h3>
                    <p className="mt-1.5 flex items-center gap-1.5 text-sm text-muted-foreground">
                      <MapPin className="size-3.5" /> {job.location}
                    </p>
                  </div>
                  <span className="inline-flex w-fit items-center gap-1.5 rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
                    <Briefcase className="size-3.5" /> {job.type}
                  </span>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      <section className="bg-secondary/30 py-20 sm:py-28">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <SectionHeading align="center" eyebrow="Apply Now" title="Don't see the right role? Apply anyway" className="mx-auto" />
          <div className="mt-10">
            <EnquiryForm
              fields={fields}
              enquiryType="CAREER"
              submitLabel="Submit Application"
              successTitle="Application received"
              successDescription="Thank you for your interest in joining Saibaba Transport. Our HR team will review your application and reach out if there's a match."
            />
          </div>
        </div>
      </section>
    </>
  );
}
