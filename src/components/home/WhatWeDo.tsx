"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import {
  FaCode,
  FaCloud,
  FaRobot,
  FaCogs,
  FaMobileAlt,
  FaBuilding,
  FaChartBar,
  FaGlobe,
  FaInstagram,
  FaPaintBrush,
  FaTrademark,
  FaFilm,
} from "react-icons/fa";
import SectionTitle from "@/components/ui/SectionTitle";
import { siteContent } from "@/data/site-content";
import Button from "@/components/ui/Button";
import { services } from "@/data/services";

const serviceIcons: Record<string, React.ElementType> = {
  software: FaCode,
  saas: FaCloud,
  ia: FaRobot,
  automacoes: FaCogs,
  aplicativos: FaMobileAlt,
  "sistemas-empresariais": FaBuilding,
  dashboards: FaChartBar,
  sites: FaGlobe,
  "social-media": FaInstagram,
  design: FaPaintBrush,
  branding: FaTrademark,
  motion: FaFilm,
};

function ServiceCard({
  service,
  index,
}: {
  service: typeof services[0];
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 300, damping: 30 });
  const mouseYSpring = useSpring(y, { stiffness: 300, damping: 30 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["8deg", "-8deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-8deg", "8deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    x.set((mouseX / width) - 0.5);
    y.set((mouseY / height) - 0.5);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.08 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
      className="group relative sr-fade"
      data-cursor-hover
    >
      <div className="relative overflow-hidden rounded-2xl glass transition-all duration-500 group-hover:border-orange-auryx/30 group-hover:shadow-[0_0_30px_rgba(255,106,0,0.15)]">
        {/* Image with watermark effect */}
        <div className="relative h-48 overflow-hidden">
          <Image
            src={service.image}
            alt={service.title}
            fill
            className="object-cover opacity-40 transition-all duration-500 group-hover:opacity-60 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, 33vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black-carbon via-black-carbon/50 to-transparent" />
          <div
            className="absolute inset-0 bg-gradient-to-br from-orange-auryx/10 to-transparent opacity-0 transition-opacity group-hover:opacity-100"
          />
        </div>

        <div className="p-6">
          {(() => {
            const Icon = serviceIcons[service.id];
            return Icon ? (
              <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-orange-auryx/10 border border-orange-auryx/20 transition-all group-hover:bg-orange-auryx/20">
                <Icon className="text-orange-auryx text-lg" />
              </div>
            ) : null;
          })()}
          <h3 className="font-display text-xl font-bold text-white group-hover:text-orange-auryx transition-colors">
            {service.title}
          </h3>
          <p className="mt-2 text-sm text-gray-metallic/80 leading-relaxed">
            {service.shortDescription}
          </p>
          <Button
            href={`/servicos#${service.id}`}
            variant="ghost"
            size="sm"
            className="mt-4 !text-orange-auryx"
          >
            Saiba mais →
          </Button>
        </div>

        {/* Neon edge glow on hover */}
        <div
          className="absolute inset-0 rounded-2xl opacity-0 transition-opacity group-hover:opacity-100 pointer-events-none"
          style={{
            boxShadow: "inset 0 0 30px rgba(255, 106, 0, 0.1)",
          }}
        />
      </div>
    </motion.div>
  );
}

export default function WhatWeDo() {
  return (
    <section id="servicos" className="relative py-24 md:py-32">
      <div className="absolute inset-0 bg-gradient-to-b from-black-fosco via-black-carbon to-black-fosco" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionTitle
          title="O Que Fazemos"
          subtitle={siteContent.whatWeDoSubtitle}
        />

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {services.map((service, index) => (
            <ServiceCard key={service.id} service={service} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
