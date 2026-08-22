"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight, Award, MapPinned, ShieldCheck, Truck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { siteConfig } from "@/lib/data";

export function Hero() {
  return (
    <section className="relative flex min-h-[640px] items-center overflow-hidden bg-brand-charcoal pt-24 pb-16 text-white sm:min-h-[85vh] sm:pt-28 sm:pb-20 lg:min-h-[92vh]">
      {/* Single full-bleed photo — the truck itself IS the background on the right,
          fading into the brand-charcoal panel on the left where the copy sits. */}
      <motion.div
        className="absolute inset-0"
        initial={{ scale: 1.08 }}
        animate={{ scale: 1 }}
        transition={{ duration: 12, ease: [0.16, 1, 0.3, 1] }}
      >
        <Image
          src="/images/truck-hero.jpg"
          alt="A Saibaba Transport truck at golden hour, branded container reading Saibaba Transport, Moving Yourself for Success"
          fill
          priority
          sizes="100vw"
          className="object-cover object-[62%_38%] sm:object-[68%_42%]"
        />
      </motion.div>

      {/* Horizontal fade: solid charcoal on the left for legible copy, fully clear over the truck on the right */}
      <div className="absolute inset-0 bg-gradient-to-r from-brand-charcoal via-brand-charcoal/92 via-35% to-transparent to-75% sm:via-40% sm:to-65%" />
      {/* Vertical fades: keep the nav bar and bottom trust row legible over sky / ground */}
      <div className="absolute inset-0 bg-gradient-to-b from-brand-charcoal/55 via-transparent to-brand-charcoal/70" />

      <motion.div
        className="pointer-events-none absolute bottom-[-15%] left-[-10%] size-[26rem] rounded-full bg-primary/25 blur-3xl"
        animate={{ scale: [1, 1.1, 1], opacity: [0.45, 0.65, 0.45] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Thin tri-color accent rule, echoing the chevron trim on our own trucks */}
      <div className="absolute inset-x-0 top-0 z-10 h-[3px] bg-gradient-to-r from-primary via-amber-400 to-primary" />

      <div className="relative mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-xl lg:max-w-2xl">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 rounded-full border border-primary/40 bg-primary/10 px-3 py-1.5 text-xs font-semibold uppercase tracking-wider text-primary backdrop-blur-sm"
          >
            <Truck className="size-3.5" />
            Pan-India Transportation Partner
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mt-5 font-display text-5xl leading-[1.02] tracking-wide sm:text-6xl lg:text-7xl"
          >
            MOVING YOUR
            <br />
            <span className="text-gradient-brand">BUSINESS FORWARD</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-6 max-w-lg text-base leading-relaxed text-white/70 sm:text-lg"
          >
            {siteConfig.description} From bulk textile dispatch to pan-India
            contract transportation — one reliable partner for every route.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-8 flex flex-wrap items-center gap-3"
          >
            <Button size="lg" asChild className="group">
              <Link href="/estimate">
                Calculate Transport Cost
                <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild className="border-white/25 bg-white/5 text-white hover:bg-white/10 hover:text-white">
              <Link href="/quote">Request a Quote</Link>
            </Button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.45 }}
            className="mt-10 flex flex-wrap items-center gap-x-7 gap-y-3 text-sm text-white/65"
          >
            <span className="flex items-center gap-2">
              <Award className="size-4 text-primary" /> 15+ years of trust
            </span>
            <span className="flex items-center gap-2">
              <MapPinned className="size-4 text-primary" /> Branches across India
            </span>
            <span className="flex items-center gap-2">
              <ShieldCheck className="size-4 text-primary" /> Own fleet + verified partners
            </span>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
