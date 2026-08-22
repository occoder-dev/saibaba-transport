"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import type { FAQ } from "@/lib/data";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function FaqAccordion({ faqs, showFilters = true }: { faqs: FAQ[]; showFilters?: boolean }) {
  const categories = useMemo(() => ["All", ...Array.from(new Set(faqs.map((f) => f.category)))], [faqs]);
  const [active, setActive] = useState("All");

  const filtered = active === "All" ? faqs : faqs.filter((f) => f.category === active);

  return (
    <div>
      {showFilters && (
        <div className="mb-8 flex flex-wrap gap-2">
          {categories.map((cat) => (
            <Button
              key={cat}
              size="sm"
              variant={active === cat ? "default" : "outline"}
              onClick={() => setActive(cat)}
              className={cn("rounded-full")}
            >
              {cat}
            </Button>
          ))}
        </div>
      )}
      <motion.div layout className="rounded-2xl border border-border/70 bg-card px-6 shadow-sm shadow-black/[0.03]">
        <Accordion type="single" collapsible className="w-full">
          {filtered.map((faq, i) => (
            <AccordionItem key={faq.question} value={`item-${i}`}>
              <AccordionTrigger className="text-base font-semibold tracking-tight text-brand-charcoal">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-sm leading-relaxed text-muted-foreground">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </motion.div>
    </div>
  );
}
