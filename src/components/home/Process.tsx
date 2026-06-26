"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SectionTitle from "@/components/ui/SectionTitle";
import { siteContent } from "@/data/site-content";

const steps = siteContent.processSteps;

export default function Process() {
  const timelineRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    if (!lineRef.current || !timelineRef.current) return;

    gsap.fromTo(
      lineRef.current,
      { scaleY: 0 },
      {
        scaleY: 1,
        ease: "none",
        scrollTrigger: {
          trigger: timelineRef.current,
          start: "top 70%",
          end: "bottom 30%",
          scrub: 1,
        },
      }
    );
  }, []);

  return (
    <section className="relative py-24 md:py-32">
      <div className="absolute inset-0 bg-gradient-to-b from-black-carbon to-black-fosco" />

      <div className="relative mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <SectionTitle
          title="Processo de Trabalho"
          subtitle="Metodologia estruturada para entregar resultados excepcionais."
        />

        <div ref={timelineRef} className="relative">
          {/* Animated line */}
          <div
            ref={lineRef}
            className="absolute left-6 top-0 bottom-0 w-px origin-top bg-gradient-to-b from-orange-auryx via-orange-neon to-orange-auryx md:left-1/2 md:-translate-x-1/2"
          />

          <div className="space-y-12">
            {steps.map((step, index) => (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, x: index % 2 === 0 ? -40 : 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className={`relative flex items-center gap-8 sr-fade ${
                  index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                }`}
              >
                <div className="hidden md:block md:w-1/2" />

                {/* Node */}
                <div className="absolute left-6 z-10 flex h-12 w-12 -translate-x-1/2 items-center justify-center rounded-full bg-gradient-to-br from-orange-auryx to-orange-neon text-sm font-bold text-white shadow-[0_0_20px_rgba(255,106,0,0.5)] md:left-1/2">
                  {step.number}
                </div>

                <div
                  className={`ml-16 md:ml-0 md:w-1/2 ${
                    index % 2 === 0 ? "md:pr-16 md:text-right" : "md:pl-16"
                  }`}
                >
                  <div className="rounded-2xl glass p-6 transition-all hover:border-orange-auryx/30 hover:shadow-[0_0_25px_rgba(255,106,0,0.1)]">
                    <h3 className="font-display text-xl font-bold text-white">
                      {step.title}
                    </h3>
                    <p className="mt-2 text-sm text-gray-metallic/80">
                      {step.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
