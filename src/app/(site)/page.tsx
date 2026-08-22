import Link from "next/link";
import Image from "next/image";
import { ArrowRight, CheckCircle2, MapPin, Shirt, Truck } from "lucide-react";

import { Hero } from "@/components/site/hero";
import { SectionHeading } from "@/components/site/section-heading";
import { ServiceCard } from "@/components/site/service-card";
import { IndustryCard } from "@/components/site/industry-card";
import { BranchCard } from "@/components/site/branch-card";
import { StatBand } from "@/components/site/stat-band";
import { CtaBand } from "@/components/site/cta-band";
import { FaqAccordion } from "@/components/site/faq-accordion";
import { Marquee } from "@/components/motion/marquee";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/reveal";
import { Button } from "@/components/ui/button";
import { whyChooseUs, partnerLogosPlaceholder } from "@/lib/data";
import { listServices } from "@/lib/services/services";
import { listIndustries } from "@/lib/services/industries";
import { listBranches } from "@/lib/services/branches";
import { listFaqs } from "@/lib/services/faqs";
import { listGalleryImages } from "@/lib/services/gallery";
import { getIcon } from "@/lib/icon-map";

export default async function Home() {
  const [services, industries, branches, faqs, galleryImages] = await Promise.all([
    listServices({ onlyActive: true }),
    listIndustries({ onlyActive: true }),
    listBranches({ onlyActive: true }),
    listFaqs({ onlyActive: true }),
    listGalleryImages({ onlyActive: true }),
  ]);

  return (
    <>
      <Hero />

      {/* Trusted-by strip */}
      <section className="border-b border-border bg-secondary/40 py-8">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <p className="mb-5 text-center text-xs font-medium uppercase tracking-widest text-muted-foreground">
            Trusted across textile, industrial &amp; commercial supply chains
          </p>
          <Marquee>
            {[...partnerLogosPlaceholder, ...partnerLogosPlaceholder].map((name, i) => (
              <span
                key={`${name}-${i}`}
                className="whitespace-nowrap px-6 text-lg font-semibold tracking-wide text-brand-gray/60"
              >
                {name}
              </span>
            ))}
          </Marquee>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-brand-charcoal py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <StatBand />
        </div>
      </section>

      {/* Services preview */}
      <section className="py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
            <SectionHeading
              eyebrow="What We Do"
              title="Transportation services built for every load"
              description="From dedicated full truck loads to shared part-load shipments, our services cover the full range of business transportation needs."
            />
            <Reveal>
              <Button variant="outline" asChild className="shrink-0">
                <Link href="/services">
                  View All Services <ArrowRight className="size-4" />
                </Link>
              </Button>
            </Reveal>
          </div>

          <Stagger className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {services.slice(0, 6).map((service) => {
              const Icon = getIcon(service.icon);
              return (
                <ServiceCard
                  key={service.slug}
                  slug={service.slug}
                  name={service.name}
                  short={service.short}
                  icon={<Icon className="size-6" />}
                />
              );
            })}
          </Stagger>
        </div>
      </section>

      {/* Textile spotlight */}
      <section className="relative overflow-hidden bg-accent/60 py-20 sm:py-24">
        <div className="mx-auto grid max-w-7xl gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:items-center lg:px-8">
          <Reveal>
            <span className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-white px-3 py-1.5 text-xs font-medium uppercase tracking-wider text-primary">
              <Shirt className="size-3.5" /> Our Founding Specialty
            </span>
            <h2 className="mt-5 font-display text-3xl leading-tight tracking-wide text-brand-charcoal sm:text-4xl">
              Textile transportation is where we started -
              and where we lead
            </h2>
            <p className="mt-5 text-base leading-relaxed text-muted-foreground">
              From grey fabric to finished garments, Saibaba Transport moves bulk
              textile cargo between mills, processing units, wholesale markets and
              retail destinations across India - with the careful, bale-safe
              handling the textile trade demands.
            </p>
            <ul className="mt-6 space-y-3">
              {[
                "Deep textile-corridor route experience",
                "Mill-to-market, pan-India coverage",
                "Trusted by textile traders for years",
              ].map((point) => (
                <li key={point} className="flex items-center gap-2.5 text-sm text-foreground/80">
                  <CheckCircle2 className="size-4 shrink-0 text-primary" />
                  {point}
                </li>
              ))}
            </ul>
            <Button className="mt-8" asChild>
              <Link href="/services/textile-transportation">
                Explore Textile Transportation <ArrowRight className="size-4" />
              </Link>
            </Button>
          </Reveal>

          <Reveal delay={0.15} className="relative">
            <div className="relative mx-auto flex aspect-square max-w-md items-center justify-center rounded-3xl bg-white shadow-xl">
              <div className="absolute inset-6 rounded-2xl border-2 border-dashed border-primary/20" />
              <Image
                src="/images/textile-transportation.png"
                alt="Saibaba Transport textile transportation"
                width={380}
                height={380}
                className="relative w-2/3 max-w-xs"
              />
            </div>
          </Reveal>
        </div>
      </section>

      {/* Industries preview */}
      <section className="py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            align="center"
            eyebrow="Who We Serve"
            title="One transportation partner, every industry"
            description="Beyond textile, our network supports manufacturing, retail, FMCG, e-commerce and more - with services shaped around each industry's shipping patterns."
          />
          <Stagger className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {industries.map((industry) => {
              const Icon = getIcon(industry.icon);
              return (
                <IndustryCard
                  key={industry.name}
                  name={industry.name}
                  description={industry.description}
                  icon={<Icon className="size-5" />}
                />
              );
            })}
          </Stagger>
          <div className="mt-10 text-center">
            <Button variant="outline" asChild>
              <Link href="/industries">
                See All Industries <ArrowRight className="size-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Fleet / network highlight */}
      <section className="bg-brand-charcoal py-20 text-white sm:py-24">
        <div className="mx-auto grid max-w-7xl gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:items-center lg:px-8">
          <Reveal>
            <span className="inline-flex items-center gap-2 rounded-full border border-primary/40 bg-primary/10 px-3 py-1.5 text-xs font-medium uppercase tracking-wider text-primary">
              <Truck className="size-3.5" /> Fleet &amp; Network
            </span>
            <h2 className="mt-5 font-display text-3xl leading-tight tracking-wide sm:text-4xl">
              Own fleet, extended by a trusted transporter network
            </h2>
            <p className="mt-5 text-base leading-relaxed text-white/65">
              We combine company-owned trucks with a growing network of verified
              third-party transporters - giving businesses flexible capacity and
              wider route coverage without compromising on accountability.
            </p>
            <Button variant="secondary" className="mt-8 text-primary" asChild>
              <Link href="/fleet">
                Explore Fleet &amp; Network <ArrowRight className="size-4" />
              </Link>
            </Button>
          </Reveal>
          <Reveal delay={0.15}>
            <div className="grid grid-cols-2 gap-4">
              {whyChooseUs.slice(0, 4).map((item) => {
                const Icon = item.icon;
                return (
                  <div key={item.title} className="rounded-2xl border border-white/10 bg-white/5 p-5">
                    <Icon className="size-6 text-primary" />
                    <p className="mt-3 text-sm font-semibold text-white">{item.title}</p>
                    <p className="mt-1.5 text-xs leading-relaxed text-white/55">{item.description}</p>
                  </div>
                );
              })}
            </div>
          </Reveal>
        </div>
      </section>

      {/* Gallery preview */}
      {galleryImages.length > 0 && (
        <section className="py-20 sm:py-28">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
              <SectionHeading
                eyebrow="Gallery"
                title="A look at our fleet, loads & operations"
                description="Real photos of Saibaba Transport trucks, ongoing loads and warehouse operations from across our branch network."
              />
              <Reveal>
                <Button variant="outline" asChild className="shrink-0">
                  <Link href="/gallery">
                    View Full Gallery <ArrowRight className="size-4" />
                  </Link>
                </Button>
              </Reveal>
            </div>

            <Stagger className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
              {galleryImages.slice(0, 8).map((image) => (
                <StaggerItem key={image.id}>
                  <Link
                    href="/gallery"
                    className="group relative block aspect-square w-full overflow-hidden rounded-2xl border border-border bg-muted shadow-sm"
                  >
                    <Image
                      src={image.url}
                      alt={image.caption || "Saibaba Transport gallery photo"}
                      fill
                      sizes="(min-width: 1024px) 25vw, (min-width: 640px) 33vw, 50vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </Link>
                </StaggerItem>
              ))}
            </Stagger>
          </div>
        </section>
      )}

      <CtaBand />

      {/* Branches teaser */}
      <section className="py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
            <SectionHeading
              eyebrow="Pan-India Presence"
              title="A branch network built around India's trade hubs"
              description="Local support, backed by a single point of coordination for multi-state shipments."
            />
            <Reveal>
              <Button variant="outline" asChild className="shrink-0">
                <Link href="/branches">
                  <MapPin className="size-4" /> View All Branches
                </Link>
              </Button>
            </Reveal>
          </div>
          <Stagger className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {branches.slice(0, 3).map((branch) => (
              <BranchCard key={branch.city} branch={branch} />
            ))}
          </Stagger>
        </div>
      </section>

      {/* FAQ preview */}
      <section className="bg-secondary/40 py-20 sm:py-28">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <SectionHeading align="center" eyebrow="Questions" title="Frequently asked questions" className="mx-auto" />
          <div className="mt-12">
            <FaqAccordion faqs={faqs.slice(0, 5)} showFilters={false} />
          </div>
          <div className="mt-8 text-center">
            <Button variant="outline" asChild>
              <Link href="/faq">
                View All FAQs <ArrowRight className="size-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
