"use client";

import React, { useState } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

export function AccordionPill({
  title,
  icon: Icon,
  badge,
  defaultOpen = false,
  isOpen: controlledIsOpen,
  onToggle,
  children,
  className,
}) {
  const [internalOpen, setInternalOpen] = useState(defaultOpen);
  const isOpen = controlledIsOpen !== undefined ? controlledIsOpen : internalOpen;

  const toggle = () => {
    if (onToggle) {
      onToggle(!isOpen);
    } else {
      setInternalOpen(!isOpen);
    }
  };

  return (
    <div
      className={cn(
        "rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-card)] transition-all duration-300 overflow-hidden shadow-warm-sm",
        isOpen && "border-[var(--accent-coral)]/40 ring-1 ring-[var(--accent-coral)]/20",
        className
      )}
    >
      <button
        type="button"
        aria-expanded={isOpen}
        onClick={toggle}
        className="w-full flex items-center justify-between px-3.5 py-2.5 text-xs font-semibold text-[var(--text-primary)] hover:bg-[var(--bg-hover)] transition-colors duration-150 select-none cursor-pointer"
      >
        <div className="flex items-center gap-2">
          {Icon && (
            <Icon
              className={cn(
                "w-4 h-4 transition-colors duration-200",
                isOpen ? "text-[var(--accent-coral)]" : "text-[var(--text-secondary)]"
              )}
              aria-hidden="true"
            />
          )}
          <span>{title}</span>
          {badge && (
            <span className="px-1.5 py-0.5 text-[10px] rounded-full bg-[var(--accent-coral-light)] text-[var(--accent-coral)] font-medium">
              {badge}
            </span>
          )}
        </div>
        <ChevronDown
          className={cn(
            "w-3.5 h-3.5 text-[var(--text-muted)] transition-transform duration-250",
            isOpen && "rotate-180 text-[var(--accent-coral)]"
          )}
          aria-hidden="true"
        />
      </button>

      {/* Collapsible Content with height/opacity animation */}
      <div
        className={cn(
          "grid transition-all duration-300 ease-in-out",
          isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0 pointer-events-none"
        )}
      >
        <div className="overflow-hidden">
          <div className="p-3.5 pt-1 border-t border-[var(--border-subtle)]/60">{children}</div>
        </div>
      </div>
    </div>
  );
}
