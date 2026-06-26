"use client";

import { motion } from "framer-motion";
import Button from "@/components/ui/Button";
import { contact } from "@/data/contact";
import { siteContent } from "@/data/site-content";

export default function FinalCTA() {
  return (
    <section className="relative py-32 md:py-40 overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0 animated-gradient" />
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            "radial-gradient(circle at 50% 50%, rgba(255,106,0,0.25) 0%, transparent 60%)",
        }}
      />

      {/* Glow orbs */}
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{ duration: 4, repeat: Infinity }}
        className="absolute top-1/4 left-1/4 h-64 w-64 rounded-full bg-orange-auryx/20 blur-3xl"
      />
      <motion.div
        animate={{
          scale: [1.2, 1, 1.2],
          opacity: [0.2, 0.4, 0.2],
        }}
        transition={{ duration: 5, repeat: Infinity }}
        className="absolute bottom-1/4 right-1/4 h-96 w-96 rounded-full bg-orange-neon/15 blur-3xl"
      />

      {/* Neon lines */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/2 h-px w-full bg-gradient-to-r from-transparent via-orange-auryx/50 to-transparent" />
        <div className="absolute bottom-0 left-1/2 h-px w-full bg-gradient-to-r from-transparent via-orange-neon/50 to-transparent" />
      </div>

      <div className="relative z-10 mx-auto max-w-4xl px-4 text-center sm:px-6">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="font-display text-3xl font-bold text-white md:text-5xl lg:text-6xl leading-tight neon-text"
        >
          {siteContent.finalCtaTitle}
        </motion.h2>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mt-12"
        >
          <Button
            href={`https://wa.me/${contact.whatsappLink}`}
            external
            size="xl"
            className="animate-pulse-glow text-xl md:text-2xl px-12 py-6"
          >
            {siteContent.finalCtaButton}
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
