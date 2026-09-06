import type { Metadata } from "next";
import Image from "next/image";
import { Truck, TrainFront, Network, Users, MapPinned, Gauge, ShieldCheck, CheckCircle2 } from "lucide-react";

import { PageHero } from "@/components/site/page-hero";
import { SectionHeading } from "@/components/site/section-heading";
import { CtaBand } from "@/components/site/cta-band";
import { TrainIllustration } from "@/components/site/train-illustration";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/reveal";
import { Badge } from "@/components/ui/badge";
import { listVehicleTypes } from "@/lib/services/pricing";

export const metadata: Metadata = {
  title: "Fleet & Transportation Network",
  description:
    "Company-owned trucks and rail freight tie-ups combined with a vetted third-party transporter network, connecting India's business hubs with flexible road and rail capacity.",
};

const networkPoints = [
  {
    icon: Truck,
    title: "Company-Owned Trucks",
    description: "A core fleet of owned vehicles for priority and dedicated consignments.",
  },
  {
    icon: Network,
    title: "Third-Party Road & Rail Network",
    description: "Verified partner transporters and rail freight tie-ups extend coverage into additional routes, vehicle types and long-haul rail corridors.",
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
        description="We combine company-owned trucks, rail freight tie-ups and a growing network of verified third-party transporters - giving businesses flexible road and rail capacity and wider route coverage without compromising on accountability."
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

      {/* Multimodal capacity: road + rail, side by side */}
      <section className="py-20 sm:py-28">
        <div className="mx-auto grid max-w-7xl gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:items-center lg:px-8">
          <Reveal delay={0.1} className="order-2 lg:order-1">
            <div className="grid grid-cols-2 gap-4">
              <div className="overflow-hidden rounded-2xl border border-border/70 shadow-premium">
                <Image
                  src="/images/truck-hero.jpg"
                  alt="A Sai Baba Transport truck for road transportation"
                  width={360}
                  height={440}
                  className="aspect-[3/4] w-full object-cover object-[60%_35%]"
                />
              </div>
              <div className="mt-8 overflow-hidden rounded-2xl border border-border/70 bg-brand-charcoal shadow-premium">
                <div className="aspect-[3/4]">
                  <TrainIllustration />
                </div>
              </div>
            </div>
          </Reveal>
          <Reveal className="order-1 lg:order-2">
            <span className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/5 px-3 py-1 text-xs font-medium uppercase tracking-wider text-primary">
              <TrainFront className="size-3.5" /> Multimodal Capacity
            </span>
            <h2 className="mt-4 font-display text-3xl leading-tight tracking-wide text-brand-charcoal sm:text-4xl">
              Road for reach, rail for scale - one partner for both
            </h2>
            <p className="mt-5 text-base leading-relaxed text-muted-foreground">
              Our truck fleet and partner network handle first- and last-mile
              pickup and delivery, door to door. For long-haul, high-volume
              consignments, we coordinate rail freight movement alongside it -
              a more cost-efficient way to move bulk textile, industrial and
              commercial cargo over longer distances.
            </p>
            <ul className="mt-6 space-y-3">
              {[
                "Door-to-door road transportation, any distance",
                "Rail freight for long-haul, high-volume loads",
                "Road pickup & delivery coordinated on both ends",
                "One point of contact across both modes",
              ].map((point) => (
                <li key={point} className="flex items-center gap-2.5 text-sm text-foreground/80">
                  <CheckCircle2 className="size-4 shrink-0 text-primary" />
                  {point}
                </li>
              ))}
            </ul>
          </Reveal>
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
