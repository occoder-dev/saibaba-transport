import type { Metadata } from "next";
import { PageHero } from "@/components/site/page-hero";
import { FaqAccordion } from "@/components/site/faq-accordion";
import { CtaBand } from "@/components/site/cta-band";
import { listFaqs } from "@/lib/services/faqs";

export const metadata: Metadata = {
  title: "Frequently Asked Questions",
  description: "Answers to common questions about Sai Baba Transport's services, booking, pricing and partnerships.",
};

export default async function FaqPage() {
  const faqs = await listFaqs({ onlyActive: true });

  return (
    <>
      <PageHero
        eyebrow="FAQ"
        title="Frequently asked questions"
        description="Answers to the questions we hear most often about our services, booking process, pricing and partnerships."
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "FAQ" }]}
      />
      <section className="py-20 sm:py-28">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <FaqAccordion faqs={faqs} />
        </div>
      </section>
      <CtaBand
        title="Still have questions?"
        description="Our team is happy to help with anything not covered here."
        primaryHref="/contact"
        primaryLabel="Contact Us"
        secondaryHref="/quote"
        secondaryLabel="Request a Quote"
      />
    </>
  );
}
