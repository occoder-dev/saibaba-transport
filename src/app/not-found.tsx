import Link from "next/link";
import { ArrowRight, Home, Truck } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <section className="relative flex min-h-[80vh] items-center overflow-hidden bg-brand-charcoal py-32 text-white">
      <div className="pointer-events-none absolute inset-0 bg-grid opacity-[0.07]" />
      <div className="relative mx-auto max-w-2xl px-4 text-center sm:px-6 lg:px-8">
        <Truck className="mx-auto size-12 text-primary" />
        <h1 className="mt-6 font-display text-6xl tracking-wide sm:text-7xl">
          <span className="text-primary">404</span> - WRONG TURN
        </h1>
        <p className="mt-4 text-base leading-relaxed text-white/65">
          Looks like this route doesn&apos;t exist on our network. Let&apos;s get you back on the main road.
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <Button size="lg" asChild>
            <Link href="/">
              <Home className="size-4" /> Back to Home
            </Link>
          </Button>
          <Button size="lg" variant="outline" className="border-white/25 bg-white/5 text-white hover:bg-white/10 hover:text-white" asChild>
            <Link href="/contact">
              Contact Us <ArrowRight className="size-4" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
