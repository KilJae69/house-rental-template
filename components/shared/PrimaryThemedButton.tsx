"use client";

import { ReactNode, ComponentProps } from "react";
import { Link } from "@/i18n/routing";
import { cn } from "@/lib/utils";
import { SEASON_ICONS } from "@/constants/assetsData";
import { useTheme } from "next-themes";
import Image from "next/image";


// Extract the exact href type of your next-intl Link
type LinkHref = ComponentProps<typeof Link>["href"];

type ButtonProps = {
  children: ReactNode;
  href?: LinkHref; // ← now strongly typed
  variant?: "solid" | "outline";
  disabled?: boolean;
};

export default function PrimaryThemedButton({
  children,
  href,
  variant = "solid",
  disabled = false,
}: ButtonProps) {
  const baseStyles =
    "inline-flex items-center group relative justify-center font-medium rounded-md cursor-pointer transition focus:outline-none focus:ring-2 focus:ring-offset-2";
  const variants = {
    solid:
      "px-6 py-3 bg-[var(--color-primary)] text-white hover:bg-[var(--color-primary-dark)] focus:ring-[var(--color-primary-light)]",
    outline:
      "px-6 py-3 border border-white hover:border-[var(--color-primary-dark)] text-white hover:bg-[var(--color-primary)] hover:text-white focus:ring-[var(--color-primary)]",
  };
  const classes = cn(
    baseStyles,
    variants[variant],
    disabled && "opacity-50 cursor-not-allowed"
  );
  const { resolvedTheme } = useTheme();
  const iconSrc =
    SEASON_ICONS[resolvedTheme as keyof typeof SEASON_ICONS] || SEASON_ICONS.summer;

  if (href) {
    return (
    
        <Link href={href} className={classes} aria-disabled={disabled}>
          {children}
          <Image
            src={iconSrc}
            className="absolute left-1/2 -translate-x-1/2 -z-10 top-0 opacity-0 transition group-hover:opacity-100 group-hover:-translate-y-6"
            alt=""
            width={20}
            height={20}
          />
        </Link>
     
    );
  }

  return (
    
      <button
        type="button"
        className={classes}
        disabled={disabled}
        aria-disabled={disabled}
      >
        {children}
      </button>
   
  );
}
