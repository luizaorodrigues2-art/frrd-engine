"use client";

import { useEffect } from "react";

export default function ScrollRevealProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  useEffect(() => {
    import("scrollreveal").then((module) => {
      const ScrollReveal = module.default;
      const sr = ScrollReveal({
        distance: "40px",
        duration: 1000,
        easing: "cubic-bezier(0.5, 0, 0, 1)",
        origin: "bottom",
        reset: false,
        mobile: true,
      });

      sr.reveal(".sr-fade", { opacity: 0, interval: 100 });
      sr.reveal(".sr-left", { origin: "left", opacity: 0, interval: 100 });
      sr.reveal(".sr-right", { origin: "right", opacity: 0, interval: 100 });
      sr.reveal(".sr-scale", { opacity: 0, scale: 0.9, interval: 100 });
    });
  }, []);

  return <>{children}</>;
}
