"use client";

import type { ReactNode } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { StaggerItem } from "@/components/motion/reveal";

export function ServiceCard({
  slug,
  name,
  short,
  icon,
  href,
}: {
  slug: string;
  name: string;
  short: string;
  icon: ReactNode;
  href?: string;
}) {
  return (
    <StaggerItem>
      <motion.div
        whileHover={{ y: -6 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
        id={slug}
        className="group relative flex h-full scroll-mt-32 flex-col overflow-hidden rounded-2xl border border-border/70 bg-card p-6 shadow-sm shadow-black/[0.03] transition-all duration-300 hover:border-primary/40 hover:shadow-premium"
      >
        <div
          className="pointer-events-none absolute -right-8 -top-8 size-24 rounded-full bg-primary/5 transition-transform duration-500 group-hover:scale-150"
          aria-hidden
        />
        <div className="relative flex size-12 items-center justify-center rounded-xl bg-primary/10 text-primary transition-colors duration-300 group-hover:bg-primary group-hover:text-white">
          {icon}
        </div>
        <h3 className="relative mt-5 text-lg font-semibold tracking-tight text-brand-charcoal">{name}</h3>
        <p className="relative mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">{short}</p>
        <Link
          href={href ?? `/services#${slug}`}
          className="relative mt-5 inline-flex items-center gap-1 text-sm font-semibold text-primary"
        >
          Learn more
          <ArrowUpRight className="size-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </Link>
      </motion.div>
    </StaggerItem>
  );
}
