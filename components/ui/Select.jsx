"use client";

import React, { useState, useRef, useEffect } from "react";
import { ChevronDown, Check } from "lucide-react";
import { cn } from "@/lib/utils";

export function Select({
  options = [],
  value,
  onChange,
  labelPrefix = "",
  placeholder = "Select...",
  className,
  dropdownWidth = "w-48",
  size = "md",
  ariaLabel,
}) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef(null);

  const selectedOption = options.find((opt) => opt.id === value || opt.value === value);

  useEffect(() => {
    function handleClickOutside(e) {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    }
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

  // Handle keyboard navigation
  const handleKeyDown = (e) => {
    if (e.key === "Escape") {
      setIsOpen(false);
    } else if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      setIsOpen((prev) => !prev);
    } else if (e.key === "ArrowDown" && isOpen) {
      e.preventDefault();
      const currentIndex = options.findIndex((opt) => (opt.id || opt.value) === value);
      const nextIndex = (currentIndex + 1) % options.length;
      onChange(options[nextIndex].id || options[nextIndex].value);
    } else if (e.key === "ArrowUp" && isOpen) {
      e.preventDefault();
      const currentIndex = options.findIndex((opt) => (opt.id || opt.value) === value);
      const prevIndex = (currentIndex - 1 + options.length) % options.length;
      onChange(options[prevIndex].id || options[prevIndex].value);
    }
  };

  const displayText = selectedOption
    ? `${labelPrefix}${selectedOption.name || selectedOption.label || selectedOption.value}`
    : placeholder;

  return (
    <div ref={containerRef} className={cn("relative inline-block text-left", className)}>
      <button
        type="button"
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        aria-label={ariaLabel || labelPrefix || placeholder}
        onClick={() => setIsOpen(!isOpen)}
        onKeyDown={handleKeyDown}
        className={cn(
          "inline-flex items-center justify-between gap-1.5 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-card)] px-3 py-1.5 text-xs font-medium text-[var(--text-primary)] hover:border-[var(--border-hover)] hover:bg-[var(--bg-hover)] transition-all duration-150 select-none shadow-warm-sm active:scale-[0.98]",
          size === "sm" && "text-[11px] px-2.5 py-1",
          isOpen && "ring-2 ring-[var(--accent-coral)]/30 border-[var(--accent-coral)]"
        )}
      >
        <span className="truncate max-w-[140px] text-left">{displayText}</span>
        <ChevronDown
          className={cn(
            "w-3.5 h-3.5 text-[var(--text-muted)] transition-transform duration-200 shrink-0",
            isOpen && "rotate-180 text-[var(--accent-coral)]"
          )}
          aria-hidden="true"
        />
      </button>

      {isOpen && (
        <div
          role="listbox"
          tabIndex={-1}
          className={cn(
            "absolute left-0 top-full mt-1.5 z-50 rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-card)] p-1.5 shadow-warm-lg backdrop-blur-md animate-in fade-in zoom-in-95 max-h-60 overflow-y-auto no-scrollbar",
            dropdownWidth
          )}
        >
          {options.map((opt) => {
            const optValue = opt.id !== undefined ? opt.id : opt.value;
            const isSelected = optValue === value;
            return (
              <button
                key={optValue}
                role="option"
                aria-selected={isSelected}
                type="button"
                onClick={() => {
                  onChange(optValue);
                  setIsOpen(false);
                }}
                className={cn(
                  "w-full flex items-center justify-between gap-2 rounded-xl px-2.5 py-1.5 text-xs text-left transition-colors duration-150 select-none",
                  isSelected
                    ? "bg-[var(--accent-coral-light)] text-[var(--accent-coral)] font-semibold"
                    : "text-[var(--text-primary)] hover:bg-[var(--bg-hover)]"
                )}
              >
                <div className="flex flex-col min-w-0">
                  <span className="truncate">{opt.name || opt.label || opt.value}</span>
                  {opt.description && (
                    <span className="text-[10px] text-[var(--text-muted)] truncate">
                      {opt.description}
                    </span>
                  )}
                </div>
                {isSelected && <Check className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
