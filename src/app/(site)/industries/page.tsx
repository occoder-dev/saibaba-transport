import type { Metadata } from "next";

import { PageHero } from "@/components/site/page-hero";
import { SectionHeading } from "@/components/site/section-heading";
import { IndustryCard } from "@/components/site/industry-card";
import { CtaBand } from "@/components/site/cta-band";
import { Stagger } from "@/components/motion/reveal";
import { listIndustries } from "@/lib/services/industries";
import { getIcon } from "@/lib/icon-map";

export const metadata: Metadata = {
  title: "Industries We Serve",
  description:
    "Sai Baba Transport supports textile, manufacturing, retail, FMCG, e-commerce, industrial, automotive, construction and pharmaceutical businesses across India.",
};

export default async function IndustriesPage() {
  const industries = await listIndustries({ onlyActive: true });

  return (
    <>
      <PageHero
        eyebrow="Industries We Serve"
        title="One transportation partner, every industry"
        description="While textile remains our founding specialty, our network is built to support a wide range of industries with the same reliability and reach."
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Industries" }]}
      />

      <section className="py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Growing With Our Clients"
            title="Additional industries can be added anytime"
            description="Our services are structured to support new industries as our clients' businesses grow - this list will continue to expand."
          />
          <Stagger className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {industries.map((industry) => {
              const Icon = getIcon(industry.icon);
              return (
                <IndustryCard
                  key={industry.name}
                  name={industry.name}
                  description={industry.description}
                  icon={<Icon className="size-5" />}
                />
              );
            })}
          </Stagger>
        </div>
      </section>

      <CtaBand
        title="Don't see your industry listed?"
        description="We regularly extend our services into new industries - get in touch and let's discuss your transportation needs."
        primaryHref="/quote"
        primaryLabel="Request a Quote"
        secondaryHref="/contact"
        secondaryLabel="Contact Us"
      />
    </>
  );
}
