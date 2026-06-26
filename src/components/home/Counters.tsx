"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import SectionTitle from "@/components/ui/SectionTitle";
import { siteContent } from "@/data/site-content";

interface CounterProps {
  end: number;
  suffix?: string;
  label: string;
  duration?: number;
}

function AnimatedCounter({ end, suffix = "", label, duration = 2000 }: CounterProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isInView) return;

    let start = 0;
    const increment = end / (duration / 16);
    const timer = setInterval(() => {
      start += increment;
      if (start >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);

    return () => clearInterval(timer);
  }, [isInView, end, duration]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale: 0.8 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="text-center sr-scale"
    >
      <div className="font-display text-5xl font-bold gradient-text md:text-6xl lg:text-7xl">
        {count}{suffix}
      </div>
      <p className="mt-2 text-sm font-medium text-gray-metallic uppercase tracking-wider">
        {label}
      </p>
    </motion.div>
  );
}

const counters = siteContent.counters.map((c) => ({
  end: c.value,
  suffix: c.suffix,
  label: c.label,
}));

export default function Counters() {
  return (
    <section className="relative py-24 md:py-32">
      <div className="absolute inset-0 bg-black-carbon" />
      <div
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage:
            "radial-gradient(circle at 50% 50%, rgba(255,106,0,0.15) 0%, transparent 70%)",
        }}
      />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionTitle title="Números que Falam" />

        <div className="grid grid-cols-2 gap-8 md:grid-cols-4 md:gap-12">
          {counters.map((counter) => (
            <AnimatedCounter
              key={counter.label}
              end={counter.end}
              suffix={counter.suffix}
              label={counter.label}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
