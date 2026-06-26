"use client";

import { motion } from "framer-motion";
import { FaWhatsapp, FaInstagram, FaPhone } from "react-icons/fa";
import { contact } from "@/data/contact";

export default function FloatingButtons() {
  const buttons = [
    {
      icon: FaWhatsapp,
      href: `https://wa.me/${contact.whatsappLink}`,
      label: "WhatsApp",
      color: "from-green-500 to-green-600",
      delay: 0,
    },
    {
      icon: FaInstagram,
      href: contact.instagram || `https://wa.me/${contact.whatsappLink}`,
      label: "Instagram",
      color: "from-pink-500 to-purple-600",
      delay: 0.1,
    },
    {
      icon: FaPhone,
      href: `tel:+${contact.phoneLink}`,
      label: "Telefone",
      color: "from-orange-auryx to-orange-neon",
      delay: 0.2,
    },
  ];

  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col gap-3">
      {buttons.map((btn) => (
        <motion.a
          key={btn.label}
          href={btn.href}
          target={btn.label === "Telefone" ? "_self" : "_blank"}
          rel="noopener noreferrer"
          aria-label={btn.label}
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: btn.delay + 1, duration: 0.5 }}
          whileHover={{ scale: 1.1, x: -4 }}
          whileTap={{ scale: 0.95 }}
          className={`group relative flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br ${btn.color} text-white shadow-lg neon-glow md:h-14 md:w-14`}
          data-cursor-hover
        >
          <btn.icon size={22} />
          <span
            className="absolute right-full mr-3 hidden rounded-lg glass px-3 py-1.5 text-xs font-medium text-white opacity-0 transition-opacity group-hover:opacity-100 md:block"
          >
            {btn.label}
          </span>
        </motion.a>
      ))}
    </div>
  );
}
