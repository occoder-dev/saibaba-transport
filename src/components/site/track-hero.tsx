"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ChevronRight } from "lucide-react";
import { NetworkGraph } from "@/components/motion/network-graph";
import { stats } from "@/lib/data";

/**
 * Banner for the /track page - a clean, data-forward treatment (no stock
 * photo) built around the animated route network, which reads as a
 * tracking/ops experience without competing visual noise.
 */
export function TrackHero() {
  return (
    <section className="relative overflow-hidden bg-brand-charcoal pt-32 pb-14 text-white sm:pt-36 sm:pb-16">
      {/* Warm, dark radial wash - depth without a photo */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            "radial-gradient(120% 90% at 78% 8%, #2a2318 0%, #1c1c1c 46%, #141311 100%)",
        }}
      />
      <div className="pointer-events-none absolute inset-0 bg-grid opacity-[0.05]" />

      {/* The live network - crisp, undimmed, no photo behind it to compete with */}
      <div className="pointer-events-none absolute inset-0">
        <NetworkGraph className="h-full w-full" />
      </div>

      {/* Keep the left side clean for the headline; nodes are weighted right */}
      <div className="absolute inset-0 bg-gradient-to-r from-brand-charcoal via-brand-charcoal/85 via-30% to-transparent to-62%" />
      {/* Settle the bottom so the stats strip reads clearly */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-brand-charcoal/85" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.nav
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="mb-5 flex items-center gap-1.5 text-xs text-white/50"
        >
          <Link href="/" className="hover:text-primary">
            Home
          </Link>
          <ChevronRight className="size-3" />
          <span className="text-white/80">Track Shipment</span>
        </motion.nav>

        <motion.span
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 rounded-full border border-amber-400/40 bg-amber-400/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-amber-400"
        >
          <span className="relative flex size-2">
            <span className="absolute inline-flex size-full animate-ping rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex size-2 rounded-full bg-emerald-400" />
          </span>
          Network Status · Live Tracking
        </motion.span>

        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.08 }}
          className="mt-4 max-w-3xl font-display text-4xl leading-[1.05] tracking-wide sm:text-5xl lg:text-6xl"
        >
          YOUR CARGO, <span className="text-amber-400">TRACKED LIVE</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.16 }}
          className="mt-5 max-w-2xl text-base leading-relaxed text-white/65 sm:text-lg"
        >
          Enter your LR (Lorry Receipt) number below to see live status, full transit history and
          delivery branch details for your consignment.
        </motion.p>

        <motion.dl
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.26 }}
          className="mt-9 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-white/10 bg-white/10 sm:grid-cols-4"
        >
          {stats.map((stat) => (
            <div key={stat.label} className="bg-brand-charcoal/80 px-5 py-4 backdrop-blur-sm sm:px-6 sm:py-5">
              <dt className="flex items-center gap-1.5 text-[11px] font-medium uppercase tracking-wider text-white/50">
                <span className="size-1.5 rounded-full bg-emerald-400" /> {stat.label}
              </dt>
              <dd className="mt-1.5 font-display text-2xl tracking-wide text-white tabular-nums sm:text-3xl">
                {stat.value.toLocaleString("en-IN")}
                {stat.suffix}
              </dd>
            </div>
          ))}
        </motion.dl>
      </div>
    </section>
  );
}
