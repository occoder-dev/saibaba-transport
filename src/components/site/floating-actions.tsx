"use client";

import { motion } from "framer-motion";
import { Phone, MessageCircle } from "lucide-react";
import { siteConfig } from "@/lib/data";

export function FloatingActions() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1, duration: 0.5 }}
      className="fixed bottom-5 right-5 z-40 flex flex-col items-end gap-3"
    >
      <motion.a
        href={siteConfig.phoneHref}
        aria-label="Call Sai Baba Transport"
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.95 }}
        className="flex size-12 items-center justify-center rounded-full bg-brand-charcoal text-white shadow-lg shadow-black/20"
      >
        <Phone className="size-5" />
      </motion.a>
      <motion.a
        href={siteConfig.whatsappHref}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp"
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.95 }}
        className="relative flex size-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg shadow-black/20"
      >
        <span className="absolute inset-0 animate-ping rounded-full bg-[#25D366]/50" />
        <MessageCircle className="relative size-6" />
      </motion.a>
    </motion.div>
  );
}
