"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import type { Branch } from "@/db/schema";
import { BranchCard } from "@/components/site/branch-card";
import { Button } from "@/components/ui/button";
import { Stagger } from "@/components/motion/reveal";

export function BranchesClient({ branches }: { branches: Branch[] }) {
  const states = useMemo(() => ["All States", ...Array.from(new Set(branches.map((b) => b.state)))], [branches]);
  const [active, setActive] = useState("All States");

  const filtered = active === "All States" ? branches : branches.filter((b) => b.state === active);

  return (
    <div>
      <div className="mb-10 flex flex-wrap gap-2">
        {states.map((state) => (
          <Button
            key={state}
            size="sm"
            variant={active === state ? "default" : "outline"}
            onClick={() => setActive(state)}
            className="rounded-full"
          >
            {state}
          </Button>
        ))}
      </div>
      <AnimatePresence mode="wait">
        <motion.div
          key={active}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          <Stagger className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((branch) => (
              <BranchCard key={branch.city} branch={branch} />
            ))}
          </Stagger>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
