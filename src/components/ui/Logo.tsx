import Link from "next/link";
import { cn } from "@/lib/utils";

interface LogoProps {
  className?: string;
  size?: "sm" | "md" | "lg" | "hero";
}

export default function Logo({ className = "", size = "md" }: LogoProps) {
  const auryxSize = {
    sm: "text-lg",
    md: "text-xl",
    lg: "text-3xl",
    hero: "text-4xl md:text-5xl",
  };

  const mediaSize = {
    sm: "text-[8px]",
    md: "text-[9px]",
    lg: "text-xs",
    hero: "text-sm",
  };

  return (
    <Link
      href="/"
      className={cn("group inline-flex flex-col items-center leading-none", className)}
    >
      <span
        className={cn(
          "font-display font-bold tracking-[0.22em] text-white transition-colors group-hover:text-orange-auryx",
          auryxSize[size]
        )}
      >
        AURYX
      </span>
      <span
        className={cn(
          "mt-1 font-medium tracking-[0.45em] text-orange-auryx uppercase",
          mediaSize[size]
        )}
      >
        MEDIA
      </span>
    </Link>
  );
}
