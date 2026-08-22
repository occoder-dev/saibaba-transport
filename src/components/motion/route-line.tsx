"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export function RouteLine({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 1200 200"
      fill="none"
      className={cn("w-full h-auto", className)}
      preserveAspectRatio="none"
    >
      <motion.path
        d="M-20 150 C 200 40, 380 220, 600 110 S 1000 20, 1220 90"
        stroke="currentColor"
        strokeOpacity="0.18"
        strokeWidth="2"
        strokeDasharray="2 14"
        strokeLinecap="round"
      />
      <motion.path
        d="M-20 150 C 200 40, 380 220, 600 110 S 1000 20, 1220 90"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
        fill="none"
        pathLength={1}
        strokeDasharray="0.08 0.92"
        initial={{ pathOffset: 0 }}
        animate={{ pathOffset: 1 }}
        transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
      />
    </svg>
  );
}
