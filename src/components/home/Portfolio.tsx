"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { FaTimes } from "react-icons/fa";
import SectionTitle from "@/components/ui/SectionTitle";
import { portfolioItems, type PortfolioItem } from "@/data/portfolio";

function PortfolioModal({
  item,
  onClose,
}: {
  item: PortfolioItem;
  onClose: () => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black-fosco/95 p-4 backdrop-blur-sm"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        transition={{ type: "spring", damping: 25 }}
        className="relative max-h-[90vh] w-full max-w-4xl overflow-hidden rounded-2xl glass"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 z-10 flex h-10 w-10 items-center justify-center rounded-full glass text-white hover:text-orange-auryx transition-colors"
          aria-label="Fechar"
        >
          <FaTimes />
        </button>

        <div className="grid md:grid-cols-2">
          <div className="relative h-64 md:h-auto min-h-[300px]">
            <Image
              src={item.image}
              alt={item.title}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black-carbon/80 to-transparent md:bg-gradient-to-r" />
          </div>

          <div className="p-8 md:p-10">
            <span className="text-sm font-medium text-orange-auryx uppercase tracking-wider">
              {item.category}
            </span>
            <h3 className="mt-2 font-display text-3xl font-bold text-white">
              {item.title}
            </h3>
            <p className="mt-4 text-gray-metallic leading-relaxed">
              {item.description}
            </p>

            <div className="mt-6 space-y-4">
              <div>
                <h4 className="text-sm font-semibold text-orange-auryx uppercase tracking-wider">
                  Objetivo
                </h4>
                <p className="mt-1 text-gray-metallic">{item.objective}</p>
              </div>
              <div>
                <h4 className="text-sm font-semibold text-orange-auryx uppercase tracking-wider">
                  Resultado
                </h4>
                <p className="mt-1 text-gray-metallic">{item.result}</p>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

function PortfolioCard({
  item,
  onClick,
}: {
  item: PortfolioItem;
  onClick: () => void;
}) {
  return (
    <div
      className="group relative w-72 shrink-0 cursor-pointer overflow-hidden rounded-2xl glass transition-all hover:border-orange-auryx/30 hover:shadow-[0_0_25px_rgba(255,106,0,0.2)]"
      onClick={onClick}
      data-cursor-hover
    >
      <div className="relative h-48 overflow-hidden">
        <Image
          src={item.image}
          alt={item.title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-110"
          sizes="288px"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black-carbon to-transparent" />
        <span className="absolute top-3 left-3 rounded-full bg-orange-auryx/90 px-3 py-1 text-xs font-medium text-white">
          {item.category}
        </span>
      </div>
      <div className="p-4">
        <h3 className="font-display text-lg font-bold text-white group-hover:text-orange-auryx transition-colors">
          {item.title}
        </h3>
        <p className="mt-1 text-sm text-gray-metallic/70 line-clamp-2">
          {item.description}
        </p>
      </div>
    </div>
  );
}

export default function Portfolio() {
  const [selectedItem, setSelectedItem] = useState<PortfolioItem | null>(null);

  return (
    <section id="portfolio" className="relative py-24 md:py-32 overflow-hidden">
      <div className="absolute inset-0 bg-black-carbon" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionTitle
          title="Portfólio"
          subtitle="Projetos que transformaram negócios e geraram resultados reais."
        />
      </div>

      {/* Infinite marquee carousel */}
      <div className="relative mt-8 overflow-hidden">
        <div className="flex animate-marquee gap-6">
          {[...portfolioItems, ...portfolioItems].map((item, index) => (
            <PortfolioCard
              key={`${item.id}-${index}`}
              item={item}
              onClick={() => setSelectedItem(item)}
            />
          ))}
        </div>
      </div>

      <AnimatePresence>
        {selectedItem && (
          <PortfolioModal
            item={selectedItem}
            onClose={() => setSelectedItem(null)}
          />
        )}
      </AnimatePresence>
    </section>
  );
}
