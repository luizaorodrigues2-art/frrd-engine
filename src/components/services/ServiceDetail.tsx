"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useState } from "react";
import { FaChevronDown } from "react-icons/fa";
import Button from "@/components/ui/Button";
import { contact } from "@/data/contact";
import type { Service } from "@/data/services";

function FAQItem({
  question,
  answer,
}: {
  question: string;
  answer: string;
}) {
  const [open, setOpen] = useState(false);

  return (
    <div className="rounded-xl glass overflow-hidden">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="flex w-full items-center justify-between p-5 text-left transition-colors hover:text-orange-auryx"
      >
        <span className="font-medium text-white">{question}</span>
        <FaChevronDown
          className={`shrink-0 text-orange-auryx transition-transform ${open ? "rotate-180" : ""}`}
          size={14}
        />
      </button>
      <motion.div
        initial={false}
        animate={{ height: open ? "auto" : 0, opacity: open ? 1 : 0 }}
        transition={{ duration: 0.3 }}
        className="overflow-hidden"
      >
        <p className="px-5 pb-5 text-sm text-gray-metallic/80 leading-relaxed">
          {answer}
        </p>
      </motion.div>
    </div>
  );
}

export default function ServiceDetail({ service }: { service: Service }) {
  return (
    <section id={service.id} className="py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="relative aspect-[4/3] overflow-hidden rounded-2xl sr-left"
          >
            <Image
              src={service.image}
              alt={service.title}
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black-carbon/60 to-transparent" />
            <div
              className="absolute inset-0 rounded-2xl"
              style={{
                boxShadow: "inset 0 0 60px rgba(255,106,0,0.1)",
              }}
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="sr-right"
          >
            <span className="text-sm font-medium tracking-[0.2em] text-orange-auryx uppercase">
              Serviço
            </span>
            <h2 className="mt-2 font-display text-3xl font-bold text-white md:text-4xl">
              {service.title}
            </h2>
            <p className="mt-4 text-gray-metallic leading-relaxed">
              {service.fullDescription}
            </p>

            <div className="mt-8">
              <h3 className="font-display text-lg font-semibold text-white">
                Benefícios
              </h3>
              <ul className="mt-4 space-y-2">
                {service.benefits.map((benefit) => (
                  <li
                    key={benefit}
                    className="flex items-start gap-3 text-sm text-gray-metallic"
                  >
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-orange-auryx" />
                    {benefit}
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-8">
              <h3 className="font-display text-lg font-semibold text-white">
                Diferenciais
              </h3>
              <ul className="mt-4 space-y-2">
                {service.differentials.map((diff) => (
                  <li
                    key={diff}
                    className="flex items-start gap-3 text-sm text-gray-metallic"
                  >
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-orange-neon" />
                    {diff}
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        </div>

        {service.faq.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mt-16 md:mt-24"
          >
            <h3 className="font-display text-2xl font-bold text-white mb-6">
              Perguntas Frequentes
            </h3>
            <div className="space-y-3 max-w-3xl">
              {service.faq.map((item) => (
                <FAQItem
                  key={item.question}
                  question={item.question}
                  answer={item.answer}
                />
              ))}
            </div>
          </motion.div>
        )}

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-12 flex justify-center"
        >
          <Button
            href={`https://wa.me/${contact.whatsappLink}`}
            external
            size="lg"
          >
            Solicitar Orçamento
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
