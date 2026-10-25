"use client";

import React from "react";
import { cn } from "@/lib/utils";

export function SegmentedToggle({
  options = [],
  value,
  onChange,
  className,
  ariaLabel = "Mode toggle",
}) {
  return (
    <div
      role="radiogroup"
      aria-label={ariaLabel}
      className={cn(
        "relative flex items-center p-1 rounded-2xl bg-[var(--bg-subtle)] border border-[var(--border-subtle)] select-none",
        className
      )}
    >
      {options.map((option) => {
        const isSelected = option.value === value;
        const Icon = option.icon;

        return (
          <button
            key={option.value}
            role="radio"
            aria-checked={isSelected}
            type="button"
            onClick={() => onChange(option.value)}
            className={cn(
              "relative z-10 flex-1 flex items-center justify-center gap-1.5 py-1.5 px-3 rounded-xl text-xs font-semibold transition-all duration-200 cursor-pointer outline-none",
              isSelected
                ? "bg-[var(--bg-card)] text-[var(--accent-coral)] shadow-warm-sm border border-[var(--border-subtle)]"
                : "text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
            )}
          >
            {Icon && <Icon className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />}
            <span>{option.label}</span>
          </button>
        );
      })}
    </div>
  );
}

export function SwitchToggle({ checked, onChange, label, ariaLabel }) {
  return (
    <label className="inline-flex items-center gap-2 cursor-pointer select-none">
      <button
        type="button"
        role="switch"
        aria-checked={checked}
        aria-label={ariaLabel || label}
        onClick={() => onChange(!checked)}
        className={cn(
          "relative inline-flex h-5 w-9 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus-visible:outline-none",
          checked ? "bg-[var(--accent-coral)]" : "bg-[var(--border-subtle)]"
        )}
      >
        <span
          className={cn(
            "pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out",
            checked ? "translate-x-4" : "translate-x-0"
          )}
        />
      </button>
      {label && <span className="text-xs text-[var(--text-secondary)]">{label}</span>}
    </label>
  );
}
