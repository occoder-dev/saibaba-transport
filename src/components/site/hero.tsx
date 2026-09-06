"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Award, MapPinned, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { NetworkGraph } from "@/components/motion/network-graph";
import { stats } from "@/lib/data";

export function Hero() {
  return (
    <section className="relative flex min-h-[640px] items-center overflow-hidden bg-brand-charcoal pt-24 pb-16 text-white sm:min-h-[85vh] sm:pt-28 sm:pb-20 lg:min-h-[92vh]">

      {/* Background image */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: "url('/images/sai-baba-hero.png')",
        }}
      />

      {/* Dark left-to-right gradient */}
      <div className="absolute inset-0 bg-gradient-to-r from-black via-black/75 to-black/20" />

      {/* Bottom darkening */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/30" />

      {/* Existing grid */}
      <div className="pointer-events-none absolute inset-0 bg-grid opacity-[0.04] z-50" />
      {/* The network itself is the visual, anchored to the right - no stock
          photo. A live route pulses between our real branch cities. */}
      <div className="pointer-events-none absolute inset-y-0 right-0 hidden w-full sm:block sm:w-[68%] lg:w-[58%]">
        <NetworkGraph className="h-full w-full" />
      </div>


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
            <span className="relative flex size-2">
              <span className="absolute inline-flex size-full animate-ping rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex size-2 rounded-full bg-emerald-400" />
            </span>
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
            Pan-India multimodal logistics for textile, industrial and commercial goods - road and
            rail, backed by our own fleet and a verified partner network.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.38 }}
            className="mt-5 flex flex-wrap items-center gap-3"
          >
            <Button variant="default" asChild>
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
            transition={{ duration: 0.6, delay: 0.5 }}
            className="mt-10 flex flex-wrap items-center gap-x-7 gap-y-3 text-sm text-white/65"
          >
            <span className="flex items-center gap-2">
              <Award className="size-4 text-primary" /> 20+ years of trust
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

      {/* Network readout - a small, honest snapshot of the real network sitting
          near the route graph, distinct from the full stat band below. */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.55 }}
        className="pointer-events-none absolute bottom-10 right-6 z-10 hidden w-56 rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur-sm lg:block xl:right-10"
      >
        <p className="flex items-center gap-1.5 text-[11px] font-medium uppercase tracking-wider text-white/45">
          <span className="size-1.5 rounded-full bg-emerald-400" /> Network Snapshot
        </p>
        <dl className="mt-3 space-y-2">
          {stats.map((stat) => (
            <div key={stat.label} className="flex items-center justify-between border-b border-white/10 pb-2 text-xs last:border-0 last:pb-0">
              <dt className="text-white/55">{stat.label}</dt>
              <dd className="font-display text-base tracking-wide text-white tabular-nums">
                {stat.value.toLocaleString("en-IN")}
                {stat.suffix}
              </dd>
            </div>
          ))}
        </dl>
      </motion.div>
    </section>
  );
}