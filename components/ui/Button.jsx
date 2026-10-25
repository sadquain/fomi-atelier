"use client";

import React from "react";
import { cn } from "@/lib/utils";

export const Button = React.forwardRef(function Button(
  {
    children,
    variant = "primary",
    size = "md",
    className,
    disabled = false,
    loading = false,
    icon: Icon,
    iconPosition = "left",
    ...props
  },
  ref
) {
  const baseStyles =
    "inline-flex items-center justify-center font-medium transition-all duration-200 select-none cursor-pointer disabled:cursor-not-allowed disabled:opacity-50 active:scale-[0.98] outline-none";

  const variants = {
    primary:
      "bg-[var(--accent-coral)] text-white hover:bg-[var(--accent-coral-hover)] shadow-sm hover:shadow active:bg-[var(--accent-coral-active)]",
    secondary:
      "bg-[var(--bg-card)] text-[var(--text-primary)] border border-[var(--border-subtle)] hover:border-[var(--border-hover)] hover:bg-[var(--bg-hover)] shadow-xs",
    ghost:
      "bg-transparent text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-hover)]",
    peach:
      "bg-[var(--accent-coral-light)] text-[var(--accent-coral)] hover:bg-[var(--accent-coral)] hover:text-white border border-[var(--accent-coral-border)]",
    outline:
      "border border-[var(--border-subtle)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-hover)]",
  };

  const sizes = {
    sm: "text-xs px-2.5 py-1.5 rounded-lg gap-1.5",
    md: "text-sm px-3.5 py-2 rounded-xl gap-2",
    lg: "text-base px-5 py-2.5 rounded-2xl gap-2.5",
    pill: "text-xs px-3.5 py-1.5 rounded-full gap-1.5 font-medium tracking-wide",
  };

  return (
    <button
      ref={ref}
      disabled={disabled || loading}
      className={cn(baseStyles, variants[variant], sizes[size], className)}
      {...props}
    >
      {loading ? (
        <span
          className="inline-block w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin"
          aria-hidden="true"
        />
      ) : (
        Icon && iconPosition === "left" && <Icon className="w-4 h-4 shrink-0" aria-hidden="true" />
      )}
      <span>{children}</span>
      {!loading && Icon && iconPosition === "right" && (
        <Icon className="w-4 h-4 shrink-0" aria-hidden="true" />
      )}
    </button>
  );
});
