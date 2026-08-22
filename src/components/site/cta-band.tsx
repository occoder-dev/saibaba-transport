import Link from "next/link";
import { ArrowRight, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/motion/reveal";
import { siteConfig } from "@/lib/data";

export function CtaBand({
  title = "Ready to move your next consignment?",
  description = "Get an indicative transport estimate in minutes, or talk to our team about your regular shipping needs.",
  primaryHref = "/estimate",
  primaryLabel = "Calculate Transport Cost",
  secondaryHref = "/quote",
  secondaryLabel = "Request a Quote",
}: {
  title?: string;
  description?: string;
  primaryHref?: string;
  primaryLabel?: string;
  secondaryHref?: string;
  secondaryLabel?: string;
}) {
  return (
    <section className="relative overflow-hidden bg-primary py-16 sm:py-20">
      <div className="pointer-events-none absolute inset-0 bg-grid opacity-[0.08]" />
      <div
        className="pointer-events-none absolute -left-16 -top-16 size-64 rounded-full bg-white/10 blur-3xl"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -bottom-20 -right-10 size-72 rounded-full bg-brand-red-dark/40 blur-3xl"
        aria-hidden
      />
      <div className="relative mx-auto max-w-5xl px-4 text-center sm:px-6 lg:px-8">
        <Reveal>
          <h2 className="font-display text-3xl tracking-wide text-white sm:text-4xl">{title}</h2>
          <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-white/85 sm:text-base">
            {description}
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Button size="lg" variant="secondary" asChild className="text-primary shadow-lg shadow-black/10">
              <Link href={primaryHref}>
                {primaryLabel}
                <ArrowRight className="size-4" />
              </Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              asChild
              className="border-white/40 bg-transparent text-white hover:bg-white/10 hover:text-white"
            >
              <Link href={secondaryHref}>
                <Phone className="size-4" />
                {secondaryLabel}
              </Link>
            </Button>
          </div>
          <p className="mt-4 text-xs text-white/70">
            Or call us directly at{" "}
            <a href={siteConfig.phoneHref} className="font-medium underline underline-offset-2">
              {siteConfig.phone}
            </a>
          </p>
        </Reveal>
      </div>
    </section>
  );
}
