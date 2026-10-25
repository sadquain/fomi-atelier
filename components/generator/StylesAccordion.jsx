"use client";

import React from "react";
import { Palette, Check } from "lucide-react";
import { AccordionPill } from "@/components/ui/Accordion";
import { STYLES } from "@/data/stylesData";
import { cn } from "@/lib/utils";

export function StylesAccordion({ selectedStyle, onSelectStyle }) {
  const activeStyleObj = STYLES.find((s) => s.id === selectedStyle) || STYLES[0];

  return (
    <AccordionPill
      title="Styles"
      icon={Palette}
      badge={activeStyleObj.id !== "none" ? activeStyleObj.name : null}
      defaultOpen={false}
    >
      <div className="pt-1">
        <p className="text-[11px] text-[var(--text-muted)] mb-2.5">
          Select an aesthetic preset to guide composition, textures, and color grading.
        </p>

        <div className="grid grid-cols-2 gap-2 max-h-56 overflow-y-auto no-scrollbar pr-0.5">
          {STYLES.map((style) => {
            const isSelected = selectedStyle === style.id;
            return (
              <button
                key={style.id}
                type="button"
                role="checkbox"
                aria-checked={isSelected}
                onClick={() => onSelectStyle(isSelected && style.id !== "none" ? "none" : style.id)}
                className={cn(
                  "relative flex items-center gap-2 p-1.5 rounded-xl border text-left transition-all duration-150 cursor-pointer group active:scale-[0.98]",
                  isSelected
                    ? "border-[var(--accent-coral)] bg-[var(--accent-coral-light)] shadow-xs"
                    : "border-[var(--border-subtle)] hover:border-[var(--border-hover)] hover:bg-[var(--bg-hover)]"
                )}
              >
                {/* Visual gradient swatch */}
                <div
                  className={cn(
                    "w-6 h-6 rounded-lg bg-gradient-to-tr shrink-0 shadow-2xs transition-transform group-hover:scale-105",
                    style.previewGradient
                  )}
                />

                <div className="flex-1 min-w-0">
                  <span
                    className={cn(
                      "block text-[11px] font-medium truncate leading-tight",
                      isSelected ? "text-[var(--accent-coral)] font-semibold" : "text-[var(--text-primary)]"
                    )}
                  >
                    {style.name}
                  </span>
                  <span className="text-[9px] text-[var(--text-muted)] leading-none">
                    {style.badge}
                  </span>
                </div>

                {isSelected && (
                  <Check className="w-3.5 h-3.5 text-[var(--accent-coral)] shrink-0" aria-hidden="true" />
                )}
              </button>
            );
          })}
        </div>
      </div>
    </AccordionPill>
  );
}
