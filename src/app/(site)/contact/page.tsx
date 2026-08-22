import type { Metadata } from "next";
import { Clock, Headset, Mail, MapPin, MessageCircle, Phone } from "lucide-react";

import { PageHero } from "@/components/site/page-hero";
import { SectionHeading } from "@/components/site/section-heading";
import { EnquiryForm, type EnquiryField } from "@/components/site/enquiry-form";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/reveal";
import { siteConfig } from "@/lib/data";
import { listBranches } from "@/lib/services/branches";

export const metadata: Metadata = {
  title: "Contact Us",
  description: "Get in touch with Saibaba Transport - head office, branch contacts, and general enquiry form.",
};

const fields: EnquiryField[] = [
  { type: "text", name: "name", label: "Full Name", placeholder: "Your name", required: true },
  { type: "tel", name: "mobile", label: "Mobile Number", placeholder: "+91 98765 43210", required: true },
  { type: "email", name: "email", label: "Email Address", placeholder: "you@company.com", required: true },
  { type: "text", name: "subject", label: "Subject", placeholder: "What is this regarding?" },
  { type: "textarea", name: "message", label: "Message", placeholder: "How can we help?", span: 2, required: true },
];

export default async function ContactPage() {
  const branches = await listBranches({ onlyActive: true });
  const headOffice = branches.find((b) => b.isHeadOffice) ?? branches[0];

  return (
    <>
      <PageHero
        eyebrow="Contact Us"
        title="We're here to help with your transportation needs"
        description="Reach out to our head office or your nearest branch - or send us a message and our team will respond promptly."
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Contact" }]}
      />

      <section className="py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr]">
            <div>
              <SectionHeading eyebrow="Get In Touch" title="Head office &amp; direct contact" />
              <Stagger className="mt-8 space-y-4">
                <StaggerItem>
                  <div className="flex items-start gap-3 rounded-xl border border-border bg-card p-4">
                    <MapPin className="mt-0.5 size-5 shrink-0 text-primary" />
                    <div>
                      <p className="text-sm font-medium text-brand-charcoal">Head Office</p>
                      <p className="text-sm text-muted-foreground">{headOffice?.address ?? siteConfig.address}</p>
                    </div>
                  </div>
                </StaggerItem>
                <StaggerItem>
                  <div className="flex items-start gap-3 rounded-xl border border-border bg-card p-4">
                    <Phone className="mt-0.5 size-5 shrink-0 text-primary" />
                    <div>
                      <p className="text-sm font-medium text-brand-charcoal">Call Us</p>
                      <a href={siteConfig.phoneHref} className="text-sm text-muted-foreground hover:text-primary">
                        {siteConfig.phone}
                      </a>
                    </div>
                  </div>
                </StaggerItem>
                <StaggerItem>
                  <div className="flex items-start gap-3 rounded-xl border border-border bg-card p-4">
                    <Headset className="mt-0.5 size-5 shrink-0 text-primary" />
                    <div>
                      <p className="text-sm font-medium text-brand-charcoal">Customer Support</p>
                      <a href={siteConfig.supportPhoneHref} className="text-sm text-muted-foreground hover:text-primary">
                        {siteConfig.supportPhone}
                      </a>
                    </div>
                  </div>
                </StaggerItem>
                <StaggerItem>
                  <div className="flex items-start gap-3 rounded-xl border border-border bg-card p-4">
                    <Mail className="mt-0.5 size-5 shrink-0 text-primary" />
                    <div>
                      <p className="text-sm font-medium text-brand-charcoal">Email Us</p>
                      <a href={`mailto:${siteConfig.email}`} className="text-sm text-muted-foreground hover:text-primary">
                        {siteConfig.email}
                      </a>
                    </div>
                  </div>
                </StaggerItem>
                <StaggerItem>
                  <div className="flex items-start gap-3 rounded-xl border border-border bg-card p-4">
                    <MessageCircle className="mt-0.5 size-5 shrink-0 text-primary" />
                    <div>
                      <p className="text-sm font-medium text-brand-charcoal">WhatsApp</p>
                      <a href={siteConfig.whatsappHref} className="text-sm text-muted-foreground hover:text-primary">
                        Chat with our team
                      </a>
                    </div>
                  </div>
                </StaggerItem>
                <StaggerItem>
                  <div className="flex items-start gap-3 rounded-xl border border-border bg-card p-4">
                    <Clock className="mt-0.5 size-5 shrink-0 text-primary" />
                    <div>
                      <p className="text-sm font-medium text-brand-charcoal">Business Hours</p>
                      <p className="text-sm text-muted-foreground">Monday – Saturday, 9:30 AM – 7:00 PM IST</p>
                    </div>
                  </div>
                </StaggerItem>
              </Stagger>
            </div>

            <EnquiryForm
              fields={fields}
              enquiryType="CONTACT"
              submitLabel="Send Message"
              successTitle="Message sent"
              successDescription="Thanks for reaching out - a member of our team will get back to you shortly."
            />
          </div>

          <Reveal delay={0.15} className="mt-12 overflow-hidden rounded-2xl border border-border">
            <div className="aspect-[21/9] w-full">
              <iframe
                src={siteConfig.mapsEmbedUrl}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="strict-origin-when-cross-origin"
                title="Saibaba Transport - Head Office Location"
              />
            </div>
            <a
              href={siteConfig.mapsLinkUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 border-t border-border bg-card py-3 text-sm font-medium text-primary hover:bg-accent/40"
            >
              <MapPin className="size-4" /> Open in Google Maps
            </a>
          </Reveal>
        </div>
      </section>
    </>
  );
}
