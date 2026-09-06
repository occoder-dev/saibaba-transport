import type { Metadata } from "next";
import Image from "next/image";
import { CheckCircle2, Factory, MapPinned, PackageCheck, ShieldCheck } from "lucide-react";

import { PageHero } from "@/components/site/page-hero";
import { SectionHeading } from "@/components/site/section-heading";
import { CtaBand } from "@/components/site/cta-band";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/reveal";

export const metadata: Metadata = {
  title: "Textile Transportation",
  description:
    "Sai Baba Transport's core specialty - bulk textile transportation from mills and processing units to wholesale markets and retail destinations across India.",
};

const capabilities = [
  {
    icon: Factory,
    title: "Mill-to-Market Coverage",
    description: "Movement from mills and processing units directly to wholesale markets and retail destinations.",
  },
  {
    icon: PackageCheck,
    title: "Bulk & Bale-Safe Handling",
    description: "Loading and handling practices suited to grey fabric, finished goods and garment bales.",
  },
  {
    icon: MapPinned,
    title: "Deep Corridor Experience",
    description: "Years of route experience across India's major textile trading and manufacturing corridors.",
  },
  {
    icon: ShieldCheck,
    title: "Trusted by Textile Traders",
    description: "A track record with textile businesses who depend on consistent, on-time bulk transportation.",
  },
];

const process = [
  { step: "01", title: "Share Your Requirement", description: "Tell us your pickup, delivery and material details via quote request or a branch." },
  { step: "02", title: "Vehicle & Route Planning", description: "We match the right vehicle type and route from our own fleet or partner network." },
  { step: "03", title: "Dispatch & Coordination", description: "Loading, dispatch and in-transit coordination handled by our branch team." },
  { step: "04", title: "Delivery Confirmation", description: "Consignment delivered and confirmed at destination, ready for your next dispatch." },
];

export default function TextileTransportationPage() {
  return (
    <>
      <PageHero
        eyebrow="Our Core Specialty"
        title="Textile Transportation"
        description="Textile transportation is where Sai Baba Transport began, and it remains our core strength - bulk textile movement between mills, processing units, wholesale markets and retail destinations across India."
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Services", href: "/services" },
          { label: "Textile Transportation" },
        ]}
      />

      <section className="py-20 sm:py-28">
        <div className="mx-auto grid max-w-7xl gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:items-center lg:px-8">
          <Reveal>
            <span className="inline-flex items-center rounded-full border border-primary/30 bg-primary/5 px-3 py-1 text-xs font-medium uppercase tracking-wider text-primary">
              Business-to-Business Logistics
            </span>
            <h2 className="mt-4 font-display text-3xl leading-tight tracking-wide text-brand-charcoal sm:text-4xl">
              Built by the textile trade, for the textile trade
            </h2>
            <p className="mt-5 text-base leading-relaxed text-muted-foreground">
              From grey fabric to finished garments, we handle bulk textile
              movement with the careful, bale-safe handling the trade
              demands - connecting mills, processing units, wholesale
              markets and retail destinations through dedicated vehicles and
              a trusted third-party network.
            </p>
            <ul className="mt-6 space-y-3">
              {[
                "Factory-to-destination transportation",
                "Bulk transportation with dedicated vehicles",
                "Third-party vehicle network for extended reach",
                "Reliable, business-to-business delivery",
              ].map((point) => (
                <li key={point} className="flex items-center gap-2.5 text-sm text-foreground/80">
                  <CheckCircle2 className="size-4 shrink-0 text-primary" />
                  {point}
                </li>
              ))}
            </ul>
          </Reveal>
          <Reveal delay={0.15}>
            <div className="relative mx-auto max-w-md overflow-hidden rounded-3xl border border-border/70 shadow-premium-lg">
              <Image
                src="/images/textile-trade.png"
                alt="Sai Baba Transport vehicles loading at a warehouse dock, ready for textile dispatch"
                width={720}
                height={720}
                className="aspect-auto w-full object-cover"
              />
            </div>
          </Reveal>
        </div>
      </section>

      <section className="bg-secondary/30 py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading align="center" eyebrow="Why Textile Businesses Choose Us" title="Capabilities built for textile cargo" className="mx-auto" />
          <Stagger className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {capabilities.map((cap) => {
              const Icon = cap.icon;
              return (
                <StaggerItem key={cap.title}>
                  <div className="flex h-full flex-col items-start gap-3 rounded-2xl border border-border bg-card p-6 shadow-sm">
                    <div className="flex size-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
                      <Icon className="size-5" />
                    </div>
                    <h3 className="text-base font-semibold text-brand-charcoal">{cap.title}</h3>
                    <p className="text-sm leading-relaxed text-muted-foreground">{cap.description}</p>
                  </div>
                </StaggerItem>
              );
            })}
          </Stagger>
        </div>
      </section>

      <section className="py-20 sm:py-28">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <SectionHeading align="center" eyebrow="How It Works" title="From requirement to delivery" className="mx-auto" />
          <Stagger className="mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {process.map((item) => (
              <StaggerItem key={item.step}>
                <div className="relative">
                  <span className="font-display text-5xl text-primary/20">{item.step}</span>
                  <h3 className="mt-2 text-base font-semibold text-brand-charcoal">{item.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{item.description}</p>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      <CtaBand
        title="Ready to move your textile consignment?"
        description="Get an indicative transport estimate for your next textile dispatch, or request a formal quote from our team."
      />
    </>
  );
}
