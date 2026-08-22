import type { Metadata } from "next";
import { Truck, Network, Users, MapPinned, Gauge, ShieldCheck } from "lucide-react";

import { PageHero } from "@/components/site/page-hero";
import { SectionHeading } from "@/components/site/section-heading";
import { CtaBand } from "@/components/site/cta-band";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/reveal";
import { Badge } from "@/components/ui/badge";
import { listVehicleTypes } from "@/lib/services/pricing";

export const metadata: Metadata = {
  title: "Fleet & Transportation Network",
  description:
    "Company-owned trucks combined with a vetted third-party transporter network, connecting India's business hubs with flexible vehicle capacity.",
};

const networkPoints = [
  {
    icon: Truck,
    title: "Company-Owned Trucks",
    description: "A core fleet of owned vehicles for priority and dedicated consignments.",
  },
  {
    icon: Network,
    title: "Third-Party Truck Network",
    description: "Verified partner transporters extend coverage into additional routes and vehicle types.",
  },
  {
    icon: Gauge,
    title: "Vehicle Availability",
    description: "Capacity planning across own fleet and partners to match demand, including seasonal spikes.",
  },
  {
    icon: Users,
    title: "Driver & Network Management",
    description: "Coordinated driver and vehicle management practices across branches for accountability.",
  },
  {
    icon: MapPinned,
    title: "Pan-India Connectivity",
    description: "Combined network reach designed to connect India's major manufacturing and trade hubs.",
  },
  {
    icon: ShieldCheck,
    title: "Quality & Accountability",
    description: "Partner transporters are vetted and centrally coordinated to maintain service standards.",
  },
];

export default async function FleetPage() {
  const vehicleTypes = await listVehicleTypes({ onlyActive: true });

  return (
    <>
      <PageHero
        eyebrow="Fleet & Transportation Network"
        title="Capacity that scales with your business"
        description="We combine company-owned trucks with a growing network of verified third-party transporters - giving businesses flexible capacity and wider route coverage without compromising on accountability."
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Fleet & Network" }]}
      />

      <section className="py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Stagger className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {networkPoints.map((point) => {
              const Icon = point.icon;
              return (
                <StaggerItem key={point.title}>
                  <div className="flex h-full flex-col items-start gap-3 rounded-2xl border border-border bg-card p-6 shadow-sm">
                    <div className="flex size-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
                      <Icon className="size-5" />
                    </div>
                    <h3 className="text-base font-semibold text-brand-charcoal">{point.title}</h3>
                    <p className="text-sm leading-relaxed text-muted-foreground">{point.description}</p>
                  </div>
                </StaggerItem>
              );
            })}
          </Stagger>
        </div>
      </section>

      <section className="bg-secondary/30 py-20 sm:py-28">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            align="center"
            eyebrow="Vehicle Types"
            title="Vehicle capacity across load sizes"
            description="Exact fleet numbers and availability are confirmed at the time of booking. The vehicle types below are indicative of the capacity our network supports."
            className="mx-auto"
          />
          <Reveal>
            <div className="mt-10 flex flex-wrap justify-center gap-3">
              {vehicleTypes.map((v) => (
                <Badge key={v.id} variant="secondary" className="px-4 py-2 text-sm font-medium">
                  {v.name}
                </Badge>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      <CtaBand
        title="Need to check vehicle availability for your route?"
        description="Share your pickup and delivery details and our team will confirm the right vehicle for your shipment."
      />
    </>
  );
}
