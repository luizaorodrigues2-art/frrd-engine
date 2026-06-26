"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import {
  FaWhatsapp,
  FaInstagram,
  FaFacebook,
  FaLinkedin,
  FaEnvelope,
  FaPhone,
} from "react-icons/fa";
import Logo from "@/components/ui/Logo";
import Button from "@/components/ui/Button";
import { contact } from "@/data/contact";
import { cn } from "@/lib/utils";

const navLinks = [
  { href: "/#inicio", label: "Início" },
  { href: "/#galeria-servicos", label: "Serviços" },
  { href: "/servicos", label: "Detalhes" },
  { href: "/#portfolio", label: "Portfólio" },
  { href: "/#contato", label: "Contato" },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const socialLinks = [
    {
      icon: FaWhatsapp,
      href: `https://wa.me/${contact.whatsappLink}`,
      label: "WhatsApp",
    },
    {
      icon: FaInstagram,
      href: contact.instagram || "#",
      label: "Instagram",
    },
    {
      icon: FaFacebook,
      href: contact.facebook || "#",
      label: "Facebook",
    },
    {
      icon: FaLinkedin,
      href: contact.linkedin || "#",
      label: "LinkedIn",
    },
    {
      icon: FaEnvelope,
      href: contact.email ? `mailto:${contact.email}` : "#",
      label: "Email",
    },
  ];

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6 }}
      className={cn(
        "fixed top-0 right-0 left-0 z-50 transition-all duration-500",
        scrolled
          ? "glass shadow-lg shadow-black/20"
          : "bg-transparent"
      )}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between md:h-20">
          <Logo size="sm" />

          <nav className="hidden items-center gap-8 lg:flex">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-gray-metallic transition-colors hover:text-orange-auryx"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="hidden items-center gap-4 md:flex">
            <div className="flex items-center gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="text-gray-metallic transition-all hover:text-orange-auryx hover:scale-110"
                  data-cursor-hover
                >
                  <social.icon size={16} />
                </a>
              ))}
            </div>
            <div className="hidden items-center gap-2 text-xs text-gray-metallic xl:flex">
              <FaPhone className="text-orange-auryx" size={12} />
              <span>{contact.phone}</span>
            </div>
            <Button
              href={`https://wa.me/${contact.whatsappLink}`}
              external
              size="sm"
            >
              SOLICITAR ORÇAMENTO
            </Button>
          </div>

          <button
            type="button"
            className="flex h-10 w-10 items-center justify-center rounded-lg glass lg:hidden"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Menu"
          >
            <div className="flex flex-col gap-1.5">
              <span
                className={cn(
                  "block h-0.5 w-5 bg-white transition-all",
                  mobileOpen && "translate-y-2 rotate-45"
                )}
              />
              <span
                className={cn(
                  "block h-0.5 w-5 bg-white transition-all",
                  mobileOpen && "opacity-0"
                )}
              />
              <span
                className={cn(
                  "block h-0.5 w-5 bg-white transition-all",
                  mobileOpen && "-translate-y-2 -rotate-45"
                )}
              />
            </div>
          </button>
        </div>
      </div>

      {mobileOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          className="glass border-t border-white/10 lg:hidden"
        >
          <div className="px-4 py-6 space-y-4">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="block py-2 text-gray-metallic hover:text-orange-auryx"
              >
                {link.label}
              </Link>
            ))}
            <div className="flex gap-4 pt-4">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-metallic hover:text-orange-auryx"
                >
                  <social.icon size={20} />
                </a>
              ))}
            </div>
            <Button
              href={`https://wa.me/${contact.whatsappLink}`}
              external
              className="w-full"
            >
              SOLICITAR ORÇAMENTO
            </Button>
          </div>
        </motion.div>
      )}
    </motion.header>
  );
}
