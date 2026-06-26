"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import { motion } from "framer-motion";
import { FaStar } from "react-icons/fa";
import SectionTitle from "@/components/ui/SectionTitle";
import { testimonials } from "@/data/testimonials";

import "swiper/css";
import "swiper/css/pagination";

function Stars({ count }: { count: number }) {
  return (
    <div className="flex gap-1">
      {Array.from({ length: count }).map((_, i) => (
        <FaStar key={i} className="text-orange-auryx" size={14} />
      ))}
    </div>
  );
}

export default function Testimonials() {
  return (
    <section className="relative py-24 md:py-32 overflow-hidden">
      <div className="absolute inset-0 bg-black-carbon" />
      <div
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage:
            "radial-gradient(circle at 30% 50%, rgba(255,106,0,0.2) 0%, transparent 50%)",
        }}
      />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionTitle
          title="Depoimentos"
          subtitle="O que nossos clientes dizem sobre a AURYX MEDIA."
        />

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <Swiper
            modules={[Autoplay, Pagination]}
            spaceBetween={24}
            slidesPerView={1}
            autoplay={{ delay: 4000, disableOnInteraction: false }}
            pagination={{ clickable: true }}
            breakpoints={{
              640: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
            }}
            className="!pb-12"
          >
            {testimonials.map((testimonial) => (
              <SwiperSlide key={testimonial.id}>
                <div className="rounded-2xl glass p-8 h-full transition-all hover:border-orange-auryx/20 hover:shadow-[0_0_30px_rgba(255,106,0,0.1)]">
                  <Stars count={testimonial.rating} />
                  <p className="mt-4 text-lg text-white leading-relaxed">
                    &ldquo;{testimonial.text}&rdquo;
                  </p>
                  <div className="mt-6 flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-orange-auryx to-orange-neon text-sm font-bold text-white">
                      {testimonial.author.charAt(0)}
                    </div>
                    <div>
                      <p className="font-semibold text-white text-sm">
                        {testimonial.author}
                      </p>
                      <p className="text-xs text-gray-metallic/70">
                        {testimonial.role}
                      </p>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </motion.div>
      </div>
    </section>
  );
}
