"use client";

import React, { useState } from "react";
import { cn } from "@/lib/utils";

export const IconButton = React.forwardRef(function IconButton(
  {
    icon: Icon,
    label,
    tooltip,
    variant = "ghost",
    size = "md",
    className,
    disabled = false,
    active = false,
    ...props
  },
  ref
) {
  const [showTooltip, setShowTooltip] = useState(false);

  const baseStyles =
    "relative inline-flex items-center justify-center rounded-xl transition-all duration-200 select-none cursor-pointer disabled:cursor-not-allowed disabled:opacity-50 active:scale-95 outline-none";

  const variants = {
    ghost:
      "text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-hover)]",
    card:
      "bg-[var(--bg-card)]/90 backdrop-blur-md text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-card)] shadow-warm-sm border border-[var(--border-subtle)]",
    coral:
      "bg-[var(--accent-coral)] text-white hover:bg-[var(--accent-coral-hover)] shadow-xs",
    coralLight:
      "bg-[var(--accent-coral-light)] text-[var(--accent-coral)] hover:bg-[var(--accent-coral)] hover:text-white",
  };

  const activeStyles =
    active && "text-[var(--accent-coral)] bg-[var(--accent-coral-light)]";

  const sizes = {
    xs: "w-7 h-7 text-xs",
    sm: "w-8 h-8 text-sm",
    md: "w-9 h-9 text-base",
    lg: "w-10 h-10 text-lg",
  };

  const tipText = tooltip || label;

  return (
    <div className="relative inline-flex">
      <button
        ref={ref}
        type="button"
        aria-label={label}
        disabled={disabled}
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
        onFocus={() => setShowTooltip(true)}
        onBlur={() => setShowTooltip(false)}
        className={cn(baseStyles, variants[variant], sizes[size], activeStyles, className)}
        {...props}
      >
        {Icon && <Icon className="w-4 h-4 shrink-0" aria-hidden="true" />}
      </button>

      {/* Accessible Tooltip */}
      {tipText && showTooltip && (
        <span
          role="tooltip"
          className="pointer-events-none absolute bottom-full left-1/2 -translate-x-1/2 mb-1.5 z-50 whitespace-nowrap rounded-md bg-[var(--text-primary)] px-2 py-1 text-[11px] font-medium text-white shadow-md transition-opacity duration-150 animate-in fade-in"
        >
          {tipText}
        </span>
      )}
    </div>
  );
});
