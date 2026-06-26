"use client";

import { useCallback } from "react";
import Particles, { ParticlesProvider } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";
import type { ISourceOptions } from "@tsparticles/engine";

const particlesOptions: ISourceOptions = {
  fullScreen: { enable: false },
  fpsLimit: 60,
  particles: {
    number: { value: 60, density: { enable: true, width: 800, height: 800 } },
    color: { value: ["#FF6A00", "#FF8C00", "#D9D9D9"] },
    opacity: {
      value: { min: 0.1, max: 0.5 },
      animation: { enable: true, speed: 0.5 },
    },
    size: { value: { min: 1, max: 3 } },
    move: {
      enable: true,
      speed: 0.8,
      direction: "none",
      random: true,
      outModes: { default: "out" },
    },
    links: {
      enable: true,
      distance: 120,
      color: "#FF6A00",
      opacity: 0.15,
      width: 1,
    },
  },
  detectRetina: true,
  background: { color: { value: "transparent" } },
};

function ParticlesInner() {
  const particlesLoaded = useCallback(async () => {}, []);

  return (
    <div className="absolute inset-0 z-0">
      <Particles
        id="tsparticles-hero"
        options={particlesOptions}
        particlesLoaded={particlesLoaded}
        className="h-full w-full"
      />
    </div>
  );
}

export default function ParticlesBackground() {
  return (
    <ParticlesProvider
      init={async (engine) => {
        await loadSlim(engine);
      }}
    >
      <ParticlesInner />
    </ParticlesProvider>
  );
}
