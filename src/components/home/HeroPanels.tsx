"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode } from "swiper/modules";
import { FaArrowRight, FaTimes } from "react-icons/fa";
import PanelWatermarkArt from "@/components/home/PanelWatermarkArt";
import Button from "@/components/ui/Button";
import { heroPanels, type HeroPanel } from "@/data/hero-panels";
import { contact } from "@/data/contact";

import "swiper/css";

const PANEL_COUNT = heroPanels.length;
const OVERLAP_RATIO = 0.14; // ~14% overlap — premium, legible
const ACTIVE_MIN = 360;
const ACTIVE_MAX = 460;
const BASE_MIN = 150;
const BASE_MAX = 230;
const SIDE_PADDING = 24; // reserva nas laterais

function computeLayout(containerWidth: number, activeIndex: number | null) {
  const activeWidth = Math.min(
    ACTIVE_MAX,
    Math.max(ACTIVE_MIN, containerWidth * 0.27)
  );

  if (activeIndex === null) {
    const rawBase =
      containerWidth / (1 + (PANEL_COUNT - 1) * (1 - OVERLAP_RATIO));
    const baseWidth = Math.min(BASE_MAX, Math.max(BASE_MIN, rawBase));
    const overlap = baseWidth * OVERLAP_RATIO;
    return { baseWidth, activeWidth, overlap };
  }

  const inactiveCount = PANEL_COUNT - 1;
  const rawBase =
    (containerWidth - activeWidth) /
    (1 + (inactiveCount - 1) * (1 - OVERLAP_RATIO));
  const baseWidth = Math.min(BASE_MAX, Math.max(BASE_MIN, rawBase));
  const overlap = baseWidth * OVERLAP_RATIO;
  return { baseWidth, activeWidth, overlap };
}

function PatternOverlay({ pattern, accent }: { pattern: string; accent: string }) {
  if (pattern === "grid") {
    return (
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.08]"
        style={{
          backgroundImage: `linear-gradient(${accent} 1px, transparent 1px), linear-gradient(90deg, ${accent} 1px, transparent 1px)`,
          backgroundSize: "28px 28px",
        }}
      />
    );
  }
  if (pattern === "dots") {
    return (
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.12]"
        style={{
          backgroundImage: `radial-gradient(${accent} 1px, transparent 1px)`,
          backgroundSize: "18px 18px",
        }}
      />
    );
  }
  if (pattern === "hex") {
    return (
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M30 0l25.98 15v30L30 60 4.02 45V15z' fill='none' stroke='%23FF6A00' stroke-width='1'/%3E%3C/svg%3E")`,
          backgroundSize: "52px 52px",
        }}
      />
    );
  }
  if (pattern === "lines") {
    return (
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.1]"
        style={{
          backgroundImage: `repeating-linear-gradient(-12deg, ${accent}, ${accent} 1px, transparent 1px, transparent 14px)`,
        }}
      />
    );
  }
  return (
    <div
      className="pointer-events-none absolute inset-0 opacity-[0.07]"
      style={{
        backgroundImage: `repeating-linear-gradient(45deg, ${accent}, ${accent} 1px, transparent 1px, transparent 20px)`,
      }}
    />
  );
}

function PanelModal({ panel, onClose }: { panel: HeroPanel; onClose: () => void }) {
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  const service = panel.service;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
      className="fixed inset-0 z-[200] flex items-center justify-center bg-black-fosco/96 p-4 backdrop-blur-xl"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.96, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.98, opacity: 0 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="relative max-h-[92vh] w-full max-w-4xl overflow-hidden rounded-2xl border border-white/12 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="absolute inset-0">
          <Image src={panel.image} alt={panel.title} fill className="object-cover" style={{ opacity: 0.22 }} />
          <div
            className="absolute inset-0"
            style={{ background: `linear-gradient(135deg, ${panel.accent}, rgba(10,10,10,0.94) 60%)` }}
          />
          <PatternOverlay pattern={panel.pattern} accent={panel.glow} />
        </div>
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 z-20 flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-black/60 text-white hover:border-orange-auryx hover:text-orange-auryx"
          aria-label="Fechar"
        >
          <FaTimes />
        </button>
        <div className="relative z-10 grid md:grid-cols-5">
          <div className="border-b border-white/10 p-8 md:border-b-0 md:border-r md:col-span-2">
            <span className="text-5xl font-light text-orange-auryx/60">{panel.number}</span>
            <p className="mt-2 text-xs tracking-[0.25em] text-orange-auryx uppercase">{panel.service.title}</p>
            <h2 className="mt-3 font-display text-2xl font-bold uppercase tracking-wide text-white md:text-3xl">{panel.title}</h2>
            <p className="mt-4 text-gray-metallic leading-relaxed">{service.fullDescription}</p>
          </div>
          <div className="p-8 md:col-span-3">
            <h3 className="text-sm font-semibold tracking-widest text-orange-auryx uppercase">Benefícios</h3>
            <ul className="mt-4 space-y-2">
              {service.benefits.map((b) => (
                <li key={b} className="flex items-start gap-3 text-sm text-gray-metallic">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-orange-auryx" />
                  {b}
                </li>
              ))}
            </ul>
            <div className="mt-10 flex flex-wrap gap-4">
              <Button href={`https://wa.me/${contact.whatsappLink}`} external size="lg">Solicitar Orçamento</Button>
              <Button href="/servicos" variant="secondary" size="lg">Ver todos serviços</Button>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

function PanelCard({
  panel,
  index,
  isActive,
  isAnyActive,
  width,
  overlap,
  panelHeight,
  onActivate,
  onDeactivate,
  onOpen,
}: {
  panel: HeroPanel;
  index: number;
  isActive: boolean;
  isAnyActive: boolean;
  width: number;
  overlap: number;
  panelHeight: number;
  onActivate: () => void;
  onDeactivate: () => void;
  onOpen: () => void;
}) {
  const zIndex = isActive ? 100 : 10 + index;

  return (
    <motion.div
      className="relative shrink-0"
      style={{
        zIndex,
        marginLeft: index === 0 ? 4 : -overlap,
        height: panelHeight,
      }}
      animate={{ width }}
      transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
      onMouseEnter={onActivate}
      onMouseLeave={onDeactivate}
    >
      <button
        type="button"
        onClick={onOpen}
        className="block h-full w-full text-left"
        aria-label={panel.title}
      >
        <div
          className={`relative flex h-full w-full flex-col overflow-hidden rounded-2xl border backdrop-blur-sm transition-all duration-[650ms] ${
            isActive
              ? "border-orange-auryx/50 bg-black-carbon/40 shadow-[0_32px_80px_rgba(0,0,0,0.55),0_0_60px_var(--panel-glow),inset_0_1px_0_rgba(255,255,255,0.08)]"
              : "border-white/10 bg-black-carbon/25 shadow-[0_12px_40px_rgba(0,0,0,0.4),inset_0_1px_0_rgba(255,255,255,0.04)]"
          } ${!isActive && isAnyActive ? "opacity-[0.88]" : "opacity-100"}`}
          style={{ "--panel-glow": panel.glow } as React.CSSProperties}
        >
          {/* Watermark background */}
          <div className="absolute inset-0">
            <Image
              src={panel.image}
              alt=""
              fill
              className="object-cover transition-opacity duration-[650ms]"
              sizes="400px"
              style={{ opacity: isActive ? 0.16 : 0.1 }}
            />
            <div
              className="absolute inset-0 bg-gradient-to-b from-black-fosco/75 via-black-carbon/88 to-black-fosco/95"
            />
            <div
              className="absolute inset-0 transition-opacity duration-[650ms]"
              style={{
                background: `linear-gradient(145deg, ${panel.accent} 0%, transparent 55%)`,
                opacity: isActive ? 0.35 : 0.18,
              }}
            />
            <PatternOverlay pattern={panel.pattern} accent={panel.glow} />
            <PanelWatermarkArt panelId={panel.id} isActive={isActive} />
          </div>

          {/* Top glow */}
          <div
            className="pointer-events-none absolute inset-x-0 top-0 h-32 transition-opacity duration-[650ms]"
            style={{
              background: `linear-gradient(to bottom, ${panel.glow}, transparent)`,
              opacity: isActive ? 0.25 : 0.08,
            }}
          />

          <div className="relative z-10 flex h-full flex-col p-5 md:p-6 lg:p-7">
            {/* Number */}
            <span
              className={`font-display text-4xl font-light transition-colors duration-[650ms] md:text-5xl lg:text-6xl ${
                isActive ? "text-orange-auryx" : "text-white/25"
              }`}
            >
              {panel.number}
            </span>

            {/* Category */}
            <span className="mt-4 text-[10px] font-medium tracking-[0.2em] text-orange-auryx/80 uppercase md:text-xs">
              {panel.service.title}
            </span>

            {/* Title */}
            <h3
              className={`mt-2 font-display text-sm font-bold leading-snug tracking-wide uppercase transition-colors duration-[650ms] md:text-base lg:text-lg ${
                isActive ? "text-white" : "text-gray-metallic"
              }`}
            >
              {panel.title}
            </h3>

            <div
              className="mt-4 h-px transition-all duration-[650ms]"
              style={{
                width: isActive ? "100%" : "40px",
                opacity: isActive ? 1 : 0.5,
                background: `linear-gradient(to right, ${panel.glow}, transparent)`,
              }}
            />

            {/* Description — sempre parcialmente visível */}
            <p
              className={`mt-4 text-xs leading-relaxed transition-all duration-[650ms] md:text-sm ${
                isActive
                  ? "text-gray-metallic line-clamp-none"
                  : "text-gray-metallic/70 line-clamp-3"
              }`}
            >
              {isActive ? panel.service.fullDescription : panel.description}
            </p>

            <div className="mt-auto pt-6">
              <motion.div
                initial={false}
                animate={{ opacity: isActive ? 1 : 0, y: isActive ? 0 : 8 }}
                transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                className="flex flex-col gap-3"
              >
                <span
                  className="inline-flex items-center gap-2 rounded-full border border-orange-auryx/40 bg-orange-auryx/10 px-4 py-2.5 text-xs font-semibold tracking-widest text-orange-auryx uppercase transition-colors hover:bg-orange-auryx/20"
                >
                  Explorar serviço
                  <FaArrowRight size={10} />
                </span>
              </motion.div>

              {!isActive && (
                <p className="text-[10px] tracking-widest text-white/20 uppercase mt-3">
                  Passe o mouse
                </p>
              )}
            </div>
          </div>
        </div>
      </button>
    </motion.div>
  );
}

function MobileCarousel({ onOpen }: { onOpen: (panel: HeroPanel) => void }) {
  return (
    <Swiper
      modules={[FreeMode]}
      spaceBetween={16}
      slidesPerView="auto"
      freeMode={{ enabled: true, momentum: true }}
      className="!overflow-visible px-2"
    >
      {heroPanels.map((panel) => (
        <SwiperSlide key={panel.id} className="!w-[82vw] max-w-[320px]">
          <button
            type="button"
            onClick={() => onOpen(panel)}
          className="relative h-[min(68vh,620px)] w-full overflow-hidden rounded-2xl border border-white/12 text-left shadow-xl"
          >
            <Image src={panel.image} alt="" fill className="object-cover opacity-12" sizes="320px" />
            <div className="absolute inset-0 bg-gradient-to-b from-black-fosco/70 via-black-carbon/90 to-black-fosco" />
            <PatternOverlay pattern={panel.pattern} accent={panel.glow} />
            <PanelWatermarkArt panelId={panel.id} isActive={true} />
            <div className="relative z-10 flex h-full flex-col p-6">
              <span className="text-4xl font-light text-orange-auryx/50">{panel.number}</span>
              <span className="mt-3 text-xs tracking-[0.2em] text-orange-auryx uppercase">{panel.service.title}</span>
              <h3 className="mt-2 font-display text-lg font-bold uppercase tracking-wide text-white">{panel.title}</h3>
              <p className="mt-4 text-sm text-gray-metallic/85 leading-relaxed">{panel.description}</p>
              <span className="mt-auto flex items-center gap-2 text-xs font-semibold tracking-widest text-orange-auryx uppercase">
                Explorar <FaArrowRight size={10} />
              </span>
            </div>
          </button>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}

export default function HeroPanels() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [openPanel, setOpenPanel] = useState<HeroPanel | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [containerWidth, setContainerWidth] = useState(0);
  const [panelHeight, setPanelHeight] = useState(720);

  const measure = useCallback(() => {
    if (containerRef.current) {
      const w = containerRef.current.offsetWidth - SIDE_PADDING * 2;
      setContainerWidth(Math.max(600, w));
    }
    const vh = window.innerHeight;
    setPanelHeight(Math.min(850, Math.max(650, vh * 0.72)));
  }, []);

  useEffect(() => {
    measure();
    const ro = new ResizeObserver(measure);
    if (containerRef.current) ro.observe(containerRef.current);
    window.addEventListener("resize", measure);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, [measure]);

  const layout =
    containerWidth > 0
      ? computeLayout(containerWidth, activeIndex)
      : { baseWidth: 200, activeWidth: 420, overlap: 28 };

  return (
    <section
      id="galeria-servicos"
      className="relative flex min-h-screen flex-col bg-black-fosco py-16 md:py-20 overflow-x-clip"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-black-carbon/40 via-black-fosco to-black-fosco" />
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            "radial-gradient(ellipse 80% 50% at 50% 40%, rgba(255,106,0,0.06) 0%, transparent 70%)",
        }}
      />

      {/* Section header */}
      <div className="relative z-10 mx-auto w-full max-w-[1800px] px-4 mb-8 sm:px-6 lg:px-8 text-center">
        <span className="text-xs font-medium tracking-[0.3em] text-orange-auryx uppercase">
          Galeria de Serviços
        </span>
        <h2 className="mt-3 font-display text-2xl font-bold text-white md:text-4xl">
          Explore cada <span className="gradient-text">solução AURYX</span>
        </h2>
        <p className="mx-auto mt-3 max-w-xl text-sm text-gray-metallic/80">
          Passe o mouse para expandir · Clique para ver detalhes completos
        </p>
      </div>

      {/* Premium gallery — margem lateral para não cortar ao expandir */}
      <div className="relative z-10 flex flex-1 items-center justify-center w-full pb-8 px-4 sm:px-5 md:px-6 lg:px-8">
        <div
          ref={containerRef}
          className="w-full mx-auto"
          style={{ maxWidth: "1720px" }}
        >
          {/* Desktop & tablet gallery */}
          <div className="hidden md:flex justify-center items-stretch w-full">
            <div
              className="flex items-stretch mx-2 sm:mx-3"
              style={{
                height: panelHeight,
                maxWidth: "100%",
              }}
            >
              {heroPanels.map((panel, index) => {
                const isActive = activeIndex === index;
                const width = isActive ? layout.activeWidth : layout.baseWidth;
                return (
                  <PanelCard
                    key={panel.id}
                    panel={panel}
                    index={index}
                    isActive={isActive}
                    isAnyActive={activeIndex !== null}
                    width={width}
                    overlap={layout.overlap}
                    panelHeight={panelHeight}
                    onActivate={() => setActiveIndex(index)}
                    onDeactivate={() => setActiveIndex(null)}
                    onOpen={() => setOpenPanel(panel)}
                  />
                );
              })}
            </div>
          </div>

          {/* Mobile carousel */}
          <div className="md:hidden">
            <MobileCarousel onOpen={setOpenPanel} />
          </div>

          <p className="mt-8 text-center text-[11px] tracking-[0.25em] text-gray-metallic/45 uppercase">
            Explore nossa galeria de serviços · Passe o mouse para expandir
          </p>
        </div>
      </div>

      <AnimatePresence>
        {openPanel && <PanelModal panel={openPanel} onClose={() => setOpenPanel(null)} />}
      </AnimatePresence>
    </section>
  );
}
