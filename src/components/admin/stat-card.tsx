import Link from "next/link";
import type { LucideIcon } from "lucide-react";
import { ArrowUpRight } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

export function StatCard({
  label,
  value,
  icon: Icon,
  href,
  accent,
}: {
  label: string;
  value: number | string;
  icon: LucideIcon;
  href?: string;
  accent?: "primary" | "amber" | "green" | "muted";
}) {
  const accentClass =
    accent === "amber"
      ? "bg-amber-500/10 text-amber-600"
      : accent === "green"
        ? "bg-emerald-500/10 text-emerald-600"
        : accent === "muted"
          ? "bg-muted text-muted-foreground"
          : "bg-primary/10 text-primary";

  const inner = (
    <Card className={cn("h-full transition-all duration-300", href && "group hover:-translate-y-0.5 hover:shadow-premium")}>
      <CardContent className="flex h-full items-center gap-4">
        <div className={cn("flex size-11 shrink-0 items-center justify-center rounded-xl transition-transform duration-300", accentClass, href && "group-hover:scale-105")}>
          <Icon className="size-5" />
        </div>
        <div className="min-w-0 flex-1">
          <p className="text-2xl font-semibold tracking-tight tabular-nums text-brand-charcoal">{value}</p>
          <p className="truncate text-sm text-muted-foreground">{label}</p>
        </div>
        {href && (
          <ArrowUpRight className="size-4 shrink-0 text-muted-foreground/50 transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-primary" />
        )}
      </CardContent>
    </Card>
  );

  return href ? <Link href={href} className="block h-full">{inner}</Link> : inner;
}
