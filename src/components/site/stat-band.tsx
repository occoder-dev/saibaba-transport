import { stats } from "@/lib/data";
import { Counter } from "@/components/motion/counter";
import { Stagger, StaggerItem } from "@/components/motion/reveal";

export function StatBand({ light = true }: { light?: boolean }) {
  return (
    <Stagger className="grid grid-cols-2 gap-6 sm:grid-cols-4">
      {stats.map((stat) => (
        <StaggerItem key={stat.label} className="text-center">
          <div className={light ? "font-display text-4xl text-white sm:text-5xl" : "font-display text-4xl text-brand-charcoal sm:text-5xl"}>
            <Counter value={stat.value} suffix={stat.suffix} />
          </div>
          <p className={light ? "mt-2 text-xs font-medium uppercase tracking-wide text-white/60 sm:text-sm" : "mt-2 text-xs font-medium uppercase tracking-wide text-muted-foreground sm:text-sm"}>
            {stat.label}
          </p>
        </StaggerItem>
      ))}
    </Stagger>
  );
}
