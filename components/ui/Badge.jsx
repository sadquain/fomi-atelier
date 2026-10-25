import React from "react";
import { cn } from "@/lib/utils";

export function Badge({ children, variant = "default", size = "sm", className }) {
  const variants = {
    default: "bg-[var(--bg-subtle)] text-[var(--text-secondary)] border border-[var(--border-subtle)]",
    coral: "bg-[var(--accent-coral-light)] text-[var(--accent-coral)] border border-[var(--accent-coral-border)]",
    model: "bg-[var(--bg-card)] text-[var(--text-primary)] border border-[var(--border-subtle)] shadow-xs",
  };

  const sizes = {
    xs: "text-[10px] px-1.5 py-0.5 rounded-md",
    sm: "text-xs px-2.5 py-0.5 rounded-full font-medium",
    md: "text-xs px-3 py-1 rounded-full font-semibold",
  };

  return (
    <span className={cn("inline-flex items-center gap-1 select-none", variants[variant], sizes[size], className)}>
      {children}
    </span>
  );
}
