"use client";

import React from "react";
import { cn } from "@/lib/utils";

export function Slider({
  min = 0,
  max = 100,
  step = 1,
  value,
  onChange,
  label,
  valueDisplay,
  className,
  ariaLabel,
}) {
  const percentage = ((value - min) / (max - min)) * 100;

  return (
    <div className={cn("w-full flex flex-col gap-1.5", className)}>
      <div className="flex items-center justify-between text-xs">
        {label && <span className="font-medium text-[var(--text-secondary)]">{label}</span>}
        <span className="font-semibold text-[var(--accent-coral)]">
          {valueDisplay !== undefined ? valueDisplay : value}
        </span>
      </div>
      <div className="relative flex items-center w-full h-5">
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={value}
          aria-label={ariaLabel || label}
          onChange={(e) => onChange(Number(e.target.value))}
          className="w-full h-1.5 bg-[var(--border-subtle)] rounded-lg appearance-none cursor-pointer accent-[var(--accent-coral)] outline-none transition-all"
          style={{
            background: `linear-gradient(to right, var(--accent-coral) 0%, var(--accent-coral) ${percentage}%, var(--border-subtle) ${percentage}%, var(--border-subtle) 100%)`,
          }}
        />
      </div>
    </div>
  );
}
