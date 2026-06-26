"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
  FaWhatsapp,
  FaInstagram,
  FaFacebook,
  FaLinkedin,
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
} from "react-icons/fa";
import Logo from "@/components/ui/Logo";
import { contact } from "@/data/contact";
import { siteContent } from "@/data/site-content";

const quickLinks = [
  { href: "/", label: "Início" },
  { href: "/servicos", label: "Serviços" },
  { href: "/#portfolio", label: "Portfólio" },
  { href: "/#cases", label: "Cases" },
  { href: "/#contato", label: "Contato" },
];

const techServices = [
  { href: "/servicos#software", label: "Desenvolvimento de Software" },
  { href: "/servicos#saas", label: "Plataformas SaaS" },
  { href: "/servicos#ia", label: "Inteligência Artificial" },
  { href: "/servicos#automacoes", label: "Automações Empresariais" },
  { href: "/servicos#aplicativos", label: "Aplicativos Mobile" },
  { href: "/servicos#sistemas-empresariais", label: "ERP e CRM" },
  { href: "/servicos#dashboards", label: "Dashboards e BI" },
  { href: "/servicos#sites", label: "Sites e Landing Pages" },
];

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer id="contato" className="relative border-t border-white/10 bg-black-carbon">
      <div className="absolute inset-0 bg-gradient-to-t from-orange-auryx/5 to-transparent" />

      <div className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-5">
          <div>
            <Logo size="md" />
            <p className="mt-2 text-xs font-semibold tracking-widest text-orange-auryx uppercase">
              Soluções Tecnológicas
            </p>
            <p className="mt-4 text-sm text-gray-metallic/70 leading-relaxed">
              {siteContent.slogan}
            </p>
          </div>

          <div>
            <h3 className="mb-4 font-display text-lg font-semibold text-white">
              Links Rápidos
            </h3>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-gray-metallic transition-colors hover:text-orange-auryx"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="mb-4 font-display text-lg font-semibold text-white">
              Nossas Soluções
            </h3>
            <ul className="space-y-2">
              {techServices.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-gray-metallic transition-colors hover:text-orange-auryx"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="mb-4 font-display text-lg font-semibold text-white">
              Contato
            </h3>
            <ul className="space-y-3 text-sm text-gray-metallic">
              <li className="flex items-center gap-3">
                <FaPhone className="text-orange-auryx shrink-0" />
                <a href={`tel:+${contact.phoneLink}`} className="hover:text-orange-auryx">
                  {contact.phone}
                </a>
              </li>
              <li className="flex items-center gap-3">
                <FaWhatsapp className="text-orange-auryx shrink-0" />
                <a
                  href={`https://wa.me/${contact.whatsappLink}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-orange-auryx"
                >
                  {contact.whatsapp}
                </a>
              </li>
              {contact.email && (
                <li className="flex items-center gap-3">
                  <FaEnvelope className="text-orange-auryx shrink-0" />
                  <a href={`mailto:${contact.email}`} className="hover:text-orange-auryx">
                    {contact.email}
                  </a>
                </li>
              )}
              {contact.address && (
                <li className="flex items-start gap-3">
                  <FaMapMarkerAlt className="text-orange-auryx shrink-0 mt-0.5" />
                  <span>{contact.address}</span>
                </li>
              )}
            </ul>
          </div>

          <div>
            <h3 className="mb-4 font-display text-lg font-semibold text-white">
              Redes Sociais
            </h3>
            <div className="flex gap-4">
              <a
                href={`https://wa.me/${contact.whatsappLink}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-10 w-10 items-center justify-center rounded-lg glass text-gray-metallic transition-all hover:text-orange-auryx hover:border-orange-auryx/50"
                aria-label="WhatsApp"
              >
                <FaWhatsapp size={18} />
              </a>
              {contact.instagram && (
                <a
                  href={contact.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-10 w-10 items-center justify-center rounded-lg glass text-gray-metallic transition-all hover:text-orange-auryx"
                  aria-label="Instagram"
                >
                  <FaInstagram size={18} />
                </a>
              )}
              {contact.facebook && (
                <a
                  href={contact.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-10 w-10 items-center justify-center rounded-lg glass text-gray-metallic transition-all hover:text-orange-auryx"
                  aria-label="Facebook"
                >
                  <FaFacebook size={18} />
                </a>
              )}
              {contact.linkedin && (
                <a
                  href={contact.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-10 w-10 items-center justify-center rounded-lg glass text-gray-metallic transition-all hover:text-orange-auryx"
                  aria-label="LinkedIn"
                >
                  <FaLinkedin size={18} />
                </a>
              )}
            </div>
          </div>
        </div>

        {contact.mapEmbed && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-12 overflow-hidden rounded-2xl glass"
          >
            <iframe
              src={contact.mapEmbed}
              width="100%"
              height="300"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Localização AURYX MEDIA"
            />
          </motion.div>
        )}

        <div className="mt-12 border-t border-white/10 pt-8 text-center text-sm text-gray-metallic/60">
          <p>
            © {currentYear} <span className="text-white font-semibold">AURYX MEDIA</span> • Soluções Tecnológicas. Todos os direitos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
}
