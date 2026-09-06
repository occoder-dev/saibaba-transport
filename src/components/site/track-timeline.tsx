"use client";

import { motion } from "framer-motion";
import { CheckCircle2, MapPinned, PackageCheck, Truck, Warehouse } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  formatApiDate,
  normalizeOpType,
  opTypeLabels,
  type TrackHistoryEntry,
} from "@/lib/tracking";

const opTypeIcon: Record<string, React.ComponentType<{ className?: string }>> = {
  OUT: Truck,
  TRANSIT: Truck,
  CROSSING: MapPinned,
  IN: Warehouse,
  DELIVERY: PackageCheck,
  OTHER: MapPinned,
};

export function TrackTimeline({ entries }: { entries: TrackHistoryEntry[] }) {
  if (entries.length === 0) {
    return (
      <div className="rounded-2xl border border-dashed border-border bg-secondary/30 p-6 text-sm text-muted-foreground">
        This shipment has been booked, but movement details haven&apos;t been recorded yet. Check back
        after dispatch for step-by-step tracking.
      </div>
    );
  }

  return (
    <ol className="relative">
      {entries.map((entry, i) => {
        const isLast = i === entries.length - 1;
        const key = normalizeOpType(entry.OpType);
        const Icon = opTypeIcon[key] ?? MapPinned;
        const label = opTypeLabels[key];

        return (
          <motion.li
            key={`${entry.OpType}-${entry.OpDate}-${i}`}
            initial={{ opacity: 0, x: -12 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, delay: i * 0.07, ease: [0.16, 1, 0.3, 1] }}
            className="relative flex gap-4 pb-8 last:pb-0"
          >
            {!isLast && (
              <span
                className="absolute left-[19px] top-10 bottom-0 w-px bg-gradient-to-b from-border to-border/40"
                aria-hidden
              />
            )}

            <span
              className={cn(
                "relative z-10 flex size-10 shrink-0 items-center justify-center rounded-full border-2",
                isLast
                  ? "border-primary bg-primary text-primary-foreground shadow-sm shadow-primary/30"
                  : "border-border bg-card text-muted-foreground"
              )}
            >
              {isLast && key === "DELIVERY" ? (
                <CheckCircle2 className="size-5" />
              ) : (
                <Icon className="size-4.5" />
              )}
            </span>

            <div className="min-w-0 flex-1 pt-1">
              <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                <p className={cn("text-sm font-semibold", isLast ? "text-brand-charcoal" : "text-foreground/80")}>
                  {label}
                </p>
                <span className="text-xs font-medium text-muted-foreground">{formatApiDate(entry.OpDate)}</span>
              </div>

              <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                {entry.Description ||
                  (entry.FromBranch && entry.ToBranch
                    ? `${entry.FromBranch} → ${entry.ToBranch}`
                    : "Status updated")}
              </p>

              {(entry.TruckNo || entry.VIAStation || entry.TotParcel) && (
                <div className="mt-2 flex flex-wrap gap-1.5">
                  {entry.FromBranch && entry.ToBranch && (
                    <span className="inline-flex items-center rounded-full border border-border bg-secondary/60 px-2.5 py-1 text-xs text-foreground/70">
                      {entry.FromBranch} → {entry.ToBranch}
                    </span>
                  )}
                  {entry.TruckNo && (
                    <span className="inline-flex items-center rounded-full border border-border bg-secondary/60 px-2.5 py-1 text-xs text-foreground/70">
                      Vehicle {entry.TruckNo}
                    </span>
                  )}
                  {entry.VIAStation && entry.VIAStation.toUpperCase() !== "DIRECT" && (
                    <span className="inline-flex items-center rounded-full border border-border bg-secondary/60 px-2.5 py-1 text-xs text-foreground/70">
                      Via {entry.VIAStation}
                    </span>
                  )}
                  {entry.TotParcel && (
                    <span className="inline-flex items-center rounded-full border border-border bg-secondary/60 px-2.5 py-1 text-xs text-foreground/70">
                      {entry.TotParcel} parcel{entry.TotParcel === "1" ? "" : "s"}
                    </span>
                  )}
                </div>
              )}
            </div>
          </motion.li>
        );
      })}
    </ol>
  );
}
