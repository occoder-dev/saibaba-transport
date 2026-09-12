import Link from "next/link";
import Image from "next/image";
import { Phone, Mail, MapPin, MessageCircle } from "lucide-react";

import { siteConfig } from "@/lib/data";
import { listBranches } from "@/lib/services/branches";
import { FacebookIcon, InstagramIcon, LinkedinIcon } from "@/components/site/social-icons";

const serviceLinks = [
  { label: "Full Truck Load", href: "/services#full-truck-load" },
  { label: "Part Truck Load", href: "/services#part-truck-load" },
  { label: "Rail / Train Transportation", href: "/services#rail-transportation" },
  { label: "Textile Transportation", href: "/services/textile-transportation" },
  { label: "Industrial Transportation", href: "/services#industrial-transportation" },
  { label: "Pan-India Transportation", href: "/services#pan-india-transportation" },
];

const companyLinks = [
  { label: "About Us", href: "/about" },
  { label: "Fleet & Network", href: "/fleet" },
  { label: "Industries We Serve", href: "/industries" },
  { label: "Branches", href: "/branches" },
  { label: "Blog", href: "/blog" },
  { label: "Careers", href: "/careers" },
];

const enquiryLinks = [
  { label: "Transport Estimate", href: "/estimate" },
  { label: "Request a Quote", href: "/quote" },
  { label: "Business Partnership", href: "/partners" },
  { label: "Transporter Registration", href: "/transporter-registration" },
  { label: "FAQ", href: "/faq" },
];

const legalLinks = [
  { label: "Privacy Policy", href: "/privacy-policy" },
  { label: "Terms & Conditions", href: "/terms" },
  { label: "Disclaimer", href: "/disclaimer" },
];

export async function Footer() {
  const branches = await listBranches({ onlyActive: true });
  const headOffice = branches.find((b) => b.isHeadOffice) ?? branches[0];

  return (
    <footer className="relative overflow-hidden border-t border-border bg-brand-charcoal text-white">
      <div className="pointer-events-none absolute inset-0 bg-grid opacity-[0.06]" />
      <div className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div>
            <Link href="/" className="flex items-center gap-2.5">
              <Image src="/logo-transparent.png" alt="Sai Baba Transport" width={120} height={80} className=" bg-white rounded-xl" />
            </Link>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-white/60">
              {siteConfig.description}
            </p>
            <div className="mt-5 flex items-center gap-3">
              <a
                href="#"
                aria-label="Facebook"
                className="flex size-9 items-center justify-center rounded-full bg-white/10 text-white/70 transition-all duration-200 hover:-translate-y-0.5 hover:bg-primary hover:text-white"
              >
                <FacebookIcon className="size-4" />
              </a>
              <a
                href="#"
                aria-label="Instagram"
                className="flex size-9 items-center justify-center rounded-full bg-white/10 text-white/70 transition-all duration-200 hover:-translate-y-0.5 hover:bg-primary hover:text-white"
              >
                <InstagramIcon className="size-4" />
              </a>
              <a
                href="#"
                aria-label="LinkedIn"
                className="flex size-9 items-center justify-center rounded-full bg-white/10 text-white/70 transition-all duration-200 hover:-translate-y-0.5 hover:bg-primary hover:text-white"
              >
                <LinkedinIcon className="size-4" />
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-white">Services</h4>
            <ul className="mt-4 space-y-2.5">
              {serviceLinks.map((l) => (
                <li key={l.label}>
                  <Link href={l.href} className="text-sm text-white/60 transition-colors hover:text-primary">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-white">Company</h4>
            <ul className="mt-4 space-y-2.5">
              {companyLinks.map((l) => (
                <li key={l.label}>
                  <Link href={l.href} className="text-sm text-white/60 transition-colors hover:text-primary">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-white">Get Started</h4>
            <ul className="mt-4 space-y-2.5">
              {enquiryLinks.map((l) => (
                <li key={l.label}>
                  <Link href={l.href} className="text-sm text-white/60 transition-colors hover:text-primary">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 grid gap-6 border-t border-white/10 pt-8 sm:grid-cols-2 lg:grid-cols-4">
          <div className="flex items-start gap-3">
            <MapPin className="mt-0.5 size-5 shrink-0 text-primary" />
            <div>
              <p className="text-sm font-medium text-white/90">Head Office</p>
              <p className="text-sm text-white/60">{headOffice?.address ?? siteConfig.address}</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <Phone className="mt-0.5 size-5 shrink-0 text-primary" />
            <div>
              <p className="text-sm font-medium text-white/90">Call Us</p>
              <a href={siteConfig.phoneHref} className="text-sm text-white/60 hover:text-primary">
                {siteConfig.phone}
              </a>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <Mail className="mt-0.5 size-5 shrink-0 text-primary" />
            <div>
              <p className="text-sm font-medium text-white/90">Email Us</p>
              <a href={`mailto:${siteConfig.email}`} className="text-sm text-white/60 hover:text-primary">
                {siteConfig.email}
              </a>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <MessageCircle className="mt-0.5 size-5 shrink-0 text-primary" />
            <div>
              <p className="text-sm font-medium text-white/90">WhatsApp</p>
              <a href={siteConfig.whatsappHref} className="text-sm text-white/60 hover:text-primary">
                Chat with us
              </a>
            </div>
          </div>
        </div>

        <div className="mt-10 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-8 text-center sm:flex-row sm:text-left">
          <p className="text-xs text-white/50">
            © {new Date().getFullYear()} Sai Baba Transport. All rights reserved.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2">
            {legalLinks.map((l) => (
              <Link key={l.label} href={l.href} className="text-xs text-white/50 hover:text-primary">
                {l.label}
              </Link>
            ))}
          </div>
          <p className="text-xs text-white/40">
            Site by{" "}
            <a
              href="https://lunetron.com"
              className="text-white/60 hover:text-primary"
            >
              Lunetron Web Services
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
