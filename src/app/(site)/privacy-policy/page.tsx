import type { Metadata } from "next";
import { PageHero } from "@/components/site/page-hero";
import { Reveal } from "@/components/motion/reveal";
import { siteConfig } from "@/lib/data";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "Privacy Policy for the Sai Baba Transport website.",
};

const sections = [
  {
    title: "1. Information We Collect",
    body: "We may collect information you provide directly through our enquiry, quote request, partnership, transporter registration, contact and careers forms - including your name, company name, phone number, email address, and shipment or business details. We may also collect basic technical information such as browser type and pages visited, for website analytics purposes.",
  },
  {
    title: "2. How We Use Your Information",
    body: "Information submitted through this website is used to respond to enquiries, prepare quotations, evaluate business or transporter partnership requests, process job applications, and improve our services. We do not sell your personal information to third parties.",
  },
  {
    title: "3. Sharing of Information",
    body: "We may share information with our internal branch teams and, where necessary to fulfil a transportation request, with vetted third-party transporter partners. We may also share information where required by law or to protect our legal rights.",
  },
  {
    title: "4. Cookies & Analytics",
    body: "This website may use cookies and analytics tools (such as Google Analytics) to understand how visitors use our site and to improve content and performance. You can control cookie preferences through your browser settings.",
  },
  {
    title: "5. Data Security",
    body: "We take reasonable technical and organizational measures to protect the information you share with us. However, no method of transmission over the internet is completely secure, and we cannot guarantee absolute security.",
  },
  {
    title: "6. Your Rights",
    body: `You may contact us at ${siteConfig.email} to request access to, correction of, or deletion of your personal information, subject to applicable law.`,
  },
  {
    title: "7. Changes to This Policy",
    body: "We may update this Privacy Policy from time to time. Changes will be posted on this page with an updated revision date.",
  },
  {
    title: "8. Contact Us",
    body: `For questions about this Privacy Policy, contact us at ${siteConfig.email} or ${siteConfig.phone}.`,
  },
];

export default function PrivacyPolicyPage() {
  return (
    <>
      <PageHero
        eyebrow="Legal"
        title="Privacy Policy"
        description="This policy explains how Sai Baba Transport collects, uses and protects information submitted through this website."
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Privacy Policy" }]}
      />
      <section className="py-20 sm:py-28">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <Reveal className="rounded-xl border border-dashed border-primary/30 bg-accent/50 p-4 text-sm text-foreground/70">
            This is placeholder policy content for a website template and has
            not been reviewed by legal counsel. Please have this page
            reviewed and finalized by a qualified professional before
            publishing the live site.
          </Reveal>
          <p className="mt-6 text-sm text-muted-foreground">Last updated: August 2026</p>
          <div className="mt-8 space-y-8">
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
