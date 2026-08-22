import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, CheckCircle2 } from "lucide-react";

import { PageHero } from "@/components/site/page-hero";
import { SectionHeading } from "@/components/site/section-heading";
import { ServiceCard } from "@/components/site/service-card";
import { CtaBand } from "@/components/site/cta-band";
import { Stagger, Reveal } from "@/components/motion/reveal";
import { Button } from "@/components/ui/button";
import { listServices } from "@/lib/services/services";
import { getIcon } from "@/lib/icon-map";

export const metadata: Metadata = {
  title: "Transportation Services",
  description:
    "Full Truck Load, Part Truck Load, rail/train freight, textile transportation, industrial, commercial, dedicated, contract and pan-India transportation services from Saibaba Transport.",
};

export default async function ServicesPage() {
  const services = await listServices({ onlyActive: true });

  return (
    <>
      <PageHero
        eyebrow="Our Services"
        title="Transportation services for every kind of load"
        description="Dedicated vehicles, shared loads, rail freight, or a fully customized logistics plan - explore the range of road and rail transportation services Saibaba Transport offers across India."
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Services" }]}
      />

      <section className="py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Stagger className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((service) => {
              const Icon = getIcon(service.icon);
              return (
                <ServiceCard
                  key={service.slug}
                  slug={service.slug}
                  name={service.name}
                  short={service.short}
                  icon={<Icon className="size-6" />}
                />
              );
            })}
          </Stagger>
        </div>
      </section>

      <section className="bg-secondary/30 py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            align="center"
            eyebrow="A Closer Look"
            title="What's included with every service"
            className="mx-auto"
          />
          <Stagger className="mt-12 space-y-6">
            {services.map((service) => (
              <Reveal key={service.slug}>
                <div
                  id={service.slug}
                  className="scroll-mt-32 rounded-2xl border border-border bg-card p-6 shadow-sm sm:p-8"
                >
                  <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
                    <div className="flex items-start gap-4">
                      <div className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                        {(() => {
                          const Icon = getIcon(service.icon);
                          return <Icon className="size-6" />;
                        })()}
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold text-brand-charcoal">{service.name}</h3>
                        <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted-foreground">
                          {service.description}
                        </p>
                      </div>
                    </div>
                    {service.slug === "textile-transportation" && (
                      <Button variant="outline" size="sm" asChild className="shrink-0">
                        <Link href="/services/textile-transportation">
                          Full Details <ArrowRight className="size-4" />
                        </Link>
                      </Button>
                    )}
                  </div>
                  <ul className="mt-5 grid gap-2.5 sm:grid-cols-2">
                    {service.points.map((point) => (
                      <li key={point} className="flex items-center gap-2.5 text-sm text-foreground/80">
                        <CheckCircle2 className="size-4 shrink-0 text-primary" />
                        {point}
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            ))}
          </Stagger>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
