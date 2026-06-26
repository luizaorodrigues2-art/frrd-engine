"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface ButtonProps {
  children: React.ReactNode;
  href?: string;
  onClick?: () => void;
  variant?: "primary" | "secondary" | "ghost";
  size?: "sm" | "md" | "lg" | "xl";
  className?: string;
  external?: boolean;
  disabled?: boolean;
}

export default function Button({
  children,
  href,
  onClick,
  variant = "primary",
  size = "md",
  className,
  external,
  disabled,
}: ButtonProps) {
  const baseStyles =
    "relative inline-flex items-center justify-center font-semibold tracking-wide transition-all duration-300 overflow-hidden group";

  const variants = {
    primary:
      "bg-gradient-to-r from-orange-auryx to-orange-neon text-white neon-glow hover:shadow-[0_0_30px_rgba(255,106,0,0.5)]",
    secondary:
      "glass text-white border border-orange-auryx/30 hover:border-orange-auryx hover:bg-orange-auryx/10",
    ghost: "text-gray-metallic hover:text-orange-auryx",
  };

  const sizes = {
    sm: "px-4 py-2 text-sm rounded-lg",
    md: "px-6 py-3 text-sm rounded-xl",
    lg: "px-8 py-4 text-base rounded-xl",
    xl: "px-10 py-5 text-lg rounded-2xl",
  };

  const content = (
  <>
      <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
      <motion.span
        className="relative z-10 flex items-center gap-2"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        {children}
      </motion.span>
    </>
  );

  if (href) {
    if (external) {
      return (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className={cn(baseStyles, variants[variant], sizes[size], className)}
        >
          {content}
        </a>
      );
    }
    return (
      <Link
        href={href}
        className={cn(baseStyles, variants[variant], sizes[size], className)}
      >
        {content}
      </Link>
    );
  }

  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      data-cursor-hover={!disabled ? true : undefined}
      className={cn(
        baseStyles,
        variants[variant],
        sizes[size],
        disabled && "opacity-50 cursor-not-allowed",
        className
      )}
    >
      {content}
    </button>
  );
}
