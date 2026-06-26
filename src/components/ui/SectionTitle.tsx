"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

interface SectionTitleProps {
  title: string;
  subtitle?: string;
  align?: "left" | "center";
}

export default function SectionTitle({
  title,
  subtitle,
  align = "center",
}: SectionTitleProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div
      className={`mb-12 md:mb-16 ${align === "center" ? "text-center" : "text-left"}`}
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className={`flex items-center gap-3 ${align === "center" ? "justify-center" : ""}`}
      >
        <div className="h-px w-12 bg-gradient-to-r from-orange-auryx to-orange-neon" />
        <span className="text-sm font-medium tracking-[0.2em] text-orange-auryx uppercase">
          AURYX MEDIA
        </span>
        <div className="h-px w-12 bg-gradient-to-r from-orange-neon to-orange-auryx" />
      </motion.div>
      <motion.h2
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="mt-4 font-display text-3xl font-bold text-white md:text-4xl lg:text-5xl"
      >
        {mounted ? title : ""}
      </motion.h2>
      {subtitle && (
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className={`mt-4 text-lg text-gray-metallic/80 ${align === "center" ? "mx-auto max-w-2xl" : "max-w-2xl"}`}
        >
          {subtitle}
        </motion.p>
      )}
    </div>
  );
}
