"use client";

import type { ReactNode } from "react";
import { motion } from "framer-motion";
import { StaggerItem } from "@/components/motion/reveal";

export function IndustryCard({
  name,
  description,
  icon,
}: {
  name: string;
  description: string;
  icon: ReactNode;
}) {
  return (
    <StaggerItem>
      <motion.div
        whileHover={{ scale: 1.03 }}
        transition={{ type: "spring", stiffness: 300, damping: 18 }}
        className="group flex h-full flex-col items-start gap-3 rounded-2xl border border-border/70 bg-card p-6 text-left shadow-sm shadow-black/[0.03] transition-all duration-300 hover:border-primary/40 hover:bg-accent/40 hover:shadow-premium"
      >
        <div className="flex size-11 items-center justify-center rounded-xl bg-secondary text-brand-gray-dark transition-colors duration-300 group-hover:bg-primary group-hover:text-white">
          {icon}
        </div>
        <h3 className="text-base font-semibold tracking-tight text-brand-charcoal">{name}</h3>
        <p className="text-sm leading-relaxed text-muted-foreground">{description}</p>
      </motion.div>
    </StaggerItem>
  );
}
