"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { ButtonHTMLAttributes, AnchorHTMLAttributes, forwardRef } from "react";

type ButtonVariant = "primary" | "secondary" | "outline" | "ghost";
type ButtonSize = "sm" | "md" | "lg";

interface BaseButtonProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
  fullWidth?: boolean;
  className?: string;
}

interface ButtonAsButton
  extends BaseButtonProps,
    Omit<ButtonHTMLAttributes<HTMLButtonElement>, "className"> {
  href?: never;
}

interface ButtonAsLink
  extends BaseButtonProps,
    Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href" | "className"> {
  href: string;
}

type ButtonProps = ButtonAsButton | ButtonAsLink;

const buttonVariants: Record<ButtonVariant, string> = {
  primary:
    "bg-[#FF5500] text-[#1F1F1E] font-semibold hover:bg-[#E04B00] hover:text-white border border-transparent shadow-xs active:translate-y-px",
  secondary:
    "bg-[#1F1F1E] text-white font-medium hover:bg-[#2B2B2B] border border-transparent shadow-xs active:translate-y-px",
  outline:
    "bg-transparent text-[#1F1F1E] border border-[#E8E2D9] hover:border-[#1F1F1E] hover:bg-black/5 active:translate-y-px",
  ghost:
    "bg-transparent text-[#1F1F1E] hover:text-[#FF5500] hover:bg-black/5 border border-transparent",
};

const buttonSizes: Record<ButtonSize, string> = {
  sm: "px-4 py-2 text-sm",
  md: "px-6 py-3 text-base",
  lg: "px-8 py-4 text-lg",
};

export const Button = forwardRef<
  HTMLButtonElement | HTMLAnchorElement,
  ButtonProps
>(
  (
    {
      variant = "primary",
      size = "md",
      fullWidth = false,
      className,
      children,
      href,
      ...props
    },
    ref
  ) => {
    const baseStyles = cn(
      "inline-flex items-center justify-center font-medium rounded-lg transition-all duration-200 tracking-tight select-none",
      "font-sans",
      "focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-[#FF5500] focus-visible:ring-offset-2",
      "disabled:opacity-50 disabled:cursor-not-allowed",
      buttonVariants[variant],
      buttonSizes[size],
      fullWidth && "w-full",
      className
    );

    if (href) {
      return (
        <Link
          ref={ref as React.Ref<HTMLAnchorElement>}
          href={href}
          className={baseStyles}
          {...(props as AnchorHTMLAttributes<HTMLAnchorElement>)}
        >
          {children}
        </Link>
      );
    }

    return (
      <button
        ref={ref as React.Ref<HTMLButtonElement>}
        className={baseStyles}
        {...(props as ButtonHTMLAttributes<HTMLButtonElement>)}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";
