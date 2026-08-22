import type { Metadata } from "next";
import { PageHero } from "@/components/site/page-hero";
import { Reveal } from "@/components/motion/reveal";

export const metadata: Metadata = {
  title: "Disclaimer",
  description: "Website disclaimer and cookie information for the Saibaba Transport website.",
};

const sections = [
  {
    title: "General Disclaimer",
    body: "The information on this website is provided for general informational purposes only. While we strive to keep it accurate and current, we make no warranties about the completeness, reliability or accuracy of this information.",
  },
  {
    title: "Transport Estimates",
    body: "Any transport cost estimate generated on this website is indicative only and not a binding quotation. Actual freight charges are confirmed separately by our team based on your specific requirement.",
  },
  {
    title: "Cookies",
    body: "This website may use cookies to improve browsing experience and analyze site traffic. By continuing to use this website, you consent to our use of cookies in accordance with this disclaimer and our Privacy Policy.",
  },
  {
    title: "External Links",
    body: "This website may contain links to external systems, including our CRM (crm.saibabat.com) and business platform (saibabat.com). We are not responsible for the content or practices of these or any other linked third-party sites.",
  },
];

export default function DisclaimerPage() {
  return (
    <>
      <PageHero
        eyebrow="Legal"
        title="Disclaimer"
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Disclaimer" }]}
      />
      <section className="py-20 sm:py-28">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <div className="space-y-8">
            {sections.map((s) => (
              <Reveal key={s.title}>
                <h2 className="text-lg font-semibold text-brand-charcoal">{s.title}</h2>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{s.body}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
