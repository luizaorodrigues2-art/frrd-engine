"use client";

import { useEffect } from "react";
import type Lenis from "lenis";

export default function SmoothScrollProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  useEffect(() => {
    let lenis: Lenis | null = null;
    let raf: ((time: number) => void) | null = null;
    let cancelled = false;

    const init = async () => {
      const Lenis = (await import("lenis")).default;
      const { gsap } = await import("gsap");
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");

      if (cancelled) return;

      gsap.registerPlugin(ScrollTrigger);

      lenis = new Lenis({
        duration: 1.2,
        easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smoothWheel: true,
      });

      lenis.on("scroll", ScrollTrigger.update);

      raf = (time: number) => {
        lenis?.raf(time * 1000);
      };

      gsap.ticker.add(raf);
      gsap.ticker.lagSmoothing(0);
    };

    init();

    return () => {
      cancelled = true;
      import("gsap").then(({ gsap }) => {
        if (raf) gsap.ticker.remove(raf);
      });
      lenis?.destroy();
    };
  }, []);

  return <>{children}</>;
}
