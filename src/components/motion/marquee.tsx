"use client";

import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type MarqueeProps = {
  children: ReactNode;
  className?: string;
  reverse?: boolean;
  speedClassName?: string;
};

export function Marquee({ children, className, reverse, speedClassName }: MarqueeProps) {
  return (
    <div className={cn("relative flex w-full overflow-hidden mask-fade-x", className)}>
      <div
        className={cn(
          "flex w-max shrink-0 items-center gap-10 pr-10",
          reverse ? "animate-marquee-reverse" : "animate-marquee",
          speedClassName
        )}
      >
        {children}
      </div>
      <div
        aria-hidden
        className={cn(
          "flex w-max shrink-0 items-center gap-10 pr-10",
          reverse ? "animate-marquee-reverse" : "animate-marquee",
          speedClassName
        )}
      >
        {children}
      </div>
    </div>
  );
}
