"use client";

import { motion } from "framer-motion";
import {
  FaBolt,
  FaCrown,
  FaPhone,
  FaRocket,
  FaShieldAlt,
  FaWhatsapp,
} from "react-icons/fa";
import Logo from "@/components/ui/Logo";
import Button from "@/components/ui/Button";
import { contact } from "@/data/contact";
import { siteContent } from "@/data/site-content";

const differentiators = [
  {
    icon: FaBolt,
    title: "Software sob medida",
    text: "Sistemas, SaaS e aplicativos desenvolvidos para o seu negócio, do zero à produção.",
  },
  {
    icon: FaRocket,
    title: "Inteligência Artificial",
    text: "Automatizamos processos e integramos IA para acelerar seus resultados.",
  },
  {
    icon: FaShieldAlt,
    title: "Arquitetura robusta",
    text: "Código limpo, seguro e escalável para crescer sem limites técnicos.",
  },
  {
    icon: FaCrown,
    title: "Entrega completa",
    text: "Da estratégia ao deploy — somos seu parceiro tecnológico de longo prazo.",
  },
];

export default function HeroIntro() {
  return (
    <section
      id="inicio"
      className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-black-fosco px-4 pt-24 pb-16"
    >
      <div className="absolute inset-0 animated-gradient opacity-40" />
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            "radial-gradient(ellipse 70% 60% at 50% 40%, rgba(255,106,0,0.12) 0%, transparent 65%)",
        }}
      />
      <div className="pointer-events-none absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,106,0,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,106,0,0.5) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      />

      <div className="relative z-10 mx-auto max-w-5xl text-center">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <Logo size="hero" className="mx-auto" />
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.15 }}
          className="mt-8 text-lg text-gray-metallic md:text-xl leading-relaxed"
        >
          {siteContent.slogan}
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.25 }}
          className="mt-6 font-display text-2xl font-bold leading-tight text-white md:text-4xl lg:text-5xl"
        >
          Softwares, Sistemas Web, SaaS e{" "}
          <span className="gradient-text">Inteligência Artificial</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="mx-auto mt-6 max-w-2xl text-base text-gray-metallic/90 md:text-lg"
        >
          Desenvolvemos{" "}
          <strong className="text-white">plataformas completas</strong>,{" "}
          <strong className="text-white">automações inteligentes</strong> e{" "}
          <strong className="text-white">sistemas personalizados</strong> que
          otimizam processos e geram resultados reais.
        </motion.p>

        {/* Contatos */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row"
        >
          <a
            href={`tel:+${contact.phoneLink}`}
            className="flex items-center gap-4 rounded-2xl border border-white/10 bg-black-carbon/50 px-8 py-5 backdrop-blur-sm transition-all hover:border-orange-auryx/40 hover:shadow-[0_0_30px_rgba(255,106,0,0.15)]"
          >
            <FaPhone className="text-2xl text-orange-auryx" />
            <div className="text-left">
              <p className="text-xs tracking-widest text-gray-metallic uppercase">Telefone</p>
              <p className="text-lg font-semibold text-white">{contact.phone}</p>
            </div>
          </a>
          <a
            href={`https://wa.me/${contact.whatsappLink}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-4 rounded-2xl border border-orange-auryx/30 bg-orange-auryx/10 px-8 py-5 backdrop-blur-sm transition-all hover:border-orange-auryx hover:shadow-[0_0_40px_rgba(255,106,0,0.25)]"
          >
            <FaWhatsapp className="text-2xl text-green-400" />
            <div className="text-left">
              <p className="text-xs tracking-widest text-orange-auryx uppercase">WhatsApp</p>
              <p className="text-lg font-semibold text-white">{contact.whatsapp}</p>
            </div>
          </a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.65 }}
          className="mt-10 flex flex-wrap justify-center gap-4"
        >
          <Button href={`https://wa.me/${contact.whatsappLink}`} external size="lg">
            Solicitar Orçamento
          </Button>
          <Button href="#servicos" variant="secondary" size="lg">
            Conheça nossos Sistemas
          </Button>
        </motion.div>

        {/* Diferenciais */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="mt-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-4"
        >
          {differentiators.map((item, i) => (
            <div
              key={item.title}
              className="rounded-xl border border-white/8 bg-black-carbon/40 p-5 text-left backdrop-blur-sm transition-all hover:border-orange-auryx/25"
            >
              <item.icon className="text-xl text-orange-auryx" />
              <h3 className="mt-3 font-display text-sm font-bold text-white">{item.title}</h3>
              <p className="mt-2 text-xs text-gray-metallic/85 leading-relaxed">{item.text}</p>
            </div>
          ))}
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <a href="#galeria-servicos" className="flex flex-col items-center gap-2 text-gray-metallic/50 hover:text-orange-auryx transition-colors">
          <span className="text-[10px] tracking-[0.3em] uppercase">Nossos serviços</span>
          <div className="h-10 w-6 rounded-full border border-orange-auryx/30 p-1">
            <div className="mx-auto h-2 w-2 rounded-full bg-orange-auryx animate-scroll-indicator" />
          </div>
        </a>
      </motion.div>
    </section>
  );
}
