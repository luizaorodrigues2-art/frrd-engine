"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { FaExternalLinkAlt } from "react-icons/fa";
import SectionTitle from "@/components/ui/SectionTitle";
import Button from "@/components/ui/Button";
import { cases } from "@/data/cases";

export default function Cases() {
  return (
    <section id="cases" className="relative py-24 md:py-32">
      <div className="absolute inset-0 bg-gradient-to-b from-black-fosco to-black-carbon" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionTitle
          title="Cases de Sucesso"
          subtitle="Resultados reais de clientes que confiaram na AURYX MEDIA."
        />

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {cases.map((caseItem, index) => (
            <motion.article
              key={caseItem.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              className="group relative overflow-hidden rounded-2xl glass sr-fade"
            >
              <div className="relative h-56 overflow-hidden">
                <Image
                  src={caseItem.image}
                  alt={caseItem.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black-carbon via-black-carbon/40 to-transparent" />
              </div>

              <div className="p-6">
                <h3 className="font-display text-xl font-bold text-white group-hover:text-orange-auryx transition-colors">
                  {caseItem.title}
                </h3>
                <p className="mt-3 text-sm text-gray-metallic/80 leading-relaxed">
                  {caseItem.description}
                </p>

                {caseItem.link ? (
                  <Button
                    href={caseItem.link}
                    external
                    variant="secondary"
                    size="sm"
                    className="mt-6"
                  >
                    <FaExternalLinkAlt className="mr-2" size={12} />
                    VISITAR SITE
                  </Button>
                ) : (
                  <Button
                    variant="secondary"
                    size="sm"
                    className="mt-6"
                    disabled
                  >
                    VISITAR SITE
                  </Button>
                )}
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
