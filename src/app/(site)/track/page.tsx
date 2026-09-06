import type { Metadata } from "next";
import { FileSearch, MapPinned, Search } from "lucide-react";

import { TrackHero } from "@/components/site/track-hero";
import { SectionHeading } from "@/components/site/section-heading";
import { CtaBand } from "@/components/site/cta-band";
import { FaqAccordion } from "@/components/site/faq-accordion";
import { Stagger, StaggerItem } from "@/components/motion/reveal";
import { TrackShipmentForm } from "@/components/site/track-shipment-form";

export const metadata: Metadata = {
  title: "Track Your Shipment",
  description:
    "Track your Sai Baba Transport consignment in real time. Enter your LR (Lorry Receipt) number to see live status, transit history and delivery branch details.",
};

const howItWorks = [
  {
    icon: FileSearch,
    title: "Find your LR number",
    description: "It's printed on your consignment note, invoice, or the dispatch SMS/WhatsApp message you received.",
  },
  {
    icon: Search,
    title: "Enter it above",
    description: "Type or paste the LR number into the tracking box and hit “Track Shipment.”",
  },
  {
    icon: MapPinned,
    title: "View live status",
    description: "See booking details, every transit step and the current or delivering branch, updated as it moves.",
  },
];

const trackingFaqs = [
  {
    category: "Tracking",
    question: "Where do I find my LR number?",
    answer:
      "Your LR (Lorry Receipt) number is printed on the consignment note or receipt handed to you at booking, and is usually included in the dispatch confirmation sent by SMS or WhatsApp.",
  },
  {
    category: "Tracking",
    question: "How often is the tracking status updated?",
    answer:
      "Status updates as your shipment moves through our network - when it's dispatched, when it reaches or leaves a branch, and when it's delivered. There can be a short delay between an event happening and it appearing here.",
  },
  {
    category: "Tracking",
    question: "What do the different status names mean?",
    answer:
      "“Dispatched” means the shipment has left a branch, “In Transit” means it's on the way to the next point, “Reached Branch” means it has arrived at a branch, and “Delivered” means it has reached the consignee.",
  },
  {
    category: "Tracking",
    question: "I can't find my shipment, or the status looks wrong. What should I do?",
    answer:
      "Double-check the LR number for typos first. If it still doesn't show up, or the details look incorrect, contact our support team with your LR number and we'll look into it right away.",
  },
];

export default async function TrackPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const params = await searchParams;
  const lrParam = params.lr;
  const initialLr = typeof lrParam === "string" ? lrParam : undefined;

  return (
    <>
      <TrackHero />

      <TrackShipmentForm initialLr={initialLr} />

      <section className="py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            align="center"
            eyebrow="How It Works"
            title="Three steps to track any consignment"
            description="No login required - just your LR number."
            className="mx-auto"
          />
          <Stagger className="mt-12 grid gap-6 sm:grid-cols-3">
            {howItWorks.map((step, i) => (
              <StaggerItem key={step.title}>
                <div className="card-hover h-full rounded-2xl border border-border bg-card p-6">
                  <div className="flex size-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    <span className="text-sm font-bold">{i + 1}</span>
                  </div>
                  <step.icon className="mt-4 size-6 text-primary" />
                  <h3 className="mt-3 text-base font-semibold text-brand-charcoal">{step.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{step.description}</p>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      <section className="bg-secondary/40 py-20 sm:py-28">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            align="center"
            eyebrow="Questions"
            title="Tracking, explained"
            className="mx-auto"
          />
          <div className="mt-12">
            <FaqAccordion faqs={trackingFaqs} showFilters={false} />
          </div>
        </div>
      </section>

      <CtaBand
        title="Shipping something new?"
        description="Get an indicative transport estimate in minutes, or request a formal quote for your next consignment."
      />
    </>
  );
}
