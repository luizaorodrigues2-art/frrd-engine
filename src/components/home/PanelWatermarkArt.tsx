"use client";

import type { IconType } from "react-icons";
import {
  FaCode,
  FaCut,
  FaFacebook,
  FaFilm,
  FaGoogle,
  FaIdCard,
  FaImages,
  FaInstagram,
  FaLaptopCode,
  FaLinkedin,
  FaMobileAlt,
  FaPalette,
  FaShoppingCart,
  FaStore,
  FaTiktok,
  FaBullhorn,
  FaGem,
  FaFileAlt,
  FaYoutube,
  FaWhatsapp,
} from "react-icons/fa";

const watermarkMap: Record<string, { icons: IconType[]; label?: string }> = {
  sites: { icons: [FaLaptopCode, FaMobileAlt, FaCode], label: "</>" },
  software: { icons: [FaCode, FaLaptopCode], label: "{ }" },
  "social-media": { icons: [FaInstagram, FaFacebook, FaLinkedin, FaTiktok, FaYoutube] },
  traffic: { icons: [FaGoogle, FaBullhorn, FaFacebook] },
  design: { icons: [FaPalette, FaGem] },
  motion: { icons: [FaFilm, FaYoutube] },
  "video-editing": { icons: [FaCut, FaFilm] },
  "social-art": { icons: [FaInstagram, FaImages, FaFacebook] },
  flyers: { icons: [FaFileAlt, FaBullhorn] },
  cards: { icons: [FaIdCard, FaGem] },
  branding: { icons: [FaGem, FaPalette] },
  ecommerce: { icons: [FaShoppingCart, FaStore, FaMobileAlt] },
};

interface PanelWatermarkArtProps {
  panelId: string;
  isActive: boolean;
}

export default function PanelWatermarkArt({ panelId, isActive }: PanelWatermarkArtProps) {
  const config = watermarkMap[panelId] ?? { icons: [FaGem] };
  const icons = config.icons;
  const opacity = isActive ? 0.22 : 0.14;

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {/* Large decorative icons — watermark style */}
      <div className="absolute bottom-0 right-0 flex flex-wrap items-end justify-end gap-3 p-4 md:p-6">
        {icons.map((Icon, i) => (
          <Icon
            key={i}
            className="transition-all duration-[650ms]"
            style={{
              fontSize: i === 0 ? "clamp(48px, 8vw, 96px)" : "clamp(32px, 5vw, 64px)",
              color: `rgba(255, 106, 0, ${opacity})`,
              transform: `rotate(${i % 2 === 0 ? -8 : 6}deg) translateY(${i * 4}px)`,
              filter: isActive ? "drop-shadow(0 0 20px rgba(255,106,0,0.3))" : "none",
            }}
          />
        ))}
      </div>

      {/* Scattered smaller icons top area */}
      <div className="absolute top-[20%] left-[10%] opacity-[0.06]">
        {icons[0] && (() => {
          const MainIcon = icons[0];
          return <MainIcon style={{ fontSize: "120px", color: "#FF6A00" }} />;
        })()}
      </div>

      {config.label && (
        <div
          className="absolute bottom-[30%] left-[8%] font-mono font-bold transition-opacity duration-[650ms]"
          style={{
            fontSize: "clamp(40px, 6vw, 72px)",
            color: `rgba(255, 106, 0, ${opacity * 0.8})`,
            letterSpacing: "0.1em",
          }}
        >
          {config.label}
        </div>
      )}

      {/* Social logos row for social panels */}
      {panelId === "social-media" && (
        <div className="absolute bottom-[18%] left-4 flex gap-2 opacity-20 md:left-6">
          {[FaInstagram, FaFacebook, FaWhatsapp, FaTiktok].map((Icon, i) => (
            <Icon key={i} size={20} className="text-orange-auryx" />
          ))}
        </div>
      )}
    </div>
  );
}
