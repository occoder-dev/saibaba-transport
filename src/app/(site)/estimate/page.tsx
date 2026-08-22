import type { Metadata } from "next";
import { PageHero } from "@/components/site/page-hero";
import { EstimateCalculator } from "./estimate-calculator";

export const metadata: Metadata = {
  title: "Transport Estimation Calculator",
  description:
    "Get an indicative transport cost estimate for your shipment based on distance, vehicle type and material category.",
};

export default function EstimatePage() {
  return (
    <>
      <PageHero
        eyebrow="Transport Estimation Calculator"
        title="Get an indicative transport cost in minutes"
        description="Enter your shipment details below for an instant, indicative estimate. This is a lead-generation tool, not a final quotation - our team confirms exact pricing based on your actual requirement."
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Transport Estimate" }]}
      />
      <section className="py-20 sm:py-28">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <EstimateCalculator />
        </div>
      </section>
    </>
  );
}
