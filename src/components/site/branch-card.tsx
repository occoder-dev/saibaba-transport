"use client";

import { motion } from "framer-motion";
import { MapPin, Phone, Mail, Star } from "lucide-react";
import type { Branch } from "@/db/schema";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { StaggerItem } from "@/components/motion/reveal";

export function BranchCard({ branch }: { branch: Branch }) {
  return (
    <StaggerItem>
      <motion.div
        whileHover={{ y: -4 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
        className="flex h-full flex-col rounded-2xl border border-border/70 bg-card p-6 shadow-sm shadow-black/[0.03] transition-shadow duration-300 hover:shadow-premium"
      >
        <div className="flex items-start justify-between gap-2">
          <div>
            <h3 className="flex items-center gap-2 text-lg font-semibold tracking-tight text-brand-charcoal">
              {branch.city}
              {branch.isHeadOffice && (
                <Badge className="gap-1 bg-primary/10 text-primary hover:bg-primary/10">
                  <Star className="size-3" /> Head Office
                </Badge>
              )}
            </h3>
            <p className="text-sm text-muted-foreground">{branch.state}</p>
          </div>
        </div>

        {branch.address && (
          <div className="mt-4 flex items-start gap-2.5 text-sm text-muted-foreground">
            <MapPin className="mt-0.5 size-4 shrink-0 text-primary" />
            <span>{branch.address}</span>
          </div>
        )}
        <div className={`flex flex-col gap-1.5 text-sm text-muted-foreground ${branch.address ? "mt-2.5" : "mt-4"}`}>
          {branch.phones.map((phone) => (
            <div key={phone} className="flex items-center gap-2.5">
              <Phone className="size-4 shrink-0 text-primary" />
              <a href={`tel:${phone.replace(/\s/g, "")}`} className="hover:text-primary">
                {phone}
              </a>
            </div>
          ))}
        </div>
        <div className="mt-2.5 flex items-center gap-2.5 text-sm text-muted-foreground">
          <Mail className="size-4 shrink-0 text-primary" />
          <a href={`mailto:${branch.email}`} className="hover:text-primary">
            {branch.email}
          </a>
        </div>

        <div className="mt-4 flex flex-1 flex-wrap items-start gap-1.5">
          {branch.services.map((s) => (
            <Badge key={s} variant="secondary" className="font-normal">
              {s}
            </Badge>
          ))}
        </div>

        <Button variant="outline" size="sm" className="mt-5 w-full" asChild>
          <a href={`tel:${branch.phones[0].replace(/\s/g, "")}`}>Call This Branch</a>
        </Button>
      </motion.div>
    </StaggerItem>
  );
}
