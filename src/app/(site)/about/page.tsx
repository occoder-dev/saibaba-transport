import type { Metadata } from "next";
import { Compass, Target, HeartHandshake, Users2, Truck, MapPinned, Quote, UserRound } from "lucide-react";

import { PageHero } from "@/components/site/page-hero";
import { SectionHeading } from "@/components/site/section-heading";
import { StatBand } from "@/components/site/stat-band";
import { CtaBand } from "@/components/site/cta-band";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/reveal";
import Image from "next/image";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Learn about Saibaba Transport's history, vision, mission and pan-India transportation network built around reliable, business-friendly logistics.",
};

const timeline = [
  {
    year: "Founding Years",
    title: "Started in Textile Transportation",
    description:
      "Saibaba Transport began by serving the textile trade - moving fabric and garments between mills, processing units and wholesale markets.",
  },
  {
    year: "Growth Phase",
    title: "Expanded Into Industrial & Commercial Cargo",
    description:
      "Building on textile-corridor expertise, we extended services to industrial, commercial and retail cargo across additional routes.",
  },
  {
    year: "Network Building",
    title: "Branches Opened Across Key Business Hubs",
    description:
      "New branches and transporter partnerships were added to connect India's major manufacturing and trading centers.",
  },
  {
    year: "Today",
    title: "A Pan-India Transportation Partner",
    description:
      "Today, Saibaba Transport combines its own fleet with a wider partner network to serve businesses across multiple industries nationwide.",
  },
];

const philosophy = [
  {
    icon: Compass,
    title: "Our Vision",
    description:
      "To be a dependable, pan-India transportation partner recognized for reliability, transparency and long-term business relationships.",
  },
  {
    icon: Target,
    title: "Our Mission",
    description:
      "To move every consignment - from a single textile bale to enterprise contract volumes - on time, safely and with clear communication.",
  },
  {
    icon: HeartHandshake,
    title: "Our Philosophy",
    description:
      "Business built on trust: honest estimates, accountable partners, and a support team that treats every shipment as if it were our own.",
  },
];

const leadership = [
  {
    name: "Mr. Jagdish Shukla",
    role: "Founder & Managing Director",
    image: "/images/Jagdish-Shukla.png",
  },
  {
    name: "Mr. Deepak Pandey",
    role: "Customer Relationship & Operations",
    image: "/images/Deepak-Pandey.png",
  },
  {
    name: "Mr. Saket Bihari",
    role: "Growth/Networking & Business Development",
    image: "/images/Saket-Bihari.png",
  },
];

const leadershipMessages = [
  {
    name: "Mr. Jagdish Shukla",
    role: "Founder & Managing Director",
    image: "/images/Jagdish-Shukla.png",
    title: "A personal note to everyone who moves with us",
    message: [
      "To every transporter, driver and business partner who has worked alongside us - thank you for being part of the Saibaba Transport story. What started as a small textile transportation operation has grown only because of the trust you placed in us, shipment after shipment, route after route.",
      "To our team members, your discipline on the road and honesty in every handover is what our clients actually experience as reliable service. And to the businesses who ship with us - we know your cargo is your business, and we treat it that way every single time.",
      "As we continue expanding across India, our commitment stays the same: transparent pricing, accountable partners, and a team that picks up the phone. Thank you for moving forward with us.",
    ],
  },
  {
    name: "Mr. Deepak Pandey",
    role: "Customer Relationship & Operations",
    image: "/images/Deepak-Pandey.png",
    title: "Building reliability through every shipment",
    message: [
      "Transportation is not simply about moving goods from one place to another. It is about understanding what is important to our customers and making sure every shipment receives the attention it deserves.",
      "Our focus has always been on dependable execution - coordinating vehicles, drivers, routes and delivery schedules while keeping communication clear throughout the journey.",
      "As Saibaba Transport continues to grow, we remain committed to building strong customer relationships through consistency, responsiveness and service that businesses can depend on.",
    ],
  },
  {
    name: "Mr. Saket Bihari",
    role: "Growth/Networking & Business Development",
    image: "/images/Saket-Bihari.png",
    title: "Growing together with our customers and partners",
    message: [
      "The strength of a transportation company comes from the relationships it builds - with customers, drivers, employees and transport partners across every route we serve.",
      "Our journey forward is about expanding our reach while maintaining the trust and personal attention that have shaped Saibaba Transport from the beginning.",
      "We look forward to strengthening our network, improving our capabilities and creating long-term partnerships with businesses across India.",
    ],
  },
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About Saibaba Transport"
        title="A transportation partner built on trust and reach"
        description="From our roots in textile transportation to a growing pan-India network - here's the story, philosophy and capability behind Saibaba Transport."
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "About Us" }]}
      />

      <section className="py-20 sm:py-28">
        <div className="mx-auto grid max-w-7xl gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:items-center lg:px-8">
          <Reveal>
            <span className="inline-flex items-center rounded-full border border-primary/30 bg-primary/5 px-3 py-1 text-xs font-medium uppercase tracking-wider text-primary">
              Company Introduction
            </span>
            <h2 className="mt-4 font-display text-3xl leading-tight tracking-wide text-brand-charcoal sm:text-4xl">
              Reliable movement, backed by real transportation experience
            </h2>
            <p className="mt-5 text-base leading-relaxed text-muted-foreground">
              Saibaba Transport is a pan-India transportation and logistics
              company built around one idea: businesses need a transport
              partner they can rely on without having to double-check every
              shipment. What began as a dedicated textile transportation
              operation has grown into a broader network serving
              manufacturing, retail, FMCG, e-commerce, industrial, automotive,
              construction and pharmaceutical businesses.
            </p>
            <p className="mt-4 text-base leading-relaxed text-muted-foreground">
              We operate through a combination of company-owned vehicles and a
              carefully vetted network of third-party transporters - giving
              clients flexible capacity and wider route coverage while keeping
              accountability centralized with our team.
            </p>
          </Reveal>
          <Reveal delay={0.15}>
            <div className="rounded-3xl border border-border bg-secondary/40 p-8">
              <StatBand light={false} />
            </div>
          </Reveal>
        </div>
      </section>

      <section className="bg-secondary/30 py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            align="center"
            eyebrow="Vision, Mission &amp; Philosophy"
            title="What drives how we operate"
            className="mx-auto"
          />
          <Stagger className="mt-14 grid gap-6 md:grid-cols-3">
            {philosophy.map((item) => {
              const Icon = item.icon;
              return (
                <StaggerItem key={item.title}>
                  <div className="flex h-full flex-col items-start rounded-2xl border border-border bg-card p-7 shadow-sm">
                    <div className="flex size-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
                      <Icon className="size-6" />
                    </div>
                    <h3 className="mt-5 text-lg font-semibold text-brand-charcoal">{item.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{item.description}</p>
                  </div>
                </StaggerItem>
              );
            })}
          </Stagger>
        </div>
      </section>

      <section className="py-20 sm:py-28">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <SectionHeading align="center" eyebrow="Our Journey" title="From a textile transporter to a pan-India network" className="mx-auto" />
          <div className="relative mt-16">
            <div className="absolute left-4 top-0 bottom-0 w-px bg-border sm:left-1/2" aria-hidden />
            <div className="space-y-10">
              {timeline.map((item, i) => (
                <Reveal key={item.title} delay={i * 0.05}>
                  <div
                    className={`relative flex flex-col gap-2 pl-12 sm:w-1/2 sm:pl-0 sm:pr-10 ${i % 2 === 1 ? "sm:ml-auto sm:pl-10 sm:pr-0 sm:text-left" : "sm:text-right"
                      }`}
                  >
                    <span
                      className={`absolute left-2.5 top-1.5 size-3.5 rounded-full border-2 border-primary bg-background sm:top-1.5 [&:where(:first-child)]:mt-0 ${i % 2 === 1 ? "sm:left-[-7px] sm:right-auto" : "sm:left-auto sm:right-[-7px]"
                        }`}
                    />
                    <span className="text-xs font-semibold uppercase tracking-wider text-primary">{item.year}</span>
                    <h3 className="text-lg font-semibold text-brand-charcoal">{item.title}</h3>
                    <p className="text-sm leading-relaxed text-muted-foreground">{item.description}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-brand-charcoal py-20 text-white sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-10 md:grid-cols-3">
            <Reveal className="flex flex-col items-start gap-3">
              <Truck className="size-8 text-primary" />
              <h3 className="text-lg font-semibold">Own Fleet &amp; Network</h3>
              <p className="text-sm leading-relaxed text-white/60">
                Company-owned vehicles combined with a growing partner
                network for flexible, scalable capacity.
              </p>
            </Reveal>
            <Reveal delay={0.1} className="flex flex-col items-start gap-3">
              <MapPinned className="size-8 text-primary" />
              <h3 className="text-lg font-semibold">Pan-India Operations</h3>
              <p className="text-sm leading-relaxed text-white/60">
                Branches and route coverage connecting major manufacturing
                and trading hubs across India.
              </p>
            </Reveal>
            <Reveal delay={0.2} className="flex flex-col items-start gap-3">
              <Users2 className="size-8 text-primary" />
              <h3 className="text-lg font-semibold">A Dedicated Team</h3>
              <p className="text-sm leading-relaxed text-white/60">
                Branch-level coordinators and support staff focused on
                keeping every shipment on schedule.
              </p>
            </Reveal>
          </div>
        </div>
      </section>


      <section className="py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            align="center"
            eyebrow="Our Leadership"
            title="The people behind Saibaba Transport"
            description="A leadership team focused on reliable transportation, strong partnerships and long-term business relationships."
            className="mx-auto"
          />

          <Stagger className="mt-14 grid gap-6 md:grid-cols-3">
            {leadership.map((person) => (
              <StaggerItem key={person.name}>
                <div className="group flex h-full flex-col items-center rounded-3xl border border-border bg-card p-8 text-center shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
                  <div className="relative">
                    <div
                      className="absolute -inset-3 rounded-full bg-primary/10 blur-2xl transition-opacity duration-300 group-hover:bg-primary/20"
                      aria-hidden
                    />

                    <div className="relative flex size-36 items-center justify-center overflow-hidden rounded-full border-4 border-primary/10 bg-gradient-to-br from-brand-gray-dark to-brand-charcoal shadow-xl">
                      {person.image ? (
                        <Image
                          src={person.image}
                          alt={person.name}
                          fill
                          className="rounded-full object-cover object-top"
                          sizes="144px"
                        />
                      ) : (
                        <UserRound
                          className="size-16 text-white/30"
                          strokeWidth={1.25}
                        />
                      )}
                    </div>
                  </div>

                  <div className="mt-6">
                    <h3 className="text-lg font-semibold tracking-tight text-brand-charcoal">
                      {person.name}
                    </h3>
                    <p className="mt-1 text-sm font-medium text-primary">
                      {person.role}
                    </p>
                  </div>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      <section className="relative overflow-hidden bg-secondary/30 py-20 sm:py-28">
        <div
          className="pointer-events-none absolute inset-x-0 top-0 h-px bg-border"
          aria-hidden
        />

        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            align="center"
            eyebrow="Leadership Messages"
            title="A few words from our leadership"
            description="The people behind Saibaba Transport share what reliability, partnership and growth mean to them."
            className="mx-auto"
          />

          <div className="mt-14 space-y-8">
            {leadershipMessages.map((person, index) => (
              <Reveal key={person.name} delay={index * 0.1}>
                <div className="relative overflow-hidden rounded-3xl border border-border/70 bg-brand-charcoal text-white shadow-premium-lg">
                  <div
                    className="pointer-events-none absolute inset-0 bg-grid opacity-[0.06]"
                    aria-hidden
                  />

                  <div
                    className="pointer-events-none absolute -top-24 right-[-8%] size-72 rounded-full bg-primary/20 blur-3xl"
                    aria-hidden
                  />

                  <div className="relative grid gap-8 p-7 sm:p-10 lg:grid-cols-[220px_1fr] lg:items-center lg:gap-12 lg:p-12">
                    {/* Person */}
                    <div className="mx-auto flex w-full max-w-[180px] flex-col items-center text-center lg:mx-0">
                      <div className="relative">
                        <div
                          className="absolute -inset-3 rounded-full bg-primary/20 blur-2xl"
                          aria-hidden
                        />

                        <div className="relative flex size-36 items-center justify-center overflow-hidden rounded-full border-4 border-white/15 bg-gradient-to-br from-brand-gray-dark to-brand-charcoal shadow-2xl">
                          {person.image ? (
                            <Image
                              src={person.image}
                              alt={person.name}
                              fill
                              className="rounded-full object-cover object-top"
                              sizes="144px"
                            />
                          ) : (
                            <UserRound
                              className="size-16 text-white/30"
                              strokeWidth={1.25}
                            />
                          )}
                        </div>
                      </div>

                      <p className="mt-5 text-lg font-semibold tracking-tight text-white">
                        {person.name}
                      </p>

                      <p className="mt-1 text-sm text-primary">
                        {person.role}
                      </p>
                    </div>

                    {/* Message */}
                    <div className="relative">
                      <Quote
                        className="size-9 text-primary/50"
                        strokeWidth={1.5}
                      />

                      <h3 className="mt-4 font-display text-2xl tracking-wide text-white sm:text-3xl">
                        {person.title}
                      </h3>

                      <blockquote className="mt-5 space-y-4 text-base leading-relaxed text-white/75 sm:text-lg">
                        {person.message.map((paragraph) => (
                          <p key={paragraph}>{paragraph}</p>
                        ))}
                      </blockquote>

                      <div className="mt-7">
                        <p className="font-display text-xl tracking-wide text-white">
                          {person.name}
                        </p>
                        <p className="text-sm text-white/45">
                          {person.role}, Saibaba Transport
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <CtaBand
        title="Want to know more about our network?"
        description="Talk to our team about your transportation needs, or browse our branches and services."
      />
    </>
  );
}
